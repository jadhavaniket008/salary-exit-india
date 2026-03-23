import type { ConfidenceLevel } from "@/lib/config/calculator-trust";

const STYLES: Record<
  ConfidenceLevel,
  { label: string; className: string; title: string }
> = {
  high: {
    label: "High confidence",
    title: "Core outputs follow directly from your inputs with minimal modeling layers.",
    className:
      "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100",
  },
  medium: {
    label: "Medium confidence",
    title: "Core math is clear, but tax/statutory edges or employer rules can shift real outcomes.",
    className:
      "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-50",
  },
  "assumption-heavy": {
    label: "Assumption-heavy",
    title: "Useful for direction — several defaults and simplifications stand between you and payroll/ITR reality.",
    className:
      "border-violet-300 bg-violet-50 text-violet-950 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100",
  },
};

export function EstimateConfidenceBadge({
  level,
  className = "",
}: {
  level: ConfidenceLevel;
  className?: string;
}) {
  const s = STYLES[level];
  return (
    <span
      title={s.title}
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.className} ${className}`}
    >
      {s.label}
    </span>
  );
}
