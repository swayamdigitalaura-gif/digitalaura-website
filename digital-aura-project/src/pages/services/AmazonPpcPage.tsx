/**
 * SERVICE PAGE — Amazon PPC Management
 * Route: /services/amazon-ppc
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  Target, Search, TrendingUp, BarChart3, Shield,
  Zap, RefreshCw, FileText, Check, ArrowRight,
  CheckCircle2, Users, AlertTriangle, Star, Layers,
  PlusCircle, MinusCircle, DollarSign, Eye, Filter, Lock,
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
  // ── Campaign Setup ──
  {
    Icon: PlusCircle,
    category: "Campaign Setup",
    color: accentColor,
    bg: glowOrange,
    title: "New Campaign Creation",
    desc: "Full campaign builds tailored to your products, KPIs, and target audience — Sponsored Products, Sponsored Brands, and Sponsored Display campaigns structured for performance from day one.",
    tags: ["Sponsored Products", "Sponsored Brands", "Sponsored Display"],
  },
  {
    Icon: Search,
    category: "Campaign Setup",
    color: accentColor,
    bg: glowOrange,
    title: "Keyword Research & Match Types",
    desc: "Deep keyword discovery using Amazon's auto-suggest, competitor reverse ASIN lookups, and long-tail targeting. We assign Broad, Phrase, and Exact match types to maximise reach while protecting spend.",
    tags: ["Long-Tail Keywords", "Match Types", "ASIN Targeting"],
  },
  {
    Icon: Target,
    category: "Campaign Setup",
    color: accentColor,
    bg: glowOrange,
    title: "Product-Specific Campaigns",
    desc: "Dedicated campaigns for best sellers, new launches, and underperforming ASINs — each with its own budget, bid strategy, and targeting logic to maximise individual product ROI.",
    tags: ["Best Sellers", "New Launches", "ASIN Isolation"],
  },
  // ── Optimisation & Management ──
  {
    Icon: DollarSign,
    category: "Optimisation",
    color: accent2Color,
    bg: glowBlue,
    title: "Keyword Bid Optimisation",
    desc: "Continuous bid adjustments at keyword and ad-group level based on conversion data, ACoS targets, and dayparting insights to reduce wasted spend and improve return on ad spend.",
    tags: ["Bid Management", "ACoS Control", "Dayparting"],
  },
  {
    Icon: RefreshCw,
    category: "Optimisation",
    color: accent2Color,
    bg: glowBlue,
    title: "Campaign Restructuring",
    desc: "Underperforming campaigns are diagnosed, restructured, and relaunched — removing non-converting keywords, correcting match-type bleed, and tightening targeting to recover lost ROI.",
    tags: ["Campaign Audit", "Restructure", "ROI Recovery"],
  },
  {
    Icon: Filter,
    category: "Optimisation",
    color: accent2Color,
    bg: glowBlue,
    title: "Negative Keyword Management",
    desc: "Systematic negative keyword harvesting from search term reports to block irrelevant traffic, reduce wasted clicks, and ensure your budget reaches only high-intent shoppers.",
    tags: ["Negative Keywords", "Search Term Reports", "Waste Reduction"],
  },
  // ── Reporting & Growth ──
  {
    Icon: BarChart3,
    category: "Reporting & Growth",
    color: purpleColor,
    bg: glowPurple,
    title: "Performance Reporting",
    desc: "Weekly search-term reviews and monthly PPC performance reports covering impressions, clicks, spend, ACoS, TACoS, and revenue — with clear action points for the next period.",
    tags: ["Weekly Reports", "ACoS / TACoS", "Action Plans"],
  },
  {
    Icon: Eye,
    category: "Reporting & Growth",
    color: purpleColor,
    bg: glowPurple,
    title: "Competitor & Market Analysis",
    desc: "Ongoing analysis of competitor ad strategies, share of voice, and pricing to identify gaps and opportunities that keep your campaigns one step ahead in the auction.",
    tags: ["Competitor Intel", "Share of Voice", "Market Gaps"],
  },
];

const tabs = ["Campaign Setup", "Optimisation", "Reporting & Growth"] as const;
type Tab = typeof tabs[number];

const tabMeta: Record<Tab, { color: string; gradient: string; bg: string; desc: string }> = {
  "Campaign Setup":       { color: accentColor,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)`,   bg: glowOrange,  desc: "Build campaigns that launch strong" },
  "Optimisation":         { color: accent2Color, gradient: `linear-gradient(135deg,${accent2Color},#1558c0)`, bg: glowBlue,    desc: "Cut waste and improve every metric" },
  "Reporting & Growth":   { color: purpleColor,  gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",         bg: glowPurple,  desc: "Data-driven insights to scale confidently" },
};

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { Icon: BarChart3,  color: accentColor,  title: "Data-Driven Strategies",    desc: "Every bid change and campaign decision is backed by real conversion data — no guesswork, no assumptions." },
  { Icon: Zap,        color: accent2Color, title: "Technology + Expertise",     desc: "We combine deep Amazon PPC know-how with industry-leading tools so your campaigns stay ahead of the algorithm." },
  { Icon: TrendingUp, color: purpleColor,  title: "Relentless ROI Focus",       desc: "From strategy and campaign build through daily optimisation and reporting, every action targets a higher ROAS and lower ACoS." },
  { Icon: Search,     color: accentColor,  title: "Amazon Auto-Suggest Edge",   desc: "We leverage Amazon's search auto-suggest for keyword growth — capturing the terms real shoppers type, before competitors catch on." },
  { Icon: Users,      color: accent2Color, title: "Dedicated Account Manager",  desc: "One point of contact who knows your products, your targets, and your account history — no ticket queues." },
  { Icon: Shield,     color: purpleColor,  title: "Transparent Reporting",      desc: "Clear, jargon-free reports every week so you always know exactly where your budget went and what it returned." },
];

// ── Process steps ──────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "PPC Audit",           desc: "Full audit of existing campaigns, targeting, bids, and spend history to identify waste and opportunity." },
  { n: "02", title: "Strategy & Structure", desc: "Build a campaign architecture aligned to your product catalogue, budget, and ACoS / TACoS targets." },
  { n: "03", title: "Launch & Warm-Up",     desc: "Campaigns go live with controlled spend, early data collection, and rapid bid adjustments in the first two weeks." },
  { n: "04", title: "Continuous Optimise",  desc: "Weekly search-term harvesting, bid refinement, negative keyword expansion, and new targeting tests." },
  { n: "05", title: "Review & Scale",       desc: "Monthly performance reviews with actionable insights and a scaling plan for top-performing campaigns." },
];

// ── FAQs ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    key: "amzn_ppc_faq_1",
    q: "What is Amazon PPC and how does it work?",
    a: "Amazon PPC (Pay-Per-Click) lets sellers pay for ad placements in search results and product pages. You only pay when a shopper clicks your ad, and the placement is determined by keyword bids, relevance, and product listing quality. We manage all of this end-to-end.",
  },
  {
    key: "amzn_ppc_faq_2",
    q: "What is ACoS and what's a good target?",
    a: "ACoS (Advertising Cost of Sale) is your ad spend divided by ad revenue, expressed as a percentage. A healthy ACoS varies by product margin and launch stage — typically 15–30% for established products. We set ACoS targets based on your margins and goals, not generic benchmarks.",
  },
  {
    key: "amzn_ppc_faq_3",
    q: "How long before I see results from Amazon PPC?",
    a: "Most clients see measurable improvement in ACoS within 4–6 weeks of a proper restructure. Launch campaigns can generate their first sales within days. Full optimisation and meaningful ROAS improvement typically take 60–90 days as we accumulate enough data.",
  },
  {
    key: "amzn_ppc_faq_4",
    q: "Do you manage Sponsored Products, Brands, and Display?",
    a: "Yes — we manage all three Amazon ad types. Sponsored Products are the backbone of most strategies; Sponsored Brands drive awareness and traffic to your Store; Sponsored Display is used for retargeting and competitor conquesting. We allocate budget across all three based on your goals.",
  },
  {
    key: "amzn_ppc_faq_5",
    q: "What do you need from us to get started?",
    a: "We need Seller Central access (at a minimum, read and advertising permissions), your product catalogue details, any current campaign history you have, and your monthly ad budget and ACoS targets. We guide you through the access setup.",
  },
  {
    key: "amzn_ppc_faq_6",
    q: "Will PPC help my organic ranking too?",
    a: "Yes. Paid sales velocity is a signal Amazon's A10 algorithm uses when ranking products organically. Well-run PPC campaigns that generate conversions on targeted keywords can directly lift your organic position over time — this is the TACoS game.",
  },
  {
    key: "amzn_ppc_faq_7",
    q: "How is your Amazon PPC management priced?",
    a: "We offer monthly management packages based on ad spend and catalogue size. We share full pricing on a discovery call once we understand your account scale — no hidden setup fees.",
  },
];

// ── Illustrations ──────────────────────────────────────────────────────────────
function PpcDashboardIllustration() {
  return (
    <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[420px]" aria-hidden="true">
      <rect width="420" height="320" rx="16" fill="#0D1E3A" />
      <rect x="0" y="0" width="420" height="44" rx="16" fill="#132035" />
      <rect x="16" y="14" width="10" height="10" rx="5" fill="#FF6B2B" opacity="0.9" />
      <text x="34" y="23" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">Amazon PPC Dashboard</text>
      <text x="330" y="23" fill="#FF6B2B" fontSize="10" fontFamily="system-ui">Live</text>
      <circle cx="324" cy="20" r="4" fill="#FF6B2B" opacity="0.5" />
      {[
        { x: 16,  label: "Spend",   val: "₹24,850",   sub: "this month",   color: "#FF6B2B" },
        { x: 156, label: "Revenue", val: "₹1,12,400", sub: "ad-driven",    color: "#22C55E" },
        { x: 296, label: "ACoS",    val: "22.1%",     sub: "target <25%",  color: "#1A6FE8" },
      ].map(({ x, label, val, sub, color }) => (
        <g key={label}>
          <rect x={x} y="56" width="124" height="58" rx="8" fill="#0A1628" />
          <text x={x + 10} y="72" fill="#94A3B8" fontSize="9" fontFamily="system-ui">{label}</text>
          <text x={x + 10} y="90" fill={color} fontSize="15" fontFamily="system-ui" fontWeight="700">{val}</text>
          <text x={x + 10} y="104" fill="#64748B" fontSize="8" fontFamily="system-ui">{sub}</text>
        </g>
      ))}
      <text x="16" y="134" fill="#94A3B8" fontSize="9" fontFamily="system-ui">Daily Spend vs Revenue (₹)</text>
      {[
        { x: 16,  spend: 55, rev: 90,  day: "Mon" },
        { x: 70,  spend: 48, rev: 78,  day: "Tue" },
        { x: 124, spend: 62, rev: 102, day: "Wed" },
        { x: 178, spend: 50, rev: 85,  day: "Thu" },
        { x: 232, spend: 70, rev: 115, day: "Fri" },
        { x: 286, spend: 44, rev: 72,  day: "Sat" },
        { x: 340, spend: 58, rev: 96,  day: "Sun" },
      ].map(({ x, spend, rev, day }) => (
        <g key={day}>
          <rect x={x + 8}  y={240 - spend} width="18" height={spend} rx="3" fill="#FF6B2B" opacity="0.7" />
          <rect x={x + 30} y={240 - rev}   width="18" height={rev}   rx="3" fill="#1A6FE8" opacity="0.7" />
          <text x={x + 24} y="252" fill="#64748B" fontSize="8" fontFamily="system-ui" textAnchor="middle">{day}</text>
        </g>
      ))}
      <rect x="16"  y="262" width="8" height="8" rx="2" fill="#FF6B2B" opacity="0.7" />
      <text x="28"  y="270" fill="#94A3B8" fontSize="8" fontFamily="system-ui">Spend</text>
      <rect x="80"  y="262" width="8" height="8" rx="2" fill="#1A6FE8" opacity="0.7" />
      <text x="92"  y="270" fill="#94A3B8" fontSize="8" fontFamily="system-ui">Revenue</text>
      <text x="16" y="288" fill="#94A3B8" fontSize="9" fontFamily="system-ui">Top Keywords</text>
      {[
        { kw: "wireless earbuds india",  acos: "18%", conv: "9.2%", color: "#22C55E" },
        { kw: "bluetooth earphones",     acos: "26%", conv: "6.1%", color: "#FF6B2B" },
        { kw: "noise cancelling buds",   acos: "31%", conv: "4.8%", color: "#EF4444" },
      ].map(({ kw, acos, conv, color }, i) => (
        <g key={kw}>
          <text x="16"  y={305 + i * 0} fill="#CBD5E1" fontSize="8" fontFamily="system-ui">{kw}</text>
          <text x="300" y={305 + i * 0} fill={color} fontSize="8" fontFamily="system-ui">ACoS {acos}</text>
          <text x="370" y={305 + i * 0} fill="#94A3B8" fontSize="8" fontFamily="system-ui">{conv}</text>
        </g>
      ))}
    </svg>
  );
}

function AcosIllustration() {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[400px]" aria-hidden="true">
      <rect width="400" height="280" rx="16" fill="#0D1E3A" />
      <rect x="0" y="0" width="400" height="40" rx="16" fill="#132035" />
      <text x="16" y="25" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">ACoS Trend — Last 90 Days</text>
      <polyline
        points="30,220 70,200 110,195 150,185 190,175 230,160 270,152 310,145 350,138"
        stroke="#FF6B2B" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <polygon
        points="30,220 70,200 110,195 150,185 190,175 230,160 270,152 310,145 350,138 350,240 30,240"
        fill="#FF6B2B" opacity="0.07"
      />
      <line x1="30" y1="170" x2="370" y2="170" stroke="#22C55E" strokeWidth="1" strokeDasharray="4 3" />
      <text x="372" y="173" fill="#22C55E" fontSize="8" fontFamily="system-ui">Target 25%</text>
      {["40%","30%","20%","10%"].map((l, i) => (
        <text key={l} x="6" y={120 + i * 40} fill="#64748B" fontSize="8" fontFamily="system-ui">{l}</text>
      ))}
      {[
        { x: 30,  val: "38%", color: "#EF4444" },
        { x: 350, val: "22%", color: "#22C55E" },
      ].map(({ x, val, color }) => (
        <g key={val}>
          <rect x={x - 16} y="96" width="32" height="18" rx="4" fill={color} opacity="0.15" />
          <text x={x} y="109" fill={color} fontSize="10" fontFamily="system-ui" fontWeight="700" textAnchor="middle">{val}</text>
        </g>
      ))}
      {[
        { x: 20,  label: "Starting ACoS", val: "38%",   color: "#EF4444" },
        { x: 160, label: "Current ACoS",  val: "22.1%", color: "#FF6B2B" },
        { x: 290, label: "Improvement",   val: "−42%",  color: "#22C55E" },
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

function PpcAuditForm() {
  const [form, setForm]       = useState({ name: "", business: "", email: "", phone: "", store_url: "", monthly_budget: "" });
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
      await submitLead({ ...form, source: "amazon-ppc-form", recaptchaToken: token });
      setStatus("ok");
      track("amazon_ppc_form_submit");
    } catch { setStatus("err"); }
  }

  if (status === "ok") return (
    <div className="rounded-2xl p-8 bg-white text-center py-10" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: glowOrange }}>
        <CheckCircle2 size={32} style={{ color: accentColor }} />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628] mb-2">Request Received!</h3>
      <p className="text-[#6B7280]">We'll be in touch within 24 hours with your free PPC audit.</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <form onSubmit={submit} className="space-y-4">
        <h3 className="text-xl font-bold text-[#0A1628] mb-1">Request Your Free PPC Audit</h3>
        <p className="text-sm text-[#6B7280] mb-4">Fill in your details and we'll get started within 24 hours.</p>
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
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Amazon Store URL</label>
          <input placeholder="https://amazon.in/your-store or B0XXXXX" value={form.store_url} onChange={set("store_url")} className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Monthly Ad Budget (approx.) *</label>
          <select required value={form.monthly_budget} onChange={set("monthly_budget")} className={inputClass + " cursor-pointer"}>
            <option value="" disabled>Select your budget...</option>
            <option value="under-10k">Under ₹10,000</option>
            <option value="10k-50k">₹10,000 – ₹50,000</option>
            <option value="50k-2l">₹50,000 – ₹2,00,000</option>
            <option value="above-2l">Above ₹2,00,000</option>
          </select>
        </div>
        <RecaptchaBox siteKey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} onToken={setToken} />
        {status === "err" && <p className="text-sm text-red-600">Something went wrong — please try again.</p>}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
          {status === "loading" ? "Sending…" : <><span>Get My Free PPC Audit</span> <ArrowRight size={18} /></>}
        </button>
        <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
          <Lock size={12} /> 100% free — no credit card, no obligation
        </p>
      </form>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AmazonPpcPage() {
  const s = useSettings(["amzn_ppc_hero_h1", "amzn_ppc_hero_sub", "amzn_ppc_cta_btn"]);
  const [activeTab, setActiveTab] = useState<Tab>("Campaign Setup");
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
              <Link to="/services/amazon-marketing/" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>
                ← Back to Amazon Services
              </Link>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                  style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
                  <Target size={12} /> Amazon PPC Management
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
                <span data-cms-key="amzn_ppc_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">
                  {s.amzn_ppc_hero_h1 || (<>Amazon PPC That Cuts Wasted Spend &<br />
                  <span style={{ color: accentColor }}>Scales Your Sales</span></>)}
                </span>
              </h1>
              <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                <span data-cms-key="amzn_ppc_hero_sub" data-cms-label="Hero Subtitle" data-cms-attr="text">
                  {s.amzn_ppc_hero_sub || "Data-driven Sponsored Ads management — Sponsored Products, Brands, and Display — built to lower your ACoS, improve ROAS, and grow organic rank at the same time."}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact/" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 8px 24px rgba(255,107,43,0.4)`, color: "#fff" }}>
                  <span data-cms-key="amzn_ppc_cta_btn">{s.amzn_ppc_cta_btn || "Get a Free PPC Audit"}</span>
                  <ArrowRight size={15} />
                </Link>
                <a href="#ppc-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all">
                  Talk to a Specialist
                </a>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E7EB]">
                {[
                  { val: "42%",  label: "Avg ACoS reduction" },
                  { val: "3.8×", label: "Average ROAS" },
                  { val: "80+",  label: "Brands managed" },
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
              <PpcDashboardIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem / Why PPC matters ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="hidden lg:flex justify-center">
            <AcosIllustration />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: glowBlue, color: accent2Color, border: `1px solid rgba(26,111,232,0.3)` }}>
              <AlertTriangle size={12} /> The ACoS Problem
            </div>
            <h2 className="text-3xl font-black text-[#0A1628] mb-5 leading-tight">
              High ACoS Is Silently Eating Your Profit
            </h2>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              Most Amazon sellers running their own PPC spend 30–50% of ad revenue on wasted clicks — broad keywords with no buyer intent, missing negative keywords, and campaigns that never get properly reviewed. The result is high spend, mediocre sales, and no idea which levers to pull.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Unchecked broad-match keywords draining budget on irrelevant searches",
                "No negative keyword strategy — paying for traffic that never converts",
                "Campaigns set once and never properly optimised",
                "No visibility into which keywords are driving organic lift",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#4B5563]">
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent2Color }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#6B7280] leading-relaxed">
              We fix this with structured campaigns, weekly search-term reviews, and aggressive negative-keyword management — turning wasted spend into profitable sales velocity.
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
              <Target size={12} /> Amazon PPC Services
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Our Complete PPC Management Services</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed">End-to-end Amazon advertising — from initial campaign builds through daily optimisation and monthly strategy reviews.</p>
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
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Why Choose Digital Aura for Amazon PPC?</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px]">We manage PPC as a growth engine — not just a cost centre.</p>
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
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">How We Manage Your PPC</h2>
            <p className="text-[#6B7280] text-[15px]">A structured process from first audit to ongoing scale.</p>
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
            { val: "42%",  label: "Avg ACoS reduction",   color: accentColor },
            { val: "3.8×", label: "Average ROAS",          color: accent2Color },
            { val: "80+",  label: "Amazon brands managed", color: purpleColor },
            { val: "48hr", label: "Campaign live time",    color: accentColor },
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
      <section id="ppc-form" className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
              <Target size={12} /> Free Audit
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Get Your Free Amazon PPC Audit</h2>
            <p className="text-[#6B7280] text-[15px]">We'll review your current campaigns and show you exactly where your budget is leaking — no obligation.</p>
          </div>
          <PpcAuditForm />
        </div>
      </section>

      <StickyCtaBar
        headline="Stop overspending on Amazon ads."
        sub="Get a free PPC audit and see where your budget is going."
        cta="Get Free Audit"
        href="/contact/"
        accent={accentColor}
      />
    </PageLayout>
  );
}
