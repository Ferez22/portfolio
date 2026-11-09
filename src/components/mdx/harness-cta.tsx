"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/icons";
import { NewsletterCard } from "@/components/newsletter/newsletter-form";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const REPO = "https://github.com/Ferez22/content-studio";

/**
 * Closing CTA of the content-studio post: repo (primary), what the open
 * source studio includes, then the newsletter card.
 */
export function HarnessCta() {
  const segment = usePathname().split("/")[1];
  const lang: Locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <div className="not-prose my-8 flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl bg-l-panel p-5 text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] sm:p-6">
        <p className="m-0 font-garamond text-2xl font-medium leading-tight">Clone it, type onboarding.</p>
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-l-gold no-underline! px-5 py-2.5 font-garamond text-[17px] leading-none text-l-bg transition-colors hover:bg-l-gold-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold focus-visible:ring-offset-2 focus-visible:ring-offset-l-panel"
        >
          <Icons.github className="size-4" />
          Ferez22/content-studio
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
        <div className="flex flex-col gap-2 border-t border-l-border pt-4">
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.08em] text-l-gold">Open source, MIT</p>
          <p className="m-0 font-garamond text-[17px] leading-snug text-l-muted">
            The whole studio, not a demo: several brands, motion videos rendered in code, SEO articles shipped as pull
            requests from Search Console data, brand assets and a guided onboarding. Fork it, change the rules, make it
            yours.
          </p>
        </div>
      </div>
      <NewsletterCard
        lang={lang}
        dict={dict.newsletter}
        className="rounded-2xl border border-border bg-card p-5"
        header={
          <div className="flex flex-col gap-1">
            <h3 className="m-0 font-heading text-base font-bold">{dict.newsletter.heading}</h3>
            <p className="m-0 font-sans text-sm text-muted-foreground">{dict.newsletter.text}</p>
          </div>
        }
      />
    </div>
  );
}
