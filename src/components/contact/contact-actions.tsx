"use client";

import Script from "next/script";
import { useState } from "react";
import { Calendar, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/** Primary CTA — opens Calendly in an overlay (script lazy-loaded). */
export function BookCallButton({
  url,
  className,
  label = "Book a call",
}: {
  url: string;
  className?: string;
  label?: string;
}) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {/* React 19 hoists this <link> into <head> */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
      />
      <button
        type="button"
        onClick={() => {
          if (window.Calendly) {
            window.Calendly.initPopupWidget({ url });
          } else {
            // Script not ready yet — fall back to opening the page directly
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }}
        aria-busy={!ready}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-base font-bold tracking-wide text-primary-foreground shadow-[0_12px_40px_-12px_oklch(0.45_0.1_45/0.5)] ring-1 ring-amber-950/10 dark:ring-amber-200/15 transition-all hover:shadow-[0_16px_50px_-12px_oklch(0.45_0.1_45/0.6)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
          className
        )}
      >
        <Calendar className="size-4" aria-hidden />
        {label}
      </button>
    </>
  );
}

/** Secondary CTA — copy the email to clipboard with feedback. */
export function CopyEmailButton({
  email,
  className,
  copyLabel = "Copy",
  copiedLabel = "Copied",
}: {
  email: string;
  className?: string;
  copyLabel?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — no-op, the mailto link is still available
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 font-tech text-xs font-bold uppercase tracking-wider text-muted-foreground ring-1 ring-amber-950/5 dark:ring-amber-200/10 transition-colors hover:text-foreground hover:ring-amber-800/15 dark:hover:ring-amber-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
        className
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
