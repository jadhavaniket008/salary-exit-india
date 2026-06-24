import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { JsonLd } from "@/components/content/JsonLd";
import { toBreadcrumbJsonLd } from "@/lib/seo/breadcrumbs";

type Props = {
  items: BreadcrumbItem[];
};

export function BreadcrumbNav({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-foreground-muted">
      <JsonLd data={toBreadcrumbJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden className="text-foreground-muted">/</span> : null}
            {i === items.length - 1 ? (
              <span className="font-medium text-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:text-foreground hover:underline"
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
