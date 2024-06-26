import Header from "@/components/Header";
import { PostType } from "@/utils/interface";
import PostComponent from "@/components/PostComponent";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

// export const revalidate = 60;

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

  return (
    <section className="w-full">
      <Header title="Our Latest Blogs" />
      <div className="w-full grid px-3 md:px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center md:gap-10">
        {posts?.length > 0
          ? posts.map((post) => <PostComponent key={post?._id} post={post} />)
          : null}
      </div>
      <div className="w-full flex justify-center m-auto my-3 md:my-5">
        <Link href="/tag">
          <button className="btn">
            <strong className="strong-tag">ALL POSTS</strong>
            <div className="container-stars">
              <div className="stars"></div>
            </div>

            <div className="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        </Link>
      </div>
    </section>
  );
}
