import { motion } from "framer-motion";
import { useEffect } from "react";
import { Trophy, Award, Star, ArrowRight, Calendar, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const INSTAGRAM_EMBED_SKELETON = `<div style="padding:16px;"> <a href="https://www.instagram.com/reel/REEL_ID/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/REEL_ID/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Sambhav Shah - Digital Marketing (@sambhavshah2)</a></p></div>`;

const InstagramReelEmbed = ({ reelId }: { reelId: string }) => {
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const tryProcess = () => {
      if (cancelled) return;
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        return;
      }
      attempts += 1;
      if (attempts < 12) setTimeout(tryProcess, 500);
    };

    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
    tryProcess();

    return () => { cancelled = true; };
  }, [reelId]);

  const permalink = `https://www.instagram.com/reel/${reelId}/?utm_source=ig_embed&utm_campaign=loading`;

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={permalink}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: 1,
        maxWidth: 540,
        minWidth: 326,
        padding: 0,
        width: "calc(100% - 2px)",
      }}
      dangerouslySetInnerHTML={{ __html: INSTAGRAM_EMBED_SKELETON.split("REEL_ID").join(reelId) }}
    />
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
  instagramReelId?: string;
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
    instagramReelId: "DRPTFvHjF-Y",
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
  const hasReel = !!a.instagramReelId;
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
              className="absolute top-5 right-5 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{ background: "#fff", color: a.color, boxShadow: `0 4px 14px ${a.color}25` }}
            >
              {a.period}
            </span>
          </div>
        </div>

        {/* Instagram reel — beside the trophy */}
        {hasReel && (
          <div className={`flex justify-center ${reversed ? "md:order-3" : "md:order-2"}`}>
            <InstagramReelEmbed reelId={a.instagramReelId as string} />
          </div>
        )}

        {/* Text side */}
        <div className={hasReel ? (reversed ? "md:order-1" : "md:order-3") : reversed ? "md:order-1 md:text-right" : "md:order-2"}>
          <span className="inline-block text-[13px] font-black tracking-widest uppercase mb-3" style={{ color: a.color }}>
            {String(index + 1).padStart(2, "0")} — {a.event}
          </span>
          <h3 className="text-2xl md:text-[34px] font-black text-[#0A1628] leading-[1.1] mb-4">{a.title}</h3>
          <div className={`flex items-center gap-2 text-[#6B7280] text-sm mb-3 ${!hasReel && reversed ? "md:justify-end" : ""}`}>
            <Building2 size={14} />
            <span>{a.issuer}</span>
          </div>
          <p className="text-[#4B5563] text-[15px] leading-relaxed max-w-md mb-4" style={{ marginLeft: !hasReel && reversed ? "auto" : undefined }}>
            {a.description}
          </p>
          {a.note && (
            <div className={`flex items-center gap-2 text-[#6B7280] text-sm mb-1 ${!hasReel && reversed ? "md:justify-end" : ""}`}>
              <Star size={14} />
              <span>{a.note}</span>
            </div>
          )}
          <div className={`h-1 w-16 rounded-full mt-6 ${!hasReel && reversed ? "md:ml-auto" : ""}`} style={{ background: a.color }} />
        </div>
      </div>
    </motion.div>
  );
};

const AwardsPage = () => {
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
              <Trophy size={12} /> Awards & Recognition
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[58px] font-black leading-[1.08] text-[#0A1628] mb-5 tracking-tight">
              Results That Get <span className="text-orange-gradient">Recognized</span>
            </h1>
            <p className="text-[#4B5563] text-lg max-w-2xl mx-auto leading-relaxed">
              From an Emerging Business Award in 2017 to Growth Partner of the Year in 2025 — our work has been
              recognized by national and global business councils every step of the way.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 text-center border bg-white"
                style={{ borderColor: `${s.color}20`, boxShadow: `0 4px 20px ${s.color}08` }}>
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-[#6B7280] font-medium">{s.label}</div>
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
              <Calendar size={11} /> Journey So Far
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]">A Track Record Built Year After Year</h2>
          </motion.div>
          <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-4">
            <div className="hidden md:block absolute top-4 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #F59E0B, #22C55E, #7C3AED, #FF6B2B)" }} />
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="relative flex md:flex-col items-center md:items-start gap-3 md:gap-3 md:flex-1">
                <div className="w-3 h-3 rounded-full shrink-0 relative z-10" style={{ background: t.color, boxShadow: `0 0 0 4px ${t.color}25` }} />
                <div>
                  <p className="font-black text-[#0A1628] text-lg">{t.year}</p>
                  <p className="text-xs text-[#6B7280] max-w-[220px]">{t.text}</p>
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
            <Award size={11} /> Our Trophy Cabinet
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]">Every Award, Every Year</h2>
        </div>
        <div>
          {AWARDS.map((a, i) => (
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
              style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
              Award-Winning Growth Partner
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Let's Add Your Success <span className="text-orange-gradient">to the Story</span>
            </h2>
            <p className="text-[#94a3b8] mb-8 text-sm leading-relaxed max-w-lg mx-auto">
              Partner with an agency whose results have been recognized nationally and globally, year after year.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
                style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
                Get a Free Consultation <ArrowRight size={15} />
              </Link>
              <Link to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border transition-all"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}>
                View Case Studies <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AwardsPage;
