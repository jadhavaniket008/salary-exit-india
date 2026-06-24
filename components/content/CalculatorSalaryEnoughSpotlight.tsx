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
      className="rounded-xl border border-border bg-surface p-4"
    >
      <h2
        id={`salary-enough-spotlight-${variant}`}
        className="text-sm font-semibold text-foreground"
      >
        "Is this salary enough?" — real city scenarios
      </h2>
      <p className="mt-1 text-xs text-foreground-secondary">
        Same Salary Reality Check engine, fixed rent + lifestyle story per page — jump in and edit the numbers.
      </p>
      <ul className="mt-3 space-y-2 text-sm text-foreground-secondary">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={salaryEnoughPath(item.slug)} className="font-medium text-foreground underline">
              {item.title}
            </Link>
            <span className="text-foreground-muted"> · {item.city}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
