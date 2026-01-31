import React from "react";
import Image from "next/image";

import Header from "../../components/navigation/header";
import Loader from "@/components/navigation/loader";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { LoaderProvider } from "@context/LoaderContext";

import { getMenuItems } from "@services/menuService";
import { getAllPostsMetaData } from "@/services/postsService";

import { MenuDTO } from "@/interfaces/MenuDTO";
import { PostMetaDTO } from "@/interfaces/PostsDTO";

import fbLogo from "@icons/fb.svg";
import ytLogo from "@icons/youtube.svg";

import { Raleway, Oswald, Cormorant_Garamond } from "next/font/google";

const raleway = Raleway({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-raleway",
});

const oswald = Oswald({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-oswald",
});

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  weight: "300",
  variable: "--font-cormorant",
});

import "../globals.css";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const StrictMode =
    process.env.NODE_ENV !== "development" ? React.Fragment : React.StrictMode;

  const { locale } = await params;
  // const messages = await getTranslations({ locale });

  const items: MenuDTO[] | null = await getMenuItems();
  const subItems: PostMetaDTO[] | null = await getAllPostsMetaData();

  return (
    <html
      lang={locale}
      className={`${oswald.variable} ${raleway.variable} ${cormorant.variable}`}
    >
      <head></head>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <LoaderProvider>
              <Loader />
              <Header locale={locale} items={items} subItems={subItems} />

              <main className="grow-1">{children}</main>

              <footer className="bg-base-900 text-background mt-8 flex h-[20vh] items-center justify-between gap-10">
                <a
                  href="https://www.facebook.com/BAATBulgaria/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="cursor-pointer"
                    src={fbLogo}
                    alt="Icon"
                    height={40}
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC-HTJkh-ktMiw6UBO8FjV_w"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="cursor-pointer"
                    src={ytLogo}
                    alt="Icon"
                    height={40}
                  />
                </a>
                <button className="w-30 h-12 p-2 hover:bg-accent-500 bg-accent-100 text-base-900 transition-all cursor-pointer rounded-full">Subscribe</button>
              </footer>
          </LoaderProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = {
    prefix: {
      en: "BAAT",
      bg: "БААТ",
    },
    suffix: {
      en: "Welcome",
      bg: "Начало",
    },
  };
  const metadata = {
    title: {
      template: `${labels.prefix[locale]} | %s`,
      default: `${labels.prefix[locale]} | ${labels.suffix[locale]}`,
    },
  };
  return metadata;
}
