/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe, Terminal } from "lucide-react";
import { DATA } from "@/data/resume";
import { localePath, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GithubData } from "@/lib/github";
import { cn } from "@/lib/utils";
import { Heatmap } from "./github-heatmap";

export type PostPreview = { title: string; slug: string; publishedAt: string };

type Ctx = {
  lang: Locale;
  dict: Dictionary;
  github: GithubData | null;
  posts: PostPreview[];
  postCount: number;
};

/** "@handle" from a profile URL (last path segment). */
export const handleOf = (url: string) => {
  const last = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
  return last.startsWith("@") ? last : `@${last}`;
};

const PILL_TONE = {
  neutral:
    "bg-amber-100/80 text-amber-900 ring-amber-900/10 dark:bg-amber-300/15 dark:text-amber-200 dark:ring-amber-200/15",
  live: "bg-emerald-50 text-emerald-800 ring-emerald-700/15 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-300/20",
  warm: "bg-orange-100/80 text-orange-900 ring-orange-900/10 dark:bg-orange-400/15 dark:text-orange-200 dark:ring-orange-200/15",
};

function Pill({ tone = "neutral", children }: { tone?: keyof typeof PILL_TONE; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-px font-sans text-[11px] ring-1",
        PILL_TONE[tone],
      )}
    >
      {tone === "live" && <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />}
      {children}
    </span>
  );
}

const isExternal = (href: string) => /^(https?|mailto):/.test(href);

function AnyLink({ href, className, children, ...rest }: React.ComponentProps<"a"> & { href: string }) {
  return isExternal(href) ? (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** One "tool call" row:  → icon  main / detail      meta */
function Row({
  href,
  icon,
  main,
  detail,
  meta,
  mono,
}: {
  href: string;
  icon?: React.ReactNode;
  main: string;
  detail?: string;
  meta?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <li>
      <AnyLink
        href={href}
        className="group flex items-center gap-2 border-t border-border/60 py-1.5 font-sans text-sm transition-colors focus-visible:bg-muted focus-visible:outline-none"
      >
        <ArrowRight
          className="size-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
        {icon}
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate font-semibold text-foreground group-hover:underline underline-offset-2">
            {main}
          </span>
          {detail && (
            <span className={cn("truncate text-xs text-muted-foreground", mono && "font-mono text-[11px]")}>
              {detail}
            </span>
          )}
        </span>
        {meta}
      </AnyLink>
    </li>
  );
}

/** Compact card: header (icon · title/sub · pill · open-arrow) + body. */
function Shell({
  icon,
  title,
  sub,
  pill,
  href,
  openLabel,
  narrow,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  pill?: React.ReactNode;
  href: string;
  openLabel: string;
  narrow?: boolean;
  children?: React.ReactNode;
}) {
  const Arrow = isExternal(href) ? ArrowUpRight : ArrowRight;
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-border bg-card p-3 text-left shadow-[0_20px_60px_-28px_oklch(0.45_0.1_45/0.55)]",
        narrow ? "w-64" : "w-80",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background">
          {icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate font-heading text-sm font-bold">{title}</span>
          <span className="truncate font-sans text-xs text-muted-foreground">{sub}</span>
        </span>
        {pill}
        <AnyLink
          href={href}
          aria-label={`${openLabel} ${title}`}
          title={`${openLabel} ${title}`}
          className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Arrow className="size-3.5" aria-hidden />
        </AnyLink>
      </div>
      {children}
    </div>
  );
}

const MAX_AVATARS = 6;

/** Work + non-profit organisations, in CV order, for the agent preview. */
const orgs = [
  ...DATA.work.map((w) => ({ name: w.company, logoUrl: w.logoUrl })),
  ...DATA.nonProfitWork.map((n) => ({ name: n.name, logoUrl: n.logoUrl })),
].filter((o, i, all) => o.logoUrl && all.findIndex((x) => x.logoUrl === o.logoUrl) === i);

/**
 * Click preview for a graph node (agent, kb, mcp, github, email, calendar).
 * Socials have none (they link straight out); CRM opens a dialog.
 */
export function NodePreview({ id, ctx, icon }: { id: string; ctx: Ctx; icon: React.ReactNode }) {
  const { lang, dict, github, posts, postCount } = ctx;
  const l = dict.landing;
  const open = l.open;

  switch (id) {
    case "agent":
      return (
        <Shell
          icon={icon}
          title={DATA.name}
          sub={t(DATA.headline, lang)}
          pill={<Pill tone="live">{l.online}</Pill>}
          href={localePath(lang, "/cv")}
          openLabel={open}
        >
          <p className="font-sans text-sm leading-snug text-muted-foreground text-pretty">
            {t(DATA.description, lang)}
          </p>
          <div className="flex items-center -space-x-2 border-t border-border/60 pt-2.5">
            {orgs.slice(0, MAX_AVATARS).map((o) => (
              <img
                key={o.name}
                src={o.logoUrl}
                alt={o.name}
                title={o.name}
                className="size-11 rounded-full border-2 border-card bg-white object-contain p-1 shadow-sm"
              />
            ))}
            {orgs.length > MAX_AVATARS && (
              <span className="flex size-11 items-center justify-center rounded-full border-2 border-card bg-muted text-sm text-muted-foreground">
                …
              </span>
            )}
          </div>
        </Shell>
      );
    case "mcp":
      return (
        <Shell
          icon={icon}
          title="MCP"
          sub={l.mcpSub}
          pill={<Pill>{`${DATA.tools.length} ${l.tools}`}</Pill>}
          href={localePath(lang, "/cv#projects")}
          openLabel={open}
        >
          <ul>
            {DATA.tools.map((tool) => {
              const Icon = "command" in tool ? Terminal : Globe;
              return (
                <Row
                  key={tool.name}
                  href={tool.href}
                  icon={<Icon className="size-3.5 shrink-0 text-amber-800 dark:text-amber-300" aria-hidden />}
                  main={tool.name}
                  detail={"command" in tool ? tool.command : undefined}
                  mono
                  meta={
                    <Pill tone={tool.kind === "client" ? "warm" : "neutral"}>
                      {tool.kind === "oss" ? l.kindOss : tool.kind === "own" ? l.kindOwn : l.kindClient}
                    </Pill>
                  }
                />
              );
            })}
          </ul>
        </Shell>
      );
    case "kb":
      return (
        <Shell
          icon={icon}
          title="Knowledge Base"
          sub={l.kbSub}
          pill={<Pill>{`${postCount} ${l.posts}`}</Pill>}
          href={localePath(lang, "/blog")}
          openLabel={open}
        >
          <ul>
            {posts.map((p) => (
              <Row
                key={p.slug}
                href={localePath(lang, `/blog/${p.slug}`)}
                main={p.title}
                detail={new Date(p.publishedAt).toLocaleDateString(lang, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              />
            ))}
          </ul>
        </Shell>
      );
    case "github":
      return (
        <Shell
          icon={icon}
          title="GitHub"
          sub={handleOf(DATA.contact.social.GitHub.url)}
          pill={github ? <Pill>{`${github.publicRepos} ${l.repos}`}</Pill> : undefined}
          href={DATA.contact.social.GitHub.url}
          openLabel={open}
        >
          {github?.contributions && (
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs text-muted-foreground">
                {github.contributions.total} {l.contributions}
              </span>
              <Heatmap days={github.contributions.days} label={l.githubActivity} />
            </div>
          )}
          {github && github.recentRepos.length > 0 && (
            <ul>
              {github.recentRepos.slice(0, 3).map((r) => (
                <Row
                  key={r.name}
                  href={r.url}
                  main={r.name}
                  detail={r.description ?? undefined}
                  meta={r.language ? <span className="shrink-0 text-xs text-muted-foreground">{r.language}</span> : undefined}
                />
              ))}
            </ul>
          )}
        </Shell>
      );
    case "email":
      return (
        <Shell
          narrow
          icon={icon}
          title={l.email}
          sub={DATA.contact.email}
          href={`mailto:${DATA.contact.email}`}
          openLabel={dict.contact.sendEmail}
        >
          <p className="font-sans text-xs text-muted-foreground">{dict.contact.replyTime}</p>
        </Shell>
      );
    case "calendar":
      return (
        <Shell
          narrow
          icon={icon}
          title={dict.contact.bookCall}
          sub={dict.contact.ctaShort}
          pill={<Pill tone="live">{l.callLength}</Pill>}
          href={DATA.contact.calendlyUrl}
          openLabel={open}
        />
      );
    default:
      return null;
  }
}
