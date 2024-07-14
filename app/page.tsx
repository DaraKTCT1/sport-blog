import Header from "@/components/Header";
import { PostType } from "@/utils/interface";
import PostComponent from "@/components/PostComponent";
import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 600;

async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc)[0...10]{
      title,
      slug,
      "image": image.asset->url,
      publishedAt,
      excerpt,
      tags []-> {
        _id,
        slug,
        name,
      } 
    }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const posts: PostType[] = await getPosts();
  // console.log(posts);
  // w-full bg-white1 text-dark1 dark:text-white1 dark:bg-dark1

  return (
    <section className="w-full">
      <Navbar />
      <Header title="Our Latest Blogs" tags={true} />
      <div className="w-full grid px-3 md:px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center md:gap-10">
        {posts?.length > 0
          ? posts.map((post) => <PostComponent key={post?._id} post={post} />)
          : null}
      </div>
      <Footer />
    </section>
  );
}
