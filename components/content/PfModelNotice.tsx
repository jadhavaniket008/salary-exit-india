import { PF_OFFICIAL_SOURCE } from "@/lib/config/pf";

export function PfModelNotice() {
  return (
    <aside aria-label="PF assumption update" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
      <strong>PF updated from 17 September 2026:</strong> Current monthly examples use 12% of
      the lower of PF wages (modeled as Basic+DA) and ₹25,000: up to ₹3,000 employee PF/month.
      Full-Basic PF remains 12% of actual PF wages. Annual figures here are current monthly
      estimates ×12, not the transition-year total. For an existing member with constant PF
      wages of at least ₹25,000, Tax Year / FY 2026–27 PF is ₹29,360: five months at ₹1,800,
      September prorated to ₹2,360, then six months at ₹3,000. Treatment above the ceiling
      depends on the member&apos;s existing contribution arrangement and applicable EPFO rules —
      not an arbitrary employer choice. Membership, actual PF wages, payroll rounding and
      arrears can change your payslip.{" "}
      <a className="font-medium underline" href={PF_OFFICIAL_SOURCE}
        target="_blank" rel="noopener noreferrer">Government wage-ceiling update</a>;{" "}
      <a className="font-medium underline" href="https://unifiedportal-emp.epfindia.gov.in/epfo/"
        target="_blank" rel="noopener noreferrer">EPFO implementation FAQ (Q7–9)</a>.
    </aside>
  );
}
