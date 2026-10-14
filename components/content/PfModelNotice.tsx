/** The existing report and shared engine predate the September 2026 ceiling revision. */
export function PfModelNotice() {
  return (
    <aside aria-label="PF assumption update" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
      <strong>PF assumption update:</strong> These examples retain the historical ₹15,000/month
      PF wage cap (up to ₹1,800 employee PF). The government raised the statutory ceiling to
      ₹25,000/month from 17 September 2026. At a 12% rate, capped employee PF can therefore be
      ₹3,000/month. The existing model has not yet been migrated to that change. Use your actual
      employee PF deduction in the calculator; do not treat this historical scenario as a current
      statutory payroll calculation.{" "}
      <a className="font-medium underline" href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2313790&lang=2&reg=48"
        target="_blank" rel="noopener noreferrer">Official wage-ceiling update</a>.
    </aside>
  );
}
