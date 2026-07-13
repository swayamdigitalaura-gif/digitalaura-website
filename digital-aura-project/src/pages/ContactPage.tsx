import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import MathCaptcha from "@/components/MathCaptcha";
import {
  Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight,
  MessageSquare, Instagram, Linkedin, Star, Send,
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const projectTypes = [
  "SEO & Organic Growth",
  "Google Ads / PPC",
  "Meta Ads (Facebook & Instagram)",
  "Social Media Management",
  "Website Design & Development",
  "Shopify / eCommerce",
  "WordPress Development",
  "Full Stack Web App",
  "AI Solutions & Automation",
  "Branding & Design",
  "Not sure yet",
];

const budgets = ["Under ₹25K/mo", "₹25K–₹75K/mo", "₹75K–₹2L/mo", "₹2L–₹5L/mo", "₹5L+/mo", "One-time project"];

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#FF6B2B] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@sambhavshah2",
    href: "https://www.instagram.com/sambhavshah2/",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "Sambhav Shah",
    href: "https://www.linkedin.com/in/sambhav-shah/",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.08)",
  },
];

const ContactPage = () => {
  const s = useSettings([
    'contact_hero_badge', 'contact_hero_heading', 'contact_hero_subtext',
    'contact_stat1_n', 'contact_stat1_l', 'contact_stat2_n', 'contact_stat2_l', 'contact_stat3_n', 'contact_stat3_l',
    'contact_phone_label', 'contact_phone_val',
    'contact_email_label', 'contact_email_val',
    'contact_address_label', 'contact_address_val',
    'contact_hours_weekdays', 'contact_hours_weekend',
    'contact_form_heading', 'contact_form_subtext',
    'contact_strip_stat1_n', 'contact_strip_stat1_l', 'contact_strip_stat1_sub',
    'contact_strip_stat2_n', 'contact_strip_stat2_l', 'contact_strip_stat2_sub',
    'contact_strip_stat3_n', 'contact_strip_stat3_l', 'contact_strip_stat3_sub',
    'contact_strip_stat4_n', 'contact_strip_stat4_l', 'contact_strip_stat4_sub',
    'contact_rating1_platform', 'contact_rating1_rating', 'contact_rating1_reviews',
    'contact_rating2_platform', 'contact_rating2_rating', 'contact_rating2_reviews',
    'contact_rating3_platform', 'contact_rating3_rating', 'contact_rating3_reviews',
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [captchaOk, setCaptchaOk] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", project: "", budget: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSubmitted(true);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      labelKey: 'contact_phone_label',
      valKey: 'contact_phone_val',
      label: s.contact_phone_label || 'Call / WhatsApp',
      val: s.contact_phone_val || '+91 81412 00284',
      href: `tel:${(s.contact_phone_val || '+91 81412 00284').replace(/\s/g, '')}`,
      color: "#FF6B2B",
      bg: "rgba(255,107,43,0.1)",
    },
    {
      icon: Mail,
      labelKey: 'contact_email_label',
      valKey: 'contact_email_val',
      label: s.contact_email_label || 'Email Us',
      val: s.contact_email_val || 'info@thedigitalaura.com',
      href: `mailto:${s.contact_email_val || 'info@thedigitalaura.com'}`,
      color: "#1A6FE8",
      bg: "rgba(26,111,232,0.1)",
    },
    {
      icon: MapPin,
      labelKey: 'contact_address_label',
      valKey: 'contact_address_val',
      label: s.contact_address_label || 'Head Office',
      val: s.contact_address_val || '713, Shilp Arcade, Sardar Patel Ring Rd, Ahmedabad, Gujarat 382330',
      href: "https://maps.app.goo.gl/rNtQ9RkNtePogkJeA",
      color: "#7C3AED",
      bg: "rgba(124,58,237,0.1)",
    },
  ];

  const ratings = [
    { platform: s.contact_rating1_platform || 'Google',    rating: s.contact_rating1_rating || '5.0', reviews: s.contact_rating1_reviews || '100+', color: '#4285F4', pk: 'contact_rating1_platform', rk: 'contact_rating1_rating' },
    { platform: s.contact_rating2_platform || 'Clutch',    rating: s.contact_rating2_rating || '4.9', reviews: s.contact_rating2_reviews || '50+',  color: '#E8251A', pk: 'contact_rating2_platform', rk: 'contact_rating2_rating' },
    { platform: s.contact_rating3_platform || 'GoodFirms', rating: s.contact_rating3_rating || '4.8', reviews: s.contact_rating3_reviews || '40+',  color: '#2E86DE', pk: 'contact_rating3_platform', rk: 'contact_rating3_rating' },
  ];

  const heroStats = [
    { nKey: 'contact_stat1_n', lKey: 'contact_stat1_l', defN: '750+', defL: 'Clients served',   color: '#FF6B2B', bg: 'rgba(255,107,43,0.07)' },
    { nKey: 'contact_stat2_n', lKey: 'contact_stat2_l', defN: '10+',  defL: 'Years experience', color: '#7C3AED', bg: 'rgba(124,58,237,0.07)' },
    { nKey: 'contact_stat3_n', lKey: 'contact_stat3_l', defN: 'Free', defL: 'Strategy call',    color: '#22C55E', bg: 'rgba(34,197,94,0.07)'  },
  ];

  const stripStats = [
    { nKey: 'contact_strip_stat1_n', lKey: 'contact_strip_stat1_l', sKey: 'contact_strip_stat1_sub', defN: '750+',  defL: 'Clients Served',   defS: 'Across India & globally', color: '#FF6B2B' },
    { nKey: 'contact_strip_stat2_n', lKey: 'contact_strip_stat2_l', sKey: 'contact_strip_stat2_sub', defN: '10+',   defL: 'Years Experience',  defS: 'Est. 2015, Ahmedabad',    color: '#7C3AED' },
    { nKey: 'contact_strip_stat3_n', lKey: 'contact_strip_stat3_l', sKey: 'contact_strip_stat3_sub', defN: '15+',   defL: 'Services Offered',  defS: 'From SEO to AI & beyond', color: '#1A6FE8' },
    { nKey: 'contact_strip_stat4_n', lKey: 'contact_strip_stat4_l', sKey: 'contact_strip_stat4_sub', defN: '200%',  defL: 'Best-Case Growth',  defS: 'Ophthalmology client',    color: '#22C55E' },
  ];

  return (
    <PageLayout>
      {/* ── HERO ── */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 500, height: 500, top: "-15%", right: "-8%", background: "radial-gradient(circle,rgba(255,107,43,0.13) 0%,transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute rounded-full" style={{ width: 420, height: 420, bottom: "-10%", left: "-6%", background: "radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute rounded-full" style={{ width: 300, height: 300, top: "30%", left: "35%", background: "radial-gradient(circle,rgba(26,111,232,0.07) 0%,transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 pt-14 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}
                data-cms-key="contact_hero_badge" data-cms-label="Contact Hero Badge" data-cms-attr="text">
                {s.contact_hero_badge || 'Est. 2015 · Ahmedabad, India'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight"
                data-cms-key="contact_hero_heading" data-cms-label="Contact Hero Heading" data-cms-attr="text">
                {s.contact_hero_heading || "Let's Grow Your Business Together"}
              </h1>
              <p className="text-[#4B5563] text-base leading-relaxed mb-8 max-w-lg"
                data-cms-key="contact_hero_subtext" data-cms-label="Contact Hero Subtext" data-cms-attr="text">
                {s.contact_hero_subtext || 'From SEO and paid ads to AI-powered web apps — Digital Aura has been delivering measurable digital growth since 2015. Tell us about your project.'}
              </p>

              <div className="grid grid-cols-3 gap-3">
                {heroStats.map((st) => (
                  <div key={st.nKey} className="rounded-2xl p-4 text-center border" style={{ background: st.bg, borderColor: `${st.color}20` }}>
                    <div className="text-xl font-black mb-0.5" style={{ color: st.color }}
                      data-cms-key={st.nKey} data-cms-label="Contact Hero Stat Number" data-cms-attr="text">
                      {s[st.nKey] || st.defN}
                    </div>
                    <div className="text-[11px] font-semibold text-[#6B7280]"
                      data-cms-key={st.lKey} data-cms-label="Contact Hero Stat Label" data-cms-attr="text">
                      {s[st.lKey] || st.defL}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {ratings.map(r => (
                  <div key={r.pk} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-white"
                    style={{ borderColor: "#E5E7EB", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={r.color} stroke="none" />)}
                    </div>
                    <span className="text-[#0A1628] text-xs font-bold"
                      data-cms-key={r.rk} data-cms-label="Rating Score" data-cms-attr="text">
                      {r.rating}
                    </span>
                    <span className="text-[#9CA3AF] text-xs"
                      data-cms-key={r.pk} data-cms-label="Rating Platform" data-cms-attr="text">
                      {r.platform}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:flex flex-col justify-center gap-6">
              <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF]"><span data-cms-key="con_pg_p_18" data-cms-label="Body Text" data-cms-attr="text">Industries we've helped grow</span></p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Healthcare",    color: "#7C3AED" },
                  { label: "eCommerce",     color: "#FF6B2B" },
                  { label: "Real Estate",   color: "#1A6FE8" },
                  { label: "Restaurants",   color: "#22C55E" },
                  { label: "Education",     color: "#F59E0B" },
                  { label: "Ophthalmology", color: "#EC4899" },
                  { label: "IVF Clinics",   color: "#7C3AED" },
                  { label: "Fitness",       color: "#FF6B2B" },
                  { label: "Home Services", color: "#1A6FE8" },
                  { label: "Retail",        color: "#22C55E" },
                  { label: "Travel",        color: "#F59E0B" },
                  { label: "Pest Control",  color: "#EC4899" },
                ].map(({ label, color }, i) => (
                  <motion.span key={label}
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.04 }}
                    className="px-4 py-2 rounded-full text-xs font-bold border"
                    style={{ color, background: `${color}10`, borderColor: `${color}25` }}>
                    {label}
                  </motion.span>
                ))}
              </div>
              <p className="text-sm text-[#6B7280]">750+ clients across India & globally — and counting.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">

            <motion.div className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

              <div className="space-y-3">
                {contactInfo.map(({ icon: Icon, labelKey, valKey, label, val, href, color, bg }) => (
                  <a key={labelKey} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#9CA3AF" }}
                        data-cms-key={labelKey} data-cms-label="Contact Info Label" data-cms-attr="text">{label}</p>
                      <p className="font-semibold text-[#0A1628] text-sm"
                        data-cms-key={valKey} data-cms-label="Contact Info Value" data-cms-attr="text">{val}</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto shrink-0 text-[#D1D5DB]" />
                  </a>
                ))}
              </div>

              <div className="rounded-2xl p-5 bg-white border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <p className="text-[11px] font-black uppercase tracking-widest text-[#9CA3AF] mb-3"><span data-cms-key="con_pg_p_19" data-cms-label="Body Text" data-cms-attr="text">Follow Us</span></p>
                <div className="space-y-2">
                  {socials.map(({ icon: Icon, label, handle, href, color, bg }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl transition-all hover:opacity-80"
                      style={{ background: bg }}>
                      <Icon size={16} style={{ color }} />
                      <div>
                        <p className="text-xs font-bold" style={{ color }}>{label}</p>
                        <p className="text-[11px] text-[#6B7280]">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-white border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)" }}>
                    <Clock size={15} style={{ color: "#7C3AED" }} />
                  </div>
                  <p className="font-bold text-[#0A1628] text-sm"><span data-cms-key="con_pg_p_20" data-cms-label="Body Text" data-cms-attr="text">Working Hours</span></p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280] font-medium">Mon – Sat</span>
                    <span className="text-[#0A1628] font-semibold"
                      data-cms-key="contact_hours_weekdays" data-cms-label="Office Hours Weekdays" data-cms-attr="text">
                      {s.contact_hours_weekdays || '10:00 AM – 7:00 PM IST'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280] font-medium">Sunday</span>
                    <span className="text-[#0A1628] font-semibold"
                      data-cms-key="contact_hours_weekend" data-cms-label="Office Hours Weekend" data-cms-attr="text">
                      {s.contact_hours_weekend || 'Closed'}
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>

            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <div className="rounded-2xl p-8 bg-white border sticky top-24"
                style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
                {submitted ? (
                  <div className="text-center py-16">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "rgba(34,197,94,0.1)" }}>
                      <CheckCircle2 size={40} className="text-[#22C55E]" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-[#0A1628] mb-3"><span data-cms-key="con_pg_h3_17" data-cms-label="Card Heading" data-cms-attr="text">Message Sent!</span></h3>
                    <p className="text-[#6B7280] mb-2"><span data-cms-key="con_pg_p_21" data-cms-label="Body Text" data-cms-attr="text">We've received your project brief.</span></p>
                    <p className="text-[#6B7280] text-sm">Our team will review and respond within <strong className="text-[#0A1628]">2 hours</strong> with a tailored proposal.</p>
                    <div className="mt-8 pt-6 border-t" style={{ borderColor: "#F3F4F6" }}>
                      <p className="text-xs text-[#9CA3AF] mb-4"><span data-cms-key="con_pg_p_22" data-cms-label="Body Text" data-cms-attr="text">Or reach us directly:</span></p>
                      <div className="rounded-2xl p-4 border" style={{ borderColor: "#E5E7EB", background: "#F8FAFF" }}>
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Call / WhatsApp</p>
                        <p className="text-base font-black text-[#0A1628] mb-3">+91 81412 00284</p>
                        <div className="flex gap-2">
                          <a href="tel:+918141200284"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold border transition-all hover:shadow-md"
                            style={{ borderColor: "#FF6B2B", color: "#FF6B2B", background: "rgba(255,107,43,0.06)" }}>
                            <Phone size={14} /> Call
                          </a>
                          <a href="https://wa.me/918141200284" target="_blank" rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                            style={{ background: "#25D366" }}>
                            <MessageSquare size={14} /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="mb-6">
                      <h3 className="text-xl font-black text-[#0A1628]"
                        data-cms-key="contact_form_heading" data-cms-label="Contact Form Heading" data-cms-attr="text">
                        {s.contact_form_heading || 'Tell Us About Your Project'}
                      </h3>
                      <p className="text-sm text-[#6B7280] mt-1"
                        data-cms-key="contact_form_subtext" data-cms-label="Contact Form Subtext" data-cms-attr="text">
                        {s.contact_form_subtext || "We'll come back with a free strategy proposal."}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#374151] mb-1.5 block">Full Name *</label>
                        <input name="name" required value={form.name} onChange={handleChange} placeholder="Rajesh Sharma" className={inputClass} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#374151] mb-1.5 block">Company / Brand</label>
                        <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#374151] mb-1.5 block">Email *</label>
                        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#374151] mb-1.5 block">Phone / WhatsApp *</label>
                        <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#374151] mb-1.5 block">Service Needed *</label>
                        <select name="project" required value={form.project} onChange={handleChange} className={inputClass + " cursor-pointer"}>
                          <option value="" disabled>Select a service</option>
                          {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#374151] mb-1.5 block">Monthly Budget</label>
                        <select name="budget" value={form.budget} onChange={handleChange} className={inputClass + " cursor-pointer"}>
                          <option value="">Select budget range</option>
                          {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#374151] mb-1.5 block">Tell Us More *</label>
                      <textarea name="message" required value={form.message} onChange={handleChange}
                        placeholder="Describe your business, current challenges, goals, and any specific requirements or timelines..."
                        rows={4} className={inputClass + " resize-none"} />
                    </div>

                    <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
                    {formError && <p className="text-xs text-red-500 text-center font-semibold">{formError}</p>}
                    <button type="submit" disabled={!captchaOk || submitting}
                      className="w-full py-4 rounded-xl text-white font-black text-base flex items-center justify-center gap-2 transition-all hover:gap-3 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg,#FF6B2B,#e85a1a)", boxShadow: "0 4px 24px rgba(255,107,43,0.4)" }}>
                      {submitting ? "Sending…" : <>Send My Project Brief <Send size={16} /></>}
                    </button>

                    <p className="text-center text-xs text-[#9CA3AF]">
                      750+ businesses trust Digital Aura · Est. 2015, Ahmedabad
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OFFICE MAP ── */}
      <section className="px-4 md:px-8 pb-16" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="section-badge">Our Office</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] tracking-tight mt-2">Find Us Here</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border shadow-md" style={{ borderColor: "#E5E7EB", height: 420 }}>
            <iframe
              title="Digital Aura Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117483.29014517883!2d72.52301753160316!3d23.047523253468977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83bdb5cc83a9%3A0xcbe9af162f4cdebc!2sDigital%20Aura!5e0!3m2!1sen!2sin!4v1779772456302!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default ContactPage;
