import Header from "@/components/Header";
import { TagType } from "@/utils/interface";
import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

async function getAllTags() {
  const query = `
    *[_type == "tag"]{
      name,
      slug,
      _id,
      "postCount": count(*[_type == "post" && references("tags", ^._id)])
    }`;
  const data = await client.fetch(query);
  return data;
}

export const metadata: Metadata = {
  title: "Tags",
  description: "Share information about sport for everyone.",
};

const Tags = async () => {
  const tags: TagType[] = await getAllTags();
  // console.log(tags);

  return (
    <section className="w-full">
      <Header title="All Blog By Tags" />
      <div className="w-full flex flex-col m-auto justify-center items-center px-1 md:px-3 gap-1 md:gap-2">
        <>
          {tags?.length > 0
            ? tags.map((tag) => (
                <Link
                  prefetch={true}
                  key={tag._id}
                  href={`/tag/${tag.slug.current}`}
                >
                  <div className="border w-96 my-1 p-2 dark:border-amber-50 dark:bg-dark2 hover:dark:bg-dark1 bg-[#e7ecef] hover:bg-white1 rounded-sm lowercase cursor-pointer">
                    #{tag.name} ({tag?.postCount} post)
                  </div>
                </Link>
              ))
            : null}
          <Link prefetch={true} href="/posts">
            <div className="border w-96 my-1 p-2 dark:border-amber-50 dark:bg-dark2 hover:dark:bg-dark1 bg-[#e7ecef] hover:bg-white1 rounded-sm lowercase cursor-pointer">
              #All Posts (all post)
            </div>
          </Link>
          <Link prefetch={true} href="/author">
            <div className="border w-96 my-1 p-2 dark:border-amber-50 dark:bg-dark2 hover:dark:bg-dark1 bg-[#e7ecef] hover:bg-white1 rounded-sm lowercase cursor-pointer">
              #Posts by Author (all author)
            </div>
          </Link>
        </>
      </div>
    </section>
  );
};

export default Tags;
