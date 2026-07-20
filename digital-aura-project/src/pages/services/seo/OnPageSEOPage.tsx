/**
 * SERVICE DETAIL PAGE — On Page SEO
 * Route (to be added): /services/seo-content-marketing/on-page-seo
 * Parent pillar: /services/seo-content-marketing (SEOPage.tsx) — accent #22C55E reused for consistency
 *
 * Target keywords: on page seo services, on page seo optimization, on-page seo
 * checklist, on page seo company, on page seo elements, title tag optimization
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ChevronDown, Check, FileText, Heading,
  Link2, ImageIcon, Gauge, ListTree,
} from "lucide-react";

const accentColor = "#22C55E";
const glowColor = "rgba(34,197,94,0.12)";

const included = [
  { Icon: Heading,  title: "Title Tags & Meta Descriptions",  desc: "Every page gets a unique, keyword-aligned title and description written to earn the click, not just the impression." },
  { Icon: FileText, title: "Header Structure (H1-H6)",        desc: "A logical heading hierarchy that tells Google exactly what each section is about and improves readability for users." },
  { Icon: ListTree, title: "Keyword Mapping",                  desc: "Every page assigned a primary and set of secondary keywords, matched to real search intent, not stuffed in randomly." },
  { Icon: Link2,    title: "Internal Linking",                 desc: "Strategic links between related pages that pass authority to your priority pages and help users find what's next." },
  { Icon: ImageIcon,title: "Image Alt Text & Optimisation",     desc: "Descriptive alt text for accessibility and image search, plus compressed file sizes that don't slow the page down." },
  { Icon: Gauge,    title: "Content-to-Intent Alignment",       desc: "Content restructured so it directly answers what the searcher actually wants, which is what keeps them on the page." },
];

const processSteps = [
  { num: "01", title: "Page-by-Page Content Audit",     desc: "Every target page reviewed against its assigned keyword and current ranking position." },
  { num: "02", title: "On-Page Element Rewrite",        desc: "Titles, meta descriptions, headings, and body copy rewritten or restructured for both users and search engines." },
  { num: "03", title: "Internal Link Mapping",          desc: "A linking structure built so authority flows to the pages that matter most to your business." },
  { num: "04", title: "Implementation & Verification",  desc: "Changes are pushed live and verified in Google Search Console to confirm they're indexed correctly." },
];

const commonIssues = [
  "Title tags that are duplicated across dozens of pages, so Google can't tell which one to rank",
  "H1 headings that don't contain the target keyword at all, or worse, multiple H1s on one page",
  "Money pages with zero internal links pointing to them from anywhere else on the site",
  "Meta descriptions left blank, so Google auto-generates one that doesn't sell the click",
  "Images with generic file names and no alt text, missing out on image search traffic entirely",
  "Content written for a keyword that doesn't match what the page's H1 and title actually promise",
];

const faqs = [
  { q: "What is on-page SEO and why does it matter?", a: "On-page SEO is the practice of optimising individual pages — titles, headings, content, internal links, and images — so search engines understand what the page is about and rank it for the right searches. It matters because even great content won't rank if the on-page signals don't clearly match search intent." },
  { q: "What's the difference between on-page and off-page SEO?", a: "On-page SEO covers everything you control directly on your own pages: content, titles, headings, and internal links. Off-page SEO covers external signals like backlinks and brand mentions from other websites." },
  { q: "How many keywords should one page target?", a: "One primary keyword per page, supported by 3-5 closely related secondary keywords and variations. Targeting too many unrelated keywords on one page dilutes relevance and confuses search engines about what the page is really for." },
  { q: "Will on-page SEO changes affect my current rankings?", a: "Well-executed on-page changes typically improve rankings within weeks, since they directly clarify relevance signals to Google. Poorly planned changes — like removing ranking content — can hurt, which is why every change is mapped against current performance data first." },
  { q: "Do you rewrite existing content or just the technical elements?", a: "Both, where needed. Some pages only need title, meta, and heading fixes; others need the body content itself restructured or expanded to properly match search intent." },
  { q: "How long does an on-page SEO project take?", a: "For a site with 20-50 pages, a full on-page optimisation pass typically takes 2-3 weeks. Larger sites are prioritised by traffic and revenue potential so the highest-impact pages are fixed first." },
];

const relatedServices = [
  { label: "SEO Audit & Strategy", href: "/services/seo-content-marketing/seo-audit-strategy" },
  { label: "Technical SEO",        href: "/services/seo-content-marketing/technical-seo" },
  { label: "Local SEO",            href: "/services/seo-content-marketing/local-seo" },
  { label: "Off Page SEO",         href: "/services/seo-content-marketing/off-page-seo" },
  { label: "eCommerce SEO",        href: "/services/seo-content-marketing/ecommerce-seo" },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`onpageseo_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`onpageseo_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const OnPageSEOPage = () => {
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
              <FileText size={12} /> On Page SEO
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black leading-[1.12] text-[#0A1628] mb-5 tracking-tight">
            On Page SEO Services<br /><span style={{ color: accentColor }}>Built Around Search Intent</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            On-page SEO optimises the titles, headings, content, internal links, and images on every page of your site so Google understands exactly what each page is about — and ranks it for the searches that actually matter.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Title & Meta Optimisation", "Keyword Mapping", "Internal Linking", "Content Structure"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Get a Free On-Page Review <FileText size={15} />
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> What On-Page SEO Covers
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> How We Optimise Every Page
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> On-Page Issues We Find Most Often
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Make Every Page Work as Hard as It Should?</h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Book a free on-page review. We'll show you exactly which pages are underperforming and what specific changes would move them.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
            Book My Free Review <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default OnPageSEOPage;
