import AvailabilityBadge from "@/components/availability-badge";
import ContactSection from "@/components/section/contact-section";
import Chronology, { type TimelineEvent } from "@/components/landing/chronology";
import IntroLoader, { IntroGate } from "@/components/landing/intro-loader";
import ProjectCarousel, { type CarouselProject } from "@/components/landing/project-carousel";
import QuotePanel from "@/components/landing/quote-panel";
import SectionNavProvider from "@/components/landing/section-nav-provider";
import LocationGlobe from "@/components/landing/location-globe";
import SurveyToast from "@/components/landing/survey-toast";
import VideoSlot from "@/components/landing/video-slot";
import { DATA } from "@/data/resume";
import { isLocale, defaultLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Projects shown first in the deck, in this order. Everything else keeps its
 * order from DATA.projects.
 */
const FEATURED_FIRST = [
  "AMLD Africa Tech Infrastructure",
  "AMLD Africa: Automations",
];

function carouselProjects(lang: Locale): CarouselProject[] {
  const rank = (title: string) => {
    const index = FEATURED_FIRST.indexOf(title);
    return index === -1 ? FEATURED_FIRST.length : index;
  };
  return [...DATA.projects]
    .sort((a, b) => rank(a.title) - rank(b.title))
    .map((project) => ({
      title: project.title,
      description: t(project.description, lang),
      dates: project.dates,
      tech: project.technologies,
      href: project.href || project.links[0]?.href || "",
      image: project.image,
    }));
}

function timelineEvents(lang: Locale): TimelineEvent[] {
  return DATA.timeline.map((event) => ({
    id: event.id,
    kind: event.kind,
    dateLabel: event.dateLabel,
    title: t(event.title, lang),
    body: t(event.body, lang),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <main className="relative w-full">
      <IntroGate />
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
              "AI Coaching",
              "AI Adoption for Business",
              "AI Workflows and Automation",
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

      <IntroLoader
        name={DATA.name}
        greeting={dict.hero.greeting}
        avatarUrl={DATA.introPortraitUrl}
        skipLabel={dict.landing.skipIntro}
      />
      <SectionNavProvider />
      <SurveyToast
        title={dict.landing.surveyTitle}
        body={dict.landing.surveyBody}
        cta={dict.landing.surveyCta}
        dismissLabel={dict.landing.surveyDismiss}
        href="https://survey.qartmina.com"
      />

      <QuotePanel
        id="hero"
        quote={t(DATA.quotes.hero, lang)}
        withHarissa
        quoteDelay={0.55}
        above={
          <div className="flex flex-col items-center gap-4">
          <div className="flex items-start gap-5 sm:gap-7">
            <div className="relative">
              <div className="absolute inset-0 translate-x-2 translate-y-2.5 rounded-full bg-foreground" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DATA.introPortraitUrl}
                alt={DATA.name}
                className="relative size-28 rounded-full border-4 border-foreground object-cover sm:size-32"
              />
            </div>
            <LocationGlobe label={dict.landing.locationLabel} />
          </div>
          <p className="font-tech text-sm uppercase tracking-[0.18em] text-amber-800/90 dark:text-amber-300/90">
            {DATA.name} — {t(DATA.headline, lang)}
          </p>
          {/* <AvailabilityBadge
            label={dict.hero.availability}
            hint={dict.hero.availabilityHint}
            ctaLabel={dict.contact.bookCall}
            ctaHref={DATA.contact.calendlyUrl}
          /> */}
          {/* <a
            href="https://openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border-2 border-foreground bg-card px-3 py-1.5 shadow-[4px_5px_0_0_var(--color-foreground)] transition-transform hover:-translate-y-0.5"
          > */}
            {/* <img
              src="/openai-select-partner.svg"
              alt=""
              className="size-5 object-contain dark:invert"
            />
            <span className="font-tech text-[0.6rem] uppercase tracking-[0.15em]">
              {dict.landing.partnerBadge}
            </span>
          </a> */}
          {/* <span className="font-tech text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            {dict.landing.scrollHint}
          </span> */}
          </div>
        }
      />

      <ProjectCarousel
        projects={carouselProjects(lang)}
        eyebrow={dict.landing.projectsEyebrow}
        spaceHint={dict.landing.spaceHint}
        swipeHint={dict.landing.swipeHint}
      />

      <QuotePanel
        id="thesis"
        quote={t(DATA.quotes.thesis, lang)}
        eyebrow={dict.projects.badge}
        align="left"
      />

      <Chronology
        events={timelineEvents(lang)}
        eyebrow={dict.landing.chronologyEyebrow}
        title={dict.landing.chronologyTitle}
        hint={dict.landing.chronologyHint}
      />

      <VideoSlot
        eyebrow={dict.landing.videoEyebrow}
        placeholder={dict.landing.videoPlaceholder}
      />

      <section
        id="contact"
        className="flex min-h-dvh w-full items-center px-6 py-24 pb-32"
      >
        <div className="mx-auto w-full max-w-2xl">
          <ContactSection lang={lang} dict={dict} />
        </div>
      </section>
    </main>
  );
}
