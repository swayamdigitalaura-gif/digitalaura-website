import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ArrowLeft, CheckCircle2, XCircle, ChevronDown, Sparkles,
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const NAVY = "#0A1628";
const BLUE = "#1A6FE8";
const GREEN = "#22C55E";
const RED = "#DC2626";
const PURPLE = "#7C3AED";
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
      style={{ color: GREEN }}
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

const AIQuery = ({ children }: { children: React.ReactNode }) => (
  <div
    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm md:text-[15px] font-semibold mb-4"
    style={{ background: "rgba(124,58,237,0.08)", color: PURPLE, border: "1px solid rgba(124,58,237,0.25)" }}
  >
    <Sparkles size={15} /> &ldquo;{children}&rdquo;
  </div>
);

const domino = [
  "Weak online visibility",
  "Competitors became more visible",
  "Fewer organic opportunities captured",
  "Dependence on referrals increased",
  "Growth became harder to scale",
  "The business hit a plateau",
];

const internalChallenges = [
  { title: "Outdated website", text: "The design and content no longer represented the level of expertise Prism had actually built." },
  { title: "No search architecture", text: "Services weren't structured for search — there was no deep hierarchy connecting service, category, instrument, industry and content." },
  { title: "Untracked enquiries", text: "Multiple forms were collecting leads with no proper visibility into where those enquiries were actually coming from." },
  { title: "Legacy SEO baggage", text: "The site carried redundant content and legacy PBN backlinks created years earlier." },
  { title: "Weak local signals", text: "NAP consistency and local citations needed real attention." },
  { title: "Invisible expertise", text: "Prism had the knowledge — but Google didn't have enough structured evidence to understand it, and neither did potential customers." },
];

const builtModules = [
  { tag: "01", title: "A new digital foundation", text: "Rebuilt on Next.js + Node.js, optimised for speed, SEO, scalability and user experience — with pages designed to load in under ~2 seconds." },
  { tag: "02", title: "Services turned into searchable ecosystems", text: "Instead of one generic \"Calibration Services\" page, we built a structured hierarchy down to individual instruments — Electrical Calibration, Multimeter, Clamp Meter, Earth Tester, and more." },
  { tag: "03", title: "Pillar & sub-pillar pages", text: "Pillar pages for major categories, with sub-pillar pages beneath them — a connected topic ecosystem, not isolated pages." },
  { tag: "04", title: "Industry architecture", text: "Customers don't just search \"calibration service\" — they search \"calibration for pharmaceutical industry.\" We built industry → requirement → service → instrument pathways for Pharma, Chemicals, Manufacturing, Healthcare, Automotive, Food & Beverage, Oil & Gas and Labs." },
  { tag: "05", title: "Made the expertise visible", text: "Calibration is a trust business. We strengthened the site around experience, expertise, authority and trust — proving offline expertise online." },
  { tag: "06", title: "Content with a purpose", text: "Built around real questions customers ask — informational, commercial, service-specific and industry-specific — then linked back into the customer journey." },
  { tag: "07", title: "An internal linking ecosystem", text: "Blogs, educational content, service pages, instruments, industries and enquiry paths — all connected so users and search engines understood how it fit together." },
  { tag: "08", title: "Technical SEO & schema", text: "Metadata, URL architecture, crawlability, indexability, mobile optimisation, page speed, schema markup, breadcrumbs and FAQ structure." },
  { tag: "09", title: "Local search", text: "Strengthened Google Business Profile, NAP consistency, citations and location signals — locking in Prism + Calibration + Ahmedabad + Gujarat." },
  { tag: "10", title: "Beyond SEO: AEO + GEO", text: "The question stopped being \"can we rank this page?\" and became \"can we make Prism the answer?\" — structured for AI-powered search, not just Google's blue links." },
];

const beforeList = [
  "Strong expertise — but word-of-mouth only",
  "Outdated website",
  "Weak search visibility",
  "Weak local SEO",
  "Limited lead tracking",
  "Two years of flat growth",
];

const afterList = [
  "Strong expertise — now discoverable",
  "High-performance website",
  "Structured service & industry architecture",
  "Pillar / sub-pillar content system",
  "Technical & local SEO, AEO/GEO",
  "Top rankings + AI search visibility",
];

const topStats = [
  { num: "Top 3", label: "Rankings across major targeted keywords" },
  { num: "70–100", label: "Qualified leads generated every month" },
  { num: "Featured", label: "In Google's AI Overview" },
];

const chips = ["Calibration & Testing", "Validation", "EHS & Safety", "Environmental Testing", "Energy Audits", "NABL & ISO Consulting", "Industrial Compliance"];
const loop = ["Relationship", "Trust", "Referral", "Business"];

const IMG = "/case-studies/prism-calibration";

const PRISM_KEYS = [
  "prism_heroTitle", "prism_heroSubtitle", "prism_intro",
  "prism_h2_business", "prism_p_business_1", "prism_p_business_2", "prism_p_business_3",
  "prism_h2_golden", "prism_p_golden_1",
  "prism_h2_shifted", "prism_p_shifted_1",
  "prism_h2_domino", "prism_p_domino_1", "prism_p_domino_2",
  "prism_h2_internal", "prism_p_internal_1",
  "prism_h2_met", "prism_p_met_1", "prism_p_met_2",
  "prism_h2_built", "prism_p_built_1",
  "prism_h2_results",
  "prism_callout_results",
  "prism_h2_proof", "prism_p_proof_1",
  "prism_shot_1_tag", "prism_shot_1_caption",
  "prism_shot_2_tag", "prism_shot_2_caption",
  "prism_shot_3_tag", "prism_shot_3_caption", "prism_p_shot_3",
  "prism_shot_4_tag", "prism_shot_4_caption", "prism_p_shot_4",
  "prism_shot_5_tag", "prism_shot_5_caption", "prism_p_shot_5",
  "prism_h2_testimonial",
  "prism_testimonial_challenge", "prism_testimonial_solution", "prism_testimonial_result",
  "prism_testimonial_sig", "prism_testimonial_note",
  "prism_h2_closing", "prism_p_closing_1",
  "prism_cta_heading", "prism_cta_text", "prism_cta_button",
  ...domino.map((_, i) => `prism_domino_${i}`),
  ...internalChallenges.flatMap((_, i) => [`prism_challenge_${i}_title`, `prism_challenge_${i}_text`]),
  ...builtModules.flatMap((_, i) => [`prism_module_${i}_title`, `prism_module_${i}_text`]),
  ...beforeList.map((_, i) => `prism_before_${i}`),
  ...afterList.map((_, i) => `prism_after_${i}`),
  ...topStats.flatMap((_, i) => [`prism_topstat_${i}_num`, `prism_topstat_${i}_label`]),
];

const CaseStudyPrismCalibration = () => {
  useCMSEditor();
  const s = useSettings(PRISM_KEYS);
  const t = (key: string, fallback: React.ReactNode) => s[key] || fallback;

  const heroTitle = t("prism_heroTitle", <>From Being Known<br />to Being <em style={{ fontStyle: "normal", color: GREEN }}>Found</em>.</>);
  const heroSubtitle = t(
    "prism_heroSubtitle",
    "For twenty years, Prism Calibration Centre grew one referral at a time. Then the way industrial buyers search changed — and their digital presence didn't. Here's how we recalibrated it."
  );
  const dominoItems = domino.map((step, i) => t(`prism_domino_${i}`, step));
  const internalChallengeItems = internalChallenges.map((c, i) => ({
    title: t(`prism_challenge_${i}_title`, c.title),
    text: t(`prism_challenge_${i}_text`, c.text),
  }));
  const builtModuleItems = builtModules.map((m, i) => ({
    tag: m.tag,
    title: t(`prism_module_${i}_title`, m.title),
    text: t(`prism_module_${i}_text`, m.text),
  }));
  const beforeItems = beforeList.map((item, i) => t(`prism_before_${i}`, item));
  const afterItems = afterList.map((item, i) => t(`prism_after_${i}`, item));
  const topStatItems = topStats.map((stat, i) => ({
    num: t(`prism_topstat_${i}_num`, stat.num),
    label: t(`prism_topstat_${i}_label`, stat.label),
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
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6"
              style={{ color: "#BBF7D0" }}
            >
              <ArrowLeft size={15} /> All Case Studies
            </Link>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: GREEN, color: "#052e16" }}
            >
              Case Study &middot; SEO &amp; AEO
            </span>
            <h1 data-cms-key="prism_heroTitle" data-cms-label="Hero Title" data-cms-attr="text" className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] text-white mb-6 tracking-tight">
              {heroTitle}
            </h1>
            <p data-cms-key="prism_heroSubtitle" data-cms-label="Hero Subtitle" data-cms-attr="text" className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#BBF7D0" }}>
              {heroSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
              {topStatItems.map((stat, i) => (
                <div key={i} className="rounded-xl px-5 py-5 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span data-cms-key={`prism_topstat_${i}_num`} data-cms-label={`Top Stat ${i + 1} Number`} data-cms-attr="text" className="block text-2xl font-black mb-1.5 text-white">
                    {stat.num}
                  </span>
                  <span data-cms-key={`prism_topstat_${i}_label`} data-cms-label={`Top Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs leading-snug" style={{ color: "#BBF7D0" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14 md:py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp} data-cms-key="prism_intro" data-cms-label="Intro Line" data-cms-attr="text" className="text-lg md:text-xl italic mb-2" style={{ color: MUTED }}>
            {t("prism_intro", "Twenty years of real expertise. Almost zero visibility online. That's the gap that was quietly capping a business that had already earned the right to grow.")}
          </motion.p>

          <H2 k="prism_h2_business">{t("prism_h2_business", "The Business")}</H2>
          <P k="prism_p_business_1">
            {t("prism_p_business_1", <>Since 2004, <strong style={{ color: NAVY }}>Prism Calibration Centre</strong> had been quietly building something valuable: trust.</>)}
          </P>
          <P k="prism_p_business_2">
            {t("prism_p_business_2", "Based in Ahmedabad, Prism is a NABL-accredited calibration and industrial compliance company serving businesses across Gujarat. Their work doesn't usually make headlines — but for pharmaceutical companies, manufacturers, laboratories, chemical industries and other regulated businesses, it's critical. A wrong measurement can affect quality, compliance, safety, production and audits.")}
          </P>
          <P k="prism_p_business_3">
            {t("prism_p_business_3", "Prism had the technical expertise, the experience, and the long-standing customers. They'd built their reputation the traditional way — one satisfied customer at a time.")}
          </P>
          <div className="flex flex-wrap gap-2 my-6">
            {chips.map((chip) => (
              <span key={chip} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.08)", color: GREEN }}>{chip}</span>
            ))}
          </div>

          <H2 k="prism_h2_golden">{t("prism_h2_golden", "The Golden Years")}</H2>
          <P k="prism_p_golden_1">
            {t("prism_p_golden_1", "For years, Prism didn't need to chase customers online. Their network did the work. A client would call. A customer would recommend them. A networking meeting would turn into a business conversation.")}
          </P>
          <motion.div {...fadeUp} className="flex flex-wrap items-center gap-2 my-6">
            {loop.map((node, i) => (
              <div key={node} className="flex items-center gap-2">
                <span className="text-sm font-bold px-4 py-2 rounded-lg" style={{ background: "white", border: "1px solid #E5E7EB", color: NAVY }}>{node}</span>
                {i < loop.length - 1 && <ArrowRight size={16} style={{ color: GREEN }} />}
              </div>
            ))}
          </motion.div>

          <H2 k="prism_h2_shifted">{t("prism_h2_shifted", <>Then the Ground Shifted &mdash; And Nobody Told Them</>)}</H2>
          <P k="prism_p_shifted_1">
            {t("prism_p_shifted_1", "The problem wasn't that Prism had become worse. The market had simply become more digital — and Prism's online presence hadn't caught up.")}
          </P>
          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-3 my-6 items-center">
            <div className="rounded-xl border bg-white px-5 py-4" style={{ borderColor: "#E5E7EB" }}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Used to ask</div>
              <div className="text-sm font-medium" style={{ color: MUTED }}>&ldquo;Do you know a good calibration company?&rdquo;</div>
            </div>
            <div className="rounded-xl border-2 px-5 py-4" style={{ borderColor: GREEN, background: "#F0FDF4" }}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: GREEN }}>Now searches</div>
              <div className="text-sm font-semibold" style={{ color: NAVY }}>&ldquo;calibration lab in ahmedabad&rdquo;</div>
            </div>
          </motion.div>

          <H2 k="prism_h2_domino">{t("prism_h2_domino", "The Domino Effect")}</H2>
          <P k="prism_p_domino_1">{t("prism_p_domino_1", "One problem started creating another.")}</P>
          <motion.div
            {...fadeUp}
            className="rounded-xl border bg-white px-5 py-6 md:px-7 md:py-7 my-6 text-center"
            style={{ borderColor: "#E5E7EB" }}
          >
            {dominoItems.map((step, i) => (
              <div key={i}>
                <div
                  data-cms-key={`prism_domino_${i}`} data-cms-label={`Domino Step ${i + 1}`} data-cms-attr="text"
                  className="font-semibold py-1.5 text-[15px] md:text-[17px]"
                  style={{ color: i === dominoItems.length - 1 ? RED : NAVY }}
                >
                  {step}
                </div>
                {i < dominoItems.length - 1 && (
                  <ChevronDown size={18} className="mx-auto" style={{ color: GREEN }} />
                )}
              </div>
            ))}
          </motion.div>
          <P k="prism_p_domino_2">
            {t("prism_p_domino_2", <>Revenue and profitability had stayed roughly flat for two years.{" "}<strong style={{ color: NAVY }}>Prism had the capability to grow — but not a scalable digital channel to grow through.</strong></>)}
          </P>

          <H2 k="prism_h2_internal">{t("prism_h2_internal", "Internal Challenges")}</H2>
          <P k="prism_p_internal_1">{t("prism_p_internal_1", "When we looked beneath the surface, the website itself was holding the business back.")}</P>
          <motion.div {...fadeUp} className="my-4 divide-y" style={{ borderColor: "#E5E7EB" }}>
            {internalChallengeItems.map((c, i) => (
              <div key={i} className="flex items-start gap-3 py-4 border-t" style={{ borderColor: "#E5E7EB" }}>
                <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: RED, boxShadow: `0 0 0 3px ${RED}22` }} />
                <div>
                  <div data-cms-key={`prism_challenge_${i}_title`} data-cms-label={`Challenge ${i + 1} Title`} data-cms-attr="text" className="font-bold text-[15px] md:text-base mb-1" style={{ color: NAVY }}>{c.title}</div>
                  <div data-cms-key={`prism_challenge_${i}_text`} data-cms-label={`Challenge ${i + 1} Text`} data-cms-attr="text" className="text-sm md:text-[15px]" style={{ color: MUTED }}>{c.text}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <H2 k="prism_h2_met">{t("prism_h2_met", "How We Met")}</H2>
          <P k="prism_p_met_1">
            {t("prism_p_met_1", <>Digital Aura and Prism Calibration met through the networking platform <strong style={{ color: NAVY }}>Biztreez</strong>. The initial conversation was about improving the website and SEO. But after understanding the business, we saw a much bigger opportunity.</>)}
          </P>
          <P k="prism_p_met_2">
            {t("prism_p_met_2", "Prism didn't need another website that simply said \"here are our services.\" They needed a digital ecosystem that could answer who they are, what they do, who they serve, what they calibrate, which industries need them, why they should be trusted — and be visible at the exact moment someone was looking for them.")}
          </P>

          <H2 k="prism_h2_built">{t("prism_h2_built", "What We Built")}</H2>
          <P k="prism_p_built_1">{t("prism_p_built_1", "Not just a website. A digital growth engine — ten connected pieces, built in sequence, each one making the next work harder.")}</P>
          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 my-6">
            {builtModuleItems.map((m, i) => (
              <div key={i} className="rounded-xl border bg-white px-5 py-5" style={{ borderColor: "#E5E7EB" }}>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black mb-3" style={{ background: "rgba(34,197,94,0.1)", color: GREEN }}>{m.tag}</span>
                <div data-cms-key={`prism_module_${i}_title`} data-cms-label={`Module ${i + 1} Title`} data-cms-attr="text" className="font-bold text-[15px] mb-1.5" style={{ color: NAVY }}>{m.title}</div>
                <div data-cms-key={`prism_module_${i}_text`} data-cms-label={`Module ${i + 1} Text`} data-cms-attr="text" className="text-sm leading-relaxed" style={{ color: MUTED }}>{m.text}</div>
              </div>
            ))}
          </motion.div>

          <H2 k="prism_h2_results">{t("prism_h2_results", "The Results")}</H2>
          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="rounded-xl border-2 bg-white px-5 py-5" style={{ borderColor: "#FCA5A5" }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: RED }}>Before</div>
              <ul className="space-y-2.5">
                {beforeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: NAVY }}>
                    <XCircle size={16} style={{ color: RED }} className="mt-0.5 flex-shrink-0" />
                    <span data-cms-key={`prism_before_${i}`} data-cms-label={`Before ${i + 1}`} data-cms-attr="text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 bg-white px-5 py-5" style={{ borderColor: GREEN }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GREEN }}>After</div>
              <ul className="space-y-2.5">
                {afterItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: NAVY }}>
                    <CheckCircle2 size={16} style={{ color: GREEN }} className="mt-0.5 flex-shrink-0" />
                    <span data-cms-key={`prism_after_${i}`} data-cms-label={`After ${i + 1}`} data-cms-attr="text">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E5E7EB" }}>
                <span className="text-2xl font-black" style={{ color: GREEN }}>70–100</span>
                <span className="text-sm ml-2" style={{ color: MUTED }}>qualified leads, every month</span>
              </div>
            </div>
          </motion.div>

          <H2 k="prism_h2_proof">{t("prism_h2_proof", "The Proof")}</H2>
          <P k="prism_p_proof_1">{t("prism_p_proof_1", "The website evolved from a company brochure into a consistent source of enquiries. Here's what that looks like.")}</P>

          <Screenshot
            tag={t("prism_shot_1_tag", "Organic Traffic, Climbing") as string}
            tagKey="prism_shot_1_tag"
            src={`${IMG}/organic-traffic-ga4.jpg`}
            alt="Google Analytics 4 chart showing website traffic by channel, with organic search as a steadily rising line"
            caption={t("prism_shot_1_caption", "Sessions by channel, one month. Organic search — a steady, compounding source of traffic that isn't dependent on someone happening to remember Prism's name.") as string}
            captionKey="prism_shot_1_caption"
          />
          <Screenshot
            tag={t("prism_shot_2_tag", "Real Enquiries, Landing") as string}
            tagKey="prism_shot_2_tag"
            src={`${IMG}/inquiries-dashboard.png`}
            alt="Dashboard list of website inquiries showing service requested, source page, date received and status, with contact details blurred for privacy"
            caption={t("prism_shot_2_caption", "Every quote and contact form submitted on the site lands here — real requests, for real instruments, from real companies. Contact details are blurred for privacy.") as string}
            captionKey="prism_shot_2_caption"
          />

          <P k="prism_p_shot_3">{t("prism_p_shot_3", "We wanted to see whether Prism's authority was extending beyond traditional rankings. So we searched:")}</P>
          <AIQuery>Which is the best NABL accredited lab in Ahmedabad?</AIQuery>
          <Screenshot
            tag={t("prism_shot_3_tag", "The AI Moment") as string}
            tagKey="prism_shot_3_tag"
            src={`${IMG}/google-ai-overview.jpg`}
            alt="Google search results showing an AI Overview naming Prism Calibration Centre for the query 'which is the best NABL accredited lab in ahmedabad'"
            caption={t("prism_shot_3_caption", "Source: Google Search, AI Overview") as string}
            captionKey="prism_shot_3_caption"
          />
          <P>
            A company that had spent twenty years growing through referrals, networking and word-of-mouth was now being surfaced inside an AI-powered search experience. The business had gone from being known — to being found.
          </P>

          <P k="prism_p_shot_4">{t("prism_p_shot_4", "Google's AI Overview was one signal. We wanted to know if that visibility held up on the AI assistants buyers are increasingly asking directly — so we asked Claude the same kind of question an industrial buyer would.")}</P>
          <AIQuery>Best calibration lab in Ahmedabad</AIQuery>
          <Screenshot
            tag={t("prism_shot_4_tag", "Visibility Across AI Assistants") as string}
            tagKey="prism_shot_4_tag"
            src={`${IMG}/claude-ai-response.png`}
            alt="Claude AI response to 'Best calibration lab in Ahmedabad' listing Prism Calibration Centre first among NABL-accredited labs"
            caption={t("prism_shot_4_caption", "Source: Claude") as string}
            captionKey="prism_shot_4_caption"
          />

          <P k="prism_p_shot_5">{t("prism_p_shot_5", "Even for a narrow, instrument-specific query, ChatGPT surfaces Prism on the map and flags it as a strong match — citing the exact gases and standards named on their service pages.")}</P>
          <AIQuery>Gas detector calibration in Ahmedabad</AIQuery>
          <Screenshot
            tag={t("prism_shot_5_tag", "Even the Narrow Queries") as string}
            tagKey="prism_shot_5_tag"
            src={`${IMG}/chatgpt-map-response.png`}
            alt="ChatGPT response to 'Gas detector calibration in Ahmedabad' showing Prism Calibration Centre on the map with strong visibility for the specific service"
            caption={t("prism_shot_5_caption", "Source: ChatGPT") as string}
            captionKey="prism_shot_5_caption"
          />

          {/* Testimonial */}
          <H2 k="prism_h2_testimonial">{t("prism_h2_testimonial", "The Client's Story")}</H2>
          <motion.div
            {...fadeUp}
            className="rounded-2xl border bg-white px-5 py-7 md:px-8 md:py-9 mt-5"
            style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 24px rgba(10,22,40,0.06)" }}
          >
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GREEN }}>The Challenge</div>
              <blockquote data-cms-key="prism_testimonial_challenge" data-cms-label="Testimonial Challenge" data-cms-attr="text" className="italic text-[15px] md:text-base" style={{ color: NAVY }}>
                {t("prism_testimonial_challenge", "\"We had years of experience and strong technical expertise, but most of our business still came through referrals and networking. Our online visibility wasn't reflecting the reputation we had built in the industry.\"")}
              </blockquote>
            </div>
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GREEN }}>The Solution</div>
              <blockquote data-cms-key="prism_testimonial_solution" data-cms-label="Testimonial Solution" data-cms-attr="text" className="italic text-[15px] md:text-base" style={{ color: NAVY }}>
                {t("prism_testimonial_solution", "\"Digital Aura understood our business and completely reworked our website, service structure and SEO strategy. They focused on how our customers actually search for calibration services in Ahmedabad and Gujarat, rather than simply focusing on rankings.\"")}
              </blockquote>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GREEN }}>The Result</div>
              <blockquote data-cms-key="prism_testimonial_result" data-cms-label="Testimonial Result" data-cms-attr="text" className="italic text-[15px] md:text-base mb-4" style={{ color: NAVY }}>
                {t("prism_testimonial_result", "\"Our visibility on Google has improved significantly, and we now receive consistent enquiries from businesses that find us online. Digital Aura has helped turn our website and local SEO presence into a genuine source of business enquiries.\"")}
              </blockquote>
              <div data-cms-key="prism_testimonial_sig" data-cms-label="Testimonial Signature" data-cms-attr="text" className="text-sm font-semibold" style={{ color: NAVY }}>
                {t("prism_testimonial_sig", "— Management Team, Prism Calibration Centre")}
              </div>
              <p data-cms-key="prism_testimonial_note" data-cms-label="Testimonial Note" data-cms-attr="text" className="text-xs italic mt-3 pt-3 border-t" style={{ color: MUTED, borderColor: "#E5E7EB" }}>
                {t("prism_testimonial_note", "Quote pending final sign-off from Prism's management.")}
              </p>
            </div>
          </motion.div>

          <Callout tone="green" k="prism_callout_results">
            {t("prism_callout_results", "This isn't a story about a company that had failed. It's the opposite — Prism had succeeded, for years. But the world around them changed, and their digital presence hadn't changed with it. Our job wasn't to replace what they'd built. It was to make it visible.")}
          </Callout>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="mt-14 rounded-2xl text-center px-6 py-10 md:px-10 md:py-12"
            style={{ background: NAVY }}
          >
            <h2 data-cms-key="prism_cta_heading" data-cms-label="CTA Heading" data-cms-attr="text" className="text-2xl md:text-[28px] font-bold text-white mb-3">
              {t("prism_cta_heading", "You May Already Have the Expertise. Do You Have the Visibility?")}
            </h2>
            <p data-cms-key="prism_cta_text" data-cms-label="CTA Text" data-cms-attr="text" className="text-[15px] md:text-base max-w-xl mx-auto mb-6" style={{ color: "#BBF7D0" }}>
              {t("prism_cta_text", "If the right people can't find you when they're searching, your expertise isn't working as hard as it could be. Digital Aura helps businesses turn expertise into visibility, visibility into qualified enquiries, and enquiries into growth.")}
            </p>
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
              <span data-cms-key="prism_cta_button" data-cms-label="CTA Button" data-cms-attr="text">{t("prism_cta_button", "Talk to Digital Aura Today")}</span> <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyPrismCalibration;
