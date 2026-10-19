export type RelatedService = { label: string; blurb: string; cta: string; href: string; external?: boolean };

export const relatedServiceFor = (slug: string, category?: string | null): RelatedService | null => {
  const key = `${slug} ${category || ""}`.toLowerCase();
  if (/google-ads|local-business-google-ads/.test(key))
    return { label: "Google Ads Agency in Ahmedabad", blurb: "Search, Maps and Performance Max campaigns built around qualified leads, not just clicks.", cta: "See Google Ads services", href: "/google-ads-agency-ahmedabad", external: true };
  if (/meta|instagram|ugc|video-hooks/.test(key))
    return { label: "Meta Ads Agency in Ahmedabad", blurb: "Facebook and Instagram lead-gen campaigns with creative and targeting tested against your real cost per lead.", cta: "See Meta Ads services", href: "/meta-ads-agency-ahmedabad/" };
  if (/seo|rank|organic|google-business|aeo|geo|llmo|chatgpt|ai-overviews|local-seo/.test(key))
    return { label: "SEO Services in Ahmedabad", blurb: "Technical, on-page and local SEO that turns searches into enquiries for Ahmedabad businesses.", cta: "See SEO services", href: "/seo-services-ahmedabad", external: true };
  return null;
};
