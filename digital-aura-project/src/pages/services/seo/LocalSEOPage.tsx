/**
 * SERVICE DETAIL PAGE — Local SEO
 * Route (to be added): /services/seo-content-marketing/local-seo
 * Parent pillar: /services/seo-content-marketing (SEOPage.tsx) — accent #22C55E reused for consistency
 *
 * Target keywords: local seo services, local seo company, google business
 * profile optimization, local seo agency, how to rank on google maps
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import BlogInsights from "@/components/BlogInsights";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import MathCaptcha from "@/components/MathCaptcha";
import {
  ArrowRight, ChevronDown, Check, MapPin, Star,
  Building2, Navigation, MessageSquare, ListChecks,
  CheckCircle2, Lock,
} from "lucide-react";

const accentColor = "#22C55E";
const glowColor = "rgba(34,197,94,0.12)";

const included = [
  { Icon: Building2,    title: "Google Business Profile Optimisation", desc: "Categories, services, photos, and description fully optimised so your listing wins the local pack, not just the map pin." },
  { Icon: Navigation,   title: "Geo-Targeted Landing Pages",           desc: "Dedicated pages for every city or service area you operate in, each with genuinely unique local content." },
  { Icon: ListChecks,   title: "Local Citations & Directories",        desc: "Consistent NAP (name, address, phone) built across Google, Bing, Yelp, and industry-specific directories." },
  { Icon: Star,         title: "Review Strategy & Management",         desc: "A system for earning more reviews and responding to every one, positive or negative, within 24-48 hours." },
  { Icon: MapPin,       title: "Local Keyword Targeting",              desc: "\"[Service] in [City]\" and \"near me\" search patterns mapped and targeted across your site." },
  { Icon: MessageSquare,title: "Local Schema Markup",                  desc: "LocalBusiness structured data implemented so Google can confidently match your business to local searches." },
];

const processSteps = [
  { num: "01", title: "NAP Audit & Google Business Setup",  desc: "Name, address, and phone consistency checked across every existing listing, then the Google Business Profile fully optimised." },
  { num: "02", title: "Local Keyword & Competitor Mapping",  desc: "We map exactly which \"[service] in [city]\" searches matter most and how nearby competitors currently rank for them." },
  { num: "03", title: "Citation Building & Page Creation",   desc: "Consistent citations built across key directories, plus dedicated location pages for each service area." },
  { num: "04", title: "Review & Ranking Monitoring",        desc: "Local pack rankings and review growth tracked monthly, with adjustments made as competitors move." },
];

const commonIssues = [
  "Inconsistent business name, address, or phone number across Google, Facebook, and directory listings",
  "A Google Business Profile with an incomplete category, no posts, and fewer than 10 photos",
  "One generic \"service areas\" page trying to rank for five different cities at once",
  "Reviews going unanswered for weeks, which quietly signals to Google that the business is inactive",
  "No LocalBusiness schema markup, so search engines have to guess at your service area and hours",
  "Duplicate or unclaimed listings competing against the real profile for the same searches",
];

const faqs = [
  { q: "What is local SEO and how is it different from regular SEO?", a: "Local SEO optimises a business to appear in location-based searches — Google Maps, the local pack, and \"near me\" queries. It differs from regular SEO by weighting signals like Google Business Profile completeness, local citations, and proximity, alongside standard ranking factors." },
  { q: "How do I rank higher on Google Maps?", a: "Google Maps ranking depends on relevance, distance, and prominence. Prominence is built through a complete, active Google Business Profile, consistent citations, strong review volume and ratings, and locally relevant content on your website." },
  { q: "Do I need a separate page for every city I serve?", a: "Yes, if you genuinely serve multiple distinct areas — one generic page trying to rank for five cities dilutes local relevance for all of them. Each location page needs unique, locally specific content, not a copy-pasted template with the city name swapped." },
  { q: "How important are Google reviews for local SEO?", a: "Very important — review count, rating, and recency are direct ranking factors for the local pack, and reviews also strongly influence whether users actually click through and convert." },
  { q: "How long does local SEO take to show results?", a: "Google Business Profile optimisation can show local pack movement within 4-6 weeks. Citation building and location page authority typically take 2-3 months to fully compound." },
  { q: "Do you manage the Google Business Profile ongoing, or just set it up once?", a: "Both options are available. Ongoing management includes weekly posts, review responses, and monthly monitoring, since local pack rankings respond to consistent activity, not a one-time setup." },
];

const relatedServices = [
  { label: "SEO Audit & Strategy", href: "/services/seo-content-marketing/seo-audit-strategy" },
  { label: "On Page SEO",          href: "/services/seo-content-marketing/on-page-seo" },
  { label: "Technical SEO",        href: "/services/seo-content-marketing/technical-seo" },
  { label: "Off Page SEO",         href: "/services/seo-content-marketing/off-page-seo" },
  { label: "eCommerce SEO",        href: "/services/seo-content-marketing/ecommerce-seo" },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`localseo_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`localseo_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};


const toolGroups = [
  { label: "SEO Tools", color: "#22C55E", bg: "rgba(34,197,94,0.08)", pills: ["Google Search Console", "Ahrefs", "SEMrush", "Screaming Frog"] },
  { label: "AI & GEO Tools", color: "#7C3AED", bg: "rgba(124,58,237,0.08)", pills: ["Perplexity", "ChatGPT", "Google SGE", "AI Overviews"] },
  { label: "Content & Research", color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", pills: ["Surfer SEO", "Clearscope", "Google Trends", "AnswerThePublic"] },
  { label: "Technical & Performance", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", pills: ["PageSpeed Insights", "GTmetrix", "Lighthouse", "Schema Validator"] },
  { label: "Analytics & Tracking", color: "#EC4899", bg: "rgba(236,72,153,0.08)", pills: ["Google Analytics 4", "Search Console", "Custom Dashboards"] },
];

const whyUsPoints = [
  "Data driven strategies focused on real results",
  "Full AIO & GEO optimisation: future proof your SEO",
  "High quality, human first content (not AI spam)",
  "Transparent reporting and measurable outcomes",
  "Focus on both traffic, conversions, and AI visibility",
  "Customised solutions for your business and industry",
];

const whatWeDoPoints = [
  "Increase organic website traffic",
  "Improve search engine rankings",
  "Appear in AI Overviews & AI answers",
  "Get cited by ChatGPT, Gemini & Perplexity",
  "Generate high quality leads from search",
  "Build brand authority and trust signals",
];

const seoClients = [
  { name: "Dr Parth Shah",          tag: "Eye Hospital in Canberra",          logo: "https://www.drparthshah.com.au/wp-content/uploads/2020/02/site_logo.png",                                                                                                                                          logoBg: "#f0f7ff" },
  { name: "A One Auto Care",        tag: "Car Detailing Shop",                logo: "https://aoneautocare.com.au/wp-content/uploads/2020/09/cropped-A-one-auto-care.png",                                                                                                                               logoBg: "#fff8f0" },
  { name: "DFA Law",                tag: "Law Firm",                          logo: "https://www.dfalaw.co.uk/wp-content/uploads/2017/09/dfa-law-logo.png",                                                                                                                                             logoBg: "#f5f5f5" },
  { name: "Ordorite",               tag: "POS Software",                      logo: "https://ordorite.com/wp-content/uploads/2023/07/ordoritelogo.webp",                                                                                                                                                logoBg: "#f0f8ff" },
  { name: "Levapor",                tag: "Waste Water Treatment",             logo: "https://levapor.com/wp-content/uploads/2021/03/levapor2-2.png",                                                                                                                                                    logoBg: "#f5fff5" },
  { name: "The Grand Palace",       tag: "Indian Restaurant in Sydney",       logo: "https://thedigitalaura.com/uploads/grand-palace-logo.png",                                                                                                                           logoBg: "#fffbf0" },
  { name: "DP Electric",            tag: "Electric Appliance Repair in Melbourne", logo: "https://dpelectric.com.au/wp-content/uploads/2023/05/logooo.png",                                                                                                                                 logoBg: "#fffff0" },
  { name: "Spinx Digital",          tag: "IT Agency",                         logo: "https://cdn-eahjn.nitrocdn.com/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-4b7d23a/www.spinxdigital.com/app/uploads/2023/03/spinx-logo-white.png",                                               logoBg: "#1a1a2e" },
  { name: "Clarity Eye Surgeons",   tag: "Eye Hospital in Canberra",          logo: "https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png",                                                                                                  logoBg: "#f0f8ff" },
  { name: "Prism Calibration",      tag: "Calibration & Validation Company",  logo: "https://prismcalibration.com/wp-content/uploads/2020/10/prism_logo_new.png",                                                                                                                      logoBg: "#f8f0ff" },
  { name: "Sure Freeze",            tag: "HVAC & Refrigeration Repairs in Melbourne",logo: "https://thedigitalaura.com/uploads/sure-freeze-logo.png",                                                                                                                             logoBg: "#f0faff" },
  { name: "Grand Bavarchi",         tag: "Restaurant & Events",               logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png",                                                                                                                                             logoBg: "#fff8f0" },
  { name: "Bin Drop Dumpsters",     tag: "Waste Management",                  logo: "https://www.bindropdumpsters.com/wp-content/uploads/Bin-Drop-Logo.png",                                                                                                                                            logoBg: "#f5fff5" },
  { name: "Worktop Warehouse",      tag: "Worktop Manufacturing in UK",       logo: "https://worktopwarehouse.co.uk/wp-content/uploads/2024/05/WORKTOP-WAREHOUSE-stone-masters-logo-1.png",                                                                                                            logoBg: "#faf5f0" },
  { name: "Active Office Furniture",tag: "Office Furniture",      logo: "https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png",                                                                                                            logoBg: "#f0f8ff" },
  { name: "Inn of the Dove",        tag: "Hospitality",           logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp",                                                                                                                                            logoBg: "#fff8f5" },
  { name: "Game Zone Events",       tag: "Events & Entertainment",logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                                                                                                           logoBg: "#f0fff0" },
  { name: "Dr Ronak Patel",         tag: "Healthcare",            logo: "/logos/dr-ronak-patel.webp",                                                                                                                                       logoBg: "#f0f7ff" },
  { name: "AMVI Hospitals",         tag: "Healthcare",            logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png",                                                                                                                               logoBg: "#f5f0ff" },
  { name: "Krisha Hospital",        tag: "Healthcare",            logo: "https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png",                                                                                                                                             logoBg: "#fff0f5" },
  { name: "Krisha Eye Hospital",    tag: "Eye Care",              logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png",                                                                                                               logoBg: "#f0faff" },
  { name: "Shukan Hospital",        tag: "Women's Hospital",      logo: "https://thedigitalaura.com/uploads/shukan-hospital-logo.png",                                                                                                                                               logoBg: "#f0fff8" },
];

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#22C55E] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

interface AuditFormProps {
  formTitle: string;
  formSubtext: string;
  submitLabel: string;
  disclaimer: string;
  successTitle: string;
  successText: string;
}

const AuditForm = ({ formTitle, formSubtext, submitLabel, disclaimer, successTitle, successText }: AuditFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", website: "", goal: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(34,197,94,0.1)" }}>
            <CheckCircle2 size={32} className="text-[#22C55E]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A1628] mb-2">{successTitle}</h3>
          <p className="text-[#6B7280]">{successText}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1">{formTitle}</h3>
          <p className="text-sm text-[#6B7280] mb-4">{formSubtext}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Full Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Business Name *</label>
              <input name="business" required value={form.business} onChange={handleChange} placeholder="Your Company" className={inputClass} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone Number *</label>
              <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 81412 00284" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Website URL *</label>
            <input type="url" name="website" required value={form.website} onChange={handleChange} placeholder="https://yourwebsite.com" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Goal *</label>
            <select name="goal" required value={form.goal} onChange={handleChange} className={inputClass + " cursor-pointer"}>
              <option value="" disabled>Select your goal...</option>
              <option>Increase organic traffic</option>
              <option>Rank for specific keywords</option>
              <option>Fix technical SEO issues</option>
              <option>Improve local search visibility</option>
              <option>Appear in AI search results (AIO/GEO)</option>
              <option>Full SEO strategy &amp; roadmap</option>
            </select>
          </div>
          <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
          <button type="submit" disabled={!captchaOk} className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)" }}>
            {submitLabel} <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
            <Lock size={12} /> {disclaimer}
          </p>
        </form>
      )}
    </div>
  );
};

const LocalSEOPage = () => {
  // Every piece of static marketing copy on this page is click-to-edit from the admin
  // Pages panel (same data-cms-key + useSettings mechanism as every other page). All
  // new keys are namespaced with `localseo_` so they can't collide with any other page.
  const keys = [
    "localseo_hero_badge", "localseo_hero_h1a", "localseo_hero_h1b", "localseo_hero_sub",
    "localseo_hero_cta1", "localseo_hero_cta2",
    "localseo_included_title",
    "localseo_process_title",
    "localseo_issues_title",
    "localseo_tools_title", "localseo_tools_subtext",
    "localseo_whyus_title", "localseo_whatwedo_title",
    "localseo_clients_eyebrow", "localseo_clients_title", "localseo_clients_subtext",
    "localseo_faq_title",
    "localseo_audit_badge", "localseo_audit_h2a", "localseo_audit_h2b", "localseo_audit_text",
    "localseo_audit_form_title", "localseo_audit_form_subtext", "localseo_audit_form_submit", "localseo_audit_form_disclaimer",
    "localseo_audit_success_title", "localseo_audit_success_text",
    "localseo_related_title",
    "localseo_cta_badge", "localseo_cta_h2", "localseo_cta_text", "localseo_cta_button",
    ...["Google Business Profile", "Local Citations", "Geo-Targeted Pages", "Review Growth"].map((_, i) => `localseo_hero_tag_${i}`),
    ...included.flatMap((_, i) => [`localseo_included_${i}_title`, `localseo_included_${i}_desc`]),
    ...processSteps.flatMap((_, i) => [`localseo_process_${i}_title`, `localseo_process_${i}_desc`]),
    ...commonIssues.map((_, i) => `localseo_issue_${i}`),
    ...toolGroups.map((_, i) => `localseo_toolgroup_${i}_label`),
    ...whyUsPoints.map((_, i) => `localseo_whyus_${i}`),
    ...whatWeDoPoints.map((_, i) => `localseo_whatwedo_${i}`),
    ...faqs.flatMap((_, i) => [`localseo_faq_${i}_q`, `localseo_faq_${i}_a`]),
    ...[0, 1, 2, 3].map((i) => `localseo_audit_checklist_${i}`),
  ];
  const s = useSettings(keys);
  const g = (key: string, fallback: string) => s[key] || fallback;

  const heroBadge = g("localseo_hero_badge", "Local SEO");
  const heroH1a = g("localseo_hero_h1a", "Local SEO Services");
  const heroH1b = g("localseo_hero_h1b", "That Win the Map Pack");
  const heroSub = g(
    "localseo_hero_sub",
    "Local SEO gets your business found in Google Maps, the local pack, and \"near me\" searches, through Google Business Profile optimisation, consistent citations, review growth, and geo-targeted landing pages."
  );
  const heroCta1 = g("localseo_hero_cta1", "Get a Free Local SEO Review");
  const heroCta2 = g("localseo_hero_cta2", "See What's Included");
  const heroTags = ["Google Business Profile", "Local Citations", "Geo-Targeted Pages", "Review Growth"].map((tag, i) => g(`localseo_hero_tag_${i}`, tag));

  const includedTitle = g("localseo_included_title", "What Local SEO Covers");
  const includedItems = included.map((item, i) => ({
    ...item,
    title: g(`localseo_included_${i}_title`, item.title),
    desc: g(`localseo_included_${i}_desc`, item.desc),
  }));

  const processTitle = g("localseo_process_title", "How We Build Local Rankings");
  const processStepsResolved = processSteps.map((step, i) => ({
    ...step,
    title: g(`localseo_process_${i}_title`, step.title),
    desc: g(`localseo_process_${i}_desc`, step.desc),
  }));

  const issuesTitle = g("localseo_issues_title", "Local SEO Issues We Find Most Often");
  const commonIssuesResolved = commonIssues.map((issue, i) => g(`localseo_issue_${i}`, issue));

  const toolsTitle = g("localseo_tools_title", "Tools & Technologies We Use");
  const toolsSubtext = g("localseo_tools_subtext", "Industry-leading SEO tools plus cutting edge AI search platforms for complete visibility.");
  const toolGroupsResolved = toolGroups.map((group, i) => ({
    ...group,
    label: g(`localseo_toolgroup_${i}_label`, group.label),
  }));

  const whyUsTitle = g("localseo_whyus_title", "Why Choose Us");
  const whyUsPointsResolved = whyUsPoints.map((w, i) => g(`localseo_whyus_${i}`, w));

  const whatWeDoTitle = g("localseo_whatwedo_title", "What We Can Do for Your Business");
  const whatWeDoPointsResolved = whatWeDoPoints.map((w, i) => g(`localseo_whatwedo_${i}`, w));

  const clientsEyebrow = g("localseo_clients_eyebrow", "Brands We've Grown With SEO");
  const clientsTitle = g("localseo_clients_title", "Clients We've Grown With SEO");
  const clientsSubtext = g("localseo_clients_subtext", "Real businesses. Real rankings. Organic growth delivered by Digital Aura.");

  const faqTitle = g("localseo_faq_title", "Frequently Asked Questions");
  const faqsResolved = faqs.map((f, i) => ({
    q: g(`localseo_faq_${i}_q`, f.q),
    a: g(`localseo_faq_${i}_a`, f.a),
  }));

  const auditBadge = g("localseo_audit_badge", "Free Local SEO Review");
  const auditH2a = g("localseo_audit_h2a", "Get Your Free");
  const auditH2b = g("localseo_audit_h2b", "Local SEO Review");
  const auditText = g("localseo_audit_text", "We'll review your Google Business Profile, citations, and local rankings against nearby competitors, completely free.");
  const auditChecklist = [
    "Google Business Profile audit",
    "NAP consistency check",
    "Local citation gap analysis",
    "Local pack ranking snapshot",
  ].map((item, i) => g(`localseo_audit_checklist_${i}`, item));
  const auditFormTitle = g("localseo_audit_form_title", "Request Your Free Local SEO Review");
  const auditFormSubtext = g("localseo_audit_form_subtext", "Fill in your details and we'll get started right away.");
  const auditFormSubmit = g("localseo_audit_form_submit", "Get My Free Review");
  const auditFormDisclaimer = g("localseo_audit_form_disclaimer", "100% free no credit card, no obligation");
  const auditSuccessTitle = g("localseo_audit_success_title", "Audit Request Received!");
  const auditSuccessText = g("localseo_audit_success_text", "We'll analyse your site and send your free audit within 24 hours.");

  const relatedTitle = g("localseo_related_title", "Related SEO Services");

  const ctaBadge = g("localseo_cta_badge", "Let's Build Together");
  const ctaH2 = g("localseo_cta_h2", "Ready to Own the Local Pack?");
  const ctaText = g("localseo_cta_text", "Book a free local SEO review. We'll check your Google Business Profile, citations, and rankings against nearby competitors.");
  const ctaButton = g("localseo_cta_button", "Book My Free Review");

  return (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services/seo-content-marketing" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>← Back to SEO &amp; Content Marketing</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <MapPin size={12} /> <span data-cms-key="localseo_hero_badge" data-cms-label="Hero Badge" data-cms-attr="text">{heroBadge}</span>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black leading-[1.12] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="localseo_hero_h1a" data-cms-label="Hero H1" data-cms-attr="text">{heroH1a}</span><br /><span style={{ color: accentColor }} data-cms-key="localseo_hero_h1b" data-cms-label="Hero H1 Highlight" data-cms-attr="text">{heroH1b}</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed" data-cms-key="localseo_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">
            {heroSub}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {heroTags.map((tag, i) => (
              <span key={i} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }} data-cms-key={`localseo_hero_tag_${i}`} data-cms-label="Hero Tag" data-cms-attr="text">{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact#contact-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              <span data-cms-key="localseo_hero_cta1" data-cms-label="Hero CTA 1" data-cms-attr="text">{heroCta1}</span> <MapPin size={15} />
            </Link>
            <a href="#included" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}><span data-cms-key="localseo_hero_cta2" data-cms-label="Hero CTA 2" data-cms-attr="text">{heroCta2}</span></a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* What's Included */}
    <section id="included" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="localseo_included_title" data-cms-label="Included Section Title" data-cms-attr="text">{includedTitle}</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {includedItems.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accentColor}12` }}>
                <s.Icon size={20} style={{ color: accentColor }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]" data-cms-key={`localseo_included_${i}_title`} data-cms-label="Included Card Title" data-cms-attr="text">{s.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed" data-cms-key={`localseo_included_${i}_desc`} data-cms-label="Included Card Description" data-cms-attr="text">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="localseo_process_title" data-cms-label="Process Section Title" data-cms-attr="text">{processTitle}</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processStepsResolved.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
              <span className="inline-block text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-3" style={{ background: `${accentColor}12`, color: accentColor }}>Step {step.num}</span>
              <h3 className="font-black text-[#0A1628] text-[14.5px] leading-snug mb-2" data-cms-key={`localseo_process_${i}_title`} data-cms-label="Process Step Title" data-cms-attr="text">{step.title}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed" data-cms-key={`localseo_process_${i}_desc`} data-cms-label="Process Step Description" data-cms-attr="text">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Common Issues */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="localseo_issues_title" data-cms-label="Issues Section Title" data-cms-attr="text">{issuesTitle}</span>
          </h2>
        </motion.div>
        <div className="space-y-3">
          {commonIssuesResolved.map((issue, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span className="text-[14px] text-[#374151] leading-relaxed" data-cms-key={`localseo_issue_${i}`} data-cms-label="Common Issue" data-cms-attr="text">{issue}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


    {/* Tools & Technologies We Use */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="localseo_tools_title" data-cms-label="Tools Section Title" data-cms-attr="text">{toolsTitle}</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm" data-cms-key="localseo_tools_subtext" data-cms-label="Tools Section Subtext" data-cms-attr="text">{toolsSubtext}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {toolGroupsResolved.map((g, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }} data-cms-key={`localseo_toolgroup_${i}_label`} data-cms-label="Tool Group Label" data-cms-attr="text">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.pills.map(p => (
                  <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: g.bg, color: g.color }}>{p}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us + What We Can Do */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="localseo_whyus_title" data-cms-label="Why Choose Us Title" data-cms-attr="text">{whyUsTitle}</span>
          </h2>
          <ul className="space-y-3">
            {whyUsPointsResolved.map((w, i) => (
              <li key={i} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-[14.5px] text-[#374151]" data-cms-key={`localseo_whyus_${i}`} data-cms-label="Why Choose Us Point" data-cms-attr="text">{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="localseo_whatwedo_title" data-cms-label="What We Can Do Title" data-cms-attr="text">{whatWeDoTitle}</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {whatWeDoPointsResolved.map((label, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accentColor}12` }}>
                  <Check size={15} style={{ color: accentColor }} />
                </div>
                <span className="text-[14.5px] text-[#374151]" data-cms-key={`localseo_whatwedo_${i}`} data-cms-label="What We Can Do Point" data-cms-attr="text">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Real Clients. Real Growth. Real Results. */}
    <div style={{ marginBottom: "-60px" }}>
      <CaseStudies />
      <BlogInsights categories={["Local SEO"]} />
    </div>

    {/* What Our Clients Say */}
    <Testimonials />

    {/* Clients We've Grown With SEO */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#fff", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }} data-cms-key="localseo_clients_eyebrow" data-cms-label="Clients Eyebrow" data-cms-attr="text">{clientsEyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2" data-cms-key="localseo_clients_title" data-cms-label="Clients Title" data-cms-attr="text">{clientsTitle}</h2>
        <p className="text-[#6B7280] text-sm max-w-md mx-auto" data-cms-key="localseo_clients_subtext" data-cms-label="Clients Subtext" data-cms-attr="text">{clientsSubtext}</p>
      </motion.div>
      <div className="max-w-5xl mx-auto">
        <ClientLogoGrid clients={seoClients} accentColor={accentColor} />
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="localseo_faq_title" data-cms-label="FAQ Section Title" data-cms-attr="text">{faqTitle}</span> <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqsResolved.map((f, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
              <FAQItem q={f.q} a={f.a} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>


    {/* Free Audit Form */}
    <section id="free-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #22C55E 0%, #16a34a 40%, #0A1628 100%)" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white" data-cms-key="localseo_audit_badge" data-cms-label="Audit Badge" data-cms-attr="text">{auditBadge}</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6"><span data-cms-key="localseo_audit_h2a" data-cms-label="Audit Heading Line 1" data-cms-attr="text">{auditH2a}</span><br /><span data-cms-key="localseo_audit_h2b" data-cms-label="Audit Heading Line 2" data-cms-attr="text">{auditH2b}</span></h2>
            <p className="text-white/80 text-lg mb-8" data-cms-key="localseo_audit_text" data-cms-label="Audit Text" data-cms-attr="text">{auditText}</p>
            <div className="space-y-3 mb-8">
              {auditChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white shrink-0" /><span className="text-white font-medium" data-cms-key={`localseo_audit_checklist_${i}`} data-cms-label="Audit Checklist Item" data-cms-attr="text">{item}</span></div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <AuditForm
              formTitle={auditFormTitle}
              formSubtext={auditFormSubtext}
              submitLabel={auditFormSubmit}
              disclaimer={auditFormDisclaimer}
              successTitle={auditSuccessTitle}
              successText={auditSuccessText}
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Related Services */}
    <section className="py-12 px-4 md:px-8 bg-white" style={{ borderTop: "1px solid #F3F4F6" }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-4" style={{ color: "#9CA3AF" }} data-cms-key="localseo_related_title" data-cms-label="Related Services Title" data-cms-attr="text">{relatedTitle}</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {relatedServices.map(s => (
            <Link key={s.href} to={s.href} className="text-[13px] font-semibold px-4 py-2 rounded-full border transition-all hover:-translate-y-0.5" style={{ borderColor: "#E5E7EB", color: "#374151" }}>{s.label}</Link>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #22C55E, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #22C55E, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}40`, color: accentColor }} data-cms-key="localseo_cta_badge" data-cms-label="Final CTA Badge" data-cms-attr="text">{ctaBadge}</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4" data-cms-key="localseo_cta_h2" data-cms-label="Final CTA Heading" data-cms-attr="text">{ctaH2}</h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed" data-cms-key="localseo_cta_text" data-cms-label="Final CTA Text" data-cms-attr="text">{ctaText}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
            <span data-cms-key="localseo_cta_button" data-cms-label="Final CTA Button" data-cms-attr="text">{ctaButton}</span> <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default LocalSEOPage;
