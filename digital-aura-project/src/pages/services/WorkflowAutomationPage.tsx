import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, ArrowRight, ChevronDown, Check,
  Settings, Database, Mail, Globe2, FileText,
  TrendingUp, Clock, Shield, CheckCircle2,
  BarChart3, Users, Cpu, Layers,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";

const accent = "#FF6B2B";
const accentLight = "rgba(255,107,43,0.1)";
const accentBorder = "rgba(255,107,43,0.25)";
const gradient = "linear-gradient(135deg,#FF6B2B,#e85a1a)";

const features = [
  {
    Icon: Mail, title: "Sales & CRM Automation",
    desc: "Automatically capture leads from forms, ads, and emails into your CRM, assign to reps, trigger follow up sequences, and update deal stages no manual data entry.",
    tags: ["Lead routing", "CRM sync", "Auto follow up"],
  },
  {
    Icon: FileText, title: "Document & Invoice Processing",
    desc: "AI extracts data from invoices, contracts, and forms, validates it, and pushes it into your accounting or ERP system reducing processing time from hours to seconds.",
    tags: ["Invoice processing", "Data extraction", "ERP integration"],
  },
  {
    Icon: Users, title: "HR & Onboarding Workflows",
    desc: "Automate employee onboarding, leave approvals, payroll triggers, and IT provisioning so HR spends time on people, not process management.",
    tags: ["Onboarding flows", "Leave management", "IT provisioning"],
  },
  {
    Icon: BarChart3, title: "Reporting & Dashboards",
    desc: "Automatically pull data from your tools (ads, CRM, support, analytics), consolidate it, and deliver formatted reports to Slack, email, or Google Sheets on a schedule.",
    tags: ["Automated reports", "Multi-source data", "Scheduled delivery"],
  },
  {
    Icon: Settings, title: "eCommerce Operations",
    desc: "Sync orders between Shopify and your warehouse, trigger abandoned cart emails, update inventory across channels, and auto-create shipping labels all without touching a dashboard.",
    tags: ["Order sync", "Inventory management", "Abandoned cart"],
  },
  {
    Icon: Globe2, title: "Customer Communication Flows",
    desc: "Trigger personalised emails, WhatsApp messages, and SMS based on customer actions, purchase history, or time-based rules coordinated across all channels automatically.",
    tags: ["Omnichannel messaging", "Behavioural triggers", "Personalisation"],
  },
];

const process = [
  { step: "01", title: "Process Audit", desc: "We map your current workflows, identify repetitive manual tasks, and calculate the time your team spends on work that can be automated." },
  { step: "02", title: "Prioritise by ROI", desc: "We rank automation opportunities by time saved, error reduction, and revenue impact so you get the highest return from the first workflow we build." },
  { step: "03", title: "Tool & Integration Mapping", desc: "We audit your existing tools (CRM, email, helpdesk, ERP) and design the automation architecture that connects them without requiring you to switch platforms." },
  { step: "04", title: "Build & Test", desc: "Workflows are built in n8n, Make, or Zapier (or custom code for complex logic) and tested end to end with realistic data before going live." },
  { step: "05", title: "Deploy & Train", desc: "We deploy to production, set up error monitoring, and train your team on how the automations work so you're never dependent on us for basic changes." },
  { step: "06", title: "Expand & Optimise", desc: "After launch, we identify the next highest impact workflows and expand your automation coverage month over month." },
];

const toolsConnected = [
  { Icon: Mail, label: "Gmail & Outlook" },
  { Icon: Database, label: "Salesforce & HubSpot" },
  { Icon: FileText, label: "Google Sheets & Airtable" },
  { Icon: Globe2, label: "Shopify & WooCommerce" },
  { Icon: Users, label: "Slack & Microsoft Teams" },
  { Icon: Cpu, label: "QuickBooks & Xero" },
  { Icon: Layers, label: "Notion & ClickUp" },
  { Icon: BarChart3, label: "Stripe & PayPal" },
];

const tech = [
  { label: "Automation Platforms", color: accent, bg: accentLight, pills: ["n8n", "Make (Integromat)", "Zapier", "Power Automate"] },
  { label: "AI & Logic", color: "#7C3AED", bg: "rgba(124,58,237,0.1)", pills: ["OpenAI GPT-4", "Claude", "Python Scripts", "Custom APIs"] },
  { label: "Data & Storage", color: "#1A6FE8", bg: "rgba(26,111,232,0.1)", pills: ["Airtable", "Google Sheets", "PostgreSQL", "Supabase"] },
  { label: "Communication", color: "#22C55E", bg: "rgba(34,197,94,0.1)", pills: ["Twilio", "SendGrid", "WhatsApp API", "Mailchimp"] },
  { label: "CRM & Business", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", pills: ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM"] },
];

const stats = [
  { value: "20+", label: "Hours saved per week per team" },
  { value: "95%", label: "Reduction in manual data entry errors" },
  { value: "3×", label: "Faster process cycle times" },
  { value: "100%", label: "Cross tool data synchronisation" },
];

const whyUs = [
  "We audit first no automations built without a clear ROI calculation",
  "Platform-agnostic: we build in n8n, Make, Zapier, or custom code",
  "Error handling and monitoring built in from day one",
  "We train your team so you're not dependent on us for changes",
  "Complex multi-step workflows with conditional logic and branching",
  "AI enhanced automations: not just triggers, but intelligent decisions",
];

const results = [
  { Icon: Clock, text: "Hours of manual work eliminated daily" },
  { Icon: Shield, text: "Near-zero data entry errors" },
  { Icon: TrendingUp, text: "Processes that scale without adding headcount" },
  { Icon: CheckCircle2, text: "Real time sync across all your tools" },
];

const faqs = [
  { q: "What's the difference between n8n, Make, and Zapier?", a: "Zapier is the easiest but most expensive and limited for complex logic. Make (formerly Integromat) is more powerful with better data transformation. n8n is open-source, self-hostable, and the most powerful for complex enterprise workflows we typically recommend n8n for businesses that want full control and no per-task pricing. We choose the right tool based on your complexity, budget, and infrastructure preferences." },
  { q: "Can you automate workflows that involve AI decisions?", a: "Yes this is where we add the most value. We build 'smart' automations where AI classifies incoming data, decides which workflow path to take, drafts content, or extracts information from unstructured documents before the next step runs. This combines the reliability of structured automation with the intelligence of LLMs." },
  { q: "What tools can you connect?", a: "We can connect almost any tool with an API including Salesforce, HubSpot, Shopify, WooCommerce, Xero, QuickBooks, Slack, Teams, Gmail, Outlook, Google Sheets, Airtable, Notion, Stripe, WhatsApp Business, and hundreds more. If it has a webhook or API, we can automate it." },
  { q: "How long does it take to build a workflow?", a: "Simple automations (e.g., form submission → CRM entry → email notification) can be live in 1-3 days. Complex multi-step workflows with AI, conditional logic, and multiple integrations typically take 1-3 weeks. We always start with your highest impact workflow first." },
  { q: "What happens if an automation breaks?", a: "We build error handling and alerting into every workflow. If a step fails, the system logs the error, sends an alert to your team, and retries intelligently rather than silently dropping data. We also provide post launch support and monitoring to catch issues before they impact your business." },
  { q: "Can you automate processes that currently require human judgment?", a: "Yes, to a significant degree. AI can classify incoming requests, route based on sentiment or content, draft responses for human review, and make decisions based on predefined rules. For processes requiring genuine judgment, we build human in the loop workflows where AI handles 80% and a human approves the exceptions." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accent}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`workflow_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="workflow_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accent} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`workflow_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const WorkflowAutomationPage = () => {
  const _sp = useSettings(['workflow_hero_h1','workflow_hero_sub','workflow_cta_btn']);
  return (
  <PageLayout>
    {/* HERO */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 640, height: 640, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${accentLight} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-8%", background: "radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accent }}>
            ← Back to All Services
          </Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>
              <Zap size={12} /> Workflow Automation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="workflow_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Eliminate Repetitive Work.<br />
            <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Connect Every Tool You Use.
            </span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-5 leading-relaxed">
            <span data-cms-key="workflow_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We automate the manual, repetitive processes that slow your team down connecting your CRM, email, Slack, sheets, and other tools into intelligent, trigger-based workflows.</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["n8n", "Make", "Zapier", "CRM Automation", "AI Enhanced", "No Code & Custom"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: gradient, boxShadow: "0 8px 24px rgba(255,107,43,0.4)" }}>
              <span data-cms-key="workflow_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Automate My Workflows</span> <ArrowRight size={16} />
            </Link>
            <a href="#tools" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
              style={{ borderColor: "#0A1628" }}>
              See What We Connect
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* STATS */}
    <section className="py-10 px-4" style={{ background: "#F8FAFF", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, si) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.08 }}>
            <div className="text-3xl font-black mb-1" style={{ color: accent }}>{s.value}</div>
            <div className="text-[13px] text-[#6B7280] font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="workflow_h2_27" data-cms-label="Section Heading" data-cms-attr="text">Workflows We</span> <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Automate</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-lg"><span data-cms-key="workflow_x11" data-cms-label="Body Text" data-cms-attr="text">From sales pipelines to invoice processing every automation is designed around your actual business process, not a generic template.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="group rounded-2xl p-6 bg-[#F8FAFF] border relative overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(255,107,43,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: gradient }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accentLight }}>
                <f.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="text-[16px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`workflow_f_${i}_title`} data-cms-label="Feature Title" data-cms-attr="text">{f.title}</span></h3>
              <p className="text-[13.5px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`workflow_f_${i}_desc`} data-cms-label="Feature Desc" data-cms-attr="text">{f.desc}</span></p>
              <div className="flex flex-wrap gap-1.5">
                {f.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: accentLight, color: accent }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* PROCESS */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[38px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="workflow_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Our Automation Process</span></h2>
          <p className="text-[#4B5563] max-w-lg mx-auto"><span data-cms-key="workflow_x12" data-cms-label="Body Text" data-cms-attr="text">We audit before we build so every workflow delivers measurable ROI, not just activity.</span></p>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {process.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #e85a1a)` }}>{p.step}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`workflow_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`workflow_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
            </motion.div>
          ))}
        </div>
        {/* Desktop: split timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: `linear-gradient(180deg, transparent, ${accent} 8%, ${accent} 92%, transparent)` }} />
          <div className="space-y-8">
            {process.map((p, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={p.step} initial={{ opacity: 0, x: isLeft ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1 group" style={{ padding: isLeft ? "0 24px 0 0" : "0 0 0 24px" }}>
                    <div className="bg-white rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block" style={{ color: accent, background: `${accent}15` }}>Phase {p.step}</span>
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`workflow_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`workflow_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #e85a1a)` }}>
                      {p.step}
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

    {/* TOOLS + TECH */}
    <section id="tools" className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="workflow_h2lbl_23" data-cms-label="Section Label" data-cms-attr="text">Tools We Connect</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {toolsConnected.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentLight }}>
                  <t.Icon size={15} style={{ color: accent }} />
                </div>
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`workflow_tl_${i}_label`} data-cms-label="Tool Label" data-cms-attr="text">{t.label}</span></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="workflow_h2lbl_24" data-cms-label="Section Label" data-cms-attr="text">Tech & Platforms</span>
          </h2>
          <div className="space-y-4">
            {tech.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-4 bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: t.color }}><span data-cms-key={`workflow_t_${i}_label`} data-cms-label="Tech Label" data-cms-attr="text">{t.label}</span></p>
                <div className="flex flex-wrap gap-2">
                  {t.pills.map(p => (
                    <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: t.bg, color: t.color }}>{p}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* WHY US + RESULTS */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="workflow_h2lbl_25" data-cms-label="Section Label" data-cms-attr="text">Why Choose Digital Aura</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`workflow_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="workflow_h2lbl_26" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border"
                style={{ background: "#fff", borderColor: `${accent}20`, boxShadow: `0 4px 20px rgba(255,107,43,0.06)` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: accentLight }}>
                  <r.Icon size={20} style={{ color: accent }} />
                </div>
                <span className="text-[13px] font-medium text-[#374151] leading-snug">{r.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <div style={{ marginBottom: "-60px" }}><CaseStudies /></div>
    <Testimonials />

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="workflow_h2lbl_28" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
              <FAQItem q={faq.q} a={faq.a} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 px-4 md:px-8" style={{ background: gradient }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="workflow_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready to Stop Doing It Manually?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="workflow_x14" data-cms-label="Body Text" data-cms-attr="text">Book a free workflow audit. We'll identify your top 5 automation opportunities and estimate the hours you'll save each week.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accent }}>
            Get My Workflow Audit <ArrowRight size={16} />
          </Link>
        </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="workflow_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="workflow_hl_128" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Automate</span> Your Most Repetitive <span data-cms-key="workflow_hl_129" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Workflows</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="workflow_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Automation Architecture Call. We'll map your top workflows, identify what's automatable, and show you the projected time and cost savings before any commitment.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Automation Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="workflow_x13" data-cms-label="Fine Print" data-cms-attr="text">No templates — No generic playbooks — Architecture built for your exact business processes.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default WorkflowAutomationPage;




