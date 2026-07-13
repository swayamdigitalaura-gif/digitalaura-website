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
  Building2, ShoppingBag, BarChart3, Layers, Users, Settings,
} from "lucide-react";

const accent = "#FF6B2B";
const accentBg = "rgba(255,107,43,0.08)";
const accentBorder = "rgba(255,107,43,0.2)";

const services = [
  { Icon: Building2,   title: "AI Powered SaaS Platforms",            desc: "End to end SaaS product engineering for founders and businesses launching intelligence first software products. From architecture and MVP to scale built with AI as the core value driver, not a feature add." },
  { Icon: ShoppingBag, title: "Custom eCommerce & Marketplace Platforms", desc: "When Shopify or standard marketplace platforms can't handle your catalogue logic, vendor model, pricing engine, or personalisation requirements we build the platform your business model actually needs." },
  { Icon: BarChart3,   title: "Enterprise Operations Platforms",       desc: "Custom internal platforms that replace spreadsheet chaos and disconnected tools AI powered workflow management, resource planning, approval systems, and operational intelligence built for your org structure." },
  { Icon: Layers,      title: "Industry Specific Vertical Solutions",  desc: "Deep domain web platforms built for industries with complex regulatory, operational, or data requirements healthcare, legal, financial services, logistics, manufacturing where generic software consistently fails." },
  { Icon: Users,       title: "AI Powered Client & Partner Portals",   desc: "Custom portals that give your clients, partners, or distributors intelligent self service access to their data, documents, orders, and communications reducing your operational overhead while elevating the experience." },
  { Icon: Settings,    title: "Legacy System Modernisation",           desc: "We rebuild outdated platforms with modern AI powered architecture migrating your data, reengineering your workflows, and delivering a system that doesn't just do what the old one did — but does things it never could." },
];

const processSteps = [
  { num: "01", title: "Deep Discovery & Problem Mapping Weeks 1-2",   desc: "We spend significant time understanding your business before writing a line of code. We map your users, your data flows, your current pain points, your operational logic, and the outcomes the platform needs to deliver. Output: a Problem Definition Document that defines what we're building and why agreed before architecture begins." },
  { num: "02", title: "Solution Architecture & AI Design Weeks 2-3",  desc: "We design the full technical architecture data models, AI capability layer, integration points, infrastructure, and security framework. You receive a complete Architecture Blueprint that shows exactly how the system will work, what AI does at each layer, and how the platform scales." },
  { num: "03", title: "Iterative Engineering Weeks 4-14",            desc: "We build in 2 week sprints with working software demonstrated at every sprint review. You see real progress, provide real feedback, and course correct in real time not at the end of a 6-month build cycle. AI layers are integrated and tested with your real data throughout." },
  { num: "04", title: "Launch, Stabilise & Evolve",                    desc: "We launch with full monitoring, performance dashboards, and a stabilisation period. Post launch, we operate as your ongoing product engineering partner iterating, improving AI accuracy, adding features, and scaling infrastructure as your business grows." },
];

const caseStudies = [
  {
    title: "AI Powered Freight Procurement Platform", location: "Houston, USA",
    problem: "A mid sized freight brokerage was managing the entire procurement process carrier sourcing, rate negotiation, load matching, and contract management through a combination of emails, spreadsheets, and a generic TMS that hadn't been updated in 4 years. With 300-400 loads per month and 180+ carrier relationships to manage, the operations team of 8 was at capacity. Margin leakage from suboptimal carrier selection was estimated at 11-14% per load.",
    solution: "A fully custom AI powered freight procurement platform replacing every manual touchpoint in the process. The platform ingests real time lane rates from 6 data sources, runs a proprietary AI pricing model that predicts optimal carrier selection per load based on 40+ variables, and auto-generates rate proposals within 90 seconds of load entry. A carrier performance intelligence layer tracks on-time delivery, damage rates, and communication quality surfacing at risk relationships before they become service failures. Full P&L visibility per load, lane, and carrier built into the executive dashboard.",
    stack: "React · Python · PostgreSQL · Predictive pricing ML model · Real time rate feed integrations · Carrier performance scoring engine · Contract lifecycle management module · Role based operations and executive dashboards",
    results: ["Carrier selection optimisation reduced average cost per-load by 9.3% in first 6 months", "Load processing time: 47 minutes → 8 minutes average", "Operations team capacity increased 2.6x handling 780+ loads/month with same headcount", "Margin leakage identified and attributed $340,000 recovered in Year 1"],
    quote: "We'd been told for years that a custom TMS was out of reach for a brokerage our size. Digital Aura proved that wrong. What they built gives us data and operational capability that companies 10x our size don't have.",
    tag: "Custom AI · Houston, USA", badge: "Carrier selection optimisati", badgeColor: "#7C3AED", topBg: "linear-gradient(135deg,#7C3AED14 0%,#7C3AED05 100%)",
    subtitle: "Houston, USA", stat: "9.3%", statDesc: "Carrier selection optimisation reduced average cost per-load by 9.3% in first 6 months",
    tags: ["React", "Python", "PostgreSQL"],
      quoteBy: "CEO, Houston Freight Brokerage",
  },
  {
    title: "AI Powered Legal Costs Assessment Platform", location: "Edinburgh, Scotland",
    problem: "A specialist legal costs firm handling 600-800 costs assessments annually was running the entire practice on Word documents, manually maintained spreadsheets, and a shared drive. Senior costs lawyers were spending 60% of their billable time on document preparation, precedent searching, and calculation work. Turnaround times were averaging 18 days per assessment a competitive disadvantage in a market where speed increasingly drove instruction volume.",
    solution: "A bespoke AI powered costs assessment platform that transforms how the firm processes every instruction from intake to bill. Matter uploaded → AI extracts all claimed items, classifies by category and phase, and identifies items likely to be challenged based on the firm's historical assessment data. The platform runs automated reasonableness checks against a precedent database of 12,000+ assessed matters. A costs lawyer reviews the AI analysis, makes adjustments, and approves rather than building from scratch. The platform auto-generates the Points of Dispute or Bill of Costs in court-compliant formatting.",
    stack: "React · FastAPI · PostgreSQL · Custom legal NLP pipeline · RAG over 12,000-matter precedent database · Court compliant document generation engine · Matter pipeline and WIP dashboard · Multi-user role architecture",
    results: ["Average assessment turnaround: 18 days → 6 days", "Senior costs lawyer time on document preparation reduced by 58%", "Precedent retrieval: 2-3 hours → under 4 minutes", "Firm capacity increased from 650 to 1,100+ assessments annually without additional senior hires"],
    quote: "This platform does in minutes what used to take our best people days. And it's not just faster the consistency of output has improved. The AI catches things that get missed when you're working under time pressure.",
    tag: "Custom AI · Edinburgh, Scotland", badge: "6 days", badgeColor: "#FF6B2B", topBg: "linear-gradient(135deg,#FF6B2B14 0%,#FF6B2B05 100%)",
    subtitle: "Edinburgh, Scotland", stat: "6d", statDesc: "Average assessment turnaround: 18 days → 6 days",
    tags: ["React", "FastAPI", "PostgreSQL"],
      quoteBy: "Managing Partner, Edinburgh Legal Costs Firm",
  },
  {
    title: "AI Fleet & Driver Operations Platform", location: "Melbourne, Australia",
    problem: "A logistics company operating 140 vehicles and 190 drivers across Victoria was managing fleet maintenance, driver compliance, route planning, and client reporting through 5 disconnected systems. Data lived in silos. Compliance gaps weren't visible until audits. Route efficiency was being left entirely to driver judgment. The operations manager described their situation as 'flying blind at 140 vehicles.'",
    solution: "A unified AI powered fleet and driver operations platform consolidating all operational functions into a single intelligence layer. Real time vehicle telematics feed an AI maintenance prediction engine that flags service needs 2-3 weeks before failure probability crosses threshold. Driver compliance dashboard tracks licence expiry, medicals, fatigue hours, and induction status with automated alerts. An AI route optimisation engine generates daily route plans factoring in vehicle capacity, driver hours, traffic patterns, and delivery time windows. Client portal gives customers live delivery tracking, POD access, and AI generated service reports.",
    stack: "React · React Native (driver mobile app) · Node.js · Supabase · Telematics API integrations · Predictive maintenance ML model · Route optimisation engine · Driver compliance tracking module · Client self service portal · Real time executive dashboard",
    results: ["Reactive vehicle breakdowns reduced by 81% in the first year", "Route optimisation reduced total fleet kilometres driven by 14%", "Driver compliance gaps reduced from an average of 23 open items to under 3 at any time", "Operations manager time on manual reporting: 18 hours → 3 hours per week"],
    quote: "We went from not knowing what was happening across our fleet to having more operational intelligence than we knew what to do with. The maintenance prediction alone paid for the platform. Everything else is compounding value.",
    tag: "Custom AI · Melbourne, Australia", badge: "Reactive vehicle breakdowns ", badgeColor: "#22C55E", topBg: "linear-gradient(135deg,#22C55E14 0%,#22C55E05 100%)",
    subtitle: "Melbourne, Australia", stat: "81%", statDesc: "Reactive vehicle breakdowns reduced by 81% in the first year",
    tags: ["React", "React", "Node.js"],
      quoteBy: "General Manager, Melbourne Logistics Company",
  },
  {
    title: "AI Powered EdTech Assessment Platform", location: "Hyderabad, India",
    problem: "A fast growing test preparation company serving 18,000+ students across UPSC, GATE, and CAT preparation was running its assessment infrastructure on a third party platform that couldn't be customised, had no AI capabilities, and charged per-student fees that were becoming a significant cost centre as the business scaled. Students received generic performance reports with no diagnostic depth.",
    solution: "A fully custom AI powered assessment and learning intelligence platform. Students take tests on an adaptive engine that adjusts question difficulty in real time based on demonstrated performance. On completion, an AI diagnostic engine analyses each student's response patterns across 60+ sub-topic dimensions identifying specific knowledge gaps, error pattern types, and optimal study focus areas. Personalised study plans are auto-generated and updated after every test. Faculty dashboard gives real time cohort-level intelligence which topics are weakest, which question types generate the most errors, and which students are at risk of falling below target score thresholds.",
    stack: "React · FastAPI · PostgreSQL · Adaptive testing engine · AI diagnostic and gap analysis model · Personalised study plan generator · Faculty cohort intelligence dashboard · Automated parent communication module · Multi-exam-type architecture (UPSC, GATE, CAT)",
    results: ["Student score improvement rate (target percentile achieved): 34% → 61%", "Faculty time on post-test analysis: 3 days → 4 hours per test cycle", "Platform cost per student reduced by 67% vs third party platform fees at equivalent scale", "Student retention rate: 71% → 89% attributed to personalisation quality"],
    quote: "Our students finally understand why they're getting questions wrong, not just that they got them wrong. The diagnostic depth this platform provides is something no off-the-shelf test platform offers. It has fundamentally changed our academic outcomes.",
    tag: "Custom AI · Hyderabad, India", badge: "61%", badgeColor: "#1A6FE8", topBg: "linear-gradient(135deg,#1A6FE814 0%,#1A6FE805 100%)",
    subtitle: "Hyderabad, India", stat: "61%", statDesc: "Student score improvement rate (target percentile achieved): 34% → 61%",
    tags: ["React", "FastAPI", "PostgreSQL"],
      quoteBy: "Chief Academic Officer, Hyderabad Test Prep Company",
  },
  {
    title: "AI Powered Wholesale Marketplace Platform", location: "Surat, India",
    problem: "A textile wholesale business with 3,200 registered buyers across Gujarat, Maharashtra, and Rajasthan was managing orders, inventory, and buyer communication through WhatsApp groups, manual catalogue PDFs, and basic billing software. There was no digital order trail, no inventory visibility for buyers, no personalisation, and no data on buying patterns. A competitor had launched a B2B marketplace and was taking share.",
    solution: "A fully custom AI powered B2B wholesale marketplace built entirely around the textile industry's specific requirements. Buyers access a personalised catalogue interface where AI surfaces relevant products based on their purchase history, season, region, and business type. A complex product configuration engine handles fabric variants colour, weave, composition, GSM, width, finish across 8,000+ active SKUs. Region-specific and buyer-tier pricing is applied dynamically. An AI reorder intelligence engine analyses each buyer's purchase cycle and proactively surfaces reorder suggestions before stock-out risk.",
    stack: "React · React Native (sales rep mobile app) · Node.js · PostgreSQL · AI personalisation and recommendation engine · Complex product variant configuration engine · Dynamic pricing engine · AI demand forecasting model · Buyer purchase cycle intelligence · WhatsApp order notification integration",
    results: ["Average order value per buyer increased 34% attributed to AI driven product recommendations", "Order processing time: 2 days (manual) → same day digital fulfilment", "78% of registered buyers active on the platform within 60 days of launch", "Stockout incidents on top-200 SKUs reduced by 71% through AI demand forecasting"],
    quote: "We were afraid buyers wouldn't move from WhatsApp to a platform. The opposite happened within 2 months our buyers were telling other businesses about it. The personalisation makes them feel like we know their business, because now we actually do.",
    tag: "Custom AI · Surat, India", badge: "Average order value per buye", badgeColor: "#EC4899", topBg: "linear-gradient(135deg,#EC489914 0%,#EC489905 100%)",
    subtitle: "Surat, India", stat: "34%", statDesc: "Average order value per buyer increased 34% attributed to AI driven product recommendations",
    tags: ["React", "React", "Node.js"],
      quoteBy: "Managing Director, Surat Textile Wholesale Business",
  },
];


const whyUs = [
  { title: "We Start With the Problem, Not the Technology",  desc: "Every engagement begins with structured discovery before any technology decisions are made. We understand your business model, your users, and your competitive context first then design the solution." },
  { title: "AI Embedded From Architecture, Not Added Later", desc: "We don't build a platform and then figure out where to put the AI. The intelligence layer is designed into the data model and infrastructure from day one faster, more accurate, and more scalable than AI bolted onto an existing system." },
  { title: "Iterative Delivery, Never a Black Box",          desc: "Fortnightly sprint reviews with working software. You see progress every two weeks, provide feedback in real time, and maintain control throughout the build. No 6-month silence followed by a reveal." },
  { title: "Architecture Built for Scale",                   desc: "We engineer for where your business is going, not just where it is today. Every platform we build is designed to handle 10x your current volume without a re-architecture conversation." },
  { title: "Security and Compliance as a Foundation",        desc: "Role based access, data encryption, audit trails, and compliance frameworks built in from day one. Not security patched onto a finished build security as a first class requirement from the first sprint." },
  { title: "We Stay Your Engineering Partner",               desc: "We don't disappear at launch. Every custom platform engagement includes a post launch stabilisation period and the option to move into an ongoing product partnership iterating, improving, and evolving as your business grows." },
];

const faqs = [
  { q: "How is a custom build justified over an off-the-shelf product?", a: "Off-the-shelf products make sense when your requirements fit the median use case. When they don't when your business model is differentiated, your data is complex, your workflows have nuance, or your scale economics make per-seat pricing prohibitive custom is nearly always the right answer. We help you make that evaluation honestly in discovery before any commitment is made." },
  { q: "How do you prevent custom builds from going over budget or timeline?", a: "Fixed-scope sprints with working software at every review point. We scope carefully in discovery, flag risks early, and give you real time visibility into progress. Budget overruns in custom development almost always stem from poorly defined scope our Problem Definition Document process addresses this before engineering begins." },
  { q: "Do we own the code and IP?", a: "Yes, entirely. All code, architecture, and IP developed during your engagement belongs to you. We provide full documentation, codebase handover, and deployment access. No lock-in, no licensing, no dependency on us to operate your own platform." },
  { q: "Can you work with our existing technology or do we start from scratch?", a: "Both. We assess your current tech stack in discovery and recommend whether to build on, integrate with, or replace existing systems. We frequently build on or alongside existing infrastructure particularly for legacy modernisation engagements." },
  { q: "How long does a custom platform take to build?", a: "MVP scope: typically 8-12 weeks. Full featured platform: 14-20 weeks depending on complexity and integration requirements. We provide a detailed timeline in the Architecture Blueprint phase before full engineering begins." },
  { q: "How do we get started?", a: "Book a free Solution Discovery Call. We'll spend 60 minutes understanding your business, the problem you're trying to solve, and whether a custom build is the right answer. If it is, we'll outline what the engagement would look like. If it isn't, we'll tell you honestly." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E7EB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="font-semibold text-[#0A1628] text-[15px]"><span data-cms-key={`customai_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`customai_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
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
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}15` }}><span data-cms-key={`customai_cs_${i}_tag`} data-cms-label="CS Tag" data-cms-attr="text">{cs.tag}</span></span>
        <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ color: cs.badgeColor, background: `${cs.badgeColor}15`, border: `1px solid ${cs.badgeColor}30` }}><span data-cms-key={`customai_cs_${i}_badge`} data-cms-label="CS Badge" data-cms-attr="text">{cs.badge}</span></span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4"><span data-cms-key={`customai_cs_${i}_title`} data-cms-label="Case Study Title" data-cms-attr="text">{cs.title}</span></h3>

        {/* Big stat */}
        <div className="flex items-center gap-2 mb-3">
          <CMSIcon cmsKey="customai_icon_1" cmsLabel="TrendingUp Icon" name="TrendingUp" size={18} color={cs.badgeColor} />
          <span className="text-[42px] font-black leading-none" style={{ color: cs.badgeColor }}><span data-cms-key={`customai_cs_${i}_stat`} data-cms-label="CS Stat" data-cms-attr="text">{cs.stat}</span></span>
        </div>
        <p className="text-[15px] leading-relaxed text-[#4B5563] mb-5 flex-1"><span data-cms-key={`customai_cs_${i}_statdesc`} data-cms-label="Case Study Stat Desc" data-cms-attr="text">{cs.statDesc}</span></p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cs.tags.map((t: string) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ color: cs.badgeColor, background: `${cs.badgeColor}12` }}><span data-cms-key={`customai_cs_${i}_tag_${t}`} data-cms-label="CS Tech Tag" data-cms-attr="text">{t}</span></span>
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
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">The Challenge: </span><span data-cms-key={`customai_cs_${i}_problem`} data-cms-label="CS Problem" data-cms-attr="text">{cs.problem}</span></p>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">What We Built: </span><span data-cms-key={`customai_cs_${i}_solution`} data-cms-label="CS Solution" data-cms-attr="text">{cs.solution}</span></p>
              <p className="text-[11px] text-[#9CA3AF] font-mono mb-4"><span data-cms-key={`customai_cs_${i}_stack`} data-cms-label="Case Study Stack" data-cms-attr="text">{cs.stack}</span></p>
              <ul className="space-y-1.5 mb-4">
                {cs.results.map((r: string, ri: number) => (
                  <li key={r} className="flex items-start gap-2 text-[13px] text-[#374151]">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: cs.badgeColor }} />{r}
                  </li>
                ))}
              </ul>
              <blockquote className="border-l-2 pl-3 italic text-[13px] text-[#6B7280]" style={{ borderColor: cs.badgeColor }}>
                "<span data-cms-key={`customai_cs_${i}_quote`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>"<span className="not-italic font-semibold text-[#374151] text-[12px]"><span data-cms-key={`customai_cs_${i}_quoteBy`} data-cms-label="CS Quote By" data-cms-attr="text">{cs.quoteBy}</span></span>
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CustomAIWebSolutionsPage = () => {
  const _sp = useSettings(['customai_hero_h1','customai_hero_sub','customai_cta_btn']);
  return (
  <PageLayout>

    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(255,107,43,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 400, height: 400, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(255,107,43,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-4 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <span className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.1)", color: accent, border: "1px solid rgba(255,107,43,0.3)" }}>
              <Layers size={12} /> Custom AI Web Solutions
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="customai_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Your Business Has Problems That<br className="hidden md:block" />
            Off-The-Shelf Software Was<br className="hidden md:block" />
            Never Built to Solve.
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="customai_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We design and engineer fully custom, AI powered web solutions built from the ground up around your specific business model, your data, and the outcomes you need — No templates — No compromises — No ceiling.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="customai_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Book a Free Solution Discovery Call</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">What We Build</a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6"><span data-cms-key="customai_p_36" data-cms-label="Body Text" data-cms-attr="text">Built for businesses that have outgrown generic software across SaaS, enterprise, marketplace, and operational platforms</span></p>
        </motion.div>
      </div>
    </section>

    {/* Positioning */}
    <section id="services-list" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="section-badge" data-cms-key="customai_badge_29" data-cms-label="Section Badge" data-cms-attr="text">Not a Web Development Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            <span data-cms-key="customai_h2_main" data-cms-label="Section Heading" data-cms-attr="text">Generic Software Is Built for the Average Business.</span><br className="hidden md:block" /> <span data-cms-key="customai_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">Yours Isn't Average.</span>
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="customai_x12" data-cms-label="Body Text" data-cms-attr="text">Every category of off-the-shelf software was designed for the median use case — The median customer journey — The median workflow — The median data structure.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="customai_x13" data-cms-label="Body Text" data-cms-attr="text">If your business operates differently — if your processes have nuance, your data has complexity, your users have specific needs that no product on the market quite addresses — you don't have a software problem. You have a build problem.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed"><span data-cms-key="customai_x14" data-cms-label="Body Text" data-cms-attr="text">We build custom AI powered web solutions that are designed entirely around how your business actually works. Every screen, every data model, every AI layer, every integration is engineered for your specific problem not adapted from something that was built for someone else. The result isn't just software that fits better. It's a competitive advantage that no competitor can buy off a shelf.</span></p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "AI Is the Architecture, Not an Add On", desc: "Every solution we build has AI embedded at the infrastructure level not layered on top. Your platform thinks, learns, and improves with every interaction from the moment it goes live." },
            { title: "Built for Your Exact Problem",           desc: "We don't start from a template and work backwards to your requirements. We start from your requirements and engineer forward. Every feature exists because your business needs it." },
            { title: "Scales With Your Business",             desc: "Custom built means no artificial limits. No per-seat pricing ceilings. No features locked behind enterprise tiers. A platform that grows with you architecturally and commercially." },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2"><span data-cms-key={`customai_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`customai_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="customai_badge_30" data-cms-label="Section Badge" data-cms-attr="text">What We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-3"><span data-cms-key="customai_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Running These Platforms</span></h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto"><span data-cms-key="customai_x15" data-cms-label="Body Text" data-cms-attr="text">Every engagement starts with a blank sheet and a deep understanding of the problem. Here's the category of solutions we most commonly engineer.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: accent }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <s.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`customai_svc_${si}_title`} data-cms-label="Service Title" data-cms-attr="text">{s.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`customai_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="customai_badge_31" data-cms-label="Section Badge" data-cms-attr="text">How We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="customai_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">How We Engineer Your Custom Solution</span></h2>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #e85a1a)` }}>{step.num}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`customai_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`customai_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`customai_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`customai_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #e85a1a)` }}>
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
          <span className="section-badge" data-cms-key="customai_badge_33" data-cms-label="Section Badge" data-cms-attr="text">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"><span data-cms-key="customai_s13_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Running These Platforms</span></h2>
        </motion.div>
        <DBTestimonialCarousel />
      </div>
    </section>


    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="customai_badge_34" data-cms-label="Section Badge" data-cms-attr="text">Why Digital Aura</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="customai_s14_h2" data-cms-label="Section Heading" data-cms-attr="text">Why Businesses Choose Digital Aura to Build Their Custom Platform</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border group relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, #7C3AED)` }} />
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`customai_why_${i}_title`} data-cms-label="Why Title" data-cms-attr="text">{w.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`customai_why_${i}_desc`} data-cms-label="Why Desc" data-cms-attr="text">{w.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── AI Website Design Clients ── */}
    <section className="py-14 px-4 md:px-8 bg-white" style={{ borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Built AI Websites For</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Clients We've Designed With AI</h2>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto">Real businesses. Real AI powered websites. Built by Digital Aura.</p>
        </motion.div>
        <ClientLogoGrid accentColor={accent} clients={[
          { name: "Inn of the Dove",        tag: "Hospitality",    logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp",                                                  logoBg: "#fff8f5" },
          { name: "Game Zone Events",       tag: "Events",         logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                 logoBg: "#f0fff0" },
          { name: "Shree Sahajanand",       tag: "Religious & Food",logo: "https://shreesahajanandprasadam.com/wp-content/uploads/logo.png",                                                      logoBg: "#fff8f0" },
          { name: "Dr Aarti Pediatric",     tag: "Healthcare",     logo: "https://draartipediatric.in/wp-content/uploads/logo.png",                                                               logoBg: "#f0f8ff" },
        ]} />
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="customai_badge_35" data-cms-label="Section Badge" data-cms-attr="text">FAQ</span>
          <h2 className="text-3xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="customai_s15_h2" data-cms-label="Section Heading" data-cms-attr="text">Common Questions</span></h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="customai_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Let's Build the <span data-cms-key="customai_hl_149" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Platform</span> Your Business <span data-cms-key="customai_hl_150" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Actually Needs</span>.</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="customai_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Solution Discovery Call. We'll map the problem, define what a custom AI powered solution would look like for your business, and give you a clear picture of the build before any commitment is made.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="customai_x16" data-cms-label="Fine Print" data-cms-attr="text">No generic proposals — No scope guessing — A real engineering conversation about your specific problem, your data, and what's actually buildable.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default CustomAIWebSolutionsPage;





