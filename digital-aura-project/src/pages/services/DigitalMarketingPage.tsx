import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useSettings } from "@/hooks/useSettings";
import { Search, Share2, Target, BookOpen, Mail, BarChart3, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";
import CMSIcon from "@/components/CMSIcon";

const services = [
  { icon: Search, iconName: "Search",   color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", name: "SEO & Content Strategy",    desc: "Data driven SEO that earns Google Page 1 rankings in 90 days: with content that converts visitors into paying customers." },
  { icon: Target, iconName: "Target",   color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", name: "Google Ads (PPC)",           desc: "Laser targeted campaigns with AI optimised bidding: maximum ROI, minimum wasted spend." },
  { icon: BookOpen, iconName: "BookOpen", color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", name: "Meta Ads (Facebook & IG)",   desc: "Audience segmentation, creative testing, and retargeting that turn cold traffic into loyal customers." },
  { icon: Share2, iconName: "Share2",   color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", name: "Social Media Management",   desc: "Consistent, on-brand social presence across platforms: content calendar, community management, and analytics included." },
  { icon: Mail, iconName: "Mail",     color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", name: "Email Marketing & CRM",      desc: "Automated drip sequences, re-engagement campaigns, and CRM setup that nurture leads into revenue." },
  { icon: BarChart3, iconName: "BarChart3",color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", name: "Analytics & CRO",            desc: "Full GA4 setup, heatmaps, A/B testing, and monthly reports that tell you exactly what's working and what to fix." },
];

const results = [
  { stat: "174%", label: "Traffic Growth", sub: "Home Appliance Brand · 6 months" },
  { stat: "120%", label: "Lead Volume",    sub: "Eye Hospital · Google Ads + SEO" },
  { stat: "3.2x",  label: "ROAS Achieved", sub: "eCommerce Brand · Meta Ads" },
  { stat: "76.7%", label: "Traffic Lift",   sub: "IVF Clinic · Organic SEO" },
];

const DigitalMarketingPage = () => {
  const _sp = useSettings(['digmkt_hero_h1','digmkt_hero_sub','digmkt_cta_btn']);
  return (
  <PageLayout>
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(255,107,43,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 400, height: 400, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(26,111,232,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6B2B] mb-4 hover:underline">← Back to All Services</Link>
          <span className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.3)" }}>
              <TrendingUp size={12} /> Digital Growth & Marketing
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
            <span data-cms-key="digmkt_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">AI Assisted Marketing
            <br /><span data-cms-key="digmkt_hl_111" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">That Fills Your Pipeline.</span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="digmkt_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">SEO, paid ads, and social campaigns measured against revenue: not vanity metrics. Built on AI analysis, optimised by expert hands.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="digmkt_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Get a Free Audit</span> <ArrowRight size={18} /></Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">Our Services</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Real Results Bar */}
    <div className="py-12 px-4 md:px-8" style={{ background: "#0A1628" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((r, i) => (
            <motion.div key={r.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#FF6B2B] mb-1">+{r.stat}</div>
              <div className="text-white font-bold text-sm mb-1">{r.label}</div>
              <div className="text-[#94A3B8] text-xs">{r.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <section id="services-list" className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mb-4"><span data-cms-key="digmkt_h2_11" data-cms-label="Section Heading" data-cms-attr="text">Services That</span> <span data-cms-key="digmkt_hl_112" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Drive Revenue</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, si) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.09 }}
              className="card-hover group rounded-2xl p-6 border bg-white relative overflow-hidden"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg,${s.color},${s.color}99)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.bg }}>
                <CMSIcon cmsKey={`digmkt_dyn_100_${s.iconName||'icon'}`} cmsLabel={"Icon"} name={s.iconName || "Star"} size={22} color={s.color} />
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2"><span data-cms-key={`digmkt_svc_${si}_name`} data-cms-label="Service Name" data-cms-attr="text">{s.name}</span></h3>
              <p className="text-sm leading-relaxed text-[#4B5563]"><span data-cms-key={`digmkt_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8 text-center" style={{ background: "#FFFFFF" }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-[#0A1628] mb-4"><span data-cms-key="digmkt_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Free Marketing Audit: Worth ₹15,000</span></h2>
          <p className="text-[#4B5563] mb-8"><span data-cms-key="digmkt_x7" data-cms-label="Body Text" data-cms-attr="text">We'll audit your SEO, ads, and website: and show you exactly where revenue is being left on the table.</span></p>
          <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">Claim Free Audit <ArrowRight size={18} /></Link>
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="digmkt_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to <span data-cms-key="digmkt_hl_113" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Grow</span> Your Business <span data-cms-key="digmkt_hl_114" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Online</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="digmkt_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Digital Marketing Strategy Call. We'll review your current performance, identify your biggest growth opportunities, and show you exactly what a results-driven campaign looks like.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="digmkt_x8" data-cms-label="Fine Print" data-cms-attr="text">No vanity metrics — A real strategy built around leads, sales, and measurable ROI.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default DigitalMarketingPage;



