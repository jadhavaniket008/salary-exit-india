import { getSiteOrigin } from "@/lib/seo/site-origin";

/** Public verification key (hosted at `/{key}.txt`). Set `INDEXNOW_KEY` in env. */
export function getIndexNowKey(): string | undefined {
  const k = process.env.INDEXNOW_KEY?.trim();
  return k && k.length > 0 ? k : undefined;
}

export function getIndexNowKeyFileUrl(): string | undefined {
  const key = getIndexNowKey();
  if (!key) return undefined;
  const origin = getSiteOrigin().origin.replace(/\/$/, "");
  return `${origin}/${key}.txt`;
}

export type IndexNowSubmitPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export function buildIndexNowPayload(urls: string[]): IndexNowSubmitPayload | null {
  const key = getIndexNowKey();
  const keyLocation = getIndexNowKeyFileUrl();
  if (!key || !keyLocation) return null;

  const origin = getSiteOrigin();
  const host = origin.hostname;
  const normalized = urls
    .map((u) => u.trim())
    .filter(Boolean)
    .map((u) => {
      try {
        const parsed = new URL(u);
        const apexHost = host.startsWith("www.") ? host.slice(4) : host;
        const wwwHost = host.startsWith("www.") ? host : `www.${host}`;
        if (parsed.hostname !== apexHost && parsed.hostname !== wwwHost) {
          throw new Error(`URL hostname must match ${host}: ${u}`);
        }
        parsed.protocol = "https:";
        return parsed.href;
      } catch {
        throw new Error(`Invalid URL: ${u}`);
      }
    });

  if (!normalized.length) {
    throw new Error("No valid URLs to submit.");
  }

  return {
    host,
    key,
    keyLocation,
    urlList: normalized,
  };
}

/**
 * POST JSON body to IndexNow (Bing, Yandex, Seznam, Naver, etc.).
 * @see https://www.indexnow.org/documentation
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<Response> {
  const body = buildIndexNowPayload(urls);
  if (!body) {
    throw new Error("INDEXNOW_KEY is not set or key file URL could not be built.");
  }

  return fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });
}
