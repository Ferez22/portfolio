"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * Idle: a slowly rotating wireframe globe, sized to match the hero portrait.
 * Hover (or focus): it flips to the German outline, a pin drops onto
 * Düsseldorf and the label appears. Leaving reverses the whole thing.
 *
 * All SVG + motion — no WebGL, so it costs nothing next to the carousel's
 * react-three-fiber canvas.
 */

/**
 * Germany's border, equirectangular-projected into a 0–100 box from ~47 real
 * boundary coordinates (lon 5.6–15.2, lat 47.2–55.2). Düsseldorf lands at
 * (12.2, 49.6) in the same space.
 */
const GERMANY =
  "M 40.0 4.6 L 46.1 9.0 L 56.3 10.3 L 54.2 16.3 L 60.4 15.6 L 67.7 12.9 L 81.3 8.1 L 90.1 15.9 L 88.8 29.4 L 94.0 35.6 L 95.0 46.3 L 97.4 51.9 L 91.1 53.8 L 83.3 56.0 L 72.4 60.0 L 68.8 63.8 L 71.9 70.0 L 81.3 76.3 L 85.9 80.4 L 77.1 86.5 L 76.0 93.8 L 77.6 96.6 L 68.8 95.0 L 59.4 97.0 L 50.5 95.6 L 41.7 95.9 L 31.2 92.5 L 21.9 95.6 L 20.8 86.3 L 26.0 77.8 L 18.8 75.6 L 10.4 75.0 L 7.8 71.6 L 5.7 64.4 L 4.2 55.6 L 2.8 51.9 L 6.3 46.3 L 4.2 41.9 L 12.0 39.4 L 15.1 31.9 L 14.6 23.8 L 25.0 18.8 L 30.2 16.3 L 35.4 16.3 L 31.2 11.3 L 31.8 3.8 L 35.4 4.4 Z";

const CITY = { x: 12.2, y: 49.6 };

export default function LocationGlobe({ label }: { label: string }) {
  const [active, setActive] = useState(false);
  const calm = useReducedMotion();

  return (
    // relative + an absolutely positioned label: the label must never take up
    // flow space, or the hero jumps every time the globe is hovered.
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        aria-label={label}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onClick={() => setActive((value) => !value)}
        className="relative size-28 cursor-pointer sm:size-32"
      >
        {/* hard cartoon shadow, same language as the portrait and the cards */}
        <span className="absolute inset-0 translate-x-2 translate-y-2.5 rounded-full bg-foreground" />

        <span className="absolute inset-0 overflow-hidden rounded-full border-4 border-foreground bg-[oklch(0.88_0.08_215)] dark:bg-[oklch(0.35_0.07_235)]">
          <AnimatePresence initial={false} mode="wait">
            {active ? (
              <motion.span
                key="map"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <CountryMap calm={!!calm} />
              </motion.span>
            ) : (
              <motion.span
                key="globe"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Globe calm={!!calm} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="pointer-events-none absolute top-1/2 left-full ml-3 -translate-y-1/2 whitespace-nowrap font-hand text-lg text-foreground"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Wireframe globe: fixed parallels, a meridian set that scrolls to fake spin. */
function Globe({ calm }: { calm: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* parallels stay put — they read as latitude, not rotation */}
      <g stroke="currentColor" strokeWidth={2} fill="none" className="text-foreground/35">
        <line x1="4" y1="50" x2="96" y2="50" />
        <ellipse cx="50" cy="50" rx="46" ry="16" />
        <ellipse cx="50" cy="50" rx="46" ry="33" />
      </g>

      {/* meridians + landmasses drift sideways, clipped to the sphere */}
      <clipPath id="globe-clip">
        <circle cx="50" cy="50" r="48" />
      </clipPath>
      <g clipPath="url(#globe-clip)">
        <motion.g
          animate={calm ? undefined : { x: [0, -100] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          {[0, 100].map((offset) => (
            <g key={offset} transform={`translate(${offset} 0)`}>
              <g
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                className="text-foreground/30"
              >
                <ellipse cx="16" cy="50" rx="14" ry="48" />
                <ellipse cx="50" cy="50" rx="14" ry="48" />
                <ellipse cx="84" cy="50" rx="14" ry="48" />
              </g>
              {/* suggestion of continents, not a real map */}
              <g className="fill-[oklch(0.72_0.12_140)] dark:fill-[oklch(0.5_0.1_145)]">
                <path d="M8 30 q10 -8 20 -2 t14 6 q-4 10 -16 12 t-20 -4 z" />
                <path d="M46 58 q12 -6 20 4 t6 18 q-12 8 -22 -2 t-4 -20 z" />
                <path d="M70 22 q14 -6 24 4 t-6 16 q-14 4 -20 -6 z" />
              </g>
            </g>
          ))}
        </motion.g>
      </g>
    </svg>
  );
}

/** The country outline with the pin dropping onto the city. */
function CountryMap({ calm }: { calm: boolean }) {
  return (
    <svg viewBox="-10 -10 120 120" className="size-full p-1">
      <motion.path
        d={GERMANY}
        className="fill-[oklch(0.9_0.06_95)] stroke-foreground dark:fill-[oklch(0.35_0.05_95)]"
        strokeWidth={4}
        strokeLinejoin="round"
        initial={calm ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* the pin, dropped from above onto the city */}
      <motion.g
        initial={calm ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.35 }}
      >
        <path
          d={`M ${CITY.x} ${CITY.y} c -7 -9 -11 -13 -11 -19 a 11 11 0 1 1 22 0 c 0 6 -4 10 -11 19 z`}
          className="fill-[oklch(0.6_0.2_25)] stroke-foreground"
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <circle
          cx={CITY.x}
          cy={CITY.y - 19}
          r={4}
          className="fill-background"
        />
      </motion.g>

      {/* impact ripple where the pin lands */}
      {!calm && (
        <motion.circle
          cx={CITY.x}
          cy={CITY.y}
          className="fill-none stroke-[oklch(0.6_0.2_25)]"
          strokeWidth={3}
          initial={{ r: 2, opacity: 0 }}
          animate={{ r: [2, 16], opacity: [0.9, 0] }}
          transition={{ duration: 0.7, delay: 0.55, repeat: Infinity, repeatDelay: 1.2 }}
        />
      )}
    </svg>
  );
}
