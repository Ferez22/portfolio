export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** A string translated into every supported locale. */
export type Localized = Record<Locale, string>;

/** Resolve a possibly-localized value against a locale. Plain strings pass through. */
export function t(value: Localized | string, lang: Locale): string {
  return typeof value === "string" ? value : value[lang];
}

/** Prefix an internal path with the active locale (leaves hashes/anchors intact). */
export function localePath(lang: Locale, path: string): string {
  if (path.startsWith("#")) return `/${lang}${path === "#" ? "" : `/${path}`}`;
  const [pathname, hash] = path.split("#");
  const clean = pathname === "/" ? "" : pathname;
  return `/${lang}${clean}${hash ? `#${hash}` : ""}`;
}
