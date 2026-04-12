import type { MetadataRoute } from "next";
import { docs, Fmt } from "@/ariadocs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = await docs.getPagePaths();
  const blogsFmts = await Promise.all(
    paths.map(async (it) => {
      const slug = it.split("/").filter(Boolean).join("");
      const fmt = (await docs.getFrontmatter({ slug })) as Fmt;
      return fmt;
    }),
  );

  const blogSitemaps: MetadataRoute.Sitemap = blogsFmts.map((fmt) => ({
    url: `https://nisabmohd.vercel.app/${fmt.slug}`,
    lastModified: new Date(fmt.published),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://nisabmohd.vercel.app",
      lastModified: new Date(),
      priority: 1,
    },
    ...blogSitemaps,
  ];
}
