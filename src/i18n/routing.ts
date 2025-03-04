import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg"],
  defaultLocale: "bg",
  pathnames: {
    "/": "/",
    "/pathnames": {
      en: "/pathnames",
      bg: "/patishta",
    },
  },
});

// export type Pathnames = keyof typeof routing.pathnames;
// export type Locale = (typeof routing.locales)[number]
