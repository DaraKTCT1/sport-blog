import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Chakra_Petch } from "next/font/google";

const font = Chakra_Petch({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <nav className="mx-auto font-bold w-full px-6 md:px-10">
      <div className="flex justify-between items-center h-16 w-full">
        
          <h1 className={`${font.className} text-3xl dark:text-white1`}>
          <Link prefetch={true} href="/">
            Sport<span className="text-blue1">News</span>
          </Link></h1>
        
        
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
