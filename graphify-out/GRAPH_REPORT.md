# Graph Report - salaryexit-review-c2a1b9c  (2026-10-14)

## Corpus Check
- 339 files · ~284,088 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 659 nodes · 641 edges · 21 communities detected
- Extraction: 72% EXTRACTED · 28% INFERRED · 0% AMBIGUOUS · INFERRED: 181 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `Image()` - 47 edges
2. `guideArticlePath()` - 21 edges
3. `plausibleEvent()` - 17 edges
4. `gtagEvent()` - 16 edges
5. `sanitizeNumber()` - 14 edges
6. `trackCalculatorUse()` - 13 edges
7. `clampNonNegative()` - 13 edges
8. `getSiteOrigin()` - 12 edges
9. `focusFirstInvalidField()` - 12 edges
10. `computeCtcToInHand()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `plausibleEvent()` --calls--> `P()`  [INFERRED]
  lib\analytics\client.ts → components\calculators\CalculatorEditorial.tsx
- `markStarted()` --calls--> `trackCalculatorStarted()`  [INFERRED]
  components\calculators\clients\ReverseSalaryCalculatorClient.tsx → lib\analytics\client.ts
- `setExpenseField()` --calls--> `sanitizeNumber()`  [INFERRED]
  components\calculators\clients\SalaryRealityCheckCalculatorClient.tsx → lib\validation\sanitize.ts
- `robots()` --calls--> `getSiteOrigin()`  [INFERRED]
  app\robots.ts → lib\seo\site-origin.ts
- `url()` --calls--> `getSiteOrigin()`  [INFERRED]
  app\sitemap.ts → lib\seo\site-origin.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (21): onSubmit(), focusFirstInvalidField(), onSubmit(), onSubmit(), computeLeaveEncashment(), onSubmit(), computeNoticeBuyout(), onSubmit() (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (1): Image()

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (20): guideArticlePath(), CompareOffersGuidePage(), EpfWageCeilingPage(), FinalSettlementChecklistPage(), HowMuchSalaryBangalorePage(), HowMuchSalaryPunePage(), HowRentChangesMonthlySavingsPage(), HowToJudgeSalaryGoodIndiaPage() (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (21): getGuideClusterLinks(), KEY(), buildIndexNowPayload(), getIndexNowKey(), getIndexNowKeyFileUrl(), submitUrlsToIndexNow(), lpaLandingPath(), salaryEnoughPath() (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (25): computeCtcToInHand(), deriveGrossFromCtc(), onSubmit(), computeEpfEstimate(), computeFinalSettlement(), main(), toCsv(), computeGratuity() (+17 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (19): absolutePathToUrl(), guideArticleMetadata(), articleJsonLd(), absoluteUrl(), buildPageMetadata(), formatHtmlTitle(), truncateSeoTitle(), InHandSalaryModelReportPage() (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.21
Nodes (19): analyticsAllowed(), gtagEvent(), plausibleEvent(), trackAffiliateClick(), trackBusinessInquiry(), trackCalculatorStarted(), trackCalculatorUse(), trackEmbedCodeCopied() (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (14): formatInr(), buildVerdictNarrative(), clampBasicDaShare(), classifyVerdict(), computeSalaryRealityCheck(), lifestyleTierLabel(), buildExpenseLinesFromMonthly(), estimateLifestyleExpenses() (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.27
Nodes (11): estimateAnnualIncomeTax(), addCess(), progressiveTax(), rebate87ANewRegime(), rebate87AOldRegime(), totalTaxWithCess(), computeSalaryBreakdown(), line() (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.27
Nodes (7): dispatchConsentUpdated(), parseConsentJson(), readConsentFromStorage(), acceptAll(), rejectNonEssential(), saveAll(), refresh()

### Community 10 - "Community 10"
Cohesion: 0.32
Nodes (5): compareOffers(), rankBy(), emptyOffer(), onSubmit(), reset()

### Community 11 - "Community 11"
Cohesion: 0.39
Nodes (6): buildAnalyticsBaseline(), percentChange(), formatCtr(), formatPct(), main(), readJson()

### Community 12 - "Community 12"
Cohesion: 0.29
Nodes (1): P()

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (4): calculatorMetadata(), getCalculator(), relatedCalculatorLinks(), RelatedCalculators()

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (3): getCalculatorTrust(), CalculatorAccuracyCard(), CalculatorEstimateCaveats()

### Community 15 - "Community 15"
Cohesion: 0.43
Nodes (5): buildCampaignUrl(), isValidKebab(), normalizePath(), getArg(), main()

### Community 16 - "Community 16"
Cohesion: 0.6
Nodes (4): formatAnnualCtcCompact(), formatLakhsUnit(), formatMonthlyMoneyCompact(), formatSalaryRealityShareSummaryOneLine()

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (2): getSeasonalBanner(), SeasonalBanner()

### Community 18 - "Community 18"
Cohesion: 0.5
Nodes (2): SalaryHikeCalculatorPage(), Section()

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (2): adsenseSlotIdForPosition(), AdSlot()

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (2): emptyLine(), FinalSettlementCalculatorClient()

## Knowledge Gaps
- **Thin community `Community 1`** (44 nodes): `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `opengraph-image.tsx`, `Image()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (7 nodes): `H2()`, `OL()`, `P()`, `SalaryEditorial()`, `Section()`, `UL()`, `CalculatorEditorial.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (4 nodes): `SeasonalBanner.tsx`, `bannerDismissKey()`, `getSeasonalBanner()`, `SeasonalBanner()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (4 nodes): `page.tsx`, `Section.tsx`, `SalaryHikeCalculatorPage()`, `Section()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (3 nodes): `adsenseSlotIdForPosition()`, `AdSlot()`, `AdSlot.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (3 nodes): `FinalSettlementCalculatorClient.tsx`, `emptyLine()`, `FinalSettlementCalculatorClient()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `generateInHandSalaryModel()` connect `Community 4` to `Community 5`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `buildPageMetadata()` connect `Community 5` to `Community 3`, `Community 13`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Image()` (e.g. with `getLpaLandingPageConfig()` and `getSalaryEnoughPageConfig()`) actually correct?**
  _`Image()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 20 inferred relationships involving `guideArticlePath()` (e.g. with `CompareOffersGuidePage()` and `FinalSettlementChecklistPage()`) actually correct?**
  _`guideArticlePath()` has 20 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `sanitizeNumber()` (e.g. with `onSubmit()` and `onSubmit()`) actually correct?**
  _`sanitizeNumber()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._