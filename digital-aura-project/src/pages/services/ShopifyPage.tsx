import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Palette, Zap, RefreshCw, BarChart2, ShieldCheck, TrendingUp, Gauge, DollarSign, Star, ChevronDown, Check, Globe2, Settings, Package, CreditCard, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import { useSettings } from "@/hooks/useSettings";

const accentColor = "#96BF48";
const glowColor = "rgba(150,191,72,0.12)";

const serviceGroups = [
  {
    title: "Store Design & Development",
    color: "#96BF48",
    bg: "rgba(150,191,72,0.06)",
    border: "rgba(150,191,72,0.2)",
    Icon: Palette,
    iconName: "Palette",
    items: [
      { label: "Custom Shopify Theme Development", desc: "Pixel-perfect, brand aligned themes built from scratch" },
      { label: "Shopify OS 2.0 & Liquid Development", desc: "Modern, flexible storefronts using the latest Shopify stack" },
      { label: "Mobile-First Responsive Design", desc: "Seamless shopping experience across all devices" },
      { label: "Speed & Performance Optimisation", desc: "Fast loading stores that reduce bounce and increase conversions" },
      { label: "Shopify Theme Customisation", desc: "Modify and extend existing themes to match your brand perfectly" },
    ],
  },
  {
    title: "Apps, Integrations & Features",
    color: "#5C6AC4",
    bg: "rgba(92,106,196,0.06)",
    border: "rgba(92,106,196,0.2)",
    Icon: Settings,
    iconName: "Settings",
    items: [
      { label: "Custom App Development", desc: "Bespoke Shopify apps for unique business functionality" },
      { label: "Third-Party App Integrations", desc: "Connect CRMs, ERPs, marketing tools, and analytics platforms" },
      { label: "Payment Gateway Setup", desc: "Shopify Payments, Razorpay, Stripe, and more" },
      { label: "Inventory & Order Management", desc: "Automated workflows for stock, fulfilment, and returns" },
      { label: "Multi-Currency & Multi-Language", desc: "Sell globally with localised storefronts and currencies" },
    ],
  },
  {
    title: "Conversion & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.25)",
    Icon: TrendingUp,
    iconName: "TrendingUp",
    items: [
      { label: "Checkout Optimisation", desc: "Reduce cart abandonment with a frictionless checkout flow" },
      { label: "Upsell & Cross Sell Setup", desc: "Increase average order value with smart product recommendations" },
      { label: "SEO Optimisation for Shopify", desc: "On-page SEO, schema markup, and site structure for rankings" },
      { label: "Email Marketing Integration", desc: "Klaviyo, Mailchimp, and automated abandoned cart flows" },
      { label: "Analytics & Conversion Tracking", desc: "GA4, Shopify Analytics, and pixel setup for full visibility" },
    ],
  },
];

const toolGroups = [
  {
    label: "Platform",
    color: "#96BF48",
    bg: "rgba(150,191,72,0.08)",
    pills: ["Shopify", "Shopify Plus", "Shopify OS 2.0"],
  },
  {
    label: "Development",
    color: "#5C6AC4",
    bg: "rgba(92,106,196,0.08)",
    pills: ["Liquid", "React (Hydrogen)", "GraphQL"],
  },
  {
    label: "Apps & Integrations",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    pills: ["Klaviyo", "Recharge", "Judge.me", "Yotpo"],
  },
  {
    label: "Analytics & SEO",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    pills: ["GA4", "GTM", "Hotjar", "Search Console"],
  },
];

const whatWeBuild = [
  { Icon: ShoppingCart, iconName: "ShoppingCart", label: "Custom Shopify Stores" },
  { Icon: Palette,      iconName: "Palette",      label: "Bespoke Theme Design" },
  { Icon: Settings,     iconName: "Settings",     label: "Custom App Development" },
  { Icon: Package,      iconName: "Package",      label: "Product & Inventory Setup" },
  { Icon: CreditCard,   iconName: "CreditCard",   label: "Payment Gateway Integration" },
  { Icon: RefreshCw,    iconName: "RefreshCw",    label: "Store Migration to Shopify" },
  { Icon: Zap,          iconName: "Zap",          label: "Speed Optimisation" },
  { Icon: Globe2,       iconName: "Globe2",       label: "Multi-Store & International" },
  { Icon: BarChart2,    iconName: "BarChart2",    label: "Analytics & Tracking Setup" },
];

const whyUs = [
  "Shopify-specialist team with deep platform expertise",
  "Custom built stores: no generic templates",
  "Mobile first design for every project",
  "Built for speed, SEO, and conversion from day one",
  "Full handover with training and documentation",
  "Ongoing support and maintenance available",
];

const results = [
  { Icon: DollarSign,  iconName: "DollarSign",  text: "Higher revenue per visitor" },
  { Icon: TrendingUp,  iconName: "TrendingUp",  text: "More conversions from same traffic" },
  { Icon: Gauge,       iconName: "Gauge",       text: "Faster load times and better UX" },
  { Icon: ShieldCheck, iconName: "ShieldCheck", text: "Scalable store built to grow with you" },
];

const faqs = [
  {
    q: "Can you migrate my existing store to Shopify?",
    a: "Yes, we handle full migrations from WooCommerce, Magento, BigCommerce, and other platforms: including products, customers, orders, and SEO redirects.",
  },
  {
    q: "Do you build on Shopify Plus?",
    a: "Yes, we work with both standard Shopify and Shopify Plus: including custom checkout, flows, and B2B features available on Plus.",
  },
  {
    q: "How long does a Shopify store take to build?",
    a: "A standard custom store typically takes 3-6 weeks. Complex stores with custom apps or integrations may take longer depending on scope.",
  },
  {
    q: "Will my store be SEO optimised?",
    a: "Yes, we implement on page SEO best practices: clean URL structure, meta tags, schema markup, image optimisation, and page speed: as standard.",
  },
  {
    q: "Do you provide training after launch?",
    a: "Yes, we provide full handover training so you can manage products, orders, and content confidently. Ongoing support plans are also available.",
  },
];

const clients = [
  {
    name: "GM Leather",
    tag: "Fashion & Accessories",
    logo: "https://gmleather.co.nz/cdn/shop/files/LOGO-PNG.png?v=1727416040&width=150",
    logoBg: "#faf6f1",
  },
  {
    name: "The Nutra Source",
    tag: "Health & Nutrition",
    logo: "https://thenutrasource.com/cdn/shop/files/Nutrasource-logo_529c36ee-cde7-4e02-a835-74c3478dadae.png?height=45&v=1766999125",
    logoBg: "#f2faf2",
  },
];

const ClientSlider = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % clients.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive(a => (a - 1 + clients.length) % clients.length);
  const next = () => setActive(a => (a + 1) % clients.length);
  const c = clients[active];

  return (
    <div className="select-none">
      {/* Logo tabs — 2 cols on mobile, 4 on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {clients.map((cl, i) => (
          <button key={cl.name} onClick={() => setActive(i)}
            className="relative flex items-center justify-center px-2 py-3 sm:px-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-200 overflow-hidden border"
            style={{
              background: i === active ? cl.logoBg : "#F8FAFF",
              borderColor: i === active ? `${accentColor}60` : "#E5E7EB",
              boxShadow: i === active ? `0 4px 20px ${accentColor}20` : "none",
              transform: i === active ? "scale(1.03)" : "scale(1)",
            }}>
            {i === active && (
              <div className="absolute inset-0 rounded-xl" style={{ background: `${accentColor}08` }} />
            )}
            <img src={cl.logo} alt={cl.name}
              className="relative z-10 object-contain w-full"
              style={{ height: 28, maxWidth: 100 }}
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {i === active && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full" style={{ background: accentColor }} />
            )}
          </button>
        ))}
      </div>

      {/* Featured card */}
      <div className="relative rounded-2xl overflow-hidden border"
        style={{ borderColor: `${accentColor}30`, boxShadow: `0 8px 40px ${accentColor}15`, background: "#fff" }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${accentColor}, #5C6AC4)` }} />

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-5 sm:p-8">

            {/* Logo display */}
            <div className="w-full sm:w-auto shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl p-5 sm:p-8"
              style={{ background: c.logoBg, minHeight: 100, border: "1px solid rgba(0,0,0,0.06)" }}>
              <img src={c.logo} alt={c.name}
                className="object-contain mx-auto"
                style={{ height: 48, maxWidth: 160 }}
                onError={e => { (e.target as HTMLImageElement).alt = c.name; }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left w-full">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
                style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}25` }}>
                {c.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A1628] mb-1.5">{c.name}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">Custom Shopify store built by Digital Aura — designed for performance, conversion, and brand identity.</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow controls */}
        <button onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <ChevronLeft size={14} className="text-[#374151]" />
        </button>
        <button onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <ChevronLeft size={14} className="text-[#374151] rotate-180" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {clients.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 24 : 8, height: 8,
              background: i === active ? accentColor : "#D1D5DB",
            }} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`shopify_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="shopify_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`shopify_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const ShopifyPage = () => {
  const _sp = useSettings(['shopify_hero_h1','shopify_hero_sub','shopify_cta_btn']);
  return (
  <PageLayout>
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(92,106,196,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>← Back to All Services</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <ShoppingCart size={12} /> Shopify Development
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="shopify_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">High Converting Shopify Stores<br /><span style={{ color: accentColor }}>Built to Sell More</span></span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            <span data-cms-key="shopify_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build custom Shopify stores with stunning designs, fast performance, and optimised checkout flows: engineered to maximise revenue from day one.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #96BF48, #7a9e39)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              <span data-cms-key="shopify_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Start My Shopify Store</span> <ShoppingCart size={15} />
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
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Shopify Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Launch a Shopify Store.<br className="hidden md:block" /> Very Few Can Build One That Actually Sells.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most Shopify agencies focus on making stores look good. We focus on making them convert — because a beautiful store that doesn't sell is just an expensive brochure.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Theme installs with minor customisation", detail: "Off-the-shelf templates rebranded and handed off as custom work." },
              { pain: "Beautiful stores with no conversion thinking", detail: "Stunning design that ignores checkout flow, mobile UX, and buyer psychology." },
              { pain: "Setup and handoff with no ongoing support", detail: "Gone after launch — leaving you to figure out apps, updates, and performance alone." },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your Shopify store has never had a conversion rate audit, you're leaving revenue on the table every single day.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="shopify_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Comprehensive Shopify Development Services</span></h2>
          <p className="text-[#6B7280] max-w-xl mx-auto"><span data-cms-key="shopify_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">From design to launch: every aspect of your Shopify store handled by specialists.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {serviceGroups.map((group, gi) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.1 }}
              className="rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${group.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: group.bg }}>
                  <CMSIcon cmsKey={`shopify_grp_icon_${gi}`} cmsLabel={`${group.title} Icon`} name={group.iconName} size={18} color={group.color} />
                </div>
                <h3 className="text-[15px] font-bold text-[#0A1628]"><span data-cms-key={`shopify_grp_${gi}_title`} data-cms-label="Group Title" data-cms-attr="text">{group.title}</span></h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: group.color }} />
                    <div>
                      <span className="text-[13.5px] font-semibold text-[#0A1628]"><span data-cms-key={`shopify_grp_${gi}_item_${i}_label`} data-cms-label="Item Label" data-cms-attr="text">{item.label}</span></span>
                      <span className="text-[12.5px] text-[#6B7280]"><span data-cms-key={`shopify_grp_${gi}_item_${i}_desc`} data-cms-label="Item Desc" data-cms-attr="text">: {item.desc}</span></span>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="shopify_h2lbl_18" data-cms-label="Section Label" data-cms-attr="text">What We Build</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {whatWeBuild.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <CMSIcon cmsKey={`shopify_build_icon_${i}`} cmsLabel={`${item.label} Icon`} name={item.iconName} size={18} color={accentColor} />
              <span className="text-[14px] font-semibold text-[#0A1628]"><span data-cms-key={`shopify_build_${i}_label`} data-cms-label="Build Item" data-cms-attr="text">{item.label}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="shopify_h2lbl_19" data-cms-label="Section Label" data-cms-attr="text">Tools & Tech Stack</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`shopify_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
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
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="shopify_h2lbl_20" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`shopify_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="shopify_h2lbl_21" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "#F8FAFF", border: `1px solid ${accentColor}20` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accentColor}10` }}>
                  <CMSIcon cmsKey={`shopify_result_icon_${i}`} cmsLabel={`${r.text} Icon`} name={r.iconName} size={18} color={accentColor} />
                </div>
                <span className="text-[14.5px] font-medium text-[#374151]"><span data-cms-key={`shopify_result_${i}`} data-cms-label="Result Item" data-cms-attr="text">{r.text}</span></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── CLIENT LOGO GRID ── */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#F8FAFF", borderBottom: "1px solid #F3F4F6" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge">Clients We&#39;ve Grown</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mt-2">Shopify Stores We've Built &amp; Launched</h2>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto mt-2">Real brands. Real Shopify stores. Designed and built by Digital Aura.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <ClientLogoGrid clients={clients} accentColor={accentColor} />
        </motion.div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="shopify_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="shopify_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="shopify_hl_122" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Launch</span> Your <span data-cms-key="shopify_hl_123" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Shopify Store</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="shopify_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Let's build a store that doesn't just look great — it sells. Get a free consultation and project estimate today.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Start My Shopify Store <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="shopify_x16" data-cms-label="Fine Print" data-cms-attr="text">No cookie cutter themes — A custom Shopify store built to convert from day one.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default ShopifyPage;






