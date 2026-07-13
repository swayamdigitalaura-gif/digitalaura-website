import CaseStudies from "@/components/CaseStudies";
import ClientLogoSection from "@/components/ClientLogoSection";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import DBTestimonialCarousel from "@/components/DBTestimonialCarousel";
import {
  ArrowRight, ChevronDown, Check,
  Brain, FileText, Activity, GitMerge, Database, TrendingUp,
} from "lucide-react";

const accent = "#7C3AED";
const accentBg = "rgba(124,58,237,0.08)";
const accentBorder = "rgba(124,58,237,0.2)";

const services = [
  { Icon: Brain,      iconName: "Brain",      title: "AI Agent Systems",                   desc: "Autonomous agents that monitor, analyse, and act on events across your business reading inputs, making decisions, triggering actions, and escalating only when human judgment is genuinely required." },
  { Icon: FileText,   iconName: "FileText",   title: "Vision & Document Intelligence",      desc: "Systems that see and understand extracting structured data from documents, images, forms, and physical environments. Turning unstructured inputs into clean, actionable outputs at scale." },
  { Icon: Activity,   iconName: "Activity",   title: "Real Time Event Processing",          desc: "Event driven pipelines that respond to what's happening in your business the moment it happens not in batches, not on schedules. Live triggers, live decisions, live outputs." },
  { Icon: TrendingUp, iconName: "TrendingUp", title: "Predictive & Proactive Automation",   desc: "Systems that act before you ask. Forecasting what comes next based on your historical data and triggering the right action before the problem surfaces or the opportunity passes." },
  { Icon: GitMerge,   iconName: "GitMerge",   title: "Intelligent Workflow Orchestration",  desc: "Multi-step, multi-system workflows with conditional logic, exception handling, and human in the loop escalation built in. Complex operations run end to end without manual coordination." },
  { Icon: Database,   iconName: "Database",   title: "Systems Integration & AI Enrichment", desc: "Connect every tool, database, and platform in your stack into a unified intelligence layer with AI enriching data at every touchpoint rather than just passing it through." },
];

const processSteps = [
  { num: "01", title: "Architecture Audit Week 1",          desc: "We spend time with your team mapping every data flow, decision point, and handoff in your highest value workflows. We identify where AI can make a real time decision instead of a human. Output: a full system architecture diagram, prioritised by ROI." },
  { num: "02", title: "Proof of Concept Week 2",            desc: "Before we build anything production grade, we run a live PoC on your actual data. You see the system work reading your documents, processing your leads, flagging your anomalies in your environment." },
  { num: "03", title: "Engineering & Integration Weeks 3-6", desc: "We build, test, and integrate. Every component is version-controlled, documented, and engineered for reliability. We build error handling, fallback logic, and human in the loop escalation paths from day one." },
  { num: "04", title: "Deploy, Monitor & Optimise",            desc: "We deploy to production with full observability error logs, performance dashboards, alert thresholds. First 60 days include proactive monitoring and weekly optimisation sprints. Your system gets faster and smarter over time." },
];

const caseStudies = [
  {
    tag: "PropTech · AI Monitoring", badge: "+67% Response Rate", badgeColor: "#7C3AED", topBg: "linear-gradient(135deg,rgba(124,58,237,0.08) 0%,rgba(124,58,237,0.02) 100%)",
    title: "Residential Property Investment Platform", subtitle: "Sydney, Australia",
    stat: "90s", statDesc: "Investor notification time cut from 6-8 hours to under 90 seconds, with 4 additional acquisitions in the first quarter from speed advantage alone.",
    tags: ["GPT-4 Vision", "Python Pipeline", "WhatsApp API"],
    problem: "A PropTech firm had a team of two analysts manually monitoring 11 property listing portals daily, filtering by 23 investment criteria. Average response time from listing live to investor notification: 6-8 hours. They were consistently losing deals to faster moving buyers.",
    solution: "A real time AI monitoring pipeline that watches 11 portals continuously. Every new listing passes through a GPT-4 vision powered classification layer that scores it against 23 investment criteria, cross references historical sale data, and generates a formatted investment brief with risk flag, yield estimate, and suburb trend analysis. Qualifying listings trigger an instant WhatsApp broadcast within 90 seconds of the listing going live.",
    stack: "Custom Python pipeline · GPT-4 Vision · WhatsApp Business API · PostgreSQL · AWS Lambda",
    results: ["Notification time: 6-8 hours → under 90 seconds", "2 analyst roles reallocated to high value deal structuring", "Investor response rate on shortlisted properties up 67%", "4 additional acquisitions in first quarter attributed to speed advantage"],
    quote: "We had analysts doing what this system does, but slower and only during business hours. This thing works at 2am on a Sunday and it doesn't miss a listing.",
    quoteBy: "Head of Acquisitions, Sydney PropTech Firm",
  },
  {
    tag: "Manufacturing · Computer Vision", badge: "£162K Saved", badgeColor: "#FF6B2B", topBg: "linear-gradient(135deg,rgba(255,107,43,0.08) 0%,rgba(255,107,43,0.02) 100%)",
    title: "Precision Manufacturing Group", subtitle: "Birmingham, UK",
    stat: "92%", statDesc: "Defect rate slashed from 3.8% to 0.3% with real time vision AI on the production line, saving £162,000 in rework costs in Year 1.",
    tags: ["PyTorch CNN", "Edge Inference", "Real Time Alerts"],
    problem: "A mid sized manufacturer was catching product defects at end of line QC, after hours of production had already run. Defect rates averaged 3.8% resulting in material waste and rework costs exceeding £180,000 annually.",
    solution: "A real time computer vision quality control system integrated directly into the production line. Industrial cameras capture images at 12 frames per second. A custom trained vision model analyses each frame in real time. Defect detected → line paused → supervisor alerted on mobile with defect classification and root cause analysis automatically surfaced from historical defect patterns.",
    stack: "Custom CNN model (PyTorch) · Edge inference hardware · Real time alert API · Defect analytics dashboard · MQTT event bus",
    results: ["Defect rate: 3.8% → 0.3%", "Annual rework costs reduced by £162,000 in Year 1", "Detection moved from end of line to within 80ms of defect occurrence", "Root cause data surfaced patterns that led to upstream process changes"],
    quote: "We've been doing manual QC for 22 years. What Digital Aura built in 6 weeks has fundamentally changed how we think about production intelligence.",
    quoteBy: "Operations Director, Birmingham Manufacturing Group",
  },
  {
    tag: "Legal · Document AI", badge: "340+ Contracts", badgeColor: "#22C55E", topBg: "linear-gradient(135deg,rgba(34,197,94,0.08) 0%,rgba(34,197,94,0.02) 100%)",
    title: "Commercial Law Firm", subtitle: "Dublin, Ireland",
    stat: "6min", statDesc: "Contract review time reduced from 5-7 hours to under 6 minutes, processing 340+ contracts in the first 5 months with zero material clauses missed.",
    tags: ["Fine tuned LLM", "RAG Pipeline", "DOCX Output"],
    problem: "Senior associates were spending 5-7 hours per contract reviewing new agreements extracting key dates, obligations, liability clauses, and non-standard terms. A firm bottleneck limiting throughput and billing capacity.",
    solution: "An intelligent contract review pipeline custom trained on 8 years of the firm's own contract library. New contract uploaded → NLP extracts 40+ clause types → each clause scored against the firm's risk matrix → non-standard terms flagged and compared against precedent → 2-page risk summary memo auto-generated in the firm's formatting → delivered to the assigned partner in under 6 minutes.",
    stack: "Custom fine tuned LLM · Secure document ingestion API · Clause extraction pipeline · RAG over firm's contract precedent library · Auto-generated DOCX output",
    results: ["Review time: 5-7 hours → under 6 minutes", "340+ contracts processed in the first 5 months", "Associates freed to focus on negotiation, advice, and client facing work", "Zero material clauses missed across all processed documents"],
    quote: "The system doesn't just extract text — it understands context within our specific legal framework. It's become indispensable.",
    quoteBy: "Managing Partner, Dublin Commercial Law Firm",
  },
  {
    tag: "Finance · AI Processing", badge: "3.4x Capacity", badgeColor: "#1A6FE8", topBg: "linear-gradient(135deg,rgba(26,111,232,0.08) 0%,rgba(26,111,232,0.02) 100%)",
    title: "Mortgage Brokerage Network", subtitle: "Ontario, Canada",
    stat: "22min", statDesc: "Application processing time cut from 4 hours to 22 minutes, eliminating a 6-day queue and increasing broker capacity 3.4x without new hires.",
    tags: ["Doc Processing", "LLM Memos", "React Native"],
    problem: "A brokerage network processing 200+ applications per month had a 3 person team manually reviewing applications, verifying document completeness, cross referencing lender criteria across 18 products, and producing recommendation memos. Average processing time: 4 hours. The bottleneck created a 6-day average queue for applicants.",
    solution: "An end to end AI application intelligence system. Applicant submits → AI extracts and structures all data from uploaded documents (pay stubs, T4s, NOAs, bank statements) → application scored against 18 lender criteria simultaneously → top 3 matches ranked with rationale → broker recommendation memo generated → broker notified with full brief on mobile. Edge cases routed to human review with AI pre analysis attached.",
    stack: "Multimodal document processing · Custom lender scoring engine · LLM memo generation · React Native broker app · Supabase real time backend",
    results: ["Processing time: 4 hours → 22 minutes average", "Application queue: 6 days → same day processing", "Broker capacity increased 3.4x without additional hires", "Lender match accuracy rated higher than manual process by brokers"],
    quote: "Our brokers now spend their time advising clients, not reading bank statements. The quality of recommendations has actually gone up because the AI doesn't get tired at the end of the day.",
    quoteBy: "CEO, Ontario Mortgage Brokerage Network",
  },
];


const whyUs = [
  { title: "We Work From Your Data, Not Generic Templates",  desc: "Every system we build is trained and configured on your actual business data your documents, your CRM history, your decision logic. Not a generic workflow copied from a library." },
  { title: "Real Time Architecture as a Default",            desc: "We don't build batch processes unless batch is genuinely right for you. Our default is event driven, real time systems. Something happens in your business → the system responds within seconds." },
  { title: "We Think in Systems, Not Features",              desc: "We design the full intelligence layer inputs, processing, decisions, outputs, escalations, monitoring. Not just one piece of it. You get a complete system that holds together under production pressure." },
  { title: "Full Observability Built In",                    desc: "Every automation we deliver includes a monitoring dashboard. You can see what the AI processed, what it decided, what it flagged, and why in plain language. No black boxes." },
  { title: "Production Proven Across Industries",            desc: "Real estate, manufacturing, legal, financial services, healthcare, e-commerce. Our automation architecture patterns are battle tested across industries and across markets." },
  { title: "We Stay In It With You",                        desc: "60 day post launch monitoring, weekly performance reviews, and ongoing optimisation. AI systems need to be tuned as your data evolves we build that into every engagement." },
];

const faqs = [
  { q: "How is this different from what we can build with Make or Zapier?", a: "Platforms like Make and Zapier are excellent for connecting apps using pre-built triggers and actions. What we build is different custom AI layers that reason, classify, generate content, and make conditional decisions based on your data. When your workflow involves language, documents, images, or complex business logic, no code tools hit their ceiling quickly." },
  { q: "Do we need to replace our existing systems?", a: "Almost never. We engineer integrations into your existing CRM, ERP, databases, and tools. The AI automation layer sits on top of what you already have and makes it smarter." },
  { q: "How do you handle sensitive data legal documents, financial records, patient data?", a: "We architect with data privacy as a non negotiable. Sensitive workloads are processed on private infrastructure, never through shared cloud AI APIs. We are GDPR aligned and can work within your existing compliance framework." },
  { q: "What does the AI do when it encounters something it's not confident about?", a: "Every system we build includes a human in the loop escalation path. Low-confidence events are flagged to the right person with full context the AI tells you what it found, why it's uncertain, and what it recommends. Nothing falls through the cracks." },
  { q: "How long does it take to build?", a: "PoC in 2 weeks. Production deployment in 4-6 weeks for most systems. Measurable ROI typically visible within the first 30 days of live operation." },
  { q: "How do we get started?", a: "Book a free Architecture Call. We spend 60 minutes mapping your highest value workflow, identifying where AI can make real time decisions, and showing you exactly what a production system would look like for your business before any commitment is made." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E7EB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="font-semibold text-[#0A1628] text-[15px]"><span data-cms-key={`aiauto_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`aiauto_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CaseStudyCard = ({ cs, i }: { cs: typeof caseStudies[0]; i: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
      className="card-hover group rounded-2xl overflow-hidden border bg-white flex flex-col"
      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>

      {/* Top gradient area - exactly like homepage */}
      <div className="h-24 relative px-5 flex items-end pb-4" style={{ background: cs.topBg }}>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}15` }}><span data-cms-key={`aiauto_cs_${i}_tag`} data-cms-label="CS Tag" data-cms-attr="text">{cs.tag}</span></span>
        <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ color: cs.badgeColor, background: `${cs.badgeColor}15`, border: `1px solid ${cs.badgeColor}30` }}><span data-cms-key={`aiauto_cs_${i}_badge`} data-cms-label="CS Badge" data-cms-attr="text">{cs.badge}</span></span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4"><span data-cms-key={`aiauto_cs_${i}_title`} data-cms-label="Case Study Title" data-cms-attr="text">{cs.title}</span></h3>

        {/* Big stat */}
        <div className="flex items-center gap-2 mb-3">
          <CMSIcon cmsKey="aiauto_icon_1" cmsLabel="TrendingUp Icon" name="TrendingUp" size={18} color={cs.badgeColor} />
          <span className="text-[42px] font-black leading-none" style={{ color: cs.badgeColor }}><span data-cms-key={`aiauto_cs_${i}_stat`} data-cms-label="CS Stat" data-cms-attr="text">{cs.stat}</span></span>
        </div>
        <p className="text-[15px] leading-relaxed text-[#4B5563] mb-5 flex-1"><span data-cms-key={`aiauto_cs_${i}_statdesc`} data-cms-label="Case Study Stat Desc" data-cms-attr="text">{cs.statDesc}</span></p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cs.tags.map((t: string) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ color: cs.badgeColor, background: `${cs.badgeColor}12` }}><span data-cms-key={`aiauto_cs_${i}_tag_${t}`} data-cms-label="CS Tech Tag" data-cms-attr="text">{t}</span></span>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => setOpen(!open)}
          className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
          style={{ color: cs.badgeColor }}>
          {open ? "Show less" : "Read Full Case Study"} <ArrowRight size={14} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden mt-4">
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">The Challenge: </span><span data-cms-key={`aiauto_cs_${i}_problem`} data-cms-label="CS Problem" data-cms-attr="text">{cs.problem}</span></p>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">What We Built: </span><span data-cms-key={`aiauto_cs_${i}_solution`} data-cms-label="CS Solution" data-cms-attr="text">{cs.solution}</span></p>
              <p className="text-[11px] text-[#9CA3AF] font-mono mb-4"><span data-cms-key={`aiauto_cs_${i}_stack`} data-cms-label="Case Study Stack" data-cms-attr="text">{cs.stack}</span></p>
              <ul className="space-y-1.5 mb-4">
                {cs.results.map((r: string, ri: number) => (
                  <li key={r} className="flex items-start gap-2 text-[13px] text-[#374151]">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: cs.badgeColor }} />{r}
                  </li>
                ))}
              </ul>
              <blockquote className="border-l-2 pl-3 italic text-[13px] text-[#6B7280]" style={{ borderColor: cs.badgeColor }}>
                "<span data-cms-key={`aiauto_cs_${i}_quote`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>"<span className="not-italic font-semibold text-[#374151] text-[12px]"><span data-cms-key={`aiauto_cs_${i}_quoteBy`} data-cms-label="CS Quote By" data-cms-attr="text">{cs.quoteBy}</span></span>
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AIAutomationPage = () => {
  const _sp = useSettings(['aiauto_hero_h1','aiauto_hero_sub','aiauto_cta_btn']);
  return (
  <PageLayout>

    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 400, height: 400, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-4 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <span className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(124,58,237,0.1)", color: accent, border: "1px solid rgba(124,58,237,0.3)" }}>
              <Brain size={12} /> AI Automation
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="aiauto_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Your Business Is Generating Signals.<br className="hidden md:block" />
            Your Team Isn't Fast Enough<br className="hidden md:block" />
            to Act on All of Them.
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="aiauto_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build real time AI automation systems — not zaps, not templates, not basic triggers. Custom-engineered pipelines that process data, make decisions, and take action the moment something happens in your business.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="aiauto_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Book a Free Automation Architecture Call</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">Our Automation Services</a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6"><span data-cms-key="aiauto_p_36" data-cms-label="Body Text" data-cms-attr="text">Used by businesses processing 10,000+ events per day across Australia, UK, Ireland, Canada & USA</span></p>
        </motion.div>
      </div>
    </section>

    {/* Agency Comparison */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Automation Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Set Up Zaps.<br className="hidden md:block" /> Very Few Can Build Systems That Actually Think.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">There's a generation of automation being sold right now that is little more than glorified if-then rules — brittle triggers that break on edge cases, disconnected tools that don't share context, and workflows with no fallback when something unexpected happens. Real AI automation handles complexity, learns from context, and escalates intelligently.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Zapier flows and template automations", detail: "Workflow glue, not real intelligence" },
              { pain: "Automations that break on edge cases", detail: "No fallback logic, no error handling" },
              { pain: "Disconnected point-to-point integrations", detail: "Each tool siloed, no unified reasoning" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                  <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3" style={{ background: "rgba(255,107,43,0.06)", borderLeftColor: "#FF6B2B" }}>
            <span className="text-[#FF6B2B] text-lg font-black mt-0.5 shrink-0">⚠</span>
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your automation still fails the moment something unexpected happens, it's not automation — it's a brittle script waiting to break.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Positioning */}
    <section id="services-list" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="section-badge" data-cms-key="aiauto_badge_29" data-cms-label="Section Badge" data-cms-attr="text">Not Your Typical Automation Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            <span data-cms-key="aiauto_h2_main" data-cms-label="Section Heading" data-cms-attr="text">There's a Difference Between Connecting Two Apps</span><br className="hidden md:block" /> <span data-cms-key="aiauto_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">and Building Intelligence Into Your Business.</span>
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="aiauto_x12" data-cms-label="Body Text" data-cms-attr="text">Most automation agencies connect tools together using drag-and-drop platforms. That's useful — but it's not what moves the needle.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="aiauto_x13" data-cms-label="Body Text" data-cms-attr="text">We build AI powered systems that think — that read documents, understand language, analyse images, score risk, detect patterns, and act on them in real time — Systems trained on your business data — Systems with memory — Systems that get smarter as your business grows.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed italic"><span data-cms-key="aiauto_x14" data-cms-label="Body Text" data-cms-attr="text">If you've been told 'just use Zapier' you haven't seen what's actually possible yet.</span></p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "Real Time, Event Driven",         desc: "Our systems respond to events as they happen new lead, new transaction, new document, new signal. Latency measured in seconds, not hours." },
            { title: "AI That Reasons, Not Just Routes", desc: "We use large language models, computer vision, and custom ML to build automation that can read, classify, summarise, flag, and decide not just move data." },
            { title: "Built For Your Stack",             desc: "We engineer to your existing infrastructure your CRM, ERP, database, APIs. Nothing ripped out. Everything made smarter." },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2"><span data-cms-key={`aiauto_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiauto_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aiauto_badge_30" data-cms-label="Section Badge" data-cms-attr="text">What We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-3"><span data-cms-key="aiauto_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Running These Systems</span></h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto"><span data-cms-key="aiauto_x15" data-cms-label="Body Text" data-cms-attr="text">If your business generates data, makes decisions, or runs on repetitive human judgment there's an AI automation system for it.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: accent }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <CMSIcon cmsKey={`aiauto_icon_${si}`} cmsLabel={`${s.title} Icon`} name={s.iconName} size={20} color={accent} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aiauto_svc_${si}_title`} data-cms-label="Service Title" data-cms-attr="text">{s.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiauto_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aiauto_badge_31" data-cms-label="Section Badge" data-cms-attr="text">How We Work</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aiauto_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">How We Engineer Your Automation</span></h2>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #5b21b6)` }}>{step.num}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`aiauto_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiauto_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
            </motion.div>
          ))}
        </div>
        {/* Desktop: split timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: `linear-gradient(180deg, transparent, ${accent} 8%, ${accent} 92%, transparent)` }} />
          <div className="space-y-8">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: isLeft ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1 group" style={{ padding: isLeft ? "0 24px 0 0" : "0 0 0 24px" }}>
                    <div className="bg-white rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block" style={{ color: accent, background: `${accent}15` }}>Phase {step.num}</span>
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`aiauto_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiauto_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #5b21b6)` }}>
                      {step.num}
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
    <CaseStudies />
        {/* Testimonials */}
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="aiauto_badge_33" data-cms-label="Section Badge" data-cms-attr="text">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"><span data-cms-key="aiauto_s13_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Running These Systems</span></h2>
        </motion.div>
        <DBTestimonialCarousel />
      </div>
    </section>


    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aiauto_badge_34" data-cms-label="Section Badge" data-cms-attr="text">Why Digital Aura</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aiauto_s14_h2" data-cms-label="Section Heading" data-cms-attr="text">Why Serious Businesses Choose Digital Aura for AI Automation</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border group relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, #1A6FE8)` }} />
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aiauto_why_${i}_title`} data-cms-label="Why Title" data-cms-attr="text">{w.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiauto_why_${i}_desc`} data-cms-label="Why Desc" data-cms-attr="text">{w.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <ClientLogoSection servicePage="ai-automation" accentColor="#22C55E" heading="Brands Powered by Our AI Solutions" fallback={[
      { name: "Track My Ads",         tag: "AdTech",            logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E", logoBg: "#f0f8ff" },
      { name: "Silverstone Financial", tag: "Financial Services", logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png", logoBg: "#f0faff" },
      { name: "Gleekey",              tag: "EdTech",            logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png", logoBg: "#f5f0ff" },
      { name: "Digital Aura",         tag: "Digital Marketing", logo: "https://thedigitalaura.com/logos/digital-aura-logo.png", logoBg: "#fff8f0" },
    ]} />

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aiauto_badge_35" data-cms-label="Section Badge" data-cms-attr="text">FAQ</span>
          <h2 className="text-3xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aiauto_s15_h2" data-cms-label="Section Heading" data-cms-attr="text">Common Questions</span></h2>
        </motion.div>
        <div>{faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} idx={i} />)}</div>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="aiauto_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Let's Find Your First <span data-cms-key="aiauto_hl_149" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Automation</span> in <span data-cms-key="aiauto_hl_150" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">60 Minutes</span>.</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="aiauto_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Automation Architecture Call. We'll map your top workflows, identify what's automatable, and show you the projected impact before any commitment is made.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Architecture Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="aiauto_x16" data-cms-label="Fine Print" data-cms-attr="text">No templates — No generic playbooks — Architecture designed for your business, on your first call.</span></p>
        </motion.div>
      </div>
    </section>

  </PageLayout>
);
};

export default AIAutomationPage;





