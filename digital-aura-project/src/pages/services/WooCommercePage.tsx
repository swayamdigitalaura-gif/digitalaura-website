import { motion } from "framer-motion";
import ClientLogoSection from "@/components/ClientLogoSection";
import { Link } from "react-router-dom";
import { ArrowRight, Store, Globe2, Settings, Zap, ShieldCheck, RefreshCw, TrendingUp, Gauge, DollarSign, Star, ChevronDown, Check, Package, CreditCard, BarChart2, Layers } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";

const accentColor = "#7F54B3";
const glowColor = "rgba(127,84,179,0.12)";

const serviceGroups = [
  {
    title: "Store Design & Development",
    color: "#7F54B3",
    bg: "rgba(127,84,179,0.06)",
    border: "rgba(127,84,179,0.2)",
    Icon: Globe2,
    iconName: "Globe2",
    items: [
      { label: "Custom WooCommerce Theme Development", desc: "Fully bespoke themes built around your brand and product range" },
      { label: "WordPress & WooCommerce Setup", desc: "Complete installation, configuration, and security hardening" },
      { label: "Mobile-First Responsive Design", desc: "Perfect shopping experience on all screen sizes" },
      { label: "Page Speed & Performance Optimisation", desc: "Fast stores that keep customers engaged and reduce bounce" },
      { label: "Custom Page Builder Integration", desc: "Elementor, Gutenberg, or custom block based layouts" },
    ],
  },
  {
    title: "Plugins, Features & Integrations",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.06)",
    border: "rgba(26,111,232,0.2)",
    Icon: Settings,
    iconName: "Settings",
    items: [
      { label: "Custom Plugin Development", desc: "Tailored functionality built specifically for your business needs" },
      { label: "Payment Gateway Integration", desc: "Razorpay, Stripe, PayPal, and local payment methods" },
      { label: "Multi-Currency & Multi-Language", desc: "Sell globally with WPML and currency switchers" },
      { label: "Inventory & Order Management", desc: "Automated stock tracking, order notifications, and returns" },
      { label: "CRM & Third-Party Integrations", desc: "HubSpot, Mailchimp, ShipStation, and more" },
    ],
  },
  {
    title: "Growth & Optimisation",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.2)",
    Icon: TrendingUp,
    iconName: "TrendingUp",
    items: [
      { label: "WooCommerce SEO Setup", desc: "Yoast/Rank Math, schema markup, and product page optimisation" },
      { label: "Checkout Optimisation", desc: "Streamline the checkout to reduce abandonment and increase sales" },
      { label: "Upsell & Cross Sell Configuration", desc: "Smart product recommendations to boost average order value" },
      { label: "Email Marketing Integration", desc: "Abandoned cart recovery, drip sequences, and newsletters" },
      { label: "Analytics & Conversion Tracking", desc: "GA4, GTM, and WooCommerce analytics for full data visibility" },
    ],
  },
];

const toolGroups = [
  {
    label: "Platform",
    color: "#7F54B3",
    bg: "rgba(127,84,179,0.08)",
    pills: ["WooCommerce", "WordPress", "Gutenberg"],
  },
  {
    label: "Development",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    pills: ["PHP", "JavaScript", "REST API", "Hooks & Filters"],
  },
  {
    label: "Plugins & Tools",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    pills: ["Elementor", "WPML", "Yoast SEO", "WooCommerce Subscriptions"],
  },
  {
    label: "Performance & Security",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    pills: ["WP Rocket", "Cloudflare", "Wordfence", "SSL"],
  },
];

const whatWeBuild = [
  { Icon: Store,      iconName: "Store",      label: "Custom WooCommerce Stores" },
  { Icon: Globe2,     iconName: "Globe2",     label: "WordPress eCommerce Sites" },
  { Icon: Settings,   iconName: "Settings",   label: "Custom Plugin Development" },
  { Icon: Package,    iconName: "Package",    label: "Product & Inventory Setup" },
  { Icon: CreditCard, iconName: "CreditCard", label: "Payment Gateway Integration" },
  { Icon: RefreshCw,  iconName: "RefreshCw",  label: "Store Migration to WooCommerce" },
  { Icon: Zap,        iconName: "Zap",        label: "Speed & Performance Tuning" },
  { Icon: Layers,     iconName: "Layers",     label: "Subscription & Membership Stores" },
  { Icon: BarChart2,  iconName: "BarChart2",  label: "Analytics & Reporting Setup" },
];

const whyUs = [
  "Deep WordPress and WooCommerce expertise",
  "Fully custom: no bloated, generic templates",
  "Complete ownership of your store and codebase",
  "Built for speed, SEO, and long term scalability",
  "Ongoing maintenance and support available",
  "Full handover training included on every project",
];

const results = [
  { Icon: DollarSign,  iconName: "DollarSign",  text: "More sales with a better shopping experience" },
  { Icon: TrendingUp,  iconName: "TrendingUp",  text: "Higher rankings with WooCommerce SEO" },
  { Icon: Gauge,       iconName: "Gauge",       text: "Faster store with lower bounce rates" },
  { Icon: ShieldCheck, iconName: "ShieldCheck", text: "Full control of your store and data" },
];

const faqs = [
  {
    q: "Why choose WooCommerce over Shopify?",
    a: "WooCommerce gives you complete ownership and flexibility. There are no transaction fees, no platform lock-in, and you can customise every aspect of your store. It's ideal for businesses that need full control and custom functionality.",
  },
  {
    q: "Can you migrate my existing store to WooCommerce?",
    a: "Yes, we handle full migrations from Shopify, Magento, PrestaShop, and other platforms: including products, customers, order history, and SEO redirects.",
  },
  {
    q: "Is WooCommerce secure?",
    a: "Yes, when properly configured. We implement security best practices: SSL, firewall setup, regular updates, brute force protection, and secure hosting configuration: on every project.",
  },
  {
    q: "Can WooCommerce handle a large product catalogue?",
    a: "Absolutely. With proper server setup, caching, and database optimisation, WooCommerce handles thousands of products efficiently. We configure everything for scale from day one.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes, we offer monthly maintenance plans that include plugin updates, security monitoring, backups, and performance checks to keep your store running smoothly.",
  },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`woo_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="woo_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`woo_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const WooCommercePage = () => {
  const _sp = useSettings(['woo_hero_h1','woo_hero_sub','woo_cta_btn']);
  return (
  <PageLayout>
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(26,111,232,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>← Back to All Services</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <Store size={12} /> WooCommerce Development
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="woo_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Powerful WooCommerce Stores<br /><span style={{ color: accentColor }}>Built for Full Control & Growth</span></span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            <span data-cms-key="woo_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build flexible, scalable WooCommerce stores on WordPress: giving you complete ownership, custom functionality, and zero platform lock-in.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #7F54B3, #6a3fa0)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              <span data-cms-key="woo_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Build My WooCommerce Store</span> <Store size={15} />
            </Link>
            <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>What We Build</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Agency Comparison */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical eCommerce Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Developer Can Install WooCommerce.<br className="hidden md:block" /> Very Few Can Build a Store That Scales Profitably.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most WooCommerce developers focus on getting a store live. We focus on building one that performs under pressure — with the architecture, speed, and checkout experience that actually drives revenue.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Plugin-heavy stores that slow down at scale", detail: "Stacked with plugins that conflict, bloat load times, and break on updates." },
              { pain: "No checkout or payment flow optimisation", detail: "Default WooCommerce checkout that leaks conversions at every step." },
              { pain: "Generic WooCommerce with no custom logic", detail: "Cookie-cutter setup with no pricing rules, upsells, or business-specific workflows." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                  <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3" style={{ background: "rgba(255,107,43,0.06)", borderLeftColor: "#FF6B2B" }}>
            <span className="text-[#FF6B2B] text-lg font-black mt-0.5 shrink-0">⚠</span>
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your WooCommerce store takes more than 3 seconds to load at peak traffic, you're losing sales you will never be able to count.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="woo_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Comprehensive WooCommerce Development Services</span></h2>
          <p className="text-[#6B7280] max-w-xl mx-auto"><span data-cms-key="woo_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">End to end WooCommerce solutions built for performance, flexibility, and long term growth.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {serviceGroups.map((group, gi) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.1 }}
              className="rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${group.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: group.bg }}>
                  <CMSIcon cmsKey={`woo_grp_icon_${gi}`} cmsLabel={`${group.title} Icon`} name={group.iconName} size={18} color={group.color} />
                </div>
                <h3 className="text-[15px] font-bold text-[#0A1628]"><span data-cms-key={`woo_grp_${gi}_title`} data-cms-label="Group Title" data-cms-attr="text">{group.title}</span></h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: group.color }} />
                    <div>
                      <span className="text-[13.5px] font-semibold text-[#0A1628]"><span data-cms-key={`woo_grp_${gi}_item_${i}_label`} data-cms-label="Item Label" data-cms-attr="text">{item.label}</span></span>
                      <span className="text-[12.5px] text-[#6B7280]"><span data-cms-key={`woo_grp_${gi}_item_${i}_desc`} data-cms-label="Item Desc" data-cms-attr="text">: {item.desc}</span></span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="woo_h2lbl_18" data-cms-label="Section Label" data-cms-attr="text">What We Build</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {whatWeBuild.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <CMSIcon cmsKey={`woo_build_icon_${i}`} cmsLabel={`${item.label} Icon`} name={item.iconName} size={18} color={accentColor} />
              <span className="text-[14px] font-semibold text-[#0A1628]"><span data-cms-key={`woo_build_${i}_label`} data-cms-label="Build Item" data-cms-attr="text">{item.label}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="woo_h2lbl_19" data-cms-label="Section Label" data-cms-attr="text">Tools & Tech Stack</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`woo_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
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

    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="woo_h2lbl_20" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`woo_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="woo_h2lbl_21" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "#F8FAFF", border: `1px solid ${accentColor}20` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accentColor}10` }}>
                  <CMSIcon cmsKey={`woo_result_icon_${i}`} cmsLabel={`${r.text} Icon`} name={r.iconName} size={18} color={accentColor} />
                </div>
                <span className="text-[14.5px] font-medium text-[#374151]"><span data-cms-key={`woo_result_${i}`} data-cms-label="Result Item" data-cms-attr="text">{r.text}</span></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <ClientLogoSection servicePage="woocommerce-development" accentColor="#7F54B3" heading="Brands Built on WooCommerce by Digital Aura" fallback={[
      { name: "Karm Digital",           tag: "Digital Agency",   logo: "https://karm.digital/wp-content/uploads/2025/05/karm-logo.png", logoBg: "#f5f0ff" },
      { name: "Active Office Furniture",tag: "Office Furniture", logo: "https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png", logoBg: "#f0f8ff" },
      { name: "Dreamfoot",              tag: "Sports & Footwear",logo: "https://dreamfoot.in/wp-content/uploads/2025/04/logo-light-4-1.png", logoBg: "#1a1a2e" },
      { name: "Bhayani Group",          tag: "Real Estate",      logo: "https://bhayanigroup.com/wp-content/uploads/2023/07/bhayani-logo.png", logoBg: "#f0faff" },
    ]} />

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="woo_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}>
              <FAQItem q={faq.q} a={faq.a} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
            style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="woo_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Build Your <span data-cms-key="woo_hl_122" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">WooCommerce</span> <span data-cms-key="woo_hl_123" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Store</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="woo_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free consultation. We'll review your requirements, recommend the right approach, and give you a clear picture of what a WooCommerce build with Digital Aura looks like.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Start My WooCommerce Project <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="woo_x16" data-cms-label="Fine Print" data-cms-attr="text">No off-the-shelf plugins — A custom WooCommerce build tailored to your business.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default WooCommercePage;






