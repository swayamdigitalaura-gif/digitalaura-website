import type { ExtraSection, FaqItem, IncludedItem, LocalServiceConfig, PainPoint, ProcessStep, RelatedService } from "@/components/LocalServicePage";
import { LAST_UPDATED } from "@/data/auditContent";
import { TEAM } from "@/data/pageExtras";

/**
 * Builds an industry page (Round 3) from a compact spec. The shared parts (lead form, E-E-A-T "who is behind this guide"
 * block, visit-us block, sources) live here so every page is complete, and the spec carries only what is specific to the
 * industry. Content rules: no prices, no results, no client names, no new numeric claims, no legal advice.
 */

export type IndustryService = "meta" | "google" | "web";

export interface IndustrySpec {
  service: IndustryService;
  /** URL path without trailing slash, e.g. "/meta-ads-agency-ahmedabad/dentists". */
  path: string;
  /** Short page name used in breadcrumbs and the about block, e.g. "Meta Ads for Dentists". */
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  hero: string;
  hero2?: string;
  tags: string[];
  badge: string;
  headingA: string;
  headingB?: string;
  diffText: string;
  painTitle: string;
  pains: PainPoint[];
  warning: string;
  processTitle: string;
  processSub: string;
  process: ProcessStep[];
  includedTitle: string;
  included: IncludedItem[];
  whyTitle: string;
  why: string[];
  related: RelatedService[];
  quick: { heading: string; answer: string; points?: string[] };
  /** Sections rendered in order before the FAQ. */
  sections: ExtraSection[];
  faqs: FaqItem[];
  faqTitle: string;
  /** One-line description of what this guide covers, used in the "who is behind" block. */
  about: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
  heroCta: string;
  form: { formName: string; service: string; heading: string; text: string; notesLabel?: string; submitLabel: string };
  sources?: { label: string; href: string }[];
  /** Healthcare and other sensitive pages: show the general-information notice and add a no-patient-data line. */
  sensitive?: boolean;
}

export const GENERAL_NOTICE =
  "General information, not legal or medical advice. Advertising and professional-conduct rules for healthcare differ by who is advertising and change over time, so please confirm what applies to you with your own legal adviser.";

const ACCENT: Record<IndustryService, string> = { meta: "#1877F2", google: "#4285F4", web: "#1A6FE8" };
const PARENT: Record<IndustryService, { href: string; label: string }> = {
  meta: { href: "/meta-ads-agency-ahmedabad/", label: "Meta Ads Agency in Ahmedabad" },
  google: { href: "/google-ads-agency-ahmedabad/", label: "Google Ads Agency in Ahmedabad" },
  web: { href: "/website-development-services-ahmedabad/", label: "Website Development in Ahmedabad" },
};
const SOURCES: Record<IndustryService, { label: string; href: string }[]> = {
  meta: [{ label: "Meta Advertising Standards", href: "https://transparency.meta.com/policies/ad-standards/" }],
  google: [{ label: "Google Ads policies", href: "https://support.google.com/adspolicy" }, { label: "Google Ads Help", href: "https://support.google.com/google-ads" }],
  web: [{ label: "web.dev: Core Web Vitals", href: "https://web.dev/vitals/" }, { label: "Google Search Central: SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }],
};
const BUSINESS_TYPES = ["Doctor, clinic or hospital", "Manufacturer or exporter", "Online store", "Local service business", "Education or coaching", "Real estate", "Restaurant or hospitality", "Other"];

/** Small label above each section heading (same look as the SEO and Meta pillar pages). */
const EYEBROWS: Record<string, string> = {
  funnel: "The funnel", "buyer-types": "Your buyers", "ad-rules": "Ad rules", qualifying: "Lead quality", measure: "Measurement",
  "service-lines": "Service lines", "hospital-policy": "Policy", "front-desk": "Front desk", "hospital-measure": "Reporting",
  treatments: "Treatments", "dental-policy": "Policy", "reduce-noshows": "Appointments",
  journey: "The journey", "fertility-policy": "What to say", "ivf-privacy": "Privacy", "ivf-tone": "Tone",
  "treatment-groups": "Services", "skin-policy": "Policy", retention: "Retention",
  calendar: "Calendar", audiences: "Audiences", claims: "Claims", counsellor: "Follow-up",
  goals: "Goals", "food-creative": "Creative", "own-vs-aggregator": "Channels", "restaurant-measure": "Measurement",
  "tracking-capi": "Tracking", "india-realities": "India reality", "break-even": "Margin", "creative-system": "Creative",
  "ivf-searches": "Searches", "ivf-ad-rules": "Ad rules", "ivf-remarketing": "Audiences", "ivf-pages": "Landing page",
  "dental-campaigns": "Campaigns", calls: "Calls", "dental-ad-copy": "Ad wording", "dental-local": "Local",
  "dental-pages": "Pages", "dental-site-wording": "Wording", "dental-speed": "Speed", "dental-seo": "Search",
  "eye-pages": "Pages", "eye-accessibility": "Accessibility", "eye-wording": "Wording", "eye-seo": "Search",
};
const DEFAULT_EYEBROW: Record<string, string> = { cards: "Guide", compare: "Do and avoid", checklist: "Checklist", text: "Overview", calculator: "Tool", reels: "Videos", team: "Our team" };
/** How many guide sections sit before the proof (case studies, testimonials). The rest come after it. */
const EARLY_COUNT = 3;
const FREE_LABEL: Record<IndustryService, string> = { meta: "Meta ads account review", google: "Google Ads account review", web: "Website review" };
const TEAM_FOR: Record<IndustryService, (keyof typeof TEAM)[]> = { meta: ["satish", "bhavesh"], google: ["satish", "bhavesh"], web: [] };
const TEAM_TITLE: Record<IndustryService, string> = { meta: "The team behind your Meta ads", google: "The team behind your Google Ads", web: "" };

export function buildIndustryPage(s: IndustrySpec): LocalServiceConfig {
  const parent = PARENT[s.service];
  const slug = s.path.replace(/^\//, "").replace(/\//g, "-");
  const noData = s.sensitive ? " Please do not include any patient information in this form." : "";
  const guide: ExtraSection[] = s.sections.map((sec, i) => ({
    ...sec,
    eyebrow: sec.eyebrow ?? EYEBROWS[sec.id] ?? DEFAULT_EYEBROW[sec.kind],
    jumpLabel: sec.jumpLabel ?? EYEBROWS[sec.id] ?? DEFAULT_EYEBROW[sec.kind],
    ...(i < EARLY_COUNT ? { slot: "early" as const } : {}),
  }));
  const teamMembers = TEAM_FOR[s.service].map((k) => TEAM[k]);
  const sections: ExtraSection[] = [
    ...guide,
    {
      kind: "cards",
      id: "get-started",
      eyebrow: "Next step",
      title: "Three easy ways to get started",
      subtext: "Pick whichever suits you. There is no obligation, and we reply the same working day.",
      items: [
        { tag: "Form", title: "Request a free review", desc: "Fill in the short form on this page and we reply by email with what we found.", href: "#audit-form", cta: "Go to the form" },
        { tag: "WhatsApp", title: "Message us", desc: "Send your question on WhatsApp. It is the quickest way to reach the team.", href: "https://wa.me/918141200284", cta: "Chat on WhatsApp" },
        { tag: "Call", title: "Talk to us", desc: "Call the Hanspura office, Monday to Saturday, 10 AM to 7 PM.", href: "tel:+918141200284", cta: "Call +91 81412 00284" },
      ],
    },
    ...(teamMembers.length
      ? [{
          kind: "team" as const,
          id: "team",
          eyebrow: "Our team",
          title: TEAM_TITLE[s.service],
          subtext: "Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. Meet the in-house team you will work with at our Hanspura office, Ahmedabad.",
          members: teamMembers,
          founderLinks: true,
        }]
      : []),
    {
      kind: "text",
      id: "about-guide",
      eyebrow: "About this guide",
      title: "Who is behind this guide",
      paragraphs: [
        "This guide is published by Digital Aura, a digital marketing and web development agency based at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad. The agency is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing, and has delivered 750+ projects for 120+ clients.",
        `${s.about} We update this page when our process or the rules we describe change, and the date at the top shows when it was last reviewed.`,
      ],
      links: [{ label: "About Digital Aura", href: "/about/" }, { label: "Founder on LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" }, { label: "Contact us", href: "/contact/" }],
    },
    {
      kind: "text",
      id: "visit-us",
      eyebrow: "Visit us",
      title: "Meet the team at our Hanspura office",
      paragraphs: [
        "Talk to the people who will do the work before you decide. We are at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad, Gujarat 382330. Open Monday to Saturday, 10 AM to 7 PM, closed on Sunday.",
        "Prefer to start with a short form? Send your details below and we reply by email.",
      ],
      links: [
        { label: "Call +91 81412 00284", href: "tel:+918141200284" },
        { label: "WhatsApp us", href: "https://wa.me/918141200284" },
        { label: "Open in Google Maps", href: "https://www.google.com/maps/search/?api=1&query=Digital+Aura+713+Shilp+Arcade+Sardar+Patel+Ring+Road+Hanspura+Ahmedabad+382330" },
      ],
    },
  ];
  return {
    slug,
    accentColor: ACCENT[s.service],
    eyebrow: s.eyebrow,
    h1: s.h1,
    heroParagraph: s.hero,
    heroParagraph2: s.hero2 ?? (s.sensitive ? GENERAL_NOTICE : undefined),
    tags: s.tags,
    parentServiceHref: parent.href,
    parentServiceLabel: parent.label,
    differentiatorBadge: s.badge,
    differentiatorHeading: s.headingA,
    differentiatorHeading2: s.headingB,
    differentiatorText: s.diffText,
    painPointsTitle: s.painTitle,
    painPoints: s.pains.slice(0, 3),
    warningText: s.warning,
    includedTitle: s.includedTitle,
    included: s.included,
    processTitle: s.processTitle,
    processSubtext: s.processSub,
    process: s.process,
    whyLocalTitle: s.whyTitle,
    whyLocal: s.why,
    relatedCategoryLabel: "Digital Marketing",
    relatedCategoryColor: "#22C55E",
    relatedServices: s.related,
    extraSections: sections,
    storyLayout: true,
    statsBand: [
      { value: "120+", label: "Clients served" },
      { value: "750+", label: "Projects delivered" },
      { value: "10+", label: "Years in digital marketing" },
      { value: "Free", label: FREE_LABEL[s.service] },
    ],
    quickAnswer: s.quick,
    lastUpdated: LAST_UPDATED,
    heroCta: { label: s.heroCta, href: "#audit-form" },
    leadForm: {
      id: "audit-form",
      formName: s.form.formName,
      service: s.form.service,
      heading: s.form.heading,
      text: s.form.text + noData,
      website: "optional",
      notesLabel: s.form.notesLabel,
      businessTypes: BUSINESS_TYPES,
      submitLabel: s.form.submitLabel,
    },
    faqTitle: s.faqTitle,
    sources: s.sources ?? SOURCES[s.service],
    faqs: s.faqs,
    ctaHeading: s.ctaHeading,
    ctaText: s.ctaText,
    ctaButton: s.ctaButton,
  };
}

export const industryUrl = (path: string) => path.replace(/\/$/, "") + "/";
