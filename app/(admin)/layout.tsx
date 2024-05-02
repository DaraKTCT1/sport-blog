// import CMSNavbar from "@/components/CMSNavbar";
// import { Provider } from "@/utils/Provider";
// import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sport Blog News",
  description: "Share information about sport for everyone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <body className="h-full bg-white1 text-dark1 dark:bg-dark1 dark:text-white1"> */}
        {/* <Provider> */}
        {/* <CMSNavbar /> */}
        {children}
        {/* </Provider> */}
      </body>
    </html>
  );
}
