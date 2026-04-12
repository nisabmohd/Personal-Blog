import Link from "next/link";
import { docs, Fmt } from "@/ariadocs";
import type { NavItem } from "@ariadocs/react/types";

export default async function Articles() {
  let navItems = await docs.getNavItems();
  const fmts = await Promise.all(
    navItems.map(async (item) => {
      const slug = item.href.split("/").filter(Boolean)[0];
      return (await docs.getFrontmatter({ slug })) as Fmt;
    }),
  );

  const itemsWithFmt = navItems.map((item, i) => ({ item, fmt: fmts[i] }));
  itemsWithFmt.sort((a, b) => {
    const aTime = new Date(a.fmt?.published).getTime() || 0;
    const bTime = new Date(b.fmt?.published).getTime() || 0;
    return bTime - aTime;
  });

  return (
    <>
      <ul className="flex flex-col gap-2 list-disc list-inside">
        {itemsWithFmt.map(({ item, fmt }) => (
          <BlogTitle key={item.href} item={item} fmt={fmt} />
        ))}
      </ul>
    </>
  );
}

function BlogTitle({ item, fmt }: { item: NavItem; fmt: Fmt }) {
  return (
    <li>
      <Link className="link" href={item.href}>
        {fmt?.title ?? item.href}
      </Link>
    </li>
  );
}
