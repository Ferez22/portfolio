import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import {
  locales,
  isLocale,
  defaultLocale,
  t,
  type Locale,
} from "@/i18n/config";
import type { Metadata } from "next";
import {
  Caveat,
  Crimson_Text,
  Geist_Mono,
  Quantico,
  Quattrocento,
  Turret_Road,
} from "next/font/google";
import "../globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Analytics } from "@vercel/analytics/next";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Body & prose — literary serif */
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-crimson",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

/** Section titles — warm classic serif */
const quattrocento = Quattrocento({
  subsets: ["latin"],
  variable: "--font-quattrocento",
  weight: ["400", "700"],
});

/** Hero headline — distinctive display */
const turretRoad = Turret_Road({
  subsets: ["latin"],
  variable: "--font-turret",
  weight: ["400", "500", "700", "800"],
});

/** Personal / handwritten accents */
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

/** Labels, skills — angular tech feel */
const quantico = Quantico({
  subsets: ["latin"],
  variable: "--font-quantico",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist-mono",
});

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const description = t(DATA.description, lang);
  const headline = t(DATA.headline, lang);
  const title = `${DATA.name} — ${headline}`;
  return {
    metadataBase: new URL(DATA.url),
    title: {
      default: title,
      template: `%s | ${DATA.name}`,
    },
    description,
    keywords: [
      "AI coach",
      "AI coaching for business",
      "AI consultant",
      "OpenAI Select Partner",
      "AI workflows and automation",
      "AI engineer",
      "AI product development",
      "LLM applications",
      "AI agents",
      "Next.js developer",
      "Düsseldorf",
      DATA.name,
    ],
    alternates: {
      canonical: `${DATA.url}/${lang}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${DATA.url}/${l}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${DATA.url}/${lang}`,
      siteName: `${DATA.name}`,
      locale: OG_LOCALE[lang],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title,
      card: "summary_large_image",
    },
    verification: {
      google: "",
      yandex: "",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative selection:bg-rose-200/60 selection:text-foreground dark:selection:bg-rose-900/40 dark:selection:text-rose-50",
          crimsonText.variable,
          quattrocento.variable,
          turretRoad.variable,
          caveat.variable,
          quantico.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Analytics />
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[120px] overflow-hidden z-0 opacity-[0.35] dark:opacity-[0.22]">
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
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.92_0.06_45/0.35),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.35_0.08_45/0.25),transparent)]" />
            {/* Pages own their own width: the landing page is full-bleed,
                everything else wraps itself in <PageShell>. */}
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
