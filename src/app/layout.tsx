import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Caveat,
  Crimson_Text,
  Geist_Mono,
  Quantico,
  Quattrocento,
  Turret_Road,
} from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

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

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
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
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative selection:bg-rose-200/60 selection:text-foreground dark:selection:bg-rose-900/40 dark:selection:text-rose-50",
          crimsonText.variable,
          quattrocento.variable,
          turretRoad.variable,
          caveat.variable,
          quantico.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[120px] overflow-hidden z-0 opacity-[0.35] dark:opacity-[0.22]">
              <FlickeringGrid
                className="h-full w-full"
                color="oklch(0.45 0.07 55 / 0.18)"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.92_0.06_45/0.35),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.35_0.08_45/0.25),transparent)]" />
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
