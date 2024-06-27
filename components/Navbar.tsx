import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
// import { Lilita_One } from "next/font/google";

// const font = Lilita_One({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <nav className="mx-auto max-w-5xl px-6">
      <div className="flex justify-between items-center h-16 w-full">
        <Link href="/">
          <div className="text-3xl dark:text-white1">
            Sport<span className="text-blue1">News</span>
          </div>
        </Link>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
