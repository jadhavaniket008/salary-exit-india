"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui";
import { getSiteSearchIndex } from "@/lib/content/site-search-index";

const INDEX = getSiteSearchIndex();

export function SiteSearchClient() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) {
      return INDEX.slice(0, 10);
    }
    return INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(t) ||
        item.keywords.toLowerCase().includes(t) ||
        item.category.toLowerCase().includes(t)
    ).slice(0, 14);
  }, [query]);

  return (
    <div className="space-y-3">
      <label htmlFor="site-search" className="sr-only">
        Search calculators and guides
      </label>
      <Input
        id="site-search"
        type="search"
        placeholder="Search calculators, guides, or salary pages…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      <p className="text-xs text-foreground-muted">
        {query.trim() === ""
          ? "Popular destinations — type to filter the full index."
          : `${results.length} match(es) shown`}
      </p>
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
        {results.map((r) => (
          <li key={`${r.href}-${r.title}`}>
            <Link
              href={r.href}
              className="flex flex-col gap-0.5 px-4 py-3 text-sm transition hover:bg-surface-subtle"
            >
              <span className="font-medium text-foreground">{r.title}</span>
              <span className="text-xs text-foreground-secondary">{r.category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
