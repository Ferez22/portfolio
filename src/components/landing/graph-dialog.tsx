"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/** Native modal <dialog> (focus trap, Esc, backdrop) driven by `open`. */
export function GraphDialog({
  open,
  onClose,
  title,
  closeLabel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={title}
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-border bg-background p-0 text-foreground shadow-[0_32px_90px_-30px_oklch(0.45_0.1_45/0.5)] backdrop:bg-background/60 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 open:zoom-in-95 open:duration-300"
    >
      <div className="relative max-h-[85dvh] overflow-y-auto p-5 sm:p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <X className="size-4" aria-hidden />
        </button>
        <h2 className="mb-4 pr-10 font-heading text-xl font-bold tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}
