/**
 * Campaign URL builder — the fix for the UTM inconsistency documented in
 * docs/salaryexit-distribution-forensics.md §10 (`?utm=reddit`, missing UTMs,
 * `?utm_source=redd`). See docs/growth/utm-standard.md for the naming rules
 * this enforces.
 */

import { getSiteOrigin } from "@/lib/seo/site-origin";

const KEBAB_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export type CampaignUrlInput = {
  /** Absolute URL or site-relative path, e.g. "/ctc-to-in-hand-calculator" */
  destinationUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmId?: string;
};

export type CampaignUrlResult =
  | { ok: true; url: string }
  | { ok: false; errors: string[] };

function isValidKebab(value: string): boolean {
  return KEBAB_PATTERN.test(value);
}

/** Strips a trailing slash before a query string so the link doesn't trigger
 *  Next.js's trailing-slash redirect (confirmed 308 on this site — see
 *  docs/salaryexit-distribution-forensics.md §10, /ctc-to-in-hand-calculator/?utm_source=redd). */
function normalizePath(pathOrUrl: string): { origin: string; pathname: string } {
  const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
  const base = getSiteOrigin().origin.replace(/\/$/, "");
  const url = new URL(pathOrUrl, isAbsolute ? undefined : base);
  const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  return { origin: `${url.protocol}//${url.host}`, pathname };
}

/**
 * Builds a validated campaign URL. Never writes anything — pure function,
 * pairs with scripts/growth/generate-campaign-url.ts for CLI/manual use.
 */
export function buildCampaignUrl(input: CampaignUrlInput): CampaignUrlResult {
  const errors: string[] = [];

  const fields: Array<[string, string]> = [
    ["utm_source", input.utmSource],
    ["utm_medium", input.utmMedium],
    ["utm_campaign", input.utmCampaign],
    ["utm_content", input.utmContent],
  ];
  if (input.utmId !== undefined) fields.push(["utm_id", input.utmId]);

  for (const [name, value] of fields) {
    if (!value || value.trim().length === 0) {
      errors.push(`${name} is required and cannot be empty.`);
      continue;
    }
    if (!isValidKebab(value)) {
      errors.push(
        `${name}="${value}" is not valid lowercase kebab-case (letters, digits, single hyphens only, e.g. "personal-profile-carousel-01").`
      );
    }
  }

  if (!input.destinationUrl || input.destinationUrl.trim().length === 0) {
    errors.push("destinationUrl is required.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  let origin: string;
  let pathname: string;
  try {
    const normalized = normalizePath(input.destinationUrl);
    origin = normalized.origin;
    pathname = normalized.pathname;
  } catch {
    return { ok: false, errors: [`destinationUrl="${input.destinationUrl}" is not a valid URL or path.`] };
  }

  const params = new URLSearchParams();
  params.set("utm_source", input.utmSource);
  params.set("utm_medium", input.utmMedium);
  params.set("utm_campaign", input.utmCampaign);
  params.set("utm_content", input.utmContent);
  if (input.utmId) params.set("utm_id", input.utmId);

  return { ok: true, url: `${origin}${pathname}?${params.toString()}` };
}
