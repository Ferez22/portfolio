"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MotionConfig, motion } from "motion/react";
import { Blocks, BookOpen, Calendar, Check, Contact, Mail } from "lucide-react";
import { DATA } from "@/data/resume";
import CtaSection from "@/components/section/cta-section";
import { NewsletterCard } from "@/components/newsletter/newsletter-form";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GithubData } from "@/lib/github";
import { cn } from "@/lib/utils";
import { GraphDialog } from "./graph-dialog";
import { NodePreview, handleOf, type PostPreview } from "./node-preview";

type NodeId =
  | "agent"
  | "kb"
  | "mcp"
  | "github"
  | "crm"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "x"
  | "soundcloud"
  | "email"
  | "calendar";
type Kind = "page" | "dialog" | "external";
type Size = "agent" | "hub" | "leaf";
type Pos = readonly [x: number, y: number];
type LayoutName = "wide" | "tall";

const HUBS: NodeId[] = ["kb", "mcp", "github", "crm"];
const SOCIAL_KEY = {
  github: "GitHub",
  linkedin: "LinkedIn",
  youtube: "Youtube",
  instagram: "Instagram",
  x: "X",
  soundcloud: "Soundcloud",
} as const satisfies Partial<Record<NodeId, keyof typeof DATA.contact.social>>;

const KIND: Record<NodeId, Kind> = {
  agent: "page",
  kb: "page",
  mcp: "page",
  crm: "dialog",
  github: "external",
  linkedin: "external",
  youtube: "external",
  instagram: "external",
  x: "external",
  soundcloud: "external",
  email: "external",
  calendar: "external",
};

/**
 * What a click does. link: navigate/open URL (socials, label = @handle).
 * preview: toggle the node's NodePreview card. dialog: open contact dialog.
 */
type Action = "link" | "preview" | "dialog";
const ACTION: Record<NodeId, Action> = {
  agent: "preview",
  kb: "preview",
  mcp: "preview",
  github: "preview",
  crm: "dialog",
  email: "preview",
  calendar: "preview",
  linkedin: "link",
  youtube: "link",
  instagram: "link",
  x: "link",
  soundcloud: "link",
};

/**
 * Meaning (edges): agent → hubs kb, mcp, crm, github · mcp ↔ {agent, kb} only
 * (tools I built) · crm → email, calendar · socials = contact + knowledge ⇒
 * each → {agent, kb, crm}. Placement is deliberately scattered (agent-workflow
 * look), not tiered. Node centres as canvas fractions; wide if w ≥ 1.15h.
 */
const SOCIALS = ["linkedin", "youtube", "x", "instagram", "soundcloud"] as const;

const POS: Record<LayoutName, Record<NodeId, Pos>> = {
  wide: {
    agent: [0.5, 0.48],
    kb: [0.34, 0.32],
    crm: [0.66, 0.32],
    mcp: [0.34, 0.68],
    github: [0.62, 0.72],
    email: [0.86, 0.17],
    calendar: [0.9, 0.5],
    linkedin: [0.19, 0.17],
    youtube: [0.53, 0.08],
    x: [0.09, 0.47],
    instagram: [0.15, 0.85],
    soundcloud: [0.83, 0.85],
  },
  tall: {
    agent: [0.5, 0.46],
    kb: [0.28, 0.3],
    crm: [0.72, 0.3],
    mcp: [0.28, 0.64],
    github: [0.66, 0.68],
    email: [0.9, 0.14],
    calendar: [0.9, 0.48],
    linkedin: [0.12, 0.13],
    youtube: [0.5, 0.06],
    x: [0.08, 0.46],
    instagram: [0.14, 0.87],
    soundcloud: [0.84, 0.87],
  },
};

type Edge = {
  from: NodeId;
  to: NodeId;
  /** Seconds the edge starts drawing; `connects` pops in when it ends. */
  at: number;
  dur: number;
  connects: NodeId;
  /** Elbow: first axis from `from` (default "h" = horizontal first). */
  first?: "h" | "v";
  /** Hand-routed polyline (fractions, from → to) for the wide layout. */
  route?: Pos[];
};

/** Draw order (~5s): agent → MCP → KB → CRM → GitHub, then leaves one by one. */
const AGENT_AT = 0.1;
const leaf = (i: number) => ({ at: 2.6 + i * 0.33, dur: 0.3 });
/** Per-social elbow choices so routes skirt other nodes (wide layout). */
const SOCIAL_ROUTING: Record<(typeof SOCIALS)[number], Partial<Record<"agent" | "kb" | "crm", Pick<Edge, "first" | "route">>>> = {
  linkedin: {},
  youtube: {},
  x: { kb: { first: "v" }, crm: { route: [[0.09, 0.47], [0.09, 0.25], [0.66, 0.25], [0.66, 0.32]] } },
  instagram: { kb: { first: "v" } },
  soundcloud: { crm: { first: "v" } },
};
const EDGES: Edge[] = [
  { from: "agent", to: "mcp", at: 0.4, dur: 0.5, connects: "mcp", route: [[0.49, 0.48], [0.49, 0.68], [0.34, 0.68]] },
  { from: "agent", to: "kb", at: 1.0, dur: 0.5, connects: "kb", route: [[0.49, 0.48], [0.49, 0.32], [0.34, 0.32]] },
  { from: "mcp", to: "kb", at: 1.0, dur: 0.5, connects: "kb" },
  { from: "agent", to: "crm", at: 1.6, dur: 0.4, connects: "crm", route: [[0.51, 0.48], [0.51, 0.32], [0.66, 0.32]] },
  { from: "agent", to: "github", at: 2.0, dur: 0.4, connects: "github", route: [[0.51, 0.48], [0.51, 0.72], [0.62, 0.72]] },
  ...SOCIALS.flatMap((s, i) =>
    (["agent", "kb", "crm"] as const).map((hub) => ({
      from: s,
      to: hub,
      ...leaf(i),
      connects: s,
      ...SOCIAL_ROUTING[s][hub],
    })),
  ),
  { from: "email", to: "crm", ...leaf(5), connects: "email", first: "v" },
  { from: "calendar", to: "crm", ...leaf(6), connects: "calendar", first: "v" },
];

const connectsAt = (id: NodeId) =>
  id === "agent"
    ? AGENT_AT
    : Math.max(...EDGES.filter((e) => e.connects === id).map((e) => e.at + e.dur));

const edgeKind = (e: Edge): Kind => KIND[e.connects];

const BEAM: Record<Kind, string> = {
  page: "oklch(0.45 0.09 40)",
  dialog: "oklch(0.68 0.15 45)",
  external: "oklch(0.78 0.13 75)",
};

const BOX: Record<Size, Record<LayoutName, number>> = {
  agent: { wide: 88, tall: 64 },
  hub: { wide: 64, tall: 50 },
  leaf: { wide: 52, tall: 40 },
};

const RADIUS = 14;

type Pt = [number, number];

/** Drop duplicate and collinear points of an orthogonal polyline. */
function clean(raw: Pos[]): Pt[] {
  const pts = raw.filter((p, i) => i === 0 || p[0] !== raw[i - 1][0] || p[1] !== raw[i - 1][1]);
  return pts
    .filter((p, i) => {
      if (i === 0 || i === pts.length - 1) return true;
      const [a, b] = [pts[i - 1], pts[i + 1]];
      return !((a[0] === p[0] && p[0] === b[0]) || (a[1] === p[1] && p[1] === b[1]));
    })
    .map(([x, y]) => [x, y]);
}

/**
 * No-overlap rule: segments of different edges lying on the same line with
 * overlapping ranges are spread into parallel tracks `gap` px apart
 * (crossings are fine). Shifting a horizontal segment moves its two points'
 * y (vertical for x), so polylines stay orthogonal. Mutates `polys`.
 */
function separate(polys: Pt[][], gap: number) {
  type Seg = { e: number; i: number; h: boolean; c: number; lo: number; hi: number };
  const segs: Seg[] = [];
  polys.forEach((pts, e) => {
    for (let i = 0; i < pts.length - 1; i++) {
      const [a, b] = [pts[i], pts[i + 1]];
      const h = a[1] === b[1];
      segs.push({
        e,
        i,
        h,
        c: h ? a[1] : a[0],
        lo: Math.min(h ? a[0] : a[1], h ? b[0] : b[1]),
        hi: Math.max(h ? a[0] : a[1], h ? b[0] : b[1]),
      });
    }
  });
  const groups = new Map<string, Seg[]>();
  for (const sg of segs) {
    const key = `${sg.h ? "h" : "v"}${Math.round(sg.c)}`;
    groups.set(key, [...(groups.get(key) ?? []), sg]);
  }
  for (const group of groups.values()) {
    // Clusters of mutually overlapping ranges (sweep by start).
    group.sort((a, b) => a.lo - b.lo);
    let cluster: Seg[] = [];
    let end = -Infinity;
    const flush = () => {
      const edges = [...new Set(cluster.map((x) => x.e))];
      if (edges.length > 1) {
        for (const sg of cluster) {
          const off = (edges.indexOf(sg.e) - (edges.length - 1) / 2) * gap;
          const axis = sg.h ? 1 : 0;
          polys[sg.e][sg.i][axis] = sg.c + off;
          polys[sg.e][sg.i + 1][axis] = sg.c + off;
        }
      }
      cluster = [];
    };
    for (const sg of group) {
      // Touching end-to-start (≤1px) is not an overlap.
      if (cluster.length && sg.lo >= end - 1) {
        flush();
        end = -Infinity;
      }
      cluster.push(sg);
      end = Math.max(end, sg.hi);
    }
    flush();
  }
}

/** Orthogonal polyline → SVG path with rounded corners. */
function roundedPath(pts: Pt[]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [p, c, n] = [pts[i - 1], pts[i], pts[i + 1]];
    const r = Math.min(
      RADIUS,
      Math.hypot(c[0] - p[0], c[1] - p[1]) / 2,
      Math.hypot(n[0] - c[0], n[1] - c[1]) / 2,
    );
    const a = [c[0] - Math.sign(c[0] - p[0]) * r, c[1] - Math.sign(c[1] - p[1]) * r];
    const b = [c[0] + Math.sign(n[0] - c[0]) * r, c[1] + Math.sign(n[1] - c[1]) * r];
    d += `L${a[0]} ${a[1]}Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`;
  }
  const last = pts[pts.length - 1];
  return `${d}L${last[0]} ${last[1]}`;
}

export function AgentGraph({
  lang,
  dict,
  github,
  posts,
  postCount,
}: {
  lang: Locale;
  dict: Dictionary;
  github: GithubData | null;
  posts: PostPreview[];
  postCount: number;
}) {
  const canvas = useRef<HTMLElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const l = dict.landing;

  useLayoutEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout: LayoutName = size.w >= size.h * 1.15 ? "wide" : "tall";
  const toPx = ([x, y]: Pos): Pos => [Math.round(x * size.w), Math.round(y * size.h)];
  const px = (id: NodeId): Pos => toPx(POS[layout][id]);

  const edgePoints = (e: Edge): Pos[] => {
    if (layout === "wide" && e.route) return e.route.map(toPx);
    const [fx, fy] = px(e.from);
    const [tx, ty] = px(e.to);
    // Elbow; on tall canvases always horizontal-first (routes are wide-tuned).
    return layout === "wide" && e.first === "v"
      ? [[fx, fy], [fx, ty], [tx, ty]]
      : [[fx, fy], [tx, fy], [tx, ty]];
  };
  const polys = EDGES.map((e) => clean(edgePoints(e)));
  separate(polys, layout === "wide" ? 6 : 5);
  const paths = polys.map(roundedPath);




  // Close the open preview on outside click or Esc.
  useEffect(() => {
    if (!selected) return;
    const onDown = (e: PointerEvent) => {
      const el = e.target as Element;
      if (!el.closest(`[data-graph-node="${selected}"], [data-graph-popover]`)) setSelected(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  /** The open preview wins over hover for focus styling. */
  const active = selected ?? hovered;
  const touches = (e: Edge, id: NodeId | null) => id !== null && (e.from === id || e.to === id);
  const focusSet = new Set<NodeId>(
    active ? [active, ...EDGES.filter((e) => touches(e, active)).flatMap((e) => [e.from, e.to])] : [],
  );

  const iconClass = "size-[45%] text-amber-800 dark:text-amber-300";
  const icon = (id: NodeId): React.ReactNode => {
    switch (id) {
      case "agent":
        return <img src={DATA.avatarUrl} alt="" className="size-full rounded-full object-cover" />;
      case "kb":
        return <BookOpen className={iconClass} aria-hidden />;
      case "mcp":
        return <Blocks className={iconClass} aria-hidden />;
      case "crm":
        return <Contact className={iconClass} aria-hidden />;
      case "email":
        return <Mail className="size-[42%]" aria-hidden />;
      case "calendar":
        return <Calendar className="size-[42%]" aria-hidden />;
      default: {
        const Icon = DATA.contact.social[SOCIAL_KEY[id]].icon;
        return <Icon className={id === "soundcloud" ? "size-[62%]" : "size-[42%]"} />;
      }
    }
  };
  const label = (id: NodeId): [string, string?] => {
    switch (id) {
      case "agent":
        return ["Agent", l.agentSub];
      case "kb":
        return ["Knowledge Base", l.kbSub];
      case "mcp":
        return ["MCP", l.mcpSub];
      case "crm":
        return ["CRM", l.crmSub];
      case "github":
        return ["GitHub", handleOf(DATA.contact.social.GitHub.url)];
      case "email":
        return [l.email];
      case "calendar":
        return [dict.contact.bookCall];
      default:
        // Socials: the icon names the network; the label is the handle.
        return [handleOf(DATA.contact.social[SOCIAL_KEY[id]].url)];
    }
  };
  const ids = Object.keys(KIND) as NodeId[];
  const previewCtx = { lang, dict, github, posts, postCount };

  const renderEdge = (e: Edge, i: number, lit: boolean) => {
    const d = paths[i];
    const kind = edgeKind(e);
    return (
      <g key={`${e.from}-${e.to}`}>
        <motion.path
          d={d}
          fill="none"
          strokeWidth={lit ? 1.5 : 1}
          strokeLinecap="round"
          style={{ stroke: lit ? BEAM[kind] : "color-mix(in oklch, var(--border) 40%, transparent)" }}
          initial={lit ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: e.at, duration: e.dur, ease: "easeInOut" }}
        />
        <motion.g
          initial={lit ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: e.at + e.dur, duration: 0.3 }}
        >
          <path
            d={d}
            pathLength={1}
            fill="none"
            strokeWidth={lit ? 2.25 : 1.75}
            strokeLinecap="round"
            stroke={BEAM[kind]}
            className="animate-beam"
            style={
              {
                opacity: lit ? 0.9 : 0.4,
                "--beam-duration": `${0.9 + (i % 4) * 0.15}s`,
                "--beam-delay": `${(i * 0.29) % 0.9}s`,
              } as React.CSSProperties
            }
          />
        </motion.g>
      </g>
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-0 flex-1 flex-col">
        <nav ref={canvas} aria-label="Site" className="relative min-h-0 flex-1">
          {size.w > 0 && (
            <>
              <svg aria-hidden className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible">
                {EDGES.map((e, i) => renderEdge(e, i, false))}
              </svg>

              {/* Focus overlay: blurs everything not related to the active (open/hovered) node. */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -inset-3 z-10 rounded-2xl bg-card/55 backdrop-blur-[2px] transition-opacity duration-300 sm:-inset-6",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
              {active && (
                <svg aria-hidden className="pointer-events-none absolute inset-0 z-20 size-full overflow-visible">
                  {EDGES.map((e, i) => (touches(e, active) ? renderEdge(e, i, true) : null))}
                </svg>
              )}

              {ids.map((id) => {
                const [x, y] = px(id);
                const sizeKey: Size = id === "agent" ? "agent" : HUBS.includes(id) ? "hub" : "leaf";
                const box = BOX[sizeKey][layout];
                const at = connectsAt(id);
                const focus = active === id;
                const [name, sub] = label(id);
                const showLabel = !(layout === "tall" && sizeKey === "leaf");
                const action = ACTION[id];
                const popRight = x < size.w * 0.55;
                const popUp = y > size.h * 0.55;

                const body = (
                  <>
                    <span className="relative block" style={{ width: box, height: box }}>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -inset-2.5 rounded-full bg-amber-200/45 ring-1 ring-amber-800/10 transition-[opacity,scale] duration-300 dark:bg-amber-300/10 dark:ring-amber-200/15",
                          focus ? "scale-100 opacity-100" : "scale-90 opacity-0",
                        )}
                      />
                      <span
                        className={cn(
                          "relative flex size-full items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-[0_10px_28px_-14px_oklch(0.45_0.1_45/0.45)] transition-shadow duration-300",
                          id === "agent" &&
                            "ring-2 ring-amber-800/15 ring-offset-2 ring-offset-card dark:ring-amber-300/20",
                          focus && "shadow-[0_16px_40px_-14px_oklch(0.45_0.1_45/0.6)]",
                        )}
                      >
                        {icon(id)}
                      </span>
                      {id !== "agent" && (
                        <motion.span
                          aria-hidden
                          className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-2 ring-card dark:bg-emerald-900/60 dark:text-emerald-300"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: at + 0.15, type: "spring", stiffness: 420, damping: 18 }}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </motion.span>
                      )}
                    </span>
                    {showLabel && (
                      <span className="relative mt-3 flex flex-col items-center whitespace-nowrap rounded-md bg-card px-1.5 py-0.5 text-center leading-tight">
                        <span
                          className={cn(
                            "font-heading text-foreground",
                            sizeKey === "leaf" ? "font-sans text-xs text-muted-foreground" : "text-sm font-bold sm:text-base",
                          )}
                        >
                          {name}
                        </span>
                        {sub && <span className="font-sans text-xs text-muted-foreground sm:text-sm">{sub}</span>}
                      </span>
                    )}
                  </>
                );

                const trigger = {
                  className: "flex flex-col items-center rounded-full focus-visible:outline-none cursor-pointer",
                  "aria-label": sub ? `${name}, ${sub}` : name,
                };

                return (
                  <motion.div
                    key={id}
                    data-graph-node={id}
                    className={cn("absolute -translate-x-1/2", focus ? "z-30" : focusSet.has(id) ? "z-20" : "z-0")}
                    style={{ left: x, top: y - box / 2 }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: at, type: "spring", stiffness: 260, damping: 20 }}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(id)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null);
                    }}
                  >
                    {action === "link" ? (
                      <a
                        href={DATA.contact.social[SOCIAL_KEY[id as keyof typeof SOCIAL_KEY]].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...trigger}
                        aria-label={`${DATA.contact.social[SOCIAL_KEY[id as keyof typeof SOCIAL_KEY]].name}, ${name}`}
                      >
                        {body}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          action === "dialog" ? setContactOpen(true) : setSelected((cur) => (cur === id ? null : id))
                        }
                        aria-haspopup="dialog"
                        aria-expanded={action === "preview" ? selected === id : undefined}
                        {...trigger}
                      >
                        {body}
                      </button>
                    )}

                    {selected === id && layout === "wide" && (
                      <motion.div
                        data-graph-popover
                        role="dialog"
                        aria-label={name}
                        className={cn(
                          "absolute",
                          popRight ? "left-full pl-3" : "right-full pr-3",
                          popUp ? "bottom-0" : "top-0",
                        )}
                        initial={{ opacity: 0, x: popRight ? -6 : 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.16 }}
                      >
                        <NodePreview id={id} ctx={previewCtx} icon={icon(id)} />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
              {/* Phones: the open preview docks to the bottom of the screen (portal: escapes main's z-context). */}
              {selected && layout === "tall" && createPortal(
                <motion.div
                  data-graph-popover
                  role="dialog"
                  aria-label={label(selected)[0]}
                  className="fixed inset-x-3 bottom-3 z-50 flex justify-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <NodePreview id={selected} ctx={previewCtx} icon={icon(selected)} />
                </motion.div>,
                document.body,
              )}
            </>
          )}
        </nav>

        <motion.ul
          aria-hidden
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 pt-3 font-sans text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 0.5 }}
        >
          {(
            [
              ["page", l.legendPage],
              ["dialog", l.legendDialog],
              ["external", l.legendExternal],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="inline-flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full" style={{ background: BEAM[kind] }} />
              {text}
            </li>
          ))}
        </motion.ul>
      </div>

      <GraphDialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title={l.contactTitle}
        closeLabel={dict.newsletter.close}
      >
        <div className="flex flex-col gap-3">
          <p className="font-sans text-muted-foreground">{l.contactText}</p>
          <CtaSection dict={dict} />
          <NewsletterCard
            lang={lang}
            dict={dict.newsletter}
            className="rounded-2xl border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-[0_18px_50px_-24px_oklch(0.45_0.1_45/0.45)]"
            header={
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-base font-bold">{dict.newsletter.heading}</h3>
                <p className="font-sans text-sm text-muted-foreground">{dict.newsletter.text}</p>
              </div>
            }
          />
        </div>
      </GraphDialog>
    </MotionConfig>
  );
}
