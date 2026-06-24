import { SalaryHikeCalculatorClient } from "@/components/calculators/clients/SalaryHikeCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("salaryHike");

export default function SalaryHikeCalculatorPage() {
  return (
    <>
      <SalaryHikeCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            How salary hike percentage is calculated (and why it can mislead)
          </h2>
          <p className="text-foreground-secondary">
            A salary hike percentage is simple math: (New CTC − Old CTC) ÷ Old CTC × 100. HR
            communications, benchmark reports, and LinkedIn discussions all use this figure. But the
            percentage hike on CTC and the actual change in your monthly in-hand salary are often
            meaningfully different, and the gap tends to widen at higher salary levels.
          </p>
          <p className="text-foreground-secondary">
            Why: as your income crosses tax slab thresholds, each additional rupee of gross salary
            is partly absorbed by higher marginal tax. A 15% CTC hike from ₹15 LPA to ₹17.25 LPA
            moves more income into the 15–20% new regime slab (or 20–30% old regime slab), making
            the in-hand increase smaller than 15%.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            The tax bracket effect: where increments feel smallest
          </h2>
          <p className="text-foreground-secondary">
            Income tax in India is progressive, but the slab transitions create zones where a salary
            increment has a disproportionately low in-hand impact. Under the new regime for FY 2025-26:
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              <strong>Around ₹12 LPA:</strong> The Section 87A rebate creates a sharp transition.
              Income below ₹12 lakh (after standard deduction) attracts zero tax. Income ₹1 above
              that starts accumulating tax. A hike that moves you just past this threshold can feel
              like you got nothing — your in-hand may not increase at all initially.
            </li>
            <li>
              <strong>Around ₹15–20 LPA (old regime):</strong> Moving into the 30% slab means 31.2%
              of each incremental rupee (including cess) goes to tax. A ₹1 lakh annual increment
              adds roughly ₹6,800/month gross but only ₹4,690/month in-hand.
            </li>
            <li>
              <strong>At very high salaries (₹50 LPA+):</strong> Surcharges of 10–15% on top of the
              base tax apply, meaning effective marginal rates of 35–42.7%. This is why senior
              employees in large firms often feel increments are &quot;disappearing to tax.&quot;
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            CTC hike vs in-hand hike: worked example
          </h2>
          <p className="text-foreground-secondary">
            Employee currently earning ₹12 LPA gross, new regime. After-hike: ₹15 LPA gross.
            CTC hike: 25%.
          </p>
          <p className="text-foreground-secondary">
            Old in-hand (approximate, new regime, no PT, basic PF): ₹85,000/month. New in-hand
            (approximate): ₹1,02,000/month. That is a 20% in-hand increase — less than the 25% CTC
            hike, because the additional ₹3 LPA falls partly in the 10–15% slabs and the 87A rebate
            no longer applies in full.
          </p>
          <p className="text-foreground-secondary">
            The gap is not a mistake or unfairness — it is how progressive taxation works. But it is
            important to know this before entering a salary negotiation or comparing net pay from
            your new offer to your current payslip.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            What to negotiate beyond the CTC number
          </h2>
          <p className="text-foreground-secondary">
            If you are approaching a performance review or a job switch negotiation, the CTC number
            is only part of the story. Components that affect your in-hand without changing your
            nominal CTC significantly:
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              <strong>LTA (Leave Travel Allowance):</strong> Exempt from tax if actual travel bills
              are submitted under the old regime. Adding LTA to your structure shifts some gross to
              an exempt component.
            </li>
            <li>
              <strong>Food coupons / meal allowance:</strong> Up to ₹50 per meal (2 meals per
              working day) is exempt from tax. This is limited but tax-efficient for components
              below ₹12,000/year.
            </li>
            <li>
              <strong>NPS employer contribution (Section 80CCD(2)):</strong> Employer NPS contributions
              up to 10% of Basic+DA are deductible even under the new regime — one of the few
              deductions available in the new regime. This can be negotiated as part of the CTC
              structure.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
