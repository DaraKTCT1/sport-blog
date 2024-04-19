import Link from "next/link";
import { Lilita_One } from "next/font/google";
import { TiArrowBack } from "react-icons/ti";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });

const CMSNavbar = () => {
  return (
    <div className="flex justify-between items-center py-1 px-5">
      <Link href="/">
        <TiArrowBack className="text-3xl" />
      </Link>
      <div className={`${font.className} text-3xl dark:text-amber-50`}>
        Sport
        <span className="text-purple-500">News</span>
      </div>
    </div>
  );
};

export default CMSNavbar;
