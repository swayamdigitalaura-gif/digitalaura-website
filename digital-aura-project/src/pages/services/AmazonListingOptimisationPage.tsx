/**
 * SERVICE PAGE — Amazon Product Listing Optimisation
 * Route: /services/amazon-listing-optimisation
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  Search, FileText, Tag, Image as ImageIcon, TrendingUp, BarChart3,
  Star, Shield, Zap, Users, Check, ArrowRight, CheckCircle2,
  PlusCircle, MinusCircle, Layers, Lock, Globe2, Award,
} from "lucide-react";
import { useState, useRef } from "react";
import { RecaptchaBox, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from "@/components/RecaptchaBox";
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
  // ── Keywords & Research ──
  {
    Icon: Search,
    category: "Keywords & Research",
    color: accentColor,
    bg: glowOrange,
    title: "Extensive Keyword Research",
    desc: "Deep keyword discovery using Amazon auto-suggest, competitor reverse ASIN lookups, and long-tail targeting to find the highest-volume, highest-converting search terms for your products.",
    tags: ["Auto-Suggest", "Reverse ASIN", "Long-Tail"],
  },
  {
    Icon: Globe2,
    category: "Keywords & Research",
    color: accentColor,
    bg: glowOrange,
    title: "Competitor & Market Analysis",
    desc: "Thorough analysis of competing and similar products to identify customer needs, search behaviour, and keyword gaps — giving your listing a data-backed edge over rivals.",
    tags: ["Competitor Intel", "Keyword Gaps", "Market Trends"],
  },
  {
    Icon: Shield,
    category: "Keywords & Research",
    color: accentColor,
    bg: glowOrange,
    title: "Backend Search Term Optimisation",
    desc: "Complete backend keyword and meta search term configuration including long-tail variations that most providers overlook — maximising your listing's organic reach without cluttering the visible copy.",
    tags: ["Backend Keywords", "Meta Terms", "Index Coverage"],
  },
  // ── Copy & Content ──
  {
    Icon: Tag,
    category: "Copy & Content",
    color: accent2Color,
    bg: glowBlue,
    title: "SEO-Friendly Product Title",
    desc: "A9-indexed, keyword-rich title covering brand, product type, key attributes, and size or variant — structured to rank in search and win clicks from the results page.",
    tags: ["A9 Indexed", "Keyword-Rich", "CTR Optimised"],
  },
  {
    Icon: FileText,
    category: "Copy & Content",
    color: accent2Color,
    bg: glowBlue,
    title: "Bullet Points & Description",
    desc: "Persuasive, conversion-focused bullet points and an HTML-structured description that highlights key features, clarifies benefits, and answers buyer objections before they arise.",
    tags: ["Conversion Copy", "HTML Description", "Benefit Framing"],
  },
  {
    Icon: Award,
    category: "Copy & Content",
    color: accent2Color,
    bg: glowBlue,
    title: "A+ Content / Enhanced Brand Content",
    desc: "Premium Enhanced Brand Content that elevates your product detail page with rich visuals, comparison charts, and brand storytelling. Amazon data shows A+ Content can lift conversions by up to 20%.",
    tags: ["Brand Story", "Comparison Charts", "Rich Media"],
  },
  // ── Visibility & Growth ──
  {
    Icon: TrendingUp,
    category: "Visibility & Growth",
    color: purpleColor,
    bg: glowPurple,
    title: "Amazon SEO & Ranking Strategy",
    desc: "Organic ranking improvement through keyword indexing audits, review velocity strategy, and content alignment with the A9 algorithm — turning a well-written listing into a ranking asset.",
    tags: ["A9 Algorithm", "Organic Rank", "Review Strategy"],
  },
  {
    Icon: ImageIcon,
    category: "Visibility & Growth",
    color: purpleColor,
    bg: glowPurple,
    title: "Product Image Guidance",
    desc: "Amazon-compliant main image specifications, lifestyle shot recommendations, and infographic layout advice — ensuring your images meet category requirements and maximise CTR from search results.",
    tags: ["White Background", "Lifestyle Shots", "Infographics"],
  },
  {
    Icon: BarChart3,
    category: "Visibility & Growth",
    color: purpleColor,
    bg: glowPurple,
    title: "Product & Brand Optimisation",
    desc: "In-depth product research combined with brand identity alignment on Amazon — ensuring your storefront, listings, and A+ Content present a cohesive, trust-building brand experience.",
    tags: ["Brand Consistency", "Storefront", "Trust Signals"],
  },
];

const tabs = ["Keywords & Research", "Copy & Content", "Visibility & Growth"] as const;
type Tab = typeof tabs[number];

const tabMeta: Record<Tab, { color: string; gradient: string; bg: string; desc: string }> = {
  "Keywords & Research": { color: accentColor,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)`,   bg: glowOrange,  desc: "Find the terms real shoppers type" },
  "Copy & Content":      { color: accent2Color, gradient: `linear-gradient(135deg,${accent2Color},#1558c0)`, bg: glowBlue,    desc: "Copy that ranks and converts" },
  "Visibility & Growth": { color: purpleColor,  gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",         bg: glowPurple,  desc: "Long-term organic growth strategy" },
};

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { Icon: Search,     color: accentColor,  title: "1,000+ Listings Optimised",   desc: "Proven track record across categories — from electronics to beauty — with measurable improvements in ranking, clicks, and conversion rates." },
  { Icon: Star,       color: accent2Color, title: "Amazon SEO Specialists",       desc: "Our copywriters are certified Amazon SEO experts, not generalists. Every word is chosen for A9 indexing, buyer intent, and conversion — not word count." },
  { Icon: Zap,        color: purpleColor,  title: "Mobile-First Listings",        desc: "Over 60% of Amazon purchases are mobile. We write and structure listings to look perfect on every device — not just on desktop previews." },
  { Icon: Globe2,     color: accentColor,  title: "Multi-Category Expertise",     desc: "We've optimised listings in almost every product category — independent sellers, new launches, and established brands with large catalogues." },
  { Icon: Users,      color: accent2Color, title: "Dedicated Listing Manager",    desc: "One point of contact who knows your products and your goals — no ticket queues, no handoffs to junior staff." },
  { Icon: Shield,     color: purpleColor,  title: "Amazon Policy Compliant",      desc: "Every listing we write follows Amazon's current content guidelines — no keyword stuffing, no prohibited claims, no suppression risk." },
];

// ── Process steps ──────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "Listing Audit",         desc: "We audit your current listing for keyword gaps, copy quality, backend completeness, and A9 indexing issues." },
  { n: "02", title: "Keyword Strategy",      desc: "Deep keyword research across auto-suggest, competitor ASINs, and long-tail opportunities — mapped to title, bullets, description, and backend." },
  { n: "03", title: "Copy & Content Write",  desc: "Copywriters produce a keyword-rich title, five bullet points, full description, and backend search terms — structured for both rank and conversion." },
  { n: "04", title: "Review & Publish",      desc: "You review a draft; we incorporate feedback and prepare publish-ready copy formatted to Amazon's character and HTML limits." },
  { n: "05", title: "Track & Improve",       desc: "We monitor keyword indexing and organic rank post-publish, iterating copy and backend terms to compound ranking gains over time." },
];

// ── FAQs ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    key: "amzn_listing_faq_1",
    q: "What is Amazon listing optimisation and why does it matter?",
    a: "Amazon listing optimisation is the process of improving your product title, bullet points, description, images, and backend search terms so your listing ranks higher in Amazon search and converts more visitors into buyers. A well-optimised listing is the foundation of both organic sales and PPC performance — it directly affects your CTR, conversion rate, and therefore your organic rank.",
  },
  {
    key: "amzn_listing_faq_2",
    q: "How is Amazon SEO different from Google SEO?",
    a: "Amazon's A9 algorithm ranks products based on sales velocity, conversion rate, and keyword relevance — not backlinks or domain authority. The goal of Amazon SEO is to maximise keyword indexing in the right places (title, bullets, backend) and to convert visitors at a high rate, since conversions are the strongest ranking signal on the platform.",
  },
  {
    key: "amzn_listing_faq_3",
    q: "How long does it take to see results after optimisation?",
    a: "Most listings see improved keyword indexing within 48–72 hours of republishing. Organic rank improvements typically become visible within 2–4 weeks as the A9 algorithm registers the updated relevance. Conversion rate improvements are often immediate once persuasive copy and clear benefit framing replace generic descriptions.",
  },
  {
    key: "amzn_listing_faq_4",
    q: "Do you optimise backend search terms and hidden keywords?",
    a: "Yes — backend search term optimisation is a core part of our service. We populate all available backend fields including search terms, subject matter, intended use, and other hidden attributes. Most providers skip these fields; filling them correctly is one of the fastest wins for organic indexing with no visible changes to your listing.",
  },
  {
    key: "amzn_listing_faq_5",
    q: "What do you need from us to get started?",
    a: "We need your ASIN or current listing URL, your product specification sheet or key features list, any brand guidelines, and access to your Seller Central account (read access is sufficient for the audit). We also ask for your top 5–10 competitor ASINs if you have them.",
  },
  {
    key: "amzn_listing_faq_6",
    q: "Will better listings also improve my PPC performance?",
    a: "Yes — significantly. Amazon uses listing quality as a relevance signal for Sponsored ads. A keyword-rich, well-structured listing improves your ad Quality Score, reduces cost-per-click, and boosts conversion rate — which in turn lowers ACoS. Listing and PPC optimisation compound each other.",
  },
  {
    key: "amzn_listing_faq_7",
    q: "How is your listing optimisation service priced?",
    a: "We offer per-listing and catalogue packages depending on the number of ASINs and the complexity of your products. We share exact pricing on a discovery call once we understand your catalogue. No hidden fees — the quote covers keyword research, copy, backend terms, and one round of revisions.",
  },
];

// ── SVG Illustrations ──────────────────────────────────────────────────────────
function ListingDashboardIllustration() {
  return (
    <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[420px]" aria-hidden="true">
      <rect width="420" height="320" rx="16" fill="#0D1E3A" />
      <rect x="0" y="0" width="420" height="44" rx="16" fill="#132035" />
      <rect x="16" y="14" width="10" height="10" rx="5" fill="#FF6B2B" opacity="0.9" />
      <text x="34" y="23" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">Listing Score Dashboard</text>
      <text x="330" y="23" fill="#22C55E" fontSize="10" fontFamily="system-ui">Optimised</text>
      <circle cx="324" cy="20" r="4" fill="#22C55E" opacity="0.5" />
      {[
        { x: 16,  label: "Keyword Score",  val: "94/100",  sub: "+22 pts",  color: "#22C55E" },
        { x: 156, label: "Copy Quality",   val: "91/100",  sub: "+18 pts",  color: "#FF6B2B" },
        { x: 296, label: "CTR Index",      val: "8.4%",    sub: "+3.1%",    color: "#1A6FE8" },
      ].map(({ x, label, val, sub, color }) => (
        <g key={label}>
          <rect x={x} y="56" width="124" height="58" rx="8" fill="#0A1628" />
          <text x={x + 10} y="72" fill="#94A3B8" fontSize="9" fontFamily="system-ui">{label}</text>
          <text x={x + 10} y="90" fill={color} fontSize="15" fontFamily="system-ui" fontWeight="700">{val}</text>
          <text x={x + 10} y="104" fill="#64748B" fontSize="8" fontFamily="system-ui">{sub}</text>
        </g>
      ))}
      <text x="16" y="134" fill="#94A3B8" fontSize="9" fontFamily="system-ui">Keyword Coverage by Section</text>
      {[
        { label: "Title",        pct: 92, color: "#FF6B2B" },
        { label: "Bullets",      pct: 85, color: "#1A6FE8" },
        { label: "Description",  pct: 78, color: "#7C3AED" },
        { label: "Backend",      pct: 97, color: "#22C55E" },
      ].map(({ label, pct, color }, i) => (
        <g key={label}>
          <text x="16" y={158 + i * 28} fill="#94A3B8" fontSize="9" fontFamily="system-ui">{label}</text>
          <rect x="90" y={147 + i * 28} width="280" height="12" rx="6" fill="#0A1628" />
          <rect x="90" y={147 + i * 28} width={280 * pct / 100} height="12" rx="6" fill={color} opacity="0.8" />
          <text x="376" y={158 + i * 28} fill={color} fontSize="9" fontFamily="system-ui" fontWeight="700">{pct}%</text>
        </g>
      ))}
      <text x="16" y="276" fill="#94A3B8" fontSize="9" fontFamily="system-ui">Top Indexed Keywords</text>
      {[
        { kw: "wireless earbuds india",   rank: "#4",  color: "#22C55E" },
        { kw: "bluetooth earphones",      rank: "#7",  color: "#FF6B2B" },
        { kw: "noise cancelling buds",    rank: "#12", color: "#1A6FE8" },
      ].map(({ kw, rank, color }, i) => (
        <g key={kw}>
          <rect x="16" y={284 + i * 0} width="310" height="0" rx="0" />
          <text x="16"  y={294 + i * 10} fill="#CBD5E1" fontSize="8" fontFamily="system-ui">{kw}</text>
          <text x="370" y={294 + i * 10} fill={color} fontSize="8" fontFamily="system-ui" fontWeight="700">{rank}</text>
        </g>
      ))}
    </svg>
  );
}

function KeywordIllustration() {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[400px]" aria-hidden="true">
      <rect width="400" height="280" rx="16" fill="#0D1E3A" />
      <rect x="0" y="0" width="400" height="40" rx="16" fill="#132035" />
      <text x="16" y="25" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">Organic Rank — Before vs After Optimisation</text>
      <polyline
        points="30,220 70,210 110,195 150,180 190,160 230,145 270,128 310,114 350,100"
        stroke="#FF6B2B" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <polygon
        points="30,220 70,210 110,195 150,180 190,160 230,145 270,128 310,114 350,100 350,240 30,240"
        fill="#FF6B2B" opacity="0.07"
      />
      <line x1="30" y1="160" x2="370" y2="160" stroke="#22C55E" strokeWidth="1" strokeDasharray="4 3" />
      <text x="372" y="163" fill="#22C55E" fontSize="8" fontFamily="system-ui">Page 1</text>
      {["#50","#40","#30","#20","#10"].map((l, i) => (
        <text key={l} x="6" y={100 + i * 35} fill="#64748B" fontSize="8" fontFamily="system-ui">{l}</text>
      ))}
      {[
        { x: 30,  val: "#48", color: "#EF4444" },
        { x: 350, val: "#9",  color: "#22C55E" },
      ].map(({ x, val, color }) => (
        <g key={val}>
          <rect x={x - 16} y="84" width="32" height="18" rx="4" fill={color} opacity="0.15" />
          <text x={x} y="97" fill={color} fontSize="10" fontFamily="system-ui" fontWeight="700" textAnchor="middle">{val}</text>
        </g>
      ))}
      {[
        { x: 20,  label: "Pre-Optimisation", val: "Rank #48",  color: "#EF4444" },
        { x: 155, label: "Post-Optimisation", val: "Rank #9",  color: "#22C55E" },
        { x: 288, label: "Improvement",       val: "+39 Spots", color: "#FF6B2B" },
      ].map(({ x, label, val, color }) => (
        <g key={label}>
          <rect x={x} y="248" width="110" height="26" rx="6" fill="#0A1628" />
          <text x={x + 55} y="260" fill="#64748B" fontSize="8" fontFamily="system-ui" textAnchor="middle">{label}</text>
          <text x={x + 55} y="271" fill={color} fontSize="10" fontFamily="system-ui" fontWeight="700" textAnchor="middle">{val}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Lead form ──────────────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white focus:ring-[#FF6B2B]";

function ListingAuditForm() {
  const [form, setForm]       = useState({ name: "", business: "", email: "", phone: "", asin: "", listing_count: "" });
  const [status, setStatus]   = useState<"idle"|"loading"|"ok"|"err">("idle");
  const [token, setToken]     = useState("");
  const recaptchaRef          = useRef<RecaptchaHandle>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) { recaptchaRef.current?.execute(); return; }
    setStatus("loading");
    try {
      await submitLead({ ...form, source: "amazon-listing-form", recaptchaToken: token });
      setStatus("ok");
      track("amazon_listing_form_submit");
    } catch { setStatus("err"); }
  }

  if (status === "ok") return (
    <div className="rounded-2xl p-8 bg-white text-center py-10" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: glowOrange }}>
        <CheckCircle2 size={32} style={{ color: accentColor }} />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628] mb-2">Request Received!</h3>
      <p className="text-[#6B7280]">We'll be in touch within 24 hours with your free listing audit.</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <form onSubmit={submit} className="space-y-4">
        <h3 className="text-xl font-bold text-[#0A1628] mb-1">Request Your Free Listing Audit</h3>
        <p className="text-sm text-[#6B7280] mb-4">Fill in your details and we'll review your listing within 24 hours.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Full Name *</label>
            <input required placeholder="Rahul Sharma" value={form.name} onChange={set("name")} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Business Name *</label>
            <input required placeholder="Your Brand" value={form.business} onChange={set("business")} className={inputClass} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
            <input required type="email" placeholder="you@brand.com" value={form.email} onChange={set("email")} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone Number *</label>
            <input required placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">ASIN or Amazon Store URL</label>
          <input placeholder="B0XXXXXXXXX or amazon.in/dp/..." value={form.asin} onChange={set("asin")} className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Number of Listings to Optimise *</label>
          <select required value={form.listing_count} onChange={set("listing_count")} className={inputClass + " cursor-pointer"}>
            <option value="" disabled>Select range...</option>
            <option value="1-5">1 – 5 listings</option>
            <option value="6-20">6 – 20 listings</option>
            <option value="21-50">21 – 50 listings</option>
            <option value="50+">50+ listings</option>
          </select>
        </div>
        <RecaptchaBox siteKey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} onToken={setToken} />
        {status === "err" && <p className="text-sm text-red-600">Something went wrong — please try again.</p>}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
          {status === "loading" ? "Sending…" : <><span>Get My Free Listing Audit</span> <ArrowRight size={18} /></>}
        </button>
        <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
          <Lock size={12} /> 100% free — no credit card, no obligation
        </p>
      </form>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AmazonListingOptimisationPage() {
  const s = useSettings(["amzn_listing_hero_h1", "amzn_listing_hero_sub", "amzn_listing_cta_btn"]);
  const [activeTab, setActiveTab] = useState<Tab>("Keywords & Research");
  const [openFaq, setOpenFaq]     = useState<string | null>(null);

  const tab = tabMeta[activeTab];
  const visibleCards = serviceCards.filter(c => c.category === activeTab);

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full"
            style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowOrange} 0%, transparent 70%)`, filter: "blur(70px)" }} />
          <div className="absolute rounded-full"
            style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: `radial-gradient(circle, ${glowBlue} 0%, transparent 70%)`, filter: "blur(60px)" }} />
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 pt-20 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/services/amazon-marketing" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>
                ← Back to Amazon Services
              </Link>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                  style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
                  <Search size={12} /> Amazon Listing Optimisation
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
                <span data-cms-key="amzn_listing_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">
                  {s.amzn_listing_hero_h1 || (<>Listings That Rank, Copy<br />That <span style={{ color: accentColor }}>Converts</span></>)}
                </span>
              </h1>
              <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                <span data-cms-key="amzn_listing_hero_sub" data-cms-label="Hero Subtitle" data-cms-attr="text">
                  {s.amzn_listing_hero_sub || "Data-backed keyword research, A9-optimised copy, and complete backend search term coverage — turning your product detail page into an organic ranking and conversion machine."}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 8px 24px rgba(255,107,43,0.4)`, color: "#fff" }}>
                  <span data-cms-key="amzn_listing_cta_btn">{s.amzn_listing_cta_btn || "Get a Free Listing Audit"}</span>
                  <ArrowRight size={15} />
                </Link>
                <a href="#listing-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all">
                  Talk to a Specialist
                </a>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E7EB]">
                {[
                  { val: "1,000+", label: "Listings optimised" },
                  { val: "39",     label: "Avg rank positions gained" },
                  { val: "24hr",   label: "Audit turnaround" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-black" style={{ color: accentColor }}>{val}</p>
                    <p className="text-[#6B7280] text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Right: illustration */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:flex justify-center">
              <ListingDashboardIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem / Why listing matters ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="hidden lg:flex justify-center">
            <KeywordIllustration />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: glowBlue, color: accent2Color, border: `1px solid rgba(26,111,232,0.3)` }}>
              <Search size={12} /> The Visibility Problem
            </div>
            <h2 className="text-3xl font-black text-[#0A1628] mb-5 leading-tight">
              A Poor Listing Costs You Sales Every Day
            </h2>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              Most Amazon sellers lose significant organic traffic to competitors not because their product is worse — but because their listing is invisible. Generic titles, weak bullet points, and unfilled backend fields leave your products buried on page 3, while nearly identical items rank on page 1.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Generic titles that miss the keywords real shoppers are searching",
                "Backend search terms left empty or filled with irrelevant terms",
                "Bullet points that describe features, not the benefits buyers care about",
                "No A+ Content — missing the trust and conversion lift it provides",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#4B5563]">
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent2Color }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#6B7280] leading-relaxed">
              We fix this with deep keyword research, persuasive conversion copy, and complete backend indexing — turning an invisible listing into a page-one ranking that sells.
            </p>
          </div>
        </div>
      </section>

      {/* ── Service tabs ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
              <Search size={12} /> Our Services
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Our Complete Listing Optimisation Services</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed">From keyword research and conversion copy through backend indexing and A+ Content — everything your listing needs to rank and convert.</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={activeTab === t
                  ? { background: tabMeta[t].gradient, color: "#fff", boxShadow: `0 4px 14px ${tabMeta[t].color}40` }
                  : { background: "#F8FAFF", color: "#374151", border: "1.5px solid #E5E7EB" }}>
                {t}
              </button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleCards.map((card, i) => (
                <motion.div key={card.title}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="rounded-2xl p-6 border"
                  style={{ background: "#fff", borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = tab.color + "40"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px ${tab.color}12`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tab.bg }}>
                      <card.Icon size={20} style={{ color: tab.color }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}>{card.category}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0A1628] mb-2">{card.title}</h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">{card.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
              <Star size={12} /> Why Choose Us
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Why Choose Digital Aura for Listing Optimisation?</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px]">We treat every listing as both an SEO asset and a sales page — not just a content form to fill in.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ Icon, color, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 border bg-white" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="text-[#0A1628] font-semibold mb-2">{title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowBlue, color: accent2Color, border: `1px solid rgba(26,111,232,0.3)` }}>
              <Layers size={12} /> Our Process
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">How We Optimise Your Listings</h2>
            <p className="text-[#6B7280] text-[15px]">A structured process from first audit to ongoing rank improvement.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-[2.35rem] top-6 bottom-6 w-px"
              style={{ background: `linear-gradient(180deg,${accentColor},${accent2Color},${purpleColor})` }} />
            <div className="space-y-8">
              {steps.map(({ n, title, desc }, i) => {
                const colors = [accentColor, accent2Color, purpleColor, accent2Color, accentColor];
                const c = colors[i % colors.length];
                return (
                  <motion.div key={n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 font-black text-sm relative z-10 bg-white"
                      style={{ borderColor: c, color: c }}>
                      {n}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-[#0A1628] font-bold mb-1">{title}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-14" style={{ background: "#F8FAFF", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "1,000+", label: "Listings optimised",        color: accentColor },
            { val: "39",     label: "Avg rank positions gained", color: accent2Color },
            { val: "20%",    label: "Avg conversion lift",       color: purpleColor },
            { val: "48hr",   label: "Audit turnaround",          color: accentColor },
          ].map(({ val, label, color }) => (
            <div key={label}>
              <p className="text-3xl font-black mb-1" style={{ color }}>{val}</p>
              <p className="text-[#6B7280] text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
              <FileText size={12} /> FAQs
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-0">
            {faqs.map(({ key, q, a }) => {
              const open = openFaq === key;
              return (
                <div key={key} className="border-b border-[#E5E7EB] py-6 first:pt-0 last:border-b-0">
                  <button className="w-full flex items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(open ? null : key)}>
                    <span className="text-[17px] font-bold text-[#0A1628]" data-cms-key={key}>{q}</span>
                    {open
                      ? <MinusCircle size={16} style={{ color: accentColor }} className="shrink-0" />
                      : <PlusCircle size={16} className="shrink-0 text-[#9CA3AF]" />}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <p className="mt-3 text-[15.5px] leading-relaxed text-[#4B5563]">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lead form ── */}
      <section id="listing-form" className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
              <Search size={12} /> Free Audit
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Get Your Free Amazon Listing Audit</h2>
            <p className="text-[#6B7280] text-[15px]">We'll review your current listing and show you exactly where you're leaving rankings and conversions on the table — no obligation.</p>
          </div>
          <ListingAuditForm />
        </div>
      </section>

      <StickyCtaBar
        headline="Your listings are leaving sales on the table."
        sub="Get a free listing audit and see exactly what's holding you back."
        cta="Get Free Audit"
        href="/contact"
        accent={accentColor}
      />
    </PageLayout>
  );
}
