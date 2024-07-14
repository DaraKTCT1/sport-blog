import Navbar from "@/components/Navbar";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10  m-auto">
      <Navbar />
      <h1 className="text-[20px] mt-32 md:text-[2.5rem]">
        Oops this site is not found!
      </h1>
      <Link href="/">
        <span className="text-purple-700 underline text-[1rem] md:text-[1.5rem]">
          Home page
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
