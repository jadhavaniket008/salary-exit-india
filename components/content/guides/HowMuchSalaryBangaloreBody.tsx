import Link from "next/link";
import { CityBudgetAssumptions, CityBudgetExample } from "@/components/content/CityBudgetExample";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function HowMuchSalaryBangaloreBody() {
  return (
    <ArticleProse>
      <p>
        &quot;You need at least ₹X LPA to live comfortably in Bangalore&quot; — this framing is everywhere
        and almost entirely useless. The number depends on where exactly in Bangalore you plan to live,
        whether you are renting solo or sharing, what your loan obligations are, and what you consider
        &quot;comfortable.&quot; This guide gives you a way to compute the answer for your specific
        situation instead of relying on someone else&apos;s vague benchmark.
      </p>

      <h2 id="ctc-to-inhand-first">Always translate CTC to monthly in-hand first</h2>
      <p>Bangalore rent is paid in rupees per month. A ₹20 LPA offer first needs a CTC-to-gross
        breakdown, then employee PF, tax and other deductions. Use the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link> with your offer
        structure before deciding what rent is affordable.</p>
      <CityBudgetAssumptions />

      <h2 id="rent-corridors">Bangalore&apos;s rent corridors: the same LPA feels different by location</h2>
      <p>Collect current quotes for the kind of home you would actually rent. Compare sharing versus
        solo occupancy, furnishing, maintenance, deposit and office travel on the same basis.</p>
      <ul>
        <li><strong>Whitefield and Electronic City:</strong> check the route to your actual office.</li>
        <li><strong>Marathahalli, Sarjapur and HSR Layout:</strong> compare nearby listings and commute costs.</li>
        <li><strong>Indiranagar, Koramangala and Banaswadi:</strong> price the amenities you would use.</li>
        <li><strong>Yelahanka, Hennur and Thanisandra:</strong> include travel time to your workplace.</li>
      </ul>
      <p>
        The corridor you choose — driven by your office location and lifestyle preference — determines
        your rent more than your salary does. Model with your actual rent, not a city average.
      </p>

      <h2 id="at-10-lpa">What ₹10 LPA looks like in Bangalore</h2>
      <CityBudgetExample lpa={10} rent={16_000} otherSpend={30_000} />
      <p>
        Explore: <Link href={enough("is-10-lpa-good-in-bangalore")}>Is ₹10 LPA good in Bangalore?</Link>
      </p>

      <h2 id="at-15-lpa">What ₹15 LPA looks like in Bangalore</h2>
      <CityBudgetExample lpa={15} rent={20_000} otherSpend={31_000} />
      <p>
        Explore: <Link href={enough("is-15-lpa-good-in-bangalore")}>Is ₹15 LPA good in Bangalore?</Link>
      </p>

      <h2 id="at-20-lpa">What ₹20 LPA looks like in Bangalore</h2>
      <CityBudgetExample lpa={20} rent={25_000} otherSpend={35_000} />
      <p>
        Explore:{" "}
        <Link href={enough("is-20-lpa-enough-in-bangalore")}>Is ₹20 LPA enough in Bangalore?</Link>
      </p>

      <h2 id="commute-factor">The commute factor: Bangalore&apos;s hidden cost</h2>
      <p>Compare total housing and travel cost. If a cheaper flat saves ₹8,000/month in rent
        but costs ₹6,000/month more in transport, the cash saving is ₹2,000/month. Add travel time
        and the reliability of the route before choosing. This is a worked example, not a commute-cost survey.</p>

      <h2 id="comparing-cities">Comparing Bangalore to other cities</h2>
      <p>For offers in different cities, compare actual in-hand minus housing, transport and household
        costs. Use current quotes near each office rather than assuming one whole city is cheaper.
        Include moving expenses and deposits in a separate first-year budget.</p>
      <p>
        The{" "}
        <Link href={`${ROUTES.jobSwitchGuides}/compare-job-offers-beyond-ctc`}>
          compare job offers beyond CTC
        </Link>{" "}
        guide walks through a city-adjusted offer comparison. For the Salary Reality Check with your
        actual Bangalore rent:{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link>. See{" "}
        <Link href={enough("is-25-lpa-good-in-bangalore")}>Is ₹25 LPA good in Bangalore?</Link> for
        a higher-band worked example with a more premium rent assumption.
      </p>
    </ArticleProse>
  );
}
