import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { JsonLd } from "@/components/content/JsonLd";
import { toBreadcrumbJsonLd } from "@/lib/seo/breadcrumbs";

type Props = {
  items: BreadcrumbItem[];
};

export function BreadcrumbNav({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-600 dark:text-zinc-400">
      <JsonLd data={toBreadcrumbJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden className="text-zinc-400">/</span> : null}
            {i === items.length - 1 ? (
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
