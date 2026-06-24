import type { ConfidenceLevel } from "@/lib/config/calculator-trust";

const STYLES: Record<ConfidenceLevel, { label: string; className: string; title: string }> = {
  high: {
    label: "High confidence",
    title: "Core outputs follow directly from your inputs with minimal modeling layers.",
    className: "border-positive/30 bg-accent-light text-accent",
  },
  medium: {
    label: "Medium confidence",
    title: "Core math is clear, but tax/statutory edges or employer rules can shift real outcomes.",
    className: "border-warning/40 bg-warning-bg text-warning",
  },
  "assumption-heavy": {
    label: "Assumption-heavy",
    title: "Useful for direction — several defaults and simplifications stand between you and payroll/ITR reality.",
    className: "border-border-strong bg-surface-subtle text-foreground-secondary",
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
