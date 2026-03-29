/**
 * Canonical site origin for metadataBase, sitemap, and robots.
 * Production: set NEXT_PUBLIC_SITE_URL to your primary host (e.g. https://salaryexit.in).
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
 * is mistakenly set to `http://salaryexit.in`, Google Search Console will list `http://` URLs
 * as “Discovered” and may delay indexing.
 */
function ensureHttpsForPublicHosts(url: URL): URL {
  if (url.protocol !== "http:") return url;
  if (isLocalDevHost(url.hostname)) return url;
  const upgraded = new URL(url.href);
  upgraded.protocol = "https:";
  return upgraded;
}

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
  return ensureHttpsForPublicHosts(resolved);
}
