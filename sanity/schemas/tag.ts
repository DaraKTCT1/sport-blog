import { defineType } from "sanity";
import { Rule } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Tag Name",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required()
          .max(100)
          .error("Tag Name most contain and max 100 characters"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule: Rule) => Rule.required().error("Slug Required"),
    },
  ],
});
