import Header from "@/components/Header";
import { AuthorType } from "@/utils/interface";
import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 1800;

async function getAllAuthor() {
  const query = `
    *[_type == "author"]{
      name,
      slug,
      _id,
      "postCount": count(*[_type == "post" && references("authors", ^._id)])
    }`;
  const data = await client.fetch(query);
  return data;
}

export const metadata: Metadata = {
  title: "Author",
  description: "Share information about sport for everyone.",
};

const AllAuthor = async () => {
  const authors: AuthorType[] = await getAllAuthor();
  // console.log(tags);

  return (
    <section className="w-full">
      <Navbar />
      <Header title="Post By All Our Author" />
      <div className="w-full flex flex-col m-auto justify-center items-center px-1 md:px-3 gap-1 md:gap-2">
        {authors?.length > 0
          ? authors.map((author) => (
              <Link
                prefetch={true}
                key={author._id}
                href={`/author/${author.slug.current}`}
              >
                <div className="border w-96 my-1 p-2 dark:border-amber-50 dark:bg-dark2 hover:dark:bg-dark1 bg-[#e7ecef] hover:bg-white1 rounded-sm lowercase cursor-pointer">
                  #{author.name} ({author?.postCount} post)
                </div>
              </Link>
            ))
          : null}
      </div>
      <Footer />
    </section>
  );
};

export default AllAuthor;
