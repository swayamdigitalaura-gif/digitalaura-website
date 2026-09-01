import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

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

const FEATURED_CASE_5 = {
  tag: "Custom Printing & Signage · Google Ads & Shopping",
  badge: "35 WhatsApp Chats/mo",
  title: "OBLPrint, From a Silent Ad Account to Dubai's Busiest WhatsApp Inbox",
  statBig: "79.1%",
  statLabel: "ad account optimization score, up from 31/100",
  desc: "A 4.9-star Dubai printing business had every ingredient for online success — except a Google Ads account that could be found. We rebuilt the account from the ground up, turning silence into a steady stream of real buyer conversations.",
  services: ["Google Ads", "Google Shopping", "Conversion Tracking", "Campaign Restructuring"],
  color: "#1A6FE8",
  href: "/case-studies/oblprint",
  quad: [
    { n: "38,295", l: "Impressions in July" },
    { n: "595", l: "Clicks generated" },
    { n: "35", l: "WhatsApp click-to-chats" },
    { n: "AED 0.99", l: "Shopping cost / click" },
  ],
};

const FEATURED_CASE_6 = {
  tag: "Hospitality & Restaurant · SEO & Social",
  badge: "1.26K+ Organic Visitors",
  title: "The Grand Palace, From Word of Mouth to a Digital Front Door",
  statBig: "1.26K+",
  statLabel: "organic search sessions in 90 days, from a standing start",
  desc: "A decade-old Sydney CBD restaurant ran on reputation alone — no website, no search presence, no way for new customers to find them. We built their site, SEO, and social presence from zero, and it started paying off within 90 days.",
  services: ["Website Development", "Local SEO", "Content Strategy", "Social Media Marketing"],
  color: "#c8952f",
  href: "/case-studies/grand-palace",
  quad: [
    { n: "2.4K+", l: "Total website sessions" },
    { n: "21", l: "Keywords ranking #1–#3" },
    { n: "+45%", l: "Online reservations & orders" },
    { n: "+78.3%", l: "Google Business Profile interactions" },
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
      <Link to={item.href}>
        <h3 className="text-2xl md:text-3xl font-bold text-[#0A1628] mb-4 hover:underline">{item.title}</h3>
      </Link>
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
    'cs_cta_text', 'cs_cta_button',
  ]);

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
        <FeaturedCaseBanner item={FEATURED_CASE_5} />
        <FeaturedCaseBanner item={FEATURED_CASE_6} />

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
