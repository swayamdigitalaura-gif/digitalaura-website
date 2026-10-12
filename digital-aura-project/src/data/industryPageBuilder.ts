import type { ExtraSection, FaqItem, IncludedItem, LocalServiceConfig, PainPoint, ProcessStep, RelatedService } from "@/components/LocalServicePage";
import { LAST_UPDATED } from "@/data/auditContent";

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

export function buildIndustryPage(s: IndustrySpec): LocalServiceConfig {
  const parent = PARENT[s.service];
  const slug = s.path.replace(/^\//, "").replace(/\//g, "-");
  const noData = s.sensitive ? " Please do not include any patient information in this form." : "";
  const sections: ExtraSection[] = [
    ...s.sections,
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
    painPoints: s.pains,
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
