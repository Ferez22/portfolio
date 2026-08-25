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
          "group inline-flex cursor-pointer items-center justify-center gap-2",
          "rounded-2xl border-4 border-foreground bg-primary px-6 py-3",
          "font-display text-base font-bold tracking-wide text-primary-foreground",
          "shadow-[8px_9px_0_0_var(--color-foreground)] transition-all",
          "hover:-translate-y-0.5 hover:shadow-[10px_12px_0_0_var(--color-foreground)]",
          "active:translate-y-0.5 active:shadow-[3px_4px_0_0_var(--color-foreground)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
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
        "inline-flex cursor-pointer items-center gap-2",
        "rounded-xl border-[3px] border-foreground bg-card px-3 py-2",
        "font-tech text-xs font-bold uppercase tracking-wider text-foreground",
        "shadow-[4px_5px_0_0_var(--color-foreground)] transition-all",
        "hover:-translate-y-0.5 hover:shadow-[5px_6px_0_0_var(--color-foreground)]",
        "active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-foreground)]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
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
