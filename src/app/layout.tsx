import { AuthProvider } from "../authContext";

export const metadata = {
  title: "BAAT application",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
