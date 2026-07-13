import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const CHECKLIST = [
  "Google Ads Audit",
  "Conversion Tracking Audit",
  "Landing Page Audit",
  "Google Analytics 4 Audit",
  "Google Tag Manager Audit",
  "Competitor PPC Analysis",
  "Keyword Opportunity Analysis",
  "Performance Growth Roadmap",
];

export function AuditForm({ id = "audit", compact = false }: { id?: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("company"),
          message: fd.get("website") || "",
          project: "Google Ads",
          source: "google-ads-agency-ahmedabad",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id={id}
      className={`relative overflow-hidden rounded-3xl border border-border bg-surface shadow-elevated border-glow-hover ${
        compact ? "p-5 md:p-6" : "p-6 md:p-8"
      }`}
    >
      <div className="absolute top-0 right-0 bg-primary-soft border-l border-b border-primary/10 px-4.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-primary rounded-bl-2xl">
        Worth ₹15,000 · <span className="text-primary font-black">FREE</span>
      </div>
      <h3 className="font-display text-xl font-bold text-navy">Request Your Free Google Ads Audit</h3>
      <p className="text-xs text-muted-foreground mt-1">
        Get a Google Ads account tear-down and 90-day action plan from a senior strategist.
      </p>

      {sent ? (
        <div className="mt-5 rounded-2xl bg-primary-soft p-5 text-center border border-primary/20">
          <div className="mx-auto mb-2.5 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-md">
            <Check className="size-6" strokeWidth={3} />
          </div>
          <p className="font-semibold text-navy">Audit requested successfully</p>
          <p className="text-sm text-muted-foreground mt-1">We will review your account and contact you within 2 business hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={compact ? "mt-4 space-y-2.5" : "mt-5 space-y-3"}>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text" name="name" required placeholder="Name"
              className={`w-full rounded-xl border border-input bg-background px-3 text-sm text-navy outline-none ring-primary/20 transition focus:border-primary focus:ring-4 ${compact ? "h-10" : "h-11"}`}
            />
            <input
              type="text" name="company" required placeholder="Company Name"
              className={`w-full rounded-xl border border-input bg-background px-3 text-sm text-navy outline-none ring-primary/20 transition focus:border-primary focus:ring-4 ${compact ? "h-10" : "h-11"}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text" name="website" required placeholder="Website URL"
              className={`w-full rounded-xl border border-input bg-background px-3 text-sm text-navy outline-none ring-primary/20 transition focus:border-primary focus:ring-4 ${compact ? "h-10" : "h-11"}`}
            />
            <input
              type="tel" name="phone" required placeholder="Phone (WhatsApp)"
              className={`w-full rounded-xl border border-input bg-background px-3 text-sm text-navy outline-none ring-primary/20 transition focus:border-primary focus:ring-4 ${compact ? "h-10" : "h-11"}`}
            />
          </div>
          <input
            type="email" name="email" required placeholder="Business Email"
            className={`w-full rounded-xl border border-input bg-background px-3 text-sm text-navy outline-none ring-primary/20 transition focus:border-primary focus:ring-4 ${compact ? "h-10" : "h-11"}`}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit" disabled={loading}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md hover-btn-glow disabled:opacity-60 ${compact ? "py-3" : "py-3.5"}`}
          >
            {loading ? "Submitting…" : <>Claim My Free Roadmap & Audit <ArrowRight className="size-4" /></>}
          </button>

          {!compact && (
            <div className="pt-3 border-t border-border mt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-navy/60 mb-2">Audit inclusions:</p>
              <div className="grid grid-cols-2 gap-2">
                {CHECKLIST.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[11px] font-semibold text-navy/80">
                    <Check className="size-3 text-primary shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
