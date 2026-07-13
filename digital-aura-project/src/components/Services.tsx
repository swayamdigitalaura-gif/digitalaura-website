import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSettings } from "@/hooks/useSettings";
import {
  Bot, Brain, Workflow,
  Globe2, Code2, PenTool,
  ShoppingCart, Store, CreditCard,
  Search, Share2, Target, Megaphone, BarChart3,
  Smartphone, AppWindow, Layers,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import CMSIcon from "@/components/CMSIcon";

type TabKey = "ai" | "web" | "ecommerce" | "marketing" | "mobile";

const tabs: { key: TabKey; label: string; color: string; gradient: string }[] = [
  { key: "ai",        label: "AI & Development",   color: "#7C3AED", gradient: "linear-gradient(135deg,#7C3AED,#6d28d9)" },
  { key: "web",       label: "Web Solutions",       color: "#1A6FE8", gradient: "linear-gradient(135deg,#1A6FE8,#1558c0)" },
  { key: "ecommerce", label: "eCommerce",           color: "#FF6B2B", gradient: "linear-gradient(135deg,#FF6B2B,#e85a1a)" },
  { key: "marketing", label: "Digital Marketing",   color: "#22C55E", gradient: "linear-gradient(135deg,#22C55E,#16a34a)" },
  { key: "mobile",    label: "Mobile Apps",         color: "#EC4899", gradient: "linear-gradient(135deg,#EC4899,#db2777)" },
];

const content: Record<TabKey, { icon: React.ElementType; iconName: string; title: string; desc: string; points: string[]; route?: string }[]> = {
  ai: [
    {
      icon: Bot, iconName: "Bot",
      title: "AI Powered Web Apps",
      desc: "Smart, scalable applications built with AI at the core, from intelligent dashboards to real time data systems.",
      points: ["Custom AI features", "API integrations", "Scalable architecture"],
      route: "/services/ai-powered-web-apps",
    },
    {
      icon: Brain, iconName: "Brain",
      title: "AI Automation Systems",
      desc: "Eliminate repetitive tasks with intelligent workflows that save your team hours every single day.",
      points: ["Custom workflows", "CRM & tool sync", "Error reduction"],
      route: "/services/ai-automation",
    },
    {
      icon: Workflow, iconName: "Workflow",
      title: "AI Chatbots & Assistants",
      desc: "Deploy 24/7 conversational AI that handles queries, qualifies leads, and books appointments automatically.",
      points: ["Lead qualification", "WhatsApp & web", "Human handoff"],
      route: "/services/ai-chatbot-assistant",
    },
  ],
  web: [
    {
      icon: Globe2, iconName: "Globe2",
      title: "Custom Web Development",
      desc: "High performance, SEO ready websites built to convert visitors into leads and sales from day one.",
      points: ["Fast load times", "Mobile first", "SEO optimised"],
      route: "/services/web-app-development",
    },
    {
      icon: Code2, iconName: "Code2",
      title: "Full Stack Development",
      desc: "End to end web applications with robust backends, clean APIs, and pixel perfect frontends.",
      points: ["React / Next.js", "Node & Python", "Cloud deployment"],
      route: "/services/full-stack-development",
    },
    {
      icon: PenTool, iconName: "PenTool",
      title: "WordPress Development",
      desc: "Custom WordPress websites built for speed, SEO, and ease of management, tailored to your brand and business needs.",
      points: ["Custom themes", "Plugin development", "Speed optimisation"],
      route: "/services/wordpress-development",
    },
  ],
  ecommerce: [
    {
      icon: ShoppingCart, iconName: "ShoppingCart",
      title: "Shopify Development",
      desc: "High converting Shopify stores built with custom themes, apps, and checkout optimisation for maximum revenue.",
      points: ["Custom themes", "App integrations", "Checkout optimisation"],
      route: "/services/shopify-development",
    },
    {
      icon: Store, iconName: "Store",
      title: "WooCommerce Development",
      desc: "Powerful, flexible WooCommerce stores built for businesses that need full control and custom eCommerce functionality.",
      points: ["Custom plugins", "Multi currency", "Inventory management"],
      route: "/services/woocommerce-development",
    },
    {
      icon: CreditCard, iconName: "CreditCard",
      title: "BigCommerce Development",
      desc: "Enterprise grade eCommerce on BigCommerce, built for high volume stores that need speed, scale, and flexibility.",
      points: ["Custom themes", "B2B and B2C support", "Multi channel selling"],
      route: "/services/bigcommerce-development",
    },
  ],
  marketing: [
    {
      icon: Search, iconName: "Search",
      title: "SEO & Content Marketing",
      desc: "Rank on page 1 of Google with technical SEO, content strategy, and authoritative link building.",
      points: ["Technical SEO", "Content strategy", "Link building"],
      route: "/services/seo-content-marketing",
    },
    {
      icon: Target, iconName: "Target",
      title: "Google Ads",
      desc: "Data driven Google campaigns, Search, Display, and Shopping ads that deliver high quality leads at the lowest possible cost.",
      points: ["Search & Display ads", "Shopping campaigns", "ROI focused bidding"],
      route: "/services/google-ads",
    },
    {
      icon: Share2, iconName: "Share2",
      title: "Meta Ads",
      desc: "High converting Facebook & Instagram ad campaigns targeting the right audience to generate consistent leads and sales.",
      points: ["Facebook & Instagram", "Audience targeting", "Creative A/B testing"],
      route: "/services/meta-ads",
    },
  ],
  mobile: [
    {
      icon: Smartphone, iconName: "Smartphone",
      title: "Android Development",
      desc: "Native Android apps built with Kotlin and Jetpack Compose, optimised for the Google ecosystem and every Android device.",
      points: ["Kotlin & Jetpack Compose", "Google Play Store launch", "Material Design UI"],
      route: "/services/mobile-app-development?type=android",
    },
    {
      icon: AppWindow,
      iconName: "AppWindow",
      title: "Flutter Apps",
      desc: "One codebase, two platforms. Flutter delivers pixel perfect iOS and Android apps with 60fps performance and fast release cycles.",
      points: ["iOS & Android from one codebase", "60fps smooth performance", "Faster time to market"],
      route: "/services/mobile-app-development?type=flutter",
    },
    {
      icon: Layers, iconName: "Layers",
      title: "React Native Apps",
      desc: "JavaScript powered native apps used by Facebook, Shopify and Airbnb. Share logic across platforms while preserving a truly native feel.",
      points: ["Shared JS codebase", "Native UI components", "Large ecosystem support"],
      route: "/services/mobile-app-development?type=reactnative",
    },
  ],
};

const Services = () => {
  const s = useSettings(['home_services_badge', 'home_services_heading', 'home_services_subtext']);
  const [tab, setTab] = useState<TabKey>("ai");
  const navigate = useNavigate();
  const activeTab = tabs.find(t => t.key === tab)!;

  return (
    <section id="services" className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="section-badge" data-cms-key="home_services_badge" data-cms-label="Services Badge" data-cms-attr="text">{s.home_services_badge || 'What We Do'}</span>
          <h2 className="text-3xl md:text-[40px] font-bold text-[#0A1628] tracking-tight mb-3" data-cms-key="home_services_heading" data-cms-label="Services Heading" data-cms-attr="text">
            {s.home_services_heading || 'One Agency, Every Solution'}
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto" data-cms-key="home_services_subtext" data-cms-label="Services Subtext" data-cms-attr="text">
            {s.home_services_subtext || 'From AI powered web solutions and apps to performance marketing, we build, automate, and grow your business.'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center px-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:scale-105"
                style={
                  tab === t.key
                    ? { background: t.gradient, color: "#fff", boxShadow: `0 4px 14px ${t.color}40` }
                    : { background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className={`grid gap-5 mb-8 ${content[tab].length > 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}
          >
            {content[tab].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => s.route && navigate(s.route)}
                className="group bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200"
                style={{
                  borderColor: "#E5E7EB",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  cursor: s.route ? "pointer" : "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px ${activeTab.color}20`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = activeTab.color + "40";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB";
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${activeTab.color}12` }}>
                  <CMSIcon cmsKey={`svc_icon_${i}`} cmsLabel={`${s.title} Icon`} name={s.iconName} size={20} color={activeTab.color} />
                </div>
                <h3 className="font-bold text-[#0A1628] mb-2 text-[17px]">{s.title}</h3>
                <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: activeTab.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
                {s.route && (
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: activeTab.color }}>
                    Learn more <ArrowRight size={14} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
            style={{ background: activeTab.gradient, boxShadow: `0 4px 16px ${activeTab.color}35` }}
          >
            View All Services <ArrowRight size={15} />
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative"
          >
            {/* Animated glow ring */}
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(124,58,237,0.4)",
                  "0 0 0 8px rgba(255,107,43,0.15)",
                  "0 0 0 0px rgba(26,111,232,0.0)",
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all animate-gradient-shift"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #FF6B2B, #1A6FE8, #7C3AED)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
              }}
            >
              Get Growth Plan <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Services;
