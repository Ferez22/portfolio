/* eslint-disable @next/next/no-img-element */
import { AgentGraph } from "@/components/landing/agent-graph";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { defaultLocale, isLocale, t } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGithubData } from "@/lib/github";
import { allPosts } from "content-collections";

/**
 * Landing page: a single, non-scrolling agent graph used as site navigation,
 * with live GitHub numbers in the header. Fills the viewport above the dock.
 */
export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(lang);
  const github = await getGithubData();
  const l = dict.landing;
  const partner = DATA.certifications[0];
  const posts = [...allPosts]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      slug: p._meta.path.replace(/\.mdx$/, ""),
      publishedAt: p.publishedAt,
    }));

  const stats = github
    ? [
        [github.publicRepos, l.repos],
        ...(github.contributions ? [[github.contributions.total, l.contributions]] : []),
        [github.languages, l.languages],
        [github.since, l.since, true],
      ]
    : [];

  return (
    <main className="fixed inset-0 z-10 mx-auto flex max-w-6xl flex-col px-4 pb-6 pt-12 sm:px-8 sm:pt-14">
      <BlurFade delay={0.05}>
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
              {DATA.name.split(" ").slice(0, 2).join(" ")}
              <span className="sr-only">, {t(DATA.headline, lang)}</span>
            </h1>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100/80 px-2.5 py-1 font-sans text-sm text-amber-900 ring-1 ring-amber-900/10 transition-colors hover:bg-amber-200/80 dark:bg-amber-300/15 dark:text-amber-200 dark:ring-amber-200/15"
            >
              <img src={partner.logoUrl} alt="" className="size-4 rounded-sm dark:invert" />
              {partner.name}
            </a>
          </div>
          {stats.length > 0 && (
            <dl className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-sans text-sm sm:text-base">
              {stats.map(([value, label, prefix]) => (
                <div key={String(label)} className="flex items-baseline gap-1.5">
                  <dt className="sr-only">{label}</dt>
                  {prefix ? (
                    <dd className="text-muted-foreground">
                      {label} <span className="font-semibold text-foreground tabular-nums">{value}</span>
                    </dd>
                  ) : (
                    <dd className="text-muted-foreground">
                      <span className="font-semibold text-foreground tabular-nums">{value}</span> {label}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          )}
        </header>
      </BlurFade>
      <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-3xl border border-border/70 bg-card p-3 sm:mt-6 sm:p-6">
        <AgentGraph lang={lang} dict={dict} github={github} posts={posts} postCount={allPosts.length} />
      </div>
    </main>
  );
}
