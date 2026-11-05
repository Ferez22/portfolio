"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LanguageSwitcher } from "@/components/language-switcher";
import CtaSection from "@/components/section/cta-section";
import { NewsletterCard } from "@/components/newsletter/newsletter-form";
import { markLandingReady } from "@/components/newsletter/newsletter-popup";
import { DATA } from "@/data/resume";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GithubData } from "@/lib/github";
import { cn } from "@/lib/utils";
import { AgentGraph } from "./agent-graph";
import { GraphDialog } from "./graph-dialog";
import { DecodeText, DirectionButton, SegmentedTabs } from "./header-ui";
import type { PostPreview } from "./node-preview";
import { ProductsGrid } from "./products-grid";
import { BlogList } from "./blog-list";

type Tab = "overview" | "products" | "blog";

/**
 * Loading flow (ms from mount): name decodes big & centred → logo → workflow
 * together with the navbar (tabs, language, Let's talk); the newsletter popup
 * follows 10s later (markLandingReady). Plays once per visit; skipped for
 * reduced motion.
 */
const PHASE = { logo: 1900, graph: 2400 } as const;
type Phase = 0 | 1 | 2; // intro · logo · graph + navbar (tabs, language, Let's talk)

/** Survives client navigation (layout persists); a full reload replays it. */
let introPlayed = false;

const reveal = (on: boolean) => ({
  initial: { opacity: 0, y: -6, filter: "blur(4px)" },
  animate: on ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -6, filter: "blur(4px)" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
});

/**
 * Landing shell: page background follows the site theme (paper / ink); the
 * workflow panel and product cards are the dark "device" surfaces. Glass
 * header (logo · tabs · language + Let's talk) floats over the content.
 */
export function Landing({
  lang,
  dict,
  github,
  posts,
  postCount,
}: {
  lang: Locale;
  dict: Dictionary;
  github: GithubData | null;
  posts: PostPreview[];
  postCount: number;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [contactOpen, setContactOpen] = useState(false);
  const [decode, setDecode] = useState(0);
  const [phase, setPhase] = useState<Phase>(() => (introPlayed ? 2 : 0));
  const l = dict.landing;
  const openContact = () => setContactOpen(true);
  const ctx = { lang, dict, github, posts, postCount, openContact, toProducts: () => setTab("products") };

  // Schedule the whole sequence once on mount (re-running per phase would cancel it).
  useEffect(() => {
    if (introPlayed) return;
    const skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps: [number, Phase][] = skip
      ? [[0, 2]]
      : [
          [PHASE.logo, 1],
          [PHASE.graph, 2],
        ];
    const ids = steps.map(([ms, p]) => window.setTimeout(() => setPhase(p), ms));
    return () => ids.forEach(window.clearTimeout);
  }, []);

  // Deep links: /{lang}#products or #blog open that tab.
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1);
      if (h === "overview" || h === "products" || h === "blog") setTab(h);
    };
    const id = window.setTimeout(fromHash, 0);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  useEffect(() => {
    if (phase !== 2) return;
    introPlayed = true;
    markLandingReady();
  }, [phase]);

  return (
    <div className="fixed inset-0 z-10 min-h-[560px] overflow-hidden bg-background bg-[radial-gradient(900px_420px_at_18%_-8%,oklch(0.92_0.06_45/0.4),transparent_70%)] font-garamond text-foreground dark:bg-[radial-gradient(900px_420px_at_18%_-8%,rgba(120,72,44,.22),transparent_70%)]">
      {/* Intro: name decodes big and centred, then hands over to the page. */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="intro"
            className="absolute inset-0 z-30 flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <DecodeText
              text={DATA.name.split(" ").slice(0, 2).join(" ")}
              trigger={1}
              scrambleFirst
              className="font-garamond text-5xl font-medium tracking-tight sm:text-7xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="absolute inset-x-0 top-0 z-20 grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 px-[clamp(12px,3vw,36px)] backdrop-blur-xl">
        <motion.div
          {...reveal(phase >= 1)}
          className="hidden w-fit items-center font-mono text-[13px] sm:flex"
          onMouseEnter={() => setDecode((n) => n + 1)}
        >
          <span className="text-muted-foreground">~/</span>
          <DecodeText text="fares.aouani" trigger={decode} className="text-foreground" />
        </motion.div>
        <motion.div {...reveal(phase >= 2)} className={cn(phase < 2 && "pointer-events-none")}>
          <SegmentedTabs<Tab>
            tabs={[
              { id: "overview", label: l.overview },
              { id: "products", label: l.tabProducts },
              { id: "blog", label: l.tabBlog },
            ]}
            value={tab}
            onChange={setTab}
          />
        </motion.div>
        <motion.div
          {...reveal(phase >= 2)}
          className={cn("flex items-center justify-end gap-2 sm:gap-[18px]", phase < 2 && "pointer-events-none")}
        >
          <LanguageSwitcher inline />
          <DirectionButton onClick={openContact} className="hidden sm:inline-block">
            {l.letsTalk}
          </DirectionButton>
        </motion.div>
      </header>

      {tab === "overview" ? (
        <main className="flex h-full flex-col px-[clamp(12px,3vw,36px)] pb-[clamp(12px,2.4vw,28px)] pt-20">
          {phase >= 2 && (
            <motion.div
              className="flex min-h-0 flex-1 flex-col"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <AgentGraph ctx={ctx} />
            </motion.div>
          )}
        </main>
      ) : (
        // Scrolls under the glass header.
        // stable gutter + hidden x-overflow: the hover lift never toggles a scrollbar (no jitter).
        <main className="h-full overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable] px-[clamp(16px,3vw,36px)] pb-[clamp(16px,2.4vw,28px)] pt-20">
          {tab === "products" ? (
            <ProductsGrid lang={lang} dict={dict} onContact={openContact} />
          ) : (
            <BlogList lang={lang} dict={dict} posts={posts} />
          )}
        </main>
      )}

      <GraphDialog open={contactOpen} onClose={() => setContactOpen(false)} title={l.contactTitle} closeLabel={dict.newsletter.close}>
        <div className="flex flex-col gap-3">
          <p className="font-sans text-muted-foreground">{l.contactText}</p>
          <CtaSection dict={dict} />
          <NewsletterCard
            lang={lang}
            dict={dict.newsletter}
            className="rounded-2xl border border-border bg-card p-5 transition-shadow duration-300"
            header={
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-base font-bold">{dict.newsletter.heading}</h3>
                <p className="font-sans text-sm text-muted-foreground">{dict.newsletter.text}</p>
              </div>
            }
          />
        </div>
      </GraphDialog>
    </div>
  );
}
