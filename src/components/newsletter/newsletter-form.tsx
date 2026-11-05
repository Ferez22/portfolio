"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { DATA } from "@/data/resume";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { markSubscribed, useSubscribed } from "./subscription";

type NewsletterDict = Dictionary["newsletter"];
type Phase = "form" | "progress" | "done";

/** Progress creeps toward this while Brevo answers, then jumps to 100. */
const PENDING_CAP = 90;
/** Keep the boarding scene on screen long enough to follow, even on a fast response. */
const MIN_PROGRESS_MS = 2400;

async function subscribe(email: string, lang: Locale) {
  // Brevo endpoint: isAjax=1 → JSON { success }. CORS echoes origin.
  const res = await fetch(DATA.contact.newsletterAction, {
    method: "POST",
    body: new URLSearchParams({
      EMAIL: email,
      email_address_check: "",
      locale: lang,
      isAjax: "1",
    }),
  });
  const json = (await res.json().catch(() => null)) as {
    success?: boolean;
  } | null;
  if (!res.ok || !json?.success) throw new Error("subscribe failed");
}

/**
 * Newsletter card on a moving ocean. The boat on the submit button sails
 * (shared `layoutId`) to the centre of the card on submit, rides there
 * during the boarding scene, then stays for the confirmation. Once the
 * visitor is subscribed (here, in another card, or on a past visit) every
 * card shows the onboarded state.
 * `header` is the title block; `className` styles the card shell;
 * `children` render on top of every phase (e.g. a close button).
 */
export function NewsletterCard({
  lang,
  dict,
  header,
  className,
  children,
}: {
  lang: Locale;
  dict: NewsletterDict;
  header: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  const id = useId();
  const boatId = `${id}-boat`;
  const subscribed = useSubscribed();
  const [submitting, setSubmitting] = useState(false);
  /** Subscribed through this card just now (vs. already subscribed before). */
  const [justSubscribed, setJustSubscribed] = useState(false);
  const phase: Phase = submitting ? "progress" : subscribed ? "done" : "form";
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const isBot = Boolean(data.get("email_address_check"));

    setError(false);
    setProgress(0);
    setSubmitting(true);
    timer.current = window.setInterval(
      () => setProgress((p) => p + (PENDING_CAP - p) * 0.05),
      80,
    );

    try {
      await Promise.all([
        isBot ? null : subscribe(String(data.get("EMAIL") ?? "").trim(), lang),
        new Promise((r) => setTimeout(r, MIN_PROGRESS_MS)),
      ]);
      window.clearInterval(timer.current);
      setProgress(100);
      await new Promise((r) => setTimeout(r, 600));
      setJustSubscribed(true);
      markSubscribed();
      setSubmitting(false);
    } catch {
      window.clearInterval(timer.current);
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn(
          "relative overflow-hidden transition-shadow duration-300",
          className,
        )}
      >
        <Ocean />
        {/* All phases share one grid cell so the card keeps its height. */}
        <div className="relative grid *:col-start-1 *:row-start-1">
          <div
            className={cn(
              "flex flex-col gap-4 transition-opacity duration-300",
              phase !== "form" && "invisible opacity-0",
            )}
          >
            {header}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label htmlFor={`${id}-email`} className="sr-only">
                {dict.label}
              </label>
              <div className="relative">
                <input
                  id={`${id}-email`}
                  type="email"
                  name="EMAIL"
                  required
                  autoComplete="email"
                  placeholder={dict.placeholder}
                  aria-invalid={error || undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className="w-full rounded-xl border border-border bg-background/85 py-2.5 pl-4 pr-14 font-sans text-base text-foreground placeholder:text-muted-foreground/70 backdrop-blur-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-rose-600/50"
                />
                <button
                  type="submit"
                  aria-label={dict.subscribe}
                  title={dict.subscribe}
                  className="group/boat absolute right-1.5 top-1/2 inline-flex h-8 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-amber-100/90 ring-1 ring-amber-900/10 transition-colors hover:bg-amber-200/90 dark:bg-amber-300/15 dark:ring-amber-200/15 dark:hover:bg-amber-300/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                >
                  {phase === "form" && (
                    <motion.span layoutId={boatId} className="block size-7">
                      <Boat className="size-full transition-transform duration-300 group-hover/boat:-translate-y-0.5 group-hover/boat:-rotate-6" />
                    </motion.span>
                  )}
                </button>
                {/* Brevo honeypot — must stay empty */}
                <input
                  type="text"
                  name="email_address_check"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />
              </div>
              {error && (
                <p
                  id={`${id}-error`}
                  role="alert"
                  className="font-sans text-sm text-rose-700 dark:text-rose-300"
                >
                  {dict.error}
                </p>
              )}
            </form>
          </div>

          {phase !== "form" && (
            <div
              role={phase === "done" ? "status" : undefined}
              className="flex flex-col items-center justify-center gap-2 text-center"
            >
              {phase === "progress" ? (
                <BoardingScene
                  boatId={boatId}
                  progress={progress}
                  steps={dict.steps}
                  label={dict.subscribing}
                />
              ) : (
                <>
                  <motion.span
                    layoutId={boatId}
                    transition={BOAT_SPRING}
                    className="block size-16"
                  >
                    <Boat className="animate-boat-bob size-full" />
                  </motion.span>
                  <p className="max-w-72 font-hand text-2xl font-semibold leading-snug text-amber-950 dark:text-amber-100 text-balance animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                    {justSubscribed ? dict.successText : dict.alreadyText}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </MotionConfig>
  );
}

/** One sine period every 720 units; path spans 2 periods for a seamless loop. */
const WAVE = "M0 60 Q180 0 360 60 T720 60 T1080 60 T1440 60 V120 H0Z";

const BOAT_SPRING = { type: "spring", stiffness: 140, damping: 18 } as const;

/* Boarding scene geometry, in px (svg viewBox matches the box 1:1). */
const SCENE_W = 256;
const DECK_Y = 60;
const PIER_END = 80;
const WALK_FROM = 24;
const WALK_TO = 200;
const STEP_X = [PIER_END, 140, WALK_TO];

/**
 * Subscribing, told as boarding: a passenger walks from the pier across the
 * gangway onto the boat as `progress` (0–100) advances; three markers on the
 * gangway light up and the caption follows the current step.
 */
function BoardingScene({
  boatId,
  progress,
  steps,
  label,
}: {
  boatId: string;
  progress: number;
  steps: readonly [string, string, string];
  label: string;
}) {
  const x = WALK_FROM + ((WALK_TO - WALK_FROM) * progress) / 100;
  const reached = STEP_X.filter((sx) => x >= sx - 0.5).length;
  const caption = steps[Math.min(reached, steps.length - 1)];

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-valuetext={caption}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative h-24 w-64 max-w-full">
        <svg
          viewBox={`0 0 ${SCENE_W} 96`}
          aria-hidden
          className="absolute inset-0 size-full text-amber-900/70 dark:text-amber-200/70 animate-in fade-in-0 duration-500"
        >
          {/* pier */}
          {[10, 44, 76].map((px) => (
            <path key={px} d={`M${px} ${DECK_Y + 2}V80`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          ))}
          <rect x="2" y={DECK_Y - 2} width={PIER_END} height="5" rx="2" fill="currentColor" />
          {/* gangway */}
          <path
            d={`M${PIER_END} ${DECK_Y}Q${(PIER_END + WALK_TO) / 2} ${DECK_Y + 5} ${WALK_TO + 2} ${DECK_Y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="5 3"
            strokeLinecap="round"
          />
          {/* step markers */}
          {STEP_X.map((sx, i) => (
            <circle
              key={sx}
              cx={sx}
              cy={DECK_Y + 9}
              r="3.5"
              className={cn(
                "transition-colors duration-300",
                i < reached ? "fill-primary" : "fill-amber-950/15 dark:fill-amber-100/20",
              )}
            />
          ))}
          {/* water */}
          <path
            d="M0 80c8-3 16-3 24 0s16 3 24 0 16-3 24 0 16 3 24 0 16-3 24 0 16 3 24 0 16-3 24 0 16 3 24 0 16-3 24 0 16 3 24 0 16-3 24 0"
            fill="none"
            stroke="oklch(0.72 0.12 35 / 0.6)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* passenger */}
          <g
            className="text-primary"
            style={{ transform: `translateX(${x}px)`, transition: "transform 200ms ease-out" }}
          >
            <rect x="-3.5" y={DECK_Y - 14} width="7" height="11" rx="3.5" fill="currentColor" />
            <circle cx="0" cy={DECK_Y - 19} r="3.5" fill="currentColor" />
          </g>
        </svg>
        {/* The boat arrives here from the submit button. */}
        <motion.span
          layoutId={boatId}
          transition={BOAT_SPRING}
          className="absolute right-0 top-3.5 block size-16"
        >
          <Boat className="size-full" />
        </motion.span>
      </div>
      <p className="font-hand text-xl font-semibold text-amber-950/90 dark:text-amber-100/90">
        {caption}
      </p>
    </div>
  );
}

/** Soft blurred swells stacked from bottom to top so they cover the whole card. */
const WAVES = [
  { fill: "oklch(0.88 0.08 85 / 0.5)", bottom: "56%", drift: "9s", swell: "4.5s", delay: "0s", reverse: true },
  { fill: "oklch(0.8 0.12 70 / 0.55)", bottom: "38%", drift: "6s", swell: "3.8s", delay: "-1.5s", reverse: false },
  { fill: "oklch(0.74 0.13 45 / 0.45)", bottom: "20%", drift: "7.5s", swell: "3.2s", delay: "-0.8s", reverse: true },
  { fill: "oklch(0.45 0.09 40 / 0.35)", bottom: "0%", drift: "5s", swell: "2.8s", delay: "-2.2s", reverse: false },
];

/**
 * Full-card blurred ocean: each wave drifts sideways and swells up and down.
 * Warm sand → amber → orange, with a deep brown at the bottom.
 * Extends past the sides so the blur doesn't fade at the card edges.
 */
function Ocean() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-x-10 inset-y-0 blur-xl"
    >
      {WAVES.map((w) => (
        <div
          key={w.bottom}
          className="animate-wave-swell absolute inset-x-0 h-1/2"
          style={
            {
              bottom: w.bottom,
              "--swell-duration": w.swell,
              "--swell-delay": w.delay,
            } as React.CSSProperties
          }
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="animate-wave-drift block h-full w-[200%]"
            style={
              {
                "--wave-duration": w.drift,
                "--wave-direction": w.reverse ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            <path d={WAVE} fill={w.fill} />
          </svg>
        </div>
      ))}
    </div>
  );
}

function Boat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" aria-hidden className={cn("text-primary", className)}>
      <path d="M31 6v34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33 8c9 8 13 18 13 28H33z" fill="oklch(0.8 0.11 70)" />
      <path d="M29 14c-6 7-9 14-9 22h9z" fill="oklch(0.72 0.12 35)" />
      <path d="M10 42h44l-6 9H16z" fill="currentColor" />
      <path
        d="M4 53c4-2 8-2 12 0s8 2 12 0 8-2 12 0 8 2 12 0 8-2 8 0"
        fill="none"
        stroke="oklch(0.72 0.12 35 / 0.6)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
