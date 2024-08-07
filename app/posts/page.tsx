import Header from "@/components/Header";
import { PostType } from "@/utils/interface";
// import PostComponent from "@/components/PostComponent";
import { client } from "@/sanity/lib/client";
import AllPosts from "@/components/AllPosts";
import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 1800;

async function getAllPosts() {
  const query = `
  *[_type == "post"]{
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

export const metadata: Metadata = {
  title: "Posts",
  description: "Share information about sport for everyone.",
};

export default async function PostPage() {
  const posts: PostType[] = await getAllPosts();
  // console.log(posts);

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
        <AllPosts posts={posts} />
      </Suspense>
      <Footer />
    </section>
  );
}
