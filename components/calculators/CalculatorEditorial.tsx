import Link from "next/link";
import type { CalculatorSlug } from "@/lib/routes";
import { ROUTES } from "@/lib/routes";

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      {children}
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>
  );
}

function OL({ children }: { children: React.ReactNode }) {
  return (
    <ol className="list-decimal list-inside space-y-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </ol>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </ul>
  );
}

function CtcToInHandEditorial() {
  return (
    <Section>
      <H2>How CTC converts to in-hand salary in India</H2>
      <P>
        When an employer offers you a job in India, the number in the offer letter is usually CTC —
        Cost to Company. This includes everything the employer spends on you: your salary, employer
        PF contribution, group insurance premiums, and sometimes a gratuity accrual. Your
        actual monthly bank credit (in-hand salary) is always lower than CTC divided by 12, often
        substantially so.
      </P>
      <P>
        Three categories of deductions explain the gap. First, your employee PF contribution —
        typically 12% of your PF wage (Basic + DA or a capped PF wage, depending on employer
        policy) — is deducted before any cash reaches you. Second, professional tax (PT) is
        a state-specific levy, usually collected monthly from payroll and ranging from zero
        (some states) to around ₹200–250 per month in states like Maharashtra and Karnataka.
        Third, TDS (Tax Deducted at Source) is your estimated annual income tax spread across
        12 months. Under FY 2025-26 rules, new-regime employees with taxable income up to
        ₹12 lakh pay zero income tax after the Section 87A rebate — but TDS is still computed
        and spread every month until actual liability is zero.
      </P>
      <P>
        The regime choice (old vs new) has a direct, sometimes large, effect on in-hand.
        The new regime offers a ₹75,000 standard deduction (FY 2025-26) and lower slab rates,
        making it the default for many employees — especially those with fewer deductions.
        The old regime allows deductions like Section 80C (up to ₹1.5 lakh), HRA exemption,
        and others that can make it worth more for employees with high rent or large
        investments. Use the{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator} className="font-medium underline underline-offset-2">
          tax regime comparison calculator
        </Link>{" "}
        to see which produces a lower annual liability for your specific numbers.
      </P>
      <P>
        Common mistakes when reading an offer letter: treating CTC as a monthly number (divide
        by 12 to get gross, then apply deductions); assuming all components are paid monthly
        (bonus and variable pay are often paid quarterly or annually); and ignoring PF wage
        definition differences between employers (the same CTC at two companies can produce
        different monthly PF deductions and different in-hand).
      </P>
      <OL>
        <li>Identify fixed monthly components versus annual/variable components in the offer.</li>
        <li>Clarify whether employer PF is inside or outside the quoted CTC.</li>
        <li>Ask payroll for the PF wage definition (Basic+DA vs a statutory cap approach).</li>
        <li>Choose your tax regime before the financial year begins — mid-year switches are restricted.</li>
        <li>Use this calculator with your actual Basic+DA and state PT for a personalized estimate.</li>
      </OL>
    </Section>
  );
}

function SalaryEditorial() {
  return (
    <Section>
      <H2>Understanding your salary and tax breakdown</H2>
      <P>
        A salary breakdown is the calculation chain from your gross salary down to the
        amount you can actually spend. For salaried employees in India, this involves
        income tax (TDS), provident fund contributions, professional tax, and occasionally
        other employer-specific deductions. Each of these moves independently depending on
        your income level, state of employment, and payroll structure.
      </P>
      <P>
        Taxable income under both regimes is gross salary minus the standard deduction —
        ₹75,000 under the new regime and ₹50,000 under the old regime for FY 2025-26.
        The old regime allows additional deductions on top: HRA exemption for those paying
        rent, Section 80C investments up to ₹1.5 lakh, NPS contributions under Section
        80CCD, and others. Whether the old or new regime produces a lower tax bill depends
        entirely on the scale of these deductions relative to gross salary.
      </P>
      <P>
        TDS (Tax Deducted at Source) is how employers collect income tax in advance. Your
        employer estimates your full-year tax liability in April, divides it roughly by 12,
        and deducts that amount each month. If your income varies — bonus in one month,
        perquisites in another — TDS adjustments happen mid-year. This is why your monthly
        payslip deduction for tax can look different from{" "}
        <em>annual tax liability ÷ 12</em> in some months. The calculator spreads the
        estimated annual tax evenly, which is a simplified but useful approximation for
        planning.
      </P>
      <P>
        Professional tax is often overlooked in salary planning. It is a state-level
        levy — Maharashtra, Karnataka, Andhra Pradesh, West Bengal, and several other states
        collect it. Rates vary by state and income band, but for salaried employees the
        maximum annual liability is typically ₹2,400–₹3,000. It is deducted from your
        gross before income tax is calculated in some interpretations, though the exact
        treatment depends on the employer’s payroll system.
      </P>
      <UL>
        <li>Gross salary = Basic + HRA + Special allowance + all taxable monthly components.</li>
        <li>Taxable income = Gross − Standard deduction − any old-regime specific deductions.</li>
        <li>TDS is a monthly withholding, not the final tax — Form 16 reconciles the year-end position.</li>
        <li>Employee PF = 12% of PF wage (Basic+DA or statutory ceiling, whichever applies).</li>
        <li>In-hand = Gross − Employee PF − Professional tax − TDS (monthly spread).</li>
      </UL>
    </Section>
  );
}

function TaxRegimeEditorial() {
  return (
    <Section>
      <H2>Old vs new income tax regime: what the choice actually means</H2>
      <P>
        India’s dual tax regime system allows salaried employees to choose between two
        completely different frameworks for computing income tax. The choice — made once
        at the start of each financial year for TDS purposes, and finalised at filing —
        has a meaningful impact on how much monthly cash you keep.
      </P>
      <P>
        The new regime (under Section 115BAC) offers lower marginal rates and a higher
        basic exemption structure. For FY 2025-26, the new regime includes a ₹75,000
        standard deduction and a Section 87A rebate that makes taxable income up to
        ₹12 lakh effectively tax-free. This makes the new regime the default choice for
        most employees with taxable income below ₹12 lakh after standard deduction — and
        increasingly competitive even above that threshold.
      </P>
      <P>
        The old regime uses lower slab rates only after you subtract significant
        deductions. The ₹50,000 standard deduction applies, plus: Section 80C investments
        up to ₹1.5 lakh (PF, ELSS, PPF, LIC premiums, home loan principal, children’s
        tuition fees), HRA exemption under Section 10(13A) if you pay rent, NPS deductions
        under Section 80CCD, and home loan interest under Section 24. An employee with
        high rent, maximum 80C use, and NPS contributions can reduce taxable income by
        ₹3–4 lakh or more, which may make the old regime more beneficial. Use the comparison
        calculator to run your specific numbers — the crossover point varies significantly
        by income level.
      </P>
      <P>
        A common misconception: the new regime is always better for low incomes, always
        worse for high earners with deductions. Reality is more nuanced. At gross salaries
        where income tax is zero in the new regime (due to 87A), the old regime is unlikely
        to produce a lower liability regardless of deductions. At higher gross levels, the
        regime with more beneficial rates and effective deductions should be compared
        explicitly — which is exactly what this calculator does.
      </P>
      <UL>
        <li>New regime: ₹75,000 standard deduction, lower slab rates, no itemized deductions beyond standard.</li>
        <li>Old regime: ₹50,000 standard deduction, higher rates, full deduction menu (80C, HRA, 24(b), etc.).</li>
        <li>The 87A rebate in the new regime eliminates tax for taxable income ≤ ₹12 lakh (FY 2025-26).</li>
        <li>Regime must be selected before the FY begins for TDS — you can change at filing time.</li>
        <li>Surcharge and marginal relief apply above ₹50 lakh — this calculator does not model them.</li>
      </UL>
    </Section>
  );
}

function HraEditorial() {
  return (
    <Section>
      <H2>HRA exemption under Section 10(13A): how it actually works</H2>
      <P>
        House Rent Allowance (HRA) is a salary component that can significantly reduce your
        income tax liability under the old regime, through the Section 10(13A) exemption.
        The key thing most employees misunderstand: receiving HRA does not automatically
        mean all of it is tax-exempt. The exemption is the lowest of three different
        calculated limits, which means your actual exempted amount depends on your salary
        structure, your rent, and your city.
      </P>
      <P>
        The three-part Section 10(13A) test: The exemption is the lowest of (1) actual
        HRA received from the employer, (2) actual rent paid minus 10% of Basic salary,
        and (3) 50% of Basic salary if you live in a metro city (Mumbai, Delhi, Kolkata,
        Chennai) or 40% of Basic salary for all other locations. You need all three
        numbers to find the correct exemption — which is why a calculator that asks for
        all three inputs is necessary for an accurate estimate.
      </P>
      <P>
        HRA exemption applies only under the old tax regime. If you choose the new
        regime, your HRA is taxable even if you pay rent. This is the most common reason
        employees with significant rent should compare regimes explicitly rather than
        defaulting to whichever their employer assumed. The HRA exemption can reduce
        taxable income substantially for someone paying ₹20,000–₹40,000/month in rent
        in a metro city — sometimes making the old regime the better choice even accounting
        for the new regime’s lower slab rates.
      </P>
      <P>
        Documentation matters: HRA exemption can be claimed at filing time with actual
        rent receipts, but if the annual rent exceeds ₹1 lakh, the landlord’s PAN is
        required. Employers typically collect rent declarations and receipts mid-year and
        adjust TDS accordingly. If you forget to submit proofs on time, you can still
        claim the exemption at ITR filing — but you may face excess TDS during the year.
      </P>
      <UL>
        <li>Only applicable under the old tax regime — zero benefit in the new regime.</li>
        <li>Metro cities: 50% of Basic applies (Mumbai, Delhi, Kolkata, Chennai).</li>
        <li>Non-metro: 40% of Basic applies.</li>
        <li>Landlord PAN required if annual rent exceeds ₹1 lakh.</li>
        <li>Exemption is on Basic salary, not gross — so “Basic” definition in your CTC letter matters.</li>
      </UL>
    </Section>
  );
}

function EpfEditorial() {
  return (
    <Section>
      <H2>EPF contributions: what PF wage means and why it matters</H2>
      <P>
        Employees’ Provident Fund (EPF) is the statutory retirement savings scheme that
        applies to establishments with 20 or more employees in India. For salaried
        employees covered by EPF, the scheme determines a mandatory deduction from
        your payslip every month — and a matching employer contribution. Understanding
        how EPF works helps you accurately estimate both your take-home salary and your
        long-term retirement corpus.
      </P>
      <P>
        The contribution rate for both employee and employer is 12% of the PF wage.
        PF wage is defined as Basic salary plus Dearness Allowance (DA). Critically,
        this is not gross salary and not CTC — it is specifically Basic + DA. Many
        employers keep Basic salary at 40–50% of gross to manage their EPF contribution
        cost. The result: two employees with the same gross salary at different employers
        may have different PF deductions if their Basic+DA splits differ.
      </P>
      <P>
        Of the employer’s 12% contribution, 8.33% goes to the Employees’ Pension Scheme
        (EPS) — capped at a wage ceiling defined by EPFO rules — and the remainder goes
        into the EPF corpus. The employee’s full 12% goes to EPF. When you see “employer
        PF” in a CTC breakup, it includes both these streams. Employees cannot access the
        EPS share directly at withdrawal — it is part of the pension fund and has
        different rules at retirement. These nuances are why employer PF in CTC does not
        translate linearly to your EPF balance.
      </P>
      <P>
        Employees can contribute beyond the statutory 12% through Voluntary Provident Fund
        (VPF) — up to 100% of Basic+DA. VPF has the same interest rate as EPF and the same
        tax treatment. If you are looking to increase tax-efficient long-term savings beyond
        80C (which EPF counts toward), VPF is one mechanism — but it further reduces your
        monthly in-hand. Use this calculator to see how different PF wage levels and
        voluntary contributions change your monthly cash balance.
      </P>
      <UL>
        <li>PF wage = Basic + DA (not gross, not CTC).</li>
        <li>Employee contribution: 12% of PF wage, deducted monthly from your gross.</li>
        <li>Employer contribution: 12% of PF wage — split between EPF and EPS.</li>
        <li>EPS contribution is not withdrawable as a lump sum the same way EPF is.</li>
        <li>EPF balance earns a declared interest rate (set annually by EPFO) — check current rate on the EPFO website.</li>
      </UL>
    </Section>
  );
}

function GratuityEditorial() {
  return (
    <Section>
      <H2>How gratuity works in India: eligibility, formula, and tax treatment</H2>
      <P>
        Gratuity is a statutory lump-sum benefit paid by employers to employees as a token
        of appreciation for long service, governed by the Payment of Gratuity Act, 1972.
        It applies to establishments with 10 or more employees. For most private-sector
        salaried employees in India, gratuity becomes payable after completing five years
        of continuous service — though the exact minimum-service rule has court
        interpretations worth verifying with your employer’s HR.
      </P>
      <P>
        The formula used by most covered employers is: <em>Monthly basic salary × 15 × years
        of service ÷ 26</em>. The “26” represents a standard working-month denominator; the
        “15” represents 15 days’ salary per year of service. Monthly basic salary here means
        the last drawn Basic + DA, not gross. This means the gratuity quantum is directly
        sensitive to your Basic+DA — a low Basic salary at a high-CTC company will produce a
        lower gratuity than the same gross at a company with a higher Basic structure.
      </P>
      <P>
        Tax treatment depends on your employer’s coverage status. For employees covered
        under the Payment of Gratuity Act (10+ employees), gratuity received is exempt
        from income tax up to a statutory ceiling. Beyond that ceiling, the excess is
        taxable as salary income. For employers not covered by the Act (fewer than 10
        employees), the exemption formula is different and lower. The specific rupee
        ceiling is set by the government and has been revised over time — verify the
        current limit on the Income Tax Department website or with a qualified CA before
        filing. {/* needs manual legal verification: exact current ₹ ceiling for PGA-covered employers */}
      </P>
      <P>
        Gratuity is part of your final settlement when you resign, are terminated, or
        retire. Employers typically compute it on the last drawn Basic+DA. Disputes
        often arise around service year rounding (is 4 years 8 months counted as 5 years?)
        — check your employment contract and the prevailing interpretation under the
        Gratuity Act. The calculator here estimates the gross gratuity amount; consult
        your HR policy for the exact eligible amount in your situation.
      </P>
      <UL>
        <li>Applicable after 5 years of continuous service at establishments with 10+ employees.</li>
        <li>Formula: (Monthly Basic+DA × 15 × completed years) ÷ 26.</li>
        <li>Tax exemption exists up to a statutory ceiling for covered employers — verify current cap.</li>
        <li>Not paid on resignation before completing 5 years (with limited exceptions for death/disability).</li>
        <li>Part of your final settlement — appears in FnF alongside leave encashment and any notice recovery.</li>
      </UL>
    </Section>
  );
}

function NoticeBuyoutEditorial() {
  return (
    <Section>
      <H2>Notice period buyout in India: how it is calculated and what to watch for</H2>
      <P>
        When an employee in India leaves a job without serving the full contractual notice
        period, the shortfall is typically offset by a “notice period buyout” or “notice
        pay” — a deduction from the final settlement equal to the salary that would have
        been earned during the unserved notice days. Similarly, if the employer asks the
        employee to leave without serving notice, the employer pays the employee an
        equivalent amount as notice pay in lieu.
      </P>
      <P>
        The question of what “salary” means in this context is where variation enters.
        Most employment agreements define notice pay as the basic monthly salary, or the
        “gross monthly salary” as defined in the contract. Some contracts specify CTC/12.
        Variable pay, bonuses, and allowances are typically excluded from notice pay
        calculations — but this depends entirely on your employment agreement wording.
        Reading your appointment letter carefully before negotiating a short exit is
        essential.
      </P>
      <P>
        The calculation itself is usually straightforward: if your contractual notice
        period is 90 days and you served 30, the buyout covers 60 days. Most contracts
        calculate this as <em>gross monthly salary × (shortfall days ÷ days in the month)</em>,
        using actual calendar days in the relevant month, not working days. Some employers
        use a standard 30-day denominator regardless of the calendar month. This calculator
        uses a configurable per-day rate so you can try both methods.
      </P>
      <P>
        Notice period waivers are common in practice. If your employer agrees to waive
        the notice period without charging you, no buyout is deducted. This often happens
        when a new employer is paying the buyout on your behalf, or when the employer has
        a pressing need to free up your role. The buyout arrangement, if charged, is
        typically not a tax-deductible expense for the employee — check with a CA if the
        amounts are significant.
      </P>
      <UL>
        <li>Check whether your contract says “basic” or “gross” or “CTC/12” for notice pay calculation.</li>
        <li>Variable pay and bonuses are usually excluded from notice pay — verify contractually.</li>
        <li>Calendar day method vs 30-day month method can differ by a few thousand rupees — clarify with HR.</li>
        <li>Notice period waivers are at employer’s discretion — negotiate rather than assume.</li>
        <li>Notice pay received by the employee is taxable as salary income.</li>
      </UL>
    </Section>
  );
}

function LeaveEncashmentEditorial() {
  return (
    <Section>
      <H2>Leave encashment in India: how the per-day rate and tax rules work</H2>
      <P>
        Leave encashment is the cash equivalent you receive for unused earned leave (EL)
        when you leave a job or, in some companies, at the employer’s discretion during
        service. Private-sector employees typically accumulate earned leave at a rate
        defined by their company’s leave policy, often 1–1.5 days per month (12–18 days
        per year), with a maximum carryforward cap set by the employer.
      </P>
      <P>
        The per-day rate for encashment is calculated from your Basic + DA (or
        “basic salary” as defined in the leave policy), divided by either 26 or 30.
        The 26-day denominator treats a month as 26 working days — a convention common
        in the Payment of Gratuity Act and some employer policies. The 30-day denominator
        uses the calendar month. Whichever method your employer uses determines the
        per-day value of each encashed leave day. This calculator lets you choose the
        denominator to match your company’s policy.
      </P>
      <P>
        Tax treatment differs by employment type. Central and state government employees
        receive a specific exemption for leave encashment at retirement, with defined
        limits under Section 10(10AA) of the Income Tax Act. For private-sector employees,
        leave encashment received at the time of retirement or resignation is exempt up
        to certain limits and subject to specific conditions. Encashment during service
        (while still employed) is generally fully taxable as salary. {/* needs manual legal verification: exact current exemption limit and conditions for private sector employees under 10(10AA) */}
        Given the tax complexity, consult a chartered accountant for significant leave
        encashment payouts — especially at the time of leaving or retirement.
      </P>
      <P>
        In your final settlement, leave encashment appears alongside gratuity, last month
        salary, and notice pay. It is one of the more negotiable components — some
        companies cap the leave balance that can be encashed, or require you to take
        leave instead. Understanding the per-day value helps you compare these options.
      </P>
      <UL>
        <li>Per-day rate = (Monthly Basic+DA) ÷ 26 (or ÷ 30, per employer policy).</li>
        <li>Only earned/privilege leave is typically encashable — casual and sick leave often are not.</li>
        <li>Encashment during service is fully taxable; at separation, exemptions may apply.</li>
        <li>Government employees have distinct exemption rules under Section 10(10AA).</li>
        <li>Final settlement: leave encashment + gratuity + last salary − notice recovery = net FnF.</li>
      </UL>
    </Section>
  );
}

function FinalSettlementEditorial() {
  return (
    <Section>
      <H2>Final settlement (FnF) in India: components, timeline, and what to verify</H2>
      <P>
        Full and final settlement (FnF) is the net payment (or recovery) between you
        and your employer at the end of employment. It is calculated by summing everything
        the employer owes you, then subtracting anything you owe the employer. The result
        can be positive (a payment to you) or negative (a recovery from you, sometimes
        through adjustment against accrued salary or gratuity).
      </P>
      <P>
        Typical FnF credit components include: last month’s salary (for days worked),
        leave encashment of accumulated earned leave (subject to company policy and
        tax rules), gratuity if eligible (5+ years, covered employer), bonus arrears
        if applicable and unpaid, and notice pay received from employer if asked to leave
        early. Typical deductions include: notice period recovery if you left short
        (unserved notice days × per-day salary), salary advances or loan recoveries,
        and any asset recovery.
      </P>
      <P>
        Timeline: the Payment of Wages Act and some state-specific shops and establishments
        acts prescribe timelines for final settlement — often within 30–60 days of
        separation. In practice, larger companies with payroll software can complete FnF
        faster; smaller companies sometimes delay. Form 16 Part A for the year of
        separation should reflect the FnF components, which matters when you file your
        ITR — particularly if gratuity, leave encashment, or unusually large FnF amounts
        are involved.
      </P>
      <P>
        Verifying your FnF: ask HR for a detailed line-item breakup before signing any
        settlement letter. Common errors include: wrong number of leave days encashed,
        incorrect gratuity base (uses old salary rather than last drawn), wrong notice
        period recovery calculation (using working days instead of calendar days), and
        missing bonus arrears. Use this calculator to sanity-check the arithmetic before
        accepting the final figure.
      </P>
      <UL>
        <li>Credits: last salary + leave encashment + gratuity + bonus arrears + notice pay received.</li>
        <li>Debits: notice recovery + loan/advance recovery + asset recovery.</li>
        <li>Ask for a detailed breakup before signing any settlement letter.</li>
        <li>Verify gratuity base: it should be last drawn Basic+DA, not older salary.</li>
        <li>FnF components appear in Form 16 Part A for the separation year — keep records for ITR.</li>
      </UL>
    </Section>
  );
}

function OfferComparisonEditorial() {
  return (
    <Section>
      <H2>Comparing job offers beyond CTC: what actually determines your take-home</H2>
      <P>
        CTC (Cost to Company) is the most common metric used to compare Indian job offers,
        but it is one of the least reliable for comparing actual financial outcomes. Two
        offers with the same CTC can produce meaningfully different monthly in-hand amounts
        based on how the CTC is structured — and even more different quality-of-life outcomes
        based on city, benefits, and risk profile.
      </P>
      <P>
        The fixed-vs-variable split is the first thing to examine. A ₹20 LPA offer with
        ₹5 lakh variable (performance-linked) is not the same as a ₹20 LPA offer that is
        100% fixed. Variable pay depends on individual and company performance — and in
        practice, many employees receive 60–80% of target variable. Compare offers on
        fixed gross, not total CTC including aspirational variable.
      </P>
      <P>
        Joining bonuses are common for senior hires and employees leaving mid-appraisal.
        A ₹2 lakh joining bonus in a ₹20 LPA offer is equivalent to ₹10,000/month amortized
        — and it is typically clawed back if you leave within 12–24 months. Treat joining
        bonuses as a one-time adjustment, not a salary enhancement, when comparing offers
        for the medium term. Similarly, a retention bonus at your current company only
        counts if you plan to stay — do not let a conditional future payment anchor your
        negotiation against a concrete offer.
      </P>
      <P>
        The Basic+DA split also matters: a company with a low Basic (30–35% of gross) will
        produce lower employee PF deductions, slightly higher monthly in-hand, but also
        lower gratuity accrual and potentially lower leave encashment. A company with
        40–50% Basic has higher statutory deductions but more “employer-paid” retirement
        benefits. Neither is universally better — it depends on your priorities. Use this
        calculator to compare net in-hand after PF across offer structures.
      </P>
      <UL>
        <li>Compare fixed gross first, not CTC — strip variable pay from headline offers.</li>
        <li>Amortize joining bonuses over a realistic tenure before counting them as “salary”.</li>
        <li>Higher Basic+DA = higher PF, higher gratuity, slightly lower in-hand — different risk profile.</li>
        <li>Factor ESOPs separately: vesting schedules, strike price, and liquidity events are not salary.</li>
        <li>City cost of living matters more than CTC at similar gross levels — ₹18 LPA in Pune ≠ ₹18 LPA in Mumbai.</li>
      </UL>
    </Section>
  );
}

function SalaryHikeEditorial() {
  return (
    <Section>
      <H2>Salary hike in India: how to read the percentage and what it really means</H2>
      <P>
        A salary hike in India is usually expressed as a percentage of your current CTC
        or gross — but what that percentage actually delivers in monthly cash depends on
        several factors that the headline number obscures. Understanding the arithmetic
        helps you evaluate whether a quoted hike genuinely moves your financial situation
        or is partly cosmetic.
      </P>
      <P>
        The base matters enormously. A 30% hike on ₹6 LPA adds ₹1.8 lakh to CTC and
        roughly ₹12,000–15,000 to monthly in-hand. The same 30% on ₹15 LPA adds ₹4.5
        lakh to CTC and significantly more to monthly cash — but also shifts your tax
        bracket and PF contributions. This calculator converts the percentage change into
        absolute figures so you can see both the CTC delta and the approximate monthly
        in-hand effect.
      </P>
      <P>
        Hikes from appraisals (increments) versus hikes from job switches (joining offers)
        behave differently in negotiation. An appraisal increment is typically applied to
        your existing salary structure, preserving all components. A joining offer may
        restructure your salary entirely — which can change your Basic+DA ratio, your PF
        deductions, and your effective take-home even at the same gross. A 20% jump in
        CTC that comes with a significant drop in Basic might produce less monthly in-hand
        than you expect.
      </P>
      <P>
        Industry benchmarking: average increments in India vary by sector and performance
        band. IT services companies typically offer 8–15% for standard performers; product
        companies can be higher or lower depending on the year. Switching jobs remains the
        fastest way to get a step-function increase rather than incremental gains. When
        negotiating a joining offer, anchor on the fixed in-hand number you want, not the
        CTC percentage — then work backward from there.
      </P>
      <UL>
        <li>Hike % × current CTC = absolute CTC addition (before tax/PF changes).</li>
        <li>The effective monthly in-hand gain is lower than CTC gain due to progressive tax and PF.</li>
        <li>A restructured salary on a switch may have different Basic+DA ratios than a simple increment.</li>
        <li>Always verify what “CTC” means in a revised letter: same components, or restructured?</li>
        <li>Negotiate on fixed monthly in-hand, not CTC, when the structure is uncertain.</li>
      </UL>
    </Section>
  );
}

function SalaryRealityCheckEditorial() {
  return (
    <Section>
      <H2>Salary reality check: why arithmetic savings and actual savings diverge</H2>
      <P>
        Most salary planning starts with a simple calculation: in-hand minus rent equals
        savings. In practice, the number left after rent is not your savings — it is your
        budget for all other spending: groceries, transport, utilities, subscriptions,
        personal care, social expenses, and emergency buffers. What remains after all of
        that is actual discretionary savings. This tool adds a realistic spending tier
        between in-hand and rent to give you that clearer picture.
      </P>
      <P>
        The spending tier categories in the calculator (basic, moderate, premium) represent
        real-world ranges observed across Indian cities and income levels. They are not
        exact — your specific lifestyle will differ — but they give you a starting structure.
        In many Indian metros, a “moderate” lifestyle for a single professional includes
        meals (home-cooked and eating out), transport (auto, metro, occasional ride-hail),
        personal care, and phone/internet. The “premium” tier adds higher discretionary
        spend, more frequent dining out, gym memberships, and similar costs.
      </P>
      <P>
        City differences are real and large. The same ₹12 LPA gross in Hyderabad leaves
        meaningfully more discretionary income than in Mumbai, primarily because rent is
        a fixed rupee cost, not a percentage of income. A 2BHK in central Mumbai at
        ₹45,000/month consumes a much larger fraction of in-hand than a comparable unit
        in Pune at ₹18,000/month. This calculator does not hardcode city benchmarks —
        it asks for your actual rent, which makes the output more useful than generic
        “cost of living” comparisons.
      </P>
      <P>
        A practical savings target: financial planners in India commonly suggest saving
        20–30% of take-home pay for medium-term goals, and additional amounts for
        retirement beyond EPF. At lower income levels (under ₹10 LPA gross), hitting
        20% savings while living independently in a metro is genuinely hard, not a
        personal failure. This tool helps you see exactly why — and which lever (rent,
        lifestyle tier, income) moves the needle most for your specific situation.
      </P>
      <UL>
        <li>In-hand is not your savings — spending sits between rent and savings.</li>
        <li>Rent is typically the largest single variable in monthly savings outcomes.</li>
        <li>The calculator does not model EMIs, insurance premiums, or irregular expenses — add them to the spend tier.</li>
        <li>Commute mode affects costs: public transport vs own vehicle vs ride-hail differ by several thousand per month.</li>
        <li>Savings left is a lower bound — irregular expenses (medical, travel, festivals) reduce it further.</li>
      </UL>
    </Section>
  );
}

const EDITORIAL_MAP: Partial<Record<CalculatorSlug, React.ComponentType>> = {
  ctcToInHand: CtcToInHandEditorial,
  salary: SalaryEditorial,
  taxRegime: TaxRegimeEditorial,
  hra: HraEditorial,
  epf: EpfEditorial,
  gratuity: GratuityEditorial,
  noticeBuyout: NoticeBuyoutEditorial,
  leaveEncashment: LeaveEncashmentEditorial,
  finalSettlement: FinalSettlementEditorial,
  offerComparison: OfferComparisonEditorial,
  salaryHike: SalaryHikeEditorial,
  salaryRealityCheck: SalaryRealityCheckEditorial,
};

export function CalculatorEditorial({ slug }: { slug: CalculatorSlug }) {
  const Editorial = EDITORIAL_MAP[slug];
  if (!Editorial) return null;
  return <Editorial />;
}
