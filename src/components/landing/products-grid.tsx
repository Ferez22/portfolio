/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import { t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { OFFER_ICON } from "./node-preview";

/**
 * Products tab: Qartmina products + freelance offers from `DATA.offers`.
 * The tilted striped panel is a placeholder for the per-card background image.
 */
export function ProductsGrid({ lang, dict, onContact }: { lang: Locale; dict: Dictionary; onContact: () => void }) {
  const l = dict.landing;
  return (
    <section className="offer-grid grid min-h-full auto-rows-[minmax(280px,1fr)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {DATA.offers.map((o) => {
        const Icon = OFFER_ICON[o.icon];
        const isProduct = o.group === "product";
        return (
          <article
            key={o.id}
            className="offer relative flex min-h-0 flex-col gap-2.5 overflow-hidden rounded-3xl bg-l-panel px-[clamp(18px,2vw,26px)] py-[clamp(16px,2vh,24px)]"
          >
            {/* Background image placeholder */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-[12%] -top-[30%] flex h-[160%] w-[72%] -rotate-12 items-center justify-center rounded-[28px] border border-l-gold/20"
              style={{ background: "repeating-linear-gradient(135deg,rgba(242,196,106,.07) 0 1px,transparent 1px 12px)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(90deg,#121420 30%,rgba(18,20,32,.4) 75%,rgba(18,20,32,.15))" }}
            />

            {/* Amber fill on hover (globals.css .offer:hover .offer-fill) */}
            <div
              aria-hidden
              className="offer-fill pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(160deg,rgba(242,196,106,.22),rgba(181,84,31,.18) 60%,rgba(242,196,106,.06))" }}
            />

            <div className="relative flex items-center gap-3.5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-l-border2 bg-l-node">
                <Icon className="size-[22px] text-l-gold" aria-hidden />
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-l-gold">
                {isProduct ? (
                  <>
                    {l.productGroup} ·
                    <img src="/Qartmina Logo main.png" alt="Qartmina" className="h-[13px] w-auto invert" />
                  </>
                ) : (
                  l.hireGroup
                )}
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-[#34D399]">
                <span className="size-1.5 rounded-full bg-[#34D399]" aria-hidden />
                {isProduct ? l.live : l.available}
              </span>
            </div>

            <div className="relative mt-auto flex flex-col gap-2.5">
              <h3 className="m-0 font-garamond text-[clamp(24px,3.4vh,36px)] font-medium leading-[1.05] tracking-[-0.01em] text-l-text">
                {t(o.title, lang)}
              </h3>
              <p className="m-0 line-clamp-2 max-w-[440px] font-garamond text-[clamp(15px,2vh,18px)] leading-[1.35] text-l-muted text-pretty">
                {t(o.description, lang)}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {o.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-l-border2 bg-l-node/80 px-2.5 py-1 font-mono text-[11px] text-l-soft">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-l-border pt-3.5">
              <code className="font-mono text-xs text-l-gold">{o.command}</code>
              <button
                type="button"
                onClick={onContact}
                className="cursor-pointer rounded-full bg-l-gold px-[18px] py-[9px] font-garamond text-[17px] leading-none text-l-bg transition-colors hover:bg-l-gold-hi"
              >
                {l.letsTalk} →
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
