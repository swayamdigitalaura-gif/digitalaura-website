/**
 * SERVICE DETAIL PAGE — Technical SEO
 * Route (to be added): /services/seo-content-marketing/technical-seo
 * Parent pillar: /services/seo-content-marketing (SEOPage.tsx) — accent #22C55E reused for consistency
 *
 * Target keywords: technical seo services, technical seo audit, technical seo
 * company, core web vitals optimization, technical seo checklist, crawlability
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ChevronDown, Check, Gauge, Bot as CrawlIcon,
  Smartphone, Link2, FileCode, ShieldCheck,
} from "lucide-react";

const accentColor = "#22C55E";
const glowColor = "rgba(34,197,94,0.12)";

const included = [
  { Icon: CrawlIcon,  title: "Crawlability & Indexation",   desc: "Robots.txt, XML sitemaps, and crawl budget reviewed so Google can actually find and index every important page." },
  { Icon: Gauge,      title: "Core Web Vitals & Page Speed", desc: "LCP, INP, and CLS scores diagnosed and fixed — the metrics Google uses directly as ranking signals." },
  { Icon: Smartphone, title: "Mobile Usability",             desc: "Every page checked for mobile rendering issues, since Google indexes and ranks based on the mobile version of your site." },
  { Icon: Link2,      title: "Canonical & Redirect Health",  desc: "Duplicate content resolved with proper canonical tags, and redirect chains cleaned up so link equity isn't lost." },
  { Icon: FileCode,   title: "Structured Data & Schema",     desc: "Schema markup implemented and validated so search engines and AI crawlers can parse your content correctly." },
  { Icon: ShieldCheck,title: "Security & HTTPS",             desc: "SSL configuration, mixed content issues, and security headers reviewed — trust signals Google checks directly." },
];

const processSteps = [
  { num: "01", title: "Full Technical Crawl",           desc: "Every URL crawled and checked against 80+ technical health factors, from status codes to render-blocking scripts." },
  { num: "02", title: "Core Web Vitals Diagnosis",       desc: "Real-user and lab data analysed to find exactly what's slowing down LCP, INP, and CLS on your key pages." },
  { num: "03", title: "Fix Implementation",              desc: "Technical fixes deployed — code, server config, and structured data — prioritised by ranking impact." },
  { num: "04", title: "Verification in Search Console",  desc: "Every fix confirmed as resolved in Google Search Console, not just assumed fixed after deployment." },
];

const commonIssues = [
  "Thousands of pages accidentally blocked from crawling by a single robots.txt rule",
  "Core Web Vitals failing on mobile because of unoptimised images and render-blocking JavaScript",
  "Redirect chains three or four hops long, quietly leaking link equity with every hop",
  "Duplicate content across HTTP and HTTPS, or www and non-www versions, splitting ranking signals",
  "XML sitemaps listing pages that 404, confusing crawl priority signals to Google",
  "Missing or broken schema markup, so pages miss out on rich results and AI Overview eligibility",
];

const faqs = [
  { q: "What is technical SEO and why does it matter?", a: "Technical SEO covers everything that affects how search engines crawl, index, and render your site — site speed, mobile usability, crawlability, structured data, and security. It matters because no amount of great content will rank if Google can't properly access or understand your pages." },
  { q: "What are Core Web Vitals and do they really affect rankings?", a: "Core Web Vitals are Google's metrics for loading speed (LCP), interactivity (INP), and visual stability (CLS). Yes, they're a confirmed ranking factor, and pages that fail them are also proven to lose users before content is even seen." },
  { q: "How do I know if my site has technical SEO problems?", a: "Common signs include pages that rank well but suddenly drop, slow load times reported in PageSpeed Insights, or a gap between how many pages you have and how many Google Search Console shows as indexed. A technical audit reveals the exact list." },
  { q: "Will fixing technical SEO issues improve my rankings immediately?", a: "Some fixes, like resolving a blocked crawl directive, can show impact within days. Others, like Core Web Vitals improvements, typically show measurable ranking movement within 4-8 weeks as Google re-crawls and re-evaluates the site." },
  { q: "Do you need developer access to fix technical SEO issues?", a: "For most fixes, yes — changes typically require code, server configuration, or CMS-level access. We work directly with your development team or CMS admin to implement fixes safely." },
  { q: "How often should technical SEO be checked?", a: "A full technical audit is recommended quarterly, with continuous monitoring for crawl errors and Core Web Vitals in between, since site changes and algorithm updates can introduce new technical issues at any time." },
];

const relatedServices = [
  { label: "SEO Audit & Strategy", href: "/services/seo-content-marketing/seo-audit-strategy" },
  { label: "On Page SEO",          href: "/services/seo-content-marketing/on-page-seo" },
  { label: "Local SEO",            href: "/services/seo-content-marketing/local-seo" },
  { label: "Off Page SEO",         href: "/services/seo-content-marketing/off-page-seo" },
  { label: "eCommerce SEO",        href: "/services/seo-content-marketing/ecommerce-seo" },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`techseo_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`techseo_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const TechnicalSEOPage = () => {
  return (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services/seo-content-marketing" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>← Back to SEO &amp; Content Marketing</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <Gauge size={12} /> Technical SEO
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black leading-[1.12] text-[#0A1628] mb-5 tracking-tight">
            Technical SEO Services<br /><span style={{ color: accentColor }}>That Fix What's Blocking Google</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            Technical SEO fixes crawlability, page speed, Core Web Vitals, mobile usability, and structured data — the foundation that determines whether search engines can even access and rank your best content.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Core Web Vitals", "Crawlability", "Mobile Usability", "Schema Markup"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Get a Free Technical Audit <Gauge size={15} />
            </Link>
            <a href="#included" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>See What's Included</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* What's Included */}
    <section id="included" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> What Technical SEO Covers
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {included.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accentColor}12` }}>
                <s.Icon size={20} style={{ color: accentColor }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]">{s.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> How We Fix Technical Issues
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
              <span className="inline-block text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-3" style={{ background: `${accentColor}12`, color: accentColor }}>Step {step.num}</span>
              <h3 className="font-black text-[#0A1628] text-[14.5px] leading-snug mb-2">{step.title}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Common Issues */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Technical Issues We Find Most Often
          </h2>
        </motion.div>
        <div className="space-y-3">
          {commonIssues.map((issue, i) => (
            <motion.div key={issue} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span className="text-[14px] text-[#374151] leading-relaxed">{issue}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Frequently Asked Questions <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
              <FAQItem q={f.q} a={f.a} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Related Services */}
    <section className="py-12 px-4 md:px-8 bg-white" style={{ borderTop: "1px solid #F3F4F6" }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-4" style={{ color: "#9CA3AF" }}>Related SEO Services</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {relatedServices.map(s => (
            <Link key={s.href} to={s.href} className="text-[13px] font-semibold px-4 py-2 rounded-full border transition-all hover:-translate-y-0.5" style={{ borderColor: "#E5E7EB", color: "#374151" }}>{s.label}</Link>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #22C55E, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #22C55E, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}40`, color: accentColor }}>Let's Build Together</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Clear the Technical Roadblocks?</h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Book a free technical audit call. We'll show you exactly what's blocking Google from crawling, indexing, or ranking your best pages.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
            Book My Free Audit <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default TechnicalSEOPage;
