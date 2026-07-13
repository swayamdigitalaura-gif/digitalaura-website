import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone, Mail } from "lucide-react";
import PageLayout from "@/components/PageLayout";

interface TechGroup { label: string; color: string; bg: string; pills: string[] }
interface BuildItem  { label: string; Icon: React.ElementType }
interface ResultItem { Icon: React.ElementType; text: string }

interface Props {
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  desc: string;
  accentColor: string;
  glowColor: string;
  HeaderIcon: React.ElementType;
  services: string[];
  whyUs: string[];
  techStack: TechGroup[];
  techLabel?: string;
  buildsLabel?: string;
  builds: BuildItem[];
  results: ResultItem[];
  ctaLabel: string;
  ctaGradient: string;
  cmsPrefix?: string;
  comparisonSection?: React.ReactNode;
  children?: React.ReactNode;
}

const ServicePageLayout = ({
  badge, badgeColor, title, subtitle, desc, accentColor, glowColor,
  HeaderIcon, services, whyUs, techStack, techLabel = "Tools We Use",
  buildsLabel = "What We Can Do", builds, results, ctaLabel, ctaGradient,
  cmsPrefix = "spl", comparisonSection, children,
}: Props) => (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
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
              <HeaderIcon size={12} /> {badge}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight"><span data-cms-key={`${cmsPrefix}_hero_h1`} data-cms-label="Hero H1" data-cms-attr="text">{title}</span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed"><span data-cms-key={`${cmsPrefix}_hero_sub`} data-cms-label="Hero Subtitle" data-cms-attr="text">{subtitle}</span></p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: ctaGradient, boxShadow: `0 8px 24px ${accentColor}40` }}>
              {ctaLabel} <ArrowRight size={15} />
            </Link>
            <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>What We Build</a>
          </div>
        </motion.div>
      </div>
    </section>

    {comparisonSection}

    {/* ── Description ── */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[17px] text-[#374151] leading-relaxed text-center max-w-3xl mx-auto">
          <span data-cms-key={`${cmsPrefix}_desc`} data-cms-label="Description" data-cms-attr="text">{desc}</span>
        </motion.p>
      </div>
    </section>

    {/* ── Services + Why Us ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Services Included
          </h2>
          <ul className="space-y-3">
            {services.map(s => (
              <li key={s} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: accentColor }} />
                <span className="text-[14.5px] text-[#374151]" data-cms-key={`${cmsPrefix}_svc_${services.indexOf(s)}`} data-cms-label="Service Item" data-cms-attr="text">{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> Why Choose Us
          </h2>
          <ul className="space-y-3">
            {whyUs.map(w => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="text-[#22C55E] mt-0.5 shrink-0" />
                <span className="text-[14.5px] text-[#374151]" data-cms-key={`${cmsPrefix}_why_${whyUs.indexOf(w)}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>

    {/* ── Tech Stack ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> {techLabel}
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`${cmsPrefix}_tech_${i}_label`} data-cms-label="Tech Group Label" data-cms-attr="text">{g.label}</span></p>
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

    {/* ── What We Can Do ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#FF6B2B]" /> {buildsLabel}
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {builds.map((b, i) => (
            <motion.div key={b.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
              <b.Icon size={18} style={{ color: accentColor, flexShrink: 0 }} />
              <span className="text-[14px] font-semibold text-[#0A1628]" data-cms-key={`${cmsPrefix}_build_${i}_label`} data-cms-label="Build Item" data-cms-attr="text">{b.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Results ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> Results You Can Expect
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
              <span className="text-[13.5px] font-medium text-[#374151] leading-snug" data-cms-key={`${cmsPrefix}_result_${i}_text`} data-cms-label="Result Text" data-cms-attr="text">{r.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {children}

    {/* ── CTA Banner ── */}
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Ready to <span className="text-orange-gradient">Get Started</span>?
          </h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Let's build a strategy tailored to your business goals. Book a free consultation today.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            {ctaLabel} <ArrowRight size={16} />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#E2E8F0] mt-6">
            <a href="tel:+918141200284" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={15} className="text-[#FF6B2B]" /> +91 81412 00284
            </a>
            <a href="mailto:info@thedigitalaura.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={15} className="text-[#FF6B2B]" /> info@thedigitalaura.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default ServicePageLayout;
