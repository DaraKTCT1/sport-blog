"use client";

import { PostType } from "@/utils/interface";
import PostComponent from "./PostComponent";
import { ChangeEvent, useState } from "react";

const AllPosts = ({ posts }: { posts: PostType[] }) => {
  const [postItems, setPostItems] = useState<PostType[]>(posts);
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full px-3 md:px-6">
        <div className="input-container w-full mb-5">
          <input
            onChange={handleInputChange}
            value={query}
            type="text"
            className="input dark:bg-gray-800 placeholder:dark:text-white"
            placeholder="Search..."
          />
          <button type="submit">
            <span className="icon text-black dark:text-white">
              <svg
                width="19px"
                height="19px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="1"
                    d="M14 5H20"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M14 8H17"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                    stroke="#000"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M22 22L20 20"
                    stroke="#000"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="w-full grid px-3 md:px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center md:gap-10">
        {query
          ? postItems
              .filter((post) =>
                post.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((post) => <PostComponent key={post?._id} post={post} />)
          : postItems.map((post) => (
              <PostComponent key={post?._id} post={post} />
            ))}
      </div>
    </div>
  );
};

export default AllPosts;
