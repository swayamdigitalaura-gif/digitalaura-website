/**
 * SERVICE PAGE — Amazon Marketing & Account Management
 * Route: /services/amazon-marketing
 *
 * Target keywords: amazon marketing services, amazon account management,
 * amazon seller services india, amazon product listing optimisation,
 * amazon ppc management, amazon seo services, amazon seller registration
 */
import { motion } from "framer-motion";
import { submitLead } from "@/lib/submitLead";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import { CASES_BY_CATEGORY } from "@/components/caseCards";
import BlogInsights from "@/components/BlogInsights";
import { RecaptchaBox, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from "@/components/RecaptchaBox";
import { useSettings } from "@/hooks/useSettings";
import { StickyCtaBar } from "@/components/PageCta";
import {
  ArrowRight, Check, CheckCircle2, Lock,
  ShoppingBag, TrendingUp, Target, BarChart3,
  Star, Shield, Package, Image as ImageIcon,
  Search, Zap, Award, Users,
} from "lucide-react";

const accentColor  = "#FF6B2B";
const accent2Color = "#1A6FE8";
const glowOrange   = "rgba(255,107,43,0.10)";
const glowBlue     = "rgba(26,111,232,0.08)";

// ── Service cards ──────────────────────────────────────────────────────────────
const amazonServices = [
  {
    Icon: ShoppingBag,
    color: accentColor,
    bg: glowOrange,
    title: "Amazon Seller Registration",
    desc: "Complete seller account setup from scratch — documentation, category approval, GTIN exemptions, and your first live listings handled end-to-end.",
    tags: ["Account Setup", "Category Approval", "GTIN Exemption"],
  },
  {
    Icon: Search,
    color: accent2Color,
    bg: glowBlue,
    title: "Product Listing Optimisation",
    desc: "Keyword-rich titles, bullet points, and descriptions written to rank in Amazon search and convert browsers into buyers. Backend keywords included.",
    tags: ["Keyword Research", "A9 Optimisation", "Conversion Copy"],
  },
  {
    Icon: Target,
    color: accentColor,
    bg: glowOrange,
    title: "Amazon PPC Management",
    desc: "Sponsored Products, Sponsored Brands, and Sponsored Display campaigns built to maximise ROAS — with continuous bid and keyword optimisation.",
    tags: ["Sponsored Products", "Bid Management", "ACOS Reduction"],
  },
  {
    Icon: Award,
    color: accent2Color,
    bg: glowBlue,
    title: "A+ Content / EBC",
    desc: "Premium Enhanced Brand Content that elevates your product detail page with rich visuals, comparison charts, and storytelling that lifts conversions up to 20%.",
    tags: ["Brand Story", "Comparison Charts", "Rich Media"],
  },
  {
    Icon: Shield,
    color: accentColor,
    bg: glowOrange,
    title: "Brand Registry & Protection",
    desc: "Amazon Brand Registry application, IP violation reporting, and ongoing brand protection so counterfeiters and hijackers can't steal your Buy Box.",
    tags: ["Brand Registry", "IP Protection", "Buy Box"],
  },
  {
    Icon: Package,
    color: accent2Color,
    bg: glowBlue,
    title: "Amazon Storefront Design",
    desc: "A custom Amazon Brand Store that acts as your mini-website on Amazon — shoppable, brand-consistent, and designed to increase cross-sell and basket size.",
    tags: ["Store Design", "Cross-Sell", "Brand Consistency"],
  },
  {
    Icon: BarChart3,
    color: accentColor,
    bg: glowOrange,
    title: "Inventory & Account Management",
    desc: "Day-to-day Seller Central management: inventory monitoring, pricing, suppressed listing fixes, case management, and monthly performance reviews.",
    tags: ["Seller Central", "Inventory", "Case Management"],
  },
  {
    Icon: ImageIcon,
    color: accent2Color,
    bg: glowBlue,
    title: "Product Photography",
    desc: "Amazon-compliant main images, lifestyle shots, and infographic images that meet category requirements and maximise click-through rate from search results.",
    tags: ["White Background", "Lifestyle Shots", "Infographics"],
  },
  {
    Icon: TrendingUp,
    color: accentColor,
    bg: glowOrange,
    title: "Amazon SEO & Ranking Strategy",
    desc: "Organic ranking improvement through keyword indexing audits, competitor gap analysis, review velocity strategy, and content alignment with the A9 algorithm.",
    tags: ["A9 Algorithm", "Keyword Indexing", "Review Strategy"],
  },
];

// ── Why we're better ──────────────────────────────────────────────────────────
const whyUs = [
  "Data-driven PPC strategy focused on ACOS, not just spend",
  "Listing copy written by trained copywriters, not templated AI",
  "Transparent monthly reporting with real revenue attribution",
  "Full account health monitoring — suspension prevention included",
  "Amazon Brand Registry and IP protection handled in-house",
  "Customised strategy per product category and competition level",
];

// ── Process steps ─────────────────────────────────────────────────────────────
const processSteps = [
  { num: "01", title: "Account & Listing Audit",   desc: "Full review of your Seller Central account, listing health, keyword rankings, PPC spend, and account health metrics." },
  { num: "02", title: "Strategy & Keyword Research", desc: "Competitor and keyword analysis mapped to your product catalogue, with an action plan prioritised by revenue impact." },
  { num: "03", title: "Content & Listing Overhaul",  desc: "Title, bullets, description, A+ content, and backend keywords rewritten and optimised for the A9 algorithm and buyers." },
  { num: "04", title: "PPC Launch & Optimisation",   desc: "New campaigns built or existing campaigns restructured, with weekly bid and keyword reviews to improve ACOS over time." },
  { num: "05", title: "Review & Scale",              desc: "Monthly performance reviews, ranking and sales analysis, and continuous improvements to grow your Amazon revenue." },
];

// ── Results bar ───────────────────────────────────────────────────────────────
const results = [
  { stat: "30%",  label: "Avg. ACOS Reduction",  sub: "PPC campaigns · 90 days" },
  { stat: "20%",  label: "Conversion Lift",       sub: "With A+ Content" },
  { stat: "2.8x", label: "Organic Rank Growth",   sub: "Post listing optimisation" },
  { stat: "120+", label: "Brands Launched",        sub: "India, UAE & international" },
];

// ── Audit checklist ───────────────────────────────────────────────────────────
const auditChecklist = [
  "Listing quality score and keyword indexing check",
  "PPC campaign structure, ACOS and wasted spend analysis",
  "Account health dashboard — policy violations & suppressions",
  "A+ Content and storefront eligibility review",
  "Competitor pricing and Buy Box win-rate comparison",
  "Review count, rating velocity, and feedback strategy",
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Do you work with new Amazon sellers or only established ones?",
    a: "Both. We handle everything from first-time seller registration and account setup all the way to full ongoing management and PPC scaling for established brands. The scope is defined in a discovery call.",
  },
  {
    q: "How is Amazon PPC different from Google Ads?",
    a: "Amazon PPC shows ads to buyers who are already searching on Amazon with high purchase intent — it operates within the A9 algorithm, so keyword and product relevance signals are different from Google's auction. We manage each platform with separate strategies.",
  },
  {
    q: "What is A+ Content (Enhanced Brand Content) and do I need it?",
    a: "A+ Content replaces the plain product description with rich images, comparison tables, and brand storytelling. Amazon's own data shows it can increase conversions by up to 20%. It requires Brand Registry, which we can apply for on your behalf.",
  },
  {
    q: "How long before I see results from Amazon account management?",
    a: "Listing and content improvements can show organic ranking movement within 2–4 weeks. PPC improvements in ACOS typically stabilise within the first 60–90 days. Meaningful revenue growth usually builds over 3–6 months as rankings and reviews compound.",
  },
  {
    q: "Do you manage Amazon for Indian sellers or international sellers too?",
    a: "We manage accounts on Amazon India (amazon.in), Amazon UAE, and Amazon Global, including US and UK marketplaces. Cross-border expansion strategy is also available.",
  },
  {
    q: "Can you rescue a suspended Amazon account?",
    a: "Yes — account suspension reinstatement is a service we offer. We analyse the root cause, prepare a Plan of Action, and handle the appeal process with Amazon's Seller Performance team.",
  },
  {
    q: "What does your Amazon account management actually include day to day?",
    a: "Inventory monitoring, listing suppression fixes, pricing updates, PPC bid management, case handling with Amazon support, review monitoring, and a monthly performance review — the full Seller Central workload taken off your plate.",
  },
];

// ── Lead form ─────────────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white focus:ring-[#FF6B2B]";

const AmazonAuditForm = () => {
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const captcha = useRef<RecaptchaHandle>(null);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", asin: "", goal: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const captchaToken = RECAPTCHA_SITE_KEY ? captcha.current?.getToken() ?? "" : "";
    if (RECAPTCHA_SITE_KEY && !captchaToken) return;
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    setError("");
    const r = await submitLead({
      name: form.name, email: form.email, phone: form.phone, company: form.business,
      project: form.goal,
      message: `ASIN / Store URL: ${form.asin}\nGoal: ${form.goal}`,
      honeypot: String(fd.get("company_site") || ""),
      recaptchaToken: captchaToken || undefined,
    }, "amazon-audit-form");
    setSubmitting(false);
    if (r.ok) { setSubmitted(true); captcha.current?.reset(); }
    else { captcha.current?.reset(); setError(r.error ?? "Something went wrong. Please try again."); }
  };

  if (submitted) return (
    <div className="rounded-2xl p-8 bg-white text-center py-10" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,107,43,0.1)" }}>
        <CheckCircle2 size={32} style={{ color: accentColor }} />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628] mb-2">Audit Request Received!</h3>
      <p className="text-[#6B7280]">We'll review your Amazon account and send your free audit within 24 hours.</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-bold text-[#0A1628] mb-1">Get Your Free Amazon Account Audit</h3>
        <p className="text-sm text-[#6B7280] mb-4">Fill in your details and we'll get started within 24 hours.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Full Name *</label>
            <input name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Business Name *</label>
            <input name="business" required value={form.business} onChange={handleChange} placeholder="Your Brand" className={inputClass} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
            <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@brand.com" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone Number *</label>
            <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">ASIN or Amazon Store URL</label>
          <input name="asin" value={form.asin} onChange={handleChange} placeholder="https://amazon.in/your-store or B0XXXXX" className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Goal *</label>
          <select name="goal" required value={form.goal} onChange={handleChange} className={inputClass + " cursor-pointer"}>
            <option value="" disabled>Select your goal...</option>
            <option>Launch my brand on Amazon</option>
            <option>Improve organic rankings & visibility</option>
            <option>Reduce ACOS & improve PPC ROI</option>
            <option>Create A+ Content / Brand Store</option>
            <option>Full account management</option>
            <option>Rescue a suspended account</option>
          </select>
        </div>
        <RecaptchaBox ref={captcha} />
        <input name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={submitting}
          className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
          Get My Free Amazon Audit <ArrowRight size={18} />
        </button>
        <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
          <Lock size={12} /> 100% free — no credit card, no obligation
        </p>
      </form>
    </div>
  );
};

// ── FAQ accordion item ────────────────────────────────────────────────────────
const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => (
  <div className="border-b border-[#E5E7EB] py-6 first:pt-0 last:border-b-0">
    <h3 className="text-[17px] font-bold leading-snug text-[#0A1628] md:text-[18px]">
      <span data-cms-key={`amzn_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span>
    </h3>
    <p className="mt-2 text-[15.5px] leading-relaxed text-[#4B5563]">
      <span data-cms-key={`amzn_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span>
    </p>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const AmazonMarketingPage = () => {
  const sp = useSettings(["amzn_hero_h1", "amzn_hero_sub", "amzn_cta_btn"]);

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full"
            style={{ width: 700, height: 700, top: "-25%", right: "-12%", background: `radial-gradient(circle, ${glowOrange} 0%, transparent 70%)`, filter: "blur(70px)" }} />
          <div className="absolute rounded-full"
            style={{ width: 450, height: 450, bottom: "-10%", left: "-8%", background: `radial-gradient(circle, ${glowBlue} 0%, transparent 70%)`, filter: "blur(60px)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none dot-pattern opacity-25" />

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <Link to="/services/" className="inline-flex items-center gap-1 text-xs font-semibold mb-4 hover:underline" style={{ color: accentColor }}>
              ← Back to All Services
            </Link>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.3)` }}>
                <ShoppingBag size={12} /> Amazon Marketing & Account Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
              <span data-cms-key="amzn_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">
                {sp.amzn_hero_h1 || (<>
                  Grow Your Amazon Sales with<br />
                  <span style={{ color: accentColor }}>Expert Account Management.</span>
                </>)}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
              <span data-cms-key="amzn_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">
                {sp.amzn_hero_sub || "Full-service Amazon marketing — seller registration, listing optimisation, PPC management, A+ content, and Brand Registry — delivered by specialists who understand the A9 algorithm."}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {["Amazon India", "Amazon UAE", "Amazon US/UK", "PPC Management", "A+ Content", "Brand Registry"].map(tag => (
                <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{ background: glowOrange, color: accentColor, border: `1px solid rgba(255,107,43,0.25)` }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="#amazon-audit" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 8px 24px rgba(255,107,43,0.4)` }}>
                <span data-cms-key="amzn_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">{sp.amzn_cta_btn || "Get a Free Amazon Audit"}</span>
                <ArrowRight size={15} />
              </Link>
              <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
                style={{ borderColor: "#0A1628" }}>
                See All Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results Bar ── */}
      <div className="py-12 px-4 md:px-8" style={{ background: "#0A1628" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {results.map((r, i) => (
              <motion.div key={r.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: accentColor }}>+{r.stat}</div>
                <div className="text-white font-bold text-sm mb-1">{r.label}</div>
                <div className="text-[#94A3B8] text-xs">{r.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section id="services-list" className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-4 inline-block"
              style={{ background: glowOrange, color: accentColor }}>
              Amazon Services
            </span>
            <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight">
              Everything Your Amazon Business <span style={{ color: accentColor }}>Needs to Grow</span>
            </h2>
            <p className="text-[#4B5563] max-w-2xl mx-auto mt-4 text-base leading-relaxed">
              From seller account setup to full ongoing management — we handle every part of Amazon so you can focus on your product.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amazonServices.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.09 }}
                className="group rounded-2xl p-6 border bg-white relative overflow-hidden card-hover"
                style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}99)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.bg }}>
                  <s.Icon size={22} style={{ color: s.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[#4B5563] mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: s.bg, color: s.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Digital Aura over others ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block"
              style={{ background: "rgba(255,107,43,0.08)", color: accentColor }}>
              Not Your Typical Amazon Agency
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
              Any Freelancer Can Create Listings.<br className="hidden md:block" />
              Very Few Can Move Your Organic Rank.
            </h2>
            <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">
              Most "Amazon agencies" paste in keyword-stuffed titles and launch PPC campaigns with no negative keyword strategy. The result is mediocre rankings, rising ACOS, and no compound growth. We use a data-backed A9 optimisation process that builds rankings over time, not just ad dependency.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
              {[
                { pain: "Generic listing templates recycled across clients", detail: "No keyword specificity per ASIN" },
                { pain: "PPC campaigns set and forgotten with no bid management", detail: "ACOS climbs, profit disappears" },
                { pain: "No brand protection or Buy Box monitoring", detail: "Hijackers suppress your account" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                  <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                    <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3"
              style={{ background: "rgba(255,107,43,0.06)", borderLeftColor: accentColor }}>
              <span className="font-black text-lg mt-0.5 shrink-0" style={{ color: accentColor }}>⚠</span>
              <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">
                If your Amazon agency reports impressions and clicks but can't show organic rank improvement and ACOS trends, they're burning your budget — not building your brand.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-3xl md:text-[36px] font-bold text-[#0A1628] tracking-tight">
              How We Grow Your Amazon Business
            </h2>
            <p className="text-[#4B5563] mt-3 max-w-xl mx-auto">A five-step process built around measurable outcomes — from audit to scale.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-7 top-8 bottom-8 w-0.5" style={{ background: "linear-gradient(to bottom, transparent, #E5E7EB, transparent)" }} />
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <motion.div key={step.num}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start">
                  <div className="relative shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg z-10"
                    style={{ background: i % 2 === 0 ? `linear-gradient(135deg, ${accentColor}, #e85a1a)` : `linear-gradient(135deg, ${accent2Color}, #1558c0)`, color: "#fff", boxShadow: `0 4px 16px ${i % 2 === 0 ? "rgba(255,107,43,0.35)" : "rgba(26,111,232,0.25)"}` }}>
                    {step.num}
                  </div>
                  <div className="flex-1 p-5 rounded-2xl bg-white border border-[#E5E7EB]" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <h3 className="font-bold text-[#0A1628] text-base mb-1">{step.title}</h3>
                    <p className="text-[14px] text-[#4B5563] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Why Choose Digital Aura for Amazon
            </h2>
            <ul className="space-y-3">
              {whyUs.map((w, i) => (
                <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                  <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                  <span className="text-[14.5px] text-[#374151]">{w}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accent2Color }} /> What Our Amazon Audit Covers
            </h2>
            <div className="space-y-3">
              {auditChecklist.map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: glowBlue }}>
                    <Zap size={14} style={{ color: accent2Color }} />
                  </div>
                  <span className="text-[14.5px] text-[#374151]">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-2xl text-center" style={{ background: glowOrange, border: `1px solid rgba(255,107,43,0.2)` }}>
              <p className="text-sm font-bold text-[#0A1628] mb-3">Free audit — worth ₹12,000</p>
              <Link to="#amazon-audit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)` }}>
                Claim Your Free Audit <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Case Studies ── */}
      <div style={{ marginBottom: "-60px" }}>
        <CaseStudies cases={CASES_BY_CATEGORY.digitalMarketing} />
        <BlogInsights categories={["Digital Marketing", "eCommerce", "PPC"]} />
      </div>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
              Frequently Asked Questions
              <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
            </h2>
          </motion.div>
          <div className="space-y-1">
            {faqs.map((faq, idx) => (
              <motion.div key={faq.q}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
                <FAQItem q={faq.q} a={faq.a} idx={idx} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit CTA + Form ── */}
      <section id="amazon-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #c94e18 40%, #0A1628 100%)` }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">
                Free Amazon Account Audit
              </span>
              <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6">
                Find Out Exactly What's Holding<br />Your Amazon Sales Back
              </h2>
              <p className="text-white/80 text-lg mb-8">
                We'll audit your listings, PPC spend, account health, and ranking potential — then give you a prioritised action plan. No obligation, completely free.
              </p>
              <div className="space-y-3 mb-8">
                {["Full listing quality and keyword audit", "PPC campaign structure and ACOS review", "Account health and suspension risk check", "Competitor ranking gap analysis", "A+ Content and Brand Registry opportunities"].map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-white shrink-0" />
                    <span className="text-white font-medium">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ color: accentColor }}>
                  <Users size={18} style={{ color: accentColor }} />
                </div>
                <div>
                  <p className="text-white text-xs italic">"Organic rank went from page 4 to page 1 within 60 days of their listing overhaul."</p>
                  <p className="text-white/70 text-[10px] mt-0.5">D2C Brand Owner, Amazon India</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <AmazonAuditForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)", color: accentColor }}>
              Let's Build Together
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Ready to <span style={{ color: accentColor }}>Scale</span> on Amazon?
            </h2>
            <p className="text-[#E2E8F0] mb-8 leading-relaxed">
              Book a free Amazon strategy call. We'll review your current account, identify your biggest growth opportunities, and show you exactly what a results-driven Amazon plan looks like for your brand.
            </p>
            <Link to="#amazon-audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #e85a1a)`, boxShadow: `0 4px 20px rgba(255,107,43,0.4)` }}>
              Book My Free Amazon Audit <ArrowRight size={16} />
            </Link>
            <p className="text-[#9CA3AF] text-xs mt-4">No ACOS promises — a real strategy built around organic rank, conversions, and sustainable revenue.</p>
          </motion.div>
        </div>
      </section>

      <div className="h-16 md:hidden" aria-hidden="true" />
      <StickyCtaBar accent={accentColor} label="Get a free Amazon audit" href="#amazon-audit" topic="Amazon Marketing" />
    </PageLayout>
  );
};

export default AmazonMarketingPage;
