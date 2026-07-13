import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code2, ArrowRight, ChevronDown, Check,
  Zap, Shield, Globe2, Database, Settings,
  TrendingUp, Layers, Cpu, FileText, Bot,
  CheckCircle2, Lock,
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
    Icon: Bot, title: "OpenAI & Claude Integration",
    desc: "Embed GPT-4o or Claude 3.5 directly into your product for chat features, document summarisation, smart search, or AI assisted workflows without rebuilding your platform.",
    tags: ["GPT-4o API", "Claude API", "In product AI"],
  },
  {
    Icon: Globe2, title: "AI Powered Search & Discovery",
    desc: "Replace keyword search with semantic search so users find what they mean, not just what they type. Powered by embedding models and vector databases integrated into your existing search layer.",
    tags: ["Semantic search", "Vector embeddings", "Improved UX"],
  },
  {
    Icon: FileText, title: "Document Intelligence APIs",
    desc: "Connect vision and extraction APIs to automatically parse contracts, invoices, forms, and PDFs extracting structured data without manual review.",
    tags: ["OCR + AI", "Contract parsing", "Invoice extraction"],
  },
  {
    Icon: Cpu, title: "Image & Vision AI",
    desc: "Add image classification, object detection, content moderation, or product tagging to your platform via cloud vision APIs no ML expertise needed on your end.",
    tags: ["Image classification", "Content moderation", "Product tagging"],
  },
  {
    Icon: Layers, title: "Multi Model Routing",
    desc: "Route requests to the right model based on task complexity, cost, and latency requirements using fast, cheap models for simple tasks and powerful models only when needed.",
    tags: ["Cost optimisation", "Model routing", "Latency control"],
  },
  {
    Icon: Shield, title: "Secure API Gateway & Rate Limiting",
    desc: "We build a secure API middleware layer that manages authentication, rate limiting, logging, and failover across all AI providers so your AI features are production reliable.",
    tags: ["API security", "Rate limiting", "Failover handling"],
  },
];

const process = [
  { step: "01", title: "Integration Discovery", desc: "We map your existing architecture, identify where AI can add value, and define the exact API endpoints, data flows, and user touchpoints for each integration." },
  { step: "02", title: "API & Architecture Design", desc: "We design the integration layer handling authentication, request formatting, response parsing, error handling, and caching before writing a single line of code." },
  { step: "03", title: "Backend Integration Build", desc: "The API integration is built in your tech stack whether that's Node.js, Python, PHP, or another language with clean, documented code your team can maintain." },
  { step: "04", title: "UI/UX Feature Build (if needed)", desc: "If the AI feature requires new frontend components chat widgets, smart search bars, summary panels we build those alongside the backend integration." },
  { step: "05", title: "Testing & Error Handling", desc: "We test every integration across edge cases: API rate limits, model timeouts, unexpected inputs, and provider outages so your features are resilient in production." },
  { step: "06", title: "Deploy & Monitor", desc: "We deploy with proper logging, cost tracking, and performance monitoring so you can see exactly how AI features are used and what they cost in real time." },
];

const compatibleWith = [
  { Icon: Globe2, label: "React, Next.js, Vue, Angular" },
  { Icon: Code2, label: "Node.js, Python, PHP, Ruby" },
  { Icon: Database, label: "PostgreSQL, MySQL, MongoDB" },
  { Icon: Settings, label: "REST APIs & GraphQL" },
  { Icon: Cpu, label: "AWS, GCP, Azure deployments" },
  { Icon: Layers, label: "Shopify, WordPress, Webflow" },
  { Icon: Lock, label: "Existing auth & user systems" },
  { Icon: FileText, label: "CRM & helpdesk platforms" },
];

const apis = [
  { label: "Language Models", color: accent, bg: accentLight, pills: ["OpenAI GPT-4o", "Anthropic Claude", "Google Gemini", "Mistral"] },
  { label: "Search & Embeddings", color: "#1A6FE8", bg: "rgba(26,111,232,0.1)", pills: ["OpenAI Embeddings", "Cohere", "Pinecone", "Weaviate"] },
  { label: "Vision & Document", color: "#FF6B2B", bg: "rgba(255,107,43,0.1)", pills: ["GPT-4 Vision", "Google Vision API", "AWS Textract", "Azure Document Intelligence"] },
  { label: "Voice & Audio", color: "#22C55E", bg: "rgba(34,197,94,0.1)", pills: ["OpenAI Whisper", "ElevenLabs", "Assembly AI", "Google Speech"] },
  { label: "Infrastructure", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", pills: ["AWS Lambda", "Vercel Edge", "Cloudflare Workers", "Supabase"] },
];

const stats = [
  { value: "No", label: "Platform rebuild required" },
  { value: "1, 4 wk", label: "Typical integration timeline" },
  { value: "99.9%", label: "Uptime with failover design" },
  { value: "Full", label: "Cost & usage monitoring" },
];

const whyUs = [
  "We integrate AI into your existing stack no need to rebuild or re platform",
  "Production grade error handling, retries, and failover from day one",
  "Cost optimisation: route to cheaper models where accuracy permits",
  "Clean, documented code your engineering team can own and maintain",
  "Security-first: API keys never exposed, proper auth at every layer",
  "Post integration support and monitoring for at least 30 days",
];

const results = [
  { Icon: Zap, text: "AI features live in weeks, not months" },
  { Icon: TrendingUp, text: "Measurably better user experience" },
  { Icon: CheckCircle2, text: "Zero platform rebuild needed" },
  { Icon: Shield, text: "Production reliable with full monitoring" },
];

const faqs = [
  { q: "Can you add AI features to my existing product without rebuilding it?", a: "Yes this is exactly what we specialise in. We add AI capabilities as a layer on top of your existing architecture. Whether your product is built in React, WordPress, Shopify, or a custom framework, we integrate the right APIs and build the UI components that surface AI features to your users without touching your core product logic." },
  { q: "Which AI APIs do you work with?", a: "We integrate with OpenAI (GPT-4o, Whisper, Embeddings), Anthropic (Claude 3.5), Google (Gemini, Vision, Speech), Mistral, Cohere, ElevenLabs, AssemblyAI, AWS AI services (Textract, Rekognition, Transcribe), Azure Cognitive Services, and custom ML model APIs. If it has a REST API, we can integrate it." },
  { q: "How do you manage API costs?", a: "We build cost controls into every integration: caching responses where possible, routing simpler tasks to cheaper models, batching requests, and implementing usage budgets with alerts. We also set up real time cost dashboards so you can see exactly what your AI features are spending down to the individual feature or user segment." },
  { q: "What happens if the AI API goes down?", a: "We design every integration with failover logic: if the primary API is unavailable, the integration falls back gracefully either to an alternative model, a cached response, or a degraded but functional state. Your users see a sensible experience rather than an error page." },
  { q: "Can you build the UI/UX components too, or just the backend integration?", a: "We do both. If you need new frontend components a chat widget, a smart search bar, a document summary panel, an AI writing assistant UI we design and build those alongside the API integration. You get a complete, user facing AI feature, not just a backend endpoint." },
  { q: "How do you handle sensitive data when calling AI APIs?", a: "We implement data minimisation (only sending what's necessary), PII scrubbing before API calls, request logging controls, and where needed, route to on-premise or private cloud models that keep data within your infrastructure. For regulated industries, we recommend private deployments and document our security architecture for compliance review." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accent}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`aiapi_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="aiapi_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accent} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`aiapi_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const AIApiIntegrationPage = () => {
  const _sp = useSettings(['aiapi_hero_h1','aiapi_hero_sub','aiapi_cta_btn']);
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>
              <Code2 size={12} /> AI API Integration
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="aiapi_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Add AI to Your Product.<br />
            <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              No Rebuild Required.
            </span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-5 leading-relaxed">
            <span data-cms-key="aiapi_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We embed OpenAI, Gemini, Claude, or custom ML APIs directly into your existing product or website adding powerful AI features without touching your core platform.</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["OpenAI", "Claude API", "Gemini", "Semantic Search", "Document AI", "Voice & Vision"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: gradient, boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
              <span data-cms-key="aiapi_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Integrate AI Into My Product</span> <ArrowRight size={16} />
            </Link>
            <a href="#apis" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
              style={{ borderColor: "#0A1628" }}>
              See APIs We Use
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
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="aiapi_h2_26" data-cms-label="Section Heading" data-cms-attr="text">AI Features We</span> <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Integrate</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-lg"><span data-cms-key="aiapi_x11" data-cms-label="Body Text" data-cms-attr="text">From conversational AI to vision and document processing we add the right AI capability for your product and users.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="group rounded-2xl p-6 bg-[#F8FAFF] border relative overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(124,58,237,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: gradient }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accentLight }}>
                <f.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="text-[16px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`aiapi_f_${i}_title`} data-cms-label="Feature Title" data-cms-attr="text">{f.title}</span></h3>
              <p className="text-[13.5px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`aiapi_f_${i}_desc`} data-cms-label="Feature Desc" data-cms-attr="text">{f.desc}</span></p>
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
          <h2 className="text-3xl md:text-[38px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="aiapi_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Our Integration Process</span></h2>
          <p className="text-[#4B5563] max-w-lg mx-auto"><span data-cms-key="aiapi_x12" data-cms-label="Body Text" data-cms-attr="text">We architect before we build so integrations are clean, secure, and maintainable long after we hand over the code.</span></p>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {process.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #5b21b6)` }}>{p.step}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`aiapi_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiapi_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`aiapi_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aiapi_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
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

    {/* COMPATIBLE + APIS */}
    <section id="apis" className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="aiapi_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Compatible With Your Stack</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {compatibleWith.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentLight }}>
                  <c.Icon size={15} style={{ color: accent }} />
                </div>
                <span className="text-[14.5px] text-[#374151]">{c.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="aiapi_h2lbl_23" data-cms-label="Section Label" data-cms-attr="text">APIs & Services We Integrate</span>
          </h2>
          <div className="space-y-4">
            {apis.map((a, i) => (
              <motion.div key={a.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-4 bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: a.color }}><span data-cms-key={`aiapi_t_${i}_label`} data-cms-label="Tech Label" data-cms-attr="text">{a.label}</span></p>
                <div className="flex flex-wrap gap-2">
                  {a.pills.map(p => (
                    <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: a.bg, color: a.color }}>{p}</span>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="aiapi_h2lbl_24" data-cms-label="Section Label" data-cms-attr="text">Why Choose Digital Aura</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`aiapi_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="aiapi_h2lbl_25" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border"
                style={{ background: "#fff", borderColor: `${accent}20`, boxShadow: `0 4px 20px rgba(124,58,237,0.06)` }}>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="aiapi_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="aiapi_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready to Add AI to Your Product?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="aiapi_x14" data-cms-label="Body Text" data-cms-attr="text">Book a free technical discovery call. We'll review your existing architecture and propose exactly how to integrate the right AI features without disrupting what's working.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accent }}>
            Discuss My Integration <ArrowRight size={16} />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="aiapi_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Connect Your Stack <span data-cms-key="aiapi_hl_127" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">With AI</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="aiapi_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Integration Discovery Call. We'll map your current tools, identify the AI integration opportunities, and show you what's possible before any commitment is made.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Integration Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="aiapi_x13" data-cms-label="Fine Print" data-cms-attr="text">No bloated middleware — Clean, direct integrations built to last.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default AIApiIntegrationPage;




