import Link from "next/link";
import { IoArrowRedoSharp } from "react-icons/io5";

interface PropType {
  title: string;
  tags?: boolean;
}
const Header = ({ title = "", tags = false }: PropType) => {
  return (
    <div className="py-14 px-4 mb-12 text-center flex flex-col justify-center w-full m-auto border-b dark:border-blue1">
      <h2 className="uppercase text-3xl mx-auto max-w-2xl font-bold">
        {title}
      </h2>

      {tags ? (
        <div className="text-blue1 mt-4 underline cursor-pointer text-[1.5rem]">
          <Link href="/tag">
            <div className="w-full flex m-auto justify-center items-center ">
              <IoArrowRedoSharp className="text-[2rem]" />
              <span className="pl-1">#AllBlogs</span>
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
