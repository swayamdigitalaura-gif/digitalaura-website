/**
 * SERVICE PAGE — Amazon Storefront Design
 * Route: /services/amazon-storefront-design
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  Layout, Image as ImageIcon, Layers, Star, Shield, Zap, Users,
  Check, ArrowRight, CheckCircle2, PlusCircle, MinusCircle,
  Palette, Globe2, Sparkles, FileText, Award, Monitor,
} from "lucide-react";
import { useState, useRef } from "react";
import { RecaptchaBox, type RecaptchaHandle } from "@/components/RecaptchaBox";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";

const accentColor  = "#FF6B2B";
const blueColor    = "#1A6FE8";
const purpleColor  = "#7C3AED";
const glowOrange   = "rgba(255,107,43,0.10)";
const glowBlue     = "rgba(26,111,232,0.08)";
const glowPurple   = "rgba(124,58,237,0.08)";

// ── Service card data by tab ───────────────────────────────────────────────────
const serviceCards = [
  // ── Store Design ──
  {
    Icon: Layout,
    category: "Store Design",
    color: accentColor,
    bg: glowOrange,
    title: "Custom Multi-Page Store Architecture",
    desc: "Beautifully structured Amazon Storefronts with dedicated pages for every product category — Home, Our Story, Products, and Deals — designed so browsers become buyers without confusion.",
    tags: ["Multi-Page", "Navigation UX", "Category Pages"],
  },
  {
    Icon: Palette,
    category: "Store Design",
    color: accentColor,
    bg: glowOrange,
    title: "Brand-Consistent Visual Identity",
    desc: "Every page, banner, and tile built to your brand guidelines — consistent colour palette, typography, photography style, and tone of voice that make shoppers instantly recognise your brand.",
    tags: ["Brand Guidelines", "Typography", "Colour System"],
  },
  {
    Icon: ImageIcon,
    category: "Store Design",
    color: accentColor,
    bg: glowOrange,
    title: "Hero Banners & Lifestyle Imagery",
    desc: "High-impact hero banners and lifestyle photography that capture attention in the first scroll — professionally edited images sized to Amazon's exact storefront specifications for a flawless presentation.",
    tags: ["Hero Banners", "Lifestyle Shots", "Image Editing"],
  },
  // ── Brand Content ──
  {
    Icon: FileText,
    category: "Brand Content",
    color: blueColor,
    bg: glowBlue,
    title: "Amazon Brand Story Section",
    desc: "A compelling brand story module on every product detail page — connecting your storefront to your listings and reinforcing why customers should choose your brand over cheaper alternatives.",
    tags: ["Brand Story", "Listing Connection", "Trust Building"],
  },
  {
    Icon: Sparkles,
    category: "Brand Content",
    color: blueColor,
    bg: glowBlue,
    title: "Amazon Posts Creative",
    desc: "Scroll-stopping Amazon Posts and sponsored brand creatives designed to drive traffic from competitor listings to your storefront — reinforcing brand awareness across the marketplace at zero media cost.",
    tags: ["Amazon Posts", "Sponsored Brand", "Free Traffic"],
  },
  {
    Icon: Globe2,
    category: "Brand Content",
    color: blueColor,
    bg: glowBlue,
    title: "Social-to-Storefront Integration",
    desc: "Align your off-Amazon social presence with your storefront — consistent messaging, re-usable creative assets, and tracking links so you can measure exactly how much traffic social media sends to your Amazon brand hub.",
    tags: ["Social Ads", "Traffic Tracking", "Cross-Channel"],
  },
  // ── Growth Strategy ──
  {
    Icon: Zap,
    category: "Growth Strategy",
    color: purpleColor,
    bg: glowPurple,
    title: "Storefront Traffic Strategy",
    desc: "Sponsored Brand and Sponsored Display campaigns that point directly to your storefront — driving branded searches, reducing competitor conquest, and building the kind of shopper loyalty that lowers long-term ACoS.",
    tags: ["Sponsored Brand", "PPC Strategy", "Loyalty Traffic"],
  },
  {
    Icon: Star,
    category: "Growth Strategy",
    color: purpleColor,
    bg: glowPurple,
    title: "Product Catalogue Optimisation",
    desc: "Strategic product placement within your storefront — featuring bestsellers prominently, cross-selling complementary products, and designing bundle displays that increase average order value.",
    tags: ["Cross-Sell", "Product Placement", "AOV Boost"],
  },
  {
    Icon: Shield,
    category: "Growth Strategy",
    color: purpleColor,
    bg: glowPurple,
    title: "Ongoing Refresh & Maintenance",
    desc: "Seasonal storefront updates, new product launches, promotional tile swaps, and regular performance reviews — your brand hub stays current, compelling, and conversion-optimised year-round.",
    tags: ["Seasonal Updates", "Launch Support", "Performance Review"],
  },
];

const tabs = ["Store Design", "Brand Content", "Growth Strategy"] as const;
type Tab = typeof tabs[number];

const tabMeta: Record<Tab, { color: string; gradient: string; bg: string; desc: string }> = {
  "Store Design":     { color: accentColor,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)`,  bg: glowOrange, desc: "Build a brand home that converts" },
  "Brand Content":    { color: blueColor,    gradient: `linear-gradient(135deg,${blueColor},#1558c0)`,    bg: glowBlue,   desc: "Tell your story, build loyalty" },
  "Growth Strategy":  { color: purpleColor,  gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",         bg: glowPurple, desc: "Drive traffic, grow repeat buyers" },
};

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { Icon: Palette,   color: accentColor,  title: "In-House Design Team",         desc: "No outsourcing, no delays. Our designers, copywriters, and project managers all work together — giving you a faster turnaround and a tighter, more consistent brand experience." },
  { Icon: Users,     color: blueColor,    title: "Amazon Brand Registry Experts", desc: "Every storefront feature — Posts, Brand Story, Sponsored Brands — requires Brand Registry navigation. We handle the portal so you can focus on growing your business." },
  { Icon: Zap,       color: purpleColor,  title: "Conversion-First Design",       desc: "Every layout decision is made for conversion, not just aesthetics. Product placement, navigation depth, and tile hierarchy are all tested against what actually drives purchases." },
  { Icon: Globe2,    color: accentColor,  title: "Cross-Channel Brand Alignment", desc: "Your Amazon storefront and your off-Amazon presence — social, website, email — are designed to reinforce each other so shoppers recognise your brand everywhere they see it." },
  { Icon: Shield,    color: blueColor,    title: "Policy-Safe Content Always",    desc: "Every asset, banner, and copy block is checked against Amazon's current storefront guidelines before submission — no violations, no take-downs, no scramble to fix a live store." },
  { Icon: Star,      color: purpleColor,  title: "Dedicated Account Manager",    desc: "One point of contact who knows your brand, your products, and your goals — no ticket queues, no handoffs, no explaining your brief three times to three different people." },
];

// ── Process steps ──────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "Brand Discovery & Audit",         desc: "We review your brand guidelines, existing listings, A+ Content, social presence, and competitors to understand your positioning and define what your storefront needs to communicate." },
  { n: "02", title: "Store Architecture Planning",     desc: "We map out the page structure — categories, navigation, featured products, deals sections — and create a wireframe of the full storefront before a pixel of design work begins." },
  { n: "03", title: "Design & Asset Creation",         desc: "Our designers build every banner, tile, and lifestyle image to Amazon's exact pixel specifications and your brand guidelines — from hero banners to product category headers." },
  { n: "04", title: "Brand Story & Copy",              desc: "We write and design your Brand Story module, storefront copy, and Amazon Posts creatives — all consistent in tone, messaging, and visual style with the rest of your brand." },
  { n: "05", title: "Build, Submit & Go Live",         desc: "We build the store page by page inside Amazon Brand Registry, submit for review, handle any revision requests, and confirm everything is live and rendering correctly on mobile and desktop." },
];

// ── FAQs ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    key: "amzn_sf_faq_1",
    q: "What is an Amazon Storefront and who can have one?",
    a: "An Amazon Storefront (also called an Amazon Store or Brand Store) is a free, multi-page branded destination within Amazon that showcases your entire product catalogue. It's available exclusively to sellers enrolled in Amazon Brand Registry. Unlike product detail pages, a storefront lets you control the navigation, layout, imagery, and messaging — giving you a true brand hub inside the marketplace.",
  },
  {
    key: "amzn_sf_faq_2",
    q: "How does a storefront actually drive more sales?",
    a: "A well-designed storefront works in several ways: Sponsored Brand Ads can point directly to your store (instead of a single ASIN), giving shoppers a full catalogue view that increases basket size. Shoppers who land on your store are on your 'turf' with no competitor listings nearby, which removes one of the biggest reasons they leave Amazon without buying from you. It also signals brand trust — a branded presence converts better than a plain listing page.",
  },
  {
    key: "amzn_sf_faq_3",
    q: "What's the difference between an Amazon Storefront and A+ Content?",
    a: "A+ Content (Enhanced Brand Content) enhances the product detail page for individual ASINs — replacing the standard description with rich visuals and copy. An Amazon Storefront is a separate, multi-page branded destination showcasing your entire catalogue. Both are available to Brand Registry sellers, they serve different purposes, and they work best together — A+ Content converts on the listing page, the Storefront builds brand loyalty and basket size.",
  },
  {
    key: "amzn_sf_faq_4",
    q: "How long does it take to design and launch a storefront?",
    a: "The design and build process typically takes 7–14 business days depending on the number of pages, products featured, and complexity of the brief. Amazon's review and approval process then takes 3–5 business days. We manage the full timeline and keep you updated at every stage — you'll know exactly where your storefront is in the process without having to chase us.",
  },
  {
    key: "amzn_sf_faq_5",
    q: "Do I need to provide images and copy, or do you create everything?",
    a: "We create everything. Our team handles all design, image editing, lifestyle composites, banner creation, copywriting, and brand story modules. You just need to provide your brand guidelines (if you have them), your product range, and any existing photography you'd like us to work with. We take it from there.",
  },
  {
    key: "amzn_sf_faq_6",
    q: "Will you update the storefront after launch — for new products or seasonal promotions?",
    a: "Yes. We offer ongoing refresh and maintenance retainers specifically for this. Seasonal banner swaps, new product launches, promotional tiles, and post-peak reviews are all part of keeping a storefront performing at its best year-round. A storefront that hasn't been updated in 12 months is a missed opportunity — we make sure yours stays current and compelling.",
  },
  {
    key: "amzn_sf_faq_7",
    q: "Can a storefront help reduce our dependence on Amazon PPC?",
    a: "Over time, yes. A strong storefront attracts branded organic traffic — shoppers who search directly for your brand name. Amazon Posts (which are free) drive additional traffic to your store from competitor listings and category feeds. A well-structured storefront also supports Sponsored Brand Video and Sponsored Display campaigns more efficiently, since the destination page is more persuasive than a single ASIN. The long-term goal is a healthier ACoS and more repeat buyers.",
  },
];

// ── SVG Illustrations ──────────────────────────────────────────────────────────
function StorefrontHeroIllustration() {
  return (
    <svg viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[460px]" aria-hidden="true">
      {/* Device frame */}
      <rect width="460" height="320" rx="16" fill="#F8FAFF" />
      <rect x="1" y="1" width="458" height="318" rx="15" stroke="#E5E7EB" strokeWidth="1" />
      {/* Amazon nav bar */}
      <rect x="0" y="0" width="460" height="40" rx="16" fill="#232F3E" />
      <rect x="0" y="30" width="460" height="10" fill="#232F3E" />
      {/* Amazon logo area */}
      <rect x="14" y="11" width="44" height="18" rx="3" fill="#FF9900" opacity="0.9" />
      <text x="36" y="23" fill="#232F3E" fontSize="9" fontFamily="system-ui" fontWeight="800" textAnchor="middle">amazon</text>
      {/* Search bar */}
      <rect x="68" y="12" width="260" height="16" rx="4" fill="white" />
      <text x="78" y="23" fill="#9CA3AF" fontSize="8" fontFamily="system-ui">Search brand store...</text>
      {/* Cart + profile icons */}
      <circle cx="358" cy="20" r="8" fill="rgba(255,255,255,0.1)" />
      <circle cx="380" cy="20" r="8" fill="rgba(255,255,255,0.1)" />
      <circle cx="402" cy="20" r="8" fill="rgba(255,255,255,0.1)" />
      {/* Store nav pills */}
      <rect x="14" y="48" width="432" height="24" rx="0" fill="#F8FAFF" />
      {[
        { label: "Home", active: true, x: 20 },
        { label: "Our Story", active: false, x: 76 },
        { label: "Products", active: false, x: 148 },
        { label: "Deals", active: false, x: 214 },
        { label: "New Arrivals", active: false, x: 258 },
      ].map(({ label, active, x }) => (
        <g key={label}>
          <text x={x} y={64} fill={active ? accentColor : "#6B7280"} fontSize="8" fontFamily="system-ui" fontWeight={active ? "700" : "400"}>{label}</text>
          {active && <rect x={x} y="68" width={label.length * 5} height="2" rx="1" fill={accentColor} />}
        </g>
      ))}
      {/* Hero banner area */}
      <rect x="14" y="78" width="432" height="90" rx="8" fill="#0A1628" />
      {/* Gradient overlay on hero */}
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1A6FE8" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="14" y="78" width="432" height="90" rx="8" fill="url(#heroGrad)" />
      <text x="30" y="104" fill="white" fontSize="7" fontFamily="system-ui" fontWeight="600" opacity="0.7">YOUR BRAND</text>
      <text x="30" y="118" fill="white" fontSize="13" fontFamily="system-ui" fontWeight="800">Premium Brand Store</text>
      <text x="30" y="130" fill="white" fontSize="8" fontFamily="system-ui" opacity="0.8">Discover our full collection →</text>
      <rect x="30" y="138" width="60" height="18" rx="4" fill={accentColor} />
      <text x="60" y="150" fill="white" fontSize="7" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Shop Now</text>
      {/* Product image mockup on hero */}
      <rect x="330" y="84" width="100" height="78" rx="6" fill="rgba(255,255,255,0.1)" />
      <rect x="345" y="96" width="70" height="52" rx="4" fill="rgba(255,255,255,0.15)" />
      <text x="380" y="126" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="system-ui" textAnchor="middle">📦</text>
      {/* Product card row */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={14 + i * 110} y="178" width="100" height="90" rx="6" fill="white" />
          <rect x={14 + i * 110 + 1} y="179" width="98" height="88" rx="5" stroke="#E5E7EB" strokeWidth="1" />
          <rect x={14 + i * 110 + 8} y="186" width="84" height="52" rx="4" fill="#F3F4F6" />
          <rect x={14 + i * 110 + 24} y="200" width="52" height="24" rx="3" fill="#E5E7EB" />
          <text x={14 + i * 110 + 50} y="215" fill="#9CA3AF" fontSize="10" fontFamily="system-ui" textAnchor="middle">📷</text>
          <rect x={14 + i * 110 + 8} y="244" width="60" height="5" rx="2" fill="#E5E7EB" />
          <rect x={14 + i * 110 + 8} y="253" width="40" height="5" rx="2" fill={i === 0 ? glowOrange : "#F3F4F6"} />
          {i === 0 && <text x={14 + i * 110 + 8} y="258" fill={accentColor} fontSize="7" fontFamily="system-ui" fontWeight="700">★ Best Seller</text>}
        </g>
      ))}
      {/* Stats strip */}
      <rect x="14" y="276" width="432" height="32" rx="6" fill="#FFF7F3" />
      {[
        { x: 40,  label: "Store Followers", val: "+180%", color: accentColor },
        { x: 190, label: "Repeat Buyers",   val: "+42%",  color: blueColor },
        { x: 330, label: "Avg Order Value", val: "+28%",  color: purpleColor },
      ].map(({ x, label, val, color }) => (
        <g key={label}>
          <text x={x} y="289" fill="#6B7280" fontSize="7" fontFamily="system-ui">{label}</text>
          <text x={x} y="301" fill={color} fontSize="9" fontFamily="system-ui" fontWeight="700">{val}</text>
        </g>
      ))}
    </svg>
  );
}

function StorefrontAuditIllustration() {
  const metrics = [
    { label: "Store Navigation",   pct: 92, color: accentColor },
    { label: "Visual Consistency",  pct: 88, color: blueColor },
    { label: "Product Placement",  pct: 76, color: purpleColor },
    { label: "Brand Story",        pct: 65, color: "#F59E0B" },
    { label: "Mobile Experience",  pct: 83, color: "#22C55E" },
  ];
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[360px]" aria-hidden="true">
      <rect width="360" height="280" rx="14" fill="white" />
      <rect x="0.5" y="0.5" width="359" height="279" rx="13.5" stroke="#E5E7EB" />
      {/* Header */}
      <rect x="0" y="0" width="360" height="44" rx="14" fill="#FFF7F3" />
      <rect x="0" y="30" width="360" height="14" fill="#FFF7F3" />
      <circle cx="22" cy="22" r="10" fill={accentColor} opacity="0.15" />
      <text x="22" y="26" fill={accentColor} fontSize="11" fontFamily="system-ui" fontWeight="700" textAnchor="middle">S</text>
      <text x="40" y="20" fill="#0A1628" fontSize="10" fontFamily="system-ui" fontWeight="700">Storefront Health Score</text>
      <text x="40" y="32" fill="#6B7280" fontSize="8" fontFamily="system-ui">Live audit · Your brand store</text>
      {/* Score badge */}
      <circle cx="316" cy="22" r="20" fill={accentColor} opacity="0.1" />
      <text x="316" y="18" fill={accentColor} fontSize="14" fontFamily="system-ui" fontWeight="800" textAnchor="middle">82</text>
      <text x="316" y="29" fill="#6B7280" fontSize="7" fontFamily="system-ui" textAnchor="middle">/ 100</text>
      {/* Metric bars */}
      {metrics.map(({ label, pct, color }, i) => (
        <g key={label}>
          <text x="16" y={62 + i * 42} fill="#374151" fontSize="9" fontFamily="system-ui" fontWeight="600">{label}</text>
          <text x="344" y={62 + i * 42} fill={color} fontSize="9" fontFamily="system-ui" fontWeight="700" textAnchor="end">{pct}%</text>
          <rect x="16" y={67 + i * 42} width="328" height="8" rx="4" fill="#F3F4F6" />
          <rect x="16" y={67 + i * 42} width={328 * pct / 100} height="8" rx="4" fill={color} opacity="0.8" />
        </g>
      ))}
      {/* CTA strip */}
      <rect x="16" y="258" width="328" height="12" rx="4" fill={glowOrange} />
      <text x="180" y="267" fill={accentColor} fontSize="8" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Get your free storefront audit →</text>
    </svg>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────────
function StorefrontAuditForm() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", asin: "", marketplace: "Amazon UK" });
  const [status, setStatus] = useState<"idle"|"sending"|"done"|"error">("idle");
  const recaptchaRef = useRef<RecaptchaHandle>(null);

  const inputCls = "w-full rounded-lg px-4 py-3 text-sm bg-[#F8FAFF] border border-[#E5E7EB] text-[#0A1628] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const token = recaptchaRef.current?.getToken() ?? "";
    const ok = await submitLead({ ...form, recaptchaToken: token, source: "amazon-storefront-design-form" });
    setStatus(ok ? "done" : "error");
    if (!ok) recaptchaRef.current?.reset();
  }

  if (status === "done") return (
    <div className="rounded-2xl p-10 text-center border border-[#E5E7EB] bg-white">
      <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: accentColor }} />
      <p className="text-xl font-bold text-[#0A1628]">Storefront Audit Request Sent!</p>
      <p className="text-[#4B5563] mt-2 text-sm">We'll review your brand and send your free storefront audit within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-6 md:p-8 shadow-sm border border-[#E5E7EB] bg-white space-y-4">
      <h3 className="text-xl font-bold text-[#0A1628]">Get Your Free Storefront Audit</h3>
      <p className="text-sm text-[#4B5563]">We'll review your existing store (or design a strategy if you don't have one yet) and show you exactly what's costing you sales.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputCls} placeholder="Your Name *" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        <input className={inputCls} placeholder="Business / Brand Name *" required value={form.business} onChange={e => setForm(f => ({...f, business: e.target.value}))} />
        <input type="email" className={inputCls} placeholder="Email Address *" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        <input type="tel" className={inputCls} placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
        <input className={inputCls} placeholder="Primary ASIN (optional)" value={form.asin} onChange={e => setForm(f => ({...f, asin: e.target.value}))} />
        <select className={inputCls} value={form.marketplace} onChange={e => setForm(f => ({...f, marketplace: e.target.value}))}>
          {["Amazon UK","Amazon US","Amazon DE","Amazon IN","Amazon CA","Amazon AU"].map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <RecaptchaBox ref={recaptchaRef} />
      {status === "error" && <p className="text-red-500 text-sm">Something went wrong — please try again.</p>}
      <button type="submit" disabled={status === "sending"}
        className="w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-50"
        style={{ background: `linear-gradient(135deg,${accentColor},#e85a1a)` }}>
        {status === "sending" ? "Sending…" : <><span>Request Free Storefront Audit</span><ArrowRight size={16}/></>}
      </button>
    </form>
  );
}

// ── Main page component ────────────────────────────────────────────────────────
export default function AmazonStorefrontDesignPage() {
  const s = useSettings(["amzn_sf_hero_h1","amzn_sf_hero_sub","amzn_sf_cta_btn"]);
  const [activeTab, setActiveTab] = useState<Tab>("Store Design");
  const [openFaq, setOpenFaq] = useState<string|null>(null);

  const visibleCards = serviceCards.filter(c => c.category === activeTab);
  const meta = tabMeta[activeTab];

  return (
    <PageLayout>
      <StickyCtaBar accent={accentColor} label="Get Free Storefront Audit" href="#storefront-audit-form" topic="Amazon Storefront Design" />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16" style={{ background: "white" }}>
        {/* glow blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: `radial-gradient(circle,${accentColor},transparent)`, filter: "blur(80px)" }} />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: `radial-gradient(circle,${blueColor},transparent)`, filter: "blur(80px)" }} />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
              style={{ background: glowOrange, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <span>Amazon Marketing Services</span>
            </div>
            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6 leading-tight"
              data-cms-key="amzn_sf_hero_h1">
              {s.amzn_sf_hero_h1 || <>Amazon <span style={{ color: accentColor }}>Storefront</span> Design<br />That Builds Brands</>}
            </h1>
            <p className="text-lg text-[#4B5563] mb-8 leading-relaxed" data-cms-key="amzn_sf_hero_sub">
              {s.amzn_sf_hero_sub || "Turn your Amazon presence into a true brand destination — multi-page store design, visual identity, and content strategy that converts browsers into loyal buyers."}
            </p>
            {/* stat chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { val: "+180%", label: "Store Followers" },
                { val: "+42%",  label: "Repeat Buyers" },
                { val: "+28%",  label: "Avg Order Value" },
                { val: "5–14d", label: "Launch Timeline" },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-xl px-4 py-2 text-center border border-[#E5E7EB] bg-[#F8FAFF]">
                  <p className="text-lg font-extrabold" style={{ color: accentColor }}>{val}</p>
                  <p className="text-[11px] text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="#storefront-audit-form"
                className="px-8 py-4 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition hover:opacity-90"
                style={{ background: `linear-gradient(135deg,${accentColor},#e85a1a)` }}
                onClick={() => track("cta_click", { page: "amazon-storefront-design", cta: "hero_primary" })}>
                Get Free Storefront Audit <ArrowRight size={16} />
              </a>
              <Link to="/services/amazon-marketing"
                className="px-8 py-4 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition hover:bg-[#F8FAFF] text-[#0A1628] border-[#E5E7EB]">
                View All Amazon Services
              </Link>
            </div>
          </div>
          {/* Illustration */}
          <div className="flex justify-center">
            <StorefrontHeroIllustration />
          </div>
        </div>
      </section>

      {/* ── SERVICES TABS ─────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>What We Do</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">Storefront Services</h2>
            <p className="text-[#4B5563] mt-3 max-w-2xl mx-auto">From first wireframe to live storefront — every element designed, written, and built to reflect your brand and maximise conversions.</p>
          </div>
          {/* Tab pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map(tab => {
              const m = tabMeta[tab];
              const active = tab === activeTab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={active
                    ? { background: m.gradient, color: "white", boxShadow: `0 4px 12px ${m.color}40` }
                    : { background: "white", color: "#374151", border: "1px solid #E5E7EB" }}>
                  {tab}
                </button>
              );
            })}
          </div>
          {/* Tab description */}
          <div className="text-center mb-8">
            <p className="text-sm font-medium" style={{ color: meta.color }}>{meta.desc}</p>
          </div>
          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleCards.map(({ Icon, title, desc, tags, color, bg }) => (
                <div key={title} className="rounded-2xl p-6 border border-[#E5E7EB] bg-white hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="font-bold text-[#0A1628] mb-2">{title}</h3>
                  <p className="text-sm text-[#4B5563] mb-4 leading-relaxed">{desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(tag => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: bg, color }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Why DigitalAura</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">What Makes Us Different</h2>
            <p className="text-[#4B5563] mt-3 max-w-2xl mx-auto">We don't just make storefronts look good. We build brand destinations that drive real, measurable results.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ Icon, color, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 border border-[#E5E7EB] bg-[#F8FAFF]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}15` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-bold text-[#0A1628] mb-1">{title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STOREFRONT AUDIT ILLUSTRATION ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accentColor }}>Free Storefront Audit</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628] mb-5">We Audit Your Store<br />Before We Design It</h2>
              <p className="text-[#4B5563] mb-6 leading-relaxed">
                Every engagement starts with a free storefront health audit. We review your navigation, visual consistency, product placement, brand story, and mobile experience — then show you exactly what's costing you sales before we start designing.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Store navigation & page architecture",
                  "Visual consistency & brand alignment",
                  "Product placement & catalogue structure",
                  "Brand Story & A+ Content integration",
                  "Mobile responsiveness & image quality",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#374151]">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#storefront-audit-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition hover:opacity-90"
                style={{ background: `linear-gradient(135deg,${accentColor},#e85a1a)` }}>
                Get Your Free Audit <ArrowRight size={15} />
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <StorefrontAuditIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>How It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">From Brief to Live Store</h2>
            <p className="text-[#4B5563] mt-3 max-w-xl mx-auto">Our proven 5-step process takes your brand from discovery to a fully live Amazon Storefront — typically in under 3 weeks.</p>
          </div>
          <div className="relative">
            {/* connector line */}
            <div className="hidden lg:block absolute top-8 left-[11%] right-[11%] h-px" style={{ background: `linear-gradient(90deg,${accentColor}40,${blueColor}40,${purpleColor}40)` }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map(({ n, title, desc }, i) => {
                const stepColor = [accentColor, accentColor, blueColor, blueColor, purpleColor][i];
                return (
                  <div key={n} className="relative text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                      style={{ background: `${stepColor}15`, border: `2px solid ${stepColor}30` }}>
                      <span className="text-xl font-extrabold" style={{ color: stepColor }}>{n}</span>
                    </div>
                    <h3 className="font-bold text-[#0A1628] mb-2 text-sm">{title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>FAQ</p>
            <h2 className="text-3xl font-extrabold text-[#0A1628]">Storefront Design FAQs</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ key, q, a }) => {
              const open = openFaq === key;
              return (
                <div key={key} className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
                  <button className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    onClick={() => setOpenFaq(open ? null : key)}>
                    <span className="font-semibold text-[#0A1628] text-sm">{q}</span>
                    {open
                      ? <MinusCircle size={18} className="shrink-0" style={{ color: accentColor }} />
                      : <PlusCircle size={18} className="shrink-0 text-[#9CA3AF]" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm text-[#4B5563] leading-relaxed">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORM ──────────────────────────────────────────────────────────────── */}
      <section id="storefront-audit-form" className="py-20" style={{ background: "white" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Free Audit</p>
            <h2 className="text-3xl font-extrabold text-[#0A1628]">Request Your Free Storefront Audit</h2>
            <p className="text-[#4B5563] mt-2">Tell us about your brand and we'll review your storefront (or build a strategy from scratch) within 24 hours.</p>
          </div>
          <StorefrontAuditForm />
        </div>
      </section>

      {/* ── RELATED SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Amazon Marketing</p>
            <h2 className="text-2xl font-extrabold text-[#0A1628]">Complete Amazon Growth Stack</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Amazon Marketing",          href: "/services/amazon-marketing",            color: accentColor },
              { label: "PPC Management",            href: "/services/amazon-ppc",                  color: blueColor },
              { label: "Listing Optimisation",      href: "/services/amazon-listing-optimisation", color: purpleColor },
              { label: "A+ Content",                href: "/services/amazon-aplus-content",        color: accentColor },
              { label: "Ranking Strategies",        href: "/services/amazon-ranking-strategies",   color: blueColor },
              { label: "SEO Consultant",            href: "/services/amazon-seo-consultant",       color: purpleColor },
            ].map(({ label, href, color }) => (
              <Link key={label} to={href}
                className="rounded-xl p-3 text-center text-xs font-semibold border border-[#E5E7EB] bg-white hover:shadow-sm transition-shadow text-[#374151] hover:text-[#0A1628]">
                <div className="w-6 h-6 rounded-lg mx-auto mb-2" style={{ background: `${color}15` }} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
