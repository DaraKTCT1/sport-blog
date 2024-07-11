import { CommentType } from "@/utils/interface";
import Link from "next/link";
import React from "react";
import { Chakra_Petch } from "next/font/google";

const font = Chakra_Petch({ weight: "400", subsets: ["latin"] });

interface PropsType {
  comments: Array<CommentType>;
  slug: string;
  commentsOrder: string;
}

const AllComments = ({ comments, commentsOrder, slug }: PropsType) => {
  return (
    <div className={font.className}>
      <h3 className="font-bold tracking-wider">All Comments</h3>
      {comments?.length === 0 && (
        <p className="tracking-wider">No comments yet.</p>
      )}
      {comments?.length > 0 && (
        <div className="mb-4">
          <span className="font-bold text-[20px] tracking-wider">SortBy</span>
          {"  "}
          <Link
            scroll={false}
            href={`/posts/${slug}/?comments=asc`}
            className={`pl-2 underline tracking-wider font-semibold text-sm ${
              commentsOrder === "asc" ? "text-purple-500" : ""
            }`}
          >
            Oldest
          </Link>
          <Link
            scroll={false}
            href={`/posts/${slug}/?comments=desc`}
            className={`pl-2 underline tracking-wider font-semibold text-sm ${
              commentsOrder === "desc" ? "text-purple-500" : ""
            }`}
          >
            Newest
          </Link>
        </div>
      )}
      {comments?.map((comment) => (
        <div
          key={comment._id}
          className="border-b border-gray-600 dark:border-gray-200/50 py-2"
        >
          <p>
            <strong className="text-[20px] tracking-wider text-purple-400">
              {comment?.name}
            </strong>{" "}
            <span className="text-gray-400 text-sm pl-1 md:pl-3">
              {new Date(comment?._createdAt).toLocaleString()}
            </span>
          </p>
          <p className="dark:text-gray-400">{comment?.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
