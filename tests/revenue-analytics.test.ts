import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackAffiliateClick, trackBusinessInquiry, trackEmbedCodeCopied,
  trackNewsletterSignup, trackOfferCompareClick, trackResourceDownload,
  trackLpa12CalculatorEntry, trackLpa12ExampleCompleted, trackHomeHeroToolClick } from "@/lib/analytics/client";

describe("consented intent measurement", () => {
  let consent: boolean;
  const gtag = vi.fn();
  const plausible = vi.fn();
  beforeEach(() => {
    consent = true;
    gtag.mockClear(); plausible.mockClear();
    vi.stubEnv("NEXT_PUBLIC_ENABLE_CONSENT_BANNER", "true");
    vi.stubGlobal("window", { gtag, plausible });
    vi.stubGlobal("localStorage", { getItem: () => JSON.stringify({ necessary: true, analytics: consent, ads: false }) });
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("records business intent without manufacturing a lead or purchase", () => {
    trackBusinessInquiry("business_hero");
    expect(gtag).toHaveBeenCalledExactlyOnceWith("event", "business_inquiry_click", {
      cta_placement: "business_hero", offer_id: "supported_embed_pilot",
    });
  });
  it("keeps CTA placement separate from traffic source", () => {
    trackOfferCompareClick("linkedin_post_link");
    expect(gtag).toHaveBeenCalledWith("event", "offer_compare_click", { cta_placement: "linkedin_post_link" });
  });
  it("sends only categorical resource, partner and signup data", () => {
    trackResourceDownload("csv"); trackEmbedCodeCopied(); trackNewsletterSignup(); trackAffiliateClick("Zerodha", "investing");
    expect(gtag.mock.calls.map((c) => c[1])).toEqual(["resource_download_click", "embed_code_copy", "sign_up", "affiliate_link_click"]);
    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(/email|salary_amount|purchase|generate_lead/);
  });
  it("measures only categorical 12 LPA guide-to-calculator intent and completion", () => {
    trackLpa12CalculatorEntry();
    trackLpa12ExampleCompleted();
    expect(gtag.mock.calls).toEqual([
      ["event", "lpa12_example_cta_click", { cta_placement: "lpa_12_hero" }],
      ["event", "lpa12_example_calculation_complete", undefined],
    ]);
    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(/salary_amount|gross_amount|income_value/);
  });
  it("records home-hero route selection as intent, not calculator usage", () => {
    trackHomeHeroToolClick("ctcToInHand");
    trackHomeHeroToolClick("offerComparison");
    expect(gtag.mock.calls).toEqual([
      ["event", "home_hero_tool_click", {
        cta_placement: "home_hero", destination_tool: "ctcToInHand",
      }],
      ["event", "home_hero_tool_click", {
        cta_placement: "home_hero", destination_tool: "offerComparison",
      }],
    ]);
    expect(plausible.mock.calls.map((c) => c[0])).toEqual([
      "home_hero_tool_click", "home_hero_tool_click",
    ]);
    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(/income|salary_amount|email|purchase|generate_lead|utm_/);
  });
  it("does not record a home hero click when analytics consent is withdrawn", () => {
    consent = false;
    trackHomeHeroToolClick("ctcToInHand");
    expect(gtag).not.toHaveBeenCalled();
    expect(plausible).not.toHaveBeenCalled();
  });

  it("stops custom events after withdrawal even when the loaded functions remain", () => {
    consent = false;
    trackBusinessInquiry("business_footer"); trackResourceDownload("json"); trackOfferCompareClick("result");
    expect(gtag).not.toHaveBeenCalled(); expect(plausible).not.toHaveBeenCalled();
  });
  it("fails closed when consent storage is unavailable", () => {
    vi.stubGlobal("localStorage", { getItem: () => { throw new Error("blocked"); } });
    expect(() => trackNewsletterSignup()).not.toThrow();
    expect(gtag).not.toHaveBeenCalled();
  });
});
