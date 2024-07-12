import { defineType } from "sanity";
import { Rule } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Author name",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required()
          .max(100)
          .error("Author name most contain and max 100 characters"),
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
