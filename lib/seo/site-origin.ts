/**
 * Canonical site origin for metadataBase, sitemap, and robots.
 * Production: set NEXT_PUBLIC_SITE_URL to your primary host (e.g. https://www.salaryexit.in).
 * On Vercel without that var, falls back to VERCEL_URL so previews still get absolute URLs.
 */
function isLocalDevHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".local")
  );
}

/**
 * Sitemaps, canonicals, and JSON-LD must use https for real domains. If `NEXT_PUBLIC_SITE_URL`
 * is mistakenly set to `http://www.salaryexit.in`, Google Search Console will list `http://` URLs
 * as “Discovered” and may delay indexing.
 */
function ensureHttpsForPublicHosts(url: URL): URL {
  if (url.protocol !== "http:") return url;
  if (isLocalDevHost(url.hostname)) return url;
  const upgraded = new URL(url.href);
  upgraded.protocol = "https:";
  return upgraded;
}

/**
 * Production apex host for this site. If env is mistakenly set to apex, we still emit
 * www in sitemaps, robots Host, and metadata so crawlers see one canonical host.
 */
const PRODUCTION_APEX_HOSTNAME = "salaryexit.in";
const PRODUCTION_CANONICAL_ORIGIN = "https://www.salaryexit.in";

export function getSiteOrigin(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  let resolved: URL;
  if (explicit) {
    resolved = new URL(explicit);
  } else {
    const vercel = process.env.VERCEL_URL?.trim();
    if (vercel) {
      resolved = new URL(`https://${vercel}`);
    } else {
      resolved = new URL("http://localhost:3000");
    }
  }
  let out = ensureHttpsForPublicHosts(resolved);
  // Align apex → www for the live domain (matches Vercel primary host + NEXT_PUBLIC_SITE_URL).
  if (out.hostname === PRODUCTION_APEX_HOSTNAME) {
    out = new URL(PRODUCTION_CANONICAL_ORIGIN);
  }
  return out;
}
