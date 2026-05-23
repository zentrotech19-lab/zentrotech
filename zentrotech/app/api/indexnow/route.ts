import { NextResponse } from "next/server";

// IndexNow ping endpoint — submits URLs to Bing, Yandex, Naver, Seznam (and
// indirectly Microsoft Copilot / ChatGPT search) in seconds instead of days.
//
// Usage:
//   POST /api/indexnow             → submits the full sitemap URL list
//   POST /api/indexnow?url=...     → submits a single URL
//
// Protected by INDEXNOW_PING_SECRET env var (must match Authorization header).
// Without the env var set, the endpoint is disabled in production.

const INDEXNOW_KEY = "cb6a82d72d99c4293a17e6454b7bf50e";
const HOST = "zentrotech.in";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

// Default URL set — refreshed on every ping. Mirrors the multilingual root
// pages + the high-value lead-generation routes.
const DEFAULT_URLS = [
  `https://${HOST}/en`,
  `https://${HOST}/ta`,
  `https://${HOST}/kn`,
  `https://${HOST}/services`,
  `https://${HOST}/locations/bangalore`,
  `https://${HOST}/contact`,
];

function authorized(req: Request): boolean {
  const secret = process.env.INDEXNOW_PING_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${secret}`;
}

export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url).searchParams.get("url");
  const urlList = url ? [url] : DEFAULT_URLS;

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: urlList.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Surface the key + status on GET for easy verification from a browser.
export async function GET() {
  return NextResponse.json({
    keyLocation: KEY_LOCATION,
    host: HOST,
    note: "POST to this endpoint with a valid Authorization header to ping IndexNow.",
  });
}
