# CLAUDE.md
<!-- Dense agent spec. Terse by design: key → value, ⇒ = must, ✗ = never. -->

## ctx
- owner: Fares Aouani Cherif · site faresaouani.com · Vercel (deploy=push main) · fork dillionverma/portfolio
- positioning: AI Engineer (headline) + AI coach/builder offers. ✗ "freelance engineer". OpenAI Select Partner ⇒ badge `public/openai-select-partner.svg`, `DATA.certifications[0]`
- copy ⇒ all 3 locales (en/fr/de) consistent

## stack
Next 16.1 App Router RSC · React 19 · TS strict · Tailwind v4 (CSS-first `@theme` in `src/app/globals.css`, ✗ tailwind.config) · shadcn new-york + Magic UI · motion v12 (`motion/react`) · content-collections (MDX) · Shiki · pnpm
cmds: `pnpm dev|build|lint|lint:fix`

## sot
`src/data/resume.tsx` → `DATA` (const-asserted) drives all content: name, headline, description, summary, skills, work, nonProfitWork, projects, certifications, contact(social, email, calendlyUrl, newsletterAction), navbar, tools.
change content ⇒ edit DATA.

## map
```
src/proxy.ts            locale redirect /x → /{lang}/x : cookie NEXT_LOCALE > Accept-Language(q-sorted) > en
src/i18n/config.ts      locales, Locale, defaultLocale, isLocale, LOCALE_COOKIE, Localized, t(v,lang), localePath(lang,p)
src/i18n/dictionaries.ts  Dictionary type + en/fr/de; getDictionary(lang)
src/app/[lang]/
  layout.tsx            html lang, fonts, Theme/Tooltip providers, LanguageSwitcher, Navbar, NewsletterPopup
  page.tsx              LANDING: <Landing> (fixed inset-0, no scroll); passes github, 3 latest posts, postCount
  cv/page.tsx           CV: hero, about, #contact(CtaSection 2col), certifications, non-profit, work, skills, projects, #newsletter
  blog/page.tsx         list, 5/page; blog/[slug]/page.tsx MDX + JSON-LD + prev/next
  opengraph-image.tsx ×3 (home, blog, post) — shared styles block, keep in sync
  not-found.tsx
src/app/sitemap.ts      "", /cv, /blog, posts × locales
src/components/
  landing/              landing.tsx (shell+tabs), agent-graph.tsx, node-preview.tsx, products-grid.tsx, graph-dialog.tsx, github-heatmap.tsx
  newsletter/           newsletter-form.tsx(NewsletterCard), newsletter-popup.tsx, subscription.ts
  section/              WorkSection, ProjectsSection, CtaSection, NewsletterSection, HackathonsSection(unused)
  contact/contact-actions.tsx  BookCallButton(Calendly popup, lazy script), CopyEmailButton
  navbar.tsx            bottom Dock (nav+socials+theme); returns null on landing
  language-switcher.tsx native [popover] menu; sets NEXT_LOCALE. fixed top-right (hidden on landing) | `inline` (landing header)
  icons.tsx             Icons{github,linkedin,x,youtube,soundcloud,instagram,email,…}
  magicui/ mdx/ ui/ ui/svgs/(many unused)
src/lib/github.ts       getGithubData(): profile, recent own repos, contributions (ISR 1d; calendar via github-contributions-api.jogruber.de, optional → null). opt env GITHUB_TOKEN
content/*.mdx           posts (schema content-collections.ts); posts EN only, chrome localized
```

## conventions
- alias `@/*`→src. RSC default; `"use client"` only for state/motion/events.
- tokens: oklch warm paper (light) / warm ink (dark); dark variant `.dark`. shadows tinted `oklch(0.45 0.1 45 / a)`.
- fonts: sans=Crimson(body) · heading=Quattrocento · display=Turret Road · hand=Caveat · tech=Quantico · mono=Geist Mono.
- section reveal: BlurFade + BLUR_FADE_DELAY stagger.
- i18n: prose DATA fields = `{en,fr,de}` → `t(field,lang)`; non-prose plain. UI strings → dictionaries.ts. internal links ⇒ `localePath`. new locale ⇒ config.locales + dictionary + every Localized field.
- certifications[] ⇒ each sets `logoShape:"square"|"circle"` + `invertOnDark:boolean` (const union).
- projects[].description ≤ ~2 lines (~150ch EN) all locales. images: leading-slash paths; `sips -s format jpeg -s formatOptions 72 -Z 1200` before public/. card zoom knob `scale-[1.25]`.
- skills: wrapper from ui/svgs → `DATA.skills {name, icon}`.
- socials: `DATA.contact.social.{Name:{name,url,icon,navbar}}`; navbar:true → dock.
- motion: respect reduced motion (`MotionConfig reducedMotion="user"`; CSS anims have `prefers-reduced-motion` off-switch in globals.css).
- browser storage: only `newsletter-subscribed` (localStorage) + `NEXT_LOCALE` (cookie). ✗ other persistence.

## newsletter (Brevo)
- NewsletterCard: native form → POST `DATA.contact.newsletterAction` body urlencoded + `isAjax=1` → JSON `{success}` (Brevo CORS echoes origin). ✗ Brevo script/CSS. honeypot `email_address_check`.
- UI: blurred wave bg (always) · boat submit icon · submit ⇒ boat `layoutId` flies into BoardingScene (progress→steps) → success. copy `dict.newsletter`.
- state: `subscription.ts` useSubscribed (useSyncExternalStore, localStorage). subscribed ⇒ every card shows onboarded (`successText` if just now, else `alreadyText`); popup never opens.
- popup: non-modal bottom-right; once/visit; 3s on landing, else 30s or 50% scroll; skips if #newsletter visible.

## LANDING (agent workflow) — strict procedure
design source: Claude Design project "Portfolio v2.dc.html" (ink + gold). page bg + header text follow the SITE theme (`bg-background`, `text-foreground`; ✗ forced `.dark`); dark "device" surfaces (graph panel, product cards) use tokens `--color-l-*` in globals.css `@theme` (l-bg, l-panel, l-node, l-pop, l-row, l-line, l-border(2), l-edge, l-hover, l-text, l-soft, l-muted, l-dim, l-gold, l-gold-hi). popovers/dialogs use site tokens. fonts: `font-garamond` (EB Garamond) prose, `font-mono` (Geist Mono) chrome/commands.
files (`components/landing/`):
- loading flow (landing.tsx PHASE): 0 intro = name decodes big centred (DecodeText scrambleFirst) → 1.9s logo → 2.4s graph mounts (draws for `GRAPH_INTRO_S`) → tabs → +0.5s language + Let's talk → `markLandingReady()` → newsletter popup 10s later. once per visit (module flag); reduced motion skips. schedule timers once on mount (✗ per-phase effect: cleanup cancels the rest).
- header = absolute glass (`backdrop-blur-xl` only, ✗ bg tint, h-16); main pt-20 gap. products main scrolls under it.
- landing.tsx — shell: header [`~/fares.aouani` (DecodeText: glyph decode on hover; ✗ avatar/badge) | SegmentedTabs (light-orange track, #B5541F pill slides via offsetLeft/Width, cubic-bezier(.65,0,.35,1) .4s) | inline LanguageSwitcher + DirectionButton "Let's talk" (amber clip-path fill from cursor entry, `.direction-btn` in globals)], body = AgentGraph | ProductsGrid. owns tab + contact GraphDialog. header-ui.tsx holds the 3 header widgets.
- outlines = light gray (`l-border*` = text @14–20%); edges `l-edge` (@30%) brighter than outlines; graph panel: shadow only, ✗ border.
- agent-graph.tsx — graph. node-preview.tsx — `buildPreview(id, ctx)` → PreviewSpec + `NodePopover` renderer. products-grid.tsx — DATA.offers cards (bg image = placeholder, TODO). github-heatmap.tsx.
graph model (tables, one renderer, ✗ per-node JSX):
| table | role |
|---|---|
| `NodeId` | union |
| `CANVAS` | wide 1200×700 · tall 520×1000 (layout tall if wrapper < 760px) |
| `GEO.wide/.tall` | `{x,y,r,lb}` canvas px; r: agent 46 · hub 32 · leaf 24 (leaf ⇒ handle label, hidden on tall) |
| `EDGES` | `[a,b,kind]` in draw order; kind page·dialog·external → COL |
| `icon()` `label()` | switch over NodeId |
canvas scaled to fit: `scale = clamp(min((w-24)/W,(h-70)/H), .3, 1.25)`.
edges: `route(A,B)` = side-to-side + mid vertical if |dx| > rA+rB+20, else label-bottom → top + mid horizontal; `rpath` rounds corners (r14) and returns length for packets.
motion: intro — agent 0.1s, edge i draws at 0.3+0.35i, target node + check pop when drawn (13 edges ≈ 4.9s). packets = 44px dash `<animate>` dashoffset per edge; run/pause button; off for prefers-reduced-motion (`useReducedMotion`).
interaction: hover/focus OR click ⇒ focus (`active = sel ?? hovered`): others opacity .18 + blur 1.5px, unrelated edges .25, gold halo; click toggles card + gold ring; popover wide = inside canvas beside node (right if agent or x<W/2), tall = bottom sheet portal. close: canvas click, Esc, re-click.
popover (NodePopover) = compact site-token card (w-80, p-3, rounded-xl, bg-card — dark via landing `.dark`): header icon(32) · title/sub · Pill (neutral|live|warm) · primary arrow button; rows `→ icon title/sub(mono) Pill` (tone from KIND_TONE); rows can `href` | `onClick` | `copy` (clipboard + "Copied ✓"). extra block: agent org avatars (work+nonProfit, dedupe by logo, max 6 then …), github heatmap.
add node ⇒ (1) NodeId (2) GEO wide+tall (3) EDGES entry (position = draw order) (4) icon()+label() (5) buildPreview case (6) strings `dict.landing` ×3 (7) social url/icon in DATA.contact.social.
offer cards: `.offer` hover = scale(1.03) from centre (spring) + amber `.offer-fill` + glow + z-30; transform only (✗ layout change); growth must fit main padding (≥16px) so no scroll (above glass header z-20); siblings ONLY dim via `.offer-grid:has(.offer:hover)` — ✗ sibling scale/move. products main: `overflow-x-hidden` + `scrollbar-gutter: stable` so hover never toggles a scrollbar (jitter).
offers ⇒ `DATA.offers {id, group: product|hire, icon: OFFER_ICON key, title/description Localized, tags, command}`; feeds Products tab + products/qartmina/agent popovers.

## gotchas
- next.config.mjs: security headers; `withContentCollections` ⇒ outermost.
- blog OG fonts `public/fonts/*.ttf` at edge.
- motion sets `transform` → ✗ `fixed` children inside animated nodes (use portal).
- Tailwind v4 `translate-*` uses CSS `translate` (coexists with motion transform).
- headless verify: scratch CDP script (Chrome --remote-debugging, wait real ms); `--virtual-time-budget` doesn't advance motion delays; window <500px gets clamped → use Emulation.setDeviceMetricsOverride.
