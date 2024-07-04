import Header from "@/components/Header";
import { PostType } from "@/utils/interface";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import AddComment from "@/components/AddComment";
import AllComments from "@/components/AllComments";
interface PropsType {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export const revalidate = 0;

async function getPost(slug: string, order: string = "desc") {
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0]{
      title,
      slug,
      publishedAt,
      excerpt,
      _id,
      body,
      "image": image.asset->url,
      tags []-> {
        _id,
        slug,
        name,
      },
      "comments": *[ _type == "comment" && post._ref == ^._id ] | order(_createdAt ${order})[0...10]{
        name,
        comment,
        _createdAt,
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
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
        // {
        //   url: urlForImage(post?.body?.find((b: any) => b._type === "image")),
        //   width: 1200,
        //   height: 630,
        // },
      ],
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

const SinglePost = async ({ params: { slug }, searchParams }: PropsType) => {
  const searchParamsOrder = searchParams.comments || "desc";
  const post: PostType = await getPost(slug, searchParamsOrder.toString());
  // console.log(post);

  if (!post) {
    notFound();
  }
  // if do not have post call not found it mean go to not-found.tsx

  return (
    <div className="w-full">
      <Header title={post?.title} tags={true} />
      <div className="text-center w-full px-3 md:px-5 lg:px-10">
        <span className="text-purple-500">
          {new Date(post?.publishedAt).toDateString()}
        </span>
      </div>
      <div className="w-full mt-5">
        <div className="w-full flex m-auto justify-center gap-3 p-3">
          {post?.tags?.length > 0 &&
            post?.tags.map((tag) => (
              
                <span key={tag._id} className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
<Link
                prefetch={true}
                
                href={`/tag/${tag.slug.current}`}
              >
                  #{tag.name}
</Link>
                </span>
              
            ))}
        </div>

        <div className="w-full px-5 md:px-10 lg:px-12 mt-14 break-words text-justify max-w-2xl m-auto prose-headings:my-5 prose-headings:text-2xl prose-p:mb-5 prose-p:leading-7 prose-li:list-decimal prose-li:leading-7 prose-li:ml-4">
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
          <AddComment postId={post._id} />
          <AllComments
            slug={post.slug.current}
            commentsOrder={searchParamsOrder.toString()}
            comments={post?.comments || []}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
