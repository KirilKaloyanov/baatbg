import Menu from "../../components/menu";
import { getMenuItems } from "@services/menuService";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { LoaderProvider } from "@context/LoaderContext";
import Loader from "@components/loader";

import '../globals.css'

export const metadata = {
  title: "BAAT application",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const items = await getMenuItems();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&display=swap`} />
      </head>
      <body>
        <div>
          <NextIntlClientProvider messages={messages}>
            <LoaderProvider>
              <Loader />
              <Menu items={items} locale={locale} />
              <p>BAAT</p>
              {children}
            </LoaderProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
