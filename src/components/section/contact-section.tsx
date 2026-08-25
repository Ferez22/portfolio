import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import {
  BookCallButton,
  CopyEmailButton,
} from "@/components/contact/contact-actions";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Mail } from "lucide-react";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const BLUR_FADE_DELAY = 0.04;

export default function ContactSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  void lang;
  const socials = Object.entries(DATA.contact.social).filter(
    ([, s]) => s.navbar
  );

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* Hero */}
      <div>
        <div className="flex flex-col gap-4">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="font-hand text-xl sm:text-2xl text-amber-800/80 dark:text-amber-300/80 font-semibold"
            text={dict.contact.handLabel}
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 1.5}
            yOffset={8}
            className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
            text={dict.contact.heading}
          />
          <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
            <p className="font-sans text-lg leading-relaxed text-muted-foreground max-w-xl text-pretty">
              {dict.contact.intro}
            </p>
          </BlurFade>
        </div>
      </div>

      {/* Primary CTA — book a call */}
      <div>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="relative overflow-hidden rounded-3xl border-4 border-foreground bg-card p-8 shadow-[12px_14px_0_0_var(--color-foreground)] sm:p-10">
            <div className="pointer-events-none absolute inset-0 top-0 h-2/3 opacity-[0.5] dark:opacity-[0.35]">
              <FlickeringGrid
                className="h-full w-full"
                color="oklch(0.45 0.07 55 / 0.18)"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="font-tech text-xs font-bold uppercase tracking-widest text-amber-800/70 dark:text-amber-300/70">
                  {dict.contact.ctaEyebrow}
                </span>
                <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {dict.contact.ctaHeading}
                </h2>
                <p className="font-sans text-muted-foreground max-w-md text-pretty">
                  {dict.contact.ctaText}
                </p>
              </div>
              <div>
                <BookCallButton
                  url={DATA.contact.calendlyUrl}
                  label={dict.contact.bookCall}
                />
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Secondary — email */}
      <div>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex flex-col gap-4 rounded-3xl border-4 border-foreground bg-card p-6 shadow-[8px_9px_0_0_var(--color-foreground)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border-[3px] border-foreground bg-background shadow-[3px_4px_0_0_var(--color-foreground)]">
                  <Mail className="size-4" aria-hidden />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-display text-base font-bold">
                    {dict.contact.emailEyebrow}
                  </span>
                  <a
                    href={`mailto:${DATA.contact.email}`}
                    className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {DATA.contact.email}
                  </a>
                </div>
              </div>
              <CopyEmailButton
                email={DATA.contact.email}
                copyLabel={dict.contact.copy}
                copiedLabel={dict.contact.copied}
              />
            </div>
            <a
              href={`mailto:${DATA.contact.email}`}
              className="group inline-flex items-center gap-1 font-tech text-xs font-bold uppercase tracking-wider text-amber-800/80 dark:text-amber-300/80 hover:text-foreground transition-colors w-fit"
            >
              {dict.contact.sendEmail}
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Socials */}
      <div>
        <div className="flex flex-col gap-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="font-display text-xl font-extrabold tracking-tight">
              {dict.contact.socialsHeading}
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {socials.map(([name, social], id) => {
              const Icon = social.icon;
              return (
                <BlurFade key={name} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-xl border-[3px] border-foreground bg-card px-3 py-2 shadow-[4px_5px_0_0_var(--color-foreground)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_6px_0_0_var(--color-foreground)] active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-foreground)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                  >
                    <Icon className="size-4 object-contain opacity-90" />
                    <span className="font-tech text-xs font-bold uppercase tracking-wider text-foreground">
                      {name}
                    </span>
                    <ArrowUpRight
                      className="size-3 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden
                    />
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust line */}
      <div>
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t-[3px] border-dashed border-foreground/40 pt-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden />
              {DATA.location} · CET
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {dict.contact.replyTime}
            </span>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
