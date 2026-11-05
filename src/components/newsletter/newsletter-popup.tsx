"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { NewsletterCard } from "./newsletter-form";
import { isSubscribed, useSubscribed } from "./subscription";

const DELAY_MS = 30_000;
const SCROLL_DEPTH = 0.5;
const AUTO_CLOSE_AFTER_SUCCESS_MS = 12_000;

/** Survives client-side navigation (layout persists); resets on full reload.
 *  Subscribers never see it again — that flag lives in localStorage. */
let shownThisVisit = false;

/**
 * Newsletter popup — non-modal card pinned bottom-right (no overlay, page
 * stays usable). Opens once per visit after 30s or 50% scroll depth, unless
 * the inline #newsletter section is on screen or the visitor subscribed.
 * Sits above the bottom dock on small screens.
 */
export function NewsletterPopup({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["newsletter"];
}) {
  const [open, setOpen] = useState(false);
  const subscribed = useSubscribed();

  useEffect(() => {
    if (shownThisVisit || isSubscribed()) return;

    const sectionVisible = () => {
      const el = document.getElementById("newsletter");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const show = () => {
      if (shownThisVisit || isSubscribed() || sectionVisible()) return;
      shownThisVisit = true;
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_DEPTH) show();
    };

    const timer = window.setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  // Subscribed (here or in the page section) while open → show the
  // onboarded state for a while, then get out of the way.
  useEffect(() => {
    if (!open || !subscribed) return;
    const t = window.setTimeout(() => setOpen(false), AUTO_CLOSE_AFTER_SUCCESS_MS);
    return () => window.clearTimeout(t);
  }, [open, subscribed]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="newsletter-popup-title"
      className="fixed inset-x-4 bottom-24 z-40 sm:inset-x-auto sm:right-6 sm:w-[22rem] lg:bottom-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
    >
      <NewsletterCard
        lang={lang}
        dict={dict}
        className="rounded-2xl border border-border bg-card p-5 shadow-[0_24px_70px_-28px_oklch(0.45_0.1_45/0.45)] hover:shadow-[0_32px_80px_-24px_oklch(0.45_0.1_45/0.55)]"
        header={
          <div className="flex flex-col gap-1 pr-7">
            <h2
              id="newsletter-popup-title"
              className="font-heading text-xl font-bold tracking-tight text-balance"
            >
              {dict.heading}
            </h2>
            <p className="font-sans text-base leading-snug text-muted-foreground text-pretty">
              {dict.text}
            </p>
          </div>
        }
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={dict.close}
          className="absolute right-3 top-3 z-20 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <X className="size-4" aria-hidden />
        </button>
      </NewsletterCard>
    </div>
  );
}
