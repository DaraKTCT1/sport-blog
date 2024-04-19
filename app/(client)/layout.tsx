import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "../utils/Provider";

// const inter = Inter({ subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"] });

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
      <body
        className={`${firaCode.className} h-full bg-amber-50 text-indigo-950 dark:bg-indigo-950 dark:text-amber-50 dark:selection:bg-purple-500`}
      >
        <Provider>
          <Navbar />
          <main className="mx-auto max-w-7xl px-6">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
