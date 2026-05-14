import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function HowRentChangesSavingsBody() {
  return (
    <ArticleProse>
      <p>
        When someone says &quot;I got a ₹5,000 raise,&quot; that ₹5,000 was gross, and after PF and tax it
        becomes roughly ₹3,200–₹4,000 in monthly cash, spread over 12 months. When someone says &quot;rent
        went up ₹5,000,&quot; that entire ₹5,000 comes directly out of post-tax monthly cash — with no
        smoothing, no exemption (unless you are in the old tax regime and qualify for HRA), and no
        distribution across the year. This asymmetry is why rent increases feel more painful than gross
        decreases of the same amount.
      </p>

      <h2 id="order-of-operations">The correct order of operations for budgeting</h2>
      <p>
        Most people think of savings as what is &quot;left over.&quot; The problem is that spending expands
        to fill available space, and nothing is ever left over. The correct mental model is:
      </p>
      <ol>
        <li>Gross salary → PF and tax deducted → monthly in-hand (what you control).</li>
        <li>In-hand → rent and EMIs → what remains for everything else.</li>
        <li>What remains → groceries, transport, utilities, discretionary spend → what actually saves.</li>
      </ol>
      <p>
        In this model, a ₹5,000 rent increase hits step 2, which reduces what flows into step 3, which
        compresses savings directly. There is no buffer because groceries and transport do not shrink just
        because rent increased.
      </p>

      <h2 id="worked-example">A worked example: ₹15 LPA in two different rent scenarios</h2>
      <p>
        Assume ₹15 LPA gross, new regime, typical PF structure → monthly in-hand ~₹1,12,000.
      </p>
      <p>
        <strong>Scenario A — ₹15,000/month rent (shared flat, Pune Hinjewadi):</strong>
        After rent: ₹97,000. After lifestyle spend (groceries, transport, utilities, discretionary):
        ~₹35,000–40,000 estimated remaining. Savings potential: ~₹30,000–35,000/month or roughly
        25–30% of in-hand.
      </p>
      <p>
        <strong>Scenario B — ₹30,000/month rent (1BHK solo, Bengaluru Koramangala):</strong>
        After rent: ₹82,000. After similar lifestyle spend: ~₹15,000–25,000 remaining. Savings
        potential: ~₹12,000–20,000/month or roughly 10–18% of in-hand.
      </p>
      <p>
        Same gross. Same in-hand. The ₹15,000/month difference in rent — ₹1.8L/year — entirely explains
        the savings gap. This is the rent-savings lever in action.
      </p>

      <h2 id="hra-offset">When rent reduces your tax: the HRA effect under old regime</h2>
      <p>
        Under the old tax regime, if you pay rent and your employer includes HRA in your salary structure,
        a portion of your HRA can be exempt from income tax under Section 10(13A). The exempt amount is the
        minimum of: (a) actual HRA received, (b) rent paid minus 10% of Basic salary, and (c) 50% of
        Basic for metro cities (40% for non-metro).
      </p>
      <p>
        This creates an interesting dynamic: higher rent can reduce your taxable income if you are in
        the old regime. At ₹18 LPA gross with ₹20,000/month rent in a metro, HRA exemption can be
        ₹1.2–₹1.8L/year — offsetting some of the rent&apos;s impact on your effective cash position.
        Under the new regime, no HRA exemption is available.
      </p>
      <p>
        Model your HRA exemption with the{" "}
        <Link href={ROUTES.hraCalculator}>HRA calculator</Link> before deciding which regime to
        declare — especially if you pay significant rent.
      </p>

      <h2 id="rent-to-income">What rent-to-income ratios look like in practice</h2>
      <p>
        A common personal finance guideline suggests keeping rent below 30% of take-home pay. In
        Indian metros, this is difficult at lower-mid incomes:
      </p>
      <ul>
        <li>
          At ₹10 LPA (in-hand ~₹80,000/month), 30% = ₹24,000. A decent 1BHK solo in Bengaluru
          starts at ₹18,000–₹22,000. A couple sharing costs more manageable.
        </li>
        <li>
          At ₹15 LPA (in-hand ~₹1,12,000/month), 30% = ₹33,600. Comfortable 1BHK in most Bengaluru
          or Pune corridors within that limit. Mumbai remains tight.
        </li>
        <li>
          At ₹20 LPA (in-hand ~₹1,45,000/month), 30% = ₹43,500. Mumbai 1BHK territory, or premium
          1BHK in Bengaluru.
        </li>
      </ul>
      <p>
        These are starting points, not rules. Your household size, commute preference, and lifestyle
        tier all modify what is acceptable.
      </p>

      <h2 id="pg-vs-flat">PG vs shared flat vs solo flat: the actual cost differences</h2>
      <p>
        A paying guest accommodation (PG) in a metro typically costs ₹8,000–₹15,000/month and includes
        meals, laundry, and utilities — saving ₹5,000–₹8,000/month in ancillary expenses compared to
        a solo flat. For someone at ₹10–12 LPA in their first job, this trade-off can mean the
        difference between building a meaningful savings buffer or running at breakeven.
      </p>
      <p>
        The move to a flat — especially solo — is a significant lifestyle upgrade with real financial
        cost. Modelling it before making the move is worth 15 minutes of calculator time.
      </p>

      <h2 id="what-moves-savings">What actually moves savings most efficiently</h2>
      <ul>
        <li>
          <strong>Rent reduction (roommate, farther corridor, smaller unit):</strong> ₹8,000/month
          rent savings = ₹96,000/year — the equivalent of a ₹1.5L gross raise after tax. This is
          often the highest-return &quot;income increase&quot; available without a job change.
        </li>
        <li>
          <strong>Lifestyle tier honesty:</strong> The gap between &quot;moderate&quot; and
          &quot;premium&quot; spending in the Salary Reality Check tool is typically ₹10,000–₹20,000/month.
          Correctly identifying your tier is more useful than optimizing smaller items.
        </li>
        <li>
          <strong>EMI reduction:</strong> Every ₹1,000/month in loan repayment that finishes is
          ₹12,000/year back in savings. Prioritizing loan payoff has a direct savings multiplier effect.
        </li>
      </ul>
      <p>
        See the full budget picture with the{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> — it takes your actual
        rent and lifestyle tier, not generic benchmarks. For city-specific worked examples:
      </p>
      <ul>
        <li>
          <Link href={enough("is-15-lpa-good-in-bangalore")}>₹15 LPA in Bangalore</Link> ·{" "}
          <Link href={enough("is-25-lpa-good-in-bangalore")}>₹25 LPA in Bangalore</Link>
        </li>
        <li>
          <Link href={enough("is-18-lpa-good-in-pune")}>₹18 LPA in Pune</Link> ·{" "}
          <Link href={enough("is-20-lpa-good-in-pune")}>₹20 LPA in Pune</Link>
        </li>
        <li>
          <Link href={enough("is-20-lpa-good-in-mumbai")}>₹20 LPA in Mumbai</Link> — rent-heavy
          default for honest comparison.
        </li>
      </ul>
    </ArticleProse>
  );
}
