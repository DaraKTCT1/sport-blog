import Header from "@/components/Header";
// import { PostType } from "@/utils/interface";
// import PostComponent from "@/components/PostComponent";
import { client } from "@/sanity/lib/client";
import AllPosts from "@/components/AllPosts";
import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 3600;

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getAllPosts(firstTake: number, lastTake: number) {
  const query = `
  *[_type == "post"] | order(_id) [${firstTake}...${lastTake}] {
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
async function countPost() {
  const query = `count(*[_type == "post"])`;
  const data = await client.fetch(query);
  return data;
}

export const metadata: Metadata = {
  title: "Posts",
  description: "Share information about sport for everyone.",
};

export default async function PostPage({ searchParams }: PropsType) {
  const PAGE_SIZE = 12; // size 12 obj in one pagination
  const pagenum = searchParams.pagenum ?? 0;
  let firstTake: number;
  let lastTake: number;
  if (+pagenum <= 1) {
    firstTake = 0;
    lastTake = PAGE_SIZE;
  } else {
    firstTake = (+pagenum - 1) * PAGE_SIZE;
    lastTake = PAGE_SIZE * +pagenum;
  }

  // const posts: PostType[] = await getAllPosts(firstTake, lastTake);
  // // console.log(posts);
  const [posts, count] = await Promise.all<any>([
    getAllPosts(firstTake, lastTake),
    countPost(),
  ]);

  let totalPages = 0;
  const countPages = Math.floor(count / PAGE_SIZE);
  if (countPages < 1) {
    totalPages = countPages;
  } else {
    totalPages = count % PAGE_SIZE == 0 ? countPages : countPages + 1;
  }

  if (!posts) {
    return (
      <section className="w-full">
        <Navbar />
        <Header title="All Our Posts" />
        <h1 className="text-gray-400">Thare are no posts</h1>
        <Footer />
      </section>
    );
  }

  return (
    <section className="w-full">
      <Navbar />
      <Header title="All Our Posts" />
      <Suspense fallback={<div className="loading-root"></div>}>
        {" "}
        <AllPosts
          posts={posts}
          totalPages={totalPages}
          currentPage={+pagenum}
        />
      </Suspense>
      <Footer />
    </section>
  );
}
