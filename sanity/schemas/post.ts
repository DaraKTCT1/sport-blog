import { Rule } from "sanity";
import { defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title Required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Slug Required"),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      // options: {
      //   hotspot: true, // Allows selecting a hotspot for cropping
      // },
      validation: (Rule: Rule) => Rule.required().error("Image Required"),
    },
    {
      name: "excerpt",
      title: "Excerpt (Max 200 character)",
      type: "text",
      validation: (Rule: Rule) =>
        Rule.required()
          .max(200)
          .error("Excerpt most contain and max 200 characters"),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [{ type: "text", name: "alt", title: "Alt" }],
        },
      ],
      validation: (Rule: Rule) => Rule.required().error("Body Required"),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (Rule: Rule) => Rule.required().error("Tags is Required"),
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "author" }] }],
      validation: (Rule: Rule) => Rule.required().error("Authors is Required"),
    },
  ],
});
