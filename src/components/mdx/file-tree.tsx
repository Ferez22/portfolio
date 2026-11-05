"use client";

import { useState } from "react";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Node = { name: string; role: string; children?: Node[] };

/** marketing-harness repo tree (from its README), with one-line roles. */
const TREE: Node[] = [
  { name: "CLAUDE.md", role: "The rules: routing, hard rules and the memory loop. Claude Code loads it on its own." },
  {
    name: "brand",
    role: "Who you are and how you write.",
    children: [
      { name: "brand.md", role: "Facts: offer, audience, proof. Never invented." },
      { name: "voice.md", role: "How you write. Filled by setup, changed only through proposals you approve." },
      { name: "ideas.md", role: "Your content backlog." },
    ],
  },
  {
    name: "posts",
    role: "One file per post: status, copy, variants and results.",
    children: [{ name: "README.md", role: "The post format: YYYY-MM-DD_<slug>.md with a Status header (draft, ready, posted)." }],
  },
  {
    name: "memory",
    role: "What the harness learned from you.",
    children: [
      { name: "feedback-log.md", role: "Every correction, raw and dated. Never deleted." },
      { name: "learnings.md", role: "Confirmed rules, read at every session start." },
    ],
  },
  {
    name: "knowledge",
    role: "Your own frameworks and reference tables.",
    children: [{ name: "README.md", role: "Drop hook formulas, sales tables or audience research here. Every post reads them." }],
  },
  {
    name: ".claude/skills",
    role: "The four skills Claude runs.",
    children: [
      { name: "setup", role: "Onboarding interview.", children: [{ name: "SKILL.md", role: "Interviews you, fills brand.md and voice.md, then asks you to validate them." }] },
      { name: "write-post", role: "Hooks, draft, platform variants.", children: [{ name: "SKILL.md", role: "Turns an idea, a note or a link into 3 hooks, 1 draft and one variant per platform." }] },
      {
        name: "humanize",
        role: "The checker and its lexicons.",
        children: [
          { name: "SKILL.md", role: "Checks every text before you see it and fixes what it flags." },
          { name: "check.py", role: "The checker itself. Standard library Python, the gate every draft has to pass." },
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
      { name: "learn", role: "Turns feedback into rules.", children: [{ name: "SKILL.md", role: "Finds lessons that repeat, promotes them to learnings.md and proposes voice changes." }] },
    ],
  },
  {
    name: "scripts",
    role: "Helpers.",
    children: [{ name: "package-for-cowork.sh", role: "Creates one ZIP per skill in dist/, ready to upload in Claude Cowork." }],
  },
];

/** Interactive repo tree: folders expand/collapse, any entry shows its role. */
export function FileTree() {
  const [open, setOpen] = useState<Set<string>>(() => new Set(["brand", "memory", ".claude/skills"]));
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
    <figure className="not-prose my-8 grid gap-3 rounded-2xl bg-l-panel p-3 text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] sm:grid-cols-[1.1fr_1fr] sm:p-5">
      <div className="min-w-0">
        <p className="m-0 mb-1.5 px-1.5 font-mono text-xs text-l-dim">marketing-harness/</p>
        {render(TREE, "", 0)}
      </div>
      <figcaption aria-live="polite" className="self-start rounded-xl border border-l-border bg-l-node p-3 sm:sticky sm:top-4">
        <span className="block break-all font-mono text-xs text-l-gold">{sel.path}</span>
        <span className="mt-1 block font-garamond text-[16px] leading-snug text-l-soft">{sel.role}</span>
      </figcaption>
    </figure>
  );
}
