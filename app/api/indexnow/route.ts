import { NextResponse } from "next/server";
import { submitUrlsToIndexNow } from "@/lib/indexnow";

/**
 * Protected IndexNow submission endpoint.
 * POST JSON: `{ "urls": ["https://salaryexit.in/page", ...] }`
 * Header: `Authorization: Bearer <INDEXNOW_WEBHOOK_SECRET>`
 *
 * Generate a long random secret in Vercel and store as INDEXNOW_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "INDEXNOW_WEBHOOK_SECRET is not configured." },
      { status: 501 }
    );
  }

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const urls = (body as { urls?: unknown }).urls;
  if (!Array.isArray(urls) || !urls.every((u) => typeof u === "string")) {
    return NextResponse.json(
      { error: 'Body must be { "urls": string[] }' },
      { status: 400 }
    );
  }

  try {
    const res = await submitUrlsToIndexNow(urls as string[]);
    const text = await res.text();
    return NextResponse.json(
      {
        indexNowStatus: res.status,
        indexNowBody: text || null,
      },
      { status: res.ok ? 200 : res.status }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "IndexNow submit failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
