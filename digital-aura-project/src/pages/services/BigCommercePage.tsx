import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Globe2, Settings, Zap, ShieldCheck, RefreshCw, TrendingUp, Gauge, DollarSign, Layers, ChevronDown, Check, Package, BarChart2, Users, Building2 } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";

const accentColor = "#34313F";
const glowColor = "rgba(52,49,63,0.08)";
const highlightColor = "#121118";

const serviceGroups = [
  {
    title: "Store Design & Development",
    color: "#34313F",
    bg: "rgba(52,49,63,0.06)",
    border: "rgba(52,49,63,0.15)",
    Icon: Globe2,
    items: [
      { label: "Custom Stencil Theme Development", desc: "Bespoke BigCommerce themes built for your brand and audience" },
      { label: "Headless Commerce (Next.js / React)", desc: "Blazing fast storefronts with BigCommerce as the backend engine" },
      { label: "Mobile-First Responsive Design", desc: "Flawless shopping experience across all devices" },
      { label: "Page Speed & Core Web Vitals Optimisation", desc: "Fast stores that rank better and convert more" },
      { label: "UX/UI Design for High Conversion", desc: "Data backed design decisions that guide customers to checkout" },
    ],
  },
  {
    title: "B2B, Enterprise & Integrations",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.06)",
    border: "rgba(26,111,232,0.2)",
    Icon: Building2,
    items: [
      { label: "B2B & Wholesale Store Setup", desc: "Customer groups, price lists, and quote management for B2B" },
      { label: "Multi-Channel Selling", desc: "Sync with Amazon, eBay, Google Shopping, and social commerce" },
      { label: "ERP & CRM Integration", desc: "Connect NetSuite, Salesforce, SAP, and other enterprise systems" },
      { label: "Custom API Development", desc: "BigCommerce API integrations for bespoke functionality" },
      { label: "Multi-Storefront Setup", desc: "Manage multiple brands or regions from a single BigCommerce account" },
    ],
  },
  {
    title: "Growth & Revenue Optimisation",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.25)",
    Icon: TrendingUp,
    items: [
      { label: "Checkout Optimisation", desc: "Reduce abandonment with a frictionless, fast checkout experience" },
      { label: "BigCommerce SEO Setup", desc: "URL structure, meta tags, schema, and product page optimisation" },
      { label: "Promotions & Discount Engine Setup", desc: "Cart level discounts, coupons, and tiered pricing rules" },
      { label: "Product Catalogue Optimisation", desc: "Faceted search, filters, and product data for better discovery" },
      { label: "Analytics & Conversion Tracking", desc: "GA4, GTM, and BigCommerce Insights for full data visibility" },
    ],
  },
];

const toolGroups = [
  {
    label: "Platform",
    color: "#34313F",
    bg: "rgba(52,49,63,0.08)",
    pills: ["BigCommerce", "BigCommerce B2B Edition", "Multi-Storefront"],
  },
  {
    label: "Development",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    pills: ["Stencil", "Next.js (Headless)", "BigCommerce API"],
  },
  {
    label: "Integrations",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    pills: ["Salesforce", "NetSuite", "Klaviyo", "ShipStation"],
  },
  {
    label: "Analytics & SEO",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    pills: ["GA4", "GTM", "BigCommerce Insights", "Search Console"],
  },
];

const whatWeBuild = [
  { Icon: CreditCard,  label: "Custom BigCommerce Stores" },
  { Icon: Globe2,      label: "Headless Commerce (Next.js)" },
  { Icon: Building2,   label: "B2B & Wholesale Portals" },
  { Icon: Users,       label: "Multi-Storefront Setups" },
  { Icon: Package,     label: "Large Product Catalogues" },
  { Icon: RefreshCw,   label: "Migration to BigCommerce" },
  { Icon: Layers,      label: "Multi-Channel Selling" },
  { Icon: Settings,    label: "ERP & CRM Integrations" },
  { Icon: BarChart2,   label: "Analytics & Reporting" },
];

const whyUs = [
  "Enterprise grade eCommerce expertise at startup-friendly pricing",
  "Custom builds: no cookie cutter themes or shortcuts",
  "Deep BigCommerce API and headless commerce experience",
  "Built for scale: handles high traffic and large catalogues",
  "Full B2B and multi-storefront capability",
  "Ongoing support, maintenance, and growth strategy",
];

const results = [
  { Icon: DollarSign,  text: "Higher revenue from a better shopping experience" },
  { Icon: TrendingUp,  text: "More B2B and B2C conversions at scale" },
  { Icon: Gauge,       text: "Faster, more reliable store performance" },
  { Icon: ShieldCheck, text: "Enterprise grade security and uptime" },
];

const faqs = [
  {
    q: "Who is BigCommerce best suited for?",
    a: "BigCommerce is ideal for mid-to-large businesses, high volume stores, and B2B companies that need enterprise features, multi-storefront capability, and deep integrations: without the limitations of smaller platforms.",
  },
  {
    q: "Can you migrate our store to BigCommerce?",
    a: "Yes, we handle full migrations from Shopify, WooCommerce, Magento, and other platforms: including products, categories, customers, orders, and SEO redirects to protect your rankings.",
  },
  {
    q: "Do you support BigCommerce headless commerce?",
    a: "Yes, we build headless BigCommerce storefronts using Next.js and React: giving you a lightning-fast frontend with BigCommerce powering the commerce engine behind the scenes.",
  },
  {
    q: "Can BigCommerce handle B2B sales?",
    a: "Absolutely. BigCommerce B2B Edition has built in features for customer groups, price lists, quote management, net payment terms, and account hierarchies: ideal for wholesale and B2B businesses.",
  },
  {
    q: "What is multi-storefront and do you set it up?",
    a: "BigCommerce Multi-Storefront lets you manage multiple branded stores or regional sites from a single admin panel. Yes, we configure and customise multi-storefront setups for businesses with multiple brands or markets.",
  },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`bigcommerce_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} style={{ color: "#1A6FE8", flexShrink: 0 }} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`bigcommerce_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const BigCommercePage = () => {
  const _sp = useSettings(['bigcommerce_hero_h1','bigcommerce_hero_sub','bigcommerce_cta_btn']);
  return (
  <PageLayout>
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(26,111,232,0.08) 0%, transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: "#1A6FE8" }}>← Back to All Services</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(26,111,232,0.08)", color: "#1A6FE8", border: "1px solid rgba(26,111,232,0.2)" }}>
              <CreditCard size={12} /> BigCommerce Development
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="bigcommerce_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Enterprise eCommerce on BigCommerce<br /><span style={{ color: "#1A6FE8" }}>Built for Scale, Speed & Growth</span></span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            <span data-cms-key="bigcommerce_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build enterprise grade BigCommerce stores for high volume businesses: with custom themes, B2B capabilities, multi channel selling, and deep integrations.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #1A6FE8, #1558c0)", boxShadow: "0 8px 24px rgba(26,111,232,0.4)" }}>
              <span data-cms-key="bigcommerce_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Build My BigCommerce Store</span> <CreditCard size={15} />
            </Link>
            <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>What We Build</a>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="bigcommerce_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Comprehensive BigCommerce Development Services</span></h2>
          <p className="text-[#6B7280] max-w-xl mx-auto"><span data-cms-key="bigcommerce_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">From custom storefronts to enterprise B2B solutions: everything built for performance and scale.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {serviceGroups.map((group, gi) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.1 }}
              className="rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${group.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: group.bg }}>
                  <group.Icon size={18} style={{ color: group.color }} />
                </div>
                <h3 className="text-[15px] font-bold text-[#0A1628]"><span data-cms-key={`bigcommerce_grp_${gi}_title`} data-cms-label="Group Title" data-cms-attr="text">{group.title}</span></h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: group.color }} />
                    <div>
                      <span className="text-[13.5px] font-semibold text-[#0A1628]"><span data-cms-key={`bigcommerce_grp_${gi}_item_${i}_label`} data-cms-label="Item Label" data-cms-attr="text">{item.label}</span></span>
                      <span className="text-[12.5px] text-[#6B7280]"><span data-cms-key={`bigcommerce_grp_${gi}_item_${i}_desc`} data-cms-label="Item Desc" data-cms-attr="text">: {item.desc}</span></span>
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
            <span className="w-4 h-0.5 rounded-full bg-[#1A6FE8]" /> <span data-cms-key="bigcommerce_h2lbl_18" data-cms-label="Section Label" data-cms-attr="text">What We Build</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {whatWeBuild.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <item.Icon size={18} style={{ color: "#1A6FE8", flexShrink: 0 }} />
              <span className="text-[14px] font-semibold text-[#0A1628]"><span data-cms-key={`bigcommerce_build_${i}_label`} data-cms-label="Build Item" data-cms-attr="text">{item.label}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="bigcommerce_h2lbl_19" data-cms-label="Section Label" data-cms-attr="text">Tools & Tech Stack</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`bigcommerce_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
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
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="bigcommerce_h2lbl_20" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`bigcommerce_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#1A6FE8]" /> <span data-cms-key="bigcommerce_h2lbl_21" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "#F8FAFF", border: "1px solid rgba(26,111,232,0.2)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(26,111,232,0.08)" }}>
                  <r.Icon size={18} style={{ color: "#1A6FE8" }} />
                </div>
                <span className="text-[14.5px] font-medium text-[#374151]"><span data-cms-key={`bigcommerce_result_${i}`} data-cms-label="Result Item" data-cms-attr="text">{r.text}</span></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#1A6FE8]" /> <span data-cms-key="bigcommerce_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
            <span className="w-4 h-0.5 rounded-full bg-[#1A6FE8]" />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="bigcommerce_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="bigcommerce_hl_122" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Scale</span> on <span data-cms-key="bigcommerce_hl_123" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">BigCommerce</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="bigcommerce_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free consultation. We'll assess your current setup, define the migration or build approach, and show you what enterprise grade eCommerce looks like for your business.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Start My BigCommerce Project <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="bigcommerce_x16" data-cms-label="Fine Print" data-cms-attr="text">No generic storefronts — An enterprise grade build designed for your volume and growth.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default BigCommercePage;






