// import Header from "@/components/Header";
import { TagType } from "@/utils/interface";
import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";

export const revalidate = 600;

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
    <section>
      {/* <Header title="All Blog By Tags" /> */}
      <h1 className="w-full text-2xl font-semibold flex justify-center text-center py-5 md:py-8">
        All Blog By Tags
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center px-1 md:px-3 gap-2 md:gap-5">
        {tags?.length > 0
          ? tags.map((tag) => (
              <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
                <div className="border p-2 dark:border-amber-50 dark:bg-dark2 hover:dark:bg-dark1 bg-[#e7ecef] hover:bg-white1 rounded-sm lowercase cursor-pointer">
                  #{tag.name} ({tag?.postCount})
                </div>
              </Link>
            ))
          : null}
      </div>
    </section>
  );
};

export default Tags;
