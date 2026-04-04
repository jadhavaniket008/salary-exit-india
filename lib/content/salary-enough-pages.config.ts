/**
 * “Is ₹X LPA enough in [city]?” — decision-intent SEO layer.
 * Add rows here to scale; scenario fields drive Salary Reality Check prefill + server-side preview.
 */

import type { LifestyleLevel } from "@/lib/config/salary-reality-heuristics";
import type { SeoPageMetadata } from "@/types/seo";

export type SalaryEnoughAnswerKind = "yes" | "no" | "depends";

export type SalaryEnoughPageConfig = {
  /** Path segment for /salary-enough/[slug] (canonical) */
  slug: string;
  seo: SeoPageMetadata;
  /** LPA number for copy (e.g. 10 for ₹10 LPA) */
  lpa: number;
  /** Annual gross CTC in INR */
  annualCtc: number;
  city: {
    id: string;
    name: string;
    /** Metro = higher commute heuristic in the calculator */
    metro: boolean;
  };
  monthlyRent: number;
  lifestyle: LifestyleLevel;
  /** Editorial verdict label — should align with the default scenario story */
  answerKind: SalaryEnoughAnswerKind;
  /** One line under the badge */
  answerHeadline: string;
  /** Opening paragraph after the headline */
  leadParagraph: string;
  /** Deeper “why” — human, city-specific */
  whyParagraph: string;
  /** Notes on what “typical” spend includes — not boilerplate */
  typicalSpendNotes: string[];
  /** Related in-hand landing slugs for internal linking */
  relatedLpaSlugs: string[];
  /** Primary reader / situation this page is written for */
  whoThisWorksFor: string;
  /** Plain-language: when the default scenario looks “enough” vs when it breaks */
  whenEnoughVsNot: string;
  /** Rent vs commute vs lifestyle tradeoffs */
  majorTradeoffs: string[];
  /** Micro-market, commute, or cost-culture notes for this city */
  cityRealityNotes: string[];
  /** Explicit single-earner vs household caveat */
  soloVsFamilyCaveat: string;
  faq: { question: string; answer: string }[];
};

export const SALARY_ENOUGH_PAGES: readonly SalaryEnoughPageConfig[] = [
  {
    slug: "is-10-lpa-good-in-bangalore",
    lpa: 10,
    annualCtc: 10_00_000,
    city: { id: "bangalore", name: "Bengaluru", metro: true },
    monthlyRent: 28_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹10 LPA enough in Bangalore? Rent, spend & savings reality check",
      description:
        "₹10 lakh CTC in Bengaluru: honest take on roommates vs solo rent, what “moderate” spend assumes, and a live Salary Reality Check with Bangalore-sized numbers — not generic SEO.",
      keywords: [
        "is 10 lpa enough in bangalore",
        "10 lakh salary bangalore living",
        "10 LPA Bangalore rent",
        "is 10 lpa good for bangalore",
      ],
    },
    answerHeadline: "Usually tight if you want a solo flat near work — workable with roommates or a longer commute.",
    leadParagraph:
      "Ten LPA is a real number in early-career hiring, but Bengaluru’s rent gradient is brutal: the same gross feels different in a shared PG vs a 1BHK in a core corridor. Below we fix one transparent scenario so you can see how fast rent eats in-hand.",
    whyParagraph:
      "We treat ₹10 LPA as annual gross (same as our CTC tools), then add a ₹28,000/month rent line — that’s not a luxury listing; it’s a plausible solo or small-unit ask in many parts of the city. If your rent is lower, or you’re splitting, the picture shifts immediately — use the embedded calculator to paste your real rent and lifestyle tier.",
    typicalSpendNotes: [
      "Rent is the swing factor: ₹28k/month is a common anchor for “I want my own place” — not a minimum for the whole city.",
      "Metro commute bands in the model assume longer trips and higher fares than a small town; that matches how many people actually move across Bengaluru.",
      "Groceries and “moderate” discretionary still assume you’re not carrying a family’s full medical or school costs on one salary.",
    ],
    relatedLpaSlugs: ["10-lpa-in-hand-salary", "12-lpa-in-hand-salary", "15-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Early-career tech or services hires comparing their first or second Bengaluru offer — especially if you’re single, splitting rent, or willing to commute. Less useful if you need a large family flat in a premium pincode on one income.",
    whenEnoughVsNot:
      "On our default, “enough” usually means roommates, lower rent, or a basic lifestyle tier — not a solo 1BHK next to the office on moderate spend. It stops looking enough when rent crosses what your gross can carry after tax/PF, or when you need premium discretionary plus high fixed rent.",
    majorTradeoffs: [
      "Solo flat vs shared housing: same gross, totally different rent line.",
      "Core corridors vs longer commute: rent drops, but time and fatigue rise — we only model money, not hours.",
      "Upgrading lifestyle tier in the tool from moderate to premium often wipes savings before anything else moves.",
    ],
    cityRealityNotes: [
      "Bengaluru’s rental market is hyper-local: two km can change rent more than a small CTC bump.",
      "Traffic and ride-hail can quietly eat cash even when “commute” is one line in the model.",
      "Many people optimize on PG/shared for years — comparing yourself to a friend’s family home budget is apples to oranges.",
    ],
    soloVsFamilyCaveat:
      "This scenario assumes one salary covering one adult’s modeled spend. A partner’s income, kids’ school fees, or parents to support are not in the sheet — bump rent or tier in the calculator to approximate a heavier household.",
    faq: [
      {
        question: "Is ₹10 LPA enough in Bangalore for a family?",
        answer:
          "This page models a single-earner heuristic. With dependents, school fees, or medical buffers, the same gross needs a different budget — raise rent, lifestyle tier, and expenses in the calculator to mirror your household.",
      },
      {
        question: "Why does my in-hand differ from your ₹10 LPA figure?",
        answer:
          "“LPA” is often quoted as CTC; we treat gross as taxable for illustration. If your Basic+DA split, bonuses, or variable pay differ, your payslip won’t match — tune Basic+DA % and regime in the embedded tool.",
      },
      {
        question: "Should I use this page for tax filing?",
        answer:
          "No. It’s a planning and decision view. Use Form 16, AIS, and a qualified professional for filing.",
      },
    ],
  },
  {
    slug: "is-12-lpa-good-in-bangalore",
    lpa: 12,
    annualCtc: 12_00_000,
    city: { id: "bangalore", name: "Bengaluru", metro: true },
    monthlyRent: 27_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹12 LPA good in Bangalore? Rent vs in-hand reality check",
      description:
        "₹12 lakh CTC in Bengaluru: ₹27k rent scenario, estimated in-hand and savings — pre-filled Salary Reality Check you can edit for your lease and lifestyle.",
      keywords: [
        "is 12 lpa good in bangalore",
        "12 lakh salary bangalore enough",
        "12 LPA Bengaluru rent",
        "is 12 lpa enough in bangalore",
      ],
    },
    answerHeadline:
      "Often workable with roommates or a modest solo setup — tight if you anchor on premium corridors or solo 1BHK asks.",
    leadParagraph:
      "Twelve LPA sits between early-career ₹10L bands and the more comfortable ₹15L+ stretch in Bengaluru. We anchor rent at ₹27,000/month — plausible for shared housing or a compact unit in many areas, but not for every “walk to office” fantasy.",
    whyParagraph:
      "Tax and PF still bite at ₹12L gross; rent is the swing line. If your real rent is lower, savings jump quickly — if it’s higher, the same gross stops feeling “good” fast. Use the embedded tool to paste your actual rent and tier.",
    typicalSpendNotes: [
      "₹27k rent + moderate tier assumes EMIs and big medical aren’t silently stacked on the same payslip.",
      "Metro commute in the model is heavier than a small town — matches many Bengaluru commutes.",
      "Variable pay as a large share of CTC makes monthly in-hand less predictable than this single scenario.",
    ],
    relatedLpaSlugs: ["12-lpa-in-hand-salary", "10-lpa-in-hand-salary", "15-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Campus hires and early switches evaluating Bengaluru offers, or anyone comparing ₹12L here vs another city — especially if you can optimize rent or don’t need a solo premium flat.",
    whenEnoughVsNot:
      "Enough when rent stays near this anchor (or lower) and spend stays moderate. Breaks when you need premium housing, are the sole earner for a household with school fees, or stack large loans on the same gross.",
    majorTradeoffs: [
      "PG/shared vs solo: same CTC, totally different monthly pressure.",
      "Core micro-markets vs commute: rent drops with distance — time cost isn’t priced in rupees here.",
      "Premium lifestyle tier in the tool erodes savings faster than most tax tweaks at this band.",
    ],
    cityRealityNotes: [
      "Two neighbourhoods with the same label on a map can rent ₹5k apart — verify listings, not vibes.",
      "Brokerage + deposit can compress month-one cash even when recurring rent looks fine.",
      "Hybrid work can make outer-ring rent viable — model your real office days, not 2019 norms.",
    ],
    soloVsFamilyCaveat:
      "Built around one earner’s moderate footprint. Dependents, school fees, or supporting parents need higher gross or lower rent — reflect that in the embed.",
    faq: [
      {
        question: "Is ₹12 LPA enough in Bangalore for a fresher?",
        answer:
          "Often yes with shared housing and moderate spend; less so if you target a solo flat in an expensive corridor. Tune rent in the calculator to your actual hunt.",
      },
      {
        question: "How does ₹12 LPA compare to ₹15 LPA in Bengaluru?",
        answer:
          "Open our ₹15 LPA Bengaluru page — same city notes, higher gross and a ₹30k rent illustration.",
      },
      {
        question: "Should I use this for tax filing?",
        answer:
          "No. Planning and education only — use Form 16 and a qualified professional for filing.",
      },
    ],
  },
  {
    slug: "is-15-lpa-good-in-pune",
    lpa: 15,
    annualCtc: 15_00_000,
    city: { id: "pune", name: "Pune", metro: true },
    monthlyRent: 20_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹15 LPA good in Pune? What it actually leaves after rent",
      description:
        "₹15 lakh CTC in Pune: a practical read on rent, commute, and discretionary cash — with a pre-filled Salary Reality Check and editable assumptions.",
      keywords: [
        "is 15 lpa good in pune",
        "15 lakh salary pune",
        "15 LPA Pune enough",
        "Pune rent salary 15L",
      ],
    },
    answerHeadline: "For many single earners in a moderate spend band — yes on paper, if rent stays realistic.",
    leadParagraph:
      "Pune isn’t Mumbai on rent, but it’s not “cheap” anymore in pockets that match IT corridors. We anchor rent at ₹20,000/month — think shared 2BHK or a compact solo place depending on micro-market — then layer the same lifestyle math as the rest of SalaryExit so you can compare cities honestly.",
    whyParagraph:
      "At ₹15 LPA gross, PF and tax still matter, but you’re not in the same squeeze as the ₹10 LPA + solo Bangalore story. The catch is lifestyle creep: if you’re dining out like you’re on a higher band, or commuting long distances, discretionary disappears. The calculator below is built so you can drag rent and discretionary to match how you actually live.",
    typicalSpendNotes: [
      "₹20k rent is a middle-ground illustration — Hinjewadi vs Koregaon Park vs a longer commute can swing it by thousands.",
      "“Moderate” discretionary is where people overshoot: subscriptions, weekend trips, and vehicle costs aren’t itemized separately here.",
      "If you’re paying EMIs on top of rent, this model doesn’t capture debt — add pressure by lowering discretionary in the tool.",
    ],
    relatedLpaSlugs: ["15-lpa-in-hand-salary", "18-lpa-in-hand-salary", "12-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Mid-junior professionals in Pune’s IT/manufacturing corridors who want a sanity check on rent vs in-hand — especially singles or couples where one salary sets the budget floor.",
    whenEnoughVsNot:
      "At ₹15 LPA with our ₹20k rent anchor, many single earners still see modeled savings on a moderate tier. It starts to fail when rent mimics Mumbai-lite pockets, when you run a car+EMI stack, or when you slide to premium spend without noticing.",
    majorTradeoffs: [
      "Hinjewadi vs city-side: rent and commute length trade off sharply.",
      "Eating out and weekend travel are the silent budget killers at this band — discretionary is one aggregated line in the model.",
      "Choosing a bigger flat for “future family” early can lock you into rent that your current gross doesn’t justify.",
    ],
    cityRealityNotes: [
      "Pune’s pockets vary: some corridors behave like stretched metros; others still allow shorter commutes for the same rent.",
      "Fuel and parking matter if you drive daily — not broken out separately here.",
      "If your office is hybrid, you might spend less on commute than the metro band assumes — edit the commute line.",
    ],
    soloVsFamilyCaveat:
      "Written for one earner’s cash flow. Dual-income households should not read “yes on paper” as permission for a family-sized rent on this salary alone — combine household numbers or run two passes in the tool.",
    faq: [
      {
        question: "Is ₹15 LPA good in Pune for a couple?",
        answer:
          "Two earners change the story entirely. This page assumes one salary. For dual income, split rent across household cash flow and run the calculator twice if needed.",
      },
      {
        question: "Why metro is checked for Pune?",
        answer:
          "The Salary Reality Check uses a higher commute band in metro mode for the modeled commute line — that’s a blunt city-size heuristic, not a political map.",
      },
      {
        question: "How do I compare Pune vs Bangalore on the same salary?",
        answer:
          "Match gross, regime, and lifestyle tier, then change only rent and metro — you’ll see how much rent drives the verdict.",
      },
    ],
  },
  {
    slug: "is-20-lpa-enough-in-bangalore",
    lpa: 20,
    annualCtc: 20_00_000,
    city: { id: "bangalore", name: "Bengaluru", metro: true },
    monthlyRent: 35_000,
    lifestyle: "moderate",
    answerKind: "yes",
    seo: {
      title: "Is ₹20 LPA enough in Bangalore? Savings after rent (realistic model)",
      description:
        "₹20 lakh CTC in Bengaluru: see estimated in-hand, modeled spend, and savings — with a pre-filled Salary Reality Check you can edit for your rent and lifestyle.",
      keywords: [
        "is 20 lpa enough in bangalore",
        "20 LPA Bangalore salary",
        "20 lakh salary bangalore savings",
        "is 20 lpa good in bangalore",
      ],
    },
    answerHeadline: "For a single earner on moderate spend with a realistic rent — usually yes on this model.",
    leadParagraph:
      "Twenty LPA is often where people start asking for “enough” rather than “survive.” At ₹35,000/month rent — a believable solo or small-family ask in many parts of Bengaluru — you’re still in the conversation for savings if the rest of your spend matches the moderate tier.",
    whyParagraph:
      "We’re not promising a luxury listing or a school-fee-heavy household. The point is: at ₹20 LPA gross, tax and PF take a bite, but you’re not automatically in the red after rent and modeled essentials. If your rent is lower, or you’re splitting, the margin improves; if you’re on premium lifestyle spend, the verdict flips fast — that’s why the tool is editable.",
    typicalSpendNotes: [
      "₹35k rent is a deliberate stress: higher than a roommate setup, lower than some premium towers.",
      "Moderate discretionary still assumes you’re not funding big EMI stacks outside this sheet.",
      "Commute is modeled as metro-band — if you’re fully remote, you might trim commute in the expense lines.",
    ],
    relatedLpaSlugs: ["20-lpa-in-hand-salary", "18-lpa-in-hand-salary", "25-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Individual contributors and leads evaluating Bengaluru offers where ₹20 LPA is the headline — especially if you want a realistic solo-rent story before you negotiate.",
    whenEnoughVsNot:
      "With ₹35k rent and moderate spend, many single earners still see headroom on this model. It flips when you insist on premium lifestyle, add large EMIs, or need school-plus-rent on one salary — then “enough” needs a higher gross or lower fixed costs.",
    majorTradeoffs: [
      "Higher rent for shorter commute vs cheaper rent and hours lost on the road.",
      "Lifestyle inflation at ₹20 LPA: easy to spend like ₹30 LPA on weekends.",
      "Tax and PF scale with gross — comparing take-home to rent directly misleads you.",
    ],
    cityRealityNotes: [
      "₹35k is a stress-test rent, not a city minimum — shared setups or outer areas can be materially cheaper.",
      "Some clusters price like premium micro-markets; always anchor to your actual pincode hunt.",
      "If you’re fully remote, you may beat the modeled commute — adjust the expense line.",
    ],
    soloVsFamilyCaveat:
      "Fine for one working adult or a couple with one primary earner if expenses stay moderate. Add dependents, international school, or elder care, and you should raise the lifestyle tier and rent in the embedded tool — this page won’t reflect that by default.",
    faq: [
      {
        question: "Is ₹20 LPA enough in Bangalore with a car loan?",
        answer:
          "Not modeled here. Lower discretionary or add a rough EMI to your mental budget — or reduce the rent line in the calculator to reflect what you can truly afford.",
      },
      {
        question: "Why does my savings number look small?",
        answer:
          "Tax, PF, and TDS on ₹20 LPA gross are real. If you expected “half of gross” in-hand, you’re overestimating — compare with the CTC→in-hand calculator for your exact splits.",
      },
      {
        question: "Can I use this for an offer negotiation?",
        answer:
          "Use it as a directional story: “At this gross, rent X and lifestyle Y leaves me roughly Z.” It’s not a payslip.",
      },
    ],
  },
  {
    slug: "is-25-lpa-good-in-hyderabad",
    lpa: 25,
    annualCtc: 25_00_000,
    city: { id: "hyderabad", name: "Hyderabad", metro: true },
    monthlyRent: 28_000,
    lifestyle: "moderate",
    answerKind: "yes",
    seo: {
      title: "Is ₹25 LPA good in Hyderabad? In-hand vs rent & lifestyle (check)",
      description:
        "₹25 lakh CTC in Hyderabad: estimated savings after rent and a moderate spend model — with Salary Reality Check pre-filled and editable.",
      keywords: [
        "is 25 lpa good in hyderabad",
        "25 lakh salary hyderabad",
        "25 LPA Hyderabad living",
        "Hyderabad salary 25 LPA enough",
      ],
    },
    answerHeadline: "On typical moderate spend and a mid-range rent — generally strong headroom.",
    leadParagraph:
      "Hyderabad shows up in offer comparisons for a reason: many people find rent and commute a bit less punishing than a few other metros at similar gross. At ₹25 LPA, you’re past the “will I survive?” band for most single-earner moderate budgets — the real question is whether the lifestyle tier matches your actual spending.",
    whyParagraph:
      "We set rent at ₹28,000/month — not a floor, not a ceiling — then layer the same moderate grocery, commute, utilities, and discretionary bands as elsewhere. If you’re upgrading to premium every weekend, you’ll feel broke on any gross; if you’re disciplined, this band usually leaves room for goals on paper.",
    typicalSpendNotes: [
      "₹28k rent is illustrative for a decent solo or shared setup in several corridors — your micro-market matters.",
      "At ₹25 LPA gross, tax and PF still matter — don’t compare gross to rent directly.",
      "If you have dependents, treat “moderate” as a starting point — not a family budget.",
    ],
    relatedLpaSlugs: ["25-lpa-in-hand-salary", "20-lpa-in-hand-salary", "30-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Experienced ICs and managers cross-shopping Hyderabad against other metros — especially if you want a read on savings after rent at a mid–upper band without sugar-coating.",
    whenEnoughVsNot:
      "At ₹25 LPA with ₹28k rent and moderate spend, the model usually still shows meaningful savings for a single earner. It stops being “enough” if you anchor to luxury rent, run heavy EMIs, or model a premium lifestyle you don’t actually fund today.",
    majorTradeoffs: [
      "Gachibowdi vs central corridors: rent and commute time don’t move in sync.",
      "Lifestyle creep at this band is optional — the tool is blunt about discretionary.",
      "Long-term wealth goals (house, education) may need a higher savings rate than “moderate” implies.",
    ],
    cityRealityNotes: [
      "Hyderabad is often cited as relatively gentler on rent vs a few metros at the same gross — your actual listing still wins over vibes.",
      "Office location vs home base drives real commute cost; the metro band is an average.",
      "If you’re an NRI return or shifting family, school deposits can dwarf the discretionary line — plan outside this sheet.",
    ],
    soloVsFamilyCaveat:
      "Stronger for singles or DINK households on one moderate budget. With kids and international schooling, treat this as a floor scenario — raise rent and tier, or add a second income explicitly in your own spreadsheet.",
    faq: [
      {
        question: "Is ₹25 LPA good in Hyderabad vs Bangalore?",
        answer:
          "Same gross doesn’t mean same city costs. Run two scenarios: change rent and metro only, keep lifestyle tier constant — then compare savings and verdict.",
      },
      {
        question: "Does old regime change the answer?",
        answer:
          "It can change in-hand. Flip regime in the embedded calculator if you claim deductions — this page defaults to new regime for a common offer baseline.",
      },
      {
        question: "What if I’m saving for a house down payment?",
        answer:
          "Treat this as monthly cash after modeled spend. You can add a mental “savings goal” by lowering discretionary in the tool to see what’s left.",
      },
    ],
  },
  {
    slug: "is-12-lpa-good-in-hyderabad",
    lpa: 12,
    annualCtc: 12_00_000,
    city: { id: "hyderabad", name: "Hyderabad", metro: true },
    monthlyRent: 22_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹12 LPA good in Hyderabad? Rent vs in-hand on a realistic budget",
      description:
        "₹12 lakh CTC in Hyderabad: how far moderate rent and spend go — Salary Reality Check pre-filled for typical IT-corridor assumptions you can edit.",
      keywords: [
        "is 12 lpa good in hyderabad",
        "12 lakh salary hyderabad",
        "12 LPA Hyderabad rent",
        "Hyderabad 12 LPA living",
      ],
    },
    answerHeadline:
      "Often workable for singles sharing or living a bit farther out — less so if you want premium solo rent in a pricey micro-market.",
    leadParagraph:
      "Twelve LPA sits between “first offer” and “first switch” for many Hyderabad roles. We anchor rent at ₹22,000/month — think shared 2BHK or a compact solo unit depending on corridor — then show what’s left after tax/PF and modeled moderate spend.",
    whyParagraph:
      "Hyderabad isn’t uniform: Gachibowdi vs older city pockets can feel like different rent planets. This page doesn’t pick your pincode — it gives you a transparent baseline so you can swap rent and discretionary to match your actual hunt.",
    typicalSpendNotes: [
      "₹22k rent is a middle-ground illustration, not a floor — outer corridors can be cheaper; some towers won’t be.",
      "Metro commute band captures longer trips; hybrid work may let you beat that line by editing commute.",
      "“Moderate” still assumes one adult’s discretionary — not a school-fee-heavy household.",
    ],
    relatedLpaSlugs: ["12-lpa-in-hand-salary", "15-lpa-in-hand-salary", "10-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Early-career hires in tech or GCC roles comparing Hyderabad to another city, or locals upgrading from PG life to a first proper lease.",
    whenEnoughVsNot:
      "Enough on this model usually means tolerable rent and staying on moderate spend. It breaks when you anchor to luxury solo listings, add big EMIs, or jump to premium lifestyle without a gross jump.",
    majorTradeoffs: [
      "Shorter commute vs lower rent: pick one on paper before you sign a deposit.",
      "Newer society vs older stock: maintenance and deposits don’t show up as separate lines here.",
      "Weekend spend can erase the margin faster than tax tweaks — discretionary is one bucket in the tool.",
    ],
    cityRealityNotes: [
      "IT corridor rents move with demand cycles — compare listings, not vibes from two years ago.",
      "School proximity can dominate family budgets — not modeled as its own line.",
      "If you’re comparing to Bengaluru on the same gross, Hyderabad often wins on rent — but your offer’s variable pay still matters.",
    ],
    soloVsFamilyCaveat:
      "Optimized for one earner, one moderate budget. A non-working partner or kids shifts the story — raise tier or rent in the calculator instead of trusting the headline alone.",
    faq: [
      {
        question: "Is ₹12 LPA enough in Hyderabad for a fresher?",
        answer:
          "Often yes in a shared setup; solo in a pricey tower is harder. Use the embedded tool with your actual rent offer letter numbers.",
      },
      {
        question: "Why is my rent different from ₹22,000?",
        answer:
          "It’s an illustration. Replace the rent field with your quote — the verdict updates instantly.",
      },
      {
        question: "Does this include HRA or old regime savings?",
        answer:
          "In-hand uses the new regime by default in the embed. Flip regime there if your deduction mix is different.",
      },
    ],
  },
  {
    slug: "is-15-lpa-good-in-hyderabad",
    lpa: 15,
    annualCtc: 15_00_000,
    city: { id: "hyderabad", name: "Hyderabad", metro: true },
    monthlyRent: 24_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹15 LPA good in Hyderabad? Savings after rent (moderate spend model)",
      description:
        "₹15 lakh CTC in Hyderabad: estimated in-hand vs modeled rent and lifestyle — editable Salary Reality Check with city-appropriate defaults.",
      keywords: [
        "is 15 lpa good in hyderabad",
        "15 lakh salary hyderabad",
        "15 LPA Hyderabad enough",
        "Hyderabad salary 15 LPA",
      ],
    },
    answerHeadline:
      "For many single earners at moderate rent — plausible savings on paper; tight if you chase premium housing alone.",
    leadParagraph:
      "Fifteen LPA is a common mid-junior band. We set rent at ₹24,000/month — realistic for shared premium society or a modest solo in several corridors — then stress-test groceries, commute, utilities, and discretionary against estimated in-hand.",
    whyParagraph:
      "The point isn’t to bless your offer — it’s to show how fast fixed rent consumes gross once PF and tax apply. Hyderabad often compares favourably to a few metros at the same headline, but your listing and EMI stack still decide your real life.",
    typicalSpendNotes: [
      "₹24k rent pairs with moderate tier — not a family-with-two-kids budget.",
      "If you drive daily, fuel may bite harder than the commute line suggests — trim discretionary to simulate.",
      "Bonuses and variable pay aren’t smoothed here; we use annual gross as one number.",
    ],
    relatedLpaSlugs: ["15-lpa-in-hand-salary", "18-lpa-in-hand-salary", "12-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Engineers and ops roles evaluating Hyderabad against a counter-offer, or returning to India and sanity-checking cash flow.",
    whenEnoughVsNot:
      "Usually enough on this model when rent stays near the anchor and lifestyle stays moderate. It falters when you pair high society rent with premium tier spend, or carry large loans outside the sheet.",
    majorTradeoffs: [
      "Location vs square footage: same rent, different peace of mind.",
      "Building amenities vs cash buffer: society pools don’t appear as a line item — they’re in rent.",
      "Tax regime: new vs old can swing in-hand — verify in the embed if you claim heavy deductions.",
    ],
    cityRealityNotes: [
      "Micro-markets near major IT parks price in a premium even when the map says “suburban.”",
      "Some employers cluster shuttles — that can reduce out-of-pocket commute vs the default band.",
      "If you’re comparing to Pune or Chennai, match gross and tier before comparing rent folklore.",
    ],
    soloVsFamilyCaveat:
      "Written for a single primary earner. Dual-income couples should merge budgets; parents-plus-kids households should raise the lifestyle tier to approximate real food and fee load.",
    faq: [
      {
        question: "Is ₹15 LPA a good salary in Hyderabad in 2025?",
        answer:
          "It’s a solid mid band for many roles — whether it’s “good” for you depends on rent, loans, and dependents. Use the numbers below, not headlines.",
      },
      {
        question: "How does Hyderabad compare to Bangalore at ₹15 LPA?",
        answer:
          "Run our Bengaluru ₹15 LPA page or change only rent in the tool — city swap is rarely an apples-to-apples story.",
      },
      {
        question: "Can I afford a car on this model?",
        answer:
          "EMIs aren’t modeled. If you add a car loan, lower discretionary or rent in the calculator to see what breaks first.",
      },
    ],
  },
  {
    slug: "is-18-lpa-good-in-pune",
    lpa: 18,
    annualCtc: 18_00_000,
    city: { id: "pune", name: "Pune", metro: true },
    monthlyRent: 24_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹18 LPA good in Pune? What’s left after tax, rent & moderate spend",
      description:
        "₹18 lakh CTC in Pune: rent anchor, in-hand estimate, and Salary Reality Check — tune rent and tier to your actual flat hunt.",
      keywords: [
        "is 18 lpa good in pune",
        "18 lakh salary pune",
        "18 LPA Pune rent",
        "Pune salary 18 LPA enough",
      ],
    },
    answerHeadline:
      "Typically workable for singles at moderate rent; gets tight fast if you spend like a premium Mumbai micro-market on a Pune payslip.",
    leadParagraph:
      "Eighteen LPA is where tax brackets start to pinch more visibly. We use ₹24,000/month rent — common for a shared 2BHK in several IT belts or a smaller solo — then map the rest through the same moderate lifestyle table as other SalaryExit pages.",
    whyParagraph:
      "Pune’s story is uneven: some pockets still feel like stretched townships; others behave like mini-metros on rent. This page refuses to pick your society for you — it gives a baseline you can overwrite with your broker’s number.",
    typicalSpendNotes: [
      "₹24k may be low for a premium solo in a few towers — raise rent in the tool if that’s your reality.",
      "Weekend Lonavala runs and dining out hit discretionary — one line in the model.",
      "If you’re paying education loans, treat discretionary as already spoken for.",
    ],
    relatedLpaSlugs: ["18-lpa-in-hand-salary", "15-lpa-in-hand-salary", "20-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Mid-level ICs and tech leads who’ve outgrown ₹12–15L bands but aren’t yet negotiating ₹25L+ — especially if you’re weighing Pune stability vs a metro move.",
    whenEnoughVsNot:
      "Enough when rent stays disciplined and lifestyle doesn’t mimic a higher gross. Not enough when you size a flat for a future family you don’t yet fund, or when EMIs stack on top of this rent.",
    majorTradeoffs: [
      "Hinjewadi length vs Kharadi buzz: different rent and different fatigue.",
      "Buying vs renting: EMI vs deposit isn’t modeled — don’t confuse this rent line with home loan math.",
      "One big international trip a year can look like “moderate” in your head but not in cash flow.",
    ],
    cityRealityNotes: [
      "Traffic patterns changed post-hybrid — your commute may be better or worse than the metro band assumes.",
      "Parking and society charges sometimes sit outside “rent” in real life — buffer mentally.",
      "If your office offers transport, you might beat the commute expense line.",
    ],
    soloVsFamilyCaveat:
      "Assumes one earner’s moderate footprint. If spouse works, combine incomes before you pick school districts.",
    faq: [
      {
        question: "Is ₹18 LPA enough in Pune with parents living with me?",
        answer:
          "Household costs rise with more adults — increase groceries and utilities in the calculator, or bump tier if needed.",
      },
      {
        question: "Why moderate lifestyle?",
        answer:
          "It’s a common comparison baseline. Switch to premium in the embed if your spend matches that band.",
      },
      {
        question: "Should I negotiate for ₹20 LPA instead?",
        answer:
          "Compare scenarios: raise gross in the tool and see how much savings move — then decide if the switch cost is worth it.",
      },
    ],
  },
  {
    slug: "is-20-lpa-good-in-pune",
    lpa: 20,
    annualCtc: 20_00_000,
    city: { id: "pune", name: "Pune", metro: true },
    monthlyRent: 28_000,
    lifestyle: "moderate",
    answerKind: "yes",
    seo: {
      title: "Is ₹20 LPA good in Pune? Solo rent & savings on a moderate model",
      description:
        "₹20 lakh CTC in Pune: modeled savings after ₹28k rent and moderate spend — Salary Reality Check with editable lines.",
      keywords: [
        "is 20 lpa good in pune",
        "20 lakh salary pune",
        "20 LPA Pune enough",
        "Pune 20 LPA lifestyle",
      ],
    },
    answerHeadline:
      "On this rent and moderate spend, many single earners still see healthy modeled savings — if loans don’t eat the gap.",
    leadParagraph:
      "Twenty LPA in Pune often buys breathing room that the same gross struggles to offer in Mumbai’s rental market. We anchor ₹28,000/month rent — a fair solo or compact family ask in several corridors — then show what remains after statutory deductions and modeled spend.",
    whyParagraph:
      "We’re not claiming you’ll live in Koregaon Park on this alone — we’re saying the arithmetic can work on paper when rent and tier stay honest. Upgrade lifestyle to premium without upgrading gross and the story changes overnight.",
    typicalSpendNotes: [
      "₹28k targets a practical solo or young-couple flat, not a sea-view fantasy.",
      "Car ownership + weekend travel can erase savings faster than a tax tweak.",
      "If you’re saving for a flat’s down payment, treat modeled savings as a ceiling, not a plan.",
    ],
    relatedLpaSlugs: ["20-lpa-in-hand-salary", "18-lpa-in-hand-salary", "25-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Senior ICs and small-team leads who want Pune’s pace without Mumbai’s rent sticker shock — or remote workers optimizing for quality of life.",
    whenEnoughVsNot:
      "Usually enough on this model for moderate spend. Breaks when rent chases Mumbai, or when discretionary scales with peer pressure instead of payslip.",
    majorTradeoffs: [
      "Closer office vs quieter neighbourhood: rent vs commute time.",
      "International school later vs affordable rent now: don’t lock rent you can’t exit.",
      "PF and tax rise with gross — net doesn’t scale linearly.",
    ],
    cityRealityNotes: [
      "Monsoon maintenance and society bills can surprise new tenants — keep a buffer.",
      "Some IT parks are far from city culture; that’s either savings or Uber receipts.",
      "Pune’s not “cheap” everywhere — match your micro-market before celebrating.",
    ],
    soloVsFamilyCaveat:
      "Works on paper for one moderate earner or a couple with one income driving the lease. Big school fees need their own math outside this default.",
    faq: [
      {
        question: "Is ₹20 LPA good in Pune vs Mumbai?",
        answer:
          "Open our Mumbai pages at similar gross or move rent in the tool — city is mostly rent and commute, not magic.",
      },
      {
        question: "What if I get ₹20 LPA but huge variable pay?",
        answer:
          "We annualize gross as stated. If variable is uncertain, stress-test lower in-hand mentally.",
      },
      {
        question: "Can I upgrade to premium lifestyle on ₹20 LPA?",
        answer:
          "Try premium tier in the embed — you’ll see how fast savings vanish.",
      },
    ],
  },
  {
    slug: "is-15-lpa-good-in-bangalore",
    lpa: 15,
    annualCtc: 15_00_000,
    city: { id: "bangalore", name: "Bengaluru", metro: true },
    monthlyRent: 30_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹15 LPA good in Bangalore? Rent pressure vs moderate spend (check)",
      description:
        "₹15 lakh CTC in Bengaluru: ₹30k rent scenario, estimated in-hand, and Salary Reality Check — edit rent to match your corridor.",
      keywords: [
        "is 15 lpa good in bangalore",
        "15 lakh salary bangalore",
        "15 LPA Bangalore rent",
        "Bengaluru 15 LPA enough",
      ],
    },
    answerHeadline:
      "Often tight for solo renters in central pockets — workable with sharing, outer areas, or a disciplined moderate tier.",
    leadParagraph:
      "Fifteen LPA is a crowded band in Bengaluru hiring — many people land here between campus and first switch. We stress-test ₹30,000/month rent against moderate lifestyle spend; that rent is plausible for a compact solo or shared 2BHK in several corridors, but not for every pincode fantasy.",
    whyParagraph:
      "Bengaluru punishes distance: the same gross feels different in a PG near work vs a solo flat with a long cab ride. This page won’t validate your Instagram feed — it shows whether modeled cash flow closes after PF, tax, and our spend bands.",
    typicalSpendNotes: [
      "₹30k rent + moderate tier assumes you’re not also funding big EMIs off-sheet.",
      "Groceries scale slower than rent — rent is the lever that moves verdict fastest.",
      "If you’re on variable-heavy CTC, treat in-hand as directional.",
    ],
    relatedLpaSlugs: ["15-lpa-in-hand-salary", "12-lpa-in-hand-salary", "18-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Mid-junior tech and product folks comparing Bengaluru offers or negotiating a bump from ₹12L — especially if you’re deciding between solo dignity and shared savings.",
    whenEnoughVsNot:
      "Enough when rent stays near the anchor or lower, and lifestyle stays moderate. Not enough when you insist on premium housing, premium tier spend, or heavy loans on the same gross.",
    majorTradeoffs: [
      "Koramangala convenience vs Whitefield rent — same city, different maths.",
      "Cab budget vs sleep: not priced separately — fold into commute or discretionary mentally.",
      "Switching to premium tier in the tool is cheaper than switching jobs — try it before you panic.",
    ],
    cityRealityNotes: [
      "Traffic volatility makes “5 km” a meaningless number — time cost isn’t in rupees here.",
      "Deposit + brokerage upfront can stress cash before month-one rent — plan liquidity separately.",
      "Many teams are hybrid — you might afford outer rent if office days are few.",
    ],
    soloVsFamilyCaveat:
      "Modeled for one earner’s moderate footprint. Kids or a non-working partner usually need a higher gross or lower rent — adjust tier and rent in the embed.",
    faq: [
      {
        question: "Is ₹15 LPA enough in Bangalore for a couple?",
        answer:
          "Possible with two incomes or very lean rent. On one salary, raise rent/tier in the tool until the story matches your lease hunt.",
      },
      {
        question: "Why ₹30,000 rent?",
        answer:
          "It’s an illustration for many mid-corridor listings — replace with your actual quote.",
      },
      {
        question: "How does this compare to Hyderabad at ₹15 LPA?",
        answer:
          "Open our Hyderabad ₹15L page — same gross, different rent anchor and city notes.",
      },
    ],
  },
  {
    slug: "is-25-lpa-good-in-bangalore",
    lpa: 25,
    annualCtc: 25_00_000,
    city: { id: "bangalore", name: "Bengaluru", metro: true },
    monthlyRent: 40_000,
    lifestyle: "moderate",
    answerKind: "yes",
    seo: {
      title: "Is ₹25 LPA good in Bangalore? Higher rent, still room to save (model)",
      description:
        "₹25 lakh CTC in Bengaluru: ₹40k rent stress-test, in-hand vs spend — Salary Reality Check pre-filled, fully editable.",
      keywords: [
        "is 25 lpa good in bangalore",
        "25 lakh salary bangalore",
        "25 LPA Bengaluru rent",
        "Bangalore 25 LPA savings",
      ],
    },
    answerHeadline:
      "At ₹40k rent and moderate spend, many earners still see modeled savings — luxury spend is what erases the gap.",
    leadParagraph:
      "Twenty-five LPA is a serious gross — but Bengaluru can eat it with rent alone if you let it. We deliberately set rent at ₹40,000/month to mimic a decent solo or small-family flat in many desirable corridors, then ask whether moderate lifestyle spend still leaves cushion after tax and PF.",
    whyParagraph:
      "This isn’t a flex post — it’s arithmetic. If your rent is lower, you’ll beat our default; if you’re shopping premium towers while dining out every night, you’ll feel poor on ₹40L too. The embedded calculator is where your real numbers belong.",
    typicalSpendNotes: [
      "₹40k rent is a stress test, not a universal truth — outer rings can be half that.",
      "International school + this rent on one salary is a different book — not this default.",
      "EMIs for car/home aren’t in the expense grid — mentally subtract them from savings.",
    ],
    relatedLpaSlugs: ["25-lpa-in-hand-salary", "20-lpa-in-hand-salary", "30-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Senior ICs and leads negotiating Bengaluru packages who want a blunt rent-vs-savings read before they sign a lease.",
    whenEnoughVsNot:
      "Usually enough on this model for moderate spend at this rent. Stops being enough when lifestyle goes premium across the board, or when EMIs rival rent.",
    majorTradeoffs: [
      "Prestige address vs investable surplus — pick consciously.",
      "Closer office vs quieter home: Bengaluru forces this trade daily.",
      "Gross envy: ₹25L in-hand is not ₹25L/12 — tax and PF matter in every corridor.",
    ],
    cityRealityNotes: [
      "Some societies quote “all-inclusive” — compare apples to apples with your broker.",
      "School waitlists can push families to rent before purchase — that’s liquidity stress beyond this sheet.",
      "If you’re fully remote, you might not need the metro commute band — edit commute.",
    ],
    soloVsFamilyCaveat:
      "Works for one strong earner or a couple budgeting on one primary salary at moderate tier. Multigenerational or international-school households should rerun with premium tier and higher rent.",
    faq: [
      {
        question: "Is ₹25 LPA a good salary in Bangalore today?",
        answer:
          "It’s upper-mid for many tech tracks — “good” is whether your rent and goals fit. Use the verdict and embed, not LinkedIn noise.",
      },
      {
        question: "What if my rent is only ₹28,000?",
        answer:
          "You’ll likely beat our modeled savings — plug ₹28k into the calculator.",
      },
      {
        question: "Does this include bonus?",
        answer:
          "We model annual gross as one number. If bonus is uncertain, don’t bank it into rent.",
      },
    ],
  },
  {
    slug: "is-20-lpa-good-in-mumbai",
    lpa: 20,
    annualCtc: 20_00_000,
    city: { id: "mumbai", name: "Mumbai", metro: true },
    monthlyRent: 42_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹20 LPA good in Mumbai? Rent reality vs in-hand (honest model)",
      description:
        "₹20 lakh CTC in Mumbai: high-rent scenario, Salary Reality Check with editable rent and spend — see if anything is left after the city premium.",
      keywords: [
        "is 20 lpa good in mumbai",
        "20 lakh salary mumbai",
        "20 LPA Mumbai rent",
        "Mumbai salary 20 LPA enough",
      ],
    },
    answerHeadline:
      "Often tight: Mumbai rent eats gross faster than most inland cities — sharing or outer suburbs helps; solo premium pockets hurt.",
    leadParagraph:
      "Twenty LPA sounds strong until you line up a ₹42,000/month rent — plausible for a compact solo or shared flat in several connected suburbs, still shy of posh island premiums. We pair that with moderate lifestyle spend so you can see where the money actually goes after tax and PF.",
    whyParagraph:
      "Mumbai isn’t “India average” — it’s a different rent game. This page doesn’t shame your choices; it shows how little discretionary survives when fixed rent is high and gross is only ₹20L. Drop rent in the tool if your broker can do better.",
    typicalSpendNotes: [
      "₹42k won’t cover every “dream” listing — it’s a blunt mid–upper rental anchor.",
      "Local train vs cab changes real life more than one commute line — adjust mentally.",
      "Society deposits and maintenance hit cash before month one — not modeled.",
    ],
    relatedLpaSlugs: ["20-lpa-in-hand-salary", "18-lpa-in-hand-salary", "25-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Professionals weighing Mumbai’s career upside against rent pain — especially first-time renters coming from cheaper cities.",
    whenEnoughVsNot:
      "Enough when rent is negotiated down, shared, or offset by a second income. Not enough when you try island-adjacent solo luxury on one ₹20L gross with premium spend.",
    majorTradeoffs: [
      "Island vs mainland: rent and commute trade off brutally.",
      "Roommate compatibility vs privacy — financial, not emotional, in this sheet.",
      "Career network in Mumbai vs higher savings elsewhere — the calculator won’t value prestige.",
    ],
    cityRealityNotes: [
      "Brokerage norms differ — budget 1–2 months extra in year one.",
      "Monsoon and building age affect upkeep — rent isn’t the only leak.",
      "If your office is in BKC but you sleep in Navi Mumbai, your hours matter as much as rupees.",
    ],
    soloVsFamilyCaveat:
      "Harder on one salary with kids at this rent — dual income or outer-ring rent is common. Model your household in the embed.",
    faq: [
      {
        question: "Is ₹20 LPA enough in Mumbai for a family?",
        answer:
          "Often only with lower rent, outer areas, or two earners. Raise rent/tier in the calculator for your situation.",
      },
      {
        question: "Why is rent so high in the default?",
        answer:
          "Mumbai’s market justifies a higher anchor than Pune or Hyderabad — still replace with your offer.",
      },
      {
        question: "Should I take a lower role elsewhere for savings?",
        answer:
          "That’s life planning, not tax math — we only show cash flow under stated assumptions.",
      },
    ],
  },
  {
    slug: "is-30-lpa-good-in-mumbai",
    lpa: 30,
    annualCtc: 30_00_000,
    city: { id: "mumbai", name: "Mumbai", metro: true },
    monthlyRent: 52_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹30 LPA good in Mumbai? Upper-mid gross vs Mumbai rent (check)",
      description:
        "₹30 lakh CTC in Mumbai: ₹52k rent scenario, in-hand and savings model — surcharge and perks not fully modeled; use for direction.",
      keywords: [
        "is 30 lpa good in mumbai",
        "30 lakh salary mumbai",
        "30 LPA Mumbai rent",
        "Mumbai 30 LPA lifestyle",
      ],
    },
    answerHeadline:
      "Better breathing room than ₹20L, but Mumbai still charges a ‘city tax’ in rent — premium spend finishes the margin.",
    leadParagraph:
      "Thirty LPA is a serious gross, yet Mumbai can make it feel ordinary once you price a family-sized flat or a sea-adjacent dream. We use ₹52,000/month rent — think upgraded solo or young family flat in many suburbs, not every sea-view listing — then stack moderate lifestyle spend on top.",
    whyParagraph:
      "SalaryExit’s engine doesn’t model surcharge or every high-income tax wrinkle — treat outputs as directional. Even so, you’ll see how rent dominates the story: lower rent or leaner tier beats a slightly higher gross in another city if savings are the goal.",
    typicalSpendNotes: [
      "At ₹30L, tax complexity rises — compare with CTC→in-hand for your exact structure.",
      "₹52k may be low for premium island micro-markets — raise rent if that’s your hunt.",
      "Kids’ fees and help at home aren’t line items — family users should bump tier.",
    ],
    relatedLpaSlugs: ["30-lpa-in-hand-salary", "25-lpa-in-hand-salary", "20-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Senior ICs and managers benchmarking Mumbai against Bengaluru or NCR packages — or locals upgrading flat size after a promotion.",
    whenEnoughVsNot:
      "Usually workable on paper at this rent and moderate spend if loans stay sane. Breaks when rent chases trophy addresses, or lifestyle silently tracks ₹50L peers.",
    majorTradeoffs: [
      "Space vs location: Mumbai forces the choice early.",
      "International school vs savings rate — pick explicitly.",
      "Long commutes vs mental health — money is only one cost.",
    ],
    cityRealityNotes: [
      "Stamp duty and deposit norms differ — don’t confuse monthly rent with move-in cash.",
      "Monsoon flooding risk can price certain pockets — research beats vibes.",
      "If you’re expat-return, rupee rent may still shock — anchor to local listings.",
    ],
    soloVsFamilyCaveat:
      "More workable for DINK or one-child households at moderate tier than for big-school-fee scenarios — tune the embedded calculator aggressively for your fees and rent.",
    faq: [
      {
        question: "Is ₹30 LPA a high salary in Mumbai?",
        answer:
          "It’s strong nationally; in Mumbai it buys comfort, not automatic luxury — rent decides.",
      },
      {
        question: "Why mention surcharge?",
        answer:
          "At ₹30L gross, real tax can exceed this simplified engine — validate with a tax advisor for filing.",
      },
      {
        question: "Can I afford two kids’ schools on this model?",
        answer:
          "School fees vary wildly — this page doesn’t itemize them; increase discretionary or add a manual buffer.",
      },
    ],
  },
  {
    slug: "is-12-lpa-good-in-noida",
    lpa: 12,
    annualCtc: 12_00_000,
    city: { id: "noida", name: "Noida (NCR)", metro: true },
    monthlyRent: 20_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹12 LPA good in Noida? NCR rent vs in-hand on ₹12 lakh gross",
      description:
        "₹12 lakh CTC in Noida / NCR: moderate rent anchor, Salary Reality Check — compare to Delhi commute trade-offs by editing rent.",
      keywords: [
        "is 12 lpa good in noida",
        "12 lakh salary noida",
        "12 LPA Noida enough",
        "NCR salary 12 LPA",
      ],
    },
    answerHeadline:
      "Doable for many singles in shared or mid-sector rentals — gets tight if you chase premium society near Delhi jobs.",
    leadParagraph:
      "Noida sits inside the NCR pressure cooker: Delhi-side salaries sometimes meet Uttar Pradesh-side rents, but expressway pockets aren’t cheap. We anchor ₹20,000/month rent — think shared 2BHK or a compact solo in several sectors — then run the same moderate spend model as elsewhere.",
    whyParagraph:
      "Your real commute might be cross-border — we don’t model Delhi pollution or tolls separately, but you can nudge commute and discretionary once you know your route. The headline question is still: does rent plus modeled life fit your in-hand?",
    typicalSpendNotes: [
      "₹20k may be optimistic for some expressway towers — raise rent if needed.",
      "Metro line expansion keeps reshaping relative rents — verify listings.",
      "Power backup and society charges vary — buffer mentally.",
    ],
    relatedLpaSlugs: ["12-lpa-in-hand-salary", "10-lpa-in-hand-salary", "15-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Early-career folks in IT, media, or shared services based in Noida / Greater Noida comparing offers with Gurugram or Delhi.",
    whenEnoughVsNot:
      "Enough when rent stays controlled and tier stays moderate. Tight when you chase large solo flats plus car EMIs on the same gross.",
    majorTradeoffs: [
      "Sector 62 convenience vs Greater Noida rent — different clocks, different rents.",
      "Delhi office vs Noida sleep: tolls and time aren’t fully priced here.",
      "Owning a car vs metro+cab mix — fuel hits discretionary.",
    ],
    cityRealityNotes: [
      "NCR air quality seasons can push people toward cabs — a hidden cost.",
      "Some employers run shuttles — that can beat our default commute band.",
      "Broker networks move fast — your quoted rent beats our default.",
    ],
    soloVsFamilyCaveat:
      "Assumes one moderate earner. Families often need two incomes or outer-NCR rent — reflect that in the tool.",
    faq: [
      {
        question: "Is ₹12 LPA enough in Noida vs Gurugram?",
        answer:
          "Match gross and tier, then swap rent — both cities have cheap and expensive pockets.",
      },
      {
        question: "I work in Delhi but live in Noida — what changes?",
        answer:
          "Increase commute or discretionary slightly in the calculator to mimic tolls and time.",
      },
      {
        question: "Is Noida cheaper than Bangalore?",
        answer:
          "Not universally — compare our city pages at the same gross rather than trusting acronyms.",
      },
    ],
  },
  {
    slug: "is-18-lpa-good-in-noida",
    lpa: 18,
    annualCtc: 18_00_000,
    city: { id: "noida", name: "Noida (NCR)", metro: true },
    monthlyRent: 26_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹18 LPA good in Noida? Mid-band gross vs NCR rent (model)",
      description:
        "₹18 lakh CTC in Noida / NCR: ₹26k rent scenario, in-hand and savings — editable Salary Reality Check for your sector.",
      keywords: [
        "is 18 lpa good in noida",
        "18 lakh salary noida",
        "18 LPA NCR enough",
        "Noida salary 18 LPA",
      ],
    },
    answerHeadline:
      "Often workable for singles and young couples at this rent — premium housing or heavy EMIs erode it fast.",
    leadParagraph:
      "Eighteen LPA is a solid mid band for many NCR roles — neither “campus” nor “leadership.” We set rent at ₹26,000/month, then let moderate lifestyle spend compete with PF and tax for what’s left. If your society charges more, the tool is where you prove it.",
    whyParagraph:
      "NCR isn’t one city — it’s a commute graph. This page gives a Noida-centric rent anchor; if you actually pay Gurugram prices while sleeping in Noida, your wallet already knows the mismatch.",
    typicalSpendNotes: [
      "₹26k fits many mid-sector 2BHK shares — not every new launch.",
      "If you’re paying Delhi club-life on weekends, discretionary is where it hides.",
      "Home-loan pre-EMI isn’t modeled — subtract mentally.",
    ],
    relatedLpaSlugs: ["18-lpa-in-hand-salary", "15-lpa-in-hand-salary", "20-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Mid-level professionals anchoring family in Noida while working across NCR — or expats pricing rupee rent after years abroad.",
    whenEnoughVsNot:
      "Enough on paper when rent and tier stay honest. Not enough when you size EMIs + school fees + premium rent on one gross.",
    majorTradeoffs: [
      "Closer to in-laws vs farther but cheaper — common NCR trade.",
      "International school waitlists vs rent — plan liquidity, not just EMI.",
      "Job in Cyber City vs home in Noida — toll and time add up.",
    ],
    cityRealityNotes: [
      "RERA and builder reputation matter — cheap rent can be expensive in repairs.",
      "Winters and AQI can shift transport choices — discretionary is flexible first.",
      "Metro connectivity keeps changing relative sector pricing — verify.",
    ],
    soloVsFamilyCaveat:
      "Young families on one ₹18L earner should treat school fees as a first-class citizen — bump tier or cut rent in the embed until the math fits.",
    faq: [
      {
        question: "Is ₹18 LPA enough for a family in Noida?",
        answer:
          "Possible with modest rent and school choice — raise expenses in the calculator to mirror your fees.",
      },
      {
        question: "How is this different from the ₹12L Noida page?",
        answer:
          "Higher gross and rent anchor — compare scenarios side by side in the tool.",
      },
      {
        question: "Should I move to Bangalore for money?",
        answer:
          "Compare our Bengaluru pages at similar gross — money isn’t only nominal salary.",
      },
    ],
  },
  {
    slug: "is-12-lpa-good-in-chennai",
    lpa: 12,
    annualCtc: 12_00_000,
    city: { id: "chennai", name: "Chennai", metro: true },
    monthlyRent: 16_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹12 LPA good in Chennai? Rent, commute & savings reality check",
      description:
        "₹12 lakh CTC in Chennai: OMR/Velachery-style rent anchor, estimated in-hand vs moderate spend — editable Salary Reality Check for your actual lease.",
      keywords: [
        "is 12 lpa good in chennai",
        "12 lakh salary chennai enough",
        "12 LPA Chennai rent",
        "Chennai IT salary 12 LPA",
      ],
    },
    answerHeadline:
      "Often workable for singles and sharers on moderate tier — tight if you target premium gated communities near IT corridors alone.",
    leadParagraph:
      "Chennai is a major IT and auto hub with strong fresher and mid-level hiring. We anchor ₹16,000/month rent — think shared 2BHK or a compact unit in several growth corridors — then stack the same moderate lifestyle model used across SalaryExit so you can compare cities honestly.",
    whyParagraph:
      "Coastal humidity and flood-prone pockets are real, but the money question here is still rent vs in-hand. If your listing is higher, paste it into the embed; if you live with family and pay zero rent, drop rent and re-read savings.",
    typicalSpendNotes: [
      "₹16k won’t match every OMR tower quote — raise rent if your shortlist is pricier.",
      "Company buses and suburban rail change commute cash — discretionary is the first dial after rent.",
      "North Chennai vs south Chennai isn’t one rental market — treat this as one illustrated pin.",
    ],
    relatedLpaSlugs: ["12-lpa-in-hand-salary", "10-lpa-in-hand-salary", "15-lpa-in-hand-salary"],
    whoThisWorksFor:
      "IT services, product, and manufacturing engineers comparing Chennai offers with Bengaluru or Hyderabad — especially sharers and early-career renters.",
    whenEnoughVsNot:
      "Enough when rent stays near this anchor and lifestyle stays moderate. Breaks when you pair high fixed rent with premium tier spend or large EMIs on one salary.",
    majorTradeoffs: [
      "OMR proximity vs city-side culture — rent and time both move.",
      "Car + fuel vs metro/bus — not every employer runs a free shuttle.",
      "School zone later vs rent today — plan liquidity, not only EMI.",
    ],
    cityRealityNotes: [
      "Monsoon flooding risk varies by micro-market — rent isn’t the only due diligence.",
      "Power-cut patterns differ by area; society maintenance can stack on base rent.",
      "Language and schooling choices can shift household spend outside this model.",
    ],
    soloVsFamilyCaveat:
      "Built around one earner’s moderate footprint. Dependents and international-school fees need their own budget lines in the tool.",
    faq: [
      {
        question: "Is ₹12 LPA enough in Chennai for a fresher?",
        answer:
          "Often yes with shared housing; solo premium flats may need a higher gross or lower tier — tune rent in the embed.",
      },
      {
        question: "How does Chennai compare to Bangalore at ₹12 LPA?",
        answer:
          "Open our Bengaluru ₹12L page side by side — same engine, different rent anchors and city notes.",
      },
      {
        question: "Is this tax filing advice?",
        answer:
          "No. Educational planning only — use Form 16 and a qualified professional for filing.",
      },
    ],
  },
  {
    slug: "is-15-lpa-good-in-chennai",
    lpa: 15,
    annualCtc: 15_00_000,
    city: { id: "chennai", name: "Chennai", metro: true },
    monthlyRent: 22_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹15 LPA good in Chennai? Mid-level salary vs city rent",
      description:
        "₹15 lakh CTC in Chennai: ₹22k rent illustration, in-hand and modeled savings — Salary Reality Check pre-filled, fully editable.",
      keywords: [
        "is 15 lpa good in chennai",
        "15 lakh salary chennai",
        "15 LPA Chennai enough",
        "Chennai salary 15 LPA savings",
      ],
    },
    answerHeadline:
      "Usually more breathing room than ₹12L at similar rent discipline — still not ‘rich’ if you chase large solo flats plus car EMIs.",
    leadParagraph:
      "Fifteen LPA is a crowded band for Chennai IT and GCC roles. We use ₹22,000/month rent as a pragmatic solo-or-small-family anchor in several popular corridors — not every sea-view listing, but not a PG either.",
    whyParagraph:
      "At ₹15L gross, tax and PF still matter, but rent remains the fastest lever. If you’re cross-shopping Hyderabad or Pune, compare pages at the same gross rather than vibes alone.",
    typicalSpendNotes: [
      "₹22k targets many mid-corridor 1–2BHK asks — verify your society bill stack.",
      "If variable pay is a big slice of CTC, treat in-hand as directional.",
      "Premium tier in the tool burns savings faster than small tax tweaks here.",
    ],
    relatedLpaSlugs: ["15-lpa-in-hand-salary", "12-lpa-in-hand-salary", "18-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Mid-level ICs and tech leads benchmarking Chennai against other metros, or locals renegotiating after a promotion.",
    whenEnoughVsNot:
      "Enough on paper when rent and tier stay honest. Tight when rent mimics Mumbai quotes or household costs jump (school, care, loans).",
    majorTradeoffs: [
      "Closer office vs quieter suburb — rent and hours both shift.",
      "International school later vs affordable rent now — model explicitly.",
      "Switching to premium lifestyle tier to match peers — expensive habit at ₹15L.",
    ],
    cityRealityNotes: [
      "GCC and captive hiring can compress pay bands — compare offer structure, not only LPA.",
      "Traffic peaks are predictable — time cost isn’t rupees in this sheet.",
      "Coastal weather and maintenance can surprise new tenants — keep a buffer.",
    ],
    soloVsFamilyCaveat:
      "Works for one moderate earner or a couple with lean fixed costs. Big school fees on one ₹15L need lower rent or a second income — reflect in the embed.",
    faq: [
      {
        question: "Is ₹15 LPA a good salary in Chennai in 2026?",
        answer:
          "Nationally it’s solid; locally it still depends on rent and household — use this page’s scenario then edit every line.",
      },
      {
        question: "Should I pick old or new tax regime?",
        answer:
          "This page uses the new regime baseline. Compare explicitly with our tax regime calculator if deductions matter.",
      },
      {
        question: "Does SalaryExit model surcharge?",
        answer:
          "No — read methodology; validate high-income tax with a professional.",
      },
    ],
  },
  {
    slug: "is-12-lpa-good-in-kolkata",
    lpa: 12,
    annualCtc: 12_00_000,
    city: { id: "kolkata", name: "Kolkata", metro: true },
    monthlyRent: 14_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹12 LPA good in Kolkata? Rent & in-hand on ₹12 lakh gross",
      description:
        "₹12 lakh CTC in Kolkata: moderate rent anchor vs modeled spend — Salary Reality Check with city-typical assumptions you can replace.",
      keywords: [
        "is 12 lpa good in kolkata",
        "12 lakh salary kolkata",
        "12 LPA Kolkata enough",
        "Kolkata IT salary living cost",
      ],
    },
    answerHeadline:
      "Often workable on moderate tier if rent stays sensible — less brutal than Mumbai/Bengaluru at the same gross, but not automatic comfort.",
    leadParagraph:
      "Kolkata’s rental gradient is wide: Salt Lake and select new-town pockets can pinch, while many corridors stay gentler than larger metros. We anchor ₹14,000/month rent — plausible for shared or compact setups — then run the standard moderate spend model.",
    whyParagraph:
      "We don’t model pujo-season splurges or club memberships — discretionary is a generic band. If your real life is leaner or louder, move the tier and rent until the story matches you.",
    typicalSpendNotes: [
      "₹14k may be low for some premium towers — raise rent if your hunt says so.",
      "Metro expansion keeps reshaping relative rents — verify listings.",
      "Family help with housing changes everything — set rent to zero in the tool if that’s you.",
    ],
    relatedLpaSlugs: ["12-lpa-in-hand-salary", "10-lpa-in-hand-salary", "15-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Early and mid-career folks in IT, analytics, and services comparing Kolkata with NCR or Pune — especially renters without family housing support.",
    whenEnoughVsNot:
      "Enough when rent is controlled and spend stays moderate. Tight when you chase large solo flats in premium pins plus heavy EMIs.",
    majorTradeoffs: [
      "Salt Lake convenience vs farther rent — same city, different maths.",
      "Car ownership vs metro — parking and fuel hit discretionary.",
      "School choice later vs rent today — plan cash, not only CTC.",
    ],
    cityRealityNotes: [
      "Humidity and maintenance can be non-trivial — not every rupee is rent.",
      "Some corridors commute toward Sector V or CBD — time cost is real.",
      "Builder quality varies — cheap rent can be expensive in repairs.",
    ],
    soloVsFamilyCaveat:
      "Assumes one earner’s moderate footprint. Joint families with pooled expenses should still tune rent and tier to match reality.",
    faq: [
      {
        question: "Is ₹12 LPA enough in Kolkata for a single person?",
        answer:
          "Often yes with moderate rent; use the embed with your actual lease and lifestyle.",
      },
      {
        question: "How does Kolkata compare to Bangalore?",
        answer:
          "Compare our Bengaluru pages at the same gross — rent anchors differ more than tax trivia.",
      },
      {
        question: "Is professional tax exact for West Bengal?",
        answer:
          "We use a default annual placeholder — align with your state in the CTC tool if needed.",
      },
    ],
  },
  {
    slug: "is-15-lpa-good-in-kolkata",
    lpa: 15,
    annualCtc: 15_00_000,
    city: { id: "kolkata", name: "Kolkata", metro: true },
    monthlyRent: 18_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹15 LPA good in Kolkata? Salary vs rent & savings model",
      description:
        "₹15 lakh CTC in Kolkata: ₹18k rent scenario, estimated in-hand and savings — transparent assumptions, editable calculator.",
      keywords: [
        "is 15 lpa good in kolkata",
        "15 lakh salary kolkata",
        "15 LPA Kolkata living",
        "Kolkata salary enough",
      ],
    },
    answerHeadline:
      "Comfortable on paper for many singles and couples at moderate tier — still check real rent quotes before celebrating.",
    leadParagraph:
      "At fifteen LPA, Kolkata often leaves more slack than the same nominal gross in a handful of super-prime metros — if rent behaves. We use ₹18,000/month as a mid-market rental anchor, then apply the same expense heuristics as other cities for apples-to-apples comparison.",
    whyParagraph:
      "If you’re paid in a global hub salary discussion but live in Kolkata, context matters. If you’re paid Kolkata rates but want Mumbai lifestyle, the calculator will say no — honestly.",
    typicalSpendNotes: [
      "₹18k won’t cover every new-town luxury listing — adjust upward if needed.",
      "Premium tier in the tool is the fastest way to see ‘where did savings go?’",
      "Bonuses and variable pay aren’t modeled month-by-month.",
    ],
    relatedLpaSlugs: ["15-lpa-in-hand-salary", "12-lpa-in-hand-salary", "18-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Mid-level professionals evaluating Kolkata against remote or relocation offers — or locals upgrading flat size after a hike.",
    whenEnoughVsNot:
      "Enough when rent and tier stay aligned with this illustration. Not enough when fixed costs silently include school fees, care, and loans beyond the model.",
    majorTradeoffs: [
      "New-town amenities vs older-city charm — rent and commute both differ.",
      "Owning vs renting — maintenance isn’t in these monthly lines.",
      "Lifestyle creep vs savings rate — the tool makes the trade visible.",
    ],
    cityRealityNotes: [
      "Relative affordability vs other metros isn’t static — verify today’s listings.",
      "Some employers cluster in specific hubs — don’t assume city-average rent.",
      "Weather and maintenance bills can nudge real spend — keep a buffer.",
    ],
    soloVsFamilyCaveat:
      "If you’re the sole earner for kids’ fees and EMIs, raise rent/tier until the embed matches your household — one size never fits all.",
    faq: [
      {
        question: "Is ₹15 LPA a high salary in Kolkata?",
        answer:
          "It’s strong locally; comfort still depends on rent, loans, and dependents — model them explicitly.",
      },
      {
        question: "Does this include HRA exemption?",
        answer:
          "This flow uses gross → in-hand + lifestyle heuristics, not payslip HRA proofs — use the HRA calculator for exemption math.",
      },
      {
        question: "Can I trust this for visa or loan paperwork?",
        answer:
          "No — it’s planning education, not certified income proof.",
      },
    ],
  },
  {
    slug: "is-15-lpa-good-in-gurgaon",
    lpa: 15,
    annualCtc: 15_00_000,
    city: { id: "gurgaon", name: "Gurugram (NCR)", metro: true },
    monthlyRent: 28_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹15 LPA good in Gurgaon? NCR rent vs ₹15 lakh CTC",
      description:
        "₹15 lakh CTC in Gurugram: higher rent anchor than many cities, Salary Reality Check with editable rent and tier — compare to Noida pages.",
      keywords: [
        "is 15 lpa good in gurgaon",
        "15 lakh salary gurgaon",
        "15 LPA Gurugram enough",
        "Gurgaon salary rent",
      ],
    },
    answerHeadline:
      "Tight for solo premium corridors — workable with roommates, slightly outer sectors, or disciplined moderate spend.",
    leadParagraph:
      "Gurugram competes with Mumbai and Bengaluru on headline rents for many pockets. We anchor ₹28,000/month — plausible for a compact solo or shared setup in several sectors, not every Cyber City-adjacent tower — then run the same moderate lifestyle model.",
    whyParagraph:
      "NCR is one job market with many rental micro-markets. If you actually pay ₹40k+ base rent on ₹15L gross, the embed will show stress fast — that’s the point.",
    typicalSpendNotes: [
      "Society charges and power backup can stack — mentally add to rent if needed.",
      "Delhi-side commute can mean tolls and cabs — discretionary is the first flex.",
      "If employer provides housing support, lower rent in the tool to match.",
    ],
    relatedLpaSlugs: ["15-lpa-in-hand-salary", "12-lpa-in-hand-salary", "18-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Consulting, tech, and corporate roles based on Golf Course Road / Cyber City / Udyog Vihar comparing offers with Noida or Bengaluru.",
    whenEnoughVsNot:
      "Enough when rent stays near this anchor or lower, and tier stays moderate. Breaks when rent chases trophy addresses or EMIs stack on one salary.",
    majorTradeoffs: [
      "Sector proximity vs rent — Gurgaon rewards compromise or roommates.",
      "Car-first life vs metro — both show up in monthly cash.",
      "Premium lifestyle tier vs savings — try the dial before switching jobs.",
    ],
    cityRealityNotes: [
      "AQI seasons can change transport choices — not modeled as rupees here.",
      "Brokerage and lock-in clauses matter for cash flow month one.",
      "Some teams are hybrid — outer sectors can work if office days are few.",
    ],
    soloVsFamilyCaveat:
      "School fees and help at home can dominate NCR budgets — one ₹15L earner should model household lines explicitly in the embed.",
    faq: [
      {
        question: "Is ₹15 LPA enough in Gurgaon vs Noida?",
        answer:
          "Compare our Noida pages at the same gross — match rent to your actual shortlist in each city.",
      },
      {
        question: "Why is rent higher than Kolkata or Chennai?",
        answer:
          "Illustrative anchors reflect typical listing bands; your quote wins — paste it into the calculator.",
      },
      {
        question: "Is tax modeled for FY 2025-26?",
        answer:
          "Yes for new-regime slabs in code — see methodology for limits and surcharges not modeled.",
      },
    ],
  },
  {
    slug: "is-15-lpa-good-in-ahmedabad",
    lpa: 15,
    annualCtc: 15_00_000,
    city: { id: "ahmedabad", name: "Ahmedabad", metro: false },
    monthlyRent: 15_000,
    lifestyle: "moderate",
    answerKind: "depends",
    seo: {
      title: "Is ₹15 LPA good in Ahmedabad? Rent & savings on ₹15 lakh gross",
      description:
        "₹15 lakh CTC in Ahmedabad: moderate rent anchor vs modeled spend — Salary Reality Check for manufacturing, IT, and startup roles.",
      keywords: [
        "is 15 lpa good in ahmedabad",
        "15 lakh salary ahmedabad",
        "15 LPA Ahmedabad enough",
        "Ahmedabad cost of living salary",
      ],
    },
    answerHeadline:
      "Often more comfortable than the same gross in several larger metros — if rent stays near this anchor and lifestyle stays moderate.",
    leadParagraph:
      "Ahmedabad mixes manufacturing depth with a growing IT and startup scene. We use ₹15,000/month rent as a practical illustration for many shared or compact setups — not every premium riverfront listing.",
    whyParagraph:
      "Metro flag is off here to avoid overstating default commute cash vs Mumbai-style metros — if your commute is long and cab-heavy, nudge discretionary in the embed.",
    typicalSpendNotes: [
      "₹15k may be tight for some new-town gated asks — raise rent if that’s your market.",
      "Car ownership is common — fuel and parking can eat discretionary.",
      "Joint family housing with low rent changes the picture — set rent to match reality.",
    ],
    relatedLpaSlugs: ["15-lpa-in-hand-salary", "12-lpa-in-hand-salary", "18-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Professionals in IT parks, industrials, and startups comparing Ahmedabad with Pune or Hyderabad on real cash flow.",
    whenEnoughVsNot:
      "Enough when rent and tier stay aligned with this page. Tight when you import Mumbai lifestyle expectations on local gross.",
    majorTradeoffs: [
      "SG Highway convenience vs farther rent — same city, different cash left.",
      "Bigger flat vs bigger SIP — visible in the savings line.",
      "Premium tier for dining/travel — fast way to lose slack at ₹15L.",
    ],
    cityRealityNotes: [
      "Heat and power backup norms differ by society — maintenance varies.",
      "Some roles are still manufacturing-shift oriented — variable pay patterns differ.",
      "Weekend travel spend can creep — discretionary is generic until you edit.",
    ],
    soloVsFamilyCaveat:
      "If parents or kids change household burn, reflect higher rent or tier — the default is one moderate earner’s footprint.",
    faq: [
      {
        question: "Is ₹15 LPA a good salary in Ahmedabad?",
        answer:
          "For many renters it’s solid; verify with your actual rent and loan load in the tool.",
      },
      {
        question: "How does Ahmedabad compare to Bangalore?",
        answer:
          "Open Bengaluru pages at the same gross — rent anchors usually differ more than headline LPA.",
      },
      {
        question: "Does this include Gujarat professional tax?",
        answer:
          "We use a generic PT placeholder like other pages — tune in the full CTC calculator if needed.",
      },
    ],
  },
  {
    slug: "is-10-lpa-enough-for-family-in-pune",
    lpa: 10,
    annualCtc: 10_00_000,
    city: { id: "pune", name: "Pune", metro: true },
    monthlyRent: 22_000,
    lifestyle: "premium",
    answerKind: "depends",
    seo: {
      title: "Is ₹10 LPA enough for a family in Pune? Honest single-earner stress test",
      description:
        "₹10 lakh CTC, family-oriented spend tier, rent on one salary — Salary Reality Check shows how tight it gets; edit every line for your household.",
      keywords: [
        "is 10 lpa enough for family in pune",
        "10 lakh salary family pune",
        "10 LPA Pune family budget",
        "Pune family single income 10 LPA",
      ],
    },
    answerHeadline:
      "On one salary, premium-tier spend plus rent is usually a stretch — dual income or lower rent changes everything.",
    leadParagraph:
      "Ten LPA is not a “family package” in most Indian metros if you model real food, healthcare buffers, and kid-adjacent spend. We deliberately set premium lifestyle (higher groceries and discretionary bands) and ₹22,000 rent — still modest housing — so you can see how fast the margin disappears after tax and PF.",
    whyParagraph:
      "This page exists to prevent magical thinking: if you’re the only earner with dependents, you need either a smaller rent, a higher gross, or a second income — the embed lets you test those levers without shame.",
    typicalSpendNotes: [
      "Premium tier raises non-rent lines — that’s intentional for a family-shaped story.",
      "School fees aren’t a separate line — fold expectations into discretionary or cut elsewhere.",
      "If your rent is lower than ₹22k, you’ll breathe easier — plug the real number.",
    ],
    relatedLpaSlugs: ["10-lpa-in-hand-salary", "12-lpa-in-hand-salary", "15-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Single-income households evaluating whether Pune is affordable on one ₹10L gross — especially parents with a child in school or planning one.",
    whenEnoughVsNot:
      "Rarely “comfortable” on this default if premium spend matches real family life. Becomes workable with much lower rent, village support, employer perks, or a second salary.",
    majorTradeoffs: [
      "Spouse employment vs childcare — cash vs time, not in this grid.",
      "English-medium fees vs savings — pick consciously.",
      "Living near grandparents vs privacy — sometimes a rent subsidy in disguise.",
    ],
    cityRealityNotes: [
      "Pune has strong school competition — fees vary more than rent.",
      "Healthcare shocks hit single earners hardest — emergency fund is outside this model.",
      "If employer covers insurance well, you get slack not shown here.",
    ],
    soloVsFamilyCaveat:
      "This page is explicitly for family budgeting on one ₹10L salary. Dual earners should combine incomes; singles should use our non-family Pune pages instead.",
    faq: [
      {
        question: "Why premium lifestyle for a ₹10L salary?",
        answer:
          "Families often spend above “moderate” groceries and essentials — premium illustrates stress honestly. Drop to basic/moderate in the tool if your life is leaner.",
      },
      {
        question: "Is ₹10 LPA enough for a family of four?",
        answer:
          "Usually only with very low rent, strong support, or more income — use the calculator with your actual rent and tier.",
      },
      {
        question: "What if my spouse earns too?",
        answer:
          "Add their in-hand mentally or run two Salary Reality Checks — this sheet models one gross.",
      },
    ],
  },
  {
    slug: "is-20-lpa-enough-for-family-in-bangalore",
    lpa: 20,
    annualCtc: 20_00_000,
    city: { id: "bangalore", name: "Bengaluru", metro: true },
    monthlyRent: 38_000,
    lifestyle: "premium",
    answerKind: "depends",
    seo: {
      title: "Is ₹20 LPA enough for a family in Bangalore? One-earner reality check",
      description:
        "₹20 lakh CTC in Bengaluru with premium spend bands and ₹38k rent — see modeled savings for a family-shaped budget; tune every input.",
      keywords: [
        "is 20 lpa enough for family in bangalore",
        "20 lakh salary family bangalore",
        "20 LPA Bengaluru family budget",
        "Bangalore family single income 20 LPA",
      ],
    },
    answerHeadline:
      "Possible for a lean one-earner household at this rent — tight the moment school fees or EMI stacks bite.",
    leadParagraph:
      "Twenty LPA is a respectable gross, but Bengaluru can tax families twice: rent for space near work or school, and lifestyle spend that “moderate” tiers understate. We set premium lifestyle and ₹38,000/month rent — a plausible 2BHK ask in many corridors — to show how little slack remains after PF, tax, and modeled spend.",
    whyParagraph:
      "We’re not saying you can’t live well — we’re saying you should see the numbers before you commit to fee structures and leases. Lower rent or a second income usually moves the verdict faster than negotiating ₹1L more gross.",
    typicalSpendNotes: [
      "Premium tier lifts groceries and discretionary — closer to family-shaped spend than moderate.",
      "₹38k rent + premium non-rent can still squeeze savings — that’s the honest outcome for some households.",
      "If you’re on two incomes, halve the drama — run separate scenarios.",
    ],
    relatedLpaSlugs: ["20-lpa-in-hand-salary", "18-lpa-in-hand-salary", "25-lpa-in-hand-salary"],
    whoThisWorksFor:
      "Parents with one primary earner weighing Bengaluru school options and rent — or couples deciding whether one salary can carry the city.",
    whenEnoughVsNot:
      "Enough when rent is negotiated down, tier is overstated for your frugality, or a second income exists. Not enough when international-school fees, big EMIs, and this rent stack together on one ₹20L gross.",
    majorTradeoffs: [
      "School catchment vs rent — the classic Bengaluru fight.",
      "Smaller flat in ORR vs bigger flat farther — time vs space.",
      "Career growth vs immediate savings — this tool only prices cash flow.",
    ],
    cityRealityNotes: [
      "Traffic affects school runs — not modeled, but real.",
      "Some schools want upfront donations — liquidity matters beyond monthly rent.",
      "If you’re from a smaller town, rent shock is normal — anchor to listings, not relatives’ 2015 memories.",
    ],
    soloVsFamilyCaveat:
      "Built for family-shaped spend on one ₹20L earner. DINK couples living like singles should drop to moderate tier in the tool or read our “is ₹20 LPA enough in Bangalore?” page for a lighter default scenario.",
    faq: [
      {
        question: "Why premium lifestyle on ₹20 LPA?",
        answer:
          "Families often land between moderate and premium on essentials — premium is a stress-test, not a judgment.",
      },
      {
        question: "Can we survive on ₹20 LPA with two kids?",
        answer:
          "Depends on school choice and rent — edit the calculator ruthlessly; consider outer areas or second income.",
      },
      {
        question: "How does this compare to the solo ₹20L Bengaluru page?",
        answer:
          "That page uses moderate tier and ₹35k rent — this one models heavier household spend.",
      },
    ],
  },
];

const bySlug = new Map(SALARY_ENOUGH_PAGES.map((p) => [p.slug, p]));

export function getSalaryEnoughPageConfig(slug: string): SalaryEnoughPageConfig | undefined {
  return bySlug.get(slug);
}

export function getAllSalaryEnoughSlugs(): string[] {
  return SALARY_ENOUGH_PAGES.map((p) => p.slug);
}

/** Internal linking: same city first, then other cities (stable array order). */
export function getRelatedSalaryEnoughPages(
  currentSlug: string,
  limit: number
): SalaryEnoughPageConfig[] {
  const current = bySlug.get(currentSlug);
  const others = SALARY_ENOUGH_PAGES.filter((p) => p.slug !== currentSlug);
  if (limit <= 0) return [];
  if (!current) return others.slice(0, limit);
  const sameCity = others.filter((p) => p.city.id === current.city.id);
  const otherCities = others.filter((p) => p.city.id !== current.city.id);
  return [...sameCity, ...otherCities].slice(0, limit);
}

/** For LPA band pages: closest gross band first for relevant “is it enough?” links. */
export function getSalaryEnoughSpotlightForLpa(lpa: number, limit: number): SalaryEnoughPageConfig[] {
  if (limit <= 0) return [];
  const scored = [...SALARY_ENOUGH_PAGES]
    .map((p) => ({ p, d: Math.abs(p.lpa - lpa) }))
    .sort((a, b) => a.d - b.d || a.p.slug.localeCompare(b.p.slug));
  return scored.slice(0, limit).map((x) => x.p);
}
