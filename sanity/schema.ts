import { type SchemaTypeDefinition } from "sanity";
import { post } from "./schemas/post";
import { tag } from "./schemas/tag";
import { comment } from "./schemas/comment";
import { author } from "./schemas/author";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, tag, comment, author],
};
