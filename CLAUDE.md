# CLAUDE.md

Guidance for working in this repo.

## What this is

Personal portfolio + blog for Fares Aouani Cherif. Fork of `dillionverma/portfolio`, heavily customized. Deployed on Vercel (`faresaouani.com`).

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
  app/
    page.tsx                    Home. Sections in order: hero, about, certifications,
                                non-profit, work, education, skills, projects, contact.
                                (hackathons section is commented out)
    layout.tsx                  Fonts (6 Google fonts → CSS vars), ThemeProvider,
                                bg (FlickeringGrid + radial gradient), max-w-2xl shell
    not-found.tsx
    opengraph-image.tsx         Home OG image (edge runtime, ImageResponse)
    blog/
      page.tsx                  Post list, paginated 5/page
      opengraph-image.tsx
      [slug]/
        page.tsx                Post render (MDX), JSON-LD, prev/next nav
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
