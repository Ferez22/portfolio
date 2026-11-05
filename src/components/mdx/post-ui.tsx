"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Light summary card at the top of a post. */
export function TLDR({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-6 rounded-2xl border border-amber-900/10 bg-amber-50/70 p-4 text-foreground shadow-[0_12px_32px_-22px_oklch(0.45_0.1_45/0.5)] sm:p-5 dark:border-amber-200/15 dark:bg-amber-100/[0.06]">
      <p className="m-0 mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">TL;DR</p>
      <div className="font-sans text-[16px] leading-relaxed [&_li]:my-1 [&_li]:pl-0.5 [&_p]:m-0 [&_strong]:text-foreground [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_code]:rounded [&_code]:bg-amber-900/[0.07] [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] dark:[&_code]:bg-amber-100/10">
        {children}
      </div>
    </aside>
  );
}

/** Post accordions: one bordered card, compact rows (same API as ui/accordion). */
export function Accordion({ className, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      className={cn("not-prose my-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card", className)}
      {...(props as ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
    />
  );
}

export function AccordionItem({ className, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("px-4", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between gap-3 py-3 text-left font-sans text-[16px] font-semibold text-foreground transition-colors hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-amber-300",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
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
          "pb-3 font-sans text-[15px] leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] [&_strong]:text-foreground",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
