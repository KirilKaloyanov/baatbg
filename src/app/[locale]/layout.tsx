// import { AuthProvider } from "@context/AuthContext";
import Menu from "../../components/menu";
import { getMenuItems } from "@services/menuService";
import { ReactQueryProvider } from "@context/QueryContext";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

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
          <ReactQueryProvider>
            <NextIntlClientProvider messages={messages}>
              <Menu items={items} locale={locale} />
              <p>BAAT</p>
              {children}
            </NextIntlClientProvider>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
