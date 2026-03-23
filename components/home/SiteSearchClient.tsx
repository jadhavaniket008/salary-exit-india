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
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {query.trim() === ""
          ? "Popular destinations — type to filter the full index."
          : `${results.length} match(es) shown`}
      </p>
      <ul className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
        {results.map((r) => (
          <li key={`${r.href}-${r.title}`}>
            <Link
              href={r.href}
              className="flex flex-col gap-0.5 px-4 py-3 text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-50">{r.title}</span>
              <span className="text-xs text-zinc-500">{r.category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
