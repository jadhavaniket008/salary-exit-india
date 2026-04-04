import Link from "next/link";
import { getSalaryEnoughPageConfig } from "@/lib/content/salary-enough-pages.config";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const SLUGS_BY_VARIANT = {
  tax: ["is-18-lpa-good-in-pune", "is-15-lpa-good-in-bangalore", "is-20-lpa-good-in-mumbai"] as const,
  reality: ["is-20-lpa-enough-in-bangalore", "is-15-lpa-good-in-chennai", "is-12-lpa-good-in-noida"] as const,
};

/**
 * Cross-links high-intent salary-enough pages from calculator shells (cluster SEO + navigation).
 */
export function CalculatorSalaryEnoughSpotlight({ variant }: { variant: keyof typeof SLUGS_BY_VARIANT }) {
  const slugs = SLUGS_BY_VARIANT[variant];
  const items = slugs
    .map((slug) => {
      const c = getSalaryEnoughPageConfig(slug);
      return c ? { slug, title: c.seo.title, city: c.city.name } : null;
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby={`salary-enough-spotlight-${variant}`}
      className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h2
        id={`salary-enough-spotlight-${variant}`}
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
      >
        “Is this salary enough?” — real city scenarios
      </h2>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Same Salary Reality Check engine, fixed rent + lifestyle story per page — jump in and edit the numbers.
      </p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={salaryEnoughPath(item.slug)} className="font-medium text-zinc-900 underline dark:text-zinc-100">
              {item.title}
            </Link>
            <span className="text-zinc-500 dark:text-zinc-400"> · {item.city}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
