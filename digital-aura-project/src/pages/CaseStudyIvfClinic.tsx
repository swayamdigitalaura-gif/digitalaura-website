import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ArrowLeft, ChevronRight, TrendingUp,
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const NAVY = "#0A1628";
const BLUE = "#1A6FE8";
const ORANGE = "#FF6B2B";
const GREEN = "#22C55E";
const MUTED = "#4B5563";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const H2 = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <motion.h2
    {...fadeUp}
    data-cms-key={k} data-cms-label="Heading" data-cms-attr="text"
    className="text-2xl md:text-3xl font-bold mt-14 mb-5 pl-4 border-l-4"
    style={{ color: NAVY, borderColor: GREEN }}
  >
    {children}
  </motion.h2>
);

const H3 = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <h3 data-cms-key={k} data-cms-label="Subheading" data-cms-attr="text" className="text-lg md:text-xl font-bold mt-8 mb-2" style={{ color: GREEN }}>
    {children}
  </h3>
);

const P = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <p data-cms-key={k} data-cms-label="Paragraph" data-cms-attr="text" className="text-base md:text-[17px] leading-relaxed mb-4" style={{ color: NAVY }}>
    {children}
  </p>
);

const Callout = ({
  children,
  tone = "green",
  k,
}: {
  children: React.ReactNode;
  tone?: "green" | "blue" | "orange";
  k?: string;
}) => {
  const map = {
    green: { bg: "#F0FDF4", border: GREEN, text: "#14532D" },
    blue: { bg: "#EFF6FF", border: BLUE, text: "#1E3A8A" },
    orange: { bg: "#FFF7ED", border: ORANGE, text: "#7C2D12" },
  } as const;
  const c = map[tone];
  return (
    <motion.div
      {...fadeUp}
      className="rounded-xl px-5 py-5 md:px-6 md:py-6 my-7 border-l-4"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <p data-cms-key={k} data-cms-label="Callout" data-cms-attr="text" className="font-semibold text-[15px] md:text-[17px] leading-relaxed m-0" style={{ color: c.text }}>
        {children}
      </p>
    </motion.div>
  );
};

const websiteChallenges = [
  "No authority on Google search, despite being an industry leader",
  "Slow load times and poor user experience",
  "Competitors with weaker services still outranked them",
  "Patients couldn't easily find treatment information",
];

const youtubeChallenges = [
  "A real content library — with almost no reach",
  "Inconsistent upload schedule",
  "Low engagement and a stalled subscriber count",
  "Thumbnails and titles doing nothing to earn a click",
];

const seoApproach = [
  "Conducted deep keyword research to find exactly what prospective patients were searching for.",
  "Redesigned the website and rewrote all treatment pages with SEO-driven, patient-first content.",
  "Built contextual internal links across treatment pages to establish topical authority.",
  "Published informative blog content on fertility treatments to widen the traffic funnel.",
  "Built dedicated AIO & GEO pages, optimizing content to surface in AI Overviews and generative search engines.",
  "Ran conversion rate optimization to turn more visitors into patient enquiries.",
  "Tracked performance weekly and adjusted the strategy for maximum effect.",
  "Layered in targeted Google Ads for immediate, short-term lead generation.",
];

const youtubeApproach = [
  "Ran YouTube SEO on every video, rebuilding thumbnails and titles designed to earn the click.",
  "Scripted and edited short-form videos for quick discovery and reach.",
  "Scripted and edited long-form videos for deeper trust-building and watch time.",
  "Established a consistent upload schedule to keep the audience coming back.",
];

const timeline = [
  { phase: "Month 1–2", cap: "Foundation — research, site rebuild, SEO base" },
  { phase: "Month 3–4", cap: "Momentum — content, links, YouTube optimization" },
  { phase: "Month 5–6", cap: "Scale — CRO, ads layer, consistent publishing" },
];

const rankTable = [
  { pos: "#1", may: "1 keyword", jun: "7 keywords", jul: "10 keywords" },
  { pos: "#2 – #3", may: "9 keywords", jun: "14 keywords", jul: "23 keywords" },
  { pos: "#4 – #10", may: "19 keywords", jun: "35 keywords", jul: "57 keywords" },
];

const heroStats = [
  { num: "76.7%", label: "Organic website traffic growth" },
  { num: "85.9%", label: "YouTube views growth" },
  { num: "25–30", label: "Qualified leads, every single day" },
];

const websiteResultStats = [
  { num: "76.7%", label: "Increase in organic website traffic" },
  { num: "30%", label: "More leads generated from the website" },
  { num: "25–30 / day", label: "Relevant leads arriving daily by the end" },
];

const youtubeResultStats = [
  { num: "85.9%", label: "Increase in video views" },
  { num: "45.8%", label: "Increase in watch time" },
  { num: "30.3%", label: "Growth in subscribers" },
];

const IVF_CLINIC_KEYS = [
  "ivfclinic_heroTitle", "ivfclinic_heroSubtitle",
  "ivfclinic_h2_situation", "ivfclinic_p_situation_1",
  "ivfclinic_h3_website", "ivfclinic_h3_youtube",
  "ivfclinic_h2_approach", "ivfclinic_p_approach_1", "ivfclinic_p_approach_2",
  "ivfclinic_h3_seo", "ivfclinic_h3_yt",
  "ivfclinic_h2_results", "ivfclinic_p_results_1",
  "ivfclinic_h3_website_results", "ivfclinic_h3_youtube_results",
  "ivfclinic_rank_note",
  "ivfclinic_callout",
  "ivfclinic_cta_heading", "ivfclinic_cta_text", "ivfclinic_cta_button",
  ...heroStats.flatMap((_, i) => [`ivfclinic_herostat_${i}_num`, `ivfclinic_herostat_${i}_label`]),
  ...websiteChallenges.map((_, i) => `ivfclinic_webchallenge_${i}`),
  ...youtubeChallenges.map((_, i) => `ivfclinic_ytchallenge_${i}`),
  ...seoApproach.map((_, i) => `ivfclinic_seo_${i}`),
  ...youtubeApproach.map((_, i) => `ivfclinic_yt_${i}`),
  ...timeline.flatMap((_, i) => [`ivfclinic_timeline_${i}_phase`, `ivfclinic_timeline_${i}_cap`]),
  ...websiteResultStats.flatMap((_, i) => [`ivfclinic_webresult_${i}_num`, `ivfclinic_webresult_${i}_label`]),
  ...youtubeResultStats.flatMap((_, i) => [`ivfclinic_ytresult_${i}_num`, `ivfclinic_ytresult_${i}_label`]),
];

// Deliberately NOT under /case-studies/ — that path collides with the React route of the
// same name, and nginx resolves the URL to this real directory and 403s instead of falling
// through to the SPA rewrite.

const CaseStudyIvfClinic = () => {
  useCMSEditor();
  const s = useSettings(IVF_CLINIC_KEYS);
  const t = (key: string, fallback: React.ReactNode) => s[key] || fallback;

  const heroTitle = t(
    "ivfclinic_heroTitle",
    <>How an IVF Hospital Turned <em style={{ fontStyle: "normal", color: GREEN }}>Quiet Authority</em> Into Measurable Demand — In Six Months.</>
  );
  const heroSubtitle = t(
    "ivfclinic_heroSubtitle",
    "This IVF clinic had the reputation and the results. What it didn't have was visibility — on Google, or on YouTube. Here's how we closed that gap."
  );

  const heroStatItems = heroStats.map((stat, i) => ({
    num: t(`ivfclinic_herostat_${i}_num`, stat.num),
    label: t(`ivfclinic_herostat_${i}_label`, stat.label),
  }));
  const webChallengeItems = websiteChallenges.map((c, i) => t(`ivfclinic_webchallenge_${i}`, c));
  const ytChallengeItems = youtubeChallenges.map((c, i) => t(`ivfclinic_ytchallenge_${i}`, c));
  const seoItems = seoApproach.map((c, i) => t(`ivfclinic_seo_${i}`, c));
  const ytItems = youtubeApproach.map((c, i) => t(`ivfclinic_yt_${i}`, c));
  const timelineItems = timeline.map((tl, i) => ({
    phase: t(`ivfclinic_timeline_${i}_phase`, tl.phase),
    cap: t(`ivfclinic_timeline_${i}_cap`, tl.cap),
  }));
  const webResultItems = websiteResultStats.map((stat, i) => ({
    num: t(`ivfclinic_webresult_${i}_num`, stat.num),
    label: t(`ivfclinic_webresult_${i}_label`, stat.label),
  }));
  const ytResultItems = youtubeResultStats.map((stat, i) => ({
    num: t(`ivfclinic_ytresult_${i}_num`, stat.num),
    label: t(`ivfclinic_ytresult_${i}_label`, stat.label),
  }));

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="relative pt-[72px] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY}, #14331F)` }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full animate-drift"
            style={{
              width: 500, height: 500, top: "-15%", right: "-10%",
              background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-16 pb-14 md:pt-20 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex flex-col items-center gap-4 mb-6">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-medium self-center"
                style={{ color: "#BBF7D0" }}
              >
                <ArrowLeft size={15} /> All Case Studies
              </Link>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-center"
                style={{ background: GREEN, color: "#052e16" }}
              >
                Case Study &middot; Healthcare &amp; Fertility &middot; SEO + YouTube
              </span>
            </div>
            <h1 data-cms-key="ivfclinic_heroTitle" data-cms-label="Hero Title" data-cms-attr="text" className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold leading-[1.15] text-white mb-6 tracking-tight">
              {heroTitle}
            </h1>
            <p data-cms-key="ivfclinic_heroSubtitle" data-cms-label="Hero Subtitle" data-cms-attr="text" className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#BBF7D0" }}>
              {heroSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
              {heroStatItems.map((stat, i) => (
                <div key={i} className="rounded-xl px-5 py-5 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span data-cms-key={`ivfclinic_herostat_${i}_num`} data-cms-label={`Hero Stat ${i + 1} Number`} data-cms-attr="text" className="block text-2xl font-black mb-1.5 text-white">
                    {stat.num}
                  </span>
                  <span data-cms-key={`ivfclinic_herostat_${i}_label`} data-cms-label={`Hero Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs leading-snug" style={{ color: "#BBF7D0" }}>{stat.label}</span>
                </div>
              ))}
            </div>

            <svg
              className="w-full mt-12"
              style={{ height: 150 }}
              viewBox="0 0 1000 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-label="Organic traffic growth climbing from 0% to +76.7% over six months"
            >
              <path d="M20 114.4 C 116 114.4, 116 101.1, 212 101.1 C 308 101.1, 308 85.6, 404 85.6 C 500 85.6, 500 66.7, 596 66.7 C 692 66.7, 692 47.8, 788 47.8 C 884 47.8, 884 29.2, 980 29.2" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M20 114.4 C 116 114.4, 116 101.1, 212 101.1 C 308 101.1, 308 85.6, 404 85.6 C 500 85.6, 500 66.7, 596 66.7 C 692 66.7, 692 47.8, 788 47.8 C 884 47.8, 884 29.2, 980 29.2 L980 160 L20 160 Z" fill="url(#ivfGrowthFade)" />
              {[
                { x: 20, y: 114.4, label: "Start", month: "M1" },
                { x: 212, y: 101.1, label: "+12%", month: "M2" },
                { x: 404, y: 85.6, label: "+26%", month: "M3" },
                { x: 596, y: 66.7, label: "+43%", month: "M4" },
                { x: 788, y: 47.8, label: "+60%", month: "M5" },
                { x: 980, y: 29.2, label: "+76.7%", month: "M6" },
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="4" fill="#FF6B2B" stroke="#0A1628" strokeWidth="2" />
                  <text x={p.x} y={p.y - 14} fontSize="13" fontWeight="700" fill="#FFFFFF" textAnchor="middle" fontFamily="system-ui, sans-serif">{p.label}</text>
                  <text x={p.x} y="156" fontSize="11" fill="#BBF7D0" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="600">{p.month}</text>
                </g>
              ))}
              <defs>
                <linearGradient id="ivfGrowthFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#22C55E" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#22C55E" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Snapshot bar */}
      <div className="py-7 px-4 md:px-8" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#86EFAC" }}>Client</div>
            <div className="text-sm font-semibold text-white">IVF Clinic</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#86EFAC" }}>Industry</div>
            <div className="text-sm font-semibold text-white">IVF &amp; Fertility Care</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#86EFAC" }}>Engagement</div>
            <div className="text-sm font-semibold text-white">SEO + YouTube Growth</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#86EFAC" }}>Timeframe</div>
            <div className="text-sm font-semibold text-white">6 Months</div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <section className="py-14 md:py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <motion.div {...fadeUp} className="grid sm:grid-cols-3 gap-5 mb-10 rounded-xl border bg-white px-6 py-6" style={{ borderColor: "#E5E7EB" }}>
            {timelineItems.map((tl, i) => (
              <div key={i} className="pl-4 border-l-2" style={{ borderColor: "#DCD5C6" }}>
                <div className="font-bold text-[15px]" style={{ color: NAVY }} data-cms-key={`ivfclinic_timeline_${i}_phase`} data-cms-label={`Timeline ${i + 1} Phase`} data-cms-attr="text">{tl.phase}</div>
                <div className="text-sm mt-1.5" style={{ color: MUTED }} data-cms-key={`ivfclinic_timeline_${i}_cap`} data-cms-label={`Timeline ${i + 1} Caption`} data-cms-attr="text">{tl.cap}</div>
              </div>
            ))}
          </motion.div>

          <H2 k="ivfclinic_h2_situation">{t("ivfclinic_h2_situation", "Do Any of These Problems Sound Familiar?")}</H2>
          <P k="ivfclinic_p_situation_1">
            {t("ivfclinic_p_situation_1", "This clinic was a market leader by reputation — but that authority wasn't showing up in search or on YouTube, where prospective patients were actually looking for answers.")}
          </P>

          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="rounded-xl border bg-white px-5 py-5" style={{ borderColor: "#E5E7EB" }}>
              <H3 k="ivfclinic_h3_website">{t("ivfclinic_h3_website", "On the Website")}</H3>
              <ul className="space-y-2.5 mt-3">
                {webChallengeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: MUTED }}>
                    <ChevronRight size={15} style={{ color: GREEN }} className="mt-0.5 flex-shrink-0" />
                    <span data-cms-key={`ivfclinic_webchallenge_${i}`} data-cms-label={`Website Challenge ${i + 1}`} data-cms-attr="text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-white px-5 py-5" style={{ borderColor: "#E5E7EB" }}>
              <H3 k="ivfclinic_h3_youtube">{t("ivfclinic_h3_youtube", "On YouTube")}</H3>
              <ul className="space-y-2.5 mt-3">
                {ytChallengeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: MUTED }}>
                    <ChevronRight size={15} style={{ color: GREEN }} className="mt-0.5 flex-shrink-0" />
                    <span data-cms-key={`ivfclinic_ytchallenge_${i}`} data-cms-label={`YouTube Challenge ${i + 1}`} data-cms-attr="text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <H2 k="ivfclinic_h2_approach">{t("ivfclinic_h2_approach", "Two Tracks, Run in Parallel")}</H2>
          <P k="ivfclinic_p_approach_1">
            {t("ivfclinic_p_approach_1", "Search and YouTube feed the same goal — more couples finding trustworthy answers, faster. So we built the plan as one system with two engines.")}
          </P>
          <P k="ivfclinic_p_approach_2">{t("ivfclinic_p_approach_2", "Here's what we did.")}</P>

          <motion.div {...fadeUp} className="rounded-2xl px-6 py-7 md:px-8 md:py-8" style={{ background: "#F3EDE2" }}>
            <H3 k="ivfclinic_h3_seo">{t("ivfclinic_h3_seo", "Website & SEO")}</H3>
            <div className="mt-2">
              {seoItems.map((item, i) => (
                <div key={i} className="grid grid-cols-[40px_1fr] gap-4 py-3.5 border-t first:border-t-0" style={{ borderColor: "#DCD5C6" }}>
                  <div className="font-bold text-lg" style={{ color: GREEN }}>{String(i + 1).padStart(2, "0")}</div>
                  <div className="text-sm md:text-[15px] leading-relaxed" style={{ color: NAVY }} data-cms-key={`ivfclinic_seo_${i}`} data-cms-label={`SEO Step ${i + 1}`} data-cms-attr="text">{item}</div>
                </div>
              ))}
            </div>

            <H3 k="ivfclinic_h3_yt">{t("ivfclinic_h3_yt", "YouTube")}</H3>
            <div className="mt-2">
              {ytItems.map((item, i) => (
                <div key={i} className="grid grid-cols-[40px_1fr] gap-4 py-3.5 border-t first:border-t-0" style={{ borderColor: "#DCD5C6" }}>
                  <div className="font-bold text-lg" style={{ color: GREEN }}>{String(seoItems.length + i + 1).padStart(2, "0")}</div>
                  <div className="text-sm md:text-[15px] leading-relaxed" style={{ color: NAVY }} data-cms-key={`ivfclinic_yt_${i}`} data-cms-label={`YouTube Step ${i + 1}`} data-cms-attr="text">{item}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <H2 k="ivfclinic_h2_results">{t("ivfclinic_h2_results", "Six Months, Measured in Full")}</H2>
          <P k="ivfclinic_p_results_1">
            {t("ivfclinic_p_results_1", "Both engines compounded — search visibility fed steady organic demand, while YouTube turned dormant content into an active audience.")}
          </P>

          <H3 k="ivfclinic_h3_website_results">{t("ivfclinic_h3_website_results", "For the Website")}</H3>
          <motion.div {...fadeUp} className="grid sm:grid-cols-3 gap-4 my-6">
            {webResultItems.map((stat, i) => (
              <div key={i} className="rounded-xl px-5 py-5" style={{ background: NAVY }}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} style={{ color: GREEN }} />
                  <span data-cms-key={`ivfclinic_webresult_${i}_num`} data-cms-label={`Website Result ${i + 1} Number`} data-cms-attr="text" className="text-2xl font-black" style={{ color: "#86EFAC" }}>{stat.num}</span>
                </div>
                <div data-cms-key={`ivfclinic_webresult_${i}_label`} data-cms-label={`Website Result ${i + 1} Label`} data-cms-attr="text" className="text-xs" style={{ color: "#D1D5DB" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="rounded-xl border bg-white overflow-hidden my-6" style={{ borderColor: "#E5E7EB" }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: "#F3EDE2" }}>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-bold" style={{ color: MUTED }}>Google ranking position</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-bold" style={{ color: MUTED }}>May 2024</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-bold" style={{ color: MUTED }}>June 2024</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-bold" style={{ color: MUTED }}>July 2024</th>
                </tr>
              </thead>
              <tbody>
                {rankTable.map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "#E5E7EB" }}>
                    <td className="px-5 py-3.5 font-bold" style={{ color: GREEN }}>{row.pos}</td>
                    <td className="px-5 py-3.5" style={{ color: NAVY }}>{row.may}</td>
                    <td className="px-5 py-3.5" style={{ color: NAVY }}>{row.jun}</td>
                    <td className="px-5 py-3.5" style={{ color: NAVY }}>{row.jul}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p data-cms-key="ivfclinic_rank_note" data-cms-label="Ranking Note" data-cms-attr="text" className="text-sm mb-8" style={{ color: MUTED }}>
            {t("ivfclinic_rank_note", <>Total clicks over 6 months: <strong style={{ color: NAVY }}>9.78K</strong> · Total impressions: <strong style={{ color: NAVY }}>640K</strong></>)}
          </p>

          <motion.div {...fadeUp} className="rounded-xl border bg-white px-6 py-6 md:px-7 md:py-7 mb-10" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex gap-5 mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: MUTED }}><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: ORANGE }} />#1</span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: MUTED }}><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: BLUE }} />#2–3</span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: MUTED }}><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: GREEN }} />#4–10</span>
            </div>
            <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }} aria-label="Keywords ranking on page 1 of Google, by position bucket, May to July 2024">
              {[0, 15, 30, 45, 60].map((v, i) => {
                const y = 235 - (v / 60) * 205;
                return (
                  <g key={v}>
                    <line x1="60" y1={y} x2="620" y2={y} stroke="#E5E7EB" strokeWidth="1" />
                    <text x="50" y={y + 4} fontSize="11" fill={MUTED} textAnchor="end" fontFamily="system-ui, sans-serif">{v}</text>
                  </g>
                );
              })}
              {[
                { month: "May", mx: 100, bars: [{ x: 70, y: 231.6, h: 3.4, v: 1, c: ORANGE }, { x: 92, y: 204.2, h: 30.8, v: 9, c: BLUE }, { x: 114, y: 170.1, h: 64.9, v: 19, c: GREEN }] },
                { month: "June", mx: 220, bars: [{ x: 190, y: 211.1, h: 23.9, v: 7, c: ORANGE }, { x: 212, y: 187.2, h: 47.8, v: 14, c: BLUE }, { x: 234, y: 115.4, h: 119.6, v: 35, c: GREEN }] },
                { month: "July", mx: 340, bars: [{ x: 310, y: 200.8, h: 34.2, v: 10, c: ORANGE }, { x: 332, y: 156.4, h: 78.6, v: 23, c: BLUE }, { x: 354, y: 40.2, h: 194.8, v: 57, c: GREEN }] },
              ].map((group, gi) => (
                <g key={gi}>
                  {group.bars.map((b, bi) => (
                    <g key={bi}>
                      <rect x={b.x} y={b.y} width="16" height={b.h} rx="3" fill={b.c} />
                      <text x={b.x + 8} y={b.y - 6} fontSize="11.5" fontWeight="700" fill={NAVY} textAnchor="middle" fontFamily="system-ui, sans-serif">{b.v}</text>
                    </g>
                  ))}
                  <text x={group.mx} y="257" fontSize="12.5" fill={MUTED} textAnchor="middle" fontWeight="600" fontFamily="system-ui, sans-serif">{group.month}</text>
                </g>
              ))}
              <line x1="60" y1="235" x2="620" y2="235" stroke={NAVY} strokeWidth="1.2" />
            </svg>
            <div className="text-center text-xs mt-3.5" style={{ color: MUTED }}>Keywords ranking on page 1 of Google, by position bucket</div>
          </motion.div>

          <H3 k="ivfclinic_h3_youtube_results">{t("ivfclinic_h3_youtube_results", "For YouTube")}</H3>
          <motion.div {...fadeUp} className="grid sm:grid-cols-3 gap-4 my-6">
            {ytResultItems.map((stat, i) => (
              <div key={i} className="rounded-xl px-5 py-5" style={{ background: NAVY }}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} style={{ color: GREEN }} />
                  <span data-cms-key={`ivfclinic_ytresult_${i}_num`} data-cms-label={`YouTube Result ${i + 1} Number`} data-cms-attr="text" className="text-2xl font-black" style={{ color: "#86EFAC" }}>{stat.num}</span>
                </div>
                <div data-cms-key={`ivfclinic_ytresult_${i}_label`} data-cms-label={`YouTube Result ${i + 1} Label`} data-cms-attr="text" className="text-xs" style={{ color: "#D1D5DB" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="rounded-xl border bg-white px-6 py-6 md:px-7 md:py-7 mb-10" style={{ borderColor: "#E5E7EB" }}>
            <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }} aria-label="YouTube channel growth over the six-month engagement">
              {[
                { pct: "0%", y: 210 },
                { pct: "25%", y: 165 },
                { pct: "50%", y: 120 },
                { pct: "75%", y: 75 },
                { pct: "100%", y: 30 },
              ].map((g) => (
                <g key={g.pct}>
                  <line x1="60" y1={g.y} x2="620" y2={g.y} stroke="#E5E7EB" strokeWidth="1" />
                  <text x="50" y={g.y + 4} fontSize="11" fill={MUTED} textAnchor="end" fontFamily="system-ui, sans-serif">{g.pct}</text>
                </g>
              ))}
              {[
                { x: 90, y: 55.4, h: 154.6, label: "+85.9%", cap: "Views", c: ORANGE },
                { x: 240, y: 127.6, h: 82.4, label: "+45.8%", cap: "Watch time", c: BLUE },
                { x: 390, y: 155.5, h: 54.5, label: "+30.3%", cap: "Subscribers", c: GREEN },
              ].map((b, i) => (
                <g key={i}>
                  <rect x={b.x} y={b.y} width="90" height={b.h} rx="6" fill={b.c} />
                  <text x={b.x + 45} y={b.y - 10} fontSize="16" fontWeight="700" fill={NAVY} textAnchor="middle" fontFamily="system-ui, sans-serif">{b.label}</text>
                  <text x={b.x + 45} y="234" fontSize="13" fill={MUTED} textAnchor="middle" fontWeight="600" fontFamily="system-ui, sans-serif">{b.cap}</text>
                </g>
              ))}
              <line x1="60" y1="210" x2="620" y2="210" stroke={NAVY} strokeWidth="1.2" />
            </svg>
            <div className="text-center text-xs mt-3.5" style={{ color: MUTED }}>YouTube channel growth over the 6-month engagement</div>
          </motion.div>

          <Callout tone="green" k="ivfclinic_callout">
            {t("ivfclinic_callout", "This wasn't a story about weak service — it was a story about weak visibility. Once search and YouTube were both working as demand engines, the reputation this clinic had already earned finally started showing up where patients were actually looking.")}
          </Callout>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="mt-14 rounded-2xl text-center px-6 py-10 md:px-10 md:py-12"
            style={{ background: NAVY }}
          >
            <h2 data-cms-key="ivfclinic_cta_heading" data-cms-label="CTA Heading" data-cms-attr="text" className="text-2xl md:text-[28px] font-bold text-white mb-3">
              {t("ivfclinic_cta_heading", "Facing the Same Gap Between Your Reputation and Your Visibility?")}
            </h2>
            <p data-cms-key="ivfclinic_cta_text" data-cms-label="CTA Text" data-cms-attr="text" className="text-[15px] md:text-base max-w-xl mx-auto mb-6" style={{ color: "#BBF7D0" }}>
              {t("ivfclinic_cta_text", "Let Digital Aura build the search and content engine that turns your existing authority into steady, measurable demand.")}
            </p>
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
              <span data-cms-key="ivfclinic_cta_button" data-cms-label="CTA Button" data-cms-attr="text">{t("ivfclinic_cta_button", "Talk to Digital Aura Today")}</span> <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyIvfClinic;
