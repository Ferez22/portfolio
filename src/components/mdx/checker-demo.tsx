"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Rule = { re: RegExp; kind: string; severity: "blocking" | "warning"; fix: string };

/**
 * A few rules ported from marketing-harness .claude/skills/humanize/lexicon/en.json
 * (+ the dash fingerprint). The full checker (check.py, EN + FR) runs in the repo.
 */
const RULES: Rule[] = [
  { re: /\bdelv(e|es|ing)\b/gi, kind: "AI tell", severity: "blocking", fix: "say what you look at: 'look at', 'go through'" },
  { re: /in today's (fast-paced|ever-changing|digital|modern) (world|landscape|age)/gi, kind: "AI tell", severity: "blocking", fix: "start with the concrete case" },
  { re: /\b(unlock|unleash)(s|ed|ing)? (the |your |its )?(full )?(potential|power|value|growth)/gi, kind: "AI tell", severity: "blocking", fix: "say what changes, with a number if you have one" },
  { re: /\b(elevate|supercharge|turbocharge|skyrocket)(s|d|ing)?\b/gi, kind: "AI tell", severity: "blocking", fix: "plain verb: improve, speed up, grow" },
  { re: /\bseamless(ly)?\b/gi, kind: "AI tell", severity: "blocking", fix: "say what the user no longer has to do" },
  { re: /\bgame[- ]?changer\b/gi, kind: "AI tell", severity: "blocking", fix: "name the actual effect" },
  { re: /\blet'?s dive (in|into)\b|\bdive deep\b|\bdeep dive\b/gi, kind: "AI tell", severity: "blocking", fix: "cut it, give the point" },
  { re: /\bleverag(e|es|ed|ing)\b/gi, kind: "AI tell", severity: "warning", fix: "'use'" },
  { re: /[\u2014\u2013]/g, kind: "fingerprint", severity: "blocking", fix: "em/en dash: use a comma, a colon, a full stop, or rewrite" },
];

const SAMPLE =
  "In today's fast-paced world, every brand needs content. We help you unlock your full potential, every single week.";

type Flag = { line: number; match: string } & Rule;

function check(text: string): Flag[] {
  const flags: Flag[] = [];
  // Curly apostrophes count as straight ones, like the real checker's normalisation.
  text
    .replace(/[‘’]/g, "'")
    .split("\n")
    .forEach((line, i) => {
      for (const rule of RULES) {
        for (const m of line.matchAll(rule.re)) flags.push({ ...rule, line: i + 1, match: m[0] });
      }
    });
  return flags;
}

/** Live demo of the humanize checker: edit the text, press Check, read the flags. */
export function CheckerDemo() {
  const id = useId();
  const [text, setText] = useState(SAMPLE);
  const [flags, setFlags] = useState<Flag[] | null>(null);
  const blocking = flags?.filter((f) => f.severity === "blocking").length ?? 0;
  const warnings = (flags?.length ?? 0) - blocking;

  return (
    <figure className="not-prose my-8 flex flex-col gap-3 rounded-2xl bg-l-panel p-4 text-l-text shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] sm:p-5">
      <label htmlFor={id} className="font-mono text-xs text-l-dim">
        draft.txt
      </label>
      <textarea
        id={id}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setFlags(null);
        }}
        rows={4}
        className="w-full resize-y rounded-xl border border-l-border2 bg-l-node p-3 font-garamond text-[17px] leading-snug text-l-text placeholder:text-l-dim focus-visible:border-l-gold focus-visible:outline-none"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-l-dim">a few of the rules; the full checker runs in the repo</span>
        <button
          type="button"
          onClick={() => setFlags(check(text))}
          className="cursor-pointer rounded-full bg-l-gold px-4 py-1.5 font-garamond text-base leading-none text-l-bg transition-colors hover:bg-l-gold-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l-gold focus-visible:ring-offset-2 focus-visible:ring-offset-l-panel"
        >
          Check
        </button>
      </div>
      <div aria-live="polite">
        {flags && (
          <div className="rounded-xl border border-l-border bg-l-bg p-3 font-mono text-[11px] leading-relaxed sm:text-xs">
            {flags.length === 0 ? (
              <p className="m-0 text-[#34D399]">0 blocking, 0 warning(s) · VERDICT: CLEAN (for these rules)</p>
            ) : (
              <>
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {flags.map((f, i) => (
                    <li key={i} className="m-0 break-words">
                      <span className={cn(f.severity === "blocking" ? "text-[#E8713C]" : "text-l-gold")}>[{f.severity}]</span>{" "}
                      <span className="text-l-dim">line {f.line}</span> <span className="text-l-soft">{f.kind}:</span>{" "}
                      <span className="text-l-text">&apos;{f.match}&apos;</span> <span className="text-l-dim">-&gt;</span>{" "}
                      <span className="text-l-muted">{f.fix}</span>
                    </li>
                  ))}
                </ul>
                <p className={cn("m-0 mt-2.5", blocking ? "text-[#E8713C]" : "text-l-gold")}>
                  {blocking} blocking, {warnings} warning(s) · VERDICT: {blocking ? "FIX FIRST" : "OK WITH WARNINGS"}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </figure>
  );
}
