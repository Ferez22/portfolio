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
import { MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

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
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
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
          <DockIcon className={DOCK_ICON_CLASS}>
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

export default function Navbar() {
  const [showSocials, setShowSocials] = useState(false);

  const socials = Object.entries(DATA.contact.social).filter(
    ([, social]) => social.navbar
  );

  return (
    <>
      {/* Click-away layer: closes the socials dock when tapping outside it */}
      {showSocials && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowSocials(false)}
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
                    onClick={() => setShowSocials(false)}
                  />
                ))}
              </Dock>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main dock */}
        <Dock className={DOCK_CLASS}>
          {DATA.navbar.map((item) => (
            <IconLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}

          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border"
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={showSocials ? "Hide social links" : "Show social links"}
                aria-expanded={showSocials}
                onClick={() => setShowSocials((v) => !v)}
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
              <p>{showSocials ? "Less" : "Socials"}</p>
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
              <p>Theme</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        </Dock>
      </div>
    </>
  );
}
