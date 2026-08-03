import { describe, it, expect } from "vitest";
import {
  buildAnalyticsBaseline,
  type AnalyticsBaselineInputs,
} from "../lib/growth/analytics-baseline";

function makeInputs(overrides: Partial<AnalyticsBaselineInputs> = {}): AnalyticsBaselineInputs {
  const base: AnalyticsBaselineInputs = {
    ga4_28d: {
      period: { startDate: "2026-07-05", endDate: "2026-08-01", label: "trailing 28 days" },
      totals: { sessions: 70, totalUsers: 45, engagedSessions: 50, averageSessionDurationSeconds: 237, eventCount: 419 },
      channelGroup: [
        { channel: "Direct", sessions: 35, engagedSessions: 24 },
        { channel: "Organic Social", sessions: 21, engagedSessions: 16 },
      ],
    },
    ga4_90d: {
      period: { startDate: "2026-05-04", endDate: "2026-08-01", label: "trailing 90 days" },
      totals: { sessions: 118, totalUsers: 65, engagedSessions: 91, averageSessionDurationSeconds: 252, eventCount: 723 },
      sourceMedium: [
        { sourceMedium: "(direct) / (none)", sessions: 47, engagedSessions: 34 },
        { sourceMedium: "vercel.com / referral", sessions: 21, engagedSessions: 21, note: "not attributable" },
        { sourceMedium: "reddit / comment", sessions: 13, engagedSessions: 12 },
      ],
      eventTotals90d: [
        { eventName: "calculator_use", eventCount: 65 },
        { eventName: "share_summary", eventCount: 0 },
      ],
      eventsNotObserved90d: ["share_summary"],
      country: [{ country: "India", sessions: 118, share: 1 }],
      deviceCategory: [
        { device: "mobile", sessions: 69 },
        { device: "desktop", sessions: 50 },
      ],
      landingPages: [
        { path: "/", sessions: 65, engagedSessions: 56 },
        { path: "/ctc-to-in-hand-calculator", sessions: 22, engagedSessions: 15 },
      ],
      notableAbsence: {
        path: "/reports/india-in-hand-salary-model-2026",
        finding: "Zero landing-page sessions in the 90-day window.",
      },
    },
    ga4_previous90d: {
      period: { startDate: "2026-02-04", endDate: "2026-05-03", label: "preceding 90 days" },
      totals: { sessions: 65, totalUsers: 44, engagedSessions: 25, averageSessionDurationSeconds: 187, eventCount: 345 },
    },
    gsc_current: {
      period: { startDate: "2026-05-05", endDate: "2026-08-01", label: "current" },
      totals: { clicks: 50, impressions: 17917, ctr: 0.00279, averagePosition: 12.96 },
      quickWins: {
        totalOpportunities: 14,
        estimatedAdditionalClicksFromTop7: 127,
        dominantPages: [
          { page: "/lpa/12-lpa-in-hand-salary", opportunityCount: 8, estimatedAdditionalClicks: 114 },
        ],
        finding: "Zero-click definitional queries dominate.",
      },
      indexingChecks: {
        sitemap: { urlsSubmitted: 47, urlsMarkedIndexedByThisField: 0, reliabilityNote: "unreliable field" },
        flagshipReportIndexInspect: {
          url: "https://www.salaryexit.in/reports/india-in-hand-salary-model-2026",
          verdict: "NEUTRAL",
          coverageState: "URL is unknown to Google",
          finding: "Not indexed.",
        },
      },
      linksReport: { available: false, statement: "GSC MCP does not expose external-link reporting." },
    },
    gsc_previous: {
      period: { startDate: "2026-02-04", endDate: "2026-05-04", label: "previous" },
      totals: { clicks: 36, impressions: 7274, ctr: 0.00495, averagePosition: 7.5 },
    },
  };

  return { ...base, ...overrides };
}

describe("buildAnalyticsBaseline", () => {
  it("computes session/user/engaged-session percent change between previous and current 90-day windows", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    expect(baseline.ga4.sessions90d.from).toBe(65);
    expect(baseline.ga4.sessions90d.to).toBe(118);
    expect(baseline.ga4.sessions90d.percentChange).toBeCloseTo(81.54, 1);
  });

  it("computes engagement rate for both periods and the point delta between them", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    expect(baseline.ga4.engagementRateCurrent).toBeCloseTo(91 / 118, 5);
    expect(baseline.ga4.engagementRatePrevious).toBeCloseTo(25 / 65, 5);
    expect(baseline.ga4.engagementRateDeltaPoints).toBeGreaterThan(0);
  });

  it("returns null percentChange when the baseline period value is zero, instead of dividing by zero", () => {
    const inputs = makeInputs();
    inputs.ga4_previous90d.totals.sessions = 0;
    const baseline = buildAnalyticsBaseline(inputs);
    expect(baseline.ga4.sessions90d.percentChange).toBeNull();
    expect(Number.isFinite(baseline.ga4.sessions90d.absoluteChange)).toBe(true);
  });

  it("separates source/medium rows with a non-attributable note from real channel rows", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    const attributableSourceLabels = baseline.ga4.attributableSourceMediumRows90d.map((r) => r.sourceMedium);
    const unattributableSourceLabels = baseline.ga4.unattributableSourceMediumRows90d.map((r) => r.sourceMedium);
    expect(attributableSourceLabels).toContain("(direct) / (none)");
    expect(attributableSourceLabels).toContain("reddit / comment");
    expect(attributableSourceLabels).not.toContain("vercel.com / referral");
    expect(unattributableSourceLabels).toEqual(["vercel.com / referral"]);
  });

  it("reports share_summary as not observed when its event count is zero", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    expect(baseline.ga4.shareEventsObserved).toBe(false);
  });

  it("reports share_summary as observed once its event count is positive", () => {
    const inputs = makeInputs();
    inputs.ga4_90d.eventTotals90d = [{ eventName: "share_summary", eventCount: 2 }];
    const baseline = buildAnalyticsBaseline(inputs);
    expect(baseline.ga4.shareEventsObserved).toBe(true);
  });

  it("computes GSC clicks/impressions percent change and flags a worsened average position", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    expect(baseline.gsc.clicks.percentChange).toBeCloseTo(38.89, 1);
    expect(baseline.gsc.impressions.percentChange).toBeGreaterThan(100);
    expect(baseline.gsc.positionGotWorse).toBe(true);
  });

  it("derives flagshipReportIndexed=false from an 'unknown to Google' coverage state", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    expect(baseline.gsc.flagshipReportIndexed).toBe(false);
  });

  it("derives flagshipReportIndexed=true once coverage state no longer says unknown", () => {
    const inputs = makeInputs();
    inputs.gsc_current.indexingChecks.flagshipReportIndexInspect.coverageState = "Submitted and indexed";
    const baseline = buildAnalyticsBaseline(inputs);
    expect(baseline.gsc.flagshipReportIndexed).toBe(true);
  });

  it("sorts top landing pages by sessions descending", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    const sessionCounts = baseline.ga4.topLandingPages90d.map((p) => p.sessions);
    expect(sessionCounts).toEqual([...sessionCounts].sort((a, b) => b - a));
  });

  it("passes through the GSC links-report unavailability without inventing a value", () => {
    const baseline = buildAnalyticsBaseline(makeInputs());
    expect(baseline.gsc.linksReportAvailable).toBe(false);
  });
});
