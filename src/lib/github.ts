import { DATA } from "@/data/resume";

/** Re-fetch GitHub data at most once a day (ISR). */
const REVALIDATE = 60 * 60 * 24;

export const GITHUB_USER = new URL(DATA.contact.social.GitHub.url).pathname.replace(/\//g, "");

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GithubData = {
  publicRepos: number;
  languages: number;
  since: number;
  /** Most recently pushed own (non-fork) repos. */
  recentRepos: GithubRepo[];
  /** Last-year contribution calendar; null when the calendar source is down. */
  contributions: { total: number; days: ContributionDay[] } | null;
};

async function getJson<T>(url: string): Promise<T> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  // Optional: raises the API rate limit on builds; public data needs no token.
  if (process.env.GITHUB_TOKEN && url.startsWith("https://api.github.com")) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers, next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json() as Promise<T>;
}

type ApiUser = { public_repos: number; created_at: string };
type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

/** Public GitHub profile data for the landing page; null if GitHub is unreachable. */
export async function getGithubData(): Promise<GithubData | null> {
  try {
    const [user, repos, contributions] = await Promise.all([
      getJson<ApiUser>(`https://api.github.com/users/${GITHUB_USER}`),
      getJson<ApiRepo[]>(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      ),
      // GitHub's own calendar needs an authenticated GraphQL call; this public
      // mirror returns the same data. Optional — the page works without it.
      getJson<{ total: { lastYear: number }; contributions: ContributionDay[] }>(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      ).catch(() => null),
    ]);

    const own = repos.filter((r) => !r.fork && r.name !== GITHUB_USER);
    return {
      publicRepos: user.public_repos,
      languages: new Set(own.map((r) => r.language).filter(Boolean)).size,
      since: new Date(user.created_at).getFullYear(),
      recentRepos: own.slice(0, 4).map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
      contributions: contributions
        ? { total: contributions.total.lastYear, days: contributions.contributions }
        : null,
    };
  } catch {
    return null;
  }
}
