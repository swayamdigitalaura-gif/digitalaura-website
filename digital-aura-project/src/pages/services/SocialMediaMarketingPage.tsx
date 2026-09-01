import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target, Users, RefreshCw, BarChart2, TrendingUp, Gauge,
  DollarSign, ShieldCheck, ChevronDown, Check,
  Zap, Megaphone, Video, Image, ArrowRight, Lock,
  CheckCircle2, LineChart, FlaskConical, PieChart,
  MousePointerClick, Globe2, Settings, Eye, Heart,
  Hash, Calendar, MessageCircle, ChevronLeft,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import MathCaptcha from "@/components/MathCaptcha";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import BlogInsights from "@/components/BlogInsights";
import ClientLogoGrid from "@/components/ClientLogoGrid";

const accentColor = "#7C3AED";
const glowColor = "rgba(124,58,237,0.12)";
const igColor = "#E1306C";

/* ─── Tab Config ─── */
const smmTabs = [
  {
    key: "strategy",
    label: "Content Strategy",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)",
  },
  {
    key: "management",
    label: "Organic Management",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    gradient: "linear-gradient(135deg,#E1306C,#833AB4)",
  },
  {
    key: "growth",
    label: "Community & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    gradient: "linear-gradient(135deg,#F59E0B,#d97706)",
  },
];

/* ─── Cards Data ─── */
const smmCards = [
  // ── Content Strategy ──
  {
    Icon: Target,
    category: "Content Strategy",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Platform-Specific Content Strategy",
    desc: "We build a distinct content strategy for every platform your audience actually uses instead of repurposing the same post everywhere. Instagram, Facebook, LinkedIn, and YouTube each get a plan built around how people actually consume content there.",
    tags: ["Multi-platform planning", "Audience research", "Brand voice guidelines"],
  },
  {
    Icon: Calendar,
    category: "Content Strategy",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Content Calendar & Planning",
    desc: "We plan and schedule content weeks in advance around key dates, product launches, and trending moments so nothing goes out last minute. Every post is mapped to a clear content pillar and business objective before it's ever published.",
    tags: ["Editorial calendars", "Content pillars", "Campaign mapping"],
  },
  {
    Icon: Hash,
    category: "Content Strategy",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Hashtag & Trend Research",
    desc: "We research and track trending audio, formats, and hashtags relevant to your niche so your content rides momentum instead of competing against it. This keeps your reach compounding instead of resetting with every algorithm shift.",
    tags: ["Trend monitoring", "Hashtag strategy", "Algorithm-aware posting"],
  },
  {
    Icon: Image,
    category: "Content Strategy",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Content Creation & Design",
    desc: "We design static posts, carousels, and short-form video content in your brand's visual identity. Every asset is created to stop the scroll while staying instantly recognisable as your brand across every platform.",
    tags: ["Graphic design", "Video production", "Brand consistency"],
  },
  {
    Icon: Megaphone,
    category: "Content Strategy",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Brand Voice & Messaging",
    desc: "We define a consistent tone, personality, and messaging framework so every caption and comment sounds unmistakably like your brand. This builds recognition and trust that compounds with every post.",
    tags: ["Voice & tone guidelines", "Caption writing", "Messaging frameworks"],
  },
  {
    Icon: Settings,
    category: "Content Strategy",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.08)",
    title: "Competitor & Industry Analysis",
    desc: "We analyse what's working for competitors and top accounts in your industry to identify content gaps and opportunities. This informs a strategy built on real market data, not guesswork.",
    tags: ["Competitor benchmarking", "Content gap analysis", "Industry trend tracking"],
  },

  // ── Organic Management ──
  {
    Icon: RefreshCw,
    category: "Organic Management",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Daily Posting & Publishing",
    desc: "We handle end-to-end publishing across Instagram, Facebook, LinkedIn, and other platforms at the optimal times for your audience. Consistent posting keeps your brand visible in feeds without you lifting a finger.",
    tags: ["Consistent publishing", "Optimal timing", "Multi-platform scheduling"],
  },
  {
    Icon: Video,
    category: "Organic Management",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Reels & Short-Form Video",
    desc: "We produce and edit Reels, Shorts, and TikTok-style short-form video designed for maximum organic reach. Every video is built with a strong hook in the first 3 seconds and a clear CTA at the end.",
    tags: ["Reels production", "Hook-driven editing", "Native short-form formats"],
  },
  {
    Icon: MessageCircle,
    category: "Organic Management",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Community Management & Replies",
    desc: "We respond to comments and DMs promptly and on-brand, turning casual followers into engaged customers. Fast, thoughtful replies build the kind of trust that algorithms and audiences both reward.",
    tags: ["Comment moderation", "DM management", "Brand-consistent replies"],
  },
  {
    Icon: Eye,
    category: "Organic Management",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Stories & Behind-the-Scenes",
    desc: "We keep your Stories active daily with polls, behind-the-scenes moments, and product highlights that build a more personal connection with your audience between feed posts.",
    tags: ["Daily Stories", "Interactive polls & stickers", "Behind-the-scenes content"],
  },
  {
    Icon: Globe2,
    category: "Organic Management",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Profile Optimisation",
    desc: "We optimise your bio, highlights, link-in-bio, and profile visuals so every new visitor understands what you do and what to do next within seconds of landing on your page.",
    tags: ["Bio & highlights setup", "Link-in-bio optimisation", "First impression design"],
  },
  {
    Icon: LineChart,
    category: "Organic Management",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    title: "Influencer & UGC Coordination",
    desc: "We identify and coordinate with relevant micro-influencers and encourage user-generated content that adds authentic social proof to your feed without the cost of a full influencer campaign.",
    tags: ["Micro-influencer outreach", "UGC collection", "Authentic social proof"],
  },

  // ── Community & Growth ──
  {
    Icon: FlaskConical,
    category: "Community & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Format & Content Testing",
    desc: "We continuously test formats, hooks, and posting times to discover what resonates most with your specific audience. Every test is structured with clear hypotheses before scaling what works.",
    tags: ["A/B content testing", "Hook experimentation", "Performance-led iteration"],
  },
  {
    Icon: TrendingUp,
    category: "Community & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Follower Growth Strategy",
    desc: "We build a genuine follower growth strategy through consistent value-driven content, community engagement, and cross-platform promotion instead of bots or engagement pods that get flagged.",
    tags: ["Organic follower growth", "Cross-platform promotion", "No bots or fake engagement"],
  },
  {
    Icon: BarChart2,
    category: "Community & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Analytics & Performance Reporting",
    desc: "We deliver transparent monthly reports covering reach, engagement rate, follower growth, and top-performing content so you always know exactly what's working and why.",
    tags: ["Engagement rate tracking", "Growth reporting", "Top-content breakdowns"],
  },
  {
    Icon: PieChart,
    category: "Community & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Cross-Promotion & Amplification",
    desc: "We cross-promote your best-performing content across platforms and repurpose long-form content into short-form clips to squeeze maximum reach out of every piece you create.",
    tags: ["Content repurposing", "Cross-platform amplification", "Reach maximisation"],
  },
  {
    Icon: Zap,
    category: "Community & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Real-Time Trend Response",
    desc: "We move fast on relevant trends, audio, and cultural moments while they're still fresh, giving your brand a chance at organic reach spikes that scheduled-only content misses entirely.",
    tags: ["Trend-jacking", "Real-time content", "Reach spike capture"],
  },
  {
    Icon: Users,
    category: "Community & Growth",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Social-to-Sales Funnel Integration",
    desc: "We connect your social presence to your actual sales funnel, whether that's WhatsApp, a landing page, or your online store, so followers convert into real business outcomes, not just vanity metrics.",
    tags: ["WhatsApp integration", "Landing page funnels", "Conversion tracking"],
  },
];

const cardsByTab: Record<string, typeof smmCards> = {
  strategy:   smmCards.filter(c => c.category === "Content Strategy"),
  management: smmCards.filter(c => c.category === "Organic Management"),
  growth:     smmCards.filter(c => c.category === "Community & Growth"),
};

/* ─── Tab Cards Component ─── */
const SMMCardTabs = () => {
  const [activeTab, setActiveTab] = useState("strategy");
  const tab = smmTabs.find(t => t.key === activeTab)!;
  const cards = cardsByTab[activeTab];

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>
            <Hash size={12} /> Social Media Marketing
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2"><span data-cms-key="smm_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Social Media Marketing: Content That Builds a Real Audience</span></h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed"><span data-cms-key="smm_p_23" data-cms-label="Body Text" data-cms-attr="text">We manage the full organic social ecosystem from content strategy and daily publishing to community management and growth all built to turn followers into genuine, engaged customers.</span></p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {smmTabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={
                activeTab === t.key
                  ? { background: t.gradient, color: "#fff", boxShadow: `0 4px 14px ${t.color}40` }
                  : { background: "#F8FAFF", color: "#374151", border: "1.5px solid #E5E7EB" }
              }>
              <span data-cms-key={`smm_tl_${i}_label`} data-cms-label="Tab Label" data-cms-attr="text">{t.label}</span>
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
                <h3 className="text-[15px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`smm_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`smm_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
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
              <span data-cms-key="smm_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Learn More</span> <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ─── Our Work Data ─── */
const ourWork = [
  { type: "image", src: "/work/atul-bakery-mothers-day.jpg", client: "Atul Bakery", tag: "Restaurant & Bakery", caption: "Mother's Day campaign creative" },
  { type: "image", src: "/work/atul-bakery-vada-pav.jpg", client: "Atul Bakery", tag: "Restaurant & Bakery", caption: "Product-led social ad creative" },
  { type: "image", src: "/work/giftcare-tech-collections.jpg", client: "GiftCare", tag: "Gifting & Retail", caption: "Category showcase creative" },
  { type: "image", src: "/work/krisha-hospital-hand-fracture.jpg", client: "Krisha Hospital", tag: "Healthcare", caption: "Patient-education awareness post" },
];

const OurWork = () => (
  <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          style={{ background: "rgba(225,48,108,0.08)", color: igColor, border: "1px solid rgba(225,48,108,0.2)" }}>
          <Image size={12} /> Our Work
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Real Content, Real Clients</h2>
        <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed">A look at the social content and creatives we've produced and run for our clients across industries.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ourWork.map((item, i) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden border group"
            style={{ background: "#fff", borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", background: "#F3F4F6" }}>
              <img
                src={item.src}
                alt={`${item.client} — ${item.caption}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2" style={{ background: "rgba(225,48,108,0.08)", color: igColor }}>
                {item.tag}
              </span>
              <h3 className="text-[14px] font-bold text-[#0A1628] mb-0.5">{item.client}</h3>
              <p className="text-[12.5px] text-[#6B7280] leading-relaxed">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Instagram Reels ─── */
const igReels = [
  { url: "https://www.instagram.com/reel/Dcc5GSSAUa-/", client: "Swastik Gold Alloys" },
  { url: "https://www.instagram.com/reel/Db2v4g1Et6a/", client: "Gift Care" },
  { url: "https://www.instagram.com/reel/DbAQ9D_nUuE/", client: "Star Line Advertising" },
  { url: "https://www.instagram.com/reel/DVNluUuCHk4/", client: "Dr. Karn Maheshwari" },
];

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let igEmbedScriptPromise: Promise<void> | null = null;
const loadInstagramEmbedScript = () => {
  if (!igEmbedScriptPromise) {
    igEmbedScriptPromise = new Promise<void>((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        if (window.instgrm) resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }
  return igEmbedScriptPromise;
};

/* Renders the IG blockquote as static HTML so React never re-reconciles it
   after embed.js replaces its contents with the real player iframe. */
const InstagramReelEmbed = ({ url }: { url: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style="background:#FFF;border:0;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08);margin:0;max-width:340px;min-width:280px;padding:0;width:100%;"></blockquote>`;
    loadInstagramEmbedScript().then(() => window.instgrm?.Embeds.process());
  }, [url]);

  return <div ref={containerRef} className="flex justify-center w-full" />;
};

const InstagramReels = () => {
  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(225,48,108,0.08)", color: igColor, border: "1px solid rgba(225,48,108,0.2)" }}>
            <Video size={12} /> Reels We've Produced
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Watch Our Client Reels in Action</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-[15px] leading-relaxed">Short-form video we've produced and run for real clients — tap any reel to play it right here on Instagram.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {igReels.map((reel, i) => (
            <motion.div
              key={reel.url}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex justify-center"
              style={{ minHeight: 500 }}>
              <InstagramReelEmbed url={reel.url} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Supporting Data ─── */
const toolGroups = [
  { label: "Publishing Platforms", color: "#7C3AED", bg: "rgba(124,58,237,0.08)",  pills: ["Meta Business Suite", "Buffer / Later", "LinkedIn Creator Studio"] },
  { label: "Design & Video",       color: "#E1306C", bg: "rgba(225,48,108,0.08)",  pills: ["Canva Pro", "Adobe Premiere Pro", "CapCut"] },
  { label: "Analytics",            color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  pills: ["Native Platform Insights", "Google Analytics 4", "Sprout Social"] },
  { label: "Reporting",            color: "#6C47FF", bg: "rgba(108,71,255,0.08)",  pills: ["Looker Studio", "Custom Dashboards", "Monthly Reports"] },
];

const approach = [
  "Deep audience & platform research before content goes live",
  "Content pillars aligned to real business objectives",
  "Consistency first a reliable posting cadence beats sporadic virality",
  "Daily community management, not just scheduled posting",
  "Continuous format and creative testing",
  "Monthly reporting with transparent KPIs and clear next steps",
];

const whatWeAchieve = [
  { Icon: Users,       label: "Build a genuinely engaged, growing follower base" },
  { Icon: Megaphone,   label: "Increase brand awareness and recall across platforms" },
  { Icon: MessageCircle, label: "Turn comments and DMs into real conversations & leads" },
  { Icon: TrendingUp,  label: "Grow reach and engagement rate month over month" },
  { Icon: Video,       label: "Produce scroll-stopping Reels and short-form content" },
  { Icon: DollarSign,  label: "Connect organic social to your actual sales funnel" },
];

const results = [
  { Icon: TrendingUp,  text: "Higher reach, impressions, and engagement rate" },
  { Icon: Users,       text: "Consistent, genuine follower growth" },
  { Icon: Gauge,       text: "Stronger brand recall and community loyalty" },
  { Icon: ShieldCheck, text: "A content engine that compounds month over month" },
];

const whyUs = [
  "Platform-native strategy we know what performs on each channel",
  "Full funnel approach: from discovery to community to conversion",
  "Fast-moving trend response most agencies are weeks behind",
  "Transparent reporting every post and metric accounted for",
  "Proven track record growing engaged, not just inflated, follower counts",
  "Strategies tailored to your industry, brand voice, and audience",
];

const faqs = [
  {
    q: "How soon can I see results from social media marketing?",
    a: "You'll typically see engagement improvements within the first 2-3 weeks as content strategy and posting cadence stabilise. Meaningful follower growth and community building usually compound over 60-90 days as the audience and algorithm both respond to consistency.",
  },
  {
    q: "Do you create all the content, or do you need footage from me?",
    a: "We can work entirely from your existing footage and photos, or handle content creation from scratch including design, video editing, and copywriting. For Reels and behind-the-scenes content, raw footage from your team often performs best, and we'll guide you on what to capture.",
  },
  {
    q: "Which platforms do you manage?",
    a: "We manage Instagram, Facebook, LinkedIn, and YouTube Shorts as core platforms, with Pinterest and X (Twitter) available depending on where your audience actually is. We recommend focusing depth on 2-3 platforms rather than spreading thin across everywhere.",
  },
  {
    q: "Is this different from your Meta Ads service?",
    a: "Yes. Social Media Marketing covers organic content, strategy, and community management no ad spend required. Meta Ads is paid advertising on Facebook and Instagram. Many clients run both together since organic builds trust and paid ads scale reach and conversions.",
  },
  {
    q: "How do you measure whether the content is working?",
    a: "We track reach, impressions, engagement rate, follower growth, and where relevant, click-throughs and conversions tied to your actual business goals. Monthly reports give you a clear view of what's working and what we're adjusting next.",
  },
  {
    q: "Can you take over an existing social media account?",
    a: "Absolutely. We audit your existing content performance, brand voice, and community health before making changes. A phased strategy ensures continuity and no disruption to your existing audience during the handover.",
  },
  {
    q: "Do you handle community management and replying to comments?",
    a: "Yes. Daily comment and DM management is included as part of our organic management service, so your community feels heard and your brand stays responsive, which is one of the biggest signals platforms reward with extra reach.",
  },
];

/* ─── Form ─── */
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const SMMAuditForm = () => {
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
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)" }}>
            <CheckCircle2 size={32} className="text-[#7C3AED]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="smm_x13" data-cms-label="Card Heading" data-cms-attr="text">Audit Request Received!</span></h3>
          <p className="text-[#6B7280]"><span data-cms-key="smm_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">We'll review your social media accounts and send your free audit within 24 hours.</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1"><span data-cms-key="smm_x14" data-cms-label="Card Heading" data-cms-attr="text">Request Your Free Social Media Audit</span></h3>
          <p className="text-sm text-[#6B7280] mb-4"><span data-cms-key="smm_p_24" data-cms-label="Body Text" data-cms-attr="text">Fill in your details and we'll get started right away.</span></p>
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
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Website / Instagram Handle *</label>
            <input type="text" name="website" required value={form.website} onChange={handleChange} placeholder="https://yourwebsite.com or @yourhandle" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Primary Social Media Goal *</label>
            <select name="goal" required value={form.goal} onChange={handleChange} className={inputClass + " cursor-pointer"}>
              <option value="" disabled>Select your goal...</option>
              <option>Grow my follower base</option>
              <option>Increase engagement</option>
              <option>Build brand awareness</option>
              <option>Launch a new social presence</option>
              <option>Audit & take over existing accounts</option>
              <option>Turn followers into leads/sales</option>
            </select>
          </div>
          <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
          <button
            type="submit" disabled={!captchaOk}
            className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6d28d9)" }}>
            Get My Free Social Media Audit <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5">
            <Lock size={12} /> 100% free no credit card, no obligation
          </p>
        </form>
      )}
    </div>
  );
};

const smmClients = [
  { name: "Atul Bakery",                  tag: "Food & Bakery",          logo: "/logos/atul-bakery.jpg",                     logoBg: "#fff0f0" },
  { name: "Grand Gift Care",              tag: "Gifting & Retail",       logo: "/logos/grand-gift-care.jpg",                 logoBg: "#f5f8ff" },
  { name: "Grand Bavarchi",               tag: "Restaurant & Events",    logo: "/logos/grand-bavarchi.jpg",                  logoBg: "#0A1628" },
  { name: "Swastik Gold Alloys",          tag: "Jewellery & Alloys",     logo: "/logos/swastik-gold-alloys-square.jpg",      logoBg: "#fffaf0" },
  { name: "Synergy Hospital",             tag: "Healthcare",             logo: "/logos/synergy-hospital.jpg",                logoBg: "#fff0f5" },
  { name: "Track My Ad",                  tag: "AdTech & Verification",  logo: "/logos/track-my-ads-square.jpg",             logoBg: "#f0f5ff" },
  { name: "Aagman Women's Hospital",      tag: "Healthcare",             logo: "/logos/aagman-womens-hospital.jpg",          logoBg: "#fff5f0" },
  { name: "Bharat Invisible Grills",      tag: "Home Safety & Nets",     logo: "/logos/bharat-invisible-grills-nets.jpg",    logoBg: "#0A1628" },
];

const SMMClientSlider = () => {
  const [active, setActive] = useState(0);
  const total = smmClients.length;
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % total), 4000);
    return () => clearInterval(t);
  }, [total]);
  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);
  const c = smmClients[active];
  const pageStart = Math.floor(active / 4) * 4;
  const visible = smmClients.slice(pageStart, pageStart + 4);
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
              <p className="text-sm text-[#6B7280] leading-relaxed">Social media strategy and organic growth delivered by Digital Aura — driving reach, engagement, and real community growth.</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><ChevronLeft size={14} className="text-[#374151]" /></button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><ChevronLeft size={14} className="text-[#374151] rotate-180" /></button>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-xs font-bold text-[#9CA3AF]">{active + 1} / {total}</span>
        <div className="flex gap-1.5">
          {smmClients.map((_, i) => (
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
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`smm_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="smm_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`smm_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

/* ─── Page ─── */
const SocialMediaMarketingPage = () => {
  const sp = useSettings(['smm_hero_h1','smm_hero_sub','smm_cta_btn']);
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
              <Hash size={12} /> Social Media Marketing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="smm_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">{sp.smm_hero_h1 || (<>Build an Audience That<br />
            <span style={{ color: accentColor }}>Actually Converts</span></>)}
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-4 leading-relaxed">
            <span data-cms-key="smm_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">{sp.smm_hero_sub || "We help businesses grow a genuine, engaged social media presence through strategic content, consistent publishing, and active community management across every platform that matters to your audience."}</span>
          </p>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Content Strategy", "Reels & Video", "Community Management", "Growth Strategy", "Multi-Platform", "Analytics & Reporting"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: "linear-gradient(135deg, #7C3AED, #6d28d9)", boxShadow: `0 8px 24px ${accentColor}40` }}>
              <span data-cms-key="smm_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">{sp.smm_cta_btn || "Grow My Social Presence"}</span> <Hash size={15} />
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
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Social Media Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Agency Can Post Content.<br className="hidden md:block" /> Very Few Can Build a Real Community.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most agencies measure success by post count and follower numbers. We measure it by engagement and business impact because vanity metrics don't pay the bills.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Generic content copied across every client", detail: "The same templated posts and captions recycled across dozens of unrelated accounts." },
              { pain: "Vanity metrics with no strategy behind them", detail: "Follower counts reported monthly with no connection to engagement or business goals." },
              { pain: "Scheduled posts with zero community management", detail: "Comments and DMs left unanswered for days, killing the engagement that drives reach." },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your social media agency isn't replying to comments daily and testing new formats, your reach will decline it's not a question of if.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Tab Cards Section ── */}
    <SMMCardTabs />

    {/* ── Our Work ── */}
    <OurWork />

    {/* ── Instagram Reels ── */}
    <InstagramReels />

    {/* ── Our Approach ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="smm_h2lbl_26" data-cms-label="Section Label" data-cms-attr="text">Our Social Media Approach</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="smm_p_25" data-cms-label="Body Text" data-cms-attr="text">Strategy-driven content built around your audience, your platforms, and your business goals.</span></p>
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
            <span className="w-4 h-0.5 rounded-full bg-[#6C47FF]" /> <span data-cms-key="smm_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Tools & Technologies We Use</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm"><span data-cms-key="smm_s12_sub" data-cms-label="Section Subtext" data-cms-attr="text">Advanced publishing, design, and analytics tools to manage and grow every platform effectively.</span></p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolGroups.map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}><span data-cms-key={`smm_g_${i}_label`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span></p>
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
            <span className="w-4 h-0.5 rounded-full bg-[#22C55E]" /> <span data-cms-key="smm_h2lbl_28" data-cms-label="Section Label" data-cms-attr="text">Why Choose Us</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`smm_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="smm_h2lbl_29" data-cms-label="Section Label" data-cms-attr="text">What We Can Achieve for You</span>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="smm_h2lbl_30" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
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
      <BlogInsights />
    </div>

    {/* ── Testimonials ── */}
    <Testimonials />

    {/* ── SMM Client Logos ── */}
    <section className="py-14 px-4 md:px-8" style={{ background: "#fff", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Grown With Social Media</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Clients We've Grown With Social Media Marketing</h2>
        <p className="text-[#6B7280] text-sm max-w-md mx-auto">Real businesses. Real communities. Social growth delivered by Digital Aura.</p>
      </motion.div>
      <div className="max-w-5xl mx-auto">
        <ClientLogoGrid clients={smmClients} accentColor={accentColor} />
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="smm_h2lbl_31" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
    <section id="smm-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #833AB4 50%, #0A1628 100%)" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">Free Social Media Audit</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6"><span data-cms-key="smm_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Get Your Free<br />Social Media Audit & Strategy</span></h2>
            <p className="text-white/80 text-lg mb-8"><span data-cms-key="smm_x16" data-cms-label="Body Text" data-cms-attr="text">We'll audit your social media presence, identify content gaps, and deliver a clear strategy to grow your audience and turn followers into customers completely free, no strings attached.</span></p>
            <div className="space-y-3 mb-8">
              {[
                "Full account audit: content, voice & engagement",
                "Platform-fit & posting cadence check",
                "Content gap analysis & quick wins",
                "Custom social media strategy & content plan",
              ].map(b => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-white font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0" style={{ color: accentColor }}>RM</div>
              <div>
                <p className="text-white text-xs italic"><span data-cms-key="smm_x17" data-cms-label="Body Text" data-cms-attr="text">"Engagement rate more than doubled in 60 days. Our comments finally feel like a real community."</span></p>
                <p className="text-white/70 text-[10px] mt-0.5"><span data-cms-key="smm_x18" data-cms-label="Body Text" data-cms-attr="text">,  Rohan M., Hospitality Brand Owner</span></p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <SMMAuditForm />
          </motion.div>
        </div>
      </div>
    </section>

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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="smm_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="smm_hl_131" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Grow</span> Your <span data-cms-key="smm_hl_132" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Social Media Presence</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="smm_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Social Media Strategy Call. We'll map your audience, review your content approach, and build a strategy designed to deliver genuine growth and engagement.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Free Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="smm_x15" data-cms-label="Fine Print" data-cms-attr="text">No guesswork — Strategy-driven content built to grow what works.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default SocialMediaMarketingPage;
