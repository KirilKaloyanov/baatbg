import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  console.log("request.nextUrl.pathname", request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/") {
    const acceptLang = request.headers.get("accept-language")?.split(",")[0];
    const preferredLocale = acceptLang?.startsWith("bg") ? "bg" : "en";
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|bg)/:path*",
    // '/((?!_next|_vercel|.*\\..*).*)'
  ],
};
