import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target, Search, Globe2, BarChart2, TrendingUp, Gauge,
  DollarSign, ShieldCheck, ChevronDown, Check,
  Zap, RefreshCw, Megaphone, Video, Monitor, MousePointerClick,
  ArrowRight, Lock, CheckCircle2, Users, Settings, PieChart,
  Eye, PlayCircle, Image, LineChart, FlaskConical, BadgeDollarSign, ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import MathCaptcha from "@/components/MathCaptcha";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import ClientLogoGrid from "@/components/ClientLogoGrid";

const accentColor = "#4285F4";
const glowColor = "rgba(66,133,244,0.12)";

/* ─── Tab Config ─── */
const adsTabs = [
  {
    key: "search",
    label: "Search Ads",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.08)",
    gradient: "linear-gradient(135deg,#4285F4,#1a56db)",
  },
  {
    key: "display",
    label: "Display & Video Ads",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    gradient: "linear-gradient(135deg,#EA4335,#c51b0d)",
  },
  {
    key: "performance",
    label: "Performance Optimization",
    color: "#34A853",
    bg: "rgba(52,168,83,0.08)",
    gradient: "linear-gradient(135deg,#34A853,#1e7e34)",
  },
];

/* ─── Cards Data ─── */
const adsCards = [
  // ── Search Ads ──
  {
    Icon: Search,
    category: "Search Ads",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.08)",
    title: "Keyword Research & Strategy",
    desc: "We conduct deep keyword research to identify high intent, low-competition search terms that match your buyers' journey. Every keyword is categorised by match type and mapped to the right ad group for maximum relevance and Quality Score.",
    tags: ["High-intent keywords", "Match type strategy", "Ad group mapping"],
  },
  {
    Icon: MousePointerClick,
    category: "Search Ads",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.08)",
    title: "High Converting Ad Copy",
    desc: "We write compelling headlines and descriptions that stop the scroll, communicate your unique value, and drive qualified clicks. Every ad variant is crafted to align with search intent and land on a matching, conversion optimised landing page.",
    tags: ["Compelling headlines", "CTA optimisation", "Intent alignment"],
  },
  {
    Icon: Settings,
    category: "Search Ads",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.08)",
    title: "Account Structure & Setup",
    desc: "A clean, logical account structure is the foundation of ad performance. We build tightly themed ad groups, apply correct campaign settings, and ensure billing, tracking, and conversion goals are configured from day one for accurate reporting.",
    tags: ["Tightly themed ad groups", "Conversion tracking", "Campaign setup"],
  },
  {
    Icon: ShieldCheck,
    category: "Search Ads",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.08)",
    title: "Negative Keyword Management",
    desc: "Wasted spend on irrelevant searches kills ROI. We continuously build and refine negative keyword lists to prevent your ads appearing for searches that will never convert, keeping your budget focused on buyers who actually want what you offer.",
    tags: ["Irrelevant search blocking", "Budget protection", "Spend efficiency"],
  },
  {
    Icon: FlaskConical,
    category: "Search Ads",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.08)",
    title: "Ad Extensions & Assets",
    desc: "We implement the full suite of Google Ad assets sitelinks, callouts, structured snippets, call extensions, and lead forms to maximise your ad's real estate on the search results page and give users more reasons to click and convert.",
    tags: ["Sitelinks & callouts", "Lead form extensions", "Click-through rate boost"],
  },
  {
    Icon: Users,
    category: "Search Ads",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.08)",
    title: "Remarketing Search Lists (RLSA)",
    desc: "We layer audience signals on top of search campaigns using Remarketing Lists for Search Ads. This allows us to bid more aggressively and show customised ad messaging to users who have previously visited your site but haven't yet converted.",
    tags: ["Audience layering", "Custom bid adjustments", "Past visitor targeting"],
  },

  // ── Display & Video Ads ──
  {
    Icon: Image,
    category: "Display & Video Ads",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    title: "Display Ad Creative Design",
    desc: "We design high impact display ad creatives in all standard sizes with compelling visuals, strong CTAs, and brand consistent messaging. Responsive display ads are also set up so Google dynamically assembles the best performing combinations.",
    tags: ["Responsive display ads", "All size formats", "Brand-consistent design"],
  },
  {
    Icon: Globe2,
    category: "Display & Video Ads",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    title: "Google Display Network Targeting",
    desc: "We target your ideal audience across millions of websites, apps, and Gmail using a mix of audience segments, topic targeting, placement targeting, and in market audiences ensuring your brand appears in front of the right people at the right time.",
    tags: ["In-market audiences", "Placement targeting", "Topic & interest targeting"],
  },
  {
    Icon: PlayCircle,
    category: "Display & Video Ads",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    title: "YouTube Video Ad Campaigns",
    desc: "We plan, set up, and optimise YouTube ad campaigns across TrueView in stream, in feed, bumper ads, and masthead formats. Each campaign is built with clear audience targeting, compelling scripting advice, and a/b testing to maximise view-through and conversion rates.",
    tags: ["In stream & bumper ads", "Audience targeting", "View-through tracking"],
  },
  {
    Icon: Eye,
    category: "Display & Video Ads",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    title: "Brand Awareness Campaigns",
    desc: "We design top-of-funnel display and video campaigns to build brand recognition with audiences who don't yet know your business. Reach and frequency campaigns ensure consistent exposure so your brand stays top of mind when buyers are ready to decide.",
    tags: ["Top-of-funnel reach", "Frequency capping", "Brand recall lift"],
  },
  {
    Icon: RefreshCw,
    category: "Display & Video Ads",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    title: "Display Remarketing",
    desc: "We re-engage users who visited your website but didn't convert by showing highly targeted banner ads as they browse across the web. Custom audience segments allow us to tailor ad messaging based on which pages they visited, creating a personalised re-engagement experience.",
    tags: ["Cart abandonment ads", "Custom audience lists", "Sequential messaging"],
  },
  {
    Icon: Monitor,
    category: "Display & Video Ads",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    title: "Performance Max (PMax) Campaigns",
    desc: "We configure and optimise Performance Max campaigns that run across all Google channels Search, Display, YouTube, Gmail, and Maps from a single campaign. Using asset groups, audience signals, and conversion data, we let Google's AI maximise results across every surface.",
    tags: ["All channel coverage", "Asset group setup", "Audience signal inputs"],
  },

  // ── Performance Optimization ──
  {
    Icon: BarChart2,
    category: "Performance Optimization",
    color: "#34A853",
    bg: "rgba(52,168,83,0.08)",
    title: "Bid Strategy & Smart Bidding",
    desc: "We configure and continuously refine bidding strategies Target CPA, Target ROAS, Maximize Conversions, and Enhanced CPC  based on your campaign's conversion history and business goals. Smart bidding is monitored weekly to prevent budget waste and improve efficiency over time.",
    tags: ["Target CPA & ROAS", "Smart bidding setup", "Bid adjustment optimisation"],
  },
  {
    Icon: LineChart,
    category: "Performance Optimization",
    color: "#34A853",
    bg: "rgba(52,168,83,0.08)",
    title: "Conversion Tracking & Analytics",
    desc: "Accurate conversion tracking is the engine of performance improvement. We set up GA4 goals, Google Ads conversion actions, and Google Tag Manager tracking for leads, calls, form fills, purchases, and micro-conversions giving you full visibility into what your budget is actually achieving.",
    tags: ["GA4 integration", "GTM setup", "Full funnel tracking"],
  },
  {
    Icon: FlaskConical,
    category: "Performance Optimization",
    color: "#34A853",
    bg: "rgba(52,168,83,0.08)",
    title: "A/B Testing & Experimentation",
    desc: "We run structured A/B tests on ad headlines, descriptions, display creatives, landing page variants, and bidding strategies. Results are statistically validated before implementing changes, so every optimisation is based on data rather than assumption.",
    tags: ["Ad copy testing", "Landing page variants", "Statistical validation"],
  },
  {
    Icon: PieChart,
    category: "Performance Optimization",
    color: "#34A853",
    bg: "rgba(52,168,83,0.08)",
    title: "Budget Allocation & ROAS Management",
    desc: "We analyse performance data across campaigns, ad groups, and keywords to shift budget toward what drives the best return. Underperforming segments are paused or restructured, and high performers get scaled ensuring every rupee of ad spend generates maximum output.",
    tags: ["Campaign budget reallocation", "ROAS improvement", "Scale high performers"],
  },
  {
    Icon: Gauge,
    category: "Performance Optimization",
    color: "#34A853",
    bg: "rgba(52,168,83,0.08)",
    title: "Quality Score Improvement",
    desc: "Quality Score directly impacts ad position and cost per click. We improve QS by tightening keyword-to-ad relevance, improving expected CTR with stronger copy, and aligning landing pages to the exact search intent of each keyword lowering your CPCs while improving ad rank.",
    tags: ["Ad relevance improvement", "CTR optimisation", "Landing page alignment"],
  },
  {
    Icon: TrendingUp,
    category: "Performance Optimization",
    color: "#34A853",
    bg: "rgba(52,168,83,0.08)",
    title: "Monthly Reporting & Strategy Reviews",
    desc: "We deliver transparent, jargon free monthly reports covering impressions, clicks, CTR, conversions, CPA, ROAS, and budget pacing. Every report includes a clear analysis of what worked, what changed, and what we're optimising next keeping you informed and in control.",
    tags: ["Custom performance dashboards", "KPI tracking", "Monthly strategy calls"],
  },
];

const cardsByTab: Record<string, typeof adsCards> = {
  search:      adsCards.filter(c => c.category === "Search Ads"),
  display:     adsCards.filter(c => c.category === "Display & Video Ads"),
  performance: adsCards.filter(c => c.category === "Performance Optimization"),
};

/* ─── Tab Cards Component ─── */
const AdsCardTabs = () => {
  const [activeTab, setActiveTab] = useState("search");
  const tab = adsTabs.find(t => t.key === activeTab)!;
  const cards = cardsByTab[activeTab];

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(66,133,244,0.08)", color: "#4285F4", border: "1px solid rgba(66,133,244,0.2)" }}>
            <Target size={12} /> Google Ads Management
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="gads_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Google Ads: Targeted Campaigns That Drive Real Results</span></h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed"><span data-cms-key="gads_p_23" data-cms-label="Body Text" data-cms-attr="text">We manage the full spectrum of Google Ads from high intent search campaigns to display, video, and advanced performance optimisation all built to maximise your ROI and scale your business.</span></p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {adsTabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={
                activeTab === t.key
                  ? { background: t.gradient, color: "#fff", boxShadow: `0 4px 14px ${t.color}40` }
                  : { background: "#F8FAFF", color: "#374151", border: "1.5px solid #E5E7EB" }
              }>
              <span data-cms-key={`gads_tl_${i}_label`} data-cms-label="Tab Label" data-cms-attr="text">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid md:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-6 border"
                style={{ background: "#fff", borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = tab.color + "40";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px ${tab.color}12`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tab.bg }}>
                    <card.Icon size={20} style={{ color: tab.color }} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}>
                    {card.category}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`gads_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`gads_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold transition-all hover:gap-2.5"
                  style={{ color: tab.color }}>
              <span data-cms-key="gads_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Learn More</span> <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ─── Supporting Data ─── */
const toolGroups = [
  { label: "Advertising Platforms", color: "#4285F4", bg: "rgba(66,133,244,0.08)",  pills: ["Google Ads", "YouTube Ads", "Performance Max"] },
  { label: "Analytics & Tracking",  color: "#34A853", bg: "rgba(52,168,83,0.08)",   pills: ["Google Analytics 4", "Google Tag Manager", "Conversion Tracking"] },
  { label: "Research & Planning",   color: "#FBBC05", bg: "rgba(251,188,5,0.08)",   pills: ["Keyword Planner", "SEMrush", "Ahrefs", "SpyFu"] },
  { label: "Reporting",             color: "#6C47FF", bg: "rgba(108,71,255,0.08)",  pills: ["Looker Studio", "Custom Dashboards", "Monthly Reports"] },
];

const approach = [
  "Deep keyword & competitor research before campaigns launch",
  "Tight ad group structure for maximum Quality Score",
  "Conversion tracking set up before any spend goes live",
  "Weekly campaign monitoring and bid adjustments",
  "Continuous A/B testing of ad copy and landing pages",
  "Monthly reporting with full transparency on spend and ROI",
];

const whatWeAchieve = [
  { Icon: Target,      label: "Generate high quality leads at lower cost" },
  { Icon: DollarSign,  label: "Increase sales and e-commerce revenue" },
  { Icon: Zap,         label: "Drive instant, high intent website traffic" },
  { Icon: Megaphone,   label: "Improve brand visibility across Google & YouTube" },
  { Icon: RefreshCw,   label: "Retarget and re-engage potential customers" },
  { Icon: TrendingUp,  label: "Scale campaigns profitably as your business grows" },
];

const results = [
  { Icon: TrendingUp,  text: "Higher conversion rates & more qualified leads" },
  { Icon: DollarSign,  text: "Lower cost per lead (CPL)" },
  { Icon: Gauge,       text: "Improved return on ad spend (ROAS)" },
  { Icon: ShieldCheck, text: "Consistent, scalable, and predictable growth" },
];

const whyUs = [
  "ROI-first strategy every decision is tied to your business goals",
  "Full funnel approach: search, display, video, and remarketing",
  "Dedicated account manager with weekly updates",
  "Transparent reporting with no hidden fees or markups",
  "Proven track record reducing CPL by 30-60% for clients",
  "Strategies tailored to your industry, budget, and competitors",
];

const faqs = [
  {
    q: "How quickly can I see results from Google Ads?",
    a: "Google Ads can drive traffic and leads within 24-72 hours of launch. However, meaningful optimisation results (lower CPL, higher ROAS) typically appear within 30-60 days as we gather sufficient data to refine bidding, targeting, and messaging.",
  },
  {
    q: "What budget do I need to get started?",
    a: "There is no one size-fits-all answer. For most service businesses, a minimum ad spend of ₹30,000, ₹50,000/month is recommended to gather enough data for optimisation. For eCommerce, budgets depend on product margins and competition. We'll help you define the right starting point.",
  },
  {
    q: "What is the difference between Search Ads and Display Ads?",
    a: "Search Ads appear when someone actively types a related query into Google they capture high purchase intent. Display Ads appear as banner ads across websites and apps they build brand awareness. We typically recommend both in tandem for a full funnel approach.",
  },
  {
    q: "Do you manage Performance Max campaigns?",
    a: "Yes. We set up and fully manage Performance Max campaigns across all Google channels including Search, Display, YouTube, Gmail, and Google Maps. We configure asset groups, audience signals, and conversion goals correctly from the start to get the best out of Google's AI.",
  },
  {
    q: "How do you measure campaign success?",
    a: "We track leads, calls, form fills, purchases, and micro-conversions using Google Ads conversion tracking integrated with GA4 and Google Tag Manager. Every campaign has clear KPIs including CPL, ROAS, CTR, and Quality Score, all visible in your monthly report.",
  },
  {
    q: "Can you take over an existing Google Ads account?",
    a: "Absolutely. We carry out a full account audit before making any changes, identifying wasted spend, structural issues, and quick wins. A phased transition plan ensures there is no drop in performance during handover.",
  },
  {
    q: "Do you handle Google Shopping / eCommerce campaigns?",
    a: "Yes. We manage Google Shopping campaigns including feed optimisation, smart shopping, and Performance Max for retail. We also work with Shopify, WooCommerce, and Merchant Center setups to ensure your products are listed and performing effectively.",
  },
];

/* ─── Form ─── */
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#4285F4] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const GoogleAdsAuditForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", website: "", goal: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(66,133,244,0.1)" }}>
            <CheckCircle2 size={32} className="text-[#4285F4]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="gads_x13" data-cms-label="Card Heading" data-cms-attr="text">Audit Request Received!</span></h3>
          <p className="text-[#6B7280]"><span data-cms-key="gads_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">We'll analyse your Google Ads account and send your free audit within 24 hours.</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1"><span data-cms-key="gads_x14" data-cms-label="Card Heading" data-cms-attr="text">Request Your Free Google Ads Audit</span></h3>
          <p className="text-sm text-[#6B7280] mb-4"><span data-cms-key="gads_p_24" data-cms-label="Body Text" data-cms-attr="text">Fill in your details and we'll get started right away.</span></p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Full Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Business Name *</label>
              <input name="business" required value={form.business} onChange={handleChange} placeholder="Your Company" className={inputClass} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Phone Number *</label>
              <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 81412 00284" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Website URL *</label>
            <input type="url" name="website" required value={form.website} onChange={handleChange} placeholder="https://yourwebsite.com" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Ads Goal *</label>
            <select name="goal" required value={form.goal} onChange={handleChange} className={inputClass + " cursor-pointer"}>
              <option value="" disabled>Select your goal...</option>
              <option>Generate more leads</option>
              <option>Increase eCommerce sales</option>
              <option>Lower my cost per lead</option>
              <option>Launch a new Google Ads account</option>
              <option>Audit & take over existing account</option>
              <option>Brand awareness & reach</option>
            </select>
          </div>
          <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
          <button
            type="submit" disabled={!captchaOk}
            className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #4285F4, #1a56db)" }}>
            Get My Free Google Ads Audit <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
            <Lock size={12} /> 100% free no credit card, no obligation
          </p>
        </form>
      )}
    </div>
  );
};

const googleAdsClients = [
  { name: "The Grand Palace",      tag: "Hospitality",           logo: "https://www.thegrandpalace.com.au/wp-content/uploads/2025/04/Logo-removebg-preview.png",                                                                                          logoBg: "#fffbf0" },
  { name: "DFA Law",               tag: "Legal Services",        logo: "https://www.dfalaw.co.uk/wp-content/uploads/2017/09/dfa-law-logo.png",                                                                                                            logoBg: "#f5f5f5" },
  { name: "DP Electric",           tag: "Electrical Services",   logo: "https://dpelectric.com.au/wp-content/uploads/2023/05/logooo.png",                                                                                                                 logoBg: "#fffff0" },
  { name: "Spinx Digital",         tag: "Digital Agency",        logo: "https://cdn-eahjn.nitrocdn.com/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-4b7d23a/www.spinxdigital.com/app/uploads/2023/03/spinx-logo-white.png",               logoBg: "#1a1a2e" },
  { name: "MYP Services",          tag: "Professional Services", logo: "https://mypservices.com.au/wp-content/uploads/2025/09/MYPService-Black.png",                                                                                                logoBg: "#f0f8ff" },
  { name: "Launch Module",         tag: "Software",              logo: "https://launchmodule.com/wp-content/uploads/logo.png",                                                                                                                            logoBg: "#f5f0ff" },
  { name: "SK Travels",            tag: "Travel & Tourism",      logo: "https://sktravelssltd.co.uk/wp-content/uploads/2024/05/sk-travelss-ltd-logo.webp",                                                                                               logoBg: "#fff8f0" },
  { name: "Mainstream Real Estate",tag: "Real Estate",           logo: "https://mainstreamrealestate.com.au/wp-content/uploads/2023/02/logo-320x184-1.png",                                                                                              logoBg: "#f0fff8" },
  { name: "Sure Freeze",           tag: "HVAC & Refrigeration",  logo: "https://surefreeze.com.au/wp-content/uploads/2023/09/Sure-Freeze-Logo-Updated-2.png",                                                                                            logoBg: "#f0faff" },
  { name: "IntegsCloud",           tag: "Cloud Solutions",       logo: "https://integscloud.com/wp-content/uploads/2024/10/logo1-1-1-1.webp",                                                                                                            logoBg: "#f0f4ff" },
  { name: "Grand Bavarchi",        tag: "Restaurant & Events",   logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png",                                                                                                            logoBg: "#fff8f0" },
  { name: "Inn of the Dove",       tag: "Hospitality",           logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp",                                                                                                           logoBg: "#fff8f5" },
  { name: "Game Zone Events",      tag: "Events & Entertainment",logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                                                                           logoBg: "#f0fff0" },
  { name: "OBL Print",             tag: "Printing Services",     logo: "https://oblprint.com/assets/logo/logo.webp",                                                                                                                              logoBg: "#f8f5f0" },
  { name: "AMVI Hospitals",        tag: "Healthcare",            logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png",                                                                                              logoBg: "#f5f0ff" },
  { name: "Krisha Hospital",       tag: "Healthcare",            logo: "https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png",                                                                                                            logoBg: "#fff0f5" },
  { name: "Krisha Eye Hospital",   tag: "Eye Care",              logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png",                                                                              logoBg: "#f0faff" },
  { name: "Shukan Hospital",       tag: "Healthcare",            logo: "https://shukanhospital.com/wp-content/uploads/2025/11/Frame-16-removebg-preview.png",                                                                                            logoBg: "#f0fff8" },
];

const GoogleAdsClientSlider = () => {
  const [active, setActive] = useState(0);
  const total = googleAdsClients.length;
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % total), 4000);
    return () => clearInterval(t);
  }, [total]);
  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);
  const c = googleAdsClients[active];
  const pageStart = Math.floor(active / 4) * 4;
  const visible = googleAdsClients.slice(pageStart, pageStart + 4);
  return (
    <div className="select-none max-w-3xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {visible.map((cl, i) => {
          const idx = pageStart + i;
          const isActive = idx === active;
          return (
            <button key={idx} onClick={() => setActive(idx)}
              className="flex items-center justify-center rounded-xl border transition-all duration-200 p-3"
              style={{ height: 64, background: isActive ? cl.logoBg : "#F8FAFF", borderColor: isActive ? `${accentColor}60` : "#E5E7EB", boxShadow: isActive ? `0 4px 16px ${accentColor}20` : "none", transform: isActive ? "scale(1.04)" : "scale(1)" }}>
              <img src={cl.logo} alt={cl.name} className="object-contain w-full" style={{ maxHeight: 32, maxWidth: 90, filter: isActive ? "none" : "grayscale(0.3) opacity(0.7)" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </button>
          );
        })}
      </div>
      <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: `${accentColor}30`, boxShadow: `0 8px 40px ${accentColor}15`, background: "#fff" }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${accentColor},#EA4335)` }} />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28 }}
            className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-5 sm:p-8">
            <div className="w-full sm:w-auto shrink-0 flex items-center justify-center rounded-xl p-5 sm:p-7" style={{ background: c.logoBg, minHeight: 100, minWidth: 160, border: "1px solid rgba(0,0,0,0.06)" }}>
              <img src={c.logo} alt={c.name} className="object-contain mx-auto" style={{ height: 52, maxWidth: 180 }} onError={e => { (e.target as HTMLImageElement).alt = c.name; }} />
            </div>
            <div className="flex-1 text-center sm:text-left w-full">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2" style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}25` }}>{c.tag}</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A1628] mb-1.5">{c.name}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">Google Ads strategy and paid search growth delivered by Digital Aura — driving qualified leads and measurable ROI.</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><ChevronLeft size={14} className="text-[#374151]" /></button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><ChevronLeft size={14} className="text-[#374151] rotate-180" /></button>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-xs font-bold text-[#9CA3AF]">{active + 1} / {total}</span>
        <div className="flex gap-1.5">
          {googleAdsClients.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="rounded-full transition-all duration-300" style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? accentColor : "#D1D5DB" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── FAQ ─── */
const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`gads_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="gads_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`gads_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

/* ─── Page ─── */
const GoogleAdsPage = () => {
  const _sp = useSettings(['gads_hero_h1','gads_hero_sub','gads_cta_btn']);
  return (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(234,67,53,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>
            ← Back to All Services
          </Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <Target size={12} /> Google Ads (PPC Advertising)
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="gads_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Drive Instant Traffic &<br />
            <span style={{ color: accentColor }}>High Performance Conversions</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            <span data-cms-key="gads_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We help businesses generate high quality leads and sales through strategic Google Ads campaigns. Our data driven approach ensures your ads reach the right audience at the right time maximising ROI and minimising wasted spend.</span>
          </p>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Search Ads", "Display & Video", "Performance Max", "Remarketing", "Shopping Ads"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(66,133,244,0.08)", color: "#4285F4", border: "1px solid rgba(66,133,244,0.2)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #4285F4, #1a56db)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Launch My Google Ads <Target size={15} />
            </Link>
            <a href="#services-list" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>Our Services</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Agency Comparison */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Google Ads Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Spend Your Ad Budget.<br className="hidden md:block" /> Very Few Can Make It Work for You.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">There's a generation of Google Ads management happening right now that burns through budgets chasing clicks that never convert — broad match keywords, generic ad copy, and traffic sent to landing pages that weren't designed to close.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Broad match campaigns burning your budget", detail: "Clicks from people who will never buy" },
              { pain: "Generic ad copy across every audience", detail: "One message, zero personalisation" },
              { pain: "Traffic sent to pages that don't convert", detail: "Clicks driven, revenue ignored" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                  <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3" style={{ background: "rgba(255,107,43,0.06)", borderLeftColor: "#FF6B2B" }}>
            <span className="text-[#FF6B2B] text-lg font-black mt-0.5 shrink-0">⚠</span>
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your Google Ads aren't profitable on their own, you don't have a traffic problem — you have a strategy and conversion problem.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Tab Cards Section ── */}
    <AdsCardTabs />

    {/* ── Our Approach ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="gads_h2lbl_26" data-cms-label="Section Label" data-cms-attr="text">Our Google Ads Approach</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="gads_p_25" data-cms-label="Body Text" data-cms-attr="text">We focus on performance, efficiency, and continuous improvement every step is designed to maximise your return on ad spend.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approach.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
              <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span className="text-[14px] text-[#374151]">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Tools ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="gads_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Tools & Technologies We Use</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="gads_s12_sub" data-cms-label="Section Subtext" data-cms-attr="text">Advanced platforms and analytics tools to manage and optimise every campaign effectively.</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`gads_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
              <div className="flex flex-wrap gap-2">
                {g.pills.map(p => (
                  <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: g.bg, color: g.color }}>{p}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Why Us + What We Achieve ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="gads_h2lbl_28" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`gads_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="gads_h2lbl_29" data-cms-label="Section Label" data-cms-attr="text">What We Can Achieve for You</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {whatWeAchieve.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accentColor}12` }}>
                  <item.Icon size={15} style={{ color: accentColor }} />
                </div>
                <span className="text-[14.5px] text-[#374151]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Results ── */}
    <section className="pt-16 pb-8 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="gads_h2lbl_30" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((r, i) => (
            <motion.div key={r.text} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl"
              style={{ background: "#F8FAFF", border: `1px solid ${accentColor}20`, boxShadow: `0 4px 20px ${accentColor}08` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}10` }}>
                <r.Icon size={22} style={{ color: accentColor }} />
              </div>
              <span className="text-[13.5px] font-medium text-[#374151] leading-snug">{r.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Case Studies ── */}
    <div style={{ marginBottom: "-60px" }}>
      <CaseStudies />
    </div>

    {/* ── Testimonials ── */}
    <Testimonials />

    {/* ── Google Ads Client Logos ── */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#fff", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Grown With Google Ads</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Clients We've Grown With Google Ads</h2>
        <p className="text-[#6B7280] text-sm max-w-md mx-auto">Real businesses. Real leads. Paid search growth delivered by Digital Aura.</p>
      </motion.div>
      <div className="max-w-5xl mx-auto">
        <ClientLogoGrid clients={googleAdsClients} accentColor={accentColor} />
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="gads_h2lbl_31" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
              <FAQItem q={faq.q} a={faq.a} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Free Audit CTA + Form ── */}
    <section id="google-ads-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #4285F4 0%, #1a56db 40%, #0A1628 100%)" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">Free Google Ads Audit</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6"><span data-cms-key="gads_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Get Your Free<br />Google Ads Audit & Strategy</span></h2>
            <p className="text-white/80 text-lg mb-8"><span data-cms-key="gads_x16" data-cms-label="Body Text" data-cms-attr="text">We'll analyse your existing account (or plan a brand new one), identify wasted spend, and deliver a clear action plan completely free, no strings attached.</span></p>
            <div className="space-y-3 mb-8">
              {[
                "Full account audit: structure, keywords & bidding",
                "Competitor & keyword gap analysis",
                "Wasted spend identification & quick wins",
                "Custom Google Ads strategy & roadmap",
              ].map(b => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-white font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0" style={{ color: accentColor }}>RK</div>
              <div>
                <p className="text-white text-xs italic"><span data-cms-key="gads_x17" data-cms-label="Body Text" data-cms-attr="text">"CPL dropped by 48% in 60 days. Best Google Ads team we've worked with."</span></p>
                <p className="text-white/70 text-[10px] mt-0.5"><span data-cms-key="gads_x18" data-cms-label="Body Text" data-cms-attr="text">,  Rahul K., eCommerce Founder</span></p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <GoogleAdsAuditForm />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── CTA Banner ── */}


    {/* Final CTA */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
            style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="gads_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Get <span data-cms-key="gads_hl_131" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">More Leads</span> From <span data-cms-key="gads_hl_132" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Google</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="gads_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Google Ads Audit. We'll review your current campaigns or build a strategy from scratch, and show you exactly where your budget should go to get the best return.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Free Ads Audit <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="gads_x15" data-cms-label="Fine Print" data-cms-attr="text">No wasted spend — Every campaign built around your cost per lead target.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default GoogleAdsPage;




