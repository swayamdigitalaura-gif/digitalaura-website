import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ArrowLeft, XCircle, TrendingUp, ChevronRight,
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

/* Distinct palette from the other case studies — gold/black lifted from
   The Grand Palace's own branding, instead of the site's usual navy/blue. */
const INK = "#1c1208";
const GOLD = "#c8952f";
const GOLD_LIGHT = "#e8b95a";
const CREAM = "#faf6ee";
const RED = "#b8362a";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const Divider = () => (
  <div className="flex items-center justify-center gap-3 my-5">
    <span style={{ width: 28, height: 1, background: GOLD }} />
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
    <span style={{ width: 28, height: 1, background: GOLD }} />
  </div>
);

const H2 = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <motion.h2
    {...fadeUp}
    data-cms-key={k} data-cms-label="Heading" data-cms-attr="text"
    className="text-2xl md:text-[28px] font-bold mt-16 mb-1 text-center"
    style={{ color: INK, fontFamily: "'Playfair Display', 'Georgia', serif" }}
  >
    {children}
  </motion.h2>
);

const H3 = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <h3 data-cms-key={k} data-cms-label="Subheading" data-cms-attr="text" className="text-lg md:text-xl font-bold mt-8 mb-2" style={{ color: GOLD }}>
    {children}
  </h3>
);

const P = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <p data-cms-key={k} data-cms-label="Paragraph" data-cms-attr="text" className="text-base md:text-[17px] leading-relaxed mb-4" style={{ color: INK }}>
    {children}
  </p>
);

const Pullquote = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <motion.div
    {...fadeUp}
    className="my-7 px-6 py-5 md:px-8 md:py-6 rounded-sm"
    style={{ background: "#fdf1ec", borderLeft: `4px solid ${RED}` }}
  >
    <p data-cms-key={k} data-cms-label="Pullquote" data-cms-attr="text" className="font-semibold text-[15px] md:text-[17px] leading-relaxed m-0" style={{ color: RED }}>
      {children}
    </p>
  </motion.div>
);

const Screenshot = ({
  tag, src, alt, caption, tagKey, captionKey,
}: {
  tag: string; src: string; alt: string; caption: string; tagKey?: string; captionKey?: string;
}) => (
  <motion.div {...fadeUp} className="my-8">
    <span
      data-cms-key={tagKey} data-cms-label="Screenshot Tag" data-cms-attr="text"
      className="block text-center text-[11px] md:text-xs font-bold tracking-wider uppercase mb-3"
      style={{ color: GOLD }}
    >
      {tag}
    </span>
    <div className="rounded-sm overflow-hidden border-2" style={{ borderColor: GOLD_LIGHT, boxShadow: "0 12px 30px rgba(28,18,8,0.15)" }}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
    </div>
    <p data-cms-key={captionKey} data-cms-label="Screenshot Caption" data-cms-attr="text" className="text-center text-sm italic mt-3" style={{ color: "#8a7256" }}>
      {caption}
    </p>
  </motion.div>
);

const domino = [
  "No website",
  "Invisible in search",
  "Competitors found first",
  "Growth capped at referrals",
  "Competitors kept growing faster",
];

const internalChallenges = [
  { title: "No Digital Storefront", text: "No website meant nowhere to send a curious customer who found them on Google or Instagram." },
  { title: "Events Went Unnoticed", text: "The restaurant offers venue hire, birthday packages, and corporate catering — most of the audience didn't know any of it existed." },
  { title: "No Online Booking or Ordering", text: "Every table and every order depended on someone answering the phone. Enquiries were lost by default." },
  { title: "A Trust Gap With Modern Diners", text: "Today's customers check online before they show up. No site, no visible reviews, no presence — trust drops before they even walk in." },
];

const risks = [
  "Competitors keep pulling ahead in local search",
  "Loyal customers age out, and fewer new ones discover the restaurant",
  "Banquet and events business stays underused",
  "Digital marketing keeps getting harder to catch up on the longer it's delayed",
];

const rankTable = [
  { pos: "#1–#3", apr: "5 keywords", may: "12 keywords", jun: "21 keywords" },
  { pos: "#4–#10", apr: "22 keywords", may: "30 keywords", jun: "50 keywords" },
];

const sessionStats = [
  { num: "1.26K+", label: "Organic search sessions" },
  { num: "2.4K+", label: "Total sessions" },
  { num: "400+", label: "Direct sessions" },
  { num: "220+", label: "Referral sessions" },
  { num: "120+", label: "Paid social sessions" },
  { num: "60+", label: "Paid search sessions" },
];

const engagementStats = [
  { num: "+73%", label: "Instagram engagement" },
  { num: "+66.1%", label: "Facebook engagement" },
  { num: "+78.3%", label: "Google Business Profile interactions" },
];

const IMG = "/case-study-assets/grand-palace";

const GRANDPALACE_KEYS = [
  "gp_heroTitle", "gp_heroSubtitle", "gp_intro",
  "gp_h2_business", "gp_p_business_1", "gp_p_business_2",
  "gp_h2_problem", "gp_p_problem_1", "gp_pullquote_1", "gp_p_problem_2",
  "gp_h2_domino", "gp_p_domino_1", "gp_p_domino_2",
  "gp_h2_internal", "gp_p_internal_1",
  "gp_h2_risks", "gp_p_risks_1",
  "gp_h2_built", "gp_p_built_1",
  "gp_h3_built_1", "gp_p_built_1_1",
  "gp_h3_built_2", "gp_p_built_2_1",
  "gp_h3_built_3", "gp_p_built_3_1",
  "gp_h3_built_4", "gp_p_built_4_1",
  "gp_h3_built_5", "gp_p_built_5_1",
  "gp_h3_built_6", "gp_p_built_6_1",
  "gp_h2_live", "gp_p_live_1", "gp_p_live_note",
  "gp_shot_header_tag", "gp_shot_header_caption",
  "gp_shot_top_tag", "gp_shot_top_caption",
  "gp_shot_mid_tag", "gp_shot_mid_caption",
  "gp_shot_bottom_tag", "gp_shot_bottom_caption",
  "gp_h2_results", "gp_p_results_1",
  "gp_shot_chart_tag", "gp_shot_chart_caption",
  "gp_p_results_2",
  "gp_cta_heading", "gp_cta_text", "gp_cta_button",
  ...domino.map((_, i) => `gp_domino_${i}`),
  ...internalChallenges.flatMap((_, i) => [`gp_challenge_${i}_title`, `gp_challenge_${i}_text`]),
  ...risks.map((_, i) => `gp_risk_${i}`),
  ...sessionStats.flatMap((_, i) => [`gp_sessionstat_${i}_num`, `gp_sessionstat_${i}_label`]),
  ...engagementStats.flatMap((_, i) => [`gp_engagestat_${i}_num`, `gp_engagestat_${i}_label`]),
];

const CaseStudyGrandPalace = () => {
  useCMSEditor();
  const s = useSettings(GRANDPALACE_KEYS);
  const t = (key: string, fallback: React.ReactNode) => s[key] || fallback;

  const dominoItems = domino.map((step, i) => t(`gp_domino_${i}`, step));
  const internalChallengeItems = internalChallenges.map((c, i) => ({
    title: t(`gp_challenge_${i}_title`, c.title),
    text: t(`gp_challenge_${i}_text`, c.text),
  }));
  const riskItems = risks.map((r, i) => t(`gp_risk_${i}`, r));
  const sessionStatItems = sessionStats.map((stat, i) => ({
    num: t(`gp_sessionstat_${i}_num`, stat.num),
    label: t(`gp_sessionstat_${i}_label`, stat.label),
  }));
  const engagementStatItems = engagementStats.map((stat, i) => ({
    num: t(`gp_engagestat_${i}_num`, stat.num),
    label: t(`gp_engagestat_${i}_label`, stat.label),
  }));

  return (
    <PageLayout>
      {/* Hero — gold/black, restaurant-branded, distinct from the other case studies */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: INK }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: 560, height: 560, top: "-18%", right: "-12%",
              background: `radial-gradient(circle, rgba(200,149,47,0.22) 0%, transparent 70%)`,
              filter: "blur(70px)",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-16 pb-14 md:pt-20 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex flex-col items-center gap-4 mb-6">
              <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: GOLD_LIGHT }}>
                <ArrowLeft size={15} /> All Case Studies
              </Link>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: GOLD, color: INK }}
              >
                Case Study &middot; Hospitality &amp; Restaurant
              </span>
            </div>
            <h1
              data-cms-key="gp_heroTitle" data-cms-label="Hero Title" data-cms-attr="text"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold leading-[1.15] text-white mb-6 tracking-tight"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              {t("gp_heroTitle", <>This Sydney Restaurant Survived 10 Years Without a Website. Then New Customers Stopped Walking In.</>)}
            </h1>
            <p data-cms-key="gp_heroSubtitle" data-cms-label="Hero Subtitle" data-cms-attr="text" className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#d9c6a0" }}>
              {t("gp_heroSubtitle", "The Grand Palace has served Sydney CBD for a decade on reputation alone — no website, no search presence, no way for a new customer to find them before walking past. Here's how we gave a decade-old restaurant a digital front door.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14 md:py-16 px-4 md:px-8" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp} data-cms-key="gp_intro" data-cms-label="Intro Line" data-cms-attr="text" className="text-lg md:text-xl italic mb-2 text-center" style={{ color: "#8a7256" }}>
            {t("gp_intro", "Every business owner thinks it won't happen to them. The Grand Palace thought so too — right up until new customers stopped finding them online.")}
          </motion.p>
          <Divider />

          <H2 k="gp_h2_business">{t("gp_h2_business", "The Business")}</H2>
          <P k="gp_p_business_1">
            {t("gp_p_business_1", "The Grand Palace Indian Restaurant, Basement, 261 George Street, Sydney CBD. A decade in business, real food, a loyal regular crowd, and a reputation built entirely offline — table by table, referral by referral.")}
          </P>
          <P k="gp_p_business_2">{t("gp_p_business_2", "For most of that decade, it was enough.")}</P>

          <H2 k="gp_h2_problem">{t("gp_h2_problem", "The Quiet Problem")}</H2>
          <P k="gp_p_problem_1">
            {t("gp_p_problem_1", <>Word of mouth doesn't show up when someone new searches "Indian restaurant Sydney CBD" on their phone. While The Grand Palace kept doing what had always worked, competitors were doing something different — building websites, collecting reviews, showing up first in the exact moment a customer was deciding where to eat.</>)}
          </P>
          <Pullquote k="gp_pullquote_1">
            {t("gp_pullquote_1", "The food hadn't changed. The reputation hadn't changed. But the way people were choosing a restaurant had changed completely — and The Grand Palace was invisible in that new game.")}
          </Pullquote>
          <P k="gp_p_problem_2">
            {t("gp_p_problem_2", <>This wasn't a food problem. <strong style={{ color: INK }}>It was a discovery problem.</strong></>)}
          </P>

          <H2 k="gp_h2_domino">{t("gp_h2_domino", "The Domino Effect")}</H2>
          <motion.div {...fadeUp} className="rounded-sm px-6 py-8 my-6 mx-auto max-w-md" style={{ background: "#fff", border: `1px solid ${GOLD_LIGHT}` }}>
            {dominoItems.map((step, i) => (
              <div key={i}>
                <div
                  className="text-center py-2 text-[15px]"
                  data-cms-key={`gp_domino_${i}`} data-cms-label={`Domino Step ${i + 1}`} data-cms-attr="text"
                  style={{
                    color: i === dominoItems.length - 1 ? RED : i < 2 ? "#8a7256" : INK,
                    fontWeight: i >= 2 ? 700 : 400,
                  }}
                >
                  {step}
                </div>
                {i < dominoItems.length - 1 && (
                  <div className="text-center" style={{ color: "#c9b78e" }}>
                    <ChevronRight size={14} className="mx-auto rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
          <P k="gp_p_domino_1">
            {t("gp_p_domino_1", <>It wasn't a food problem anymore. <strong style={{ color: INK }}>It was becoming a growth problem.</strong></>)}
          </P>

          <H2 k="gp_h2_internal">{t("gp_h2_internal", "Internal Challenges")}</H2>
          <P k="gp_p_internal_1">{t("gp_p_internal_1", "Apart from customer acquisition, the operations had gaps too.")}</P>
          <div className="mt-2">
            {internalChallengeItems.map((c, i) => (
              <div key={i}>
                <H3 k={`gp_challenge_${i}_title`}>{c.title}</H3>
                <P k={`gp_challenge_${i}_text`}>{c.text}</P>
              </div>
            ))}
          </div>

          <H2 k="gp_h2_risks">{t("gp_h2_risks", "What Could Have Happened?")}</H2>
          <P k="gp_p_risks_1">{t("gp_p_risks_1", "If nothing changed, the pattern was predictable:")}</P>
          <motion.ul {...fadeUp} className="list-none p-0 my-4 space-y-2.5 max-w-xl mx-auto">
            {riskItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] md:text-[16px]" style={{ color: "#8a7256" }}>
                <XCircle size={18} style={{ color: RED }} className="mt-0.5 flex-shrink-0" />
                <span data-cms-key={`gp_risk_${i}`} data-cms-label={`Risk ${i + 1}`} data-cms-attr="text">{item}</span>
              </li>
            ))}
          </motion.ul>

          <H2 k="gp_h2_built">{t("gp_h2_built", "What We Built")}</H2>
          <P k="gp_p_built_1">
            {t("gp_p_built_1", "The Grand Palace didn't need a rebrand. It needed to exist properly on the internet — findable, credible, and easy to act on. So that's what we built.")}
          </P>

          <H3 k="gp_h3_built_1">{t("gp_h3_built_1", "1. A website that actually sells")}</H3>
          <P k="gp_p_built_1_1">
            {t("gp_p_built_1_1", "Designed and launched thegrandpalace.com.au — a proper digital front door, built around the menu, bookings, gallery, events, and catering the restaurant already had to offer.")}
          </P>

          <H3 k="gp_h3_built_2">{t("gp_h3_built_2", "2. Keyword research, done properly")}</H3>
          <P k="gp_p_built_2_1">
            {t("gp_p_built_2_1", <>Identified the real terms Sydney diners were searching — "Indian restaurant Sydney CBD," "halal restaurant Sydney," "birthday party venue Sydney" — not guesses.</>)}
          </P>

          <H3 k="gp_h3_built_3">{t("gp_h3_built_3", "3. On-page SEO built around it")}</H3>
          <P k="gp_p_built_3_1">
            {t("gp_p_built_3_1", "Optimised the site around high-performing, location-based keywords so The Grand Palace could start showing up where the searches were already happening.")}
          </P>

          <H3 k="gp_h3_built_4">{t("gp_h3_built_4", "4. Content built to attract, not just inform")}</H3>
          <P k="gp_p_built_4_1">
            {t("gp_p_built_4_1", "Guide-style articles — best Indian restaurant in Sydney, best halal restaurant, best vegetarian restaurant — built to pull in search traffic that converts into bookings.")}
          </P>

          <H3 k="gp_h3_built_5">{t("gp_h3_built_5", "5. Conversion tracking")}</H3>
          <P k="gp_p_built_5_1">
            {t("gp_p_built_5_1", "Every visitor and every action on the site is now trackable, so decisions from here are based on data, not guesswork.")}
          </P>

          <H3 k="gp_h3_built_6">{t("gp_h3_built_6", "6. A social media strategy, rebuilt from zero")}</H3>
          <P k="gp_p_built_6_1">
            {t("gp_p_built_6_1", "Consistent posting across Instagram and Facebook — turning silence into an ongoing channel to the audience.")}
          </P>

          <H2 k="gp_h2_live">{t("gp_h2_live", "Live at thegrandpalace.com.au")}</H2>
          <P k="gp_p_live_1">
            {t("gp_p_live_1", "The result: a website built around what the restaurant actually offers — à la carte and set menus, online ordering, birthday packages, and venue hire for up to 125 guests.")}
          </P>
          <Screenshot
            tag={t("gp_shot_header_tag", "thegrandpalace.com.au") as string}
            tagKey="gp_shot_header_tag"
            src={`${IMG}/site-header.jpg`}
            alt="The Grand Palace Indian Restaurant website header with logo and navigation"
            caption={t("gp_shot_header_caption", "The new digital front door — menu, bookings, gallery, events, and catering, all in one place.") as string}
            captionKey="gp_shot_header_caption"
          />
          <p data-cms-key="gp_p_live_note" data-cms-label="Live Note" data-cms-attr="text" className="text-center text-sm italic mb-2" style={{ color: "#8a7256" }}>
            {t("gp_p_live_note", "Scroll of the full homepage below, split into three sections.")}
          </p>
          <Screenshot
            tag={t("gp_shot_top_tag", "Homepage — Top") as string}
            tagKey="gp_shot_top_tag"
            src={`${IMG}/homepage-top.jpg`}
            alt="The Grand Palace website homepage, top section: hero video, menu intro, and birthday packages"
            caption={t("gp_shot_top_caption", "Hero video, menu introduction, and birthday packages front and centre.") as string}
            captionKey="gp_shot_top_caption"
          />
          <Screenshot
            tag={t("gp_shot_mid_tag", "Homepage — Middle") as string}
            tagKey="gp_shot_mid_tag"
            src={`${IMG}/homepage-mid.jpg`}
            alt="The Grand Palace website homepage, middle section: venue for hire, events, office catering, and offers"
            caption={t("gp_shot_mid_caption", "Venue hire, corporate events, office catering, and current offers — the parts of the business most customers never knew existed.") as string}
            captionKey="gp_shot_mid_caption"
          />
          <Screenshot
            tag={t("gp_shot_bottom_tag", "Homepage — Bottom") as string}
            tagKey="gp_shot_bottom_tag"
            src={`${IMG}/homepage-bottom.jpg`}
            alt="The Grand Palace website homepage, bottom section: gallery, testimonials, and footer with contact details"
            caption={t("gp_shot_bottom_caption", "Gallery, testimonials, and full contact details in the footer — everything a new customer needs before they book.") as string}
            captionKey="gp_shot_bottom_caption"
          />

          <H2 k="gp_h2_results">{t("gp_h2_results", "The Results")}</H2>
          <P k="gp_p_results_1">
            {t("gp_p_results_1", "Organic search sessions went from a standing start to 1.26K+ in 90 days — well past what a business this size would typically expect to see.")}
          </P>
          <Screenshot
            tag={t("gp_shot_chart_tag", "Results That Matter") as string}
            tagKey="gp_shot_chart_tag"
            src={`${IMG}/results-chart.jpg`}
            alt="Google Analytics chart showing sessions by channel over 90 days, with organic search reaching 1.26K+ sessions"
            caption={t("gp_shot_chart_caption", "1.26K+ organic sessions from a standing start — significantly exceeding the expected baseline for a business this size.") as string}
            captionKey="gp_shot_chart_caption"
          />

          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-4 my-7">
            {sessionStatItems.map((stat, i) => (
              <div key={i} className="rounded-sm border text-center px-4 py-5" style={{ borderColor: GOLD_LIGHT, background: "#fff" }}>
                <span data-cms-key={`gp_sessionstat_${i}_num`} data-cms-label={`Session Stat ${i + 1} Number`} data-cms-attr="text" className="block text-xl md:text-2xl font-black mb-1.5" style={{ color: GOLD }}>
                  {stat.num}
                </span>
                <span data-cms-key={`gp_sessionstat_${i}_label`} data-cms-label={`Session Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs md:text-sm leading-snug" style={{ color: "#8a7256" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="overflow-x-auto my-7">
            <table className="w-full border-collapse text-[14.5px]" style={{ minWidth: 420 }}>
              <thead>
                <tr>
                  <th className="text-left py-2.5 px-3 font-semibold text-xs" style={{ color: "#8a7256", borderBottom: `1px solid ${GOLD_LIGHT}` }}>Google ranking position</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-xs" style={{ color: "#8a7256", borderBottom: `1px solid ${GOLD_LIGHT}` }}>April</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-xs" style={{ color: "#8a7256", borderBottom: `1px solid ${GOLD_LIGHT}` }}>May</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-xs" style={{ color: "#8a7256", borderBottom: `1px solid ${GOLD_LIGHT}` }}>June</th>
                </tr>
              </thead>
              <tbody>
                {rankTable.map((row) => (
                  <tr key={row.pos}>
                    <td className="py-2.5 px-3 font-bold" style={{ color: INK, borderBottom: `1px solid #f0e5d0` }}>{row.pos}</td>
                    <td className="py-2.5 px-3" style={{ color: INK, borderBottom: `1px solid #f0e5d0` }}>{row.apr}</td>
                    <td className="py-2.5 px-3" style={{ color: INK, borderBottom: `1px solid #f0e5d0` }}>{row.may}</td>
                    <td className="py-2.5 px-3" style={{ color: INK, borderBottom: `1px solid #f0e5d0` }}>{row.jun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-7">
            {engagementStatItems.map((stat, i) => (
              <div key={i} className="rounded-sm border text-center px-5 py-6" style={{ borderColor: GOLD_LIGHT, background: "#fff" }}>
                <TrendingUp size={20} className="mx-auto mb-2" style={{ color: GOLD }} />
                <span data-cms-key={`gp_engagestat_${i}_num`} data-cms-label={`Engagement Stat ${i + 1} Number`} data-cms-attr="text" className="block text-xl font-black mb-1.5" style={{ color: GOLD }}>
                  {stat.num}
                </span>
                <span data-cms-key={`gp_engagestat_${i}_label`} data-cms-label={`Engagement Stat ${i + 1} Label`} data-cms-attr="text" className="text-sm" style={{ color: "#8a7256" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <P k="gp_p_results_2">
            {t("gp_p_results_2", <>Online reservations and orders up <strong style={{ color: INK }}>45%</strong>, more positive reviews landing on Google Business Profile, and a customer base that's no longer limited to people who already knew someone at the restaurant.</>)}
          </P>

          {/* CTA */}
          <motion.div {...fadeUp} className="mt-14 rounded-sm text-center px-6 py-10 md:px-10 md:py-12" style={{ background: INK }}>
            <h2
              data-cms-key="gp_cta_heading" data-cms-label="CTA Heading" data-cms-attr="text"
              className="text-2xl md:text-[28px] font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              {t("gp_cta_heading", "Ten years of great food almost wasn't enough.")}
            </h2>
            <p data-cms-key="gp_cta_text" data-cms-label="CTA Text" data-cms-attr="text" className="text-[15px] md:text-base max-w-xl mx-auto mb-6" style={{ color: "#d9c6a0" }}>
              {t("gp_cta_text", "A strong reputation doesn't defend itself online. If your business is running the way The Grand Palace was — great in person, invisible on Google — let's fix the second part.")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all hover:gap-3"
              style={{ background: GOLD, color: INK }}
            >
              <span data-cms-key="gp_cta_button" data-cms-label="CTA Button" data-cms-attr="text">{t("gp_cta_button", "Talk to Digital Aura")}</span> <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyGrandPalace;
