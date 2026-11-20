/**
 * SERVICE PAGE — Ecommerce Product Photography
 * Route: /services/ecommerce-product-photography
 */
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";
import { Link } from "react-router-dom";
import { StickyCtaBar } from "@/components/PageCta";
import { submitLead } from "@/lib/submitLead";
import {
  Camera, Image as ImageIcon, Layers, Star, Shield, Zap, Users,
  Check, ArrowRight, CheckCircle2, PlusCircle, MinusCircle,
  Palette, Globe2, Sparkles, FileText, Award, Monitor, RotateCcw,
} from "lucide-react";
import { useState, useRef } from "react";
import { RecaptchaBox, type RecaptchaHandle } from "@/components/RecaptchaBox";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";

const accentColor  = "#FF6B2B";
const blueColor    = "#1A6FE8";
const purpleColor  = "#7C3AED";
const greenColor   = "#22C55E";
const glowOrange   = "rgba(255,107,43,0.10)";
const glowBlue     = "rgba(26,111,232,0.08)";
const glowPurple   = "rgba(124,58,237,0.08)";
const glowGreen    = "rgba(34,197,94,0.08)";

// ── Service card data by tab ───────────────────────────────────────────────────
const serviceCards = [
  // ── Studio Photography ──
  {
    Icon: Camera,
    category: "Studio Photography",
    color: accentColor,
    bg: glowOrange,
    title: "White Background Product Shots",
    desc: "Clean, Amazon-compliant main images on pure white backgrounds — perfectly lit, shadow-free, and sized to meet every marketplace's technical requirements. The standard that gets your product indexed and clicked.",
    tags: ["Amazon Compliant", "White Background", "Main Image"],
  },
  {
    Icon: Layers,
    category: "Studio Photography",
    color: accentColor,
    bg: glowOrange,
    title: "Multi-Angle Product Coverage",
    desc: "Full 360° product coverage with shots from every angle — front, back, side, top, detail close-ups, and packaging. Give shoppers the confidence to buy without touching the product.",
    tags: ["Multi-Angle", "Detail Shots", "Packaging"],
  },
  {
    Icon: Sparkles,
    category: "Studio Photography",
    color: accentColor,
    bg: glowOrange,
    title: "360° Interactive Photography",
    desc: "Spin-set photography that lets shoppers rotate and inspect your product from every angle. Amazon's 360° viewer feature drives higher engagement, longer dwell time, and measurably lower return rates.",
    tags: ["360° Spin", "Interactive", "Lower Returns"],
  },
  // ── Lifestyle & Creative ──
  {
    Icon: ImageIcon,
    category: "Lifestyle & Creative",
    color: blueColor,
    bg: glowBlue,
    title: "Lifestyle Product Photography",
    desc: "Real-world context shots that show your product in use — in-home, outdoor, or studio-staged environments with professional models and props. Lifestyle images consistently outperform plain white backgrounds in secondary image slots.",
    tags: ["In-Use Shots", "Models & Props", "Studio Staging"],
  },
  {
    Icon: Award,
    category: "Lifestyle & Creative",
    color: blueColor,
    bg: glowBlue,
    title: "Amazon Infographics",
    desc: "Data-driven product infographics that highlight USPs, dimensions, materials, and key benefits in a single image. Shoppers scan infographics before they read bullet points — making them one of the highest-impact images in your stack.",
    tags: ["USP Callouts", "Dimensions", "Benefit Graphics"],
  },
  {
    Icon: Palette,
    category: "Lifestyle & Creative",
    color: blueColor,
    bg: glowBlue,
    title: "Brand-Story Visuals",
    desc: "Creative imagery for A+ Content and Storefront pages — brand story scenes, founder photography, behind-the-scenes product shots, and hero banner visuals that build emotional connection and long-term brand loyalty.",
    tags: ["A+ Content", "Storefront Banners", "Brand Story"],
  },
  // ── Editing & Post-Production ──
  {
    Icon: Monitor,
    category: "Editing & Post-Production",
    color: purpleColor,
    bg: glowPurple,
    title: "Professional Image Editing",
    desc: "High-end retouching and post-production for images you've already shot — background removal and replacement, colour correction, shadow addition, blemish removal, and resizing to every marketplace's exact pixel specifications.",
    tags: ["Background Removal", "Colour Correction", "Retouching"],
  },
  {
    Icon: FileText,
    category: "Editing & Post-Production",
    color: purpleColor,
    bg: glowPurple,
    title: "Infographic Design from Existing Images",
    desc: "Transform your existing product photos into polished infographics and comparison charts without a full reshoot — a fast, cost-effective way to upgrade your listing visuals without starting from scratch.",
    tags: ["No Reshoot Needed", "Infographic Design", "Cost-Effective"],
  },
  {
    Icon: Shield,
    category: "Editing & Post-Production",
    color: purpleColor,
    bg: glowPurple,
    title: "Marketplace-Ready File Delivery",
    desc: "Every image delivered in the correct format, resolution, and size for Amazon, Shopify, WooCommerce, Flipkart, Meesho, and your own website — named, organised, and ready to upload without a single manual resize.",
    tags: ["Multi-Platform", "Ready to Upload", "Organised Files"],
  },
];

const tabs = ["Studio Photography", "Lifestyle & Creative", "Editing & Post-Production"] as const;
type Tab = typeof tabs[number];

const tabMeta: Record<Tab, { color: string; gradient: string; bg: string; desc: string }> = {
  "Studio Photography":        { color: accentColor,  gradient: `linear-gradient(135deg,${accentColor},#e85a1a)`,  bg: glowOrange, desc: "Amazon-compliant images that get clicks" },
  "Lifestyle & Creative":      { color: blueColor,    gradient: `linear-gradient(135deg,${blueColor},#1558c0)`,    bg: glowBlue,   desc: "Real-world context that drives conversions" },
  "Editing & Post-Production": { color: purpleColor,  gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",         bg: glowPurple, desc: "Polish any image for any platform" },
};

// ── Why Us ────────────────────────────────────────────────────────────────────
const whyUs = [
  { Icon: Camera,     color: accentColor,  title: "E-Commerce Only",              desc: "We photograph e-commerce products exclusively — no weddings, no events, no portraits. That focus means faster turnarounds, sharper technical knowledge, and images that are built for selling, not showing." },
  { Icon: Zap,        color: blueColor,    title: "Fast Turnaround",              desc: "Standard studio shoots are edited and delivered within 3–5 business days. Rush options available. You'll never be waiting weeks for images while your competitor launches." },
  { Icon: Globe2,     color: purpleColor,  title: "Any Platform, Any Marketplace",desc: "Amazon, Shopify, WooCommerce, Flipkart, Meesho, your own website — we deliver the right size, format, and specification for every platform without you having to ask." },
  { Icon: Palette,    color: accentColor,  title: "In-House Studio & Editors",    desc: "Our photographers, stylists, and post-production editors all work under one roof. No outsourcing, no handoff gaps — just a consistent team that understands your products from shoot to final file." },
  { Icon: Star,       color: blueColor,    title: "Affordable for Any Scale",     desc: "Whether you're launching a single hero ASIN or imaging a full catalogue of 500 SKUs, we have packages designed for independent sellers and established brands alike — without agency-level pricing." },
  { Icon: Shield,     color: purpleColor,  title: "Amazon Policy Compliance",     desc: "Every main image is shot and edited to Amazon's current image guidelines — correct white level, minimum pixel size, no banned overlays. Approved on upload, every time." },
];

// ── Process steps ──────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "Brief & Product Intake",    desc: "You send us your products and brief — the platforms you sell on, the number of angles needed, any lifestyle scenes, infographic requirements, and your brand guidelines." },
  { n: "02", title: "Studio Setup & Shoot",      desc: "Our photographer sets up the lighting, backgrounds, and staging. Every shot is captured at high resolution with professional equipment tuned for product detail and colour accuracy." },
  { n: "03", title: "Lifestyle Styling & Shoot", desc: "If lifestyle shots are in scope, our stylists stage the scenes with models, props, and environments that match your target customer's world — then we shoot." },
  { n: "04", title: "Post-Production & Editing", desc: "Every image goes through background work, colour correction, retouching, and infographic or graphic overlay creation — then sized and exported for each platform in your brief." },
  { n: "05", title: "Delivery & Revisions",      desc: "Files are delivered in an organised folder, named by SKU and angle. One round of revisions is included — if anything doesn't meet the brief, we fix it at no extra charge." },
];

// ── FAQs ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    key: "photo_faq_1",
    q: "Do I need to send my products to you, or can you work from existing photos?",
    a: "Both. For a full studio shoot you send us the physical products — we arrange safe return shipping after. If you have existing photographs and only need editing, infographic design, or background removal, you can send us the digital files and we'll work from those. Many sellers start with editing on existing images and graduate to a full reshoot once they see the results.",
  },
  {
    key: "photo_faq_2",
    q: "What image requirements does Amazon have for product photography?",
    a: "Amazon requires main images to have a pure white background (RGB 255,255,255), the product must fill at least 85% of the frame, minimum 1,000 pixels on the longest side (2,000+ recommended to enable zoom), no watermarks or text overlays on the main image, and the product must be in focus with no mannequins for apparel. Secondary image slots are more flexible. We know every requirement and shoot and edit to them as standard — you never have to check.",
  },
  {
    key: "photo_faq_3",
    q: "What is the difference between studio shots and lifestyle photography?",
    a: "Studio shots (typically on white backgrounds) are essential for main images — they're Amazon-compliant and show the product clearly. Lifestyle photography places the product in real-world scenes with models, props, and environments that show it in use. Lifestyle images consistently outperform white-background shots in secondary image slots for conversion — but both serve different roles in your image stack. We recommend a combination of both for maximum performance.",
  },
  {
    key: "photo_faq_4",
    q: "What is 360° product photography and do I need it?",
    a: "360° photography is a spin-set of images (typically 24–72 frames) that enables Amazon's interactive spin viewer — allowing shoppers to rotate the product in the browser. It's particularly effective for products where build quality, shape, or detail from multiple angles is a purchase factor (electronics, furniture, apparel accessories, tools). Studies consistently show 360° viewers reduce return rates by giving shoppers realistic expectations before purchase.",
  },
  {
    key: "photo_faq_5",
    q: "How long does a shoot take and when will I receive my images?",
    a: "Most studio shoots are completed within 1–2 business days of receiving your products. Post-production and editing adds another 2–3 business days. For lifestyle shoots, timeline depends on scene complexity, but we typically deliver within 5–7 business days of shoot day. Rush turnarounds are available. We always give you a confirmed delivery date before the shoot begins.",
  },
  {
    key: "photo_faq_6",
    q: "Can you create infographics and Amazon A+ Content images from our photos?",
    a: "Yes — infographic design and A+ Content image creation are core parts of our editing and post-production service. We can work from new images we shoot or from your existing product photos. Infographics typically include dimension callouts, feature highlights, material close-ups, usage steps, and comparison points — all designed to match your brand style and pass Amazon's content guidelines.",
  },
  {
    key: "photo_faq_7",
    q: "Do you work for platforms other than Amazon?",
    a: "Yes. We deliver images sized and formatted for Amazon, Shopify, WooCommerce, Flipkart, Meesho, Etsy, and your own website or marketing materials. Every delivery includes a folder structure organised by platform and SKU, with files named to our or your preferred convention. If you sell on multiple platforms, we sort the exports so you can upload directly without any manual work.",
  },
];

// ── SVG Illustrations ──────────────────────────────────────────────────────────
function ProductPhotoIllustration() {
  return (
    <svg viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[460px]" aria-hidden="true">
      {/* Background card */}
      <rect width="460" height="320" rx="16" fill="#F8FAFF" />
      <rect x="0.5" y="0.5" width="459" height="319" rx="15.5" stroke="#E5E7EB" />
      {/* Studio area - large white bg shoot zone */}
      <rect x="14" y="14" width="260" height="192" rx="10" fill="white" />
      <rect x="14.5" y="14.5" width="259" height="191" rx="9.5" stroke="#E5E7EB" />
      {/* Studio backdrop arc */}
      <path d="M 34 206 L 34 60 Q 34 34 60 34 L 234 34 Q 258 34 258 60 L 258 206 Z" fill="#F3F4F6" opacity="0.6" />
      {/* Product box on white bg */}
      <rect x="90" y="80" width="80" height="80" rx="6" fill="white" />
      <rect x="90.5" y="80.5" width="79" height="79" rx="5.5" stroke="#E5E7EB" />
      {/* Box detail */}
      <rect x="98" y="88" width="64" height="40" rx="3" fill="#FFF7F3" />
      <rect x="106" y="94" width="48" height="6" rx="2" fill={accentColor} opacity="0.4" />
      <rect x="106" y="104" width="36" height="4" rx="2" fill="#E5E7EB" />
      <rect x="106" y="112" width="42" height="4" rx="2" fill="#E5E7EB" />
      <rect x="98" y="136" width="64" height="16" rx="3" fill="#F8FAFF" />
      <text x="130" y="147" fill="#9CA3AF" fontSize="8" fontFamily="system-ui" textAnchor="middle">YOUR PRODUCT</text>
      {/* Camera icon */}
      <circle cx="230" cy="40" r="14" fill={glowOrange} />
      <text x="230" y="44" fontSize="12" fontFamily="system-ui" textAnchor="middle">📷</text>
      {/* Lighting rigs */}
      <line x1="40" y1="30" x2="80" y2="80" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
      <line x1="240" y1="30" x2="200" y2="80" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
      <circle cx="40" cy="26" r="7" fill="#FCD34D" opacity="0.3" />
      <circle cx="240" cy="26" r="7" fill="#FCD34D" opacity="0.3" />
      {/* Angle labels */}
      <text x="144" y="210" fill="#9CA3AF" fontSize="8" fontFamily="system-ui" textAnchor="middle">Studio Shoot</text>
      {/* Right panel — image stack */}
      <rect x="286" y="14" width="160" height="192" rx="10" fill="white" />
      <rect x="286.5" y="14.5" width="159" height="191" rx="9.5" stroke="#E5E7EB" />
      <text x="366" y="34" fill="#374151" fontSize="9" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Image Stack</text>
      {/* Image tiles */}
      {[
        { y: 42, label: "Main Image",    tag: "White BG",    color: accentColor,  pct: 100 },
        { y: 90, label: "Lifestyle",     tag: "In-Use",      color: blueColor,    pct: 85 },
        { y: 138, label: "Infographic", tag: "USP Callout", color: purpleColor,  pct: 72 },
        { y: 162, label: "360° Spin",   tag: "Interactive", color: greenColor,   pct: 90 },
      ].map(({ y, label, tag, color, pct }) => (
        <g key={label}>
          <rect x="296" y={y} width="140" height="38" rx="5" fill="#F8FAFF" />
          <rect x="300" y={y + 6} width="26" height="26" rx="4" fill={`${color}15`} />
          <text x="313" y={y + 22} fill={color} fontSize="11" fontFamily="system-ui" textAnchor="middle">■</text>
          <text x="334" y={y + 14} fill="#374151" fontSize="8" fontFamily="system-ui" fontWeight="600">{label}</text>
          <text x="334" y={y + 24} fill="#9CA3AF" fontSize="7" fontFamily="system-ui">{tag}</text>
          <rect x="334" y={y + 28} width="90" height="4" rx="2" fill="#E5E7EB" />
          <rect x="334" y={y + 28} width={90 * pct / 100} height="4" rx="2" fill={color} opacity="0.6" />
        </g>
      ))}
      {/* Bottom stats row */}
      <rect x="14" y="218" width="432" height="88" rx="10" fill="white" />
      <rect x="14.5" y="218.5" width="431" height="87" rx="9.5" stroke="#E5E7EB" />
      <text x="230" y="236" fill="#374151" fontSize="9" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Impact of Professional Photography</text>
      {[
        { x: 50,  val: "85%",   label: "Shoppers cite images\nas key buying factor", color: accentColor },
        { x: 180, val: "+30%",  label: "Avg conversion lift\nvs amateur shots",       color: blueColor },
        { x: 310, val: "−22%",  label: "Return rate drop\nwith lifestyle images",    color: purpleColor },
        { x: 400, val: "3–5d",  label: "Delivery\ntimeline",                         color: greenColor },
      ].map(({ x, val, label, color }) => (
        <g key={val}>
          <text x={x} y="260" fill={color} fontSize="13" fontFamily="system-ui" fontWeight="800" textAnchor="middle">{val}</text>
          {label.split("\n").map((line, i) => (
            <text key={i} x={x} y={275 + i * 10} fill="#6B7280" fontSize="7" fontFamily="system-ui" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function EditingIllustration() {
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[360px]" aria-hidden="true">
      <rect width="360" height="280" rx="14" fill="white" />
      <rect x="0.5" y="0.5" width="359" height="279" rx="13.5" stroke="#E5E7EB" />
      {/* Header */}
      <rect x="0" y="0" width="360" height="44" rx="14" fill="#FFF7F3" />
      <rect x="0" y="30" width="360" height="14" fill="#FFF7F3" />
      <circle cx="22" cy="22" r="10" fill={accentColor} opacity="0.15" />
      <text x="22" y="27" fill={accentColor} fontSize="12" fontFamily="system-ui" fontWeight="700" textAnchor="middle">✏</text>
      <text x="40" y="20" fill="#0A1628" fontSize="10" fontFamily="system-ui" fontWeight="700">Post-Production Checklist</text>
      <text x="40" y="32" fill="#6B7280" fontSize="8" fontFamily="system-ui">Before delivery · 1 SKU</text>
      {/* Score badge */}
      <circle cx="316" cy="22" r="20" fill={greenColor} opacity="0.1" />
      <text x="316" y="18" fill={greenColor} fontSize="11" fontFamily="system-ui" fontWeight="800" textAnchor="middle">✓</text>
      <text x="316" y="29" fill="#6B7280" fontSize="7" fontFamily="system-ui" textAnchor="middle">Done</text>
      {/* Checklist items */}
      {[
        { label: "Background removal to pure white",  done: true,  color: accentColor },
        { label: "Colour calibration & correction",   done: true,  color: accentColor },
        { label: "Shadow & reflection added",         done: true,  color: blueColor },
        { label: "Blemish & surface retouching",      done: true,  color: blueColor },
        { label: "Infographic overlays designed",     done: true,  color: purpleColor },
        { label: "Amazon main image compliance check",done: true,  color: purpleColor },
        { label: "Export: 2000×2000 JPEG (Amazon)",   done: true,  color: greenColor },
        { label: "Export: WebP (Shopify/WooCommerce)",done: false, color: greenColor },
      ].map(({ label, done, color }, i) => (
        <g key={label}>
          <rect x="16" y={52 + i * 26} width="328" height="22" rx="5" fill={done ? "#F0FDF4" : "#F9FAFB"} opacity={done ? 1 : 0.6} />
          <circle cx="30" cy={63 + i * 26} r="7" fill={done ? color : "#E5E7EB"} opacity={done ? 0.2 : 1} />
          <text x="30" y={67 + i * 26} fill={done ? color : "#9CA3AF"} fontSize="8" fontFamily="system-ui" textAnchor="middle">{done ? "✓" : "○"}</text>
          <text x="44" y={67 + i * 26} fill={done ? "#374151" : "#9CA3AF"} fontSize="8" fontFamily="system-ui">{label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────────
function PhotographyQuoteForm() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", skus: "", service: "Studio Photography", platform: "Amazon" });
  const [status, setStatus] = useState<"idle"|"sending"|"done"|"error">("idle");
  const recaptchaRef = useRef<RecaptchaHandle>(null);

  const inputCls = "w-full rounded-lg px-4 py-3 text-sm bg-[#F8FAFF] border border-[#E5E7EB] text-[#0A1628] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const token = recaptchaRef.current?.getToken() ?? "";
    const ok = await submitLead({ ...form, recaptchaToken: token, source: "ecommerce-product-photography-form" });
    setStatus(ok ? "done" : "error");
    if (!ok) recaptchaRef.current?.reset();
  }

  if (status === "done") return (
    <div className="rounded-2xl p-10 text-center border border-[#E5E7EB] bg-white">
      <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: accentColor }} />
      <p className="text-xl font-bold text-[#0A1628]">Quote Request Received!</p>
      <p className="text-[#4B5563] mt-2 text-sm">We'll review your brief and send a quote within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-6 md:p-8 shadow-sm border border-[#E5E7EB] bg-white space-y-4">
      <h3 className="text-xl font-bold text-[#0A1628]">Get a Free Photography Quote</h3>
      <p className="text-sm text-[#4B5563]">Tell us about your products and we'll send a tailored quote within 24 hours — no commitment required.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputCls} placeholder="Your Name *" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        <input className={inputCls} placeholder="Business / Brand Name *" required value={form.business} onChange={e => setForm(f => ({...f, business: e.target.value}))} />
        <input type="email" className={inputCls} placeholder="Email Address *" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        <input type="tel" className={inputCls} placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
        <input className={inputCls} placeholder="Number of SKUs / Products" value={form.skus} onChange={e => setForm(f => ({...f, skus: e.target.value}))} />
        <select className={inputCls} value={form.service} onChange={e => setForm(f => ({...f, service: e.target.value}))}>
          {["Studio Photography","Lifestyle Photography","360° Photography","Image Editing Only","Infographic Design","Full Package"].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <select className={inputCls} value={form.platform} onChange={e => setForm(f => ({...f, platform: e.target.value}))}>
        {["Amazon","Shopify","WooCommerce","Flipkart","Meesho","Multiple Platforms"].map(p => <option key={p}>{p}</option>)}
      </select>
      <RecaptchaBox ref={recaptchaRef} />
      {status === "error" && <p className="text-red-500 text-sm">Something went wrong — please try again.</p>}
      <button type="submit" disabled={status === "sending"}
        className="w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-50"
        style={{ background: `linear-gradient(135deg,${accentColor},#e85a1a)` }}>
        {status === "sending" ? "Sending…" : <><span>Get Free Quote</span><ArrowRight size={16}/></>}
      </button>
    </form>
  );
}

// ── Main page component ────────────────────────────────────────────────────────
export default function EcommerceProductPhotographyPage() {
  const s = useSettings(["photo_hero_h1","photo_hero_sub","photo_cta_btn"]);
  const [activeTab, setActiveTab] = useState<Tab>("Studio Photography");
  const [openFaq, setOpenFaq] = useState<string|null>(null);

  const visibleCards = serviceCards.filter(c => c.category === activeTab);
  const meta = tabMeta[activeTab];

  return (
    <PageLayout>
      <StickyCtaBar accent={accentColor} label="Get Free Photography Quote" href="#photography-quote-form" topic="Ecommerce Product Photography" />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16" style={{ background: "white" }}>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: `radial-gradient(circle,${accentColor},transparent)`, filter: "blur(80px)" }} />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: `radial-gradient(circle,${blueColor},transparent)`, filter: "blur(80px)" }} />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
              style={{ background: glowOrange, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <span>E-Commerce Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6 leading-tight"
              data-cms-key="photo_hero_h1">
              {s.photo_hero_h1 || <>Product Photography<br />That <span style={{ color: accentColor }}>Sells</span></>}
            </h1>
            <p className="text-lg text-[#4B5563] mb-8 leading-relaxed" data-cms-key="photo_hero_sub">
              {s.photo_hero_sub || "Professional studio shoots, lifestyle photography, 360° spin sets, and infographic design — every image built to meet marketplace requirements and convert browsers into buyers."}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { val: "85%",  label: "Shoppers cite images as key" },
                { val: "+30%", label: "Avg conversion lift" },
                { val: "−22%", label: "Return rate drop" },
                { val: "3–5d", label: "Delivery timeline" },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-xl px-4 py-2 text-center border border-[#E5E7EB] bg-[#F8FAFF]">
                  <p className="text-lg font-extrabold" style={{ color: accentColor }}>{val}</p>
                  <p className="text-[11px] text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="#photography-quote-form"
                className="px-8 py-4 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition hover:opacity-90"
                style={{ background: `linear-gradient(135deg,${accentColor},#e85a1a)` }}
                onClick={() => track("cta_click", { page: "ecommerce-product-photography", cta: "hero_primary" })}>
                Get Free Photography Quote <ArrowRight size={16} />
              </a>
              <Link to="/services/amazon-aplus-content"
                className="px-8 py-4 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition hover:bg-[#F8FAFF] text-[#0A1628] border-[#E5E7EB]">
                See A+ Content Services
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <ProductPhotoIllustration />
          </div>
        </div>
      </section>

      {/* ── SERVICES TABS ─────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Photography Services</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">Every Image Type, One Studio</h2>
            <p className="text-[#4B5563] mt-3 max-w-2xl mx-auto">From Amazon-compliant white-background shots to lifestyle scenes, 360° spin sets, and post-production editing — we handle every image your listings need.</p>
          </div>
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
          <div className="text-center mb-8">
            <p className="text-sm font-medium" style={{ color: meta.color }}>{meta.desc}</p>
          </div>
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
            <p className="text-[#4B5563] mt-3 max-w-2xl mx-auto">E-commerce photography is all we do. That focus means faster turnarounds, sharper technical knowledge, and images built to sell — not just to look good.</p>
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

      {/* ── POST-PRODUCTION SECTION ───────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accentColor }}>Image Editing</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628] mb-5">Already Have Photos?<br />We'll Make Them Sell</h2>
              <p className="text-[#4B5563] mb-6 leading-relaxed">
                You don't always need a full reshoot. Our post-production team can take your existing product photography and transform it — removing backgrounds, correcting colour, adding professional shadows, designing infographic overlays, and exporting at the right size for every platform.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Background removal to pure white (Amazon compliant)",
                  "Colour calibration and professional retouching",
                  "Shadow and reflection creation",
                  "Infographic and USP callout design",
                  "Export for Amazon, Shopify, WooCommerce, Flipkart and more",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#374151]">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#photography-quote-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition hover:opacity-90"
                style={{ background: `linear-gradient(135deg,${accentColor},#e85a1a)` }}>
                Get Editing Quote <ArrowRight size={15} />
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <EditingIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>How It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">From Brief to Delivered Files</h2>
            <p className="text-[#4B5563] mt-3 max-w-xl mx-auto">Our end-to-end photography process is built for e-commerce sellers — fast, organised, and completely managed for you.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[11%] right-[11%] h-px"
              style={{ background: `linear-gradient(90deg,${accentColor}40,${blueColor}40,${purpleColor}40)` }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map(({ n, title, desc }, i) => {
                const stepColor = [accentColor, accentColor, blueColor, purpleColor, greenColor][i];
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
            <h2 className="text-3xl font-extrabold text-[#0A1628]">Product Photography FAQs</h2>
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
      <section id="photography-quote-form" className="py-20" style={{ background: "white" }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Free Quote</p>
            <h2 className="text-3xl font-extrabold text-[#0A1628]">Get Your Free Photography Quote</h2>
            <p className="text-[#4B5563] mt-2">Tell us about your products, platform, and service needed — we'll send a tailored quote within 24 hours.</p>
          </div>
          <PhotographyQuoteForm />
        </div>
      </section>

      {/* ── RELATED SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Amazon Marketing</p>
            <h2 className="text-2xl font-extrabold text-[#0A1628]">Pair Photography with Amazon Growth</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Amazon Marketing",     href: "/services/amazon-marketing",            color: accentColor },
              { label: "A+ Content",           href: "/services/amazon-aplus-content",        color: blueColor },
              { label: "Storefront Design",    href: "/services/amazon-storefront-design",    color: purpleColor },
              { label: "Listing Optimisation", href: "/services/amazon-listing-optimisation", color: accentColor },
              { label: "PPC Management",       href: "/services/amazon-ppc",                  color: blueColor },
              { label: "SEO Consultant",       href: "/services/amazon-seo-consultant",       color: purpleColor },
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
