import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10 mt-32 m-auto">
      <h1 className="text-[20px] md:text-[2.5rem]">Oops this site is not found!</h1>
      <Link href="/">
        <span className="text-purple-700 underline text-[1rem] md:text-[1.5rem]">Home page</span>
      </Link>
    </div>
  );
};

export default NotFound;
