/**
 * SERVICE PAGE — Amazon SEO Consultant
 * Route: /services/amazon-seo-consultant
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  Search, TrendingUp, BarChart3, Target, Globe2, Zap,
  Star, Shield, Users, Check, ArrowRight, CheckCircle2,
  PlusCircle, MinusCircle, Layers, Lock, Award, Eye,
  FileText, Package, RefreshCw, MessageSquare,
} from "lucide-react";
import { useState, useRef } from "react";
import { RecaptchaBox, type RecaptchaHandle } from "@/components/RecaptchaBox";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";

const accentColor  = "#FF6B2B";
const accent2Color = "#1A6FE8";
const purpleColor  = "#7C3AED";
const glowOrange   = "rgba(255,107,43,0.10)";
const glowBlue     = "rgba(26,111,232,0.08)";
const glowPurple   = "rgba(124,58,237,0.08)";

// ── Service card data by tab ───────────────────────────────────────────────────
const serviceCards = [
  // ── On-Page SEO ──
  {
    Icon: Search,
    category: "On-Page SEO",
    color: accentColor,
    bg: glowOrange,
    title: "Strategy & Keyword Consulting",
    desc: "We start with a full audit of your marketplace presence and competitors, then craft a data-backed keyword strategy that targets real shopper intent — turning your listings into organic-search magnets.",
    tags: ["Marketplace Audit", "Competitor Study", "Keyword Blueprint"],
  },
  {
    Icon: FileText,
    category: "On-Page SEO",
    color: accentColor,
    bg: glowOrange,
    title: "Product Listing Optimisation",
    desc: "Every title, bullet point, description, and backend search term is crafted for both Amazon's A9 algorithm and human buyers — maximising discoverability and conversion in a single sweep.",
    tags: ["Title Craft", "Bullet Points", "Backend Keywords"],
  },
  {
    Icon: Eye,
    category: "On-Page SEO",
    color: accentColor,
    bg: glowOrange,
    title: "Creative Assets That Convert",
    desc: "Compliant main images, lifestyle shots, and infographic panels — all optimised to Amazon's image specifications so your listing wins the click before a shopper even reads your copy.",
    tags: ["Image Compliance", "Lifestyle Images", "Infographics"],
  },
  // ── Off-Page & Authority ──
  {
    Icon: Globe2,
    category: "Off-Page & Authority",
    color: accent2Color,
    bg: glowBlue,
    title: "A+ Content & Brand Story",
    desc: "We design rich A+ Content layouts with comparison tables, brand story modules, and persuasive copy that dramatically reduces returns and lifts conversion — turning browsers into buyers.",
    tags: ["A+ Modules", "Brand Story", "Comparison Tables"],
  },
  {
    Icon: Star,
    category: "Off-Page & Authority",
    color: accent2Color,
    bg: glowBlue,
    title: "Review Strategy & Early Traction",
    desc: "We implement compliant early-review programmes and best-practice follow-up sequences to accelerate your review velocity — building the social proof that fuels organic rank growth.",
    tags: ["Review Velocity", "Vine Programme", "Compliant Follow-ups"],
  },
  {
    Icon: TrendingUp,
    category: "Off-Page & Authority",
    color: accent2Color,
    bg: glowBlue,
    title: "Google SEO for Amazon Listings",
    desc: "Amazon listings can rank on Google too. We structure your copy, metadata, and external backlinks so your products capture traffic from both Amazon's internal search and Google's results pages.",
    tags: ["Google Indexation", "External Traffic", "Cross-Platform SEO"],
  },
  // ── Operations & Reporting ──
  {
    Icon: Package,
    category: "Operations & Reporting",
    color: purpleColor,
    bg: glowPurple,
    title: "Inventory & FBA Optimisation",
    desc: "Stock-outs destroy rank. We monitor inventory health, flagging reorder points and defect rates in real time so your listings stay active, ranked, and buyable 24/7.",
    tags: ["Stock Monitoring", "FBA Health", "Defect Rate"],
  },
  {
    Icon: BarChart3,
    category: "Operations & Reporting",
    color: purpleColor,
    bg: glowPurple,
    title: "Analytics, Reporting & Monitoring",
    desc: "Regular performance reports from your dedicated account manager — sessions, conversions, keyword rank movements, and advertising ROI — so you always know exactly what's working and what to do next.",
    tags: ["Rank Tracking", "Conversion Reports", "Dedicated Manager"],
  },
  {
    Icon: RefreshCw,
    category: "Operations & Reporting",
    color: purpleColor,
    bg: glowPurple,
    title: "Ongoing SEO Maintenance",
    desc: "Amazon's algorithm evolves constantly. We run monthly listing refreshes, keyword gap reviews, and competitor re-audits to keep your rankings climbing — not just at launch, but continuously.",
    tags: ["Monthly Refresh", "Algorithm Updates", "Competitor Re-audit"],
  },
];

const tabMeta: Record<string, { color: string; gradient: string; bg: string; desc: string }> = {
  "On-Page SEO":           { color: accentColor,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)`,   bg: glowOrange,  desc: "Optimise every element buyers and algorithms see" },
  "Off-Page & Authority":  { color: accent2Color, gradient: `linear-gradient(135deg,${accent2Color},#1558c0)`, bg: glowBlue,    desc: "Build the authority that earns lasting organic rank" },
  "Operations & Reporting":{ color: purpleColor,  gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",         bg: glowPurple,  desc: "Data-led decisions that compound your SEO results" },
};
const tabs = Object.keys(tabMeta);

// ── Why Us cards ──────────────────────────────────────────────────────────────
const whyUs = [
  { Icon: Award,        color: accentColor,  title: "Accredited Amazon Consultants",    desc: "Our team holds active Amazon certifications and updates its methodology every quarter to stay ahead of A9 and A10 algorithm changes." },
  { Icon: Target,       color: accent2Color, title: "ROI-First Approach",               desc: "Every recommendation is tied to a revenue metric. We don't optimise vanity stats — we optimise sessions, conversion rate, and attributed sales." },
  { Icon: Globe2,       color: purpleColor,  title: "Multi-Marketplace Expertise",       desc: "Whether you sell on Amazon India, US, UK, Europe, or UAE, we build market-specific strategies that account for local search behaviour and buying patterns." },
  { Icon: Users,        color: accentColor,  title: "Dedicated Account Manager",         desc: "One point of contact who knows your catalogue, your goals, and your brand — not a rotating support ticket queue." },
  { Icon: BarChart3,    color: accent2Color, title: "Transparent Monthly Reporting",     desc: "Full-visibility dashboards and plain-language reports so you understand exactly where your SEO spend is going and what it's returning." },
  { Icon: Shield,       color: purpleColor,  title: "Policy-Safe Strategies Only",       desc: "Every tactic we use is fully compliant with Amazon's Terms of Service — no black-hat shortcuts that risk suspension or listing removal." },
];

// ── 5-step process ────────────────────────────────────────────────────────────
const steps = [
  { step: "01", color: accentColor,  title: "Discovery & Audit",         desc: "Full audit of your current listings, keyword coverage, competitor landscape, and account health to establish a clear baseline." },
  { step: "02", color: accent2Color, title: "Strategy Blueprint",         desc: "We build a prioritised SEO roadmap — keyword targets, listing rewrites, content plan, and quick-win opportunities — tailored to your category." },
  { step: "03", color: purpleColor,  title: "On-Page Implementation",     desc: "Titles, bullets, descriptions, backend keywords, and A+ Content are all updated to our agreed strategy in a single coordinated rollout." },
  { step: "04", color: accentColor,  title: "Authority & Off-Page Build", desc: "Review programmes, external traffic strategies, and Google SEO tactics are layered on top to amplify the on-page gains." },
  { step: "05", color: accent2Color, title: "Monitor, Report & Iterate",  desc: "Monthly reporting, rank monitoring, and iterative refreshes keep your SEO compound-growing rather than stagnating after launch." },
];

// ── Stats bar ─────────────────────────────────────────────────────────────────
const stats = [
  { value: "400+", label: "Listings Fully Optimised" },
  { value: "2.4×", label: "Avg Conversion Uplift" },
  { value: "35%",  label: "Avg Organic Traffic Lift" },
  { value: "72hr", label: "Full Audit Turnaround" },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    key: "amzn_seo_faq_1",
    q: "What does an Amazon SEO consultant actually do?",
    a: "An Amazon SEO consultant optimises every on-page and off-page signal that influences your product's organic rank — keywords, listing copy, A+ Content, review velocity, external traffic, and backend metadata — so your products appear higher in Amazon's search results without paying for every click.",
  },
  {
    key: "amzn_seo_faq_2",
    q: "How long does it take to see results from Amazon SEO?",
    a: "Most clients see measurable rank improvements within 4–6 weeks of a full listing overhaul. Competitive categories can take 8–12 weeks. Unlike PPC, the gains compound over time — once you rank, you rank, and the cost per sale continues to fall.",
  },
  {
    key: "amzn_seo_faq_3",
    q: "Is Amazon SEO different from Google SEO?",
    a: "Yes. Amazon's A9/A10 algorithm prioritises purchase probability over content relevance. Click-through rate, conversion rate, review velocity, and sales history matter more than backlinks or domain authority. Our strategies are built exclusively around Amazon's ranking signals.",
  },
  {
    key: "amzn_seo_faq_4",
    q: "Do you work with new sellers or only established brands?",
    a: "Both. For new sellers we focus on rapid baseline establishment — thorough keyword research, fully optimised listings from day one, and early review strategies. For established sellers we concentrate on closing rank gaps, defending existing positions, and expanding into new keyword clusters.",
  },
  {
    key: "amzn_seo_faq_5",
    q: "Can you optimise listings on multiple Amazon marketplaces?",
    a: "Yes. We serve sellers across Amazon India, US, UK, Canada, Australia, Germany, and UAE. Each marketplace gets its own localised keyword research and copy — we never simply translate listings, because search behaviour varies significantly by market.",
  },
  {
    key: "amzn_seo_faq_6",
    q: "What is included in the free Amazon SEO audit?",
    a: "The audit covers keyword coverage gaps, listing quality score, A+ Content assessment, review health, competitor ranking comparison, backend keyword utilisation, and an image compliance check — delivered as a prioritised action report within 72 hours.",
  },
  {
    key: "amzn_seo_faq_7",
    q: "How is your Amazon SEO service priced?",
    a: "Pricing depends on catalogue size, number of marketplaces, and service scope. We offer one-time optimisation packages as well as ongoing monthly retainers. Contact us for a custom quote — we'll scope it after the free audit so you know exactly what's included before committing.",
  },
];

// ── Illustrations ─────────────────────────────────────────────────────────────
function SeoRankIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" rx="16" fill="rgba(26,111,232,0.06)" />
      {/* Browser chrome */}
      <rect x="20" y="20" width="360" height="260" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(26,111,232,0.2)" strokeWidth="1" />
      <rect x="20" y="20" width="360" height="36" rx="10" fill="rgba(26,111,232,0.10)" />
      <circle cx="40" cy="38" r="5" fill="rgba(255,107,43,0.4)" />
      <circle cx="58" cy="38" r="5" fill="rgba(255,185,0,0.4)" />
      <circle cx="76" cy="38" r="5" fill="rgba(34,197,94,0.4)" />
      <rect x="100" y="30" width="220" height="16" rx="8" fill="rgba(255,255,255,0.08)" />
      {/* Amazon search bar */}
      <rect x="40" y="72" width="320" height="32" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,107,43,0.3)" strokeWidth="1.5" />
      <text x="56" y="92" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">organic face wash for sensitive skin</text>
      <rect x="330" y="76" width="24" height="24" rx="6" fill={accentColor} />
      <circle cx="338" cy="84" r="4" stroke="white" strokeWidth="1.5" fill="none" />
      <line x1="341" y1="87" x2="344" y2="90" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Rank result rows */}
      {[0,1,2,3].map((i) => (
        <g key={i} transform={`translate(0, ${i * 42})`}>
          <rect x="40" y="118" width="320" height="34" rx="6"
            fill={i === 0 ? "rgba(255,107,43,0.12)" : "rgba(255,255,255,0.03)"}
            stroke={i === 0 ? "rgba(255,107,43,0.3)" : "transparent"} strokeWidth="1" />
          <text x="56" y="134" fill={i === 0 ? accentColor : "rgba(255,255,255,0.3)"} fontSize="9" fontWeight="bold">#{i+1}</text>
          <rect x="72" y="124" width={i === 0 ? 160 : 100 + i*10} height="8" rx="4"
            fill={i === 0 ? "rgba(255,107,43,0.4)" : "rgba(255,255,255,0.08)"} />
          <rect x="72" y="136" width={i === 0 ? 100 : 60 + i*8} height="5" rx="3"
            fill={i === 0 ? "rgba(255,107,43,0.2)" : "rgba(255,255,255,0.05)"} />
          {i === 0 && <text x="348" y="138" fill={accentColor} fontSize="8" textAnchor="end">YOUR PRODUCT</text>}
        </g>
      ))}
      {/* Rank trend line */}
      <g transform="translate(40, 190)">
        <rect width="320" height="68" rx="8" fill="rgba(26,111,232,0.06)" />
        <text x="12" y="16" fill="rgba(255,255,255,0.4)" fontSize="8">Rank Movement (30 days)</text>
        <polyline points="10,52 50,45 90,38 130,30 170,24 210,18 250,14 290,10 310,8"
          stroke={accent2Color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="310" cy="8" r="4" fill={accent2Color} />
        <text x="315" y="12" fill={accent2Color} fontSize="8">#1</text>
      </g>
    </svg>
  );
}

function AuditIllustration() {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="280" rx="16" fill="rgba(124,58,237,0.06)" />
      {/* Audit checklist card */}
      <rect x="20" y="20" width="170" height="240" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(124,58,237,0.2)" strokeWidth="1" />
      <text x="34" y="44" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="bold">SEO Audit</text>
      {[
        { label: "Keyword Coverage",  pct: 82, color: accentColor },
        { label: "Listing Quality",   pct: 61, color: accent2Color },
        { label: "A+ Content",        pct: 45, color: purpleColor },
        { label: "Review Health",     pct: 90, color: "#22C55E" },
        { label: "Image Compliance",  pct: 55, color: accentColor },
      ].map(({ label, pct, color }, i) => (
        <g key={label} transform={`translate(34, ${62 + i * 38})`}>
          <text x="0" y="10" fill="rgba(255,255,255,0.5)" fontSize="8">{label}</text>
          <rect x="0" y="16" width="136" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="0" y="16" width={136 * pct / 100} height="6" rx="3" fill={color} opacity="0.8" />
          <text x="140" y="22" fill={color} fontSize="7" textAnchor="end">{pct}%</text>
        </g>
      ))}
      {/* Score badge */}
      <circle cx="105" cy="236" r="18" fill="rgba(255,107,43,0.15)" stroke={accentColor} strokeWidth="1.5" />
      <text x="105" y="241" fill={accentColor} fontSize="12" fontWeight="bold" textAnchor="middle">67</text>
      {/* Action plan card */}
      <rect x="210" y="20" width="170" height="240" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,107,43,0.2)" strokeWidth="1" />
      <text x="224" y="44" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="bold">Action Plan</text>
      {[
        { label: "Rewrite title",        priority: "HIGH",  color: "#EF4444" },
        { label: "Add backend KWs",      priority: "HIGH",  color: "#EF4444" },
        { label: "Create A+ Content",    priority: "MED",   color: "#F59E0B" },
        { label: "Request 10 reviews",   priority: "MED",   color: "#F59E0B" },
        { label: "Optimise images",      priority: "LOW",   color: "#22C55E" },
        { label: "Google off-page",      priority: "LOW",   color: "#22C55E" },
      ].map(({ label, priority, color }, i) => (
        <g key={label} transform={`translate(224, ${58 + i * 32})`}>
          <rect x="0" y="0" width="140" height="22" rx="5" fill="rgba(255,255,255,0.03)" />
          <circle cx="10" cy="11" r="4" fill={color} opacity="0.8" />
          <text x="20" y="14" fill="rgba(255,255,255,0.6)" fontSize="8">{label}</text>
          <text x="140" y="14" fill={color} fontSize="7" textAnchor="end" fontWeight="bold">{priority}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Lead form ─────────────────────────────────────────────────────────────────
function SeoAuditForm() {
  const recaptchaRef = useRef<RecaptchaHandle>(null);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", asin: "", marketplace: "IN" });
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const token = recaptchaRef.current?.getToken() ?? "";
      await submitLead({ ...form, source: "amazon-seo-consultant-form", recaptchaToken: token });
      track("amazon_seo_lead");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  };


  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

  if (status === "ok") return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${accent2Color}12`, border: `1.5px solid ${accent2Color}` }}>
        <CheckCircle2 size={28} style={{ color: accent2Color }} />
      </div>
      <p className="text-[#0A1628] font-semibold text-lg mb-1">Audit Request Received!</p>
      <p className="text-[#6B7280] text-sm">We'll deliver your free SEO audit within 72 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputCls} style={{ ["--tw-ring-color" as string]: accent2Color }} placeholder="Your Name *" value={form.name} onChange={set("name")} required />
        <input className={inputCls} placeholder="Business / Brand Name *" value={form.business} onChange={set("business")} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputCls} type="email" placeholder="Email Address *" value={form.email} onChange={set("email")} required />
        <input className={inputCls} type="tel" placeholder="Phone Number *" value={form.phone} onChange={set("phone")} required />
      </div>
      <input className={inputCls} placeholder="Primary ASIN (optional)" value={form.asin} onChange={set("asin")} />
      <select className={inputCls} value={form.marketplace} onChange={set("marketplace")}>
        <option value="IN">Amazon India (IN)</option>
        <option value="US">Amazon USA (US)</option>
        <option value="UK">Amazon UK (UK)</option>
        <option value="CA">Amazon Canada (CA)</option>
        <option value="AU">Amazon Australia (AU)</option>
        <option value="DE">Amazon Germany (DE)</option>
        <option value="AE">Amazon UAE (AE)</option>
        <option value="Other">Other Marketplace</option>
      </select>
      <RecaptchaBox ref={recaptchaRef} />
      <button type="submit" disabled={status === "loading"}
        className="w-full py-3.5 rounded-full font-bold text-white text-sm transition-all"
        style={{ background: `linear-gradient(135deg,${accent2Color},#1558c0)`, boxShadow: `0 8px 24px ${accent2Color}40`, opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Submitting…" : "Get My Free SEO Audit →"}
      </button>
      {status === "err" && <p className="text-red-500 text-xs text-center">Something went wrong — please try again or email us directly.</p>}
    </form>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AmazonSeoConsultantPage() {
  const s = useSettings(["amzn_seo_hero_h1", "amzn_seo_hero_sub", "amzn_seo_cta_btn"]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const visibleCards = serviceCards.filter(c => c.category === activeTab);
  const meta = tabMeta[activeTab];

  return (
    <PageLayout>
      <StickyCtaBar
        accent={accent2Color}
        label="Get Free SEO Audit"
        href="#seo-audit-form"
        topic="Amazon SEO Consultant"
      />

      {/* ── HERO ── */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle,${glowBlue},transparent)`, filter: "blur(70px)" }} />
          <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: `radial-gradient(circle,${glowOrange},transparent)`, filter: "blur(60px)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: `${accent2Color}12`, color: accent2Color, border: `1px solid ${accent2Color}30` }}>
                <Search size={12} /> Amazon SEO Consultant
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight"
              data-cms-key="amzn_seo_hero_h1">
              {s.amzn_seo_hero_h1 || (<>Rank Higher on Amazon.<br />
              <span style={{ color: accent2Color }}>Sell More. Pay Less Per Sale.</span></>)}
            </h1>
            <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed" data-cms-key="amzn_seo_hero_sub">
              {s.amzn_seo_hero_sub || "Expert Amazon SEO consulting that moves your products from page 3 to page 1 — building organic visibility that compounds, so you spend less on ads every month."}
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <a href="#seo-audit-form"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
                style={{ background: `linear-gradient(135deg,${accent2Color},#1558c0)`, boxShadow: `0 8px 24px ${accent2Color}40` }}
                data-cms-key="amzn_seo_cta_btn">
                {s.amzn_seo_cta_btn || "Get a Free SEO Audit"} <ArrowRight size={15} />
              </a>
              <Link to="/services/amazon-marketing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
                style={{ borderColor: "#0A1628" }}>
                All Amazon Services
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[{ v: "400+", l: "Listings Optimised" }, { v: "2.4×", l: "Avg Conversion Lift" }, { v: "72hr", l: "Audit Turnaround" }].map(({ v, l }) => (
                <div key={l} className="text-center p-3 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                  <div className="text-2xl font-extrabold" style={{ color: accent2Color }}>{v}</div>
                  <div className="text-[#6B7280] text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444" }}>
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Poor Listing SEO Is Giving Your Sales to Competitors — Every Single Day
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">
            If your products aren't optimised for Amazon's algorithm, you're invisible to buyers who are actively searching for exactly what you sell.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
            {[
              "Products buried on page 3+ despite being the best in category",
              "Listings stuffed with wrong or low-volume keywords that no one searches",
              "High PPC spend masking the absence of any organic rank",
              "Competitor products with inferior quality outranking you due to better SEO",
            ].map(pt => (
              <div key={pt} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug">{pt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE TABS ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-4 inline-block" style={{ background: `${accent2Color}12`, color: accent2Color }}>
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-2">Our Amazon SEO Services</h2>
            <p className="text-[#4B5563]">End-to-end SEO consulting across every layer of Amazon's ranking system</p>
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {tabs.map(tab => {
              const m = tabMeta[tab];
              const active = tab === activeTab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={active
                    ? { background: m.gradient, color: "#fff", boxShadow: `0 4px 14px ${m.color}40` }
                    : { background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB" }}>
                  {tab}
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleCards.map(({ Icon, title, desc, tags, color, bg }) => (
                <div key={title} className="rounded-2xl p-6 flex flex-col gap-4 bg-white transition-transform hover:-translate-y-1"
                  style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg, border: `1px solid ${color}30` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-[#0A1628] font-semibold text-base mb-1">{title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map(t => (
                      <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: bg, color, border: `1px solid ${color}20` }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── AUDIT SECTION ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="h-72 lg:h-80">
            <AuditIllustration />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-5 inline-block"
              style={{ background: `${accentColor}12`, color: accentColor }}>
              Free Amazon SEO Audit
            </span>
            <h2 className="text-3xl font-black text-[#0A1628] mb-4">Know Exactly Where Your Listings Are Losing Rank</h2>
            <p className="text-[#4B5563] mb-6 text-sm leading-relaxed">
              Our 72-hour audit covers every ranking signal — keyword gaps, listing quality, A+ Content, review health, image compliance, and advertising efficiency — delivered as a prioritised action report.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { label: "Content Evaluation",   desc: "Listings, descriptions, images, compliance score" },
                { label: "Keyword Gap Analysis", desc: "Missing high-volume terms vs top competitors" },
                { label: "Advertising Review",   desc: "Campaign efficiency and keyword bid waste" },
                { label: "Review Health Check",  desc: "Velocity, recency, and rating benchmarks" },
                { label: "SKU & Backend Audit",  desc: "Backend search terms, categorisation, inventory" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                  <CheckCircle2 size={16} style={{ color: accentColor }} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#0A1628] text-sm font-semibold">{label}</span>
                    <span className="text-[#9CA3AF] text-sm"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="#seo-audit-form"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:gap-3"
              style={{ background: `linear-gradient(135deg,${accentColor},#e85a1a)`, boxShadow: `0 8px 24px ${accentColor}40` }}>
              Get My Free Audit <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-4 inline-block" style={{ background: `${purpleColor}12`, color: purpleColor }}>
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-2">Why Choose Digital Aura as Your Amazon SEO Consultant</h2>
            <p className="text-[#4B5563] max-w-xl">We don't offer generic SEO advice — we deliver marketplace-specific strategies that move real products up real rankings.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ Icon, color, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-white transition-transform hover:-translate-y-1"
                style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-[#0A1628] font-semibold text-base mb-2">{title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-4 inline-block" style={{ background: `${accent2Color}12`, color: accent2Color }}>
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-2">How Our Amazon SEO Process Works</h2>
            <p className="text-[#4B5563]">From first audit to continuously compounding organic rank</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom,transparent,#FF6B2B,#1A6FE8,#7C3AED,transparent)" }} />
            <div className="space-y-6">
              {steps.map(({ step, color, title, desc }, i) => (
                <motion.div key={step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start md:pl-20 relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg md:absolute md:left-0 md:w-16 md:h-16"
                    style={{ background: `${color}12`, border: `1.5px solid ${color}35`, color }}>
                    {step}
                  </div>
                  <div className="p-5 rounded-2xl flex-1" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                    <h3 className="text-[#0A1628] font-semibold text-base mb-1">{title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 px-4 md:px-8" style={{ background: "#F8FAFF", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="p-5 rounded-2xl bg-white" style={{ border: "1px solid #E5E7EB", boxShadow: `0 4px 20px ${accent2Color}08` }}>
              <div className="text-3xl font-extrabold mb-1" style={{ color: accent2Color }}>{value}</div>
              <div className="text-[#6B7280] text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-4 inline-block" style={{ background: `${accent2Color}12`, color: accent2Color }}>
              FAQs
            </span>
            <h2 className="text-3xl font-black text-[#0A1628] mb-2">Frequently Asked Questions</h2>
            <p className="text-[#4B5563]">Everything you need to know before hiring an Amazon SEO consultant</p>
          </div>
          <div className="space-y-3">
            {faqs.map(({ key, q, a }) => {
              const open = openFaq === key;
              return (
                <div key={key} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${open ? accent2Color + "50" : "#E5E7EB"}`, background: open ? `${accent2Color}06` : "#fff" }}>
                  <button onClick={() => setOpenFaq(open ? null : key)} className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left">
                    <span className="text-[#0A1628] text-sm font-semibold leading-snug" data-cms-key={key}>{q}</span>
                    {open ? <MinusCircle size={18} style={{ color: accent2Color }} className="shrink-0" /> : <PlusCircle size={18} className="text-[#9CA3AF] shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <p className="px-6 pb-5 text-[#4B5563] text-sm leading-relaxed">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section id="seo-audit-form" className="pt-16 pb-8 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-5 inline-block"
              style={{ background: `${accent2Color}12`, color: accent2Color }}>
              Free — No Commitment
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] mb-4">
              Get Your Free Amazon SEO Audit in 72 Hours
            </h2>
            <p className="text-[#4B5563] mb-8 leading-relaxed">
              Tell us your ASIN and marketplace and we'll audit your listings, keyword coverage, and ranking gaps — delivered as a clear action report. No sales pitch. Just data.
            </p>
            <div className="space-y-3">
              {[
                "Keyword gap analysis vs page-1 competitors",
                "Listing quality and copy assessment",
                "A+ Content and image compliance check",
                "Review health benchmarking",
                "Prioritised action report within 72 hours",
              ].map(pt => (
                <div key={pt} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                  <Check size={15} style={{ color: accent2Color }} className="shrink-0" />
                  <span className="text-[#374151] text-sm">{pt}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-7 rounded-2xl bg-white" style={{ border: `1px solid ${accent2Color}30`, boxShadow: `0 8px 40px ${accent2Color}15` }}>
            <SeoAuditForm />
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
