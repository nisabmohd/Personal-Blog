import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { docs, Fmt, getBlogSlugFromHref } from "@/ariadocs";
import { get } from "http";

export default async function BlogPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  try {
    const { MDX, frontmatter } = await docs.parse({ slug: params.slug });
    return (
      <>
        <div className="flex flex-col gap-4 pt-4">
          <h2 className="text heading">{frontmatter.title}</h2>
          <p className="sub-text -mt-1">
            {new Date(frontmatter.published as string).toDateString()}
          </p>
        </div>
        <Typography>{MDX}</Typography>
      </>
    );
  } catch (e) {
    notFound();
  }
}

function Typography({ children }: PropsWithChildren) {
  return (
    <div className="text text-neutral-700 dark:text-neutral-300 prose-code:min-w-fit prose-headings:text-inherit prose prose-neutral dark:prose-invert dark:prose-code:!bg-[#1a1817] dark:prose-pre:!bg-[#1a1817] prose-code:!bg-[#f8f7f6] prose-pre:!bg-[#f8f7f6] prose-pre:font-mono prose-code:font-mono prose-code:font-thin prose-code:text-sm underline-offset-2 prose-code:leading-[1.4rem] dark:prose-code:text-neutral-300 prose-code:text-neutral-700 prose-code:py-[0.0991rem] prose-code:px-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-img:rounded-md prose-code:border prose-code:border-neutral-300 dark:prose-code:border-neutral-700  min-w-full prose-img:mx-auto mt-7 prose-strong:text-inherit md:prose-code:text-nowrap prose-p:leading-normal">
      {children}
    </div>
  );
}

export async function generateStaticParams() {
  const paths = await docs.getPagePaths();
  return paths.map((it) => ({ slug: getBlogSlugFromHref(it) }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  try {
    const fmt = (await docs.getFrontmatter({ slug })) as Fmt;
    const ogImage = `https://nisabmohd.vercel.app/og?title=${encodeURIComponent(
      fmt.title as string,
    )}`;
    return {
      title: fmt.title,
      description: fmt.description,
      openGraph: {
        title: fmt.title,
        description: fmt.description,
        type: "article",
        publishedTime: new Date(fmt.published).toDateString(),
        url: `https://nisabmohd.vercel.app/${slug}`,
        images: [
          {
            url: ogImage,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fmt.title,
        description: fmt.description,
        images: [ogImage],
      },
    };
  } catch (e) {
    return {
      title: "Blog Not Found",
    };
  }
}
