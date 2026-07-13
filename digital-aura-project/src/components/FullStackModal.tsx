import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Zap, Rocket, BarChart2, Users, ShoppingBag, Bot, CreditCard, Gauge, Smile, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const services = [
  "Custom Web Application Development",
  "Frontend Development (React.js, Next.js)",
  "Backend Development (Node.js, Python)",
  "API Development & Integration",
  "Database Design & Management",
  "Cloud Deployment & DevOps",
];

const whyUs = [
  "Scalable and future ready architecture",
  "Clean and maintainable code",
  "High performance, fast loading apps",
  "Secure backend systems",
  "SEO friendly frontend development",
  "Solutions aligned with your business goals",
];

const techStack = [
  { label: "Frontend",       color: "#6C47FF", bg: "rgba(108,71,255,0.08)", pills: ["React.js", "Next.js", "Tailwind CSS"] },
  { label: "Backend",        color: "#0EA5E9", bg: "rgba(14,165,233,0.08)", pills: ["Node.js", "Python", "Express.js"] },
  { label: "Database",       color: "#22C55E", bg: "rgba(34,197,94,0.08)",  pills: ["MongoDB", "PostgreSQL"] },
  { label: "Cloud & DevOps", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", pills: ["AWS", "Vercel", "DigitalOcean", "CI/CD"] },
];

const builds = [
  { label: "SaaS Platforms",        Icon: Rocket },
  { label: "Business Dashboards",   Icon: BarChart2 },
  { label: "Custom CRM Systems",    Icon: Users },
  { label: "Marketplaces",          Icon: ShoppingBag },
  { label: "AI powered Web Apps",   Icon: Bot },
  { label: "eCommerce Platforms",   Icon: CreditCard },
];

const results = [
  { Icon: Gauge,       text: "Faster and more efficient applications" },
  { Icon: Smile,       text: "Improved user experience and engagement" },
  { Icon: TrendingUp,  text: "Scalable systems that grow with you" },
  { Icon: ShieldCheck, text: "Reliable and secure digital infrastructure" },
];

const FullStackModal = ({ open, onClose }: Props) => {
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
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white pointer-events-auto"
              style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.22)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <X size={16} color="#fff" />
              </button>

              {/* ── Hero Header ── */}
              <div
                className="relative px-8 pt-8 pb-7 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A2744 100%)" }}
              >
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Glow orb */}
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, #378ADD, transparent)", filter: "blur(40px)" }} />

                <div className="relative flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-[15px] font-black"
                    style={{ background: "rgba(55,138,221,0.2)", border: "1.5px solid rgba(55,138,221,0.4)", color: "#7DC4FF" }}
                  >
                    {"</>"}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5 block" style={{ color: "#378ADD" }}>
                      Full Stack Development
                    </span>
                    <h2 className="text-[22px] font-black text-white leading-snug mb-3">
                      Full Stack Development That Powers<br />Scalable Digital Products
                    </h2>
                    <p className="text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
                      High performance web applications with modern frontend, robust backend systems,
                      and scalable cloud infrastructure, built to grow your business long term.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-7 space-y-8">

                {/* ── Services + Why Us ── */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                      <span className="w-3 h-0.5 rounded-full bg-[#378ADD]" />
                      Services Included
                    </h3>
                    <ul className="space-y-2.5">
                      {services.map(s => (
                        <li key={s} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full mt-[6px] shrink-0 bg-[#378ADD]" />
                          <span className="text-[13.5px] text-[#374151]">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                      <span className="w-3 h-0.5 rounded-full bg-[#22C55E]" />
                      Why Choose Us
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

                {/* ── Tech Stack ── */}
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                    <span className="w-3 h-0.5 rounded-full bg-[#6C47FF]" />
                    Tech Stack
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {techStack.map(g => (
                      <div key={g.label} className="rounded-xl p-3.5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: g.color }}>{g.label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {g.pills.map(p => (
                            <span key={p} className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: g.bg, color: g.color }}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── What We Can Build ── */}
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-4 flex items-center gap-2">
                    <span className="w-3 h-0.5 rounded-full bg-[#FF6B2B]" />
                    What We Can Build
                  </h3>
                  <div className="grid grid-cols-3 gap-2.5">
                    {builds.map(b => (
                      <div key={b.label}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-semibold text-[#0A1628]"
                        style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                        <b.Icon size={15} style={{ color: "#378ADD", flexShrink: 0 }} />
                        {b.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Results ── */}
                <div className="grid grid-cols-2 gap-2.5">
                  {results.map(r => (
                    <div key={r.text} className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                      style={{ background: "rgba(55,138,221,0.06)", border: "1px solid rgba(55,138,221,0.15)" }}>
                      <r.Icon size={16} style={{ color: "#378ADD", flexShrink: 0 }} />
                      <span className="text-[13px] font-medium text-[#374151] leading-snug">{r.text}</span>
                    </div>
                  ))}
                </div>

                {/* ── CTA ── */}
                <div className="rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4"
                  style={{ background: "linear-gradient(135deg, #0A1628, #1A2744)", border: "1px solid rgba(55,138,221,0.2)" }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={14} color="#378ADD" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#378ADD]">Ready to Build?</span>
                    </div>
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                      Whether launching a new idea or improving an existing system, we build powerful, scalable web applications for your business.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    onClick={onClose}
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold text-white whitespace-nowrap transition-all hover:gap-3"
                    style={{ background: "linear-gradient(135deg, #378ADD, #2563eb)", boxShadow: "0 6px 20px rgba(55,138,221,0.4)" }}
                  >
                    Let's Build Together <ArrowRight size={14} />
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

export default FullStackModal;
