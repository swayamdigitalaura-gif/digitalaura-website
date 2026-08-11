/**
 * Reusable template for local/regional service landing pages.
 * One component, many configs (see localPagesData.ts) — each config produces
 * a genuinely distinct page (different H1, intro copy, FAQ, keywords), not a
 * copy-paste-the-city-name clone, per local SEO best practice.
 */
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import { ArrowRight, ChevronDown, Check, MapPin } from "lucide-react";
import { useEditableContent } from "@/hooks/useEditableContent";

export interface IncludedItem { title: string; desc: string; }
export interface FaqItem { q: string; a: string; }
export interface PainPoint { pain: string; detail: string; }
export interface ProcessStep { title: string; desc: string; }
export interface RelatedService { title: string; desc: string; points: string[]; href: string; }

export interface LocalServiceConfig {
  slug: string;
  accentColor: string;
  eyebrow: string;
  h1: string;
  heroParagraph: string;
  heroParagraph2?: string;
  tags: string[];
  parentServiceHref: string;
  parentServiceLabel: string;

  differentiatorBadge: string;
  differentiatorHeading: string;
  differentiatorHeading2?: string;
  differentiatorText: string;
  painPointsTitle: string;
  painPoints: PainPoint[];
  warningText: string;

  includedTitle: string;
  included: IncludedItem[];

  processTitle: string;
  processSubtext: string;
  process: ProcessStep[];

  whyLocalTitle: string;
  whyLocal: string[];

  relatedCategoryLabel: string;
  relatedCategoryColor: string;
  relatedServices: RelatedService[];

  faqs: FaqItem[];
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

const FAQItem = ({ q, a, idx, accentColor }: { q: string; a: string; idx: number; accentColor: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color={accentColor} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LocalServicePage = ({ config }: { config: LocalServiceConfig }) => {
  // Top-level headline/CTA copy is editable from the admin Pages panel (Content tab) without
  // a code change — everything else (FAQs, process steps, etc.) still comes from the config.
  const editable = useEditableContent(config.slug, {
    h1: config.h1,
    heroParagraph: config.heroParagraph,
    heroParagraph2: config.heroParagraph2 || "",
    differentiatorHeading: config.differentiatorHeading,
    differentiatorText: config.differentiatorText,
    ctaHeading: config.ctaHeading,
    ctaText: config.ctaText,
  });
  const c = { ...config, ...editable };
  const glow = `${c.accentColor}1f`;
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, filter: "blur(70px)" }} />
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to={c.parentServiceHref} className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: c.accentColor }}>
              ← Back to {c.parentServiceLabel}
            </Link>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: `${c.accentColor}12`, color: c.accentColor, border: `1px solid ${c.accentColor}30` }}>
                <MapPin size={12} /> {c.eyebrow}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black leading-[1.18] text-[#0A1628] mb-5 tracking-tight">{c.h1}</h1>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">{c.heroParagraph}</p>
            {c.heroParagraph2 && (
              <p className="text-base text-[#6B7280] max-w-2xl mx-auto mb-4 leading-relaxed">{c.heroParagraph2}</p>
            )}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {c.tags.map(tag => (
                <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${c.accentColor}10`, color: c.accentColor, border: `1px solid ${c.accentColor}25` }}>{tag}</span>
              ))}
            </div>
            <Link to="/contact#contact-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: c.accentColor, boxShadow: `0 8px 24px ${c.accentColor}40` }}>
              Book a Free Consultation <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: `${c.accentColor}12`, color: c.accentColor }}>{c.differentiatorBadge}</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
              {c.differentiatorHeading}{c.differentiatorHeading2 && <><br className="hidden md:block" /> {c.differentiatorHeading2}</>}
            </h2>
            <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">{c.differentiatorText}</p>
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> {c.painPointsTitle}
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
              {c.painPoints.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                  <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                    <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3" style={{ background: `${c.accentColor}0f`, borderLeftColor: c.accentColor }}>
              <span className="text-lg font-black mt-0.5 shrink-0" style={{ color: c.accentColor }}>⚠</span>
              <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">{c.warningText}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: c.accentColor }} /> {c.includedTitle}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.included.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: c.accentColor }} />
                <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]">{item.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: c.accentColor }} /> {c.processTitle}
            </h2>
            <p className="text-[#6B7280] mt-3 max-w-xl mx-auto text-sm">{c.processSubtext}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.process.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB", background: "#F8FAFF" }}>
                <span className="inline-block text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-3" style={{ background: `${c.accentColor}12`, color: c.accentColor }}>
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-black text-[#0A1628] text-[14.5px] leading-snug mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <div style={{ marginBottom: "-60px" }}>
        <CaseStudies />
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Why Local */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: c.accentColor }} /> {c.whyLocalTitle}
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-3">
            {c.whyLocal.map((w, i) => (
              <motion.div key={w} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: c.accentColor }} />
                <span className="text-[14px] text-[#374151] leading-relaxed">{w}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block" style={{ background: `${c.relatedCategoryColor}12`, color: c.relatedCategoryColor }}>
              {c.relatedCategoryLabel}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] tracking-tight">More Ways We Can Help</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.relatedServices.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <h3 className="font-bold text-[#0A1628] mb-2 text-[16px]">{s.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {s.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.relatedCategoryColor }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to={s.href} className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all" style={{ color: c.relatedCategoryColor }}>
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 rounded-full" style={{ background: c.accentColor }} /> Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {c.faqs.map((f, idx) => (
              <motion.div key={f.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
                <FAQItem q={f.q} a={f.a} idx={idx} accentColor={c.accentColor} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: `radial-gradient(circle, ${c.accentColor}1a 0%, rgba(124,58,237,0.08) 40%, transparent 70%)` }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${c.accentColor}, #7C3AED, #1A6FE8)` }} />
        <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${c.accentColor}, transparent)` }} />
        <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: `${c.accentColor}15`, border: `1px solid ${c.accentColor}40`, color: c.accentColor }}>
              Let's Build Together
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">{c.ctaHeading}</h2>
            <p className="text-[#E2E8F0] mb-8 leading-relaxed">{c.ctaText}</p>
            <Link to="/contact#contact-form" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
              style={{ background: `linear-gradient(135deg, ${c.accentColor}, #0A1628)`, boxShadow: `0 4px 20px ${c.accentColor}40` }}>
              {c.ctaButton} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LocalServicePage;
