"use client";

import { useEffect } from "react";

/** Ordered ids of the landing page's full-screen sections. */
export const SECTION_IDS = [
  "hero",
  "projects",
  "thesis",
  "chronology",
  "video",
  "contact",
] as const;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True when the event came from somewhere a space bar means something else. */
function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  // Buttons and links treat space/enter as activation — don't steal it.
  return tag === "BUTTON" || tag === "A" || target.closest("[role='button']") !== null;
}

/** Index of the section currently filling most of the viewport. */
function currentIndex(ids: readonly string[]) {
  const probe = window.scrollY + window.innerHeight * 0.4;
  let index = 0;
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= probe) index = i;
  });
  return index;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * SPACE (and shift+SPACE) jump between full-screen sections. Native scrolling
 * is untouched — this only adds a shortcut, so trackpad, keyboard and
 * screen-reader navigation all keep working normally.
 */
export function useSectionNav(ids: readonly string[] = SECTION_IDS) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code !== "Space") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const next = currentIndex(ids) + (event.shiftKey ? -1 : 1);
      const target = ids[Math.min(Math.max(next, 0), ids.length - 1)];
      if (!document.getElementById(target)) return;

      event.preventDefault();
      scrollToSection(target);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ids]);
}
