import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Zap, Target, Search, ShoppingBag, BarChart2, RefreshCw, Globe2, TrendingUp, Gauge, DollarSign, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface Props { open: boolean; onClose: () => void; }

const ACCENT = "#4285F4";

const services = [
  "Google Search Ads (PPC)",
  "Google Display & Banner Ads",
  "Google Shopping Campaigns",
  "YouTube Video Ads",
  "Remarketing & Retargeting Campaigns",
  "Performance Max Campaigns",
];

const whyUs = [
  "ROI focused budget management",
  "Precise keyword & audience targeting",
  "Compelling ad copy that converts",
  "Continuous A/B testing & optimisation",
  "Transparent reporting & dashboards",
  "Certified Google Ads specialists",
];

const techStack = [
  { label: "Platforms",   color: "#4285F4", bg: "rgba(66,133,244,0.08)",  pills: ["Google Ads", "Google Analytics"] },
  { label: "Tracking",    color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  pills: ["GTM", "GA4", "Conversion Tracking"] },
  { label: "Research",    color: "#22C55E", bg: "rgba(34,197,94,0.08)",   pills: ["Keyword Planner", "SEMrush"] },
  { label: "Reporting",   color: "#6C47FF", bg: "rgba(108,71,255,0.08)",  pills: ["Looker Studio", "Data Studio"] },
];

const builds = [
  { label: "Search Ad Campaigns",     Icon: Search },
  { label: "Shopping Ads",            Icon: ShoppingBag },
  { label: "Display Campaigns",       Icon: Globe2 },
  { label: "Remarketing Funnels",     Icon: RefreshCw },
  { label: "YouTube Video Ads",       Icon: BarChart2 },
  { label: "Lead Gen Campaigns",      Icon: Target },
];

const results = [
  { Icon: DollarSign,  text: "Lower cost per click and cost per lead" },
  { Icon: TrendingUp,  text: "More qualified leads and conversions" },
  { Icon: Gauge,       text: "Faster results than organic SEO" },
  { Icon: ShieldCheck, text: "Full budget transparency and control" },
];

const GoogleAdsModal = ({ open, onClose }: Props) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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

              <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                <X size={16} color="#fff" />
              </button>

              {/* Header */}
              <div className="relative px-8 pt-8 pb-7 overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A2744 100%)" }}>
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #4285F4, transparent)", filter: "blur(40px)" }} />
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(66,133,244,0.2)", border: "1.5px solid rgba(66,133,244,0.4)" }}>
                    {/* Google G icon */}
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5 block" style={{ color: ACCENT }}>Google Ads</span>
                    <h2 className="text-[22px] font-black text-white leading-snug mb-3"><span data-cms-key="gadsmodal_h2_1" data-cms-label="Modal Heading" data-cms-attr="text">Google Ads That Deliver High-Quality Leads at Low Cost</span></h2>
                    <p className="text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}><span data-cms-key="gadsmodal_p_1" data-cms-label="Body Text" data-cms-attr="text">Data driven Google campaigns, Search, Display, Shopping, and YouTube, managed to maximise your ROI and deliver consistent, qualified leads.</span></p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-7 space-y-8">
                {/* Services + Why Us */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                      <span className="w-3 h-0.5 rounded-full" style={{ background: ACCENT }} />Services Included
                    </h3>
                    <ul className="space-y-2.5">
                      {services.map(s => (
                        <li key={s} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full mt-[6px] shrink-0" style={{ background: ACCENT }} />
                          <span className="text-[13.5px] text-[#374151]">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                      <span className="w-3 h-0.5 rounded-full bg-[#22C55E]" />Why Choose Us
                    </h3>
                    <ul className="space-y-2.5">
                      {whyUs.map(w => (
                        <li key={w} className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#22C55E] mt-0.5 shrink-0" />
                          <span className="text-[13.5px] text-[#374151]">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                    <span className="w-3 h-0.5 rounded-full bg-[#6C47FF]" />Tools We Use
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {techStack.map(g => (
                      <div key={g.label} className="rounded-xl p-3.5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: g.color }}>{g.label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {g.pills.map(p => (
                            <span key={p} className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: g.bg, color: g.color }}>{p}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaign Types */}
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                    <span className="w-3 h-0.5 rounded-full bg-[#FF6B2B]" />Campaign Types
                  </h3>
                  <div className="grid grid-cols-3 gap-2.5">
                    {builds.map(b => (
                      <div key={b.label} className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-semibold text-[#0A1628]" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                        <b.Icon size={15} style={{ color: ACCENT, flexShrink: 0 }} />{b.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-2.5">
                  {results.map(r => (
                    <div key={r.text} className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: "rgba(66,133,244,0.06)", border: "1px solid rgba(66,133,244,0.15)" }}>
                      <r.Icon size={16} style={{ color: ACCENT, flexShrink: 0 }} />
                      <span className="text-[13px] font-medium text-[#374151] leading-snug">{r.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4" style={{ background: "linear-gradient(135deg, #0A1628, #1A2744)", border: "1px solid rgba(66,133,244,0.2)" }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={14} style={{ color: ACCENT }} />
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Ready to Run Ads?</span>
                    </div>
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed"><span data-cms-key="gadsmodal_p_2" data-cms-label="Body Text" data-cms-attr="text">Let's launch Google Ads campaigns that bring you qualified leads and measurable ROI from day one.</span></p>
                  </div>
                  <Link to="/contact" onClick={onClose}
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold text-white whitespace-nowrap transition-all hover:gap-3"
                    style={{ background: "linear-gradient(135deg, #4285F4, #1a56db)", boxShadow: "0 6px 20px rgba(66,133,244,0.4)" }}>
                    Launch My Google Ads <ArrowRight size={14} />
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

export default GoogleAdsModal;
