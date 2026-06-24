import type { CalculatorSlug } from "@/lib/routes";
import { getCalculatorTrust } from "@/lib/config/calculator-trust";

type Props = {
  slug: CalculatorSlug;
  className?: string;
};

/**
 * Calculator-specific "why estimates differ" — complements the global methodology page.
 */
export function CalculatorEstimateCaveats({ slug, className = "" }: Props) {
  const t = getCalculatorTrust(slug);
  return (
    <aside
      className={`rounded-xl border border-border bg-surface-subtle p-4 text-sm text-foreground-secondary ${className}`}
    >
      <p className="font-semibold text-foreground">{t.caveatsTitle}</p>
      <ul className="mt-2 list-inside list-disc space-y-1.5 leading-relaxed">
        {t.caveatsBullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </aside>
  );
}
