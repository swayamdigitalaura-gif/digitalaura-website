import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Layers, Zap, Palette, Database, Globe2, Rocket, Check, ChevronDown, Target, Code2, Shield } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ClientLogoSection from "@/components/ClientLogoSection";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";

const accent = "#54C5F8";
const accentBg = "rgba(84,197,248,0.10)";
const accentBorder = "rgba(84,197,248,0.25)";

const services = [
  { icon: Layers,   title: "Single Codebase, Two Platforms",   desc: "One Flutter codebase ships to both iOS and Android, cutting development time and cost in half while maintaining a truly native feel." },
  { icon: Zap,      title: "60fps Smooth Performance",          desc: "Flutter's Impeller rendering engine delivers buttery smooth 60fps animations and transitions on every device — low end or flagship." },
  { icon: Palette,  title: "Custom Widget Library",             desc: "Fully custom UI widgets built in Flutter that match your brand pixel perfectly — far beyond what standard component libraries offer." },
  { icon: Database, title: "Firebase & Supabase Integration",   desc: "Real time databases, authentication, cloud storage, and serverless functions integrated directly into your Flutter app from day one." },
  { icon: Rocket,   title: "App Store & Play Store Launch",     desc: "Complete submission handling for both Apple App Store and Google Play Store — compliance, metadata, and review management all included." },
  { icon: Globe2,   title: "Flutter Web & Desktop",             desc: "Extend your Flutter app to web and desktop with the same codebase, giving you a unified product across every platform your users are on." },
];

const process = [
  { n: "01", title: "Discovery & Architecture",   time: "Week 1–2",  desc: "We map your product goals, user journeys, and technical requirements to select the right Flutter architecture (BLoC, Riverpod, or Provider) before a line is written." },
  { n: "02", title: "Design & Widget System",     time: "Week 3–4",  desc: "Custom Flutter widget library and Figma-to-Flutter design handoff. Your brand rendered pixel-perfectly across iOS and Android simultaneously." },
  { n: "03", title: "Development Sprints",        time: "Week 5–10", desc: "Sprint-based Dart development with a staging build you can test on both platforms at any time. Daily standups and weekly demos included." },
  { n: "04", title: "QA, Launch & Iteration",     time: "Week 11+",  desc: "Cross-platform automated testing, device-farm regression runs, dual App Store submissions, and post-launch performance monitoring." },
];

const whyUs = [
  { icon: Zap,     title: "50% Faster Delivery",      desc: "One codebase for iOS and Android means half the build time and cost compared to maintaining separate native teams." },
  { icon: Palette, title: "Pixel Perfect UI",          desc: "Flutter gives us complete control over every pixel. Your brand is rendered identically on every device and OS version." },
  { icon: Rocket,  title: "Future Proof Stack",        desc: "Flutter is backed by Google and used by BMW, eBay, and Alibaba. You're building on a stack with a long runway." },
  { icon: Globe2,  title: "Multi-Platform by Default", desc: "iOS, Android, Web, and Desktop from one codebase. Launch on every platform without rewriting or hiring separate teams." },
  { icon: Shield,  title: "Production Battle-Tested",  desc: "We've shipped Flutter apps for clients across eCommerce, health, and fintech with 60fps performance and zero critical post-launch bugs." },
  { icon: Code2,   title: "Clean Dart Architecture",   desc: "Modular, testable Dart codebases with clean separation of layers — so your team can own and extend the app long after handover." },
];

const faqs = [
  { q: "Is Flutter really production ready for serious apps?", a: "Yes. Flutter powers apps for BMW, eBay, Alibaba, and Google Pay. We've shipped production Flutter apps for eCommerce, fintech, and enterprise clients with 60fps performance, zero critical post-launch issues, and high Play Store/App Store ratings." },
  { q: "How does Flutter perform vs native Android and iOS?", a: "Flutter's Impeller rendering engine achieves true 60fps on both platforms. For most business apps the performance difference from native is imperceptible. The exceptions are very graphics-heavy apps or those needing deep hardware integration — we'll advise if native is a better fit for your specific case." },
  { q: "Does Flutter work for complex, data-heavy apps?", a: "Absolutely. We use Riverpod or BLoC for state management and clean architecture patterns so your app handles complex data flows, offline sync, and real-time updates without performance degradation." },
  { q: "Can Flutter reach the web and desktop too?", a: "Yes. The same Flutter codebase can be compiled for Web, Windows, macOS, and Linux. We'll scope which additional platforms make sense for your product and roadmap." },
  { q: "Who owns the source code?", a: "You own 100% of the source code, Dart packages, and assets on final delivery. We hand over a clean, well-documented codebase your own team can maintain and extend." },
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

const FlutterAppsPage = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle,rgba(84,197,248,0.12) 0%,transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-5%", background: "radial-gradient(circle,rgba(124,58,237,0.06) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}>
              <Layers size={12} /> Flutter Development
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            One Codebase. Two Platforms.<br /><span style={{ color: accent }}>Native Feel.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            Flutter delivers pixel perfect iOS and Android apps from a single codebase — with 60fps performance, fast release cycles, and a truly native user experience.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Flutter", "Dart", "iOS & Android", "60fps Performance", "Riverpod / BLoC"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3 hover:opacity-90"
              style={{ background: `linear-gradient(135deg,${accent},#2ea8d8)`, boxShadow: `0 8px 24px rgba(84,197,248,0.35)` }}>
              Start My Flutter App <ArrowRight size={15} />
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
            Any Agency Can Write Flutter Code.<br className="hidden md:block" /> Very Few Can Ship a Product That Performs.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most Flutter shops focus on cross-platform speed. We focus on building apps that feel native, perform smoothly on both platforms, and hold up under real user load.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Flutter apps with poor state management", detail: "setState everywhere, rebuilding entire trees on minor updates, causing jank and slow UX." },
              { pain: "Copy-paste widgets with no custom UI", detail: "Material defaults with a coat of paint — nothing that feels distinctly yours on either platform." },
              { pain: "No real-device testing on both platforms", detail: "Simulator-only testing that misses camera, permissions, and hardware-specific issues." },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your Flutter app isn't hitting 60fps on mid-range Android devices, your users are already noticing — even if they haven't told you yet.</p>
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
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg">Full Flutter development — from a single codebase to a cross-platform product on every major platform.</p>
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
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Why Build in Flutter With Us</h2>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto">The fastest path from idea to a pixel-perfect product on both platforms — without compromise.</p>
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

    <ClientLogoSection servicePage="mobile-app-development" accentColor="#54C5F8" heading="Brands Using Our Flutter App Solutions" fallback={[
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: `radial-gradient(circle,rgba(84,197,248,0.10) 0%,rgba(255,107,43,0.06) 40%,transparent 70%)` }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${accent},#7C3AED)` }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Ready to Launch Your <span style={{ color: accent }}>Flutter App</span>?
          </h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Book a free discovery call. We'll map your requirements, choose the right Flutter architecture, and give you a clear build plan with timeline and cost.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg,#FF6B2B,#e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My App Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4">No cookie cutter apps — A custom Flutter experience built for your users from the ground up.</p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default FlutterAppsPage;
