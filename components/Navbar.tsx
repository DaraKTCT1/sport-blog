import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Chakra_Petch } from "next/font/google";

const font = Chakra_Petch({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <nav className="mx-auto font-bold w-full px-6 md:px-10">
      <div className="flex justify-between items-center h-16 w-full">
        <Link prefetch={true} href="/">
          <h1 className={`${font.className} text-3xl dark:text-white1`}>
            Sport<span className="text-blue1">News</span>
          </h1>
        </Link>
        <div className="flex gap-1">
          <Link href="/tag/football">football</Link>
          <Link href="/tag/boxing">boxing</Link>
          <Link href="/tag/basketball">basketball</Link>
          <Link href="/tag/volleyball">volleyball</Link>
          <Link href="/tag/most-popular">most-popular</Link>
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
