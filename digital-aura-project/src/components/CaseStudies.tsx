import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const FADE_MS = 180;

const cases = [
  {
    tag: "Local Business · Web + Booking System",
    badge: "230 Customers Managed",
    badgeColor: "#1A6FE8",
    badgeBg: "rgba(26,111,232,0.08)",
    title: "Riant Bikes",
    statBig: "177",
    statColor: "#1A6FE8",
    statDesc: "bookings processed through the new website, online booking system and fleet management we built.",
    accent: "#1A6FE8",
    topBg: "linear-gradient(135deg, rgba(26,111,232,0.08) 0%, rgba(26,111,232,0.02) 100%)",
    href: "/case-studies/riant-bikes",
  },
  {
    tag: "Industrial B2B · SEO & AEO/GEO",
    badge: "70–100 Leads/mo",
    badgeColor: "#22C55E",
    badgeBg: "rgba(34,197,94,0.08)",
    title: "Prism Calibration Centre",
    statBig: "70–100",
    statColor: "#22C55E",
    statDesc: "qualified leads generated every month after we rebuilt their site into a search & AI-visibility engine.",
    accent: "#22C55E",
    topBg: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)",
    href: "/case-studies/prism-calibration",
  },
  {
    tag: "Healthcare & Fertility · SEO + YouTube",
    badge: "+76.7% Traffic",
    badgeColor: "#7C3AED",
    badgeBg: "rgba(124,58,237,0.08)",
    title: "IVF Clinic",
    statBig: "76.7%",
    statColor: "#7C3AED",
    statDesc: "organic traffic growth in 6 months, turning a strong offline reputation into daily online demand.",
    accent: "#7C3AED",
    topBg: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)",
    href: "/case-studies/ivf-clinic",
  },
  {
    tag: "Home Services · Local SEO & AEO",
    badge: "10–15 Leads/day",
    badgeColor: "#FF6B2B",
    badgeBg: "rgba(255,107,43,0.08)",
    title: "DP Electrical Repairs",
    statBig: "10–15",
    statColor: "#FF6B2B",
    statDesc: "qualified leads generated every day from the website — from invisible to local search leader in 4 months.",
    accent: "#FF6B2B",
    topBg: "linear-gradient(135deg, rgba(255,107,43,0.08) 0%, rgba(255,107,43,0.02) 100%)",
    href: "/case-studies/dp-electrical-repairs",
  },
];

const VISIBLE = 3;

const CaseStudies = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const indexRef = useRef(0);
  const maxIndex = cases.length - VISIBLE;

  const go = useCallback((newIndex: number) => {
    const clamped = Math.max(0, Math.min(newIndex, maxIndex));
    setShow(false);
    setTimeout(() => {
      indexRef.current = clamped;
      setIndex(clamped);
      setShow(true);
    }, FADE_MS);
  }, [maxIndex]);

  const prev = () => go(indexRef.current - 1);
  const next = () => go(indexRef.current < maxIndex ? indexRef.current + 1 : 0);

  useEffect(() => {
    const t = setInterval(() => {
      go(indexRef.current >= maxIndex ? 0 : indexRef.current + 1);
    }, 4000);
    return () => clearInterval(t);
  }, [go, maxIndex]);

  const visible = cases.slice(index, index + VISIBLE);

  return (
    <section id="case-studies" className="py-16 md:py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <span className="section-badge">Proven Results</span>
            <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mt-1 mb-2">
              Real Clients.{" "}
              <span className="text-orange-gradient">Real Growth.</span>{" "}
              Real Results.
            </h2>
            <p className="text-[#4B5563] text-sm md:text-base max-w-lg">
              Across marketing, development &amp; AI — real numbers from real businesses.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={prev}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "#fff", border: "1.5px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <ChevronLeft size={16} className="text-[#374151]" />
            </button>
            <div className="flex gap-1.5 items-center">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === index ? 20 : 7, height: 7, background: i === index ? "#FF6B2B" : "#D1D5DB" }} />
              ))}
            </div>
            <button onClick={next}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "#fff", border: "1.5px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <ChevronLeft size={16} className="text-[#374151] rotate-180" />
            </button>
          </div>
        </motion.div>

          <div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            style={{ opacity: show ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
          >
            {visible.map((c, i) => (
              <div
                key={c.title}
                className="card-hover group rounded-2xl overflow-hidden border bg-white flex flex-col"
                style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="h-20 relative px-4 flex items-end pb-3" style={{ background: c.topBg }}>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full truncate max-w-[55%]" style={{ color: c.accent, background: c.badgeBg }}>
                    {c.tag}
                  </span>
                  <span
                    className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ color: c.badgeColor, background: c.badgeBg, border: `1px solid ${c.badgeColor}30` }}
                  >
                    {c.badge}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Link to={c.href}>
                    <h3 className="text-base font-bold text-[#0A1628] mb-3 hover:underline">{c.title}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} style={{ color: c.statColor }} />
                    <span className="text-[36px] font-black leading-none" style={{ color: c.statColor }}>
                      {c.statBig}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4B5563] mb-4 flex-1">{c.statDesc}</p>
                  <Link
                    to={c.href}
                    className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                    style={{ color: c.accent }}
                  >
                    Read Full Case Study <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        <div className="text-center mt-8">
          <Link to="/case-studies" className="btn-outline-orange px-6 md:px-8 py-3 md:py-3.5 text-sm gap-2 inline-flex items-center">
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
