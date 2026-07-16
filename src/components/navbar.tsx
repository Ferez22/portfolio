"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { AnimatePresence, motion } from "motion/react";
import { Languages, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  locales,
  isLocale,
  defaultLocale,
  localeNames,
  localePath,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const DOCK_CLASS =
  "z-50 pointer-events-auto relative h-14 px-3 py-2 w-fit max-w-[calc(100vw-1rem)] mx-auto flex gap-3 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5";
const DOCK_ICON_CLASS =
  "rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors";
const TOOLTIP_CLASS =
  "rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]";

function IconLink({
  href,
  label,
  icon: Icon,
  onClick,
  highlight,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  highlight?: boolean;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={onClick}
        >
          <DockIcon
            className={cn(
              DOCK_ICON_CLASS,
              highlight &&
                "relative text-chart-1 ring-2 ring-chart-1/70 animate-hook-pulse"
            )}
          >
            <Icon className="size-full rounded-sm overflow-hidden object-contain" />
          </DockIcon>
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
        <p>{label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

const NAV_LABELS: Record<string, keyof ReturnType<typeof getDictionary>["nav"]> = {
  "/": "home",
  "/blog": "blog",
  "/#contact": "contact",
};

export default function Navbar() {
  const [showSocials, setShowSocials] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const pathname = usePathname();

  const toggleSocials = () =>
    setShowSocials((v) => {
      if (!v) setShowLangs(false);
      return !v;
    });
  const toggleLangs = () =>
    setShowLangs((v) => {
      if (!v) setShowSocials(false);
      return !v;
    });
  const closeAll = () => {
    setShowSocials(false);
    setShowLangs(false);
  };

  const segment = pathname.split("/")[1];
  const lang: Locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(lang);

  // Path minus the current locale prefix, used to build language-switch links.
  const restPath = isLocale(segment)
    ? pathname.slice(`/${segment}`.length) || "/"
    : pathname;

  const socials = Object.entries(DATA.contact.social).filter(
    ([, social]) => social.navbar
  );

  return (
    <>
      {/* Click-away layer: closes the open secondary dock when tapping outside it */}
      {(showSocials || showLangs) && (
        <div
          className="fixed inset-0 z-20"
          onClick={closeAll}
          aria-hidden
        />
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex flex-col items-center gap-3">
        {/* Secondary dock: expanded social links, floats above the main bar */}
        <AnimatePresence>
          {showSocials && (
            <motion.div
              key="socials-dock"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Dock className={DOCK_CLASS}>
                {socials.map(([name, social]) => (
                  <IconLink
                    key={`social-${name}`}
                    href={social.url}
                    label={name}
                    icon={social.icon}
                    onClick={closeAll}
                  />
                ))}
              </Dock>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secondary dock: language switcher, floats above the main bar */}
        <AnimatePresence>
          {showLangs && (
            <motion.div
              key="langs-dock"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Dock className={DOCK_CLASS}>
                {locales.map((loc) => (
                  <Tooltip key={`lang-${loc}`}>
                    <TooltipTrigger asChild>
                      <a
                        href={localePath(loc, restPath)}
                        aria-label={localeNames[loc]}
                        onClick={closeAll}
                      >
                        <DockIcon
                          className={cn(
                            "flex items-center justify-center rounded-3xl cursor-pointer size-full bg-background font-tech text-[0.7rem] font-bold uppercase tracking-wider backdrop-blur-3xl border border-border transition-colors",
                            loc === lang
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          {localeNames[loc]}
                        </DockIcon>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
                      <p>{localeNames[loc]}</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>
                ))}
              </Dock>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main dock */}
        <Dock className={DOCK_CLASS}>
          {DATA.navbar.map((item) => {
            const labelKey = NAV_LABELS[item.href];
            return (
              <IconLink
                key={item.href}
                href={localePath(lang, item.href)}
                label={labelKey ? dict.nav[labelKey] : item.label}
                icon={item.icon}
                highlight={item.href === "/#contact"}
              />
            );
          })}

          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border"
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={showSocials ? dict.tooltip.less : dict.tooltip.socials}
                aria-expanded={showSocials}
                onClick={toggleSocials}
                className="flex size-10 shrink-0 aspect-square items-center justify-center rounded-3xl cursor-pointer bg-background text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors"
              >
                {showSocials ? (
                  <X className="size-1/2" />
                ) : (
                  <MoreHorizontal className="size-1/2" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
              <p>{showSocials ? dict.tooltip.less : dict.tooltip.socials}</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>

          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border"
          />

          {/* Language switcher toggle — opens the languages dock */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={dict.tooltip.language}
                aria-expanded={showLangs}
                onClick={toggleLangs}
                className="flex h-10 shrink-0 items-center justify-center gap-1 rounded-3xl cursor-pointer bg-background px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors"
              >
                {showLangs ? (
                  <X className="size-5" />
                ) : (
                  <>
                    <Languages className="size-4" />
                    <span className="font-tech text-[0.6rem] font-bold uppercase tracking-wider">
                      {localeNames[lang]}
                    </span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
              <p>{dict.tooltip.language}</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>

          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border"
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon className={DOCK_ICON_CLASS}>
                <ModeToggle className="size-full cursor-pointer" />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
              <p>{dict.tooltip.theme}</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        </Dock>
      </div>
    </>
  );
}
