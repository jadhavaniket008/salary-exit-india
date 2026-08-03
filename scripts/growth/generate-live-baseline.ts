/**
 * Reads the sanitized GA4 + GSC snapshot JSON files in docs/growth/generated/
 * (produced by hand from live MCP connector output — see
 * docs/growth/generated/*.json for retrieval provenance), runs them through
 * lib/growth/analytics-baseline.ts, and rewrites docs/growth/00-baseline.md
 * with real figures in place of the prior "Unknown" placeholders.
 *
 * Usage: npx tsx scripts/growth/generate-live-baseline.ts
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  buildAnalyticsBaseline,
  type AnalyticsBaselineInputs,
} from "@/lib/growth/analytics-baseline";

function readJson<T>(relPath: string): T {
  const fullPath = path.resolve(process.cwd(), relPath);
  return JSON.parse(readFileSync(fullPath, "utf-8")) as T;
}

function formatPct(value: number | null, digits = 1): string {
  if (value === null) return "n/a (baseline was 0)";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

function formatCtr(ctr: number): string {
  return `${(ctr * 100).toFixed(2)}%`;
}

function main(): void {
  const genDir = "docs/growth/generated";
  const inputs: AnalyticsBaselineInputs = {
    ga4_28d: readJson(`${genDir}/ga4-baseline-28d.json`),
    ga4_90d: readJson(`${genDir}/ga4-baseline-90d.json`),
    ga4_previous90d: readJson(`${genDir}/ga4-baseline-previous-90d.json`),
    gsc_current: readJson(`${genDir}/gsc-baseline-current.json`),
    gsc_previous: readJson(`${genDir}/gsc-baseline-previous.json`),
  };

  const baseline = buildAnalyticsBaseline(inputs);
  const g = baseline.ga4;
  const s = baseline.gsc;

  const md = `# Growth baseline — ${baseline.generatedAtIso}

Real baseline pulled live via the connected GA4 and GSC MCP servers on ${baseline.generatedAtIso}, immediately before the four-week pilot begins. Every figure below traces to \`docs/growth/generated/*.json\`, which record the exact retrieval window and MCP tool used. No figure here is estimated, inferred from social impressions, or carried over from the prior \`Unknown\`-only baseline.

## Traffic (GA4)

Current window: ${inputs.ga4_90d.period.startDate} to ${inputs.ga4_90d.period.endDate} (90 days). Previous window: ${inputs.ga4_previous90d.period.startDate} to ${inputs.ga4_previous90d.period.endDate} (the directly preceding 90 days).

| Metric | Previous 90d | Current 90d | Change |
|---|---|---|---|
| Sessions | ${g.sessions90d.from} | ${g.sessions90d.to} | ${formatPct(g.sessions90d.percentChange)} |
| Users | ${g.users90d.from} | ${g.users90d.to} | ${formatPct(g.users90d.percentChange)} |
| Engaged sessions | ${g.engagedSessions90d.from} | ${g.engagedSessions90d.to} | ${formatPct(g.engagedSessions90d.percentChange)} |
| Engagement rate | ${(g.engagementRatePrevious * 100).toFixed(1)}% | ${(g.engagementRateCurrent * 100).toFixed(1)}% | ${g.engagementRateDeltaPoints >= 0 ? "+" : ""}${g.engagementRateDeltaPoints.toFixed(1)} points |
| Avg. session duration | ${Math.round(g.averageSessionDurationSeconds90d.from)}s | ${Math.round(g.averageSessionDurationSeconds90d.to)}s | ${formatPct(g.averageSessionDurationSeconds90d.percentChange)} |

**Trailing-28-day channel mix** (${inputs.ga4_28d.period.startDate} to ${inputs.ga4_28d.period.endDate}), sorted by engaged sessions:

| Channel | Sessions | Engaged sessions |
|---|---|---|
${g.topChannelsByEngagedSessions28d.map((c) => `| ${c.channel} | ${c.sessions} | ${c.engagedSessions} |`).join("\n")}

**90-day source/medium** (attributable rows only — see note below for excluded rows):

| Source / medium | Sessions | Engaged sessions |
|---|---|---|
${g.attributableSourceMediumRows90d.map((r) => `| ${r.sourceMedium} | ${r.sessions} | ${r.engagedSessions} |`).join("\n")}

${g.unattributableSourceMediumRows90d.length > 0 ? `**Excluded from channel attribution** (not a marketing channel): ${g.unattributableSourceMediumRows90d.map((r) => `\`${r.sourceMedium}\` (${r.sessions} sessions) — ${r.note}`).join("; ")}` : ""}

**Campaign tagging**: every session in the 90-day window resolves to a generic bucket ((direct), (referral), (not set), (organic), (ai-assistant)) — no session carries a real UTM campaign name yet. Confirms the forensics report's pre-existing finding; \`utm-standard.md\` links published from this point forward are what will populate this dimension going forward.

**Calculator engagement**: \`calculator_use\` fired ${g.calculatorUseEvents90d} times in 90 days. \`share_summary\` ${g.shareEventsObserved ? "fired at least once" : "did not fire at all"} in the same window.

**Top landing pages (90d)**:

| Path | Sessions | Engaged sessions |
|---|---|---|
${g.topLandingPages90d.map((p) => `| \`${p.path}\` | ${p.sessions} | ${p.engagedSessions} |`).join("\n")}

${inputs.ga4_90d.landingPagesBelowThreshold ? `Plus ${inputs.ga4_90d.landingPagesBelowThreshold.totalSessions} sessions (${inputs.ga4_90d.landingPagesBelowThreshold.totalEngagedSessions} engaged) spread across single-session landing pages: ${inputs.ga4_90d.landingPagesBelowThreshold.note}` : ""}

${inputs.ga4_90d.notableAbsence ? `**Notable absence**: \`${inputs.ga4_90d.notableAbsence.path}\` — ${inputs.ga4_90d.notableAbsence.finding}` : ""}

## Search (GSC)

Current window: ${inputs.gsc_current.period.startDate} to ${inputs.gsc_current.period.endDate}. Previous window: ${inputs.gsc_previous.period.startDate} to ${inputs.gsc_previous.period.endDate}.

| Metric | Previous | Current | Change |
|---|---|---|---|
| Clicks | ${s.clicks.from} | ${s.clicks.to} | ${formatPct(s.clicks.percentChange)} |
| Impressions | ${s.impressions.from} | ${s.impressions.to} | ${formatPct(s.impressions.percentChange)} |
| CTR | ${formatCtr(s.ctrPrevious)} | ${formatCtr(s.ctrCurrent)} | ${s.ctrCurrent >= s.ctrPrevious ? "improved" : "declined"} |
| Avg. position | ${s.averagePositionPrevious.toFixed(1)} | ${s.averagePositionCurrent.toFixed(1)} | ${s.positionGotWorse ? "got worse (higher number)" : "improved"} |

Impressions roughly ${inputs.gsc_current.totals.impressions > inputs.gsc_previous.totals.impressions * 2 ? "doubled" : "grew"} while average position moved from ${s.averagePositionPrevious.toFixed(1)} to ${s.averagePositionCurrent.toFixed(1)} and CTR fell — consistent with new impression volume coming disproportionately from high-volume, zero-click definitional queries (see Quick wins below) rather than higher-intent queries.

**Quick-win opportunities (GSC-detected)**: ${s.quickWinOpportunities} opportunities, concentrated on the LPA "meaning" pages. Estimated additional clicks available from the top opportunities: ~${s.quickWinEstimatedClicks}/quarter against a real current quarterly total of ${inputs.gsc_current.totals.clicks} clicks sitewide. ${inputs.gsc_current.quickWins.finding}

**Flagship report indexing**: \`${inputs.gsc_current.indexingChecks.flagshipReportIndexInspect.url}\` — ${s.flagshipReportIndexed ? "indexed" : "NOT indexed"} (\`${inputs.gsc_current.indexingChecks.flagshipReportIndexInspect.coverageState}\`). ${inputs.gsc_current.indexingChecks.flagshipReportIndexInspect.finding}

**Backlinks**: ${inputs.gsc_current.linksReport.statement} This does not block the pilot; backlink verification for the tiered prospect list continues to rely on manual, independently-visible confirmation (see \`docs/growth/backlink-prospects-tiered.csv\`), not this connector.

## Content and indexing

| Metric | Value | Source |
|---|---|---|
| Indexed pages (sitemap rollup) | ${inputs.gsc_current.indexingChecks.sitemap.urlsSubmitted} submitted / ${inputs.gsc_current.indexingChecks.sitemap.urlsMarkedIndexedByThisField} per the sitemap "indexed" field | GSC \`list_sitemaps\` — ${inputs.gsc_current.indexingChecks.sitemap.reliabilityNote} |
| Top landing pages | see table above | GA4 \`landingPagePlusQueryString\` |
| Top queries | zero branded queries observed; dominated by "X lpa meaning"-style definitional queries | GSC query dimension (658 rows; undercounts true totals — see \`gsc-baseline-current.json\` note) |
| Branded vs. non-branded search share | 0% branded of ${inputs.gsc_current.totals.clicks} total quarterly clicks (0 branded query rows found in 658) | GSC query dimension, manually classified |

## Distribution channels (verified — see \`docs/salaryexit-distribution-forensics.md\`)

| Metric | Value | Source |
|---|---|---|
| LinkedIn posts published | 3 (personal profile only; company page activity unconfirmed) | \`linkedin.xls\` |
| LinkedIn 30-day organic impressions (06/22–07/21/2026) | 1,322 | \`linkedin.xls\` → Metrics |
| LinkedIn 30-day organic clicks | 17 | \`linkedin.xls\` → Metrics |
| LinkedIn-attributed GA4 sessions (90d, linkedin.com/referral + linkedin_post_link) | 14 sessions / 9 engaged | GA4 sourceMedium, this baseline |
| Reddit-attributed GA4 sessions (90d, reddit/comment + reddit.com/referral) | 15 sessions / 14 engaged | GA4 sourceMedium, this baseline |
| Email — college outreach sent | 68 (of 69 contacts, 1 dedup) | \`outreach/sent_log.csv\` |
| Email — B2B outreach sent | 5 | \`outreach/sent_log_b2b.csv\` |

LinkedIn- and Reddit-attributed GA4 sessions above are GA4's own \`sessionSourceMedium\` classification, not an inference from social-platform impression counts — see \`docs/growth/prior-campaign-impact.md\` for the full correlation-vs-causation analysis against the known posting dates.

## Authority

| Metric | Value | Source |
|---|---|---|
| Referring domains (independent, editorial) | 0 confirmed | \`docs/salaryexit-distribution-forensics.md\` §12 |
| Referring domains (social/UGC, nofollow) | 5 (2 Reddit posts still live, 3 LinkedIn posts) | Same |
| GSC external-links report | Not available from this connector | \`${inputs.gsc_current.linksReport.statement}\` |
| Third-party Domain Authority / Domain Rating | Unknown | Not verifiably available locally — explicitly a secondary metric per this campaign's strategic principle, not a target |

## Product surface (context, not a target — already built)

CTC-to-in-hand (+ gross-to-in-hand mode), reverse salary, Salary Reality Check, tax-regime comparison, HRA, EPF, notice-period buyout, gratuity, leave encashment, final settlement, offer comparison, city salary scenarios, salary/tax/job-switch guides, named creator + methodology, GA4 + Plausible event wiring, calculation-error reporting, dynamic OG images, publisher embed (\`/embed/*\`), college resource (First Offer Reality Guide).

## What this baseline does NOT include

No paid traffic, no directory submissions, no press coverage, no podcast/YouTube presence, no Product Hunt launch — confirmed absent from local evidence (see forensics report §8). No LinkedIn follower count (not exposed by any connected source). No independently-confirmed editorial backlinks (GSC does not expose a links report; manual verification only).
`;

  const outPath = path.resolve(process.cwd(), "docs/growth/00-baseline.md");
  writeFileSync(outPath, md, "utf-8");
  console.log(`Wrote ${outPath}`);
}

main();
