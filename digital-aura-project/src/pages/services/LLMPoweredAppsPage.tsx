import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, ArrowRight, CheckCircle2, ChevronDown, Check,
  Code2, Database, Layers, Shield, Zap, MessageSquare,
  TrendingUp, Settings, Globe2, FileText, Cpu, Bot,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";

const accent = "#7C3AED";
const accentLight = "rgba(124,58,237,0.1)";
const accentBorder = "rgba(124,58,237,0.25)";
const gradient = "linear-gradient(135deg,#7C3AED,#6d28d9)";

const features = [
  {
    Icon: MessageSquare, title: "Conversational AI Apps",
    desc: "Natural language interfaces that let your customers and staff interact with business data through chat powered by GPT-4, Claude, or Gemini.",
    tags: ["Natural language UI", "Chat interface", "Business data integration"],
  },
  {
    Icon: Database, title: "RAG & Knowledge Bases",
    desc: "Retrieval-Augmented Generation apps that search your documents, PDFs, wikis, and databases to answer questions accurately without hallucination.",
    tags: ["Document Q&A", "RAG pipeline", "Private knowledge base"],
  },
  {
    Icon: FileText, title: "AI Content & Copy Tools",
    desc: "Internal tools that generate product descriptions, reports, email drafts, and marketing copy in your brand voice trained on your data.",
    tags: ["Brand voice AI", "Content generation", "Bulk copy tools"],
  },
  {
    Icon: Code2, title: "AI Augmented Workflows",
    desc: "Custom web and desktop apps with LLM features embedded auto-summarisation, smart search, intelligent form filling, and data extraction.",
    tags: ["Auto-summarisation", "Smart search", "Data extraction"],
  },
  {
    Icon: Layers, title: "Multi-Agent Systems",
    desc: "Orchestrated networks of specialised AI agents that plan, research, write, and execute complex tasks end to end without human intervention.",
    tags: ["Agent orchestration", "LangGraph", "Autonomous pipelines"],
  },
  {
    Icon: Shield, title: "Secure Private LLM Deployments",
    desc: "On-premise or private-cloud LLM deployments using open-source models (Llama, Mistral) so your sensitive data never leaves your infrastructure.",
    tags: ["On-premise AI", "Open-source LLMs", "Data privacy"],
  },
];

const process = [
  { step: "01", title: "Discovery & Use Case Mapping", desc: "We start by understanding your workflows, data sources, and the exact problems you want AI to solve then map the highest ROI use cases." },
  { step: "02", title: "Data & Model Selection", desc: "We assess your data, choose the right LLM (GPT-4, Claude, Gemini, or open-source), and design the retrieval and prompt architecture." },
  { step: "03", title: "Prototype & Validate", desc: "A working prototype is built and tested with your team in 1-2 weeks so you can see real outputs before full development begins." },
  { step: "04", title: "Build & Integrate", desc: "Full application development with API integration, authentication, database connections, and UI built on your existing tech stack where possible." },
  { step: "05", title: "Test, Tune & Deploy", desc: "Rigorous testing, prompt optimisation, hallucination reduction, and deployment to your chosen environment cloud, on-premise, or hybrid." },
  { step: "06", title: "Monitor & Improve", desc: "Post launch monitoring, user feedback loops, and ongoing prompt tuning to ensure the app improves over time as usage grows." },
];

const useCases = [
  { Icon: Globe2, label: "Customer facing chat assistants" },
  { Icon: FileText, label: "Internal document Q&A tools" },
  { Icon: TrendingUp, label: "Sales & CRM intelligence layers" },
  { Icon: Settings, label: "Automated report generation" },
  { Icon: Database, label: "Legal & compliance review tools" },
  { Icon: Cpu, label: "HR onboarding & knowledge assistants" },
  { Icon: Bot, label: "AI powered search for SaaS products" },
  { Icon: Zap, label: "Automated email drafting & triage" },
];

const tech = [
  { label: "LLMs", color: accent, bg: accentLight, pills: ["GPT-4o", "Claude 3.5", "Gemini Pro", "Llama 3", "Mistral"] },
  { label: "Frameworks", color: "#1A6FE8", bg: "rgba(26,111,232,0.1)", pills: ["LangChain", "LlamaIndex", "LangGraph", "Haystack"] },
  { label: "Vector Stores", color: "#22C55E", bg: "rgba(34,197,94,0.1)", pills: ["Pinecone", "Weaviate", "pgvector", "Chroma"] },
  { label: "Backend", color: "#FF6B2B", bg: "rgba(255,107,43,0.1)", pills: ["FastAPI", "Node.js", "Python", "Supabase"] },
  { label: "Deployment", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", pills: ["AWS Lambda", "Vercel", "Docker", "Firebase"] },
];

const whyUs = [
  "We've built LLM apps on GPT-4, Claude, Gemini, and open-source models",
  "Full stack capability: AI + UI + backend + database in one team",
  "RAG architecture expertise to eliminate hallucinations on private data",
  "Transparent prompting you own your prompt IP, not us",
  "On-premise options for regulated industries (finance, healthcare, legal)",
  "Fixed-scope prototypes so you see results before committing to full build",
];

const results = [
  { Icon: Zap, text: "Automate hours of manual knowledge work daily" },
  { Icon: Shield, text: "100% private your data stays in your infra" },
  { Icon: TrendingUp, text: "Apps that improve with every user interaction" },
  { Icon: CheckCircle2, text: "Production-ready in weeks, not months" },
];

const faqs = [
  { q: "Which LLM should I use for my app GPT-4, Claude, or Gemini?", a: "The best model depends on your use case, budget, and data privacy requirements. GPT-4o excels at general reasoning and code; Claude 3.5 Sonnet is outstanding for long document analysis and nuanced writing; Gemini Pro is strong for multimodal and Google Workspace integration. We assess your needs and recommend the right fit or run a comparison." },
  { q: "How do you prevent the AI from hallucinating wrong answers?", a: "We implement Retrieval-Augmented Generation (RAG) which grounds every answer in your actual documents and data. The LLM is instructed to only answer from retrieved context and to say 'I don't know' when information isn't available. This dramatically reduces hallucination in enterprise use cases." },
  { q: "Can you build on top of my existing product or website?", a: "Yes. We integrate LLM features into existing products via API no need to rebuild your platform. We add AI layers on top of your current tech stack using REST APIs, webhooks, or direct database connections." },
  { q: "What if I don't want my data sent to OpenAI or Google?", a: "We can deploy fully private LLMs (Llama 3, Mistral, Qwen) on your own AWS, Azure, or on-premise servers. Your data never leaves your infrastructure. This is particularly common for legal, healthcare, and financial clients." },
  { q: "How long does it take to build an LLM powered app?", a: "A basic prototype can be ready in 1-2 weeks. A production-ready app with authentication, database integration, and a polished UI typically takes 4-8 weeks depending on complexity. We always build a working prototype first so you can validate before full investment." },
  { q: "Do I need a large dataset to train a custom model?", a: "Usually not. Most business applications are best served by RAG (using your existing documents) rather than fine tuning, which requires significant labelled data. Fine tuning is only recommended for specific style or format requirements where RAG alone isn't sufficient." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accent}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`llmapps_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="llmapps_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accent} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`llmapps_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const LLMPoweredAppsPage = () => {
  const _sp = useSettings(['llmapps_hero_h1','llmapps_hero_sub','llmapps_cta_btn']);
  return (
  <PageLayout>
    {/* HERO */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 640, height: 640, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${accentLight} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-8%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accent }}>
            ← Back to All Services
          </Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase animate-ai-glow"
              style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>
              <Brain size={12} /> LLM Powered Applications
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="llmapps_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Custom Apps Built on<br />
            <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              GPT-4, Claude & Open-Source LLMs
            </span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-5 leading-relaxed">
            <span data-cms-key="llmapps_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We design and build production grade LLM applications tailored to your business data, workflows, and team from intelligent document Q&A to full multi-agent systems.</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["GPT-4o", "Claude 3.5", "Gemini", "Llama 3", "RAG Systems", "Private Deployment"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: gradient, boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
              <span data-cms-key="llmapps_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Discuss Your AI App</span> <ArrowRight size={16} />
            </Link>
            <a href="#process" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
              style={{ borderColor: "#0A1628" }}>
              See How We Build
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* FEATURES GRID */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="llmapps_h2_26" data-cms-label="Section Heading" data-cms-attr="text">What We</span> <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Build</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-lg"><span data-cms-key="llmapps_x11" data-cms-label="Body Text" data-cms-attr="text">Every LLM app is scoped to your exact problem not a generic AI wrapper slapped on your data.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="group rounded-2xl p-6 bg-white border relative overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(124,58,237,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: gradient }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accentLight }}>
                <f.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="text-[16px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`llmapps_f_${i}_title`} data-cms-label="Feature Title" data-cms-attr="text">{f.title}</span></h3>
              <p className="text-[13.5px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`llmapps_f_${i}_desc`} data-cms-label="Feature Desc" data-cms-attr="text">{f.desc}</span></p>
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
    <section id="process" className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[38px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="llmapps_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">How We Build Your LLM App</span></h2>
          <p className="text-[#4B5563] max-w-lg mx-auto"><span data-cms-key="llmapps_x12" data-cms-label="Body Text" data-cms-attr="text">From idea to production in a structured, transparent process with a working prototype before full commitment.</span></p>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {process.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #5b21b6)` }}>{p.step}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`llmapps_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`llmapps_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`llmapps_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`llmapps_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #5b21b6)` }}>
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

    {/* USE CASES + TECH */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="llmapps_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Common Use Cases</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {useCases.map((u, i) => (
              <motion.div key={u.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentLight }}>
                  <u.Icon size={15} style={{ color: accent }} />
                </div>
                <span className="text-[14.5px] text-[#374151]">{u.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="llmapps_h2lbl_23" data-cms-label="Section Label" data-cms-attr="text">Tech Stack</span>
          </h2>
          <div className="space-y-4">
            {tech.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-4 bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: t.color }}><span data-cms-key={`llmapps_t_${i}_label`} data-cms-label="Tech Label" data-cms-attr="text">{t.label}</span></p>
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
    <section className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="llmapps_h2lbl_24" data-cms-label="Section Label" data-cms-attr="text">Why Choose Digital Aura</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`llmapps_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="llmapps_h2lbl_25" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border"
                style={{ background: "#F8FAFF", borderColor: `${accent}20`, boxShadow: `0 4px 20px rgba(124,58,237,0.06)` }}>
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

    {/* CASE STUDIES */}
    <div style={{ marginBottom: "-60px" }}>
      <CaseStudies />
    </div>

    {/* TESTIMONIALS */}
    <Testimonials />

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="llmapps_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="llmapps_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready to Build Your LLM App?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="llmapps_x14" data-cms-label="Body Text" data-cms-attr="text">Book a free 30 minute session. We'll scope your idea, recommend the right model, and give you a realistic estimate no fluff.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accent }}>
            Start Your AI Project <ArrowRight size={16} />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="llmapps_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Build With the World's Most <span data-cms-key="llmapps_hl_127" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Powerful</span> <span data-cms-key="llmapps_hl_128" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Language Models</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="llmapps_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free LLM Architecture Call. We'll map your use case, select the right model and infrastructure, and show you exactly what's buildable before any commitment.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My LLM Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="llmapps_x13" data-cms-label="Fine Print" data-cms-attr="text">No off-the-shelf demos — A real conversation about your specific use case and what's achievable.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default LLMPoweredAppsPage;




