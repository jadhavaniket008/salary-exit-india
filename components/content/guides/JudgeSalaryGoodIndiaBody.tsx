import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

const enough = salaryEnoughPath;

export function JudgeSalaryGoodIndiaBody() {
  return (
    <ArticleProse>
      <p>
        “Good salary” is not a single number on the internet. In practice, it means your{" "}
        <strong>in-hand cash</strong> (after PF, tax, and other deductions) leaves enough room after{" "}
        <strong>non-negotiables</strong> (rent, loan EMIs, family obligations) and your{" "}
        <strong>savings target</strong>. Everything else — title, CTC, peer gossip — is noise until you
        translate the offer into monthly rupees.
      </p>

      <h2 id="start-in-hand">1) Start from in-hand, not CTC</h2>
      <p>
        Two people with the same CTC can have different take-home because of PF wage, tax regime, professional
        tax, and how variable pay is structured. Before you judge an offer, put both sides through the same{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC → in-hand</Link> assumptions.
      </p>

      <h2 id="fixed-costs">2) Stack fixed costs in the right order</h2>
      <p>
        Rent and EMIs are usually paid from post-tax cash. If you move cities, rent often moves more than tax
        does — so “₹5 LPA more gross” can disappear into a deposit and a higher lease. Read{" "}
        <Link href={`${ROUTES.salaryGuides}/how-rent-changes-your-monthly-savings`}>
          how rent changes your monthly savings
        </Link>{" "}
        for the intuition, then use the{" "}
        <Link href={ROUTES.salaryRealityCheck}>Salary Reality Check</Link> with your actual rent and lifestyle
        tier.
      </p>

      <h2 id="city">3) Make the city explicit</h2>
      <p>
        The same gross feels different in Bangalore, Pune, Mumbai, or Noida because the rental market is
        different — not because “tier-1” is magic. Our salary-enough pages fix one transparent scenario each
        (rent + tier + metro commute band) so you can compare stories, not vibes:
      </p>
      <ul>
        <li>
          <Link href={enough("is-15-lpa-good-in-bangalore")}>Is ₹15 LPA good in Bangalore?</Link> —
          mid-junior band, higher rent anchor.
        </li>
        <li>
          <Link href={enough("is-20-lpa-good-in-pune")}>Is ₹20 LPA good in Pune?</Link> — more room on paper
          than many Mumbai rents at the same gross.
        </li>
        <li>
          <Link href={enough("is-20-lpa-good-in-mumbai")}>Is ₹20 LPA good in Mumbai?</Link> — rent-heavy
          stress test.
        </li>
      </ul>
      <p>
        Browse the full list on the{" "}
        <Link href={`${ROUTES.salaryGuides}#enough-heading`}>salary guides hub</Link>.
      </p>

      <h2 id="household">4) Match the household, not the meme</h2>
      <p>
        Singles sharing a flat, couples with one earner, and parents paying school fees are three different
        budgets. If you are comparing yourself to someone on LinkedIn, you rarely know their rent, loan, or
        second income. Use scenarios that match <em>your</em> lease and dependents — for example{" "}
        <Link href={enough("is-20-lpa-enough-for-family-in-bangalore")}>
          family-shaped spend in Bengaluru
        </Link>{" "}
        when that is the question you are actually asking.
      </p>

      <h2 id="variable">5) Price variable pay honestly</h2>
      <p>
        Stock, bonus, and sales incentives can be real money — or fiction. For planning, treat uncertain
        variable as upside, not rent money. When you compare two offers,{" "}
        <Link href={ROUTES.offerComparisonCalculator}>offer comparison</Link> helps if you feed it conservative
        numbers, not best-case stories.
      </p>

      <h2 id="verdict">6) A simple verdict you can defend</h2>
      <p>
        A salary is “good” when you can name: (a) estimated monthly in-hand, (b) rent or EMI, (c) other fixed
        costs, (d) a savings line you are willing to keep. If you cannot fill those four, fix the model before
        you fix the job.
      </p>
      <p>
        Deeper structure:{" "}
        <Link href={`${ROUTES.salaryGuides}/salary-structure-in-india`}>salary structure in India</Link> ·{" "}
        <Link href={`${ROUTES.salaryGuides}/what-affects-in-hand-salary`}>what affects in-hand pay</Link>.
      </p>
    </ArticleProse>
  );
}
