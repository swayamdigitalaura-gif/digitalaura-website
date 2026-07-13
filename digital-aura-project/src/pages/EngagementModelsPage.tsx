import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import {
  ArrowRight, CheckCircle2, Clock, DollarSign,
  Users, RefreshCw, Zap, Shield, BarChart3, MessageCircle,
  Target, Layers, TrendingUp, Check,
} from "lucide-react";

const models = [
  {
    id: "fixed", icon: Target, iconName: "Target", emoji: "📋",
    color: "#7C3AED", bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.18)",
    title: "Fixed Price", tagline: "Defined scope. Predictable cost.",
    overview: "Ideal for projects with clear, well-defined requirements. We agree on deliverables, timeline, and cost upfront — giving you full budget certainty before a single line of work begins.",
    steps: [
      { n: "01", t: "Requirement Gathering", d: "We deeply analyse your project scope, goals and technical requirements." },
      { n: "02", t: "Proposal & Estimation", d: "Detailed proposal with milestones, timeline and a fixed cost delivered to you." },
      { n: "03", t: "Contract Sign-off",     d: "Both parties agree on deliverables and a structured payment schedule." },
      { n: "04", t: "Execution & Delivery",  d: "We build, test and deliver according to agreed milestones — no surprises." },
    ],
    bestFor: ["Short-term projects", "MVP development", "One-time campaigns", "Defined redesigns", "Landing pages"],
    benefits: [
      { icon: DollarSign, iconName: "DollarSign", t: "Budget Certainty",     d: "No surprise invoices — you know the exact cost before work begins." },
      { icon: Shield, iconName: "Shield",     t: "Clear Accountability", d: "Defined deliverables mean both sides are perfectly aligned." },
      { icon: Clock, iconName: "Clock",      t: "Faster Kickoff",       d: "Agreed scope means we start immediately after sign-off." },
    ],
  },
  {
    id: "dedicated", icon: Users, iconName: "Users", emoji: "👥",
    color: "#FF6B2B", bg: "rgba(255,107,43,0.07)", border: "rgba(255,107,43,0.18)",
    title: "Dedicated Team", tagline: "Your team. Our experts. Full control.",
    overview: "Hire a dedicated team of marketers, developers, or designers who work exclusively on your project. You get the talent without the overhead — direct communication, daily updates, full transparency.",
    steps: [
      { n: "01", t: "Team Scoping",      d: "We identify the right roles and expertise needed for your goals." },
      { n: "02", t: "Team Onboarding",   d: "Dedicated resources are introduced and integrated into your workflow." },
      { n: "03", t: "Sprint Planning",   d: "Weekly or bi-weekly sprints with clearly defined deliverable goals." },
      { n: "04", t: "Ongoing Reporting", d: "Daily standups, weekly reports, and complete transparency always." },
    ],
    bestFor: ["Long-term projects", "Scaling teams", "Product development", "Ongoing campaigns", "Startups building fast"],
    benefits: [
      { icon: Users, iconName: "Users",     t: "Full Ownership",    d: "Manage and direct your team just like internal employees." },
      { icon: Zap, iconName: "Zap",       t: "Rapid Scaling",     d: "Add or reduce team members as your project evolves." },
      { icon: BarChart3, iconName: "BarChart3", t: "Deep Domain Focus", d: "Dedicated resources build context and expertise over time." },
    ],
  },
  {
    id: "timemat", icon: Clock, iconName: "Clock", emoji: "⏱️",
    color: "#1A6FE8", bg: "rgba(26,111,232,0.07)", border: "rgba(26,111,232,0.18)",
    title: "Flexible Hours", tagline: "Pay for what you use. Adapt as you go.",
    overview: "Perfect for evolving projects where requirements change over time. You pay only for actual hours and resources consumed — the most flexible way to engage with us.",
    steps: [
      { n: "01", t: "Scope Definition",    d: "We define an initial roadmap — knowing it may evolve as the project progresses." },
      { n: "02", t: "Resource Allocation", d: "The right team is assigned based on current project phase and needs." },
      { n: "03", t: "Agile Execution",     d: "Work is delivered in iterative sprints with frequent client reviews." },
      { n: "04", t: "Transparent Billing", d: "You receive detailed time logs and invoices for every sprint completed." },
    ],
    bestFor: ["Evolving requirements", "R&D projects", "Complex integrations", "Agile startups", "Long-running platforms"],
    benefits: [
      { icon: RefreshCw, iconName: "RefreshCw",  t: "Maximum Flexibility", d: "Pivot direction, add features, or pause work at any point." },
      { icon: DollarSign, iconName: "DollarSign", t: "Pay As You Go",        d: "Only pay for actual work completed — no wasted budget ever." },
      { icon: Shield, iconName: "Shield",     t: "Full Transparency",    d: "Complete visibility into every hour logged and task completed." },
    ],
  },
  {
    id: "retainer", icon: RefreshCw, iconName: "RefreshCw", emoji: "🔄",
    color: "#22C55E", bg: "rgba(34,197,94,0.07)", border: "rgba(34,197,94,0.18)",
    title: "Monthly Retainer", tagline: "Consistent delivery. Ongoing growth.",
    overview: "Best for businesses that need continuous digital marketing, SEO, content, or support. We become an extension of your team — delivering monthly results against agreed KPIs.",
    steps: [
      { n: "01", t: "Strategy Session",   d: "We align on monthly goals, KPIs, and exact deliverables." },
      { n: "02", t: "Onboarding",         d: "Accounts, tools and workflows are set up for seamless collaboration." },
      { n: "03", t: "Monthly Execution",  d: "Campaigns, content and optimisations run on a consistent schedule." },
      { n: "04", t: "Review & Optimise",  d: "End-of-month reporting with data-driven recommendations for next month." },
    ],
    bestFor: ["SEO & content", "Social media management", "Google & Meta Ads", "Email marketing", "Ongoing maintenance"],
    benefits: [
      { icon: Clock, iconName: "Clock",         t: "Priority Access",     d: "Retainer clients get priority scheduling and dedicated support." },
      { icon: TrendingUp, iconName: "TrendingUp",    t: "Compounding Results", d: "Consistent monthly effort builds momentum and long-term ROI." },
      { icon: MessageCircle, iconName: "MessageCircle", t: "Dedicated Manager",   d: "A single point of contact manages your account proactively." },
    ],
  },
];

const comparison = [
  { label: "Budget Predictability", fixed: "High",     dedicated: "Medium",   timemat: "Medium",   retainer: "High"   },
  { label: "Flexibility",           fixed: "Low",      dedicated: "High",     timemat: "High",     retainer: "Medium" },
  { label: "Best Timeline",         fixed: "Short",    dedicated: "Long",     timemat: "Variable", retainer: "Ongoing"},
  { label: "Scope Changes",         fixed: "Limited",  dedicated: "Easy",     timemat: "Easy",     retainer: "Planned"},
  { label: "Client Involvement",    fixed: "Low",      dedicated: "High",     timemat: "Medium",   retainer: "Low"    },
  { label: "Team Transparency",     fixed: "Medium",   dedicated: "Full",     timemat: "Full",     retainer: "Medium" },
];


const levelMap: Record<string, { color: string; bg: string; bars?: number }> = {
  High:     { color: "#22C55E", bg: "rgba(34,197,94,0.1)",   bars: 3 },
  Full:     { color: "#22C55E", bg: "rgba(34,197,94,0.1)",   bars: 3 },
  Medium:   { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  bars: 2 },
  Low:      { color: "#EF4444", bg: "rgba(239,68,68,0.1)",   bars: 1 },
  Limited:  { color: "#EF4444", bg: "rgba(239,68,68,0.1)",   bars: 1 },
  Short:    { color: "#7C3AED", bg: "rgba(124,58,237,0.08)", bars: undefined },
  Long:     { color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", bars: undefined },
  Variable: { color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", bars: undefined },
  Ongoing:  { color: "#22C55E", bg: "rgba(34,197,94,0.08)",  bars: undefined },
  Easy:     { color: "#22C55E", bg: "rgba(34,197,94,0.08)",  bars: undefined },
  Planned:  { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", bars: undefined },
};

const EngagementModelsPage = () => {
  const [active, setActive] = useState("fixed");
  const current = models.find(m => m.id === active)!;

  return (
    <PageLayout>

      {/* ── HERO ── */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 pt-16 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5 tracking-widest uppercase"
              style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.18)" }}><Layers size={12} /> <span data-cms-key="engage_hero_badge" data-cms-label="Hero Badge" data-cms-attr="text">Engagement Models</span></span>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight"><span data-cms-key="engage_hero_h1" data-cms-label="Hero Heading" data-cms-attr="text">Flexible Ways to</span> <span data-cms-key="engage_hero_h1b" data-cms-label="Hero Heading (Highlight)" data-cms-attr="text" className="text-orange-gradient">Work With Us</span></h1>
            <p className="text-[#4B5563] text-lg max-w-xl mx-auto leading-relaxed mb-8"><span data-cms-key="engage_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">4 engagement models built around how businesses actually work — pick what fits your project, budget, and timeline.</span></p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm transition-all hover:gap-3"
                style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 8px 24px rgba(255,107,43,0.3)" }}><span data-cms-key="engage_hero_cta" data-cms-label="Hero CTA Button" data-cms-attr="text">Get a Free Recommendation</span> <ArrowRight size={15} />
              </Link>
              <a href="#models" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border transition-all"
                style={{ color: "#374151", borderColor: "#E5E7EB", background: "#F8FAFF" }}><span data-cms-key="engage_hero_btn2" data-cms-label="Hero Secondary Button" data-cms-attr="text">Explore Models</span></a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-8 px-4" style={{ background: "#F8FAFF", borderBottom: "1px solid #E5E7EB" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "4",    l: "Engagement Models",  color: "#7C3AED" },
            { n: "750+", l: "Projects Delivered", color: "#FF6B2B" },
            { n: "10+",  l: "Years Experience",   color: "#1A6FE8" },
            { n: "98%",  l: "Client Satisfaction",color: "#22C55E" },
          ].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="text-3xl font-black" style={{ color: s.color }}><span data-cms-key={`engage_stat_${i}_n`} data-cms-label="Stat Number" data-cms-attr="text">{s.n}</span></div>
              <div className="text-xs text-[#6B7280] mt-1 font-medium"><span data-cms-key={`engage_stat_${i}_l`} data-cms-label="Stat Label" data-cms-attr="text">{s.l}</span></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MODELS ── */}
      <section id="models" className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-badge" data-cms-key="engage_badge_1" data-cms-label="Section Badge" data-cms-attr="text">Our Models</span>
            <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight"><span data-cms-key="engage_models_h2" data-cms-label="Models Section Heading" data-cms-attr="text">Choose How We</span> <span data-cms-key="engage_models_h2b" data-cms-label="Models Section Heading (Highlight)" data-cms-attr="text" className="text-purple-gradient">Work Together</span></h2>
          </motion.div>

          {/* Tab pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {models.map(m => (
              <button key={m.id} onClick={() => setActive(m.id)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
                style={active === m.id
                  ? { background: m.color, color: "#fff", boxShadow: `0 6px 20px ${m.color}40` }
                  : { background: "#fff", color: "#374151", border: "1px solid #E5E7EB" }}>
                <span className="text-base">{m.emoji}</span> {m.title}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={current.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
              className="rounded-3xl overflow-hidden bg-white border" style={{ borderColor: current.border, boxShadow: `0 8px 40px ${current.color}0a` }}>

              {/* Header */}
              <div className="relative overflow-hidden p-8 md:p-12" style={{ background: current.bg }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${current.color}12 0%, transparent 70%)` }} />
                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-white"
                    style={{ boxShadow: `0 4px 20px ${current.color}20` }}>
                    <CMSIcon cmsKey={`engage_dyn_100_${current.iconName||'icon'}`} cmsLabel={"Icon"} name={current.iconName || "Star"} size={28} color={current.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-[#0A1628]"><span data-cms-key={`engage_model_${current.id}_title`} data-cms-label="Model Title" data-cms-attr="text">{current.title} Model</span></h3>
                    <p className="font-semibold mt-1 text-sm" style={{ color: current.color }}><span data-cms-key={`engage_model_${current.id}_tagline`} data-cms-label="Model Tagline" data-cms-attr="text">{current.tagline}</span></p>
                  </div>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shrink-0 transition-all hover:gap-3"
                    style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}cc)`, boxShadow: `0 4px 16px ${current.color}35` }}>
                    Get Started <ArrowRight size={15} />
                  </Link>
                </div>
                <p className="text-[#4B5563] leading-relaxed mt-6 max-w-3xl relative z-10"><span data-cms-key={`engage_model_${current.id}_overview`} data-cms-label="Model Overview" data-cms-attr="text">{current.overview}</span></p>
              </div>

              {/* How it works */}
              <div className="p-8 md:p-12 border-t" style={{ borderColor: current.border }}>
                <h4 className="text-[13px] font-black uppercase tracking-widest text-[#0A1628] mb-6 flex items-center gap-2">
                  <span className="w-4 h-0.5 rounded-full" style={{ background: current.color }} /> How It Works
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {current.steps.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className="rounded-2xl p-5 border relative overflow-hidden"
                      style={{ background: "#F8FAFF", borderColor: "#E5E7EB" }}>
                      <div className="text-[11px] font-black tracking-widest mb-3 px-2.5 py-0.5 rounded-full w-fit"
                        style={{ background: `${current.color}12`, color: current.color }}>{s.n}</div>
                      <p className="font-bold text-[#0A1628] text-sm mb-1.5"><span data-cms-key={`engage_step_${current.id}_${i}_t`} data-cms-label="Step Title" data-cms-attr="text">{s.t}</span></p>
                      <p className="text-xs text-[#6B7280] leading-relaxed"><span data-cms-key={`engage_step_${current.id}_${i}_d`} data-cms-label="Step Description" data-cms-attr="text">{s.d}</span></p>
                      {i < current.steps.length - 1 && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[#D1D5DB] text-lg hidden lg:block">›</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Best for + Benefits */}
              <div className="grid md:grid-cols-2 border-t" style={{ borderColor: current.border }}>
                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r" style={{ borderColor: current.border }}>
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-[#0A1628] mb-5 flex items-center gap-2">
                    <span className="w-4 h-0.5 rounded-full" style={{ background: current.color }} /> Best For
                  </h4>
                  <div className="space-y-2.5">
                    {current.bestFor.map((b, bi) => (
                      <div key={b} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
                        style={{ background: `${current.color}05`, borderColor: `${current.color}15` }}>
                        <CMSIcon cmsKey="engage_icon_1" cmsLabel="Check Icon" name="Check" size={14} color={current.color} />
                        <span className="text-sm text-[#374151] font-medium"><span data-cms-key={`engage_bestfor_${current.id}_${bi}`} data-cms-label="Best For Item" data-cms-attr="text">{b}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-[#0A1628] mb-5 flex items-center gap-2">
                    <span className="w-4 h-0.5 rounded-full" style={{ background: current.color }} /> Key Benefits
                  </h4>
                  <div className="space-y-5">
                    {current.benefits.map((b, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${current.color}10`, border: `1px solid ${current.color}20` }}>
                          <CMSIcon cmsKey={`engage_dyn_101_${b.iconName||'icon'}`} cmsLabel={"Icon"} name={b.iconName || "Star"} size={17} color={current.color} />
                        </div>
                        <div>
                          <p className="font-bold text-[#0A1628] text-sm"><span data-cms-key={`engage_benefit_${current.id}_${i}_t`} data-cms-label="Benefit Title" data-cms-attr="text">{b.t}</span></p>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed"><span data-cms-key={`engage_benefit_${current.id}_${i}_d`} data-cms-label="Benefit Description" data-cms-attr="text">{b.d}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-badge" data-cms-key="engage_badge_2" data-cms-label="Section Badge" data-cms-attr="text">Compare</span>
            <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight"><span data-cms-key="engage_cmp_h2" data-cms-label="Comparison Heading" data-cms-attr="text">Side-by-Side</span> <span data-cms-key="engage_cmp_h2b" data-cms-label="Comparison Heading (Highlight)" data-cms-attr="text" className="text-orange-gradient">Comparison</span></h2>
            <p className="text-[#6B7280] mt-4 text-sm max-w-lg mx-auto"><span data-cms-key="engage_p_4" data-cms-label="Body Text" data-cms-attr="text">Not sure which model fits? Compare all four at a glance.</span></p>
          </motion.div>
          <div className="rounded-3xl overflow-hidden border" style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr style={{ background: "#0A1628" }}>
                    <th className="text-left px-6 py-5 text-xs font-bold text-[#94a3b8] tracking-widest uppercase">Criteria</th>
                    {models.map(m => (
                      <th key={m.id} className="px-6 py-5 text-xs font-bold tracking-widest uppercase text-center" style={{ color: m.color }}>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">{m.emoji}</span>
                          {m.title}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F8FAFF", borderTop: "1px solid #F3F4F6" }}>
                      <td className="px-6 py-4 text-sm font-semibold text-[#0A1628]">{row.label}</td>
                      {[row.fixed, row.dedicated, row.timemat, row.retainer].map((val, j) => {
                        const meta = levelMap[val];
                        return (
                          <td key={j} className="px-4 py-4 text-sm text-center">
                            <span className="inline-flex flex-col items-center gap-1">
                              {meta?.bars !== undefined ? (
                                <span className="inline-flex items-center gap-0.5">
                                  {[1,2,3].map(n => (
                                    <span key={n} className="w-4 h-1.5 rounded-full"
                                      style={{ background: n <= meta.bars! ? meta.color : "#E5E7EB" }} />
                                  ))}
                                </span>
                              ) : null}
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                                style={{ background: meta?.bg || "#F3F4F6", color: meta?.color || "#374151" }}>
                                {val}
                              </span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO CHOOSE ── */}
      <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-badge" data-cms-key="engage_badge_3" data-cms-label="Section Badge" data-cms-attr="text">Decision Guide</span>
            <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight"><span data-cms-key="engage_guide_h2" data-cms-label="Decision Guide Heading" data-cms-attr="text">Not Sure Which to</span> <span data-cms-key="engage_guide_h2b" data-cms-label="Decision Guide Heading (Highlight)" data-cms-attr="text" className="text-purple-gradient">Pick?</span></h2>
            <p className="text-[#6B7280] mt-4 text-sm max-w-lg mx-auto"><span data-cms-key="engage_p_5" data-cms-label="Body Text" data-cms-attr="text">Answer one question — get a clear direction.</span></p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { q: "Is your scope fully defined?",           a: "Go with Fixed Price",         color: "#7C3AED", emoji: "📋" },
              { q: "Do you need ongoing digital marketing?", a: "Choose Monthly Retainer",     color: "#22C55E", emoji: "🔄" },
              { q: "Are requirements likely to change?",     a: "Flexible Hours is ideal",    color: "#1A6FE8", emoji: "⏱️" },
              { q: "Do you want full control of the team?",  a: "Go with Dedicated Team",      color: "#FF6B2B", emoji: "👥" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 bg-white border card-hover flex gap-4 items-start"
                style={{ borderColor: `${item.color}15`, boxShadow: `0 4px 16px ${item.color}06` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${item.color}10` }}>{item.emoji}</div>
                <div>
                  <p className="font-bold text-[#0A1628] text-sm mb-1"><span data-cms-key={`engage_guide_${i}_q`} data-cms-label="Guide Question" data-cms-attr="text">{item.q}</span></p>
                  <p className="text-sm font-black" style={{ color: item.color }}><span data-cms-key={`engage_guide_${i}_a`} data-cms-label="Guide Answer" data-cms-attr="text">→ {item.a}</span></p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[#6B7280] text-sm mb-5"><span data-cms-key="engage_p_6" data-cms-label="Body Text" data-cms-attr="text">Still unsure? Let's talk — we'll recommend the best model for your project, free of charge.</span></p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 8px 24px rgba(255,107,43,0.35)" }}>
              <span data-cms-key="engage_guide_cta" data-cms-label="Guide CTA Button" data-cms-attr="text">Get a Free Consultation</span> <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
        <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
        <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
              style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}><span data-cms-key="engage_cta_badge" data-cms-label="CTA Badge" data-cms-attr="text">Let's Build Together</span></span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="engage_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Find Your</span> <span data-cms-key="engage_cta_h2b" data-cms-label="CTA Heading (Highlight)" data-cms-attr="text" className="text-orange-gradient">Perfect Model</span>?</h2>
            <p className="text-[#94a3b8] mb-8 leading-relaxed"><span data-cms-key="engage_p_7" data-cms-label="Body Text" data-cms-attr="text">Connect with us and we'll recommend the engagement model that fits your project, timeline, and budget — no commitment required.</span></p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
              <span data-cms-key="engage_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Start a Conversation</span> <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

    </PageLayout>
  );
};

export default EngagementModelsPage;
