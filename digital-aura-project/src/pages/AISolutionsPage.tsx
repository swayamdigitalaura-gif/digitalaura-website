import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import MathCaptcha from "@/components/MathCaptcha";
import PageLayout from "@/components/PageLayout";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import {
  ArrowRight, ShieldCheck, BarChart4, Network, Cpu, Database, Target, ChevronDown, CheckCircle2, Zap, Bot, Workflow as WorkflowIcon, Brain, Blocks, Code2, LineChart, Users, Clock, Briefcase, Check, Lock
} from "lucide-react";
import CMSIcon from "@/components/CMSIcon";

const accentColor = "#7C3AED";
const glowColor = "rgba(124,58,237,0.12)";
const accentBg = "rgba(124,58,237,0.08)";
const accentGradient = "linear-gradient(135deg, #7C3AED, #5b21b6)";

/* ─── DATA ─── */
const servicesList = [
  { title: "AI Automation", icon: Network, iconName: "Network", href: "/services/ai-automation", desc: "Agentic workflows & autonomous operations" },
  { title: "AI Chatbots & Assistants", icon: Bot, iconName: "Bot", href: "/services/ai-chatbot-assistant", desc: "Deploy 24/7 conversational agents" },
  { title: "AI Powered Web Apps", icon: WorkflowIcon, iconName: "Workflow", href: "/services/ai-powered-web-apps", desc: "Generative interfaces & real time data" },
  { title: "Custom AI Solutions", icon: Cpu, iconName: "Cpu", href: "/services/custom-ai-web-solutions", desc: "Bespoke SaaS & Vertical platforms" },
  { title: "LLM Powered Apps", icon: Brain, iconName: "Brain", href: "/services/llm-powered-apps", desc: "RAG systems & enterprise knowledge bases" },
  { title: "Predictive Analytics", icon: LineChart, iconName: "LineChart", href: "/services/predictive-analytics", desc: "Demand forecasting & churn prediction ML" },
  { title: "Custom ML Models", icon: Blocks, iconName: "Blocks", href: "/services/custom-ml-models", desc: "Bespoke algorithms trained on your local data" },
  { title: "AI API Integrations", icon: Code2, iconName: "Code2", href: "/services/ai-api-integration", desc: "Seamlessly embed OpenAI, Anthropic & Gemini" }
];

const engagementModels = [
  { title: "Fixed Scope Delivery", icon: Briefcase, iconName: "Briefcase", desc: "Best for defined AI projects like building a specific LLM RAG app or deploying an automated customer service chatbot. Clear timelines and locked budgets." },
  { title: "Dedicated AI Development Pod", icon: Users, iconName: "Users", desc: "We embed a dedicated team of AI developers, data scientists, and architects into your company to iteratively build out your enterprise AI roadmap." },
  { title: "AI Infrastructure Retainer", icon: Clock, iconName: "Clock", desc: "Ongoing monitoring, prompt tuning, and model retraining for live AI systems to ensure zero hallucination drift and continuous performance optimization." }
];

const adoptionRoadmap = [
  { phase: "Architecture Audit", duration: "Phase 1", details: "We map core business workflows, and identify high leverage AI opportunities to build an Enterprise AI Blueprint." },
  { phase: "Data Engineering", duration: "Phase 2", details: "We build secure integration layers, implement Vector databases for RAG architectures, and establish data governance." },
  { phase: "Proof of Value (PoV)", duration: "Phase 3", details: "Deploy a functional model addressing a single, critical use case to isolate risk and prove measurable business value." },
  { phase: "Enterprise Scale", duration: "Phase 4", details: "Full deployment across departments with monitoring dashboards to track model drift and continuous performance tuning." }
];

const failurePillars = [
  "Garbage Data, Garbage Outputs: Models are only as intelligent as the data feeding them.",
  "Solving The Wrong Problem: Implementing GenAI for processes that need deterministic logic.",
  "Ignoring Change Management: Poor human in the loop interfaces preventing team trust."
];

const ecosystem = [
  "Foundation Models (OpenAI, Anthropic, Gemini, Mistral)",
  "Vector Databases (Pinecone, Weaviate, pgvector)",
  "Orchestration (LangChain, LlamaIndex, Flowise)",
  "Cloud Infrastructure (AWS SageMaker, Azure AI, GCP)"
];

const faqs = [
  { q: "Is our proprietary company data used to train public models?", a: "Never. We architect zero-retention infrastructure. Your data remains strictly isolated." },
  { q: "How do we measure the ROI of an AI implementation?", a: "Before writing code, we define concrete baselines. ROI is tracked in real time dashboards." },
  { q: "Do we need a massive data warehouse to start?", a: "No. We often begin by indexing unstructured data stores like Google Drive or Notion using RAG architectures." },
  { q: "What is the difference between custom AI and standard SaaS tools?", a: "SaaS forces you to adapt. We engineer AI that adapts to your proprietary workflows and systems." }
];

/* ─── COMPONENTS ─── */
const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} style={{ color: accentColor, flexShrink: 0 }} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
};

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const AIAuditForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)" }}>
            <CheckCircle2 size={32} style={{ color: accentColor }} />
          </div>
          <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="aisol_h3_2" data-cms-label="Card Heading" data-cms-attr="text">Request Received!</span></h3>
          <p className="text-[#6B7280]"><span data-cms-key="aisol_p_5" data-cms-label="Body Text" data-cms-attr="text">We will review your context and send your custom AI feasibility report within 48 hours.</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1"><span data-cms-key="aisol_h3_3" data-cms-label="Card Heading" data-cms-attr="text">Get Your Free AI Readiness Scorecard</span></h3>
          <p className="text-sm text-[#6B7280] mb-4"><span data-cms-key="aisol_p_6" data-cms-label="Body Text" data-cms-attr="text">Complete this quick assessment to evaluate your AI potential.</span></p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">First Name *</label>
              <input required placeholder="John" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
              <input type="email" required placeholder="john@company.com" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Business Challenge *</label>
            <select required defaultValue="" className={inputClass + " cursor-pointer text-[#4B5563]"}>
              <option value="" disabled>Select your core challenge...</option>
              <option>Customer Support Volume</option>
              <option>Internal Data Retrieval</option>
              <option>Manual Operations & Logistics</option>
              <option>Lead Qualification</option>
              <option>Other</option>
            </select>
          </div>
          <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
          <button type="submit" disabled={!captchaOk} className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: accentGradient }}>
            Request Full Report <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5 mt-2">
            <Lock size={12} /> 100% free. No commitment required.
          </p>
        </form>
      )}
    </div>
  );
};

/* ─── PAGE MAP ─── */
const AISolutionsPage = () => (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: accentBg, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <Cpu size={12} /> Enterprise AI Strategy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            Stop Experimenting with AI.<br />
            <span style={{ color: accentColor }}>Start Building Real Value.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-3xl mx-auto mb-8 leading-relaxed"><span data-cms-key="aisol_p_7" data-cms-label="Body Text" data-cms-attr="text">We move organisations beyond basic chatbots and simple prompting. We architect and deploy profound institutional intelligence, secure, scalable AI infrastructure built precisely for how your enterprise operates.</span></p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Agentic Workflows", "Custom LLMs", "Predictive ML", "RAG Systems", "AI Dashboards"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentBg, color: accentColor, border: `1px solid ${accentColor}30` }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3 hover:shadow-lg"
              style={{ background: accentGradient }}>
              Request AI Feasibility Audit <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Specialized Practices (Services List) ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Specialized AI Practices
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="aisol_p_8" data-cms-label="Body Text" data-cms-attr="text">Explore our comprehensive suite of artificial intelligence solutions tailored for high-scale environments.</span></p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesList.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white border rounded-2xl p-6 hover:-translate-y-1 transition-all h-full flex flex-col group shadow-sm" style={{ borderColor: "#E5E7EB" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0" style={{ background: accentBg }}>
                <CMSIcon cmsKey={`aisol_svc_icon_${i}`} cmsLabel={`${service.title} Icon`} name={service.iconName} size={22} color={accentColor} />
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2">{service.title}</h3>
              <p className="text-[13.5px] text-[#6B7280] mb-5 leading-relaxed flex-grow">{service.desc}</p>
              <Link to={service.href} className="flex items-center gap-2 text-[12.5px] font-bold group-hover:gap-3 transition-all" style={{ color: accentColor }}>
                 Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Engineering Philosophy & Ecosystem ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Development Philosophy
          </h2>
          <h3 className="text-2xl font-bold text-[#0A1628] mb-4"><span data-cms-key="aisol_h3_4" data-cms-label="Card Heading" data-cms-attr="text">How We Build AI for Production Success.</span></h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-6"><span data-cms-key="aisol_p_9" data-cms-label="Body Text" data-cms-attr="text">Most generic consultancies treat AI as a software plugin. We treat it as critical infrastructure. We setup safeguards against hallucinations, model drift, and logic breakdowns.</span></p>
          <ul className="space-y-3">
            {failurePillars.map(w => (
              <li key={w} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-[14px] text-[#374151] font-medium leading-snug">{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> The Applied AI Ecosystem
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {ecosystem.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentBg }}>
                  <Database size={15} style={{ color: accentColor }} />
                </div>
                <span className="text-[14px] text-[#374151] font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t flex items-center justify-between text-xs font-bold text-[#6B7280] uppercase tracking-wider" style={{ borderColor: "#E5E7EB" }}>
             <span>SOC2 Compliant</span>
             <span>Private Inference</span>
             <span>Zero-Retention</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Roadmap ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> AI Integration Roadmap
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {adoptionRoadmap.map((r, i) => (
            <motion.div key={r.phase} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ background: "#fff", border: `1px solid ${accentColor}20`, boxShadow: `0 4px 20px ${accentColor}08` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: accentBg, color: accentColor }}>
                {i + 1}
              </div>
              <h3 className="text-[15px] font-bold text-[#0A1628]">{r.phase}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">{r.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Engagement Models ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Partnership Approach <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {engagementModels.map((model, i) => (
             <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
               className="bg-[#F8FAFF] border rounded-3xl p-8 shadow-sm" style={{ borderColor: "#E5E7EB" }}>
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: accentBg }}>
                 <CMSIcon cmsKey={`aisol_model_icon_${i}`} cmsLabel={`${model.title} Icon`} name={model.iconName} size={22} color={accentColor} />
               </div>
               <h3 className="text-lg font-bold text-[#0A1628] mb-3">{model.title}</h3>
               <p className="text-[#6B7280] text-[14px] leading-relaxed">{model.desc}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Case Studies ── */}
    <div style={{ marginBottom: "-60px" }}>
      <CaseStudies />
    </div>

    {/* ── Testimonials ── */}
    <Testimonials />

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Frequently Asked Questions
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Free Audit CTA + Form ── */}
    <section id="ai-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #5b21b6 40%, #0A1628 100%)" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">Free Proof of Value Slot</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6">
              Zero-Risk Proof of<br />Value Delivery
            </h2>
            <p className="text-white/80 text-lg mb-8"><span data-cms-key="aisol_p_10" data-cms-label="Body Text" data-cms-attr="text">We don't do 12-month PowerPoint consulting phases. In 30 days, we scope, build, and deploy a functional AI model addressing your highest ROI bottleneck.</span></p>
            <div className="space-y-3 mb-8">
              {[
                "Architecture audit & feasibility assessment",
                "Identification of highest ROI use cases",
                "Data readiness evaluation",
                "Custom 30-day AI deployment plan",
              ].map(b => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-white font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0" style={{ color: accentColor }}>DH</div>
              <div>
                <p className="text-white text-xs italic">"Functional prototype deployed in 4 weeks. Unmatched execution speed."</p>
                <p className="text-white/70 text-[10px] mt-0.5">,  David H., Head of Operations</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <AIAuditForm />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── CTA Banner ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: accentGradient }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="aisol_h2_1" data-cms-label="Section Heading" data-cms-attr="text">Ready to Institutionalise Intelligence?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="aisol_p_11" data-cms-label="Body Text" data-cms-attr="text">Schedule a technical discovery session with our Lead Solution Architects. We'll map exactly where AI can create leverage in your enterprise.</span></p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accentColor }}>
            Book Discovery Session <Target size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default AISolutionsPage;
