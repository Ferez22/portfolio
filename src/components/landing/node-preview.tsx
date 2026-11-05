"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BookOpen,
  Bot,
  BrainCircuit,
  Calendar,
  CodeXml,
  Contact,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  Package,
  Terminal,
} from "lucide-react";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { localePath, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GithubData } from "@/lib/github";
import { cn } from "@/lib/utils";
import { Heatmap } from "./github-heatmap";

export type PostPreview = { title: string; slug: string; publishedAt: string };

/** "@handle" from a profile URL (last path segment). */
export const handleOf = (url: string) => {
  const last = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
  return last.startsWith("@") ? last : `@${last}`;
};

export const OFFER_ICON = {
  "app-window": AppWindow,
  "brain-circuit": BrainCircuit,
  bot: Bot,
  "code-xml": CodeXml,
} as const;

/** Tag pill palette (design: one hue per meaning). */
const TAG = {
  oss: "#34D399",
  own: "#F2C46A",
  client: "#E8713C",
  page: "#C98A6E",
  dialog: "#E8713C",
  external: "#F0A830",
  product: "#F2C46A",
  hire: "#34D399",
  copy: "#34D399",
} as const;
type TagKind = keyof typeof TAG;

/** Click target: in-app link, external URL, or a callback. */
type Target = { href: string } | { onClick: () => void };

type Item = {
  t: string;
  s?: string;
  icon: React.ReactNode;
  tag: string;
  kind: TagKind;
  /** Copy this text to the clipboard instead of navigating. */
  copy?: string;
  href?: string;
  onClick?: () => void;
};

export type PreviewSpec = {
  icon: React.ReactNode;
  /** Light icon disc (brand marks drawn in black). */
  iconLight?: boolean;
  title: string;
  sub: string;
  count: string;
  /** Count pill as a live status (pulsing dot). */
  live?: boolean;
  open: Target;
  items: Item[];
  /** Extra block under the header (heatmap, avatars). */
  extra?: React.ReactNode;
};

export type PreviewCtx = {
  lang: Locale;
  dict: Dictionary;
  github: GithubData | null;
  posts: PostPreview[];
  postCount: number;
  openContact: () => void;
  toProducts: () => void;
};

const ic = "size-4";
const icGold = "size-4 text-amber-800 dark:text-amber-300";
const isHttp = (href: string) => /^(https?|mailto):/.test(href);

/** Work + non-profit organisations (deduped by logo) for the agent card. */
const orgs = [
  ...DATA.work.map((w) => ({ name: w.company, logoUrl: w.logoUrl })),
  ...DATA.nonProfitWork.map((n) => ({ name: n.name, logoUrl: n.logoUrl })),
].filter((o, i, all) => o.logoUrl && all.findIndex((x) => x.logoUrl === o.logoUrl) === i);
const MAX_AVATARS = 6;

type SocialIcon = (p: { className?: string }) => React.ReactNode;

/** Card data per node: labels from dict, content from DATA / github / posts. */
export function buildPreview(id: string, ctx: PreviewCtx): PreviewSpec | null {
  const { lang, dict, github, posts, postCount, openContact, toProducts } = ctx;
  const l = dict.landing;
  const social = DATA.contact.social;

  const toolItems = DATA.tools.map((tool): Item =>
    "command" in tool
      ? { t: tool.name, s: tool.command, icon: <Terminal className={icGold} />, tag: l.copy, kind: "copy", copy: tool.command }
      : {
          t: tool.name,
          icon: <Globe className={ic} />,
          tag: tool.kind === "own" ? l.kindOwn : l.kindClient,
          kind: tool.kind === "own" ? "own" : "client",
          href: tool.href,
        },
  );
  const offerItems = DATA.offers.map((o): Item & { group: string } => {
    const Icon = OFFER_ICON[o.icon];
    return {
      group: o.group,
      t: t(o.title, lang),
      icon: <Icon className={ic} />,
      tag: o.group === "product" ? l.tagProduct : l.tagHire,
      kind: o.group === "product" ? "product" : "hire",
      onClick: toProducts,
    };
  });
  const socialSpec = (key: keyof typeof social, Icon: SocialIcon): PreviewSpec => {
    const s = social[key];
    return {
      icon: <Icon className="size-5" />,
      title: s.name,
      sub: handleOf(s.url),
      count: l.external,
      open: { href: s.url },
      items: [
        {
          t: s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
          icon: <Icon className={ic} />,
          tag: l.external,
          kind: "external",
          href: s.url,
        },
      ],
    };
  };

  switch (id) {
    case "agent":
      return {
        icon: <img src={DATA.avatarUrl} alt="" className="size-full rounded-full object-cover" />,
        title: DATA.name,
        sub: `Agent · ${t(DATA.headline, lang)}`,
        count: l.online,
        live: true,
        open: { href: localePath(lang, "/cv") },
        items: [
          { t: "CV", s: `/${lang}/cv`, icon: <FileText className={ic} />, tag: l.tagPage, kind: "page", href: localePath(lang, "/cv") },
          { t: l.offersRow, s: `${DATA.offers.length} ${l.offers}`, icon: <Package className={ic} />, tag: l.tagPage, kind: "page", onClick: toProducts },
          { t: dict.contact.bookCall, icon: <Calendar className={ic} />, tag: l.external, kind: "external", href: DATA.contact.calendlyUrl },
        ],
        extra: (
          <div className="flex items-center -space-x-2 border-t border-border/60 pt-2">
            {orgs.slice(0, MAX_AVATARS).map((o) => (
              <img
                key={o.name}
                src={o.logoUrl}
                alt={o.name}
                title={o.name}
                className="size-10 rounded-full border-2 border-card bg-white object-contain p-1"
              />
            ))}
            {orgs.length > MAX_AVATARS && (
              <span className="flex size-10 items-center justify-center rounded-full border-2 border-card bg-muted text-muted-foreground">…</span>
            )}
          </div>
        ),
      };
    case "qartmina":
      return {
        icon: <img src="/qartmina-q.png" alt="" className="h-5 w-auto" />,
        iconLight: true,
        title: "Qartmina",
        sub: l.founder,
        count: `${offerItems.filter((o) => o.group === "product").length} ${l.products2}`,
        open: { href: "https://qartmina.com" },
        items: [
          { t: "qartmina.com", icon: <Globe className={ic} />, tag: l.kindOwn, kind: "own", href: "https://qartmina.com" },
          ...offerItems.filter((o) => o.group === "product"),
        ],
      };
    case "products":
      return {
        icon: <Package className="size-5 text-l-gold" />,
        title: l.tabProducts,
        sub: l.productsSub,
        count: `${DATA.offers.length} ${l.offers}`,
        open: { onClick: toProducts },
        items: offerItems,
      };
    case "kb":
      return {
        icon: <BookOpen className="size-5 text-l-gold" />,
        title: "Knowledge Base",
        sub: l.kbSub,
        count: `${postCount} ${l.posts}`,
        open: { href: localePath(lang, "/blog") },
        items: posts.map((p) => ({
          t: p.title,
          s: new Date(p.publishedAt).toLocaleDateString(lang, { year: "numeric", month: "short", day: "numeric" }),
          icon: <FileText className={ic} />,
          tag: l.tagPage,
          kind: "page" as const,
          href: localePath(lang, `/blog/${p.slug}`),
        })),
      };
    case "crm":
      return {
        icon: <Contact className="size-5 text-l-gold" />,
        title: "CRM",
        sub: l.crmSub,
        count: `3 ${l.ways}`,
        open: { onClick: openContact },
        items: [
          { t: l.contactForm, icon: <MessageSquare className={ic} />, tag: l.tagDialog, kind: "dialog", onClick: openContact },
          { t: l.email, s: DATA.contact.email, icon: <Mail className={ic} />, tag: l.copy, kind: "copy", copy: DATA.contact.email },
          { t: dict.contact.bookCall, s: l.callLength, icon: <Calendar className={ic} />, tag: l.external, kind: "external", href: DATA.contact.calendlyUrl },
        ],
      };
    case "mcp":
      return {
        icon: <Blocks className="size-5 text-l-gold" />,
        title: "MCP",
        sub: l.mcpSub,
        count: `${DATA.tools.length} ${l.tools}`,
        open: { href: localePath(lang, "/cv#projects") },
        items: toolItems,
      };
    case "github":
      return {
        icon: <Icons.github className="size-5" />,
        title: "GitHub",
        sub: handleOf(social.GitHub.url),
        count: github ? `${github.publicRepos} ${l.repos}` : l.external,
        open: { href: social.GitHub.url },
        extra: github?.contributions ? (
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs text-muted-foreground">
              {github.contributions.total} {l.contributions} · {github.languages} {l.languages} · {l.since} {github.since}
            </span>
            <Heatmap days={github.contributions.days} label={l.githubActivity} />
          </div>
        ) : undefined,
        items: (github?.recentRepos ?? []).slice(0, 3).map((r) => ({
          t: r.name,
          s: r.description ?? r.language ?? undefined,
          icon: <Icons.github className={ic} />,
          tag: l.external,
          kind: "external" as const,
          href: r.url,
        })),
      };
    case "email":
      return {
        icon: <Mail className="size-5" />,
        title: l.email,
        sub: DATA.contact.email,
        count: l.tagDialog,
        open: { href: `mailto:${DATA.contact.email}` },
        items: [
          { t: l.writeEmail, icon: <Mail className={ic} />, tag: l.external, kind: "external", href: `mailto:${DATA.contact.email}` },
          { t: DATA.contact.email, icon: <Mail className={ic} />, tag: l.copy, kind: "copy", copy: DATA.contact.email },
        ],
      };
    case "call":
      return {
        icon: <Calendar className="size-5" />,
        title: dict.contact.bookCall,
        sub: l.introCall,
        count: l.callLength,
        open: { href: DATA.contact.calendlyUrl },
        items: [{ t: l.pickSlot, icon: <Calendar className={ic} />, tag: l.external, kind: "external", href: DATA.contact.calendlyUrl }],
      };
    case "youtube":
      return socialSpec("Youtube", Icons.youtube);
    case "linkedin":
      return socialSpec("LinkedIn", Icons.linkedin);
    case "x":
      return socialSpec("X", Icons.x);
    case "instagram":
      return socialSpec("Instagram", Icons.instagram);
    case "soundcloud":
      return socialSpec("Soundcloud", Icons.soundcloud);
    default:
      return null;
  }
}

/** Renders a target as Link (internal), <a> (external/mailto) or <button>. */
function Act({
  target,
  className,
  children,
  label,
}: {
  target: Target;
  className: string;
  children: React.ReactNode;
  label?: string;
}) {
  if ("onClick" in target)
    return (
      <button type="button" onClick={target.onClick} className={cn(className, "cursor-pointer text-left")} aria-label={label}>
        {children}
      </button>
    );
  return isHttp(target.href) ? (
    <a
      href={target.href}
      {...(target.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      aria-label={label}
    >
      {children}
    </a>
  ) : (
    <Link href={target.href} className={className} aria-label={label}>
      {children}
    </Link>
  );
}

const PILL_TONE = {
  neutral:
    "bg-amber-100/80 text-amber-900 ring-amber-900/10 dark:bg-amber-300/15 dark:text-amber-200 dark:ring-amber-200/15",
  live: "bg-emerald-50 text-emerald-800 ring-emerald-700/15 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-300/20",
  warm: "bg-orange-100/80 text-orange-900 ring-orange-900/10 dark:bg-orange-400/15 dark:text-orange-200 dark:ring-orange-200/15",
};
const KIND_TONE: Record<TagKind, keyof typeof PILL_TONE> = {
  oss: "neutral",
  own: "neutral",
  page: "neutral",
  product: "neutral",
  hire: "neutral",
  copy: "neutral",
  client: "warm",
  dialog: "warm",
  external: "warm",
};

function Pill({ tone, children }: { tone: keyof typeof PILL_TONE; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-px font-sans text-[11px] ring-1", PILL_TONE[tone])}>
      {tone === "live" && <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />}
      {children}
    </span>
  );
}

/** Compact card: header (icon · title/sub · pill · open-arrow) + tool-call rows. */
export function NodePopover({ spec, copiedLabel, openLabel }: { spec: PreviewSpec; copiedLabel: string; openLabel: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  // "Copied ✓" reverts after a moment.
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(id);
  }, [copied]);
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(text);
  };
  const Arrow = "href" in spec.open && isHttp(spec.open.href) ? ArrowUpRight : ArrowRight;

  return (
    <div className="flex w-80 max-w-[calc(100vw-1.5rem)] flex-col gap-2 rounded-xl border border-border bg-card p-3 text-left text-foreground shadow-[0_20px_60px_-28px_rgba(0,0,0,.7)]">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border [&>svg]:size-4",
            spec.iconLight ? "bg-white" : "bg-background",
          )}
        >
          {spec.icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate font-heading text-sm font-bold">{spec.title}</span>
          <span className="truncate font-sans text-xs text-muted-foreground">{spec.sub}</span>
        </span>
        <Pill tone={spec.live ? "live" : "neutral"}>{spec.count}</Pill>
        <Act
          target={spec.open}
          label={`${openLabel} ${spec.title}`}
          className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Arrow className="size-3.5" aria-hidden />
        </Act>
      </div>
      {spec.extra}
      {spec.items.length > 0 && (
        <ul>
          {spec.items.map((it) => {
            const isCopied = it.copy !== undefined && copied === it.copy;
            const target: Target | null =
              it.copy !== undefined
                ? { onClick: () => copy(it.copy!) }
                : it.onClick
                  ? { onClick: it.onClick }
                  : it.href
                    ? { href: it.href }
                    : null;
            const row = (
              <>
                <ArrowRight className="size-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                <span className="flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-3.5">{it.icon}</span>
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate font-semibold text-foreground underline-offset-2 group-hover:underline">{it.t}</span>
                  {it.s && <span className="truncate font-mono text-[11px] text-muted-foreground">{it.s}</span>}
                </span>
                <Pill tone={isCopied ? "live" : KIND_TONE[it.kind]}>{isCopied ? copiedLabel : it.tag}</Pill>
              </>
            );
            const rowClass =
              "group flex w-full items-center gap-2 border-t border-border/60 py-1.5 font-sans text-sm transition-colors focus-visible:bg-muted focus-visible:outline-none";
            return (
              <li key={it.t}>
                {target ? (
                  <Act target={target} className={rowClass}>
                    {row}
                  </Act>
                ) : (
                  <div className={rowClass}>{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
