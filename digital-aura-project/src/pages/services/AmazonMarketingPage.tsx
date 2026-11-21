/**
 * SERVICE PAGE — Amazon Marketing & Account Management
 * Route: /services/amazon-marketing
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  ShoppingBag, Search, Target, Award, Shield, Package,
  BarChart3, Image as ImageIcon, TrendingUp, Check,
  ArrowRight, Lock, CheckCircle2, Star, Zap,
  Users, Globe2, FileText, Settings,
} from "lucide-react";
import { useState, useRef } from "react";
import { RecaptchaBox, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from "@/components/RecaptchaBox";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";

const accentColor  = "#FF6B2B";
const accent2Color = "#1A6FE8";
const glowOrange   = "rgba(255,107,43,0.10)";
const glowBlue     = "rgba(26,111,232,0.08)";

// ── Service card data by tab ───────────────────────────────────────────────────
const amazonCards = [
  // ── Listings & Content ──
  {
    Icon: Search,
    category: "Listings & Content",
    color: accentColor,
    bg: glowOrange,
    title: "Product Listing Optimisation",
    desc: "Keyword-rich titles, bullet points, and descriptions written to rank in Amazon search and convert browsers into buyers. Backend keywords and search term indexing included.",
    tags: ["Keyword Research", "A9 Optimisation", "Conversion Copy"],
  },
  {
    Icon: Award,
    category: "Listings & Content",
    color: accentColor,
    bg: glowOrange,
    title: "A+ Content / Enhanced Brand Content",
    desc: "Premium Enhanced Brand Content that elevates your product detail page with rich visuals, comparison charts, and storytelling. Amazon data shows A+ Content can lift conversions by up to 20%.",
    tags: ["Brand Story", "Comparison Charts", "Rich Media"],
  },
  {
    Icon: Package,
    category: "Listings & Content",
    color: accentColor,
    bg: glowOrange,
    title: "Amazon Storefront Design",
    desc: "A custom Amazon Brand Store that acts as your mini-website on Amazon — shoppable, brand-consistent, and designed to increase cross-sell and basket size.",
    tags: ["Store Design", "Cross-Sell", "Brand Consistency"],
  },
  {
    Icon: ImageIcon,
    category: "Listings & Content",
    color: accentColor,
    bg: glowOrange,
    title: "Product Photography",
    desc: "Amazon-compliant main images, lifestyle shots, and infographic images that meet category requirements and maximise click-through rate from search results.",
    tags: ["White Background", "Lifestyle Shots", "Infographics"],
  },
  {
    Icon: TrendingUp,
    category: "Listings & Content",
    color: accentColor,
    bg: glowOrange,
    title: "Amazon SEO & Ranking Strategy",
    desc: "Organic ranking improvement through keyword indexing audits, competitor gap analysis, review velocity strategy, and content alignment with the A9 algorithm.",
    tags: ["A9 Algorithm", "Keyword Indexing", "Review Strategy"],
  },
  // ── PPC & Advertising ──
  {
    Icon: Target,
    category: "PPC & Advertising",
    color: accent2Color,
    bg: glowBlue,
    title: "Amazon PPC Management",
    desc: "Sponsored Products, Sponsored Brands, and Sponsored Display campaigns built to maximise ROAS — with continuous bid and keyword optimisation to reduce ACOS over time.",
    tags: ["Sponsored Products", "Bid Management", "ACOS Reduction"],
  },
  {
    Icon: BarChart3,
    category: "PPC & Advertising",
    color: accent2Color,
    bg: glowBlue,
    title: "PPC Audit & Restructure",
    desc: "Full audit of your existing campaigns — wasted spend, missing negatives, poor ASIN targeting, and structural issues. We rebuild campaigns from the ground up for profitability.",
    tags: ["Campaign Audit", "Negative Keywords", "ASIN Targeting"],
  },
  {
    Icon: Star,
    category: "PPC & Advertising",
    color: accent2Color,
    bg: glowBlue,
    title: "DSP & Display Advertising",
    desc: "Amazon DSP campaigns to retarget your past visitors and reach new audiences beyond search — across Amazon properties and third-party sites for full-funnel growth.",
    tags: ["Amazon DSP", "Retargeting", "Display Ads"],
  },
  {
    Icon: Globe2,
    category: "PPC & Advertising",
    color: accent2Color,
    bg: glowBlue,
    title: "International Marketplace Expansion",
    desc: "PPC and listing strategy for Amazon India, Amazon UAE, and Amazon US/UK. We handle localisation, pricing strategy, and marketplace-specific keyword research.",
    tags: ["Amazon India", "Amazon UAE", "Amazon US/UK"],
  },
  // ── Account Management ──
  {
    Icon: ShoppingBag,
    category: "Account Management",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Amazon Seller Registration",
    desc: "Complete seller account setup from scratch — documentation, category approval, GTIN exemptions, and your first live listings handled end-to-end.",
    tags: ["Account Setup", "Category Approval", "GTIN Exemption"],
  },
  {
    Icon: Shield,
    category: "Account Management",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Brand Registry & Protection",
    desc: "Amazon Brand Registry application, IP violation reporting, and ongoing brand protection so counterfeiters and hijackers can't steal your Buy Box or suppress your listings.",
    tags: ["Brand Registry", "IP Protection", "Buy Box Defence"],
  },
  {
    Icon: Settings,
    category: "Account Management",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Full Seller Central Management",
    desc: "Day-to-day Seller Central management: inventory monitoring, pricing, suppressed listing fixes, case management, and monthly performance reviews — the full workload off your plate.",
    tags: ["Seller Central", "Inventory", "Case Management"],
  },
  {
    Icon: FileText,
    category: "Account Management",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Account Suspension Reinstatement",
    desc: "Account suspension reinstatement service. We analyse the root cause, prepare a Plan of Action, and handle the appeal process directly with Amazon's Seller Performance team.",
    tags: ["Plan of Action", "Appeal Filing", "Account Health"],
  },
];

const amazonTabs = [
  { key: "listings", label: "Listings & Content", color: accentColor,  bg: glowOrange,                    gradient: `linear-gradient(135deg,${accentColor},#e85a1a)` },
  { key: "ppc",      label: "PPC & Advertising",  color: accent2Color, bg: glowBlue,                      gradient: `linear-gradient(135deg,${accent2Color},#1558c0)` },
  { key: "account",  label: "Account Management", color: "#7C3AED",    bg: "rgba(124,58,237,0.08)",        gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)" },
];

const cardsByTab: Record<string, typeof amazonCards> = {
  listings: amazonCards.filter(c => c.category === "Listings & Content"),
  ppc:      amazonCards.filter(c => c.category === "PPC & Advertising"),
  account:  amazonCards.filter(c => c.category === "Account Management"),
};

// ── SVG Illustrations ─────────────────────────────────────────────────────────

/** Amazon Seller Dashboard mockup — hero right column */
const DashboardIllustration = () => (
  <div className="relative w-full max-w-[420px] mx-auto select-none" aria-hidden="true">
    {/* Glow */}
    <div className="absolute inset-0 rounded-3xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 60% 40%, rgba(255,107,43,0.18) 0%, transparent 70%)`, filter: "blur(32px)" }} />
    {/* Main card */}
    <div className="relative rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
      style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F3F4F6]"
        style={{ background: "#0A1628" }}>
        <span className="text-[11px] font-bold text-white tracking-widest uppercase">Seller Central Dashboard</span>
        <div className="flex gap-1.5">
          {["#EF4444","#F59E0B","#22C55E"].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>
      {/* Stat row */}
      <div className="grid grid-cols-3 gap-0 border-b border-[#F3F4F6]">
        {[
          { label: "Total Sales", val: "₹4,82,300", delta: "+23%", up: true },
          { label: "Units Sold",  val: "1,847",     delta: "+18%", up: true },
          { label: "ACOS",        val: "14.2%",     delta: "−30%", up: false },
        ].map((s, i) => (
          <div key={s.label} className="px-4 py-4 text-center border-r last:border-r-0 border-[#F3F4F6]">
            <p className="text-[10px] text-[#9CA3AF] font-semibold mb-1">{s.label}</p>
            <p className="text-[15px] font-black text-[#0A1628]">{s.val}</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: s.up ? "rgba(34,197,94,0.1)" : "rgba(255,107,43,0.1)", color: s.up ? "#16a34a" : accentColor }}>
              {s.delta}
            </span>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div className="px-5 py-4 border-b border-[#F3F4F6]">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Monthly Revenue</p>
        <div className="flex items-end gap-1.5 h-16">
          {[38,52,44,61,48,70,58,75,65,82,71,96].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all"
              style={{ height: `${h}%`, background: i === 11 ? `linear-gradient(to top, ${accentColor}, #ffb347)` : i >= 9 ? `rgba(255,107,43,0.5)` : "#E5E7EB" }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-[#D1D5DB]">Jan</span>
          <span className="text-[9px] text-[#D1D5DB]">Dec</span>
        </div>
      </div>
      {/* Listing health rows */}
      <div className="px-5 py-4">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Top ASINs</p>
        {[
          { name: "Wireless Earbuds Pro",   rank: "#3",  status: "Active",    statusColor: "#22C55E" },
          { name: "Leather Wallet Slim",    rank: "#7",  status: "A+ Active", statusColor: "#1A6FE8" },
          { name: "Stainless Steel Bottle", rank: "#12", status: "PPC On",    statusColor: accentColor },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between py-1.5 border-b last:border-b-0 border-[#F9FAFB]">
            <span className="text-[11px] font-medium text-[#374151] truncate max-w-[160px]">{item.name}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-[#6B7280]">{item.rank}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${item.statusColor}15`, color: item.statusColor }}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Floating badge */}
    <div className="absolute -top-3 -right-3 rounded-xl px-3 py-2 shadow-lg border border-white"
      style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
      <p className="text-[10px] font-black text-white tracking-widest uppercase">ACOS</p>
      <p className="text-lg font-black text-white leading-none">−30%</p>
    </div>
    {/* Floating rank badge */}
    <div className="absolute -bottom-3 -left-3 rounded-xl px-3 py-2 shadow-lg border border-white bg-white">
      <p className="text-[10px] font-bold text-[#6B7280]">Organic Rank</p>
      <p className="text-[13px] font-black" style={{ color: accent2Color }}>Page 4 → Page 1</p>
    </div>
  </div>
);

/** Amazon PPC funnel / growth chart — used in Agency Comparison section */
const GrowthChartIllustration = () => (
  <div className="relative w-full max-w-[380px] mx-auto select-none" aria-hidden="true">
    <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
      style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F3F4F6]">
        <span className="text-[11px] font-bold text-[#0A1628]">Keyword Rank Tracker</span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>Live</span>
      </div>
      {/* Rank lines */}
      <div className="px-5 py-4">
        {[
          { kw: "wireless earbuds under 1000", before: 48, after: 3,  color: accentColor },
          { kw: "slim leather wallet india",   before: 31, after: 7,  color: accent2Color },
          { kw: "stainless steel bottle 1l",   before: 22, after: 2,  color: "#7C3AED" },
        ].map((row) => (
          <div key={row.kw} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-[#374151] font-medium truncate max-w-[200px]">{row.kw}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-[#9CA3AF] line-through">#{row.before}</span>
                <span className="text-[11px] font-black" style={{ color: row.color }}>#{row.after}</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${100 - (row.after / 50) * 100}%`, background: `linear-gradient(90deg, ${row.color}60, ${row.color})` }} />
            </div>
          </div>
        ))}
      </div>
      {/* Footer stat */}
      <div className="mx-5 mb-4 p-3 rounded-xl flex items-center justify-between"
        style={{ background: "rgba(255,107,43,0.06)", border: `1px solid rgba(255,107,43,0.15)` }}>
        <div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Avg. rank improvement</p>
          <p className="text-[18px] font-black" style={{ color: accentColor }}>+2.8x</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: glowOrange }}>
          <TrendingUp size={18} style={{ color: accentColor }} />
        </div>
      </div>
    </div>
  </div>
);

/** Process timeline — used in a new 5-step section */
const processSteps = [
  { num: "01", title: "Account & Listing Audit",    desc: "Full review of your Seller Central account, listing health, keyword rankings, PPC spend, and account health metrics." },
  { num: "02", title: "Strategy & Keyword Research", desc: "Competitor and keyword analysis mapped to your product catalogue, with an action plan prioritised by revenue impact." },
  { num: "03", title: "Content & Listing Overhaul",  desc: "Title, bullets, description, A+ content, and backend keywords rewritten and optimised for the A9 algorithm and buyers." },
  { num: "04", title: "PPC Launch & Optimisation",   desc: "New campaigns built or existing campaigns restructured, with weekly bid and keyword reviews to improve ACOS." },
  { num: "05", title: "Review & Scale",              desc: "Monthly performance reviews, ranking and sales analysis, and continuous improvements to grow your Amazon revenue." },
];

// ── Tool groups ───────────────────────────────────────────────────────────────
const toolGroups = [
  { label: "PPC & Ads",        color: accentColor,  bg: glowOrange,                 pills: ["Amazon Ads Console", "Helium 10 PPC", "Perpetua", "Scale Insights"] },
  { label: "Keyword Research", color: accent2Color, bg: glowBlue,                   pills: ["Helium 10", "Jungle Scout", "MerchantWords", "Brand Analytics"] },
  { label: "Listing Tools",    color: "#7C3AED",    bg: "rgba(124,58,237,0.08)",    pills: ["Helium 10 Listing", "Scribbles", "Index Checker"] },
  { label: "Analytics",        color: "#F59E0B",    bg: "rgba(245,158,11,0.08)",    pills: ["Seller Central", "Brand Analytics", "Search Query Performance"] },
  { label: "Competitor Intel", color: "#EC4899",    bg: "rgba(236,72,153,0.08)",    pills: ["Jungle Scout", "Viral Launch", "ASINspector"] },
];

// ── Approach ──────────────────────────────────────────────────────────────────
const approach = [
  "In-depth keyword research mapped to buyer intent and A9 algorithm signals",
  "Competitor ASIN analysis to identify listing gaps and pricing opportunities",
  "Content written for conversion, not just keyword density",
  "Structured PPC campaigns with weekly bid reviews and negative keyword management",
  "Continuous optimisation driven by Search Query Performance and Brand Analytics",
  "Account health monitoring to prevent suppression and suspension risk",
];

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  "Data-driven PPC strategy focused on ACOS, not just ad spend",
  "Listing copy written by trained copywriters, not templated AI",
  "Transparent monthly reporting with real revenue attribution",
  "Full account health monitoring — suspension prevention included",
  "Amazon Brand Registry and IP protection handled in-house",
  "Customised strategy per product category and competition level",
];

// ── What we do ────────────────────────────────────────────────────────────────
const whatWeDo = [
  { Icon: TrendingUp, label: "Increase organic rank on Amazon search" },
  { Icon: Target,     label: "Lower ACOS and improve PPC profitability" },
  { Icon: Award,      label: "Lift conversions with A+ Content and visuals" },
  { Icon: Shield,     label: "Protect your brand from hijackers and counterfeiters" },
  { Icon: Globe2,     label: "Expand across Amazon India, UAE, and global markets" },
  { Icon: Users,      label: "Take Seller Central off your plate, end to end" },
];

// ── Results ───────────────────────────────────────────────────────────────────
const results = [
  { Icon: TrendingUp,  text: "Lower ACOS and higher ROAS from PPC" },
  { Icon: Search,      text: "Organic rank improvement page 1 growth" },
  { Icon: Award,       text: "Higher conversions from A+ Content" },
  { Icon: Shield,      text: "Healthier account with zero suspension risk" },
];

// ── Stats bar ─────────────────────────────────────────────────────────────────
const stats = [
  { stat: "30%",  label: "Avg. ACOS Reduction",  sub: "PPC campaigns · 90 days" },
  { stat: "20%",  label: "Conversion Lift",       sub: "With A+ Content" },
  { stat: "2.8x", label: "Organic Rank Growth",   sub: "Post listing optimisation" },
  { stat: "120+", label: "Brands Launched",       sub: "India, UAE & international" },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Do you work with new Amazon sellers or only established ones?",
    a: "Both. We handle everything from first-time seller registration and account setup all the way to full ongoing management and PPC scaling for established brands. The scope is defined in a discovery call.",
  },
  {
    q: "How is Amazon PPC different from Google Ads?",
    a: "Amazon PPC shows ads to buyers already searching on Amazon with high purchase intent. It operates within the A9 algorithm, so keyword and product relevance signals differ from Google's auction. We manage each platform with separate strategies tailored to their mechanics.",
  },
  {
    q: "What is A+ Content and do I need it?",
    a: "A+ Content replaces the plain product description with rich images, comparison tables, and brand storytelling. Amazon's own data shows it can increase conversions by up to 20%. It requires Brand Registry, which we can apply for on your behalf.",
  },
  {
    q: "How long before I see results?",
    a: "Listing and content improvements can show organic ranking movement within 2–4 weeks. PPC ACOS improvements typically stabilise within 60–90 days. Meaningful revenue growth usually builds over 3–6 months as rankings and reviews compound.",
  },
  {
    q: "Do you manage Amazon for Indian sellers or international sellers too?",
    a: "We manage accounts on Amazon India (amazon.in), Amazon UAE, and Amazon Global including US and UK marketplaces. Cross-border expansion strategy is also available.",
  },
  {
    q: "Can you rescue a suspended Amazon account?",
    a: "Yes — account suspension reinstatement is a service we offer. We analyse the root cause, prepare a Plan of Action, and handle the appeal process with Amazon's Seller Performance team.",
  },
  {
    q: "What does full account management include day to day?",
    a: "Inventory monitoring, listing suppression fixes, pricing updates, PPC bid management, case handling with Amazon support, review monitoring, and a monthly performance review — the full Seller Central workload taken off your plate.",
  },
];

// ── Tab component ─────────────────────────────────────────────────────────────
const AmazonCardTabs = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const tab = amazonTabs.find(t => t.key === activeTab)!;
  const cards = cardsByTab[activeTab];

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
            <ShoppingBag size={12} /> Amazon Marketing Services
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="amzn_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Everything Your Amazon Business Needs to Grow</span></h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed"><span data-cms-key="amzn_s10_sub" data-cms-label="Section Subtext" data-cms-attr="text">From seller account setup to full ongoing management — we handle every part of Amazon so you can focus on your product.</span></p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {amazonTabs.map((t, i) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={activeTab === t.key
                ? { background: t.gradient, color: "#fff", boxShadow: `0 4px 14px ${t.color}40` }
                : { background: "#F8FAFF", color: "#374151", border: "1.5px solid #E5E7EB" }}>
              <span data-cms-key={`amzn_tab_${t.key}_label`} data-cms-label="Tab Label" data-cms-attr="text">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, i) => (
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
                <h3 className="text-[15px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`amzn_card_${activeTab}_${i}_title`} data-cms-label="Card Title" data-cms-attr="text">{card.title}</span></h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`amzn_card_${activeTab}_${i}_desc`} data-cms-label="Card Desc" data-cms-attr="text">{card.desc}</span></p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.tags.map((tag, ti) => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}><span data-cms-key={`amzn_card_${activeTab}_${i}_tag_${ti}`} data-cms-label="Card Tag" data-cms-attr="text">{tag}</span></span>
                  ))}
                </div>
                <Link to="/contact/" className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold transition-all hover:gap-2.5" style={{ color: tab.color }}>
                  Learn More <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ── Lead form ─────────────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white focus:ring-[#FF6B2B]";

const AmazonAuditForm = () => {
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const captcha = useRef<RecaptchaHandle>(null);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", asin: "", goal: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const captchaToken = RECAPTCHA_SITE_KEY ? captcha.current?.getToken() ?? "" : "";
    if (RECAPTCHA_SITE_KEY && !captchaToken) return;
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    setError("");
    const r = await submitLead({
      name: form.name, email: form.email, phone: form.phone, company: form.business,
      project: form.goal,
      message: `ASIN / Store URL: ${form.asin}\nGoal: ${form.goal}`,
      honeypot: String(fd.get("company_site") || ""),
      recaptchaToken: captchaToken || undefined,
    }, "amazon-audit-form");
    setSubmitting(false);
    if (r.ok) {
      setSubmitted(true);
      captcha.current?.reset();
      track("lead_form_submit", { form_name: "amazon_page_form" });
      track("generate_lead", { form_name: "amazon_page_form", value: 1 });
    } else {
      captcha.current?.reset();
      setError(r.error ?? "Something went wrong. Please try again.");
    }
  };

  if (submitted) return (
    <div className="rounded-2xl p-8 bg-white text-center py-10" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: glowOrange }}>
        <CheckCircle2 size={32} style={{ color: accentColor }} />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628] mb-2">Audit Request Received!</h3>
      <p className="text-[#6B7280]">We'll review your Amazon account and send your free audit within 24 hours.</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-bold text-[#0A1628] mb-1">Request Your Free Amazon Audit</h3>
        <p className="text-sm text-[#6B7280] mb-4">Fill in your details and we'll get started within 24 hours.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Full Name *</label>
            <input name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Business Name *</label>
            <input name="business" required value={form.business} onChange={handleChange} placeholder="Your Brand" className={inputClass} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
            <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@brand.com" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone Number *</label>
            <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">ASIN or Amazon Store URL</label>
          <input name="asin" value={form.asin} onChange={handleChange} placeholder="https://amazon.in/your-store or B0XXXXX" className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Goal *</label>
          <select name="goal" required value={form.goal} onChange={handleChange} className={inputClass + " cursor-pointer"}>
            <option value="" disabled>Select your goal...</option>
            <option>Launch my brand on Amazon</option>
            <option>Improve organic rankings & visibility</option>
            <option>Reduce ACOS & improve PPC ROI</option>
            <option>Create A+ Content / Brand Store</option>
            <option>Full account management</option>
            <option>Rescue a suspended account</option>
          </select>
        </div>
        <RecaptchaBox ref={captcha} />
        <input name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={submitting}
          className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
          Get My Free Amazon Audit <ArrowRight size={18} />
        </button>
        <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
          <Lock size={12} /> 100% free — no credit card, no obligation
        </p>
      </form>
    </div>
  );
};

// ── FAQ item ──────────────────────────────────────────────────────────────────
const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => (
  <div className="border-b border-[#E5E7EB] py-6 first:pt-0 last:border-b-0">
    <h3 className="text-[17px] font-bold leading-snug text-[#0A1628] md:text-[18px]">
      <span data-cms-key={`amzn_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span>
    </h3>
    <p className="mt-2 text-[15.5px] leading-relaxed text-[#4B5563]">
      <span data-cms-key={`amzn_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span>
    </p>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const AmazonMarketingPage = () => {
  const sp = useSettings(["amzn_hero_h1", "amzn_hero_sub", "amzn_cta_btn"]);

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
              <Link to="/services/" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>
                ← Back to All Services
              </Link>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                  style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
                  <ShoppingBag size={12} /> Amazon Marketing & Account Management
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
                <span data-cms-key="amzn_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">
                  {sp.amzn_hero_h1 || (<>Grow Your Amazon Sales with<br />
                  <span style={{ color: accentColor }}>Expert Account Management</span></>)}
                </span>
              </h1>
              <p className="text-lg text-[#4B5563] mb-4 leading-relaxed">
                <span data-cms-key="amzn_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">
                  {sp.amzn_hero_sub || "Full-service Amazon marketing — seller registration, listing optimisation, PPC management, A+ content, and Brand Registry — delivered by specialists who understand the A9 algorithm."}
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Amazon India", "Amazon UAE", "Amazon US/UK", "PPC Management", "A+ Content", "Brand Registry"].map(tag => (
                  <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.25)` }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="#amazon-audit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 8px 24px rgba(255,107,43,0.4)` }}>
                  <span data-cms-key="amzn_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">{sp.amzn_cta_btn || "Get a Free Amazon Audit"}</span>
                  <ArrowRight size={15} />
                </Link>
                <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
                  style={{ borderColor: "#0A1628" }}>
                  Our Services
                </a>
              </div>
            </motion.div>
            {/* Right: dashboard illustration */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:flex justify-center items-center pt-6 pb-6">
              <DashboardIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Agency Comparison ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block"
                style={{ background: "rgba(255,107,43,0.08)", color: accentColor }}>
                <span data-cms-key="amzn_cmp_badge" data-cms-label="Comparison Badge" data-cms-attr="text">Not Your Typical Amazon Agency</span>
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
                <span data-cms-key="amzn_cmp_h2" data-cms-label="Comparison Heading" data-cms-attr="text">Any Freelancer Can Create Listings.<br className="hidden md:block" />
                Very Few Can Move Your Organic Rank.</span>
              </h2>
              <p className="text-[#4B5563] leading-relaxed mb-8">
                <span data-cms-key="amzn_cmp_body" data-cms-label="Comparison Body" data-cms-attr="text">Most "Amazon agencies" paste keyword-stuffed titles and launch PPC campaigns with no negative keyword strategy. The result is mediocre rankings, rising ACOS, and no compound growth. We use a data-backed A9 optimisation process that builds rankings over time — not just ad dependency.</span>
              </p>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> <span data-cms-key="amzn_cmp_lbl" data-cms-label="Pain Label" data-cms-attr="text">What Most Amazon Agencies Deliver</span>
              </p>
              <div className="grid sm:grid-cols-1 gap-3 mb-8">
                {[
                  { pain: "Generic listing templates recycled across clients", detail: "No keyword specificity per ASIN", pi: 0 },
                  { pain: "PPC campaigns set and forgotten with no bid management", detail: "ACOS climbs, profit disappears", pi: 1 },
                  { pain: "No brand protection or Buy Box monitoring", detail: "Hijackers suppress your account", pi: 2 },
                ].map((item) => (
                  <div key={item.pi} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                    <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1"><span data-cms-key={`amzn_pain_${item.pi}_title`} data-cms-label="Pain Point" data-cms-attr="text">{item.pain}</span></p>
                      <p className="text-[11.5px] text-[#9CA3AF]"><span data-cms-key={`amzn_pain_${item.pi}_detail`} data-cms-label="Pain Detail" data-cms-attr="text">{item.detail}</span></p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-5 py-4 border-l-4 flex items-start gap-3"
                style={{ background: "rgba(255,107,43,0.06)", borderLeftColor: accentColor }}>
                <span className="text-lg font-black mt-0.5 shrink-0" style={{ color: accentColor }}>⚠</span>
                <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">
                  <span data-cms-key="amzn_cmp_warn" data-cms-label="Warning Text" data-cms-attr="text">If your Amazon agency reports impressions and clicks but can't show organic rank improvement and ACOS trends, they're burning your budget — not building your brand.</span>
                </p>
              </div>
            </motion.div>
            {/* Right: rank tracker illustration */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="hidden lg:flex justify-center">
              <GrowthChartIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tabbed Service Cards ── */}
      <div id="services-list">
        <AmazonCardTabs />
      </div>

      {/* ── Our Approach ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="amzn_h2lbl_approach" data-cms-label="Section Label" data-cms-attr="text">Our Amazon Growth Approach</span>
            </h2>
            <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="amzn_approach_sub" data-cms-label="Approach Subtext" data-cms-attr="text">We focus on compound, sustainable Amazon growth using data-backed decisions and A9-aligned content structures.</span></p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approach.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-[14px] text-[#374151]"><span data-cms-key={`amzn_approach_${i}`} data-cms-label="Approach Item" data-cms-attr="text">{item}</span></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accent2Color }} /> <span data-cms-key="amzn_h2lbl_tools" data-cms-label="Section Label" data-cms-attr="text">Tools & Technologies We Use</span>
            </h2>
            <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="amzn_tools_sub" data-cms-label="Tools Subtext" data-cms-attr="text">Industry-leading Amazon tools for research, optimisation, and campaign management.</span></p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {toolGroups.map((g, i) => (
              <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`amzn_tool_${i}_label`} data-cms-label="Tool Group Label" data-cms-attr="text">{g.label}</span></p>
                <div className="flex flex-wrap gap-2">
                  {g.pills.map((p, pi) => (
                    <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: g.bg, color: g.color }}><span data-cms-key={`amzn_tool_${i}_pill_${pi}`} data-cms-label="Tool Pill" data-cms-attr="text">{p}</span></span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-Step Process ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-3 flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="amzn_h2lbl_process" data-cms-label="Section Label" data-cms-attr="text">How We Grow Your Amazon Business</span>
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
            </h2>
            <p className="text-[#4B5563] max-w-xl mx-auto text-sm"><span data-cms-key="amzn_process_sub" data-cms-label="Process Subtext" data-cms-attr="text">A five-step process built around measurable outcomes — from audit to scale.</span></p>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute left-7 top-8 bottom-8 w-0.5" style={{ background: "linear-gradient(to bottom, transparent, #E5E7EB, transparent)" }} />
            <div className="space-y-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.num}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start">
                  <div className="relative shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg z-10"
                    style={{ background: i % 2 === 0 ? `linear-gradient(135deg, ${accentColor}, #e85a1a)` : `linear-gradient(135deg, ${accent2Color}, #1558c0)`, color: "#fff", boxShadow: `0 4px 16px ${i % 2 === 0 ? "rgba(255,107,43,0.35)" : "rgba(26,111,232,0.25)"}` }}>
                    {step.num}
                  </div>
                  <div className="flex-1 p-5 rounded-2xl bg-white border border-[#E5E7EB]" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <h3 className="font-bold text-[#0A1628] text-base mb-1"><span data-cms-key={`amzn_step_${i}_title`} data-cms-label="Step Title" data-cms-attr="text">{step.title}</span></h3>
                    <p className="text-[14px] text-[#4B5563] leading-relaxed"><span data-cms-key={`amzn_step_${i}_desc`} data-cms-label="Step Desc" data-cms-attr="text">{step.desc}</span></p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us + What We Can Do ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="amzn_h2lbl_why" data-cms-label="Section Label" data-cms-attr="text">Why Choose Digital Aura for Amazon</span>
            </h2>
            <ul className="space-y-3">
              {whyUs.map((w, i) => (
                <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                  <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                  <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`amzn_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accent2Color }} /> <span data-cms-key="amzn_h2lbl_whatwedo" data-cms-label="Section Label" data-cms-attr="text">What We Can Do for Your Amazon Business</span>
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {whatWeDo.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: glowOrange }}>
                    <item.Icon size={15} style={{ color: accentColor }} />
                  </div>
                  <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`amzn_whatwedo_${i}`} data-cms-label="What We Do Item" data-cms-attr="text">{item.label}</span></span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="pt-16 pb-8 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="amzn_h2lbl_results" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl"
                style={{ background: "#F8FAFF", border: `1px solid rgba(255,107,43,0.2)`, boxShadow: "0 4px 20px rgba(255,107,43,0.06)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: glowOrange }}>
                  <r.Icon size={22} style={{ color: accentColor }} />
                </div>
                <span className="text-[13.5px] font-medium text-[#374151] leading-snug"><span data-cms-key={`amzn_result_${i}`} data-cms-label="Result Item" data-cms-attr="text">{r.text}</span></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="py-12 px-4 md:px-8" style={{ background: "#0A1628" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: accentColor }}>+<span data-cms-key={`amzn_stat_${i}_val`} data-cms-label="Stat Value" data-cms-attr="text">{s.stat}</span></div>
                <div className="text-white font-bold text-sm mb-1"><span data-cms-key={`amzn_stat_${i}_label`} data-cms-label="Stat Label" data-cms-attr="text">{s.label}</span></div>
                <div className="text-[#94A3B8] text-xs"><span data-cms-key={`amzn_stat_${i}_sub`} data-cms-label="Stat Sub" data-cms-attr="text">{s.sub}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
              <span data-cms-key="amzn_h2lbl_faq" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
            </h2>
          </motion.div>
          <div className="space-y-1">
            {faqs.map((faq, idx) => (
              <motion.div key={faq.q}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
                <FAQItem q={faq.q} a={faq.a} idx={idx} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit CTA + Form ── */}
      <section id="amazon-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #c94e18 40%, #0A1628 100%)` }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">
                <span data-cms-key="amzn_audit_badge" data-cms-label="Audit Badge" data-cms-attr="text">Free Amazon Account Audit</span>
              </span>
              <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6">
                <span data-cms-key="amzn_audit_h2" data-cms-label="Audit Heading" data-cms-attr="text">Find Out Exactly What's Holding<br />Your Amazon Sales Back</span>
              </h2>
              <p className="text-white/80 text-lg mb-8">
                <span data-cms-key="amzn_audit_body" data-cms-label="Audit Body" data-cms-attr="text">We'll audit your listings, PPC spend, account health, and ranking potential — then give you a prioritised action plan. No obligation, completely free.</span>
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { text: "Full listing quality and keyword audit", bi: 0 },
                  { text: "PPC campaign structure and ACOS review", bi: 1 },
                  { text: "Account health and suspension risk check", bi: 2 },
                  { text: "Competitor ranking gap analysis", bi: 3 },
                  { text: "A+ Content and Brand Registry opportunities", bi: 4 },
                ].map(b => (
                  <div key={b.bi} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-white shrink-0" />
                    <span className="text-white font-medium"><span data-cms-key={`amzn_audit_bullet_${b.bi}`} data-cms-label="Audit Bullet" data-cms-attr="text">{b.text}</span></span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0" style={{ color: accentColor }}>
                  <Users size={18} style={{ color: accentColor }} />
                </div>
                <div>
                  <p className="text-white text-xs italic">"Organic rank went from page 4 to page 1 within 60 days of their listing overhaul."</p>
                  <p className="text-white/70 text-[10px] mt-0.5">D2C Brand Owner, Amazon India</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <AmazonAuditForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
        <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
        <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)", color: accentColor }}>
              <span data-cms-key="amzn_finalcta_badge" data-cms-label="Final CTA Badge" data-cms-attr="text">Let's Build Together</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              <span data-cms-key="amzn_finalcta_h2" data-cms-label="Final CTA Heading" data-cms-attr="text">Ready to <span style={{ color: accentColor }}>Scale</span> on Amazon?</span>
            </h2>
            <p className="text-[#E2E8F0] mb-8 leading-relaxed">
              <span data-cms-key="amzn_finalcta_body" data-cms-label="Final CTA Body" data-cms-attr="text">Book a free Amazon strategy call. We'll review your current account, identify your biggest growth opportunities, and show you exactly what a results-driven Amazon plan looks like for your brand.</span>
            </p>
            <Link to="#amazon-audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 4px 20px rgba(255,107,43,0.4)` }}>
              <span data-cms-key="amzn_finalcta_btn" data-cms-label="Final CTA Button" data-cms-attr="text">Book My Free Amazon Audit</span> <ArrowRight size={16} />
            </Link>
            <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="amzn_finalcta_fine" data-cms-label="Fine Print" data-cms-attr="text">No ACOS promises — a real strategy built around organic rank, conversions, and sustainable revenue.</span></p>
          </motion.div>
        </div>
      </section>

      <div className="h-16 md:hidden" aria-hidden="true" />
      <StickyCtaBar accent={accentColor} label="Get a free Amazon audit" href="#amazon-audit" topic="Amazon Marketing" />
    </PageLayout>
  );
};

export default AmazonMarketingPage;
