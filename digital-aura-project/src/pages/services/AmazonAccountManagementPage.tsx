/**
 * SERVICE PAGE — Amazon Seller Account Management
 * Route: /services/amazon-account-management
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  ShoppingBag, Shield, Package, Settings, FileText,
  BarChart3, TrendingUp, Check, ArrowRight, Lock,
  CheckCircle2, Users, Globe2, Zap, AlertTriangle,
  ClipboardList, RefreshCw, Star, Layers,
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
  // ── Account Setup & Registration ──
  {
    Icon: ShoppingBag,
    category: "Setup & Registration",
    color: accentColor,
    bg: glowOrange,
    title: "Amazon Seller Registration",
    desc: "Complete new seller account setup — business documentation, GST and PAN verification, bank linking, category approval, and GTIN exemption requests handled start to finish.",
    tags: ["Account Setup", "Category Approval", "GTIN Exemption"],
  },
  {
    Icon: Layers,
    category: "Setup & Registration",
    color: accentColor,
    bg: glowOrange,
    title: "FBA Enrolment & Setup",
    desc: "Amazon FBA (Fulfilment by Amazon) enrolment, shipment plan creation, labelling compliance, and inventory placement strategy so your stock reaches fulfilment centres correctly.",
    tags: ["FBA Setup", "Shipment Plans", "Labelling"],
  },
  {
    Icon: Shield,
    category: "Setup & Registration",
    color: accentColor,
    bg: glowOrange,
    title: "Brand Registry & Protection",
    desc: "Amazon Brand Registry application, IP violation reporting, and ongoing brand protection to prevent counterfeiters, hijackers, and suppressed listings on your ASINs.",
    tags: ["Brand Registry", "IP Protection", "Hijacker Removal"],
  },
  // ── Ongoing Account Management ──
  {
    Icon: Settings,
    category: "Ongoing Management",
    color: accent2Color,
    bg: glowBlue,
    title: "Full Seller Central Management",
    desc: "Day-to-day Seller Central management: inventory monitoring, pricing updates, suppressed listing fixes, case management with Amazon support, and policy compliance monitoring.",
    tags: ["Seller Central", "Inventory", "Policy Compliance"],
  },
  {
    Icon: ClipboardList,
    category: "Ongoing Management",
    color: accent2Color,
    bg: glowBlue,
    title: "Case Log & Seller Support",
    desc: "Expert handling of all Amazon Seller Support cases — reimbursement claims, FBA lost inventory disputes, listing reinstatement, and ongoing communication with Amazon's backend teams.",
    tags: ["Case Management", "Reimbursements", "Dispute Resolution"],
  },
  {
    Icon: BarChart3,
    category: "Ongoing Management",
    color: accent2Color,
    bg: glowBlue,
    title: "Account Health Monitoring",
    desc: "Continuous monitoring of your Account Health Dashboard — Order Defect Rate, Late Shipment Rate, and policy violation alerts — to keep your account in good standing and prevent suspension.",
    tags: ["Account Health", "ODR Monitoring", "Suspension Prevention"],
  },
  {
    Icon: Package,
    category: "Ongoing Management",
    color: accent2Color,
    bg: glowBlue,
    title: "Inventory & FBA Shipment Management",
    desc: "Inventory replenishment planning, FBA shipment creation, stock reconciliation, and stranded inventory fixes to prevent stockouts and IPI score issues.",
    tags: ["FBA Inventory", "Replenishment", "IPI Score"],
  },
  // ── Recovery & Reinstatement ──
  {
    Icon: FileText,
    category: "Recovery & Reinstatement",
    color: purpleColor,
    bg: glowPurple,
    title: "Account Suspension Reinstatement",
    desc: "Account suspension reinstatement from root-cause analysis through Plan of Action (POA) preparation and direct appeal submission to Amazon's Seller Performance team.",
    tags: ["Plan of Action", "Appeal Filing", "Account Health"],
  },
  {
    Icon: RefreshCw,
    category: "Recovery & Reinstatement",
    color: purpleColor,
    bg: glowPurple,
    title: "ASIN Reinstatement",
    desc: "Suppressed, blocked, or removed listing reinstatement — including stranded inventory fixes, compliance document submission, and policy violation appeals.",
    tags: ["ASIN Recovery", "Compliance Docs", "Listing Fixes"],
  },
  {
    Icon: Globe2,
    category: "Recovery & Reinstatement",
    color: purpleColor,
    bg: glowPurple,
    title: "Vendor Central Management",
    desc: "Full management of Amazon Vendor Central accounts — PO acceptance, chargeback dispute handling, ARA reporting, and content submission via Vendor Central portals.",
    tags: ["Vendor Central", "PO Management", "Chargeback Disputes"],
  },
];

const serviceTabs = [
  { key: "setup",    label: "Setup & Registration",   color: accentColor,  bg: glowOrange,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)` },
  { key: "ongoing",  label: "Ongoing Management",      color: accent2Color, bg: glowBlue,   gradient: `linear-gradient(135deg,${accent2Color},#1558c0)` },
  { key: "recovery", label: "Recovery & Reinstatement",color: purpleColor,  bg: glowPurple, gradient: `linear-gradient(135deg,${purpleColor},#6d28d9)` },
];

const cardsByTab: Record<string, typeof serviceCards> = {
  setup:    serviceCards.filter(c => c.category === "Setup & Registration"),
  ongoing:  serviceCards.filter(c => c.category === "Ongoing Management"),
  recovery: serviceCards.filter(c => c.category === "Recovery & Reinstatement"),
};

// ── SVG Illustrations ─────────────────────────────────────────────────────────

/** Account Health Dashboard mockup */
const AccountHealthIllustration = () => (
  <div className="relative w-full max-w-[420px] mx-auto select-none" aria-hidden="true">
    <div className="absolute inset-0 rounded-3xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 60% 40%, rgba(255,107,43,0.18) 0%, transparent 70%)`, filter: "blur(32px)" }} />
    <div className="relative rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
      style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F3F4F6]"
        style={{ background: "#0A1628" }}>
        <span className="text-[11px] font-bold text-white tracking-widest uppercase">Account Health Dashboard</span>
        <div className="flex gap-1.5">
          {["#EF4444","#F59E0B","#22C55E"].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>
      {/* Health score */}
      <div className="px-5 py-5 border-b border-[#F3F4F6] flex items-center gap-5">
        <div className="relative shrink-0">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="30" fill="none" stroke="#F3F4F6" strokeWidth="8" />
            <circle cx="36" cy="36" r="30" fill="none" stroke={accentColor} strokeWidth="8"
              strokeDasharray={`${0.92 * 188.5} 188.5`} strokeLinecap="round"
              transform="rotate(-90 36 36)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[16px] font-black" style={{ color: accentColor }}>92</span>
          </div>
        </div>
        <div>
          <p className="text-[11px] text-[#9CA3AF] font-semibold uppercase tracking-wider mb-1">Account Health Rating</p>
          <p className="text-[20px] font-black text-[#0A1628] leading-none">Good</p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
            ↑ Improved from 61
          </span>
        </div>
      </div>
      {/* KPI rows */}
      <div className="px-5 py-4 border-b border-[#F3F4F6]">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Performance Metrics</p>
        {[
          { label: "Order Defect Rate",    val: "0.11%", target: "<1%",   ok: true },
          { label: "Late Shipment Rate",   val: "0.4%",  target: "<4%",   ok: true },
          { label: "Valid Tracking Rate",  val: "98.7%", target: ">95%",  ok: true },
        ].map(row => (
          <div key={row.label} className="flex items-center justify-between py-2 border-b last:border-b-0 border-[#F9FAFB]">
            <span className="text-[11px] font-medium text-[#374151]">{row.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-[#0A1628]">{row.val}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: row.ok ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: row.ok ? "#16a34a" : "#EF4444" }}>
                Target {row.target}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Case log */}
      <div className="px-5 py-4">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Recent Case Resolutions</p>
        {[
          { case: "FBA Lost Inventory Reimbursement", status: "Resolved", amt: "+₹14,200" },
          { case: "Suppressed ASIN Reinstated",       status: "Resolved", amt: "Live" },
        ].map(item => (
          <div key={item.case} className="flex items-center justify-between py-1.5 border-b last:border-b-0 border-[#F9FAFB]">
            <span className="text-[11px] font-medium text-[#374151] truncate max-w-[180px]">{item.case}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>{item.status}</span>
              <span className="text-[10px] font-black" style={{ color: accentColor }}>{item.amt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Floating badge */}
    <div className="absolute -top-3 -right-3 rounded-xl px-3 py-2 shadow-lg border border-white"
      style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
      <p className="text-[10px] font-black text-white tracking-widest uppercase">Rating</p>
      <p className="text-lg font-black text-white leading-none">↑ 92</p>
    </div>
    {/* Floating bottom badge */}
    <div className="absolute -bottom-3 -left-3 rounded-xl px-3 py-2 shadow-lg border border-white bg-white">
      <p className="text-[10px] font-bold text-[#6B7280]">FBA Reimbursed</p>
      <p className="text-[13px] font-black" style={{ color: accent2Color }}>₹2.4L recovered</p>
    </div>
  </div>
);

/** Inventory health / management mockup */
const InventoryIllustration = () => (
  <div className="relative w-full max-w-[380px] mx-auto select-none" aria-hidden="true">
    <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
      style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F3F4F6]">
        <span className="text-[11px] font-bold text-[#0A1628]">FBA Inventory Planner</span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>Live Sync</span>
      </div>
      <div className="px-5 py-4">
        {[
          { sku: "Wireless Earbuds Pro",   stock: 142, days: 38, status: "Healthy",   color: "#22C55E" },
          { sku: "Leather Wallet Slim",    stock: 24,  days: 9,  status: "Reorder",   color: accentColor },
          { sku: "SS Water Bottle 1L",     stock: 0,   days: 0,  status: "Stockout",  color: "#EF4444" },
        ].map(row => (
          <div key={row.sku} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-[#374151] font-medium truncate max-w-[180px]">{row.sku}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-[#9CA3AF]">{row.stock} units</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${row.color}18`, color: row.color }}>{row.status}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
              <div className="h-full rounded-full"
                style={{ width: `${Math.min(100, (row.stock / 160) * 100)}%`, background: `linear-gradient(90deg, ${row.color}60, ${row.color})` }} />
            </div>
            <p className="text-[9px] text-[#9CA3AF] mt-0.5">{row.days > 0 ? `${row.days} days of stock remaining` : "Create shipment urgently"}</p>
          </div>
        ))}
      </div>
      <div className="mx-5 mb-4 p-3 rounded-xl flex items-center justify-between"
        style={{ background: "rgba(255,107,43,0.06)", border: `1px solid rgba(255,107,43,0.15)` }}>
        <div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">IPI Score</p>
          <p className="text-[18px] font-black" style={{ color: accentColor }}>680 / 800</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: glowOrange }}>
          <Package size={18} style={{ color: accentColor }} />
        </div>
      </div>
    </div>
  </div>
);

// ── Process steps ─────────────────────────────────────────────────────────────
const processSteps = [
  { num: "01", title: "Account Audit",          desc: "Full audit of your Seller Central or Vendor Central account — health metrics, suppressed listings, FBA inventory health, case history, and policy standing." },
  { num: "02", title: "Onboarding & Access",    desc: "Secure access via Amazon's authorised user system. We set up reporting dashboards and document all active ASINs, campaigns, and open cases." },
  { num: "03", title: "Issue Resolution",       desc: "All open suppressed listings, suspended ASINs, FBA discrepancies, and account health violations resolved in the first 2–4 weeks." },
  { num: "04", title: "Ongoing Management",     desc: "Day-to-day management: inventory monitoring, pricing, case handling, suppression fixes, PO management (VC), and weekly health check-ins." },
  { num: "05", title: "Monthly Review & Scale", desc: "Monthly performance report covering account health KPIs, inventory position, case outcomes, and next-month priorities — full visibility at all times." },
];

// ── Tool groups ───────────────────────────────────────────────────────────────
const toolGroups = [
  { label: "Seller Central", color: accentColor,  bg: glowOrange,  pills: ["Seller Central", "Vendor Central", "FBA Dashboard"] },
  { label: "Inventory",      color: accent2Color, bg: glowBlue,   pills: ["Inventory Planner", "Restock Pro", "FBA Toolkit"] },
  { label: "Analytics",      color: purpleColor,  bg: glowPurple, pills: ["Brand Analytics", "Search Query Perf.", "ARA Basic"] },
  { label: "Case & Comms",   color: "#F59E0B",    bg: "rgba(245,158,11,0.08)", pills: ["Seller Support", "Case Log Manager"] },
  { label: "Protection",     color: "#EC4899",    bg: "rgba(236,72,153,0.08)", pills: ["Brand Registry", "IP Alert", "Transparency"] },
];

// ── Approach ──────────────────────────────────────────────────────────────────
const approach = [
  "Secure access via Amazon's official authorised-user workflow — your account stays yours",
  "Account health maintained proactively, not reactively — alerts before metrics breach thresholds",
  "Every open case tracked and followed up weekly until resolved or reimbursed",
  "FBA inventory managed to prevent stockouts, IPI score drops, and long-term storage fees",
  "Policy compliance monitoring against Amazon's ever-changing seller policies",
  "Full monthly transparency report — health KPIs, case outcomes, and inventory position",
];

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  "Amazon account specialists — not generalist digital marketers",
  "Proactive account health monitoring before violations occur",
  "FBA reimbursement claims handled with full audit trail",
  "Brand Registry and IP violation handling in-house",
  "Suspension reinstatement experience across categories",
  "Full Seller Central workload off your plate, end to end",
];

// ── What we do ────────────────────────────────────────────────────────────────
const whatWeDo = [
  { Icon: Settings,       label: "Manage your Seller Central day to day" },
  { Icon: Shield,         label: "Protect your brand with Registry and IP alerts" },
  { Icon: Package,        label: "Keep FBA inventory healthy and IPI score high" },
  { Icon: ClipboardList,  label: "Resolve cases and recover FBA reimbursements" },
  { Icon: FileText,       label: "Handle account suspension and ASIN reinstatement" },
  { Icon: BarChart3,      label: "Report every month with full KPI visibility" },
];

// ── Stats bar ─────────────────────────────────────────────────────────────────
const stats = [
  { stat: "93%", label: "Account Health Stability", sub: "Within first quarter" },
  { stat: "2.4L+", label: "Avg FBA Reimbursed", sub: "Per account per year" },
  { stat: "48hr", label: "Case Response Time",  sub: "Avg seller support SLA" },
  { stat: "120+", label: "Accounts Managed",    sub: "India, UAE & international" },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What is included in full Amazon account management?",
    a: "Full account management covers everything in your Seller Central day-to-day: inventory monitoring, listing suppression fixes, pricing updates, FBA shipment planning, Seller Support case handling, account health monitoring, policy compliance, and a monthly performance review. The goal is to take the full Seller Central workload off your plate.",
  },
  {
    q: "Will I still have access to my Seller Central account?",
    a: "Yes, always. We work through Amazon's official secondary-user access — you retain full ownership and admin access to your account at all times. We never ask for primary login credentials.",
  },
  {
    q: "Can you manage Vendor Central accounts too?",
    a: "Yes. We manage both Seller Central and Vendor Central accounts. For Vendor Central, this includes PO acceptance management, chargeback dispute handling, ARA reporting, and content submissions through the VC portal.",
  },
  {
    q: "How do you handle Amazon account suspensions?",
    a: "We analyse the root cause, prepare a detailed Plan of Action (POA), and submit the appeal directly to Amazon's Seller Performance team. Our reinstatement process covers both full account suspensions and individual ASIN removals across all suspension reasons including inauthenticity, related account, and policy violation notices.",
  },
  {
    q: "Can you help recover FBA lost and damaged inventory reimbursements?",
    a: "Yes. We run regular FBA inventory reconciliation to identify lost, damaged, or miscounted units, then file all eligible reimbursement claims with supporting documentation. Most accounts are owed significant reimbursements that go unclaimed without proactive auditing.",
  },
  {
    q: "How long does it take to restore account health after a violation?",
    a: "Minor policy violations and suppressed listings can typically be resolved within 1–7 days. Full account suspensions vary significantly — simple cases can be reinstated within 2 weeks; complex reinstatements may take 4–8 weeks depending on the type of suspension and Amazon's response time.",
  },
  {
    q: "Do you work with new Amazon sellers or only established accounts?",
    a: "Both. We handle everything from first-time seller registration and FBA enrolment through to full ongoing management of large, multi-ASIN catalogues. The scope of management is tailored to your account size and complexity.",
  },
];

// ── Tab component ─────────────────────────────────────────────────────────────
const ServiceCardTabs = () => {
  const [activeTab, setActiveTab] = useState("setup");
  const tab = serviceTabs.find(t => t.key === activeTab)!;
  const cards = cardsByTab[activeTab];

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
            <Settings size={12} /> Account Management Services
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Everything Your Amazon Account Needs</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed">From seller registration to full ongoing management and suspension reinstatement — we run your Seller Central so you don't have to.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {serviceTabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={activeTab === t.key
                ? { background: t.gradient, color: "#fff", boxShadow: `0 4px 14px ${t.color}40` }
                : { background: "#F8FAFF", color: "#374151", border: "1.5px solid #E5E7EB" }}>
              {t.label}
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
                <h3 className="text-[15px] font-bold text-[#0A1628] mb-2">{card.title}</h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">{card.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}>{tag}</span>
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

const AccountAuditForm = () => {
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const captcha = useRef<RecaptchaHandle>(null);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", store: "", issue: "" });
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
      project: form.issue,
      message: `Amazon Store URL: ${form.store}\nMain Issue: ${form.issue}`,
      honeypot: String(fd.get("company_site") || ""),
      recaptchaToken: captchaToken || undefined,
    }, "amazon-account-management-form");
    setSubmitting(false);
    if (r.ok) {
      setSubmitted(true);
      captcha.current?.reset();
      track("lead_form_submit", { form_name: "amazon_account_management_form" });
      track("generate_lead", { form_name: "amazon_account_management_form", value: 1 });
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
      <p className="text-[#6B7280]">We'll review your Amazon account and get back to you within 24 hours.</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-bold text-[#0A1628] mb-1">Get a Free Account Audit</h3>
        <p className="text-sm text-[#6B7280] mb-4">Tell us about your account — we'll review it and reply within 24 hours.</p>
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
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone / WhatsApp *</label>
            <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Amazon Store URL or ASIN</label>
          <input name="store" value={form.store} onChange={handleChange} placeholder="https://amazon.in/your-store" className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Main Account Challenge *</label>
          <select name="issue" required value={form.issue} onChange={handleChange} className={inputClass + " cursor-pointer"}>
            <option value="" disabled>Select your main challenge...</option>
            <option>Setting up a new Amazon account</option>
            <option>Full ongoing account management</option>
            <option>Account health / suspension issue</option>
            <option>FBA inventory or reimbursement issues</option>
            <option>Brand Registry or IP protection</option>
            <option>Vendor Central management</option>
          </select>
        </div>
        <RecaptchaBox ref={captcha} />
        <input name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={submitting}
          className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
          Get My Free Account Audit <ArrowRight size={18} />
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
      <span data-cms-key={`amzn_acct_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span>
    </h3>
    <p className="mt-2 text-[15.5px] leading-relaxed text-[#4B5563]">
      <span data-cms-key={`amzn_acct_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span>
    </p>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const AmazonAccountManagementPage = () => {
  const sp = useSettings(["amzn_acct_hero_h1", "amzn_acct_hero_sub", "amzn_acct_cta_btn"]);

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
                  <ShoppingBag size={12} /> Amazon Seller Account Management
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
                <span data-cms-key="amzn_acct_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">
                  {sp.amzn_acct_hero_h1 || (<>Your Amazon Account, Managed<br />
                  <span style={{ color: accentColor }}>End to End by Specialists</span></>)}
                </span>
              </h1>
              <p className="text-lg text-[#4B5563] mb-4 leading-relaxed">
                <span data-cms-key="amzn_acct_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">
                  {sp.amzn_acct_hero_sub || "Full Seller Central management — registration, FBA inventory, case handling, account health monitoring, Brand Registry, and suspension reinstatement — all in one managed service."}
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Seller Central", "Vendor Central", "FBA Management", "Brand Registry", "Suspension Help", "Case Resolution"].map(tag => (
                  <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.25)` }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="#account-audit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 8px 24px rgba(255,107,43,0.4)` }}>
                  <span data-cms-key="amzn_acct_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">{sp.amzn_acct_cta_btn || "Get a Free Account Audit"}</span>
                  <ArrowRight size={15} />
                </Link>
                <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
                  style={{ borderColor: "#0A1628" }}>
                  Our Services
                </a>
              </div>
            </motion.div>
            {/* Right: illustration */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:flex justify-center items-center pt-6 pb-6">
              <AccountHealthIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem / Agency Comparison ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block"
                style={{ background: glowOrange, color: accentColor }}>
                The Real Cost of Unmanaged Amazon Accounts
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
                Most Sellers Lose Money in Their Amazon<br className="hidden md:block" />
                Account Without Knowing It.
              </h2>
              <p className="text-[#4B5563] leading-relaxed mb-8">
                FBA lost inventory goes unclaimed. Suppressed listings silently kill sales. Account health violations build until a suspension notice arrives. Without proactive management, most accounts bleed revenue that never shows up in a dashboard.
              </p>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Unmanaged Amazon Accounts Look Like
              </p>
              <div className="grid sm:grid-cols-1 gap-3 mb-8">
                {[
                  { pain: "FBA lost and damaged inventory never claimed", detail: "Sellers are owed ₹2–5L+ per year on average" },
                  { pain: "Suppressed ASINs sitting unnoticed for weeks", detail: "Silent revenue loss with no alert or notification" },
                  { pain: "Policy violations mounting until suspension notice", detail: "Account health declines gradually, then suddenly" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                    <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                      <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-5 py-4 border-l-4 flex items-start gap-3"
                style={{ background: glowOrange, borderLeftColor: accentColor }}>
                <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">
                  Amazon's Seller Support is not proactive. It won't tell you about lost inventory, suppressed listings, or rising ODR — you have to find and act on every issue yourself.
                </p>
              </div>
            </motion.div>
            {/* Right: illustration */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="hidden lg:flex justify-center">
              <InventoryIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tabbed Service Cards ── */}
      <div id="services-list">
        <ServiceCardTabs />
      </div>

      {/* ── Our Approach ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Our Account Management Approach
            </h2>
            <p className="text-[#6B7280] mt-2 text-sm max-w-lg">We manage proactively — fixing issues before they become crises and recovering revenue most sellers leave behind.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approach.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-[14px] text-[#374151]">{item}</span>
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
              <span className="w-4 h-0.5 rounded-full" style={{ background: accent2Color }} /> Tools & Platforms We Work With
            </h2>
            <p className="text-[#6B7280] mt-2 text-sm">Native Amazon tools and third-party platforms for account management and monitoring.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {toolGroups.map((g, i) => (
              <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}>{g.label}</p>
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

      {/* ── 5-Step Process ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-3 flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> How We Onboard and Manage Your Account
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
            </h2>
            <p className="text-[#4B5563] max-w-xl mx-auto text-sm">A five-step process from initial audit to full ongoing management.</p>
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
                    <h3 className="font-bold text-[#0A1628] text-base mb-1">{step.title}</h3>
                    <p className="text-[14px] text-[#4B5563] leading-relaxed">{step.desc}</p>
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
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Why Choose Digital Aura for Account Management
            </h2>
            <ul className="space-y-3">
              {whyUs.map(w => (
                <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                  <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                  <span className="text-[14.5px] text-[#374151]">{w}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accent2Color }} /> What We Handle for Your Account
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {whatWeDo.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: glowOrange }}>
                    <item.Icon size={15} style={{ color: accentColor }} />
                  </div>
                  <span className="text-[14.5px] text-[#374151]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: accentColor }}>{s.stat}</div>
                <div className="text-white font-bold text-sm mb-1">{s.label}</div>
                <div className="text-[#94A3B8] text-xs">{s.sub}</div>
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
              Frequently Asked Questions
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
      <section id="account-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #a86500 40%, #0A1628 100%)` }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">
                Free Amazon Account Audit
              </span>
              <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6">
                Find Out What Your Amazon Account<br />Is Costing You Without You Knowing
              </h2>
              <p className="text-white/80 text-lg mb-8">
                We'll audit your account health, FBA reimbursement claims, suppressed listings, and policy standing — then give you a clear action plan at no charge.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Account health and suspension risk assessment",
                  "FBA lost and damaged inventory reimbursement audit",
                  "Suppressed and inactive ASIN check",
                  "Policy violation and compliance review",
                  "Inventory position and IPI score review",
                ].map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-white shrink-0" />
                    <span className="text-white font-medium">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Users size={18} style={{ color: accentColor }} />
                </div>
                <div>
                  <p className="text-white text-xs italic">"They recovered ₹2.4L in FBA reimbursements in the first month — money we didn't even know was owed."</p>
                  <p className="text-white/70 text-[10px] mt-0.5">D2C Seller, Amazon India</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <AccountAuditForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(255,107,43,0.08) 0%, rgba(26,111,232,0.06) 40%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${accentColor}, #7C3AED, #1A6FE8)` }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: glowOrange, border: `1px solid rgba(255,107,43,0.3)`, color: accentColor }}>
              Let's Talk Account Management
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Ready to Take Seller Central<br />
              <span style={{ color: accentColor }}>Off Your Plate?</span>
            </h2>
            <p className="text-[#E2E8F0] mb-8 leading-relaxed">
              Book a free Amazon account audit. We'll review your current account health, identify revenue leaks, and show you exactly what full account management looks like for your brand.
            </p>
            <Link to="#account-audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 4px 20px rgba(255,107,43,0.4)` }}>
              Book My Free Account Audit <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <StickyCtaBar accent={accentColor} label="Get a free Amazon account audit" href="#account-audit" topic="amazon account management" />

    </PageLayout>
  );
};

export default AmazonAccountManagementPage;
