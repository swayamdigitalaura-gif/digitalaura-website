import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MessageCircle, Send, RefreshCw, Users, BarChart2, TrendingUp, Gauge, DollarSign, ShieldCheck, ChevronDown, Check, Zap, Bot, Layers, Settings } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";

const accentColor = "#25D366";
const glowColor = "rgba(37,211,102,0.12)";

const serviceGroups = [
  {
    title: "Email Marketing",
    color: "#FF6B2B",
    bg: "rgba(255,107,43,0.06)",
    border: "rgba(255,107,43,0.2)",
    Icon: Mail,
    items: [
      { label: "Email Campaign Strategy & Planning", desc: "Goal aligned campaigns mapped to your customer journey" },
      { label: "Newsletter Design & Content Creation", desc: "Engaging, branded newsletters that get opened and read" },
      { label: "Automated Email Sequences (Drip Campaigns)", desc: "Nurture leads on autopilot with timed, relevant emails" },
      { label: "Promotional & Transactional Emails", desc: "Offers, confirmations, reminders, and updates that convert" },
      { label: "Audience Segmentation & Personalisation", desc: "Right message to the right person at the right time" },
      { label: "Performance Tracking & Optimisation", desc: "Data driven improvements based on open rates and conversions" },
    ],
  },
  {
    title: "WhatsApp Marketing",
    color: "#25D366",
    bg: "rgba(37,211,102,0.06)",
    border: "rgba(37,211,102,0.2)",
    Icon: MessageCircle,
    items: [
      { label: "WhatsApp Business Setup & Integration", desc: "Full account setup with API connection to your systems" },
      { label: "Broadcast Campaigns & Bulk Messaging", desc: "Reach thousands of customers instantly with personalised blasts" },
      { label: "Automated Responses & Chat Workflows", desc: "24/7 auto-replies and smart conversation flows" },
      { label: "Lead Nurturing & Follow Ups", desc: "Timely follow up sequences that move leads toward conversion" },
      { label: "Personalised Messaging Strategies", desc: "Custom messages tailored to each audience segment" },
      { label: "CRM & API Integrations", desc: "Connect WhatsApp to your CRM for seamless data flow" },
    ],
  },
];

const toolGroups = [
  {
    label: "Email Tools",
    color: "#FF6B2B",
    bg: "rgba(255,107,43,0.08)",
    pills: ["Mailchimp", "Brevo (Sendinblue)", "HubSpot", "Klaviyo"],
  },
  {
    label: "WhatsApp Tools",
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)",
    pills: ["WhatsApp Business API", "WATI", "Interakt", "360dialog"],
  },
  {
    label: "Automation & Integration",
    color: "#6C47FF",
    bg: "rgba(108,71,255,0.08)",
    pills: ["Zapier", "Make.com", "n8n", "CRM Integrations"],
  },
  {
    label: "Analytics & Tracking",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    pills: ["Open Rate Tracking", "Click-Through Rates", "Conversion Reports", "GA4"],
  },
];

const approach = [
  "Audience segmentation and precision targeting",
  "Personalised communication strategies for each segment",
  "Automation for efficiency, scale, and consistency",
  "Continuous optimisation based on engagement data",
  "Focus on building long term customer relationships",
];

const whatWeAchieve = [
  { Icon: Users,       label: "Improve customer engagement" },
  { Icon: DollarSign,  label: "Increase repeat sales and retention" },
  { Icon: Send,        label: "Generate and nurture leads automatically" },
  { Icon: Settings,    label: "Automate communication workflows" },
  { Icon: ShieldCheck, label: "Build strong, lasting customer relationships" },
  { Icon: TrendingUp,  label: "Scalable systems that grow with your business" },
];

const results = [
  { Icon: TrendingUp,  text: "Higher open and click through rates" },
  { Icon: RefreshCw,   text: "Increased customer retention" },
  { Icon: Gauge,       text: "Better conversion rates" },
  { Icon: ShieldCheck, text: "Automated, scalable communication" },
];

const whyUs = [
  "Personalised and targeted communication at scale",
  "Automation driven efficiency saving hours daily",
  "High engagement and conversion focused campaigns",
  "Data driven optimisation with clear reporting",
  "Seamless integration with your existing systems",
  "Focus on customer retention and lifetime value",
];

const faqs = [
  {
    q: "Is email marketing still effective?",
    a: "Absolutely. Email marketing remains one of the highest ROI channels available: delivering an average return of $36, $42 for every $1 spent when executed correctly with segmentation and personalisation.",
  },
  {
    q: "Can you automate campaigns?",
    a: "Yes, we create fully automated workflows for lead nurturing, onboarding sequences, abandoned cart recovery, re-engagement, and customer engagement: all running on autopilot.",
  },
  {
    q: "Is WhatsApp marketing safe and compliant?",
    a: "Yes. We use the official WhatsApp Business API and follow all platform guidelines and opt-in requirements to ensure your campaigns are compliant and your account stays protected.",
  },
  {
    q: "Can you integrate with my CRM?",
    a: "Yes, we integrate with popular CRM systems including HubSpot, Zoho, Salesforce, and more: for seamless data sync and automated workflows.",
  },
  {
    q: "How do you measure success?",
    a: "We track key metrics including open rates, click through rates, conversion rates, reply rates (for WhatsApp), unsubscribe rates, and revenue generated: with monthly reports included.",
  },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`emailwa_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="emailwa_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`emailwa_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const EmailWhatsAppPage = () => {
  const _sp = useSettings(['emailwa_hero_h1','emailwa_hero_sub','emailwa_cta_btn']);
  return (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(255,107,43,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>
            ← Back to All Services
          </Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <MessageCircle size={12} /> Email & WhatsApp Marketing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="emailwa_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Build Relationships & Drive<br />
            <span style={{ color: accentColor }}>Conversions with Direct Marketing</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            <span data-cms-key="emailwa_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We help businesses connect with their audience through personalised email and WhatsApp marketing: focused on engagement, automation, and conversion that turns leads into loyal customers.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              <span data-cms-key="emailwa_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Start My Campaign</span> <Send size={15} />
            </Link>
            <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>Our Services</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Services ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="emailwa_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Comprehensive Email & WhatsApp Marketing Services</span></h2>
          <p className="text-[#6B7280] max-w-xl mx-auto"><span data-cms-key="emailwa_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">End to end solutions to help you communicate effectively and convert your audience.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {serviceGroups.map((group, gi) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.1 }}
              className="rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${group.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: group.bg }}>
                  <group.Icon size={18} style={{ color: group.color }} />
                </div>
                <h3 className="text-[16px] font-bold text-[#0A1628]"><span data-cms-key={`emailwa_grp_${gi}_title`} data-cms-label="Group Title" data-cms-attr="text">{group.title}</span></h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: group.color }} />
                    <div>
                      <span className="text-[13.5px] font-semibold text-[#0A1628]"><span data-cms-key={`emailwa_grp_${gi}_item_${i}_label`} data-cms-label="Item Label" data-cms-attr="text">{item.label}</span></span>
                      <span className="text-[12.5px] text-[#6B7280]"><span data-cms-key={`emailwa_grp_${gi}_item_${i}_desc`} data-cms-label="Item Desc" data-cms-attr="text">: {item.desc}</span></span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Our Approach ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="emailwa_h2lbl_18" data-cms-label="Section Label" data-cms-attr="text">Our Approach to Direct Marketing</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="emailwa_s12_sub" data-cms-label="Section Subtext" data-cms-attr="text">Delivering the right message to the right audience at the right time: every time.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approach.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span className="text-[14px] text-[#374151]">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Tools ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="emailwa_h2lbl_19" data-cms-label="Section Label" data-cms-attr="text">Tools & Technologies We Use</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="emailwa_s13_sub" data-cms-label="Section Subtext" data-cms-attr="text">Industry-leading tools for automation, tracking, and performance optimisation.</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`emailwa_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
              <div className="flex flex-wrap gap-2">
                {g.pills.map(p => (
                  <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: g.bg, color: g.color }}>{p}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Why Us + What We Achieve ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="emailwa_h2lbl_20" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`emailwa_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="emailwa_h2lbl_21" data-cms-label="Section Label" data-cms-attr="text">What We Can Achieve for You</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {whatWeAchieve.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accentColor}12` }}>
                  <item.Icon size={15} style={{ color: accentColor }} />
                </div>
                <span className="text-[14.5px] text-[#374151]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Results ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="emailwa_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((r, i) => (
            <motion.div key={r.text} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl"
              style={{ background: "#fff", border: `1px solid ${accentColor}20`, boxShadow: `0 4px 20px ${accentColor}08` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}10` }}>
                <r.Icon size={22} style={{ color: accentColor }} />
              </div>
              <span className="text-[13.5px] font-medium text-[#374151] leading-snug">{r.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="emailwa_h2lbl_23" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}>
              <FAQItem q={faq.q} a={faq.a} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA Banner ── */}


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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="emailwa_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Turn Your List Into <span data-cms-key="emailwa_hl_123" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Revenue</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="emailwa_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Email and WhatsApp Strategy Call. We'll map your current flows, identify the gaps, and show you exactly what automation will add to your bottom line.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Free Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="emailwa_x16" data-cms-label="Fine Print" data-cms-attr="text">No batch and blast — Personalised sequences built to convert at every stage of the journey.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default EmailWhatsAppPage;






