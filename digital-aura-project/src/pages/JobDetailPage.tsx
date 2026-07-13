import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import MathCaptcha from "@/components/MathCaptcha";
import { STATIC_JOBS } from "@/data/jobs";
import {
  ArrowLeft, MapPin, Clock, Star, Briefcase, CheckCircle2,
  ArrowRight, Send, Upload, FileText, ChevronRight,
  Globe, Users, DollarSign, Calendar, Gift, ListChecks,
} from "lucide-react";

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#FF6B2B] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";
const ACCENT = "#FF6B2B";

type Job = Record<string, string>;

const ApplyForm = ({ job, color }: { job: Job; color: string }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", linkedin: "", experience: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [captchaOk, setCaptchaOk] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = (file: File) => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx")))
      setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setApplyError("");
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
      setApplyError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-8 rounded-2xl border bg-white"
      style={{ borderColor: `${color}20`, boxShadow: `0 8px 40px ${color}12` }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: `${color}12` }}>
        <CheckCircle2 size={40} style={{ color }} />
      </div>
      <h3 className="font-black text-[#0A1628] text-2xl mb-3">Application Sent!</h3>
      <p className="text-[#6B7280] max-w-sm mx-auto leading-relaxed">
        Thanks {form.name.split(" ")[0]}! We'll review your application and get back to you within 2–3 business days.
      </p>
      <Link to="/careers" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-white font-bold text-sm"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
        <ArrowLeft size={14} /> Back to Careers
      </Link>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-white p-8 space-y-5"
      style={{ borderColor: `${color}20`, boxShadow: `0 8px 40px ${color}10` }}>
      <div className="h-1 w-full rounded-full mb-2" style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }} />
      <h3 className="font-black text-[#0A1628] text-xl">Apply for this Role</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#374151] mb-1.5">Full Name <span className="text-red-400">*</span></label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#374151] mb-1.5">Phone <span className="text-red-400">*</span></label>
          <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#374151] mb-1.5">Email Address <span className="text-red-400">*</span></label>
        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#374151] mb-1.5">LinkedIn Profile <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" className={inputClass} />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#374151] mb-1.5">Years of Experience <span className="text-red-400">*</span></label>
        <select name="experience" required value={form.experience} onChange={handleChange} className={inputClass + " cursor-pointer"}>
          <option value="" disabled>Select experience...</option>
          <option>Fresher (0–1 yr)</option>
          <option>1–2 years</option>
          <option>2–4 years</option>
          <option>4–6 years</option>
          <option>6+ years</option>
        </select>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-xs font-bold text-[#374151] mb-1.5">Upload CV <span className="text-red-400">*</span></label>
        <div
          onClick={() => document.getElementById("cv-upload")?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          className="w-full rounded-xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center py-6 px-4 text-center"
          style={{ borderColor: dragging ? color : cvFile ? `${color}60` : "#E5E7EB", background: dragging ? `${color}06` : cvFile ? `${color}04` : "#F8FAFF" }}>
          {cvFile ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}12` }}>
                <FileText size={18} style={{ color }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0A1628]">{cvFile.name}</p>
                <p className="text-xs text-[#9CA3AF]">{(cvFile.size / 1024).toFixed(0)} KB · <span style={{ color }}>Change file</span></p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: `${color}10` }}>
                <Upload size={22} style={{ color }} />
              </div>
              <p className="text-sm font-bold text-[#0A1628] mb-0.5">Drop your CV here or <span style={{ color }}>browse</span></p>
              <p className="text-xs text-[#9CA3AF]">PDF, DOC, DOCX up to 5MB</p>
            </>
          )}
          <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#374151] mb-1.5">Why do you want this role? <span className="text-red-400">*</span></label>
        <textarea name="message" required value={form.message} onChange={handleChange} rows={4}
          placeholder="Tell us a bit about yourself and why you'd be a great fit..."
          className={inputClass + " resize-none"} />
      </div>

      <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />

      {applyError && <p className="text-xs text-red-500 text-center font-semibold">{applyError}</p>}
      <button type="submit" disabled={!captchaOk || submitting}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 20px ${color}35` }}>
        {submitting ? "Submitting…" : <>Submit Application <Send size={15} /></>}
      </button>
      <p className="text-center text-[10px] text-[#9CA3AF]">We respect your privacy. Your data is only used for recruitment purposes.</p>
    </form>
  );
};

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Job[]>([]);

  const color = "#FF6B2B";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/careers`)
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          const all = d.data.filter((j: Job) => j.status === "open");
          const found = all.find((j: Job) => String(j.id) === id || j.slug === id);
          if (found) {
            setJob(found);
            setRelated(all.filter((j: Job) => j.id !== found.id).slice(0, 3));
          }
        }
        setLoading(false);
      })
      .catch(() => {
        const all = STATIC_JOBS;
        const found = all.find(j => j.id === id || j.slug === id);
        if (found) {
          setJob(found as unknown as Job);
          setRelated(all.filter(j => j.id !== found.id).slice(0, 3) as unknown as Job[]);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <div className="w-10 h-10 rounded-full border-4 border-[#FF6B2B] border-t-transparent animate-spin" />
      </div>
    </PageLayout>
  );

  if (!job) return (
    <PageLayout>
      <div className="min-h-screen flex flex-col items-center justify-center pt-[72px] gap-4">
        <h2 className="text-2xl font-black text-[#0A1628]">Job not found</h2>
        <Link to="/careers" className="btn-orange px-6 py-3 text-sm gap-2 inline-flex items-center">
          <ArrowLeft size={14} /> Back to Careers
        </Link>
      </div>
    </PageLayout>
  );

  const parseArr = (val: unknown): string[] => {
    if (Array.isArray(val)) return val;
    try { return JSON.parse(val as string || "[]"); } catch { return []; }
  };
  const skills = parseArr(job.skills);
  const responsibilities = parseArr(job.responsibilities);
  const requirements = parseArr(job.requirements);
  const benefits = parseArr(job.benefits);
  const interviewProcess = parseArr(job.interview_process);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-[72px] pb-12 px-4 md:px-8 relative overflow-hidden" style={{ background: "#F8FAFF" }}>
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 pt-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-8">
            <Link to="/" className="hover:text-[#FF6B2B] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/careers" className="hover:text-[#FF6B2B] transition-colors">Careers</Link>
            <ChevronRight size={12} />
            <span className="text-[#0A1628] font-semibold truncate">{job.title}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${color}12`, color }}>{job.department}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#22C55E12] text-[#22C55E] border border-[#22C55E20]">
                Now Hiring
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight mb-5">{job.title}</h1>
            <div className="flex flex-wrap gap-5 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5"><MapPin size={14} style={{ color }} /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} style={{ color }} /> {job.type}</span>
              <span className="flex items-center gap-1.5"><Star size={14} style={{ color }} /> {job.experience} experience</span>
              <span className="flex items-center gap-1.5"><Briefcase size={14} style={{ color }} /> {job.department}</span>
              {job.work_mode && <span className="flex items-center gap-1.5"><Globe size={14} style={{ color }} /> {job.work_mode}</span>}
              {job.openings && <span className="flex items-center gap-1.5"><Users size={14} style={{ color }} /> {job.openings} opening{Number(job.openings) > 1 ? 's' : ''}</span>}
              {job.salary_range && <span className="flex items-center gap-1.5"><DollarSign size={14} style={{ color }} /> {job.salary_range}</span>}
              {job.deadline && <span className="flex items-center gap-1.5"><Calendar size={14} style={{ color }} /> Apply by {new Date(job.deadline).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Left: Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            {job.description && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-black text-[#0A1628] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full" style={{ background: color }} /> About the Role
                </h2>
                <div className="text-[#4B5563] leading-relaxed text-sm [&_h3]:font-bold [&_h3]:text-[#0A1628] [&_h3]:mt-5 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-[#0A1628]" dangerouslySetInnerHTML={{ __html: job.description }} />
              </motion.div>
            )}

            {/* Responsibilities */}
            {responsibilities.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-black text-[#0A1628] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full" style={{ background: color }} /> Responsibilities
                </h2>
                <ul className="space-y-3">
                  {responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color }} />
                      <span className="text-sm text-[#4B5563] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-black text-[#0A1628] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full" style={{ background: "#7C3AED" }} /> Requirements
                </h2>
                <ul className="space-y-3">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#7C3AED" }} />
                      <span className="text-sm text-[#4B5563] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-black text-[#0A1628] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full" style={{ background: "#1A6FE8" }} /> Skills & Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s: string) => (
                    <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                      style={{ background: "rgba(26,111,232,0.06)", color: "#1A6FE8", borderColor: "rgba(26,111,232,0.2)" }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-black text-[#0A1628] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full" style={{ background: "#22C55E" }} /> Benefits & Perks
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                      style={{ background: "rgba(34,197,94,0.04)", borderColor: "rgba(34,197,94,0.2)" }}>
                      <Gift size={15} className="shrink-0" style={{ color: "#22C55E" }} />
                      <span className="text-sm text-[#374151]">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Interview Process */}
            {interviewProcess.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-black text-[#0A1628] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full" style={{ background: "#F59E0B" }} /> Interview Process
                </h2>
                <div className="flex flex-col gap-3">
                  {interviewProcess.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-black text-white"
                        style={{ background: i === interviewProcess.length - 1 ? "#22C55E" : "#F59E0B" }}>{i + 1}</div>
                      {i < interviewProcess.length - 1 && <div className="absolute ml-4 mt-8 w-0.5 h-3 bg-[#E5E7EB]" />}
                      <span className="text-sm text-[#374151] font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Apply Form */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="apply">
              <ApplyForm job={job} color={color} />
            </motion.div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply CTA */}
            <div className="rounded-2xl p-6 border sticky top-24"
              style={{ borderColor: `${color}20`, background: "#fff", boxShadow: `0 4px 24px ${color}10` }}>
              <div className="h-1 w-full rounded-full mb-5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
              <h3 className="font-black text-[#0A1628] text-lg mb-2">{job.title}</h3>
              <div className="space-y-2 mb-5">
                <p className="text-xs text-[#6B7280] flex items-center gap-2"><MapPin size={12} style={{ color }} /> {job.location}</p>
                <p className="text-xs text-[#6B7280] flex items-center gap-2"><Clock size={12} style={{ color }} /> {job.type}</p>
                <p className="text-xs text-[#6B7280] flex items-center gap-2"><Star size={12} style={{ color }} /> {job.experience}</p>
                {job.work_mode && <p className="text-xs text-[#6B7280] flex items-center gap-2"><Globe size={12} style={{ color }} /> {job.work_mode}</p>}
                {job.salary_range && <p className="text-xs text-[#6B7280] flex items-center gap-2"><DollarSign size={12} style={{ color }} /> {job.salary_range}</p>}
                {job.openings && <p className="text-xs text-[#6B7280] flex items-center gap-2"><Users size={12} style={{ color }} /> {job.openings} opening{Number(job.openings) > 1 ? 's' : ''}</p>}
                {job.deadline && <p className="text-xs text-[#6B7280] flex items-center gap-2"><Calendar size={12} style={{ color }} /> Deadline: {new Date(job.deadline).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</p>}
              </div>
              <a href="#apply"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 20px ${color}35` }}>
                Apply Now <ArrowRight size={14} />
              </a>
              <Link to="/careers"
                className="w-full flex items-center justify-center gap-2 py-3 mt-3 rounded-xl font-semibold text-sm border transition-all hover:border-[#FF6B2B] hover:text-[#FF6B2B]"
                style={{ borderColor: "#E5E7EB", color: "#6B7280" }}>
                <ArrowLeft size={13} /> All Openings
              </Link>
            </div>

            {/* Related Jobs */}
            {related.length > 0 && (
              <div className="rounded-2xl p-6 border" style={{ borderColor: "#E5E7EB" }}>
                <h3 className="font-black text-[#0A1628] text-base mb-4">Other Openings</h3>
                <div className="space-y-3">
                  {related.map((j, i) => (
                    <Link key={i} to={`/careers/${j.slug || j.id}`}
                      className="block p-3 rounded-xl border hover:border-[#FF6B2B] transition-all group"
                      style={{ borderColor: "#E5E7EB" }}>
                      <p className="text-sm font-bold text-[#0A1628] group-hover:text-[#FF6B2B] transition-colors">{j.title}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{j.location} · {j.type}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default JobDetailPage;
