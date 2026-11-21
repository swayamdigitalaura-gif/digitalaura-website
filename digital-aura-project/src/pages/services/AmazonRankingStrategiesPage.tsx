/**
 * SERVICE PAGE — Amazon Ranking Strategies
 * Route: /services/amazon-ranking-strategies
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
  // ── Keyword Research ──
  {
    Icon: Search,
    category: "Keyword Research",
    color: accentColor,
    bg: glowOrange,
    title: "Target Audience Mapping",
    desc: "We start by understanding exactly how your buyers search — the words, phrases, and intent patterns they use — and build your keyword strategy around real shopper behaviour, not guesswork.",
    tags: ["Buyer Intent", "Search Patterns", "Niche Terms"],
  },
  {
    Icon: BarChart3,
    category: "Keyword Research",
    color: accentColor,
    bg: glowOrange,
    title: "Search Volume & Spacing Analysis",
    desc: "Even small spelling variations like 'Face Wash' vs 'Facewash' carry drastically different volumes. We analyse every variation to ensure you're targeting the highest-volume, most accurate form of each term.",
    tags: ["Volume Analysis", "Variant Targeting", "Precision Keywords"],
  },
  {
    Icon: Eye,
    category: "Keyword Research",
    color: accentColor,
    bg: glowOrange,
    title: "Reverse ASIN Lookup",
    desc: "Using reverse ASIN analysis, we extract the exact keywords your top competitors rank for — then find the gaps where you can outrank them with less effort and lower competition.",
    tags: ["Competitor Intel", "ASIN Analysis", "Keyword Gaps"],
  },
  // ── Ranking Tactics ──
  {
    Icon: TrendingUp,
    category: "Ranking Tactics",
    color: accent2Color,
    bg: glowBlue,
    title: "Amazon Autocomplete Mining",
    desc: "We systematically harvest Amazon's auto-suggest data to find the high-intent, long-tail keywords that real shoppers are searching right now — terms that standard keyword tools often miss.",
    tags: ["Autocomplete Data", "Long-Tail", "High-Intent"],
  },
  {
    Icon: Target,
    category: "Ranking Tactics",
    color: accent2Color,
    bg: glowBlue,
    title: "Low-Competition Keyword Strategy",
    desc: "Broad, highly competitive head terms drain budgets with little return. We identify high-volume, low-competition phrases where your listing can achieve fast organic traction and sustainable rank.",
    tags: ["Low Competition", "Sustainable Rank", "Fast Traction"],
  },
  {
    Icon: Award,
    category: "Ranking Tactics",
    color: accent2Color,
    bg: glowBlue,
    title: "A9 Algorithm Optimisation",
    desc: "Amazon's A9 algorithm rewards listings with high conversion rates, keyword relevance, and sales velocity. We structure every listing element — title, bullets, backend — to align with how A9 scores products.",
    tags: ["A9 Algorithm", "Conversion Focus", "Rank Signals"],
  },
  // ── Marketplace Coverage ──
  {
    Icon: Globe2,
    category: "Marketplace Coverage",
    color: purpleColor,
    bg: glowPurple,
    title: "Multi-Marketplace Keyword Strategy",
    desc: "Search behaviour differs across the US, UK, Canada, Australia, Germany, France, Spain, Italy, and Japan. We build marketplace-specific keyword strategies so you rank correctly in every territory you sell in.",
    tags: ["US / UK / CA", "EU Marketplaces", "JP / AU / IN"],
  },
  {
    Icon: Shield,
    category: "Marketplace Coverage",
    color: purpleColor,
    bg: glowPurple,
    title: "Relevance & Policy Compliance",
    desc: "Amazon penalises keyword stuffing and irrelevant terms. Every keyword we place is contextually relevant to your product — protecting your listing from suppression and keeping your quality score high.",
    tags: ["Policy Safe", "No Stuffing", "Quality Score"],
  },
  {
    Icon: Zap,
    category: "Marketplace Coverage",
    color: purpleColor,
    bg: glowPurple,
    title: "Ongoing Rank Monitoring",
    desc: "Ranking is not a one-time event. We monitor your keyword positions, track algorithm shifts, and refresh your strategy regularly so you compound ranking gains instead of losing ground over time.",
    tags: ["Rank Tracking", "Algorithm Updates", "Continuous Growth"],
  },
];

const tabs = ["Keyword Research", "Ranking Tactics", "Marketplace Coverage"] as const;
type Tab = typeof tabs[number];

const tabMeta: Record<Tab, { color: string; gradient: string; bg: string; desc: string }> = {
  "Keyword Research":    { color: accentColor,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)`,   bg: glowOrange,  desc: "Find the terms real shoppers type" },
  "Ranking Tactics":     { color: accent2Color, gradient: `linear-gradient(135deg,${accent2Color},#1558c0)`, bg: glowBlue,    desc: "Outrank competitors organically" },
  "Marketplace Coverage":{ color: purpleColor,  gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",         bg: glowPurple,  desc: "Rank in every territory you sell" },
};

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { Icon: Search,     color: accentColor,  title: "Data-Driven Keyword Research",   desc: "We use reverse ASIN tools, autocomplete mining, and volume analysis across every keyword variation — not just a quick tool export." },
  { Icon: Star,       color: accent2Color, title: "Amazon SEO Specialists",          desc: "Our team lives inside Amazon's algorithm. We understand how A9 weights conversion, relevance, and velocity — and we build strategies around it." },
  { Icon: Globe2,     color: purpleColor,  title: "Multi-Marketplace Expertise",     desc: "We've run keyword strategies for sellers in the US, UK, EU, and Asia-Pacific — with marketplace-specific analysis for each territory." },
  { Icon: TrendingUp, color: accentColor,  title: "Rank-First, PPC-Second Mindset",  desc: "Strong organic ranking reduces your dependence on paid ads. We build your keyword foundation to generate free traffic before layering in PPC." },
  { Icon: Users,      color: accent2Color, title: "Dedicated Ranking Manager",       desc: "One point of contact who monitors your rankings and updates your strategy as the algorithm and your category evolve." },
  { Icon: Shield,     color: purpleColor,  title: "Policy-Safe Optimisation",        desc: "No keyword stuffing, no prohibited terms, no suppression risk. Every keyword we use is relevant, compliant, and sustainable." },
];

// ── Process steps ──────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "Product & Category Audit",   desc: "We analyse your current keyword coverage, benchmark your top 5 competitors, and identify every ranking gap your listing is missing." },
  { n: "02", title: "Keyword Research & Mapping", desc: "Deep keyword discovery using reverse ASIN lookup, Amazon autocomplete, and volume analysis — mapped to title, bullets, backend, and PPC campaigns." },
  { n: "03", title: "Listing Structure Update",   desc: "We rewrite your title and bullets to place high-priority keywords in the positions A9 weights most heavily, without sacrificing readability or conversion." },
  { n: "04", title: "Backend & Index Audit",      desc: "Full backend search term configuration — including subject matter, intended use, and hidden keyword fields — to maximise indexing with no visible clutter." },
  { n: "05", title: "Track & Compound",           desc: "We monitor keyword positions post-update, track algorithm changes, and refresh your strategy quarterly so your ranking compounds rather than stagnates." },
];

// ── FAQs ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    key: "amzn_ranking_faq_1",
    q: "What is Amazon ranking strategy and why does it matter?",
    a: "Amazon ranking strategy is the process of improving where your product appears in Amazon search results for the keywords your customers are using. The higher you rank organically, the more free traffic your listing receives — reducing your dependence on paid ads and improving your overall profitability. The A9 algorithm ranks products based on keyword relevance, sales velocity, and conversion rate, so a structured ranking strategy directly affects all three.",
  },
  {
    key: "amzn_ranking_faq_2",
    q: "How do you find the right keywords for my product?",
    a: "We use a combination of reverse ASIN lookup (to extract the keywords your top competitors rank for), Amazon autocomplete mining (to find high-intent terms real shoppers are searching right now), and volume analysis across spelling and spacing variations. The result is a prioritised keyword list mapped to each field in your listing — not a generic export from one tool.",
  },
  {
    key: "amzn_ranking_faq_3",
    q: "How long does it take to see organic ranking improvements?",
    a: "Most listings see improved keyword indexing within 48–72 hours of republishing. Meaningful organic rank movements typically appear within 2–4 weeks as A9 registers the updated relevance signals. For competitive categories, compounding gains build over 60–90 days as sales velocity and conversion data reinforce the ranking signals.",
  },
  {
    key: "amzn_ranking_faq_4",
    q: "What is reverse ASIN lookup and how does it help?",
    a: "Reverse ASIN lookup extracts the full keyword index of a competitor's listing — showing you every search term Amazon is showing their product for. This reveals keyword gaps in your own listing and shows you exactly which high-volume terms are driving your competitors' traffic. It's one of the most reliable data sources for a ranking strategy because it's based on actual Amazon indexing, not estimates.",
  },
  {
    key: "amzn_ranking_faq_5",
    q: "Does better organic ranking reduce my PPC costs?",
    a: "Yes — significantly. Amazon uses listing relevance as a quality signal for Sponsored ads. A keyword-rich, well-indexed listing improves your ad relevance score, which reduces cost-per-click and improves ad placement. Strong organic ranking also means you can reduce your reliance on PPC for visibility — which directly improves your ACoS and overall margin.",
  },
  {
    key: "amzn_ranking_faq_6",
    q: "Do you work for specific Amazon marketplaces or all of them?",
    a: "We work across all major Amazon marketplaces — the US, UK, Canada, Australia, Germany, France, Spain, Italy, Japan, and India. Each marketplace has different search behaviour, spelling norms, and competitive landscapes, so we build marketplace-specific keyword strategies rather than translating a single list.",
  },
  {
    key: "amzn_ranking_faq_7",
    q: "How is your Amazon ranking service priced?",
    a: "We offer per-ASIN and catalogue packages depending on the number of products and marketplaces involved. Pricing is shared on a discovery call after we understand your current keyword coverage and goals. No hidden fees — the quote covers keyword research, listing updates, backend configuration, and one round of revisions.",
  },
];

// ── SVG Illustrations ──────────────────────────────────────────────────────────
function RankingDashboardIllustration() {
  return (
    <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[420px]" aria-hidden="true">
      <rect width="420" height="320" rx="16" fill="#0D1E3A" />
      <rect x="0" y="0" width="420" height="44" rx="16" fill="#132035" />
      <rect x="16" y="14" width="10" height="10" rx="5" fill="#FF6B2B" opacity="0.9" />
      <text x="34" y="23" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">Keyword Rank Tracker</text>
      <text x="330" y="23" fill="#22C55E" fontSize="10" fontFamily="system-ui">Live</text>
      <circle cx="324" cy="20" r="4" fill="#22C55E" opacity="0.5" />
      {[
        { x: 16,  label: "Keywords Indexed", val: "142",    sub: "+38 new",  color: "#22C55E" },
        { x: 156, label: "Avg Rank Position", val: "#6",    sub: "↑ 31 pos", color: "#FF6B2B" },
        { x: 296, label: "Organic CTR",       val: "9.2%",  sub: "+4.1%",   color: "#1A6FE8" },
      ].map(({ x, label, val, sub, color }) => (
        <g key={label}>
          <rect x={x} y="56" width="124" height="58" rx="8" fill="#0A1628" />
          <text x={x + 10} y="72" fill="#94A3B8" fontSize="9" fontFamily="system-ui">{label}</text>
          <text x={x + 10} y="90" fill={color} fontSize="18" fontFamily="system-ui" fontWeight="800">{val}</text>
          <text x={x + 10} y="105" fill={color} fontSize="9" fontFamily="system-ui" opacity="0.8">{sub}</text>
        </g>
      ))}
      {/* Rank position bars */}
      <text x="16" y="134" fill="#64748B" fontSize="9" fontFamily="system-ui">Keyword Rank Distribution</text>
      {[
        { x: 16,  w: 110, label: "Top 3",   color: "#22C55E", pct: "28%" },
        { x: 16,  w: 85,  label: "4–10",    color: "#FF6B2B", pct: "22%" },
        { x: 16,  w: 60,  label: "11–20",   color: "#1A6FE8", pct: "15%" },
        { x: 16,  w: 40,  label: "21–50",   color: "#7C3AED", pct: "10%" },
      ].map(({ x, w, label, color, pct }, i) => (
        <g key={label}>
          <text x={x} y={152 + i * 20} fill="#94A3B8" fontSize="9" fontFamily="system-ui">{label}</text>
          <rect x={x + 42} y={144 + i * 20} width={w} height="10" rx="5" fill={color} opacity="0.2" />
          <rect x={x + 42} y={144 + i * 20} width={w} height="10" rx="5" fill={color} opacity="0.8" />
          <text x={x + 42 + w + 6} y={152 + i * 20} fill={color} fontSize="9" fontFamily="system-ui">{pct}</text>
        </g>
      ))}
      {/* Keyword table */}
      <rect x="16" y="234" width="388" height="68" rx="8" fill="#0A1628" />
      <text x="28" y="250" fill="#64748B" fontSize="9" fontFamily="system-ui">Top Keywords</text>
      <text x="280" y="250" fill="#64748B" fontSize="9" fontFamily="system-ui">Rank</text>
      <text x="340" y="250" fill="#64748B" fontSize="9" fontFamily="system-ui">Volume</text>
      {[
        { kw: "organic face wash",          rank: "#2",  vol: "48,000", rc: "#22C55E" },
        { kw: "natural face wash for men",  rank: "#5",  vol: "22,000", rc: "#FF6B2B" },
        { kw: "sulfate free face wash",     rank: "#8",  vol: "18,500", rc: "#1A6FE8" },
      ].map(({ kw, rank, vol, rc }, i) => (
        <g key={kw}>
          <text x="28"  y={264 + i * 14} fill="#E2E8F0" fontSize="9" fontFamily="system-ui">{kw}</text>
          <text x="280" y={264 + i * 14} fill={rc}       fontSize="9" fontFamily="system-ui" fontWeight="700">{rank}</text>
          <text x="340" y={264 + i * 14} fill="#94A3B8"  fontSize="9" fontFamily="system-ui">{vol}</text>
        </g>
      ))}
    </svg>
  );
}

function KeywordResearchIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[400px]" aria-hidden="true">
      <rect width="400" height="300" rx="16" fill="#F8FAFF" />
      {/* Search bar mockup */}
      <rect x="20" y="20" width="360" height="40" rx="20" fill="#fff" stroke="#E5E7EB" strokeWidth="1.5" />
      <circle cx="48" cy="40" r="10" stroke="#FF6B2B" strokeWidth="2" />
      <line x1="55" y1="47" x2="62" y2="54" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" />
      <text x="72" y="45" fill="#9CA3AF" fontSize="11" fontFamily="system-ui">organic face wash for men</text>
      {/* Autocomplete dropdown */}
      <rect x="20" y="66" width="360" height="140" rx="12" fill="#fff" stroke="#E5E7EB" strokeWidth="1.5" />
      {[
        { kw: "organic face wash for men",          vol: "48,000", badge: "High",   bc: "#22C55E" },
        { kw: "organic face wash for sensitive skin", vol: "31,000", badge: "High",   bc: "#22C55E" },
        { kw: "organic face wash sulfate free",     vol: "22,000", badge: "Medium", bc: "#FF6B2B" },
        { kw: "organic face wash gentle",           vol: "14,000", badge: "Medium", bc: "#FF6B2B" },
        { kw: "organic face wash acne",             vol: "9,500",  badge: "Low",    bc: "#1A6FE8" },
      ].map(({ kw, vol, badge, bc }, i) => (
        <g key={kw}>
          <rect x="20" y={66 + i * 28} width="360" height="28" fill={i % 2 === 0 ? "#F9FAFB" : "#fff"} />
          <circle cx="36" cy={82 + i * 28} r="6" fill={`${bc}20`} />
          <circle cx="36" cy={82 + i * 28} r="3" fill={bc} />
          <text x="50" y={86 + i * 28} fill="#374151" fontSize="10" fontFamily="system-ui">{kw}</text>
          <text x="300" y={86 + i * 28} fill="#6B7280" fontSize="9" fontFamily="system-ui">{vol}</text>
          <rect x="345" y={75 + i * 28} width="30" height="14" rx="7" fill={`${bc}20`} />
          <text x="360" y={86 + i * 28} fill={bc} fontSize="8" fontFamily="system-ui" textAnchor="middle">{badge}</text>
        </g>
      ))}
      {/* Stats row */}
      <rect x="20" y="216" width="360" height="64" rx="12" fill="#fff" stroke="#E5E7EB" strokeWidth="1.5" />
      {[
        { label: "Keywords Found", val: "142",   color: "#FF6B2B" },
        { label: "Avg Volume",     val: "24.8K", color: "#1A6FE8" },
        { label: "Opportunities",  val: "38",    color: "#7C3AED" },
      ].map(({ label, val, color }, i) => (
        <g key={label}>
          <text x={50 + i * 110} y="244" fill={color} fontSize="18" fontFamily="system-ui" fontWeight="800" textAnchor="middle">{val}</text>
          <text x={50 + i * 110} y="262" fill="#6B7280" fontSize="9" fontFamily="system-ui" textAnchor="middle">{label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Lead form ──────────────────────────────────────────────────────────────────
const inputClass = "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0A1628] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 transition-all";

function RankingAuditForm() {
  const [form, setForm]       = useState({ name: "", business: "", email: "", phone: "", asin: "", marketplace: "" });
  const [status, setStatus]   = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [token, setToken]     = useState<string | null>(null);
  const recaptchaRef           = useRef<RecaptchaHandle>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) { recaptchaRef.current?.execute(); return; }
    setStatus("loading");
    try {
      await submitLead({ ...form, source: "amazon-ranking-form", recaptcha_token: token });
      setStatus("ok");
      track("amazon_ranking_form_submit");
    } catch { setStatus("err"); }
  }

  if (status === "ok") return (
    <div className="rounded-2xl p-8 bg-white text-center py-10" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: glowOrange }}>
        <CheckCircle2 size={32} style={{ color: accentColor }} />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628] mb-2">Request Received!</h3>
      <p className="text-[#6B7280]">We'll be in touch within 24 hours with your free keyword ranking audit.</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <form onSubmit={submit} className="space-y-4">
        <h3 className="text-xl font-bold text-[#0A1628] mb-1">Request Your Free Keyword Ranking Audit</h3>
        <p className="text-sm text-[#6B7280] mb-4">Fill in your details and we'll review your keyword coverage and organic rank within 24 hours.</p>
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
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Marketplace *</label>
          <select required value={form.marketplace} onChange={set("marketplace")} className={inputClass + " cursor-pointer"}>
            <option value="" disabled>Select marketplace...</option>
            <option value="amazon.in">Amazon India (.in)</option>
            <option value="amazon.com">Amazon USA (.com)</option>
            <option value="amazon.co.uk">Amazon UK (.co.uk)</option>
            <option value="amazon.ca">Amazon Canada (.ca)</option>
            <option value="amazon.com.au">Amazon Australia (.com.au)</option>
            <option value="amazon.de">Amazon Germany (.de)</option>
            <option value="other">Other</option>
          </select>
        </div>
        <RecaptchaBox siteKey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} onToken={setToken} />
        {status === "err" && <p className="text-sm text-red-600">Something went wrong — please try again.</p>}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
          {status === "loading" ? "Sending…" : <><span>Get My Free Ranking Audit</span> <ArrowRight size={18} /></>}
        </button>
        <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
          <Lock size={12} /> 100% free — no credit card, no obligation
        </p>
      </form>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AmazonRankingStrategiesPage() {
  const s = useSettings(["amzn_ranking_hero_h1", "amzn_ranking_hero_sub", "amzn_ranking_cta_btn"]);
  const [activeTab, setActiveTab] = useState<Tab>("Keyword Research");
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
                  <TrendingUp size={12} /> Amazon Ranking Strategies
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0A1628] mb-5 leading-[1.1]">
                <span data-cms-key="amzn_ranking_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">
                  {s.amzn_ranking_hero_h1 || (
                    <>
                      Rank Higher.<br />
                      <span style={{ color: accentColor }}>Sell More.</span>
                    </>
                  )}
                </span>
              </h1>
              <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                <span data-cms-key="amzn_ranking_hero_sub" data-cms-label="Hero Subtitle" data-cms-attr="text">
                  {s.amzn_ranking_hero_sub || "Keyword research, reverse ASIN analysis, and A9-aligned listing strategy — turning hidden products into page-one organic rankings that generate consistent, free traffic."}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 8px 24px rgba(255,107,43,0.4)`, color: "#fff" }}>
                  <span data-cms-key="amzn_ranking_cta_btn">{s.amzn_ranking_cta_btn || "Get a Free Ranking Audit"}</span>
                  <ArrowRight size={15} />
                </Link>
                <a href="#ranking-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all">
                  Talk to a Specialist
                </a>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E7EB]">
                {[
                  { val: "500+",  label: "Products ranked page 1" },
                  { val: "31",    label: "Avg rank positions gained" },
                  { val: "48hr",  label: "Keyword audit turnaround" },
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
              <RankingDashboardIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem / Why ranking matters ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="hidden lg:flex justify-center">
            <KeywordResearchIllustration />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: glowBlue, color: accent2Color, border: `1px solid rgba(26,111,232,0.3)` }}>
              <Search size={12} /> The Ranking Problem
            </div>
            <h2 className="text-3xl font-black text-[#0A1628] mb-5 leading-tight">
              <span data-cms-key="amrank_problem_h2" data-cms-label="Problem H2" data-cms-attr="text">A Poor Keyword Strategy Is Costing You Organic Sales Every Day</span>
            </h2>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              <span data-cms-key="amrank_problem_body" data-cms-label="Problem Body" data-cms-attr="text">Most Amazon sellers aren't invisible because their product is inferior — they're invisible because their keyword strategy is broken. Missing high-volume terms, wrong keyword placement, and unfilled backend fields leave your products buried on page 3 while near-identical listings rank on page 1.</span>
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Generic titles missing the high-volume keywords real shoppers are searching",
                "Backend search terms empty or filled with low-relevance guesswork",
                "No reverse ASIN analysis — missing every keyword your competitors rank for",
                "One-marketplace keyword list applied to every territory you sell in",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#4B5563]">
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent2Color }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#6B7280] leading-relaxed">
              We fix this with deep data-driven keyword research, reverse ASIN competitor analysis, and A9-aligned listing structure — turning hidden products into page-one organic rankings.
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
              <TrendingUp size={12} /> Our Services
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="amrank_services_h2" data-cms-label="Services H2" data-cms-attr="text">Our Complete Amazon Ranking Services</span></h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed"><span data-cms-key="amrank_services_sub" data-cms-label="Services Sub" data-cms-attr="text">From keyword discovery and competitive analysis through listing structure and multi-marketplace coverage — everything your product needs to rank organically.</span></p>
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
                  <h3 className="text-[15px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`amrank_card_${i}_title`} data-cms-label="Card Title" data-cms-attr="text">{card.title}</span></h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`amrank_card_${i}_desc`} data-cms-label="Card Desc" data-cms-attr="text">{card.desc}</span></p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((tag, ti) => (
                      <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}><span data-cms-key={`amrank_card_${i}_tag_${ti}`} data-cms-label="Card Tag" data-cms-attr="text">{tag}</span></span>
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
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="amrank_whyus_h2" data-cms-label="Why Us H2" data-cms-attr="text">Why Choose Digital Aura for Amazon Ranking?</span></h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px]"><span data-cms-key="amrank_whyus_sub" data-cms-label="Why Us Sub" data-cms-attr="text">We treat keyword strategy as a growth lever, not a one-time content exercise.</span></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ Icon, color, title, desc }, i) => (
              <div key={title} className="rounded-2xl p-6 border bg-white" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="text-[#0A1628] font-semibold mb-2"><span data-cms-key={`amrank_why_${i}_title`} data-cms-label="Why Us Title" data-cms-attr="text">{title}</span></h3>
                <p className="text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`amrank_why_${i}_desc`} data-cms-label="Why Us Desc" data-cms-attr="text">{desc}</span></p>
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
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="amrank_process_h2" data-cms-label="Process H2" data-cms-attr="text">How We Improve Your Amazon Rankings</span></h2>
            <p className="text-[#6B7280] text-[15px]"><span data-cms-key="amrank_process_sub" data-cms-label="Process Sub" data-cms-attr="text">A structured process from keyword audit to compounding organic growth.</span></p>
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
                      <h3 className="text-[#0A1628] font-bold mb-1"><span data-cms-key={`amrank_step_${i}_title`} data-cms-label="Step Title" data-cms-attr="text">{title}</span></h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`amrank_step_${i}_desc`} data-cms-label="Step Desc" data-cms-attr="text">{desc}</span></p>
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
            { val: "500+", label: "Products ranked page 1",   color: accentColor },
            { val: "31",   label: "Avg rank positions gained", color: accent2Color },
            { val: "20%",  label: "Avg organic traffic lift",  color: purpleColor },
            { val: "48hr", label: "Keyword audit turnaround",  color: accentColor },
          ].map(({ val, label, color }, si) => (
            <div key={label}>
              <p className="text-3xl font-black mb-1" style={{ color }}><span data-cms-key={`amrank_stat_${si}_val`} data-cms-label="Stat Value" data-cms-attr="text">{val}</span></p>
              <p className="text-[#6B7280] text-sm"><span data-cms-key={`amrank_stat_${si}_label`} data-cms-label="Stat Label" data-cms-attr="text">{label}</span></p>
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
              <Search size={12} /> FAQs
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]"><span data-cms-key="amrank_faq_h2" data-cms-label="FAQ H2" data-cms-attr="text">Frequently Asked Questions</span></h2>
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
                        <p className="mt-3 text-[15.5px] leading-relaxed text-[#4B5563]"><span data-cms-key={`${key}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
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
      <section id="ranking-form" className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
              <TrendingUp size={12} /> Free Audit
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="amrank_cta_h2" data-cms-label="CTA H2" data-cms-attr="text">Get Your Free Amazon Ranking Audit</span></h2>
            <p className="text-[#6B7280] text-[15px]"><span data-cms-key="amrank_cta_sub" data-cms-label="CTA Sub" data-cms-attr="text">We'll review your current keyword coverage and show you exactly where your rankings are being left on the table — no obligation.</span></p>
          </div>
          <RankingAuditForm />
        </div>
      </section>

      <StickyCtaBar
        headline="Your products are ranking on page 3 while competitors take your sales."
        sub="Get a free keyword audit and see exactly what's holding your rankings back."
        cta="Get Free Ranking Audit"
        href="/contact"
        accent={accentColor}
      />
    </PageLayout>
  );
}
