import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function SalaryStructureIndiaBody() {
  return (
    <ArticleProse>
      <p>
        When a company quotes a &quot;CTC&quot; of ₹15 lakh, most candidates picture ₹1,25,000 hitting their bank account
        each month. The reality is usually ₹95,000–₹1,05,000 — sometimes less — because CTC is an employer cost
        envelope, not a bank credit. Understanding the structure between those two numbers is the single most
        practical piece of financial knowledge a salaried employee in India can have.
      </p>

      <h2 id="ctc-vs-gross-vs-in-hand">CTC, gross, and in-hand: three different lenses</h2>
      <p>
        <strong>CTC (Cost to Company)</strong> is the total annual expense an employer attributes to hiring you.
        It typically includes your fixed monthly cash components, employer-side contributions to PF and sometimes
        NPS, group insurance premiums, and on some offer letters, an annualized gratuity provision. None of these
        employer-side costs are money you receive directly.
      </p>
      <p>
        <strong>Gross salary</strong> is what payroll uses as a starting point for tax calculations — closer to
        the cash components paid to you, but still before employee-side deductions. Two people at the same CTC
        can have different gross figures if their CTC packages stack employer costs differently.
      </p>
      <p>
        <strong>In-hand (take-home)</strong> is gross minus employee PF contribution, professional tax, TDS
        (income tax withheld), and any other recoveries on that month&apos;s payslip. This is the number that
        actually matters for rent, EMIs, and monthly budgeting.
      </p>
      <p>
        Practically: a ₹15 LPA CTC with employer PF of ₹21,600/year and group insurance of ₹12,000/year means
        your gross is roughly ₹12.66 LPA, not ₹15 LPA. Before you compare offers, you need to strip these
        employer costs.
      </p>

      <h2 id="common-components">Salary components you will see in Indian offer letters</h2>
      <ul>
        <li>
          <strong>Basic salary:</strong> Typically 35–50% of gross in most Indian companies. It is the base for
          PF wage computation and sometimes for HRA eligibility. A lower Basic reduces your PF deduction and
          slightly increases in-hand, but also reduces your gratuity accrual and HRA exemption potential.
        </li>
        <li>
          <strong>HRA (House Rent Allowance):</strong> Typically 40–50% of Basic (50% for metro cities, 40% for
          non-metro). Under the old tax regime, actual rent paid above 10% of Basic can be exempt from tax —
          subject to Section 10(13A) conditions. Under the new regime, HRA exemption is not available.
        </li>
        <li>
          <strong>Special allowance / flexible benefit plan:</strong> A catch-all that many companies use to
          fill out the salary structure. It is usually fully taxable under both regimes. Some companies offer
          a &quot;flexible benefit plan&quot; where you can allocate amounts to LTA, medical, or other
          allowances — the tax treatment of each component depends on how it is structured.
        </li>
        <li>
          <strong>LTA (Leave Travel Allowance):</strong> Exempt from tax twice in a block of four calendar
          years under the old regime, subject to conditions. Under the new regime, LTA exemption is not
          available.
        </li>
        <li>
          <strong>Employer PF contribution:</strong> 12% of PF wage (Basic + DA up to a statutory ceiling), paid
          by your employer. This is part of CTC but not part of your monthly in-hand cash. It goes into your EPF
          account — a forced retirement saving.
        </li>
        <li>
          <strong>Variable pay / performance bonus:</strong> May be quoted as a percentage of CTC or fixed
          amount. Key questions: what is the eligibility criteria, when is it paid (quarterly/annually), what
          percentage is typically paid out vs target, and is it included in the F&amp;F settlement?
        </li>
      </ul>

      <h2 id="statutory-deductions">What comes off before it reaches your account</h2>
      <p>
        Three statutory items typically reduce in-hand below gross:
      </p>
      <ol>
        <li>
          <strong>Employee PF (EPF):</strong> 12% of PF wage, deducted from your gross each month. If PF wage
          equals Basic = ₹6,000/month, your deduction is ₹720/month. If Basic = ₹50,000/month, deduction is
          ₹6,000/month. The difference matters significantly at mid and senior levels.
        </li>
        <li>
          <strong>Professional tax:</strong> A state levy ranging from ₹0 (states that don&apos;t impose it) to
          ₹2,500/year. Maharashtra and Karnataka are common examples where it applies. Small per month, but it
          belongs in your reconciliation.
        </li>
        <li>
          <strong>TDS (Tax Deducted at Source):</strong> Income tax withheld by your employer based on your
          projected annual income and declared regime. For many salaried employees, this is the largest single
          deduction — easily ₹5,000–₹25,000/month at mid-level incomes depending on gross and regime choice.
        </li>
      </ol>

      <h2 id="reading-offer-letter">How to read an offer letter like a practitioner</h2>
      <ol>
        <li>
          <strong>Identify fixed monthly cash:</strong> Add Basic + HRA + Special Allowance + any other
          monthly fixed components. This is your annual gross (×12). Everything else — variable, employer PF,
          insurance, gratuity — is a separate line.
        </li>
        <li>
          <strong>Check the PF wage definition:</strong> Some companies cap PF wage at ₹15,000/month (the
          statutory ceiling), meaning employee PF is only ₹1,800/month regardless of Basic. Others apply full
          Basic as PF wage. This single policy difference can change your in-hand by ₹3,000–₹4,000/month at
          higher basics.
        </li>
        <li>
          <strong>Understand variable pay conditions:</strong> &quot;15% variable pay&quot; in a CTC breakdown
          means you would receive that amount if you meet 100% of targets. Ask what the average payout
          percentage is, and whether below-target employees receive a partial payout or nothing.
        </li>
        <li>
          <strong>Separate employer costs from your receivables:</strong> Employer PF, employer ESI (if
          applicable), and group insurance are costs the company incurs — they are often included in CTC to make
          the headline number larger but they are not spendable cash for you.
        </li>
      </ol>

      <h2 id="two-offers-same-ctc">Why two offers at the same CTC can pay differently</h2>
      <p>
        Consider two ₹18 LPA offers: Company A has Basic at 40% (₹7,200/month), full PF wage, and ₹3L
        variable. Company B has Basic at 50% (₹9,000/month), capped PF wage at ₹15,000/month, and ₹1.5L
        variable. Company A&apos;s fixed monthly in-hand will be higher due to lower PF deduction, but
        Company B&apos;s gratuity accrual and HRA exemption potential (under old regime) are stronger. The
        &quot;better&quot; offer depends on your tax situation, savings goals, and how long you plan to stay.
      </p>
      <p>
        Use the <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link> with explicit
        assumptions for each offer. The{" "}
        <Link href={ROUTES.epfCalculator}>EPF calculator</Link> helps you model PF deduction sensitivity, and
        the{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>regime comparison calculator</Link> shows how tax
        regime choice affects the bottom line for your specific gross.
      </p>

      <h2 id="methodology-note">A note on estimates and verification</h2>
      <p>
        Salary calculators — including those on SalaryExit — are estimation tools. They model common structures
        and statutory rates for a configured financial year. Payslip-level accuracy requires your actual PF wage,
        your state&apos;s professional tax slab, your declared regime, and any employer-specific policies. For
        tax filing, Form 16 and a qualified tax professional are the authoritative sources. Use calculators to
        understand the structure and sensitivity, not to produce filing-grade numbers.
      </p>
      <p>
        See <Link href={ROUTES.methodology}>how we calculate</Link> for the assumptions behind every tool. For
        the next step in this series, read{" "}
        <Link href={`${ROUTES.salaryGuides}/what-affects-in-hand-salary`}>
          what affects your in-hand salary
        </Link>{" "}
        and{" "}
        <Link href={`${ROUTES.salaryGuides}/what-reduces-your-in-hand-salary`}>
          what reduces your in-hand salary
        </Link>
        .
      </p>
    </ArticleProse>
  );
}
