"use client";

import { useState } from "react";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Node = { name: string; role: string; children?: Node[] };

/** content-studio repo tree (from its README), with one-line roles. */
const TREE: Node[] = [
  { name: "CLAUDE.md", role: "The rules: routing, hard rules, gates and the memory loop. Claude Code loads it on its own." },
  { name: "soul.md", role: "Who the agent is, the quality bar it holds and what it never does." },
  { name: "content-types.md", role: "Why you publish: 8 content types (news, educational, promotional...) and their formats." },
  { name: "platforms.md", role: "Specs per platform: sizes, lengths, safe zones." },
  {
    name: "brands",
    role: "One folder per brand, created by onboarding. Local: gitignored, never in a commit.",
    children: [
      {
        name: "<brand>",
        role: "Everything about one brand.",
        children: [
          { name: "brand.md", role: "Facts: offer, audience, proof. Never invented." },
          { name: "voicing.md", role: "How the brand writes. Changed only through proposals you approve." },
          { name: "theme.json", role: "Colors, fonts and logos the videos are rendered with." },
          { name: "ideas.md", role: "Your content backlog." },
          { name: "campagnes", role: "One folder per campaign: brief, plan, decisions, deliverables, results." },
        ],
      },
    ],
  },
  {
    name: "memory",
    role: "What the studio learned from you.",
    children: [
      { name: "feedback-log.md", role: "Every correction, raw and dated. Never deleted." },
      { name: "learnings.md", role: "Confirmed rules, read at every session start." },
    ],
  },
  { name: "prompts", role: "Motion video prompts: launch story, launch hype, explainer, product film, UGC ad, UI moment." },
  { name: "remotion", role: "The video engine. React components rendered to MP4 on your machine, from your brand theme." },
  { name: "knowledge", role: "Reference tables (audience desires, buyer types). Add your own: briefs and personas read them." },
  { name: "scripts", role: "install-skills.sh links the skills into Claude. Onboarding runs it for you." },
  {
    name: "skills",
    role: "The skills Claude runs, linked into Claude by onboarding.",
    children: [
      { name: "onboarding", role: "First run: profile, voice, first brand, step by step. Resumable." },
      { name: "brand-voice", role: "Positioning, personas and the voice guide of each brand." },
      { name: "content-studio", role: "Plan, brief, strategy, production, review: posts, carousels and campaigns." },
      { name: "motion-video", role: "Picks a prompt, storyboards, renders with Remotion, checks every frame." },
      { name: "seo-writer", role: "Search Console research, an article in your voice, shipped as a pull request." },
      { name: "brand-assets", role: "Files your logos, fonts and brand book, extracts colors and rules." },
      {
        name: "humanize",
        role: "The checker and its lexicons.",
        children: [
          { name: "check.py", role: "The checker itself. Standard library Python, the gate every text has to pass." },
          {
            name: "lexicon",
            role: "Patterns per language.",
            children: [
              { name: "en.json", role: "English AI tells. Grows when you keep deleting the same phrase." },
              { name: "fr.json", role: "French AI tics, English calques, French typography and tu/vous rules." },
            ],
          },
        ],
      },
      { name: "fr-human", role: "Writing native French, never translated from English." },
    ],
  },
];

/** Interactive repo tree: folders expand/collapse, any entry shows its role. */
export function FileTree() {
  const [open, setOpen] = useState<Set<string>>(() => new Set(["brands", "memory", "skills"]));
  const [sel, setSel] = useState<{ path: string; role: string }>({ path: "CLAUDE.md", role: TREE[0].role });

  const render = (nodes: Node[], base: string, depth: number): React.ReactNode => (
    <ul className={cn("m-0 list-none p-0", depth > 0 && "ml-3 border-l border-l-line pl-2")}>
      {nodes.map((n) => {
        const path = base ? `${base}/${n.name}` : n.name;
        const isDir = !!n.children;
        const isOpen = open.has(path);
        const Icon = isDir ? (isOpen ? FolderOpen : Folder) : FileText;
        return (
          <li key={path} className="m-0 p-0">
            <button
              type="button"
              onClick={() => {
                setSel({ path, role: n.role });
                if (isDir)
                  setOpen((s) => {
                    const next = new Set(s);
                    if (next.has(path)) next.delete(path);
                    else next.add(path);
                    return next;
                  });
              }}
              aria-expanded={isDir ? isOpen : undefined}
              className={cn(
                "flex w-full cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 text-left font-mono text-xs transition-colors hover:bg-l-row focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold sm:text-[13px]",
                sel.path === path ? "bg-l-row text-l-gold" : "text-l-soft",
              )}
            >
              {isDir ? (
                <ChevronRight className={cn("size-3 shrink-0 text-l-dim transition-transform", isOpen && "rotate-90")} aria-hidden />
              ) : (
                <span className="w-3 shrink-0" aria-hidden />
              )}
              <Icon className={cn("size-3.5 shrink-0", isDir ? "text-l-gold/70" : "text-l-muted")} aria-hidden />
              <span className="truncate">
                {n.name}
                {isDir && "/"}
              </span>
            </button>
            {isDir && isOpen && render(n.children!, path, depth + 1)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <figure className="not-prose my-6 grid gap-3 rounded-2xl bg-l-panel p-3 text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] sm:grid-cols-[1.1fr_1fr] sm:p-5">
      <div className="min-w-0">
        <p className="m-0 mb-1.5 px-1.5 font-mono text-xs text-l-dim">content-studio/</p>
        {render(TREE, "", 0)}
      </div>
      <figcaption aria-live="polite" className="self-start rounded-xl border border-l-border bg-l-node p-3 sm:sticky sm:top-4">
        <span className="block break-all font-mono text-xs text-l-gold">{sel.path}</span>
        <span className="mt-1 block font-garamond text-[16px] leading-snug text-l-soft">{sel.role}</span>
      </figcaption>
    </figure>
  );
}
