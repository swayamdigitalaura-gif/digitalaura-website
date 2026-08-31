import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { ArrowRight, ArrowLeft } from "lucide-react";
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
    style={{ color: NAVY, borderColor: BLUE }}
  >
    {children}
  </motion.h2>
);

const P = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <p data-cms-key={k} data-cms-label="Paragraph" data-cms-attr="text" className="text-base md:text-[17px] leading-relaxed mb-4" style={{ color: NAVY }}>
    {children}
  </p>
);

const Callout = ({
  children,
  tone = "blue",
  k,
}: {
  children: React.ReactNode;
  tone?: "blue" | "orange";
  k?: string;
}) => {
  const map = {
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

const Screenshot = ({
  tag,
  src,
  alt,
  caption,
  tagKey,
  captionKey,
}: {
  tag: string;
  src: string;
  alt: string;
  caption: string;
  tagKey?: string;
  captionKey?: string;
}) => (
  <motion.div {...fadeUp} className="my-8">
    <span
      data-cms-key={tagKey} data-cms-label="Screenshot Tag" data-cms-attr="text"
      className="block text-center text-[11px] md:text-xs font-bold tracking-wider uppercase mb-3"
      style={{ color: BLUE }}
    >
      {tag}
    </span>
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 24px rgba(10,22,40,0.08)" }}
    >
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
    </div>
    <p data-cms-key={captionKey} data-cms-label="Screenshot Caption" data-cms-attr="text" className="text-center text-sm italic mt-3" style={{ color: MUTED }}>
      {caption}
    </p>
  </motion.div>
);

const challengeCards = [
  { tag: "down", num: "10% Impression Share", text: "100% of landing pages rated \"Poor\" by Google — capping visibility so severely that 9 of every 10 searches never saw an OBLPrint ad." },
  { tag: "down", num: "Broken Migration", text: "New product pages returned unreadable redirects. Old URLs stayed indexed. Years of SEO equity, gone overnight." },
  { tag: "down", num: "80+ Keywords, 1 Ad Group", text: "20+ competitor brand terms draining budget. Zero negative keywords anywhere in the account." },
  { tag: "down", num: "31 / 100 Health Score", text: "All three live ads rated only \"Average\" — no strong or excellent creative running anywhere." },
];

const feelingsBefore = [
  { title: "Money Leaving, Phone Silent", text: "Every month, budget went out the door and the WhatsApp stayed quiet — the exact pattern that makes an owner dread the ad spend line item." },
  { title: "Watching Rivals Win", text: "Decades-old names like DLX Print and OPPS PRINT kept dominating the same searches, despite OBLPrint having the better rating." },
  { title: "Second-Guessing the Channel", text: "The nagging question every owner dreads: is this even working, or is it just money going out the door?" },
  { title: "Confidence Draining", text: "Not a product problem, not a service problem — but it felt like one, because nothing seemed to be moving." },
];

const solutions = [
  "Rebuilt and restructured the Google Ads account into focused, product-specific campaigns — Stickers, Banners, Foamboard, and a dedicated Google Shopping campaign — replacing the single cluttered ad group with clean, high-relevance structures.",
  "Launched Google Shopping campaigns for stickers, banner printing, foam board printing, and other core products, putting OBLPrint's catalogue directly in front of buyers already comparing prices on Google.",
  "Set up proper conversion tracking across every channel that actually matters to a UAE buyer — WhatsApp click-to-chat, phone calls, and contact form fills — not just the default \"Conversions\" column that was hiding most of the real activity.",
  "Cleaned up wasted spend by removing irrelevant and competitor-brand keywords, and put negative keyword coverage in place across every active campaign.",
  "Prioritized WhatsApp as the primary call-to-action across ad creative — meeting UAE buyers exactly where they prefer to close a purchase.",
];

const resultCards = [
  { tag: "up", num: "79.1% Optimization Score", text: "Up from 31/100 — now well above the 70% industry-healthy benchmark, straight out of the restructuring and cleanup." },
  { tag: "up", num: "35 WhatsApp Click-to-Chats", text: "Nearly 90% of all tracked engagement account-wide — Stickers and Foamboard campaigns driving the majority of it." },
  { tag: "up", num: "Up to 14.6% CTR", text: "On top-performing search keywords like \"banner printing dubai\" — the right buyers finally seeing, and clicking, the right ads." },
  { tag: "up", num: "AED 0.99 Shopping CPC", text: "39 total tracked buyer engagements across the account for AED 2,013 in spend for the month." },
];

const feelingsAfter = [
  { title: "The Phone Won't Stop", text: "WhatsApp inquiries arriving every week, real conversations turning into real sales — exactly what was missing before." },
  { title: "From Doubt to Trust", text: "The nagging \"is this even working\" question is gone, replaced by an owner who checks WhatsApp every morning expecting new business." },
  { title: "A Growth Engine, Not a Cost", text: "Ad spend is no longer something to justify — it's a line item the owner now wants to grow, not shrink." },
  { title: "Momentum, Not Anxiety", text: "A clear roadmap already in motion — more Shopping budget, new product lines — built on confidence instead of guesswork." },
];

const julyStats = [
  { num: "38,295", label: "Impressions in July" },
  { num: "595", label: "Clicks Generated" },
  { num: "79.1%", label: "Optimization Score" },
];

const engagementStats = [
  { num: "39", label: "Real Buyer Engagements" },
  { num: "35", label: "WhatsApp Click-to-Chats" },
  { num: "AED 0.99", label: "Shopping Cost / Click" },
];

const heroStats = [
  { num: "31 → 79.1%", label: "Ad account health" },
  { num: "35", label: "WhatsApp chats in a month" },
  { num: "39", label: "Real buyer engagements" },
];

// Deliberately NOT under /case-studies/ — that path collides with the React route of the
// same name, and nginx resolves the URL to this real directory and 403s instead of falling
// through to the SPA rewrite.
const IMG = "/case-study-assets/oblprint";

const OBL_KEYS = [
  "obl_heroTitle", "obl_heroSubtitle",
  "obl_h2_about", "obl_p_about_1", "obl_p_about_2", "obl_p_about_3", "obl_quote_about", "obl_p_about_4",
  "obl_shot_1_tag", "obl_shot_1_caption",
  "obl_shot_2_tag", "obl_shot_2_caption",
  "obl_shot_3_tag", "obl_shot_3_caption",
  "obl_h2_challenge", "obl_p_challenge_1",
  "obl_h3_felt", "obl_p_felt_summary",
  "obl_h2_solutions", "obl_p_solutions_1",
  "obl_h2_results", "obl_p_results_1",
  "obl_h3_feels_now",
  "obl_quote_final",
  "obl_cta_heading", "obl_cta_text", "obl_cta_button",
  ...heroStats.flatMap((_, i) => [`obl_herostat_${i}_num`, `obl_herostat_${i}_label`]),
  ...challengeCards.flatMap((_, i) => [`obl_challenge_${i}_num`, `obl_challenge_${i}_text`]),
  ...feelingsBefore.flatMap((_, i) => [`obl_feelbefore_${i}_title`, `obl_feelbefore_${i}_text`]),
  ...solutions.map((_, i) => `obl_solution_${i}`),
  ...julyStats.flatMap((_, i) => [`obl_julystat_${i}_num`, `obl_julystat_${i}_label`]),
  ...engagementStats.flatMap((_, i) => [`obl_engstat_${i}_num`, `obl_engstat_${i}_label`]),
  ...resultCards.flatMap((_, i) => [`obl_result_${i}_num`, `obl_result_${i}_text`]),
  ...feelingsAfter.flatMap((_, i) => [`obl_feelafter_${i}_title`, `obl_feelafter_${i}_text`]),
];

const CaseStudyOblprint = () => {
  useCMSEditor();
  const s = useSettings(OBL_KEYS);
  const t = (key: string, fallback: React.ReactNode) => s[key] || fallback;

  const heroTitle = t(
    "obl_heroTitle",
    <>Turning a Silent Google Ads Account Into <em style={{ fontStyle: "normal", color: ORANGE }}>Dubai's Busiest WhatsApp Inbox</em>.</>
  );
  const heroSubtitle = t(
    "obl_heroSubtitle",
    "OBLPrint, a custom printing company in Al Quoz 2, Dubai, had a 4.9-star reputation and every ingredient for online success — except a Google Ads account that could be found. Digital Aura rebuilt it from the ground up."
  );

  const heroStatItems = heroStats.map((stat, i) => ({
    num: t(`obl_herostat_${i}_num`, stat.num),
    label: t(`obl_herostat_${i}_label`, stat.label),
  }));
  const challengeItems = challengeCards.map((c, i) => ({
    num: t(`obl_challenge_${i}_num`, c.num),
    text: t(`obl_challenge_${i}_text`, c.text),
  }));
  const feelBeforeItems = feelingsBefore.map((f, i) => ({
    title: t(`obl_feelbefore_${i}_title`, f.title),
    text: t(`obl_feelbefore_${i}_text`, f.text),
  }));
  const solutionItems = solutions.map((sol, i) => t(`obl_solution_${i}`, sol));
  const julyStatItems = julyStats.map((r, i) => ({
    num: t(`obl_julystat_${i}_num`, r.num),
    label: t(`obl_julystat_${i}_label`, r.label),
  }));
  const engagementStatItems = engagementStats.map((r, i) => ({
    num: t(`obl_engstat_${i}_num`, r.num),
    label: t(`obl_engstat_${i}_label`, r.label),
  }));
  const resultItems = resultCards.map((r, i) => ({
    num: t(`obl_result_${i}_num`, r.num),
    text: t(`obl_result_${i}_text`, r.text),
  }));
  const feelAfterItems = feelingsAfter.map((f, i) => ({
    title: t(`obl_feelafter_${i}_title`, f.title),
    text: t(`obl_feelafter_${i}_text`, f.text),
  }));

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="relative pt-[72px] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY}, #101B45)` }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full animate-drift"
            style={{
              width: 500, height: 500, top: "-15%", right: "-10%",
              background: "radial-gradient(circle, rgba(26,111,232,0.28) 0%, transparent 70%)",
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
                style={{ color: "#BFD3FF" }}
              >
                <ArrowLeft size={15} /> All Case Studies
              </Link>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-center"
                style={{ background: BLUE, color: "#FFFFFF" }}
              >
                Case Study &middot; Google Ads &amp; Shopping
              </span>
            </div>
            <h1 data-cms-key="obl_heroTitle" data-cms-label="Hero Title" data-cms-attr="text" className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold leading-[1.15] text-white mb-6 tracking-tight">
              {heroTitle}
            </h1>
            <p data-cms-key="obl_heroSubtitle" data-cms-label="Hero Subtitle" data-cms-attr="text" className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#BFD3FF" }}>
              {heroSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
              {heroStatItems.map((stat, i) => (
                <div key={i} className="rounded-xl px-5 py-5 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span data-cms-key={`obl_herostat_${i}_num`} data-cms-label={`Hero Stat ${i + 1} Number`} data-cms-attr="text" className="block text-2xl font-black mb-1.5 text-white">
                    {stat.num}
                  </span>
                  <span data-cms-key={`obl_herostat_${i}_label`} data-cms-label={`Hero Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs leading-snug" style={{ color: "#BFD3FF" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Snapshot bar */}
      <div className="py-7 px-4 md:px-8" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Industry</div>
            <div className="text-sm font-semibold text-white">Custom Printing &amp; Signage</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Location</div>
            <div className="text-sm font-semibold text-white">Al Quoz 2, Dubai, UAE</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Service</div>
            <div className="text-sm font-semibold text-white">Google Ads — Search &amp; Shopping</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Partner Since</div>
            <div className="text-sm font-semibold text-white">April 2026</div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <section className="py-14 md:py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <H2 k="obl_h2_about">{t("obl_h2_about", "A Strong Brand That Google Couldn't Surface")}</H2>
          <P k="obl_p_about_1">
            {t("obl_p_about_1", "OBLPrint is a custom printing company based in Al Quoz 2, Dubai, serving businesses and individuals across the UAE with business cards, flyers, banners, foam boards, stickers, and custom packaging.")}
          </P>
          <P k="obl_p_about_2">
            {t("obl_p_about_2", <>Over the years, the business built a loyal following on the strength of its work — reflected in a <strong style={{ color: NAVY }}>4.9-star rating across 97 Google reviews</strong> — and had already invested in a full online ordering cart to make buying easy for its customers.</>)}
          </P>
          <P k="obl_p_about_3">
            {t("obl_p_about_3", "What set OBLPrint apart wasn't just its core catalogue, but the specialty products competitors rarely promoted: raised foiling, duratrans, acrylic boards, and frosted stickers. Combined with a WhatsApp-first way of doing business — exactly how UAE customers prefer to order — OBLPrint had, on paper, everything it needed to lead its category online.")}
          </P>

          <Callout tone="blue" k="obl_quote_about">
            {t("obl_quote_about", "Strong products, genuine reviews, and a customer base that already trusted the brand — OBLPrint had every ingredient for online success except a digital presence that could be found.")}
          </Callout>

          <P k="obl_p_about_4">
            {t("obl_p_about_4", "But in a Dubai printing market crowded with 25–40 year old names like DLX Print and OPPS PRINT, being good wasn't translating into being visible. Something upstream of the product was quietly holding the business back.")}
          </P>

          <motion.div {...fadeUp} className="grid sm:grid-cols-3 gap-4 my-6">
            <Screenshot
              tag={t("obl_shot_1_tag", "Homepage & Deals Menu") as string}
              tagKey="obl_shot_1_tag"
              src={`${IMG}/oblprint-homepage-deals-menu.png`}
              alt="OBLPrint homepage — Deals menu"
              caption={t("obl_shot_1_caption", "oblprint.com — homepage & Deals menu") as string}
              captionKey="obl_shot_1_caption"
            />
            <Screenshot
              tag={t("obl_shot_2_tag", "Print Advertising Range") as string}
              tagKey="obl_shot_2_tag"
              src={`${IMG}/oblprint-print-advertising-business-stationery.png`}
              alt="OBLPrint Print Advertising and Business Stationery menu"
              caption={t("obl_shot_2_caption", "Print Advertising & Business Stationery range") as string}
              captionKey="obl_shot_2_caption"
            />
            <Screenshot
              tag={t("obl_shot_3_tag", "Signs & Banners") as string}
              tagKey="obl_shot_3_tag"
              src={`${IMG}/oblprint-signs-banners-menu.png`}
              alt="OBLPrint Signs & Banners menu"
              caption={t("obl_shot_3_caption", "Signs & Banners, Rigid Signs, Backdrops") as string}
              captionKey="obl_shot_3_caption"
            />
          </motion.div>

          <H2 k="obl_h2_challenge">{t("obl_h2_challenge", "What We Found When We Opened the Account")}</H2>
          <P k="obl_p_challenge_1">
            {t("obl_p_challenge_1", "When OBLPrint's Google Ads account and website were audited, the picture that emerged wasn't one of a struggling product — it was a business that had become almost invisible to the very customers actively searching for it.")}
          </P>

          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 my-6">
            {challengeItems.map((c, i) => (
              <div key={i} className="rounded-xl border bg-white px-5 py-5" style={{ borderColor: "#E5E7EB" }}>
                <span data-cms-key={`obl_challenge_${i}_num`} data-cms-label={`Challenge ${i + 1} Number`} data-cms-attr="text" className="block text-lg font-black mb-1.5" style={{ color: "#D14343" }}>{c.num}</span>
                <span data-cms-key={`obl_challenge_${i}_text`} data-cms-label={`Challenge ${i + 1} Text`} data-cms-attr="text" className="text-sm leading-relaxed" style={{ color: MUTED }}>{c.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="rounded-xl border bg-white px-6 py-6 my-6" style={{ borderColor: "#E5E7EB" }}>
            <H2 k="obl_h3_felt">{t("obl_h3_felt", "What It Felt Like")}</H2>
            <div className="grid sm:grid-cols-2 gap-3">
              {feelBeforeItems.map((f, i) => (
                <div key={i} className="rounded-lg px-4 py-4" style={{ background: "#F8FAFF" }}>
                  <span data-cms-key={`obl_feelbefore_${i}_title`} data-cms-label={`Feeling Before ${i + 1} Title`} data-cms-attr="text" className="block font-bold text-[14px] mb-1" style={{ color: NAVY }}>{f.title}</span>
                  <span data-cms-key={`obl_feelbefore_${i}_text`} data-cms-label={`Feeling Before ${i + 1} Text`} data-cms-attr="text" className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <P k="obl_p_felt_summary">
            {t("obl_p_felt_summary", "This wasn't a business with a weak product losing to stronger competitors on merit. It was a strong business losing on visibility — and the owner had no way to see that from the inside.")}
          </P>

          <H2 k="obl_h2_solutions">{t("obl_h2_solutions", "How Digital Aura Rebuilt the Account for Growth")}</H2>
          <P k="obl_p_solutions_1">
            {t("obl_p_solutions_1", "Rather than tweaking a broken system, we rebuilt OBLPrint's Google Ads foundation from the ground up — fixing the technical issues first, then restructuring the account to match how customers actually search and buy.")}
          </P>

          <motion.div {...fadeUp} className="my-6 rounded-xl border bg-white overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
            {solutionItems.map((sol, i) => (
              <div key={i} className={`flex items-start gap-4 px-5 py-4 ${i !== 0 ? "border-t" : ""}`} style={{ borderColor: "#E5E7EB" }}>
                <span className="flex-none w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: BLUE }}>{i + 1}</span>
                <span data-cms-key={`obl_solution_${i}`} data-cms-label={`Solution ${i + 1}`} data-cms-attr="text" className="text-[15px] leading-relaxed" style={{ color: MUTED }}>{sol}</span>
              </div>
            ))}
          </motion.div>

          <H2 k="obl_h2_results">{t("obl_h2_results", "Verified From the July 2026 Google Ads Performance Report")}</H2>
          <P k="obl_p_results_1">
            {t("obl_p_results_1", "Within months, the account went from barely functioning to genuinely performing — and, more importantly, from generating almost no visible activity to becoming OBLPrint's busiest sales channel.")}
          </P>

          <motion.div {...fadeUp} className="rounded-xl px-6 py-7 my-6" style={{ background: NAVY }}>
            <div className="grid grid-cols-3 gap-4 text-center">
              {julyStatItems.map((stat, i) => (
                <div key={i}>
                  <span data-cms-key={`obl_julystat_${i}_num`} data-cms-label={`July Stat ${i + 1} Number`} data-cms-attr="text" className="block text-xl md:text-2xl font-black text-white">{stat.num}</span>
                  <span data-cms-key={`obl_julystat_${i}_label`} data-cms-label={`July Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs mt-1 block" style={{ color: "#9FB3DE" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="rounded-xl px-6 py-7 my-6" style={{ background: BLUE }}>
            <div className="grid grid-cols-3 gap-4 text-center">
              {engagementStatItems.map((stat, i) => (
                <div key={i}>
                  <span data-cms-key={`obl_engstat_${i}_num`} data-cms-label={`Engagement Stat ${i + 1} Number`} data-cms-attr="text" className="block text-xl md:text-2xl font-black text-white">{stat.num}</span>
                  <span data-cms-key={`obl_engstat_${i}_label`} data-cms-label={`Engagement Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs mt-1 block" style={{ color: "#DCE8FF" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 my-6">
            {resultItems.map((r, i) => (
              <div key={i} className="rounded-xl border bg-white px-5 py-5" style={{ borderColor: "#E5E7EB" }}>
                <span data-cms-key={`obl_result_${i}_num`} data-cms-label={`Result ${i + 1} Number`} data-cms-attr="text" className="block text-lg font-black mb-1.5" style={{ color: GREEN }}>{r.num}</span>
                <span data-cms-key={`obl_result_${i}_text`} data-cms-label={`Result ${i + 1} Text`} data-cms-attr="text" className="text-sm leading-relaxed" style={{ color: MUTED }}>{r.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="rounded-xl border bg-white px-6 py-6 my-6" style={{ borderColor: "#E5E7EB" }}>
            <H2 k="obl_h3_feels_now">{t("obl_h3_feels_now", "What It Feels Like Now")}</H2>
            <div className="grid sm:grid-cols-2 gap-3">
              {feelAfterItems.map((f, i) => (
                <div key={i} className="rounded-lg px-4 py-4" style={{ background: "#F8FAFF" }}>
                  <span data-cms-key={`obl_feelafter_${i}_title`} data-cms-label={`Feeling After ${i + 1} Title`} data-cms-attr="text" className="block font-bold text-[14px] mb-1" style={{ color: NAVY }}>{f.title}</span>
                  <span data-cms-key={`obl_feelafter_${i}_text`} data-cms-label={`Feeling After ${i + 1} Text`} data-cms-attr="text" className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <Callout tone="blue" k="obl_quote_final">
            {t("obl_quote_final", "From wondering whether Google Ads was worth the spend, to checking WhatsApp every morning for new inquiries — OBLPrint's relationship with digital advertising has completely turned around.")}
          </Callout>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="mt-14 rounded-2xl text-center px-6 py-10 md:px-10 md:py-12"
            style={{ background: NAVY }}
          >
            <h2 data-cms-key="obl_cta_heading" data-cms-label="CTA Heading" data-cms-attr="text" className="text-2xl md:text-[28px] font-bold text-white mb-3">
              {t("obl_cta_heading", "Ready to Turn Your Ad Spend Into Real Conversations?")}
            </h2>
            <p data-cms-key="obl_cta_text" data-cms-label="CTA Text" data-cms-attr="text" className="text-[15px] md:text-base max-w-xl mx-auto mb-6" style={{ color: "#BFD3FF" }}>
              {t("obl_cta_text", "Contact us today to discover how we can elevate your digital presence and drive growth for your business.")}
            </p>
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
              <span data-cms-key="obl_cta_button" data-cms-label="CTA Button" data-cms-attr="text">{t("obl_cta_button", "Talk to Digital Aura Today")}</span> <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyOblprint;
