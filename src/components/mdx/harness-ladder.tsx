"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "chatbot", name: "Chatbot", adds: "Answers. You send a message, it replies from what it already knows." },
  { id: "rag", name: "RAG", adds: "Knows your docs. Give it a document and its answers are grounded in it." },
  { id: "mcp", name: "MCP", adds: "Uses your tools. It can act on your behalf." },
  { id: "harness", name: "Harness", adds: "Learns and remembers. A system around the model that curates itself over time." },
] as const;

/**
 * Chatbot → RAG → MCP → Harness. Each step wraps the previous one in a new
 * layer (never replaces it). Builds once when scrolled into view; then
 * hover / focus / click a layer to read what it adds. Static if reduced motion.
 */
export function HarnessLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [active, setActive] = useState(3);
  const visible = reduced ? STEPS.length : shown;

  useEffect(() => {
    if (!inView || reduced) return;
    const ids = STEPS.map((_, i) => window.setTimeout(() => setShown(i + 1), 250 + i * 550));
    return () => ids.forEach(window.clearTimeout);
  }, [inView, reduced]);

  const layer = (i: number): React.ReactNode => {
    const step = STEPS[i];
    const on = visible > i;
    const isHarness = step.id === "harness";
    const label = (
      <button
        type="button"
        onMouseEnter={() => setActive(i)}
        onFocus={() => setActive(i)}
        onClick={() => setActive(i)}
        aria-pressed={active === i}
        className={cn(
          "cursor-pointer rounded-md px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold",
          isHarness ? "text-l-gold" : active === i ? "text-l-text" : "text-l-muted hover:text-l-text",
        )}
      >
        {step.name}
      </button>
    );
    if (i === 0)
      return (
        <div
          className={cn(
            "flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl border bg-l-node p-3 transition-all duration-500",
            on ? "border-l-border2 opacity-100" : "border-transparent opacity-0",
            active === 0 && "border-l-hover",
          )}
        >
          {label}
          <span className="font-garamond text-sm text-l-muted">answers</span>
        </div>
      );
    return (
      <div
        className={cn(
          "flex flex-col gap-1.5 rounded-2xl border p-2.5 transition-all duration-500 sm:p-3.5",
          on ? "opacity-100" : "border-transparent",
          on && (isHarness ? "border-l-gold bg-l-gold/5" : "border-l-border2"),
          on && active === i && !isHarness && "border-l-hover",
        )}
      >
        <div className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-0")}>{label}</div>
        {layer(i - 1)}
      </div>
    );
  };

  return (
    <figure ref={ref} className="not-prose my-8 rounded-2xl bg-l-panel p-4 text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] sm:p-6">
      {layer(STEPS.length - 1)}
      <figcaption aria-live="polite" className="mt-4 flex items-baseline gap-2 font-garamond text-[17px] leading-snug">
        <span className={cn("font-mono text-xs uppercase tracking-[0.1em]", active === 3 ? "text-l-gold" : "text-l-muted")}>
          {STEPS[active].name}
        </span>
        <span className="text-l-soft">{STEPS[active].adds}</span>
      </figcaption>
    </figure>
  );
}
