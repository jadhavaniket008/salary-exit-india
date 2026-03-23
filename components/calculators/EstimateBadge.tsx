const VARIANTS = {
  estimate: {
    label: "Estimate",
    title: "Educational estimate — not employer payroll output",
  },
  model: {
    label: "Modeled",
    title: "Uses simplified tax/PF rules in code for the configured FY",
  },
  formula: {
    label: "Formula",
    title: "Exact arithmetic on inputs you provide; legal/tax treatment may still differ",
  },
} as const;

type Variant = keyof typeof VARIANTS;

export function EstimateBadge({ variant = "estimate" }: { variant?: Variant }) {
  const v = VARIANTS[variant] ?? VARIANTS.estimate;
  return (
    <span
      title={v.title}
      className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
    >
      {v.label}
    </span>
  );
}
