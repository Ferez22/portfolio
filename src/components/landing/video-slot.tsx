import { Harissa } from "./harissa";

/**
 * Placeholder for the intro video. Drop a file in /public and pass its path as
 * `src` — the markup below already handles the real player case.
 */
export default function VideoSlot({
  eyebrow,
  placeholder,
  src,
  poster,
}: {
  eyebrow: string;
  placeholder: string;
  src?: string;
  poster?: string;
}) {
  return (
    <section
      id="video"
      className="flex min-h-dvh w-full flex-col items-center justify-center gap-8 px-6 py-24"
    >
      <span className="font-tech text-xs uppercase tracking-[0.3em] text-amber-800/80 dark:text-amber-300/80">
        {eyebrow}
      </span>

      <div className="aspect-video w-[min(92vw,64rem)] overflow-hidden rounded-3xl border-4 border-foreground bg-card shadow-[12px_14px_0_0_var(--color-foreground)]">
        {src ? (
          <video
            className="size-full object-cover"
            src={src}
            poster={poster}
            controls
            playsInline
            preload="none"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_16px,oklch(0.55_0.09_45/0.1)_16px,oklch(0.55_0.09_45/0.1)_32px)]">
            <Harissa className="size-10 text-foreground/70" />
            <p className="font-hand text-2xl text-foreground/70">{placeholder}</p>
          </div>
        )}
      </div>
    </section>
  );
}
