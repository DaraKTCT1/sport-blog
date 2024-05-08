import { CommentType } from "@/utils/interface";
import Link from "next/link";
import React from "react";

interface PropsType {
  comments: Array<CommentType>;
  slug: string;
  commentsOrder: string;
}

const AllComments = ({ comments, commentsOrder, slug }: PropsType) => {
  return (
    <div>
      <h3 className="font-bold">All Comments</h3>
      {comments?.length === 0 && <p>No comments yet.</p>}
      {comments?.length > 0 && (
        <div className="mb-4">
          <span className="font-bold text-[20px]">SortBy</span>
          {"  "}
          <Link
            scroll={false}
            href={`/posts/${slug}/?comments=asc`}
            className={`pl-2 underline text-sm ${
              commentsOrder === "asc" ? "text-purple-500" : ""
            }`}
          >
            Oldest
          </Link>
          <Link
            scroll={false}
            href={`/posts/${slug}/?comments=desc`}
            className={`pl-2 underline text-sm ${
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
            <strong className="text-[20px] text-gray-700 dark:text-amber-50">
              {comment?.name}
            </strong>
            {"  "}
            <span className="text-gray-500 text-sm">
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
