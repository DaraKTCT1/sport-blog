import { PostType } from "@/utils/interface";
import PostComponent from "./PostComponent";

const RelatedPostsContainer = ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="w-full min-h-screen">
      <h1 className="w-full flex text-center justify-center py-3 md:py-5 font-bold md:text-xl">
        Related Posts
      </h1>
      <div className="w-full grid px-3 md:px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center md:gap-10">
        {posts.map((post) => (
          <PostComponent key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPostsContainer;
