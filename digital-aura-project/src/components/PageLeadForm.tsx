/**
 * Inline lead form for the service / audit / pricing pages (LocalServicePage `leadForm`).
 * Posts to /api/contact through submitLead (honeypot + math captcha, same as the other forms).
 * The website field is what "enter your website for the audit" refers to.
 */
import { useState, useCallback } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import MathCaptcha from "@/components/MathCaptcha";
import { submitLead } from "@/lib/submitLead";

export interface LeadFormConfig {
  /** Short id used as the CRM `source`, e.g. "free-seo-audit". */
  formName: string;
  /** Service label saved with the lead (shown to the team as "Service"). */
  service: string;
  heading: string;
  text?: string;
  /** "required" for audits, "optional" for quotes, "none" to hide. */
  website: "required" | "optional" | "none";
  /** Label of the optional free-text box. */
  notesLabel?: string;
  notesPlaceholder?: string;
  /** Show the business/clinic/company name field (default true). */
  business?: boolean;
  /** Show a city field (default true). */
  city?: boolean;
  /** Optional "top competitor website" field (blueprint seo-04). */
  competitor?: boolean;
  /** Optional business-type dropdown. */
  businessTypes?: string[];
  submitLabel: string;
  successText?: string;
  /** DOM id so hero buttons can link to #id (default "audit-form"). */
  id?: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

/** Accepts "example.com", "www.example.com/page" or a full URL; returns a clean https URL or null. */
export function normaliseWebsite(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withProto);
    if (!u.hostname.includes(".") || /\s/.test(v)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

const PageLeadForm = ({ cfg, accent }: { cfg: LeadFormConfig; accent: string }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "", business: "", city: "", competitor: "", businessType: "", notes: "", hp: "" });
  const [captchaOk, setCaptchaOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const onVerify = useCallback((v: boolean) => setCaptchaOk(v), []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    let site: string | null = null;
    if (cfg.website !== "none") {
      site = normaliseWebsite(form.website);
      if (cfg.website === "required" && !site) return setError("Please enter your website address, for example yourbusiness.com");
      if (form.website.trim() && !site) return setError("That website address does not look right. Example: yourbusiness.com");
    }
    if (!captchaOk) return setError("Please answer the verification question.");
    setBusy(true);
    const lines = [
      site ? `Website: ${site}` : "",
      form.city ? `City: ${form.city}` : "",
      form.businessType ? `Business type: ${form.businessType}` : "",
      form.competitor ? `Top competitor: ${form.competitor}` : "",
      form.notes ? `Notes: ${form.notes}` : "",
      `Page: ${window.location.pathname}`,
    ].filter(Boolean);
    const res = await submitLead(
      { name: form.name, email: form.email, phone: form.phone, company: form.business, project: cfg.service, message: lines.join("\n"), honeypot: form.hp },
      cfg.formName,
    );
    setBusy(false);
    if (res.ok) setDone(true);
    else setError(res.error || "Something went wrong. Please try again.");
  };

  return (
    <section id={cfg.id || "audit-form"} className="py-16 px-4 md:px-8 bg-white scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] tracking-tight leading-tight">{cfg.heading}</h2>
          {cfg.text && <p className="mt-3 text-[#4B5563] leading-relaxed">{cfg.text}</p>}
        </div>
        <div className="rounded-2xl border p-6 md:p-8 shadow-sm" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
          {done ? (
            <div className="text-center py-6" role="status">
              <CheckCircle2 className="mx-auto mb-3" size={40} color={accent} />
              <p className="text-xl font-bold text-[#0A1628]">Request received</p>
              <p className="mt-2 text-[#4B5563]">{cfg.successText || "Thank you. We have your details and will reply by email."}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              {cfg.website !== "none" && (
                <div>
                  <label htmlFor="plf-website" className="block text-sm font-semibold text-[#0A1628] mb-1.5">
                    Your website {cfg.website === "required" ? "*" : "(optional)"}
                  </label>
                  <input id="plf-website" name="website" type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.com"
                    value={form.website} onChange={set("website")} className={inputClass} style={{ ["--tw-ring-color" as string]: accent }} />
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="plf-name" className="block text-sm font-semibold text-[#0A1628] mb-1.5">Your name *</label>
                  <input id="plf-name" name="name" required autoComplete="name" value={form.name} onChange={set("name")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="plf-email" className="block text-sm font-semibold text-[#0A1628] mb-1.5">Email *</label>
                  <input id="plf-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="plf-phone" className="block text-sm font-semibold text-[#0A1628] mb-1.5">Phone or WhatsApp</label>
                  <input id="plf-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} className={inputClass} />
                </div>
                {cfg.business !== false && (
                  <div>
                    <label htmlFor="plf-business" className="block text-sm font-semibold text-[#0A1628] mb-1.5">Business name</label>
                    <input id="plf-business" name="business" autoComplete="organization" value={form.business} onChange={set("business")} className={inputClass} />
                  </div>
                )}
                {cfg.city !== false && (
                  <div>
                    <label htmlFor="plf-city" className="block text-sm font-semibold text-[#0A1628] mb-1.5">City</label>
                    <input id="plf-city" name="city" autoComplete="address-level2" value={form.city} onChange={set("city")} className={inputClass} />
                  </div>
                )}
              </div>
              {(cfg.businessTypes || cfg.competitor) && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {cfg.businessTypes && (
                    <div>
                      <label htmlFor="plf-btype" className="block text-sm font-semibold text-[#0A1628] mb-1.5">Business type</label>
                      <select id="plf-btype" name="businessType" value={form.businessType} onChange={set("businessType")} className={inputClass}>
                        <option value="">Select</option>
                        {cfg.businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  )}
                  {cfg.competitor && (
                    <div>
                      <label htmlFor="plf-comp" className="block text-sm font-semibold text-[#0A1628] mb-1.5">Top competitor website (optional)</label>
                      <input id="plf-comp" name="competitor" value={form.competitor} onChange={set("competitor")} placeholder="competitor.com" className={inputClass} />
                    </div>
                  )}
                </div>
              )}
              <div>
                <label htmlFor="plf-notes" className="block text-sm font-semibold text-[#0A1628] mb-1.5">{cfg.notesLabel || "Anything we should know? (optional)"}</label>
                <textarea id="plf-notes" name="notes" rows={3} placeholder={cfg.notesPlaceholder} value={form.notes} onChange={set("notes")} className={inputClass} />
              </div>
              {/* Honeypot: hidden from people, bots fill it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                <label>Leave this empty<input tabIndex={-1} autoComplete="off" name="company_site" value={form.hp} onChange={set("hp")} /></label>
              </div>
              <MathCaptcha onVerify={onVerify} inputClass={inputClass} />
              {error && <p role="alert" className="text-sm font-semibold text-[#DC2626]">{error}</p>}
              <button type="submit" disabled={busy} className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all disabled:opacity-60"
                style={{ background: accent, boxShadow: `0 8px 24px ${accent}40` }}>
                {busy ? "Sending..." : cfg.submitLabel}
              </button>
              <p className="flex items-center gap-1.5 text-xs text-[#6B7280]"><Lock size={12} /> We use your details only to reply to this request. See our <a href="/privacy-policy/" className="underline">privacy policy</a>.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageLeadForm;
