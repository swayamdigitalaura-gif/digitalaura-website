import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Trophy, Award, Star, ArrowRight, Calendar, Building2, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const ReelVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <div
      className="relative w-full max-w-[280px] rounded-[1.5rem] overflow-hidden"
      style={{ aspectRatio: "9/16", boxShadow: "0 4px 24px rgba(0,0,0,0.14)" }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{ background: "rgba(10,22,40,0.55)", backdropFilter: "blur(4px)" }}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
};

interface AwardItem {
  image: string;
  title: string;
  event: string;
  issuer: string;
  period: string;
  note?: string;
  color: string;
  description: string;
  reelVideo?: string;
}

const AWARDS: AwardItem[] = [
  {
    image: "/awards/award-2025-growth-partner.webp",
    title: "Growth Partner of the Year",
    event: "Excellence Awards 2025",
    issuer: "India Digital Excellence Awards",
    period: "2025",
    color: "#FF6B2B",
    description: "Recognized among India's top-performing digital agencies for consistently driving measurable growth — leads, revenue, and brand visibility — for client businesses across industries.",
  },
  {
    image: "/awards/award-quantumleap-business-inspiracorn.webp",
    title: "Business Inspiracorn 2025",
    event: "Business Success Awards",
    issuer: "QuantumLeap — Partners in Progress",
    period: "Sep 2025",
    color: "#1A6FE8",
    description: "Honored at QuantumLeap's Business Success Awards for building a scalable, growth-focused agency model — the kind of business trajectory the award is designed to spotlight.",
    reelVideo: "/awards/business-inspiracorn-reel.mp4",
  },
  {
    image: "/awards/award-2023-outstanding-partner.webp",
    title: "Outstanding Business Partner",
    event: "Marketing Excellence Awards 2023",
    issuer: "Global Marketing & Innovation Council",
    period: "2023",
    color: "#7C3AED",
    description: "Recognized by the Global Marketing & Innovation Council for marketing partnerships that go beyond campaigns and translate directly into client revenue.",
  },
  {
    image: "/awards/award-2022-client-success.webp",
    title: "Client Success Award",
    event: "Business Excellence Awards 2022",
    issuer: "Global Business Excellence Council",
    period: "2022",
    color: "#22C55E",
    description: "Awarded for measurable client outcomes — from lead generation to revenue growth — delivered consistently across a fast-growing client base.",
  },
  {
    image: "/awards/award-biztreez-winner-team.webp",
    title: "Winner Team — Sultan's of Ayyan",
    event: "BizTreez Networking League 2022",
    issuer: "BizTreez",
    period: "2022",
    note: "Captain: Sambhav Shah",
    color: "#EF4444",
    description: "Led the winning team at BizTreez's flagship networking league — a reflection of strong relationship-building, collaboration, and referral generation within the community.",
  },
  {
    image: "/awards/award-biztreez-bnl-performer.webp",
    title: "Best Performer of the Chapter (BNL)",
    event: "BizTreez Networking League 2022",
    issuer: "BizTreez",
    period: "2022",
    color: "#EC4899",
    description: "Recognized as the chapter's top individual performer for consistent referrals, active participation, and value delivered to fellow members.",
  },
  {
    image: "/awards/award-2017-emerging-business.webp",
    title: "Emerging Business Award",
    event: "Business Excellence Awards 2017",
    issuer: "National Business Excellence Forum",
    period: "2017",
    color: "#F59E0B",
    description: "Digital Aura's first national recognition — awarded early in the journey for standout growth potential and strong business fundamentals.",
  },
  {
    image: "/awards/award-bni-helios-core-team.webp",
    title: "Best Core Team Member in Helios",
    event: "BNI Helios",
    issuer: "BNI",
    period: "Chapter Award",
    color: "#7C3AED",
    description: "Recognized within the BNI Helios chapter for active leadership, dependable participation, and consistent value delivered to fellow members.",
  },
];

const STATS = [
  { label: "Awards Won", value: `${AWARDS.length}+`, color: "#FF6B2B" },
  { label: "Years of Recognition", value: "2017–25", color: "#7C3AED" },
  { label: "Recognizing Bodies", value: "6", color: "#1A6FE8" },
  { label: "National & Global", value: "100%", color: "#22C55E" },
];

const TIMELINE = [
  { year: "2017", text: "First national recognition — Emerging Business Award", color: "#F59E0B" },
  { year: "2022", text: "Three wins — Client Success + two BizTreez networking awards", color: "#22C55E" },
  { year: "2023", text: "Outstanding Business Partner — Marketing Excellence Awards", color: "#7C3AED" },
  { year: "2025", text: "Growth Partner of the Year + Business Inspiracorn", color: "#FF6B2B" },
];

// ---------- Full-width alternating award row ----------
const AwardRow = ({ a, index }: { a: AwardItem; index: number }) => {
  const reversed = index % 2 === 1;
  const k = (field: string) => `awards_card_${index}_${field}`;
  const hasReel = !!a.reelVideo;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="py-7 md:py-9 border-b last:border-b-0"
      style={{ borderColor: "#F0F1F4" }}
    >
      <div
        className={`max-w-6xl mx-auto px-4 md:px-8 grid gap-8 items-center ${
          hasReel
            ? reversed
              ? "md:grid-cols-[1fr_220px_340px] md:gap-6"
              : "md:grid-cols-[220px_340px_1fr] md:gap-6"
            : "md:grid-cols-2 md:gap-12"
        }`}
      >
        {/* Trophy image */}
        <div className={`flex justify-center ${reversed ? "md:order-2" : "md:order-1"}`}>
          <div
            className="relative w-full rounded-[2rem] flex items-center justify-center"
            style={{
              maxWidth: hasReel ? 220 : 340,
              aspectRatio: "4/5",
              background: `linear-gradient(155deg, ${a.color}12, ${a.color}03)`,
              border: `1px solid ${a.color}22`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <img
                src={a.image}
                alt={`${a.title} — ${a.event}`}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <span
              data-cms-key={k("period")}
              data-cms-label="Award Card Period"
              data-cms-attr="text"
              className="absolute top-5 right-5 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{ background: "#fff", color: a.color, boxShadow: `0 4px 14px ${a.color}25` }}
            >
              {a.period}
            </span>
          </div>
        </div>

        {/* Award reel — beside the trophy */}
        {hasReel && (
          <div className={`flex justify-center ${reversed ? "md:order-3" : "md:order-2"}`}>
            <ReelVideo src={a.reelVideo as string} />
          </div>
        )}

        {/* Text side */}
        <div className={hasReel ? (reversed ? "md:order-1" : "md:order-3") : reversed ? "md:order-1 md:text-right" : "md:order-2"}>
          <span className="inline-block text-[13px] font-black tracking-widest uppercase mb-3" style={{ color: a.color }}>
            {String(index + 1).padStart(2, "0")} — <span data-cms-key={k("event")} data-cms-label="Award Card Event" data-cms-attr="text">{a.event}</span>
          </span>
          <h3 data-cms-key={k("title")} data-cms-label="Award Card Title" data-cms-attr="text" className="text-2xl md:text-[34px] font-black text-[#0A1628] leading-[1.1] mb-4">{a.title}</h3>
          <div className={`flex items-center gap-2 text-[#6B7280] text-sm mb-3 ${!hasReel && reversed ? "md:justify-end" : ""}`}>
            <Building2 size={14} />
            <span data-cms-key={k("issuer")} data-cms-label="Award Card Issuer" data-cms-attr="text">{a.issuer}</span>
          </div>
          <p data-cms-key={k("description")} data-cms-label="Award Card Description" data-cms-attr="text" className="text-[#4B5563] text-[15px] leading-relaxed max-w-md mb-4" style={{ marginLeft: !hasReel && reversed ? "auto" : undefined }}>
            {a.description}
          </p>
          {a.note && (
            <div className={`flex items-center gap-2 text-[#6B7280] text-sm mb-1 ${!hasReel && reversed ? "md:justify-end" : ""}`}>
              <Star size={14} />
              <span data-cms-key={k("note")} data-cms-label="Award Card Note" data-cms-attr="text">{a.note}</span>
            </div>
          )}
          <div className={`h-1 w-16 rounded-full mt-6 ${!hasReel && reversed ? "md:ml-auto" : ""}`} style={{ background: a.color }} />
        </div>
      </div>
    </motion.div>
  );
};

const AwardsPage = () => {
  useCMSEditor();
  // Every piece of static marketing copy on this page is click-to-edit from the admin
  // Pages panel (same data-cms-key + useSettings mechanism as every other page). All
  // keys are namespaced with `awards_` so they can't collide with any other page.
  const keys = [
    "awards_hero_badge", "awards_hero_h1", "awards_hero_h1_highlight", "awards_hero_sub",
    "awards_timeline_badge", "awards_timeline_h2",
    "awards_cabinet_badge", "awards_cabinet_h2",
    "awards_cta_badge", "awards_cta_h2", "awards_cta_h2_highlight", "awards_cta_text",
    "awards_cta_button1", "awards_cta_button2",
    ...STATS.flatMap((_, i) => [`awards_stat_${i}_label`, `awards_stat_${i}_value`]),
    ...TIMELINE.flatMap((_, i) => [`awards_timeline_${i}_year`, `awards_timeline_${i}_text`]),
    ...AWARDS.flatMap((_, i) => [
      `awards_card_${i}_title`, `awards_card_${i}_event`, `awards_card_${i}_issuer`,
      `awards_card_${i}_period`, `awards_card_${i}_description`, `awards_card_${i}_note`,
    ]),
  ];
  const s = useSettings(keys);
  const g = (key: string, fallback: string) => s[key] || fallback;

  const heroBadge = g("awards_hero_badge", "Awards & Recognition");
  const heroH1 = g("awards_hero_h1", "Results That Get");
  const heroH1Highlight = g("awards_hero_h1_highlight", "Recognized");
  const heroSub = g(
    "awards_hero_sub",
    "From an Emerging Business Award in 2017 to Growth Partner of the Year in 2025 — our work has been recognized by national and global business councils every step of the way."
  );
  const timelineBadge = g("awards_timeline_badge", "Journey So Far");
  const timelineH2 = g("awards_timeline_h2", "A Track Record Built Year After Year");
  const cabinetBadge = g("awards_cabinet_badge", "Our Trophy Cabinet");
  const cabinetH2 = g("awards_cabinet_h2", "Every Award, Every Year");
  const ctaBadge = g("awards_cta_badge", "Award-Winning Growth Partner");
  const ctaH2 = g("awards_cta_h2", "Let's Add Your Success");
  const ctaH2Highlight = g("awards_cta_h2_highlight", "to the Story");
  const ctaText = g("awards_cta_text", "Partner with an agency whose results have been recognized nationally and globally, year after year.");
  const ctaButton1 = g("awards_cta_button1", "Get a Free Consultation");
  const ctaButton2 = g("awards_cta_button2", "View Case Studies");

  const stats = STATS.map((stat, i) => ({
    ...stat,
    label: g(`awards_stat_${i}_label`, stat.label),
    value: g(`awards_stat_${i}_value`, stat.value),
  }));
  const timeline = TIMELINE.map((t, i) => ({
    ...t,
    year: g(`awards_timeline_${i}_year`, t.year),
    text: g(`awards_timeline_${i}_text`, t.text),
  }));
  const awards = AWARDS.map((a, i) => ({
    ...a,
    title: g(`awards_card_${i}_title`, a.title),
    event: g(`awards_card_${i}_event`, a.event),
    issuer: g(`awards_card_${i}_issuer`, a.issuer),
    period: g(`awards_card_${i}_period`, a.period),
    description: g(`awards_card_${i}_description`, a.description),
    note: a.note ? g(`awards_card_${i}_note`, a.note) : a.note,
  }));

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#F8FAFF" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-15%", right: "-5%", background: "radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-20 pb-16 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.25)" }}>
              <Trophy size={12} /> <span data-cms-key="awards_hero_badge" data-cms-label="Hero Badge" data-cms-attr="text">{heroBadge}</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[58px] font-black leading-[1.08] text-[#0A1628] mb-5 tracking-tight">
              <span data-cms-key="awards_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">{heroH1}</span>{" "}
              <span className="text-orange-gradient" data-cms-key="awards_hero_h1_highlight" data-cms-label="Hero H1 Highlight" data-cms-attr="text">{heroH1Highlight}</span>
            </h1>
            <p className="text-[#4B5563] text-lg max-w-2xl mx-auto leading-relaxed" data-cms-key="awards_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">
              {heroSub}
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 text-center border bg-white"
                style={{ borderColor: `${stat.color}20`, boxShadow: `0 4px 20px ${stat.color}08` }}>
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: stat.color }} data-cms-key={`awards_stat_${i}_value`} data-cms-label="Stat Value" data-cms-attr="text">{stat.value}</div>
                <div className="text-xs text-[#6B7280] font-medium" data-cms-key={`awards_stat_${i}_label`} data-cms-label="Stat Label" data-cms-attr="text">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline strip — right below hero */}
      <section className="py-14 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}>
              <Calendar size={11} /> <span data-cms-key="awards_timeline_badge" data-cms-label="Timeline Badge" data-cms-attr="text">{timelineBadge}</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]" data-cms-key="awards_timeline_h2" data-cms-label="Timeline Heading" data-cms-attr="text">{timelineH2}</h2>
          </motion.div>
          <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-4">
            <div className="hidden md:block absolute top-4 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #F59E0B, #22C55E, #7C3AED, #FF6B2B)" }} />
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="relative flex md:flex-col items-center md:items-start gap-3 md:gap-3 md:flex-1">
                <div className="w-3 h-3 rounded-full shrink-0 relative z-10" style={{ background: t.color, boxShadow: `0 0 0 4px ${t.color}25` }} />
                <div>
                  <p className="font-black text-[#0A1628] text-lg" data-cms-key={`awards_timeline_${i}_year`} data-cms-label="Timeline Year" data-cms-attr="text">{t.year}</p>
                  <p className="text-xs text-[#6B7280] max-w-[220px]" data-cms-key={`awards_timeline_${i}_text`} data-cms-label="Timeline Text" data-cms-attr="text">{t.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial award rows */}
      <section className="px-0" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-widest uppercase"
            style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>
            <Award size={11} /> <span data-cms-key="awards_cabinet_badge" data-cms-label="Trophy Cabinet Badge" data-cms-attr="text">{cabinetBadge}</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]" data-cms-key="awards_cabinet_h2" data-cms-label="Trophy Cabinet Heading" data-cms-attr="text">{cabinetH2}</h2>
        </div>
        <div>
          {awards.map((a, i) => (
            <AwardRow key={`${a.title}-${i}`} a={a} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(255,107,43,0.1) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
              style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}
              data-cms-key="awards_cta_badge" data-cms-label="CTA Badge" data-cms-attr="text">
              {ctaBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              <span data-cms-key="awards_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">{ctaH2}</span>{" "}
              <span className="text-orange-gradient" data-cms-key="awards_cta_h2_highlight" data-cms-label="CTA Heading Highlight" data-cms-attr="text">{ctaH2Highlight}</span>
            </h2>
            <p className="text-[#94a3b8] mb-8 text-sm leading-relaxed max-w-lg mx-auto" data-cms-key="awards_cta_text" data-cms-label="CTA Text" data-cms-attr="text">
              {ctaText}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
                style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
                <span data-cms-key="awards_cta_button1" data-cms-label="CTA Button 1" data-cms-attr="text">{ctaButton1}</span> <ArrowRight size={15} />
              </Link>
              <Link to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border transition-all"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}>
                <span data-cms-key="awards_cta_button2" data-cms-label="CTA Button 2" data-cms-attr="text">{ctaButton2}</span> <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AwardsPage;
