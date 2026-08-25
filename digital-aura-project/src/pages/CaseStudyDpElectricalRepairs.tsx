import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ArrowLeft, Sparkles,
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const NAVY = "#0A1628";
const BLUE = "#1A6FE8";
const ORANGE = "#FF6B2B";
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

const AIQuery = ({ children }: { children: React.ReactNode }) => (
  <div
    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm md:text-[15px] font-semibold mb-4"
    style={{ background: "rgba(26,111,232,0.08)", color: BLUE, border: "1px solid rgba(26,111,232,0.25)" }}
  >
    <Sparkles size={15} /> &ldquo;{children}&rdquo;
  </div>
);

const services = [
  "Dishwasher repair", "Dryer repair", "Oven repair", "Range hood repair",
  "Cooktop repair", "Washing machine repair", "Fridge repair", "Air conditioner repair",
];

const painPoints = [
  "Website generated almost no organic enquiries",
  "Growth capped by referrals from existing customers only",
  "Hi Pages leads shared with competitors — constant price war",
  "Lower-skilled competitors ranking higher on Google",
  "No reliable way to reach or convert local customers",
];

const solutions = [
  { tag: "Service pages", title: "A dedicated page for every repair service", text: "Instead of one generic \"services\" page, each repair type got its own optimised landing page — built to rank for exactly what customers type into Google." },
  { tag: "Brand pages", title: "Brand-specific pages for every service", text: "Customers often search by appliance brand, not just repair type. We built pages that pair each brand with each service, capturing that intent directly." },
  { tag: "Location pages", title: "Suburb-level pages for local SEO — 200+ suburbs covered", text: "A dedicated page for every one of the 200+ Melbourne suburbs DP Electrical Repairs services, each listing every service and brand available there — the backbone of ranking for \"appliance repair near me\" style searches across the region." },
  { tag: "Conversion layer", title: "Exit-intent popup", text: "Any visitor about to leave without enquiring is prompted with an instant callback request — turning drop-off traffic into captured leads instead of lost ones." },
];

const resultStats = [
  { num: "3,000+", label: "Monthly website visitors — up from a website that drove almost no traffic" },
  { num: "10–15/day", label: "Qualified leads generated directly from the website" },
  { num: "Top rankings", label: "Significant ranking improvement across multiple service and location keywords" },
  { num: "Higher", label: "Conversion rate on website visitors, driven by the exit-intent capture flow" },
  { num: "AEO / GEO", label: "Started appearing in AI-generated answers on tools like ChatGPT and Google AI Overviews" },
  { num: "Repeat + referral", label: "Noticeable growth in repeat customers and word-of-mouth referrals" },
];

const heroStats = [
  { num: "10–15/day", label: "Qualified leads from website" },
  { num: "3,000+", label: "Monthly website visitors" },
  { num: "4 mo", label: "Time to results" },
];

// Deliberately NOT under /case-studies/ — that path collides with the React route of the
// same name, and nginx resolves the URL to this real directory and 403s instead of falling
// through to the SPA rewrite.
const IMG = "/case-study-assets/dp-electrical-repairs";

const DP_KEYS = [
  "dp_heroTitle", "dp_heroSubtitle",
  "dp_h2_services",
  "dp_h2_challenge", "dp_p_challenge_1", "dp_p_challenge_2", "dp_p_challenge_3",
  "dp_h3_stuck",
  "dp_h2_solutions", "dp_p_solutions_1",
  "dp_h2_results", "dp_p_results_1",
  "dp_shot_1_tag", "dp_shot_1_caption",
  "dp_h2_aeo", "dp_p_aeo_1",
  "dp_shot_2_tag", "dp_shot_2_caption",
  "dp_shot_3_tag", "dp_shot_3_caption",
  "dp_shot_4_tag", "dp_shot_4_caption",
  "dp_shot_5_tag", "dp_shot_5_caption",
  "dp_shot_6_tag", "dp_shot_6_caption",
  "dp_callout",
  "dp_cta_heading", "dp_cta_text", "dp_cta_button",
  ...heroStats.flatMap((_, i) => [`dp_herostat_${i}_num`, `dp_herostat_${i}_label`]),
  ...services.map((_, i) => `dp_service_${i}`),
  ...painPoints.map((_, i) => `dp_pain_${i}`),
  ...solutions.flatMap((_, i) => [`dp_solution_${i}_tag`, `dp_solution_${i}_title`, `dp_solution_${i}_text`]),
  ...resultStats.flatMap((_, i) => [`dp_result_${i}_num`, `dp_result_${i}_label`]),
];

const CaseStudyDpElectricalRepairs = () => {
  useCMSEditor();
  const s = useSettings(DP_KEYS);
  const t = (key: string, fallback: React.ReactNode) => s[key] || fallback;

  const heroTitle = t(
    "dp_heroTitle",
    <>How DP Electrical Repairs Went From <em style={{ fontStyle: "normal", color: ORANGE }}>Invisible</em> to 10&ndash;15 Qualified Leads a Day.</>
  );
  const heroSubtitle = t(
    "dp_heroSubtitle",
    "A Melbourne appliance repair business stuck relying on word-of-mouth and shared-lead platforms rebuilt its online presence with Digital Aura — and became the local search leader for appliance repair in just four months."
  );

  const heroStatItems = heroStats.map((stat, i) => ({
    num: t(`dp_herostat_${i}_num`, stat.num),
    label: t(`dp_herostat_${i}_label`, stat.label),
  }));
  const serviceItems = services.map((svc, i) => t(`dp_service_${i}`, svc));
  const painItems = painPoints.map((p, i) => t(`dp_pain_${i}`, p));
  const solutionItems = solutions.map((sol, i) => ({
    tag: t(`dp_solution_${i}_tag`, sol.tag),
    title: t(`dp_solution_${i}_title`, sol.title),
    text: t(`dp_solution_${i}_text`, sol.text),
  }));
  const resultItems = resultStats.map((r, i) => ({
    num: t(`dp_result_${i}_num`, r.num),
    label: t(`dp_result_${i}_label`, r.label),
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
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6"
              style={{ color: "#BFD3FF" }}
            >
              <ArrowLeft size={15} /> All Case Studies
            </Link>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: BLUE, color: "#FFFFFF" }}
            >
              Case Study &middot; SEO &amp; AEO
            </span>
            <h1 data-cms-key="dp_heroTitle" data-cms-label="Hero Title" data-cms-attr="text" className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold leading-[1.15] text-white mb-6 tracking-tight">
              {heroTitle}
            </h1>
            <p data-cms-key="dp_heroSubtitle" data-cms-label="Hero Subtitle" data-cms-attr="text" className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#BFD3FF" }}>
              {heroSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
              {heroStatItems.map((stat, i) => (
                <div key={i} className="rounded-xl px-5 py-5 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span data-cms-key={`dp_herostat_${i}_num`} data-cms-label={`Hero Stat ${i + 1} Number`} data-cms-attr="text" className="block text-2xl font-black mb-1.5 text-white">
                    {stat.num}
                  </span>
                  <span data-cms-key={`dp_herostat_${i}_label`} data-cms-label={`Hero Stat ${i + 1} Label`} data-cms-attr="text" className="text-xs leading-snug" style={{ color: "#BFD3FF" }}>{stat.label}</span>
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
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Client</div>
            <div className="text-sm font-semibold text-white">DP Electrical Repairs</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Location</div>
            <div className="text-sm font-semibold text-white">Melbourne, Australia</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Industry</div>
            <div className="text-sm font-semibold text-white">Appliance Repair</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: "#7C96FF" }}>Timeline</div>
            <div className="text-sm font-semibold text-white">4 Months</div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <section className="py-14 md:py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <H2 k="dp_h2_services">{t("dp_h2_services", "Full-Spectrum Appliance Repair, Across Every Major Brand")}</H2>
          <div className="flex flex-wrap gap-2 my-6">
            {serviceItems.map((svc, i) => (
              <span key={i} data-cms-key={`dp_service_${i}`} data-cms-label={`Service ${i + 1}`} data-cms-attr="text" className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(26,111,232,0.08)", color: BLUE }}>{svc}</span>
            ))}
          </div>

          <H2 k="dp_h2_challenge">{t("dp_h2_challenge", "A Business That Ran on Referrals — And Was Starting to Stall")}</H2>
          <P k="dp_p_challenge_1">
            {t("dp_p_challenge_1", <>DP Electrical Repairs had a website, but it wasn't doing any work for the business. Almost all new jobs came from existing customers recommending them within their own network — a loyal base, but not a growth engine. <strong style={{ color: NAVY }}>Owner Dishank Patel could feel the ceiling closing in</strong> and started to worry about where the next wave of customers would come from.</>)}
          </P>
          <P k="dp_p_challenge_2">
            {t("dp_p_challenge_2", "Out of that pressure, he subscribed to Hi Pages. The platform itself works well, but it sells the same lead to several repairers (tradies) at once — turning every enquiry into a price war instead of a sale. It relieved nothing; if anything, it added a new layer of stress.")}
          </P>
          <P k="dp_p_challenge_3">
            {t("dp_p_challenge_3", <>Meanwhile, competitors with far less technical skill were consistently outranking DP Electrical Repairs on Google, purely because their online presence was stronger. Dishank realised the real gap wasn't service quality — it was visibility. That's when he brought in <strong style={{ color: NAVY }}>Digital Aura</strong>.</>)}
          </P>

          <motion.div {...fadeUp} className="rounded-xl border bg-white px-6 py-6 my-6" style={{ borderColor: "#E5E7EB" }}>
            <H2 k="dp_h3_stuck">{t("dp_h3_stuck", "Where the Business Was Stuck")}</H2>
            <ul className="space-y-2.5">
              {painItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: NAVY }}>
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ORANGE }} />
                  <span data-cms-key={`dp_pain_${i}`} data-cms-label={`Pain Point ${i + 1}`} data-cms-attr="text">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <H2 k="dp_h2_solutions">{t("dp_h2_solutions", "A Local SEO Structure Built to Own Every Service, Brand, and Suburb")}</H2>
          <P k="dp_p_solutions_1">
            {t("dp_p_solutions_1", "We rebuilt the website around how appliance-repair customers actually search — by service, by brand, and by suburb — then added a conversion layer to catch visitors before they left.")}
          </P>
          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 my-6">
            {solutionItems.map((sol, i) => (
              <div key={i} className="rounded-xl border bg-white px-5 py-5" style={{ borderColor: "#E5E7EB" }}>
                <span data-cms-key={`dp_solution_${i}_tag`} data-cms-label={`Solution ${i + 1} Tag`} data-cms-attr="text" className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold mb-3" style={{ background: "rgba(26,111,232,0.08)", color: BLUE }}>{sol.tag}</span>
                <div data-cms-key={`dp_solution_${i}_title`} data-cms-label={`Solution ${i + 1} Title`} data-cms-attr="text" className="font-bold text-[15px] mb-1.5" style={{ color: NAVY }}>{sol.title}</div>
                <div data-cms-key={`dp_solution_${i}_text`} data-cms-label={`Solution ${i + 1} Text`} data-cms-attr="text" className="text-sm leading-relaxed" style={{ color: MUTED }}>{sol.text}</div>
              </div>
            ))}
          </motion.div>

          <Screenshot
            tag={t("dp_shot_1_tag", "Services Menu") as string}
            tagKey="dp_shot_1_tag"
            src={`${IMG}/services-menu.jpg`}
            alt="DP Electrical Repairs services menu"
            caption={t("dp_shot_1_caption", "Every repair type given its own page, from dishwashers to water heaters.") as string}
            captionKey="dp_shot_1_caption"
          />
          <Screenshot
            tag={t("dp_shot_2_tag", "Brand Coverage") as string}
            tagKey="dp_shot_2_tag"
            src={`${IMG}/brands-menu-dishwasher.jpg`}
            alt="DP Electrical Repairs brands menu showing 32 dishwasher brands"
            caption={t("dp_shot_2_caption", "Up to 32 brands mapped per service category (dishwasher shown).") as string}
            captionKey="dp_shot_2_caption"
          />
          <Screenshot
            tag={t("dp_shot_3_tag", "Locations Page") as string}
            tagKey="dp_shot_3_tag"
            src={`${IMG}/locations-page-melbourne-suburbs.jpg`}
            alt="DP Electrical Repairs locations page listing 200+ Melbourne suburbs"
            caption={t("dp_shot_3_caption", "200+ Melbourne suburbs, each with its own local SEO page.") as string}
            captionKey="dp_shot_3_caption"
          />

          <H2 k="dp_h2_results">{t("dp_h2_results", "From Near-Invisible to the Default Choice in Local Search")}</H2>
          <P k="dp_p_results_1">{t("dp_p_results_1", "Four months in, results across leads, traffic, rankings and conversion had all moved in the same direction.")}</P>
          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 my-6">
            {resultItems.map((r, i) => (
              <div key={i} className="rounded-xl px-5 py-5" style={{ background: NAVY }}>
                <span data-cms-key={`dp_result_${i}_num`} data-cms-label={`Result ${i + 1} Number`} data-cms-attr="text" className="block text-xl font-black mb-1.5" style={{ color: "#FF9F1C" }}>{r.num}</span>
                <span data-cms-key={`dp_result_${i}_label`} data-cms-label={`Result ${i + 1} Label`} data-cms-attr="text" className="text-xs leading-snug" style={{ color: "#D1D5DB" }}>{r.label}</span>
              </div>
            ))}
          </motion.div>

          <Screenshot
            tag={t("dp_shot_4_tag", "Website Traffic, July 2026") as string}
            tagKey="dp_shot_4_tag"
            src={`${IMG}/ga4-traffic-acquisition-july-2026.jpg`}
            alt="Google Analytics traffic acquisition chart for DP Electrical Repairs, July 2026"
            caption={t("dp_shot_4_caption", "Organic search leading every channel, with steady day-to-day session volume across the month.") as string}
            captionKey="dp_shot_4_caption"
          />

          <H2 k="dp_h2_aeo">{t("dp_h2_aeo", "AEO & GEO — Showing Up Inside AI Search Itself")}</H2>
          <P k="dp_p_aeo_1">
            {t("dp_p_aeo_1", "Beyond traditional rankings and website traffic, DP Electric now surfaces as the recommended answer inside ChatGPT and Gemini for the exact searches a customer would run — proof the same SEO structure driving Google traffic is winning AI-generated answers too.")}
          </P>

          <AIQuery>appliance repair Melbourne</AIQuery>
          <Screenshot
            tag={t("dp_shot_5_tag", "ChatGPT — \"appliance repair Melbourne\"") as string}
            tagKey="dp_shot_5_tag"
            src={`${IMG}/chatgpt-map-appliance-repair-melbourne.jpg`}
            alt="ChatGPT map result recommending DP Electrical Repairs for appliance repair Melbourne"
            caption={t("dp_shot_5_caption", "DP Electrical Repairs recommended with map pin, rating, and same-day service callout.") as string}
            captionKey="dp_shot_5_caption"
          />

          <AIQuery>best appliance repair service Melbourne</AIQuery>
          <Screenshot
            tag={t("dp_shot_6_tag", "Gemini — \"best appliance repair service Melbourne\"") as string}
            tagKey="dp_shot_6_tag"
            src={`${IMG}/gemini-best-appliance-repair-service.jpg`}
            alt="Gemini naming DP Electric the number 1 choice for best appliance repair service Melbourne"
            caption={t("dp_shot_6_caption", "Named the #1 choice, with same-day service, brand range, and licensing called out.") as string}
            captionKey="dp_shot_6_caption"
          />

          <Callout tone="blue" k="dp_callout">
            {t("dp_callout", "DP Electrical Repairs didn't need to work harder — it needed to be found. A local SEO structure built around real search behaviour turned an unpredictable referral business into one with a steady, measurable stream of qualified leads.")}
          </Callout>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="mt-14 rounded-2xl text-center px-6 py-10 md:px-10 md:py-12"
            style={{ background: NAVY }}
          >
            <h2 data-cms-key="dp_cta_heading" data-cms-label="CTA Heading" data-cms-attr="text" className="text-2xl md:text-[28px] font-bold text-white mb-3">
              {t("dp_cta_heading", "Is Your Business Struggling With Online Visibility?")}
            </h2>
            <p data-cms-key="dp_cta_text" data-cms-label="CTA Text" data-cms-attr="text" className="text-[15px] md:text-base max-w-xl mx-auto mb-6" style={{ color: "#BFD3FF" }}>
              {t("dp_cta_text", "Contact us today to discover how we can elevate your digital presence and drive growth for your business.")}
            </p>
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
              <span data-cms-key="dp_cta_button" data-cms-label="CTA Button" data-cms-attr="text">{t("dp_cta_button", "Talk to Digital Aura Today")}</span> <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyDpElectricalRepairs;
