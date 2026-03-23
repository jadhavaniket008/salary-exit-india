import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function HowMuchSalaryPuneBody() {
  return (
    <ArticleProse>
      <p>
        Pune is often sold as “cheaper than Mumbai” — which can be true on rent in many comparisons — but it
        is still a large, uneven market. Hinjewadi, Kharadi, and central pockets do not price the same. So the
        useful question is not “what LPA do I need?” but “what in-hand is left after <strong>my</strong> rent
        and <strong>my</strong> household spend?”
      </p>

      <h2 id="translate-ctc">1) Translate CTC to monthly cash first</h2>
      <p>
        Use one methodology for every offer:{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC → in-hand</Link>. Until you have that, arguing about
        “₹18 vs ₹20 LPA” is mostly vibes.
      </p>

      <h2 id="rent-corridor">2) Pick a rent corridor, not a vibe</h2>
      <p>
        Long commutes and monsoon upkeep are real costs even when rent looks lower than Mumbai. The{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> lets you set rent and a lifestyle
        tier so discretionary spend does not stay imaginary.
      </p>

      <h2 id="pune-pages">3) Use Pune scenario pages as anchors</h2>
      <p>
        These fix explicit rent + tier assumptions you can overwrite in the embedded tool:
      </p>
      <ul>
        <li>
          <Link href={enough("is-15-lpa-good-in-pune")}>Is ₹15 LPA good in Pune?</Link>
        </li>
        <li>
          <Link href={enough("is-18-lpa-good-in-pune")}>Is ₹18 LPA good in Pune?</Link>
        </li>
        <li>
          <Link href={enough("is-20-lpa-good-in-pune")}>Is ₹20 LPA good in Pune?</Link>
        </li>
        <li>
          <Link href={enough("is-10-lpa-enough-for-family-in-pune")}>
            Is ₹10 LPA enough for a family in Pune?
          </Link>{" "}
          — premium tier + modest rent; read the caveats.
        </li>
      </ul>

      <h2 id="bangalore-compare">4) Comparing Pune to Bengaluru or Mumbai</h2>
      <p>
        Same gross, different rent story. Open a Bengaluru page at a similar band (for example{" "}
        <Link href={enough("is-15-lpa-good-in-bangalore")}>₹15 LPA in Bangalore</Link>) and edit only rent in
        the calculator if you want a controlled comparison.
      </p>

      <h2 id="next">What to read next</h2>
      <ul>
        <li>
          <Link href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
            How to judge if a salary is good in India
          </Link>
        </li>
        <li>
          <Link href={`${ROUTES.salaryGuides}/how-much-salary-you-need-in-bangalore`}>
            How much salary you need in Bangalore
          </Link>{" "}
          (same framework, different city anchors).
        </li>
        <li>
          <Link href={`${ROUTES.jobSwitchGuides}/compare-job-offers-beyond-ctc`}>Compare offers beyond CTC</Link>
        </li>
      </ul>
    </ArticleProse>
  );
}
