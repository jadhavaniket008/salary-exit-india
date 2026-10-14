import Link from "next/link";
import { CityBudgetAssumptions, CityBudgetExample } from "@/components/content/CityBudgetExample";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function HowMuchSalaryPuneBody() {
  return (
    <ArticleProse>
      <p>
        Pune is frequently described as &quot;cheaper than Mumbai&quot; or &quot;good value for tech
        professionals.&quot; Both statements can be true in some corridors and completely wrong in others.
        Hinjewadi Phase 3 has very different rent economics from Koregaon Park. Baner is not Kharadi.
        The useful question is not &quot;how much salary do I need for Pune?&quot; but &quot;how much
        in-hand do I have after tax and PF, and does it cover my specific rent and household costs?&quot;
        This guide gives you the framework to answer that for your actual situation.
      </p>

      <h2 id="translate-ctc">Step 1: Translate CTC to monthly cash before anything else</h2>
      <p>A ₹15 LPA CTC offer is not ₹1,25,000 in monthly cash. First identify annual gross after
        employer PF, gratuity accrual and other employer costs. Then use the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link> with your actual
        PF deduction and tax regime. The gross-salary examples below show the next step.</p>
      <CityBudgetAssumptions />

      <h2 id="pune-corridors">Pune&apos;s rent corridors: compare real quotes</h2>
      <p>Collect current quotes near your office before choosing a salary target. Compare these
        corridors on the same basis: sharing or solo, furnishing, deposit, maintenance and commute.</p>
      <ul>
        <li><strong>Hinjewadi Phase 1–3:</strong> check travel time to your specific tech park.</li>
        <li><strong>Baner, Balewadi and Wakad:</strong> compare the total cost with west-side office routes.</li>
        <li><strong>Kharadi and Viman Nagar:</strong> compare with Magarpatta and east-side offices.</li>
        <li><strong>Koregaon Park and Kalyani Nagar:</strong> price the amenities you would actually use.</li>
        <li><strong>Pimple Saudagar and Pimple Nilakh:</strong> include the commute in your quote comparison.</li>
      </ul>
      <p>
        Corridor selection is the single biggest budget decision you make when moving to Pune. A ₹8,000/month
        rent difference between Hinjewadi and Baner is ₹96,000/year.
      </p>

      <h2 id="at-10-lpa">What ₹10 LPA looks like in Pune</h2>
      <CityBudgetExample lpa={10} rent={12_000} otherSpend={30_000} />
      <p>
        For a family, add school fees and other dependants’ costs; include a second income only if it is reliable.
        See:{" "}
        <Link href={enough("is-10-lpa-enough-for-family-in-pune")}>
          Is ₹10 LPA enough for a family in Pune?
        </Link>
      </p>

      <h2 id="at-15-lpa">What ₹15 LPA looks like in Pune</h2>
      <CityBudgetExample lpa={15} rent={18_000} otherSpend={35_000} />
      <p>
        Explore: <Link href={enough("is-15-lpa-good-in-pune")}>Is ₹15 LPA good in Pune?</Link>
      </p>

      <h2 id="at-18-20-lpa">What ₹18–20 LPA looks like in Pune</h2>
      <CityBudgetExample lpa={18} rent={20_000} otherSpend={35_000} />
      <CityBudgetExample lpa={20} rent={20_000} otherSpend={35_000} />
      <p>
        Explore:{" "}
        <Link href={enough("is-18-lpa-good-in-pune")}>Is ₹18 LPA good in Pune?</Link> ·{" "}
        <Link href={enough("is-20-lpa-good-in-pune")}>Is ₹20 LPA good in Pune?</Link>
      </p>

      <h2 id="pune-vs-mumbai">Pune vs Mumbai: the real comparison</h2>
      <p>Hold gross salary and deductions constant, then compare your actual rent quotes.
        If one home costs ₹18,000 and another ₹35,000, the difference is ₹17,000/month or
        ₹2,04,000/year before differences in commute and other costs. Those are example quotes,
        not a claim about average Pune or Mumbai rents.</p>
      <p>
        When evaluating a Pune vs Mumbai offer at similar CTC, don&apos;t just compare CTC — compare
        in-hand minus realistic rent in each city. See:{" "}
        <Link href={enough("is-20-lpa-good-in-mumbai")}>Is ₹20 LPA good in Mumbai?</Link> to stress-test
        the comparison.
      </p>

      <h2 id="pune-vs-bangalore">Pune vs Bangalore: closer than most think</h2>
      <p>Compare specific homes and office routes instead of assigning a fixed discount to either city.
        A lower rent can be offset by a longer commute, deposits, moving expenses or travel home.
        Include career prospects and family needs alongside the monthly cash comparison.</p>
      <p>
        Use the <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> with your actual
        city and rent for a personalized comparison — the tool does not hardcode city benchmarks.
        For a quick Bangalore reference at similar bands:{" "}
        <Link href={`${ROUTES.salaryGuides}/how-much-salary-you-need-in-bangalore`}>
          How much salary you need in Bangalore
        </Link>
        . For the job offer comparison framework:{" "}
        <Link href={`${ROUTES.jobSwitchGuides}/compare-job-offers-beyond-ctc`}>
          compare job offers beyond CTC
        </Link>
        .
      </p>
    </ArticleProse>
  );
}
