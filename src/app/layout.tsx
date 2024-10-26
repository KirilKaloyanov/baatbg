import { AuthProvider } from "../authContext";
import Menu from '../components/menu'
import { getMenuItems } from "@services/firestoreService";

export const metadata = {
  title: "BAAT application",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const items = await getMenuItems('menu');

  return (
    <html lang="en">
      <body>
        <div style={{ backgroundColor: "lightgrey" }}>
          <Menu items={items} />
          <p>BAAT</p>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
