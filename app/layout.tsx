import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Provider } from "@/utils/Provider";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.WEBSITE_URL || ""),
  title: {
    default: "Sport Blog News",
    template: "%s | Sport Blog News",
  },
  description: "Share information about sport for everyone.",
  // openGraph is how website look like when we share our website
  openGraph: {
    title: "Sport Blog News",
    description: "Share information about sport for everyone.",
    type: "website",
    locale: "en_US",
    url: process.env.WEBSITE_URL,
    siteName: "SportBlogs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full bg-white1 text-dark1 dark:text-white1 dark:bg-dark1">
        <Provider
          attribute="class"
          // defaultTheme="system"
          // enableSystem
          // disableTransitionOnChange
        >
          <Navbar />
          <main
            className={`${firaCode.className} w-full`}
          >
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
