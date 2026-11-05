"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowDown, ArrowUpRight, Check, Copy, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Icons } from "@/components/icons";
import { BookCallButton } from "@/components/contact/contact-actions";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

/** Light summary card at the top of a post; optional repo button and a "Live demo" button that scrolls to `#demo`. */
export function TLDR({ children, repo, demo }: { children: React.ReactNode; repo?: string; demo?: string }) {
  return (
    <aside className="not-prose my-6 rounded-2xl border border-amber-900/10 bg-amber-50/70 p-4 text-foreground shadow-[0_12px_32px_-22px_oklch(0.45_0.1_45/0.5)] sm:p-5 dark:border-amber-200/15 dark:bg-amber-100/[0.06]">
      <p className="m-0 mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">TL;DR</p>
      <div className="font-sans text-[16px] leading-relaxed [&_li]:my-1 [&_li]:pl-0.5 [&_p]:m-0 [&_strong]:text-foreground [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_code]:rounded [&_code]:bg-amber-900/[0.07] [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] dark:[&_code]:bg-amber-100/10">
        {children}
      </div>
      {(repo || demo) && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary no-underline! px-4 py-2 font-sans text-[15px] font-semibold text-primary-foreground transition-shadow hover:shadow-[0_10px_28px_-12px_oklch(0.45_0.1_45/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icons.github className="size-4" />
              {repo.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          )}
          {demo && (
            <a
              href={`#${demo}`}
              onClick={(e) => {
                const target = document.getElementById(demo);
                if (!target) return;
                e.preventDefault();
                const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
                target.querySelector("textarea")?.focus({ preventScroll: true });
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-amber-900/20 no-underline! px-4 py-2 font-sans text-[15px] font-semibold text-foreground transition-colors hover:bg-amber-900/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-amber-200/20 dark:hover:bg-amber-100/[0.08]"
            >
              Live demo
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
          )}
        </div>
      )}
    </aside>
  );
}

/** Copy-ready prompt card: header bar (label · title · copy) over the prompt text. */
export function Prompt({ title, children }: { title: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);
  // MDX may autolink the URL, so copy what is rendered, not `children`.
  const body = useRef<HTMLParagraphElement>(null);

  return (
    <div className="not-prose my-3 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-800 dark:text-amber-300">Prompt</span>
        <span className="font-sans text-[15px] text-foreground">{title}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(body.current?.textContent ?? "").catch(() => {});
            setCopied(true);
          }}
          aria-label={copied ? "Copied" : "Copy prompt"}
          className="ml-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        </button>
      </div>
      <p ref={body} className="m-0 break-words px-4 py-3.5 font-mono text-[14px] leading-relaxed text-foreground [&_a]:text-amber-800 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-amber-300">{children}</p>
    </div>
  );
}

/** Post accordions: open row becomes a tinted panel, + / − icon chip on the left. */
export function Accordion({ className, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      className={cn("not-prose my-4 flex flex-col gap-1", className)}
      {...(props as ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
    />
  );
}

export function AccordionItem({ className, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "rounded-2xl transition-colors duration-200 data-[state=open]:bg-amber-50 dark:data-[state=open]:bg-amber-100/[0.06]",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, children, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center gap-3 rounded-2xl px-2 py-2 text-left font-sans text-[16px] font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors group-hover:text-amber-800 group-data-[state=open]:bg-background group-data-[state=open]:shadow-sm dark:group-hover:text-amber-300"
        >
          <Plus className="size-4 group-data-[state=open]:hidden" />
          <Minus className="hidden size-4 group-data-[state=open]:block" />
        </span>
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "pb-4 pl-14 pr-4 font-sans text-[15px] leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-background [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] [&_strong]:text-foreground",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

/** Sales card for the paid version, styled like TLDR; "Book a demo" opens Calendly. */
export function FullVersion({ title, lead, children }: { title: string; lead: string; children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-amber-900/15 bg-amber-50/70 p-4 text-foreground shadow-[0_12px_32px_-22px_oklch(0.45_0.1_45/0.5)] sm:p-6 dark:border-amber-200/20 dark:bg-amber-100/[0.06]">
      <p className="m-0 mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">Full version</p>
      <p className="m-0 font-garamond text-2xl font-medium leading-tight">{title}</p>
      <p className="m-0 mt-1 font-sans text-[16px] text-muted-foreground">{lead}</p>
      <div className="mt-3 font-sans text-[16px] leading-relaxed [&_li]:my-1.5 [&_li]:pl-0.5 [&_p]:m-0 [&_strong]:text-foreground [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <BookCallButton url={DATA.contact.calendlyUrl} label="Book a demo" className="rounded-full px-5 py-2.5 text-[15px]" />
        <span className="font-sans text-[14px] text-muted-foreground">30 minutes, free. I show it running on a real brand.</span>
      </div>
    </aside>
  );
}
