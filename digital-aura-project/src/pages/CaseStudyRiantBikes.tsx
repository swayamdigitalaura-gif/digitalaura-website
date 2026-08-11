import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ArrowLeft, CheckCircle2, XCircle, TrendingUp,
  Star, ChevronDown,
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const NAVY = "#0A1628";
const BLUE = "#1A6FE8";
const ORANGE = "#FF6B2B";
const GREEN = "#22C55E";
const RED = "#DC2626";
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

const H3 = ({ children, k }: { children: React.ReactNode; k?: string }) => (
  <h3 data-cms-key={k} data-cms-label="Subheading" data-cms-attr="text" className="text-lg md:text-xl font-bold mt-8 mb-2" style={{ color: BLUE }}>
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
  tone = "red",
  k,
}: {
  children: React.ReactNode;
  tone?: "red" | "green" | "blue";
  k?: string;
}) => {
  const map = {
    red: { bg: "#FFF5F5", border: RED, text: "#7F1D1D" },
    green: { bg: "#F0FDF4", border: GREEN, text: "#14532D" },
    blue: { bg: "#EFF6FF", border: BLUE, text: "#1E3A8A" },
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

const domino = [
  "Less visibility",
  "Less enquiries",
  "Fewer bookings",
  "Lower cash flow",
  "Reduced confidence to invest",
  "Competitors kept growing faster",
];

const internalChallenges = [
  { title: "No Online Booking", text: "Every booking required someone to answer calls. Customers couldn't book instantly. Some enquiries were simply lost." },
  { title: "No Fleet Intelligence", text: "Which bike earns the most? Which vehicle remains idle? Which branch performs best? Nobody had exact answers." },
  { title: "Pricing Was Static", text: "Demand changed every weekend. Pricing stayed the same. Revenue opportunities were being missed." },
  { title: "No Customer Insights", text: "Who books every month? Who rents premium bikes? Who should receive offers? Everything was stored manually. Nothing was measurable." },
  { title: "Vehicle Documentation", text: "When bikes were rented, there was no proper digital record of odometer, front, side, and back images. Disputes became difficult to handle." },
];

const badFuture = [
  "Competitors would dominate Google Search",
  "Repeat customers would slowly shift elsewhere",
  "Customer acquisition cost would increase",
  "Referrals would dry up",
  "Cash flow would become unstable",
  "Expansion plans would stop",
];

const dashboardBullets = [
  "Which vehicle has the highest demand — so they know exactly what to add to the fleet next",
  "Which day of the week is their busiest — so staffing and stock are never caught off guard",
  "Where bookings are actually coming from — so they know which marketing is working and which is dead weight",
  "Which customers are booking again and again — the difference between guessing who your loyal customers are, and knowing",
];

const topStats = [
  { num: "Daily", label: "New customers coming in — not just references anymore" },
  { num: "Live", label: "Google Ads running, generating consistent bookings" },
  { num: "↑", label: "Revenue increased" },
];

const numberStats = [
  { num: "177", label: "Total bookings processed through the new system" },
  { num: "₹1,60,054", label: "Revenue collected and tracked in-platform" },
  { num: "230", label: "Customers now managed in one system, not scattered notebooks" },
  { num: "164", label: "Customers with confirmed bookings — real, trackable relationships" },
  { num: "30", label: "Vehicles under live digital fleet management" },
  { num: "3", label: "Branches unified into a single dashboard" },
];

const IMG = "/case-studies/riant-bikes";

// Every editable string on this page — hero, body paragraphs, list items, stats,
// testimonial, and CTA — is registered here once so useSettings() can fetch them all in
// a single request. `t(key, fallback)` below reads the override or falls back to the
// original copy; paragraphs with embedded <strong> formatting keep that as their fallback,
// but an admin override replaces the whole paragraph with plain text (same trade-off used
// elsewhere on the site, e.g. the homepage Hero).
const RIANTBIKES_KEYS = [
  "riantbikes_heroTitle", "riantbikes_heroSubtitle",
  "riantbikes_intro",
  "riantbikes_h2_business", "riantbikes_p_business_1", "riantbikes_p_business_2",
  "riantbikes_h2_golden", "riantbikes_p_golden_1", "riantbikes_p_golden_2", "riantbikes_p_golden_3",
  "riantbikes_h2_shifted", "riantbikes_p_shifted_1", "riantbikes_p_shifted_2", "riantbikes_p_shifted_3",
  "riantbikes_callout_1",
  "riantbikes_p_shifted_4", "riantbikes_p_shifted_5", "riantbikes_p_shifted_6",
  "riantbikes_h2_domino", "riantbikes_p_domino_1", "riantbikes_p_domino_2",
  "riantbikes_h2_internal", "riantbikes_p_internal_1",
  "riantbikes_h2_couldhappen", "riantbikes_p_couldhappen_1",
  "riantbikes_callout_2",
  "riantbikes_h2_built", "riantbikes_p_built_1",
  "riantbikes_h3_built_1", "riantbikes_p_built_1_1",
  "riantbikes_h3_built_2", "riantbikes_p_built_2_1",
  "riantbikes_shot_1_tag", "riantbikes_shot_1_caption",
  "riantbikes_h3_built_3", "riantbikes_p_built_3_1",
  "riantbikes_shot_2_tag", "riantbikes_shot_2_caption",
  "riantbikes_shot_3_tag", "riantbikes_shot_3_caption",
  "riantbikes_h3_built_4", "riantbikes_p_built_4_1", "riantbikes_p_built_4_2",
  "riantbikes_h3_built_5", "riantbikes_p_built_5_1",
  "riantbikes_shot_4_tag", "riantbikes_shot_4_caption",
  "riantbikes_h3_built_6", "riantbikes_p_built_6_1",
  "riantbikes_h2_results",
  "riantbikes_shot_5_tag", "riantbikes_shot_5_caption",
  "riantbikes_shot_6_tag", "riantbikes_shot_6_caption",
  "riantbikes_p_results_1",
  "riantbikes_callout_3",
  "riantbikes_h2_testimonial", "riantbikes_p_testimonial_intro",
  "riantbikes_testimonial_name", "riantbikes_testimonial_role",
  "riantbikes_testimonial_title",
  ...Array.from({ length: 18 }, (_, i) => `riantbikes_testimonial_p_${i + 1}`),
  "riantbikes_testimonial_footer",
  "riantbikes_cta_heading", "riantbikes_cta_text", "riantbikes_cta_button",
  ...domino.map((_, i) => `riantbikes_domino_${i}`),
  ...internalChallenges.flatMap((_, i) => [`riantbikes_challenge_${i}_title`, `riantbikes_challenge_${i}_text`]),
  ...badFuture.map((_, i) => `riantbikes_badfuture_${i}`),
  ...dashboardBullets.map((_, i) => `riantbikes_dashboard_${i}`),
  ...topStats.flatMap((_, i) => [`riantbikes_topstat_${i}_num`, `riantbikes_topstat_${i}_label`]),
  ...numberStats.flatMap((_, i) => [`riantbikes_numstat_${i}_num`, `riantbikes_numstat_${i}_label`]),
];

const CaseStudyRiantBikes = () => {
  useCMSEditor();
  const s = useSettings(RIANTBIKES_KEYS);
  const t = (key: string, fallback: React.ReactNode) => s[key] || fallback;
  const heroTitle = t("riantbikes_heroTitle", "They Built Riant Bikes From Zero. The Internet Almost Killed It.");
  const heroSubtitle = t(
    "riantbikes_heroSubtitle",
    "This is the story of a bike rental business that ruled Ahmedabad with almost no marketing — and then watched itself slowly disappear because it never adapted. Here's how we brought it back from the edge."
  );
  const dominoItems = domino.map((step, i) => t(`riantbikes_domino_${i}`, step));
  const internalChallengeItems = internalChallenges.map((c, i) => ({
    title: t(`riantbikes_challenge_${i}_title`, c.title),
    text: t(`riantbikes_challenge_${i}_text`, c.text),
  }));
  const badFutureItems = badFuture.map((item, i) => t(`riantbikes_badfuture_${i}`, item));
  const dashboardBulletItems = dashboardBullets.map((item, i) => t(`riantbikes_dashboard_${i}`, item));
  const topStatItems = topStats.map((stat, i) => ({
    num: t(`riantbikes_topstat_${i}_num`, stat.num),
    label: t(`riantbikes_topstat_${i}_label`, stat.label),
  }));
  const numberStatItems = numberStats.map((stat, i) => ({
    num: t(`riantbikes_numstat_${i}_num`, stat.num),
    label: t(`riantbikes_numstat_${i}_label`, stat.label),
  }));
  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="relative pt-[72px] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY}, #142A5C)` }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full animate-drift"
            style={{
              width: 500, height: 500, top: "-15%", right: "-10%",
              background: "radial-gradient(circle, rgba(26,111,232,0.25) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-16 pb-14 md:pt-20 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6"
              style={{ color: "#C7D2FE" }}
            >
              <ArrowLeft size={15} /> All Case Studies
            </Link>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: BLUE, color: "#fff" }}
            >
              Case Study &middot; Local Business
            </span>
            <h1 data-cms-key="riantbikes_heroTitle" data-cms-label="Hero Title" data-cms-attr="text" className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] text-white mb-6 tracking-tight">
              {heroTitle}
            </h1>
            <p data-cms-key="riantbikes_heroSubtitle" data-cms-label="Hero Subtitle" data-cms-attr="text" className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#C7D2FE" }}>
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14 md:py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp} data-cms-key="riantbikes_intro" data-cms-label="Intro Line" data-cms-attr="text" className="text-lg md:text-xl italic mb-2" style={{ color: MUTED }}>
            {t("riantbikes_intro", "Every business owner thinks it won't happen to them. Riant Bikes thought so too — right up until the bookings stopped coming.")}
          </motion.p>

          <H2 k="riantbikes_h2_business">{t("riantbikes_h2_business", "The Business")}</H2>
          <P k="riantbikes_p_business_1">
            {t("riantbikes_p_business_1", "Riant Bikes rents two-wheelers on rent across three branches in Ahmedabad — Naranpura, Maninagar, and Vaishnodevi. Simple business. You need a bike, they hand you one. No drama, no complexity.")}
          </P>
          <P k="riantbikes_p_business_2">{t("riantbikes_p_business_2", "Except the drama was coming. It just hadn't arrived yet.")}</P>

          <H2 k="riantbikes_h2_golden">{t("riantbikes_h2_golden", "The Golden Years")}</H2>
          <P k="riantbikes_p_golden_1">
            {t("riantbikes_p_golden_1", <>In 2016, when Riant Bikes opened its doors, renting a two-wheeler wasn't even a "thing" in Ahmedabad. Nobody was doing it seriously. So the moment they showed up, they didn't just enter a market — <strong style={{ color: NAVY }}>they created one.</strong></>)}
          </P>
          <P k="riantbikes_p_golden_2">
            {t("riantbikes_p_golden_2", "A few Google reviews. A little word of mouth. That's it. That's all it took. Customers found them, booked with them, and came back. Low marketing, high returns — the kind of start most business owners dream about and never get.")}
          </P>
          <P k="riantbikes_p_golden_3">{t("riantbikes_p_golden_3", "For a while, it felt like Riant Bikes had cracked the code.")}</P>

          <H2 k="riantbikes_h2_shifted">{t("riantbikes_h2_shifted", <>Then the Ground Shifted &mdash; And Nobody Told Them</>)}</H2>
          <P k="riantbikes_p_shifted_1">{t("riantbikes_p_shifted_1", "Here's the brutal truth about business: the market doesn't wait for you to notice it's changed.")}</P>
          <P k="riantbikes_p_shifted_2">
            {t("riantbikes_p_shifted_2", 'While Riant Bikes kept running on the same playbook that worked in 2016, competitors weren\'t sitting around admiring them. They were building websites. Running ads. Stacking Google reviews. Showing up first — every single time a customer searched "bike on rent near me."')}
          </P>
          <P k="riantbikes_p_shifted_3">
            {t("riantbikes_p_shifted_3", <>And a customer scrolling on their phone doesn't care who was first to the market.{" "}<strong style={{ color: NAVY }}>They book whoever looks the most trustworthy, right now, on the screen in front of them.</strong></>)}
          </P>

          <Callout tone="red" k="riantbikes_callout_1">
            {t("riantbikes_callout_1", "That's the part that stings the most — Riant Bikes wasn't losing because their service got worse. They were losing because they went invisible while everyone else got louder.")}
          </Callout>

          <P k="riantbikes_p_shifted_4">
            {t("riantbikes_p_shifted_4", "Cash flow started drying up. Fewer customers walked in. The only bookings left were from people who already knew someone at Riant Bikes personally — pure reference business, the last life-support system before a business quietly fades out.")}
          </P>
          <P k="riantbikes_p_shifted_5">
            {t("riantbikes_p_shifted_5", 'This is exactly how good businesses die. Not with a crash. With a slow, silent leak — while the owner keeps telling themselves "business will pick up soon."')}
          </P>
          <P k="riantbikes_p_shifted_6">
            {t("riantbikes_p_shifted_6", <>It doesn't pick up on its own. Not anymore.{" "}<strong style={{ color: NAVY }}>Not in a market where your competitor is one Google search ahead of you, 24 hours a day.</strong></>)}
          </P>

          <H2 k="riantbikes_h2_domino">{t("riantbikes_h2_domino", "The Domino Effect")}</H2>
          <P k="riantbikes_p_domino_1">{t("riantbikes_p_domino_1", "One problem created another.")}</P>
          <motion.div
            {...fadeUp}
            className="rounded-xl border bg-white px-5 py-6 md:px-7 md:py-7 my-6 text-center"
            style={{ borderColor: "#E5E7EB" }}
          >
            {dominoItems.map((step, i) => (
              <div key={i}>
                <div
                  data-cms-key={`riantbikes_domino_${i}`} data-cms-label={`Domino Step ${i + 1}`} data-cms-attr="text"
                  className="font-semibold py-1.5 text-[15px] md:text-[17px]"
                  style={{ color: i === dominoItems.length - 1 ? RED : NAVY }}
                >
                  {step}
                </div>
                {i < dominoItems.length - 1 && (
                  <ChevronDown size={18} className="mx-auto" style={{ color: BLUE }} />
                )}
              </div>
            ))}
          </motion.div>
          <P k="riantbikes_p_domino_2">
            {t("riantbikes_p_domino_2", <>This wasn't just a marketing problem anymore.{" "}<strong style={{ color: NAVY }}>It was becoming a business survival problem.</strong></>)}
          </P>

          <H2 k="riantbikes_h2_internal">{t("riantbikes_h2_internal", "Internal Challenges")}</H2>
          <P k="riantbikes_p_internal_1">{t("riantbikes_p_internal_1", "Apart from customer acquisition, the operations had also become difficult.")}</P>
          {internalChallengeItems.map((c, i) => (
            <div key={i}>
              <H3 k={`riantbikes_challenge_${i}_title`}>{c.title}</H3>
              <P k={`riantbikes_challenge_${i}_text`}>{c.text}</P>
            </div>
          ))}

          <H2 k="riantbikes_h2_couldhappen">{t("riantbikes_h2_couldhappen", "What Could Have Happened?")}</H2>
          <P k="riantbikes_p_couldhappen_1">{t("riantbikes_p_couldhappen_1", "This is the scary part. If nothing changed, the future was predictable:")}</P>
          <motion.ul {...fadeUp} className="list-none p-0 my-4 space-y-2.5">
            {badFutureItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] md:text-[17px]" style={{ color: NAVY }}>
                <XCircle size={19} style={{ color: RED }} className="mt-0.5 flex-shrink-0" />
                <span data-cms-key={`riantbikes_badfuture_${i}`} data-cms-label={`Bad Future ${i + 1}`} data-cms-attr="text">{item}</span>
              </li>
            ))}
          </motion.ul>
          <Callout tone="red" k="riantbikes_callout_2">
            {t("riantbikes_callout_2", "Many traditional businesses don't fail because they're bad. They fail because customers stop discovering them.")}
          </Callout>

          <H2 k="riantbikes_h2_built">{t("riantbikes_h2_built", "What We Built")}</H2>
          <P k="riantbikes_p_built_1">
            {t("riantbikes_p_built_1", 'Riant Bikes didn\'t need another logo or a "nice-looking" website. They needed a machine that could go out and fight for customers on its own, every single day. So that\'s what we built.')}
          </P>

          <H3 k="riantbikes_h3_built_1">{t("riantbikes_h3_built_1", "1. A website that actually sells")}</H3>
          <P k="riantbikes_p_built_1_1">
            {t("riantbikes_p_built_1_1", "We designed and built their website with a full online booking platform baked in. No calling. No waiting on hold. A customer lands on the site, picks a bike, books it. Done.")}
          </P>

          <H3 k="riantbikes_h3_built_2">{t("riantbikes_h3_built_2", "2. Book a bike like you'd book a cab")}</H3>
          <P k="riantbikes_p_built_2_1">
            {t("riantbikes_p_built_2_1", "Customers can now rent a two-wheeler directly through the website — no middleman, no friction, no reason to abandon the booking halfway.")}
          </P>
          <Screenshot
            tag={t("riantbikes_shot_1_tag", "Live on the Riant Admin Panel") as string}
            tagKey="riantbikes_shot_1_tag"
            src={`${IMG}/booking-dashboard.png`}
            alt="Riant Bikes booking management dashboard showing live bookings across branches"
            caption={t("riantbikes_shot_1_caption", "Every booking — pickup, drop-off, payment, status — flowing in automatically. No phone calls, no missed enquiries.") as string}
            captionKey="riantbikes_shot_1_caption"
          />

          <H3 k="riantbikes_h3_built_3">{t("riantbikes_h3_built_3", "3. Fleet control that actually makes them money")}</H3>
          <P k="riantbikes_p_built_3_1">
            {t("riantbikes_p_built_3_1", "In the backend, Riant Bikes can manage fleet availability in real time and adjust rental rates as demand shifts. Festival season, weekend rush, high demand? They control pricing instantly — instead of leaving money on the table.")}
          </P>
          <Screenshot
            tag={t("riantbikes_shot_2_tag", "Fleet Management") as string}
            tagKey="riantbikes_shot_2_tag"
            src={`${IMG}/fleet-management.png`}
            alt="Riant Bikes fleet management dashboard showing vehicles across branches with live availability status"
            caption={t("riantbikes_shot_2_caption", "30 vehicles, 3 branches, one screen — every bike tracked as available or occupied in real time.") as string}
            captionKey="riantbikes_shot_2_caption"
          />
          <Screenshot
            tag={t("riantbikes_shot_3_tag", "Dynamic Pricing") as string}
            tagKey="riantbikes_shot_3_tag"
            src={`${IMG}/dynamic-pricing.png`}
            alt="Riant Bikes pricing and tariff dashboard with per-branch rate overrides and seasonal surge pricing"
            caption={t("riantbikes_shot_3_caption", "Rates that flex by category and branch — with seasonal surge pricing built in for high-demand dates.") as string}
            captionKey="riantbikes_shot_3_caption"
          />

          <H3 k="riantbikes_h3_built_4">{t("riantbikes_h3_built_4", "4. Proof built into every handover")}</H3>
          <P k="riantbikes_p_built_4_1">
            {t("riantbikes_p_built_4_1", "Every time a vehicle goes out, the team uploads odometer readings and photos — front, side, back — straight into the backend. It protects the business from disputes and gives the customer confidence they're dealing with people who run things properly.")}
          </P>
          <P k="riantbikes_p_built_4_2">
            {t("riantbikes_p_built_4_2", "And it did something for the Riant Bikes team too — it gave them back their confidence. For the first time in a while, they felt like they could actually go toe-to-toe with the competitors who'd been eating their lunch.")}
          </P>

          <H3 k="riantbikes_h3_built_5">{t("riantbikes_h3_built_5", "5. A dashboard that thinks ahead of them")}</H3>
          <P k="riantbikes_p_built_5_1">
            {t("riantbikes_p_built_5_1", "We didn't stop at bookings. On the backend, Riant Bikes now sees exactly what's happening in their own business, in real time:")}
          </P>
          <motion.ul {...fadeUp} className="list-none p-0 my-4 space-y-2.5">
            {dashboardBulletItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] md:text-[17px]" style={{ color: NAVY }}>
                <CheckCircle2 size={19} style={{ color: GREEN }} className="mt-0.5 flex-shrink-0" />
                <span data-cms-key={`riantbikes_dashboard_${i}`} data-cms-label={`Dashboard Bullet ${i + 1}`} data-cms-attr="text">{item}</span>
              </li>
            ))}
          </motion.ul>
          <Screenshot
            tag={t("riantbikes_shot_4_tag", "The Owner's Morning View") as string}
            tagKey="riantbikes_shot_4_tag"
            src={`${IMG}/owner-dashboard.png`}
            alt="Riant Bikes owner dashboard showing total bookings, revenue, top vehicles, busiest days and branch performance"
            caption={t("riantbikes_shot_4_caption", "The exact screen Riant Bikes checks every morning — bookings, revenue, top-performing vehicles, and busiest days, all in one place.") as string}
            captionKey="riantbikes_shot_4_caption"
          />

          <H3 k="riantbikes_h3_built_6">{t("riantbikes_h3_built_6", "6. Reviews doing the selling, on autopilot")}</H3>
          <P k="riantbikes_p_built_6_1">
            {t("riantbikes_p_built_6_1", "We pulled in Google reviews automatically from all 3 branches, straight onto the website. Every visitor now sees real social proof the second they land — no manual copy-pasting, no delay, just trust built in from the first scroll.")}
          </P>

          <H2 k="riantbikes_h2_results">{t("riantbikes_h2_results", "The Results")}</H2>
          <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-7">
            {topStatItems.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white text-center px-5 py-6"
                style={{ borderColor: "#E5E7EB" }}
              >
                <span data-cms-key={`riantbikes_topstat_${i}_num`} data-cms-label={`Top Stat ${i + 1} Number`} data-cms-attr="text" className="block text-2xl font-black mb-1.5" style={{ color: BLUE }}>
                  {stat.num}
                </span>
                <span data-cms-key={`riantbikes_topstat_${i}_label`} data-cms-label={`Top Stat ${i + 1} Label`} data-cms-attr="text" className="text-sm" style={{ color: MUTED }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-4 my-7">
            {numberStatItems.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white text-center px-4 py-5"
                style={{ borderColor: "#E5E7EB" }}
              >
                <span data-cms-key={`riantbikes_numstat_${i}_num`} data-cms-label={`Number Stat ${i + 1} Number`} data-cms-attr="text" className="block text-xl md:text-2xl font-black mb-1.5" style={{ color: BLUE }}>
                  {stat.num}
                </span>
                <span data-cms-key={`riantbikes_numstat_${i}_label`} data-cms-label={`Number Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs md:text-sm leading-snug" style={{ color: MUTED }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <Screenshot
            tag={t("riantbikes_shot_5_tag", "Every Customer, One System") as string}
            tagKey="riantbikes_shot_5_tag"
            src={`${IMG}/customer-database.png`}
            alt="Riant Bikes customer database showing total customers, approved documents, and confirmed bookings"
            caption={t("riantbikes_shot_5_caption", "230 customers, fully organized — documents, booking history, and prospects, all searchable in seconds.") as string}
            captionKey="riantbikes_shot_5_caption"
          />
          <Screenshot
            tag={t("riantbikes_shot_6_tag", "Every Rupee, Accounted For") as string}
            tagKey="riantbikes_shot_6_tag"
            src={`${IMG}/cash-collection.png`}
            alt="Riant Bikes cash collection log showing total revenue and transaction entries by staff and branch"
            caption={t("riantbikes_shot_6_caption", "₹3,86,000 tracked across 242 entries — every payment logged by branch and staff, with zero guesswork.") as string}
            captionKey="riantbikes_shot_6_caption"
          />

          <P k="riantbikes_p_results_1">
            {t("riantbikes_p_results_1", <>Riant Bikes didn't need a facelift. They needed a system that could actually compete in a market that had already moved on without them. We built that system. Now they're not surviving the competition —{" "}<strong style={{ color: NAVY }}>they're back in the race, and winning bookings the competitors thought were already theirs.</strong></>)}
          </P>

          <Callout tone="blue" k="riantbikes_callout_3">
            {t("riantbikes_callout_3", "Here's the real lesson in this story: Riant Bikes had the best reputation in the game for years — and it still nearly wasn't enough. If your business isn't showing up online today, it doesn't matter how good you are. Somebody else, who is worse than you, is taking your customer right now — simply because they showed up first on the screen.")}
          </Callout>

          {/* Testimonial */}
          <div className="mt-14">
            <H2 k="riantbikes_h2_testimonial">{t("riantbikes_h2_testimonial", "In Their Own Words")}</H2>
            <P k="riantbikes_p_testimonial_intro">{t("riantbikes_p_testimonial_intro", "This is the Google review Riant Bikes left for us, unedited.")}</P>

            <motion.div
              {...fadeUp}
              className="rounded-2xl border bg-white px-5 py-7 md:px-8 md:py-9 mt-5"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 24px rgba(10,22,40,0.06)" }}
            >
              <div className="flex items-center gap-3.5 mb-1.5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: NAVY }}
                >
                  HB
                </div>
                <div>
                  <div data-cms-key="riantbikes_testimonial_name" data-cms-label="Testimonial Name" data-cms-attr="text" className="font-bold text-[17px]" style={{ color: NAVY }}>{t("riantbikes_testimonial_name", "Hardik Bhatt")}</div>
                  <div data-cms-key="riantbikes_testimonial_role" data-cms-label="Testimonial Role" data-cms-attr="text" className="text-[13px]" style={{ color: MUTED }}>
                    {t("riantbikes_testimonial_role", <>Owner, Riant Bikes &middot; Local Guide &middot; 42 reviews</>)}
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5 my-2.5" style={{ color: "#F59E0B" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" strokeWidth={0} />)}
              </div>

              <div className="text-[15px] md:text-[16px] leading-[1.8]" style={{ color: NAVY }}>
                <p data-cms-key="riantbikes_testimonial_title" data-cms-label="Testimonial Title" data-cms-attr="text" className="font-bold mb-3.5">{t("riantbikes_testimonial_title", "A Well-Deserved Shoutout to Digital Aura! 🏆")}</p>
                <p data-cms-key="riantbikes_testimonial_p_1" data-cms-label="Testimonial Para 1" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_1", "Running a business for over a decade teaches you one important lesson—having the right technology partner can make all the difference.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_2" data-cms-label="Testimonial Para 2" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_2", "At Riant Bikes, we've been serving customers in Ahmedabad for years. However, with increasing competition in the self-drive two-wheeler rental market, we started noticing that our pipeline of new customers was gradually shrinking. We knew that simply having a website was no longer enough. We needed a complete digital transformation with a modern, customer-friendly platform that could support our long-term growth.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_3" data-cms-label="Testimonial Para 3" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_3", "When it came to selecting the right agency, Digital Aura was naturally one of the names we considered.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_4" data-cms-label="Testimonial Para 4" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_4", "Our association with their leadership goes back nearly 20 years, and we've always known them as ethical professionals. Even then, we didn't make our decision based only on our relationship. We conducted our own research, explored different options, asked difficult questions, and evaluated what each company could offer.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_5" data-cms-label="Testimonial Para 5" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_5", "What ultimately convinced us to choose Digital Aura was their clarity, transparency, openness, flexibility, and willingness to understand our business before proposing solutions. Right from our initial discussions, we felt confident that we were partnering with a team that genuinely wanted to contribute to our success rather than simply complete another project.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_6" data-cms-label="Testimonial Para 6" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_6", "From the very beginning of the website development process, the entire journey has been outstanding.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_7" data-cms-label="Testimonial Para 7" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_7", "Every requirement—whether major or minor—was handled patiently. Every suggestion was discussed openly. Every query was answered promptly. What impressed us the most was the speed at which the team implemented changes. Sometimes we'd discuss an improvement, and within a very short time it was already live. It genuinely felt as though our own internal team was working on the project rather than an external agency.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_8" data-cms-label="Testimonial Para 8" data-cms-attr="text" className="mb-3.5">{t("riantbikes_testimonial_p_8", "That level of ownership is rare to find.")}</p>
                <p data-cms-key="riantbikes_testimonial_p_9" data-cms-label="Testimonial Para 9" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_9", "Today, our new website for Riant Bikes is working exactly as we had envisioned. The design is modern, the functionality aligns with our operational requirements, and the platform has been built keeping both customer convenience and future business growth in mind. More importantly, the foundation is now in place for online bookings, digital marketing, SEO, and further expansion.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_10" data-cms-label="Testimonial Para 10" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_10", "Throughout the project, one thing remained consistent—their responsiveness. At no point did we feel that our concerns were ignored or delayed unnecessarily. Their team has always been approachable, solution-oriented, and proactive.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_11" data-cms-label="Testimonial Para 11" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_11", "What makes me recommend Digital Aura isn't just the quality of their technical work.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_12" data-cms-label="Testimonial Para 12" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_12", "It is because they operate with the same values that we strongly believe in at Riant Bikes:")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_13" data-cms-label="Testimonial Para 13" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_13", <>Transparency<br />Honesty<br />Customer-First Approach</>)}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_14" data-cms-label="Testimonial Para 14" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_14", "When your service partner shares your core business values, the entire working relationship becomes smooth and productive.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_15" data-cms-label="Testimonial Para 15" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_15", "We're excited to continue working with them for our digital marketing and future technology initiatives, and we're confident this partnership will help us achieve even greater milestones.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_16" data-cms-label="Testimonial Para 16" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_16", "A sincere thank you to the entire Digital Aura team for your hard work, commitment, and exceptional support. Wishing you continued growth and success—you truly deserve it.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_17" data-cms-label="Testimonial Para 17" data-cms-attr="text" className="mb-3.5">
                  {t("riantbikes_testimonial_p_17", "If you're a business owner looking for a dependable partner for website development, SEO, branding, digital marketing, or business automation, I would wholeheartedly recommend giving Digital Aura an opportunity. They don't just build websites—they build long-term business relationships through their knowledge, experience and love.")}
                </p>
                <p data-cms-key="riantbikes_testimonial_p_18" data-cms-label="Testimonial Para 18" data-cms-attr="text">{t("riantbikes_testimonial_p_18", "Thank you once again, Team Digital Aura!!")}</p>
              </div>

              <div className="mt-6">
                <img
                  src={`${IMG}/google-review.png`}
                  alt="Google review screenshot from Hardik Bhatt, owner of Riant Bikes, giving Digital Aura a 5-star rating"
                  loading="lazy"
                  className="w-full max-w-[440px] mx-auto block rounded-lg border"
                  style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 24px rgba(10,22,40,0.08)" }}
                />
              </div>

              <div
                data-cms-key="riantbikes_testimonial_footer" data-cms-label="Testimonial Footer" data-cms-attr="text"
                className="text-center text-[13px] mt-5 pt-4 border-t"
                style={{ color: MUTED, borderColor: "#E5E7EB" }}
              >
                {t("riantbikes_testimonial_footer", <>Posted on Google &middot; Verified Local Guide review</>)}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="mt-14 rounded-2xl text-center px-6 py-10 md:px-10 md:py-12"
            style={{ background: NAVY }}
          >
            <h2 data-cms-key="riantbikes_cta_heading" data-cms-label="CTA Heading" data-cms-attr="text" className="text-2xl md:text-[28px] font-bold text-white mb-3">
              {t("riantbikes_cta_heading", 'Don\'t Wait Until Your "Reference Customers" Are the Only Ones Left')}
            </h2>
            <p data-cms-key="riantbikes_cta_text" data-cms-label="CTA Text" data-cms-attr="text" className="text-[15px] md:text-base max-w-xl mx-auto mb-6" style={{ color: "#C7D2FE" }}>
              {t("riantbikes_cta_text", "Every day without a real digital presence is a day a competitor books the customer that should've been yours. Riant Bikes waited. You don't have to.")}
            </p>
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
              <span data-cms-key="riantbikes_cta_button" data-cms-label="CTA Button" data-cms-attr="text">{t("riantbikes_cta_button", "Talk to Digital Aura Today")}</span> <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyRiantBikes;
