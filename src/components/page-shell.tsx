import { cn } from "@/lib/utils";

/**
 * The reading column used by every page except the full-bleed landing page.
 * Lives here (rather than in the root layout) so the landing page can span
 * the whole viewport without fighting a parent max-width.
 */
export default function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto max-w-2xl px-6 py-12 pb-24 sm:py-24",
        className,
      )}
    >
      {children}
    </div>
  );
}
