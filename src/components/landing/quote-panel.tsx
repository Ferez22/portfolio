"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Harissa } from "./harissa";

/**
 * A full-viewport quote set in very large display type, with mosaic shards
 * drifting at different depths behind it as you scroll.
 */
export default function QuotePanel({
  id,
  quote,
  eyebrow,
  align = "center",
  withHarissa = false,
  above,
  quoteDelay = 0,
  children,
}: {
  id: string;
  quote: string;
  eyebrow?: string;
  align?: "center" | "left";
  withHarissa?: boolean;
  /** Rendered above the quote, and revealed before it. */
  above?: React.ReactNode;
  /** Seconds to hold the quote back, so `above` lands first. */
  quoteDelay?: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const calm = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const near = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const far = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      id={id}
      ref={ref}
      className="relative flex min-h-dvh w-full items-center overflow-hidden px-6 py-24"
    >
      <ShardField y={calm ? undefined : far} depth="far" />
      <ShardField y={calm ? undefined : near} depth="near" />

      <motion.div
        style={calm ? undefined : { y: textY }}
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8",
          align === "center" ? "items-center text-center" : "items-start text-left",
        )}
      >
        {above && (
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {above}
          </motion.div>
        )}

        {eyebrow && (
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-amber-800/80 dark:text-amber-300/80">
            {eyebrow}
          </span>
        )}

        <motion.blockquote
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: quoteDelay, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-balance"
        >
          {quote}
        </motion.blockquote>

        {withHarissa && <ScrollChili calm={!!calm} />}

        {children}
      </motion.div>
    </section>
  );
}

/**
 * The harissa doubles as the scroll cue: it bobs downward on a loop, like a
 * finger pointing further down the page, and retires once the visitor has
 * actually scrolled.
 */
function ScrollChili({ calm }: { calm: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      animate={
        calm || scrolled
          ? { y: 0, rotate: 0, opacity: scrolled ? 0.35 : 1 }
          : {
              y: [0, 14, 0],
              rotate: [-4, 4, -4],
              opacity: 1,
              transition: {
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
    >
      <Harissa
        className="size-14 text-foreground drop-shadow-[3px_4px_0_oklch(0.22_0.025_35)] dark:drop-shadow-[3px_4px_0_oklch(0.94_0.02_85)]"
        title="Harissa"
      />
    </motion.div>
  );
}

const FIELDS = {
  far: [
    { left: "6%", top: "12%", size: 140, spin: 32 },
    { left: "72%", top: "8%", size: 200, spin: 12 },
    { left: "58%", top: "74%", size: 160, spin: 48 },
  ],
  near: [
    { left: "18%", top: "62%", size: 90, spin: 18 },
    { left: "86%", top: "44%", size: 72, spin: 40 },
    { left: "40%", top: "16%", size: 60, spin: 8 },
  ],
} as const;

function ShardField({
  y,
  depth,
}: {
  y?: ReturnType<typeof useTransform<number, string>>;
  depth: "far" | "near";
}) {
  return (
    <motion.div
      aria-hidden
      style={y ? { y } : undefined}
      className={cn(
        "pointer-events-none absolute inset-0",
        depth === "far" ? "opacity-40 blur-[1px]" : "opacity-70",
      )}
    >
      {FIELDS[depth].map((shard) => (
        <div
          key={`${shard.left}-${shard.top}`}
          className={cn(
            "absolute rounded-[10px] border-2",
            depth === "far"
              ? "border-amber-800/20 bg-amber-700/5 dark:border-amber-300/15"
              : "border-rose-800/25 bg-rose-700/5 dark:border-rose-300/20",
          )}
          style={{
            left: shard.left,
            top: shard.top,
            width: shard.size,
            height: shard.size,
            transform: `rotate(${shard.spin}deg)`,
          }}
        />
      ))}
    </motion.div>
  );
}
