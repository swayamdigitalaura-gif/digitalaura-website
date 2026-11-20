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
  PlusCircle, MinusCircle, DollarSign, Eye, Filter,
} from "lucide-react";
import { useState, useRef } from "react";
import { RecaptchaBox, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from "@/components/RecaptchaBox";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";

const accentColor  = "#FF9900";
const accent2Color = "#1A6FE8";
const purpleColor  = "#7C3AED";
const glowAmber    = "rgba(255,153,0,0.10)";
const glowBlue     = "rgba(26,111,232,0.08)";
const glowPurple   = "rgba(124,58,237,0.08)";

// ── Service card data by tab ───────────────────────────────────────────────────
const serviceCards = [
  // ── Campaign Setup ──
  {
    Icon: PlusCircle,
    category: "Campaign Setup",
    color: accentColor,
    bg: glowAmber,
    title: "New Campaign Creation",
    desc: "Full campaign builds tailored to your products, KPIs, and target audience — Sponsored Products, Sponsored Brands, and Sponsored Display campaigns structured for performance from day one.",
    tags: ["Sponsored Products", "Sponsored Brands", "Sponsored Display"],
  },
  {
    Icon: Search,
    category: "Campaign Setup",
    color: accentColor,
    bg: glowAmber,
    title: "Keyword Research & Match Types",
    desc: "Deep keyword discovery using Amazon's auto-suggest, competitor reverse ASIN lookups, and long-tail targeting. We assign Broad, Phrase, and Exact match types to maximise reach while protecting spend.",
    tags: ["Long-Tail Keywords", "Match Types", "ASIN Targeting"],
  },
  {
    Icon: Target,
    category: "Campaign Setup",
    color: accentColor,
    bg: glowAmber,
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

const tabMeta: Record<Tab, { color: string; desc: string }> = {
  "Campaign Setup":       { color: accentColor,  desc: "Build campaigns that launch strong" },
  "Optimisation":         { color: accent2Color, desc: "Cut waste and improve every metric" },
  "Reporting & Growth":   { color: purpleColor,  desc: "Data-driven insights to scale confidently" },
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
    a: "Initial data appears within days of launch. Meaningful optimisation decisions are made after two to four weeks of data collection. Sustainable ACoS improvement typically takes six to eight weeks — we set realistic expectations from the first call.",
  },
  {
    key: "amzn_ppc_faq_4",
    q: "Do you manage Sponsored Products, Sponsored Brands, and Sponsored Display?",
    a: "Yes — we manage all three Amazon ad types as well as Sponsored Brand Video. Each format serves a different purpose in the funnel, and we build strategies that use all formats together where your budget allows.",
  },
  {
    key: "amzn_ppc_faq_5",
    q: "What information do you need to get started?",
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
      {/* Card background */}
      <rect width="420" height="320" rx="16" fill="#0D1E3A" />
      {/* Header bar */}
      <rect x="0" y="0" width="420" height="44" rx="16" fill="#132035" />
      <rect x="16" y="14" width="10" height="10" rx="5" fill="#FF9900" opacity="0.9" />
      <text x="34" y="23" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">Amazon PPC Dashboard</text>
      <text x="330" y="23" fill="#FF9900" fontSize="10" fontFamily="system-ui">Live</text>
      <circle cx="324" cy="20" r="4" fill="#FF9900" opacity="0.5" />
      {/* KPI row */}
      {[
        { x: 16,  label: "Spend",   val: "₹24,850", sub: "this month",   color: "#FF9900" },
        { x: 156, label: "Revenue", val: "₹1,12,400", sub: "ad-driven",  color: "#22C55E" },
        { x: 296, label: "ACoS",    val: "22.1%",    sub: "target <25%", color: "#1A6FE8" },
      ].map(({ x, label, val, sub, color }) => (
        <g key={label}>
          <rect x={x} y="56" width="124" height="58" rx="8" fill="#0A1628" />
          <text x={x + 10} y="72" fill="#94A3B8" fontSize="9" fontFamily="system-ui">{label}</text>
          <text x={x + 10} y="90" fill={color} fontSize="15" fontFamily="system-ui" fontWeight="700">{val}</text>
          <text x={x + 10} y="104" fill="#64748B" fontSize="8" fontFamily="system-ui">{sub}</text>
        </g>
      ))}
      {/* Spend bar chart */}
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
          <rect x={x + 8}  y={240 - spend} width="18" height={spend} rx="3" fill="#FF9900" opacity="0.7" />
          <rect x={x + 30} y={240 - rev}   width="18" height={rev}   rx="3" fill="#1A6FE8" opacity="0.7" />
          <text x={x + 24} y="252" fill="#64748B" fontSize="8" fontFamily="system-ui" textAnchor="middle">{day}</text>
        </g>
      ))}
      {/* Legend */}
      <rect x="16"  y="262" width="8" height="8" rx="2" fill="#FF9900" opacity="0.7" />
      <text x="28"  y="270" fill="#94A3B8" fontSize="8" fontFamily="system-ui">Spend</text>
      <rect x="80"  y="262" width="8" height="8" rx="2" fill="#1A6FE8" opacity="0.7" />
      <text x="92"  y="270" fill="#94A3B8" fontSize="8" fontFamily="system-ui">Revenue</text>
      {/* Top keywords table */}
      <text x="16" y="288" fill="#94A3B8" fontSize="9" fontFamily="system-ui">Top Keywords</text>
      {[
        { kw: "wireless earbuds india",  acos: "18%", conv: "9.2%", color: "#22C55E" },
        { kw: "bluetooth earphones",     acos: "26%", conv: "6.1%", color: "#FF9900" },
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
      {/* ACoS line chart */}
      <polyline
        points="30,220 70,200 110,195 150,185 190,175 230,160 270,152 310,145 350,138"
        stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <polygon
        points="30,220 70,200 110,195 150,185 190,175 230,160 270,152 310,145 350,138 350,240 30,240"
        fill="#FF9900" opacity="0.07"
      />
      {/* Target line */}
      <line x1="30" y1="170" x2="370" y2="170" stroke="#22C55E" strokeWidth="1" strokeDasharray="4 3" />
      <text x="372" y="173" fill="#22C55E" fontSize="8" fontFamily="system-ui">Target 25%</text>
      {/* Y axis labels */}
      {["40%","30%","20%","10%"].map((l, i) => (
        <text key={l} x="6" y={120 + i * 40} fill="#64748B" fontSize="8" fontFamily="system-ui">{l}</text>
      ))}
      {/* Stat badges */}
      {[
        { x: 30,  val: "38%", color: "#EF4444" },
        { x: 350, val: "22%", color: "#22C55E" },
      ].map(({ x, val, color }) => (
        <g key={val}>
          <rect x={x - 16} y="96" width="32" height="18" rx="4" fill={color} opacity="0.15" />
          <text x={x} y="109" fill={color} fontSize="10" fontFamily="system-ui" fontWeight="700" textAnchor="middle">{val}</text>
        </g>
      ))}
      {/* Summary row */}
      {[
        { x: 20,  label: "Starting ACoS", val: "38%",   color: "#EF4444" },
        { x: 160, label: "Current ACoS",  val: "22.1%", color: "#FF9900" },
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

  const inputCls = "w-full bg-[#0A1628] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF9900]/60 transition-colors";

  if (status === "ok") return (
    <div className="text-center py-10">
      <CheckCircle2 className="mx-auto mb-3 text-[#FF9900]" size={40} />
      <p className="text-white font-semibold text-lg">Request received!</p>
      <p className="text-white/60 text-sm mt-1">We'll be in touch within 24 hours with your free PPC audit.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input required placeholder="Your Name" value={form.name} onChange={set("name")} className={inputCls} />
        <input required placeholder="Business Name" value={form.business} onChange={set("business")} className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input required type="email" placeholder="Email Address" value={form.email} onChange={set("email")} className={inputCls} />
        <input required placeholder="Phone Number" value={form.phone} onChange={set("phone")} className={inputCls} />
      </div>
      <input placeholder="Amazon Store URL (optional)" value={form.store_url} onChange={set("store_url")} className={inputCls} />
      <select value={form.monthly_budget} onChange={set("monthly_budget")} className={inputCls}>
        <option value="">Monthly Ad Budget (approx.)</option>
        <option value="under-10k">Under ₹10,000</option>
        <option value="10k-50k">₹10,000 – ₹50,000</option>
        <option value="50k-2l">₹50,000 – ₹2,00,000</option>
        <option value="above-2l">Above ₹2,00,000</option>
      </select>
      <RecaptchaBox siteKey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} onToken={setToken} />
      <button type="submit" disabled={status === "loading"}
        className="w-full py-3 rounded-lg font-semibold text-sm transition-all"
        style={{ background: status === "loading" ? "#666" : accentColor, color: "#000" }}>
        {status === "loading" ? "Sending…" : "Get My Free PPC Audit →"}
      </button>
      {status === "err" && <p className="text-red-400 text-xs text-center">Something went wrong — please try again.</p>}
    </form>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AmazonPpcPage() {
  const s = useSettings(["amzn_ppc_hero_h1", "amzn_ppc_hero_sub", "amzn_ppc_cta_btn"]);
  const [activeTab, setActiveTab] = useState<Tab>("Campaign Setup");
  const [openFaq, setOpenFaq]     = useState<string | null>(null);

  const visibleCards = serviceCards.filter(c => c.category === activeTab);

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-20" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0D1E38 60%, #101828 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full pointer-events-none opacity-20"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)`, filter: "blur(70px)" }} />

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <Link to="/services/amazon-marketing" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors mb-6">
              ← Back to Amazon Services
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
              style={{ background: "rgba(255,153,0,0.12)", color: accentColor, border: `1px solid ${accentColor}30` }}>
              <Target size={12} /> Amazon PPC Management
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              <span data-cms-key="amzn_ppc_hero_h1">
                {s.amzn_ppc_hero_h1 || "Amazon PPC That Cuts Wasted Spend & Scales Your Sales"}
              </span>
            </h1>
            <p className="text-white/65 text-lg mb-8 leading-relaxed">
              <span data-cms-key="amzn_ppc_hero_sub">
                {s.amzn_ppc_hero_sub || "Data-driven Sponsored Ads management — Sponsored Products, Brands, and Display — built to lower your ACoS, improve ROAS, and grow organic rank at the same time."}
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: accentColor, color: "#000" }}>
                <span data-cms-key="amzn_ppc_cta_btn">{s.amzn_ppc_cta_btn || "Get a Free PPC Audit"}</span>
                <ArrowRight size={15} />
              </Link>
              <a href="#ppc-form" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white hover:border-white/40 transition-colors">
                Talk to a Specialist
              </a>
            </div>
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
              {[
                { val: "42%",  label: "Avg ACoS reduction" },
                { val: "3.8×", label: "Average ROAS" },
                { val: "80+",  label: "Brands managed" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black" style={{ color: accentColor }}>{val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <PpcDashboardIllustration />
          </div>
        </div>
      </section>

      {/* ── Problem / Why PPC matters ── */}
      <section className="py-20" style={{ background: "#080F1E" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="hidden lg:flex justify-center">
            <AcosIllustration />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5"
              style={{ background: "rgba(26,111,232,0.12)", color: accent2Color, border: `1px solid ${accent2Color}30` }}>
              <AlertTriangle size={12} /> The ACoS Problem
            </div>
            <h2 className="text-3xl font-black text-white mb-5 leading-tight">
              High ACoS Is Silently Eating Your Profit
            </h2>
            <p className="text-white/60 mb-6 leading-relaxed">
              Most Amazon sellers running their own PPC spend 30–50% of ad revenue on wasted clicks — broad keywords with no buyer intent, missing negative keywords, and campaigns that never get properly reviewed. The result is high spend, mediocre sales, and no idea which levers to pull.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Unchecked broad-match keywords draining budget on irrelevant searches",
                "No negative keyword strategy — paying for traffic that never converts",
                "Campaigns set once and never properly optimised",
                "No visibility into which keywords are driving organic lift",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent2Color }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white/60 leading-relaxed">
              We fix this with structured campaigns, weekly search-term reviews, and aggressive negative-keyword management — turning wasted spend into profitable sales velocity.
            </p>
          </div>
        </div>
      </section>

      {/* ── Service tabs ── */}
      <section className="py-20" style={{ background: "#0A1628" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-3">Our Complete PPC Management Services</h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm">End-to-end Amazon advertising — from initial campaign builds through daily optimisation and monthly strategy reviews.</p>
          </div>

          {/* Tab switcher */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tabs.map(tab => {
              const active = tab === activeTab;
              const { color } = tabMeta[tab];
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={active
                    ? { background: color, color: tab === "Campaign Setup" ? "#000" : "#fff" }
                    : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {tab}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleCards.map(({ Icon, color, bg, title, desc, tags }) => (
                <div key={title} className="rounded-2xl p-6 border border-white/8 transition-transform hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                        style={{ background: `${color}18`, color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-20" style={{ background: "#080F1E" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Why Choose Digital Aura for Amazon PPC?</h2>
            <p className="text-white/55 max-w-xl mx-auto text-sm">We manage PPC as a growth engine — not just a cost centre.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ Icon, color, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20" style={{ background: "#0A1628" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">How We Manage Your PPC</h2>
            <p className="text-white/55 text-sm">A structured process from first audit to ongoing scale.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-[2.35rem] top-6 bottom-6 w-px" style={{ background: "linear-gradient(180deg,#FF9900,#1A6FE8,#7C3AED)" }} />
            <div className="space-y-8">
              {steps.map(({ n, title, desc }, i) => {
                const colors = [accentColor, accent2Color, purpleColor, accent2Color, accentColor];
                const c = colors[i % colors.length];
                return (
                  <motion.div key={n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 font-black text-sm relative z-10"
                      style={{ borderColor: c, color: c, background: "#0A1628" }}>
                      {n}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-white font-bold mb-1">{title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-14 border-y border-white/8" style={{ background: "#080F1E" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "42%",  label: "Avg ACoS reduction",   color: accentColor },
            { val: "3.8×", label: "Average ROAS",          color: accent2Color },
            { val: "80+",  label: "Amazon brands managed", color: purpleColor },
            { val: "48hr", label: "Campaign live time",    color: accentColor },
          ].map(({ val, label, color }) => (
            <div key={label}>
              <p className="text-3xl font-black mb-1" style={{ color }}>{val}</p>
              <p className="text-white/50 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20" style={{ background: "#0A1628" }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(({ key, q, a }) => {
              const open = openFaq === key;
              return (
                <div key={key} className="rounded-xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <button className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left" onClick={() => setOpenFaq(open ? null : key)}>
                    <span className="text-white font-medium text-sm" data-cms-key={key}>{q}</span>
                    {open ? <MinusCircle size={16} style={{ color: accentColor }} className="shrink-0" /> : <PlusCircle size={16} className="text-white/40 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <p className="px-5 pb-4 text-white/60 text-sm leading-relaxed">{a}</p>
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
      <section id="ppc-form" className="py-20" style={{ background: "#080F1E" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="rounded-2xl p-8 border border-white/10" style={{ background: "rgba(255,153,0,0.04)" }}>
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: glowAmber }}>
                <Target size={22} style={{ color: accentColor }} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Get Your Free Amazon PPC Audit</h2>
              <p className="text-white/55 text-sm">We'll review your current campaigns and show you exactly where your budget is leaking — no obligation.</p>
            </div>
            <PpcAuditForm />
          </div>
        </div>
      </section>

      <StickyCtaBar
        headline="Stop overspending on Amazon ads."
        sub="Get a free PPC audit and see where your budget is going."
        cta="Get Free Audit"
        href="/contact"
        accent={accentColor}
      />
    </PageLayout>
  );
}
