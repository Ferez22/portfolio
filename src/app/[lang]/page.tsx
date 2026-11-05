import { allPosts } from "content-collections";
import { Landing } from "@/components/landing/landing";
import { DATA } from "@/data/resume";
import { defaultLocale, isLocale, t } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGithubData } from "@/lib/github";

/**
 * Landing: full-viewport, no scroll. Overview = agent-workflow graph as site
 * nav; Products = offers grid; Blog = all posts (newest first). Live GitHub data via ISR (lib/github.ts).
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
  const posts = [...allPosts]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .map((p) => ({
      title: p.title,
      slug: p._meta.path.replace(/\.mdx$/, ""),
      publishedAt: p.publishedAt,
      summary: p.summary,
      category: p.category,
      image: p.image,
    }));

  return (
    <>
      <h1 className="sr-only">
        {DATA.name}, {t(DATA.headline, lang)}
      </h1>
      <Landing lang={lang} dict={dict} github={github} posts={posts} postCount={allPosts.length} />
    </>
  );
}
