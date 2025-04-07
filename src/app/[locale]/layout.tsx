import Menu from "../../components/menu";
import { getMenuItems } from "@services/menuService";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { LoaderProvider } from "@context/LoaderContext";
import Loader from "@components/loader";

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
      <body>
        <div style={{ backgroundColor: "lightgrey" }}>
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
