export interface CaseCard {
  tag: string; badge: string; badgeColor: string; badgeBg: string; title: string;
  statBig: string; statColor: string; statDesc: string; accent: string; topBg: string; href: string;
}

/** Every published case study, keyed so a page can pick the ones that match its own service. */
export const CASE_CARDS: Record<"riant" | "prism" | "ivf" | "dp" | "obl" | "grand", CaseCard> = {
  riant: {
    tag: "Local Business · Web + Booking System",
    badge: "230 Customers Managed",
    badgeColor: "#1A6FE8",
    badgeBg: "rgba(26,111,232,0.08)",
    title: "Riant Bikes",
    statBig: "177",
    statColor: "#1A6FE8",
    statDesc: "bookings processed through the new website, online booking system and fleet management we built.",
    accent: "#1A6FE8",
    topBg: "linear-gradient(135deg, rgba(26,111,232,0.08) 0%, rgba(26,111,232,0.02) 100%)",
    href: "/case-studies/riant-bikes/",
  },
  prism: {
    tag: "Industrial B2B · SEO & AEO/GEO",
    badge: "70–100 Leads/mo",
    badgeColor: "#22C55E",
    badgeBg: "rgba(34,197,94,0.08)",
    title: "Prism Calibration Centre",
    statBig: "70–100",
    statColor: "#22C55E",
    statDesc: "qualified leads generated every month after we rebuilt their site into a search & AI-visibility engine.",
    accent: "#22C55E",
    topBg: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)",
    href: "/case-studies/prism-calibration/",
  },
  ivf: {
    tag: "Healthcare & Fertility · SEO + YouTube",
    badge: "+76.7% Traffic",
    badgeColor: "#7C3AED",
    badgeBg: "rgba(124,58,237,0.08)",
    title: "IVF Clinic",
    statBig: "76.7%",
    statColor: "#7C3AED",
    statDesc: "organic traffic growth in 6 months, turning a strong offline reputation into daily online demand.",
    accent: "#7C3AED",
    topBg: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)",
    href: "/case-studies/ivf-clinic/",
  },
  dp: {
    tag: "Home Services · Local SEO & AEO",
    badge: "10–15 Leads/day",
    badgeColor: "#FF6B2B",
    badgeBg: "rgba(255,107,43,0.08)",
    title: "DP Electrical Repairs",
    statBig: "10–15",
    statColor: "#FF6B2B",
    statDesc: "qualified leads generated every day from the website — from invisible to local search leader in 4 months.",
    accent: "#FF6B2B",
    topBg: "linear-gradient(135deg, rgba(255,107,43,0.08) 0%, rgba(255,107,43,0.02) 100%)",
    href: "/case-studies/dp-electrical-repairs/",
  },
  obl: {
    tag: "Custom Printing · Google Ads & Shopping",
    badge: "35 WhatsApp Chats/mo",
    badgeColor: "#0891B2",
    badgeBg: "rgba(8,145,178,0.08)",
    title: "OBLPrint",
    statBig: "35",
    statColor: "#0891B2",
    statDesc: "WhatsApp click-to-chats in a month, after we rebuilt a silent Google Ads account across Search and Shopping.",
    accent: "#0891B2",
    topBg: "linear-gradient(135deg, rgba(8,145,178,0.08) 0%, rgba(8,145,178,0.02) 100%)",
    href: "/case-studies/oblprint/",
  },
  grand: {
    tag: "Hospitality & Restaurant · SEO & Social",
    badge: "1.26K+ Organic Visitors",
    badgeColor: "#c8952f",
    badgeBg: "rgba(200,149,47,0.08)",
    title: "The Grand Palace",
    statBig: "1.26K+",
    statColor: "#c8952f",
    statDesc: "organic search sessions in 90 days, from a standing start — a decade-old restaurant's first real digital front door.",
    accent: "#c8952f",
    topBg: "linear-gradient(135deg, rgba(200,149,47,0.08) 0%, rgba(200,149,47,0.02) 100%)",
    href: "/case-studies/grand-palace/",
  },
};

const ALL_CASES: CaseCard[] = [CASE_CARDS.riant, CASE_CARDS.prism, CASE_CARDS.ivf, CASE_CARDS.dp, CASE_CARDS.obl, CASE_CARDS.grand];

/** The case studies that fit a service category. */
export const CASES_BY_CATEGORY = {
  all: ALL_CASES,
  seo: [CASE_CARDS.ivf, CASE_CARDS.prism, CASE_CARDS.dp, CASE_CARDS.grand],
  ads: [CASE_CARDS.obl, CASE_CARDS.riant],
  meta: [CASE_CARDS.grand],
  web: [CASE_CARDS.riant, CASE_CARDS.prism],
} satisfies Record<string, CaseCard[]>;

/** Picks the matching set from a page slug (e.g. "google-ads-agency-ahmedabad"); anything unmatched shows every case study. */
export function casesForSlug(slug = ""): CaseCard[] {
  const s = slug.toLowerCase();
  if (/meta|facebook|instagram|social-media/.test(s)) return CASES_BY_CATEGORY.meta;
  if (/google-ads|advertising|ppc/.test(s)) return CASES_BY_CATEGORY.ads;
  if (/seo|google-maps|google-business|local-business/.test(s)) return CASES_BY_CATEGORY.seo;
  if (/website|web-|shopify|woocommerce|full-stack|app-development|ai-|chatbot|automation/.test(s)) return CASES_BY_CATEGORY.web;
  return CASES_BY_CATEGORY.all;
}
