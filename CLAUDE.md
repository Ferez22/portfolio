# CLAUDE.md

Guidance for working in this repo.

## What this is

Personal portfolio + blog for Fares Aouani Cherif. Fork of `dillionverma/portfolio`, heavily customized. Deployed on Vercel (`faresaouani.com`).

**Positioning: AI coach & engineer** (not "freelance engineer" — that framing was replaced). Two offers, both reflected in the copy: *coaching* people and businesses on adopting AI (tool choice, team rollout, workflows and agents, marketing, websites, internal tools, lead gen, daily automations, life/planning use cases, AI opportunity audits) and *building* custom AI apps (LLM core, tool use, retrieval, agents in Python + web app/APIs/cloud). Fares is an **official OpenAI Select Partner** — badge at `public/openai-select-partner.svg`, listed first in `DATA.certifications`. Keep new copy consistent with this in all three locales.

## Stack

- **Next.js 16.1** (App Router, React Server Components)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css`, no `tailwind.config.ts`
- **shadcn/ui** (new-york style) + **Magic UI** components
- **motion** v12 (Framer Motion successor) for animation
- **content-collections** for MDX blog posts
- **Shiki** for code highlighting
- Package manager: **pnpm**

## Single source of truth

`src/data/resume.tsx` exports `DATA` (const-asserted object). It drives the **entire** site — name, description, skills, work, education, projects, certifications, non-profit work, contact, social links, navbar. **To change site content, edit this file.** Most pages/sections just map over `DATA`.

## Layout of the code

```
src/
  proxy.ts                      Locale routing (Next 16 "proxy", ex-middleware):
                                redirects non-prefixed paths to /{lang} by Accept-Language.
  i18n/
    config.ts                   locales (en/fr/de), Locale, defaultLocale, isLocale,
                                Localized type, t(value,lang), localePath(lang,path).
    dictionaries.ts             UI-string dictionaries per locale + getDictionary(lang).
  app/
    [lang]/                     ★ all pages live under the locale segment.
      layout.tsx                Root layout (html lang={lang}), fonts, providers, navbar,
                                bg. generateStaticParams over locales; localized metadata.
      page.tsx                  Home. Sections: hero, about, certifications, non-profit,
                                work, education, skills, projects, contact.
                                (hackathons commented out). Passes lang+dict to sections.
      not-found.tsx
      opengraph-image.tsx       Home OG image (edge, ImageResponse), localized description.
      blog/
        page.tsx                Post list, paginated 5/page (chrome localized, posts EN).
        opengraph-image.tsx
        [slug]/
          page.tsx              Post render (MDX), JSON-LD, prev/next nav.
          opengraph-image.tsx
  components/
    section/                    WorkSection, ProjectsSection, ContactSection,
                                HackathonsSection (currently unused)
    magicui/                    BlurFade, BlurFadeText, Dock, FlickeringGrid
    mdx/                        CodeBlock (Shiki + copy), MediaContainer
    ui/                         shadcn primitives
    ui/svgs/                    Tech-logo SVG wrappers (many defined, only 8 used)
    icons.tsx                   Inline social/brand SVGs (Icons object)
    navbar.tsx                  Fixed bottom Dock: nav + social + theme toggle
    project-card.tsx, timeline.tsx, mode-toggle.tsx, theme-provider.tsx
  data/resume.tsx               ★ site content
  lib/                          utils (cn, formatDate), pagination, remark-code-meta
  mdx-components.tsx            MDX element → component mapping
content/*.mdx                   Blog posts (frontmatter schema in content-collections.ts)
```

## Conventions

- Import alias `@/*` → `src/*`. `content-collections` → generated collection.
- Components default to Server Components; add `"use client"` only when needed (state, motion, event handlers). Existing client comps: sections with `useState`, all `magicui/*`, `code-block`, `mode-toggle`, `theme-provider`.
- Styling: Tailwind utility classes + oklch design tokens (warm paper light / warm ink dark). Dark variant is `@custom-variant dark (&:where(.dark, .dark *))`.
- Fonts exposed as CSS vars: `--font-sans` (Crimson serif body), `--font-heading` (Quattrocento), `--font-display` (Turret Road), `--font-hand` (Caveat), `--font-tech` (Quantico), `--font-mono` (Geist Mono). Use via `font-sans`, `font-heading`, etc.
- Section reveal animations use `BlurFade` with a shared `BLUR_FADE_DELAY` stagger constant.
- Skill icons: import the SVG wrapper from `ui/svgs/` and add `{ name, icon }` to `DATA.skills`.
- Social links: add to `DATA.contact.social`; set `navbar: true` to show in the bottom dock; icon comes from `Icons` in `icons.tsx`.
- Certifications: every entry in `DATA.certifications` must set `logoShape` (`"square" | "circle"`) and `invertOnDark` (boolean) — `DATA` is const-asserted, so a missing key on one entry breaks the union type read in `page.tsx`. `invertOnDark: true` applies `dark:invert` (used for the black-on-white OpenAI badge).
- Projects: `DATA.projects[].description` is capped at **~2 rendered lines** per card (≈150 chars EN, a bit more DE) — cards sit in a `auto-rows-fr` grid, so long copy stretches the whole row. Keep new entries equally short in all locales.
- Project images: leading-slash paths (`/foo.jpg`) — relative paths only work by accident of URL resolution. Screenshots go through `sips -s format jpeg -s formatOptions 72 -Z 1200` before landing in `public/` (raw 3000px PNGs are multi-MB and `project-card.tsx` uses a plain `<img>`, not `next/image`). Cards crop with `h-36 object-top origin-top scale-[1.25]` — `scale-[1.25]` is the zoom knob.
- **i18n**: prose fields in `DATA` (description, summary, `work[].title/description`, `nonProfitWork[].description`, `projects[].description`) are `{ en, fr, de }` objects — resolve them at render with `t(field, lang)` from `@/i18n/config`. Non-prose (names, dates, urls, tech, logos) stay plain strings. Fixed UI strings (headings, buttons, nav) live in `i18n/dictionaries.ts`; read via `getDictionary(lang)`. Server components get `lang` from `params.lang`; the client `navbar` derives it from `usePathname()`. Build internal links with `localePath(lang, path)`. Blog *posts* stay English; only their chrome is translated. To add a locale: extend `locales` in `config.ts`, add a dictionary + the field key to every localized `DATA` prose object.

## Commands

```bash
pnpm dev          # local dev server
pnpm build        # production build
pnpm lint         # eslint (next/core-web-vitals, flat config)
pnpm lint:fix
```

## Gotchas

- The three `opengraph-image.tsx` files share a large near-identical `styles` block — keep them in sync when editing, or factor out.
- Several `ui/svgs/*` components are defined but unused (golang, java, csharp, kubernetes, wordmark variants) — dead code, safe to ignore.
- Blog OG images load local fonts from `public/fonts/*.ttf` at the edge; keep those paths valid.
- `next.config.mjs` sets security headers (X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy) and must keep `withContentCollections` as the outermost plugin.
