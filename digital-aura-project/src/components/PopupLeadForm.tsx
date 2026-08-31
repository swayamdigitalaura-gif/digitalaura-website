import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import MathCaptcha from "@/components/MathCaptcha";

const SESSION_KEY = "da_popup_shown";
// FloatingElements.tsx's cookie banner (the one actually mounted in the app)
// tags its root node with this attribute. "Decline" hides the banner without
// writing to storage, so presence in the DOM — not a storage key — is the
// only reliable signal that it's been resolved either way.
const COOKIE_BANNER_SELECTOR = "[data-cookie-banner]";
const DELAY_MS = 18000;
const COOKIE_BANNER_RECHECK_MS = 1500;

const services = [
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Website & App Development",
  "AI Automation",
  "Not sure yet",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#FF6B2B] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const PopupLeadForm = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [captchaOk, setCaptchaOk] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    service: "",
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownRef = useRef(false);

  const reveal = useCallback(() => {
    if (shownRef.current) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    // The cookie-consent banner docks to the same bottom edge as the mobile
    // bottom-sheet popup. Wait for it to be resolved (Accept OR Decline —
    // both remove it from the DOM) so the two never stack.
    if (document.querySelector(COOKIE_BANNER_SELECTOR)) {
      timerRef.current = setTimeout(reveal, COOKIE_BANNER_RECHECK_MS);
      return;
    }
    shownRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    timerRef.current = setTimeout(reveal, DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reveal]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          project: form.service,
          message: "",
          source: "popup-lead-form",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSubmitted(true);
    } catch (err: unknown) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center sm:p-4 bg-[#0A1628]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-lead-title"
            className="relative w-full sm:max-w-md bg-white sm:rounded-2xl rounded-t-3xl p-6 sm:p-7 self-end sm:self-center max-h-[92vh] supports-[height:100dvh]:max-h-[92dvh] overflow-y-auto overscroll-contain"
            style={{
              boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
              paddingBottom: "max(1.75rem, calc(env(safe-area-inset-bottom) + 1rem))",
              WebkitOverflowScrolling: "touch",
            }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            {/* mobile drag handle */}
            <div className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-9 h-1 rounded-full bg-[#E5E7EB]" />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#E5E7EB] bg-[#F8FAFF] flex items-center justify-center text-[#6B7280] hover:text-[#0A1628] hover:border-[#9CA3AF] transition-colors"
            >
              <X size={14} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(34,197,94,0.1)" }}
                >
                  <CheckCircle2 size={32} className="text-[#22C55E]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-2">Got It — Thanks!</h3>
                <p className="text-[#6B7280]">
                  Our team will WhatsApp you shortly with your free growth plan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFEDE0] text-[#FF6B2B] text-[11px] font-semibold tracking-wide uppercase mb-1">
                  Free Growth Plan
                </span>
                <h3 id="popup-lead-title" className="text-2xl font-bold text-[#0A1628] leading-tight">
                  Get Your Free Growth Plan
                </h3>
                <p className="text-sm text-[#6B7280] mb-1">
                  Tell us about your business — a strategist reviews it and replies on WhatsApp
                  within 24 hours.
                </p>

                <div>
                  <label className="text-xs font-semibold text-[#374151] mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#374151] mb-1.5 block">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#374151] mb-1.5 block">
                      Company Name
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your business"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#374151] mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@business.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#374151] mb-1.5 block">
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass + " cursor-pointer"}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />

                {formError && (
                  <p className="text-xs text-red-500 text-center">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={!captchaOk || submitting}
                  className="btn-orange w-full py-3.5 text-sm gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Get My Free Growth Plan"}
                  <ArrowRight size={16} />
                </button>

                <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
                  <Lock size={12} /> No spam. We reply within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupLeadForm;
