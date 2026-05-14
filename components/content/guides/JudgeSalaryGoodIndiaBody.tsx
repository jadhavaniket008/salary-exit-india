import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function JudgeSalaryGoodIndiaBody() {
  return (
    <ArticleProse>
      <p>
        &quot;Is ₹20 LPA a good salary?&quot; is one of the most searched questions on Indian finance forums —
        and it cannot be answered without knowing your city, rent, household size, loan obligations, and what
        you consider &quot;enough.&quot; The number means very different things to a single professional in
        Hyderabad sharing a flat versus a family of three in Mumbai paying ₹45,000 rent. This guide gives you
        a repeatable framework rather than a number.
      </p>

      <h2 id="start-in-hand">Step 1: Convert CTC to monthly in-hand first</h2>
      <p>
        The most common mistake is comparing salaries at CTC level. Two ₹20 LPA offers can produce
        meaningfully different monthly cash if one has a higher PF wage, a different tax regime, or more
        variable pay. Before deciding whether a salary is &quot;good,&quot; compute the monthly in-hand for
        your specific offer structure.
      </p>
      <p>
        At ₹20 LPA gross in FY 2025-26 (new regime, typical PF structure), monthly in-hand is roughly
        ₹1,45,000–₹1,55,000 depending on PF wage and state PT. At ₹15 LPA, roughly ₹1,10,000–₹1,20,000.
        At ₹10 LPA, roughly ₹78,000–₹85,000. These are ballpark estimates — use the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link> with your specific
        inputs for the actual number.
      </p>

      <h2 id="fixed-costs">Step 2: Stack your fixed costs against in-hand</h2>
      <p>
        Fixed costs come off the top before anything else is discretionary. List them explicitly:
      </p>
      <ul>
        <li>
          <strong>Rent (or home loan EMI):</strong> The single largest fixed cost for most. In Bengaluru,
          a 1BHK in a reasonable corridor costs ₹18,000–₹28,000/month. In Mumbai, the same can be
          ₹30,000–₹50,000. In Pune, ₹12,000–₹22,000. Rent does not scale with income — it scales with
          the city and the specific corridor.
        </li>
        <li>
          <strong>Existing loan EMIs:</strong> Education loans, vehicle EMIs, or any other fixed monthly
          obligation. These reduce the discretionary pool just as much as rent.
        </li>
        <li>
          <strong>Family financial obligations:</strong> Supporting parents, school fees, or household
          expenses for a dependent spouse. These are often the most overlooked in &quot;good salary&quot;
          discussions on social media.
        </li>
      </ul>
      <p>
        The residual after fixed costs is what you actually have for food, transport, discretionary spend,
        and savings. A salary that looks comfortable at the CTC level can feel very tight after rent and EMIs.
      </p>

      <h2 id="savings-target">Step 3: Define a savings target first, not last</h2>
      <p>
        Most budgeting advice says &quot;save what&apos;s left.&quot; That produces near-zero savings for
        most people. A better approach: decide a savings rate first (a commonly referenced target in India is
        20–25% of take-home for medium-term goals, plus whatever EPF contributes), then see if your in-hand
        minus fixed costs minus that savings target leaves enough for living.
      </p>
      <p>
        If the math does not work, the answer to &quot;is this a good salary?&quot; is: not yet, for this
        city and household. That is useful information — it tells you what needs to change (higher gross,
        lower rent, fewer EMIs, or a different city).
      </p>

      <h2 id="city-matters">Step 4: Make the city completely explicit</h2>
      <p>
        The same gross salary does not produce the same financial freedom in different cities because rent
        is a fixed rupee amount, not a percentage of income. A ₹15,000/month rent difference between
        Hyderabad and Mumbai does not change your CTC — but it changes your monthly savings by ₹15,000.
        After a year, that is ₹1.8L difference in savings on the same gross.
      </p>
      <p>
        Our salary-enough scenario pages fix one rent and lifestyle combination per city and income level
        so you can evaluate the real budget story:
      </p>
      <ul>
        <li>
          <Link href={enough("is-15-lpa-good-in-bangalore")}>Is ₹15 LPA good in Bangalore?</Link> —
          mid-junior band, higher rent anchor.
        </li>
        <li>
          <Link href={enough("is-20-lpa-good-in-pune")}>Is ₹20 LPA good in Pune?</Link> — more room
          than Mumbai at the same gross for most rent brackets.
        </li>
        <li>
          <Link href={enough("is-20-lpa-good-in-mumbai")}>Is ₹20 LPA good in Mumbai?</Link> —
          rent-heavy stress test.
        </li>
        <li>
          <Link href={enough("is-20-lpa-enough-for-family-in-bangalore")}>
            ₹20 LPA, family spend in Bengaluru
          </Link>{" "}
          — premium tier + rent; honest squeeze for one earner with dependents.
        </li>
      </ul>

      <h2 id="variable-pay">Step 5: Price variable pay and ESOPs conservatively</h2>
      <p>
        Variable pay — performance bonuses, incentives, commissions — is real money only when it is paid.
        A ₹3L annual variable at 80% average payout is ₹2.4L, not ₹3L. At a startup with uncertain
        financials, variable may be ₹0. For planning purposes, model variable at 60–70% of target for
        established companies, and at 0–30% for early-stage startups. ESOPs should not be modeled as
        monthly income at all until they vest and you have a realistic liquidity event.
      </p>
      <p>
        When comparing two offers with different fixed vs variable splits, use the{" "}
        <Link href={ROUTES.offerComparisonCalculator}>offer comparison calculator</Link> to model
        conservative and optimistic cases for each.
      </p>

      <h2 id="career-growth">Step 6: Factor the career trajectory, not just current cash</h2>
      <p>
        A salary that feels slightly short today can be &quot;good&quot; if it is at a company or role
        that produces 25% increments annually or opens doors to significantly higher-paying opportunities
        in 2–3 years. A salary that looks comfortable today at a stagnant company may feel bad in 3 years
        when market rates have moved on. This is the hardest dimension to quantify, but salary is not just
        a number on a payslip — it is also a position in your career arc.
      </p>
      <p>
        A practical test: what does the ₹+3 LPA version of you look like 24 months from now, and is
        this role on that path? If yes, the cash gap may be acceptable. If no, the gap needs to be
        compensated in present value.
      </p>

      <h2 id="verdict">The four-item verdict</h2>
      <p>
        A salary is &quot;good for you&quot; when you can name and accept these four numbers:
      </p>
      <ol>
        <li>Monthly in-hand after PF and taxes.</li>
        <li>Monthly rent (or EMI) and other fixed obligations.</li>
        <li>A savings line you are willing to commit to each month.</li>
        <li>What remains for discretionary spending — and whether you can live on that comfortably.</li>
      </ol>
      <p>
        If you cannot fill all four, fix the model before you accept or reject the job. Start with the{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> — it takes these four inputs
        and returns a clear budget breakdown.
      </p>
    </ArticleProse>
  );
}
