import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * If a request reaches the app with HTTP (some proxies/CDNs pass x-forwarded-proto),
 * force HTTPS for the configured public host so crawlers and users never persist http:// URLs.
 * Hostnames come from `NEXT_PUBLIC_SITE_URL` (+ optional `www.` variant). Previews on *.vercel.app are unchanged.
 */
function hostsFromSiteUrl(): Set<string> {
  const raw = globalThis.process?.env?.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return new Set();
  try {
    const hostname = new URL(raw).hostname.toLowerCase();
    if (!hostname) return new Set();
    const set = new Set<string>([hostname]);
    if (hostname.startsWith("www.")) set.add(hostname.slice(4));
    else set.add(`www.${hostname}`);
    return set;
  } catch {
    return new Set();
  }
}

export function middleware(request: NextRequest) {
  try {
    const httpsCanonicalHosts = hostsFromSiteUrl();
    if (httpsCanonicalHosts.size === 0) {
      return NextResponse.next();
    }

    const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
    if (!host || !httpsCanonicalHosts.has(host)) {
      return NextResponse.next();
    }

    const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
    if (proto === "http") {
      const url = request.nextUrl.clone();
      url.protocol = "https:";
      return NextResponse.redirect(url, 308);
    }
  } catch {
    // Never break page delivery because of canonicalization logic.
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
