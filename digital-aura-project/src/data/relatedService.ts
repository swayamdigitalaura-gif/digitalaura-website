export type RelatedService = { label: string; blurb: string; cta: string; href: string; external?: boolean };

/** Link text for the Google Ads box, one per guide, so the same words are not repeated across pages. Anything not listed uses the default. */
const GADS_CTA_BY_SLUG: Record<string, string> = {
  "google-ads-2026-new-strategies": "Google Ads and performance marketing in Ahmedabad",
  "google-ads-tactics-stopped-working-2026": "PPC management for modern Google Ads accounts in Ahmedabad",
  "google-ads-strategy-checklist-2026": "Google Ads and PPC management team in Ahmedabad",
  "local-business-google-ads-maps-2026": "Google Ads for local businesses in Ahmedabad",
  "7-google-ads-mistakes-2026": "Google Ads management that fixes these mistakes",
  "google-ads-vs-meta-ads-ahmedabad": "Google Ads and PPC company in Ahmedabad",
  "how-to-choose-google-ads-agency-ahmedabad": "Google Ads and performance marketing company in Ahmedabad",
  "google-ads-audit-checklist": "Google Ads management after your audit in Ahmedabad",
  "google-ads-clicks-but-no-leads-fixes": "PPC management for lead-focused Google Ads in Ahmedabad",
  "google-ads-real-estate-ahmedabad-guide": "Google Ads for real estate in Ahmedabad",
};

export const relatedServiceFor = (slug: string, category?: string | null): RelatedService | null => {
  const key = `${slug} ${category || ""}`.toLowerCase();
  if (/digital-marketing|digital marketing/.test(key))
    return { label: "Digital Marketing Company in Ahmedabad", blurb: "SEO, Google Ads and Meta Ads planned as one monthly plan, with tracking for calls, WhatsApp and forms.", cta: "See digital marketing plans and pricing", href: "/digital-marketing-company-ahmedabad", external: true };
  if (/google-ads|local-business-google-ads/.test(key))
    return { label: "Google Ads Agency in Ahmedabad", blurb: "Search, Maps and Performance Max campaigns built around qualified leads, not just clicks.", cta: GADS_CTA_BY_SLUG[slug] ?? "Google Ads and performance marketing in Ahmedabad", href: "/google-ads-agency-ahmedabad", external: true };
  if (/meta|instagram|ugc|video-hooks/.test(key))
    return { label: "Meta Ads Agency in Ahmedabad", blurb: "Facebook and Instagram lead-gen campaigns with creative and targeting tested against your real cost per lead.", cta: "See Meta Ads services", href: "/meta-ads-agency-ahmedabad/" };
  if (/seo|rank|organic|google-business|aeo|geo|llmo|chatgpt|ai-overviews|local-seo/.test(key))
    return { label: "SEO Services in Ahmedabad", blurb: "Technical, on-page and local SEO that turns searches into enquiries for Ahmedabad businesses.", cta: "See SEO services", href: "/seo-services-ahmedabad", external: true };
  return null;
};
