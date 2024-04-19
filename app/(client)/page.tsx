import { client } from "@/sanity/lib/client";
import Header from "../components/Header";
import { PostType } from "../utils/interface";
import PostComponent from "../components/PostComponent";

async function getPosts() {
  const query = `
  *[_type == "post"]{
    title,
    slug,
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

export const revalidate = 60;

export default async function Home() {
  const posts: PostType[] = await getPosts();

  return (
    <main>
      <Header title="Latest 10 Blogs" tags />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-1 md:mx-3 justify-center items-center md:gap-10">
        {posts?.length > 0 &&
          posts.map((post) => <PostComponent key={post?._id} post={post} />)}
      </div>
    </main>
  );
}
