import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathCaptcha from "@/components/MathCaptcha";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ServicesSection from "@/components/Services";
import { useSettings } from "@/hooks/useSettings";
import {
  Bot, Code2, TrendingUp, Palette,
  Search, Layers, Figma,
  ArrowRight, CheckCircle2, ChevronDown,
  Zap, Rocket, Users, Star,
  Globe, Smartphone, Cloud, Brain,
} from "lucide-react";
import CMSIcon from "@/components/CMSIcon";

/* ── PROCESS STEPS ────────────────────────────────────── */
const PROC_ICONS = [Search, Layers, Figma, Code2, Bot, Rocket];
const PROC_COLORS = ["#7C3AED", "#1A6FE8", "#F59E0B", "#FF6B2B", "#22C55E", "#FF6B2B"];
const PROC_BG = [
  "rgba(124,58,237,0.1)", "rgba(26,111,232,0.1)", "rgba(245,158,11,0.1)",
  "rgba(255,107,43,0.1)", "rgba(34,197,94,0.1)", "rgba(255,107,43,0.1)",
];
const PROC_NUMS = ["01","02","03","04","05","06"];
const PROC_DEFAULTS = [
  { title: "Discover",  desc: "Deep-dive into your goals, users, competition, and constraints." },
  { title: "Strategy",  desc: "Roadmap, tech stack selection, sprint plan, and resource allocation." },
  { title: "Design",    desc: "Wireframes, UI systems, and prototypes, built to convert and delight." },
  { title: "Build",     desc: "AI assisted development, rigorous QA, and clean maintainable code." },
  { title: "Automate",  desc: "Embed AI workflows, integrations, and automation before launch." },
  { title: "Scale",     desc: "Deploy, monitor, optimise. We stay with you post launch." },
];

/* ── WHY US ───────────────────────────────────────────── */
const WHY_ICONS = [Bot, Layers, TrendingUp, Zap];
const WHY_COLORS = ["#7C3AED", "#FF6B2B", "#1A6FE8", "#22C55E"];
const WHY_DEFAULTS = [
  { title: "AI First Execution",       desc: "AI isn't a feature we add, it's how we build. Every project is architected with intelligence from day one." },
  { title: "End to End Ownership",     desc: "Strategy → Design → Build → Launch → Growth. One team. No finger pointing. Zero outsourcing." },
  { title: "Tech + Growth Together",   desc: "We build the product AND grow it. Rare. Our engineers talk to our marketers daily." },
  { title: "Faster Than Agency Speed", desc: "AI assisted workflows let us deliver in weeks what agencies take months to scope." },
];

/* ── INDUSTRIES ───────────────────────────────────────── */
const industries = ["Healthcare", "eCommerce", "FinTech", "Education", "SaaS", "Real Estate", "Hospitality", "Legal", "Fitness", "Manufacturing"];

/* ── PROJECT TYPES ────────────────────────────────────── */
const projectTypes = [
  { label: "Website",         icon: Globe },
  { label: "Mobile App",      icon: Smartphone },
  { label: "SaaS / Software", icon: Cloud },
  { label: "AI Automation",   icon: Brain },
  { label: "Marketing",       icon: TrendingUp },
  { label: "Branding",        icon: Palette },
];

/* ── FAQ ITEM ─────────────────────────────────────────── */
const FAQItem = ({ q, a, i }: { q: string; a: string; i: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className="border rounded-2xl overflow-hidden"
      style={{ borderColor: "#E5E7EB" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-[#F8FAFF] transition-colors"
      >
        <span className="font-semibold text-[#0A1628] text-sm md:text-base pr-4">{q}</span>
        <ChevronDown
          size={18}
          className="shrink-0 text-[#6B7280] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-[#4B5563]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── LEAD FORM ────────────────────────────────────────── */
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const LeadForm = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", idea: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return submitted ? (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(34,197,94,0.1)" }}>
        <CheckCircle2 size={32} className="text-[#22C55E]" />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="svc_pg_h3_31" data-cms-label="Card Heading" data-cms-attr="text">We'll be in touch within 2 hours!</span></h3>
      <p className="text-[#6B7280]"><span data-cms-key="svc_pg_p_33" data-cms-label="Body Text" data-cms-attr="text">One of our solution architects will review your brief and reach out with a tailored proposal.</span></p>
    </div>
  ) : (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
      <div>
        <label className="text-xs font-bold text-[#374151] uppercase tracking-wider mb-3 block">What do you want to build? *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {projectTypes.map(({ label, icon: Icon }) => {
            const active = selected === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setSelected(label)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all"
                style={{
                  borderColor: active ? "#7C3AED" : "#E5E7EB",
                  background: active ? "rgba(124,58,237,0.08)" : "#fff",
                  color: active ? "#7C3AED" : "#374151",
                }}
              >
                <Icon size={15} style={{ color: active ? "#7C3AED" : "#6B7280" }} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Your Name *</label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone Number</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 81412 00284" className={inputClass} />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Tell us about your project *</label>
        <textarea
          name="idea" required value={form.idea} onChange={handleChange}
          placeholder="Describe what you want to build, the problem it solves, and your timeline..."
          rows={4}
          className={inputClass + " resize-none"}
        />
      </div>

      <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
      <button type="submit" disabled={!captchaOk} className="btn-orange w-full py-4 text-base gap-2 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: "linear-gradient(135deg,#7C3AED,#6d28d9)", boxShadow: "0 4px 18px rgba(124,58,237,0.35)" }}>
        Send My Project Brief <ArrowRight size={18} />
      </button>
      <p className="text-center text-xs text-[#6B7280]"><span data-cms-key="svc_pg_p_34" data-cms-label="Body Text" data-cms-attr="text">No commitment. We'll respond with a tailored proposal within 2 hours.</span></p>
    </form>
  );
};

/* ── MAIN PAGE ────────────────────────────────────────── */
const ServicesPage = () => {
  const s = useSettings([
    'svc_hero_badge', 'svc_hero_h1_line1', 'svc_hero_h1_line2', 'svc_hero_h1_line3', 'svc_hero_subtext',
    'svc_hero_cta1', 'svc_hero_cta2',
    'svc_trust1_label', 'svc_trust2_label', 'svc_trust3_label', 'svc_trust4_label',
    'svc_proc_badge', 'svc_proc_heading', 'svc_proc_subtext',
    'svc_proc1_title', 'svc_proc1_desc', 'svc_proc2_title', 'svc_proc2_desc',
    'svc_proc3_title', 'svc_proc3_desc', 'svc_proc4_title', 'svc_proc4_desc',
    'svc_proc5_title', 'svc_proc5_desc', 'svc_proc6_title', 'svc_proc6_desc',
    'svc_why_badge', 'svc_why_heading',
    'svc_why1_title', 'svc_why1_desc', 'svc_why2_title', 'svc_why2_desc',
    'svc_why3_title', 'svc_why3_desc', 'svc_why4_title', 'svc_why4_desc',
    'svc_proof_badge', 'svc_proof_heading', 'svc_proof_subtext',
    'svc_stat1_n', 'svc_stat1_l', 'svc_stat2_n', 'svc_stat2_l',
    'svc_stat3_n', 'svc_stat3_l', 'svc_stat4_n', 'svc_stat4_l',
    'svc_lead_badge', 'svc_lead_heading', 'svc_lead_subtext',
    'svc_faq_badge', 'svc_faq_heading',
    'svc_faq1_q', 'svc_faq1_a', 'svc_faq2_q', 'svc_faq2_a',
    'svc_faq3_q', 'svc_faq3_a', 'svc_faq4_q', 'svc_faq4_a',
    'svc_faq5_q', 'svc_faq5_a', 'svc_faq6_q', 'svc_faq6_a',
    'svc_cta_heading', 'svc_cta_subtext', 'svc_cta_button',
  ]);

  const processSteps = PROC_DEFAULTS.map((def, i) => ({
    num: PROC_NUMS[i],
    icon: PROC_ICONS[i],
    color: PROC_COLORS[i],
    bg: PROC_BG[i],
    title: s[`svc_proc${i+1}_title`] || def.title,
    desc: s[`svc_proc${i+1}_desc`] || def.desc,
    titleKey: `svc_proc${i+1}_title`,
    descKey: `svc_proc${i+1}_desc`,
  }));

  const whyUs = WHY_DEFAULTS.map((def, i) => ({
    icon: WHY_ICONS[i],
    color: WHY_COLORS[i],
    title: s[`svc_why${i+1}_title`] || def.title,
    desc: s[`svc_why${i+1}_desc`] || def.desc,
    titleKey: `svc_why${i+1}_title`,
    descKey: `svc_why${i+1}_desc`,
  }));

  const faqDefaults = [
    { q: "Do you only do digital marketing?", a: "No, marketing is just one of four service pillars. We're a full stack digital company that builds AI systems, websites, mobile apps, custom software, and SaaS platforms. Marketing is a growth engine on top of what we build." },
    { q: "Can you build custom software from scratch?", a: "Yes. We handle everything from architecture and database design to front end UI and API integrations. Our team has shipped inventory systems, booking platforms, CRMs, and enterprise dashboards." },
    { q: "Do you work with early stage startups?", a: "Absolutely. We love working with founders to take an idea from zero to MVP. We'll help validate, design, build, and launch your first version, fast." },
    { q: "What AI solutions do you actually build?", a: "Custom AI chatbots, LLM powered apps (GPT-4, Claude), intelligent document processing, recommendation engines, predictive analytics, workflow automation (n8n, Zapier, custom), and AI integrated SaaS products." },
    { q: "How long does a typical project take?", a: "A landing page takes 1-2 weeks. A full web app MVP takes 4-8 weeks. A mobile app or SaaS platform takes 8-16 weeks. AI automation projects range from 2-6 weeks depending on complexity." },
    { q: "Do you provide ongoing support after launch?", a: "Yes. Every project includes a post launch support window, and we offer retainer packages for ongoing development, marketing, and AI model improvements." },
  ];

  const faqs = faqDefaults.map((def, i) => ({
    q: s[`svc_faq${i+1}_q`] || def.q,
    a: s[`svc_faq${i+1}_a`] || def.a,
  }));

  const statsData = [
    { nKey: 'svc_stat1_n', lKey: 'svc_stat1_l', defN: '1000+', defL: 'Products Built',     color: '#7C3AED' },
    { nKey: 'svc_stat2_n', lKey: 'svc_stat2_l', defN: '750+', defL: 'Happy Clients',       color: '#FF6B2B' },
    { nKey: 'svc_stat3_n', lKey: 'svc_stat3_l', defN: '200+', defL: 'Campaigns Delivered', color: '#1A6FE8' },
    { nKey: 'svc_stat4_n', lKey: 'svc_stat4_l', defN: '4.9★', defL: 'Avg. Rating',         color: '#22C55E' },
  ];

  const trustItems = [
    { icon: Star, iconName: "Star",   label: s.svc_trust1_label || '4.9★ Rating',       color: '#FF6B2B', lKey: 'svc_trust1_label' },
    { icon: Users, iconName: "Users",  label: s.svc_trust2_label || '750+ Projects',      color: '#1A6FE8', lKey: 'svc_trust2_label' },
    { icon: Zap, iconName: "Zap",    label: s.svc_trust3_label || 'AI First Execution', color: '#7C3AED', lKey: 'svc_trust3_label' },
    { icon: Rocket, iconName: "Rocket", label: s.svc_trust4_label || '4–8 Week Delivery',  color: '#22C55E', lKey: 'svc_trust4_label' },
  ];

  return (
  <PageLayout>
    {/* ── HERO ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 500, height: 500, bottom: "-15%", left: "-8%", background: "radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase animate-ai-glow"
            style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.3)" }}
            data-cms-key="svc_hero_badge" data-cms-label="Services Hero Badge" data-cms-attr="text">
            <Bot size={12} /> {s.svc_hero_badge || 'What We Build'}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-[62px] font-bold leading-[1.08] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="svc_hero_h1_line1" data-cms-label="Services Hero H1 Line 1" data-cms-attr="text">
              {s.svc_hero_h1_line1 || 'AI Driven Digital Solutions'}
            </span>
            <br />
            <span className="text-orange-gradient" data-cms-key="svc_hero_h1_line2" data-cms-label="Services Hero H1 Line 2 (Orange)" data-cms-attr="text">
              {s.svc_hero_h1_line2 || 'We Build What Your'}
            </span>
            <br />
            <span className="text-purple-gradient" data-cms-key="svc_hero_h1_line3" data-cms-label="Services Hero H1 Line 3 (Purple)" data-cms-attr="text">
              {s.svc_hero_h1_line3 || 'Business Needs.'}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10"
            data-cms-key="svc_hero_subtext" data-cms-label="Services Hero Subtext" data-cms-attr="text">
            {s.svc_hero_subtext || 'From intelligent automation to scalable SaaS platforms, we are your end to end digital engineering and growth partner.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2"
              data-cms-key="svc_hero_cta1" data-cms-label="Services Hero CTA 1" data-cms-attr="text">
              {s.svc_hero_cta1 || 'Start Your Project'} <ArrowRight size={18} />
            </Link>
            <a href="#pillars" className="btn-outline-dark px-8 py-4 text-base"
              data-cms-key="svc_hero_cta2" data-cms-label="Services Hero CTA 2" data-cms-attr="text">
              {s.svc_hero_cta2 || 'Explore Services'}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10">
            {trustItems.map(({ icon: Icon, label, color, lKey }) => (
              <span key={lKey} className="flex items-center gap-2 text-sm font-medium text-[#374151]"
                data-cms-key={lKey} data-cms-label="Trust Strip Item" data-cms-attr="text">
                <Icon size={15} style={{ color }} /> {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── SERVICES TAB SECTION ── */}
    <div id="pillars">
      <ServicesSection />
    </div>

    {/* ── PROCESS ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 tracking-widest uppercase"
            style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}
            data-cms-key="svc_proc_badge" data-cms-label="Process Badge" data-cms-attr="text">
            {s.svc_proc_badge || 'Our AI First Process'}
          </span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mb-4"
            data-cms-key="svc_proc_heading" data-cms-label="Process Heading" data-cms-attr="text">
            {s.svc_proc_heading || 'From Idea to Scaled Product'}
          </h2>
          <p className="text-[#4B5563] max-w-lg mx-auto text-lg"
            data-cms-key="svc_proc_subtext" data-cms-label="Process Subtext" data-cms-attr="text">
            {s.svc_proc_subtext || 'A 6-phase delivery process engineered for speed, quality, and real business outcomes.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl p-6 border bg-white card-hover"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: step.bg }}>
                  <CMSIcon cmsKey={`svcpg_dyn_100_${step.iconName||'icon'}`} cmsLabel={"Icon"} name={step.iconName || "Star"} size={22} color={step.color} />
                </div>
                <span className="text-4xl font-black text-[#E5E7EB]">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2"
                data-cms-key={step.titleKey} data-cms-label={`Process Step ${i+1} Title`} data-cms-attr="text">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#4B5563]"
                data-cms-key={step.descKey} data-cms-label={`Process Step ${i+1} Desc`} data-cms-attr="text">
                {step.desc}
              </p>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: step.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── WHY DIGITAL AURA ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge"
            data-cms-key="svc_why_badge" data-cms-label="Why Us Badge" data-cms-attr="text">
            {s.svc_why_badge || 'Why Choose Us'}
          </span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"
            data-cms-key="svc_why_heading" data-cms-label="Why Us Heading" data-cms-attr="text">
            {s.svc_why_heading || 'We Build with AI. We Grow with Data.'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 border bg-white text-center card-hover"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `${w.color}14` }}>
                <CMSIcon cmsKey={`svcpg_dyn_101_${w.iconName||'icon'}`} cmsLabel={"Icon"} name={w.iconName || "Star"} size={22} color={w.color} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2"
                data-cms-key={w.titleKey} data-cms-label={`Why Us Card ${i+1} Title`} data-cms-attr="text">
                {w.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#4B5563]"
                data-cms-key={w.descKey} data-cms-label={`Why Us Card ${i+1} Desc`} data-cms-attr="text">
                {w.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── PROOF & AUTHORITY ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge"
            data-cms-key="svc_proof_badge" data-cms-label="Proof Badge" data-cms-attr="text">
            {s.svc_proof_badge || 'Proof & Authority'}
          </span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mb-4"
            data-cms-key="svc_proof_heading" data-cms-label="Proof Heading" data-cms-attr="text">
            {s.svc_proof_heading || 'Results Across Industries'}
          </h2>
          <p className="text-[#4B5563] max-w-lg mx-auto"
            data-cms-key="svc_proof_subtext" data-cms-label="Proof Subtext" data-cms-attr="text">
            {s.svc_proof_subtext || "We've delivered measurable outcomes across healthcare, eCommerce, SaaS, real estate, and more."}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statsData.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 text-center border bg-white"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="text-3xl font-black mb-1" style={{ color: st.color }}
                data-cms-key={st.nKey} data-cms-label={`Proof Stat ${i+1} Number`} data-cms-attr="text">
                {s[st.nKey] || st.defN}
              </div>
              <div className="text-xs font-medium text-[#6B7280]"
                data-cms-key={st.lKey} data-cms-label={`Proof Stat ${i+1} Label`} data-cms-attr="text">
                {s[st.lKey] || st.defL}
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <p className="text-center text-sm font-semibold text-[#6B7280] mb-5 uppercase tracking-wider"><span data-cms-key="svc_pg_p_35" data-cms-label="Body Text" data-cms-attr="text">Industries We've Served</span></p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span key={ind} className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{ background: "#F8FAFF", borderColor: "#E5E7EB", color: "#374151" }}>
                {ind}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/case-studies" className="btn-outline-orange px-8 py-3.5 text-sm gap-2 inline-flex">
            View Full Case Studies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    {/* ── LEAD GENERATION ── */}
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4c1d95 40%, #0A1628 100%)" }} />
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase bg-white/20 text-white border border-white/30"
              data-cms-key="svc_lead_badge" data-cms-label="Lead Gen Badge" data-cms-attr="text">
              {s.svc_lead_badge || 'FREE · NO OBLIGATION'}
            </span>
            <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-6"
              data-cms-key="svc_lead_heading" data-cms-label="Lead Gen Heading" data-cms-attr="text">
              {s.svc_lead_heading || "Tell Us What You Want to Build."}
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed"
              data-cms-key="svc_lead_subtext" data-cms-label="Lead Gen Subtext" data-cms-attr="text">
              {s.svc_lead_subtext || "Share your project idea. We'll send a tailored proposal and a strategy call link within 2 hours, no sales pitch, just a plan."}
            </p>
            <div className="space-y-3 mb-8">
              {["Free solution architecture review", "Tech stack recommendation", "Timeline & budget estimate", "No commitment required"].map(b => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-white shrink-0" />
                  <span className="text-white font-medium text-sm">{b}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20 inline-block">
              <p className="text-white/70 text-xs mb-1"><span data-cms-key="svc_pg_p_36" data-cms-label="Body Text" data-cms-attr="text">Average response time</span></p>
              <p className="text-white font-bold text-lg"><span data-cms-key="svc_pg_p_37" data-cms-label="Body Text" data-cms-attr="text">Under 2 Hours</span></p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
              <h3 className="text-xl font-bold text-[#0A1628] mb-6"><span data-cms-key="svc_pg_h3_32" data-cms-label="Card Heading" data-cms-attr="text">Start Your Project</span></h3>
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="section-badge"
            data-cms-key="svc_faq_badge" data-cms-label="FAQ Badge" data-cms-attr="text">
            {s.svc_faq_badge || 'FAQ'}
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-[#0A1628] tracking-tight"
            data-cms-key="svc_faq_heading" data-cms-label="FAQ Heading" data-cms-attr="text">
            {s.svc_faq_heading || 'Frequently Asked Questions'}
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => <FAQItem key={i} {...f} i={i} />)}
        </div>
        <div className="text-center mt-10">
          <p className="text-[#6B7280] text-sm mb-4"><span data-cms-key="svc_pg_p_38" data-cms-label="Body Text" data-cms-attr="text">Still have questions?</span></p>
          <Link to="/contact" className="btn-orange px-8 py-3.5 text-sm gap-2 inline-flex">
            Talk to Our Team <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    {/* ── FINAL CTA ── */}
    <section className="py-20 px-4 md:px-8 text-center" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            data-cms-key="svc_cta_heading" data-cms-label="Services CTA Heading" data-cms-attr="text">
            {s.svc_cta_heading || "Let's Build Your Next Digital Product."}
          </h2>
          <p className="text-[#94A3B8] text-lg mb-8"
            data-cms-key="svc_cta_subtext" data-cms-label="Services CTA Subtext" data-cms-attr="text">
            {s.svc_cta_subtext || 'Book a 30 minute strategy call. No sales. Just clarity on what to build and how.'}
          </p>
          <Link to="/contact" className="btn-orange px-10 py-4 text-lg gap-2 inline-flex">
            <span data-cms-key="svc_cta_button" data-cms-label="Services CTA Button" data-cms-attr="text">
              {s.svc_cta_button || 'Book a Strategy Call'}
            </span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
  );
};

export default ServicesPage;
