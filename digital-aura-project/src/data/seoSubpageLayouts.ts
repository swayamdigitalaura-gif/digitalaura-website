import type { StdLayout } from "@/components/IndustryLandingPage";

/**
 * Section grouping for the three SEO sub-pages (/seo/free-audit, /seo/doctors-hospitals-ahmedabad,
 * /seo/manufacturers-b2b-gujarat) on the standard pillar template. The copy lives in the page configs;
 * this file only decides which existing block sits in which tab, so nothing is rewritten here.
 */

export const seoFreeAuditLayout: StdLayout = {
  visitLabel: "Get a free SEO audit",
  subnav: [
    { href: "#overview-group", label: "Overview" }, { href: "#services", label: "What you get" }, { href: "#process", label: "Process" },
    { href: "#results-proof", label: "Results" }, { href: "#learn", label: "Learn" }, { href: "#faqs", label: "FAQs" },
  ],
  labels: { "audit-checklist": "14 areas we check", "report-format": "The report", "tool-vs-expert": "Tool or expert", intent: "Search intent", "prioritise-findings": "Fix order", "after-the-audit": "After the audit", "audit-by-sector": "Sector checks", "seo-videos": "Videos" },
  guides: {
    topic: "seo", tabLabel: "SEO guides", eyebrow: "SEO guides", title: "Read how SEO works before you decide anything",
    sub: "Plain-English guides from our team. They help you judge any SEO audit or proposal, ours included.",
    slugs: ["seo-in-2026-ai-era", "technical-seo-practices-2026", "on-page-seo-checklist-2026", "how-to-rank-new-website-on-google", "increase-organic-website-traffic-10x", "aeo-vs-geo-vs-llmo-explained"],
  },
  parts: [
    { type: "group", id: "overview-group", tone: "white", eyebrow: "Overview", title: "What a free SEO audit covers", tabs: ["quick", "problem", "tool-vs-expert"] },
    { type: "group", id: "services", tone: "light", eyebrow: "What's included", title: "What you get, the 14 areas we check and the report", tabs: ["included", "audit-checklist", "report-format"] },
    { type: "group", id: "process", tone: "white", eyebrow: "Our process", title: "How we audit, and what happens after", tabs: ["how", "intent", "prioritise-findings", "after-the-audit"] },
    { type: "proof", tone: "light" },
    { type: "testimonials", tone: "white" },
    { type: "group", id: "sectors", tone: "light", eyebrow: "Who we serve", title: "Sector checks, and why Ahmedabad businesses ask us for the audit", tabs: ["audit-by-sector", "why"] },
    { type: "group", id: "learn", tone: "white", eyebrow: "Learn more", title: "Watch and read before you decide", tabs: ["seo-videos", "guides"] },
    { type: "team", tone: "light" },
    { type: "explore", tone: "white" },
  ],
};

export const seoDoctorsLayout: StdLayout = {
  visitLabel: "Get a free healthcare SEO audit",
  subnav: [
    { href: "#overview-group", label: "Overview" }, { href: "#problems", label: "Patient trust" }, { href: "#services", label: "Services" },
    { href: "#process", label: "Process" }, { href: "#results-proof", label: "Results" }, { href: "#pricing", label: "Pricing" }, { href: "#faqs", label: "FAQs" },
  ],
  labels: { "patient-searches": "How patients search", compliance: "Compliance and trust", "doctor-review-workflow": "Doctor review", "who-we-build-for": "Plans by provider", "local-presence": "Local presence", tracking: "Tracking appointments", cost: "What it costs", "websites-and-seo": "Websites and SEO", "pages-profile-and-ads": "Pages, profile and ads" },
  guides: {
    topic: "seo", tabLabel: "SEO guides", eyebrow: "SEO guides", title: "Local SEO guides for clinics and hospitals",
    sub: "Plain-English guides from our team on Google Maps, Google Business Profile and search.",
    slugs: ["local-seo-strategies-2026", "google-business-profile-seo-checklist", "google-business-profile-tricks-google-maps", "on-page-seo-checklist-2026", "seo-in-2026-ai-era", "aeo-vs-geo-vs-llmo-explained"],
  },
  parts: [
    { type: "group", id: "overview-group", tone: "white", eyebrow: "Overview", title: "What healthcare SEO for doctors and hospitals covers", tabs: ["quick", "patient-searches"] },
    { type: "group", id: "problems", tone: "light", eyebrow: "Patient trust", title: "Why health searches need extra care", tabs: ["problem", "compliance", "doctor-review-workflow"] },
    { type: "group", id: "services", tone: "white", eyebrow: "What's included", title: "What our healthcare SEO includes", tabs: ["included", "local-presence", "who-we-build-for"] },
    { type: "group", id: "process", tone: "light", eyebrow: "Our process", title: "How we work, and how we track appointments", tabs: ["how", "tracking"] },
    { type: "proof", tone: "white" },
    { type: "testimonials", tone: "light" },
    { type: "group", id: "pricing", tone: "white", eyebrow: "Cost & fit", title: "What it costs, and how your website, profile and ads fit together", tabs: ["cost", "why", "websites-and-seo", "pages-profile-and-ads"] },
    { type: "team", tone: "light" },
    { type: "explore", tone: "white" },
  ],
};

export const seoManufacturersLayout: StdLayout = {
  visitLabel: "Get a free B2B SEO audit",
  subnav: [
    { href: "#overview-group", label: "Overview" }, { href: "#problems", label: "Buyer journey" }, { href: "#services", label: "Services" },
    { href: "#process", label: "Process" }, { href: "#results-proof", label: "Results" }, { href: "#pricing", label: "Pricing" }, { href: "#faqs", label: "FAQs" },
  ],
  labels: { "how-buyers-search": "How buyers search", clusters: "Industrial areas", "catalogue-technical-seo": "Catalogue SEO", marketplaces: "SEO vs IndiaMART", "qualified-leads": "Qualified leads", "search-in-the-sales-process": "The sales process", confidentiality: "Confidentiality", cost: "What it costs" },
  guides: {
    topic: "seo", tabLabel: "SEO guides", eyebrow: "SEO guides", title: "SEO guides for technical and B2B buyers",
    sub: "Plain-English guides from our team on catalogue SEO, AI search and organic traffic.",
    slugs: ["technical-seo-practices-2026", "seo-in-2026-ai-era", "aeo-vs-geo-vs-llmo-explained", "how-to-rank-chatgpt-perplexity-ai-overviews", "on-page-seo-checklist-2026", "increase-organic-website-traffic-10x"],
  },
  parts: [
    { type: "group", id: "overview-group", tone: "white", eyebrow: "Overview", title: "What B2B SEO for manufacturers covers", tabs: ["quick", "how-buyers-search", "clusters"] },
    { type: "group", id: "problems", tone: "light", eyebrow: "Buyer journey", title: "Why catalogues fail in search, and where search fits in a long sale", tabs: ["problem", "marketplaces", "search-in-the-sales-process"] },
    { type: "group", id: "services", tone: "white", eyebrow: "What's included", title: "What our B2B SEO includes", tabs: ["included", "catalogue-technical-seo"] },
    { type: "group", id: "process", tone: "light", eyebrow: "Our process", title: "How we work, and how we measure qualified RFQs", tabs: ["how", "qualified-leads", "confidentiality"] },
    { type: "proof", tone: "white" },
    { type: "testimonials", tone: "light" },
    { type: "group", id: "pricing", tone: "white", eyebrow: "Cost & fit", title: "What it costs, and why Gujarat manufacturers work with us", tabs: ["cost", "why"] },
    { type: "team", tone: "light" },
    { type: "explore", tone: "white" },
  ],
};
