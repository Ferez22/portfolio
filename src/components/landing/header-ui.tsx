"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Segmented tabs: a darker pill slides under the active tab. The pill reads
 * the active button's offsetLeft/offsetWidth and animates left+width
 * (cubic-bezier(.65,0,.35,1), .4s); labels crossfade to white as it arrives.
 */
export function SegmentedTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  const refs = useRef(new Map<T, HTMLButtonElement>());
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current.get(value);
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    // Labels change width with locale/font load.
    const ro = new ResizeObserver(measure);
    refs.current.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [value]);

  return (
    <nav role="tablist" className="relative flex rounded-full bg-l-gold/20 p-1">
      {pill && (
        <span
          aria-hidden
          className="absolute inset-y-1 rounded-full bg-[#B5541F] shadow-[0_4px_14px_rgba(0,0,0,.35)] transition-[left,width] duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ left: pill.left, width: pill.width }}
        />
      )}
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => {
            if (el) refs.current.set(tab.id, el);
            else refs.current.delete(tab.id);
          }}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative cursor-pointer rounded-full px-3.5 py-2 font-garamond text-base leading-none transition-colors duration-400 sm:px-[18px] sm:text-[17px]",
            value === tab.id ? "text-white" : "text-foreground/70 hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

/**
 * CTA with a direction-aware fill: on hover an amber circle grows from the
 * point where the cursor entered (CSS in globals.css `.direction-btn`).
 */
export function DirectionButton({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  const [active, setActive] = useState(false);
  const [edge, setEdge] = useState({ x: "50%", y: "50%" });
  const at = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setEdge({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
  };
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={(e) => {
        at(e);
        setActive(true);
      }}
      onMouseLeave={(e) => {
        at(e);
        setActive(false);
      }}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={{ "--edge-x": edge.x, "--edge-y": edge.y } as React.CSSProperties}
      className={cn(
        "direction-btn relative isolate cursor-pointer overflow-hidden whitespace-nowrap rounded-full border border-amber-700/40 bg-l-gold/15 px-[18px] py-[9px] font-garamond text-[17px] leading-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold dark:border-l-gold/50",
        active ? "active text-l-bg" : "text-amber-800 dark:text-l-gold",
        className,
      )}
    >
      <i aria-hidden className="-z-10" />
      {children}
    </button>
  );
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&@0123456789abcdef";

/**
 * Text that decodes from random glyphs into `text`, left to right: every
 * ~35ms unsettled characters are re-randomised; character i locks once
 * frame - i·2 ≥ 0. Re-runs whenever `trigger` changes (0 = idle).
 */
export function DecodeText({
  text,
  trigger,
  className,
  scrambleFirst = false,
}: {
  text: string;
  trigger: number;
  className?: string;
  /** Start from a neutral mask (SSR-stable) instead of the final text. */
  scrambleFirst?: boolean;
}) {
  const [out, setOut] = useState(() => (scrambleFirst ? text.replace(/\S/g, "·") : text));
  useEffect(() => {
    if (trigger === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setOut(text), 0);
      return () => window.clearTimeout(id);
    }
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const done = frame - (text.length - 1) * 2 >= 0;
      setOut(
        done
          ? text
          : [...text]
              .map((ch, i) => (ch === "." || frame - i * 2 >= 0 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
              .join(""),
      );
      if (done) window.clearInterval(id);
    }, 35);
    return () => window.clearInterval(id);
  }, [trigger, text]);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
