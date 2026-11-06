"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { AudioLines, BookCheck, Brain, PenLine, ScrollText, UserCheck, X } from "lucide-react";
import { rpath } from "@/lib/graph-path";
import { cn } from "@/lib/utils";

type Id = "write" | "review" | "feedback" | "learn" | "learnings" | "voice";
type Layout = "wide" | "tall";
type Side = "top" | "bottom" | "right";
type Pt = [number, number];

const R = 26;
const CANVAS: Record<Layout, { w: number; h: number }> = { wide: { w: 760, h: 380 }, tall: { w: 360, h: 640 } };

/** Track (clockwise loop) corners per layout, starting at write-post. */
const TRACK: Record<Layout, Pt[]> = {
  wide: [[260, 90], [590, 90], [590, 290], [150, 290], [150, 90], [260, 90]],
  tall: [[180, 90], [300, 90], [300, 540], [60, 540], [60, 90], [180, 90]],
};

const POS: Record<Layout, Record<Id, { x: number; y: number; side: Side }>> = {
  wide: {
    write: { x: 260, y: 90, side: "top" },
    review: { x: 480, y: 90, side: "top" },
    feedback: { x: 590, y: 190, side: "right" },
    learn: { x: 480, y: 290, side: "bottom" },
    learnings: { x: 260, y: 290, side: "bottom" },
    voice: { x: 370, y: 190, side: "bottom" },
  },
  tall: {
    write: { x: 180, y: 90, side: "top" },
    review: { x: 300, y: 230, side: "bottom" },
    feedback: { x: 300, y: 400, side: "bottom" },
    learn: { x: 180, y: 540, side: "bottom" },
    learnings: { x: 60, y: 315, side: "bottom" },
    voice: { x: 180, y: 450, side: "right" },
  },
};

/** The dashed "you approve" route: learn → voice.md → write-post. */
const APPROVE: Record<Layout, Pt[][]> = {
  wide: [
    [[480, 264], [480, 190], [396, 190]],
    [[344, 190], [260, 190], [260, 116]],
  ],
  tall: [
    [[180, 514], [180, 476]],
    [[180, 424], [180, 116]],
  ],
};

const NODES: Record<Id, { file: string; sub: string; job: string; example: string; gold?: boolean; Icon: typeof PenLine }> = {
  write: {
    file: "write-post",
    sub: "drafts in your voice",
    job: "Drafts in your voice: 3 hooks, 1 draft and a variant per platform, saved in posts/.",
    example: "posts/YYYY-MM-DD_<slug>.md  Status: draft",
    gold: true,
    Icon: PenLine,
  },
  review: {
    file: "you review",
    sub: "edit, reject, approve",
    job: "You edit, reject or approve. Edits and rejections are logged. You are the one who presses publish.",
    example: "approve → you post it",
    Icon: UserCheck,
  },
  feedback: {
    file: "feedback-log.md",
    sub: "every correction, dated",
    job: "memory/feedback-log.md: every correction, raw and dated. Never deleted.",
    example: "YYYY-MM-DD | what the owner changed | why (their words) | rule it suggests",
    Icon: ScrollText,
  },
  learn: {
    file: "learn",
    sub: "finds what repeats",
    job: "Finds lessons that repeat. One correction is an anecdote, two is a pattern.",
    example: "weekly review, or after 5 new corrections",
    gold: true,
    Icon: Brain,
  },
  learnings: {
    file: "learnings.md",
    sub: "confirmed rules",
    job: "memory/learnings.md: confirmed rules, read at every session start. They beat the defaults.",
    example: "YYYY-MM-DD | rule | evidence (feedback lines, post results)",
    Icon: BookCheck,
  },
  voice: {
    file: "voice.md",
    sub: "your voice guide",
    job: "brand/voice.md: your voice guide. It only changes through proposals you approve.",
    example: "Status: missing | Version: 0.0 | Validated: -",
    Icon: AudioLines,
  },
};

/** Neighbours for focus: the loop order plus the approve branch. */
const LINKS: [Id, Id][] = [
  ["write", "review"],
  ["review", "feedback"],
  ["feedback", "learn"],
  ["learn", "learnings"],
  ["learnings", "write"],
  ["learn", "voice"],
  ["voice", "write"],
];

const PACKET = 40;
const CARD_W = 250;

/**
 * The self-improvement loop, drawn like the landing agent graph: round nodes
 * on a clockwise track with travelling packets, a dashed "you approve" branch
 * through voice.md. Hover/focus dims the rest; click opens the file card
 * (Esc, × or a click on the canvas closes). Static under reduced motion.
 */
export function HarnessLoop() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(0);
  const [sel, setSel] = useState<Id | null>(null);
  const [hovered, setHovered] = useState<Id | null>(null);
  const active = sel ?? hovered;

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel]);

  const layout: Layout = width >= 600 ? "wide" : "tall";
  const { w: W, h: H } = CANVAS[layout];
  const scale = width ? Math.min(1, width / W) : 0;
  const track = rpath(TRACK[layout], 34);
  const approve = APPROVE[layout].map((p) => rpath(p, 12).d);
  const near = new Set<Id>(active ? [active] : []);
  if (active) LINKS.forEach(([a, b]) => (a === active ? near.add(b) : b === active && near.add(a)));
  const dim = (id: Id) => !!active && !near.has(id);
  const approveLit = !!active && ["learn", "voice", "write"].includes(active);

  const card = sel && (() => {
    const n = POS[layout][sel];
    const left = n.x < W / 2 ? n.x + R + 16 : n.x - R - 16 - CARD_W;
    const top = Math.max(8, Math.min(H - 170, n.y - 40));
    return { n, left: Math.max(8, Math.min(W - CARD_W - 8, left)), top };
  })();

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl bg-l-panel text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)]">
      <div className="flex items-center justify-between px-4 pt-3 font-mono text-[11px] text-l-dim">
        <span>
          ~/marketing-harness/<span className="text-l-muted">loop.flow</span>
        </span>
        <span className="hidden sm:inline">click a step to see the file behind it</span>
      </div>
      <div ref={wrap} className="relative w-full" style={{ height: H * scale }} onClick={() => setSel(null)}>
        {scale > 0 && (
          <div className="absolute left-1/2 top-0" style={{ width: W, height: H, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "50% 0" }}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0" aria-hidden>
              <path d={track.d} fill="none" className="stroke-l-edge" strokeWidth={1.25} style={{ opacity: active && !near.size ? 0.25 : 1 }} />
              {!reduced &&
                [0, 1, 2].map((i) => (
                  <path
                    key={i}
                    d={track.d}
                    fill="none"
                    stroke="#F2C46A"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeDasharray={`${PACKET} ${track.len - PACKET}`}
                    opacity={active ? 0.35 : 0.9}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values={`${track.len};0`}
                      dur="7.5s"
                      begin={`${-(i * 2.5)}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                ))}
              {approve.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#F2C46A"
                  strokeOpacity={approveLit || !active ? 0.65 : 0.2}
                  strokeWidth={1.25}
                  strokeDasharray="5 5"
                />
              ))}
              <text
                x={layout === "wide" ? 490 : 192}
                y={layout === "wide" ? 232 : 500}
                fill="#F2C46A"
                fillOpacity={approveLit || !active ? 0.9 : 0.3}
                fontSize="11"
                className="font-mono"
              >
                you approve
              </text>
            </svg>

            {(Object.keys(NODES) as Id[]).map((id) => {
              const n = POS[layout][id];
              const meta = NODES[id];
              const { Icon } = meta;
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSel((cur) => (cur === id ? null : id));
                  }}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(id)}
                  onBlur={() => setHovered(null)}
                  aria-expanded={sel === id}
                  aria-haspopup="dialog"
                  aria-label={`${meta.file}, ${meta.sub}`}
                  className="group absolute cursor-pointer rounded-full transition-[opacity,filter] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold"
                  style={{ left: n.x - R, top: n.y - R, width: R * 2, height: R * 2, opacity: dim(id) ? 0.18 : 1, filter: dim(id) ? "blur(1.5px)" : "none" }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -inset-2.5 rounded-full bg-l-gold/10 ring-1 ring-l-gold/25 transition-[opacity,scale] duration-300",
                      isActive ? "scale-100 opacity-100" : "scale-90 opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "relative flex size-full items-center justify-center rounded-full border bg-l-node shadow-[0_10px_24px_rgba(0,0,0,.45)] transition-colors",
                      sel === id ? "border-l-gold" : "border-l-border2 group-hover:border-l-hover",
                    )}
                  >
                    <Icon className={cn("size-5", meta.gold ? "text-l-gold" : "text-l-text")} aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "absolute flex flex-col gap-px whitespace-nowrap rounded-md bg-l-panel px-1.5 py-0.5 leading-tight",
                      n.side === "right" ? "left-full top-1/2 ml-2 -translate-y-1/2 items-start text-left" : "left-1/2 -translate-x-1/2 items-center text-center",
                      n.side === "top" && "bottom-full mb-2",
                      n.side === "bottom" && "top-full mt-2",
                    )}
                  >
                    <span className="font-mono text-xs text-l-text">{meta.file}</span>
                    <span className="font-garamond text-sm text-l-muted">{meta.sub}</span>
                  </span>
                </button>
              );
            })}

            {card && sel && (
              <div
                role="dialog"
                aria-label={NODES[sel].file}
                onClick={(e) => e.stopPropagation()}
                className="absolute z-10 rounded-xl border border-l-border2 bg-l-pop p-3 opacity-100 backdrop-blur-none shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)]"
                style={{ left: card.left, top: card.top, width: CARD_W }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs text-l-gold">{NODES[sel].file}</span>
                  <button
                    type="button"
                    onClick={() => setSel(null)}
                    aria-label="Close"
                    className="-m-1 cursor-pointer rounded p-1 text-l-muted hover:text-l-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold"
                  >
                    <X className="size-3.5" aria-hidden />
                  </button>
                </div>
                <p className="m-0 mt-1.5 font-garamond text-[15px] leading-snug text-l-soft">{NODES[sel].job}</p>
                {/* span, not <code>: the global prose code style forces its own colours */}
                <span className="mt-2 block rounded-md bg-l-node px-2 py-1.5 font-mono text-[11px] leading-relaxed break-words text-l-muted">
                  {NODES[sel].example}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </figure>
  );
}
