import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/locales";

const PUBLIC_FILE = /\.(.*)$/;

// Best-effort locale detection from Accept-Language. Defaults to English
// for non-supported preferences, since the audience is overwhelmingly
// India + Bangalore SMB and English is the safest fallback.
function pickLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const lower = acceptLanguage.toLowerCase();
  if (lower.includes("ta")) return "ta";
  if (lower.includes("kn")) return "kn";
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass for static assets, API routes, Next internals.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already inside a localized homepage tree → just forward, with a
  // path header so the root layout can set <html lang>.
  const inLocale = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (inLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Root → redirect to the user's preferred supported locale (or English).
  if (pathname === "/") {
    const locale = pickLocale(request.headers.get("accept-language"));
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // All other routes (services, contact, etc.) stay English-shell for V1
  // — pass through with a path header so the root layout knows.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
