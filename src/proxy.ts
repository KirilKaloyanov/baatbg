import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  
  const host = request.headers.get("host");
  const targetDomain = "baat-api--baatbgorg.us-central1.hosted.app";

  // Redirect if accessed via the internal .run.app 
  if (host && host.includes(".a.run.app")) {
    const url = request.nextUrl.clone();
    url.host = targetDomain;
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  if (request.nextUrl.pathname === "/") {
    const acceptLang = request.headers.get("accept-language")?.split(",")[0];
    const preferredLocale = acceptLang?.startsWith("bg") ? "bg" : "en";
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }
  
  const [_, locale, ...pathSegments] = request.nextUrl.pathname.split('/');

  const currentLocale = locale && (locale === 'bg' || locale === 'en') ? locale : "en";
  
  const path = pathSegments.join('/');
  // console.log(currentLocale, path)
  // if (path === 'projects') {
  //   return NextResponse.redirect(new URL(`/${currentLocale}/projects/danube-cycle-plans`, request.url));
  // }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|bg)/:path*",
    // '/((?!_next|_vercel|.*\\..*).*)'
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
