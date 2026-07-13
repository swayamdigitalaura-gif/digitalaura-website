import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import MathCaptcha from "@/components/MathCaptcha";
import { Link } from "react-router-dom";
import { STATIC_JOBS } from "@/data/jobs";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import {
  ArrowRight, MapPin, Clock, Users, Heart, Zap, Shield,
  TrendingUp, Star, Briefcase, Code, BarChart3, Globe2,
  Mail, Phone, CheckCircle, Sparkles, X, Upload, FileText,
} from "lucide-react";

/* ── APPLY MODAL ── */
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#FF6B2B] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const ApplyModal = ({ job, onClose, color = "#7C3AED" }: { job: Record<string, string>; onClose: () => void; color?: string }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", linkedin: "", experience: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [captchaOk, setCaptchaOk] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!job) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = (file: File) => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      setCvFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (cvFile) fd.append("cv", cvFile);
      const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const res = await fetch(`${API}/api/careers/${job.id}/apply`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0A1628]/60 backdrop-blur-sm" onClick={onClose} />
        {/* Modal */}
        <motion.div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
          {/* Top bar */}
          <div className="h-1 w-full rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
          <div className="p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: color }}>Applying for</p>
                <h2 className="text-xl font-black text-[#0A1628]">{job.title}</h2>
                <div className="flex gap-3 mt-1 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {job.type}</span>
                </div>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F3F4F6]">
                <X size={18} className="text-[#6B7280]" />
              </button>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: `${color}12` }}>
                  <CMSIcon cmsKey="careers_icon_1" cmsLabel="CheckCircle Icon" name="CheckCircle" size={32} color={color} />
                </div>
                <h3 className="font-black text-[#0A1628] text-xl mb-2"><span data-cms-key="careers_pg_1" data-cms-label="H3 Text" data-cms-attr="text">Application Sent!</span></h3>
                <p className="text-[#6B7280] text-sm max-w-xs mx-auto leading-relaxed">
                  Thanks {form.name.split(" ")[0]}! We'll review your application and get back to you within 2–3 business days.
                </p>
                <button onClick={onClose} className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1.5">Full Name <span className="text-red-400">*</span></label>
                    <input name="name" required value={form.name} onChange={handleChange}
                      placeholder="Rahul Sharma" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1.5">Phone <span className="text-red-400">*</span></label>
                    <input name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="+91 98765 43210" className={inputClass} />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Email Address <span className="text-red-400">*</span></label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="you@example.com" className={inputClass} />
                </div>
                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">LinkedIn Profile <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange}
                    placeholder="linkedin.com/in/yourname" className={inputClass} />
                </div>
                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Years of Experience <span className="text-red-400">*</span></label>
                  <select name="experience" required value={form.experience} onChange={handleChange} className={inputClass}>
                    <option value="">Select experience</option>
                    <option>Fresher (0 years)</option>
                    <option>0–1 year</option>
                    <option>1–2 years</option>
                    <option>2–4 years</option>
                    <option>4+ years</option>
                  </select>
                </div>
                {/* CV Upload */}
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Upload CV / Resume <span className="text-red-400">*</span></label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className="w-full rounded-xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center py-6 px-4 text-center"
                    style={{ borderColor: dragging ? color : (cvFile ? `${color}60` : "#E5E7EB"), background: dragging ? `${color}06` : cvFile ? `${color}04` : "#F8FAFF" }}>
                    {cvFile ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}12` }}>
                          <CMSIcon cmsKey="careers_icon_3" cmsLabel="FileText Icon" name="FileText" size={18} color={color} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-[#0A1628]">{cvFile.name}</p>
                          <p className="text-xs text-[#9CA3AF]">{(cvFile.size / 1024).toFixed(0)} KB · <span style={{ color: color }}>Change file</span></p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: `${color}10` }}>
                          <CMSIcon cmsKey="careers_icon_2" cmsLabel="Upload Icon" name="Upload" size={22} color={color} />
                        </div>
                        <p className="text-sm font-bold text-[#0A1628] mb-0.5">Drop your CV here or <span style={{ color: color }}>browse</span></p>
                        <p className="text-xs text-[#9CA3AF]"><span data-cms-key="careers_pg_3" data-cms-label="P Text" data-cms-attr="text">PDF, DOC, DOCX up to 5MB</span></p>
                      </>
                    )}
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                  </div>
                </div>
                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Why do you want this role? <span className="text-red-400">*</span></label>
                  <textarea name="message" required value={form.message} onChange={handleChange} rows={3}
                    placeholder="Tell us a bit about yourself and why you'd be a great fit..."
                    className={inputClass + " resize-none"} />
                </div>
                {/* Captcha + Submit */}
                <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
                {error && <p className="text-xs text-red-500 text-center font-semibold">{error}</p>}
                <button type="submit" disabled={!captchaOk || submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 20px ${color}35` }}>
                  {submitting ? "Submitting…" : <>Submit Application <ArrowRight size={15} /></>}
                </button>
                <p className="text-center text-[10px] text-[#9CA3AF]"><span data-cms-key="careers_pg_4" data-cms-label="P Text" data-cms-attr="text">We respect your privacy. Your data is only used for recruitment purposes.</span></p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const perks = [
  { icon: TrendingUp, iconName: "TrendingUp", color: "#FF6B2B", title: "Real Client Work",     desc: "Work on live campaigns with 750+ real clients. Learn more in 6 months here than 2 years elsewhere." },
  { icon: Users, iconName: "Users",      color: "#7C3AED", title: "Tight-Knit Team",      desc: "Small enough that your work matters. No bureaucracy — just a focused team doing great work together." },
  { icon: Zap, iconName: "Zap",        color: "#1A6FE8", title: "AI-First Mindset",     desc: "From AI-powered SEO to LLM apps — we use the newest tools and we'll make sure you do too." },
  { icon: Heart, iconName: "Heart",      color: "#22C55E", title: "Culture First",         desc: "Equal opportunities, open communication, and a place where dedication is truly recognised." },
  { icon: Shield, iconName: "Shield",     color: "#F59E0B", title: "Stable & Growing",      desc: "10+ years in business, 750+ clients, 2 offices. A company that's been around and isn't slowing down." },
  { icon: Star, iconName: "Star",       color: "#EC4899", title: "Your Voice Matters",    desc: "Flat enough that great ideas from anyone get heard — and actually implemented." },
];

const JOB_COLORS = ["#7C3AED","#FF6B2B","#1A6FE8","#22C55E","#F59E0B","#EC4899","#0EA5E9","#14B8A6"];
const JOB_ICONS = [BarChart3, TrendingUp, Code, Globe2, Briefcase, Star, Zap, Users];

const Careers = () => {
  const [openings, setOpenings] = useState<Record<string, string>[]>([]);
  const [activeJob, setActiveJob] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/careers`)
      .then(r => r.json())
      .then(d => { if (d.data) setOpenings(d.data.filter((j: Record<string, string>) => j.status === 'open')); })
      .catch(() => { setOpenings(STATIC_JOBS as unknown as Record<string, string>[]); });
  }, []);

  return (
  <PageLayout>
    {activeJob && <ApplyModal job={activeJob} color={activeJob._color||"#7C3AED"} onClose={() => setActiveJob(null)} />}

    {/* ── HERO ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#F8FAFF" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 700, height: 700, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-20 pb-24 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
            style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.25)" }}>
            <Sparkles size={12} /> <span data-cms-key="careers_hero_badge" data-cms-label="Hero Badge" data-cms-attr="text">We're Hiring · Ahmedabad</span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black leading-[1.08] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="careers_hero_h1" data-cms-label="Hero Heading" data-cms-attr="text">Do Your Best Work</span><br />
            <span data-cms-key="careers_hl_117" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">at Digital Aura</span>
          </h1>
          <p className="text-[#4B5563] text-lg max-w-2xl mx-auto leading-relaxed mb-10"><span data-cms-key="careers_pg_p_9" data-cms-label="Body Text" data-cms-attr="text">We're a full-service digital agency delivering real growth since 2015. Join a team where your work is seen, your ideas matter, and your career actually moves forward.</span></p>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <a href="#openings" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 8px 24px rgba(255,107,43,0.35)" }}><span data-cms-key="careers_hero_cta" data-cms-label="Primary CTA" data-cms-attr="text">See Open Roles</span> <ArrowRight size={15} />
            </a>
            <a href="mailto:info@thedigitalaura.com?subject=Open Application"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border transition-all"
              style={{ color: "#7C3AED", borderColor: "rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.05)" }}>
              <Mail size={15} /> <span data-cms-key="careers_hero_btn2" data-cms-label="Secondary Button" data-cms-attr="text">Send Open Application</span>
            </a>
          </div>
          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { n: "10+",  l: "Years in Business", color: "#FF6B2B" },
              { n: "10+",  l: "Team Members",       color: "#7C3AED" },
              { n: "750+", l: "Happy Clients",      color: "#1A6FE8" },
              { n: "2",    l: "Office Locations",   color: "#22C55E" },
            ].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl py-5 px-4 text-center bg-white border"
                style={{ borderColor: `${s.color}20`, boxShadow: `0 4px 16px ${s.color}0a` }}>
                <div className="text-3xl font-black mb-1" style={{ color: s.color }}><span data-cms-key={`careers_stat_${i}_n`} data-cms-label="Stat Number" data-cms-attr="text">{s.n}</span></div>
                <div className="text-xs text-[#6B7280] font-medium"><span data-cms-key={`careers_stat_${i}_l`} data-cms-label="Stat Label" data-cms-attr="text">{s.l}</span></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── WHY JOIN ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="careers_pg_badge_7" data-cms-label="Section Badge" data-cms-attr="text">Life at Digital Aura</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight">
            <span data-cms-key="careers_life_h2" data-cms-label="Life Section Heading" data-cms-attr="text">Why People Love</span> <span data-cms-key="careers_hl_118" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Working Here</span>
          </h2>
          <p className="text-[#6B7280] mt-4 max-w-xl mx-auto text-sm"><span data-cms-key="careers_pg_5" data-cms-label="P Text" data-cms-attr="text">We're not just a workplace — we're a place where careers are built.</span></p>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {perks.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-7 bg-white border card-hover relative overflow-hidden"
              style={{ borderColor: `${p.color}18`, boxShadow: `0 4px 24px ${p.color}08` }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${p.color}12` }}>
                <CMSIcon cmsKey={`careers_dyn_100_${p.iconName||'icon'}`} cmsLabel={"Icon"} name={p.iconName || "Star"} size={22} color={p.color} />
              </div>
              <h3 className="font-black text-[#0A1628] text-base mb-2"><span data-cms-key={`careers_perk_${i}_t`} data-cms-label="Perk Title" data-cms-attr="text">{p.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`careers_perk_${i}_d`} data-cms-label="Perk Description" data-cms-attr="text">{p.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CULTURE STRIP ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a1040 100%)", boxShadow: "0 24px 60px rgba(124,58,237,0.18)" }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,107,43,0.12) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
          <div className="grid md:grid-cols-2 gap-0 relative z-10">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5 w-fit"
                style={{ background: "rgba(255,107,43,0.15)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.25)" }}>
                <span data-cms-key="careers_culture_badge" data-cms-label="Culture Badge" data-cms-attr="text">Our Culture</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight"><span data-cms-key="careers_side_h2" data-cms-label="Side Card Heading" data-cms-attr="text">"Equal Opportunities.<br />Sheer Dedication."</span></h2>
              <p className="text-[#94a3b8] text-sm leading-relaxed"><span data-cms-key="careers_pg_p_10" data-cms-label="Body Text" data-cms-attr="text">Our doors are always open to individuals with the right attitude. We believe in growing together — not just as a company, but as people.</span></p>
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {[
                "We don't do cookie-cutter work — ever.",
                "Every team member's growth is our growth.",
                "Open doors, honest conversations always.",
                "Work hard, ship fast, learn continuously.",
              ].map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3">
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#22C55E" }} />
                  <span className="text-sm text-[#CBD5E1] leading-relaxed"><span data-cms-key={`careers_val_${i}`} data-cms-label="Culture Value" data-cms-attr="text">{v}</span></span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── OPEN ROLES ── */}
    <section id="openings" className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="careers_pg_badge_8" data-cms-label="Section Badge" data-cms-attr="text">Open Positions</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight">
            <span data-cms-key="careers_jobs_h2" data-cms-label="Jobs Heading" data-cms-attr="text">Current</span> <span data-cms-key="careers_hl_119" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Openings</span>
          </h2>
          <p className="text-[#6B7280] mt-4 text-sm max-w-lg mx-auto"><span data-cms-key="careers_pg_6" data-cms-label="P Text" data-cms-attr="text">Based in Ahmedabad. Freshers welcome on select roles — attitude matters more than a resume.</span></p>
        </motion.div>
        <div className="space-y-4">
          {openings.length === 0 && (
            <p className="text-center text-[#9CA3AF] py-12"><span data-cms-key="careers_pg_p_11" data-cms-label="Body Text" data-cms-attr="text">No open positions right now. Check back soon!</span></p>
          )}
          {openings.map((job, i) => {
            const color = JOB_COLORS[i % JOB_COLORS.length];
            const Icon = JOB_ICONS[i % JOB_ICONS.length];
            let skills: string[] = [];
            if (Array.isArray(job.skills)) skills = job.skills as unknown as string[];
            else try { skills = JSON.parse(job.skills || '[]'); } catch { skills = []; }
            return (
            <motion.div key={job.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="group rounded-2xl bg-white border overflow-hidden card-hover"
              style={{ borderColor: `${color}20`, boxShadow: `0 2px 16px ${color}06` }}>
              <div className="flex items-stretch">
                <div className="w-1.5 shrink-0 transition-all duration-300 group-hover:w-2" style={{ background: `linear-gradient(to bottom, ${color}, ${color}88)` }} />
                <div className="flex-1 p-6 md:p-7">
                  <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                      <Icon size={24} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-black text-[#0A1628] text-lg">{job.title}</h3>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: `${color}12`, color }}>{job.department}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-[#9CA3AF] mb-3">
                        <span className="flex items-center gap-1.5"><MapPin size={11} style={{ color }} /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={11} style={{ color }} /> {job.type}</span>
                        <span className="flex items-center gap-1.5"><Star size={11} style={{ color }} /> {job.experience} exp</span>
                      </div>
                      <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{job.description?.replace(/<[^>]*>/g, ' ').replace(/\s+/g,' ').trim().slice(0,180)}...</p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s:string) => (
                          <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: `${color}08`, color, border: `1px solid ${color}20` }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0 self-start md:self-center">
                      <Link to={`/careers/${job.slug || job.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all hover:gap-3"
                        style={{ borderColor: `${color}40`, color }}>
                        View Details <ArrowRight size={13} />
                      </Link>
                      <Link to={`/careers/${job.slug || job.id}#apply`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 4px 16px ${color}35` }}>
                        Apply Now <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── NO ROLE / OPEN APP ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 border flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden"
          style={{ background: "#F8FAFF", borderColor: "#E5E7EB" }}>
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <h3 className="font-black text-[#0A1628] text-2xl mb-3"><span data-cms-key="careers_pg_2" data-cms-label="H3 Text" data-cms-attr="text">Don't See the Right Role?</span></h3>
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-md"><span data-cms-key="careers_pg_p_12" data-cms-label="Body Text" data-cms-attr="text">We're always open to exceptional people. Send us your resume with a note on what you do best — we'll reach out when something fits.</span></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
            <a href="mailto:info@thedigitalaura.com?subject=Open Application"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.3)" }}>
              <Mail size={15} /> <span data-cms-key="careers_resume_btn" data-cms-label="Send Resume Button" data-cms-attr="text">Send Your Resume</span>
            </a>
            <a href="tel:+918141200284"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border transition-all"
              style={{ color: "#7C3AED", borderColor: "rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.05)" }}>
              <Phone size={15} /> +91 81412 00284
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
            style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
            <span data-cms-key="careers_cta_badge" data-cms-label="CTA Badge" data-cms-attr="text">Join the Team</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="careers_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to</span> <span data-cms-key="careers_hl_120" data-cms-label="CTA Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Build Something</span> <span data-cms-key="careers_cta_h2b" data-cms-label="CTA Heading End" data-cms-attr="text">Great?</span></h2>
          <p className="text-[#94a3b8] mb-8 text-sm leading-relaxed max-w-lg mx-auto"><span data-cms-key="careers_pg_p_13" data-cms-label="Body Text" data-cms-attr="text">Explore the roles above or drop us a direct message. We reply to every application.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            <span data-cms-key="careers_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Get In Touch</span> <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>

  </PageLayout>
  );
};

export default Careers;
