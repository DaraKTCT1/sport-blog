import { title } from "process";
export interface PostType {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: any;
  tags: Array<TagType>;
  _id: string;
}
export interface TagType {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}
