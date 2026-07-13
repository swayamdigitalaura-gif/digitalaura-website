import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const FADE_MS = 180;

const cases = [
  {
    tag: "Healthcare · SEO",
    badge: "+76.7% Traffic",
    badgeColor: "#1A6FE8",
    badgeBg: "rgba(26,111,232,0.08)",
    title: "IVF Hospital",
    statBig: "76.7%",
    statColor: "#1A6FE8",
    statDesc: "organic traffic increase in 6 months through targeted SEO and content authority building.",
    accent: "#1A6FE8",
    topBg: "linear-gradient(135deg, rgba(26,111,232,0.08) 0%, rgba(26,111,232,0.02) 100%)",
  },
  {
    tag: "Restaurant · Meta Ads",
    badge: "+200 Customers/mo",
    badgeColor: "#FF6B2B",
    badgeBg: "rgba(255,107,43,0.08)",
    title: "Restaurant Chain",
    statBig: "200+",
    statColor: "#FF6B2B",
    statDesc: "new dine-in customers per month from Meta Ads with creative A/B testing and 3.8x ROAS.",
    accent: "#FF6B2B",
    topBg: "linear-gradient(135deg, rgba(255,107,43,0.08) 0%, rgba(255,107,43,0.02) 100%)",
  },
  {
    tag: "Home Services · Ads + SEO",
    badge: "+174.5% Traffic",
    badgeColor: "#22C55E",
    badgeBg: "rgba(34,197,94,0.08)",
    title: "Home Appliance Repair",
    statBig: "174.5%",
    statColor: "#22C55E",
    statDesc: "traffic surge powered by local SEO, Meta Ads, and conversion optimised landing pages.",
    accent: "#22C55E",
    topBg: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)",
  },
  {
    tag: "Healthcare · Digital Marketing",
    badge: "+120% Traffic",
    badgeColor: "#7C3AED",
    badgeBg: "rgba(124,58,237,0.08)",
    title: "Eye Hospital",
    statBig: "120%",
    statColor: "#7C3AED",
    statDesc: "traffic growth through integrated Google Ads, Meta Ads, and a conversion optimised website.",
    accent: "#7C3AED",
    topBg: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)",
  },
  {
    tag: "eCommerce · AI Development",
    badge: "-68% Support Tickets",
    badgeColor: "#F59E0B",
    badgeBg: "rgba(245,158,11,0.08)",
    title: "eCommerce Brand",
    statBig: "68%",
    statColor: "#F59E0B",
    statDesc: "reduction in support tickets after AI chatbot handles 70% of queries automatically, saving 25 hrs/week.",
    accent: "#F59E0B",
    topBg: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.02) 100%)",
  },
  {
    tag: "SaaS · Custom Development",
    badge: "MVP in 6 Weeks",
    badgeColor: "#06B6D4",
    badgeBg: "rgba(6,182,212,0.08)",
    title: "eCommerce Founder",
    statBig: "20 hrs",
    statColor: "#06B6D4",
    statDesc: "saved per week after custom inventory management app delivered in 6 weeks, eliminating manual tracking.",
    accent: "#06B6D4",
    topBg: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(6,182,212,0.02) 100%)",
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
                  <h3 className="text-base font-bold text-[#0A1628] mb-3">{c.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} style={{ color: c.statColor }} />
                    <span className="text-[36px] font-black leading-none" style={{ color: c.statColor }}>
                      +{c.statBig}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4B5563] mb-4 flex-1">{c.statDesc}</p>
                  <a
                    href="#"
                    className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                    style={{ color: c.accent }}
                  >
                    Read Full Case Study <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

        <div className="text-center mt-8">
          <a href="#" className="btn-outline-orange px-6 md:px-8 py-3 md:py-3.5 text-sm gap-2 inline-flex items-center">
            View All Case Studies <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
