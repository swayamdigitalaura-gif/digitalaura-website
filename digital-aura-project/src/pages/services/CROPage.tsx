import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, MousePointer, BarChart2, Layout, Target, TrendingUp, Gauge, DollarSign, ShieldCheck, ChevronDown, Check, Zap, Eye, FileSearch, Layers, RefreshCw, Users } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";

const accentColor = "#FF6B2B";
const glowColor = "rgba(255,107,43,0.12)";

const serviceGroups = [
  {
    title: "Website & Funnel Audits",
    color: "#FF6B2B",
    bg: "rgba(255,107,43,0.06)",
    border: "rgba(255,107,43,0.2)",
    Icon: FileSearch,
    items: [
      { label: "Landing Page Audit & Redesign", desc: "Identify friction points and redesign for maximum conversion" },
      { label: "Conversion Funnel Analysis", desc: "Map every step of your funnel and find where users drop off" },
      { label: "UX & Usability Review", desc: "Evaluate user experience against conversion best practices" },
      { label: "Checkout & Form Optimisation", desc: "Reduce abandonment at the most critical conversion points" },
      { label: "Page Speed & Core Web Vitals", desc: "Fix performance issues that silently kill conversions" },
    ],
  },
  {
    title: "Testing & Experimentation",
    color: "#6C47FF",
    bg: "rgba(108,71,255,0.06)",
    border: "rgba(108,71,255,0.2)",
    Icon: FlaskConical,
    items: [
      { label: "A/B Testing", desc: "Test two versions of a page or element to find what converts better" },
      { label: "Multivariate Testing", desc: "Test multiple variables simultaneously for faster insights" },
      { label: "CTA Optimisation & Copywriting", desc: "Test button text, placement, and design for higher click rates" },
      { label: "Headline & Copy Testing", desc: "Find the messaging that resonates most with your audience" },
      { label: "Rapid Testing Cycles", desc: "Fast iteration to find winners and scale what works" },
    ],
  },
  {
    title: "Data & User Behaviour",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.06)",
    border: "rgba(26,111,232,0.2)",
    Icon: Eye,
    items: [
      { label: "Heatmap & Click Map Analysis", desc: "See exactly where users click, scroll, and lose interest" },
      { label: "Session Recording Review", desc: "Watch real user sessions to spot confusion and friction" },
      { label: "User Flow & Behaviour Analysis", desc: "Understand how visitors navigate your site and where they leave" },
      { label: "Conversion Tracking Setup", desc: "Ensure every goal and micro-conversion is properly tracked" },
      { label: "Actionable Reports with Clear Next Steps", desc: "No jargon: just insights and a prioritised action plan" },
    ],
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Audit & Diagnose",
    desc: "We conduct a full audit of your website, landing pages, and funnels: using heatmaps, session recordings, and analytics to identify exactly where and why you're losing conversions.",
    color: "#FF6B2B",
    bg: "rgba(255,107,43,0.06)",
  },
  {
    step: "02",
    title: "Hypothesise & Plan",
    desc: "Based on the audit, we prioritise the highest impact changes and build a testing roadmap: so you always know what we're working on and why.",
    color: "#6C47FF",
    bg: "rgba(108,71,255,0.06)",
  },
  {
    step: "03",
    title: "Test & Experiment",
    desc: "We run A/B and multivariate tests on the most critical pages and elements: headlines, CTAs, layouts, forms: with statistically valid results before declaring a winner.",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.06)",
  },
  {
    step: "04",
    title: "Implement & Scale",
    desc: "Winning variations are implemented and we move to the next highest opportunity. Every test builds on the last: compounding your conversion growth over time.",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.06)",
  },
];

const toolGroups = [
  {
    label: "Testing Tools",
    color: "#FF6B2B",
    bg: "rgba(255,107,43,0.08)",
    pills: ["Google Optimize", "VWO", "AB Tasty", "Optimizely"],
  },
  {
    label: "Heatmaps & Recordings",
    color: "#6C47FF",
    bg: "rgba(108,71,255,0.08)",
    pills: ["Hotjar", "Microsoft Clarity", "Lucky Orange"],
  },
  {
    label: "Analytics",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    pills: ["GA4", "Google Tag Manager", "Mixpanel"],
  },
  {
    label: "UX & Design",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    pills: ["Figma", "UserTesting", "Maze"],
  },
];

const whatWeOptimise = [
  { Icon: Layout,       label: "Landing Pages" },
  { Icon: FlaskConical, label: "A/B & Multivariate Tests" },
  { Icon: Target,       label: "Conversion Funnels" },
  { Icon: MousePointer, label: "Heatmap & Session Analysis" },
  { Icon: Zap,          label: "CTAs & Button Copy" },
  { Icon: Layers,       label: "Checkout & Forms" },
  { Icon: Users,        label: "Audience Segmentation" },
  { Icon: RefreshCw,    label: "Re engagement Flows" },
  { Icon: BarChart2,    label: "eCommerce Product Pages" },
];

const whyUs = [
  "Data driven decisions, not assumptions or guesswork",
  "Full funnel approach from first click to final sale",
  "Rapid testing cycles with statistically valid results",
  "UX improvements backed by real user behaviour data",
  "Higher ROI from your existing traffic: no extra ad spend",
  "Actionable reports with clear priorities and next steps",
];

const results = [
  { Icon: DollarSign,  text: "More revenue from existing traffic" },
  { Icon: TrendingUp,  text: "Higher conversion rates across funnels" },
  { Icon: Gauge,       text: "Reduced bounce and drop off rates" },
  { Icon: ShieldCheck, text: "Data backed decisions with clear ROI" },
];

const faqs = [
  {
    q: "What is Conversion Rate Optimisation (CRO)?",
    a: "CRO is the process of increasing the percentage of website visitors who take a desired action: such as filling a form, making a purchase, or booking a call: without increasing your ad spend or traffic.",
  },
  {
    q: "How long does CRO take to show results?",
    a: "Initial improvements can often be implemented within the first few weeks. A/B tests typically run for 2-4 weeks to gather statistically significant data, with compounding gains over 3-6 months of continuous testing.",
  },
  {
    q: "Do I need a lot of traffic for CRO to work?",
    a: "You need sufficient traffic to run statistically valid tests: generally 500-1,000 monthly visitors per page minimum. For lower-traffic sites, we focus on direct UX improvements and qualitative research first.",
  },
  {
    q: "What pages do you typically optimise?",
    a: "We focus on the highest impact pages: landing pages, homepage, product/service pages, checkout flows, lead gen forms, and any page with high traffic but low conversion rates.",
  },
  {
    q: "Will CRO change the design of my website?",
    a: "Changes are made incrementally and test-driven: we don't redesign your whole site. We test specific elements (headlines, CTAs, layouts) and only implement changes that are proven to improve conversions.",
  },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`cro_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="cro_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`cro_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const CROPage = () => {
  const _sp = useSettings(['cro_hero_h1','cro_hero_sub','cro_cta_btn']);
  return (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(108,71,255,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>
            ← Back to All Services
          </Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <FlaskConical size={12} /> Conversion Rate Optimisation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="cro_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Turn More Visitors Into<br />
            <span style={{ color: accentColor }}>Paying Customers</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            <span data-cms-key="cro_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">Stop losing leads from your existing traffic. We audit, test, and optimise your funnels so more visitors take action: without spending more on ads.</span>
          </p>
          {/* stat pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["More Revenue, Same Traffic", "A/B & Multivariate Testing", "Heatmap Analysis", "Funnel Optimisation"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,107,43,0.08)", color: accentColor, border: "1px solid rgba(255,107,43,0.2)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              <span data-cms-key="cro_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Optimise My Funnel</span> <FlaskConical size={15} />
            </Link>
            <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>What We Do</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── What Is CRO: stat cards ── */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-3"><span data-cms-key="cro_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Why CRO is the Fastest Way to Grow Revenue</span></h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed"><span data-cms-key="cro_p_25" data-cms-label="Body Text" data-cms-attr="text">CRO is the fastest way to grow revenue without increasing your ad spend. We use data, heatmaps, session recordings, and A/B testing to identify exactly where you're losing customers: and then fix it. More conversions from the same traffic means a better ROI on everything you do.</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { stat: "2×", label: "Average conversion lift with CRO", color: "#FF6B2B", bg: "rgba(255,107,43,0.08)" },
            { stat: "0%", label: "Extra ad spend needed to grow revenue", color: "#22C55E", bg: "rgba(34,197,94,0.08)" },
            { stat: "4, 6 wks", label: "To see first A/B test results", color: "#6C47FF", bg: "rgba(108,71,255,0.08)" },
            { stat: "100%", label: "Data driven, no guesswork decisions", color: "#1A6FE8", bg: "rgba(26,111,232,0.08)" },
          ].map((s, si) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.08 }}
              className="rounded-2xl p-6 text-center" style={{ background: "#fff", border: `1px solid ${s.color}20`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="text-3xl font-black mb-2" style={{ color: s.color }}>{s.stat}</div>
              <p className="text-[12.5px] text-[#6B7280] leading-snug"><span data-cms-key={`cro_s_${i}_label`} data-cms-label="Step Label" data-cms-attr="text">{s.label}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Services ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="cro_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">Comprehensive CRO Services</span></h2>
          <p className="text-[#6B7280] max-w-xl mx-auto"><span data-cms-key="cro_s12_sub" data-cms-label="Section Subtext" data-cms-attr="text">Everything from audits and heatmaps to A/B testing and funnel redesigns: handled end to end.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {serviceGroups.map((group, gi) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.1 }}
              className="rounded-2xl p-6" style={{ background: "#F8FAFF", border: `1px solid ${group.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: group.bg }}>
                  <group.Icon size={18} style={{ color: group.color }} />
                </div>
                <h3 className="text-[15px] font-bold text-[#0A1628]"><span data-cms-key={`cro_grp_${gi}_title`} data-cms-label="Group Title" data-cms-attr="text">{group.title}</span></h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: group.color }} />
                    <div>
                      <span className="text-[13.5px] font-semibold text-[#0A1628]"><span data-cms-key={`cro_grp_${gi}_item_${i}_label`} data-cms-label="Item Label" data-cms-attr="text">{item.label}</span></span>
                      <span className="text-[12.5px] text-[#6B7280]"><span data-cms-key={`cro_grp_${gi}_item_${i}_desc`} data-cms-label="Item Desc" data-cms-attr="text">: {item.desc}</span></span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── How It Works ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2 mb-1">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="cro_h2lbl_30" data-cms-label="Section Label" data-cms-attr="text">How Our CRO Process Works</span>
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {howItWorks.map((step, i) => (
            <motion.div key={step.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: step.color }}>{step.step}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`cro_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`cro_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
            </motion.div>
          ))}
        </div>
        {/* Desktop: split timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: `linear-gradient(180deg, transparent, ${accentColor} 8%, ${accentColor} 92%, transparent)` }} />
          <div className="space-y-8">
            {howItWorks.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={step.step} initial={{ opacity: 0, x: isLeft ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1 group" style={{ padding: isLeft ? "0 24px 0 0" : "0 0 0 24px" }}>
                    <div className="bg-white rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}50)` }} />
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block" style={{ color: step.color, background: `${step.color}15` }}>Phase {step.step}</span>
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`cro_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`cro_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: step.color }}>
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* ── What We Optimise ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="cro_h2lbl_26" data-cms-label="Section Label" data-cms-attr="text">What We Optimise</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {whatWeOptimise.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <item.Icon size={18} style={{ color: accentColor, flexShrink: 0 }} />
              <span className="text-[14px] font-semibold text-[#0A1628]"><span data-cms-key={`cro_build_${i}_label`} data-cms-label="Build Item" data-cms-attr="text">{item.label}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Tools ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="cro_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Tools & Technologies We Use</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="cro_s13_sub" data-cms-label="Section Subtext" data-cms-attr="text">Industry-leading tools for testing, tracking, and behaviour analysis.</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`cro_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
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

    {/* ── Why Us + Results ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="cro_h2lbl_28" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`cro_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="cro_h2lbl_29" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: "#F8FAFF", border: `1px solid ${accentColor}20` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accentColor}10` }}>
                  <r.Icon size={18} style={{ color: accentColor }} />
                </div>
                <span className="text-[14.5px] font-medium text-[#374151]"><span data-cms-key={`cro_result_${i}`} data-cms-label="Result Item" data-cms-attr="text">{r.text}</span></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="cro_h2lbl_31" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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

    {/* ── CTA Banner ── */}


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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="cro_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="cro_hl_131" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Convert More</span> of the Traffic You Already Have?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="cro_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free CRO Audit. We'll review your highest traffic pages, identify your biggest conversion leaks, and show you exactly what changes will move the needle.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Free CRO Audit <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="cro_x18" data-cms-label="Fine Print" data-cms-attr="text">No redesigns for the sake of it — Every change tested and validated against real user data.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default CROPage;






