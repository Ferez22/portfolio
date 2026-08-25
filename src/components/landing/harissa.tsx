import { cn } from "@/lib/utils";

/**
 * The harissa chili — the site's recurring Tunisian wink. Drawn rather than
 * emoji so it can pick up the cartoon outline and hard shadow of the section
 * it sits in.
 */
export function Harissa({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 96"
      className={cn("size-12", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* stem */}
        <path d="M32 18c-1-6-5-10-11-11" />
        <path d="M32 18c3-5 8-7 13-6" className="opacity-80" />
        {/* body */}
        <path
          d="M32 18c12 2 20 13 20 28 0 18-11 34-20 40-9-6-20-22-20-40 0-15 8-26 20-28z"
          fill="oklch(0.58 0.2 25)"
        />
        {/* highlight */}
        <path
          d="M24 36c-3 6-4 13-3 20"
          stroke="oklch(0.95 0.05 40)"
          strokeWidth={3}
          className="opacity-70"
        />
      </g>
    </svg>
  );
}

export default Harissa;
