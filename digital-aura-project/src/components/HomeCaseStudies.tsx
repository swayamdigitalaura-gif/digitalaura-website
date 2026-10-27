import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ChevronLeft, AlertTriangle, Lightbulb, Check, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { CASE_CARDS, type CaseCard } from "@/components/caseCards";

const FADE_MS = 180;

interface Stat { num: string; label: string }

interface HomeCase {
  card: CaseCard;
  /** Result tiles: a big number and plain words saying what it counts. */
  stats: Stat[];
  problems: string[];
  solutions: string[];
}

const HOME_CASE_DETAILS: HomeCase[] = [
  {
    card: CASE_CARDS.riant,
    stats: [
      { num: "177", label: "Bookings processed through the new website" },
      { num: "₹1.6L+", label: "Revenue tracked inside the platform" },
      { num: "230", label: "Customers managed in one system" },
    ],
    problems: ["Every booking depended on someone answering the phone", "No idea which bike earned the most or sat idle", "Static pricing while weekend demand kept changing", "No digital record of bike condition at rental"],
    solutions: ["Built a new website with instant online booking", "Fleet management dashboard for demand, branches and revenue", "Customer database to spot and reward repeat renters", "Launched Google Ads for consistent daily bookings"],
  },
  {
    card: CASE_CARDS.prism,
    stats: [
      { num: "70–100", label: "Qualified leads every month" },
      { num: "Top 3", label: "Google rankings on major keywords" },
      { num: "AI Overview", label: "Featured in Google's AI answers" },
    ],
    problems: ["Strong expertise, but growth came from word-of-mouth only", "Outdated website with no search-friendly structure", "Enquiries untracked across multiple forms", "Legacy PBN backlinks and weak local signals"],
    solutions: ["Rebuilt the site for speed, SEO and scale", "Service → industry → instrument page architecture", "Pillar content, internal linking, schema and local SEO", "Optimised for AI search with AEO + GEO"],
  },
  {
    card: CASE_CARDS.ivf,
    stats: [
      { num: "+76.7%", label: "Organic website traffic growth in 6 months" },
      { num: "1 → 10", label: "Keywords ranking #1 on Google" },
      { num: "SEO + YouTube", label: "Two growth channels running together" },
    ],
    problems: ["No authority on Google despite being an industry leader", "Slow site; patients couldn't find treatment information", "Weaker competitors outranked them", "YouTube library with almost no reach"],
    solutions: ["Keyword research and a patient-first site rebuild", "Treatment pages, blogs and AIO/GEO pages with internal links", "CRO plus targeted Google Ads for quick leads", "YouTube SEO and a consistent short + long video schedule"],
  },
  {
    card: CASE_CARDS.dp,
    stats: [
      { num: "10–15", label: "Qualified leads every day from the website" },
      { num: "3,000+", label: "Monthly website visitors, up from almost none" },
      { num: "200+", label: "Suburbs covered with local pages" },
    ],
    problems: ["Website generated almost no organic enquiries", "Growth capped by referrals only", "Shared paid leads led to a constant price war", "Lower-skilled competitors ranked higher"],
    solutions: ["A dedicated page for every repair service and brand", "Suburb-level pages covering 200+ local areas", "Local SEO and AEO built for “repair near me” searches", "Exit-intent callback popup to capture leaving visitors"],
  },
  {
    card: CASE_CARDS.obl,
    stats: [
      { num: "35", label: "WhatsApp click-to-chats in a month" },
      { num: "79.1%", label: "Optimization score, up from 31/100" },
      { num: "14.6%", label: "Click-through rate on top search keywords" },
    ],
    problems: ["Only 10% impression share; every landing page rated Poor by Google", "80+ keywords in one ad group, with no negative keywords", "Broken website migration left old URLs indexed", "Budget went out every month while the WhatsApp stayed silent"],
    solutions: ["Rebuilt the account into focused, product-specific campaigns", "Launched Google Shopping for stickers, banners and foam board", "Tracked WhatsApp chats, calls and form fills properly", "Removed wasted keywords and added negative keywords everywhere"],
  },
  {
    card: CASE_CARDS.grand,
    stats: [
      { num: "1.26K+", label: "Visitors from Google search in 90 days" },
      { num: "+73%", label: "Instagram engagement growth" },
      { num: "+78.3%", label: "More Google Business Profile interactions" },
    ],
    problems: ["No website, so nowhere to send curious customers", "Venue hire and catering went unnoticed", "No online booking; every enquiry needed a phone call", "Invisible in search, so competitors were found first"],
    solutions: ["Built the restaurant's first digital front door", "Local SEO and Google Business Profile optimisation", "Pages for events, catering and banquet bookings", "Social media content to grow engagement"],
  },
];

const HOME_SUB = "Across marketing, development & AI — real numbers from real businesses.";

interface HomeCaseStudiesProps {
  /** Cards to show. Defaults to all five. */
  cases?: CaseCard[];
  sub?: string;
  /** Accepted for older call sites; the heading is always centred now. */
  centered?: boolean;
}

const HomeCaseStudies = ({ cases, sub = HOME_SUB }: HomeCaseStudiesProps) => {
  const details = cases
    ? HOME_CASE_DETAILS.filter((d) => cases.some((c) => c.title === d.card.title))
    : HOME_CASE_DETAILS;
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const total = details.length;

  const go = useCallback((n: number) => {
    const target = ((n % total) + total) % total;
    setShow(false);
    setTimeout(() => {
      indexRef.current = target;
      setIndex(target);
      setShow(true);
    }, FADE_MS);
  }, [total]);

  useEffect(() => {
    if (total < 2) return;
    const t = setInterval(() => {
      if (!pausedRef.current) go(indexRef.current + 1);
    }, 8000);
    return () => clearInterval(t);
  }, [go, total]);

  const { card: c, stats, problems, solutions } = details[index];
  const multi = total > 1;

  const arrowBtn = "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all hover:scale-110";
  const arrowStyle = { background: "#fff", border: "1.5px solid #E5E7EB", boxShadow: "0 4px 14px rgba(0,0,0,0.12)" };

  return (
    <section id="case-studies" className="py-16 md:py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="section-badge">Proven Results</span>
          <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mt-1 mb-2">
            Real Clients.{" "}
            <span className="text-orange-gradient">Real Growth.</span>{" "}
            Real Results.
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base max-w-lg mx-auto">{sub}</p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {multi && (
            <>
              <button onClick={() => go(index - 1)} aria-label="Previous case study" className={`${arrowBtn} -left-3 md:-left-5`} style={arrowStyle}>
                <ChevronLeft size={18} className="text-[#374151]" />
              </button>
              <button onClick={() => go(index + 1)} aria-label="Next case study" className={`${arrowBtn} -right-3 md:-right-5`} style={arrowStyle}>
                <ChevronLeft size={18} className="text-[#374151] rotate-180" />
              </button>
            </>
          )}

          <div
            className="rounded-3xl overflow-hidden border bg-white"
            style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", opacity: show ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
          >
            {/* Client header */}
            <div className="px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3" style={{ background: c.topBg }}>
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: c.accent, background: c.badgeBg }}>{c.tag}</span>
                <h3 className="text-xl md:text-2xl font-bold text-[#0A1628] mt-3">{c.title}</h3>
              </div>
              <Link to={c.href} className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: c.accent }}>
                Read Full Case Study <ArrowRight size={14} />
              </Link>
            </div>

            {/* Results: big number + plain-words label */}
            <div className="px-6 md:px-10 pt-6 md:pt-8">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: c.accent }}>
                <TrendingUp size={15} /> Results We Delivered
              </div>
              <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
                {stats.map((st) => (
                  <div key={st.label} className="rounded-2xl p-4 md:p-5 border" style={{ background: c.badgeBg, borderColor: `${c.accent}25` }}>
                    <div className="text-[28px] md:text-[34px] font-black leading-none mb-2 tracking-tight" style={{ color: c.statColor }}>{st.num}</div>
                    <div className="text-sm font-medium leading-snug text-[#374151]">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem -> Solution */}
            <div className="p-6 md:p-10 grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-stretch">
              <div className="rounded-2xl p-5 md:p-6" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  <AlertTriangle size={15} /> The Problem
                </div>
                <ul className="space-y-3">
                  {problems.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-[#374151]">
                      <X size={15} className="shrink-0 mt-0.5 text-[#DC2626]" /> {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:flex items-center">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: c.accent }}>
                  <ArrowRight size={18} />
                </span>
              </div>

              <div className="rounded-2xl p-5 md:p-6" style={{ background: c.badgeBg, border: `1px solid ${c.accent}30` }}>
                <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: c.accent }}>
                  <Lightbulb size={15} /> How We Solved It
                </div>
                <ul className="space-y-3">
                  {solutions.map((s) => (
                    <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-[#374151]">
                      <Check size={15} className="shrink-0 mt-0.5" style={{ color: c.accent }} /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {multi && <div className="flex gap-1.5 items-center justify-center mt-5">
          {details.map((d, i) => (
            <button key={d.card.title} onClick={() => go(i)} aria-label={`Show ${d.card.title}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === index ? 20 : 7, height: 7, background: i === index ? "#FF6B2B" : "#D1D5DB" }} />
          ))}
        </div>}

        <div className="text-center mt-8">
          <Link to="/case-studies/" className="btn-outline-orange px-6 md:px-8 py-3 md:py-3.5 text-sm gap-2 inline-flex items-center">
            View All Case Studies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCaseStudies;
