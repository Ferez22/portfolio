/* eslint-disable @next/next/no-img-element */
import AvailabilityBadge from "@/components/availability-badge";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import { isLocale, defaultLocale, t } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const BLUR_FADE_DELAY = 0.04;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(lang);
  return (
    <main className="min-h-dvh flex flex-col gap-16 sm:gap-20 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: DATA.name,
            url: `${DATA.url}/${lang}`,
            image: `${DATA.url}${DATA.avatarUrl}`,
            jobTitle: t(DATA.headline, lang),
            description: t(DATA.description, lang),
            email: `mailto:${DATA.contact.email}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: DATA.location,
            },
            knowsAbout: [
              "Artificial Intelligence",
              "Large Language Models",
              "AI Agents",
              "Software Engineering",
              "Web Development",
              "Cloud Infrastructure",
            ],
            sameAs: Object.values(DATA.contact.social)
              .map((s) => s.url)
              .filter((url) => url.startsWith("http")),
          }),
        }}
      />
      <section id="hero" className="relative z-20">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-8 flex flex-col md:flex-row justify-between md:items-start">
            <div className="gap-3 flex flex-col order-2 md:order-1 md:pr-4 border-l-0 md:border-l-2 border-amber-700/25 dark:border-amber-400/20 md:pl-6">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-balance bg-linear-to-br from-foreground via-foreground to-amber-950/80 dark:to-amber-200/90 bg-clip-text text-transparent"
                yOffset={8}
                text={`${dict.hero.greeting} ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="font-tech text-sm sm:text-base uppercase tracking-[0.18em] text-amber-800/90 dark:text-amber-300/90"
                delay={BLUR_FADE_DELAY * 1.1}
                yOffset={6}
                text={t(DATA.headline, lang)}
              />
              <BlurFade
                delay={BLUR_FADE_DELAY * 1.15}
                className="relative z-30"
              >
                <AvailabilityBadge
                  label={dict.hero.availability}
                  hint={dict.hero.availabilityHint}
                  ctaLabel={dict.contact.bookCall}
                  ctaHref={DATA.contact.calendlyUrl}
                />
              </BlurFade>
              <BlurFadeText
                className="font-hand text-xl sm:text-2xl md:text-[1.65rem] leading-snug text-muted-foreground max-w-[600px] font-medium"
                delay={BLUR_FADE_DELAY * 1.2}
                text={t(DATA.description, lang)}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2 shrink-0">
              <Avatar className="size-24 md:size-32 rounded-full shadow-[0_12px_40px_-12px_oklch(0.45_0.1_45/0.35)] ring-2 ring-amber-800/15 dark:ring-amber-300/20 ring-offset-2 ring-offset-background">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback className="font-display text-lg">{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-wide text-foreground">
              {dict.sections.about}
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{t(DATA.summary, lang)}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="certifications">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-wide">
              {dict.sections.certifications}
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.certifications.map((certification, index) => (
              <BlurFade
                key={certification.name}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={certification.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {certification.logoUrl ? (
                      <img
                        src={certification.logoUrl}
                        alt={certification.name}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {certification.name}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {certification.credentialId}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>{certification.date}</span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="non-profit-work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-wide">
              {dict.sections.nonProfit}
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.nonProfitWork.map((nonProfitWork, index) => (
              <BlurFade
                key={nonProfitWork.name}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={nonProfitWork.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {nonProfitWork.logoUrl ? (
                      <img
                        src={nonProfitWork.logoUrl}
                        alt={nonProfitWork.name}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {nonProfitWork.name}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {t(nonProfitWork.description, lang)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>{nonProfitWork.date}</span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-wide">
              {dict.sections.work}
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection lang={lang} dict={dict} />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-wide">
              {dict.sections.education}
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-wide">
              {dict.sections.skills}
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade
                key={skill.name}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <div className="border bg-card/80 border-border/80 ring-1 ring-amber-950/5 dark:ring-amber-200/10 rounded-lg h-8 w-fit px-3 flex items-center gap-2 shadow-sm hover:shadow-md hover:ring-amber-800/15 dark:hover:ring-amber-300/20 transition-shadow">
                  {skill.icon && (
                    <skill.icon className="size-4 rounded overflow-hidden object-contain opacity-90" />
                  )}
                  <span className="font-tech text-foreground text-xs font-bold uppercase tracking-wider">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection lang={lang} dict={dict} />
        </BlurFade>
      </section>
      {/* <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section> */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection lang={lang} dict={dict} />
        </BlurFade>
      </section>
    </main>
  );
}
