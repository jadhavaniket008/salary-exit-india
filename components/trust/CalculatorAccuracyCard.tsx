import type { CalculatorSlug } from "@/lib/routes";
import { getCalculatorTrust } from "@/lib/config/calculator-trust";
import { EstimateConfidenceBadge } from "@/components/trust/EstimateConfidenceBadge";

type Props = {
  slug: CalculatorSlug;
};

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{title}</p>
      <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Shared accuracy / “what is calculated vs estimated” block for every calculator.
 */
export function CalculatorAccuracyCard({ slug }: Props) {
  const t = getCalculatorTrust(slug);
  return (
    <aside className="rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-white to-zinc-50/90 p-4 shadow-sm dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-950/80">
      <div className="flex flex-wrap items-start gap-3">
        <EstimateConfidenceBadge level={t.confidence} />
        <p className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-100">
          {t.headline}
        </p>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <List title="Directly from your inputs" items={t.direct} />
        <List title="Estimated / modeled in engine" items={t.estimated} />
        <List title="Built-in simplifications" items={t.assumptions} />
        <List title="What may change in practice" items={t.realWorldFactors} />
      </div>
    </aside>
  );
}
