import { NextResponse } from "next/server";
import { getIndexNowKey } from "@/lib/indexnow";

/**
 * IndexNow ownership file: `GET /{INDEXNOW_KEY}.txt` returns the raw key (UTF-8).
 * @see https://www.indexnow.org/documentation
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ indexnowKey: string }> }
) {
  const { indexnowKey } = await context.params;
  const key = getIndexNowKey();

  if (!key) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (indexnowKey !== `${key}.txt`) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
