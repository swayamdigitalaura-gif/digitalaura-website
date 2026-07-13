import CaseStudies from "@/components/CaseStudies";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import DBTestimonialCarousel from "@/components/DBTestimonialCarousel";
import {
  ArrowRight, ChevronDown, Check, TrendingUp,
  Brain, BarChart3, MessageSquare, Search, Target, FileText,
} from "lucide-react";

const accent = "#22C55E";
const accentBg = "rgba(34,197,94,0.08)";
const accentBorder = "rgba(34,197,94,0.2)";

const services = [
  { Icon: Brain,        title: "AI Native Product Development",             desc: "End to end design and engineering of web applications where AI is the core value proposition not a feature. From architecture and model selection to UX, API design, and deployment." },
  { Icon: BarChart3,    title: "Intelligent Dashboards & Analytics Interfaces", desc: "Beyond charts and tables. We build interfaces that surface patterns, flag anomalies, generate narrative summaries, and guide users to the next best action powered by live data and AI reasoning." },
  { Icon: MessageSquare,title: "Conversational & Generative Interfaces",    desc: "Web experiences built around language AI assistants, document Q&A interfaces, guided workflows, and generative tools that produce real outputs for real users in context." },
  { Icon: Search,       title: "AI Powered Search & Discovery",             desc: "Semantic search, faceted discovery, and recommendation interfaces that understand intent rather than matching keywords. Users find what they need faster, and discover what they didn't know to look for." },
  { Icon: Target,       title: "Personalisation & Recommendation Engines",  desc: "Web apps that learn from every interaction tailoring content, surfacing relevant records, and sequencing user journeys based on behaviour, preferences, and predictive scoring." },
  { Icon: FileText,     title: "Document & Knowledge Intelligence Portals", desc: "Secure web platforms that ingest, process, and interrogate large volumes of unstructured content documents, reports, emails, contracts and make that knowledge instantly queryable by your team or clients." },
];

const processSteps = [
  { num: "01", title: "Product Discovery & AI Architecture Weeks 1-2", desc: "We run structured discovery sessions with your team to map user goals, data sources, and decision points. We define the AI capabilities the product needs, select the right model and infrastructure approach, and produce a full product architecture document and wireframe blueprint." },
  { num: "02", title: "Design & Prototype Weeks 3-4",                  desc: "We design the full UI built around the AI interactions, not around a standard CRUD template. A working prototype is built on your real data so you can see the intelligence layer in action before full engineering begins." },
  { num: "03", title: "Engineering Sprint Weeks 5-10",                desc: "Full stack build across front end, back end, AI integration, and infrastructure. Fortnightly sprint reviews mean you see working software every two weeks not a black box that opens at launch." },
  { num: "04", title: "QA, Launch & Iteration",                         desc: "Rigorous QA across functionality, AI output quality, and edge cases. We launch with monitoring in place tracking user behaviour, AI performance, and system health. Post launch iteration sprints included in every engagement." },
];

const caseStudies = [
  {
    title: "Contract Intelligence Platform", location: "London, UK",
    problem: "A network of 14 boutique law firms was running on a shared matter management system that stored contracts but couldn't analyse them. Fee earners were spending 4-6 hours per contract on initial review extracting key terms, flagging risk, and writing internal briefing notes. With 80-120 contracts processed monthly across the network, the labour cost was significant and inconsistency in review quality was a growing liability risk.",
    solution: "A secure, multi tenanted web application where fee earners upload contracts and receive a structured AI review within minutes. The platform extracts 50+ defined clause types, scores each against a configurable risk matrix, highlights non-standard terms with plain-language explanations, and auto-generates a formatted briefing note. Partners can customise risk thresholds per matter type. A knowledge base of processed contracts builds over time, making the AI progressively more calibrated to each firm's practice areas. Full audit trail on every review for compliance purposes.",
    stack: "React · Node.js · PostgreSQL · Custom fine tuned LLM · RAG over firm contract library · AWS private inference · Role based access control",
    results: ["Initial contract review time: 4-6 hours → under 8 minutes", "94% of AI generated briefing notes accepted without material revision", "Network processed 1,400+ contracts in the first 8 months post launch", "Risk flags identified issues missed in 11% of previously manually reviewed contracts"],
    quote: "None of the off-the-shelf products could be calibrated to our specific risk framework. What they built is more accurate for our use cases than anything we tested.",
    tag: "AI Web Apps · London, UK", badge: "under 8 minutes", badgeColor: "#7C3AED", topBg: "linear-gradient(135deg,#7C3AED14 0%,#7C3AED05 100%)",
    subtitle: "London, UK", stat: "8min", statDesc: "Initial contract review time: 4-6 hours → under 8 minutes",
    tags: ["React", "Node.js", "PostgreSQL"],
      quoteBy: "Managing Director, London Legal Network",
  },
  {
    title: "Clinical Pre-Assessment Portal", location: "Melbourne, Australia",
    problem: "A private specialist clinic network was managing patient intake through a combination of PDF forms, phone calls, and reception data entry a process that averaged 35 minutes per new patient before the clinician even entered the room. Incomplete intake data was a recurring issue, and clinicians were repeatedly starting appointments with insufficient context on the patient's presenting condition.",
    solution: "A patient-facing web application that guides new patients through an intelligent intake process before their appointment. The interface uses adaptive questioning branching based on responses, probing where clinical detail is needed, and stopping when sufficient information is captured. On completion, an AI generated clinical summary is placed in the clinician's dashboard structured, prioritised, and formatted to their specialty's documentation standards. The system flags potential contraindications, medication interactions, and red-flag symptom combinations for clinician review.",
    stack: "React · FastAPI · Supabase · GPT-4 with medical prompting framework · HL7 FHIR integration · HIPAA & Australian Privacy Act compliant infrastructure",
    results: ["Average new patient intake time: 35 minutes → 6 minutes", "Clinician-rated briefing quality: 4.7/5 vs 2.9/5 for previous paper forms", "Contraindication flags identified actionable issues in 8.3% of new patient intakes", "Clinic capacity increased by 2.1 appointments per clinician per day"],
    quote: "The clinical summaries this system generates are genuinely better than what our experienced reception team was producing. It asks the right questions in the right sequence something that previously took years of training to get right.",
    tag: "AI Web Apps · Melbourne, Australia", badge: "6 minutes", badgeColor: "#FF6B2B", topBg: "linear-gradient(135deg,#FF6B2B14 0%,#FF6B2B05 100%)",
    subtitle: "Melbourne, Australia", stat: "6min", statDesc: "Average new patient intake time: 35 minutes → 6 minutes",
    tags: ["React", "FastAPI", "Supabase"],
      quoteBy: "Clinical Director, Melbourne Specialist Network",
  },
  {
    title: "AI Merchandising Intelligence Platform", location: "Toronto, Canada",
    problem: "A mid-market e-commerce retailer with 4,800 SKUs had a merchandising team of three spending 60% of their time pulling data from Shopify, Google Analytics, and their ad platforms into spreadsheets, then writing weekly performance summaries and making manual restocking and promotional decisions. The lag between data and decision was averaging 5-7 days meaning slow-moving SKUs stayed live too long and high performing products regularly went out of stock.",
    solution: "A custom merchandising intelligence web application that ingests real time data from all their platforms and surfaces AI generated decisions not raw data. The platform presents each SKU with an AI performance score, trend direction, recommended action (promote, reprice, bundle, discontinue), and the specific data rationale behind each recommendation. Weekly AI generated executive summaries replace manual reporting. A scenario modelling tool lets the merchandising team test pricing and promotional changes against predicted revenue impact before committing.",
    stack: "React · Python · Predictive ML model (XGBoost) · Shopify API · GA4 integration · Meta & Google Ads API · PostgreSQL · Role based personalisation layer",
    results: ["Merchandising team data tasks: 60% → under 15% of working week", "Stockout incidents on top-100 SKUs reduced by 73% in the first quarter", "Time from data signal to merchandising decision: 5-7 days → same day", "AI recommended promotional actions drove 28% higher revenue per campaign"],
    quote: "The platform doesn't just show us what happened — it tells us what to do next and why. That shift alone has changed how our whole team operates.",
    tag: "AI Web Apps · Toronto, Canada", badge: "under 15% of working week", badgeColor: "#22C55E", topBg: "linear-gradient(135deg,#22C55E14 0%,#22C55E05 100%)",
    subtitle: "Toronto, Canada", stat: "15%", statDesc: "Merchandising team data tasks: 60% → under 15% of working week",
    tags: ["React", "Python", "Predictive"],
      quoteBy: "Chief Merchandising Officer, Toronto eCommerce Retailer",
  },
  {
    title: "Candidate Intelligence Platform", location: "Dublin, Ireland",
    problem: "A recruitment agency group was processing 300-400 candidate applications per role, with consultants spending 3-4 hours on initial screening per vacancy. Quality of shortlists was inconsistent across consultants, and the time-to-shortlist was averaging 8 days causing the group to lose placements to faster competitors.",
    solution: "A web application that transforms how the agency processes every role from intake to shortlist. Client brief entered → AI generates a structured role intelligence document including must-have criteria and ideal candidate profile. CVs uploaded in bulk → AI scores each candidate against the role intelligence framework, identifies specific evidence of required competencies, flags gaps, and ranks candidates with written rationale. Consultants review an AI curated shortlist with full justification. Client-ready shortlist packs auto-generated in the agency's branded format.",
    stack: "React · Node.js · Supabase · Custom CV parsing pipeline · LLM scoring engine · RAG over role and placement history · PDF generation · Multi-agency white label architecture",
    results: ["Time-to-shortlist: 8 days → 1.5 days average", "Consultant screening time per vacancy: 3-4 hours → 35 minutes", "Client shortlist approval rate (first submission): 54% → 81%", "Agency capacity to handle concurrent vacancies increased 2.8x without additional headcount"],
    quote: "Our consultants initially worried AI would replace their judgment. What actually happened is they make better decisions faster because the AI handles the pattern matching and they focus on the nuance. Placement quality has measurably improved.",
    tag: "AI Web Apps · Dublin, Ireland", badge: "1.5 days average", badgeColor: "#1A6FE8", topBg: "linear-gradient(135deg,#1A6FE814 0%,#1A6FE805 100%)",
    subtitle: "Dublin, Ireland", stat: "1.5d", statDesc: "Time-to-shortlist: 8 days → 1.5 days average",
    tags: ["React", "Node.js", "Supabase"],
      quoteBy: "Managing Director, Dublin Recruitment Group",
  },
  {
    title: "AI Powered Loan Origination Platform", location: "Mumbai, India",
    problem: "A mid sized NBFC processing 1,200+ loan applications monthly had a credit assessment team manually verifying ITRs, bank statements, GST returns, and bureau reports for each applicant a process taking 3-4 days per file with significant analyst-to-analyst inconsistency in risk scoring. High-potential applicants were being lost to faster moving fintech lenders.",
    solution: "A secure web application that transforms the entire origination workflow. Applicant submits → AI extracts and cross validates data across all uploaded documents simultaneously → custom credit intelligence engine scores 40+ risk parameters → flags inconsistencies between declared income and bank behaviour → generates a structured credit memo with approval recommendation, risk grade, and RBI-compliant audit trail. Underwriters review AI prepared files instead of raw documents. Escalation logic routes complex profiles to senior credit automatically.",
    stack: "React · FastAPI · PostgreSQL · Multimodal document processing · Custom NBFC credit scoring engine · CIBIL API integration · AWS private inference · Role based workflow routing",
    results: ["Loan file processing time: 3-4 days → 6 hours average", "Underwriter capacity increased 3.1x without additional headcount", "Credit memo consistency score: 61% → 94% across the team", "Regulatory audit queries resolved in under 2 hours vs previously 3-4 days"],
    quote: "Our compliance team was the biggest sceptic going into this. Six months later they're its loudest internal advocates. The audit trail this system generates is cleaner than anything our analysts were producing manually.",
    tag: "AI Web Apps · Mumbai, India", badge: "6 hours average", badgeColor: "#EC4899", topBg: "linear-gradient(135deg,#EC489914 0%,#EC489905 100%)",
    subtitle: "Mumbai, India", stat: "6hr", statDesc: "Loan file processing time: 3-4 days → 6 hours average",
    tags: ["React", "FastAPI", "PostgreSQL"],
      quoteBy: "Chief Credit Officer, Mumbai-Based NBFC",
  },
  {
    title: "Dealer Intelligence Platform", location: "Pune, India",
    problem: "A B2B building materials manufacturer with 1,400+ dealers across Maharashtra, Gujarat, and Rajasthan had no real time visibility into dealer performance, stock levels, or at risk accounts. Their regional sales managers were operating from monthly Excel reports compiled by hand by the time a dealer's declining order pattern was visible, the relationship had often already deteriorated. Key account churn was running at 18% annually with no early warning system in place.",
    solution: "A web application giving national sales leadership and regional managers a live dealer intelligence layer. The platform ingests order data, payment history, complaint records, and field visit logs and runs a continuous AI scoring model that tracks dealer health in real time. Accounts approaching churn threshold trigger automatic alerts to the responsible RSM with a pre-populated intervention brief. AI generated dealer scorecards replace manual Excel decks. A territory-level performance view lets national leadership identify regional patterns and resource allocation gaps.",
    stack: "React · React Native (field rep mobile view) · Node.js · Supabase · XGBoost churn prediction model · ERP integration (SAP) · Automated PDF scorecard generation · Real time alert system",
    results: ["Dealer churn: 18% → 7% in the first year post launch", "RSM time on manual reporting reduced by 14 hours per week per manager", "At-risk accounts identified an average of 47 days earlier than Excel based process", "340 proactive interventions triggered in Year 1 71% resulted in account retention"],
    quote: "We were managing 1,400 dealers with gut feel and monthly reports. Now every RSM walks into every dealer conversation knowing exactly what's happening with that account. The churn reduction alone paid for this product several times over in the first year.",
    tag: "AI Web Apps · Pune, India", badge: "7% in the first year post-la", badgeColor: "#F59E0B", topBg: "linear-gradient(135deg,#F59E0B14 0%,#F59E0B05 100%)",
    subtitle: "Pune, India", stat: "7%", statDesc: "Dealer churn: 18% → 7% in the first year post launch",
    tags: ["React", "React", "Node.js"],
      quoteBy: "National Sales Head, Pune Manufacturing Group",
  },
];


const whyUs = [
  { title: "AI Architecture Before UI",         desc: "Most agencies design the UI first and figure out the AI later. We map what decisions the AI needs to make, what data it needs, and how it should behave under uncertainty before a single wireframe is drawn." },
  { title: "AI First UX Design",                desc: "Designing for AI outputs requires different patterns than standard interfaces. We've developed a UI framework specifically for surfaces that display AI reasoning, confidence levels, generative content, and adaptive personalisation." },
  { title: "We Work With Your Real Data",        desc: "Every prototype we build runs on your real data. You don't see what the AI can do in theory you see what it does with your actual documents, your actual users, your actual edge cases." },
  { title: "We Instrument Everything",           desc: "Every AI powered web app we ship includes full analytics on AI performance accuracy tracking, user acceptance rates, output quality scoring, and drift detection. You always know how well the AI is performing." },
  { title: "Private, Compliant, Auditable",      desc: "Sensitive data never touches a shared inference endpoint. We build on private infrastructure with full audit trails, role based access, and compliance documentation for GDPR, HIPAA, and industry specific frameworks." },
  { title: "We've Shipped, Not Just Prototyped", desc: "Every product pattern we use has been through production real users, real scale, real edge cases. We don't experiment on your product budget." },
];

const faqs = [
  { q: "Can you build on top of our existing web app, or does it need to be built from scratch?", a: "Both. We frequently integrate AI capabilities into existing products adding intelligent layers, replacing manual workflows with AI driven ones, or embedding new features into your current architecture. We assess your existing codebase in discovery and recommend the most efficient path." },
  { q: "How do you handle AI outputs that are wrong or unpredictable?", a: "Every AI feature we ship includes confidence thresholds, fallback states, and human review paths. We design explicitly for the cases where the AI is uncertain users are never shown a low confidence output as if it were fact. We also instrument accuracy from day one so degradation is caught early." },
  { q: "Will we be locked in to a particular AI provider?", a: "No. We design provider-agnostic where possible, using abstraction layers that allow model swaps without rebuilding your product. If a better model becomes available or your requirements change, we can migrate without re-architecting." },
  { q: "How do you handle sensitive or regulated data healthcare records, financial data, legal documents?", a: "Sensitive data workloads run on private infrastructure with no data sharing with third party model providers. We provide compliance documentation and work within GDPR, HIPAA, and applicable industry frameworks from day one of architecture design." },
  { q: "What does the ongoing relationship look like after launch?", a: "Every engagement includes a post launch period with monitoring, iteration sprints, and AI performance reviews. Most clients move into a retainer model for continued product development AI products aren't one-time builds, they improve with use and require ongoing calibration." },
  { q: "How do we get started?", a: "Book a free Product Discovery Call. We'll discuss your product idea or existing app, identify where AI can create the most leverage, and outline what a build engagement would look like no commitment required." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E7EB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="font-semibold text-[#0A1628] text-[15px]"><span data-cms-key={`aiwebapp_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`aiwebapp_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
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
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}15` }}><span data-cms-key={`aiwebapp_cs_${i}_tag`} data-cms-label="CS Tag" data-cms-attr="text">{cs.tag}</span></span>
        <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ color: cs.badgeColor, background: `${cs.badgeColor}15`, border: `1px solid ${cs.badgeColor}30` }}><span data-cms-key={`aiwebapp_cs_${i}_badge`} data-cms-label="CS Badge" data-cms-attr="text">{cs.badge}</span></span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4"><span data-cms-key={`aiwebapp_cs_${i}_title`} data-cms-label="Case Study Title" data-cms-attr="text">{cs.title}</span></h3>

        {/* Big stat */}
        <div className="flex items-center gap-2 mb-3">
          <CMSIcon cmsKey="aiwebapp_icon_1" cmsLabel="TrendingUp Icon" name="TrendingUp" size={18} color={cs.badgeColor} />
          <span className="text-[42px] font-black leading-none" style={{ color: cs.badgeColor }}><span data-cms-key={`aiwebapp_cs_${i}_stat`} data-cms-label="CS Stat" data-cms-attr="text">{cs.stat}</span></span>
        </div>
        <p className="text-[15px] leading-relaxed text-[#4B5563] mb-5 flex-1"><span data-cms-key={`aiwebapp_cs_${i}_statdesc`} data-cms-label="Case Study Stat Desc" data-cms-attr="text">{cs.statDesc}</span></p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cs.tags.map((t: string) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ color: cs.badgeColor, background: `${cs.badgeColor}12` }}><span data-cms-key={`aiwebapp_cs_${i}_tag_${t}`} data-cms-label="CS Tech Tag" data-cms-attr="text">{t}</span></span>
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
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">The Challenge: </span><span data-cms-key={`aiwebapp_cs_${i}_problem`} data-cms-label="CS Problem" data-cms-attr="text">{cs.problem}</span></p>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">What We Built: </span><span data-cms-key={`aiwebapp_cs_${i}_solution`} data-cms-label="CS Solution" data-cms-attr="text">{cs.solution}</span></p>
              <p className="text-[11px] text-[#9CA3AF] font-mono mb-4"><span data-cms-key={`aiwebapp_cs_${i}_stack`} data-cms-label="Case Study Stack" data-cms-attr="text">{cs.stack}</span></p>
              <ul className="space-y-1.5 mb-4">
                {cs.results.map((r: string, ri: number) => (
                  <li key={r} className="flex items-start gap-2 text-[13px] text-[#374151]">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: cs.badgeColor }} />{r}
                  </li>
                ))}
              </ul>
              <blockquote className="border-l-2 pl-3 italic text-[13px] text-[#6B7280]" style={{ borderColor: cs.badgeColor }}>
                "<span data-cms-key={`aiwebapp_cs_${i}_quote`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>"<span className="not-italic font-semibold text-[#374151] text-[12px]"><span data-cms-key={`aiwebapp_cs_${i}_quoteBy`} data-cms-label="CS Quote By" data-cms-attr="text">{cs.quoteBy}</span></span>
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AIWebAppsPage = () => {
  const _sp = useSettings(['aiwebapp_hero_h1','aiwebapp_hero_sub','aiwebapp_cta_btn']);
  return (
  <PageLayout>

    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 400, height: 400, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-4 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <span className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(34,197,94,0.1)", color: accent, border: "1px solid rgba(34,197,94,0.3)" }}>
              <Brain size={12} /> AI Powered Web Apps
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="aiwebapp_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Most Web Apps Display Data.<br className="hidden md:block" />
            Yours Should Think With It.
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="aiwebapp_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We design and engineer AI powered web applications where intelligence is built into the product — not bolted on. Apps that reason, personalise, predict, and act on what your users do, in real time.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="aiwebapp_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Book a Free Product Discovery Call</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">What We Build</a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6"><span data-cms-key="aiwebapp_p_37" data-cms-label="Body Text" data-cms-attr="text">Shipped across legal, healthcare, e-commerce, finance, and logistics for businesses that compete on product intelligence</span></p>
        </motion.div>
      </div>
    </section>

    {/* Positioning */}
    <section id="services-list" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="section-badge" data-cms-key="aiwebapp_badge_30" data-cms-label="Section Badge" data-cms-attr="text">Not Your Typical Web Development Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            <span data-cms-key="aiwebapp_h2_main" data-cms-label="Section Heading" data-cms-attr="text">Any Agency Can Build You a Web App.</span><br className="hidden md:block" /> <span data-cms-key="aiwebapp_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">Very Few Can Build One That Thinks.</span>
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8"><span data-cms-key="aiwebapp_x13" data-cms-label="Body Text" data-cms-attr="text">There's a generation of web applications being built right now where AI isn't a feature — it's the entire product logic — Where the interface adapts to the user — Where the app surfaces insights before they're requested — Where the system gets more useful every day as it learns from real usage.</span></p>

          {/* Pain points — what other agencies deliver */}
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Websites with a chatbot dropped in", detail: "AI as decoration, not product logic" },
              { pain: "Dashboards with a 'Powered by AI' badge", detail: "Marketing spin over real intelligence" },
              { pain: "Apps that just store and display data", detail: "No learning, no adaptation, no edge" },
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

          {/* Warning callout */}
          <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3" style={{ background: "rgba(255,107,43,0.06)", borderLeftColor: "#FF6B2B" }}>
            <span className="text-[#FF6B2B] text-lg font-black mt-0.5 shrink-0">⚠</span>
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">
              <span data-cms-key="aiwebapp_x15" data-cms-label="Body Text" data-cms-attr="text">If your existing web app is still just storing and displaying data, you're already behind.</span>
            </p>
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "AI Architecture From Day One",           desc: "Intelligence isn't layered onto our apps after the fact. We design the data model, API structure, and UX around AI capabilities from the first line of architecture so the system scales and learns as your product grows." },
            { title: "Real Time, Personalised Experiences",    desc: "Our apps don't serve the same interface to every user. They adapt surfacing what each user needs next, flagging what matters, and responding to context in real time." },
            { title: "Built to Enterprise Standards",          desc: "Role based access, audit trails, GDPR compliant data handling, and private model inference where required. Enterprise grade from the start, not retrofitted later." },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2"><span data-cms-key={`aiwebapp_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiwebapp_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aiwebapp_badge_31" data-cms-label="Section Badge" data-cms-attr="text">What We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-3"><span data-cms-key="aiwebapp_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Using These Products</span></h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto"><span data-cms-key="aiwebapp_x16" data-cms-label="Body Text" data-cms-attr="text">Every product is engineered around your users, your data, and the specific decisions your business needs AI to make.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: accent }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <s.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aiwebapp_svc_${si}_title`} data-cms-label="Service Title" data-cms-attr="text">{s.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiwebapp_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process Roadmap */}
    <section className="py-20 px-4 md:px-8 overflow-hidden" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-badge" data-cms-key="aiwebapp_badge_32" data-cms-label="Section Badge" data-cms-attr="text">How We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mt-2"><span data-cms-key="aiwebapp_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">From Idea to Live Product</span></h2>
          <p className="text-[#6B7280] mt-3 max-w-xl mx-auto"><span data-cms-key="aiwebapp_s16_sub" data-cms-label="Section Subtext" data-cms-attr="text">4 phases. Zero guesswork. You see working software every two weeks.</span></p>
        </motion.div>

        {/* Desktop: split timeline */}
        <div className="hidden md:block relative">
          {/* Center spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: `linear-gradient(180deg, transparent, ${accent} 8%, ${accent} 92%, transparent)` }} />

          <div className="space-y-8">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13, duration: 0.5 }}
                  className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className="flex-1 group" style={{ padding: isLeft ? "0 24px 0 0" : "0 0 0 24px" }}>
                    <div className="bg-white rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}50`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 48px ${accent}18`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
                      }}
                    >
                      {/* Sweep shimmer on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: `linear-gradient(120deg, transparent 30%, ${accent}08 50%, transparent 70%)` }} />
                      {/* Top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
                      <span className="inline-block text-[10px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mb-3"
                        style={{ background: `${accent}12`, color: accent }}>Phase {step.num}</span>
                      <h3 className="font-black text-[#0A1628] text-[15px] leading-snug mb-2"><span data-cms-key={`aiwebapp_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-[13px] text-[#6B7280] leading-relaxed"><span data-cms-key={`aiwebapp_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-base transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-default"
                      style={{ background: `linear-gradient(135deg, ${accent}, #16a34a)`, boxShadow: `0 4px 20px ${accent}50` }}>
                      {step.num}
                    </div>
                  </div>

                  {/* Spacer opposite */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden relative pl-12">
          <div className="absolute left-4 top-2 bottom-2 w-[2px] rounded-full"
            style={{ background: `linear-gradient(180deg, ${accent}, ${accent}30)` }} />
          <div className="space-y-6">
            {processSteps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[34px] w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-xs z-10"
                  style={{ background: `linear-gradient(135deg, ${accent}, #16a34a)`, boxShadow: `0 2px 12px ${accent}40` }}>
                  {step.num}
                </div>
                <div className="bg-white rounded-2xl p-5 border relative overflow-hidden"
                  style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="absolute bottom-0 left-0 h-[3px] w-10 rounded-b-xl" style={{ background: accent }} />
                  <span className="inline-block text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-3"
                    style={{ background: `${accent}12`, color: accent }}>Phase {step.num}</span>
                  <h3 className="font-black text-[#0A1628] text-[14px] leading-snug mb-2"><span data-cms-key={`aiwebapp_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed"><span data-cms-key={`aiwebapp_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <CaseStudies />
        {/* Testimonials */}
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="aiwebapp_badge_34" data-cms-label="Section Badge" data-cms-attr="text">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"><span data-cms-key="aiwebapp_s13_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Using These Products</span></h2>
        </motion.div>
        <DBTestimonialCarousel />
      </div>
    </section>


    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aiwebapp_badge_35" data-cms-label="Section Badge" data-cms-attr="text">Why Digital Aura</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aiwebapp_s14_h2" data-cms-label="Section Heading" data-cms-attr="text">Why Product Teams Choose Digital Aura to Build With AI</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border group relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, #1A6FE8)` }} />
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aiwebapp_why_${i}_title`} data-cms-label="Why Title" data-cms-attr="text">{w.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiwebapp_why_${i}_desc`} data-cms-label="Why Desc" data-cms-attr="text">{w.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── AI Web Apps Clients ── */}
    <section className="py-14 px-4 md:px-8 bg-white" style={{ borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Built AI Web Apps For</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Clients We've Powered With AI Web Apps</h2>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto">Real businesses. Real AI applications. Delivered by Digital Aura.</p>
        </motion.div>
        <ClientLogoGrid accentColor={accent} clients={[
          { name: "Track My Ads",         tag: "AdTech",            logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E",                                                                   logoBg: "#f0f8ff" },
          { name: "Silverstone Financial",tag: "Financial Services", logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png",                      logoBg: "#f0faff" },
          { name: "Gleekey",              tag: "Tech & SaaS",       logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png",                                                  logoBg: "#f5f0ff" },
        ]} />
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aiwebapp_badge_36" data-cms-label="Section Badge" data-cms-attr="text">FAQ</span>
          <h2 className="text-3xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aiwebapp_s15_h2" data-cms-label="Section Heading" data-cms-attr="text">Common Questions</span></h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="aiwebapp_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Let's Define What Your{" "}
            <span data-cms-key="aiwebapp_hl_150" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">AI Powered</span>{" "}
            <span data-cms-key="aiwebapp_hl_151" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Web App</span>{" "}
            Can Do.</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="aiwebapp_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Product Discovery Call. We'll map the AI opportunities in your product, show you what's technically possible with your data, and give you a clear picture of what a build would involve before you commit to anything.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Product Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="aiwebapp_x17" data-cms-label="Fine Print" data-cms-attr="text">No generic proposals — No off-the-shelf demos — A real conversation about your specific product, your users, and what's actually achievable.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default AIWebAppsPage;




