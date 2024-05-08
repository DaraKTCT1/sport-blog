export interface PostType {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: any;
  tags: Array<TagType>;
  _id: string;
  image: string;
  comments?: Array<CommentType>;
}
export interface TagType {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}
export interface CommentType {
  name: string;
  comment: string;
  _createdAt: string;
  _id: string;
}
