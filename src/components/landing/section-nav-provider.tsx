"use client";

import { useSectionNav } from "@/lib/section-nav";

/** Enables the SPACE / shift+SPACE section jump on the landing page. */
export default function SectionNavProvider() {
  useSectionNav();
  return null;
}
