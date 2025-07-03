import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg"],
  defaultLocale: "bg",
  pathnames: {
    "/": "/",
    // "/posts/about/us": {
    //   en: "/posts/about/us", 
    //   bg: "/posts/za/nas"
    // },
  },
});

// export type Pathnames = keyof typeof routing.pathnames;
// export type Locale = (typeof routing.locales)[number]
