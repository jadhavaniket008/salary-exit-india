import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

export function CompareOffersBody() {
  return (
    <ArticleProse>
      <p>
        Most people compare job offers by subtracting the lower CTC from the higher CTC and calling it
        a day. This misses the factors that actually determine financial outcome: how much of the CTC
        is fixed monthly cash, what the PF and tax treatment is, whether the variable pay is realistic,
        what exit economics look like, and what city costs do to in-hand. Two offers at the same CTC
        can produce different monthly savings by ₹15,000–₹30,000 once these factors are accounted for.
      </p>

      <h2 id="build-inhand">Step 1: Build a credible monthly in-hand for each offer</h2>
      <p>
        The first step is not negotiation — it is translation. Convert both offers to monthly in-hand
        using the same methodology. Key variables to get from each offer letter:
      </p>
      <ul>
        <li>Fixed monthly components (Basic, HRA, Special Allowance, LTA monthly equivalent).</li>
        <li>Variable pay: amount, frequency, target definition, and typical payout percentage.</li>
        <li>PF wage definition: does the company cap PF contributions at ₹15,000/month or apply
          full Basic?</li>
        <li>Any employer contributions included in CTC but not cash (employer PF, group insurance).</li>
      </ul>
      <p>
        Run both through the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link> with the same
        regime assumption. Do this before discussing CTC gaps with anyone — including yourself.
      </p>

      <h2 id="regime-comparison">Step 2: Account for tax regime impact across offers</h2>
      <p>
        If one offer has a significantly higher Basic (and therefore higher HRA exemption potential
        under the old regime), the two offers may have different optimal regime choices. A ₹20 LPA
        offer with 45% Basic in a metro city may benefit more from the old regime HRA exemption than
        a ₹22 LPA offer with 30% Basic and lower HRA. In some cases, this shifts the effective
        annual tax by ₹25,000–₹50,000 — changing the in-hand comparison significantly.
      </p>
      <p>
        Use the{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new regime comparison</Link> with
        each offer&apos;s specific gross, HRA, and deduction profile before concluding which pays more.
      </p>

      <h2 id="variable-pay">Step 3: Model variable pay realistically, not optimistically</h2>
      <p>
        Variable pay is where most offer comparisons go wrong. A ₹4L variable component at an
        established MNC that historically pays 90–100% of target is worth ₹3.6–4L. A ₹6L variable
        at a loss-making startup is worth ₹0–₹2L for planning purposes. Some concrete guidance:
      </p>
      <ul>
        <li>
          <strong>Established MNC, individual performance bonus:</strong> Model at 70–80% of target
          for conservative planning.
        </li>
        <li>
          <strong>Company-wide profit-sharing (PLIF):</strong> Often 0% in lean years. Model at
          40–60% of target.
        </li>
        <li>
          <strong>Sales incentives:</strong> Highly variable. Use your own realistic pipeline estimate,
          not company-quoted &quot;average performer earns X.&quot;
        </li>
        <li>
          <strong>Startup variable:</strong> Until the company is profitably funded, model this at 0
          for planning and treat any payout as upside.
        </li>
      </ul>
      <p>
        The{" "}
        <Link href={ROUTES.offerComparisonCalculator}>offer comparison calculator</Link> lets you
        input conservative and optimistic variable pay for each offer to see the range.
      </p>

      <h2 id="joining-bonus">Step 4: The joining bonus trap</h2>
      <p>
        Joining bonuses are designed to cover notice period buyout costs and make headline CTC look
        larger. They come with significant caveats:
      </p>
      <ul>
        <li>
          <strong>Clawback period:</strong> Typically 12–24 months. If you leave before the clawback
          period ends, you repay the bonus in full (sometimes prorated). A ₹3L joining bonus with
          an 18-month clawback is worth ₹0 net if you leave at month 14.
        </li>
        <li>
          <strong>Tax treatment:</strong> The bonus is taxable income in the year received — it
          increases your TDS in that financial year. A ₹3L joining bonus processed in April adds
          roughly ₹90,000–₹1,05,000 in income tax (at 30% slab + cess), depending on your total
          income. The net receipt is ₹1.95–₹2.1L, not ₹3L.
        </li>
        <li>
          <strong>CTC inflation:</strong> When included in CTC, joining bonuses make the 3-year
          average CTC look higher than it actually is for steady-state comparison.
        </li>
      </ul>
      <p>
        Rule of thumb: treat joining bonuses as notice buyout coverage, not as recurring income.
        If the bonus is larger than your buyout, model only the buyout-covering portion as
        &quot;real&quot; value.
      </p>

      <h2 id="benefits">Step 5: Benefits that matter for real financial outcomes</h2>
      <p>
        Some benefits have direct financial value that should enter your comparison:
      </p>
      <ul>
        <li>
          <strong>Group health insurance:</strong> A ₹5L cover for employee only costs roughly
          ₹8,000–₹15,000/year if you were to buy it yourself. A ₹10L family cover with parents
          included is worth ₹30,000–₹60,000/year in alternative cost — significant.
        </li>
        <li>
          <strong>NPS employer contribution:</strong> Some employers contribute 10% of Basic to
          NPS under Section 80CCD(2), which is deductible even under the new regime. At ₹50,000/month
          Basic, this is ₹5,000/month in employer NPS contribution — a real retirement-savings benefit.
        </li>
        <li>
          <strong>Remote flexibility:</strong> Saving a 3-hour daily commute at ₹200/day = ₹52,000/year
          in transport costs and hundreds of hours of time. Model this explicitly if one offer is
          remote and another is office-bound.
        </li>
      </ul>

      <h2 id="exit-economics">Step 6: Check exit economics before you join</h2>
      <p>
        Exit economics matter most when you switch again in 18–36 months — which is common in Indian
        tech. Key questions:
      </p>
      <ul>
        <li>
          <strong>Notice period length:</strong> A 90-day notice at your new employer means your
          next switch is expensive for them to buy out. 30-day notice makes you more liquid.
        </li>
        <li>
          <strong>Joining bonus clawback:</strong> As noted above — if you plan to stay 2–3 years,
          this matters less; if you plan to stay 18 months, model the repayment.
        </li>
        <li>
          <strong>Gratuity at 5 years:</strong> If you are close to a 5-year milestone at your
          current employer, the gratuity foregone by leaving has real value. Use the{" "}
          <Link href={ROUTES.gratuityCalculator}>gratuity calculator</Link> to quantify it.
        </li>
      </ul>
      <p>
        The{" "}
        <Link href={ROUTES.noticePeriodBuyoutCalculator}>notice buyout calculator</Link> and{" "}
        <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link> help
        you model the cost of your current exit as part of the offer comparison.
      </p>

      <h2 id="city-rent">Step 7: If offers are in different cities, model rent explicitly</h2>
      <p>
        A ₹22 LPA offer in Hyderabad (in-hand ~₹1,60,000/month, rent ₹18,000) leaves more savings
        than a ₹25 LPA offer in Mumbai (in-hand ~₹1,80,000/month, rent ₹42,000). The ₹3 LPA gross
        gap narrows to ₹20,000/month in-hand gap, then inverts by ₹4,000/month when you subtract
        realistic rent for each city. City-adjusted comparison requires two separate in-hand
        calculations and two separate rent numbers — not just CTC subtraction.
      </p>
      <p>
        Scenario pages with baked-in rent assumptions for quick comparison:{" "}
        <Link href={salaryEnoughPath("is-20-lpa-good-in-mumbai")}>₹20 LPA in Mumbai</Link>,{" "}
        <Link href={salaryEnoughPath("is-20-lpa-good-in-pune")}>₹20 LPA in Pune</Link>,{" "}
        <Link href={salaryEnoughPath("is-20-lpa-enough-in-bangalore")}>₹20 LPA in Bangalore</Link>.
        For the full framework: the{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> accepts any city, any rent,
        any lifestyle tier.
      </p>
    </ArticleProse>
  );
}
