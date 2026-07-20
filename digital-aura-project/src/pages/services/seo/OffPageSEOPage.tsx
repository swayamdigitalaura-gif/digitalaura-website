/**
 * SERVICE DETAIL PAGE — Off Page SEO
 * Route (to be added): /services/seo-content-marketing/off-page-seo
 * Parent pillar: /services/seo-content-marketing (SEOPage.tsx) — accent #22C55E reused for consistency
 *
 * Target keywords: off page seo services, link building services, backlink
 * building company, off-page seo agency, guest posting services, digital PR
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ChevronDown, Check, Link2, Newspaper,
  Users, ShieldCheck, TrendingUp, Search,
} from "lucide-react";

const accentColor = "#22C55E";
const glowColor = "rgba(34,197,94,0.12)";

const included = [
  { Icon: Newspaper, title: "Guest Posting & Outreach",   desc: "Manual outreach to authoritative, niche-relevant websites for genuinely earned guest post placements." },
  { Icon: Users,     title: "Digital PR Campaigns",        desc: "Newsworthy stories and data pitched to journalists and publications for high-authority editorial links." },
  { Icon: Link2,     title: "Brand Mention Outreach",       desc: "Unlinked mentions of your brand across the web tracked down and converted into proper backlinks." },
  { Icon: ShieldCheck,title: "Toxic Link Disavowal",        desc: "Spammy or unnatural links identified and disavowed to protect your domain from algorithmic penalties." },
  { Icon: TrendingUp,title: "Domain Authority Building",     desc: "A steady, natural-looking link velocity that builds authority without triggering spam filters." },
  { Icon: Search,    title: "Competitor Backlink Analysis",  desc: "Your competitors' link profiles reverse-engineered to find realistic, replicable link opportunities." },
];

const processSteps = [
  { num: "01", title: "Backlink Profile Audit",        desc: "Your current link profile analysed for toxic links, missed opportunities, and competitor gaps." },
  { num: "02", title: "Target List Building",          desc: "A vetted list of relevant, authoritative sites built based on niche relevance and real traffic, not just Domain Authority scores." },
  { num: "03", title: "Manual Outreach & Placement",   desc: "Every pitch personalised and sent manually — no automated blasts or private blog networks." },
  { num: "04", title: "Link Monitoring & Reporting",   desc: "Every earned link tracked and reported monthly, with dead or removed links flagged for follow-up." },
];

const commonIssues = [
  "A backlink profile dominated by low-quality directory links from years of outdated SEO tactics",
  "Zero links from any site with real topical relevance to the business's actual industry",
  "Toxic or spammy links from link farms quietly suppressing the domain's overall authority",
  "Dozens of unlinked brand mentions across the web that were never converted into backlinks",
  "A link velocity so slow that domain authority has been flat for over a year",
  "Guest posts published on sites with no real traffic or relevance, wasting outreach effort",
];

const faqs = [
  { q: "What is off-page SEO?", a: "Off-page SEO covers everything that builds your site's authority from outside your own domain — primarily backlinks from other websites, along with brand mentions and digital PR. It signals to Google that other credible sites vouch for your content." },
  { q: "Is link building still effective, or does Google penalise it?", a: "Earned, relevant backlinks are still one of Google's strongest ranking factors. What gets penalised is manipulative link building — private blog networks, paid link schemes, and irrelevant mass link placements. We only do manual, relevant outreach." },
  { q: "How many backlinks do I need to rank?", a: "There's no fixed number — what matters is relevance and authority relative to what's already ranking for your target keywords. A competitor analysis reveals the realistic link profile needed to compete." },
  { q: "What's the difference between link building and digital PR?", a: "Link building is direct outreach to place links on relevant sites. Digital PR earns links indirectly by pitching newsworthy stories, data, or expert commentary to journalists and publications, often resulting in higher-authority coverage." },
  { q: "Can bad backlinks hurt my site?", a: "Yes — toxic or spammy links can trigger algorithmic devaluation or, in severe cases, manual penalties. Part of off-page SEO is auditing the existing profile and disavowing harmful links." },
  { q: "How long does it take to see results from link building?", a: "Individual links can be indexed within days, but their ranking impact typically compounds over 2-4 months as Google re-evaluates the site's overall authority signals." },
];

const relatedServices = [
  { label: "SEO Audit & Strategy", href: "/services/seo-content-marketing/seo-audit-strategy" },
  { label: "On Page SEO",          href: "/services/seo-content-marketing/on-page-seo" },
  { label: "Technical SEO",        href: "/services/seo-content-marketing/technical-seo" },
  { label: "Local SEO",            href: "/services/seo-content-marketing/local-seo" },
  { label: "eCommerce SEO",        href: "/services/seo-content-marketing/ecommerce-seo" },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`offpageseo_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`offpageseo_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const OffPageSEOPage = () => {
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
              <Link2 size={12} /> Off Page SEO
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black leading-[1.12] text-[#0A1628] mb-5 tracking-tight">
            Off Page SEO Services<br /><span style={{ color: accentColor }}>That Build Real Authority</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            Off-page SEO earns high-quality backlinks and brand mentions from authoritative, niche-relevant websites through manual outreach and digital PR, building the domain authority Google rewards with higher rankings.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Manual Outreach", "Digital PR", "Guest Posting", "Toxic Link Cleanup"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Get a Free Backlink Audit <Link2 size={15} />
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> What Off-Page SEO Covers
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> How We Build Authority
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Backlink Issues We Find Most Often
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build Authority That Actually Holds?</h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Book a free backlink audit. We'll show you exactly where your link profile stands against competitors and what's realistic to build.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>
            Book My Free Audit <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default OffPageSEOPage;
