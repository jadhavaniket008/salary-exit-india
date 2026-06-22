import { OfferComparisonCalculatorClient } from "@/components/calculators/clients/OfferComparisonCalculatorClient";
import { AffiliateCta } from "@/components/monetization/AffiliateCta";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("offerComparison");

export default function OfferComparisonCalculatorPage() {
  return (
    <>
      <OfferComparisonCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Why comparing CTC numbers is the wrong starting point
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The most common mistake in evaluating a job offer is leading with CTC. A ₹20 LPA offer
            from Company A vs ₹18 LPA from Company B looks like a clear winner for A. But the
            comparison collapses when you account for the actual variables: PF wage definitions
            (Company A may use full Basic, increasing your PF deduction), professional tax
            differences (different cities), regime eligibility, and whether the CTC definition
            includes gratuity accrual.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The only number that matters for monthly budgeting is <strong>net in-hand salary</strong>.
            Use this calculator to convert both offers to comparable in-hand figures before deciding.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Five dimensions of a complete offer comparison
          </h2>
          <ol className="list-inside list-decimal space-y-3 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Net in-hand monthly salary.</strong> Compute this for both offers using consistent
              assumptions (same regime, realistic PT, actual PF rule from the offer letter). This is
              the one number your rent and EMI care about.
            </li>
            <li>
              <strong>Non-cash benefits with real monetary value.</strong> Employer-paid health insurance
              (compare coverage amounts and family inclusion), food subsidy, transport reimbursement,
              and mobile/internet allowance. In aggregate, these can be worth ₹2,000–10,000/month.
            </li>
            <li>
              <strong>Variable pay: what percentage is at risk?</strong> A ₹20 LPA offer with 20%
              variable component means ₹4 LPA depends on targets being met. The effective guaranteed
              annual income is ₹16 LPA — compare this to the ₹18 LPA fixed offer, which may be better.
            </li>
            <li>
              <strong>ESOPs and RSUs: illiquid until vested.</strong> Equity compensation should be
              valued conservatively. Until a liquidity event (IPO, buyback, acquisition), ESOPs in
              private companies are hypothetical. Count them as a potential upside, not guaranteed income.
            </li>
            <li>
              <strong>The commute cost in money and time.</strong> A job 20 km farther that requires a
              cab may cost ₹4,000–6,000/month more than your current commute and two additional hours
              of your day. This is real economic value, not lifestyle preference.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            The career capital dimension: what doesn&apos;t show in the calculator
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            A calculator can compare in-hand salary across two offers. It cannot compare what each
            job does to your market value in 3–5 years. This is the dimension that most systematically
            goes under-weighted in offer decisions.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            If Offer A pays ₹15 LPA but puts you in a leadership role building a product from scratch,
            your market value in 3 years may be ₹28–35 LPA. If Offer B pays ₹18 LPA but puts you in
            maintenance mode on a legacy system with little ownership, your market value may be ₹22 LPA.
            The ₹3 LPA differential today may become a ₹10–13 LPA differential by year 4.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Factors to assess qualitatively before making this calculation:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Is the role hiring you for what you already know (extractive) or what you are trying to build (developmental)?</li>
            <li>What is the brand value of the company for your next job?</li>
            <li>What is the hiring team&apos;s track record — are former employees progressing in their careers?</li>
            <li>Does the role create portfolio work or outcomes you can point to?</li>
          </ul>
        </section>

        <AffiliateCta context="investing" />
      </div>
    </>
  );
}
