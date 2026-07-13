import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, FileText, Link2, BarChart2, Globe2, PenTool,
  TrendingUp, Gauge, Smile, ShieldCheck, ChevronDown, Check,
  Target, Zap, Bot, Brain, Layers, Cpu, Network, Mic,
  ArrowRight, Lock, CheckCircle2, ShoppingCart, ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import MathCaptcha from "@/components/MathCaptcha";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import RatedOnPlatforms from "@/components/RatedOnPlatforms";
import ClientLogoGrid from "@/components/ClientLogoGrid";

const accentColor = "#22C55E";
const glowColor = "rgba(34,197,94,0.12)";

const seoServices = [
  {
    title: "Search Engine Optimisation (SEO)",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.2)",
    Icon: Search,
    iconName: "Search",
    items: [
      { label: "SEO Audit & Strategy", desc: "Full website analysis with actionable insights and a clear roadmap" },
      { label: "On Page SEO", desc: "Keyword optimisation, meta tags, content structure, internal linking" },
      { label: "Technical SEO", desc: "Crawlability, indexing, site speed, Core Web Vitals optimisation" },
      { label: "Local SEO", desc: "Google Business Profile optimisation, local citations, geo targeting" },
      { label: "Off Page SEO", desc: "High quality backlinks, outreach, authority building" },
      { label: "eCommerce SEO", desc: "Product optimisation, category structure, schema markup" },
    ],
  },
  {
    title: "AI Powered SEO (AIO & GEO)",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.06)",
    border: "rgba(124,58,237,0.2)",
    Icon: Bot,
    iconName: "Bot",
    items: [
      { label: "AIO Optimisation", desc: "Structure content to appear in Google's AI Overview answer boxes" },
      { label: "GEO (Generative Engine Optimisation)", desc: "Optimise to be cited by ChatGPT, Perplexity, Gemini & other AI tools" },
      { label: "Entity & Knowledge Graph SEO", desc: "Build brand authority recognised and understood by AI models" },
      { label: "Schema & Structured Data", desc: "Help AI engines parse, understand, and feature your content" },
      { label: "Topical Authority Building", desc: "Comprehensive content clusters for AI recognition and citation" },
      { label: "Conversational & Voice Search", desc: "Optimise for AI assistant queries and natural language searches" },
    ],
  },
  {
    title: "Content Marketing",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.06)",
    border: "rgba(26,111,232,0.2)",
    Icon: FileText,
    iconName: "FileText",
    items: [
      { label: "Content Strategy & Planning", desc: "Data driven content calendars aligned with business goals" },
      { label: "Blog Writing & Articles", desc: "SEO optimised, engaging, and informative content" },
      { label: "Website Content", desc: "Landing pages, service pages, and conversion focused copy" },
      { label: "Content Optimisation", desc: "Updating and improving existing content for better rankings" },
      { label: "Copywriting", desc: "Persuasive content designed to convert visitors into customers" },
      { label: "Visual Content Support", desc: "Infographics, content structure, readability improvements" },
    ],
  },
];

const aiSeoCards = [
  // ── SEO ──
  {
    Icon: Search,
    iconName: "Search",
    category: "SEO",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    title: "SEO Audit & Strategy",
    desc: "We start with a full site audit covering rankings, keyword gaps, content quality, backlinks, and competitor positioning. Every finding is prioritised and mapped into a clear, actionable SEO roadmap tailored to your business goals.",
    tags: ["Full site audit", "Competitor analysis", "SEO roadmap"],
  },
  {
    Icon: FileText,
    iconName: "FileText",
    category: "SEO",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    title: "On Page SEO",
    desc: "We optimise every page with targeted keywords, title tags, meta descriptions, H1 to H6 headings, image alt text, and internal linking. All content is aligned to search intent so Google ranks your pages and users stay engaged.",
    tags: ["Keyword research", "Meta optimisation", "Content structure"],
  },
  {
    Icon: BarChart2,
    iconName: "BarChart2",
    category: "SEO",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    title: "Technical SEO",
    desc: "We fix crawlability, indexation errors, page speed, Core Web Vitals, mobile usability, canonical tags, and XML sitemaps. A clean technical foundation ensures search engines can access and rank every important page on your site.",
    tags: ["Core Web Vitals", "Site speed", "Crawl & index fixes"],
  },
  {
    Icon: Globe2,
    iconName: "Globe2",
    category: "SEO",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    title: "Local SEO",
    desc: "We optimise your Google Business Profile, build consistent local citations, and create geo targeted landing pages. Our local SEO strategies put your business at the top of Google Maps and the local pack for high intent searches.",
    tags: ["Google Business Profile", "Local citations", "Geo targeting"],
  },
  {
    Icon: Link2,
    iconName: "Link2",
    category: "SEO",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    title: "Off Page SEO",
    desc: "We earn high quality backlinks from authoritative, niche relevant websites through guest posting, digital PR, and brand mention outreach. Every link is manually vetted to grow your domain authority and protect against algorithm updates.",
    tags: ["Link building", "Digital PR", "Domain authority"],
  },
  {
    Icon: ShoppingCart,
    iconName: "ShoppingCart",
    category: "SEO",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    title: "eCommerce SEO",
    desc: "We optimise product pages, category structures, and product schema so your listings rank in Google Shopping and organic results. Crawl budget is managed efficiently so every product page gets indexed and drives targeted buyer traffic.",
    tags: ["Product page SEO", "Category structure", "eCommerce schema"],
  },
  // ── AIO & GEO ──
  {
    Icon: Brain,
    iconName: "Brain",
    category: "AIO & GEO",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "AI Overview Optimisation",
    desc: "Google's AI Overviews appear above all organic results, capturing clicks before users reach traditional listings. We restructure your content with direct answers, clear headings, and authoritative signals so Google's AI consistently pulls from your pages first.",
    tags: ["AI Overview appearances", "Above organic results", "Answer box visibility"],
  },
  {
    Icon: Network,
    iconName: "Network",
    category: "AIO & GEO",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "ChatGPT & Perplexity Visibility",
    desc: "Millions now search via ChatGPT, Perplexity, Gemini, and Claude instead of Google. We optimise your content structure and authority signals so AI tools consistently cite and recommend your brand in their generated responses.",
    tags: ["ChatGPT citations", "Perplexity visibility", "Gemini & Claude reach"],
  },
  {
    Icon: Cpu,
    iconName: "Cpu",
    category: "AIO & GEO",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Schema & Structured Data",
    desc: "We implement FAQ, HowTo, Product, Article, and LocalBusiness schema across your site, making pages eligible for rich results and easier for Google's AI to parse. Proper schema increases appearances in AI Overviews, voice search, and featured snippets.",
    tags: ["FAQ & HowTo schema", "Rich snippets", "AI readable content"],
  },
  {
    Icon: Layers,
    iconName: "Layers",
    category: "AIO & GEO",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Entity SEO & Knowledge Graph",
    desc: "We build your brand entity presence through a Google Knowledge Panel, consistent directory data, and authoritative mentions across trusted sites. A strong entity footprint makes ChatGPT, Perplexity, and Gemini recognise your business as a credible source.",
    tags: ["Google Knowledge Panel", "Brand entity building", "AI brand recognition"],
  },
  {
    Icon: Zap,
    iconName: "Zap",
    category: "AIO & GEO",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Topical Authority & Clustering",
    desc: "We build pillar pages for your core topics surrounded by deep cluster articles covering every related question and subtopic. This signals to Google and AI tools that your site is the most complete and trustworthy resource in your niche.",
    tags: ["Pillar pages", "Topic clusters", "AI trust signals"],
  },
  {
    Icon: Mic,
    iconName: "Mic",
    category: "AIO & GEO",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Voice & Conversational Search",
    desc: "We optimise your content with question and answer formats, plain language, and concise direct answers that AI assistants can quote verbatim. This keeps your brand as the spoken answer for your most important topics as voice and AI usage grows.",
    tags: ["Voice search", "Natural language queries", "Conversational intent"],
  },
  // ── Content ──
  {
    Icon: PenTool,
    category: "Content",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    title: "Content Strategy & Planning",
    desc: "We build data driven content calendars based on keyword research, competitor gap analysis, and your business goals. Every topic is prioritised by search volume and commercial value so each piece of content has a clear ranking target and measurable purpose.",
    tags: ["Content calendar", "Keyword driven topics", "Competitor gap analysis"],
  },
  {
    Icon: BarChart2,
    category: "Content",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    title: "Blog Writing & Articles",
    desc: "We produce SEO optimised blog posts and long form articles structured with proper headings, internal links, and search intent alignment. Every article is written for both human readers and AI tools to earn featured snippets, AI Overview citations, and consistent organic traffic.",
    tags: ["SEO blog writing", "Long form articles", "Search intent alignment"],
  },
  {
    Icon: Globe2,
    category: "Content",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    title: "Website Content",
    desc: "We write and optimise landing pages, service pages, and homepage copy targeting the right keywords while guiding visitors toward conversion. Every page is structured with strong CTAs, benefit focused copy, and search intent alignment to rank and convert.",
    tags: ["Landing page copy", "Service pages", "Conversion focused writing"],
  },
  {
    Icon: TrendingUp,
    category: "Content",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    title: "Content Optimisation",
    desc: "We audit underperforming pages and improve keyword targeting, content depth, heading structure, and readability to push rankings higher. Updated, well structured content also improves AI Overview eligibility and increases dwell time across your site.",
    tags: ["Content refresh", "Ranking improvement", "AI Overview eligibility"],
  },
  {
    Icon: Target,
    category: "Content",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    title: "Copywriting",
    desc: "We craft conversion focused copy for ads, emails, product descriptions, sales pages, and CTAs tailored to your brand voice and audience mindset. Every word is chosen to reduce friction in the buying journey and drive measurable results across all channels.",
    tags: ["Conversion copywriting", "Ad & email copy", "Product descriptions"],
  },
  {
    Icon: Smile,
    category: "Content",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    title: "Visual Content Support",
    desc: "We support your content with infographics, data visualisations, and improved page layout that breaks up dense text into scannable, shareable formats. Visually rich content earns more backlinks, social shares, and time on page than text alone.",
    tags: ["Infographics", "Visual structure", "Readability improvements"],
  },
];

const toolGroups = [
  {
    label: "SEO Tools",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    pills: ["Google Search Console", "Ahrefs", "SEMrush", "Screaming Frog"],
  },
  {
    label: "AI & GEO Tools",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    pills: ["Perplexity", "ChatGPT", "Google SGE", "AI Overviews"],
  },
  {
    label: "Content & Research",
    color: "#1A6FE8",
    bg: "rgba(26,111,232,0.08)",
    pills: ["Surfer SEO", "Clearscope", "Google Trends", "AnswerThePublic"],
  },
  {
    label: "Technical & Performance",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    pills: ["PageSpeed Insights", "GTmetrix", "Lighthouse", "Schema Validator"],
  },
  {
    label: "Analytics & Tracking",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.08)",
    pills: ["Google Analytics 4", "Search Console", "Custom Dashboards"],
  },
];

const approach = [
  "In depth keyword research based on user intent and AI query patterns",
  "Competitor analysis to identify growth and GEO opportunities",
  "Content aligned with both search intent and AI citation criteria",
  "Structured data implementation for AI and rich result eligibility",
  "Continuous optimisation based on AIO visibility and ranking data",
  "Entity and authority building for long term AI search dominance",
];

const whatWeDo = [
  { Icon: TrendingUp,  label: "Increase organic website traffic" },
  { Icon: Search,      label: "Improve search engine rankings" },
  { Icon: Bot,         label: "Appear in AI Overviews & AI answers" },
  { Icon: Network,     label: "Get cited by ChatGPT, Gemini & Perplexity" },
  { Icon: Target,      label: "Generate high quality leads from search" },
  { Icon: ShieldCheck, label: "Build brand authority and trust signals" },
];

const results = [
  { Icon: TrendingUp,  text: "Higher rankings on Google page 1" },
  { Icon: Bot,         text: "Visibility in AI Overviews & GEO results" },
  { Icon: Gauge,       text: "More organic traffic month over month" },
  { Icon: ShieldCheck, text: "Long term sustainable growth" },
];

const whyUs = [
  "Data driven strategies focused on real results",
  "Full AIO & GEO optimisation: future proof your SEO",
  "High quality, human first content (not AI spam)",
  "Transparent reporting and measurable outcomes",
  "Focus on both traffic, conversions, and AI visibility",
  "Customised solutions for your business and industry",
];

const faqs = [
  {
    q: "What is AIO and how do you optimise for it?",
    a: "AIO stands for AI Overviews: Google's AI generated answer summaries that appear at the top of search results. We optimise your content with clear structure, authoritative information, proper schema, and direct answers so Google's AI pulls from your pages.",
  },
  {
    q: "What is GEO (Generative Engine Optimisation)?",
    a: "GEO is the practice of optimising your content to appear in AI generated responses from tools like ChatGPT, Perplexity, Google Gemini, and Claude. As users shift from traditional search to AI assistants, GEO ensures your brand stays visible and gets cited as a trusted source.",
  },
  {
    q: "Will AI kill traditional SEO?",
    a: "No: AI transforms SEO rather than replacing it. Traditional ranking signals (authority, relevance, technical health) still matter, but they now also feed AI answers. We combine both to ensure you win in classic search and AI generated results.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "SEO is a long term strategy. Initial improvements can be seen in 2 to 3 months, with significant growth typically within 4 to 6 months. AI visibility improvements can sometimes appear faster as AI tools continuously index new content.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No agency can guarantee rankings, but we follow proven strategies to maximise your visibility across both traditional and AI powered search results.",
  },
  {
    q: "What kind of content do you create?",
    a: "We create blogs, landing pages, website content, and conversion focused copy: all structured to rank on Google and be cited by AI tools like ChatGPT and Perplexity.",
  },
  {
    q: "Can you optimise existing content?",
    a: "Yes, we audit and improve your current content to boost rankings, improve AI Overview eligibility, and increase GEO visibility across AI platforms.",
  },
];

const seoTabs = [
  { key: "seo",     label: "SEO",       color: "#22C55E", bg: "rgba(34,197,94,0.08)",    gradient: "linear-gradient(135deg,#22C55E,#16a34a)" },
  { key: "aio",     label: "AIO & GEO", color: "#7C3AED", bg: "rgba(124,58,237,0.08)",   gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)" },
  { key: "content", label: "Content",   color: "#1A6FE8", bg: "rgba(26,111,232,0.08)",   gradient: "linear-gradient(135deg,#1A6FE8,#1558c0)" },
];

const cardsByTab: Record<string, typeof aiSeoCards> = {
  seo:     aiSeoCards.filter(c => c.category === "SEO"),
  aio:     aiSeoCards.filter(c => c.category === "AIO & GEO"),
  content: aiSeoCards.filter(c => c.category === "Content"),
};

const SeoCardTabs = () => {
  const [activeTab, setActiveTab] = useState("seo");
  const tab = seoTabs.find(t => t.key === activeTab)!;
  const cards = cardsByTab[activeTab];

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: `${glowColor}`, color: accentColor, border: `1px solid ${accentColor}30` }}>
            <Bot size={12} /> SEO, AIO & GEO and Content Marketing
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="seo_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">SEO, AIO & GEO & Content Marketing: Complete Search Domination</span></h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed"><span data-cms-key="seo_p_23" data-cms-label="Body Text" data-cms-attr="text">We cover all four pillars of modern search: traditional SEO to rank on Google, AIO to appear in Google's AI Overviews, GEO to get cited by ChatGPT, Perplexity, and Gemini, and content marketing to attract and convert your audience.</span></p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {seoTabs.map((t, i) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={activeTab === t.key
                ? { background: t.gradient, color: "#fff", boxShadow: `0 4px 14px ${t.color}40` }
                : { background: "#F8FAFF", color: "#374151", border: "1.5px solid #E5E7EB" }}>
              <span data-cms-key={`seo_tl_${i}_label`} data-cms-label="Tab Label" data-cms-attr="text">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid md:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-6 border"
                style={{ background: "#fff", borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = tab.color + "40"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px ${tab.color}12`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tab.bg }}>
                    <card.Icon size={20} style={{ color: tab.color }} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}>{card.category}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`seo_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`seo_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: tab.bg, color: tab.color }}>{tag}</span>
                  ))}
                </div>
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold transition-all hover:gap-2.5" style={{ color: tab.color }}>
              <span data-cms-key="seo_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Learn More</span> <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#22C55E] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const SEOAuditForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", website: "", goal: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(34,197,94,0.1)" }}>
            <CheckCircle2 size={32} className="text-[#22C55E]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="seo_x13" data-cms-label="Card Heading" data-cms-attr="text">Audit Request Received!</span></h3>
          <p className="text-[#6B7280]"><span data-cms-key="seo_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">We'll analyse your site and send your free SEO audit within 24 hours.</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1"><span data-cms-key="seo_x14" data-cms-label="Card Heading" data-cms-attr="text">Request Your Free SEO Audit</span></h3>
          <p className="text-sm text-[#6B7280] mb-4"><span data-cms-key="seo_p_24" data-cms-label="Body Text" data-cms-attr="text">Fill in your details and we'll get started right away.</span></p>
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
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary SEO Goal *</label>
            <select name="goal" required value={form.goal} onChange={handleChange} className={inputClass + " cursor-pointer"}>
              <option value="" disabled>Select your goal...</option>
              <option>Increase organic traffic</option>
              <option>Rank for specific keywords</option>
              <option>Fix technical SEO issues</option>
              <option>Improve local search visibility</option>
              <option>Appear in AI search results (AIO/GEO)</option>
              <option>Full SEO strategy & roadmap</option>
            </select>
          </div>
          <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
          <button type="submit" disabled={!captchaOk} className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)" }}>
            Get My Free SEO Audit <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
            <Lock size={12} /> 100% free no credit card, no obligation
          </p>
        </form>
      )}
    </div>
  );
};

const seoClients = [
  { name: "Dr Parth Shah",          tag: "Eye Hospital in Canberra",          logo: "https://www.drparthshah.com.au/wp-content/uploads/2020/02/site_logo.png",                                                                                                                                          logoBg: "#f0f7ff" },
  { name: "A One Auto Care",        tag: "Car Detailing Shop",                logo: "https://aoneautocare.com.au/wp-content/uploads/2020/09/cropped-A-one-auto-care.png",                                                                                                                               logoBg: "#fff8f0" },
  { name: "DFA Law",                tag: "Law Firm",                          logo: "https://www.dfalaw.co.uk/wp-content/uploads/2017/09/dfa-law-logo.png",                                                                                                                                             logoBg: "#f5f5f5" },
  { name: "Ordorite",               tag: "POS Software",                      logo: "https://ordorite.com/wp-content/uploads/2023/07/ordoritelogo.webp",                                                                                                                                                logoBg: "#f0f8ff" },
  { name: "Levapor",                tag: "Waste Water Treatment",             logo: "https://levapor.com/wp-content/uploads/2021/03/levapor2-2.png",                                                                                                                                                    logoBg: "#f5fff5" },
  { name: "The Grand Palace",       tag: "Indian Restaurant in Sydney",       logo: "https://thedigitalaura.com/uploads/grand-palace-logo.png",                                                                                                                           logoBg: "#fffbf0" },
  { name: "DP Electric",            tag: "Electric Appliance Repair in Melbourne", logo: "https://dpelectric.com.au/wp-content/uploads/2023/05/logooo.png",                                                                                                                                 logoBg: "#fffff0" },
  { name: "Spinx Digital",          tag: "IT Agency",                         logo: "https://cdn-eahjn.nitrocdn.com/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-4b7d23a/www.spinxdigital.com/app/uploads/2023/03/spinx-logo-white.png",                                               logoBg: "#1a1a2e" },
  { name: "Clarity Eye Surgeons",   tag: "Eye Hospital in Canberra",          logo: "https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png",                                                                                                  logoBg: "#f0f8ff" },
  { name: "Prism Calibration",      tag: "Calibration & Validation Company",  logo: "https://prismcalibration.com/wp-content/uploads/2020/10/prism_logo_new.png",                                                                                                                      logoBg: "#f8f0ff" },
  { name: "Sure Freeze",            tag: "HVAC & Refrigeration Repairs in Melbourne",logo: "https://thedigitalaura.com/uploads/sure-freeze-logo.png",                                                                                                                             logoBg: "#f0faff" },
  { name: "Grand Bavarchi",         tag: "Restaurant & Events",               logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png",                                                                                                                                             logoBg: "#fff8f0" },
  { name: "Bin Drop Dumpsters",     tag: "Waste Management",                  logo: "https://www.bindropdumpsters.com/wp-content/uploads/Bin-Drop-Logo.png",                                                                                                                                            logoBg: "#f5fff5" },
  { name: "Worktop Warehouse",      tag: "Worktop Manufacturing in UK",       logo: "https://worktopwarehouse.co.uk/wp-content/uploads/2024/05/WORKTOP-WAREHOUSE-stone-masters-logo-1.png",                                                                                                            logoBg: "#faf5f0" },
  { name: "Active Office Furniture",tag: "Office Furniture",      logo: "https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png",                                                                                                            logoBg: "#f0f8ff" },
  { name: "Inn of the Dove",        tag: "Hospitality",           logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp",                                                                                                                                            logoBg: "#fff8f5" },
  { name: "Game Zone Events",       tag: "Events & Entertainment",logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                                                                                                           logoBg: "#f0fff0" },
  { name: "Dr Ronak Patel",         tag: "Healthcare",            logo: "https://drronakpatel.in/wp-content/uploads/2025/10/LOGO-PNG-1024x1024.png",                                                                                                                                       logoBg: "#f0f7ff" },
  { name: "AMVI Hospitals",         tag: "Healthcare",            logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png",                                                                                                                               logoBg: "#f5f0ff" },
  { name: "Krisha Hospital",        tag: "Healthcare",            logo: "https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png",                                                                                                                                             logoBg: "#fff0f5" },
  { name: "Krisha Eye Hospital",    tag: "Eye Care",              logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png",                                                                                                               logoBg: "#f0faff" },
  { name: "Shukan Hospital",        tag: "Women's Hospital",      logo: "https://thedigitalaura.com/uploads/shukan-hospital-logo.png",                                                                                                                                               logoBg: "#f0fff8" },
];

const SEOClientSlider = () => {
  const [active, setActive] = useState(0);
  const total = seoClients.length;

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % total), 3500);
    return () => clearInterval(t);
  }, [total]);

  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);
  const c = seoClients[active];

  const pageStart = Math.floor(active / 4) * 4;
  const visible = seoClients.slice(pageStart, pageStart + 4);

  return (
    <div className="select-none max-w-3xl mx-auto">
      {/* 4-col logo grid (page of 4 at a time) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {visible.map((cl, i) => {
          const idx = pageStart + i;
          const isActive = idx === active;
          return (
            <button key={idx} onClick={() => setActive(idx)}
              className="flex items-center justify-center rounded-xl border transition-all duration-200 p-3"
              style={{ height: 64, background: isActive ? cl.logoBg : "#F8FAFF", borderColor: isActive ? `${accentColor}60` : "#E5E7EB", boxShadow: isActive ? `0 4px 16px ${accentColor}20` : "none", transform: isActive ? "scale(1.04)" : "scale(1)" }}>
              <img src={cl.logo} alt={cl.name} className="object-contain w-full"
                style={{ maxHeight: 32, maxWidth: 90, filter: isActive ? "none" : "grayscale(0.3) opacity(0.7)" }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </button>
          );
        })}
      </div>

      {/* Featured card */}
      <div className="relative rounded-2xl overflow-hidden border"
        style={{ borderColor: `${accentColor}30`, boxShadow: `0 8px 40px ${accentColor}15`, background: "#fff" }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${accentColor},#1A6FE8)` }} />

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-5 sm:p-8">
            {/* Logo */}
            <div className="w-full sm:w-auto shrink-0 flex items-center justify-center rounded-xl p-5 sm:p-7"
              style={{ background: c.logoBg, minHeight: 100, minWidth: 160, border: "1px solid rgba(0,0,0,0.06)" }}>
              <img src={c.logo} alt={c.name} className="object-contain mx-auto"
                style={{ height: 52, maxWidth: 180 }}
                onError={e => { (e.target as HTMLImageElement).alt = c.name; }} />
            </div>
            {/* Info */}
            <div className="flex-1 text-center sm:text-left w-full">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
                style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}25` }}>
                {c.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A1628] mb-1.5">{c.name}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">SEO strategy and organic growth delivered by Digital Aura — driving real rankings and measurable traffic.</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <ChevronLeft size={14} className="text-[#374151]" />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <ChevronLeft size={14} className="text-[#374151] rotate-180" />
        </button>
      </div>

      {/* Counter + dots */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-xs font-bold text-[#9CA3AF]">{active + 1} / {total}</span>
        <div className="flex gap-1.5">
          {seoClients.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? accentColor : "#D1D5DB" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`seo_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="seo_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`seo_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const SEOPage = () => {
  const _sp = useSettings(['seo_hero_h1','seo_hero_sub','seo_cta_btn']);
  return (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
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
              <Search size={12} /> SEO & Content Marketing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="seo_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Drive Organic Growth with<br />
            <span style={{ color: accentColor }}>Data Driven SEO & Content Marketing</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            <span data-cms-key="seo_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We help businesses grow their online presence through strategic SEO, high quality content marketing, and next generation AI search optimisation: including AIO, GEO, and generative engine visibility.</span>
          </p>
          {/* AI badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["AIO Ready", "GEO Optimised", "ChatGPT Visible", "Google AI Overviews", "Perplexity Cited"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #22C55E, #16a34a)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              Start Growing Organically <Search size={15} />
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
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical SEO Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Sell You Rankings.<br className="hidden md:block" /> Very Few Can Deliver Traffic That Converts.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">There's a generation of SEO being sold right now that chases vanity metrics — rankings for keywords your customers don't actually search, traffic that bounces on arrival, and monthly reports full of charts that hide the fact that revenue hasn't moved.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Rankings for keywords that don't drive revenue", detail: "Vanity metrics that don't convert" },
              { pain: "Generic content with no subject expertise", detail: "Written for algorithms, not humans" },
              { pain: "Monthly reports with no revenue attribution", detail: "Activity reported, outcomes ignored" },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your SEO agency can't draw a direct line from your rankings to your revenue, they're optimising for the wrong thing.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── AI SEO Section ── */}
    <SeoCardTabs />

    {/* ── Our Approach ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seo_h2lbl_26" data-cms-label="Section Label" data-cms-attr="text">Our SEO & Content Approach</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="seo_p_25" data-cms-label="Body Text" data-cms-attr="text">We focus on long term, sustainable growth using proven strategies, data backed decisions, and AI ready content structures.</span></p>
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
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="seo_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Tools & Technologies We Use</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="seo_s12_sub" data-cms-label="Section Subtext" data-cms-attr="text">Industry-leading SEO tools plus cutting edge AI search platforms for complete visibility.</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`seo_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
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

    {/* ── Why Choose Us + What We Can Do ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="seo_h2lbl_28" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`seo_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seo_h2lbl_29" data-cms-label="Section Label" data-cms-attr="text">What We Can Do for Your Business</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {whatWeDo.map((item, i) => (
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seo_h2lbl_30" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
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

    {/* ── SEO Client Logos ── */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#fff", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Grown With SEO</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Clients We've Grown With SEO</h2>
        <p className="text-[#6B7280] text-sm max-w-md mx-auto">Real businesses. Real rankings. Organic growth delivered by Digital Aura.</p>
      </motion.div>
      <div className="max-w-5xl mx-auto">
        <ClientLogoGrid clients={seoClients} accentColor={accentColor} />
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="seo_h2lbl_31" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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

    {/* ── Free SEO Audit + Contact Form ── */}
    <section id="seo-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #22C55E 0%, #16a34a 40%, #0A1628 100%)" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">Free SEO Audit</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6"><span data-cms-key="seo_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Get Your Free<br />SEO Audit & Strategy</span></h2>
            <p className="text-white/80 text-lg mb-8"><span data-cms-key="seo_x16" data-cms-label="Body Text" data-cms-attr="text">We'll analyse your website, identify ranking opportunities, and deliver a clear action plan completely free, no strings attached.</span></p>
            <div className="space-y-3 mb-8">
              {["Full technical SEO audit of your site", "Keyword gap & competitor analysis", "AI visibility check (AIO & GEO)", "Custom SEO roadmap & quick wins"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-white font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0" style={{ color: accentColor }}>TJ</div>
              <div>
                <p className="text-white text-xs italic"><span data-cms-key="seo_x17" data-cms-label="Body Text" data-cms-attr="text">"Ranked on page 1 within 90 days. The audit revealed issues we never knew existed."</span></p>
                <p className="text-white/70 text-[10px] mt-0.5"><span data-cms-key="seo_x18" data-cms-label="Body Text" data-cms-attr="text">,  Tapan J., Business Owner</span></p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <SEOAuditForm />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="seo_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="seo_hl_131" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Rank</span> on <span data-cms-key="seo_hl_132" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Page 1</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="seo_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free SEO Audit Call. We'll review your current rankings, identify your biggest growth opportunities, and show you exactly what it will take to get to page 1 for your target keywords.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Free SEO Audit <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="seo_x15" data-cms-label="Fine Print" data-cms-attr="text">No vanity metrics — A real SEO strategy built around leads, traffic, and revenue.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default SEOPage;




