/**
 * One place that says which blog guides and cluster pages belong to which pillar, so the pillar pages, cluster pages and
 * blog posts can all link to each other with the same anchors. Titles are copied from seoBlogPosts.ts on purpose: this file is
 * imported by cluster pages, and importing the whole blog dataset there would make every page heavier.
 */

export type Topic = "seo" | "gads" | "meta" | "web";

export const PILLARS: Record<Topic, { label: string; short: string; href: string }> = {
  seo: { label: "SEO Services in Ahmedabad", short: "SEO services in Ahmedabad", href: "/seo-services-ahmedabad" },
  gads: { label: "Google Ads Agency in Ahmedabad", short: "Google Ads agency in Ahmedabad", href: "/google-ads-agency-ahmedabad" },
  meta: { label: "Meta Ads Agency in Ahmedabad", short: "Meta ads agency in Ahmedabad", href: "/meta-ads-agency-ahmedabad/" },
  web: { label: "Website Development Services in Ahmedabad", short: "website development in Ahmedabad", href: "/website-development-services-ahmedabad/" },
};

export type Guide = { slug: string; title: string };

export const GUIDES: Record<Topic, Guide[]> = {
  seo: [
    { slug: "seo-in-2026-ai-era", title: "SEO in 2026: The Complete Strategy Guide for the AI Search Era" },
    { slug: "on-page-seo-checklist-2026", title: "On-Page SEO Checklist for 2026" },
    { slug: "technical-seo-practices-2026", title: "9 Technical SEO Practices You Can't Ignore in 2026" },
    { slug: "local-seo-strategies-2026", title: "The Best Local SEO Strategies for 2026" },
    { slug: "google-business-profile-seo-checklist", title: "The Complete Google Business Profile SEO Checklist" },
    { slug: "google-business-profile-tricks-google-maps", title: "7 Google Business Profile Tricks to Rank in Google Maps" },
    { slug: "how-to-rank-new-website-on-google", title: "How to Rank a New Website on Google: A 2026 Roadmap" },
    { slug: "increase-organic-website-traffic-10x", title: "How to 10x Your Organic Website Traffic" },
    { slug: "aeo-vs-geo-vs-llmo-explained", title: "AEO vs GEO vs LLMO Explained" },
    { slug: "how-to-rank-chatgpt-perplexity-ai-overviews", title: "How to Rank in ChatGPT, Perplexity and AI Overviews" },
    { slug: "ai-seo-skills-for-marketers-2026", title: "6 AI SEO Skills Every Marketer Needs in 2026" },
    { slug: "shopify-seo-tutorial-2026", title: "Shopify SEO Tutorial 2026" },
    { slug: "seo-vs-paid-ads-which-first-ahmedabad", title: "SEO or Paid Ads First? How Ahmedabad Businesses Should Decide" },
    { slug: "how-long-does-seo-take-ahmedabad", title: "How Long Does SEO Take? A Realistic Timeline for Ahmedabad Businesses" },
    { slug: "b2b-seo-manufacturers-gujarat-guide", title: "B2B SEO for Manufacturers: How Industrial Buyers Find Suppliers Online" },
  ],
  gads: [
    { slug: "google-ads-strategy-checklist-2026", title: "Google Ads Strategy Checklist for 2026" },
    { slug: "7-google-ads-mistakes-2026", title: "7 Google Ads Mistakes Costing You Money in 2026" },
    { slug: "google-ads-2026-new-strategies", title: "Google Ads in 2026: New Strategies Worth Testing" },
    { slug: "google-ads-tactics-stopped-working-2026", title: "Google Ads Tactics That Stopped Working in 2026" },
    { slug: "local-business-google-ads-maps-2026", title: "Local Business Marketing With Google Ads and Maps" },
    { slug: "google-ads-vs-meta-ads-ahmedabad", title: "Google Ads vs Meta Ads: Where Should an Ahmedabad Business Spend First?" },
    { slug: "track-calls-whatsapp-leads-google-ads", title: "How to Track Calls and WhatsApp Leads From Google Ads" },
    { slug: "google-ads-performance-max-vs-search-leads", title: "Performance Max vs Search Campaigns for Lead Generation" },
  ],
  meta: [
    { slug: "meta-lead-gen-ads-2026", title: "Meta Lead Gen Ads: What Top Advertisers Actually Do" },
    { slug: "meta-ads-targeting-2026", title: "The Meta Ads Targeting Approach Most Advertisers Get Wrong" },
    { slug: "why-competitors-outperform-meta-ads-2026", title: "Why Your Competitors Are Outperforming You on Meta Ads" },
    { slug: "why-meta-disables-ad-accounts-2026", title: "Why Meta Disables Ad Accounts (And How to Fix It)" },
    { slug: "5-meta-ads-features-2026", title: "5 Meta Ads Features Most Advertisers Don't Use" },
    { slug: "6-meta-ads-updates-2026", title: "6 Meta Ads Updates You Need to Know in 2026" },
    { slug: "ai-tools-ugc-ads-2026", title: "6 AI Tools for Creating UGC-Style Ads" },
    { slug: "video-hooks-viral-2026", title: "The Video Hooks That Actually Go Viral in 2026" },
    { slug: "instagram-growth-2026", title: "How to Grow on Instagram and Get More Views in 2026" },
    { slug: "meta-click-to-whatsapp-ads-guide", title: "Click-to-WhatsApp Ads: How They Work and When to Use Them" },
    { slug: "meta-ad-creative-testing-lead-generation", title: "How to Test Meta Ad Creative Without Wasting Budget" },
  ],
  web: [
    { slug: "website-redesign-checklist-protect-traffic", title: "Website Redesign Checklist: How to Redesign Without Losing Google Traffic" },
    { slug: "wordpress-vs-shopify-vs-custom-website-india", title: "WordPress, Shopify or Custom Build: Which Is Right for Your Business?" },
    { slug: "manufacturer-website-checklist-b2b-buyers", title: "Manufacturer Website Checklist: What B2B Buyers Need to See" },
    { slug: "website-maintenance-checklist-for-business", title: "Website Maintenance Checklist: What a Business Website Needs Every Month" },
  ],
};

/** Which pillar a blog post belongs to. Social-media posts feed the Meta pillar. */
export function topicForBlog(slug: string, category?: string | null): Topic {
  if ((category || "").toLowerCase() === "web development") return "web";
  const key = `${slug} ${category || ""}`.toLowerCase();
  if (/google-ads|local-business-google-ads/.test(key)) return "gads";
  if (/meta|instagram|ugc|video-hooks|social media/.test(key)) return "meta";
  return "seo";
}

/** Which pillar a cluster page hangs under, from its parent-service link. */
export function topicForParent(parentHref: string): Topic | null {
  if (/seo-services-ahmedabad/.test(parentHref)) return "seo";
  if (/google-ads-agency-ahmedabad/.test(parentHref)) return "gads";
  if (/meta-ads-agency-ahmedabad/.test(parentHref)) return "meta";
  if (/website-development-services-ahmedabad|website-design-development/.test(parentHref)) return "web";
  return null;
}

export type ClusterLink = { label: string; href: string };

/** The cluster pages a reader of each topic is most likely to want next (used in the blog "keep going" box). */
export const CLUSTER_LINKS: Record<Topic, ClusterLink[]> = {
  seo: [
    { label: "SEO packages and pricing in Ahmedabad", href: "/seo/pricing-ahmedabad/" },
    { label: "Free SEO audit", href: "/seo/free-audit/" },
    { label: "SEO for doctors and hospitals", href: "/seo/doctors-hospitals-ahmedabad/" },
    { label: "SEO for manufacturers in Gujarat", href: "/seo/manufacturers-b2b-gujarat/" },
  ],
  gads: [
    { label: "Google Ads pricing in Ahmedabad", href: "/google-ads-pricing-ahmedabad/" },
    { label: "Free Google Ads audit", href: "/google-ads-audit-ahmedabad/" },
    { label: "Google Ads for doctors", href: "/google-ads-for-doctors-ahmedabad/" },
    { label: "Google Ads for real estate", href: "/google-ads-for-real-estate-ahmedabad/" },
  ],
  meta: [
    { label: "Meta ads pricing in Ahmedabad", href: "/meta-ads-agency-ahmedabad/pricing/" },
    { label: "Meta ads for clinics and doctors", href: "/meta-ads-agency-ahmedabad/clinics-doctors/" },
    { label: "Meta ads for ecommerce", href: "/meta-ads-agency-ahmedabad/ecommerce/" },
  ],
  web: [
    { label: "Website development cost in Ahmedabad", href: "/website-development-cost-ahmedabad/" },
    { label: "Website packages in Ahmedabad", href: "/website-packages-ahmedabad/" },
    { label: "Website redesign without losing rankings", href: "/website-redesign-services-ahmedabad/" },
    { label: "Ecommerce website cost", href: "/ecommerce-website-cost-ahmedabad/" },
  ],
};

/** Blog category -> the most relevant SEO service sub-page, shown first in the blog "keep going" box. */
export const SEO_SERVICE_BY_CATEGORY: Record<string, ClusterLink> = {
  "Local SEO": { label: "Local SEO services", href: "/services/seo-content-marketing/local-seo/" },
  "On-Page SEO": { label: "On-page SEO services", href: "/services/seo-content-marketing/on-page-seo/" },
  "Technical SEO": { label: "Technical SEO services", href: "/services/seo-content-marketing/technical-seo/" },
  "eCommerce SEO": { label: "Ecommerce SEO services", href: "/services/seo-content-marketing/ecommerce-seo/" },
  "SEO Strategy": { label: "SEO audit and strategy", href: "/services/seo-content-marketing/seo-audit-strategy/" },
  "AI Search": { label: "SEO audit and strategy", href: "/services/seo-content-marketing/seo-audit-strategy/" },
};
