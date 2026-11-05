"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { Blocks, BookOpen, Calendar, Check, Contact, Mail, Package } from "lucide-react";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NodePopover, buildPreview, handleOf, type PreviewCtx } from "./node-preview";

type NodeId =
  | "agent"
  | "qartmina"
  | "products"
  | "kb"
  | "crm"
  | "mcp"
  | "github"
  | "youtube"
  | "linkedin"
  | "x"
  | "instagram"
  | "email"
  | "call"
  | "soundcloud";
type Kind = "page" | "dialog" | "external";
type LayoutName = "wide" | "tall";
/** Centre (canvas px), circle radius, label block height below the circle. */
type Geo = { x: number; y: number; r: number; lb: number };

/** Canvas per layout: nodes live in these coordinates, then the canvas is scaled to fit. */
const CANVAS: Record<LayoutName, { w: number; h: number }> = {
  wide: { w: 1200, h: 700 },
  tall: { w: 520, h: 1000 },
};

const hub = (x: number, y: number): Geo => ({ x, y, r: 32, lb: 54 });
const leaf = (x: number, y: number): Geo => ({ x, y, r: 24, lb: 30 });

const GEO: Record<LayoutName, Record<NodeId, Geo>> = {
  wide: {
    agent: { x: 600, y: 330, r: 46, lb: 60 },
    qartmina: hub(600, 70),
    products: hub(600, 580),
    kb: hub(360, 220),
    crm: hub(840, 220),
    mcp: hub(360, 470),
    github: hub(840, 470),
    youtube: leaf(110, 90),
    linkedin: leaf(110, 250),
    x: leaf(110, 410),
    instagram: leaf(110, 570),
    email: leaf(1090, 150),
    call: leaf(1090, 310),
    soundcloud: leaf(1090, 540),
  },
  tall: {
    agent: { x: 260, y: 470, r: 46, lb: 60 },
    qartmina: hub(260, 90),
    products: hub(260, 860),
    kb: hub(150, 290),
    crm: hub(370, 290),
    mcp: hub(150, 660),
    github: hub(370, 660),
    youtube: leaf(40, 110),
    linkedin: leaf(40, 230),
    x: leaf(40, 420),
    instagram: leaf(40, 560),
    email: leaf(480, 130),
    call: leaf(480, 420),
    soundcloud: leaf(480, 800),
  },
};

/** Edges in draw order (a → b). Kind colours line + packet; b connects when drawn. */
const EDGES: [NodeId, NodeId, Kind][] = [
  ["agent", "mcp", "page"],
  ["agent", "kb", "page"],
  ["agent", "crm", "dialog"],
  ["agent", "github", "external"],
  ["agent", "qartmina", "external"],
  ["agent", "products", "page"],
  ["kb", "youtube", "external"],
  ["kb", "linkedin", "external"],
  ["kb", "x", "external"],
  ["kb", "instagram", "external"],
  ["crm", "email", "dialog"],
  ["crm", "call", "dialog"],
  ["github", "soundcloud", "external"],
];
/** Intro timeline (~5s): agent, then one edge every STEP seconds. */
const AGENT_AT = 0.1;
const STEP = 0.35;
const edgeAt = (i: number) => 0.3 + i * STEP;
const nodeAt = (id: NodeId) => {
  const i = EDGES.findIndex(([, b]) => b === id);
  return i < 0 ? AGENT_AT : edgeAt(i) + STEP;
};

const COL: Record<Kind, string> = { page: "#B06A4E", dialog: "#E8713C", external: "#F0A830" };
const LEGEND: Record<Kind, string> = { page: "#9A5B45", dialog: "#E8713C", external: "#F0A830" };

/** Orthogonal polyline → rounded SVG path + length (for packet dashes). */
function rpath(pts: [number, number][], r = 14) {
  const p = pts.filter((q, i) => i === 0 || q[0] !== pts[i - 1][0] || q[1] !== pts[i - 1][1]);
  const c: [number, number][] = [p[0]];
  for (let i = 1; i < p.length - 1; i++) {
    const [a, b, d] = [c[c.length - 1], p[i], p[i + 1]];
    if ((a[0] === b[0] && b[0] === d[0]) || (a[1] === b[1] && b[1] === d[1])) continue;
    c.push(b);
  }
  c.push(p[p.length - 1]);
  let len = 0;
  for (let i = 1; i < c.length; i++) len += Math.hypot(c[i][0] - c[i - 1][0], c[i][1] - c[i - 1][1]);
  let s = `M${c[0][0]} ${c[0][1]}`;
  for (let i = 1; i < c.length - 1; i++) {
    const [a, b, d] = [c[i - 1], c[i], c[i + 1]];
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const l2 = Math.hypot(d[0] - b[0], d[1] - b[1]);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    s += ` L${b[0] - ((b[0] - a[0]) / l1) * rr} ${b[1] - ((b[1] - a[1]) / l1) * rr} Q${b[0]} ${b[1]} ${b[0] + ((d[0] - b[0]) / l2) * rr} ${b[1] + ((d[1] - b[1]) / l2) * rr}`;
  }
  const e = c[c.length - 1];
  return { d: `${s} L${e[0]} ${e[1]}`, len: Math.round(len) };
}

/**
 * Route between two nodes: side-to-side with a mid vertical when far apart
 * horizontally, else bottom-of-label to top with a mid horizontal.
 */
function route(A: Geo, B: Geo, fromAgent: boolean) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  if (Math.abs(dx) > A.r + B.r + 20) {
    const sx = A.x + Math.sign(dx) * A.r;
    const ex = B.x - Math.sign(dx) * B.r;
    const sy = fromAgent && dy !== 0 ? A.y + Math.sign(dy) * 14 : A.y;
    const mx = Math.round((sx + ex) / 2);
    return rpath([[sx, sy], [mx, sy], [mx, B.y], [ex, B.y]]);
  }
  const sy = dy > 0 ? A.y + A.r + A.lb : A.y - A.r;
  const ey = dy > 0 ? B.y - B.r : B.y + B.r + B.lb;
  const my = Math.round((sy + ey) / 2);
  return rpath([[A.x, sy], [A.x, my], [B.x, my], [B.x, ey]]);
}

const PACKET = 44;

export function AgentGraph({ ctx }: { ctx: PreviewCtx }) {
  const l = ctx.dict.landing;
  const wrap = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [sel, setSel] = useState<NodeId | null>(null);
  const [hovered, setHovered] = useState<NodeId | null>(null);
  /** Focus styling follows the open card, else the hovered node. */
  const active = sel ?? hovered;
  // Packets run unless the visitor prefers reduced motion or paused them.
  const reduced = useReducedMotion();
  const [toggled, setToggled] = useState<boolean | null>(null);
  const running = toggled ?? !reduced;

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const layout: LayoutName = box.w >= 760 ? "wide" : "tall";
  const { w: W, h: H } = CANVAS[layout];
  const geo = GEO[layout];
  const scale = Math.max(0.3, Math.min(1.25, (box.w - 24) / W, (box.h - 70) / H));
  const routes = EDGES.map(([a, b, kind]) => ({ a, b, kind, ...route(geo[a], geo[b], a === "agent") }));

  const near = new Set<NodeId>(active ? [active] : []);
  if (active) EDGES.forEach(([a, b]) => (a === active ? near.add(b) : b === active && near.add(a)));

  const spec = sel ? buildPreview(sel, ctx) : null;
  const popover = spec && <NodePopover spec={spec} copiedLabel={l.copied} openLabel={l.open} />;

  const icon = (id: NodeId) => {
    const gold = "size-[26px] text-l-gold";
    const leafIc = "size-[22px] text-l-text";
    switch (id) {
      case "agent":
        return <img src={DATA.avatarUrl} alt="" className="size-full rounded-full object-cover" />;
      case "qartmina":
        return <img src="/qartmina-q.png" alt="" className="ml-1 h-[30px] w-auto" />;
      case "products":
        return <Package className={gold} />;
      case "kb":
        return <BookOpen className={gold} />;
      case "crm":
        return <Contact className={gold} />;
      case "mcp":
        return <Blocks className={gold} />;
      case "github":
        return <Icons.github className="size-[26px] text-l-text" />;
      case "email":
        return <Mail className={leafIc} />;
      case "call":
        return <Calendar className={leafIc} />;
      case "youtube":
        return <Icons.youtube className={leafIc} />;
      case "linkedin":
        return <Icons.linkedin className={leafIc} />;
      case "x":
        return <Icons.x className="size-5 text-l-text" />;
      case "instagram":
        return <Icons.instagram className={leafIc} />;
      case "soundcloud":
        return <Icons.soundcloud className="size-7 text-l-text" />;
    }
  };
  const label = (id: NodeId): [string, string?] => {
    const s = DATA.contact.social;
    switch (id) {
      case "agent":
        return ["Agent", l.agentSub];
      case "qartmina":
        return ["Qartmina", l.founder];
      case "products":
        return [l.tabProducts, l.productsSub];
      case "kb":
        return ["Knowledge Base", l.kbSub];
      case "crm":
        return ["CRM", l.crmSub];
      case "mcp":
        return ["MCP", l.mcpSub];
      case "github":
        return ["GitHub", handleOf(s.GitHub.url)];
      case "email":
        return [l.email];
      case "call":
        return [ctx.dict.contact.bookCall];
      case "youtube":
        return [handleOf(s.Youtube.url)];
      case "linkedin":
        return [handleOf(s.LinkedIn.url)];
      case "x":
        return [handleOf(s.X.url)];
      case "instagram":
        return [handleOf(s.Instagram.url)];
      case "soundcloud":
        return [handleOf(s.Soundcloud.url)];
    }
  };

  // Card placement inside the canvas (wide only): beside the node, clamped vertically.
  let popPos: { left: number; top: number } | null = null;
  if (spec && sel && layout === "wide") {
    const n = geo[sel];
    const ph = 56 + spec.items.length * 44 + (spec.extra ? 90 : 0);
    popPos = {
      left: sel === "agent" || n.x < W / 2 ? n.x + n.r + 22 : n.x - n.r - 22 - 320,
      top: Math.max(10, Math.min(H - 10 - ph, n.y - 36)),
    };
  }

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-0 flex-1 overflow-hidden rounded-3xl bg-l-panel shadow-[0_30px_80px_-24px_rgba(0,0,0,.8)]">
        <div ref={wrap} onClick={() => setSel(null)} className="absolute inset-0 overflow-hidden">
          {box.w > 0 && (
            <div
              className="absolute left-1/2 top-[47%]"
              style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: "50% 50%" }}
            >
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
                {routes.map((r, i) => {
                  const hi = !!active && (r.a === active || r.b === active);
                  const showPacket = running && (!active || hi);
                  const dur = `${(2.8 + ((i * 0.43) % 1.8)).toFixed(2)}s`;
                  const begin = `${(-((i * 0.77) % 3)).toFixed(2)}s`;
                  return (
                    <g key={r.a + r.b} style={{ opacity: active && !hi ? 0.25 : 1, transition: "opacity .25s" }}>
                      <motion.path
                        d={r.d}
                        fill="none"
                        stroke={hi ? COL[r.kind] : "var(--color-l-edge)"}
                        strokeOpacity={hi ? 0.8 : 1}
                        strokeWidth={hi ? 1.5 : 1.25}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: edgeAt(i), duration: STEP, ease: "easeInOut" }}
                      />
                      {showPacket && (
                        <motion.path
                          d={r.d}
                          fill="none"
                          stroke={COL[r.kind]}
                          strokeWidth={hi ? 2 : 1.75}
                          strokeLinecap="round"
                          strokeDasharray={`${PACKET} ${r.len + PACKET}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: edgeAt(i) + STEP, duration: 0.3 }}
                        >
                          <animate attributeName="stroke-dashoffset" values={`${PACKET};${-r.len}`} dur={dur} begin={begin} repeatCount="indefinite" />
                        </motion.path>
                      )}
                    </g>
                  );
                })}
              </svg>

              {(Object.keys(geo) as NodeId[]).map((id) => {
                const n = geo[id];
                const size = n.r * 2;
                const isLeaf = n.r === 24;
                const dim = !!active && !near.has(id);
                const hot = active === id;
                const [name, sub] = label(id);
                const at = nodeAt(id);
                return (
                  <motion.div
                    key={id}
                    className="absolute"
                    style={{ left: n.x - n.r, top: n.y - n.r, width: size, height: size }}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: at, type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSel((cur) => (cur === id ? null : id));
                      }}
                      aria-label={sub ? `${name}, ${sub}` : name}
                      aria-expanded={sel === id}
                      aria-haspopup="dialog"
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      className="group relative block size-full cursor-pointer rounded-full transition-[opacity,filter] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold"
                      style={{ opacity: dim ? 0.18 : 1, filter: dim ? "blur(1.5px)" : "none" }}
                    >
                      {/* hover / focus halo */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -inset-3 rounded-full bg-l-gold/10 ring-1 ring-l-gold/25 transition-[opacity,scale] duration-300",
                          hot ? "scale-100 opacity-100" : "scale-90 opacity-0",
                        )}
                      />
                      {id === "agent" ? (
                        <span className="box-border block size-full rounded-full border-2 border-[#4A3A22] bg-l-node p-1 shadow-[0_0_0_6px_rgba(242,196,106,.04),0_16px_40px_rgba(0,0,0,.5),0_0_40px_rgba(240,168,48,.08)]">
                          <span className="block size-full overflow-hidden rounded-full bg-[#1E2134]">{icon(id)}</span>
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "box-border flex size-full items-center justify-center rounded-full border transition-colors",
                            id === "qartmina"
                              ? "border-l-text bg-l-text shadow-[0_12px_30px_rgba(0,0,0,.45),0_0_30px_rgba(242,196,106,.1)]"
                              : "border-l-border2 bg-l-node group-hover:border-l-hover",
                            id === "qartmina"
                              ? ""
                              : isLeaf
                                ? "shadow-[0_10px_24px_rgba(0,0,0,.45)]"
                                : "shadow-[0_12px_30px_rgba(0,0,0,.45),0_0_30px_rgba(240,168,48,.05)]",
                          )}
                        >
                          {icon(id)}
                        </span>
                      )}

                      {id !== "agent" && (
                        <motion.span
                          aria-hidden
                          className={cn(
                            "absolute box-border flex items-center justify-center rounded-full border-2 border-l-panel bg-[#0E3B2C] text-[#34D399]",
                            isLeaf ? "-right-[5px] -top-[3px] size-[17px]" : "-right-1.5 -top-0.5 size-5",
                          )}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: at + 0.15, type: "spring", stiffness: 420, damping: 18 }}
                        >
                          <Check className={isLeaf ? "size-[9px]" : "size-[11px]"} strokeWidth={3} />
                        </motion.span>
                      )}

                      <span
                        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-px whitespace-nowrap font-garamond leading-tight"
                        style={{ top: size + 10 }}
                      >
                        {isLeaf ? (
                          <span className={cn("text-sm text-l-muted", layout === "tall" && "sr-only")}>{name}</span>
                        ) : (
                          <>
                            <span className={cn("font-medium text-l-text", id === "agent" ? "text-xl" : "text-lg")}>{name}</span>
                            {sub && <span className={cn("text-l-muted", id === "agent" ? "text-base" : "text-[15px]")}>{sub}</span>}
                          </>
                        )}
                      </span>

                      {sel === id && (
                        <span
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute rounded-full border-[1.5px] border-l-gold",
                            id === "agent" ? "-inset-2" : isLeaf ? "-inset-1.5" : "-inset-[7px]",
                          )}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}

              {popPos && (
                <motion.div
                  role="dialog"
                  aria-label={spec!.title}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute z-10"
                  style={popPos}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.16 }}
                >
                  {popover}
                </motion.div>
              )}
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute left-5 top-4 font-mono text-xs text-l-dim">
          ~/workflows/<span className="text-l-muted">fares-agent.flow</span>
        </div>
        <button
          type="button"
          onClick={() => setToggled(!running)}
          className="absolute right-4 top-3 min-w-[84px] cursor-pointer whitespace-nowrap rounded-full border border-l-border2 bg-l-node px-3 py-1.5 font-mono text-xs text-l-muted transition-colors hover:border-l-hover hover:text-l-text"
        >
          {running ? l.pause : l.run}
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-x-7 gap-y-1 font-garamond text-[17px] text-l-muted">
          {(["page", "dialog", "external"] as const).map((k) => (
            <span key={k} className="flex items-center gap-2.5">
              <span className="h-0.5 w-[22px] rounded-sm" style={{ background: LEGEND[k] }} />
              {k === "page" ? l.legendPage : k === "dialog" ? l.legendDialog : l.legendExternal}
            </span>
          ))}
        </div>

        {/* Phones: the open card docks to the bottom of the screen (portal escapes main's z-context). */}
        {spec &&
          layout === "tall" &&
          createPortal(
            <motion.div
              role="dialog"
              aria-label={spec.title}
              className="fixed inset-x-3 bottom-3 z-50 flex justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              {popover}
            </motion.div>,
            document.body,
          )}
      </section>
    </MotionConfig>
  );
}
