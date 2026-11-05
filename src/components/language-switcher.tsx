"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Languages } from "lucide-react";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  localeNames,
  localePath,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

const POPOVER_ID = "language-menu";

function rememberLocale(loc: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${loc}; path=/; max-age=31536000; samesite=lax`;
  document.getElementById(POPOVER_ID)?.hidePopover();
}

/**
 * Low-key language switch, top-right. Native popover (light dismiss + Esc).
 * Visitors land in their browser language via `proxy.ts`; picking one here
 * stores it in a cookie that the proxy then prefers.
 */
export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const lang: Locale = isLocale(segment) ? segment : defaultLocale;
  // Path minus the current locale prefix, so switching keeps the page.
  const restPath = isLocale(segment)
    ? pathname.slice(`/${segment}`.length) || "/"
    : pathname;
  const label = getDictionary(lang).tooltip.language;
  // The landing page renders its own inline switcher in its header.
  const isLanding = pathname === `/${segment}` && isLocale(segment);
  if (!inline && isLanding) return null;

  return (
    <>
      <button
        type="button"
        popoverTarget={POPOVER_ID}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer",
          inline
            ? "font-mono text-xs text-l-muted hover:text-l-text focus-visible:ring-l-gold"
            : "fixed right-3 top-3 z-40 font-tech text-[0.65rem] font-bold tracking-wider text-muted-foreground/60 hover:bg-muted/70 hover:text-foreground focus-visible:ring-ring",
        )}
      >
        <Languages className="size-3.5" aria-hidden />
        {localeNames[lang]}
      </button>
      <div
        id={POPOVER_ID}
        popover="auto"
        className={cn(
          "fixed inset-auto m-0 min-w-36 rounded-xl border border-border bg-card p-1 text-foreground shadow-[0_18px_50px_-24px_oklch(0.45_0.1_45/0.45)]",
          inline ? "right-32 top-14" : "right-3 top-11",
        )}
      >
        <ul aria-label={label} className="flex flex-col">
          {locales.map((loc) => (
            <li key={loc}>
              <Link
                href={localePath(loc, restPath)}
                hrefLang={loc}
                lang={loc}
                aria-current={loc === lang ? "true" : undefined}
                onClick={() => rememberLocale(loc)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 font-sans text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:bg-muted",
                  loc === lang ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {LABELS[loc]}
                {loc === lang && <Check className="size-3.5" aria-hidden />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
