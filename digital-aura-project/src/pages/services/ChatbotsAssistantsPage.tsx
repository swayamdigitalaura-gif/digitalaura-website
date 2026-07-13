import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare, ArrowRight, ChevronDown, Check,
  Bot, Zap, Globe2, Shield, TrendingUp, Users,
  Phone, Mail, ShoppingCart, HeadphonesIcon, BarChart3, Settings,
  CheckCircle2, Cpu, Database,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";

const accent = "#1A6FE8";
const accentLight = "rgba(26,111,232,0.1)";
const accentBorder = "rgba(26,111,232,0.25)";
const gradient = "linear-gradient(135deg,#1A6FE8,#1558c0)";

const features = [
  {
    Icon: MessageSquare, title: "Customer Support Chatbots",
    desc: "24/7 AI agents that resolve common queries, handle returns, check order status, and escalate to humans only when needed reducing support tickets by up to 70%.",
    tags: ["24/7 support", "Ticket deflection", "Human handoff"],
  },
  {
    Icon: Users, title: "Lead Qualification Bots",
    desc: "Intelligent chatbots that engage website visitors, ask qualifying questions, score leads, and book meetings directly into your calendar without human intervention.",
    tags: ["Lead scoring", "Calendar booking", "CRM sync"],
  },
  {
    Icon: Bot, title: "Internal Employee Assistants",
    desc: "AI assistants trained on your HR policies, IT documentation, and SOPs so employees can get instant answers without bothering the relevant teams.",
    tags: ["HR & IT support", "Policy Q&A", "Onboarding assistant"],
  },
  {
    Icon: ShoppingCart, title: "eCommerce Shopping Assistants",
    desc: "Conversational product recommenders that understand customer needs, compare options, and guide buyers to the right purchase increasing AOV and conversion rate.",
    tags: ["Product recommendation", "AOV uplift", "Guided buying"],
  },
  {
    Icon: Phone, title: "Voice AI Agents",
    desc: "AI powered voice assistants that handle inbound calls, book appointments, answer FAQs, and route callers integrated with your phone system or VoIP platform.",
    tags: ["Inbound call handling", "Appointment booking", "IVR replacement"],
  },
  {
    Icon: Globe2, title: "Multilingual Chatbots",
    desc: "Chatbots that detect customer language and respond fluently in 50+ languages so you can serve global customers without separate support teams per region.",
    tags: ["50+ languages", "Auto language detection", "Global support"],
  },
];

const process = [
  { step: "01", title: "Use Case & Channel Mapping", desc: "We identify the top 20 questions your customers ask, the channels they use (web, WhatsApp, SMS), and design the conversation flows accordingly." },
  { step: "02", title: "Knowledge Base Setup", desc: "We ingest your FAQs, product docs, policies, and help articles into a structured knowledge base the AI can retrieve from accurately and quickly." },
  { step: "03", title: "Conversation Design", desc: "We map out every conversation path including edge cases, escalation triggers, and fallbacks so the bot handles real interactions gracefully." },
  { step: "04", title: "Build & Integrate", desc: "The chatbot is built and connected to your website, WhatsApp Business API, CRM, helpdesk, and any other tools in your stack." },
  { step: "05", title: "Test & Train", desc: "We run hundreds of test conversations, fix gaps in knowledge, tune tone and personality, and train the bot on your specific business context." },
  { step: "06", title: "Launch & Optimise", desc: "Post launch, we monitor conversation quality, identify unanswered questions, and continuously improve the bot's accuracy and coverage." },
];

const channels = [
  { Icon: Globe2, label: "Website live chat widget" },
  { Icon: Phone, label: "WhatsApp Business API" },
  { Icon: Mail, label: "Email auto-response" },
  { Icon: HeadphonesIcon, label: "Zendesk / Intercom / Freshdesk" },
  { Icon: MessageSquare, label: "Slack & Microsoft Teams" },
  { Icon: ShoppingCart, label: "Shopify & WooCommerce" },
  { Icon: Cpu, label: "Custom mobile apps" },
  { Icon: Database, label: "CRM & helpdesk systems" },
];

const tech = [
  { label: "AI Models", color: accent, bg: accentLight, pills: ["GPT-4o", "Claude 3.5", "Gemini", "Dialogflow CX"] },
  { label: "Frameworks", color: "#7C3AED", bg: "rgba(124,58,237,0.1)", pills: ["LangChain", "LlamaIndex", "Rasa", "Botpress"] },
  { label: "Channels", color: "#22C55E", bg: "rgba(34,197,94,0.1)", pills: ["WhatsApp API", "Twilio", "Intercom", "Zendesk"] },
  { label: "Integrations", color: "#FF6B2B", bg: "rgba(255,107,43,0.1)", pills: ["HubSpot", "Salesforce", "Calendly", "Shopify"] },
  { label: "Infrastructure", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", pills: ["AWS", "Firebase", "Supabase", "Vercel"] },
];

const stats = [
  { value: "70%", label: "Reduction in support tickets" },
  { value: "24/7", label: "Always on availability" },
  { value: "3×", label: "More leads qualified" },
  { value: "< 2s", label: "Average response time" },
];

const whyUs = [
  "We build bots with real AI not rigid decision trees that frustrate users",
  "Knowledge base RAG means answers come from your actual documents",
  "Human handoff logic so customers never feel abandoned by the AI",
  "Multi channel deployment: website, WhatsApp, phone, Teams, Slack",
  "Full CRM and helpdesk integration from day one",
  "Ongoing conversation audits to keep the bot improving over time",
];

const results = [
  { Icon: Zap, text: "Instant responses at any hour, any day" },
  { Icon: TrendingUp, text: "More leads captured and qualified" },
  { Icon: Shield, text: "Consistent, on-brand customer experience" },
  { Icon: CheckCircle2, text: "Your team freed for high value work" },
];

const faqs = [
  { q: "How is an AI chatbot different from a rule-based bot?", a: "Rule-based bots follow rigid decision trees and fail the moment a user phrases something unexpectedly. AI chatbots powered by LLMs understand natural language, handle variations, and answer questions they've never seen before using your knowledge base resulting in far fewer 'I don't understand' dead ends." },
  { q: "Will the chatbot give wrong answers?", a: "We implement RAG (Retrieval-Augmented Generation) so the bot answers from your verified documents rather than making things up. When it can't find an answer, it says so and offers to connect the user to a human this is far safer than a bot that confidently guesses." },
  { q: "Which channels can you deploy on?", a: "We deploy on websites (chat widget), WhatsApp Business API, SMS, voice (phone calls), Slack, Microsoft Teams, and email. We can also integrate into existing helpdesks like Zendesk, Intercom, and Freshdesk so conversations flow into your existing support queue." },
  { q: "How long does it take to build a chatbot?", a: "A basic customer support bot can be live in 2-3 weeks. A more advanced bot with CRM integration, lead qualification flows, and multi channel deployment typically takes 4-6 weeks. Voice AI agents add 2-4 additional weeks for phone system integration." },
  { q: "Can the bot hand off to a human agent?", a: "Yes we always build human handoff logic. The bot detects frustration, complex queries, or explicit requests to speak to a person and seamlessly transfers the conversation (with full context) to a live agent in your helpdesk or WhatsApp Business account." },
  { q: "Does it integrate with our CRM and helpdesk?", a: "Yes. We connect chatbots to HubSpot, Salesforce, Zoho, Pipedrive, Zendesk, Intercom, and Freshdesk. Lead data, conversation history, and contact records are synced automatically so your team always has full context." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accent}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`chatbots_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="chatbots_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accent} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`chatbots_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const ChatbotsAssistantsPage = () => {
  const _sp = useSettings(['chatbots_hero_h1','chatbots_hero_sub','chatbots_cta_btn']);
  return (
  <PageLayout>
    {/* HERO */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 640, height: 640, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${accentLight} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-8%", background: "radial-gradient(circle, rgba(26,111,232,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
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
              <MessageSquare size={12} /> AI Chatbots & Assistants
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="chatbots_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Intelligent Chatbots That<br />
            <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Work While You Sleep
            </span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-5 leading-relaxed">
            <span data-cms-key="chatbots_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build AI powered chatbots and virtual assistants that handle customer queries, qualify leads, and support your team 24/7 without adding headcount.</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Customer Support", "Lead Qualification", "WhatsApp Bot", "Voice AI", "CRM Integrated", "24/7 Available"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: gradient, boxShadow: "0 8px 24px rgba(26,111,232,0.4)" }}>
              <span data-cms-key="chatbots_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Build My Chatbot</span> <ArrowRight size={16} />
            </Link>
            <a href="#channels" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
              style={{ borderColor: "#0A1628" }}>
              See Integrations
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* STATS BAR */}
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
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="chatbots_h2_26" data-cms-label="Section Heading" data-cms-attr="text">Chatbots We</span> <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Build</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-lg"><span data-cms-key="chatbots_x11" data-cms-label="Body Text" data-cms-attr="text">From customer support to sales qualification every bot is purpose-built for your specific workflow.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="group rounded-2xl p-6 bg-[#F8FAFF] border relative overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(26,111,232,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: gradient }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accentLight }}>
                <f.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="text-[16px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`chatbots_f_${i}_title`} data-cms-label="Feature Title" data-cms-attr="text">{f.title}</span></h3>
              <p className="text-[13.5px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`chatbots_f_${i}_desc`} data-cms-label="Feature Desc" data-cms-attr="text">{f.desc}</span></p>
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
          <h2 className="text-3xl md:text-[38px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="chatbots_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">How We Build Your Bot</span></h2>
          <p className="text-[#4B5563] max-w-lg mx-auto"><span data-cms-key="chatbots_x12" data-cms-label="Body Text" data-cms-attr="text">A structured build process that prioritises real conversation quality over demo-ware that falls apart in production.</span></p>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {process.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>{p.step}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`chatbots_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`chatbots_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`chatbots_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`chatbots_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>
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

    {/* CHANNELS + TECH */}
    <section id="channels" className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="chatbots_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Channels & Integrations</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {channels.map((c, i) => (
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="chatbots_h2lbl_23" data-cms-label="Section Label" data-cms-attr="text">Tech Stack</span>
          </h2>
          <div className="space-y-4">
            {tech.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-4 bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: t.color }}><span data-cms-key={`chatbots_t_${i}_label`} data-cms-label="Tech Label" data-cms-attr="text">{t.label}</span></p>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="chatbots_h2lbl_24" data-cms-label="Section Label" data-cms-attr="text">Why Choose Digital Aura</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`chatbots_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="chatbots_h2lbl_25" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border"
                style={{ background: "#fff", borderColor: `${accent}20`, boxShadow: `0 4px 20px rgba(26,111,232,0.06)` }}>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="chatbots_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="chatbots_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready to Deploy Your AI Chatbot?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="chatbots_x14" data-cms-label="Body Text" data-cms-attr="text">Book a free 30 minute discovery call. We'll map your top customer queries and show you exactly how an AI bot would handle them.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accent }}>
            Get My Chatbot Built <ArrowRight size={16} />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="chatbots_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Deploy an <span data-cms-key="chatbots_hl_127" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">AI Assistant</span> That <span data-cms-key="chatbots_hl_128" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Actually Works</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="chatbots_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Chatbot Strategy Call. We'll map your highest volume conversations, define what AI can handle autonomously, and show you real resolution rates for your business.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="chatbots_x13" data-cms-label="Fine Print" data-cms-attr="text">No generic bot builders — A custom assistant trained on your business.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default ChatbotsAssistantsPage;




