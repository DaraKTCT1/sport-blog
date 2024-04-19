import Header from "@/app/components/Header";
import PostComponent from "@/app/components/PostComponent";
import { PostType } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

async function getPostByTag(slug: string) {
  const query = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == "${slug}"]._id)]{
    title,
    slug,
    publishedAt,
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
    <div>
      <Header title={`${slug}`} />
      <div>
        {posts?.length > 0 &&
          posts.map((post) => <PostComponent key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default SingleTag;
