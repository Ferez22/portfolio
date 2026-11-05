import { NextRequest, NextResponse } from "next/server";
import {
  locales,
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

/** Manual pick (cookie) → browser language (Accept-Language, by q) → default. */
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, ...params] = part.trim().split(";");
        const q = params.find((p) => p.trim().startsWith("q="));
        return {
          code: tag.trim().slice(0, 2).toLowerCase(),
          q: q ? Number(q.trim().slice(2)) || 0 : 1,
        };
      })
      .sort((a, b) => b.q - a.q)
      .map((p) => p.code);
    for (const code of preferred) {
      if ((locales as readonly string[]).includes(code)) return code as Locale;
    }
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API, and any path with a file extension (assets, OG images).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
