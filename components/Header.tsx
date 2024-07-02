"use client";

import Link from "next/link";
import { IoArrowRedoSharp } from "react-icons/io5";
import useNavbarColorChange from "./useNavbarColorChange";
import { Chakra_Petch } from "next/font/google";

const font = Chakra_Petch({ weight: "400", subsets: ["latin"] });

interface PropType {
  title: string;
  tags?: boolean;
}
const Header = ({ title = "", tags = false }: PropType) => {
  const isScrolled = useNavbarColorChange();

  return (
    <div
      className={`${font.className} ${
        isScrolled ? "bg-[#EAEEF1] dark:bg-[#2C2C2C]" : ""
      } navscrool sticky top-0 left-0 right-0 z-50 py-2 md:py-4 mb-12 text-center flex flex-col justify-center max-w-full m-auto`}
    >
      <h2 className="uppercase text-[24px] md:text-3xl mx-auto max-w-2xl font-bold">
        {title}
      </h2>

      {tags ? (
        <div className="text-blue1 mt-2 md:mt-4 underline cursor-pointer text-[20px] md:text-[1.5rem]">
          <Link href="/tag">
            <div className="w-full flex m-auto justify-center items-center ">
              <IoArrowRedoSharp className="text-[2rem]" />
              <span className="pl-1">#AllOurBlogsByTags</span>
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
