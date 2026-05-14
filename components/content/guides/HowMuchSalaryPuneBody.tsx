import Link from "next/link";
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
      <p>
        A ₹15 LPA offer in Pune does not produce ₹1,25,000/month — it produces roughly ₹1,10,000–₹1,18,000
        in monthly in-hand after employee PF and TDS under the new regime (FY 2025-26). The gap depends on
        your PF wage structure and professional tax (Maharashtra levies PT on salaried employees). Run your
        specific offer structure through the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link> before comparing
        options.
      </p>

      <h2 id="pune-corridors">Pune&apos;s rent corridors: what each looks like in 2025</h2>
      <p>
        Approximate 1BHK rent ranges in Pune for a reasonably maintained furnished flat (2025 market):
      </p>
      <ul>
        <li>
          <strong>Hinjewadi Phase 1 and 2 (IT hub west):</strong> ₹10,000–₹16,000. Close to many
          tech parks; convenient but limited social infrastructure nearby. Long commutes to east Pune
          offices.
        </li>
        <li>
          <strong>Baner, Balewadi, Wakad (near Hinjewadi):</strong> ₹14,000–₹22,000. Better amenities
          than deep Hinjewadi; popular with mid-level tech employees. Good connectivity to Hinjewadi.
        </li>
        <li>
          <strong>Kharadi, Viman Nagar (east Pune IT corridor):</strong> ₹15,000–₹24,000. Opposite
          direction from Hinjewadi; appropriate for Magarpatta, EON IT Park, and east-side offices.
        </li>
        <li>
          <strong>Koregaon Park, Kalyani Nagar (central/upmarket):</strong> ₹22,000–₹38,000.
          Premium lifestyle location; popular with senior professionals and expats. Significant rent
          premium for the address.
        </li>
        <li>
          <strong>Pimple Saudagar, Pimple Nilakh (northwest):</strong> ₹10,000–₹18,000. Budget-friendly
          with reasonable connectivity to Hinjewadi via Baner road.
        </li>
      </ul>
      <p>
        Corridor selection is the single biggest budget decision you make when moving to Pune. A ₹8,000/month
        rent difference between Hinjewadi and Baner is ₹96,000/year.
      </p>

      <h2 id="at-10-lpa">What ₹10 LPA looks like in Pune</h2>
      <p>
        Monthly in-hand at ₹10 LPA gross: roughly ₹78,000–₹84,000. At ₹12,000 Hinjewadi rent:
        approximately ₹66,000–₹72,000 left for food, transport, utilities, and savings. For a single
        professional with basic lifestyle spend (~₹25,000–₹30,000 for groceries, commute, phone,
        utilities), savings potential is ₹36,000–₹47,000/month. Comparable to Bangalore at lower
        rent ranges.
      </p>
      <p>
        For a family with school fees or a second rent contributor, the math tightens considerably.
        See:{" "}
        <Link href={enough("is-10-lpa-enough-for-family-in-pune")}>
          Is ₹10 LPA enough for a family in Pune?
        </Link>
      </p>

      <h2 id="at-15-lpa">What ₹15 LPA looks like in Pune</h2>
      <p>
        Monthly in-hand at ₹15 LPA: roughly ₹1,10,000–₹1,18,000. At ₹18,000 Baner/Wakad rent:
        approximately ₹92,000–₹100,000 left. Mid-tier lifestyle (groceries + transport + utilities
        + discretionary ~₹30,000–₹35,000): savings potential ₹57,000–₹70,000/month. This is
        genuinely comfortable solo living in Pune at this gross — and significantly better than
        Mumbai or central Bangalore on the same CTC.
      </p>
      <p>
        Explore: <Link href={enough("is-15-lpa-good-in-pune")}>Is ₹15 LPA good in Pune?</Link>
      </p>

      <h2 id="at-18-20-lpa">What ₹18–20 LPA looks like in Pune</h2>
      <p>
        Monthly in-hand at ₹18 LPA: roughly ₹1,30,000–₹1,38,000. At ₹20,000 rent: leaves
        ₹1,10,000–₹1,18,000 for everything else. High savings potential (₹70,000–₹80,000/month)
        if lifestyle is kept moderate. At ₹20 LPA, in-hand ~₹1,45,000–₹1,52,000, and the budget
        picture is similar to Bangalore at 20 LPA but with ₹4,000–₹8,000 lower rent in equivalent
        corridors.
      </p>
      <p>
        Explore:{" "}
        <Link href={enough("is-18-lpa-good-in-pune")}>Is ₹18 LPA good in Pune?</Link> ·{" "}
        <Link href={enough("is-20-lpa-good-in-pune")}>Is ₹20 LPA good in Pune?</Link>
      </p>

      <h2 id="pune-vs-mumbai">Pune vs Mumbai: the real comparison</h2>
      <p>
        For most IT professionals, the same gross buys significantly more financial room in Pune than
        in Mumbai — primarily because rent is 30–50% lower for equivalent quality. A ₹18 LPA gross
        in Pune (in-hand ~₹1,30,000) with ₹18,000 rent leaves ~₹1,12,000 for other spend. The same
        ₹18 LPA in Mumbai (in-hand ~₹1,30,000) with ₹35,000 rent leaves only ~₹95,000. That is a
        meaningful quality-of-life and savings difference on identical gross.
      </p>
      <p>
        When evaluating a Pune vs Mumbai offer at similar CTC, don&apos;t just compare CTC — compare
        in-hand minus realistic rent in each city. See:{" "}
        <Link href={enough("is-20-lpa-good-in-mumbai")}>Is ₹20 LPA good in Mumbai?</Link> to stress-test
        the comparison.
      </p>

      <h2 id="pune-vs-bangalore">Pune vs Bangalore: closer than most think</h2>
      <p>
        Pune is not dramatically cheaper than Bangalore across the board. Baner and Balewadi rents
        are comparable to Whitefield and Marathahalli. What differs is traffic: Bangalore&apos;s
        commute times and costs are typically higher, and the city&apos;s social and food costs have
        risen to Bangalore-like levels in popular areas. For the same gross, Pune and outer Bangalore
        corridors produce similar monthly savings — the city choice should factor in office location,
        career ecosystem, and personal preference.
      </p>
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
