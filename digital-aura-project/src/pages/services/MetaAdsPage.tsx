import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target, Users, RefreshCw, BarChart2, TrendingUp, Gauge,
  DollarSign, ShieldCheck, ChevronDown, Check,
  Zap, Megaphone, Video, Image, ArrowRight, Lock,
  CheckCircle2, LineChart, FlaskConical, PieChart,
  MousePointerClick, Globe2, Settings, Eye, Heart,
  ShoppingBag, MessageCircle, ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import MathCaptcha from "@/components/MathCaptcha";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import ClientLogoGrid from "@/components/ClientLogoGrid";

const accentColor = "#1877F2";
const glowColor = "rgba(24,119,242,0.12)";
const igColor = "#E1306C";

/* ─── Tab Config ─── */
const metaTabs = [
  {
    key: "facebook",
    label: "Facebook Ads",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    gradient: "linear-gradient(135deg,#1877F2,#0c5bcc)",
  },
  {
    key: "instagram",
    label: "Instagram Ads",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    gradient: "linear-gradient(135deg,#E1306C,#833AB4)",
  },
  {
    key: "performance",
    label: "Performance & Creative",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    gradient: "linear-gradient(135deg,#F59E0B,#d97706)",
  },
];

/* ─── Cards Data ─── */
const metaCards = [
  // ── Facebook Ads ──
  {
    Icon: Target,
    category: "Facebook Ads",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    title: "Facebook Lead Generation Ads",
    desc: "We create highly targeted Facebook Lead Form campaigns that capture quality leads directly inside Meta without requiring users to leave the platform. Custom questions, CRM integrations, and instant follow up sequences ensure every lead is captured and actioned immediately.",
    tags: ["Instant lead forms", "CRM integration", "High quality lead capture"],
  },
  {
    Icon: Users,
    category: "Facebook Ads",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    title: "Audience Targeting & Custom Audiences",
    desc: "We build precise audience segments using Facebook's interest, behaviour, and demographic targeting layered with Custom Audiences from your customer lists, website visitors, and video viewers. Lookalike Audiences then expand your reach to people who mirror your best customers.",
    tags: ["Custom audiences", "Lookalike audiences", "Interest & behaviour targeting"],
  },
  {
    Icon: RefreshCw,
    category: "Facebook Ads",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    title: "Facebook Remarketing Campaigns",
    desc: "We re-engage users who visited your website, watched your videos, or interacted with your page but didn't convert. Sequential retargeting shows progressively stronger messaging from awareness to urgency moving users down the funnel until they take action.",
    tags: ["Website visitor retargeting", "Sequential messaging", "Cart abandonment ads"],
  },
  {
    Icon: ShoppingBag,
    category: "Facebook Ads",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    title: "Facebook Shopping & Catalogue Ads",
    desc: "We connect your product catalogue to Meta Ads Manager to run dynamic product ads (DPA) that automatically show the most relevant products to each user based on their browsing history. These campaigns drive consistent eCommerce sales with minimal manual management.",
    tags: ["Dynamic product ads", "Catalogue integration", "eCommerce scaling"],
  },
  {
    Icon: Globe2,
    category: "Facebook Ads",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    title: "Brand Awareness & Reach Campaigns",
    desc: "We design top-of-funnel Facebook campaigns to build brand recognition with large, cold audiences using optimised reach and frequency settings. These campaigns establish brand trust and prime audiences for conversion focused remarketing later in the funnel.",
    tags: ["Brand recall optimisation", "Reach & frequency", "Cold audience targeting"],
  },
  {
    Icon: Settings,
    category: "Facebook Ads",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    title: "Business Manager & Pixel Setup",
    desc: "We set up and structure your Meta Business Manager, Ad Account, and Meta Pixel correctly from the start including the Conversions API (CAPI) for server-side tracking to bypass iOS privacy restrictions. Proper setup ensures accurate data and better campaign optimisation.",
    tags: ["Meta Pixel setup", "Conversions API (CAPI)", "Ad account architecture"],
  },

  // ── Instagram Ads ──
  {
    Icon: Image,
    category: "Instagram Ads",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Instagram Feed & Stories Ads",
    desc: "We design scroll stopping feed ads and full screen Story ads tailored for Instagram's visual-first environment. Every creative is natively designed for the platform with captions, CTAs, and aspect ratios optimised for maximum engagement and conversion rates.",
    tags: ["Feed ad design", "Story ads", "Native creative formats"],
  },
  {
    Icon: Video,
    category: "Instagram Ads",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Instagram Reels Ads",
    desc: "Reels ads are Instagram's highest reach format right now. We produce and run short-form video ads (15-30 seconds) designed to feel native and engaging within the Reels feed capturing attention in the first 3 seconds and driving action with a clear CTA at the end.",
    tags: ["Short-form video ads", "Native Reels creative", "High organic reach format"],
  },
  {
    Icon: Heart,
    category: "Instagram Ads",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Instagram Engagement Campaigns",
    desc: "We run engagement optimised campaigns to grow your Instagram following, increase post interactions, and build social proof that makes your brand appear credible and trusted. High engagement also feeds Meta's algorithm, lowering CPMs across your other campaigns.",
    tags: ["Follower growth", "Post engagement", "Social proof building"],
  },
  {
    Icon: MousePointerClick,
    category: "Instagram Ads",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Instagram Traffic & Conversion Ads",
    desc: "We run traffic and conversion campaigns targeting Instagram users at the moment they're most receptive driving them to landing pages, product pages, or lead forms with a compelling, platform-native creative experience that minimises friction in the buyer journey.",
    tags: ["Traffic to landing pages", "Conversion optimisation", "Low-friction CTA design"],
  },
  {
    Icon: Eye,
    category: "Instagram Ads",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Instagram Explore & Shopping Ads",
    desc: "We extend your reach through Instagram Explore placements appearing to users actively discovering new content outside their usual feed. Combined with Instagram Shopping ads linked to your product catalogue, this creates a seamless path from discovery to purchase.",
    tags: ["Explore placement targeting", "Instagram shopping", "Product discovery ads"],
  },
  {
    Icon: MessageCircle,
    category: "Instagram Ads",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Instagram DM & Click-to-Message Ads",
    desc: "We set up Click-to-Instagram Direct campaigns that open a DM conversation when a user taps your ad. This is highly effective for service businesses where a conversation is the start of the sales journey reducing the friction of traditional lead forms and landing pages.",
    tags: ["Click-to-DM campaigns", "Conversation-led sales", "High response rates"],
  },

  // ── Performance & Creative ──
  {
    Icon: FlaskConical,
    category: "Performance & Creative",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "A/B Testing & Creative Iteration",
    desc: "We run continuous creative experiments across ad formats, hooks, visuals, and copy to discover what resonates most with your audience. Every test is structured with clear hypotheses and sufficient budget to reach statistical significance before scaling winners.",
    tags: ["Creative experimentation", "Hook testing", "Scale winning variants"],
  },
  {
    Icon: LineChart,
    category: "Performance & Creative",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Conversion Tracking & Meta Pixel",
    desc: "Accurate measurement is the backbone of performance improvement. We implement full funnel conversion tracking including purchase, lead, add-to-cart, and view-content events via Meta Pixel and the Conversions API to maintain tracking accuracy post iOS 14.",
    tags: ["Full funnel event tracking", "iOS 14 resilient tracking", "CAPI implementation"],
  },
  {
    Icon: PieChart,
    category: "Performance & Creative",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Budget Scaling & ROAS Optimisation",
    desc: "We analyse performance at campaign, ad set, and ad level to identify what's working then scale budgets strategically without triggering Meta's algorithm reset. Underperforming elements are turned off, and winners are scaled with bid cap and cost cap strategies.",
    tags: ["Profitable budget scaling", "Bid cap strategies", "ROAS improvement"],
  },
  {
    Icon: Megaphone,
    category: "Performance & Creative",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Ad Creative Design & Production",
    desc: "We design static images, carousel ads, and short video creatives in all Meta-approved formats. Every creative is built with platform-native aesthetics in mind designed to blend naturally into the feed while standing out enough to stop the scroll and drive action.",
    tags: ["Static & carousel creatives", "Video ad production", "Platform-native design"],
  },
  {
    Icon: Zap,
    category: "Performance & Creative",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Ad Copywriting & Hook Strategy",
    desc: "We craft attention grabbing hooks, benefit driven body copy, and strong CTAs that speak directly to your audience's pain points and desires. Copy is written to match ad intent whether that's a hard sell, a curiosity hook, or a social proof-led testimonial format.",
    tags: ["Hook copywriting", "Pain-point led copy", "CTA optimisation"],
  },
  {
    Icon: BarChart2,
    category: "Performance & Creative",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Monthly Reporting & Strategy Reviews",
    desc: "We deliver transparent monthly reports covering reach, impressions, CPM, CTR, CPL, ROAS, and creative performance breakdowns. Every report includes a clear analysis of what changed, what we learned from tests, and what the optimisation plan is for the next month.",
    tags: ["CPL & ROAS reporting", "Creative performance data", "Monthly strategy calls"],
  },
];

const cardsByTab: Record<string, typeof metaCards> = {
  facebook:    metaCards.filter(c => c.category === "Facebook Ads"),
  instagram:   metaCards.filter(c => c.category === "Instagram Ads"),
  performance: metaCards.filter(c => c.category === "Performance & Creative"),
};

/* ─── Tab Cards Component ─── */
const MetaCardTabs = () => {
  const [activeTab, setActiveTab] = useState("facebook");
  const tab = metaTabs.find(t => t.key === activeTab)!;
  const cards = cardsByTab[activeTab];

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(24,119,242,0.08)", color: "#1877F2", border: "1px solid rgba(24,119,242,0.2)" }}>
            <Target size={12} /> Meta Ads Management
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="metaads_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Meta Ads: Facebook & Instagram Campaigns That Convert</span></h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed"><span data-cms-key="metaads_p_23" data-cms-label="Body Text" data-cms-attr="text">We manage the full Meta advertising ecosystem from Facebook lead generation and Instagram Reels to advanced creative testing and ROAS-focused performance optimisation all built to grow your business profitably.</span></p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {metaTabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={
                activeTab === t.key
                  ? { background: t.gradient, color: "#fff", boxShadow: `0 4px 14px ${t.color}40` }
                  : { background: "#F8FAFF", color: "#374151", border: "1.5px solid #E5E7EB" }
              }>
              <span data-cms-key={`metaads_tl_${i}_label`} data-cms-label="Tab Label" data-cms-attr="text">{t.label}</span>
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
                <h3 className="text-[15px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`metaads_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`metaads_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
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
              <span data-cms-key="metaads_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Learn More</span> <ArrowRight size={13} />
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
  { label: "Advertising Platforms", color: "#1877F2", bg: "rgba(24,119,242,0.08)",  pills: ["Meta Ads Manager", "Facebook Ads", "Instagram Ads"] },
  { label: "Tracking & Analytics",  color: "#E1306C", bg: "rgba(225,48,108,0.08)",  pills: ["Meta Pixel", "Conversions API (CAPI)", "Google Analytics 4"] },
  { label: "Creative & Research",   color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  pills: ["Canva Pro", "Adobe Creative Cloud", "Competitor Research"] },
  { label: "Reporting",             color: "#6C47FF", bg: "rgba(108,71,255,0.08)",  pills: ["Looker Studio", "Custom Dashboards", "Monthly Reports"] },
];

const approach = [
  "Deep audience research before any campaign goes live",
  "Full funnel strategy: awareness → engagement → conversion",
  "Creative first approach the right ad stops the scroll",
  "Conversion API setup to track performance accurately post iOS 14",
  "Weekly monitoring with bid and budget adjustments",
  "Monthly reporting with transparent KPIs and clear next steps",
];

const whatWeAchieve = [
  { Icon: Target,      label: "Generate high quality leads at lower CPL" },
  { Icon: DollarSign,  label: "Increase online sales and eCommerce revenue" },
  { Icon: Megaphone,   label: "Build brand awareness at scale on Facebook & Instagram" },
  { Icon: RefreshCw,   label: "Re-engage and convert warm audiences with remarketing" },
  { Icon: TrendingUp,  label: "Scale profitable campaigns as your business grows" },
  { Icon: Users,       label: "Reach custom and lookalike audiences that convert" },
];

const results = [
  { Icon: TrendingUp,  text: "Higher engagement and click through rates" },
  { Icon: DollarSign,  text: "Lower cost per lead (CPL) & cost per sale" },
  { Icon: Gauge,       text: "Improved return on ad spend (ROAS)" },
  { Icon: ShieldCheck, text: "Consistent and scalable growth month over month" },
];

const whyUs = [
  "Creative first strategy we know what stops the scroll on Meta",
  "Full funnel approach: from awareness to repeat purchase",
  "Conversions API setup for accurate iOS resilient tracking",
  "Transparent reporting every rupee accounted for",
  "Proven track record reducing CPL by 30-60% within 60 days",
  "Strategies tailored to your industry, offer, and audience",
];

const faqs = [
  {
    q: "How soon can I see results from Meta Ads?",
    a: "Meta Ads can start generating engagement and leads within 24-72 hours. However, meaningful optimisation (lower CPL, higher ROAS) typically takes 30-60 days as the algorithm learns and we gather enough data to refine targeting and creative.",
  },
  {
    q: "What budget do I need to get started?",
    a: "For most service businesses, a minimum ad spend of ₹25,000, ₹40,000/month is recommended to gather enough data for the algorithm to optimise. For eCommerce, budgets scale with your catalogue size and margins. We'll define the right starting point for your goals.",
  },
  {
    q: "Do you create the ad creatives (images and videos)?",
    a: "Yes. We design static images, carousel ads, and short-form video creatives tailored for Facebook and Instagram. For Reels ads, we can work with your existing footage or advise on raw content requirements to produce high performing video ads.",
  },
  {
    q: "How do you handle iOS 14 tracking issues?",
    a: "We implement the Meta Conversions API (CAPI) alongside the Meta Pixel to maintain server-side event tracking that bypasses browser-level restrictions introduced by iOS 14. This ensures your campaign data remains accurate and your optimisation signals stay strong.",
  },
  {
    q: "Can you take over an existing Meta Ads account?",
    a: "Absolutely. We audit your existing account structure, pixel setup, audience lists, and creative performance before making changes. A phased optimisation plan ensures there is no drop in performance during the handover period.",
  },
  {
    q: "Do you run both Facebook and Instagram campaigns together?",
    a: "Yes. We manage campaigns across all Meta placements Facebook Feed, Instagram Feed, Stories, Reels, Explore, and the Meta Audience Network. Placements are selected and optimised based on where your specific audience engages most.",
  },
  {
    q: "How do you measure whether the campaigns are working?",
    a: "We track CPL, CPA, ROAS, CTR, CPM, and frequency all connected to your actual business outcomes (leads, purchases, sign-ups). Monthly reports give you a clear view of spend, results, and what we're doing next to improve performance.",
  },
];

/* ─── Form ─── */
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#1877F2] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const MetaAdsAuditForm = () => {
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
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(24,119,242,0.1)" }}>
            <CheckCircle2 size={32} className="text-[#1877F2]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="metaads_x13" data-cms-label="Card Heading" data-cms-attr="text">Audit Request Received!</span></h3>
          <p className="text-[#6B7280]"><span data-cms-key="metaads_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">We'll review your Meta Ads account and send your free audit within 24 hours.</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1"><span data-cms-key="metaads_x14" data-cms-label="Card Heading" data-cms-attr="text">Request Your Free Meta Ads Audit</span></h3>
          <p className="text-sm text-[#6B7280] mb-4"><span data-cms-key="metaads_p_24" data-cms-label="Body Text" data-cms-attr="text">Fill in your details and we'll get started right away.</span></p>
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
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Website / Facebook Page URL *</label>
            <input type="url" name="website" required value={form.website} onChange={handleChange} placeholder="https://yourwebsite.com" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Ads Goal *</label>
            <select name="goal" required value={form.goal} onChange={handleChange} className={inputClass + " cursor-pointer"}>
              <option value="" disabled>Select your goal...</option>
              <option>Generate more leads</option>
              <option>Increase eCommerce sales</option>
              <option>Lower my cost per lead</option>
              <option>Launch a new Meta Ads account</option>
              <option>Audit & take over existing account</option>
              <option>Brand awareness & reach</option>
            </select>
          </div>
          <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
          <button
            type="submit" disabled={!captchaOk}
            className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #1877F2, #0c5bcc)" }}>
            Get My Free Meta Ads Audit <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
            <Lock size={12} /> 100% free no credit card, no obligation
          </p>
        </form>
      )}
    </div>
  );
};

const metaAdsClients = [
  { name: "DP Electric",           tag: "Electrical Services",   logo: "https://dpelectric.com.au/wp-content/uploads/2023/05/logooo.png",                                                                                                                 logoBg: "#fffff0" },
  { name: "The Grand Palace",      tag: "Hospitality",           logo: "https://www.thegrandpalace.com.au/wp-content/uploads/2025/04/Logo-removebg-preview.png",                                                                                          logoBg: "#fffbf0" },
  { name: "Mainstream Real Estate",tag: "Real Estate",           logo: "https://mainstreamrealestate.com.au/wp-content/uploads/2023/02/logo-320x184-1.png",                                                                                         logoBg: "#f0fff8" },
  { name: "Silverstone Financial", tag: "Financial Services",    logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png",                                                                                logoBg: "#f0f8ff" },
  { name: "Grand Bavarchi",        tag: "Restaurant & Events",   logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png",                                                                                                            logoBg: "#fff8f0" },
  { name: "Jump Swim Schools",     tag: "Education & Sports",    logo: "https://jumpswimschools.com.au/wp-content/uploads/logo.png",                                                                                                                 logoBg: "#f0faff" },
  { name: "Parasher Academy",      tag: "Education",             logo: "https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png",                                                                                                  logoBg: "#f5f0ff" },
  { name: "Upmatrix",              tag: "Tech & Software",       logo: "https://upmatrix.in/wp-content/uploads/2025/09/UpMatrix-Logo-1.svg",                                                                                                              logoBg: "#f0f4ff" },
  { name: "Inn of the Dove",       tag: "Hospitality",           logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp",                                                                                                           logoBg: "#fff8f5" },
  { name: "Game Zone Events",      tag: "Events & Entertainment",logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                                                                           logoBg: "#f0fff0" },
  { name: "Kredenza Studios",      tag: "Creative Agency",       logo: "https://www.kredenzastudios.com/wp-content/uploads/logo.png",                                                                                                               logoBg: "#fff0f8" },
  { name: "Dr Ronak Patel",        tag: "Healthcare",            logo: "https://drronakpatel.in/wp-content/uploads/2025/10/LOGO-PNG-1024x1024.png",                                                                                                      logoBg: "#f0f7ff" },
  { name: "Atul Bakery",           tag: "Food & Bakery",         logo: "https://image.pngaaa.com/331/3078331-middle.png",                                                                                                                          logoBg: "#fff8f0" },
  { name: "AMVI Hospitals",        tag: "Healthcare",            logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png",                                                                                              logoBg: "#f5f0ff" },
  { name: "Krisha Hospital",       tag: "Healthcare",            logo: "https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png",                                                                                                            logoBg: "#fff0f5" },
  { name: "Krisha Eye Hospital",   tag: "Eye Care",              logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png",                                                                              logoBg: "#f0faff" },
  { name: "Shukan Hospital",       tag: "Healthcare",            logo: "https://shukanhospital.com/wp-content/uploads/2025/11/Frame-16-removebg-preview.png",                                                                                            logoBg: "#f0fff8" },
];

const MetaAdsClientSlider = () => {
  const [active, setActive] = useState(0);
  const total = metaAdsClients.length;
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % total), 4000);
    return () => clearInterval(t);
  }, [total]);
  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);
  const c = metaAdsClients[active];
  const pageStart = Math.floor(active / 4) * 4;
  const visible = metaAdsClients.slice(pageStart, pageStart + 4);
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
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${accentColor},${igColor})` }} />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28 }}
            className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-5 sm:p-8">
            <div className="w-full sm:w-auto shrink-0 flex items-center justify-center rounded-xl p-5 sm:p-7" style={{ background: c.logoBg, minHeight: 100, minWidth: 160, border: "1px solid rgba(0,0,0,0.06)" }}>
              <img src={c.logo} alt={c.name} className="object-contain mx-auto" style={{ height: 52, maxWidth: 180 }} onError={e => { (e.target as HTMLImageElement).alt = c.name; }} />
            </div>
            <div className="flex-1 text-center sm:text-left w-full">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2" style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}25` }}>{c.tag}</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A1628] mb-1.5">{c.name}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">Meta Ads strategy and social media growth delivered by Digital Aura — driving reach, engagement, and real conversions.</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><ChevronLeft size={14} className="text-[#374151]" /></button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><ChevronLeft size={14} className="text-[#374151] rotate-180" /></button>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-xs font-bold text-[#9CA3AF]">{active + 1} / {total}</span>
        <div className="flex gap-1.5">
          {metaAdsClients.map((_, i) => (
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
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`metaads_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="metaads_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`metaads_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

/* ─── Page ─── */
const MetaAdsPage = () => {
  const _sp = useSettings(['metaads_hero_h1','metaads_hero_sub','metaads_cta_btn']);
  return (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(225,48,108,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>
            ← Back to All Services
          </Link>
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <Target size={12} /> Meta Ads (Facebook & Instagram)
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="metaads_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Reach, Engage & Convert with<br />
            <span style={{ color: accentColor }}>High-Impact Meta Ads</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            <span data-cms-key="metaads_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We help businesses grow through highly targeted Facebook and Instagram campaigns reaching the right audience, creating scroll stopping creatives, and driving measurable conversions across every stage of the customer journey.</span>
          </p>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Facebook Ads", "Instagram Ads", "Reels Ads", "Lead Generation", "Remarketing", "Dynamic Product Ads"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(24,119,242,0.08)", color: "#1877F2", border: "1px solid rgba(24,119,242,0.2)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #1877F2, #0c5bcc)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Launch My Meta Ads <Target size={15} />
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
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Meta Ads Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Run Facebook Ads.<br className="hidden md:block" /> Very Few Can Scale Them Profitably.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most agencies measure success by spend and reach. We measure it by revenue — because clicks that don't convert are just expensive noise.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Boosted posts disguised as paid strategy", detail: "Post boosting dressed up as a campaign — no funnel, no targeting logic, no plan." },
              { pain: "Audience targeting with no data foundation", detail: "Broad interest targeting with no pixel data, lookalikes, or retargeting structure." },
              { pain: "No creative testing or iteration process", detail: "Same ad creative running for months with no split testing or performance analysis." },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your Meta Ads agency isn't testing creative weekly and iterating on what's working, your ROAS will decline — it's not a question of if.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Tab Cards Section ── */}
    <MetaCardTabs />

    {/* ── Our Approach ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="metaads_h2lbl_26" data-cms-label="Section Label" data-cms-attr="text">Our Meta Ads Approach</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="metaads_p_25" data-cms-label="Body Text" data-cms-attr="text">Performance-driven strategies built around your audience, your creative, and your business goals.</span></p>
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
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="metaads_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Tools & Technologies We Use</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="metaads_s12_sub" data-cms-label="Section Subtext" data-cms-attr="text">Advanced platforms and analytics tools to manage, optimise, and track every Meta campaign effectively.</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`metaads_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
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
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="metaads_h2lbl_28" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`metaads_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="metaads_h2lbl_29" data-cms-label="Section Label" data-cms-attr="text">What We Can Achieve for You</span>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="metaads_h2lbl_30" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
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

    {/* ── Meta Ads Client Logos ── */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#fff", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Grown With Meta Ads</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Clients We've Grown With Meta Ads</h2>
        <p className="text-[#6B7280] text-sm max-w-md mx-auto">Real businesses. Real results. Meta Ads growth delivered by Digital Aura.</p>
      </motion.div>
      <div className="max-w-5xl mx-auto">
        <ClientLogoGrid clients={metaAdsClients} accentColor={accentColor} />
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="metaads_h2lbl_31" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
    <section id="meta-ads-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1877F2 0%, #833AB4 50%, #0A1628 100%)" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">Free Meta Ads Audit</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6"><span data-cms-key="metaads_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Get Your Free<br />Meta Ads Audit & Strategy</span></h2>
            <p className="text-white/80 text-lg mb-8"><span data-cms-key="metaads_x16" data-cms-label="Body Text" data-cms-attr="text">We'll audit your Facebook & Instagram ad accounts, identify wasted spend, and deliver a clear strategy to generate more leads and sales completely free, no strings attached.</span></p>
            <div className="space-y-3 mb-8">
              {[
                "Full account audit: structure, audiences & creatives",
                "Pixel & Conversions API health check",
                "Wasted spend analysis & quick wins",
                "Custom Meta Ads strategy & funnel plan",
              ].map(b => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-white font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0" style={{ color: accentColor }}>PM</div>
              <div>
                <p className="text-white text-xs italic"><span data-cms-key="metaads_x17" data-cms-label="Body Text" data-cms-attr="text">"CPL dropped 52% in 45 days. Best investment we made for our Facebook campaigns."</span></p>
                <p className="text-white/70 text-[10px] mt-0.5"><span data-cms-key="metaads_x18" data-cms-label="Body Text" data-cms-attr="text">,  Priya M., D2C Brand Founder</span></p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <MetaAdsAuditForm />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="metaads_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="metaads_hl_131" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Scale</span> With <span data-cms-key="metaads_hl_132" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Facebook and Instagram Ads</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="metaads_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Meta Ads Strategy Call. We'll map your audience, review your creative approach, and build a campaign structure designed to deliver consistent leads and sales.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Free Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="metaads_x15" data-cms-label="Fine Print" data-cms-attr="text">No guesswork — Data driven campaigns built to scale what works.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default MetaAdsPage;




