"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Harissa } from "./harissa";

const SHOW_AFTER = 6000; // ms — lands after the intro has finished playing

/**
 * Nudge toward the AI usage survey. Slides in top-right once the intro is out
 * of the way. Dismissing hides it for the rest of the visit only — like the
 * intro, it comes back on every page load, so nothing is persisted.
 */
export default function SurveyToast({
  title,
  body,
  cta,
  dismissLabel,
  href,
}: {
  title: string;
  body: string;
  cta: string;
  dismissLabel: string;
  href: string;
}) {
  const [visible, setVisible] = useState(false);
  const calm = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), SHOW_AFTER);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          // Full width on phones (below the notch, above everything else),
          // a fixed card pinned top-right from sm up.
          className="fixed top-4 right-4 left-4 z-60 sm:left-auto sm:w-[22rem]"
          initial={calm ? { opacity: 0 } : { opacity: 0, x: 40, y: -12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={calm ? { opacity: 0 } : { opacity: 0, x: 40 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <div className="relative flex gap-3 rounded-2xl border-4 border-foreground bg-card p-4 shadow-[8px_9px_0_0_var(--color-foreground)]">
            <Harissa className="mt-0.5 size-8 shrink-0 text-foreground" />

            <div className="flex min-w-0 flex-col gap-2 pr-6">
              <p className="font-display text-base leading-tight font-bold text-balance">
                {title}
              </p>
              <p className="font-sans text-sm leading-snug text-muted-foreground text-pretty">
                {body}
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="inline-flex w-fit items-center gap-1 rounded-xl border-[3px] border-foreground bg-primary px-3 py-1.5 font-tech text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground shadow-[3px_4px_0_0_var(--color-foreground)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_2px_0_0_var(--color-foreground)]"
              >
                {cta}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label={dismissLabel}
              className="absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-lg border-[3px] border-foreground bg-background transition-transform hover:-translate-y-0.5"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
