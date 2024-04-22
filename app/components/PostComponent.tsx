import Link from "next/link";
import { PostType } from "../utils/interface";
import { Lilita_One, VT323 } from "next/font/google";

interface PropType {
  post: PostType;
}

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dateFont = VT323({ weight: "400", subsets: ["latin"] });

const PostComponent = ({ post }: PropType) => {
  return (
    <div className="mb-8 p-4 border border-gray-400 rounded-md shadow-sm shadow-purple-950 hover:shadow-md hover:bg-purple-500 hover:text-white bg-[#e7ecef] hover:bg-white1 dark:bg-dark2 hover:dark:bg-dark1">
      <Link href={`/posts/${post?.slug?.current}`}>
        <h2
          className={`${font.className} text-2xl dark:text-slate-300 text-blue1`}
        >
          {post?.title}
        </h2>
        <p className={`${dateFont.className} my-2 text-purple-800`}>
          {new Date(post?.publishedAt).toDateString()}
        </p>
        <p className="dark:text-gray-400 mb-4 line-clamp-2">{post?.excerpt}</p>
      </Link>

      {/* tags */}
      <div>
        {post?.tags?.map((tag) => (
          <span
            key={tag._id}
            className="mr-2 p-1 rounded-sm text-sm lowercase hover:dark:bg-blue1 dark:bg-dark1 border dark:border-dark1"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;
