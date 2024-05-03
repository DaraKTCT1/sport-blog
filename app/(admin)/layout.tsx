import { Provider } from "@/utils/Provider";
import CMSNavbar from "@/components/CMSNavbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider attribute="class" defaultTheme="system">
          <CMSNavbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
