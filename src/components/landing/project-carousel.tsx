"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectStage = dynamic(() => import("./project-stage"), { ssr: false });

export type CarouselProject = {
  title: string;
  description: string;
  dates: string;
  tech: readonly string[];
  href: string;
  image: string;
};

/**
 * Horizontal carousel of big project cards.
 *
 * Built on native scroll-snap rather than a transform track, so touch swipe,
 * trackpad, keyboard and screen readers all work for free — the arrows just
 * call scrollBy on the same element.
 */
export default function ProjectCarousel({
  projects,
  eyebrow,
  spaceHint,
  swipeHint,
}: {
  projects: readonly CarouselProject[];
  eyebrow: string;
  spaceHint: string;
  swipeHint: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  // Cleared the moment the visitor scrolls the track themselves — the hint has
  // done its job and should stop competing for attention.
  const [showHint, setShowHint] = useState(true);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < max - 8);

    const card = track.querySelector("article");
    const stride = card ? card.clientWidth + 32 : track.clientWidth;
    setActiveIndex(Math.round(track.scrollLeft / stride));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const frame = requestAnimationFrame(sync);
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // The "this scrolls sideways" nudge: the first time the carousel comes into
  // view it rocks a little to the right and settles back, so the cut-off card
  // at the edge reads as more content rather than a layout accident.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || calm) return;

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        timers.push(
          window.setTimeout(
            () => track.scrollBy({ left: 72, behavior: "smooth" }),
            450,
          ),
          window.setTimeout(
            () => track.scrollBy({ left: -72, behavior: "smooth" }),
            1150,
          ),
        );
      },
      { threshold: 0.35 },
    );
    observer.observe(track);

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      timers = [];
    };
  }, [calm]);

  // Any deliberate interaction retires the hint.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const retire = () => setShowHint(false);
    track.addEventListener("pointerdown", retire, { once: true });
    track.addEventListener("wheel", retire, { once: true, passive: true });
    track.addEventListener("touchstart", retire, { once: true, passive: true });
    return () => {
      track.removeEventListener("pointerdown", retire);
      track.removeEventListener("wheel", retire);
      track.removeEventListener("touchstart", retire);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    setShowHint(false);
    const track = trackRef.current;
    if (!track) return;
    // One card plus its gap, so a click always lands on the next snap point.
    const card = track.querySelector("article");
    const amount = card ? card.clientWidth + 32 : track.clientWidth * 0.8;
    track.scrollBy({
      left: amount * direction,
      behavior: calm ? "auto" : "smooth",
    });
  };

  return (
    <section id="projects" className="w-full py-28">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
        <span className="font-tech text-xs uppercase tracking-[0.3em] text-amber-800/80 dark:text-amber-300/80">
          {eyebrow}
        </span>
        <p className="rounded-full border-2 border-foreground/80 bg-background/85 px-4 py-1.5 font-tech text-[0.65rem] uppercase tracking-[0.2em] sm:text-xs">
          {spaceHint}
        </p>
      </div>

      <div className="relative mt-10">
        <Arrow
          side="left"
          disabled={!canScrollLeft}
          onClick={() => step(-1)}
          label="Previous project"
        />
        <Arrow
          side="right"
          disabled={!canScrollRight}
          onClick={() => step(1)}
          label="Next project"
          pulse={showHint && !calm}
        />

        <div
          ref={trackRef}
          className={cn(
            "flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth",
            // Room for the hover growth and the hard shadows, plus a lead-in
            // gutter so the first card sits under the left arrow cleanly.
            "px-[max(1.5rem,calc((100vw-72rem)/2))] py-12",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {projects.map((project, index) => (
            <Card
              key={project.title}
              project={project}
              index={index}
              calm={!!calm}
            />
          ))}
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6">
          <Dots count={projects.length} active={activeIndex} />
          <SwipeHint label={swipeHint} visible={showHint} calm={!!calm} />
        </div>
      </div>
    </section>
  );
}

/** Position indicator — the clearest "there are N of these" signal. */
function Dots({ count, active }: { count: number; active: number }) {
  return (
    <div aria-hidden className="flex items-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <motion.span
          key={index}
          className="h-2 rounded-full border-2 border-foreground"
          animate={{
            width: index === active ? 26 : 8,
            backgroundColor:
              index === active
                ? "var(--color-foreground)"
                : "rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      ))}
    </div>
  );
}

/** A hand-written "drag me" note with an icon that slides back and forth. */
function SwipeHint({
  label,
  visible,
  calm,
}: {
  label: string;
  visible: boolean;
  calm: boolean;
}) {
  return (
    <motion.p
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-2 font-hand text-xl text-muted-foreground"
    >
      <motion.span
        animate={calm ? undefined : { x: [-5, 5, -5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-foreground"
      >
        <MoveHorizontal className="size-5" aria-hidden />
      </motion.span>
      {label}
    </motion.p>
  );
}

function Arrow({
  side,
  disabled,
  onClick,
  label,
  pulse = false,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
  label: string;
  pulse?: boolean;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      type="button"
      animate={
        pulse && !disabled
          ? { x: [0, 7, 0], transition: { duration: 1.1, repeat: Infinity, repeatDelay: 1.1 } }
          : { x: 0 }
      }
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-40 flex size-12 -translate-y-1/2 items-center justify-center",
        "rounded-2xl border-4 border-foreground bg-card",
        "shadow-[5px_6px_0_0_var(--color-foreground)] transition-all",
        "hover:-translate-y-[calc(50%+2px)] active:translate-y-[calc(-50%+2px)] active:shadow-[2px_3px_0_0_var(--color-foreground)]",
        "disabled:pointer-events-none disabled:opacity-0",
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6",
      )}
    >
      <Icon className="size-6" aria-hidden />
    </motion.button>
  );
}

function Card({
  project,
  index,
  calm,
}: {
  project: CarouselProject;
  index: number;
  calm: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={calm ? false : { opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={calm ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 2) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      whileHover={calm ? undefined : { scale: 1.05 }}
      className={cn(
        "group relative flex w-[min(88vw,32rem)] shrink-0 snap-center flex-col overflow-hidden",
        "rounded-3xl border-4 border-foreground bg-card",
        "shadow-[10px_12px_0_0_var(--color-foreground)] transition-shadow",
        hovered ? "z-30 shadow-[16px_20px_0_0_var(--color-foreground)]" : "z-10",
      )}
      style={{ transformOrigin: "center" }}
    >
      <div className="relative aspect-[16/10] border-b-4 border-foreground bg-[oklch(0.93_0.03_70)] dark:bg-[oklch(0.24_0.03_280)]">
        {project.image ? (
          hovered && !calm ? (
            // The 3D plaque only exists while the card is hovered, so there is
            // at most one WebGL context alive at a time.
            <ProjectStage src={project.image} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt="" className="size-full object-cover" />
          )
        ) : (
          <Placeholder title={project.title} />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl leading-tight font-bold tracking-tight text-balance sm:text-2xl">
            {project.title}
          </h3>
          <span className="font-tech text-[0.6rem] whitespace-nowrap text-muted-foreground uppercase">
            {project.dates}
          </span>
        </div>

        <p className="font-sans text-base leading-snug text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border-2 border-foreground/70 px-2.5 py-0.5 font-tech text-[0.55rem] uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 font-tech text-[0.65rem] uppercase tracking-wider underline-offset-4 hover:underline"
            >
              Visit <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/** Shown for projects that have no screenshot yet. */
function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex size-full items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_14px,oklch(0.55_0.09_45/0.12)_14px,oklch(0.55_0.09_45/0.12)_28px)]">
      <span className="px-4 text-center font-hand text-2xl text-foreground/60">
        {title}
      </span>
    </div>
  );
}
