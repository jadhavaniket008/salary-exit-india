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
      className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-foreground-secondary"
    >
      {v.label}
    </span>
  );
}
