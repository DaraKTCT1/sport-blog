import Link from "next/link";

interface PropType {
  title: string;
  tags?: boolean;
}
const Header = ({ title = "", tags = false }: PropType) => {
  return (
    <header className="py-14 px-4 mb-12 text-center border-b dark:border-purple-900">
      <h2 className="uppercase text-2xl mx-auto max-w-2xl font-bold">
        {title}
      </h2>

      {tags && (
        <div className="text-purple-700 mt-4 cursor-pointer underline text-[1.5rem]">
          <Link href={"/tag"}>#tags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
