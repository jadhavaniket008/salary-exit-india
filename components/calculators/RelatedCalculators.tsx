import Link from "next/link";
import type { CalculatorSlug } from "@/lib/routes";
import { relatedCalculatorLinks } from "@/lib/calculator-registry";

type Props = {
  currentSlug: CalculatorSlug;
};

/**
 * Server-rendered, always visible — previously animated in via Framer
 * Motion's whileInView (initial opacity 0), the same invisible-until-scroll
 * bug fixed on the homepage and in WorkedExample. A staggered fade-in on a
 * plain related-links list is exactly the "scattered per-section effect"
 * the design brief asks to avoid, not a signature moment worth the risk.
 */
export function RelatedCalculators({ currentSlug }: Props) {
  const links = relatedCalculatorLinks(currentSlug);
  return (
    <nav aria-labelledby="related-heading" className="space-y-3">
      <h2
        id="related-heading"
        className="text-lg font-semibold text-foreground"
      >
        Related calculators
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm active:scale-[0.99]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
