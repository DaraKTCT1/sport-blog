import Header from "@/components/Header";
import { PostType } from "@/utils/interface";
import { VT323 } from "next/font/google";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
const dateFont = VT323({ weight: "400", subsets: ["latin"] });

async function getPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0]{
      title,
      slug,
      publishedAt,
      excerpt,
      _id,
      body,
      tags []-> {
        _id,
        slug,
        name,
      } 
    }`;
  const data = await client.fetch(query);
  return data;
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post: PostType = await getPost(slug);

  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_US",
      url: `${process.env.WEBSITE_URL}posts/${slug}`,
      siteName: "SportBlogs",
    },
  };
}

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlForImage(value)} alt="Post" width={700} height={700} />
    ),
  },
};

export const revalidate = 600;

const SinglePost = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const post: PostType = await getPost(slug);
  // console.log(post);

  if (!post) {
    notFound();
  }
  // if do not have post call not found it mean go to not-found.tsx

  return (
    <div>
      <Header title={post?.title} tags={true} />
      <div className="text-center">
        <span className={`${dateFont.className} text-purple-500`}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
      </div>
      <div className="mt-5">
        <div className="w-full flex m-auto justify-center gap-3 p-3">
          {post?.tags?.length > 0 &&
            post?.tags.map((tag) => (
              <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
                <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                  #{tag.name}
                </span>
              </Link>
            ))}
        </div>

        <div className="mt-14 break-words text-justify max-w-2xl m-auto prose-headings:my-5 prose-headings:text-2xl prose-p:mb-5 prose-p:leading-7 prose-li:list-decimal prose-li:leading-7 prose-li:ml-4">
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
