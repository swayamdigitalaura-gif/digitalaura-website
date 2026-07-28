// Fetches the site-wide Header & Footer Code (GTM/gtag etc.) that the admin
// panel ("Aura Desk") saves to the Setting table under global_head_code /
// global_body_code. This runs server-side on every request (see server.ts),
// so this landing page always reflects whatever was last saved — the same
// way the main site's static pages pick it up, just fetched live instead of
// baked into a static file at build/export time.
//
// Cached briefly in-memory so we don't hit the backend on every single
// request; a save in Aura Desk takes effect here within CACHE_MS.

const SETTINGS_URL = "https://thedigitalaura.com/api/settings";
const CACHE_MS = 60_000;

let cache: { headCode: string; bodyCode: string } | null = null;
let cachedAt = 0;
let inFlight: Promise<{ headCode: string; bodyCode: string }> | null = null;

async function fetchGlobalCode(): Promise<{ headCode: string; bodyCode: string }> {
  try {
    const res = await fetch(SETTINGS_URL, { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return {
      headCode: data?.data?.global_head_code || "",
      bodyCode: data?.data?.global_body_code || "",
    };
  } catch {
    // Backend unreachable or slow — render the page without the injected
    // code rather than failing the whole request.
    return { headCode: "", bodyCode: "" };
  }
}

export async function getGlobalCode(): Promise<{ headCode: string; bodyCode: string }> {
  const now = Date.now();
  if (cache && now - cachedAt < CACHE_MS) return cache;
  if (!inFlight) {
    inFlight = fetchGlobalCode().then((result) => {
      cache = result;
      cachedAt = Date.now();
      inFlight = null;
      return result;
    });
  }
  return inFlight;
}
