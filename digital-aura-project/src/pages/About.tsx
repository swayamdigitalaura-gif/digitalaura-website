import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, Users, Lightbulb, Target, Heart, Star,
  Phone, Mail, TrendingUp, Shield, Zap,
  BarChart3, Globe2, Instagram, Linkedin,
} from "lucide-react";
import logo from "@/assets/logo.png";
import sambhavPhoto from "@/assets/sambhav.jpg";
import swayamPhoto from "@/assets/swayam.jpg";
import clutchBadge from "@/assets/clutch.png";
import goodfirmsBadge from "@/assets/goodfirms.png";
import designrushBadge from "@/assets/designrush.webp";
import { useSettings } from "@/hooks/useSettings";
import CMSIcon from "@/components/CMSIcon";

/* ─── Static data (non-editable arrays) ─────────────────────────────── */

const values = [
  { icon: Lightbulb, iconName: "Lightbulb", color: "#7C3AED", bg: "rgba(124,58,237,0.08)", titleKey: "about_vision_title",  descKey: "about_vision_desc",  titleDef: "Our Vision",  descDef: "To become a trusted global digital growth partner — powered by AI — for high-ticket service industries and e-commerce brands. We envision a world where no business owner fears marketing; where every company has access to honest, AI-driven, results-focused digital expertise. In the next decade, we aim to build a thriving organisation known for its values, impact, and ability to transform lives — clients, employees, and communities alike." },
  { icon: Target, iconName: "Target",    color: "#FF6B2B", bg: "rgba(255,107,43,0.08)",  titleKey: "about_mission_title", descKey: "about_mission_desc", titleDef: "Our Mission", descDef: "At Digital Aura, our mission is to empower businesses with AI-first marketing, intelligent automation, and cutting-edge digital solutions that drive real, measurable results. We follow a WIN-WIN-WIN philosophy — delivering maximum ROI for clients, fostering growth for our team, and building a sustainable, purpose-driven company. Through innovative AI consulting, performance marketing, and smart design, we bring clarity, credibility, and consistent growth to every business we serve." },
  { icon: Heart, iconName: "Heart",     color: "#22C55E", bg: "rgba(34,197,94,0.08)",   titleKey: "about_values_title",  descKey: "about_values_desc",  titleDef: "Our Values",  descDef: "WIN-WIN-WIN Philosophy: Client WIN — We deliver 10X the value of what we charge, maximising ROI on every engagement. Employee WIN — Career growth, financial growth, and a culture where talent thrives. Employer WIN — Revenue growth, increased profitability, brand strength, and a growing base of quality clients. Equal opportunities, relentless dedication, and a promise to never do cookie-cutter work — ever." },
];

const whyUs = [
  { icon: TrendingUp, iconName: "TrendingUp", color: "#FF6B2B", titleKey: "about_why1_title", descKey: "about_why1_desc", titleDef: "Customised for Every Business",  descDef: "We fully analyse your business before we strategise. No templates. Every plan is built specifically for you." },
  { icon: Shield, iconName: "Shield",     color: "#7C3AED", titleKey: "about_why2_title", descKey: "about_why2_desc", titleDef: "Transparent & Honest",           descDef: "Detailed reporting, open communication, and zero fluff. You always know what we're doing and why." },
  { icon: Zap, iconName: "Zap",        color: "#1A6FE8", titleKey: "about_why3_title", descKey: "about_why3_desc", titleDef: "Always Trend-First",             descDef: "We adapt to algorithm changes, platform updates, and market shifts before they impact your results." },
  { icon: Users, iconName: "Users",      color: "#22C55E", titleKey: "about_why4_title", descKey: "about_why4_desc", titleDef: "Dedicated Expert Team",          descDef: "Enthusiastic professionals who are well-versed in the industry and ready to take up any challenge." },
  { icon: BarChart3, iconName: "BarChart3",  color: "#F59E0B", titleKey: "about_why5_title", descKey: "about_why5_desc", titleDef: "Proven, Measurable Results",     descDef: "From 76.7% traffic boosts to 200% business growth — we let real numbers do the talking." },
  { icon: Globe2, iconName: "Globe2",     color: "#EC4899", titleKey: "about_why6_title", descKey: "about_why6_desc", titleDef: "Truly Full-Service",             descDef: "SEO, paid ads, social media, web design, Shopify, WordPress, and now AI-powered solutions — all under one roof." },
];

const DEFAULT_TEAM = [
  { name: "Jaspreet Singh",     role: "Web Design & Dev Project Manager",  color: "#1A6FE8",  ai: false, photo: "/team/jaspreet.png" },
  { name: "Satish Prajapati",   role: "Digital Marketing Executive",        color: "#F59E0B",  ai: false, photo: "/team/satish.png" },
  { name: "Swayam Parikh",      role: "AI Full Stack Developer",            color: "#7C3AED",  ai: true,  photo: "/team/swayam.png" },
  { name: "Abhishek Kaushal",   role: "Shopify Developer",                  color: "#7C3AED",  ai: false, photo: "/team/abhishek.png" },
  { name: "Jinali Lodariya",    role: "SEO Executive",                      color: "#22C55E",  ai: false, photo: "/team/jinali.png" },
  { name: "Nidhi Changela",     role: "SEO Executive",                      color: "#1A6FE8",  ai: false, photo: "/team/nidhi.png" },
  { name: "Nitiksha Motivaras", role: "Social Media Manager",               color: "#FF6B2B",  ai: false, photo: "/team/nitiksha.png" },
  { name: "Ritu Boharwal",      role: "Digital Marketing Executive",        color: "#EC4899",  ai: false, photo: "" },
  { name: "Shankar Saini",      role: "Digital Marketing Executive",        color: "#22C55E",  ai: false, photo: "/team/shankar.png" },
  { name: "Dharmik Akhani",     role: "Business Development Executive",     color: "#0EA5E9",  ai: false, photo: "/team/dharmik.png" },
];

const clients = [
  { label: "Healthcare",    color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
  { label: "Restaurants",   color: "#FF6B2B", bg: "rgba(255,107,43,0.08)" },
  { label: "Real Estate",   color: "#1A6FE8", bg: "rgba(26,111,232,0.08)" },
  { label: "eCommerce",     color: "#22C55E", bg: "rgba(34,197,94,0.08)"  },
  { label: "Education",     color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  { label: "Home Services", color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
  { label: "Retail",        color: "#FF6B2B", bg: "rgba(255,107,43,0.08)" },
  { label: "Ophthalmology", color: "#1A6FE8", bg: "rgba(26,111,232,0.08)" },
  { label: "IVF Clinics",   color: "#22C55E", bg: "rgba(34,197,94,0.08)"  },
  { label: "Fitness",       color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  { label: "Pest Control",  color: "#EC4899", bg: "rgba(236,72,153,0.08)" },
  { label: "Travel",        color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
];

const caseStudies = [
  { industryKey: "about_cs1_industry", resultKey: "about_cs1_result", labelKey: "about_cs1_label", viaKey: "about_cs1_via", descKey: "about_cs1_desc", color: "#7C3AED", industryDef: "IVF Hospital",          resultDef: "76.7%",  labelDef: "Traffic Boost",    viaDef: "SEO + Content Marketing",  descDef: "Organic traffic increase in 6 months through targeted SEO and content authority building." },
  { industryKey: "about_cs2_industry", resultKey: "about_cs2_result", labelKey: "about_cs2_label", viaKey: "about_cs2_via", descKey: "about_cs2_desc", color: "#FF6B2B", industryDef: "Eye Hospital",          resultDef: "120%",   labelDef: "Traffic Growth",   viaDef: "Digital Marketing",         descDef: "Traffic growth through integrated Google Ads, Meta Ads, and a conversion optimised website." },
  { industryKey: "about_cs3_industry", resultKey: "about_cs3_result", labelKey: "about_cs3_label", viaKey: "about_cs3_via", descKey: "about_cs3_desc", color: "#1A6FE8", industryDef: "Home Appliance Repair", resultDef: "174.5%", labelDef: "Traffic Increase", viaDef: "SEO + Google Ads",          descDef: "Traffic surge powered by local SEO, Meta Ads, and conversion optimised landing pages." },
  { industryKey: "about_cs4_industry", resultKey: "about_cs4_result", labelKey: "about_cs4_label", viaKey: "about_cs4_via", descKey: "about_cs4_desc", color: "#22C55E", industryDef: "Ophthalmology Clinic",  resultDef: "200%",   labelDef: "Business Growth",  viaDef: "Performance Marketing",     descDef: "Overall business growth achieved through full-funnel digital marketing and lead generation." },
  { industryKey: "about_cs5_industry", resultKey: "about_cs5_result", labelKey: "about_cs5_label", viaKey: "about_cs5_via", descKey: "about_cs5_desc", color: "#F59E0B", industryDef: "Indian Restaurant",     resultDef: "150%",   labelDef: "Traffic Surge",    viaDef: "Social Media + Meta Ads",   descDef: "Massive reach and footfall increase through targeted social campaigns and local Meta Ads." },
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Digital Aura is the best digital marketing agency in Ahmedabad. They handled our website design and development very professionally. Team members are very supportive — strongly recommend!", name: "Shweta Sultania", service: "Web Design & Development", color: "#7C3AED" },
  { quote: "Working with Digital Aura for over a year. Very satisfied with the quality leads from organic SEO as well as paid channels like Google Ads and Facebook — great ROI.", name: "Bharat Chavda", service: "SEO & Paid Ads", color: "#FF6B2B" },
  { quote: "They ranked our keywords high on search engines and organic traffic has been increasing exponentially. Feels more personal than any other agency I've worked with.", name: "Stephen Conolly", service: "SEO Services", color: "#1A6FE8" },
];

const DEFAULT_PLATFORMS = [
  { name: "Clutch",     logo: clutchBadge,      rating: "4.9", reviews: "50+",  tagline: "Best of Clutch · Digital Marketing 2025", color: "#E8251A" },
  { name: "GoodFirms", logo: goodfirmsBadge,    rating: "4.8", reviews: "40+",  tagline: "Top Digital Marketing Company",           color: "#2E86DE" },
  { name: "DesignRush", logo: designrushBadge,  rating: "4.7", reviews: "30+",  tagline: "Best Digital Marketing Agencies",         color: "#6C47FF" },
  { name: "Google",    logo: "google",           rating: "5.0", reviews: "100+", tagline: "Google Reviews",                          color: "#4285F4" },
];

const DEFAULT_CLIENTS = ["Healthcare","Restaurants","Real Estate","eCommerce","Education","Home Services","Retail","Ophthalmology","IVF Clinics","Fitness","Pest Control","Travel"];

/* ─── COMPONENT ─────────────────────────────────────────────────────── */
const About = () => {
  const s = useSettings([
    // Hero
    'about_hero_badge', 'about_hero_heading', 'about_hero_heading2', 'about_hero_subtext', 'about_hero_tags',
    // Hero stats
    'about_stat1_num', 'about_stat1_label', 'about_stat1_sub',
    'about_stat2_num', 'about_stat2_label', 'about_stat2_sub',
    'about_stat3_num', 'about_stat3_label', 'about_stat3_sub',
    'about_stat4_num', 'about_stat4_label', 'about_stat4_sub',
    // Story
    'about_story_badge', 'about_story_heading', 'about_story_p1', 'about_story_p2', 'about_story_p3',
    // Vision/Mission/Values
    'about_vision_title', 'about_vision_desc', 'about_mission_title', 'about_mission_desc', 'about_values_title', 'about_values_desc',
    // Founder
    'about_founder_name', 'about_founder_role', 'about_founder_p1', 'about_founder_p2', 'about_founder_p3', 'about_founder_quote',
    'about_founder_phone', 'about_founder_email', 'about_founder_linkedin', 'about_founder_instagram',
    // Why us
    'about_why1_title', 'about_why1_desc', 'about_why2_title', 'about_why2_desc',
    'about_why3_title', 'about_why3_desc', 'about_why4_title', 'about_why4_desc',
    'about_why5_title', 'about_why5_desc', 'about_why6_title', 'about_why6_desc',
    // Case studies
    'about_cs1_industry', 'about_cs1_result', 'about_cs1_label', 'about_cs1_via', 'about_cs1_desc',
    'about_cs2_industry', 'about_cs2_result', 'about_cs2_label', 'about_cs2_via', 'about_cs2_desc',
    'about_cs3_industry', 'about_cs3_result', 'about_cs3_label', 'about_cs3_via', 'about_cs3_desc',
    'about_cs4_industry', 'about_cs4_result', 'about_cs4_label', 'about_cs4_via', 'about_cs4_desc',
    'about_cs5_industry', 'about_cs5_result', 'about_cs5_label', 'about_cs5_via', 'about_cs5_desc',
    // Testimonials
    'about_t1_quote', 'about_t1_name', 'about_t1_service', 'about_t1_initials',
    'about_t2_quote', 'about_t2_name', 'about_t2_service', 'about_t2_initials',
    'about_t3_quote', 'about_t3_name', 'about_t3_service', 'about_t3_initials',
    // CTA
    'about_cta_heading', 'about_cta_subtext', 'about_cta_button',
    // Contact
    'contact_phone', 'contact_email',
    // Who We Serve section
    'about_serve_badge', 'about_serve_heading', 'about_serve_subtext',
    // Client Voices section
    'about_voices_badge', 'about_voices_heading',
    // Recognition section
    'about_recog_badge', 'about_recog_heading', 'about_recog_subtext',
    // Why Digital Aura section headings
    'about_why_badge', 'about_why_heading', 'about_why_subtext',
    // Case Studies section
    'about_cs_badge', 'about_cs_heading',
    // JSON blocks
    'about_team', 'about_testimonials', 'about_platforms', 'about_clients',
    // Founder skills tags
    'about_founder_skills',
  ]);

  const [apiTeam, setApiTeam] = useState<typeof DEFAULT_TEAM>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/team`)
      .then(r => r.json())
      .then(d => {
        if (d.data?.length) {
          setApiTeam(d.data.map((m: Record<string, unknown>) => ({
            name: m.name as string,
            role: (m.role as string) || "",
            color: (m.color as string) || "#FF6B2B",
            ai: !!(m.is_ai),
            photo: (m.photo as string) || "",
          })));
        }
      })
      .catch(() => {});
  }, []);

  const team = apiTeam.length > 0 ? apiTeam : (() => { try { if (s.about_team) return JSON.parse(s.about_team); } catch (_e) { void _e; } return DEFAULT_TEAM;})();
  const testimonials = (() => { try { if (s.about_testimonials) return JSON.parse(s.about_testimonials); } catch (_e) { void _e; } return DEFAULT_TESTIMONIALS;})();
  const platforms = (() => { try { if (s.about_platforms) return JSON.parse(s.about_platforms); } catch (_e) { void _e; } return DEFAULT_PLATFORMS;})();
  const clientList: string[] = (() => { try { if (s.about_clients) return JSON.parse(s.about_clients); } catch (_e) { void _e; } return DEFAULT_CLIENTS;})();

  const heroStats = [
    { n: s.about_stat1_num || "750+", l: s.about_stat1_label || "Clients Served",   sub: s.about_stat1_sub || "Across India & globally", color: "#FF6B2B", numKey: "about_stat1_num", labelKey: "about_stat1_label" },
    { n: s.about_stat2_num || "10+",   l: s.about_stat2_label || "Years in Business", sub: s.about_stat2_sub || "Est. 2015, Ahmedabad",    color: "#7C3AED", numKey: "about_stat2_num", labelKey: "about_stat2_label" },
    { n: s.about_stat3_num || "200%", l: s.about_stat3_label || "Best-Case Growth",  sub: s.about_stat3_sub || "Ophthalmology client",    color: "#1A6FE8", numKey: "about_stat3_num", labelKey: "about_stat3_label" },
    { n: s.about_stat4_num || "15+",  l: s.about_stat4_label || "Services Offered",  sub: s.about_stat4_sub || "From SEO to AI & beyond", color: "#22C55E", numKey: "about_stat4_num", labelKey: "about_stat4_label" },
  ];

  return (
  <PageLayout>

    {/* ── HERO ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 pt-16 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <span
              data-cms-key="about_hero_badge" data-cms-label="Hero Badge" data-cms-attr="text"
              className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
              style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}>
              {s.about_hero_badge || "Est. 2015 · Ahmedabad, India"}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.12] text-[#0A1628] mb-5 tracking-tight">
              <span data-cms-key="about_hero_heading" data-cms-label="Hero Heading Line 1" data-cms-attr="text">
                {s.about_hero_heading || "The Agency Behind"}
              </span><br />
              <span data-cms-key="about_hero_heading2" data-cms-label="Hero Heading Line 2 (Orange)" data-cms-attr="text"
                className="text-orange-gradient">
                {s.about_hero_heading2 || "750+ Success Stories"}
              </span>
            </h1>
            <p
              data-cms-key="about_hero_subtext" data-cms-label="Hero Subtext" data-cms-attr="text"
              className="text-[#4B5563] leading-relaxed mb-6 text-base max-w-lg">
              {s.about_hero_subtext || "Digital Aura is a full-service digital agency founded by Sambhav Shah in Ahmedabad. We've been helping businesses — from local business to national eCommerce brands — grow their online presence since 2015."}
            </p>
            <div className="flex flex-wrap gap-2">
              {(s.about_hero_tags || "SEO,Google Ads,Meta Ads,Shopify,WordPress,AI Solutions").split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{ background: "#fff", borderColor: "#E5E7EB", color: "#374151" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 shrink-0 w-full md:w-64">
            {heroStats.map((stat, i) => (
              <motion.div key={stat.numKey} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-2xl p-5 bg-white border text-center"
                style={{ borderColor: `${stat.color}20`, boxShadow: `0 4px 16px ${stat.color}0a` }}>
                <div data-cms-key={stat.numKey} data-cms-label={`Stat ${i+1} Number`} data-cms-attr="text"
                  className="text-2xl font-black mb-0.5" style={{ color: stat.color }}>{stat.n}</div>
                <div data-cms-key={stat.labelKey} data-cms-label={`Stat ${i+1} Label`} data-cms-attr="text"
                  className="text-[11px] font-bold text-[#0A1628]">{stat.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── OUR STORY ── */}
    <section className="pt-8 pb-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span data-cms-key="about_story_badge" data-cms-label="Story Badge" data-cms-attr="text" className="section-badge">
              {s.about_story_badge || "Our Story"}
            </span>
            <h2 data-cms-key="about_story_heading" data-cms-label="Story Heading" data-cms-attr="text"
              className="text-3xl md:text-[40px] font-black text-[#0A1628] tracking-tight leading-tight mb-6">
              {s.about_story_heading || "A Decade of Digital Growth"}
            </h2>
            <p data-cms-key="about_story_p1" data-cms-label="Story Paragraph 1" data-cms-attr="text"
              className="text-[#4B5563] leading-relaxed mb-5 text-[15px]">
              {s.about_story_p1 || "Digital Aura started in Ahmedabad in 2015 as a boutique agency with a clear purpose — help businesses of every size compete and win online through strategy, creativity, and the right technology."}
            </p>
            <p data-cms-key="about_story_p2" data-cms-label="Story Paragraph 2" data-cms-attr="text"
              className="text-[#4B5563] leading-relaxed mb-5 text-[15px]">
              {s.about_story_p2 || "Over the years, the agency grew from core digital marketing into a full-service powerhouse — covering Website Design & Development, Shopify, WordPress, Performance Ads, and Full Stack web development. A second office in Chandigarh extended our reach across north India."}
            </p>
            <p data-cms-key="about_story_p3" data-cms-label="Story Paragraph 3" data-cms-attr="text"
              className="text-[#4B5563] leading-relaxed text-[15px]">
              {s.about_story_p3 || "Today, Digital Aura is a future-ready agency trusted by 750+ clients — delivering everything from SEO and paid ads to AI-powered web apps, workflow automation, and custom ML solutions under one roof."}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { year: "2015", label: "Founded in Ahmedabad",     sub: "Started with SEO, PPC & Social Media",       color: "#7C3AED" },
              { year: "2018", label: "Expanded to Full-Service", sub: "Shopify · WordPress · Web Design & Dev",      color: "#FF6B2B" },
              { year: "2021", label: "Full Stack Development",   sub: "Custom Web Apps · React · Node · APIs",       color: "#1A6FE8" },
              { year: "Now",  label: "AI-First Agency",          sub: "LLM Apps · Automation · Custom ML Solutions", color: "#22C55E" },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-white border overflow-hidden card-hover"
                style={{ borderColor: `${item.color}22`, boxShadow: `0 4px 20px ${item.color}0d` }}>
                <div className="h-1 w-full" style={{ background: item.color }} />
                <div className="p-5">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3 inline-block"
                    style={{ background: `${item.color}12`, color: item.color }}>{item.year}</span>
                  <p className="font-black text-[#0A1628] text-sm mb-1 leading-snug">{item.label}</p>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── VISION / MISSION / VALUES ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="about_badge_48" data-cms-label="Section Badge" data-cms-attr="text">What Drives Us</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight">
            Vision, Mission &amp; <span data-cms-key="about_hl_153" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Values</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.titleKey}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="rounded-2xl p-8 bg-white border card-hover relative overflow-hidden flex flex-col"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: v.color }} />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: v.bg }}>
                <CMSIcon cmsKey={`${v.titleKey}_icon`} cmsLabel={`${v.titleDef} Icon`} name={v.iconName} size={26} color={v.color} />
              </div>
              <h3 className="font-black text-xl mb-3" style={{ color: v.color }}>
                {s[v.titleKey] || v.titleDef}
              </h3>

              {/* Values card: WIN-WIN-WIN breakdown */}
              {i === 2 ? (
                <div className="space-y-3 mt-1">
                  {[
                    { label: "Client WIN", desc: "We deliver 10X the value of what we charge, maximising ROI on every engagement.", color: "#FF6B2B" },
                    { label: "Employee WIN", desc: "Career growth, financial growth, and a culture where talent truly thrives.", color: "#7C3AED" },
                    { label: "Employer WIN", desc: "Revenue growth, increased profitability, brand strength & quality clients.", color: "#22C55E" },
                  ].map(w => (
                    <div key={w.label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: `${w.color}08`, border: `1px solid ${w.color}20` }}>
                      <span className="text-xs font-black px-2 py-0.5 rounded-full shrink-0 mt-0.5" style={{ background: w.color, color: "#fff" }}>✓</span>
                      <div>
                        <p className="text-xs font-black" style={{ color: w.color }}>{w.label}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#4B5563] leading-relaxed text-sm">
                  {s[v.descKey] || v.descDef}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FOUNDER ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="about_badge_49" data-cms-label="Section Badge" data-cms-attr="text">The Person Behind It All</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight">
            Meet <span className="text-purple-gradient">{s.about_founder_name || "Sambhav Shah"}</span>
          </h2>
          <p className="text-[#6B7280] mt-3 max-w-xl mx-auto"><span data-cms-key="about_p_52" data-cms-label="Body Text" data-cms-attr="text">Founder, strategist, and the reason Digital Aura exists.</span></p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border"
          style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 48px rgba(124,58,237,0.10)" }}>
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7C3AED, #FF6B2B, #1A6FE8)" }} />
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start bg-white">
            <div className="shrink-0 flex flex-col items-center text-center w-full md:w-52">
              <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4"
                style={{ boxShadow: "0 8px 32px rgba(124,58,237,0.35)", border: "3px solid rgba(124,58,237,0.2)" }}>
                <img src={sambhavPhoto} alt="Sambhav Shah" className="w-full h-full object-cover object-top" />
              </div>
              <p data-cms-key="about_founder_name" data-cms-label="Founder Name" data-cms-attr="text"
                className="font-black text-[#0A1628] text-xl leading-tight">
                {s.about_founder_name || "Sambhav Shah"}
              </p>
              <span data-cms-key="about_founder_role" data-cms-label="Founder Role" data-cms-attr="text"
                className="text-xs font-bold px-4 py-1.5 rounded-full mt-2 mb-6"
                style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}>
                {s.about_founder_role || "Founder & CEO"}
              </span>
              <div className="flex flex-col gap-2.5 w-full">
                <a href={`tel:${(s.about_founder_phone || s.contact_phone || '+918141200284').replace(/\s/g,'')}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all hover:scale-105"
                  style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,107,43,0.15)" }}>
                    <Phone size={13} />
                  </div>
                  <span data-cms-key="about_founder_phone" data-cms-label="Founder Phone" data-cms-attr="text">
                    {s.about_founder_phone || s.contact_phone || "+91 81412 00284"}
                  </span>
                </a>
                <a href={`mailto:${s.about_founder_email || s.contact_email || 'info@thedigitalaura.com'}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all hover:scale-105"
                  style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.15)" }}>
                    <Mail size={13} />
                  </div>
                  <span data-cms-key="about_founder_email" data-cms-label="Founder Email" data-cms-attr="text">
                    {s.about_founder_email || s.contact_email || "info@thedigitalaura.com"}
                  </span>
                </a>
                <a href={s.about_founder_linkedin || "https://www.linkedin.com/in/sambhav-shah/"} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all hover:scale-105"
                  style={{ background: "rgba(10,102,194,0.08)", color: "#0A66C2", border: "1px solid rgba(10,102,194,0.2)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(10,102,194,0.15)" }}>
                    <Linkedin size={13} />
                  </div>
                  LinkedIn Profile
                </a>
                <a href={s.about_founder_instagram || "https://www.instagram.com/sambhavshah2/"} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all hover:scale-105"
                  style={{ background: "rgba(225,48,108,0.08)", color: "#E1306C", border: "1px solid rgba(225,48,108,0.2)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(225,48,108,0.15)" }}>
                    <Instagram size={13} />
                  </div>
                  @sambhavshah2
                </a>
              </div>
            </div>
            <div className="flex-1">
              <p data-cms-key="about_founder_p1" data-cms-label="Founder Bio Para 1" data-cms-attr="text"
                className="text-[#4B5563] leading-relaxed text-lg mb-4">
                {s.about_founder_p1 || "Sambhav didn't learn digital marketing in a classroom. Starting in 2015, he built his expertise the hard way — self-taught, hands-on, scaling teams and driving growth across industries for over a decade. He's led business development, managed client relationships across continents, built and mentored growing teams, and worn every hat a high-performance agency demands. That experience didn't just make him a better marketer — it made him understand business from the inside out."}
              </p>
              <p data-cms-key="about_founder_p2" data-cms-label="Founder Bio Para 2" data-cms-attr="text"
                className="text-[#4B5563] leading-relaxed mb-4">
                {s.about_founder_p2 || "Sambhav isn't a figurehead. With 10+ years of cross-functional experience in client acquisition, team leadership, and digital execution, he's personally involved in strategy — whether it's an AI automation system, a performance campaign targeting international markets, or a web platform built to convert. He brings boardroom thinking to every brief."}
              </p>
              <p data-cms-key="about_founder_p3" data-cms-label="Founder Bio Para 3" data-cms-attr="text"
                className="text-[#4B5563] leading-relaxed mb-6">
                {s.about_founder_p3 || ""}
              </p>
              <div className="flex gap-3 flex-wrap">
                {(s.about_founder_skills || "SEO Strategy,Performance Marketing,AI Solutions,Team Leadership,Client Success,Business Growth").split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl border-l-4 italic text-sm text-[#4B5563] bg-[#F8FAFF]"
                style={{ borderLeftColor: "#7C3AED" }}>
                <span data-cms-key="about_founder_quote" data-cms-label="Founder Quote" data-cms-attr="text">
                  {s.about_founder_quote || '"Every engagement we take on has to create three wins — for the client, for our team, and for Digital Aura. If even one of those is missing, we\'re not doing our job right."'}
                </span>
                <span className="block mt-1 text-xs text-[#9CA3AF] not-italic">— Sambhav Shah, Founder & CEO</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── TEAM PROFILES ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="about_badge_50" data-cms-label="Section Badge" data-cms-attr="text">Our Team</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight"><span data-cms-key="about_h2_51" data-cms-label="Section Heading" data-cms-attr="text">Our Professionals</span></h2>
          <p className="text-[#6B7280] mt-4 max-w-xl mx-auto"><span data-cms-key="about_p_53" data-cms-label="Body Text" data-cms-attr="text">Enthusiastic and dedicated marketing professionals, well-versed with the industry and ready to take up any challenge.</span></p>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {team.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl border bg-white text-center card-hover group relative overflow-hidden"
              style={{ borderColor: t.ai ? "#7C3AED40" : "#E5E7EB", boxShadow: t.ai ? "0 4px 24px rgba(124,58,237,0.12)" : "0 2px 12px rgba(0,0,0,0.04)" }}>
              {t.ai && <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ background: "linear-gradient(90deg, #7C3AED, #FF6B2B)" }} />}
              <div className="w-full aspect-[3/4] overflow-hidden relative"
                style={{ background: t.photo ? "#f3f4f6" : `linear-gradient(135deg, ${t.color}15, ${t.color}05)` }}>
                {t.photo ? (
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-end justify-center pb-4">
                    <div className="w-24 h-24 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${t.color}, transparent)` }} />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(255,255,255,0.95), transparent)" }} />
              </div>
              <div className="px-5 pb-5 pt-3">
                <p className="font-bold text-[#0A1628] text-sm">{t.name}</p>
                <p className="text-xs text-[#6B7280] mt-1 leading-snug">{t.role}</p>
                {t.ai && (
                  <span className="inline-block mt-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}>✦ AI Specialist</span>
                )}
                <div className="mt-3 w-8 h-0.5 rounded-full mx-auto transition-all duration-300 group-hover:w-12" style={{ background: t.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── WHY CHOOSE US ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span data-cms-key="about_why_badge" data-cms-label="Why Us Badge" data-cms-attr="text" className="section-badge">{s.about_why_badge || "Why Digital Aura"}</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight">
            <span data-cms-key="about_why_heading" data-cms-label="Why Us Heading" data-cms-attr="text">{s.about_why_heading || "Save Time & Effort With Digital Aura"}</span>
          </h2>
          <p data-cms-key="about_why_subtext" data-cms-label="Why Us Subtext" data-cms-attr="text" className="text-[#6B7280] mt-4 max-w-xl mx-auto">{s.about_why_subtext || "We emphasise customised solutions following a complete business analysis — maintaining authenticity and core values throughout."}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={w.titleKey}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 bg-white border card-hover flex gap-4 items-start"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${w.color}12` }}>
                <CMSIcon cmsKey={`about_dyn_100_${w.iconName||'icon'}`} cmsLabel={"Icon"} name={w.iconName || "Star"} size={20} color={w.color} />
              </div>
              <div>
                <h3 data-cms-key={w.titleKey} data-cms-label={`Why Us ${i+1} Title`} data-cms-attr="text"
                  className="font-bold text-[#0A1628] text-sm mb-1.5">
                  {s[w.titleKey] || w.titleDef}
                </h3>
                <p data-cms-key={w.descKey} data-cms-label={`Why Us ${i+1} Desc`} data-cms-attr="text"
                  className="text-xs text-[#6B7280] leading-relaxed">
                  {s[w.descKey] || w.descDef}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CASE STUDY NUMBERS ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span data-cms-key="about_cs_badge" data-cms-label="Case Studies Badge" data-cms-attr="text" className="section-badge">{s.about_cs_badge || "Client Results"}</span>
            <h2 className="text-3xl md:text-[40px] font-black text-[#0A1628] tracking-tight">
              <span data-cms-key="about_cs_heading" data-cms-label="Case Studies Heading" data-cms-attr="text">{s.about_cs_heading || "What We've Delivered"}</span>
            </h2>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs shrink-0 self-start md:self-auto transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 14px rgba(255,107,43,0.3)" }}>
            Get Similar Results <ArrowRight size={13} />
          </Link>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {caseStudies.map((c, i) => {
            const industry = s[c.industryKey] || c.industryDef;
            const result   = s[c.resultKey]   || c.resultDef;
            const lbl      = s[c.labelKey]    || c.labelDef;
            const via      = s[c.viaKey]      || c.viaDef;
            const desc     = s[c.descKey]     || c.descDef;
            return (
              <motion.div key={c.industryKey}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl border card-hover flex flex-col p-6 gap-4"
                style={{ background: `${c.color}06`, borderColor: `${c.color}18` }}>
                <div className="flex items-center justify-between">
                  <span data-cms-key={c.industryKey} data-cms-label={`Case Study ${i+1} Industry`} data-cms-attr="text"
                    className="text-[11px] font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${c.color}12`, color: c.color }}>{industry}</span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: `${c.color}12`, color: c.color }}>
                    <span data-cms-key={c.resultKey} data-cms-label={`Case Study ${i+1} Result`} data-cms-attr="text">{result}</span>
                    {" "}<span data-cms-key={c.labelKey} data-cms-label={`Case Study ${i+1} Label`} data-cms-attr="text">{lbl}</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 17l5-5 4 4 9-9" stroke={c.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[42px] font-black leading-none" style={{ color: c.color }}>
                      <span data-cms-key={`${c.resultKey}_big`} data-cms-label={`Case Study ${i+1} Result (big)`} data-cms-attr="text">{result}</span>
                    </span>
                  </div>
                  <p data-cms-key={c.descKey} data-cms-label={`Case Study ${i+1} Description`} data-cms-attr="text"
                    className="text-[13px] text-[#4B5563] leading-relaxed">{desc}</p>
                </div>
                <div className="mt-auto pt-3 border-t" style={{ borderColor: `${c.color}15` }}>
                  <span data-cms-key={c.viaKey} data-cms-label={`Case Study ${i+1} Via`} data-cms-attr="text"
                    className="text-[12px] font-semibold" style={{ color: c.color }}>{via}</span><span style={{ color: c.color }}> →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── CLIENT INDUSTRIES ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span data-cms-key="about_serve_badge" data-cms-label="Who We Serve Badge" data-cms-attr="text" className="section-badge">{s.about_serve_badge || "Who We Serve"}</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight">
            <span data-cms-key="about_serve_heading" data-cms-label="Who We Serve Heading" data-cms-attr="text">{s.about_serve_heading || "Industries We Work With"}</span>
          </h2>
          <p data-cms-key="about_serve_subtext" data-cms-label="Who We Serve Subtext" data-cms-attr="text" className="text-[#6B7280] mt-4 max-w-xl mx-auto">{s.about_serve_subtext || "750+ businesses across diverse sectors trust us to deliver digital growth that matters."}</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3">
          {clientList.map((label, i) => {
            const colors = ["#7C3AED","#FF6B2B","#1A6FE8","#22C55E","#F59E0B","#EC4899"];
            const color = colors[i % colors.length];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border card-hover"
                style={{ background: `${color}10`, color, borderColor: `${color}30` }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                {label}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span data-cms-key="about_voices_badge" data-cms-label="Client Voices Badge" data-cms-attr="text" className="section-badge">{s.about_voices_badge || "Client Voices"}</span>
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] tracking-tight">
            <span data-cms-key="about_voices_heading" data-cms-label="Client Voices Heading" data-cms-attr="text">{s.about_voices_heading || "What Our Clients Say"}</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t: Record<string, string>, i: number) => {
            const initials = t.name?.split(' ').map((w: string) => w[0]).join('').slice(0,2).toUpperCase() || '??';
            const colors = ["#7C3AED","#FF6B2B","#1A6FE8"];
            const color = t.color || colors[i % colors.length];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-7 bg-white border card-hover relative overflow-hidden flex flex-col"
                style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: color }} />
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s2) => <Star key={s2} size={13} fill="#FF6B2B" stroke="none" />)}
                </div>
                <p className="text-[#374151] leading-relaxed text-sm mb-5 italic flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#F3F4F6" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                    style={{ background: color }}>{initials}</div>
                  <div>
                    <p className="font-bold text-[#0A1628] text-sm">{t.name}</p>
                    <p className="text-[10px] text-[#9CA3AF] font-medium">{t.service}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── PLATFORM RATINGS ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span data-cms-key="about_recog_badge" data-cms-label="Recognition Badge" data-cms-attr="text" className="section-badge">{s.about_recog_badge || "Recognition"}</span>
          <h2 className="text-3xl md:text-[40px] font-black text-[#0A1628] tracking-tight">
            <span data-cms-key="about_recog_heading" data-cms-label="Recognition Heading" data-cms-attr="text">{s.about_recog_heading || "Rated on Top Platforms"}</span>
          </h2>
          <p data-cms-key="about_recog_subtext" data-cms-label="Recognition Subtext" data-cms-attr="text" className="text-[#6B7280] mt-3 text-sm max-w-md mx-auto">{s.about_recog_subtext || "Recognised by leading industry directories across India and worldwide."}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {platforms.map((p: Record<string, string>, i: number) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white border flex flex-col items-center text-center card-hover overflow-hidden"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div className="w-full flex flex-col items-center px-4 pt-5 pb-4" style={{ height: 170 }}>
                <div className="flex-1 flex items-center justify-center">
                {p.logo === "google" ? (
                  <svg width="100" height="34" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                    <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                    <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                    <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                    <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                    <path fill="#4285F4" d="M35.29 41.41V32h31.36c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 35.48.36 17.07 16.32 1.61 34.95 1.61c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.14.47z"/>
                  </svg>
                ) : (
                  <img src={p.logo} alt={p.name} className="object-contain" style={{ height: 85, maxWidth: 150, mixBlendMode: "multiply" }} />
                )}
                </div>
                <span className="text-[10px] font-semibold px-3 py-1.5 rounded-full text-center leading-snug" style={{ background: `${p.color}12`, color: p.color, maxWidth: "90%" }}>
                  {p.tagline}
                </span>
              </div>
              <div className="w-full px-5 pb-5 border-t pt-4" style={{ borderColor: "#F3F4F6" }}>
                <div className="flex gap-0.5 justify-center mb-2">
                  {[...Array(5)].map((_, s2) => <Star key={s2} size={13} fill={p.color} stroke="none" />)}
                </div>
                <p className="text-2xl font-black" style={{ color: p.color }}>{p.rating}</p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">{p.reviews} reviews</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
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
          <h2 data-cms-key="about_cta_heading" data-cms-label="CTA Heading" data-cms-attr="text"
            className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            {s.about_cta_heading || "Ready to Boost Your Online Presence?"}
          </h2>
          <p data-cms-key="about_cta_subtext" data-cms-label="CTA Subtext" data-cms-attr="text"
            className="text-[#E2E8F0] mb-8 leading-relaxed">
            {s.about_cta_subtext || "Partner with Digital Aura and let our dedicated team drive measurable results for your business."}
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            <span data-cms-key="about_cta_button" data-cms-label="CTA Button Text" data-cms-attr="text">
              {s.about_cta_button || "Get In Touch"}
            </span>
            <ArrowRight size={16} />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#E2E8F0] mt-6">
            <a href={`tel:${(s.contact_phone || '+918141200284').replace(/\s/g,'')}`}
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={15} className="text-[#FF6B2B]" />
              <span data-cms-key="contact_phone" data-cms-label="Phone Number" data-cms-attr="text">
                {s.contact_phone || "+91 81412 00284"}
              </span>
            </a>
            <a href={`mailto:${s.contact_email || 'info@thedigitalaura.com'}`}
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={15} className="text-[#FF6B2B]" />
              <span data-cms-key="contact_email" data-cms-label="Email Address" data-cms-attr="text">
                {s.contact_email || "info@thedigitalaura.com"}
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

  </PageLayout>
  );
};

export default About;
