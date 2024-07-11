import Header from "@/components/Header";
import PostComponent from "@/components/PostComponent";
import { client } from "@/sanity/lib/client";
import { PostType } from "@/utils/interface";
import { notFound } from "next/navigation";

export const revalidate = 3600;

async function getPostByAuthor(slug: string) {
  const query = `
    *[_type == "post" && references(*[_type == "author" && slug.current == "${slug}"]._id)]{
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
    description: `Posts with the author #${slug}`,
    openGraph: {
      title: `#${slug}`,
      description: `Posts with the author #${slug}`,
      type: "website",
      locale: "en_US",
      url: `${process.env.WEBSITE_URL}author/${slug}`,
      siteName: "SportBlogs",
    },
  };
}

const SingleAuthor = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const posts: PostType[] = await getPostByAuthor(slug);
  // console.log(posts);

  if (!posts) {
    notFound();
  }

  return (
    <section className="w-full">
      <Header title={`Post By Author  ${slug}`} tags={true} />
      <div className="w-full px-3 md:px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-2 md:gap-10">
        {posts?.length > 0
          ? posts.map((post) => <PostComponent key={post._id} post={post} />)
          : null}
      </div>
    </section>
  );
};

export default SingleAuthor;
