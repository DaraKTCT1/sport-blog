import Header from "@/components/Header";
import PostComponent from "@/components/PostComponent";
import { PostType } from "@/utils/interface";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

async function getPostByTag(slug: string) {
  const query = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == "${slug}"]._id)]{
    title,
    slug,
    publishedAt,
    "image": image.asset->url,
    excerpt,
    tags []-> {
      _id,
      slug,
      name,
    } 
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

const SingleTag = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const posts: PostType[] = await getPostByTag(slug);
  // console.log(posts);

  if (!posts) {
    notFound();
  }

  return (
    <section>
      <Header title={`${slug}`} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-1 md:mx-3 justify-center items-center md:gap-10">
        {posts?.length > 0 &&
          posts.map((post) => <PostComponent key={post._id} post={post} />)}
      </div>
    </section>
  );
};

export default SingleTag;
