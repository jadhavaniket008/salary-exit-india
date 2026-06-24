import Link from "next/link";
import { EDUCATION_LINKS_BY_CALCULATOR } from "@/lib/content/calculator-education-links";
import type { CalculatorSlug } from "@/lib/routes";

type Props = {
  slug: CalculatorSlug;
};

/**
 * In-calculator links to trustworthy guides (SEO cluster + user education).
 */
export function CalculatorEducationLinks({ slug }: Props) {
  const links = EDUCATION_LINKS_BY_CALCULATOR[slug] ?? [];
  if (links.length === 0) return null;

  return (
    <section
      aria-labelledby="edu-guides-heading"
      className="rounded-xl border border-border bg-surface-subtle p-4"
    >
      <h2
        id="edu-guides-heading"
        className="text-sm font-semibold text-foreground"
      >
        Related guides
      </h2>
      <ul className="mt-2 space-y-2 text-sm text-foreground-secondary">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="font-medium underline underline-offset-2">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
