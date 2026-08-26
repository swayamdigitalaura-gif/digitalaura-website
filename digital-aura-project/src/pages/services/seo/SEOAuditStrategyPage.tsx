/**
 * SERVICE DETAIL PAGE — SEO Audit & Strategy
 * Route (to be added): /services/seo-content-marketing/seo-audit-strategy
 * Parent pillar: /services/seo-content-marketing (SEOPage.tsx) — accent #22C55E reused for consistency
 *
 * Target keywords: seo audit services, website seo audit, seo audit company,
 * free seo audit, seo strategy consulting, what is included in an seo audit
 *
 * Integration steps still pending:
 *   1. App.tsx    → add route + import
 *   2. PageSEO.tsx → add PAGE_META + Service/FAQPage JSON-LD entry
 */
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import BlogInsights from "@/components/BlogInsights";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import MathCaptcha from "@/components/MathCaptcha";
import { useSettings } from "@/hooks/useSettings";
import {
  ArrowRight, ChevronDown, Check, Search, FileSearch,
  Users, BarChart3, Link2, ClipboardList, Phone,
  CheckCircle2, Lock,
} from "lucide-react";

const accentColor = "#22C55E";
const glowColor = "rgba(34,197,94,0.12)";

const INCLUDED = [
  { Icon: FileSearch,   title: "Full Technical Site Crawl",       desc: "Every page crawled for indexing errors, broken links, redirect chains, duplicate content, and crawl budget waste." },
  { Icon: Search,       title: "Keyword Gap Analysis",            desc: "What you rank for, what competitors rank for that you don't, and which of those gaps are worth chasing first." },
  { Icon: Users,        title: "Competitor Benchmarking",         desc: "A side-by-side view of your top 3-5 competitors' rankings, content depth, and backlink profiles." },
  { Icon: BarChart3,    title: "Content Quality Review",          desc: "Which pages are thin, outdated, or targeting the wrong intent, and which are already working and just need reinforcement." },
  { Icon: Link2,        title: "Backlink Profile Audit",          desc: "Toxic or spammy links flagged for disavow, and genuine link-building opportunities identified." },
  { Icon: ClipboardList,title: "Prioritised Action Roadmap",      desc: "Every finding ranked by effort vs. impact, so you know exactly what to fix first, second, and third." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Crawl & Data Collection",        desc: "We crawl your full site and pull data from Google Search Console, Analytics, and your current rankings." },
  { num: "02", title: "Technical & On-Page Analysis",   desc: "Every page is checked against 80+ technical and on-page factors that affect how Google can find, read, and rank it." },
  { num: "03", title: "Competitor & Keyword Gap Study",  desc: "We map what's winning in your niche right now and where the realistic opportunities are for your specific site." },
  { num: "04", title: "Roadmap Delivery & Walkthrough",  desc: "You get the full report plus a call where we walk through the findings in plain English and answer questions." },
];

const COMMON_ISSUES = [
  "Pages that took months to rank quietly losing position because nobody noticed a technical error",
  "Duplicate or near-duplicate content competing against itself in search results",
  "Money pages buried three clicks deep with almost no internal links pointing to them",
  "Meta titles and descriptions that were never written for humans, only for a template",
  "A backlink profile with toxic links quietly working against the domain's authority",
  "Core Web Vitals failing on mobile, which caps how high a page can rank regardless of content quality",
];

const FAQS = [
  { q: "What is an SEO audit and what does it actually include?", a: "An SEO audit is a full review of a website's technical health, on-page optimisation, content quality, and backlink profile, benchmarked against real competitors. Ours includes a full site crawl, keyword gap analysis, competitor benchmarking, content review, backlink audit, and a prioritised action roadmap." },
  { q: "How long does an SEO audit take?", a: "A standard audit for a site under 500 pages typically takes 5-7 working days from kickoff to the final report and walkthrough call. Larger or more complex sites can take up to 2 weeks." },
  { q: "How much does an SEO audit cost?", a: "Audit pricing depends on site size and complexity. A free initial audit is available to assess fit; a full in-depth audit with a custom strategy roadmap is quoted after a short discovery call." },
  { q: "Do I need an SEO audit if my site is already ranking well?", a: "Yes — audits aren't only for underperforming sites. Rankings can quietly erode from technical issues, algorithm updates, or new competitors, and a periodic audit catches problems before they show up as a traffic drop." },
  { q: "What's the difference between an SEO audit and an SEO strategy?", a: "An audit tells you what's wrong and what's working right now. A strategy is the plan built from those findings — which keywords to target, what content to create, and in what order, tied to your business goals." },
  { q: "Will someone walk me through the findings, or do I just get a PDF?", a: "You get a full written report plus a live call where we walk through every finding in plain English, answer questions, and agree on next steps together." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`seoaudit_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`seoaudit_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const relatedServices = [
  { label: "On Page SEO",     href: "/services/seo-content-marketing/on-page-seo" },
  { label: "Technical SEO",   href: "/services/seo-content-marketing/technical-seo" },
  { label: "Local SEO",       href: "/services/seo-content-marketing/local-seo" },
  { label: "Off Page SEO",    href: "/services/seo-content-marketing/off-page-seo" },
  { label: "eCommerce SEO",   href: "/services/seo-content-marketing/ecommerce-seo" },
];


const TOOL_GROUPS = [
  { label: "SEO Tools", color: "#22C55E", bg: "rgba(34,197,94,0.08)", pills: ["Google Search Console", "Ahrefs", "SEMrush", "Screaming Frog"] },
  { label: "AI & GEO Tools", color: "#7C3AED", bg: "rgba(124,58,237,0.08)", pills: ["Perplexity", "ChatGPT", "Google SGE", "AI Overviews"] },
  { label: "Content & Research", color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", pills: ["Surfer SEO", "Clearscope", "Google Trends", "AnswerThePublic"] },
  { label: "Technical & Performance", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", pills: ["PageSpeed Insights", "GTmetrix", "Lighthouse", "Schema Validator"] },
  { label: "Analytics & Tracking", color: "#EC4899", bg: "rgba(236,72,153,0.08)", pills: ["Google Analytics 4", "Search Console", "Custom Dashboards"] },
];

const WHY_US_POINTS = [
  "Data driven strategies focused on real results",
  "Full AIO & GEO optimisation: future proof your SEO",
  "High quality, human first content (not AI spam)",
  "Transparent reporting and measurable outcomes",
  "Focus on both traffic, conversions, and AI visibility",
  "Customised solutions for your business and industry",
];

const WHAT_WE_DO_POINTS = [
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

const AuditForm = () => {
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
          <h3 className="text-xl font-bold text-[#0A1628] mb-2">Audit Request Received!</h3>
          <p className="text-[#6B7280]">We'll analyse your site and send your free audit within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1">Request Your Free SEO Audit</h3>
          <p className="text-sm text-[#6B7280] mb-4">Fill in your details and we'll get started right away.</p>
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
            Get My Free SEO Audit <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
            <Lock size={12} /> 100% free no credit card, no obligation
          </p>
        </form>
      )}
    </div>
  );
};

const SEOAuditStrategyPage = () => {
  // Every piece of static marketing copy on this page is click-to-edit from the admin
  // Pages panel (same data-cms-key + useSettings mechanism as every other page). All
  // new keys are namespaced with `seoaudit_` so they can't collide with any other page.
  const keys = [
    "seoaudit_hero_h1", "seoaudit_hero_h1_highlight", "seoaudit_hero_sub",
    "seoaudit_included_h2", "seoaudit_included_sub",
    "seoaudit_process_h2",
    "seoaudit_issues_h2", "seoaudit_issues_sub",
    "seoaudit_tools_h2", "seoaudit_tools_sub",
    "seoaudit_whyus_h2", "seoaudit_whatwedo_h2",
    "seoaudit_clients_eyebrow", "seoaudit_clients_h2", "seoaudit_clients_sub",
    "seoaudit_freeaudit_badge", "seoaudit_freeaudit_h2_line1", "seoaudit_freeaudit_h2_line2", "seoaudit_freeaudit_text",
    "seoaudit_related_label",
    "seoaudit_cta_badge", "seoaudit_cta_h2", "seoaudit_cta_text", "seoaudit_cta_button", "seoaudit_cta_footnote",
    ...INCLUDED.flatMap((_, i) => [`seoaudit_included_${i}_title`, `seoaudit_included_${i}_desc`]),
    ...PROCESS_STEPS.flatMap((_, i) => [`seoaudit_process_${i}_title`, `seoaudit_process_${i}_desc`]),
    ...COMMON_ISSUES.flatMap((_, i) => [`seoaudit_issue_${i}`]),
    ...TOOL_GROUPS.flatMap((_, i) => [`seoaudit_toolgroup_${i}_label`]),
    ...WHY_US_POINTS.flatMap((_, i) => [`seoaudit_whyus_${i}`]),
    ...WHAT_WE_DO_POINTS.flatMap((_, i) => [`seoaudit_whatwedo_${i}`]),
    ...FAQS.flatMap((_, i) => [`seoaudit_faq_${i}_q`, `seoaudit_faq_${i}_a`]),
    ...[0, 1, 2, 3].flatMap((i) => [`seoaudit_freeaudit_point_${i}`]),
  ];
  const s = useSettings(keys);
  const g = (key: string, fallback: string) => s[key] || fallback;

  const heroH1 = g("seoaudit_hero_h1", "SEO Audit & Strategy Services");
  const heroH1Highlight = g("seoaudit_hero_h1_highlight", "That Turn Data Into a Roadmap");
  const heroSub = g("seoaudit_hero_sub", "An SEO audit is a full review of your site's technical health, on-page optimisation, content, and backlinks, benchmarked against real competitors, so every recommendation is prioritised by actual impact, not guesswork.");
  const includedH2 = g("seoaudit_included_h2", "What's Included in Every Audit");
  const includedSub = g("seoaudit_included_sub", "Six areas covered in full depth, not a surface-level checklist.");
  const processH2 = g("seoaudit_process_h2", "How the Audit Process Works");
  const issuesH2 = g("seoaudit_issues_h2", "What Audits Actually Find");
  const issuesSub = g("seoaudit_issues_sub", "Real, recurring issues we uncover across the sites we audit — the kind that stay invisible until someone looks.");
  const toolsH2 = g("seoaudit_tools_h2", "Tools & Technologies We Use");
  const toolsSub = g("seoaudit_tools_sub", "Industry-leading SEO tools plus cutting edge AI search platforms for complete visibility.");
  const whyUsH2 = g("seoaudit_whyus_h2", "Why Choose Us");
  const whatWeDoH2 = g("seoaudit_whatwedo_h2", "What We Can Do for Your Business");
  const clientsEyebrow = g("seoaudit_clients_eyebrow", "Brands We've Grown With SEO");
  const clientsH2 = g("seoaudit_clients_h2", "Clients We've Grown With SEO");
  const clientsSub = g("seoaudit_clients_sub", "Real businesses. Real rankings. Organic growth delivered by Digital Aura.");
  const freeAuditBadge = g("seoaudit_freeaudit_badge", "Free SEO Audit");
  const freeAuditH2Line1 = g("seoaudit_freeaudit_h2_line1", "Get Your Free");
  const freeAuditH2Line2 = g("seoaudit_freeaudit_h2_line2", "SEO Audit & Strategy");
  const freeAuditText = g("seoaudit_freeaudit_text", "We'll analyse your website, identify ranking opportunities, and deliver a clear action plan completely free, no strings attached.");
  const freeAuditPoints = [
    g("seoaudit_freeaudit_point_0", "Full technical SEO audit of your site"),
    g("seoaudit_freeaudit_point_1", "Keyword gap & competitor analysis"),
    g("seoaudit_freeaudit_point_2", "AI visibility check (AIO & GEO)"),
    g("seoaudit_freeaudit_point_3", "Custom SEO roadmap & quick wins"),
  ];
  const relatedLabel = g("seoaudit_related_label", "Related SEO Services");
  const ctaBadge = g("seoaudit_cta_badge", "Let's Build Together");
  const ctaH2 = g("seoaudit_cta_h2", "Ready to See What's Really Holding Your Rankings Back?");
  const ctaText = g("seoaudit_cta_text", "Book a free SEO audit call. We'll review your site, flag the biggest opportunities, and show you exactly what a full audit and roadmap would cover — no strings attached.");
  const ctaButton = g("seoaudit_cta_button", "Book My Free SEO Audit");
  const ctaFootnote = g("seoaudit_cta_footnote", "No vanity metrics — a real audit built around what actually moves rankings and revenue.");

  const included = INCLUDED.map((item, i) => ({
    ...item,
    title: g(`seoaudit_included_${i}_title`, item.title),
    desc: g(`seoaudit_included_${i}_desc`, item.desc),
  }));
  const processSteps = PROCESS_STEPS.map((step, i) => ({
    ...step,
    title: g(`seoaudit_process_${i}_title`, step.title),
    desc: g(`seoaudit_process_${i}_desc`, step.desc),
  }));
  const commonIssues = COMMON_ISSUES.map((issue, i) => g(`seoaudit_issue_${i}`, issue));
  const toolGroups = TOOL_GROUPS.map((group, i) => ({
    ...group,
    label: g(`seoaudit_toolgroup_${i}_label`, group.label),
  }));
  const whyUsPoints = WHY_US_POINTS.map((w, i) => g(`seoaudit_whyus_${i}`, w));
  const whatWeDoPoints = WHAT_WE_DO_POINTS.map((w, i) => g(`seoaudit_whatwedo_${i}`, w));
  const faqs = FAQS.map((f, i) => ({
    q: g(`seoaudit_faq_${i}_q`, f.q),
    a: g(`seoaudit_faq_${i}_a`, f.a),
  }));

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
              <FileSearch size={12} /> SEO Audit &amp; Strategy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black leading-[1.12] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="seoaudit_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">{heroH1}</span><br />
            <span data-cms-key="seoaudit_hero_h1_highlight" data-cms-label="Hero H1 Highlight" data-cms-attr="text" style={{ color: accentColor }}>{heroH1Highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            <span data-cms-key="seoaudit_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">{heroSub}</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Full Site Crawl", "Keyword Gap Analysis", "Competitor Benchmarking", "Prioritised Roadmap"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact#contact-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Get My Free SEO Audit <Search size={15} />
            </Link>
            <a href="#included" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>See What's Included</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* What's Included */}
    <section id="included" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seoaudit_included_h2" data-cms-label="Included Heading" data-cms-attr="text">{includedH2}</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg mx-auto"><span data-cms-key="seoaudit_included_sub" data-cms-label="Included Subtext" data-cms-attr="text">{includedSub}</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {included.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accentColor}12` }}>
                <s.Icon size={20} style={{ color: accentColor }} />
              </div>
              <h3 data-cms-key={`seoaudit_included_${i}_title`} data-cms-label={`Included ${i + 1} Title`} data-cms-attr="text" className="font-bold text-[#0A1628] mb-2 text-[15px]">{s.title}</h3>
              <p data-cms-key={`seoaudit_included_${i}_desc`} data-cms-label={`Included ${i + 1} Desc`} data-cms-attr="text" className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seoaudit_process_h2" data-cms-label="Process Heading" data-cms-attr="text">{processH2}</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
              <span className="inline-block text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-3" style={{ background: `${accentColor}12`, color: accentColor }}>Step {step.num}</span>
              <h3 data-cms-key={`seoaudit_process_${i}_title`} data-cms-label={`Process ${i + 1} Title`} data-cms-attr="text" className="font-black text-[#0A1628] text-[14.5px] leading-snug mb-2">{step.title}</h3>
              <p data-cms-key={`seoaudit_process_${i}_desc`} data-cms-label={`Process ${i + 1} Desc`} data-cms-attr="text" className="text-[13px] text-[#6B7280] leading-relaxed">{step.desc}</p>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seoaudit_issues_h2" data-cms-label="Issues Heading" data-cms-attr="text">{issuesH2}</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="seoaudit_issues_sub" data-cms-label="Issues Subtext" data-cms-attr="text">{issuesSub}</span></p>
        </motion.div>
        <div className="space-y-3">
          {commonIssues.map((issue, i) => (
            <motion.div key={issue} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span data-cms-key={`seoaudit_issue_${i}`} data-cms-label={`Issue ${i + 1}`} data-cms-attr="text" className="text-[14px] text-[#374151] leading-relaxed">{issue}</span>
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
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="seoaudit_tools_h2" data-cms-label="Tools Heading" data-cms-attr="text">{toolsH2}</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="seoaudit_tools_sub" data-cms-label="Tools Subtext" data-cms-attr="text">{toolsSub}</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {toolGroups.map((group, i) => (
            <motion.div key={TOOL_GROUPS[i].label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p data-cms-key={`seoaudit_toolgroup_${i}_label`} data-cms-label={`Tool Group ${i + 1} Label`} data-cms-attr="text" className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: group.color }}>{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.pills.map(p => (
                  <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: group.bg, color: group.color }}>{p}</span>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seoaudit_whyus_h2" data-cms-label="Why Us Heading" data-cms-attr="text">{whyUsH2}</span>
          </h2>
          <ul className="space-y-3">
            {whyUsPoints.map((w, i) => (
              <li key={WHY_US_POINTS[i]} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span data-cms-key={`seoaudit_whyus_${i}`} data-cms-label={`Why Us ${i + 1}`} data-cms-attr="text" className="text-[14.5px] text-[#374151]">{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seoaudit_whatwedo_h2" data-cms-label="What We Do Heading" data-cms-attr="text">{whatWeDoH2}</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {whatWeDoPoints.map((label, i) => (
              <div key={WHAT_WE_DO_POINTS[i]} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accentColor}12` }}>
                  <Check size={15} style={{ color: accentColor }} />
                </div>
                <span data-cms-key={`seoaudit_whatwedo_${i}`} data-cms-label={`What We Do ${i + 1}`} data-cms-attr="text" className="text-[14.5px] text-[#374151]">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Real Clients. Real Growth. Real Results. */}
    <div style={{ marginBottom: "-60px" }}>
      <CaseStudies />
      <BlogInsights categories={["SEO Strategy","Technical SEO"]} />
    </div>

    {/* What Our Clients Say */}
    <Testimonials />

    {/* Clients We've Grown With SEO */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#fff", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}><span data-cms-key="seoaudit_clients_eyebrow" data-cms-label="Clients Eyebrow" data-cms-attr="text">{clientsEyebrow}</span></p>
        <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="seoaudit_clients_h2" data-cms-label="Clients Heading" data-cms-attr="text">{clientsH2}</span></h2>
        <p className="text-[#6B7280] text-sm max-w-md mx-auto"><span data-cms-key="seoaudit_clients_sub" data-cms-label="Clients Subtext" data-cms-attr="text">{clientsSub}</span></p>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Frequently Asked Questions <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <motion.div key={FAQS[idx].q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
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
            <span data-cms-key="seoaudit_freeaudit_badge" data-cms-label="Free Audit Badge" data-cms-attr="text" className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">{freeAuditBadge}</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6">
              <span data-cms-key="seoaudit_freeaudit_h2_line1" data-cms-label="Free Audit Heading Line 1" data-cms-attr="text">{freeAuditH2Line1}</span><br />
              <span data-cms-key="seoaudit_freeaudit_h2_line2" data-cms-label="Free Audit Heading Line 2" data-cms-attr="text">{freeAuditH2Line2}</span>
            </h2>
            <p className="text-white/80 text-lg mb-8"><span data-cms-key="seoaudit_freeaudit_text" data-cms-label="Free Audit Text" data-cms-attr="text">{freeAuditText}</span></p>
            <div className="space-y-3 mb-8">
              {freeAuditPoints.map((point, i) => (
                <div key={`freeaudit-point-${i}`} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white shrink-0" /><span data-cms-key={`seoaudit_freeaudit_point_${i}`} data-cms-label={`Free Audit Point ${i + 1}`} data-cms-attr="text" className="text-white font-medium">{point}</span></div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <AuditForm />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Related Services */}
    <section className="py-12 px-4 md:px-8 bg-white" style={{ borderTop: "1px solid #F3F4F6" }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-4" style={{ color: "#9CA3AF" }}><span data-cms-key="seoaudit_related_label" data-cms-label="Related Services Label" data-cms-attr="text">{relatedLabel}</span></p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {relatedServices.map(s => (
            <Link key={s.href} to={s.href} className="text-[13px] font-semibold px-4 py-2 rounded-full border transition-all hover:-translate-y-0.5"
              style={{ borderColor: "#E5E7EB", color: "#374151" }}>{s.label}</Link>
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
          <span data-cms-key="seoaudit_cta_badge" data-cms-label="CTA Badge" data-cms-attr="text" className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}40`, color: accentColor }}>{ctaBadge}</span>
          <h2 data-cms-key="seoaudit_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text" className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">{ctaH2}</h2>
          <p data-cms-key="seoaudit_cta_text" data-cms-label="CTA Text" data-cms-attr="text" className="text-[#E2E8F0] mb-8 leading-relaxed">{ctaText}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
            <span data-cms-key="seoaudit_cta_button" data-cms-label="CTA Button" data-cms-attr="text">{ctaButton}</span> <ArrowRight size={16} />
          </Link>
          <p data-cms-key="seoaudit_cta_footnote" data-cms-label="CTA Footnote" data-cms-attr="text" className="text-[#9CA3AF] text-xs mt-4">{ctaFootnote}</p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default SEOAuditStrategyPage;
