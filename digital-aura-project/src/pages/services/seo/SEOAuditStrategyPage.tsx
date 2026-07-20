/**
 * SERVICE DETAIL PAGE — SEO Audit & Strategy
 * Route (to be added): /services/seo-content-marketing/seo-audit-strategy
 * Parent pillar: /services/seo-content-marketing (SEOPage.tsx) — accent #22C55E reused for consistency
 *
 * Target keywords: seo audit services, website seo audit, seo audit company,
 * free seo audit, seo strategy consulting, what is included in an seo audit
 *
 * Integration steps still pending:
 *   1. App.tsx    → add route + import
 *   2. PageSEO.tsx → add PAGE_META + Service/FAQPage JSON-LD entry
 */
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ChevronDown, Check, Search, FileSearch,
  Users, BarChart3, Link2, ClipboardList, Phone,
} from "lucide-react";

const accentColor = "#22C55E";
const glowColor = "rgba(34,197,94,0.12)";

const included = [
  { Icon: FileSearch,   title: "Full Technical Site Crawl",       desc: "Every page crawled for indexing errors, broken links, redirect chains, duplicate content, and crawl budget waste." },
  { Icon: Search,       title: "Keyword Gap Analysis",            desc: "What you rank for, what competitors rank for that you don't, and which of those gaps are worth chasing first." },
  { Icon: Users,        title: "Competitor Benchmarking",         desc: "A side-by-side view of your top 3-5 competitors' rankings, content depth, and backlink profiles." },
  { Icon: BarChart3,    title: "Content Quality Review",          desc: "Which pages are thin, outdated, or targeting the wrong intent, and which are already working and just need reinforcement." },
  { Icon: Link2,        title: "Backlink Profile Audit",          desc: "Toxic or spammy links flagged for disavow, and genuine link-building opportunities identified." },
  { Icon: ClipboardList,title: "Prioritised Action Roadmap",      desc: "Every finding ranked by effort vs. impact, so you know exactly what to fix first, second, and third." },
];

const processSteps = [
  { num: "01", title: "Crawl & Data Collection",        desc: "We crawl your full site and pull data from Google Search Console, Analytics, and your current rankings." },
  { num: "02", title: "Technical & On-Page Analysis",   desc: "Every page is checked against 80+ technical and on-page factors that affect how Google can find, read, and rank it." },
  { num: "03", title: "Competitor & Keyword Gap Study",  desc: "We map what's winning in your niche right now and where the realistic opportunities are for your specific site." },
  { num: "04", title: "Roadmap Delivery & Walkthrough",  desc: "You get the full report plus a call where we walk through the findings in plain English and answer questions." },
];

const commonIssues = [
  "Pages that took months to rank quietly losing position because nobody noticed a technical error",
  "Duplicate or near-duplicate content competing against itself in search results",
  "Money pages buried three clicks deep with almost no internal links pointing to them",
  "Meta titles and descriptions that were never written for humans, only for a template",
  "A backlink profile with toxic links quietly working against the domain's authority",
  "Core Web Vitals failing on mobile, which caps how high a page can rank regardless of content quality",
];

const faqs = [
  { q: "What is an SEO audit and what does it actually include?", a: "An SEO audit is a full review of a website's technical health, on-page optimisation, content quality, and backlink profile, benchmarked against real competitors. Ours includes a full site crawl, keyword gap analysis, competitor benchmarking, content review, backlink audit, and a prioritised action roadmap." },
  { q: "How long does an SEO audit take?", a: "A standard audit for a site under 500 pages typically takes 5-7 working days from kickoff to the final report and walkthrough call. Larger or more complex sites can take up to 2 weeks." },
  { q: "How much does an SEO audit cost?", a: "Audit pricing depends on site size and complexity. A free initial audit is available to assess fit; a full in-depth audit with a custom strategy roadmap is quoted after a short discovery call." },
  { q: "Do I need an SEO audit if my site is already ranking well?", a: "Yes — audits aren't only for underperforming sites. Rankings can quietly erode from technical issues, algorithm updates, or new competitors, and a periodic audit catches problems before they show up as a traffic drop." },
  { q: "What's the difference between an SEO audit and an SEO strategy?", a: "An audit tells you what's wrong and what's working right now. A strategy is the plan built from those findings — which keywords to target, what content to create, and in what order, tied to your business goals." },
  { q: "Will someone walk me through the findings, or do I just get a PDF?", a: "You get a full written report plus a live call where we walk through every finding in plain English, answer questions, and agree on next steps together." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`seoaudit_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`seoaudit_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const relatedServices = [
  { label: "On Page SEO",     href: "/services/seo-content-marketing/on-page-seo" },
  { label: "Technical SEO",   href: "/services/seo-content-marketing/technical-seo" },
  { label: "Local SEO",       href: "/services/seo-content-marketing/local-seo" },
  { label: "Off Page SEO",    href: "/services/seo-content-marketing/off-page-seo" },
  { label: "eCommerce SEO",   href: "/services/seo-content-marketing/ecommerce-seo" },
];

const SEOAuditStrategyPage = () => {
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
              <FileSearch size={12} /> SEO Audit &amp; Strategy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black leading-[1.12] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="seoaudit_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">SEO Audit &amp; Strategy Services<br />
            <span style={{ color: accentColor }}>That Turn Data Into a Roadmap</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            <span data-cms-key="seoaudit_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">An SEO audit is a full review of your site's technical health, on-page optimisation, content, and backlinks, benchmarked against real competitors, so every recommendation is prioritised by actual impact, not guesswork.</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Full Site Crawl", "Keyword Gap Analysis", "Competitor Benchmarking", "Prioritised Roadmap"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Get My Free SEO Audit <Search size={15} />
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> What's Included in Every Audit
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg mx-auto">Six areas covered in full depth, not a surface-level checklist.</p>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> How the Audit Process Works
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> What Audits Actually Find
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg">Real, recurring issues we uncover across the sites we audit — the kind that stay invisible until someone looks.</p>
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
            <Link key={s.href} to={s.href} className="text-[13px] font-semibold px-4 py-2 rounded-full border transition-all hover:-translate-y-0.5"
              style={{ borderColor: "#E5E7EB", color: "#374151" }}>{s.label}</Link>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to See What's Really Holding Your Rankings Back?</h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Book a free SEO audit call. We'll review your site, flag the biggest opportunities, and show you exactly what a full audit and roadmap would cover — no strings attached.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
            Book My Free SEO Audit <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4">No vanity metrics — a real audit built around what actually moves rankings and revenue.</p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default SEOAuditStrategyPage;
