import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";
import { locales, defaultLocale } from "@/i18n/config";

const BASE = DATA.url.replace(/\/$/, "");

/** Build the alternates.languages map for a locale-agnostic path ("" | "/blog"). */
function languages(path: string) {
  return Object.fromEntries(
    locales.map((lang) => [lang, `${BASE}/${lang}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/blog", priority: 0.8 },
  ];

  const staticEntries = staticPaths.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: lang === defaultLocale ? priority : priority - 0.1,
      alternates: { languages: languages(path) },
    })),
  );

  const postEntries = allPosts.flatMap((post) => {
    const slug = post._meta.path.replace(/\.mdx$/, "");
    const path = `/blog/${slug}`;
    const lastModified = new Date(post.updatedAt ?? post.publishedAt);
    return locales.map((lang) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: lang === defaultLocale ? 0.7 : 0.6,
      alternates: { languages: languages(path) },
    }));
  });

  return [...staticEntries, ...postEntries];
}
