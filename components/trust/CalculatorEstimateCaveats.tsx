import type { CalculatorSlug } from "@/lib/routes";
import { getCalculatorTrust } from "@/lib/config/calculator-trust";

type Props = {
  slug: CalculatorSlug;
  className?: string;
};

/**
 * Calculator-specific “why estimates differ” — complements the global methodology page.
 */
export function CalculatorEstimateCaveats({ slug, className = "" }: Props) {
  const t = getCalculatorTrust(slug);
  return (
    <aside
      className={`rounded-xl border border-zinc-200/90 bg-zinc-50/80 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 ${className}`}
    >
      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{t.caveatsTitle}</p>
      <ul className="mt-2 list-inside list-disc space-y-1.5 leading-relaxed">
        {t.caveatsBullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </aside>
  );
}
