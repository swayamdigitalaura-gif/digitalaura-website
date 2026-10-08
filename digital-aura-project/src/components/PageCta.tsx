/**
 * Conversion (CRO) building blocks for the service / audit / pricing pages:
 * sticky mobile bar, mid-page CTA band and "jump to" links. All fire dataLayer events via track().
 */
import { useEffect, useState } from "react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { track, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/track";

interface CtaProps {
  accent: string;
  label: string;
  /** Hash link to the on-page form, e.g. "#audit-form". */
  href: string;
  /** Used for the pre-filled WhatsApp message. */
  topic: string;
}

export const StickyCtaBar = ({ accent, label, href, topic }: CtaProps) => {
  // Hide the bar while the form it points to is on screen, so it never duplicates the form's own button.
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById(href.replace(/^#/, ""));
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [href]);
  return (
  <div data-sticky-cta className={`md:hidden ${formVisible ? "hidden" : ""} fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pl-3 pr-[88px] py-2.5 flex gap-2`} style={{ borderColor: "#E5E7EB" }}>
    <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "sticky_bar" })} aria-label={`Call ${PHONE_DISPLAY}`}
      className="shrink-0 w-11 h-11 rounded-full border flex items-center justify-center" style={{ borderColor: accent, color: accent }}>
      <Phone size={18} />
    </a>
    <a href={href} onClick={() => track("cta_click", { cta_label: label, cta_location: "sticky_bar" })}
      className="flex-1 min-w-0 h-11 rounded-full flex items-center justify-center gap-1.5 text-[13px] font-bold text-white px-3" style={{ background: accent }}>
      <span className="truncate">{label}</span> <ArrowRight size={14} className="shrink-0" />
    </a>
    <span className="sr-only">{topic}</span>
  </div>
  );
};

export const CtaBand = ({ accent, label, href, topic, heading, text }: CtaProps & { heading: string; text: string }) => (
  <section className="py-10 px-4 md:px-8" style={{ background: `${accent}0d` }} aria-label="Next step">
    <div className="max-w-4xl mx-auto rounded-2xl border bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between" style={{ borderColor: `${accent}40` }}>
      <div>
        <p className="text-xl font-black text-[#0A1628] leading-tight">{heading}</p>
        <p className="mt-1.5 text-sm text-[#4B5563]">{text}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <a href={href} onClick={() => track("cta_click", { cta_label: label, cta_location: "cta_band" })}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white" style={{ background: accent, boxShadow: `0 8px 24px ${accent}40` }}>
          {label} <ArrowRight size={15} />
        </a>
        <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "cta_band" })} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
          <Phone size={15} /> {PHONE_DISPLAY}
        </a>
        <a href={whatsappLink(`Hello, I have a question about: ${topic}`)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { cta_location: "cta_band" })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export const JumpLinks = ({ accent, items }: { accent: string; items: { id: string; label: string }[] }) => (
  <nav aria-label="On this page" className="mt-5 flex flex-wrap items-center gap-2">
    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280] mr-1">Jump to</span>
    {items.map((it) => (
      <a key={it.id} href={`#${it.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-white hover:underline" style={{ color: accent, borderColor: `${accent}40` }}>{it.label}</a>
    ))}
  </nav>
);
