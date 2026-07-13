import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";
import { Palette, Figma, Layout, PenTool, Monitor, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import CMSIcon from "@/components/CMSIcon";

const services = [
  { icon: PenTool, iconName: "PenTool", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", name: "Brand Identity Design",     desc: "Logo, colour palette, typography, and brand guidelines: everything you need for a consistent, premium brand presence." },
  { icon: Figma,   color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", name: "UI/UX Design",               desc: "User research, wireframes, and high-fidelity Figma prototypes built for conversion and delight: before a single line of code is written." },
  { icon: Layout, iconName: "Layout",  color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", name: "Landing Page Design",        desc: "Conversion optimised landing pages that turn ad traffic and organic visitors into qualified leads and paying customers." },
  { icon: Monitor, iconName: "Monitor", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", name: "Website Design & Redesign",  desc: "Full website design or redesign: strategically structured for SEO, user flow, and conversion: then handed off for development or launched in Webflow." },
  { icon: Layers, iconName: "Layers",  color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", name: "Design System Creation",     desc: "A component library and design token system your team can use consistently across all digital products: Figma-native and developer-ready." },
  { icon: Palette, iconName: "Palette", color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", name: "Social & Marketing Design",  desc: "Ad creatives, social media templates, pitch decks, and marketing collateral: designed to stop the scroll and drive action." },
];

const deliverables = [
  "Brand identity kit delivered in 2 weeks",
  "Figma design files with organised components and variants",
  "Prototype ready for developer handoff or user testing",
  "Design system with documented tokens and usage guidelines",
  "Revision rounds included: until you're delighted",
];

const DesignBrandingPage = () => {
  const _sp = useSettings(['design_hero_h1','design_hero_sub','design_cta_btn']);
  return (
  <PageLayout>
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 400, height: 400, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold text-[#F59E0B] mb-4 hover:underline">← Back to All Services</Link>
          <span className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>
              <Palette size={12} /> Branding & Experience Design
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="design_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Design That Converts.
            <br /><span style={{ background: "linear-gradient(135deg,#F59E0B,#d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Brands That Stick.</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="design_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">Strategic brand identity and conversion first UI/UX design: every pixel intentional, every decision tied to a business outcome.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2" style={{ background: "linear-gradient(135deg,#F59E0B,#d97706)", boxShadow: "0 4px 18px rgba(245,158,11,0.35)" }}>
              <span data-cms-key="design_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Start a Design Project</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">See What We Design</a>
          </div>
        </motion.div>
      </div>
    </section>

    <section id="services-list" className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mb-4"><span data-cms-key="design_h2_12" data-cms-label="Section Heading" data-cms-attr="text">Design Services We</span> <span data-cms-key="design_hl_112" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Offer</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, si) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.09 }}
              className="card-hover group rounded-2xl p-6 border bg-white relative overflow-hidden"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg,${s.color},${s.color}99)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.bg }}>
                <CMSIcon cmsKey={`design_dyn_100_${s.iconName||'icon'}`} cmsLabel={"Icon"} name={s.iconName || "Star"} size={22} color={s.color} />
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2"><span data-cms-key={`design_svc_${si}_name`} data-cms-label="Service Name" data-cms-attr="text">{s.name}</span></h3>
              <p className="text-sm leading-relaxed text-[#4B5563]"><span data-cms-key={`design_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#0A1628] mb-4"><span data-cms-key="design_h2_sect1" data-cms-label="Section Heading" data-cms-attr="text">What You Get</span> <span data-cms-key="design_hl_113" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">With Every Project</span></h2>
        </motion.div>
        <div className="space-y-4">
          {deliverables.map((d, i) => (
            <motion.div key={d} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-2xl border bg-white"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <CheckCircle2 size={20} style={{ color: "#F59E0B" }} className="shrink-0" />
              <p className="font-medium text-[#374151]">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8 text-center" style={{ background: "#F8FAFF" }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-[#0A1628] mb-4"><span data-cms-key="design_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready to Look Like the Brand You Are?</span></h2>
          <p className="text-[#4B5563] mb-8"><span data-cms-key="design_x7" data-cms-label="Body Text" data-cms-attr="text">Free 30-min design consultation. We'll review your current brand and show you where design is costing you conversions.</span></p>
          <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex"
            style={{ background: "linear-gradient(135deg,#F59E0B,#d97706)", boxShadow: "0 4px 18px rgba(245,158,11,0.35)" }}>
            Book Design Consultation <ArrowRight size={18} />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="design_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Build a <span data-cms-key="design_hl_114" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Brand</span> That <span data-cms-key="design_hl_115" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Stands Out</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="design_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Brand Discovery Call. We'll review your current positioning, identify the opportunities, and show you what a custom design and branding engagement looks like.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Brand Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="design_x8" data-cms-label="Fine Print" data-cms-attr="text">No generic templates — A brand identity built specifically for your business and audience.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default DesignBrandingPage;



