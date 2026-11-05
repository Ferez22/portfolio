import { NewsletterCard } from "@/components/newsletter/newsletter-form";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function NewsletterSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const nl = dict.newsletter;
  return (
    <NewsletterCard
      lang={lang}
      dict={nl}
      className="rounded-2xl border border-border bg-card/60 p-8 sm:p-10 hover:shadow-[0_24px_70px_-28px_oklch(0.45_0.1_45/0.4)]"
      header={
        <div className="flex max-w-lg flex-col gap-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-balance">
            {nl.heading}
          </h2>
          <p className="font-sans text-lg leading-relaxed text-muted-foreground text-pretty">
            {nl.text}
          </p>
        </div>
      }
    />
  );
}
