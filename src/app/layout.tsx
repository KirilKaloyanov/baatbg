import { AuthProvider } from "@context/AuthContext";
import Menu from "../components/menu";
import { getMenuItems } from "@services/menuService";
import { ReactQueryProvider } from "@context/QueryContext";

export const metadata = {
  title: "BAAT application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = await getMenuItems();

  return (
    <html lang="en">
      <body>
        <div style={{ backgroundColor: "lightgrey" }}>
          <Menu items={items} />
          <p>BAAT</p>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
