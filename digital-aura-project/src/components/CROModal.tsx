import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Zap, FlaskConical, MousePointer, BarChart2, Layout, Target, TrendingUp, Gauge, DollarSign, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface Props { open: boolean; onClose: () => void; }
const ACCENT = "#FF6B2B";

const services = ["Landing Page Audit & Redesign","A/B & Multivariate Testing","Conversion Funnel Analysis","Heatmap & Session Recording Analysis","CTA Optimisation & Copywriting","Checkout & Form Optimisation"];
const whyUs = ["Data driven decisions, not assumptions","Full funnel approach from click to sale","Rapid testing cycles with clear results","UX improvements backed by real user data","Higher ROI from your existing traffic","Actionable reports with clear next steps"];
const techStack = [
  { label: "Testing",     color: "#FF6B2B", bg: "rgba(255,107,43,0.08)",  pills: ["Google Optimize", "VWO", "AB Tasty"] },
  { label: "Heatmaps",   color: "#6C47FF", bg: "rgba(108,71,255,0.08)",  pills: ["Hotjar", "Microsoft Clarity"] },
  { label: "Analytics",  color: "#1A6FE8", bg: "rgba(26,111,232,0.08)",  pills: ["GA4", "GTM", "Mixpanel"] },
  { label: "UX Tools",   color: "#22C55E", bg: "rgba(34,197,94,0.08)",   pills: ["Figma", "UserTesting"] },
];
const builds = [
  { label: "Landing Page Audits",   Icon: Layout },
  { label: "A/B Testing",           Icon: FlaskConical },
  { label: "Funnel Optimisation",   Icon: Target },
  { label: "Heatmap Analysis",      Icon: MousePointer },
  { label: "CTA Improvements",      Icon: BarChart2 },
  { label: "Checkout Optimisation", Icon: TrendingUp },
];
const results = [
  { Icon: DollarSign,  text: "More revenue from existing traffic" },
  { Icon: TrendingUp,  text: "Higher conversion rates across funnels" },
  { Icon: Gauge,       text: "Reduced bounce and drop off rates" },
  { Icon: ShieldCheck, text: "Data backed decisions with clear ROI" },
];

const CROModal = ({ open, onClose }: Props) => {
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; if (open) window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [open, onClose]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div key="modal" initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <div className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white pointer-events-auto"
              style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.22)" }} onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                <X size={16} color="#fff" />
              </button>
              <div className="relative px-8 pt-8 pb-7 overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A2744 100%)" }}>
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)", filter: "blur(40px)" }} />
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,107,43,0.2)", border: "1.5px solid rgba(255,107,43,0.4)" }}>
                    <FlaskConical size={26} style={{ color: "#FCA57A" }} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5 block" style={{ color: ACCENT }}>Conversion Rate Optimisation</span>
                    <h2 className="text-[22px] font-black text-white leading-snug mb-3"><span data-cms-key="cromodal_h2_1" data-cms-label="Modal Heading" data-cms-attr="text">Turn More Visitors Into Paying Customers</span></h2>
                    <p className="text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}><span data-cms-key="cromodal_p_1" data-cms-label="Body Text" data-cms-attr="text">Stop losing leads from your existing traffic. We audit, test, and optimise your funnels so more visitors take action, without spending more on ads.</span></p>
                  </div>
                </div>
              </div>
              <div className="px-8 py-7 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2"><span className="w-3 h-0.5 rounded-full" style={{ background: ACCENT }} />Services Included</h3>
                    <ul className="space-y-2.5">{services.map(s => (<li key={s} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full mt-[6px] shrink-0" style={{ background: ACCENT }} /><span className="text-[13.5px] text-[#374151]">{s}</span></li>))}</ul>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2"><span className="w-3 h-0.5 rounded-full bg-[#22C55E]" />Why Choose Us</h3>
                    <ul className="space-y-2.5">{whyUs.map(w => (<li key={w} className="flex items-start gap-2.5"><Check size={14} className="text-[#22C55E] mt-0.5 shrink-0" /><span className="text-[13.5px] text-[#374151]">{w}</span></li>))}</ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2"><span className="w-3 h-0.5 rounded-full bg-[#6C47FF]" />Tools We Use</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{techStack.map(g => (<div key={g.label} className="rounded-xl p-3.5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}><p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: g.color }}>{g.label}</p><div className="flex flex-wrap gap-1.5">{g.pills.map(p => (<span key={p} className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: g.bg, color: g.color }}>{p}</span>))}</div></div>))}</div>
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2"><span className="w-3 h-0.5 rounded-full bg-[#FF6B2B]" />What We Optimise</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">{builds.map(b => (<div key={b.label} className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-semibold text-[#0A1628]" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}><b.Icon size={15} style={{ color: ACCENT, flexShrink: 0 }} />{b.label}</div>))}</div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">{results.map(r => (<div key={r.text} className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: "rgba(255,107,43,0.06)", border: "1px solid rgba(255,107,43,0.15)" }}><r.Icon size={16} style={{ color: ACCENT, flexShrink: 0 }} /><span className="text-[13px] font-medium text-[#374151] leading-snug">{r.text}</span></div>))}</div>
                <div className="rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4" style={{ background: "linear-gradient(135deg, #0A1628, #1A2744)", border: "1px solid rgba(255,107,43,0.2)" }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><Zap size={14} style={{ color: ACCENT }} /><span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Ready to Convert More?</span></div>
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed"><span data-cms-key="cromodal_p_2" data-cms-label="Body Text" data-cms-attr="text">Let's audit your funnel and turn your existing traffic into more leads, sales, and revenue.</span></p>
                  </div>
                  <Link to="/contact" onClick={onClose} className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold text-white whitespace-nowrap transition-all hover:gap-3" style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 6px 20px rgba(255,107,43,0.4)" }}>
                    Optimise My Funnel <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CROModal;
