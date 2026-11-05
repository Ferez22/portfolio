"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const C = 180;
const R = 130;
const at = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
};

/** Loop nodes in order (clockwise from the top); `voice` sits in the centre. */
const NODES = [
  {
    id: "write",
    label: "write-post",
    pos: at(-90),
    file: ".claude/skills/write-post/",
    job: "Drafts in your voice: 3 hooks, 1 draft and a variant per platform, saved in posts/.",
    example: "posts/YYYY-MM-DD_<slug>.md  Status: draft",
  },
  {
    id: "review",
    label: "you review",
    pos: at(-18),
    file: "You",
    job: "You edit, reject or approve. Edits and rejections are logged. You are the one who presses publish.",
    example: "approve → you post it",
  },
  {
    id: "feedback",
    label: "feedback-log.md",
    pos: at(54),
    file: "memory/feedback-log.md",
    job: "Every correction, raw and dated. Never deleted.",
    example: "YYYY-MM-DD | what the owner changed | why (their words) | rule it suggests",
  },
  {
    id: "learn",
    label: "learn",
    pos: at(126),
    file: ".claude/skills/learn/",
    job: "Finds lessons that repeat. One correction is an anecdote, two is a pattern.",
    example: "weekly review, or after 5 new corrections",
  },
  {
    id: "learnings",
    label: "learnings.md",
    pos: at(198),
    file: "memory/learnings.md",
    job: "Confirmed rules, read at every session start. They beat the defaults.",
    example: "YYYY-MM-DD | rule | evidence (feedback lines, post results)",
  },
  {
    id: "voice",
    label: "voice.md",
    pos: { x: C, y: C + 10 },
    file: "brand/voice.md",
    job: "Your voice guide. It only changes through proposals you approve.",
    example: "Status: missing | Version: 0.0 | Validated: -",
  },
] as const;
type Id = (typeof NODES)[number]["id"];

const pct = (v: number) => `${(v / (C * 2)) * 100}%`;

/**
 * The self-improvement loop: write-post → you review → feedback-log.md →
 * learn → learnings.md (+ voice.md, dashed: you approve) → write-post.
 * A dot travels the loop (static if reduced motion). Click a node for its
 * file, job and an example line; Esc or × closes.
 */
export function HarnessLoop() {
  const reduced = useReducedMotion();
  const [sel, setSel] = useState<Id | null>(null);
  const node = NODES.find((n) => n.id === sel);
  const learn = NODES[3].pos;
  const write = NODES[0].pos;
  const voice = NODES[5].pos;

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel]);

  // Clockwise circle starting at the top (write-post).
  const loop = `M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R} Z`;

  return (
    <figure className="not-prose my-8 rounded-2xl bg-l-panel p-3 text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] sm:p-6">
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <svg viewBox={`0 0 ${C * 2} ${C * 2}`} className="absolute inset-0 size-full" aria-hidden>
          <defs>
            <marker id="hl-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="var(--color-l-edge)" />
            </marker>
          </defs>
          <path d={loop} fill="none" stroke="var(--color-l-edge)" strokeWidth="1.5" />
          {/* direction ticks between nodes */}
          {[-54, 18, 90, 162, 234].map((deg) => {
            const p = at(deg);
            const q = at(deg + 1);
            return <line key={deg} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="transparent" markerEnd="url(#hl-arrow)" />;
          })}
          <path d={`M ${learn.x} ${learn.y} L ${voice.x} ${voice.y}`} stroke="#F2C46A" strokeOpacity=".6" strokeDasharray="5 5" strokeWidth="1.5" />
          <path d={`M ${voice.x} ${voice.y} L ${write.x} ${write.y + 18}`} stroke="#F2C46A" strokeOpacity=".6" strokeDasharray="5 5" strokeWidth="1.5" markerEnd="url(#hl-arrow)" />
          <text x={(learn.x + voice.x) / 2 + 10} y={(learn.y + voice.y) / 2 + 14} fill="#F2C46A" fontSize="11" className="font-mono">
            you approve
          </text>
          {!reduced && (
            <circle r="5" fill="#F2C46A">
              <animateMotion dur="9s" repeatCount="indefinite" path={loop} />
            </circle>
          )}
        </svg>

        {NODES.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setSel((cur) => (cur === n.id ? null : n.id))}
            aria-expanded={sel === n.id}
            aria-haspopup="dialog"
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold sm:text-xs",
              n.id === "voice" ? "border-l-gold/50 bg-l-gold/10 text-l-gold" : "border-l-border2 bg-l-node text-l-text hover:border-l-hover",
              sel === n.id && "border-l-gold",
            )}
            style={{ left: pct(n.pos.x), top: pct(n.pos.y) }}
          >
            {n.label}
          </button>
        ))}

        {node && (
          <div
            role="dialog"
            aria-label={node.file}
            className="absolute left-1/2 top-1/2 z-10 w-[min(280px,86%)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-l-border2 bg-l-pop p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-l-gold">{node.file}</span>
              <button
                type="button"
                onClick={() => setSel(null)}
                aria-label="Close"
                className="-m-1 cursor-pointer rounded p-1 text-l-muted hover:text-l-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </div>
            <p className="m-0 mt-1.5 font-garamond text-[15px] leading-snug text-l-soft">{node.job}</p>
            <code className="mt-2 block rounded-md bg-l-node px-2 py-1.5 font-mono text-[11px] leading-relaxed break-words text-l-muted">
              {node.example}
            </code>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-l-dim">click a step to see the file behind it</figcaption>
    </figure>
  );
}
