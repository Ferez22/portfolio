"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck } from "lucide-react";

type Props = {
  label: string;
  hint: string;
  ctaLabel: string;
  ctaHref: string;
};

/**
 * "Available for AI coaching & builds" pill with a floating panel holding a CTA.
 * Opens on hover (pointer) and on click/focus (touch + keyboard). Not a real
 * tooltip — it contains a button, so it's a labelled popover instead.
 */
export default function AvailabilityBadge({
  label,
  hint,
  ctaLabel,
  ctaHref,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  // Grace period so the pointer can travel from the pill into the panel.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 300);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => cancelClose, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-fit"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-amber-700/25 px-3 py-1 font-sans text-xs text-muted-foreground transition-colors hover:border-amber-700/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700/60 sm:text-sm dark:border-amber-400/25 dark:hover:border-amber-400/50"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 w-64 origin-top-left pt-2"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="rounded-xl border border-amber-700/20 bg-linear-to-br from-amber-50 to-orange-50/70 p-3 shadow-[0_16px_40px_-16px_oklch(0.45_0.1_45/0.45)] dark:border-amber-400/20 dark:from-neutral-900 dark:to-amber-950/40">
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {hint}
              </p>
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 font-sans text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700/60"
              >
                <CalendarCheck className="size-3.5" />
                {ctaLabel}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
