import React from "react";
import ClientLogoSection from "@/components/ClientLogoSection";
import { motion, AnimatePresence } from "framer-motion";
import MathCaptcha from "@/components/MathCaptcha";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import {
  ArrowRight, Smartphone, MonitorSmartphone, Layers, Code2, Palette, Globe2, 
  Target, Shield, Rocket, Settings, CheckCircle2, Database, Users, Lock, ChevronDown, Check,
  ShoppingBag, Heart, DollarSign, Truck, Building, Zap
} from "lucide-react";

const accentColor = "#1A6FE8";
const glowColor = "rgba(26,111,232,0.15)";
const accentBg = "rgba(26,111,232,0.08)";
const accentGradient = "linear-gradient(135deg, #1A6FE8 0%, #1558c0 100%)";

/* ─── TYPE-SPECIFIC HERO DATA ─── */
const typeHero: Record<string, { badge: string; icon: React.ElementType; title: string; subtitle: string; tags: string[]; color: string }> = {
  android: {
    badge: "Android Development",
    icon: Smartphone, iconName: "Smartphone",
    title: "Native Android Apps\nBuilt to Perform.",
    subtitle: "We build high performance Android apps with Kotlin and Jetpack Compose, optimised for every Android device, fast, secure, and ready for the Google Play Store.",
    tags: ["Kotlin", "Jetpack Compose", "Material Design", "Google Play Store"],
    color: "#3DDC84",
  },
  flutter: {
    badge: "Flutter Development",
    icon: Layers, iconName: "Layers",
    title: "One Codebase.\nTwo Platforms. Native Feel.",
    subtitle: "Flutter delivers pixel perfect iOS and Android apps from a single codebase, with 60fps performance, fast release cycles, and a truly native user experience.",
    tags: ["Flutter", "Dart", "iOS & Android", "60fps Performance"],
    color: "#54C5F8",
  },
  reactnative: {
    badge: "React Native Development",
    icon: Layers, iconName: "Layers",
    title: "React Native Apps\nTrusted by the Best.",
    subtitle: "JavaScript powered native apps trusted by Facebook, Shopify and Airbnb. Share logic across platforms while preserving a truly native look, feel and performance.",
    tags: ["React Native", "JavaScript", "iOS & Android", "Native UI"],
    color: "#61DAFB",
  },
};

/* ─── TYPE-SPECIFIC CONTENT ─── */
const typeServices: Record<string, { title: string; icon: React.ElementType; iconName: string; desc: string }[]> = {
  android: [
    { title: "Kotlin & Jetpack Compose", icon: Smartphone, iconName: "Smartphone", desc: "Modern Android development using Kotlin and Jetpack Compose for declarative, performant UIs that feel native on every device." },
    { title: "Google Play Store Launch", icon: Rocket, iconName: "Rocket", desc: "End to end Play Store submission including app signing, metadata, compliance checks, privacy policies, and review management." },
    { title: "Material Design UI", icon: Palette, iconName: "Palette", desc: "Pixel perfect Material Design 3 interfaces that follow Google's latest guidelines for intuitive, beautiful Android experiences." },
    { title: "Offline First Architecture", icon: Database, iconName: "Database", desc: "Local first data layers using Room and WorkManager that sync intelligently when connectivity returns, critical for field and enterprise users." },
    { title: "Push Notifications & FCM", icon: Zap, iconName: "Zap", desc: "Firebase Cloud Messaging integration for targeted push notifications, in-app messaging, and real time alerts that drive re-engagement." },
    { title: "Android Security Hardening", icon: Shield, iconName: "Shield", desc: "Biometric authentication, encrypted local storage, certificate pinning, and Play Integrity API checks to keep your app and users safe." },
  ],
  flutter: [
    { title: "Single Codebase, Two Platforms", icon: Layers, iconName: "Layers", desc: "One Flutter codebase ships to both iOS and Android, cutting development time and cost in half while maintaining a truly native feel." },
    { title: "60fps Smooth Performance", icon: Zap, iconName: "Zap", desc: "Flutter's Skia and Impeller rendering engines deliver buttery smooth 60fps animations and transitions on every device, low end or flagship." },
    { title: "Custom Widget Library", icon: Palette, iconName: "Palette", desc: "Fully custom UI widgets built in Flutter that match your brand pixel perfectly, far beyond what standard component libraries offer." },
    { title: "Firebase & Supabase Integration", icon: Database, iconName: "Database", desc: "Real time databases, authentication, cloud storage, and serverless functions integrated directly into your Flutter app from day one." },
    { title: "App Store & Play Store Launch", icon: Rocket, iconName: "Rocket", desc: "Complete submission handling for both Apple App Store and Google Play Store, including compliance, metadata, and review management." },
    { title: "Flutter Web & Desktop", icon: Globe2, iconName: "Globe2", desc: "Extend your Flutter app to web and desktop with the same codebase, giving you a unified product across every platform your users are on." },
  ],
  reactnative: [
    { title: "React Native Core Architecture", icon: Code2, iconName: "Code2", desc: "Production grade React Native apps using the new architecture with JSI and Fabric renderer for near-native performance and faster bridge communication." },
    { title: "Native Module Bridging", icon: Settings, iconName: "Settings", desc: "Custom native modules written in Swift and Kotlin bridged into React Native when you need deep hardware access, camera, Bluetooth, or biometrics." },
    { title: "Expo & Bare Workflow", icon: Layers, iconName: "Layers", desc: "We choose the right workflow for your project. Expo for fast iteration and OTA updates, bare workflow for maximum native control and performance." },
    { title: "State Management at Scale", icon: Database, iconName: "Database", desc: "Redux Toolkit, Zustand, or React Query configured for your data complexity, keeping your app fast and predictable as it grows." },
    { title: "Over the Air Updates", icon: Zap, iconName: "Zap", desc: "CodePush and Expo Updates integration so you can ship bug fixes and content changes instantly without waiting for App Store review cycles." },
    { title: "Cross Platform Testing", icon: Shield, iconName: "Shield", desc: "Detox end to end testing, Jest unit tests, and real device testing across iOS and Android to catch issues before your users do." },
  ],
};

const typeWhyChoose: Record<string, { title: string; icon: React.ElementType; iconName: string; desc: string }[]> = {
  android: [
    { title: "Android Specialists", icon: Smartphone, iconName: "Smartphone", desc: "We build exclusively for the Android ecosystem, deep knowledge of fragmentation, device profiles, and Google Play policies." },
    { title: "Kotlin First", icon: Zap, iconName: "Zap", desc: "100% Kotlin codebases with Jetpack Compose, no legacy Java tech debt. Clean, modern, and maintainable from day one." },
    { title: "Retention Focused", icon: Target, iconName: "Target", desc: "We measure success by DAU, retention curves, and Play Store ratings, not just lines of code shipped." },
  ],
  flutter: [
    { title: "50% Faster Delivery", icon: Zap, iconName: "Zap", desc: "One codebase for iOS and Android means half the build time and cost compared to separate native teams." },
    { title: "Pixel Perfect UI", icon: Palette, iconName: "Palette", desc: "Flutter gives us complete control over every pixel. Your brand is rendered identically on every device and OS version." },
    { title: "Future Proof Stack", icon: Rocket, iconName: "Rocket", desc: "Flutter is backed by Google and used by BMW, eBay, and Alibaba. You're building on a stack with a long runway." },
  ],
  reactnative: [
    { title: "Proven at Scale", icon: Rocket, iconName: "Rocket", desc: "React Native powers Facebook, Instagram, Shopify, and Airbnb. We bring that same engineering rigour to your product." },
    { title: "JS Team Friendly", icon: Code2, iconName: "Code2", desc: "If your team knows JavaScript or React, they can own and maintain the codebase. No new language to learn." },
    { title: "OTA Updates", icon: Zap, iconName: "Zap", desc: "Push bug fixes and feature updates directly to users without App Store review delays using CodePush or Expo Updates." },
  ],
};

/* ─── DATA ─── */
const servicesList = [
  { title: "Android App Development", icon: Smartphone, iconName: "Smartphone", href: "/contact", desc: "Native Android apps built with Kotlin and Jetpack Compose, optimised for performance, security, and every Android device on the market." },
  { title: "iOS App Development", icon: MonitorSmartphone, iconName: "MonitorSmartphone", href: "/contact", desc: "Polished, App Store ready iOS apps built with Swift and SwiftUI, designed to Apple HIG standards with smooth, native interactions." },
  { title: "Flutter Apps", icon: Layers, iconName: "Layers", href: "/contact", desc: "One codebase, two platforms. Flutter delivers pixel perfect iOS and Android apps with 60fps performance and fast release cycles." },
  { title: "React Native Apps", icon: Code2, iconName: "Code2", href: "/contact", desc: "JavaScript powered native apps trusted by Facebook, Shopify and Airbnb. Share logic across platforms while preserving a truly native feel." },
  { title: "App UI/UX Design", icon: Palette, iconName: "Palette", href: "/contact", desc: "Figma first prototyping and design systems mapped to Apple HIG and Google Material guidelines, built for retention and usability." },
  { title: "App Modernization", icon: Globe2, iconName: "Globe2", href: "/contact", desc: "Transform legacy mobile apps into modern, scalable products with clean architecture, updated tech stacks, and zero disruption to production." }
];

const industries = [
  { label: "eCommerce & Retail", icon: ShoppingBag, iconName: "ShoppingBag", desc: "Personalised shopping experiences, complex cart logic, and inventory synchronisation." },
  { label: "Health & Telemedicine", icon: Heart, iconName: "Heart", desc: "HIPAA compliant patient portals, video consultation pipelines, and booking systems." },
  { label: "Fintech & Banking", icon: DollarSign, iconName: "DollarSign", desc: "Biometric security, KYC workflows, and lightning-fast payment gateway integrations." },
  { label: "On-Demand & Logistics", icon: Truck, iconName: "Truck", desc: "Live GPS tracking, smart map dispatching, and multi-user interaction systems." },
  { label: "B2B Enterprise", icon: Building, iconName: "Building", desc: "Internal sales tools, field rep tracking, offline databases, and CRM syncing." }
];

const whyChoose = [
  { title: "30-Day MVP Delivery", icon: Zap, iconName: "Zap", desc: "We validate ideas quickly. Our rapid prototyping ships functional MVPs to early users fast." },
  { title: "Scalable Architectures", icon: Rocket, iconName: "Rocket", desc: "We architect backends using serverless technology ready for 1M+ users from day one." },
  { title: "Business Driven Focus", icon: Target, iconName: "Target", desc: "We measure success by retention, daily active users, and revenue, never just lines of code." }
];

const adoptionRoadmap = [
  { phase: "Requirement & UX Architecture", duration: "Phase 1", details: "Deep dive into your business goals, user personas, and technical requirements to define the perfect scope before writing a line of code." },
  { phase: "Agile Development Sprints", duration: "Phase 2", details: "Sprint-based development incorporating daily standups and a staging environment you can access at any time." },
  { phase: "Security & QA Testing", duration: "Phase 3", details: "Automated test suites, device-farm regression testing, and security penetration testing ensuring zero critical bugs." },
  { phase: "Launch & App Store Scaling", duration: "Phase 4", details: "App Store and Google Play Store submission handled end to end, unlocking ongoing monitoring and infrastructure scaling." }
];

const ecosystem = [
  "Mobile Frameworks (Flutter, React Native, Swift, Kotlin)",
  "Backend & APIs (Node.js, Firebase, Supabase, GraphQL)",
  "On-Device AI (Core ML, TensorFlow Lite)",
  "DevOps (GitHub Actions, Fastlane, TestFlight)"
];

const failurePillars = [
  "Bloated Codebases: Native layers patched haphazardly causing rapid battery drain.",
  "Offline Blindspots: Apps that completely break the second the user drops connectivity.",
  "Poor State Management: UI jitter and inconsistent local cache updates confusing users."
];

const faqs = [
  { q: "Should we build native or cross platform (Flutter/React Native)?", a: "It depends strictly on your use case. If you need deep hardware integration (like AR or complex Bluetooth), native is best. For 90% of business and e-commerce apps, cross platform slashes development cost by 40% while maintaining native-level performance." },
  { q: "Do you handle App Store and Play Store rejections?", a: "Yes. Our team handles the entire submission process, including metadata, compliance checks, and privacy policies. If Apple or Google requests changes, we manage the appeals and updates." },
  { q: "Who owns the source code once the app is complete?", a: "You do. We provide 100% intellectual property ownership and cleanly documented source code upon project completion." },
  { q: "How do you handle offline functionality?", a: "We build local-first data layers using SQLite or WatermelonDB that sync intelligently when connectivity returns crucial for field, logistics, and enterprise users." }
];

/* ─── COMPONENTS ─── */
const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${accentColor}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`mobileapp_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="mobileapp_icon_3" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accentColor} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`mobileapp_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-[#0A1628] outline-none focus:ring-2 focus:ring-[#1A6FE8] transition-all placeholder-[#9CA3AF] border border-[#E5E7EB] bg-[#F8FAFF] focus:bg-white";

const AppAuditForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: accentBg }}>
            <CMSIcon cmsKey="mobileapp_icon_1" cmsLabel="CheckCircle2 Icon" name="CheckCircle2" size={32} color={accentColor} />
          </div>
          <h3 className="text-xl font-bold text-[#0A1628] mb-2"><span data-cms-key="mobileapp_x12" data-cms-label="Card Heading" data-cms-attr="text">Request Received!</span></h3>
          <p className="text-[#6B7280]"><span data-cms-key="mobileapp_s11_sub" data-cms-label="Section Subtext" data-cms-attr="text">Our mobile architects will review your context and contact you within 24 hours.</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-[#0A1628] mb-1"><span data-cms-key="mobileapp_x13" data-cms-label="Card Heading" data-cms-attr="text">Get Your Free App Consultation</span></h3>
          <p className="text-sm text-[#6B7280] mb-4"><span data-cms-key="mobileapp_p_27" data-cms-label="Body Text" data-cms-attr="text">Tell us about your app idea to evaluate technical feasibility.</span></p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">First Name *</label>
              <input required placeholder="John" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Email Address *</label>
              <input type="email" required placeholder="john@company.com" className={inputClass} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Target Platform *</label>
              <select required defaultValue="" className={inputClass + " cursor-pointer text-[#4B5563]"}>
                <option value="" disabled>Select platform...</option>
                <option>iOS Only</option>
                <option>Android Only</option>
                <option>Cross Platform (Both)</option>
                <option>Undecided</option>
              </select>
            </div>
            <div>
               <label className="text-xs font-semibold text-[#374151] mb-1.5 block">App Category *</label>
               <select required defaultValue="" className={inputClass + " cursor-pointer text-[#4B5563]"}>
                 <option value="" disabled>Select category...</option>
                 <option>eCommerce / Marketplace</option>
                 <option>SaaS / Business Tool</option>
                 <option>On-Demand / Delivery</option>
                 <option>Fintech / Social</option>
                 <option>Other</option>
               </select>
            </div>
          </div>
          <MathCaptcha onVerify={setCaptchaOk} inputClass={inputClass} />
          <button type="submit" disabled={!captchaOk} className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: accentGradient }}>
            Book Strategy Call <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1.5 mt-2">
            <Lock size={12} /> 100% free. No commitment required.
          </p>
        </form>
      )}
    </div>
  );
};

/* ─── PAGE MAP ─── */
const MobileAppDevPage = () => {
  const _sp = useSettings(["mobileapp_hero_h1","mobileapp_hero_sub","mobileapp_cta_btn"]);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "";
  const hero = typeHero[type];
  const activeServices = typeServices[type] || servicesList;
  const activeWhyChoose = typeWhyChoose[type] || whyChoose;

  return (
  <PageLayout>
    {/* ── Hero ── */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "-5%", background: "radial-gradient(circle, rgba(234,67,53,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accentColor }}>← Back to All Services</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: accentBg, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <Smartphone size={12} /> {hero ? hero.badge : "Mobile Development"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="mobileapp_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">{hero ? hero.title.split("\n").map((line, i) => (
              <span key={i}>{i > 0 && <br />}{i === 1 ? <span style={{ color: accentColor }}>{line}</span> : line}</span>
            )) : (<>Design Apps That Scale.<br /><span style={{ color: accentColor }}>Build for Retention.</span></>)}
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-3xl mx-auto mb-8 leading-relaxed">
            <span data-cms-key="mobileapp_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">{hero ? hero.subtitle : "We build Android, iOS, and cross platform apps crafted for performance. From rigorous state management to offline first architectures, we ship applications users actually keep."}</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(hero ? hero.tags : ["React Native", "Flutter", "Swift", "Kotlin", "Offline First"]).map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentBg, color: accentColor, border: `1px solid ${accentColor}30` }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3 hover:shadow-lg"
              style={{ background: accentGradient }}>
              <span data-cms-key="mobileapp_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Request App Architecture Audit</span> <ArrowRight size={15} />
            </Link>
            <a href="#services-list" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>Our Capabilities</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Specialized Practices (Services List) ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="mobileapp_h2lbl_30" data-cms-label="Section Label" data-cms-attr="text">App Development Capabilities</span>
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg"><span data-cms-key="mobileapp_p_28" data-cms-label="Body Text" data-cms-attr="text">Explore our end to end mobile development services, from native to cross platform ecosystems.</span></p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeServices.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white border rounded-2xl p-6 hover:-translate-y-1 transition-all h-full flex flex-col group shadow-sm" style={{ borderColor: "#E5E7EB" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0" style={{ background: accentBg }}>
                <CMSIcon cmsKey={`mobileapp_svc_icon_${i}`} cmsLabel={`${service.title} Icon`} name={service.iconName} size={22} color={accentColor} />
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2"><span data-cms-key={`mobileapp_svc2_${i}_t`} data-cms-label="service title" data-cms-attr="text">{service.title}</span></h3>
              <p className="text-[13.5px] text-[#6B7280] mb-5 leading-relaxed flex-grow"><span data-cms-key={`mobileapp_svc2_${i}_d`} data-cms-label="service desc" data-cms-attr="text">{service.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Engineering Philosophy & Ecosystem ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="mobileapp_h2lbl_31" data-cms-label="Section Label" data-cms-attr="text">Development Philosophy</span>
          </h2>
          <h3 className="text-2xl font-bold text-[#0A1628] mb-4"><span data-cms-key="mobileapp_x14" data-cms-label="Card Heading" data-cms-attr="text">How We Build for Scale.</span></h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-6"><span data-cms-key="mobileapp_s12_sub" data-cms-label="Section Subtext" data-cms-attr="text">We don't build temporary wrappers. We architect native-feeling, high performance interfaces tightly coupled with robust backends and analytics.</span></p>
          <ul className="space-y-3">
            {failurePillars.map(w => (
              <li key={w} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-[14px] text-[#374151] font-medium leading-snug">{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="mobileapp_h2lbl_32" data-cms-label="Section Label" data-cms-attr="text">The Application Ecosystem</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {ecosystem.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentBg }}>
                  <CMSIcon cmsKey="mobileapp_icon_2" cmsLabel="Database Icon" name="Database" size={15} color={accentColor} />
                </div>
                <span className="text-[14px] text-[#374151] font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t flex items-center justify-between text-xs font-bold text-[#6B7280] uppercase tracking-wider" style={{ borderColor: "#E5E7EB" }}>
             <span>Sub-2s Load Times</span>
             <span>Offline-First</span>
             <span>WCAG 2.1 AA</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Roadmap ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="mobileapp_h2lbl_33" data-cms-label="Section Label" data-cms-attr="text">App Delivery Roadmap</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {adoptionRoadmap.map((r, i) => (
            <motion.div key={r.phase} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ background: "#fff", border: `1px solid ${accentColor}20`, boxShadow: `0 4px 20px ${accentColor}08` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: accentBg, color: accentColor }}>
                {i + 1}
              </div>
              <h3 className="text-[15px] font-bold text-[#0A1628]"><span data-cms-key={`mobileapp_r_${i}_phase`} data-cms-label="Phase" data-cms-attr="text">{r.phase}</span></h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed"><span data-cms-key={`mobileapp_r_${i}_details`} data-cms-label="Phase Details" data-cms-attr="text">{r.details}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Industries ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
           <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="mobileapp_h2lbl_34" data-cms-label="Section Label" data-cms-attr="text">Industries We Develop For</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-5 gap-3">
           {industries.map((ind, i) => (
             <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
               className="p-5 rounded-2xl border" style={{ background: "#F8FAFF", borderColor: "#E5E7EB" }}>
               <CMSIcon cmsKey={`mobileapp_ind_icon_${i}`} cmsLabel={`${ind.label} Icon`} name={ind.iconName} size={20} color={accentColor} />
               <h3 className="text-[14px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`mobileapp_ind_${i}_label`} data-cms-label="Industry Label" data-cms-attr="text">{ind.label}</span></h3>
               <p className="text-[12px] text-[#6B7280] leading-relaxed"><span data-cms-key={`mobileapp_ind_${i}_desc`} data-cms-label="Industry Desc" data-cms-attr="text">{ind.desc}</span></p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>

    {/* ── Why Choose Us ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="mobileapp_h2lbl_adv" data-cms-label="Section Label" data-cms-attr="text">The Digital Aura Advantage</span> <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} />
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {activeWhyChoose.map((model, i) => (
             <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
               className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: "#E5E7EB" }}>
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: accentBg }}>
                 <CMSIcon cmsKey={`mobileapp_why_icon_${i}`} cmsLabel={`${model.title} Icon`} name={model.iconName} size={22} color={accentColor} />
               </div>
               <h3 className="text-lg font-bold text-[#0A1628] mb-3"><span data-cms-key={`mobileapp_model_${i}_title`} data-cms-label="Model Title" data-cms-attr="text">{model.title}</span></h3>
               <p className="text-[#6B7280] text-[14px] leading-relaxed"><span data-cms-key={`mobileapp_model_${i}_desc`} data-cms-label="Model Desc" data-cms-attr="text">{model.desc}</span></p>
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

    {/* ── FAQ ── */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accentColor }} /> <span data-cms-key="mobileapp_h2lbl_35" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
    <section id="app-audit" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1A6FE8 0%, #1558c0 40%, #0A1628 100%)" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white">Free App Strategy Session</span>
            <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight mb-6"><span data-cms-key="mobileapp_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Concept to App Store<br />in 60 Days</span></h2>
            <p className="text-white/80 text-lg mb-8"><span data-cms-key="mobileapp_x16" data-cms-label="Body Text" data-cms-attr="text">Stop guessing at app development costs and timelines. Send us your requirements, and we will scope an exact technical blueprint.</span></p>
            <div className="space-y-3 mb-8">
              {[
                "Architecture audit & feasibility assessment",
                "Cross Platform vs Native cost breakdown",
                "UI/UX preliminary wireframing scope",
                "Full App Store launch roadmap",
              ].map(b => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white shrink-0" />
                  <span className="text-white font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0" style={{ color: accentColor }}>SH</div>
              <div>
                <p className="text-white text-xs italic"><span data-cms-key="mobileapp_x17" data-cms-label="Body Text" data-cms-attr="text">"They handled everything from Firebase to Apple Review. Flawless execution."</span></p>
                <p className="text-white/70 text-[10px] mt-0.5"><span data-cms-key="mobileapp_x18" data-cms-label="Body Text" data-cms-attr="text">,  Sam H., Founder</span></p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <AppAuditForm />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Clients We've Grown */}
    <ClientLogoSection servicePage="mobile-app-development" accentColor="#1A6FE8" heading="Brands Using Our Mobile App Solutions" fallback={[
      { name: "Track My Ads", tag: "AdTech", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E", logoBg: "#f0f8ff" },
      { name: "Gleekey", tag: "EdTech", logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png", logoBg: "#f5f0ff" },
    ]} />

    {/* ── CTA Banner ── */}
    <section className="py-20 px-4 md:px-8" style={{ background: accentGradient }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="mobileapp_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready to Build Your Application?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="mobileapp_p_29" data-cms-label="Body Text" data-cms-attr="text">Schedule a technical discovery session with our Lead Mobile Developers. We'll map out precisely how to bring your product to life.</span></p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accentColor }}>
            Book Discovery Session <Target size={16} />
          </Link>
        </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="mobileapp_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="mobileapp_hl_136" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Launch</span> Your <span data-cms-key="mobileapp_hl_137" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Mobile App</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="mobileapp_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free App Discovery Call. We'll map your app requirements, recommend the right platform approach, and give you a clear picture of what a mobile build with Digital Aura looks like.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My App Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="mobileapp_x15" data-cms-label="Fine Print" data-cms-attr="text">No cookie cutter apps — A custom mobile experience built for your users from the ground up.</span></p>
        </motion.div>
      </div>
    </section>

  </PageLayout>
  );
};

export default MobileAppDevPage;



