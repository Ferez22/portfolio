import type { ContributionDay } from "@/lib/github";

const LEVEL_CLASS = [
  "fill-amber-950/8 dark:fill-amber-100/10",
  "fill-amber-300/60 dark:fill-amber-400/35",
  "fill-amber-500/75 dark:fill-amber-400/60",
  "fill-orange-600/85 dark:fill-orange-400/80",
  "fill-amber-900 dark:fill-amber-200",
];

const CELL = 9;
const GAP = 2;

/** GitHub-style contribution calendar: one column per week, Sunday on top. */
export function Heatmap({ days, label }: { days: ContributionDay[]; label: string }) {
  const offset = days.length ? new Date(days[0].date).getUTCDay() : 0;
  const weeks = Math.ceil((days.length + offset) / 7);
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${weeks * (CELL + GAP)} ${7 * (CELL + GAP)}`}
      className="w-full"
    >
      {days.map((d, i) => {
        const slot = i + offset;
        return (
          <rect
            key={d.date}
            x={Math.floor(slot / 7) * (CELL + GAP)}
            y={(slot % 7) * (CELL + GAP)}
            width={CELL}
            height={CELL}
            rx={2}
            className={LEVEL_CLASS[d.level]}
          >
            <title>{`${d.date}: ${d.count}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}
