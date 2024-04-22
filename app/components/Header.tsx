import Link from "next/link";

interface PropType {
  title: string;
  tags?: boolean;
}
const Header = ({ title = "", tags = false }: PropType) => {
  return (
    <header className="py-14 px-4 mb-12 text-center border-b dark:border-blue1">
      <h2 className="uppercase text-3xl mx-auto max-w-2xl font-bold">
        {title}
      </h2>

      {tags && (
        <div className="text-blue1 mt-4 underline cursor-pointer text-[1.5rem]">
          <Link href={"/tag"}>#AllBlogByTags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
