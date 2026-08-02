import { describe, expect, it, beforeAll } from "vitest";
import { buildCampaignUrl } from "@/lib/growth/campaign-url";

beforeAll(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.salaryexit.in";
});

describe("buildCampaignUrl", () => {
  it("builds a valid, fully-tagged URL for a relative path", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/ctc-to-in-hand-calculator",
      utmSource: "reddit",
      utmMedium: "community",
      utmCampaign: "required-ctc-report-2026",
      utmContent: "personalfinanceindia-native-table",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.url).toBe(
        "https://www.salaryexit.in/ctc-to-in-hand-calculator?utm_source=reddit&utm_medium=community&utm_campaign=required-ctc-report-2026&utm_content=personalfinanceindia-native-table"
      );
    }
  });

  it("strips a trailing slash before the destination path to avoid a 308 redirect hop", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/ctc-to-in-hand-calculator/",
      utmSource: "reddit",
      utmMedium: "community",
      utmCampaign: "required-ctc-report-2026",
      utmContent: "indiainvestments-demo-video",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.url.startsWith("https://www.salaryexit.in/ctc-to-in-hand-calculator?")).toBe(true);
      expect(result.url).not.toContain("calculator/?");
    }
  });

  it("preserves the canonical route for the homepage (root path)", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/",
      utmSource: "linkedin",
      utmMedium: "organic-social",
      utmCampaign: "required-ctc-report-2026",
      utmContent: "personal-profile-carousel-01",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.url).toBe(
        "https://www.salaryexit.in/?utm_source=linkedin&utm_medium=organic-social&utm_campaign=required-ctc-report-2026&utm_content=personal-profile-carousel-01"
      );
    }
  });

  it("accepts an absolute URL destination and preserves its host", () => {
    const result = buildCampaignUrl({
      destinationUrl: "https://www.salaryexit.in/for-businesses",
      utmSource: "hr-newsletter",
      utmMedium: "referral",
      utmCampaign: "required-ctc-report-2026",
      utmContent: "editorial-chart",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.url).toContain("https://www.salaryexit.in/for-businesses?");
    }
  });

  it("rejects an uppercase utm_source", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/",
      utmSource: "LinkedIn",
      utmMedium: "organic-social",
      utmCampaign: "required-ctc-report-2026",
      utmContent: "post-01",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("utm_source"))).toBe(true);
    }
  });

  it("rejects a non-standard bare utm param name pattern by requiring all four fields explicitly", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/salary-enough/is-20-lpa-good-in-delhi",
      utmSource: "reddit",
      utmMedium: "community",
      utmCampaign: "",
      utmContent: "city-affordability-delhi",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("utm_campaign"))).toBe(true);
    }
  });

  it("rejects underscores or spaces (not kebab-case)", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/",
      utmSource: "reddit",
      utmMedium: "community",
      utmCampaign: "required_ctc_report_2026",
      utmContent: "native table",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  it("rejects a malformed utm_source like the forensics report's own '?utm=reddit' mistake would produce if source were empty", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/",
      utmSource: "",
      utmMedium: "community",
      utmCampaign: "required-ctc-report-2026",
      utmContent: "city-affordability-delhi",
    });
    expect(result.ok).toBe(false);
  });

  it("includes utm_id when provided", () => {
    const result = buildCampaignUrl({
      destinationUrl: "/",
      utmSource: "college-placement",
      utmMedium: "email",
      utmCampaign: "graduate-offer-guide-2026",
      utmContent: "placement-cell-outreach-01",
      utmId: "camp-0007",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.url).toContain("utm_id=camp-0007");
    }
  });
});
