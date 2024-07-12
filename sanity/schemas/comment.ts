import { defineType } from "sanity";
import { Rule } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
      validation: (Rule: Rule) =>
        Rule.required()
          .max(100)
          .error("Name most contain and max 100 characters"),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
      validation: (Rule: Rule) =>
        Rule.required()
          .max(100)
          .error("Email most contain and max 100 characters"),
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
      readOnly: true,
      validation: (Rule: Rule) =>
        Rule.required()
          .max(1000)
          .error("Comment most contain and max 1000 characters"),
    },
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      validation: (Rule: Rule) => Rule.required().error("Post is Required"),
    },
  ],
});
