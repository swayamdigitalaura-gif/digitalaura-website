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
  Code2, Smartphone, Cloud, Globe, ShoppingCart, Layout,
} from "lucide-react";

const accent = "#1A6FE8";
const accentBg = "rgba(26,111,232,0.08)";
const accentBorder = "rgba(26,111,232,0.2)";

const services = [
  { Icon: Globe,        title: "Web Application Development",    desc: "Scalable, fast, production-ready web applications built with React and Next.js. Designed for real users, real load, and real business logic — not demo-ware that breaks the moment traffic arrives." },
  { Icon: Smartphone,   title: "Mobile App Development",         desc: "iOS and Android apps built with Flutter or React Native. One codebase, two platforms, delivered by a single team — faster time to market, lower cost, no coordination overhead between separate teams." },
  { Icon: Cloud,        title: "SaaS Platform Development",      desc: "End-to-end SaaS architecture from authentication and billing to dashboards, APIs, and multi-tenancy. Built to support thousands of users from day one without infrastructure rewrites as you scale." },
  { Icon: ShoppingCart, title: "eCommerce & Marketplace Builds", desc: "Custom eCommerce platforms and marketplaces where Shopify or standard solutions hit their ceiling. Complex catalogue logic, vendor models, dynamic pricing, and personalisation — engineered from the ground up." },
  { Icon: Code2,        title: "Internal Tools & Ops Platforms",  desc: "Bespoke internal platforms that replace spreadsheet chaos — workflow management, approval systems, resource planning, and operational intelligence built precisely around how your team actually works." },
  { Icon: Layout,       title: "AI-Powered Interfaces",          desc: "Web products where AI is the core value proposition — intelligent dashboards, document Q&A portals, recommendation engines, and generative interfaces built to deliver real output to real users." },
];

const processSteps = [
  { num: "01", title: "Discovery & Architecture Weeks 1-2",   desc: "We spend time with your team mapping requirements, user goals, and technical constraints before writing a line of code. Output: a full technical specification, system architecture diagram, and database schema — agreed before build begins." },
  { num: "02", title: "Design & Prototype Weeks 3-4",          desc: "We design the full UI and build a working prototype on your real data so you can see the product in action before engineering begins. You approve the design and interactions — no surprises at launch." },
  { num: "03", title: "Engineering Sprints Weeks 5-10",        desc: "We build in 2-week sprints with working software demonstrated at every sprint review. You see real progress and provide real feedback throughout — not at the end of a 6-month black box build cycle." },
  { num: "04", title: "QA, Launch & Iteration",                desc: "Rigorous QA across functionality, performance, security, and edge cases. We launch with monitoring, error tracking, and performance dashboards in place. Post-launch iteration sprints are included in every engagement." },
];


const whyUs = [
  { title: "Full Stack, One Team",               desc: "Front end, back end, database, APIs, cloud infrastructure, and AI integration — all owned by one team. No handoffs between agencies, no accountability gaps, no 'that's not our part' conversations." },
  { title: "AI Integrated by Default",            desc: "Every product we build has an AI layer — whether that's a recommendation engine, a natural language interface, intelligent search, or a predictive model. We don't treat AI as optional in 2026." },
  { title: "Built to Last, Not Just to Launch",   desc: "Clean architecture, documented codebases, test coverage, and infrastructure designed for scale. You're not inheriting technical debt on day one and rebuilding from scratch in 18 months." },
  { title: "Transparent Build Process",           desc: "Fortnightly sprint reviews mean you see working software every two weeks. Every design decision is explained. Every architectural choice is documented. No black boxes, no surprises." },
  { title: "We Think in Products, Not Features",  desc: "We don't build feature lists. We build products — designed around your users, your data flows, and the specific outcomes your business needs software to deliver. Every line of code exists because it earns its place." },
  { title: "Post-Launch Partnership",             desc: "60-day post-launch monitoring, performance reviews, and iteration sprints. We build products as if we're going to maintain them ourselves — because most of the time, we are." },
];

const faqs = [
  { q: "How long does it take to build a web application?", a: "For a focused MVP with clearly defined scope, typically 6-10 weeks from kick off to production launch. Larger platforms with complex integrations, multi-tenancy, or custom AI layers typically run 12-20 weeks. We provide a detailed timeline in the discovery phase before any commitment is made." },
  { q: "What tech stack do you use?", a: "Our default stack is React or Next.js on the front end, Node.js or FastAPI on the back end, PostgreSQL or Supabase for data, and AWS or Vercel for infrastructure. For mobile, we use Flutter or React Native. We adapt based on your requirements — if you have an existing stack, we can build into it." },
  { q: "Can you work with our existing development team?", a: "Yes. We've worked alongside in-house teams as an embedded engineering partner on many engagements — handling specific modules, AI integration layers, or full subsystems while your team owns other parts. We adapt to your workflow, git conventions, and review process." },
  { q: "Do you do discovery and scoping before commitment?", a: "Always. We run a paid discovery engagement before any full build begins — producing a technical specification, architecture diagram, and phased build plan. You own all the discovery output and can take it anywhere. The discovery phase is typically 1-2 weeks." },
  { q: "What happens after the product launches?", a: "Every engagement includes a 60-day stabilisation period post-launch — active monitoring, bug fixes, and performance optimisation. Beyond that, we offer ongoing iteration sprints, feature development, and infrastructure management as a retained engineering partner." },
  { q: "How do we get started?", a: "Book a free Technical Discovery Call. We'll review your requirements, assess the right architecture approach, and give you a realistic picture of scope, timeline, and cost — before any commitment is made." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E7EB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="font-semibold text-[#0A1628] text-[15px]"><span data-cms-key={`webapp_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`webapp_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WebAppDevPage = () => {
  const _sp = useSettings(['webapp_hero_h1','webapp_hero_sub','webapp_cta_btn']);
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
              <Code2 size={12} /> Web & App Development
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="webapp_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">We Don't Just Write Code.<br className="hidden md:block" />
            We Engineer Products<br className="hidden md:block" />
            That Actually Scale.
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="webapp_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">From MVP to full-scale platform — we ship clean, tested, production-ready web and mobile applications built with AI baked in from day one. Not handed off. Engineered to last.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="webapp_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Book a Free Technical Discovery Call</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">What We Build</a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6"><span data-cms-key="webapp_p_hero" data-cms-label="Body Text" data-cms-attr="text">Trusted by startups, scaleups, and enterprise teams shipping products that compete on engineering quality</span></p>
        </motion.div>
      </div>
    </section>

    {/* Agency Comparison */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Web Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Build You a Web App.<br className="hidden md:block" /> Very Few Can Build One That Lasts.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">There's a generation of web applications being delivered right now that look polished in demos but fall apart under real load — slow, unmaintainable, and impossible to scale without a full rewrite six months after launch.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Apps that work in demos but fail at scale", detail: "No load testing, no architecture planning" },
              { pain: "Code you can't own or maintain", detail: "Black-box builds with no documentation" },
              { pain: "Feature delivery with no product thinking", detail: "Shipped fast, never designed to last" },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your web app has never been load tested or performance audited, it's a technical liability waiting to be exposed.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Positioning */}
    <section id="services-list" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="section-badge" data-cms-key="webapp_badge_pos" data-cms-label="Section Badge" data-cms-attr="text">Not Your Typical Dev Shop</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            <span data-cms-key="webapp_h2_main" data-cms-label="Section Heading" data-cms-attr="text">Most Agencies Hand You a Website.</span><br className="hidden md:block" /> <span data-cms-key="webapp_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">We Hand You a Product.</span>
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="webapp_pos_x1" data-cms-label="Body Text" data-cms-attr="text">Most businesses that have hired a development agency have also been burned by one — A codebase no one can maintain — A launch that falls apart under real load — A handover with no documentation — A team that disappears the moment the invoice clears.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-3"><span data-cms-key="webapp_pos_x2" data-cms-label="Body Text" data-cms-attr="text">That's not what we build.</span></p>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed"><span data-cms-key="webapp_pos_x3" data-cms-label="Body Text" data-cms-attr="text">We engineer products with proper architecture, documented codebases, full test coverage, and AI capabilities built in from day one. Every project is treated as if we're going to maintain it ourselves — because most of the time, we are. The result isn't just software that works at launch. It's a product that scales with your business for years.</span></p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "Architecture Before Features",   desc: "We design data models, API structure, and system architecture before writing a line of product code. The decisions made in week one determine whether your product survives week one thousand." },
            { title: "AI Integrated, Not Added Later", desc: "Every product we build has an AI layer from the start — intelligent search, recommendation engines, generative interfaces, or predictive models. Not bolted on. Engineered in." },
            { title: "Code You Can Own and Extend",    desc: "Clean, documented, tested codebases your team can work with. No black boxes, no proprietary frameworks you're locked into, no tribal knowledge that disappears when we do." },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2"><span data-cms-key={`webapp_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`webapp_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="webapp_badge_svc" data-cms-label="Section Badge" data-cms-attr="text">What We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-3"><span data-cms-key="webapp_svc_h2" data-cms-label="Section Heading" data-cms-attr="text">Products and Platforms We Engineer</span></h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto"><span data-cms-key="webapp_svc_sub" data-cms-label="Body Text" data-cms-attr="text">Every build starts with a deep understanding of your users, your data, and the specific outcome your product needs to deliver.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: accent }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <s.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`webapp_svc_${si}_title`} data-cms-label="Service Title" data-cms-attr="text">{s.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`webapp_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="webapp_badge_proc" data-cms-label="Section Badge" data-cms-attr="text">How We Build</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="webapp_proc_h2" data-cms-label="Section Heading" data-cms-attr="text">From Discovery to Launch Without Surprises</span></h2>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>{step.num}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`webapp_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`webapp_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`webapp_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`webapp_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
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
          <span className="section-badge" data-cms-key="webapp_badge_test" data-cms-label="Section Badge" data-cms-attr="text">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"><span data-cms-key="webapp_test_h2" data-cms-label="Section Heading" data-cms-attr="text">From the Teams Running These Products</span></h2>
        </motion.div>
        <DBTestimonialCarousel />
      </div>
    </section>

    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="webapp_badge_why" data-cms-label="Section Badge" data-cms-attr="text">Why Digital Aura</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="webapp_why_h2" data-cms-label="Section Heading" data-cms-attr="text">Why Engineering Teams Choose Digital Aura</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border group relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, #7C3AED)` }} />
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`webapp_why_${i}_title`} data-cms-label="Why Title" data-cms-attr="text">{w.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`webapp_why_${i}_desc`} data-cms-label="Why Desc" data-cms-attr="text">{w.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <ClientLogoSection servicePage="web-app-development" accentColor="#1A6FE8" heading="Brands Built on Our Web Solutions" fallback={[
      { name: "Gleekey",          tag: "EdTech",           logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png", logoBg: "#f5f0ff" },
      { name: "Monita",           tag: "Consulting",       logo: "https://monita.com.au/wp-content/uploads/2024/09/MONITA_v01A_Logo_BG2-sbs-200x74.png", logoBg: "#f0f8ff" },
      { name: "Shree Sahajanand", tag: "Religious & Food", logo: "https://shreesahajanandprasadam.com/wp-content/uploads/logo.png", logoBg: "#fff8f0" },
      { name: "Gift Care",        tag: "Healthcare",       logo: "https://giftcare.in/wp-content/uploads/logo.png", logoBg: "#f0fff8" },
      { name: "Game Zone Events", tag: "Events",           logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png", logoBg: "#f5fff5" },
    ]} />

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="webapp_badge_faq" data-cms-label="Section Badge" data-cms-attr="text">FAQ</span>
          <h2 className="text-3xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="webapp_faq_h2" data-cms-label="Section Heading" data-cms-attr="text">Common Questions</span></h2>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="webapp_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Let's Build a <span className="text-orange-gradient">Product</span> That <span className="text-purple-gradient">Scales</span>.</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="webapp_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Technical Discovery Call. We'll review your requirements, define the right architecture approach, and give you a clear picture of what a web or mobile build with Digital Aura looks like — before any commitment is made.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Technical Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="webapp_x9" data-cms-label="Fine Print" data-cms-attr="text">No template builds — A custom web app engineered for your users and your business goals.</span></p>
        </motion.div>
      </div>
    </section>

  </PageLayout>
);
};

export default WebAppDevPage;
