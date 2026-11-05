import {
  BookCallButton,
  CopyEmailButton,
} from "@/components/contact/contact-actions";
import { DATA } from "@/data/resume";
import type { Dictionary } from "@/i18n/dictionaries";
import { Calendar, Mail } from "lucide-react";

const CARD =
  "flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-[box-shadow,border-color] duration-300 hover:border-amber-800/20 dark:hover:border-amber-300/20 hover:shadow-[0_18px_50px_-24px_oklch(0.45_0.1_45/0.45)]";
const ICON =
  "flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background ring-2 ring-border";

/** Compact contact CTAs (section #contact on the CV): book a call | email. */
export default function CtaSection({ dict }: { dict: Dictionary }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className={CARD}>
        <div className="flex items-center gap-3 min-w-0">
          <div className={ICON}>
            <Calendar className="size-4 text-muted-foreground" aria-hidden />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-heading text-base font-bold">
              {dict.contact.ctaHeading}
            </span>
            <span className="font-sans text-sm text-muted-foreground">
              {dict.contact.ctaShort}
            </span>
          </div>
        </div>
        <BookCallButton
          url={DATA.contact.calendlyUrl}
          label={dict.contact.bookCall}
          className="self-start rounded-lg px-4 py-2 text-sm"
        />
      </div>

      <div className={CARD}>
        <div className="flex items-center gap-3 min-w-0">
          <div className={ICON}>
            <Mail className="size-4 text-muted-foreground" aria-hidden />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-heading text-base font-bold">
              {dict.contact.emailEyebrow}
            </span>
            <a
              href={`mailto:${DATA.contact.email}`}
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {DATA.contact.email}
            </a>
          </div>
        </div>
        <CopyEmailButton
          email={DATA.contact.email}
          copyLabel={dict.contact.copy}
          copiedLabel={dict.contact.copied}
          className="self-start"
        />
      </div>
    </div>
  );
}
