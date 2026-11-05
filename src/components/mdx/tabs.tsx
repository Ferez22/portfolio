"use client";

import { Children, useId, useState } from "react";
import { cn } from "@/lib/utils";

/** One tab panel; its MDX children (code blocks, lists) render as usual. */
export function Tab({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/** MDX tabs: `<Tabs labels={["A","B"]}><Tab>…</Tab><Tab>…</Tab></Tabs>`. Arrow keys move between tabs. */
export function Tabs({ labels, children }: { labels: string[]; children: React.ReactNode }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const panels = Children.toArray(children);

  return (
    <div className="not-prose my-6">
      <div
        role="tablist"
        className="inline-flex gap-1 rounded-full bg-l-gold/20 p-1"
        onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          const next = (active + (e.key === "ArrowRight" ? 1 : labels.length - 1)) % labels.length;
          setActive(next);
          document.getElementById(`${id}-tab-${next}`)?.focus();
        }}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1.5 font-garamond text-[15px] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold",
              active === i ? "bg-[#B5541F] text-white" : "text-foreground/70 hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div
          key={i}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="mt-3 [&>*:first-child]:mt-0"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
