import Header from "@/components/Header";
import { PostType } from "@/utils/interface";
import PostComponent from "@/components/PostComponent";
import { getPosts } from "@/utils/action";

export const revalidate = 600;

export default async function Home() {
  const posts: PostType[] = await getPosts();
  // console.log(posts);

  return (
    <section>
      <Header title="Our Latest Blogs" tags={true} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-1 md:mx-3 justify-center items-center md:gap-10">
        {posts?.length > 0
          ? posts.map((post) => <PostComponent key={post?._id} post={post} />)
          : null}
      </div>
    </section>
  );
}
