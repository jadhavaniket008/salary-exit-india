/**
 * Reusable explainer — same copy everywhere calculators can diverge from payslips.
 */
export function WhyPayrollDiffers({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`rounded-xl border border-border bg-surface-subtle p-4 text-sm text-foreground-secondary ${className}`}
    >
      <p className="font-semibold text-foreground">Why your payslip may differ</p>
      <ul className="mt-2 list-inside list-disc space-y-1.5 leading-relaxed">
        <li>
          <strong>TDS smoothing</strong> — employers withhold unevenly across months; we spread annual tax ÷ 12.
        </li>
        <li>
          <strong>Bonus, arrears, and perquisites</strong> — not modeled unless you fold them into gross consistently.
        </li>
        <li>
          <strong>PF wage definition</strong> — Basic+DA vs full gross varies; we use your inputs or defaults.
        </li>
        <li>
          <strong>Professional tax</strong> — state slabs; replace placeholders with your state's typical annual PT.
        </li>
        <li>
          <strong>High income</strong> — surcharge and marginal relief are not in this engine.
        </li>
      </ul>
    </aside>
  );
}
