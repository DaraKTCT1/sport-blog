// import Header from "@/components/Header";
import PostComponent from "@/components/PostComponent";
import { client } from "@/sanity/lib/client";
import { PostType } from "@/utils/interface";
import { notFound } from "next/navigation";

export const revalidate = 600;

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

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return {
    title: `#${slug}`,
    description: `Posts with the tag #${slug}`,
    openGraph: {
      title: `#${slug}`,
      description: `Posts with the tag #${slug}`,
      type: "website",
      locale: "en_US",
      url: `${process.env.WEBSITE_URL}tag/${slug}`,
      siteName: "SportBlogs",
    },
  };
}

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
    <section className="w-full">
      {/* <Header title={`${slug}`} /> */}
      <h1 className="w-full uppercase text-2xl font-semibold flex justify-center text-center py-5 md:py-8">
        {`${slug}`}
      </h1>
      <div className="w-full px-3 md:px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-2 md:gap-10">
        {posts?.length > 0
          ? posts.map((post) => <PostComponent key={post._id} post={post} />)
          : null}
      </div>
    </section>
  );
};

export default SingleTag;
