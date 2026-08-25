"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Runs on every page load: portrait, then the greeting, then the whole thing
 * blurs away to reveal the landing page.
 *
 * The decision to play is made by a tiny inline script *before* first paint
 * (see <IntroGate/>), so reduced-motion users never see a flash of the overlay.
 */
const PORTRAIT_IN = 0.15;
const GREETING_IN = 0.9;
const HOLD_UNTIL = 2600; // ms before the blur-out starts
const UNMOUNT_AFTER = 3500; // ms before the overlay leaves the DOM

export function IntroGate() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!calm){ document.documentElement.dataset.intro = "play"; }
}catch(e){}})();`,
      }}
    />
  );
}

export default function IntroLoader({
  name,
  greeting,
  avatarUrl,
  skipLabel,
}: {
  name: string;
  greeting: string;
  avatarUrl: string;
  skipLabel: string;
}) {
  // The overlay is always rendered; CSS keeps it hidden unless the inline
  // script above set data-intro="play" before first paint. That way reduced
  // motion is honoured with no flash and no hydration mismatch.
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const blurOut = window.setTimeout(() => setPlaying(false), HOLD_UNTIL);
    const done = window.setTimeout(finish, UNMOUNT_AFTER);

    function finish() {
      document.body.style.overflow = overflow;
      delete document.documentElement.dataset.intro;
    }

    return () => {
      window.clearTimeout(blurOut);
      window.clearTimeout(done);
      finish();
    };
  }, []);

  const firstName = name.split(" ")[0];

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key="intro"
          className="intro-overlay fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 bg-background"
          exit={{ opacity: 0, filter: "blur(24px)", scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <MosaicBackdrop />

          <motion.div
            initial={{ opacity: 0, scale: 0.86, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: PORTRAIT_IN, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 translate-x-2 translate-y-3 rounded-full bg-foreground/90" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt=""
              className="relative size-36 rounded-full border-4 border-foreground object-cover sm:size-44"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: GREETING_IN, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 text-center font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl"
          >
            {greeting} {firstName}
          </motion.p>

          <button
            type="button"
            onClick={() => setPlaying(false)}
            className="absolute bottom-10 font-tech text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {skipLabel}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Slow-drifting mosaic shards behind the portrait — CSS only, no WebGL. */
function MosaicBackdrop() {
  const shards = [
    { left: "12%", top: "18%", size: 90, delay: 0 },
    { left: "78%", top: "22%", size: 64, delay: 0.2 },
    { left: "20%", top: "72%", size: 72, delay: 0.35 },
    { left: "84%", top: "68%", size: 110, delay: 0.5 },
    { left: "50%", top: "8%", size: 52, delay: 0.65 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {shards.map((shard) => (
        <motion.div
          key={`${shard.left}-${shard.top}`}
          className="absolute rotate-45 rounded-[6px] border-2 border-amber-800/25 bg-amber-700/5 dark:border-amber-300/20"
          style={{ left: shard.left, top: shard.top, width: shard.size, height: shard.size }}
          initial={{ opacity: 0, scale: 0.4, rotate: 12 }}
          animate={{ opacity: 1, scale: 1, rotate: 45 }}
          transition={{ duration: 1.4, delay: shard.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
