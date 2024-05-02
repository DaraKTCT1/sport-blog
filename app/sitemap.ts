import { client } from "@/sanity/lib/client";
import { PostType } from "@/utils/interface";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getPosts() {
    const query = `
        *[_type == "post"] | order(publishedAt desc)[0...10]{
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

  const posts: PostType[] = await getPosts();

  const postsUrl = posts.map((post) => {
    return {
      url: `${process.env.WEBSITE_URL}posts/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
    };
  });

  return [
    {
      url: process.env.WEBSITE_URL || "",
      lastModified: new Date(),
    },
    {
      url: `${process.env.WEBSITE_URL}tag` || "",
      lastModified: new Date(),
    },
    ...postsUrl,
  ];
}
