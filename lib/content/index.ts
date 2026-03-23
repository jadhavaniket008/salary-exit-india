export {
  getAllLpaSlugs,
  getLpaLandingPageConfig,
  LPA_LANDING_PAGES,
  type LpaLandingPageConfig,
} from "./lpa-pages.config";
export {
  GUIDE_ARTICLES,
  GUIDE_HUBS,
  getGuideArticleByHubSegment,
  guideArticlePath,
  listArticlesForHub,
  type GuideArticleMeta,
  type GuideHubId,
} from "./guides-registry";
export { getSiteSearchIndex, type SearchItem } from "./site-search-index";
export {
  getLandingRouteInventory,
  hasDuplicateIntentSlugs,
  type LandingRouteEntry,
} from "./landing-routes-inventory";
export { guideArticleMetadata } from "./guide-metadata";
export { EDUCATION_LINKS_BY_CALCULATOR } from "./calculator-education-links";
export { HOME_FAQ } from "./home-content";
