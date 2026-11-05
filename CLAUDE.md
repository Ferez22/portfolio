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
  page.tsx              LANDING: fixed inset-0, no scroll; header(name, partner pill, GitHub stats) + <AgentGraph>
  cv/page.tsx           CV: hero, about, #contact(CtaSection 2col), certifications, non-profit, work, skills, projects, #newsletter
  blog/page.tsx         list, 5/page; blog/[slug]/page.tsx MDX + JSON-LD + prev/next
  opengraph-image.tsx ×3 (home, blog, post) — shared styles block, keep in sync
  not-found.tsx
src/app/sitemap.ts      "", /cv, /blog, posts × locales
src/components/
  landing/              agent-graph.tsx (graph), node-preview.tsx (click cards), graph-dialog.tsx (native modal), github-heatmap.tsx
  newsletter/           newsletter-form.tsx(NewsletterCard), newsletter-popup.tsx, subscription.ts
  section/              WorkSection, ProjectsSection, CtaSection, NewsletterSection, HackathonsSection(unused)
  contact/contact-actions.tsx  BookCallButton(Calendly popup, lazy script), CopyEmailButton
  navbar.tsx            bottom Dock (nav+socials+theme); returns null on landing
  language-switcher.tsx quiet top-right trigger + native [popover] menu; sets NEXT_LOCALE
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

## AGENT GRAPH (landing) — strict procedure
file: `components/landing/agent-graph.tsx`. model = data tables, one renderer. ✗ ad-hoc per-node JSX.

meaning (⇒ keep; edges encode it):
- agent → hubs kb, mcp, crm, github · mcp ↔ {agent, kb} only (tools I built) · github → agent only
- crm → email, calendar · socials (contact + knowledge) ⇒ each → {agent, kb, crm}
placement ⇒ scattered "agent workflow" look (ref: orchestrator screenshot), ✗ tiers/rows/columns. agent near centre, hubs around it, leaves scattered at edges.

tables (all keyed by `NodeId` union — TS enforces completeness):
| table | role |
|---|---|
| `NodeId` | union of ids |
| `KIND` | page·dialog·external → edge/beam colour (BEAM) + legend |
| `ACTION` | click: `link` (socials: open URL, label=@handle, no card) · `preview` (toggle NodePreview card) · `dialog` (CRM → contact GraphDialog) |
| `HUBS` | size class: agent=88/64 · hub=64/50 · leaf=52/40 (wide/tall px), all `rounded-full` |
| `POS.wide/.tall` | centre as canvas fraction; layout = wide if w ≥ 1.15h |
| `SOCIALS` | ids that auto-get edges → agent, kb, crm |
| `SOCIAL_ROUTING` | per social/target `{first?|route?}` so wide routes skirt nodes |
| `EDGES` | `{from,to,at,dur,connects,first?,route?}` |
| `icon()` `label()` | switch over NodeId; label = [title, sub?] |

add node ⇒ (1) extend NodeId (2) KIND (3) ACTION (4) POS wide+tall (5) icon()+label() (6) ≥1 edge (7) if preview: case in NodePreview (8) strings in `dict.landing` ×3 (9) social url/icon in DATA.contact.social + SOCIAL_KEY.
edges:
- routing: wide → `route` (hand polyline, fractions, from→to) > elbow with `first` ("h" default | "v"). tall → always h-first elbow. moving a node ⇒ re-check routes that pass near it (screenshot).
- path direction = draw + beam direction ⇒ leaves/socials point INTO hubs, agent edges point OUT.
- ✗ overlap (shared collinear runs), ✓ intersections. enforced by `separate(polys, gap)` after routing: same-line overlapping segments of different edges → parallel tracks gap=6px (tall 5). pipeline: edgePoints → clean (dup/collinear) → separate → roundedPath (r=14).
- agent trunks: x 0.49 (left hubs) / 0.51 (right hubs).
- stroke: idle line 1px `--border`@40%, idle beam 1.75px opacity .4; lit (active node) line 1.5px + beam 2.25px BEAM[kind] .9.
- `connects` = node whose check pops when edge finishes. node appears at `connectsAt(id)` = max(at+dur) of its edges.
- timeline budget ≈5s: agent 0.1 → mcp → kb(+mcp→kb) → crm → github → leaves via `leaf(i)` (2.6+0.33i: socials 0–4, email 5, calendar 6). keep total ≤5s; legend fades at 4.8.
interaction:
- hover/focus ⇒ halo + blur overlay (z10) + lifted active node & neighbours (z20/30) + lit edges (2nd SVG z20).
- `selected` (click) wins over hover. close: outside pointerdown (`[data-graph-node]`/`[data-graph-popover]`), Esc, re-click.
- card position wide: beside node (right if x<.55w, up if y>.55h). tall: bottom sheet via `createPortal(body)` (main is fixed z10 context).
- beams: `.animate-beam` (globals.css) pathLength=1 dash, ~0.9–1.35s.
NodePreview (`node-preview.tsx`) card spec — compact:
- Shell w-80 (narrow w-64) · p-3 · gap-2 · rounded-xl. header = icon(32 round) · title/sub · Pill? · open-arrow button (primary, size-7) = the only CTA. ✗ CTA buttons in body.
- body rows = `Row` "tool-call" style: → icon main/detail(mono for commands) meta-pill; border-t list.
- Pill tones: neutral · live(pulsing dot) · warm.
- current cards: agent(description + org avatars size-11 = work+nonProfit deduped by logo, max 6 then "…") · mcp(DATA.tools: `{name, command?, href, kind:oss|own|client}`) · kb(3 latest posts) · github(heatmap + 3 repos) · email · calendar.
- page passes `posts`(3 latest: title,slug,publishedAt) + `postCount` + `github`.

## gotchas
- next.config.mjs: security headers; `withContentCollections` ⇒ outermost.
- blog OG fonts `public/fonts/*.ttf` at edge.
- motion sets `transform` → ✗ `fixed` children inside animated nodes (use portal).
- Tailwind v4 `translate-*` uses CSS `translate` (coexists with motion transform).
- headless verify: scratch CDP script (Chrome --remote-debugging, wait real ms); `--virtual-time-budget` doesn't advance motion delays; window <500px gets clamped → use Emulation.setDeviceMetricsOverride.
