"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Globe, Terminal } from "lucide-react";
import { DATA } from "@/data/resume";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import type { PostPreview } from "./node-preview";

type Card = {
  key: string;
  title: string;
  meta: string;
  summary?: string;
  href: string;
  image?: string;
  icon?: React.ReactNode;
};

const FILL = "linear-gradient(160deg,rgba(242,196,106,.2),rgba(181,84,31,.16) 60%,rgba(242,196,106,.05))";

/** Netflix-style poster: 16:9, image (or monogram) under a bottom scrim; grows on hover. */
function Poster({ card }: { card: Card }) {
  const external = /^https?:/.test(card.href);
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      {card.image ? (
        <img src={card.image} alt="" className="absolute inset-0 size-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "repeating-linear-gradient(135deg,rgba(242,196,106,.06) 0 1px,transparent 1px 12px)" }}
        >
          {card.icon ?? <span className="font-mono text-4xl text-l-gold/40">{card.title.slice(0, 2).toLowerCase()}</span>}
        </span>
      )}
      <span aria-hidden className="offer-fill pointer-events-none absolute inset-0" style={{ background: FILL }} />
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,#121420_8%,rgba(18,20,32,.75)_45%,transparent_80%)]" />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        <span className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-l-gold">
          <span className="truncate">{card.meta}</span>
          <Arrow className="size-3.5 shrink-0 text-l-muted" aria-hidden />
        </span>
        <span className="line-clamp-2 font-garamond text-xl font-medium leading-tight text-l-text">{card.title}</span>
        {card.summary && (
          <span className="line-clamp-2 max-h-0 overflow-hidden font-garamond text-[15px] leading-snug text-l-muted opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100">
            {card.summary}
          </span>
        )}
      </span>
    </>
  );
  const cls = "group relative block size-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold";
  return external ? (
    <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={card.href} className={cls}>
      {inner}
    </Link>
  );
}

/** One shelf: title + sub, arrow buttons, horizontally snapping row of posters. */
function Shelf({ title, sub, cards, dict }: { title: string; sub: string; cards: Card[]; dict: Dictionary }) {
  const row = useRef<HTMLUListElement>(null);
  const l = dict.landing;
  const scroll = (dir: 1 | -1) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.85, behavior: "smooth" });
  const arrow =
    "hidden size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur transition-colors hover:text-foreground md:flex";

  return (
    <section className="flex flex-col gap-1">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="m-0 font-garamond text-2xl font-medium tracking-[-0.01em] text-foreground sm:text-[28px]">{title}</h2>
          <p className="m-0 font-mono text-xs text-muted-foreground">{sub}</p>
        </div>
        {cards.length > 1 && (
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label={l.scrollPrev} className={arrow}>
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label={l.scrollNext} className={arrow}>
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
      {/* Vertical padding = room for the hover growth inside the scroller. */}
      <ul
        ref={row}
        className="offer-grid shelf -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overflow-y-hidden px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.length === 0 ? (
          <li className="flex aspect-video w-[min(78vw,320px)] shrink-0 items-center justify-center rounded-2xl border border-dashed border-border font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
            {l.comingSoon}
          </li>
        ) : (
          cards.map((c) => (
            <li key={c.key} className="offer relative aspect-video w-[min(78vw,340px)] shrink-0 snap-start overflow-hidden rounded-2xl bg-l-panel">
              <Poster card={c} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

/**
 * Blog tab: three Netflix-style shelves — Scratch your own itch (itch posts +
 * shipped tools from DATA.tools), About me, Case studies (posts by
 * frontmatter `category`).
 */
export function BlogList({ lang, dict, posts }: { lang: Locale; dict: Dictionary; posts: PostPreview[] }) {
  const l = dict.landing;
  const date = (d: string) => new Date(d).toLocaleDateString(lang, { year: "numeric", month: "short", day: "numeric" });
  const postCards = (cat: PostPreview["category"]): Card[] =>
    posts
      .filter((p) => p.category === cat)
      .map((p) => ({
        key: p.slug,
        title: p.title,
        meta: date(p.publishedAt),
        summary: p.summary,
        href: localePath(lang, `/blog/${p.slug}`),
        image: p.image,
      }));
  const toolCards: Card[] = DATA.tools
    .filter((tool) => tool.kind !== "client")
    .map((tool) => ({
      key: tool.name,
      title: tool.name,
      meta: tool.kind === "oss" ? l.kindOss : l.kindOwn,
      summary: "command" in tool ? tool.command : tool.href.replace(/^https?:\/\//, ""),
      href: tool.href,
      icon:
        "command" in tool ? (
          <Terminal className="size-10 text-l-gold/50" aria-hidden />
        ) : (
          <Globe className="size-10 text-l-gold/50" aria-hidden />
        ),
    }));

  return (
    <div className={cn("mx-auto flex w-full max-w-[1400px] flex-col gap-6")}>
      <Shelf title={l.shelfItch} sub={l.shelfItchSub} cards={[...postCards("itch"), ...toolCards]} dict={dict} />
      <Shelf title={l.shelfAbout} sub={l.shelfAboutSub} cards={postCards("about")} dict={dict} />
      <Shelf title={l.shelfCases} sub={l.shelfCasesSub} cards={postCards("case-study")} dict={dict} />
    </div>
  );
}
