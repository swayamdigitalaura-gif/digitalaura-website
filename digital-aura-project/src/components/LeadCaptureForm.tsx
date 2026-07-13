import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";
import MathCaptcha from "@/components/MathCaptcha";

const challenges = [
  "I need a website or app built",
  "I need AI automation",
  "I need more leads & traffic",
  "I need eCommerce development",
  "I need social media & ads",
  "I need a complete digital solution",
];

const benefits = [
  "Website & App Opportunity Audit",
  "AI Automation Assessment",
  "Digital Marketing Roadmap",
  "Custom Solution Blueprint",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#FF6B2B] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const LeadCaptureForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", website: "", challenge: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Bold gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FF6B2B 0%, #e8501a 40%, #0A1628 100%)",
        }}
      />
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
      {/* Top white fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT: value prop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-6">
              Get Your Free
              <br />
              Strategy Session
            </h2>

            <div className="space-y-3 mb-8">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-white font-medium">{b}</span>
                </div>
              ))}
            </div>

            {/* Floating mini testimonial */}
            <div
              className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF6B2B] font-bold text-xs shrink-0">
                AR
              </div>
              <div>
                <p className="text-white text-xs italic">"Our web service was live in 6 weeks, saved 20 hrs/week!"</p>
                <p className="text-white/70 text-[10px] mt-0.5">,  Amit R., eCommerce Founder</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div
              className="rounded-2xl p-8 bg-white border border-white/50"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(34,197,94,0.1)" }}
                  >
                    <CheckCircle2 size={32} className="text-[#22C55E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="lead_h3_1" data-cms-label="Card Heading" data-cms-attr="text">You're All Set!</span></h3>
                  <p className="text-[#6B7280]"><span data-cms-key="lead_p_3" data-cms-label="Body Text" data-cms-attr="text">We'll review your details and reach out within 24 hours with your free strategy session.</span></p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-[#0A1628] mb-5"><span data-cms-key="lead_h3_2" data-cms-label="Card Heading" data-cms-attr="text">Book Your Free Strategy Session</span></h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange}
                        placeholder="John Smith" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Business Name *</label>
                      <input name="business" required value={form.business} onChange={handleChange}
                        placeholder="Your Company" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="you@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone Number *</label>
                      <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                        placeholder="+91 81412 00284" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Website URL</label>
                    <input type="url" name="website" value={form.website} onChange={handleChange}
                      placeholder="https://yourwebsite.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#374151] mb-1.5 block">What Do You Need? *</label>
                    <select name="challenge" required value={form.challenge} onChange={handleChange}
                      className={inputClass + " cursor-pointer"}>
                      <option value="" disabled>Select your need...</option>
                      {challenges.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
                  <button type="submit" disabled={!captchaOk} className="btn-orange w-full py-4 text-base gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    Claim My Free Strategy Session <ArrowRight size={18} />
                  </button>
                  <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
                    <Lock size={12} /> Your information is 100% secure and never shared
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
