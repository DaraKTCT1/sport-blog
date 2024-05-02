import Link from "next/link";
import { PostType } from "@/utils/interface";
import { Lilita_One, VT323 } from "next/font/google";
import Image from "next/image";

interface PropType {
  post: PostType;
}

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dateFont = VT323({ weight: "400", subsets: ["latin"] });

const PostComponent = ({ post }: PropType) => {
  // console.log(post.image);
  return (
    <Link href={`/posts/${post?.slug?.current}`}>
      <div className="mb-8 w-full h-96 rounded-md bg-[#e7ecef] hover:opacity-85 dark:bg-dark2 hover:dark:opacity-75">
        <div className="relative w-full h-[60%] lg:h-[55%] rounded-md">
          <Image alt="image" className="rounded-t-md" fill src={post?.image} />
        </div>
        <div className="w-full flex flex-col justify-between h-auto px-1 lg:px-2">
          <h2
            className={`${font.className} py-1 text-[20px] lg:text-[22px] dark:text-slate-300 text-blue1`}
          >
            {post?.title}
          </h2>
          <p
            className={` ${dateFont.className} py-1 text-[12px] lg:text-sm text-blue2`}
          >
            {new Date(post?.publishedAt).toDateString()}
          </p>
          <p className="dark:text-gray-400 text-[12px] lg:text-sm my-1 line-clamp-2">
            {post?.excerpt}
          </p>
          {/* tags */}
          <div className="py-1">
            {post?.tags?.map((tag) => (
              <span
                key={tag._id}
                className="mr-2 p-[2px] rounded-sm text-sm lowercase hover:dark:bg-blue1 dark:bg-dark1 border dark:border-dark1"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostComponent;
