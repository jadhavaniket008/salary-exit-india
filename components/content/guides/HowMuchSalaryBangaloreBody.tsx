import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function HowMuchSalaryBangaloreBody() {
  return (
    <ArticleProse>
      <p>
        There is <strong>no honest single LPA</strong> that works for everyone in Bengaluru. What matters is
        whether <em>your</em> gross, after tax and PF, covers <em>your</em> rent, household costs, and the
        savings rate you want. The city’s job market publishes wide bands — your lease and commute pin you to
        a much narrower story.
      </p>

      <h2 id="why-no-number">Why “you need ₹X LPA” posts mislead</h2>
      <p>
        Headline numbers ignore PF wage, tax regime, variable pay mix, and whether you are paying school fees
        or a home loan. Two people on ₹20 LPA can have different lives because one pays ₹18,000 rent with a
        roommate and the other pays ₹45,000 solo near work. Start with{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>in-hand from CTC</Link>, then layer rent.
      </p>

      <h2 id="rent-first">What usually dominates: rent, then tier</h2>
      <p>
        In most budgets, rent is the largest lever you can name before you open a spreadsheet. Our{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> treats rent as an input and models
        groceries, commute, utilities, and discretionary by lifestyle tier (basic / moderate / premium) — see{" "}
        <Link href={ROUTES.methodology}>methodology</Link> for what those tiers mean in rupees.
      </p>

      <h2 id="scenario-pages">Stress-test with Bengaluru scenario pages</h2>
      <p>
        These pages each fix one rent + tier + metro commute assumption so you can compare “what if” without
        generic cost-of-living articles:
      </p>
      <ul>
        <li>
          <Link href={enough("is-10-lpa-good-in-bangalore")}>₹10 LPA</Link> — early-career; often tight for
          solo core-corridor rent.
        </li>
        <li>
          <Link href={enough("is-15-lpa-good-in-bangalore")}>₹15 LPA</Link> — common junior/mid band; rent anchor
          set higher than ₹10L page.
        </li>
        <li>
          <Link href={enough("is-20-lpa-enough-in-bangalore")}>₹20 LPA (enough?)</Link> — different framing from
          “good”; read the default rent.
        </li>
        <li>
          <Link href={enough("is-25-lpa-good-in-bangalore")}>₹25 LPA</Link> — stress-tested with a higher rent
          default.
        </li>
        <li>
          <Link href={enough("is-20-lpa-enough-for-family-in-bangalore")}>₹20 LPA, family-shaped spend</Link> —
          premium tier + rent; honest squeeze for one earner.
        </li>
      </ul>
      <p>
        Every page embeds the same calculator — change rent and tier to your actual hunt.
      </p>

      <h2 id="compare-offers">If you are choosing between cities</h2>
      <p>
        Do not compare CTC across cities without moving rent. Use the same in-hand methodology for each offer,
        then plug local rent.{" "}
        <Link href={`${ROUTES.jobSwitchGuides}/compare-job-offers-beyond-ctc`}>
          Compare job offers beyond CTC
        </Link>{" "}
        walks through that checklist.
      </p>

      <h2 id="related">Related reading</h2>
      <ul>
        <li>
          <Link href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
            How to judge if a salary is good in India
          </Link>
        </li>
        <li>
          <Link href={`${ROUTES.salaryGuides}/how-rent-changes-your-monthly-savings`}>
            How rent changes monthly savings
          </Link>
        </li>
      </ul>
    </ArticleProse>
  );
}
