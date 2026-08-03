/**
 * Pure normalization/derivation layer over the sanitized GA4 + GSC snapshot
 * JSON files in docs/growth/generated/. Takes the raw connector output
 * (already stripped of any user-level or credential data by whoever wrote
 * the snapshot) and computes the period-over-period deltas the growth
 * baseline doc and pilot thresholds are built from.
 *
 * No I/O and no MCP calls happen here — see
 * scripts/growth/generate-live-baseline.ts for the file-reading driver.
 */

export interface Ga4ChannelRow {
  channel: string;
  sessions: number;
  engagedSessions: number;
}

export interface Ga4SourceMediumRow {
  sourceMedium: string;
  sessions: number;
  engagedSessions: number;
  note?: string;
}

export interface Ga4EventRow {
  eventName: string;
  eventCount: number;
}

export interface Ga4LandingPageRow {
  path: string;
  sessions: number;
  engagedSessions: number;
}

export interface Ga4PeriodTotals {
  sessions: number;
  totalUsers: number;
  engagedSessions: number;
  averageSessionDurationSeconds: number;
  eventCount: number;
}

export interface Ga4Snapshot28d {
  period: { startDate: string; endDate: string; label: string };
  totals: Ga4PeriodTotals;
  channelGroup: Ga4ChannelRow[];
}

export interface Ga4Snapshot90d {
  period: { startDate: string; endDate: string; label: string };
  totals: Ga4PeriodTotals;
  sourceMedium: Ga4SourceMediumRow[];
  eventTotals90d: Ga4EventRow[];
  eventsNotObserved90d: string[];
  country: { country: string; sessions: number; share: number }[];
  deviceCategory: { device: string; sessions: number }[];
  landingPages: Ga4LandingPageRow[];
  landingPagesBelowThreshold?: { note: string; totalSessions: number; totalEngagedSessions: number };
  notableAbsence?: { path: string; finding: string };
}

export interface Ga4SnapshotPrevious90d {
  period: { startDate: string; endDate: string; label: string };
  totals: Ga4PeriodTotals;
}

export interface GscQuickWins {
  totalOpportunities: number;
  estimatedAdditionalClicksFromTop7: number;
  dominantPages: { page: string; opportunityCount: number; estimatedAdditionalClicks: number }[];
  finding: string;
}

export interface GscIndexingChecks {
  sitemap: { urlsSubmitted: number; urlsMarkedIndexedByThisField: number; reliabilityNote: string };
  flagshipReportIndexInspect: { url: string; verdict: string; coverageState: string; finding: string };
}

export interface GscSnapshotCurrent {
  period: { startDate: string; endDate: string; label: string };
  totals: { clicks: number; impressions: number; ctr: number; averagePosition: number };
  quickWins: GscQuickWins;
  indexingChecks: GscIndexingChecks;
  linksReport: { available: boolean; statement: string };
}

export interface GscSnapshotPrevious {
  period: { startDate: string; endDate: string; label: string };
  totals: { clicks: number; impressions: number; ctr: number; averagePosition: number };
}

export interface AnalyticsBaselineInputs {
  ga4_28d: Ga4Snapshot28d;
  ga4_90d: Ga4Snapshot90d;
  ga4_previous90d: Ga4SnapshotPrevious90d;
  gsc_current: GscSnapshotCurrent;
  gsc_previous: GscSnapshotPrevious;
}

export interface PercentChange {
  from: number;
  to: number;
  absoluteChange: number;
  percentChange: number | null; // null when `from` is 0 (percent change undefined)
}

function percentChange(from: number, to: number): PercentChange {
  const absoluteChange = to - from;
  const percentChangeValue = from === 0 ? null : (absoluteChange / from) * 100;
  return { from, to, absoluteChange, percentChange: percentChangeValue };
}

export interface AnalyticsBaseline {
  ga4: {
    sessions90d: PercentChange;
    users90d: PercentChange;
    engagedSessions90d: PercentChange;
    engagementRateCurrent: number;
    engagementRatePrevious: number;
    engagementRateDeltaPoints: number;
    averageSessionDurationSeconds90d: PercentChange;
    topChannelsByEngagedSessions28d: Ga4ChannelRow[];
    attributableSourceMediumRows90d: Ga4SourceMediumRow[];
    unattributableSourceMediumRows90d: Ga4SourceMediumRow[];
    calculatorUseEvents90d: number;
    shareEventsObserved: boolean;
    topLandingPages90d: Ga4LandingPageRow[];
  };
  gsc: {
    clicks: PercentChange;
    impressions: PercentChange;
    ctrCurrent: number;
    ctrPrevious: number;
    averagePositionCurrent: number;
    averagePositionPrevious: number;
    positionGotWorse: boolean;
    quickWinOpportunities: number;
    quickWinEstimatedClicks: number;
    flagshipReportIndexed: boolean;
    linksReportAvailable: boolean;
  };
  generatedAtIso: string;
}

export function buildAnalyticsBaseline(inputs: AnalyticsBaselineInputs): AnalyticsBaseline {
  const { ga4_28d, ga4_90d, ga4_previous90d, gsc_current, gsc_previous } = inputs;

  const engagementRateCurrent = ga4_90d.totals.sessions === 0 ? 0 : ga4_90d.totals.engagedSessions / ga4_90d.totals.sessions;
  const engagementRatePrevious =
    ga4_previous90d.totals.sessions === 0 ? 0 : ga4_previous90d.totals.engagedSessions / ga4_previous90d.totals.sessions;

  const attributableSourceMediumRows90d = ga4_90d.sourceMedium.filter((row) => !row.note);
  const unattributableSourceMediumRows90d = ga4_90d.sourceMedium.filter((row) => Boolean(row.note));

  const calculatorUseEvent = ga4_90d.eventTotals90d.find((e) => e.eventName === "calculator_use");
  const shareEvent = ga4_90d.eventTotals90d.find((e) => e.eventName === "share_summary");

  const topChannelsByEngagedSessions28d = [...ga4_28d.channelGroup].sort(
    (a, b) => b.engagedSessions - a.engagedSessions
  );

  const topLandingPages90d = [...ga4_90d.landingPages]
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 5);

  return {
    ga4: {
      sessions90d: percentChange(ga4_previous90d.totals.sessions, ga4_90d.totals.sessions),
      users90d: percentChange(ga4_previous90d.totals.totalUsers, ga4_90d.totals.totalUsers),
      engagedSessions90d: percentChange(ga4_previous90d.totals.engagedSessions, ga4_90d.totals.engagedSessions),
      engagementRateCurrent,
      engagementRatePrevious,
      engagementRateDeltaPoints: (engagementRateCurrent - engagementRatePrevious) * 100,
      averageSessionDurationSeconds90d: percentChange(
        ga4_previous90d.totals.averageSessionDurationSeconds,
        ga4_90d.totals.averageSessionDurationSeconds
      ),
      topChannelsByEngagedSessions28d,
      attributableSourceMediumRows90d,
      unattributableSourceMediumRows90d,
      calculatorUseEvents90d: calculatorUseEvent ? calculatorUseEvent.eventCount : 0,
      shareEventsObserved: Boolean(shareEvent && shareEvent.eventCount > 0),
      topLandingPages90d,
    },
    gsc: {
      clicks: percentChange(gsc_previous.totals.clicks, gsc_current.totals.clicks),
      impressions: percentChange(gsc_previous.totals.impressions, gsc_current.totals.impressions),
      ctrCurrent: gsc_current.totals.ctr,
      ctrPrevious: gsc_previous.totals.ctr,
      averagePositionCurrent: gsc_current.totals.averagePosition,
      averagePositionPrevious: gsc_previous.totals.averagePosition,
      positionGotWorse: gsc_current.totals.averagePosition > gsc_previous.totals.averagePosition,
      quickWinOpportunities: gsc_current.quickWins.totalOpportunities,
      quickWinEstimatedClicks: gsc_current.quickWins.estimatedAdditionalClicksFromTop7,
      flagshipReportIndexed: gsc_current.indexingChecks.flagshipReportIndexInspect.coverageState !== "URL is unknown to Google",
      linksReportAvailable: gsc_current.linksReport.available,
    },
    generatedAtIso: new Date().toISOString().slice(0, 10),
  };
}
