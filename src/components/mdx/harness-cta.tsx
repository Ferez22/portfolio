"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/icons";
import { NewsletterCard } from "@/components/newsletter/newsletter-form";
import { defaultLocale, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const REPO = "https://github.com/Ferez22/content-studio-free";

/**
 * Closing CTA of the content-studio-free post: repo (primary), the paid
 * Content Studio it is the free version of (Products tab), then the
 * newsletter card.
 */
export function HarnessCta() {
  const segment = usePathname().split("/")[1];
  const lang: Locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <div className="not-prose my-8 flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl bg-l-panel p-5 text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] sm:p-6">
        <p className="m-0 font-garamond text-2xl font-medium leading-tight">Clone it, type start.</p>
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-l-gold no-underline! px-5 py-2.5 font-garamond text-[17px] leading-none text-l-bg transition-colors hover:bg-l-gold-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold focus-visible:ring-offset-2 focus-visible:ring-offset-l-panel"
        >
          <Icons.github className="size-4" />
          Ferez22/content-studio-free
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
        <div className="flex flex-col gap-2 border-t border-l-border pt-4">
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.08em] text-l-gold">Want the full version?</p>
          <p className="m-0 font-garamond text-[17px] leading-snug text-l-muted">
            This is the free version of Content Studio: one brand, posts only. The full one runs several brands, SEO
            articles shipped as pull requests from Search Console data, motion videos rendered in code, brand assets and a guided
            onboarding, with lifetime updates.
          </p>
          <Link
            href={localePath(lang, "/#products")}
            className="group inline-flex w-fit items-center gap-1.5 font-garamond text-[17px] text-l-gold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold"
          >
            See Content Studio
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
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
