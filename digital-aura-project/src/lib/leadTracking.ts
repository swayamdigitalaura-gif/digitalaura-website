// Remembers where a visitor came from so every lead form can send it to /api/contact
// (stored on the inquiry and shown in Admin -> Inquiries).
//
// Attribution is captured once per browser session (the first page of the visit, its
// external referrer and UTM / click-id params) and re-used when the form is submitted,
// even several pages later. If the visitor lands from a new campaign mid-session
// (fresh UTM / gclid / fbclid) that replaces the stored one.

const KEY = "da_attr_v1";

interface Attribution {
  landing_page: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

const read = (): Attribution | null => {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
};

const externalReferrer = (): string => {
  try {
    if (!document.referrer) return "";
    return new URL(document.referrer).hostname === window.location.hostname ? "" : document.referrer;
  } catch {
    return "";
  }
};

/** Call once at app start. */
export function initAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh: Partial<Attribution> = {};
    PARAMS.forEach((p) => {
      const v = params.get(p);
      if (v) fresh[p] = v.slice(0, 250);
    });
    const hasCampaign = Object.keys(fresh).length > 0;
    if (read() && !hasCampaign) return;
    const attr: Attribution = {
      landing_page: window.location.pathname + (hasCampaign ? window.location.search.slice(0, 200) : ""),
      referrer: externalReferrer().slice(0, 500),
      ...fresh,
    };
    sessionStorage.setItem(KEY, JSON.stringify(attr));
  } catch {
    /* storage blocked: fall back to whatever getAttribution can derive live */
  }
}

/** Fields to spread into the /api/contact body. Always safe to call. */
export function getAttribution(): Record<string, string> {
  const stored = read();
  const out: Record<string, string> = {
    page: window.location.pathname,
    landing_page: stored?.landing_page || window.location.pathname,
    referrer: stored?.referrer ?? externalReferrer(),
  };
  if (stored) PARAMS.forEach((p) => { if (stored[p]) out[p] = stored[p] as string; });
  return out;
}
