import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function HowRentChangesSavingsBody() {
  return (
    <ArticleProse>
      <p>
        Rent is usually paid from <strong>money that has already been taxed</strong> (and after PF and other
        statutory lines). So a ₹5,000 rent increase is not like a ₹5,000 gross increase — it competes almost
        rupee-for-rupee with whatever you hoped to save, unless you cut something else.
      </p>

      <h2 id="order">1) The order of operations in your head</h2>
      <p>
        Rough mental model: <strong>gross → deductions → in-hand → fixed costs (rent, EMIs) → everything
        else → savings</strong>. When rent rises, it often hits the last bucket first because groceries and
        utilities do not shrink just because your landlord charged more.
      </p>

      <h2 id="src">2) See it in one place: Salary Reality Check</h2>
      <p>
        The <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> keeps rent explicit and models
        other spend bands so “savings” is an output, not a wish. Assumptions for lifestyle tiers and metro
        commute are summarized in <Link href={ROUTES.methodology}>methodology</Link>.
      </p>

      <h2 id="city">3) City pages with rent baked into the story</h2>
      <p>
        These pages answer “is this gross enough?” with a clear rent anchor you can change:
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
          <Link href={enough("is-20-lpa-good-in-mumbai")}>₹20 LPA in Mumbai</Link> — rent-heavy default.
        </li>
      </ul>

      <h2 id="negotiate">4) What actually improves savings faster</h2>
      <ul>
        <li>
          <strong>Lower rent</strong> (roommate, farther corridor, smaller unit) — often beats a small gross bump
          if tax and PF already eat marginal rupees.
        </li>
        <li>
          <strong>Honest lifestyle tier</strong> — “moderate” vs “premium” in the tool is a real switch; see{" "}
          <Link href={ROUTES.methodology}>methodology</Link>.
        </li>
        <li>
          <strong>Fewer EMIs</strong> competing with rent — the calculator does not hide loans; you should
          subtract them mentally.
        </li>
      </ul>

      <h2 id="related">Related guides</h2>
      <ul>
        <li>
          <Link href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
            How to judge if a salary is good in India
          </Link>
        </li>
        <li>
          <Link href={`${ROUTES.salaryGuides}/how-much-salary-you-need-in-bangalore`}>
            How much salary you need in Bangalore
          </Link>
        </li>
        <li>
          <Link href={`${ROUTES.salaryGuides}/how-much-salary-you-need-in-pune`}>How much salary you need in Pune</Link>
        </li>
      </ul>
    </ArticleProse>
  );
}
