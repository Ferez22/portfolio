"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Harissa } from "./harissa";

export type TimelineEvent = {
  id: string;
  kind: "milestone" | "school" | "work" | "world";
  dateLabel: string;
  title: string;
  body: string;
};

const KIND_STYLES: Record<TimelineEvent["kind"], string> = {
  milestone: "bg-[oklch(0.85_0.13_60)] dark:bg-[oklch(0.62_0.14_60)]",
  school: "bg-[oklch(0.88_0.08_200)] dark:bg-[oklch(0.55_0.09_220)]",
  work: "bg-[oklch(0.92_0.05_95)] dark:bg-[oklch(0.4_0.05_95)]",
  world: "bg-[oklch(0.75_0.16_25)] text-white dark:bg-[oklch(0.5_0.17_25)]",
};

/**
 * One giant arrow across the whole screen, walked left → right as you scroll.
 * Cards alternate above and below the shaft; `world` events (COVID, ChatGPT)
 * are drawn as bursts on the line itself rather than stops along it.
 */
export default function Chronology({
  events,
  eyebrow,
  title,
  hint,
}: {
  events: readonly TimelineEvent[];
  eyebrow: string;
  title: string;
  hint: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (calm) {
    return (
      <section id="chronology" className="w-full px-6 py-24">
        <Header eyebrow={eyebrow} title={title} />
        <ol className="mx-auto mt-10 flex max-w-2xl flex-col gap-6 border-l-4 border-foreground pl-6">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      id="chronology"
      ref={ref}
      className="relative w-full"
      style={{ height: `${events.length * 55 + 60}vh` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        <Header eyebrow={eyebrow} title={title} className="px-6 pb-8" />

        <motion.div
          ref={trackRef}
          style={{ x }}
          // w-max so the track is as wide as its content — otherwise the
          // absolutely positioned shaft only spans the viewport and the line
          // stops a few stops in.
          className="relative flex w-max items-center gap-10 pr-24 pl-6 will-change-transform"
        >
          <Shaft />
          {events.map((event, index) => (
            <Stop key={event.id} event={event} above={index % 2 === 0} />
          ))}
          <ArrowHead />
        </motion.div>

        <p className="px-6 pt-10 font-tech text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          {hint}
        </p>
      </div>
    </section>
  );
}

function Header({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="font-tech text-xs uppercase tracking-[0.3em] text-amber-800/80 dark:text-amber-300/80">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
        {title}
      </h2>
    </div>
  );
}

/** The hand-drawn shaft running behind every stop. */
function Shaft() {
  return (
    <div
      aria-hidden
      className="absolute top-1/2 right-16 left-0 h-[6px] -translate-y-1/2 rounded-full bg-foreground"
    />
  );
}

function ArrowHead() {
  return (
    <div aria-hidden className="relative z-10 shrink-0 self-center">
      <div className="size-0 border-y-[22px] border-l-[34px] border-y-transparent border-l-foreground" />
    </div>
  );
}

function Stop({ event, above }: { event: TimelineEvent; above: boolean }) {
  const isWorld = event.kind === "world";
  return (
    <div className="relative z-10 h-[68vh] w-[min(26rem,78vw)] shrink-0">
      {/* the node sits exactly on the shaft, which runs at half the track height */}
      <div
        aria-hidden
        className={cn(
          "absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-foreground bg-background",
          isWorld && "size-9 rotate-45 rounded-[4px] bg-[oklch(0.72_0.17_25)]",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute left-1/2 h-14 w-1 -translate-x-1/2 bg-foreground",
          above ? "bottom-1/2 mb-3" : "top-1/2 mt-3",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0",
          above ? "bottom-[calc(50%+4.25rem)]" : "top-[calc(50%+4.25rem)]",
        )}
      >
        <EventCard event={event} />
      </div>
    </div>
  );
}

function EventCard({ event }: { event: TimelineEvent }) {
  return (
    <article
      className={cn(
        "relative w-full rounded-2xl border-4 border-foreground p-5 shadow-[8px_9px_0_0_var(--color-foreground)]",
        KIND_STYLES[event.kind],
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-tech text-[0.65rem] uppercase tracking-[0.2em]">
          {event.dateLabel}
        </span>
        {event.id === "born" && <Harissa className="size-5 text-foreground" />}
      </div>
      <h3 className="mt-1 font-heading text-lg leading-tight font-bold text-balance sm:text-xl">
        {event.title}
      </h3>
      <p className="mt-2 font-sans text-sm leading-snug opacity-90">{event.body}</p>
    </article>
  );
}
