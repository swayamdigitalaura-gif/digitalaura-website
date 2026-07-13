import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Code2, Settings, Layers, Database, Zap, Shield, ChevronDown, Target, Rocket, Smartphone } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ClientLogoSection from "@/components/ClientLogoSection";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";

const accent = "#8B5CF6";
const accentBg = "rgba(139,92,246,0.10)";
const accentBorder = "rgba(139,92,246,0.25)";

const services = [
  { icon: Code2,     title: "React Native Core Architecture",  desc: "Production grade React Native apps using the new architecture with JSI and Fabric renderer for near-native performance and faster bridge communication." },
  { icon: Settings,  title: "Native Module Bridging",          desc: "Custom native modules in Swift and Kotlin bridged into React Native when you need deep hardware access — camera, Bluetooth, or biometrics." },
  { icon: Layers,    title: "Expo & Bare Workflow",            desc: "We choose the right workflow for your project — Expo for fast iteration and OTA updates, bare workflow for maximum native control and performance." },
  { icon: Database,  title: "State Management at Scale",       desc: "Redux Toolkit, Zustand, or React Query configured for your data complexity — keeping your app fast and predictable as it grows." },
  { icon: Zap,       title: "Over the Air Updates",           desc: "CodePush and Expo Updates integration so you can ship bug fixes and content changes instantly without waiting for App Store review cycles." },
  { icon: Shield,    title: "Cross Platform Testing",          desc: "Detox end to end testing, Jest unit tests, and real device testing across iOS and Android to catch issues before your users do." },
];

const process = [
  { n: "01", title: "Discovery & Architecture",  time: "Week 1–2",  desc: "We assess your requirements and choose between Expo, bare, or custom native modules. Architecture decisions are made upfront — not midway through the build." },
  { n: "02", title: "Design & Component System", time: "Week 3–4",  desc: "A shared React Native component library and Figma design handoff that works consistently on iOS and Android without platform-specific workarounds." },
  { n: "03", title: "Development Sprints",       time: "Week 5–10", desc: "Sprint-based JavaScript development with CodePush OTA updates enabled from day one. Test on both platforms throughout the build." },
  { n: "04", title: "QA, Launch & OTA Support",  time: "Week 11+",  desc: "Detox automated testing, real device QA on both platforms, App Store and Play Store submissions, and post-launch OTA update infrastructure." },
];

const whyUs = [
  { icon: Rocket,    title: "Proven at Scale",        desc: "React Native powers Facebook, Instagram, Shopify, and Airbnb. We bring that same engineering rigour to your product." },
  { icon: Code2,     title: "JS Team Friendly",       desc: "If your team knows JavaScript or React, they can own and maintain the codebase. No new language to learn after handover." },
  { icon: Zap,       title: "OTA Updates",            desc: "Push bug fixes and feature updates directly to users without App Store review delays using CodePush or Expo Updates." },
  { icon: Layers,    title: "New Architecture Ready", desc: "We build on the new React Native architecture with JSI and Fabric — faster bridge, better performance, future-proof foundation." },
  { icon: Shield,    title: "Native When It Matters", desc: "We write Swift and Kotlin native modules for anything requiring deep hardware access — no compromise on capability when it counts." },
  { icon: Target,    title: "Business Outcome Focus", desc: "We measure success by retention, daily active users, and revenue — not story points or lines of code delivered." },
];

const faqs = [
  { q: "Is React Native still a good choice in 2025?", a: "Yes. The new React Native architecture (JSI + Fabric) has closed most of the performance gap with native. It's trusted in production by Shopify, Microsoft, and Meta. For most business and consumer apps it delivers native-quality performance at significantly lower cost and faster delivery time." },
  { q: "React Native vs Flutter — which should we choose?", a: "React Native is typically better if your team has existing JavaScript/React expertise, you need rapid OTA updates without App Store review, or you're integrating heavily with JavaScript-based tooling. Flutter is often better for highly visual, animation-heavy apps. We'll advise based on your specific use case." },
  { q: "How does OTA updating work?", a: "We integrate CodePush (for bare workflow) or Expo Updates so you can push JavaScript bundle updates directly to your users' devices without submitting a new App Store or Play Store release. Critical for bug fixes, content updates, and rapid iteration post-launch." },
  { q: "Can you access native device features like camera, Bluetooth, biometrics?", a: "Yes. For anything not covered by community libraries, we write custom native modules in Swift (iOS) and Kotlin (Android) that are bridged into React Native. Deep hardware access is never a blocker." },
  { q: "Who owns the code after the project is done?", a: "You own 100% of the codebase — JavaScript, native modules, and assets — on final delivery. We hand over clean, documented code your team can maintain and extend independently." },
];

const FAQItem = ({ q, a, i }: { q: string; a: string; i: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all" style={{ borderColor: open ? `${accent}50` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
        <span className="text-[15px] font-semibold text-[#0A1628]">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown size={18} style={{ color: accent }} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
};

const ReactNativeAppsPage = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-5%", background: "radial-gradient(circle,rgba(26,111,232,0.06) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}>
              <Smartphone size={12} /> React Native Development
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            React Native Apps<br /><span style={{ color: accent }}>Trusted by the Best.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            JavaScript powered native apps trusted by Facebook, Shopify, and Airbnb. Share logic across platforms while preserving a truly native look, feel, and performance.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["React Native", "JavaScript", "iOS & Android", "Native UI", "Expo / Bare", "OTA Updates"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3 hover:opacity-90"
              style={{ background: `linear-gradient(135deg,${accent},#6d28d9)`, boxShadow: `0 8px 24px rgba(139,92,246,0.35)` }}>
              Start My React Native App <ArrowRight size={15} />
            </Link>
            <a href="#capabilities" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all" style={{ borderColor: "#0A1628" }}>
              Our Capabilities
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Agency Comparison */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical App Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Dev Shop Can Build in React Native.<br className="hidden md:block" /> Very Few Can Build Something Users Love.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most React Native agencies focus on shipping cross-platform fast. We focus on building apps that feel native on both iOS and Android — with the performance architecture to prove it.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "React Native apps that feel like web apps", detail: "Sluggish navigation, non-native gestures, and UI that doesn't belong on either platform." },
              { pain: "Old bridge architecture with slow performance", detail: "Still using the legacy bridge — causing frame drops, janky animations, and slow startup." },
              { pain: "No OTA update strategy after launch", detail: "Every bug fix requires a full App Store submission cycle with no emergency patching capability." },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your React Native app isn't running on the new JSI and Fabric architecture, you're building on foundations the framework itself is moving away from.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Services */}
    <section id="capabilities" className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> What We Build
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg">Production-grade React Native apps with the new architecture — built to scale and ship fast.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-6 bg-white border hover:-translate-y-1 transition-all" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <s.icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]">{s.title}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> How We Build Your App
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {process.map((p, i) => (
            <motion.div key={p.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: "#F8FAFF", border: `1px solid ${accentBorder}` }}>
              <div className="text-3xl font-black mb-3" style={{ color: `${accent}40` }}>{p.n}</div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>{p.time}</p>
              <h3 className="font-black text-[#0A1628] mb-2 text-[15px]">{p.title}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Case Studies */}
    <CaseStudies />

    {/* Testimonials */}
    <Testimonials />

    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Why Build in React Native With Us</h2>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto">The flexibility of JavaScript, the performance of native — with a team that's shipped it at scale.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: accentBg }}>
                <w.icon size={18} style={{ color: accent }} />
              </div>
              <div>
                <h3 className="font-bold text-[#0A1628] mb-1 text-[14px]">{w.title}</h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <ClientLogoSection servicePage="mobile-app-development" accentColor="#61DAFB" heading="Brands Using Our React Native App Solutions" fallback={[
      { name: "Track My Ads", tag: "AdTech", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E", logoBg: "#f0f8ff" },
      { name: "Gleekey", tag: "EdTech", logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png", logoBg: "#f5f0ff" },
    ]} />

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> Frequently Asked Questions <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <FAQItem q={f.q} a={f.a} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: `radial-gradient(circle,rgba(139,92,246,0.10) 0%,rgba(255,107,43,0.06) 40%,transparent 70%)` }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${accent},#FF6B2B)` }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Ready to Launch Your <span style={{ color: accent }}>React Native App</span>?
          </h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Book a free discovery call. We'll scope your requirements, pick the right workflow, and give you a clear build plan with timeline and cost.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg,#FF6B2B,#e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My App Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4">No cookie cutter apps — A custom React Native experience built for your users from the ground up.</p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default ReactNativeAppsPage;
