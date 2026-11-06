import type { CalculatorSlug } from "@/lib/routes";

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-surface p-5">
      {children}
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-foreground">{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-foreground-secondary">{children}</p>
  );
}

function OL({ children }: { children: React.ReactNode }) {
  return (
    <ol className="list-decimal list-inside space-y-1.5 text-sm leading-relaxed text-foreground-secondary">
      {children}
    </ol>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-sm leading-relaxed text-foreground-secondary">
      {children}
    </ul>
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
        Taxable income under both regimes is gross salary minus the standard deduction under
        Section 19(1) — ₹75,000 under the new regime and ₹50,000 under the old regime for
        Tax Year 2026–27 (FY 2026–27). The old regime allows additional deductions on top:
        HRA exemption for those paying rent, Section 123 deductions (corresponding to the
        earlier Section 80C framework) up to ₹1.5 lakh, NPS-style contributions where still
        available, and others. Whether the old or new regime produces a lower tax bill depends
        entirely on the scale of these deductions relative to gross salary.
      </P>
      <P>
        TDS (Tax Deducted at Source) under Section 392(1) is how employers collect income tax
        in advance. Your employer estimates your full-year tax liability in April, divides it
        roughly by 12, and deducts that amount each month. If your income varies — bonus in one
        month, perquisites in another — TDS adjustments happen mid-year. This is why your monthly
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
        treatment depends on the employer's payroll system.
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
        India's dual tax regime system allows salaried employees to choose between two
        completely different frameworks for computing income tax. The choice — made once
        at the start of each financial year for TDS purposes, and finalised at filing —
        has a meaningful impact on how much monthly cash you keep.
      </P>
      <P>
        The new regime (Section 202 of the Income Tax Act, 2025 — earlier Section 115BAC
        framework) offers lower marginal rates and a higher basic exemption structure. For
        Tax Year 2026–27 (FY 2026–27), the new regime includes a ₹75,000 standard deduction
        under Section 19(1) and a Section 156 rebate under the Income Tax Act, 2025 (earlier
        Section 87A framework) that makes taxable income up to ₹12 lakh effectively tax-free.
        This makes the new regime the default choice for most employees with taxable income
        below ₹12 lakh after standard deduction — and increasingly competitive even above that
        threshold.
      </P>
      <P>
        The old regime uses lower slab rates only after you subtract significant
        deductions. The ₹50,000 standard deduction under Section 19(1) applies, plus:
        Section 123 deductions read with Schedule XV (corresponding to the earlier Section 80C
        framework — up to ₹1.5 lakh for PF, ELSS, PPF, LIC premiums, home loan principal,
        children&apos;s tuition fees), HRA exemption if you pay rent and claim under the old
        regime, NPS-style deductions where still available, and home-loan interest where
        applicable. An employee with high rent, maximum Section 123 / earlier-80C use, and
        NPS contributions can reduce taxable income by ₹3–4 lakh or more, which may make the
        old regime more beneficial. Use the comparison calculator to run your specific
        numbers — the crossover point varies significantly by income level.
      </P>
      <P>
        A common misconception: the new regime is always better for low incomes, always
        worse for high earners with deductions. Reality is more nuanced. At gross salaries
        where income tax is zero in the new regime (due to the rebate), the old regime is
        unlikely to produce a lower liability regardless of deductions. At higher gross
        levels, the regime with more beneficial rates and effective deductions should be
        compared explicitly — which is exactly what this calculator does.
      </P>
      <UL>
        <li>New regime (Section 202): ₹75,000 standard deduction (Section 19(1)), lower slab rates, no itemized deductions beyond standard.</li>
        <li>Old regime: ₹50,000 standard deduction, higher rates, full deduction menu (Section 123 / earlier 80C, HRA, home-loan interest, etc.).</li>
        <li>Section 156 rebate (earlier 87A) eliminates tax for taxable income ≤ ₹12 lakh (Tax Year 2026–27 / FY 2026–27).</li>
        <li>Regime must be selected before the tax year begins for TDS under Section 392(1) — you can change at filing time.</li>
        <li>Surcharge (and its own marginal relief) applies above ₹50 lakh taxable income — this calculator does not model surcharge. Section 156 / earlier-87A marginal relief near the ₹12 lakh threshold is modeled separately and is not affected by this.</li>
      </UL>
    </Section>
  );
}

function EpfEditorial() {
  return (
    <Section>
      <H2>EPF contributions: what PF wage means and why it matters</H2>
      <P>
        Employees' Provident Fund (EPF) is the statutory retirement savings scheme that
        applies to establishments with 20 or more employees in India. For salaried
        employees covered by EPF, the scheme determines a mandatory deduction from
        your payslip every month — and a matching employer contribution. Understanding
        how EPF works helps you accurately estimate both your take-home salary and your
        long-term retirement corpus.
      </P>
      <P>
        The contribution rate for both employee and employer is 12% of the PF wage.
        SalaryExit models PF wages using the Basic + Dearness Allowance (DA) input —
        not gross salary and not CTC. Actual statutory wages and payroll treatment can
        depend on applicable EPFO rules and payroll circumstances. Many employers keep
        Basic salary at 40–50% of gross, which changes the modelled PF base. The result:
        two employees with the same gross salary at different employers may have different
        PF deductions if their Basic+DA splits or contribution arrangements differ.
      </P>
      <P>
        Of the employer's 12% contribution, 8.33% goes to the Employees' Pension Scheme
        (EPS) — capped at a wage ceiling defined by EPFO rules — and the remainder goes
        into the EPF corpus. The employee's full 12% goes to EPF. When you see "employer
        PF" in a CTC breakup, it includes both these streams. Employees cannot access the
        EPS share directly at withdrawal — it is part of the pension fund and has
        different rules at retirement. These nuances are why employer PF in CTC does not
        translate linearly to your EPF balance.
      </P>
      <P>
        Employees can contribute beyond the statutory 12% through Voluntary Provident Fund
        (VPF) — up to 100% of Basic+DA. VPF has the same interest rate as EPF and the same
        tax treatment. If you are looking to increase tax-efficient long-term savings beyond
        Section 123 / earlier-80C (which EPF counts toward), VPF is one mechanism — but it
        further reduces your monthly in-hand. Use this calculator to see how different PF
        wage levels and voluntary contributions change your monthly cash balance.
      </P>
      <UL>
        <li>SalaryExit models PF wage from Basic + DA (not gross, not CTC); actual EPFO/payroll treatment can differ.</li>
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
      <H2>Gratuity: current wage definition, service eligibility and tax limits</H2>
      <P>
        Gratuity for covered employees is governed by the Code on Social Security, 2020,
        in force since 21 November 2025. Five years of service is the ordinary eligibility
        threshold, but death, disablement and qualifying fixed-term employment have exceptions.
        For fixed-term employees, current Ministry guidance identifies a one-year service rule.
      </P>
      <P>
        The common illustrative method is 15 days of <em>last-drawn statutory wages</em> per
        counted year, often shown as monthly wage × 15 × years ÷ 26. Basic, DA and any
        retaining allowance are the starting components; an excess of specified excluded
        payments beyond the 50% threshold may need to be added back. Basic+DA alone is
        therefore not a universal statutory base.
      </P>
      <P>
        SalaryExit does not calculate the wage add-back or determine eligibility. Enter the
        wage basis verified with payroll; the result is a mathematical estimate. Rounding,
        employment category, service length, contractual enhancements and tax exemptions
        require separate checks. The tool&apos;s ₹20 lakh exempt-cap approximation is not
        an individual tax assessment.
      </P>
      <UL>
        <li>Check employer coverage and employment category before applying the estimate.</li>
        <li>Confirm the last-drawn statutory wages and any 50% allowance add-back.</li>
        <li>Check exceptions for death, disablement and qualifying fixed-term service.</li>
        <li>Request the employer&apos;s written gratuity calculation and verify tax separately.</li>
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
        period, the shortfall is typically offset by a "notice period buyout" or "notice
        pay" — a deduction from the final settlement equal to the salary that would have
        been earned during the unserved notice days. Similarly, if the employer asks the
        employee to leave without serving notice, the employer pays the employee an
        equivalent amount as notice pay in lieu.
      </P>
      <P>
        The question of what "salary" means in this context is where variation enters.
        Most employment agreements define notice pay as the basic monthly salary, or the
        "gross monthly salary" as defined in the contract. Some contracts specify CTC/12.
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
        <li>Check whether your contract says "basic" or "gross" or "CTC/12" for notice pay calculation.</li>
        <li>Variable pay and bonuses are usually excluded from notice pay — verify contractually.</li>
        <li>Calendar day method vs 30-day month method can differ by a few thousand rupees — clarify with HR.</li>
        <li>Notice period waivers are at employer's discretion — negotiate rather than assume.</li>
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
        when you leave a job or, in some companies, at the employer's discretion during
        service. Private-sector employees typically accumulate earned leave at a rate
        defined by their company's leave policy, often 1–1.5 days per month (12–18 days
        per year), with a maximum carryforward cap set by the employer.
      </P>
      <P>
        The per-day rate for encashment is calculated from your Basic + DA (or
        "basic salary" as defined in the leave policy), divided by either 26 or 30.
        The 26-day denominator treats a month as 26 working days — a convention common
        in the Payment of Gratuity Act and some employer policies. The 30-day denominator
        uses the calendar month. Whichever method your employer uses determines the
        per-day value of each encashed leave day. This calculator lets you choose the
        denominator to match your company's policy.
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
      <H2>Final settlement (FnF): check each component, recovery and deadline</H2>
      <P>
        A final-settlement statement may list salary due, eligible leave encashment,
        gratuity, bonus or reimbursements, as well as employer-claimed recoveries.
        This calculator only totals credit and deduction lines entered by the user;
        it does not establish statutory entitlement, legal enforceability or final tax.
      </P>
      <P>
        Under section 17(2) of the Code on Wages, 2019, wages payable on resignation and
        certain other separations are generally due within two working days, subject to
        applicable exceptions or other-law deadlines. This is not a universal two-day
        deadline for gratuity, reimbursements, bonuses or the whole FnF package.
      </P>
      <P>
        Under section 18, deductions from wages must be authorised by law. A claimed
        notice-period recovery is not automatically valid just because HR lists it or
        a contract mentions it. Ask for the written settlement breakup, notice-days
        calculation, salary basis, contract terms and legal basis for the claim.
      </P>
      <P>
        Do not automatically net a disputed recovery against protected wages. Keep
        payment records and check gratuity under the Code on Social Security, 2020,
        including its revised statutory wage definition and any service exceptions.
      </P>
      <UL>
        <li>List every credit and proposed recovery separately.</li>
        <li>Verify any notice claim rather than treating it as settled.</li>
        <li>Separate wage payment deadlines from other component deadlines.</li>
        <li>Use the result as arithmetic, not a guaranteed bank credit.</li>
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
        40–50% Basic has higher statutory deductions but more "employer-paid" retirement
        benefits. Neither is universally better — it depends on your priorities. Use this
        calculator to compare net in-hand after PF across offer structures.
      </P>
      <UL>
        <li>Compare fixed gross first, not CTC — strip variable pay from headline offers.</li>
        <li>Amortize joining bonuses over a realistic tenure before counting them as "salary".</li>
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
      <H2>Salary hike in India: annual increase is not monthly in-hand</H2>
      <P>
        A quoted salary hike normally compares two annual amounts. The same percentage
        means very different rupee increases depending on the starting amount: a 30%
        increase on ₹6 LPA is ₹1.8 lakh a year (₹15,000 a month before deductions),
        while a 30% increase on ₹15 LPA is ₹4.5 lakh a year (₹37,500 a month
        before deductions). Both are arithmetic differences, not predicted take-home.
      </P>
      <P>
        This tool returns the annual rupee change and percentage change only.
        It does not calculate revised income tax, employee PF, professional
        tax or net salary. To compare take-home, enter your before-and-after
        pay separately into the CTC-to-in-hand calculator with comparable
        assumptions. Keep CTC versus gross salary definitions consistent.
      </P>
      <P>
        An appraisal may change fixed pay within an existing salary structure,
        while a new employer may include different employer-side contributions
        or a different fixed-versus-variable split in its CTC. Request both
        written breakups before assuming that a larger percentage increase
        produces a proportionate increase in monthly cash.
      </P>
      <UL>
        <li>Annual rupee increase = new annual amount minus old annual amount.</li>
        <li>Hike percentage = annual increase ÷ old annual amount × 100, when the old amount is above zero.</li>
        <li>Compare gross with gross, or CTC with CTC; do not mix definitions.</li>
        <li>Ask which parts of revised CTC are fixed, variable and employer-side costs.</li>
        <li>Use a separate take-home estimate to factor in tax, employee PF and professional tax.</li>
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
        In many Indian metros, a "moderate" lifestyle for a single professional includes
        meals (home-cooked and eating out), transport (auto, metro, occasional ride-hail),
        personal care, and phone/internet. The "premium" tier adds higher discretionary
        spend, more frequent dining out, gym memberships, and similar costs.
      </P>
      <P>
        City differences are real and large. The same ₹12 LPA gross in Hyderabad leaves
        meaningfully more discretionary income than in Mumbai, primarily because rent is
        a fixed rupee cost, not a percentage of income. A 2BHK in central Mumbai at
        ₹45,000/month consumes a much larger fraction of in-hand than a comparable unit
        in Pune at ₹18,000/month. This calculator does not hardcode city benchmarks —
        it asks for your actual rent, which makes the output more useful than generic
        "cost of living" comparisons.
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

// ctcToInHand and hra are deliberately absent here: those two calculator
// pages already carry their own richer, collapsible educational sections
// (app/ctc-to-in-hand-calculator/page.tsx, app/hra-calculator/page.tsx) —
// this always-expanded block would just duplicate the same explanations
// (CTC vs gross vs in-hand; the three-part HRA test) a second time on the
// same page.
const EDITORIAL_MAP: Partial<Record<CalculatorSlug, React.ComponentType>> = {
  salary: SalaryEditorial,
  taxRegime: TaxRegimeEditorial,
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
