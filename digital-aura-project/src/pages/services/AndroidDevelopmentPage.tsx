import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Smartphone, Rocket, Palette, Database, Zap, Shield, Check, ChevronDown, Target, Code2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ClientLogoSection from "@/components/ClientLogoSection";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";

const accent = "#3DDC84";
const accentBg = "rgba(61,220,132,0.10)";
const accentBorder = "rgba(61,220,132,0.25)";

const services = [
  { icon: Smartphone, title: "Kotlin & Jetpack Compose", desc: "Modern Android development using Kotlin and Jetpack Compose for declarative, performant UIs that feel native on every device." },
  { icon: Rocket,     title: "Google Play Store Launch", desc: "End to end Play Store submission including app signing, metadata, compliance checks, privacy policies, and review management." },
  { icon: Palette,    title: "Material Design UI",       desc: "Pixel perfect Material Design 3 interfaces that follow Google's latest guidelines for intuitive, beautiful Android experiences." },
  { icon: Database,   title: "Offline First Architecture", desc: "Local first data layers using Room and WorkManager that sync intelligently when connectivity returns — critical for field and enterprise users." },
  { icon: Zap,        title: "Push Notifications & FCM", desc: "Firebase Cloud Messaging integration for targeted push notifications, in-app messaging, and real time alerts that drive re-engagement." },
  { icon: Shield,     title: "Android Security Hardening", desc: "Biometric authentication, encrypted local storage, certificate pinning, and Play Integrity API checks to keep your app and users safe." },
];

const process = [
  { n: "01", title: "Discovery & Architecture",  time: "Week 1–2",   desc: "Deep dive into your business goals, user personas, and technical requirements to define the right Android architecture before writing a line of code." },
  { n: "02", title: "UI/UX Design & Prototyping", time: "Week 3–4",  desc: "Material Design 3 wireframes and interactive Figma prototypes validated with real users before development begins." },
  { n: "03", title: "Development Sprints",        time: "Week 5–10", desc: "Sprint-based Kotlin development with daily standups, a staging build you can test at any time, and weekly progress demos." },
  { n: "04", title: "QA, Launch & Support",       time: "Week 11+",  desc: "Automated test suites, device-farm regression testing, Play Store submission, and post-launch monitoring and support." },
];

const whyUs = [
  { icon: Smartphone, title: "Android Specialists",  desc: "We build exclusively for the Android ecosystem — deep knowledge of device fragmentation, Google Play policies, and Kotlin best practices." },
  { icon: Zap,        title: "Kotlin First",          desc: "100% Kotlin codebases with Jetpack Compose. No legacy Java tech debt. Clean, modern, and maintainable from day one." },
  { icon: Target,     title: "Retention Focused",     desc: "We measure success by DAU, retention curves, and Play Store ratings — not just lines of code shipped." },
  { icon: Shield,     title: "Security by Default",   desc: "Biometric auth, encrypted storage, and Play Integrity baked in from the start — not bolted on at the end." },
  { icon: Rocket,     title: "Play Store Experts",    desc: "We handle the full submission process including compliance, metadata optimisation, and review appeals." },
  { icon: Code2,      title: "Clean Architecture",    desc: "MVVM, Clean Architecture, and modular Gradle builds so your codebase stays fast and maintainable as your team grows." },
];

const faqs = [
  { q: "Native Android vs cross platform — which is right for us?", a: "Native Android is best when you need deep hardware integration (Bluetooth, AR, complex sensors), maximum performance, or a pure Android-first strategy. For most business and eCommerce apps, cross platform cuts cost by 40% — we'll advise based on your specific requirements." },
  { q: "Do you handle Google Play Store rejections?", a: "Yes. We manage the entire submission process including compliance checks, privacy policy requirements, and review responses. If Google requests changes, we handle the appeals and updates at no extra cost." },
  { q: "Which Android versions do you support?", a: "We target Android 8.0 (API 26) and above by default, covering 97%+ of active Android devices. We discuss minimum SDK targets during scoping based on your specific audience." },
  { q: "Who owns the source code after delivery?", a: "You do. We hand over 100% of the source code, assets, and project files on final payment. Full intellectual property ownership is standard in every contract." },
  { q: "Can you integrate with our existing backend?", a: "Yes — REST APIs, GraphQL, Firebase, Supabase, or your own infrastructure. We write clean repository layers so your app is never locked to a single backend provider." },
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

const AndroidDevelopmentPage = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: `radial-gradient(circle,rgba(61,220,132,0.12) 0%,transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-5%", background: "radial-gradient(circle,rgba(26,111,232,0.06) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}>
              <Smartphone size={12} /> Android Development
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            Native Android Apps<br /><span style={{ color: accent }}>Built to Perform.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
            We build high performance Android apps with Kotlin and Jetpack Compose, optimised for every Android device — fast, secure, and ready for the Google Play Store.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Kotlin", "Jetpack Compose", "Material Design 3", "Google Play Store", "Firebase"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3 hover:opacity-90"
              style={{ background: `linear-gradient(135deg,${accent},#29a866)`, boxShadow: `0 8px 24px rgba(61,220,132,0.35)` }}>
              Start My Android App <ArrowRight size={15} />
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
          <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical Android Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            Any Dev Shop Can Build an Android App.<br className="hidden md:block" /> Very Few Can Build One Users Keep.
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most Android agencies focus on shipping something fast. We focus on shipping something that passes review, performs across devices, and retains users beyond day one.</p>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Apps built on legacy Java and outdated patterns", detail: "Old Java codebases with no Jetpack, no Compose, and mounting technical debt." },
              { pain: "No device fragmentation testing", detail: "Tested on one or two phones — broken on the hundreds of Android devices your users actually have." },
              { pain: "Apps rejected or removed from the Play Store", detail: "Policy violations, permission misuse, and quality failures that cost you rankings and visibility." },
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
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your Android app wasn't built with Kotlin and Jetpack Compose, you're running on a stack Google is actively moving away from.</p>
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
          <p className="text-[#6B7280] mt-2 text-sm max-w-lg">End to end Android development — from architecture to Play Store launch.</p>
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
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Why Build Your Android App With Us</h2>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto">Deep Android expertise, clean code, and a focus on what actually matters — your users and your business.</p>
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

    <ClientLogoSection servicePage="mobile-app-development" accentColor="#3DDC84" heading="Brands Using Our Android App Solutions" fallback={[
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: `radial-gradient(circle,rgba(61,220,132,0.10) 0%,rgba(255,107,43,0.06) 40%,transparent 70%)` }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${accent},#1A6FE8)` }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Ready to Launch Your <span style={{ color: accent }}>Android App</span>?
          </h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">Book a free discovery call. We'll map your requirements, recommend the right architecture, and give you a clear picture of what building with Digital Aura looks like.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg,#FF6B2B,#e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My App Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4">No cookie cutter apps — A custom Android experience built for your users from the ground up.</p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default AndroidDevelopmentPage;
