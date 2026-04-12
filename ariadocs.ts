import { createDocs } from "@ariadocs/react";
import {
  remarkGfm,
  rehypePrism,
  rehypeAutolinkHeadings,
  rehypeSlug,
  rehypeCodeTitles,
  rehypeCodeRaw,
} from "@ariadocs/react/plugins";
import { components } from "./components/markdown";

export const docs = createDocs({
  contentDir: "contents",
  rehypePlugins: [
    rehypeCodeRaw,
    rehypeCodeTitles,
    rehypePrism,
    rehypeSlug,
    rehypeAutolinkHeadings,
  ],
  remarkPlugins: [remarkGfm],
  mdxComponents: components,
});

export type Fmt = {
  title: string;
  description: string;
  published: number;
  slug: string;
};

export function getBlogSlugFromHref(href: string) {
  return href.split("/").filter(Boolean)[0];
}
