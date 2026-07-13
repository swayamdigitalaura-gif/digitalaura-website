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
  Code2, Server, Database, Cloud, Lock, Brain,
} from "lucide-react";

const accent = "#1A6FE8";
const accentBg = "rgba(26,111,232,0.08)";
const accentBorder = "rgba(26,111,232,0.2)";

const services = [
  { Icon: Code2,    iconName: "Code2",    title: "React & Next.js Web Applications",     desc: "High performance, SEO optimised front end applications built with React and Next.js server-side rendering, dynamic routing, and AI powered interfaces that respond in real time to what users do." },
  { Icon: Server,   iconName: "Server",   title: "Backend API Development",               desc: "Robust, scalable REST and GraphQL APIs built with Node.js, Python, or FastAPI designed for high throughput, clean documentation, and seamless integration with any front end or third party system." },
  { Icon: Database, iconName: "Database", title: "Database Architecture & Optimisation",  desc: "Relational and non-relational database design, query optimisation, and data modelling built for scale. PostgreSQL, MySQL, MongoDB, Supabase structured for the data complexity your application actually has." },
  { Icon: Cloud,    iconName: "Cloud",    title: "Cloud Infrastructure & DevOps",         desc: "Production infrastructure on AWS, GCP, or DigitalOcean containerised deployments, CI/CD pipelines, auto-scaling, and monitoring built in from day one. Your application runs reliably, not just in development." },
  { Icon: Lock,     iconName: "Lock",     title: "Authentication, Security & Compliance", desc: "Role based access control, multi-tenancy, OAuth, SSO, and security architecture designed to meet GDPR, HIPAA, and industry specific compliance requirements built into the stack, not patched on at the end." },
  { Icon: Brain,    iconName: "Brain",    title: "AI & ML Integration",                   desc: "LLM integration, vector databases, semantic search, recommendation engines, and predictive models integrated directly into your application layer making your product smarter at the feature level, not just the surface." },
];

const processSteps = [
  { num: "01", title: "Technical Discovery Week 1",        desc: "We map your requirements, user journeys, data architecture, and integration needs. We define the tech stack, identify technical risks, and produce a Technical Specification that aligns your product vision with engineering reality before a line of code is written." },
  { num: "02", title: "Architecture & Design Week 2",      desc: "We design the system architecture component structure, API contracts, database schema, AI integration points, and infrastructure plan. UI/UX wireframes are produced and reviewed. You see how the product will work before we build it." },
  { num: "03", title: "Sprint Based Engineering Weeks 3+", desc: "We build in 2 week sprints. Working features demonstrated at every sprint review not a finished product revealed at the end. You test, provide feedback, and maintain visibility throughout. Code is reviewed, tested, and documented at every sprint close." },
  { num: "04", title: "QA, Deployment & Handover",           desc: "Comprehensive QA across functionality, performance, security, and edge cases. Staged deployment with rollback capability. Full documentation, codebase walkthrough, and infrastructure handover. You own everything and can operate independently from day one." },
];

const caseStudies = [
  {
    title: "AI Powered Talent Marketplace Platform", location: "Toronto, Canada",
    problem: "A HR technology startup was trying to launch a two sided marketplace connecting specialist freelance talent with enterprise project teams. They had a product vision, a seed round, and a 12-month runway but no technical team and a previous agency engagement that had produced a non functional prototype after 4 months of spend. They needed a full stack engineering partner that could move fast, build properly, and own the technical architecture end to end.",
    solution: "A complete two sided marketplace platform built from the ground up. Talent profiles with AI powered skill extraction from uploaded CVs structured competency tagging across 200+ skill categories. Enterprise clients post project briefs → AI matching engine scores and ranks relevant talent against 30+ fit variables → shortlists surfaced with ranking rationale. Secure messaging, proposal management, contract generation, and milestone-based payment processing built into the platform. AI driven pricing recommendations based on skill rarity, project complexity, and market rate benchmarks.",
    stack: "Next.js · Node.js · PostgreSQL · Supabase · AI skill extraction pipeline · LLM matching engine · Stripe Connect (marketplace payments) · WebSockets (real time messaging) · AWS deployment · CI/CD pipeline",
    results: ["Platform launched in 14 weeks from project kick off to production", "1,200 talent profiles and 34 enterprise clients onboarded in the first 60 days", "AI matching engine achieved 78% acceptance rate on first presented shortlists", "Platform processed $420,000 in project payments in its first 6 months of operation"],
    quote: "After one failed agency engagement, we were nervous. Digital Aura gave us a Technical Specification in week one that showed they actually understood what we were building. From that point forward, every sprint delivery reinforced that confidence. We launched on time, on budget, with a product we're proud of.",
    tag: "Full Stack · Toronto, Canada", badge: "Platform launched in 14 week", badgeColor: "#7C3AED", topBg: "linear-gradient(135deg,#7C3AED14 0%,#7C3AED05 100%)",
    subtitle: "Toronto, Canada", stat: "14w", statDesc: "Platform launched in 14 weeks from project kick off to production",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
      quoteBy: "CEO & Co Founder, Toronto HR Technology Startup",
  },
  {
    title: "Full Stack B2B Insurance Portal", location: "Manchester, UK",
    problem: "A specialist commercial insurance broker was managing their entire client portfolio policy documents, renewal schedules, claims history, endorsements, and client communications through spreadsheets, email threads, and a generic document management system. Their 22 person team was spending an estimated 30% of productive time on administrative tasks that existed purely because the data lived in the wrong places. Client experience was suffering policy documents were emailed as PDFs, renewal reminders were manual, and clients had zero self service visibility into their own cover.",
    solution: "A full stack B2B insurance portal serving both the broker team and their commercial clients. Broker side: unified client and policy management dashboard, renewal pipeline with AI generated client briefings, automated reminder workflows, claims tracking, and document management with AI powered search. Client side: secure self service portal giving each client a real time view of their active policies, renewal dates, claims history, and documents. AI assistant embedded in the client portal answers cover questions against their actual policy documents. Integrated with the broker's existing accounting system for invoice generation and payment tracking.",
    stack: "React · FastAPI · PostgreSQL · AI document search and Q&A layer · Automated renewal workflow engine · Accounting system integration · Role based multi tenant architecture · Secure document storage · Email automation · AWS infrastructure",
    results: ["Broker team administrative time: 30% → 9% of working week", "Client portal adoption reached 84% of active clients within 90 days of launch", "Policy renewal retention rate: 76% → 89% attributed to AI generated briefings", "Average time to locate a policy document: 8 minutes → under 20 seconds"],
    quote: "Our clients used to chase us for basic information. Now they log in and find everything themselves. Our team used to spend their mornings on admin. Now they spend them on advice. It's changed what kind of broker we are.",
    tag: "Full Stack · Manchester, UK", badge: "9% of working week", badgeColor: "#FF6B2B", topBg: "linear-gradient(135deg,#FF6B2B14 0%,#FF6B2B05 100%)",
    subtitle: "Manchester, UK", stat: "9%", statDesc: "Broker team administrative time: 30% → 9% of working week",
    tags: ["React", "FastAPI", "PostgreSQL"],
      quoteBy: "Managing Director, Manchester Commercial Insurance Broker",
  },
  {
    title: "Multi-Vendor Agri Marketplace", location: "Nairobi, Kenya",
    problem: "An agricultural technology company wanted to launch a B2B marketplace connecting smallholder farmers and cooperatives with commodity buyers, input suppliers, and logistics providers across East Africa. The platform needed to handle multiple currencies, variable network connectivity (offline first for field use), multilingual interfaces, complex commodity grading logic, and logistics coordination across regions with unreliable infrastructure. No off-the-shelf marketplace platform could accommodate the combination of requirements.",
    solution: "A fully custom full stack agri marketplace platform engineered for the specific constraints of the East African market. Offline first architecture using service workers and local data sync field agents can log produce, record grading assessments, and capture orders without connectivity, syncing automatically when network is available. AI powered commodity grading assistant analyses uploaded produce images and suggests quality grade. Multi currency pricing engine with real time exchange rates and localised payment integrations. SMS-based notification system for farmers without smartphone access.",
    stack: "Next.js · Python · PostgreSQL · Offline first PWA architecture (Service Workers + IndexedDB) · Computer vision grading model · Multi currency pricing engine · M-Pesa and local payment integrations · SMS notification gateway · Logistics matching algorithm · AWS Africa region deployment",
    results: ["Platform onboarded 3,400 farmers and 180 buyers within 4 months of launch", "Offline functionality enabled field usage in areas with less than 20% connectivity", "AI grading assistant reduced post-harvest grading disputes by 44%", "Average time from produce listing to confirmed buyer match: 6 days → 14 hours"],
    quote: "The offline first architecture was non negotiable for our market and every other agency we spoke to treated it as an afterthought. Digital Aura made it a first class engineering requirement from day one. That decision is why the platform actually works in the field.",
    tag: "Full Stack · Nairobi, Kenya", badge: "Platform onboarded 3,400 far", badgeColor: "#22C55E", topBg: "linear-gradient(135deg,#22C55E14 0%,#22C55E05 100%)",
    subtitle: "Nairobi, Kenya", stat: "3.4K", statDesc: "Platform onboarded 3,400 farmers and 180 buyers within 4 months of launch",
    tags: ["Next.js", "Python", "PostgreSQL"],
      quoteBy: "CTO, Nairobi AgriTech Company",
  },
  {
    title: "Healthcare Staff Rostering & Compliance Platform", location: "Ahmedabad, India",
    problem: "A healthcare staffing agency placing nurses and paramedical staff across 40+ hospitals in Gujarat was managing all rostering, credential verification, shift allocation, and compliance tracking manually across WhatsApp groups, phone calls, and a shared Excel file that was permanently out of date. With 600+ active staff members and compliance documentation requirements under healthcare regulation, the manual process was creating both operational failures and liability exposure.",
    solution: "A full stack healthcare staff rostering and compliance platform purpose-built for the agency's operational model. Staff profiles with complete credential management licence numbers, expiry dates, specialisation certifications, background checks with automated alerts when any credential approaches expiry. AI powered shift allocation engine matches available staff to open shifts based on specialty, proximity, client facility requirements, and individual staff preferences. Shift confirmation via WhatsApp integration staff accept or decline directly in WhatsApp without needing to log into the platform.",
    stack: "React · Node.js · PostgreSQL · Supabase · AI shift matching engine · WhatsApp Business API (shift confirmation) · Credential expiry tracking and alert system · Client facility portal · Compliance reporting module · Automated credential reminder workflows",
    results: ["Credential compliance gaps: average of 34 open items → under 4", "Shift allocation time: 3.5 hours per day → 40 minutes", "Shift cancellations due to credential issues dropped to zero in 6 months post launch", "Agency onboarded 12 new client facilities within 90 days attributed to improved compliance visibility"],
    quote: "We were operating on trust and WhatsApp. One serious compliance failure would have ended us. This platform didn't just solve our operational problem it gave us the credibility to grow. New clients sign with us specifically because they can see our compliance infrastructure.",
    tag: "Full Stack · Ahmedabad, India", badge: "under 4", badgeColor: "#1A6FE8", topBg: "linear-gradient(135deg,#1A6FE814 0%,#1A6FE805 100%)",
    subtitle: "Ahmedabad, India", stat: "under 4", statDesc: "Credential compliance gaps: average of 34 open items → under 4",
    tags: ["React", "Node.js", "PostgreSQL"],
      quoteBy: "Founder & CEO, Ahmedabad Healthcare Staffing Agency",
  },
];


const whyUs = [
  { title: "One Team, Full Accountability",        desc: "No front end agency, back end vendor, and DevOps contractor pointing at each other when something breaks. One team owns the full stack front end, back end, infrastructure, and AI. One point of accountability, always." },
  { title: "Specification Before Sprint",           desc: "We write a Technical Specification before we write code. Every architectural decision, every data model, every integration is agreed in writing before engineering begins. No scope surprises mid-build." },
  { title: "AI Is Not Optional",                   desc: "Every application we build includes an AI layer by default because applications without intelligence are already behind. Whether it's embedded search, generative features, predictive scoring, or an LLM interface, we build it in from the architecture." },
  { title: "Fortnightly Sprint Reviews",            desc: "Working software every two weeks. You test real features, provide real feedback, and maintain full visibility throughout the build. You're a participant in engineering, not an observer waiting for a handover." },
  { title: "Clean Code as a Non-Negotiable",       desc: "Code reviews at every sprint. Documented functions. Test coverage. Architecture that the next engineer can understand without a guided tour. We build codebases you can own, not ones you depend on us to interpret." },
  { title: "Production-Ready from Day One",        desc: "CI/CD pipelines, staging environments, error monitoring, performance logging, and rollback capability in place before we go live. Launch is an event, not a gamble." },
];

const faqs = [
  { q: "What tech stack do you work with?", a: "Our primary stack is React / Next.js on the front end, Node.js or Python (FastAPI) on the back end, PostgreSQL or Supabase for data, and AWS, GCP, or DigitalOcean for infrastructure. We also work with existing stacks where the project requires it the right technology for the problem, not the technology we happen to prefer." },
  { q: "Do you take on projects at any stage early idea or existing codebase?", a: "Both. We work with founders from day one zero-to-one builds where we own the full architecture. We also take on existing applications adding features, improving architecture, fixing technical debt, or rebuilding outdated systems. We assess existing codebases in technical discovery and give you an honest evaluation before any commitment." },
  { q: "How do you handle projects where requirements change mid-build?", a: "Scope changes are a reality of product development. Our sprint based process means changes are incorporated at sprint boundaries not mid-sprint. We assess the impact, update the timeline and scope honestly, and you decide whether to proceed. There are no surprises and no resistance to change." },
  { q: "Who owns the code at the end of the engagement?", a: "You do, entirely. Full codebase, all repository access, all infrastructure credentials, and complete documentation. No licensing, no lock-in, no ongoing dependency on us to operate what we've built. You can take it anywhere." },
  { q: "Do you provide ongoing support and maintenance after launch?", a: "Yes. We offer post launch maintenance retainers covering bug fixes, security updates, dependency management, and ongoing feature development. Most clients move into a retainer engagement it's more efficient than re-engaging from scratch for every change." },
  { q: "How do we get started?", a: "Book a free Technical Discovery Call. We'll discuss what you're building, review any existing code or specifications, and outline what a full stack engagement would look like timeline, team structure, and approach. No commitment required." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E7EB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="font-semibold text-[#0A1628] text-[15px]"><span data-cms-key={`fullstack_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`fullstack_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
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
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}15` }}><span data-cms-key={`fullstack_cs_${i}_tag`} data-cms-label="CS Tag" data-cms-attr="text">{cs.tag}</span></span>
        <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ color: cs.badgeColor, background: `${cs.badgeColor}15`, border: `1px solid ${cs.badgeColor}30` }}><span data-cms-key={`fullstack_cs_${i}_badge`} data-cms-label="CS Badge" data-cms-attr="text">{cs.badge}</span></span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4"><span data-cms-key={`fullstack_cs_${i}_title`} data-cms-label="Case Study Title" data-cms-attr="text">{cs.title}</span></h3>

        {/* Big stat */}
        <div className="flex items-center gap-2 mb-3">
          <CMSIcon cmsKey="fullstack_icon_1" cmsLabel="TrendingUp Icon" name="TrendingUp" size={18} color={cs.badgeColor} />
          <span className="text-[42px] font-black leading-none" style={{ color: cs.badgeColor }}><span data-cms-key={`fullstack_cs_${i}_stat`} data-cms-label="CS Stat" data-cms-attr="text">{cs.stat}</span></span>
        </div>
        <p className="text-[15px] leading-relaxed text-[#4B5563] mb-5 flex-1"><span data-cms-key={`fullstack_cs_${i}_statdesc`} data-cms-label="Case Study Stat Desc" data-cms-attr="text">{cs.statDesc}</span></p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cs.tags.map((t: string) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ color: cs.badgeColor, background: `${cs.badgeColor}12` }}><span data-cms-key={`fullstack_cs_${i}_tag_${t}`} data-cms-label="CS Tech Tag" data-cms-attr="text">{t}</span></span>
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
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">The Challenge: </span><span data-cms-key={`fullstack_cs_${i}_problem`} data-cms-label="CS Problem" data-cms-attr="text">{cs.problem}</span></p>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">What We Built: </span><span data-cms-key={`fullstack_cs_${i}_solution`} data-cms-label="CS Solution" data-cms-attr="text">{cs.solution}</span></p>
              <p className="text-[11px] text-[#9CA3AF] font-mono mb-4"><span data-cms-key={`fullstack_cs_${i}_stack`} data-cms-label="Case Study Stack" data-cms-attr="text">{cs.stack}</span></p>
              <ul className="space-y-1.5 mb-4">
                {cs.results.map((r: string, ri: number) => (
                  <li key={r} className="flex items-start gap-2 text-[13px] text-[#374151]">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: cs.badgeColor }} />{r}
                  </li>
                ))}
              </ul>
              <blockquote className="border-l-2 pl-3 italic text-[13px] text-[#6B7280]" style={{ borderColor: cs.badgeColor }}>
                "<span data-cms-key={`fullstack_cs_${i}_quote`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>"<span className="not-italic font-semibold text-[#374151] text-[12px]"><span data-cms-key={`fullstack_cs_${i}_quoteBy`} data-cms-label="CS Quote By" data-cms-attr="text">{cs.quoteBy}</span></span>
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FullStackDevelopmentPage = () => {
  const _sp = useSettings(['fullstack_hero_h1','fullstack_hero_sub','fullstack_cta_btn']);
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
              <Code2 size={12} /> Full Stack Development
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="fullstack_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">An Idea Without Engineering<br className="hidden md:block" />
            Behind It Is Just a Conversation.
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="fullstack_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build complete, production-ready web applications from front to back clean interfaces, robust APIs, scalable databases, and AI capabilities woven through every layer. End to end engineering delivered by one team, with one vision, from first line to final deployment.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="fullstack_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Book a Free Technical Discovery Call</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">What We Build</a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6"><span data-cms-key="fullstack_p_36" data-cms-label="Body Text" data-cms-attr="text">Trusted by startups, scaleups, and enterprise teams who compete on the quality of their product</span></p>
        </motion.div>
      </div>
    </section>

    {/* Agency Comparison */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Dev Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Dev Shop Can Write Code.<br className="hidden md:block" /> Very Few Can Architect a System That Scales.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">There's a growing gap between developers who ship features and engineers who design systems — robust architectures that handle real production load, grow with your product, and don't need a full rewrite every 18 months.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Monolithic codebases that break under load", detail: "Built for demos, not production traffic" },
              { pain: "No documentation or handover plan", detail: "Locked in once the agency leaves" },
              { pain: "Frontend without backend strategy", detail: "Half the stack, all of the problems" },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your current codebase can't handle 10x your current users without major rework, you're already accumulating technical debt that compounds daily.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Positioning */}
    <section id="services-list" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="section-badge" data-cms-key="fullstack_badge_29" data-cms-label="Section Badge" data-cms-attr="text">Not a Development Vendor. An Engineering Partner.</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            <span data-cms-key="fullstack_h2_main" data-cms-label="Section Heading" data-cms-attr="text">Most Agencies Hand You a Website.</span><br className="hidden md:block" /> <span data-cms-key="fullstack_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">We Hand You a Product.</span>
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="fullstack_x12" data-cms-label="Body Text" data-cms-attr="text">There's a category of development work that produces something that looks finished — it loads, it renders, it ticks the checklist. And then there's engineering that produces something that actually works under real-world conditions — That handles edge cases — That doesn't fall apart when 500 users hit it simultaneously — That your team can maintain, extend, and build on without starting over in 18 months.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="fullstack_x13" data-cms-label="Body Text" data-cms-attr="text">That's the difference between a vendor and an engineering partner.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed"><span data-cms-key="fullstack_x14" data-cms-label="Body Text" data-cms-attr="text">We don't ship code and disappear. We build products with proper architecture, tested logic, clean codebases, and AI capabilities that make your application genuinely smarter than what your competitors are running. Every project is treated as if we're going to maintain it ourselves. Because most of the time, we are.</span></p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "Full Stack, One Team",              desc: "Front end, back end, database, APIs, cloud infrastructure, AI integration all owned by one team. No handoffs between agencies, no gaps in accountability, no 'that's not our part' conversations." },
            { title: "AI Integrated by Default",           desc: "Every application we build has an AI layer whether that's a recommendation engine, a natural language interface, an intelligent search, or a predictive model. We don't treat AI as optional in 2026." },
            { title: "Built to Last, Not Just to Launch",  desc: "Clean architecture, documented codebases, test coverage, and infrastructure designed for scale. You're not inheriting technical debt on day one." },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2"><span data-cms-key={`fullstack_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`fullstack_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="fullstack_badge_30" data-cms-label="Section Badge" data-cms-attr="text">What We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-3"><span data-cms-key="fullstack_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Who Shipped With Us</span></h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto"><span data-cms-key="fullstack_x15" data-cms-label="Body Text" data-cms-attr="text">From consumer-facing products to enterprise grade platforms full stack engineering across every layer.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: accent }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <CMSIcon cmsKey={`fullstack_icon_${si}`} cmsLabel={`${s.title} Icon`} name={s.iconName} size={20} color={accent} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`fullstack_svc_${si}_title`} data-cms-label="Service Title" data-cms-attr="text">{s.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`fullstack_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="fullstack_badge_31" data-cms-label="Section Badge" data-cms-attr="text">How We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="fullstack_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">How We Build</span></h2>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>{step.num}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`fullstack_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`fullstack_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`fullstack_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`fullstack_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
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
          <span className="section-badge" data-cms-key="fullstack_badge_33" data-cms-label="Section Badge" data-cms-attr="text">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"><span data-cms-key="fullstack_s13_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Who Shipped With Us</span></h2>
        </motion.div>
        <DBTestimonialCarousel />
      </div>
    </section>


    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="fullstack_badge_34" data-cms-label="Section Badge" data-cms-attr="text">Why Digital Aura</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="fullstack_s14_h2" data-cms-label="Section Heading" data-cms-attr="text">Why Engineering Teams Choose Digital Aura as Their Full Stack Partner</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border group relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, #7C3AED)` }} />
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`fullstack_why_${i}_title`} data-cms-label="Why Title" data-cms-attr="text">{w.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`fullstack_why_${i}_desc`} data-cms-label="Why Desc" data-cms-attr="text">{w.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Website Design Clients ── */}
    <section className="py-14 px-4 md:px-8 bg-white" style={{ borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Built Websites For</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Clients We've Designed & Developed For</h2>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto">Real businesses. Real websites. Built and delivered by Digital Aura.</p>
        </motion.div>
        <ClientLogoGrid accentColor={accent} clients={[
          { name: "Geotexelin",              tag: "Industrial",           logo: "https://cdn.prod.website-files.com/66aba4a3fcdeb2e1f9831db2/6761225cd949ac8e332fc819_Texel%20Logo%20for%20Website.svg",                                    logoBg: "#f0f8ff" },
          { name: "MYP Services",            tag: "Air BnB Listing & Management Company",logo: "https://mypservices.com.au/wp-content/uploads/2025/09/MYPService-Black.png",                                                                                logoBg: "#f0f8ff" },
          { name: "AgriWorld Expo",          tag: "Events & Exhibition",  logo: "https://agriworldexpo.in/wp-content/uploads/2024/09/AgriWorldExpo-Logo-New.png",                                                                             logoBg: "#f0fff0" },
          { name: "Aroma Immigration",       tag: "Immigration Consultant",logo: "https://aromaimmigration.com/wp-content/uploads/2022/08/Aroma-Immigration-png-1024x386.png",                                                               logoBg: "#f5f0ff" },
          { name: "Clarity Eye Surgeons",    tag: "Eye Clinic in Canberra",logo: "https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png",                                          logoBg: "#f0f8ff" },
          { name: "Silverstone Financial",   tag: "Insurance & Mortgage", logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png",                                                         logoBg: "#f0faff" },
          { name: "Infinity Manpower",       tag: "Event Staffing",       logo: "https://infinitymanpowergroup.com/wp-content/uploads/2025/01/white-logo.png",                                                                               logoBg: "#1a1a2e" },
          { name: "Sure Freeze",             tag: "HVAC & Refrigeration Repairs in Melbourne",logo: "https://thedigitalaura.com/uploads/sure-freeze-logo.png",                                                                               logoBg: "#f0faff" },
          { name: "IntegsCloud",             tag: "ERP & CRM",            logo: "https://integscloud.com/wp-content/uploads/2024/10/logo1-1-1-1.webp",                                                                                      logoBg: "#f0f4ff" },
          { name: "Grand Bavarchi",          tag: "Indian Restaurant in Sydney",logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png",                                                                                logoBg: "#fff8f0" },
          { name: "Polyform Group",          tag: "Thermoforming Mould Manufacturers",logo: "https://polyformgroup.com/assets/images/logo/POLYFORMNEWLOGO_B.svg",                                                                            logoBg: "#f5f5f5" },
          { name: "Bin Drop Dumpsters",      tag: "Dumpster Rental Service",logo: "https://www.bindropdumpsters.com/wp-content/uploads/Bin-Drop-Logo.png",                                                                                  logoBg: "#f5fff5" },
          { name: "Bhayani Group",           tag: "Industrial Manufacturing & Warehouse",logo: "https://bhayanigroup.com/wp-content/uploads/2025/06/logo-1-1.png",                                                                          logoBg: "#fff8f0" },
          { name: "Parasher Academy",        tag: "Educational",          logo: "https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png",                                                                           logoBg: "#f5f0ff" },
          { name: "Attention Hero",          tag: "Saas Platform",        logo: "https://cdn.prod.website-files.com/686cabbdef588234860ed3de/6938fac9f358d0e642c011fe_attention_hero_logo.png",                                             logoBg: "#fff8f0" },
          { name: "There You Grow",          tag: "SEO Agency",           logo: "https://thereyougrow.in/wp-content/uploads/2023/08/Professional-Content-Writing-Services-Expert-Content-Writers-for-Engaging-Content-e1695101657187.png", logoBg: "#f0fff8" },
          { name: "Karm Digital",            tag: "Digital Agency",       logo: "https://karm.digital/wp-content/uploads/2025/05/karm-logo.png",                                                                                            logoBg: "#f5f0ff" },
          { name: "Active Office Furniture", tag: "Office Furniture",     logo: "https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png",                                                     logoBg: "#f0f8ff" },
          { name: "Inn of the Dove",         tag: "Romantic Hotel",       logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp",                                                                                    logoBg: "#fff8f5" },
          { name: "Dr Ronak Patel",          tag: "Orthopaedic Hospital", logo: "https://drronakpatel.in/wp-content/uploads/2025/10/LOGO-PNG-1024x1024.png",                                                                               logoBg: "#f0f7ff" },
          { name: "Dreamfoot",               tag: "Video Creation Agency",logo: "https://dreamfoot.in/wp-content/uploads/2025/04/logo-light-4-1.png",                                                                                      logoBg: "#1a1a2e" },
          { name: "AMVI Hospitals",          tag: "Women's Hospital",     logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png",                                                                       logoBg: "#f5f0ff" },
          { name: "Krisha Hospital",         tag: "Hand Surgeon",         logo: "https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png",                                                                                    logoBg: "#fff0f5" },
          { name: "Krisha Eye Hospital",     tag: "Eye Clinic",           logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png",                                                       logoBg: "#f0faff" },
          { name: "Aagman Hospital",         tag: "Women's Hospital",     logo: "https://thedigitalaura.com/uploads/aagman-hospital-logo.jpg",                                                                                          logoBg: "#fff0f8" },
          { name: "Shukan Hospital",         tag: "Women's Hospital",     logo: "https://thedigitalaura.com/uploads/shukan-hospital-logo.png",                                                                     logoBg: "#f0fff8" },
          { name: "Gleekey",               tag: "EdTech",               logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png",                                                                                      logoBg: "#f5f0ff" },
          { name: "Monita",                tag: "Business Valuers",     logo: "https://monita.com.au/wp-content/uploads/2024/09/MONITA_v01A_Logo_BG2-sbs-200x74.png",                                                                      logoBg: "#f0f8ff" },
          { name: "Game Zone Events",      tag: "Gaming Truck Company", logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                                                     logoBg: "#f5fff5" },
          { name: "Deaf Matrimonial",      tag: "Matrimony App for Deaf Community", logo: "https://thedigitalaura.com/uploads/deaf-matrimonial-logo.png",                                                                                logoBg: "#f0f8ff" },
          { name: "Track My Ads",          tag: "AdTech",               logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E",                                                                                              logoBg: "#f0f8ff" },
        ]} />
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="fullstack_badge_35" data-cms-label="Section Badge" data-cms-attr="text">FAQ</span>
          <h2 className="text-3xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="fullstack_s15_h2" data-cms-label="Section Heading" data-cms-attr="text">Common Questions</span></h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="fullstack_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Let's Build Something That <span data-cms-key="fullstack_hl_149" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Works</span> in <span data-cms-key="fullstack_hl_150" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Production</span>.</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="fullstack_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Technical Discovery Call. We'll review your product requirements, assess the engineering approach, and give you a clear picture of what a full stack build with Digital Aura looks like before you commit to anything.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Technical Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="fullstack_x16" data-cms-label="Fine Print" data-cms-attr="text">No template proposals — No offshore handoffs — A senior engineering conversation about your product, your stack, and what it takes to build it properly.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default FullStackDevelopmentPage;





