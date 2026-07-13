import CaseStudies from "@/components/CaseStudies";
import ClientLogoSection from "@/components/ClientLogoSection";
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
  MessageSquare, ShoppingCart, FileText, Calendar, BarChart3, Repeat,
} from "lucide-react";

const accent = "#1A6FE8";
const accentBg = "rgba(26,111,232,0.08)";
const accentBorder = "rgba(26,111,232,0.2)";

const services = [
  { Icon: MessageSquare, title: "Customer Support Assistants",     desc: "AI assistants that handle Tier-1 and Tier-2 support autonomously resolving queries, processing returns, checking order status, troubleshooting issues, and escalating to human agents with full context when genuinely needed." },
  { Icon: ShoppingCart,  title: "Sales & Conversion Assistants",   desc: "Assistants that qualify leads, answer product questions with depth, guide users through decision journeys, and push prospects to conversion 24/7, without a sales rep involved until the right moment." },
  { Icon: FileText,      title: "Internal Operations Assistants",  desc: "Intelligent assistants for your team answering policy questions, surfacing the right documents, processing internal requests, and navigating complex procedures so your people stop searching and start doing." },
  { Icon: Calendar,      title: "Appointment & Booking Assistants", desc: "End to end booking flows built into conversational interfaces checking availability, capturing details, confirming appointments, sending reminders, and managing reschedules without human involvement." },
  { Icon: BarChart3,     title: "Data Query & Reporting Assistants", desc: "Assistants that let non technical users interrogate your business data in plain language 'What were our top 5 products last month?' answered instantly, without touching a dashboard." },
  { Icon: Repeat,        title: "Process Execution Assistants",    desc: "Assistants that don't just advise — they do. Triggering workflows, updating records, sending communications, and completing multi-step processes through conversation alone." },
];

const processSteps = [
  { num: "01", title: "Discovery & Use Case Mapping Week 1",                    desc: "We audit your highest volume conversations support tickets, chat logs, enquiry emails, internal FAQs. We identify the top use cases by volume and resolution complexity, and define the assistant's scope, escalation logic, and success metrics." },
  { num: "02", title: "Knowledge Architecture & Integration Design Week 2",      desc: "We map every data source the assistant needs to access your CRM, knowledge base, product catalogue, booking system, internal docs. We design the integration architecture and the knowledge retrieval layer so the assistant has everything it needs to resolve, not just respond." },
  { num: "03", title: "Build, Train & Test Weeks 3-5",                          desc: "We build the assistant, train it on your real data and conversation history, run adversarial testing across edge cases and off script inputs, and tune responses until quality meets your defined threshold. You review conversations and provide feedback throughout not just at the end." },
  { num: "04", title: "Deploy, Monitor & Improve",                                 desc: "We deploy across your chosen channels with full conversation logging, resolution rate tracking, and escalation analytics. Weekly performance reviews in the first 60 days. The assistant improves continuously as it processes real conversations getting more accurate, more capable, and more attuned to your users over time." },
];

const caseStudies = [
  {
    title: "eCommerce Customer Support Assistant", location: "Auckland, New Zealand",
    problem: "A fast growing D2C skincare brand was handling 1,800-2,400 customer support conversations per month. Their 4-person support team was spending 70% of their time on repetitive queries order status, delivery timelines, return eligibility, and product ingredient questions. Average response time was 6.2 hours and customer satisfaction scores were declining.",
    solution: "A conversational AI support assistant deployed on their website and WhatsApp. The assistant integrates directly with their Shopify store and shipping provider resolving order status and delivery queries with live data in real time. It handles return eligibility checks, answers product questions using a vector-search knowledge base built on their entire product catalogue, and manages exchange requests end to end. Escalations to the human team include a full conversation summary and sentiment score so agents can jump in with full context immediately.",
    stack: "Custom LLM assistant · Shopify API integration · Shipping provider API · Vector search knowledge base · WhatsApp Business API · Sentiment analysis layer · Escalation routing",
    results: ["74% of support conversations resolved autonomously", "Average response time: 6.2 hours → under 90 seconds", "Human team freed to focus entirely on complex complaints and VIP customers", "Customer satisfaction score: 3.6 → 4.5 out of 5 within 60 days"],
    quote: "Our support team went from drowning to actually enjoying their work. The AI handles everything routine so they can focus on the conversations that actually need a human.",
    tag: "AI Chatbot · Auckland, New Zealand", badge: "74% of support conversations", badgeColor: "#7C3AED", topBg: "linear-gradient(135deg,#7C3AED14 0%,#7C3AED05 100%)",
    subtitle: "Auckland, New Zealand", stat: "74%", statDesc: "74% of support conversations resolved autonomously",
    tags: ["Custom", "Shopify", "Shipping"],
      quoteBy: "Head of Customer Experience, Auckland D2C Skincare Brand",
  },
  {
    title: "Internal HR & Policy Assistant", location: "Chicago, USA",
    problem: "A professional services firm with 340 employees was generating 60-80 internal HR and policy queries per week leave balances, expense policies, onboarding checklists, benefits questions, compliance procedures. HR had two people managing these alongside their core responsibilities. Response times were averaging 2-3 days.",
    solution: "An internal AI assistant deployed on Microsoft Teams. The assistant is trained on the firm's complete HR policy library, employee handbook, benefits documentation, and compliance procedures and retrieves answers using semantic search. It handles leave balance queries by integrating with their HRIS, processes simple expense pre approvals against policy rules, and routes genuinely complex situations to the right HR person with full context attached. The assistant is role aware answers are filtered by the employee's level and office location where policy differs.",
    stack: "Microsoft Teams bot framework · Custom RAG pipeline over HR document library · HRIS integration · Role based access and filtering · Escalation routing with context handoff",
    results: ["81% of HR queries resolved without human involvement", "Query resolution time: 2-3 days → under 3 minutes", "HR team time on routine queries reduced by 22 hours per week", "Employee satisfaction with HR responsiveness: 2.8 → 4.4 out of 5"],
    quote: "Within two weeks of launch, the HR team had reclaimed enough time to actually work on the strategic initiatives they'd been putting off for a year.",
    tag: "AI Chatbot · Chicago, USA", badge: "81% of HR queries resolved w", badgeColor: "#FF6B2B", topBg: "linear-gradient(135deg,#FF6B2B14 0%,#FF6B2B05 100%)",
    subtitle: "Chicago, USA", stat: "81%", statDesc: "81% of HR queries resolved without human involvement",
    tags: ["Microsoft", "Custom", "HRIS"],
      quoteBy: "Chief People Officer, Chicago Professional Services Firm",
  },
  {
    title: "Sales Qualification Assistant", location: "Amsterdam, Netherlands",
    problem: "A B2B SaaS company was receiving 200+ inbound leads per month. Their 2 person SDR team was spending 3-4 hours daily on initial qualification gathering company details, understanding use cases, assessing fit, and booking discovery calls. Leads were going cold during the qualification delay.",
    solution: "An AI qualification assistant embedded on their website that initiates conversations with inbound visitors showing purchase intent signals, asks intelligent qualification questions in a natural conversational flow, assesses fit against their ICP criteria in real time, and books qualified discovery calls directly into the SDR calendar. Passes a full qualification summary company profile, stated use case, ICP score, and conversation transcript to the SDR before every booked call. Integrated with their CRM so every lead interaction is logged automatically.",
    stack: "Custom LLM assistant · Intent detection layer · ICP scoring engine · Calendar integration (Calendly + HubSpot) · CRM auto-logging · Lead routing logic",
    results: ["68% of inbound qualification conversations handled end to end", "SDR time on qualification: 3-4 hours daily → under 45 minutes", "Discovery call show rate: 54% → 71% due to better qualified leads", "Lead response time: 4.5 hours → under 2 minutes"],
    quote: "The SDRs were initially worried about what this meant for their role. Within a month they were its biggest advocates they were spending all their time on calls that actually went somewhere.",
    tag: "AI Chatbot · Amsterdam, Netherlands", badge: "68% of inbound qualification", badgeColor: "#22C55E", topBg: "linear-gradient(135deg,#22C55E14 0%,#22C55E05 100%)",
    subtitle: "Amsterdam, Netherlands", stat: "68%", statDesc: "68% of inbound qualification conversations handled end to end",
    tags: ["Custom", "Intent", "ICP"],
      quoteBy: "VP Sales, Amsterdam B2B SaaS Company",
  },
  {
    title: "Patient Engagement Assistant", location: "Bangalore, India",
    problem: "A multi specialty hospital group with 3 facilities was handling 500-700 patient enquiries daily across phone, WhatsApp, and their website. Their front desk teams were overwhelmed, wait times were driving patients to competitor hospitals, and out of hours enquiries went entirely unanswered.",
    solution: "A multilingual AI patient engagement assistant deployed across WhatsApp, the hospital website, and their app handling enquiries in English, Hindi, and Kannada. The assistant manages end to end appointment booking across all three facilities and 40+ specialties, checks doctor availability in real time via integration with their HMS, provides treatment cost guidance, answers pre and post-procedure queries from a clinician reviewed medical knowledge base, and handles insurance pre-authorisation checklist queries. Out-of-hours, the assistant captures urgent queries and triggers priority callbacks at opening.",
    stack: "Multilingual LLM (English + Hindi + Kannada) · WhatsApp Business API · Hospital Management System integration · Appointment scheduling engine · Medical knowledge base (clinician reviewed) · Patient record logging · Urgency detection and callback triggers",
    results: ["67% of inbound patient enquiries resolved without front desk involvement", "Out-of-hours query capture: 0% → 100% zero missed leads overnight", "Appointment booking time: 8 minutes (call) → 2.5 minutes (chat)", "Patient satisfaction with communication: 3.2 → 4.6 out of 5 post launch"],
    quote: "We were losing patients to hospitals that simply responded faster. This assistant doesn't just answer questions — it books appointments at midnight. That capability alone has measurably changed our admission numbers.",
    tag: "AI Chatbot · Bangalore, India", badge: "67% of inbound patient enqui", badgeColor: "#1A6FE8", topBg: "linear-gradient(135deg,#1A6FE814 0%,#1A6FE805 100%)",
    subtitle: "Bangalore, India", stat: "67%", statDesc: "67% of inbound patient enquiries resolved without front desk involvement",
    tags: ["Multilingual", "WhatsApp", "Hospital"],
      quoteBy: "Chief Operations Officer, Bangalore Multi-Specialty Hospital Group",
  },
  {
    title: "Distributor Support Assistant", location: "Delhi, India",
    problem: "A FMCG manufacturer with 2,400 distributors had a field sales team fielding 300+ daily calls order status checks, scheme queries, complaint logging, and product availability questions. Field reps were spending 40% of their working day on queries that required no human judgment whatsoever.",
    solution: "A WhatsApp-based AI assistant for distributor communication, accessible to all 2,400 distributors in their preferred language English, Hindi, or Bhojpuri. The assistant integrates with the company's ERP to provide real time order status, delivery ETAs, and payment outstanding summaries. It handles scheme and discount queries against the current promotional calendar, logs complaints directly into the CRM with auto-classification and priority tagging, checks product availability by SKU and region, and escalates non-standard queries to the relevant area sales manager with full context.",
    stack: "Multilingual LLM (English + Hindi + Bhojpuri) · WhatsApp Business API · ERP integration · CRM complaint logging · Promotional calendar API · Region-based product availability engine · ASM escalation routing",
    results: ["Field rep time on distributor calls: 40% → 11% of working day", "Distributor query resolution time: 3.5 hours → 4 minutes", "Complaint logging completeness: 61% → 98%", "Distributor satisfaction score: 3.1 → 4.3 out of 5 post launch"],
    quote: "Our field team used to dread their phones. Now they actually spend their time in the field doing what we hired them to do. The distributors got faster answers and our reps got their jobs back.",
    tag: "AI Chatbot · Delhi, India", badge: "11% of working day", badgeColor: "#EC4899", topBg: "linear-gradient(135deg,#EC489914 0%,#EC489905 100%)",
    subtitle: "Delhi, India", stat: "11%", statDesc: "Field rep time on distributor calls: 40% → 11% of working day",
    tags: ["Multilingual", "WhatsApp", "ERP"],
      quoteBy: "National Sales Director, Delhi FMCG Manufacturer",
  },
];


const whyUs = [
  { title: "We Design for the Job, Not the Technology",   desc: "We start with the specific job your assistant needs to do then choose the right architecture, channels, and integrations to do it. Not a platform demo retrofitted to your use case." },
  { title: "Deep System Integration as a Default",         desc: "Our assistants are connected to your real data from day one your CRM, your product catalogue, your booking system, your ERP. An assistant that can't access your systems can't actually help your customers or teams." },
  { title: "Every Channel, One Intelligence Layer",        desc: "Web widget, WhatsApp, Instagram, Teams, Slack, mobile app we build once and deploy everywhere your users are. One assistant, consistent intelligence, every surface." },
  { title: "Multilingual and Market Ready",               desc: "We build assistants in the languages your users actually speak English, Hindi, Gujarati, Kannada, Bhojpuri, and other regional languages for the Indian market. Your assistant shouldn't create a language barrier." },
  { title: "Built In Performance Intelligence",            desc: "Every assistant we ship comes with a conversation analytics dashboard resolution rates, escalation rates, drop off points, topic clustering, and sentiment trends. You always know how it's performing and where to improve." },
  { title: "Designed to Improve With Use",                desc: "Every conversation makes your assistant better. We build continuous learning and feedback loops into every deployment the system identifies gaps, flags low confidence responses, and improves through active retraining cycles." },
];

const faqs = [
  { q: "How is this different from chatbot builders like Intercom, Drift, or Tidio?", a: "Off-the-shelf platforms are excellent for simple FAQ flows and basic routing. What we build is fundamentally different custom AI assistants connected to your specific systems, trained on your actual data, capable of taking actions, and able to handle the full complexity of real conversations. When your users go off script which they always do our assistants handle it. Off-the-shelf tools typically don't." },
  { q: "How long does it take before the assistant is good enough to deploy?", a: "Typically 3-5 weeks from kick off to production deployment. The first 2 weeks focus on data preparation and integration. Weeks 3-5 are build, training, and adversarial testing. We don't deploy until the assistant meets your defined quality threshold resolution rate, accuracy on edge cases, and escalation logic all verified before go live." },
  { q: "What happens when the assistant gets something wrong?", a: "Every assistant has a clearly defined escalation path low confidence responses are flagged, not guessed. Wrong answers are caught through conversation monitoring, logged, and used to retrain the model in the next improvement cycle. We build explicit uncertainty handling so the assistant knows when to escalate rather than confabulating an answer." },
  { q: "Can the assistant handle multiple languages?", a: "Yes. We build multilingual assistants for clients serving diverse markets English, Hindi, Gujarati, Kannada, Bhojpuri, and other languages as required. Language detection is automatic users are responded to in the language they write in." },
  { q: "Will it integrate with our existing CRM and support tools?", a: "In almost all cases, yes. We've built integrations with HubSpot, Salesforce, Zoho, Freshdesk, Zendesk, Shopify, and custom built systems. Integration scope is mapped in the discovery phase and built into the assistant architecture from day one." },
  { q: "How do we get started?", a: "Book a free Chatbot Strategy Call. We'll review your current support or engagement volume, identify the top use cases for automation, and map out what a custom assistant would look like for your specific business before any commitment is made." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E7EB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="font-semibold text-[#0A1628] text-[15px]"><span data-cms-key={`aichatbot_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`aichatbot_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
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
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}15` }}><span data-cms-key={`aichatbot_cs_${i}_tag`} data-cms-label="CS Tag" data-cms-attr="text">{cs.tag}</span></span>
        <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ color: cs.badgeColor, background: `${cs.badgeColor}15`, border: `1px solid ${cs.badgeColor}30` }}><span data-cms-key={`aichatbot_cs_${i}_badge`} data-cms-label="CS Badge" data-cms-attr="text">{cs.badge}</span></span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4"><span data-cms-key={`aichatbot_cs_${i}_title`} data-cms-label="Case Study Title" data-cms-attr="text">{cs.title}</span></h3>

        {/* Big stat */}
        <div className="flex items-center gap-2 mb-3">
          <CMSIcon cmsKey="aichatbot_icon_1" cmsLabel="TrendingUp Icon" name="TrendingUp" size={18} color={cs.badgeColor} />
          <span className="text-[42px] font-black leading-none" style={{ color: cs.badgeColor }}><span data-cms-key={`aichatbot_cs_${i}_stat`} data-cms-label="CS Stat" data-cms-attr="text">{cs.stat}</span></span>
        </div>
        <p className="text-[15px] leading-relaxed text-[#4B5563] mb-5 flex-1"><span data-cms-key={`aichatbot_cs_${i}_statdesc`} data-cms-label="Case Study Stat Desc" data-cms-attr="text">{cs.statDesc}</span></p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cs.tags.map((t: string) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ color: cs.badgeColor, background: `${cs.badgeColor}12` }}><span data-cms-key={`aichatbot_cs_${i}_tag_${t}`} data-cms-label="CS Tech Tag" data-cms-attr="text">{t}</span></span>
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
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">The Challenge: </span><span data-cms-key={`aichatbot_cs_${i}_problem`} data-cms-label="CS Problem" data-cms-attr="text">{cs.problem}</span></p>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">What We Built: </span><span data-cms-key={`aichatbot_cs_${i}_solution`} data-cms-label="CS Solution" data-cms-attr="text">{cs.solution}</span></p>
              <p className="text-[11px] text-[#9CA3AF] font-mono mb-4"><span data-cms-key={`aichatbot_cs_${i}_stack`} data-cms-label="Case Study Stack" data-cms-attr="text">{cs.stack}</span></p>
              <ul className="space-y-1.5 mb-4">
                {cs.results.map((r: string, ri: number) => (
                  <li key={r} className="flex items-start gap-2 text-[13px] text-[#374151]">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: cs.badgeColor }} />{r}
                  </li>
                ))}
              </ul>
              <blockquote className="border-l-2 pl-3 italic text-[13px] text-[#6B7280]" style={{ borderColor: cs.badgeColor }}>
                "<span data-cms-key={`aichatbot_cs_${i}_quote`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>"<span className="not-italic font-semibold text-[#374151] text-[12px]"><span data-cms-key={`aichatbot_cs_${i}_quoteBy`} data-cms-label="CS Quote By" data-cms-attr="text">{cs.quoteBy}</span></span>
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AIChatbotAssistantPage = () => {
  const _sp = useSettings(['aichatbot_hero_h1','aichatbot_hero_sub','aichatbot_cta_btn']);
  return (
  <PageLayout>

    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(26,111,232,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 400, height: 400, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(26,111,232,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-4 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <span className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(26,111,232,0.1)", color: accent, border: "1px solid rgba(26,111,232,0.3)" }}>
              <MessageSquare size={12} /> AI Chatbots & Assistants
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="aichatbot_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Your Business Shouldn't Need a Human<br className="hidden md:block" />
            to Answer the Same Question<br className="hidden md:block" />
            200 Times a Day.
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="aichatbot_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build AI powered chatbots and intelligent assistants that don't just respond — they understand context, remember conversations, take actions, and resolve problems end to end. Built on your data, trained on your business logic, deployed where your customers and teams actually are.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="aichatbot_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Book a Free Chatbot Strategy Call</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">Our Assistant Services</a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6"><span data-cms-key="aichatbot_p_36" data-cms-label="Body Text" data-cms-attr="text">Deployed across customer support, sales, operations, and internal teams for businesses that need more than a FAQ bot</span></p>
        </motion.div>
      </div>
    </section>

    {/* Agency Comparison */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Chatbot Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Install a Chatbot.<br className="hidden md:block" /> Very Few Can Build One That Actually Understands.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">There's a generation of chatbots deployed right now that frustrate more customers than they help — scripted decision trees dressed up as AI, incapable of understanding intent, handling edge cases, or doing anything a well-structured FAQ couldn't already do.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Decision tree bots with canned responses", detail: "Pattern matching, not real understanding" },
              { pain: "AI chatbots that escalate 80% of queries", detail: "No real reduction in support load" },
              { pain: "Platform chatbots with no custom logic", detail: "Generic templates, not your business" },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your chatbot still can't understand a customer who phrases their question differently, it's not AI — it's a FAQ with a chat window.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Positioning */}
    <section id="services-list" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="section-badge" data-cms-key="aichatbot_badge_29" data-cms-label="Section Badge" data-cms-attr="text">Not Your Typical Chatbot Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            <span data-cms-key="aichatbot_h2_main" data-cms-label="Section Heading" data-cms-attr="text">There's a Difference Between a Bot That Responds</span><br className="hidden md:block" /> <span data-cms-key="aichatbot_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">and an Assistant That Actually Helps.</span>
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="aichatbot_x12" data-cms-label="Body Text" data-cms-attr="text">Most businesses that have tried a chatbot have also been burned by one — A scripted flow that breaks the moment the user goes off script — A FAQ widget that can't handle anything real — A bot that ends every conversation with 'I'll transfer you to a human agent.'</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="aichatbot_x13" data-cms-label="Body Text" data-cms-attr="text">That's not what we build.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed"><span data-cms-key="aichatbot_x14" data-cms-label="Body Text" data-cms-attr="text">We build AI assistants that understand what your customer or employee is actually trying to accomplish and complete it. They pull data from your systems, take actions on your behalf, remember what was discussed, and hand off to a human only when the situation genuinely requires it. The result isn't a chatbot experience. It's a capable, always-on team member that scales infinitely.</span></p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "Trained on Your Business, Not Generic Data", desc: "Every assistant we build is trained on your products, your processes, your tone, and your edge cases not a generic model pointed at your website. It knows what you know." },
            { title: "Connected to Your Systems",                   desc: "Our assistants don't just answer questions — they query your CRM, check your inventory, create tickets, book appointments, process requests, and push data into the right places. Action, not just response." },
            { title: "Deployed Where Your Users Are",              desc: "Web, mobile, WhatsApp, Instagram DM, internal Slack, Microsoft Teams we deploy across every channel your customers and teams already use. One intelligence layer, every surface." },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2"><span data-cms-key={`aichatbot_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aichatbot_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aichatbot_badge_30" data-cms-label="Section Badge" data-cms-attr="text">What We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-3"><span data-cms-key="aichatbot_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Using These Assistants Every Day</span></h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto"><span data-cms-key="aichatbot_x15" data-cms-label="Body Text" data-cms-attr="text">Every assistant is designed around a specific job to be done not a generic template dropped into your website.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: accent }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <s.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aichatbot_svc_${si}_title`} data-cms-label="Service Title" data-cms-attr="text">{s.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aichatbot_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aichatbot_badge_31" data-cms-label="Section Badge" data-cms-attr="text">How We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aichatbot_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">How We Build Your AI Assistant</span></h2>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>{step.num}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`aichatbot_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aichatbot_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`aichatbot_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aichatbot_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>
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
          <span className="section-badge" data-cms-key="aichatbot_badge_33" data-cms-label="Section Badge" data-cms-attr="text">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"><span data-cms-key="aichatbot_s13_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Using These Assistants Every Day</span></h2>
        </motion.div>
        <DBTestimonialCarousel />
      </div>
    </section>


    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aichatbot_badge_34" data-cms-label="Section Badge" data-cms-attr="text">Why Digital Aura</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aichatbot_s14_h2" data-cms-label="Section Heading" data-cms-attr="text">Why Businesses Choose Digital Aura to Build Their AI Assistant</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border group relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, #7C3AED)` }} />
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aichatbot_why_${i}_title`} data-cms-label="Why Title" data-cms-attr="text">{w.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aichatbot_why_${i}_desc`} data-cms-label="Why Desc" data-cms-attr="text">{w.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-badge">Clients We've Grown</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mt-2">Brands Using Our AI Chatbot Solutions</h2>
        </div>
        <ClientLogoGrid accentColor="#7C3AED" clients={[
          { name: "Digital Aura",       tag: "Digital Marketing", logo: "https://thedigitalaura.com/logos/digital-aura-logo.png",                                                                       logoBg: "#fff8f0" },
          { name: "Game Zone Events",   tag: "Events",            logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                               logoBg: "#f5fff5" },
          { name: "Krisha Eye Hospital",tag: "Eye Care",          logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png",                                   logoBg: "#f0faff" },
          { name: "Parasher Academy",   tag: "Education",         logo: "https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png",                                                      logoBg: "#f5f0ff" },
          { name: "Gleekey",            tag: "EdTech",            logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png",                                                               logoBg: "#f5f0ff" },
          { name: "Dr Parth Shah",      tag: "Healthcare",        logo: "https://www.drparthshah.com.au/wp-content/uploads/2020/02/site_logo.png",                                                            logoBg: "#f0f7ff" },
        ]} />
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aichatbot_badge_35" data-cms-label="Section Badge" data-cms-attr="text">FAQ</span>
          <h2 className="text-3xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aichatbot_s15_h2" data-cms-label="Section Heading" data-cms-attr="text">Common Questions</span></h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="aichatbot_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Let's Build an <span data-cms-key="aichatbot_hl_149" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Assistant</span> That Actually <span data-cms-key="aichatbot_hl_150" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Resolves Things</span>.</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="aichatbot_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Chatbot Strategy Call. We'll map your highest volume conversations, define what an AI assistant can handle autonomously, and show you what real resolution rates look like for your business.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="aichatbot_x16" data-cms-label="Fine Print" data-cms-attr="text">No bot builders — No templates — A custom assistant trained on your business, built to do the job properly.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default AIChatbotAssistantPage;





