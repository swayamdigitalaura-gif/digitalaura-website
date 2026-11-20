/**
 * SERVICE PAGE — Amazon A+ Content & Storefront
 * Route: /services/amazon-aplus-content
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  Image as ImageIcon, FileText, Layers, Star, Shield, Zap, Users,
  Check, ArrowRight, CheckCircle2, PlusCircle, MinusCircle,
  Lock, Globe2, Award, Palette, Layout, Sparkles,
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
  // ── A+ Content Design ──
  {
    Icon: Layout,
    category: "A+ Content Design",
    color: accentColor,
    bg: glowOrange,
    title: "Premium A+ Content Modules",
    desc: "Custom A+ Content layouts using Amazon's approved module types — comparison charts, feature highlights, lifestyle imagery, and brand story sections — built to increase conversion rates by up to 20%.",
    tags: ["Module Design", "Comparison Charts", "Brand Story"],
  },
  {
    Icon: Palette,
    category: "A+ Content Design",
    color: accentColor,
    bg: glowOrange,
    title: "EBC-Ready Image Editing",
    desc: "Professional image enhancement for A+ Content compliance — proper sizing, pixel quality, infographic creation, hero images, and composite lifestyle shots that meet Amazon's strict content guidelines.",
    tags: ["Image Editing", "Infographics", "Lifestyle Shots"],
  },
  {
    Icon: Award,
    category: "A+ Content Design",
    color: accentColor,
    bg: glowOrange,
    title: "Brand Registry Content",
    desc: "Full Enhanced Brand Content services for Amazon Brand Registry holders — modernising plain FBA descriptions with educational, visually rich product pages that build buyer confidence and reduce returns.",
    tags: ["Brand Registry", "EBC", "FBA Listings"],
  },
  // ── Storefront Design ──
  {
    Icon: Globe2,
    category: "Storefront Design",
    color: accent2Color,
    bg: glowBlue,
    title: "Amazon Storefront Design",
    desc: "Custom Amazon Storefront pages that showcase your full brand catalogue — multi-page store structure, branded visuals, featured products, and navigation designed for maximum browse-to-purchase flow.",
    tags: ["Multi-Page Store", "Brand Catalogue", "Navigation UX"],
  },
  {
    Icon: ImageIcon,
    category: "Storefront Design",
    color: accent2Color,
    bg: glowBlue,
    title: "Visual Brand Identity",
    desc: "Cohesive brand identity across your entire Amazon presence — consistent colour palette, typography, photography style, and messaging that builds instant recognition and long-term customer loyalty.",
    tags: ["Brand Identity", "Consistency", "Photography"],
  },
  {
    Icon: Sparkles,
    category: "Storefront Design",
    color: accent2Color,
    bg: glowBlue,
    title: "Amazon Posts & Creative",
    desc: "Scroll-stopping Amazon Posts and sponsored brand creatives — designed to drive traffic from competitor listings to your storefront while reinforcing brand awareness across the marketplace.",
    tags: ["Amazon Posts", "Sponsored Brand", "Creative Ads"],
  },
  // ── Copy & Strategy ──
  {
    Icon: FileText,
    category: "Copy & Strategy",
    color: purpleColor,
    bg: glowPurple,
    title: "Conversion-Focused Copywriting",
    desc: "Attention-grabbing product descriptions that reflect your brand theme, analyse the product against competitors for unique selling points, and explain both what the product is and why buyers should choose it.",
    tags: ["USP Analysis", "Competitor Research", "Benefit Copy"],
  },
  {
    Icon: Shield,
    category: "Copy & Strategy",
    color: purpleColor,
    bg: glowPurple,
    title: "Amazon Policy Compliance",
    desc: "Every piece of content is verified against Amazon's current content guidelines — no prohibited claims, no policy violations, no suppression risk. Marketplace-compliant from submission through approval.",
    tags: ["Policy Check", "Compliance Audit", "No Suppressions"],
  },
  {
    Icon: Star,
    category: "Copy & Strategy",
    color: purpleColor,
    bg: glowPurple,
    title: "A+ Content Submission & Approval",
    desc: "End-to-end management of the A+ Content submission process — from asset preparation and module configuration through Amazon's review and approval, with revision handling if content is initially rejected.",
    tags: ["Submission", "Approval", "Revision Support"],
  },
];

const tabs = ["A+ Content Design", "Storefront Design", "Copy & Strategy"] as const;
type Tab = typeof tabs[number];

const tabMeta: Record<Tab, { color: string; gradient: string; bg: string; desc: string }> = {
  "A+ Content Design": { color: accentColor,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)`,   bg: glowOrange,  desc: "Rich visual content that converts" },
  "Storefront Design": { color: accent2Color, gradient: `linear-gradient(135deg,${accent2Color},#1558c0)`, bg: glowBlue,    desc: "Build your brand home on Amazon" },
  "Copy & Strategy":   { color: purpleColor,  gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",         bg: glowPurple,  desc: "Copy that tells your brand story" },
};

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { Icon: Palette,   color: accentColor,  title: "5,000+ A+ Content Designs",   desc: "Extensive experience across product categories — from FMCG to electronics — with a track record of content that consistently lifts conversion rates." },
  { Icon: Users,     color: accent2Color, title: "In-House Design Team",         desc: "No outsourcing. Our content writers, graphic designers, and project managers work under one roof — meaning faster turnaround and tighter brand consistency." },
  { Icon: Zap,       color: purpleColor,  title: "Amazon-Compliant Every Time",  desc: "We write and design to Amazon's current content guidelines — no keyword stuffing, no prohibited claims, no suppression risk. Approved first time, every time." },
  { Icon: Globe2,    color: accentColor,  title: "Any Budget, Any Brand Size",   desc: "From independent sellers launching their first A+ page to established brands refreshing a full catalogue — we have packages for every scale and budget." },
  { Icon: Shield,    color: accent2Color, title: "End-to-End Management",        desc: "From the first image edit to final A+ Content submission and approval — we handle every step, so you don't have to navigate Amazon's content portal." },
  { Icon: Star,      color: purpleColor,  title: "Dedicated Account Manager",   desc: "One point of contact who knows your products and your goals — no ticket queues, no handoffs, no explaining your brand brief twice." },
];

// ── Process steps ──────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "Brand & Product Discovery",   desc: "We review your brand guidelines, product range, existing content, and competitors to understand your positioning and identify what your A+ Content needs to communicate." },
  { n: "02", title: "Image Editing & Preparation", desc: "We enhance and resize all product images to EBC specifications — creating infographics, lifestyle composites, and hero shots that meet Amazon's pixel and format requirements." },
  { n: "03", title: "Content Creation",            desc: "Our copywriters craft attention-grabbing descriptions that reflect your brand theme, highlight USPs, and explain both what the product is and why buyers should choose it over alternatives." },
  { n: "04", title: "Design & Module Build",       desc: "We configure your A+ Content modules — comparison charts, feature highlights, brand story sections — and design your storefront pages to present a cohesive brand experience." },
  { n: "05", title: "Submission & Approval",       desc: "We submit your A+ Content through Seller Central and manage the approval process end-to-end, handling any Amazon revision requests until your content goes live." },
];

// ── FAQs ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    key: "amzn_aplus_faq_1",
    q: "What is A+ Content and who is it available to?",
    a: "A+ Content (formerly Enhanced Brand Content or EBC) is an Amazon feature that allows Brand Registry sellers to replace the standard product description with rich visual content — including images, comparison charts, and formatted text. It's available to all sellers enrolled in Amazon Brand Registry and has been shown to increase conversion rates by up to 20% according to Amazon's own data.",
  },
  {
    key: "amzn_aplus_faq_2",
    q: "How much does A+ Content increase conversions?",
    a: "Amazon's data shows A+ Content can lift conversions by up to 20% compared to a standard text description. The improvement varies by category and how well the content is designed — but even a modest 5–10% conversion lift has a compounding effect on both organic rank and PPC ACoS, since Amazon's A9 algorithm rewards listings with higher conversion rates with better organic placement.",
  },
  {
    key: "amzn_aplus_faq_3",
    q: "What is the difference between A+ Content and Amazon Storefront?",
    a: "A+ Content enhances the product detail page for individual ASINs — replacing the text description with rich visuals and copy. An Amazon Storefront is a multi-page branded destination that showcases your entire product catalogue and allows shoppers to browse all your products in one place. Both are available to Brand Registry sellers, and we can design and manage both for you.",
  },
  {
    key: "amzn_aplus_faq_4",
    q: "Do you handle the submission and approval process?",
    a: "Yes — end-to-end. We prepare all assets to Amazon's specifications, configure the A+ Content modules in your Seller Central account, submit for review, and handle any revision requests from Amazon's moderation team until your content is approved and live. You don't need to navigate the content portal at all.",
  },
  {
    key: "amzn_aplus_faq_5",
    q: "How long does it take to go live?",
    a: "The design and content creation process typically takes 5–10 business days depending on the number of ASINs and complexity of the brief. Amazon's review and approval process then takes 7 days on average. We manage the full timeline and keep you updated at every stage.",
  },
  {
    key: "amzn_aplus_faq_6",
    q: "Do I need to provide images and copy, or do you create everything?",
    a: "We create everything. Our in-house team handles all image editing and enhancement, infographic creation, lifestyle composites, and copywriting. You just need to provide your product, your brand guidelines (if you have them), and any existing product images. We take care of the rest.",
  },
  {
    key: "amzn_aplus_faq_7",
    q: "Can A+ Content work alongside listing optimisation and PPC?",
    a: "Absolutely — and the combination is significantly more powerful than any single service alone. A well-optimised listing drives organic traffic, A+ Content converts that traffic at a higher rate, and strong conversion rates in turn improve your PPC Quality Score and reduce ACoS. We offer all three services and regularly work on them together for clients with larger catalogues.",
  },
];

// ── SVG Illustrations ──────────────────────────────────────────────────────────
function APlusContentIllustration() {
  return (
    <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[420px]" aria-hidden="true">
      <rect width="420" height="320" rx="16" fill="#0D1E3A" />
      <rect x="0" y="0" width="420" height="44" rx="16" fill="#132035" />
      <rect x="16" y="14" width="10" height="10" rx="5" fill="#FF6B2B" opacity="0.9" />
      <text x="34" y="23" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">A+ Content Preview</text>
      <text x="330" y="23" fill="#22C55E" fontSize="10" fontFamily="system-ui">Live</text>
      <circle cx="324" cy="20" r="4" fill="#22C55E" opacity="0.5" />
      {/* Hero image block */}
      <rect x="16" y="56" width="190" height="110" rx="8" fill="#0A1628" />
      <rect x="16" y="56" width="190" height="110" rx="8" fill="url(#imgGrad)" opacity="0.6" />
      <text x="111" y="116" fill="#94A3B8" fontSize="10" fontFamily="system-ui" textAnchor="middle">Hero Image</text>
      <defs>
        <linearGradient id="imgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1A6FE8" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Feature tiles */}
      {[0,1].map(i => (
        <g key={i}>
          <rect x={214 + i * 102} y="56" width="90" height="50" rx="6" fill="#0A1628" />
          <rect x={214 + i * 102 + 8} y="66" width="20" height="20" rx="4" fill={i === 0 ? glowOrange : glowBlue} />
          <rect x={214 + i * 102 + 36} y="68" width="46" height="6" rx="3" fill="#1E3A5F" />
          <rect x={214 + i * 102 + 36} y="80" width="34" height="4" rx="2" fill="#132035" />
          <rect x={214 + i * 102} y="114" width="90" height="52" rx="6" fill="#0A1628" />
          <rect x={214 + i * 102 + 8} y="122" width="74" height="6" rx="3" fill="#1E3A5F" />
          <rect x={214 + i * 102 + 8} y="134" width="60" height="4" rx="2" fill="#132035" />
          <rect x={214 + i * 102 + 8} y="144" width="50" height="4" rx="2" fill="#132035" />
        </g>
      ))}
      {/* Comparison chart */}
      <rect x="16" y="178" width="388" height="62" rx="8" fill="#0A1628" />
      <text x="24" y="193" fill="#94A3B8" fontSize="9" fontFamily="system-ui">Comparison Chart</text>
      {["Feature A","Feature B","Feature C","Feature D"].map((f, i) => (
        <g key={f}>
          <text x={70 + i * 82} y="208" fill="#64748B" fontSize="8" fontFamily="system-ui" textAnchor="middle">{f}</text>
          <text x={70 + i * 82} y="228" fill={i < 2 ? "#22C55E" : "#94A3B8"} fontSize="12" fontFamily="system-ui" textAnchor="middle">{i < 2 ? "✓" : "—"}</text>
        </g>
      ))}
      {/* Stats row */}
      {[
        { x: 16,  label: "Conversion Lift", val: "+20%",   color: "#22C55E" },
        { x: 156, label: "Return Rate Drop", val: "−15%",   color: "#FF6B2B" },
        { x: 296, label: "Brand Searches",  val: "+34%",   color: "#1A6FE8" },
      ].map(({ x, label, val, color }) => (
        <g key={label}>
          <rect x={x} y="254" width="124" height="52" rx="8" fill="#0A1628" />
          <text x={x + 10} y="270" fill="#94A3B8" fontSize="9" fontFamily="system-ui">{label}</text>
          <text x={x + 10} y="290" fill={color} fontSize="15" fontFamily="system-ui" fontWeight="700">{val}</text>
        </g>
      ))}
    </svg>
  );
}

function StorefrontIllustration() {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[400px]" aria-hidden="true">
      <rect width="400" height="280" rx="16" fill="#0D1E3A" />
      <rect x="0" y="0" width="400" height="40" rx="16" fill="#132035" />
      <text x="16" y="25" fill="#E2E8F0" fontSize="11" fontFamily="system-ui" fontWeight="600">Amazon Storefront — Brand Traffic</text>
      {/* Nav bar */}
      <rect x="16" y="52" width="368" height="28" rx="6" fill="#0A1628" />
      {["Home","Our Story","Products","Deals"].map((t, i) => (
        <text key={t} x={30 + i * 82} y="71" fill={i === 0 ? "#FF6B2B" : "#64748B"} fontSize="9" fontFamily="system-ui" fontWeight={i === 0 ? "700" : "400"}>{t}</text>
      ))}
      {/* Hero banner */}
      <rect x="16" y="88" width="368" height="80" rx="8" fill="#0A1628" />
      <rect x="16" y="88" width="368" height="80" rx="8" fill="url(#storeGrad)" opacity="0.4" />
      <defs>
        <linearGradient id="storeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <text x="30" y="120" fill="#E2E8F0" fontSize="13" fontFamily="system-ui" fontWeight="700">Your Brand Story</text>
      <text x="30" y="136" fill="#94A3B8" fontSize="9" fontFamily="system-ui">Shoppers who visit your storefront convert 2× higher</text>
      {/* Product grid */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={16 + i * 92} y="180" width="80" height="86" rx="6" fill="#0A1628" />
          <rect x={16 + i * 92 + 8} y="188" width="64" height="44" rx="4" fill="#132035" />
          <rect x={16 + i * 92 + 8} y="238" width="40" height="6" rx="3" fill="#1E3A5F" />
          <rect x={16 + i * 92 + 8} y="250" width="28" height="5" rx="2" fill={i === 0 ? "#FF6B2B" : "#132035"} opacity={i === 0 ? "1" : "0.6"} />
        </g>
      ))}
      {/* Stat badges */}
      <rect x="16" y="274" width="80" height="0" rx="0" />
      {[
        { x: 16,  val: "2×",    label: "Higher CVR",    color: "#22C55E" },
        { x: 148, val: "+42%",  label: "Brand Traffic", color: "#FF6B2B" },
        { x: 280, val: "30%",   label: "Repeat Buyers", color: "#1A6FE8" },
      ].map(({ x, val, label, color }) => (
        <g key={label}>
          <text x={x} y="275" fill={color} fontSize="13" fontFamily="system-ui" fontWeight="700">{val}</text>
          <text x={x} y="285" fill="#64748B" fontSize="8" fontFamily="system-ui">{label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Lead form ──────────────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white focus:ring-[#FF6B2B]";

function APlusAuditForm() {
  const [form, setForm]     = useState({ name: "", business: "", email: "", phone: "", asin: "", brand_registered: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");
  const [token, setToken]   = useState("");
  const recaptchaRef        = useRef<RecaptchaHandle>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) { recaptchaRef.current?.execute(); return; }
    setStatus("loading");
    try {
      await submitLead({ ...form, source: "amazon-aplus-form", recaptchaToken: token });
      setStatus("ok");
      track("amazon_aplus_form_submit");
    } catch { setStatus("err"); }
  }

  if (status === "ok") return (
    <div className="rounded-2xl p-8 bg-white text-center py-10" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: glowOrange }}>
        <CheckCircle2 size={32} style={{ color: accentColor }} />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628] mb-2">Request Received!</h3>
      <p className="text-[#6B7280]">We'll be in touch within 24 hours with your free A+ Content consultation.</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <form onSubmit={submit} className="space-y-4">
        <h3 className="text-xl font-bold text-[#0A1628] mb-1">Get Your Free A+ Content Consultation</h3>
        <p className="text-sm text-[#6B7280] mb-4">Tell us about your brand and we'll show you exactly how A+ Content can lift your conversions.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Full Name *</label>
            <input required placeholder="Rahul Sharma" value={form.name} onChange={set("name")} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Business / Brand Name *</label>
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
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Are you enrolled in Amazon Brand Registry? *</label>
          <select required value={form.brand_registered} onChange={set("brand_registered")} className={inputClass + " cursor-pointer"}>
            <option value="" disabled>Select...</option>
            <option value="yes">Yes — I'm Brand Registered</option>
            <option value="no">No — not yet registered</option>
            <option value="unsure">Not sure / need help registering</option>
          </select>
        </div>
        <RecaptchaBox siteKey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} onToken={setToken} />
        {status === "err" && <p className="text-sm text-red-600">Something went wrong — please try again.</p>}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
          {status === "loading" ? "Sending…" : <><span>Get My Free A+ Content Consultation</span> <ArrowRight size={18} /></>}
        </button>
        <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
          <Lock size={12} /> 100% free — no credit card, no obligation
        </p>
      </form>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AmazonAPlusContentPage() {
  const s = useSettings(["amzn_aplus_hero_h1", "amzn_aplus_hero_sub", "amzn_aplus_cta_btn"]);
  const [activeTab, setActiveTab] = useState<Tab>("A+ Content Design");
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
                  <Layout size={12} /> Amazon A+ Content & Storefront
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
                <span data-cms-key="amzn_aplus_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">
                  {s.amzn_aplus_hero_h1 || (<>A+ Content That Builds<br />Brands & <span style={{ color: accentColor }}>Converts Buyers</span></>)}
                </span>
              </h1>
              <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                <span data-cms-key="amzn_aplus_hero_sub" data-cms-label="Hero Subtitle" data-cms-attr="text">
                  {s.amzn_aplus_hero_sub || "Premium Enhanced Brand Content, custom Amazon Storefronts, and Amazon-compliant creative — designed by an in-house team to tell your brand story and lift conversions by up to 20%."}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 8px 24px rgba(255,107,43,0.4)`, color: "#fff" }}>
                  <span data-cms-key="amzn_aplus_cta_btn">{s.amzn_aplus_cta_btn || "Get a Free A+ Content Audit"}</span>
                  <ArrowRight size={15} />
                </Link>
                <a href="#aplus-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all">
                  Talk to a Specialist
                </a>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E7EB]">
                {[
                  { val: "5,000+", label: "EBC designs delivered" },
                  { val: "20%",    label: "Avg conversion lift" },
                  { val: "48hr",   label: "Design turnaround" },
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
              <APlusContentIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem section ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="hidden lg:flex justify-center">
            <StorefrontIllustration />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: glowBlue, color: accent2Color, border: `1px solid rgba(26,111,232,0.3)` }}>
              <ImageIcon size={12} /> The Content Gap
            </div>
            <h2 className="text-3xl font-black text-[#0A1628] mb-5 leading-tight">
              A Plain Description Is Costing You Sales Every Day
            </h2>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              Most Amazon listings use a plain text description that tells buyers almost nothing about the brand behind the product. Without A+ Content, you're leaving up to 20% of your conversions on the table — and giving competitors with richer content pages a decisive edge at the moment buyers are deciding whether to click Add to Cart.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Plain text descriptions that fail to communicate your brand's quality and story",
                "No comparison charts — leaving buyers unable to quickly understand your advantages",
                "Missing lifestyle imagery that shows the product in real-world use",
                "No storefront — sending all brand traffic straight to competitor listings",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#4B5563]">
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent2Color }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#6B7280] leading-relaxed">
              We fix this with premium A+ Content design, compelling copy, and a branded storefront — turning your product detail page into a conversion-optimised brand experience.
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
              <Layout size={12} /> Our Services
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Our Complete A+ Content & Storefront Services</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed">From image editing and EBC design through storefront build and submission management — everything your brand needs to stand out on Amazon.</p>
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
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Why Choose Digital Aura for A+ Content?</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px]">An in-house team that handles everything — design, copy, and submission — so your brand content goes live without delays.</p>
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
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">From First Brief to Live A+ Content</h2>
            <p className="text-[#6B7280] text-[15px]">A structured five-step process from discovery through submission and approval.</p>
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
            { val: "5,000+", label: "EBC designs delivered",    color: accentColor },
            { val: "20%",    label: "Avg conversion lift",      color: accent2Color },
            { val: "15%",    label: "Avg return rate drop",     color: purpleColor },
            { val: "48hr",   label: "Design turnaround",        color: accentColor },
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
      <section id="aplus-form" className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
              <Layout size={12} /> Free Consultation
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Get Your Free A+ Content Consultation</h2>
            <p className="text-[#6B7280] text-[15px]">Tell us about your brand and we'll show you exactly how A+ Content can lift your conversions — no obligation.</p>
          </div>
          <APlusAuditForm />
        </div>
      </section>

      <StickyCtaBar
        headline="Your product page is losing buyers to better-looking listings."
        sub="Get a free A+ Content consultation and see the difference design makes."
        cta="Get Free Consultation"
        href="/contact"
        accent={accentColor}
      />
    </PageLayout>
  );
}
