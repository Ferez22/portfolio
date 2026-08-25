# CLAUDE.md

Guidance for working in this repo.

## What this is

Personal portfolio + blog for Fares Aouani Cherif. Fork of `dillionverma/portfolio`, heavily customized. Deployed on Vercel (`faresaouani.com`).

**Positioning: AI coach & engineer** (not "freelance engineer" — that framing was replaced). Two offers, both reflected in the copy: *coaching* people and businesses on adopting AI (tool choice, team rollout, workflows and agents, marketing, websites, internal tools, lead gen, daily automations, life/planning use cases, AI opportunity audits) and *building* custom AI apps (LLM core, tool use, retrieval, agents in Python + web app/APIs/cloud). Fares is an **official OpenAI Select Partner** — badge at `public/openai-select-partner.svg`, rendered in the landing hero. Keep new copy consistent with this in all three locales.

## Stack

- **Next.js 16.1** (App Router, React Server Components)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css`, no `tailwind.config.ts`
- **shadcn/ui** (new-york style) + **Magic UI** components
- **motion** v12 (Framer Motion successor) for animation
- **three** + **@react-three/fiber** + **@react-three/drei** for the landing page's 3D
- **content-collections** for MDX blog posts
- **Shiki** for code highlighting
- Package manager: **pnpm**

## Single source of truth

`src/data/resume.tsx` exports `DATA` (const-asserted object). It drives the **entire** site — name, description, portraits, work, education, projects, the landing quotes (`DATA.quotes`), the chronology (`DATA.timeline`), non-profit work, contact, social links, navbar. **To change site content, edit this file.** Most pages/sections just map over `DATA`.

Fields that are no longer rendered anywhere but still exist in `DATA`: `certifications` (empty), `skills`, `summary`, `hackathons`, `education` (its content lives in `timeline` now).

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
      page.tsx                  Home — full-bleed animated landing. Section order:
                                hero (huge quote) → projects (carousel) → thesis (huge
                                quote) → chronology → video → contact.
                                Certifications/about/education/skills sections were
                                removed; work + education live in the chronology and
                                the OpenAI Select Partner badge sits in the hero.
      not-found.tsx
      opengraph-image.tsx       Home OG image (edge, ImageResponse), localized description.
      blog/
        page.tsx                Post list, paginated 5/page (chrome localized, posts EN).
        opengraph-image.tsx
        [slug]/
          page.tsx              Post render (MDX), JSON-LD, prev/next nav.
          opengraph-image.tsx
  components/
    landing/                    The animated landing page:
      intro-loader.tsx          Intro on every load (portrait → greeting → blur out)
      quote-panel.tsx           Full-viewport quote, parallax mosaic shards
      project-carousel.tsx      Scroll-snap carousel of big project cards, with
                                styled arrows; hovered card grows in place
      project-stage.tsx         react-three-fiber plaque, mounted on hover only
      chronology.tsx            Full-screen horizontal arrow, scroll-driven
      video-slot.tsx            16:9 placeholder for the future intro video (pass `src`
                                once a file exists in public/)
      harissa.tsx               The recurring chili mascot
      location-globe.tsx        Hero globe → Germany map with a pin on Düsseldorf
      section-nav-provider.tsx  Enables the SPACE section jump
    page-shell.tsx              The max-w-2xl reading column (blog + 404 use it)
    section/                    WorkSection, ProjectsSection, ContactSection,
                                HackathonsSection (unused by the landing page now)
    magicui/                    BlurFade, BlurFadeText, Dock, FlickeringGrid
    mdx/                        CodeBlock (Shiki + copy), MediaContainer
    ui/                         shadcn primitives
    ui/svgs/                    Tech-logo SVG wrappers (many defined, only 8 used)
    icons.tsx                   Inline social/brand SVGs (Icons object)
    navbar.tsx                  Fixed bottom Dock: nav + social + theme toggle
    availability-badge.tsx      Hero availability pill with a booking popover
    project-card.tsx, timeline.tsx, mode-toggle.tsx, theme-provider.tsx
                                (project-card + timeline are legacy, unused by the
                                landing page)
  data/resume.tsx               ★ site content
  lib/                          utils (cn, formatDate), pagination, remark-code-meta,
                                section-nav.ts (SECTION_IDS + the SPACE jump)
  mdx-components.tsx            MDX element → component mapping
content/*.mdx                   Blog posts (frontmatter schema in content-collections.ts)
```

## Conventions

- Import alias `@/*` → `src/*`. `content-collections` → generated collection.
- Components default to Server Components; add `"use client"` only when needed (state, motion, event handlers). Existing client comps: sections with `useState`, all `magicui/*`, `code-block`, `mode-toggle`, `theme-provider`.
- Styling: Tailwind utility classes + oklch design tokens (warm paper light / warm ink dark). Dark variant is `@custom-variant dark (&:where(.dark, .dark *))`.
- Fonts exposed as CSS vars: `--font-sans` (Crimson serif body), `--font-heading` (Quattrocento), `--font-display` (Turret Road), `--font-hand` (Caveat), `--font-tech` (Quantico), `--font-mono` (Geist Mono). Use via `font-sans`, `font-heading`, etc.
- Section reveal animations use `BlurFade` with a shared `BLUR_FADE_DELAY` stagger constant.
- Social links: add to `DATA.contact.social`; set `navbar: true` to show in the bottom dock; icon comes from `Icons` in `icons.tsx`.
- Projects: `DATA.projects[].description` runs to ~3 lines on a carousel card. Order in the carousel comes from `FEATURED_FIRST` in `page.tsx` (AMLD entries first), everything else keeps its `DATA.projects` order. An entry with `image: ""` falls back to a hatched placeholder card.
- Project images: leading-slash paths (`/foo.jpg`) — relative paths only work by accident of URL resolution. Screenshots go through `sips -s format jpeg -s formatOptions 72 -Z 1200` before landing in `public/` (raw 3000px PNGs are multi-MB and the cards use a plain `<img>`, not `next/image`). Carousel cards crop with `aspect-[16/10] object-cover`.
- Carousel affordances: an entry nudge (IntersectionObserver, fires once), a pulsing right arrow, live position dots, and a handwritten swipe hint. All hints except the dots retire on the first real interaction (`pointerdown` / `wheel` / `touchstart` / arrow click). Keep that retirement working when editing.
- **Landing page**: it is full-bleed — the root layout no longer wraps children in a column, so every *other* page wraps itself in `<PageShell>`. Sections are `min-h-dvh` and their ids must stay in sync with `SECTION_IDS` in `src/lib/section-nav.ts`, which powers the SPACE / shift+SPACE jump. Scrolling is never hijacked; SPACE is an addition, not a replacement.
- **Landing copy**: the two giant quotes live in `DATA.quotes` (`hero`, `thesis`) and the chronology in `DATA.timeline` — both localized `{en,fr,de}`, both meant to be edited directly. Nothing on the landing page is cached client-side (no localStorage/sessionStorage anywhere in `src/`), so an edit that "doesn't show up" is an edit that didn't reach the file, or one made in a locale other than the one being viewed. Timeline `kind` is `milestone | school | work | world`; `world` entries (COVID, ChatGPT) render as bursts on the arrow rather than stops.
- **Navbar**: the floating dock hides on the landing page until the visitor scrolls past 24px, and is always visible on every other route (`isLanding` in `navbar.tsx`). It is `inert` while hidden so it stays out of the tab order.
- **Location globe**: `location-globe.tsx` holds Germany's outline as an equirectangular projection of ~47 real border coordinates into a 0–100 box (lon 5.6–15.2, lat 47.2–55.2), with Düsseldorf at `(12.2, 49.6)` in that same space. To pin a different city, project its lon/lat with the same formula; to swap countries, re-project a new coordinate list. Pure SVG + motion, deliberately no WebGL so it costs nothing beside the carousel's canvas.
- **Portraits**: `DATA.avatarUrl` (`/me.jpg`) is the OG/schema.org image; `DATA.introPortraitUrl` (`/pdp.jpg`) is what the intro loader and the hero show. `public/fares-portrait.jpg` is the Higgsfield illustration, currently unused.
- **Reduced motion**: every animated landing section ships a static fallback branch (`useReducedMotion()`), and the intro never plays (it otherwise replays on every page load, by design). Keep that branch working when editing them.
- **3D**: `project-stage.tsx` is dynamically imported with `ssr: false` and mounted only for the card currently hovered, so at most one WebGL context exists at a time. Keep it that way.
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
