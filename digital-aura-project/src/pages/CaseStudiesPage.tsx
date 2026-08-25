import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const CASE_COLORS = ["#1A6FE8", "#FF6B2B", "#22C55E", "#7C3AED", "#1A6FE8", "#22C55E"];
const CASE_BG = [
  "rgba(26,111,232,0.08)", "rgba(255,107,43,0.08)", "rgba(34,197,94,0.08)",
  "rgba(124,58,237,0.08)", "rgba(26,111,232,0.08)", "rgba(34,197,94,0.08)",
];
const CASE_TOP_BG = [
  "linear-gradient(135deg, rgba(26,111,232,0.08) 0%, rgba(26,111,232,0.02) 100%)",
  "linear-gradient(135deg, rgba(255,107,43,0.08) 0%, rgba(255,107,43,0.02) 100%)",
  "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)",
  "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)",
  "linear-gradient(135deg, rgba(26,111,232,0.08) 0%, rgba(26,111,232,0.02) 100%)",
  "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)",
];

const CASE_DEFAULTS = [
  { tag: "Healthcare · SEO",          badge: "+76.7% Traffic",    title: "IVF Hospital, Organic Growth",            statBig: "+76.7%", desc: "Targeted SEO and content authority building drove a 76.7% organic traffic increase in 6 months, generating 3x more appointment leads.",                                        services: "Technical SEO,Content Strategy,Local SEO" },
  { tag: "Healthcare · Digital Marketing", badge: "+120% Traffic", title: "Eye Hospital, Full Funnel Growth",         statBig: "+120%",  desc: "Integrated Google Ads, Meta Ads, and a conversion optimised website drove 120% traffic growth and doubled OPD bookings.",                                              services: "Google Ads,Meta Ads,Web Design" },
  { tag: "Home Services · Ads + SEO",  badge: "+174.5% Traffic",  title: "Home Appliance Repair, Local Dominance",  statBig: "+174.5%",desc: "Local SEO, Meta Ads, and conversion optimised landing pages generated a 174.5% traffic surge and 200% more service bookings.",                                       services: "Local SEO,Meta Ads,Landing Pages" },
  { tag: "eCommerce · AI Development", badge: "-68% Support Tickets", title: "eCommerce Brand, AI Chatbot",          statBig: "-68%",   desc: "AI powered chatbot handles 70% of customer queries automatically, reducing support tickets by 68% and saving 25 team hours/week.",                                  services: "AI Chatbot,OpenAI API,CRM Integration" },
  { tag: "SaaS · Custom Development",  badge: "MVP in 6 Weeks",   title: "eCommerce Founder, Inventory App",        statBig: "20 hrs", desc: "Custom inventory management app delivered in 6 weeks, saving the client 20 hours per week in manual stock tracking and reporting.",                                    services: "React,Node.js,PostgreSQL" },
  { tag: "Restaurant · Meta Ads",      badge: "+200 Customers/mo",title: "Restaurant, Lead Generation",             statBig: "+200+",  desc: "Meta Ads campaign with creative A/B testing brought 200+ new dine-in customers in the first month, with 3.8x ROAS.",                                                services: "Meta Ads,Creative Design,Retargeting" },
];

const FEATURED_CASE = {
  tag: "Local Business · Web + Booking System",
  badge: "230 Customers Managed",
  title: "Riant Bikes, From Losing Customers to Daily Bookings",
  statBig: "177",
  statLabel: "bookings processed through the new system",
  desc: "A bike rental business built on word of mouth was slowly losing to competitors with a stronger online presence. We rebuilt their website, booking system, fleet management, and Google Ads — bringing back daily bookings and full visibility into the business.",
  services: ["Web Design", "Online Booking System", "Google Ads", "Fleet Management"],
  color: "#1A6FE8",
  href: "/case-studies/riant-bikes",
  quad: [
    { n: "230", l: "Customers managed" },
    { n: "30", l: "Vehicles tracked live" },
    { n: "3", l: "Branches unified" },
    { n: "₹1.6L+", l: "Revenue tracked" },
  ],
};

const FEATURED_CASE_2 = {
  tag: "Industrial B2B · SEO & AEO/GEO",
  badge: "70–100 Leads/mo",
  title: "Prism Calibration Centre, From Referral-Only to Search-Found",
  statBig: "70–100",
  statLabel: "qualified leads generated every month",
  desc: "A 20-year NABL-accredited calibration lab had grown entirely on referrals — and was losing visibility to newer, more digital competitors. We rebuilt their site into a structured search & AI-visibility engine, and got them featured in Google's AI Overview.",
  services: ["SEO", "Technical SEO", "AEO/GEO", "Local SEO", "Website Development"],
  color: "#22C55E",
  href: "/case-studies/prism-calibration",
  quad: [
    { n: "Top 3", l: "Keyword rankings" },
    { n: "20 Yrs", l: "NABL-accredited expertise" },
    { n: "Featured", l: "In Google's AI Overview" },
    { n: "70–100", l: "Leads every month" },
  ],
};

const FEATURED_CASE_3 = {
  tag: "Healthcare & Fertility · SEO + YouTube",
  badge: "+76.7% Traffic",
  title: "IVF Clinic, Quiet Authority to Measurable Demand",
  statBig: "25–30",
  statLabel: "qualified leads generated every single day",
  desc: "This IVF clinic had the reputation and the results — but not the visibility. We ran SEO and YouTube growth in parallel, turning a strong offline reputation into daily online demand in just six months.",
  services: ["SEO", "Content Strategy", "YouTube Growth", "AEO/GEO", "Conversion Optimization"],
  color: "#22C55E",
  href: "/case-studies/ivf-clinic",
  quad: [
    { n: "76.7%", l: "Organic traffic growth" },
    { n: "85.9%", l: "YouTube views growth" },
    { n: "6 Mo", l: "Time to results" },
    { n: "25–30", l: "Leads every day" },
  ],
};

const FEATURED_CASE_4 = {
  tag: "Home Services · Local SEO & AEO",
  badge: "10–15 Leads/day",
  title: "DP Electrical Repairs, From Invisible to Local Leader",
  statBig: "10–15",
  statLabel: "qualified leads generated every day from the website",
  desc: "A Melbourne appliance repair business stuck relying on word-of-mouth and shared-lead platforms rebuilt its online presence with Digital Aura — becoming the local search leader for appliance repair in just four months.",
  services: ["Local SEO", "Service Pages", "AEO/GEO", "Conversion Optimization"],
  color: "#1A6FE8",
  href: "/case-studies/dp-electrical-repairs",
  quad: [
    { n: "3,000+", l: "Monthly website visitors" },
    { n: "200+", l: "Suburb pages built" },
    { n: "4 Mo", l: "Time to results" },
    { n: "10–15", l: "Leads every day" },
  ],
};

type FeaturedCase = typeof FEATURED_CASE;

const FeaturedCaseBanner = ({ item }: { item: FeaturedCase }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="rounded-2xl overflow-hidden border bg-white grid md:grid-cols-2"
    style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
    <div className="p-8 md:p-10 flex flex-col justify-center" style={{ background: `linear-gradient(135deg, ${item.color}10 0%, transparent 100%)` }}>
      <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
        style={{ color: item.color, background: `${item.color}15` }}>
        Featured Case Study
      </span>
      <span className="text-xs font-semibold mb-2" style={{ color: item.color }}>{item.tag}</span>
      <h3 className="text-2xl md:text-3xl font-bold text-[#0A1628] mb-4">{item.title}</h3>
      <p className="text-sm md:text-base leading-relaxed text-[#4B5563] mb-6">{item.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {item.services.map((sv) => (
          <span key={sv} className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: `${item.color}15`, color: item.color }}>{sv}</span>
        ))}
      </div>
      <Link to={item.href} className="text-sm font-semibold inline-flex items-center gap-1 w-fit hover:gap-2 transition-all"
        style={{ color: item.color }}>
        Read Full Case Study <ArrowRight size={14} />
      </Link>
    </div>
    <div className="flex flex-col justify-center gap-4 p-8 md:p-10" style={{ background: "#F8FAFF" }}>
      <div className="flex items-center gap-3">
        <TrendingUp size={22} style={{ color: item.color }} />
        <div>
          <div className="text-2xl font-black leading-none" style={{ color: item.color }}>{item.statBig}</div>
          <div className="text-xs text-[#6B7280] mt-1">{item.statLabel}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {item.quad.map((q) => (
          <div key={q.l} className="rounded-lg bg-white border px-4 py-3 text-center" style={{ borderColor: "#E5E7EB" }}>
            <div className="text-lg font-bold text-[#0A1628]">{q.n}</div>
            <div className="text-[11px] text-[#6B7280]">{q.l}</div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CaseStudiesPage = () => {
  const s = useSettings([
    'cs_hero_badge', 'cs_hero_heading', 'cs_hero_subtext',
    'cs1_tag', 'cs1_badge', 'cs1_title', 'cs1_statbig', 'cs1_desc', 'cs1_services',
    'cs2_tag', 'cs2_badge', 'cs2_title', 'cs2_statbig', 'cs2_desc', 'cs2_services',
    'cs3_tag', 'cs3_badge', 'cs3_title', 'cs3_statbig', 'cs3_desc', 'cs3_services',
    'cs4_tag', 'cs4_badge', 'cs4_title', 'cs4_statbig', 'cs4_desc', 'cs4_services',
    'cs5_tag', 'cs5_badge', 'cs5_title', 'cs5_statbig', 'cs5_desc', 'cs5_services',
    'cs6_tag', 'cs6_badge', 'cs6_title', 'cs6_statbig', 'cs6_desc', 'cs6_services',
    'cs_cta_text', 'cs_cta_button',
  ]);

  const cases = CASE_DEFAULTS.map((def, i) => {
    const n = i + 1;
    const servicesRaw = s[`cs${n}_services`] || def.services;
    return {
      n,
      badgeColor: CASE_COLORS[i],
      badgeBg: CASE_BG[i],
      topBg: CASE_TOP_BG[i],
      statColor: CASE_COLORS[i],
      tag: s[`cs${n}_tag`] || def.tag,
      badge: s[`cs${n}_badge`] || def.badge,
      title: s[`cs${n}_title`] || def.title,
      statBig: s[`cs${n}_statbig`] || def.statBig,
      desc: s[`cs${n}_desc`] || def.desc,
      services: servicesRaw.split(',').map((sv: string) => sv.trim()).filter(Boolean),
    };
  });

  return (
  <PageLayout>
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 500, height: 500, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(255,107,43,0.09) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
            style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.3)" }}
            data-cms-key="cs_hero_badge" data-cms-label="Case Studies Hero Badge" data-cms-attr="text">
            {s.cs_hero_badge || 'Proven Results'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight"
            data-cms-key="cs_hero_heading" data-cms-label="Case Studies Hero Heading" data-cms-attr="text">
            {s.cs_hero_heading || 'Real Clients. Real Results.'}
          </h1>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto"
            data-cms-key="cs_hero_subtext" data-cms-label="Case Studies Hero Subtext" data-cms-attr="text">
            {s.cs_hero_subtext || "Across marketing, development, and AI, these are the measurable outcomes we've driven for real businesses."}
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-12 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        <FeaturedCaseBanner item={FEATURED_CASE} />
        <FeaturedCaseBanner item={FEATURED_CASE_2} />
        <FeaturedCaseBanner item={FEATURED_CASE_3} />
        <FeaturedCaseBanner item={FEATURED_CASE_4} />
      </div>
    </section>

    <section className="pb-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="card-hover group rounded-2xl overflow-hidden border bg-white flex flex-col"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="h-24 relative px-5 flex items-end pb-4" style={{ background: c.topBg }}>
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ color: c.badgeColor, background: c.badgeBg }}
                  data-cms-key={`cs${c.n}_tag`} data-cms-label={`Case Study ${c.n} Tag`} data-cms-attr="text">
                  {c.tag}
                </span>
                <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ color: c.badgeColor, background: c.badgeBg, border: `1px solid ${c.badgeColor}30` }}
                  data-cms-key={`cs${c.n}_badge`} data-cms-label={`Case Study ${c.n} Badge`} data-cms-attr="text">
                  {c.badge}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#0A1628] mb-3"
                  data-cms-key={`cs${c.n}_title`} data-cms-label={`Case Study ${c.n} Title`} data-cms-attr="text">
                  {c.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} style={{ color: c.statColor }} />
                  <span className="text-3xl font-black leading-none" style={{ color: c.statColor }}
                    data-cms-key={`cs${c.n}_statbig`} data-cms-label={`Case Study ${c.n} Stat`} data-cms-attr="text">
                    {c.statBig}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#4B5563] mb-4 flex-1"
                  data-cms-key={`cs${c.n}_desc`} data-cms-label={`Case Study ${c.n} Description`} data-cms-attr="text">
                  {c.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {c.services.map((sv: string) => (
                    <span key={sv} className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: c.badgeBg, color: c.badgeColor }}>{sv}</span>
                  ))}
                </div>
                <Link to="/contact" className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: c.badgeColor }}>
                  Get Results Like This <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-[#6B7280] mb-6"
            data-cms-key="cs_cta_text" data-cms-label="Case Studies CTA Text" data-cms-attr="text">
            {s.cs_cta_text || 'Want results like these for your business?'}
          </p>
          <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
            <span data-cms-key="cs_cta_button" data-cms-label="Case Studies CTA Button" data-cms-attr="text">
              {s.cs_cta_button || 'Start Your Project'}
            </span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
  );
};

export default CaseStudiesPage;
