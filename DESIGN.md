# SalaryExit India — Design System

## 1. Brand Personality

SalaryExit is a **salary intelligence tool for Indian salaried employees**. It helps people understand what they actually take home — before they accept an offer, switch jobs, or resign.

**Personality traits (ranked):**
- Trustworthy — the first and non-negotiable one. Money decisions depend on accurate, transparent tools.
- Useful — every screen earns its place by answering a real question.
- Clear — no jargon, no hiding behind complexity.
- Calm — not flashy, not anxious. Like a knowledgeable friend who has seen payslips.
- Human — written for people, not lawyers or finance professors.
- Indian — rupees, LPA, regime choice, PF, PT. Not generic global salary stuff.

**Personality traits it must NOT have:**
- Hyped / startup-bragging
- Crypto-dashboard energy
- Government-portal heaviness
- Generic AI SaaS template feel
- Dribbble over-designed visual complexity

---

## 2. Design Principles

1. **Trust before beauty.** A disclaimer in the right place is better than hidden elegance.
2. **Numbers first.** The salary result is the hero. Design leads the eye there.
3. **Assumptions visible.** Every key assumption (regime, PF ceiling, FY) must be surfaced, not buried.
4. **One action at a time.** Calculator inputs → result → next step. Never more than one primary CTA per view.
5. **Mobile is the primary surface.** Most Indian salary workers check this on a phone.
6. **No decoration without function.** If a visual element doesn't earn its space, remove it.
7. **Rupees everywhere.** All amounts in INR, formatted correctly (₹X,XX,XXX). Use Indian number formatting.
8. **The product is the marketing.** The calculator result IS the value proposition. Don't oversell above the fold.

---

## 3. Color Tokens

All tokens defined in `app/globals.css` using Tailwind v4 `@theme` block.

### Base palette

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#FAFAF8` | Page background — warm off-white, not pure white |
| `--color-surface` | `#FFFFFF` | Cards, panels, calculator shells |
| `--color-surface-subtle` | `#F5F5F2` | Subtle nested sections, input backgrounds |
| `--color-border` | `#E5E4DF` | Default borders — warm, not cold gray |
| `--color-border-strong` | `#CCCAC4` | Emphasis borders, dividers |

### Text

| Token | Value | Use |
|---|---|---|
| `--color-text` | `#1A1917` | Primary text — near-black with warmth |
| `--color-text-secondary` | `#5C5B57` | Labels, helper text, secondary copy |
| `--color-text-muted` | `#9A9890` | Placeholders, timestamps, light context |
| `--color-text-inverse` | `#FFFFFF` | Text on dark/accent backgrounds |

### Accent — "Salary Green" (primary CTA / key numbers)

| Token | Value | Use |
|---|---|---|
| `--color-accent` | `#1A6B45` | Primary CTAs, active states, salary amounts |
| `--color-accent-light` | `#EBF5EF` | Accent background tints, success badges |
| `--color-accent-hover` | `#155639` | Button hover state |

### Semantic

| Token | Value | Use |
|---|---|---|
| `--color-positive` | `#1A6B45` | In-hand salary, surplus, savings |
| `--color-negative` | `#B91C1C` | Deductions, warnings, tax amounts |
| `--color-warning` | `#92400E` | Assumptions notices, estimate badges |
| `--color-info` | `#1D4ED8` | Links, informational callouts |
| `--color-warning-bg` | `#FFFBEB` | Estimate badge backgrounds |
| `--color-negative-bg` | `#FEF2F2` | Error/warning panel backgrounds |

### Do not use
- Purple, violet, pink, teal — these signal AI SaaS, not salary intelligence.
- Gradients as decoration (only data visualisation).
- Dark mode by default — the product is a daytime work tool.

---

## 4. Typography Rules

### Font stack
- **Primary:** `Geist Sans` (already loaded via `next/font/local`) — clean, modern, works at all weights
- **Monospace:** `Geist Mono` — for salary numbers, amounts, formatted data

### Scale (Tailwind v4 `@theme` fluid typography)

| Name | Size | Weight | Use |
|---|---|---|---|
| `text-hero` | `clamp(2rem, 1.5rem + 2.5vw, 3.25rem)` | 700 | Homepage hero headline |
| `text-section` | `clamp(1.5rem, 1.25rem + 1.25vw, 2rem)` | 600 | Section headings |
| `text-page` | `1.25rem` | 600 | Calculator page h1 |
| `text-card-title` | `1rem` | 600 | Card headings |
| `text-body` | `0.9375rem` | 400 | Body copy |
| `text-small` | `0.8125rem` | 400 | Helper text, labels |
| `text-xs` | `0.75rem` | 400 | Legal, disclaimers, timestamps |

### Number formatting rules
- Monthly in-hand: **Geist Mono**, 600 weight, larger scale than surrounding text
- Salary amounts: always rupee-prefixed (₹), Indian locale (1,20,000 not 120,000)
- Never truncate salary to "1.2L" without the full number nearby
- Percentages: one decimal, no trailing zero (4%, not 4.0%)

### Copy rules
- Sentence case for everything (not Title Case For Every Heading)
- First-person plural avoided in UI (not "We calculate…" — just state the fact)
- Active voice for results ("Your estimated monthly in-hand is ₹X")
- Parenthetical FY context for all tax figures ("FY 2026–27 · New regime")

---

## 5. Spacing Rules

Tailwind v4 uses default spacing scale. Use these semantic spacing conventions:

| Context | Tailwind class |
|---|---|
| Page section vertical gap | `py-16 md:py-24` |
| Card internal padding | `p-5 md:p-6` |
| Input group spacing | `gap-4` |
| Form section grouping | `gap-6` |
| Result card rows | `gap-3` |
| Body text paragraph gap | `mb-4` |
| Section header → content | `mb-8 md:mb-10` |

- Prefer generous padding inside cards over tight layout.
- Never let content touch screen edges on mobile — minimum `px-4`.
- Stack-to-side layout breakpoint: `md:` (768px).
- Max content width: `max-w-3xl` for calculator/article pages, `max-w-6xl` for homepage.

---

## 6. Radius and Shadow Rules

### Border radius

| Context | Value |
|---|---|
| Cards, calculator shells | `rounded-xl` (0.75rem) |
| Input fields | `rounded-lg` (0.5rem) |
| Buttons | `rounded-lg` (0.5rem) |
| Badges, pills | `rounded-full` |
| Modals/sheets | `rounded-2xl` (1rem) |

No rounded corners on full-width banners or page-edge elements.

### Shadows

Shadows must be **soft and warm**, not hard corporate drop-shadows.

| Use | Class / value |
|---|---|
| Card resting | `shadow-sm` |
| Card hover | `shadow-md` |
| Calculator result card | `shadow-md` |
| Floating elements | `shadow-lg` |

Never use:
- `shadow-2xl` on normal UI elements
- Coloured box-shadows as glow effects
- `drop-shadow` filters on text

---

## 7. Component Design Rules

### Buttons

- **Primary:** `bg-[--color-accent]` + `text-white` + `rounded-lg px-5 py-2.5 font-medium` — only ONE primary button per view
- **Secondary:** `border border-[--color-border-strong]` + `bg-transparent` + same padding
- **Ghost:** `text-[--color-accent]` + no background
- **Icon buttons:** 40×40 minimum tap target
- Focus ring: `focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2`

### Cards

- Background: `bg-[--color-surface]`
- Border: `border border-[--color-border] rounded-xl`
- Padding: `p-5 md:p-6`
- No hover effects on informational cards — only interactive cards

### Input fields

- Border: `border border-[--color-border]` at rest, `border-[--color-accent]` when focused
- Background: `bg-[--color-surface-subtle]`
- Label: above field, `text-small font-medium text-[--color-text-secondary]`
- Helper text: below field, `text-xs text-[--color-text-muted]`
- Error: red border + error text below + optional icon

### Form layout

- Group related fields with a shared label/section heading
- Required fields: mark optional fields "(optional)" — don't asterisk required ones
- Long forms: collapsible optional sections (e.g. "Advanced assumptions")

---

## 8. Calculator UX Rules

### Input panel

1. The most important inputs come first (CTC / Gross salary always first)
2. Group: Core inputs → PF/deductions → Regime choice → Optional/advanced
3. One column on mobile, up to two columns on desktop for same-category fields
4. Inline help text for anything non-obvious (what is "PF wage"? what is "professional tax"?)
5. Reasonable defaults — the user shouldn't need to fill everything for a useful estimate

### Result panel

1. **Monthly in-hand salary** is always the primary headline — large, monospaced, accent-coloured
2. Annual in-hand second (smaller, secondary colour)
3. Breakdown as a list: each deduction labelled, amounts right-aligned
4. Regime and FY shown clearly near the result ("New regime · FY 2026–27")
5. Assumptions used — collapsible but accessible (not hidden in a tooltip)
6. Estimate badge — always visible, never buried
7. "What this doesn't include" — brief, calm, honest

### Error and empty states

- Empty state: helpful prompt, not blank — "Enter your CTC above to see your estimated in-hand"
- Validation errors: field-level, not just at submit
- Invalid number: immediate feedback, not form-submit rejection

### Result sharing / next action

- Show 2–3 related calculators after result
- Link to methodology, not just disclaim
- "Consult a CA" CTA where relevant (especially final settlement, tax)

---

## 9. Motion Rules

- Prefer CSS transitions over JS animation
- Duration: `150ms` for interactions (hover, focus), `250ms` for state changes, `350ms` for layout transitions
- Easing: `ease-out` for entrances, `ease-in-out` for state transitions
- Always respect `prefers-reduced-motion: reduce` — disable all animations
- No looping animations on the homepage
- Number count-up animation: optional, max one per page, disabled under reduced-motion
- No particle systems, no parallax, no scroll-triggered explosions

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Accessibility Rules

- Minimum contrast: 4.5:1 for body text, 3:1 for large text (WCAG AA)
- All interactive elements keyboard navigable
- Focus rings: always visible, never `outline: none` without alternative
- Form labels: always associated with inputs (`htmlFor` / `aria-labelledby`)
- Error messages: `role="alert"` or linked via `aria-describedby`
- Calculator results: `aria-live="polite"` on the result region
- Icons without text: `aria-label` or `aria-hidden` + visible sibling label
- Accordion / FAQ: standard `aria-expanded` / `aria-controls` pattern
- Color alone never conveys meaning — always pair with text or icon

---

## 11. SEO Preservation Rules

- **Never remove** `<h1>` from any page — exactly one per page
- **Never replace** crawlable text content with client-only state
- Preserve all heading hierarchy (h1 → h2 → h3)
- FAQ content must stay in DOM, not only appear in structured data
- Methodology and disclaimer text must be crawlable
- All internal links stay as `<a href>` tags — not `onClick` navigation
- Calculator result text: SSR-friendly empty state (server renders "Enter CTC…" default)
- Meta title/description: only update if clearly improving CTR for the right intent
- Canonical URLs: untouched
- Sitemap: untouched unless routes change

---

## 12. Anti-AI-Slop Rules

The following patterns are banned on this site:

| Banned | Reason |
|---|---|
| Purple/violet/teal gradient hero | Signals AI SaaS template, not salary tool |
| "Built for teams" or "Built for scale" copy | Irrelevant to individual salary worker |
| Animated particle or blob background | Visual noise, no value |
| Generic stock illustrations | Trust-breaking fake humans |
| Glowing borders or neon accents | Crypto energy, wrong audience |
| 6-item feature grid with emoji icons | Template-brained |
| "Trusted by X companies" without evidence | Credibility theatre |
| Rotating testimonials carousel | Almost never real on day-one products |
| Hero with floating mock UI screenshots | Only use real calculator outputs |
| Dark mode as default | Wrong for a daytime tax/salary tool |
| Excessive glassmorphism | Hides content, reduces readability |
| Auto-play video or audio | Never |
| Full-page hero with vague "Get started" CTA | Not specific enough for this product |

Instead:

| Use | Reason |
|---|---|
| Real calculator result preview in hero | Shows the product doing its job |
| Specific CTAs ("Calculate ₹12L in-hand") | User knows exactly what they're getting |
| Visible FY label and methodology link | Builds genuine trust |
| Indian salary context in every example | Feels made for the user |
| Honest estimate language | Better trust than false precision |
| Clean white/off-white surface | Readable, not trendy |
| Salary green for positive outcomes | Semantically appropriate |

---

## 13. Page Templates

### Homepage

```
SiteHeader
  ↳ Logo | Nav (Calculators, Guides, Tax, Job Switch, Methodology)

HeroSection
  ↳ Headline: "Know your real in-hand before you accept, switch, or resign."
  ↳ Sub: "Free calculators for Indian salaried employees — CTC to take-home, regime comparison, offer analysis."
  ↳ Primary CTA: "Calculate my in-hand salary"
  ↳ Secondary CTA: "Compare two offers"
  ↳ SalaryPreviewCard (real result, not decoration):
      CTC: ₹12,00,000 · Regime: New · FY 2026-27
      Monthly in-hand: ₹84,500
      PF: ₹21,600/yr · Tax: ₹18,720/yr · PT: ₹2,400/yr
      "~₹5,300/mo less than your CTC implies"

TrustStrip
  ↳ FY 2026-27 engine | Free, no login | Estimates not tax advice | Indian salaried focus

CalculatorGrid ("Most useful calculators")
  ↳ 6 cards — CTC to In-hand, Salary Reality Check, Regime Comparison,
               Offer Comparison, HRA Exemption, Final Settlement

HowItWorksSection ("How SalaryExit thinks")
  ↳ 4 steps: Inputs → Assumptions → Engine → Result + caveats

RealQuestionsSection (FAQ-style)
  ↳ Is 12 LPA enough in Mumbai? | Monthly take-home from CTC? | Regime choice?
  ↳ Each links to relevant calculator

SiteFooter
  ↳ Grouped links + trust note + disclaimer
```

### Calculator page

```
SiteHeader

CalculatorHero
  ↳ h1, description, EstimateBadge, methodology link

CalculatorInputPanel
  ↳ Grouped form fields
  ↳ Required vs optional clear
  ↳ Calculate button

ResultSummaryCard (shows after calculation)
  ↳ Primary: Monthly in-hand
  ↳ Secondary: Annual in-hand
  ↳ Regime + FY label
  ↳ DeductionBreakdown (collapsible)
  ↳ AssumptionCard
  ↳ DisclaimerBlock (calm, not alarming)

RelatedCalculators

SiteFooter
```

### Guide / article page

```
SiteHeader

ArticleHeader
  ↳ hub breadcrumb
  ↳ h1
  ↳ description / summary
  ↳ last reviewed date

ArticleBody (editorial content)
  ↳ Callout variants: Example, Warning, Tip, Assumption
  ↳ Related calculator callout inline

RelatedLinks

SiteFooter
```

---

## 14. Good vs Bad UI Choices

### Homepage hero

| ❌ Bad | ✓ Good |
|---|---|
| "Understand your salary with AI" | "Know your real in-hand before you accept" |
| Vague "Get started" button | "Calculate ₹12L in-hand" |
| Purple gradient background | Warm off-white background |
| Generic laptop illustration | Real SalaryExit calculator preview card |
| "Trusted by 10,000 users" (unverifiable) | "FY 2026-27 engine · estimates not filing advice" |

### Calculator result

| ❌ Bad | ✓ Good |
|---|---|
| Show all fields before calculating | Show inputs first, result after action |
| Hide PF/tax details in tooltip | Collapsible breakdown visible on page |
| No indication of what FY is used | "New regime · FY 2026-27" badge near result |
| Only show monthly in-hand | Monthly in-hand (hero) + annual + breakdown |
| Disclaimer only in footer | Estimate badge near the result itself |

### Trust

| ❌ Bad | ✓ Good |
|---|---|
| Remove disclaimer to save space | Make it calm and compact, not loud |
| "Consult a professional" as only trust signal | Link to methodology + explain assumptions + consult CA CTA |
| No FY label | Always show FY/AY label near tax figures |

### Mobile

| ❌ Bad | ✓ Good |
|---|---|
| Two-column inputs on 360px | Single column on mobile always |
| Salary result truncated off-screen | Result card scrolls above fold on mobile |
| Horizontal scroll in breakdown table | Use stacked rows on mobile |
| Tap targets < 44px | All buttons and links ≥ 44px |
