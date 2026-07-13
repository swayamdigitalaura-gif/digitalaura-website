import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Eyebrow, H2, Section } from "../shared/SectionPrimitives";
import { MetricSparkline } from "../shared/DashboardMockups";

const CASES = [
  {
    client: "Aura Vision Eye Hospital",
    industry: "Ophthalmology",
    headline: "From ₹980 CPL to ₹210 in 60 days",
    challenge: "High cost per appointment from broad eye-care keywords, plus mobile visitors dropping off before booking.",
    solution: "Restructured keywords by intent, cut wasted search terms, built fast booking pages.",
    revenue: "↑ 4.6x Appointment Leads",
    roas: "6.2x ROAS",
    cpl: "₹210 CPL",
    timeline: "60 Days",
    chartPoints: [40, 36, 44, 30, 24, 18, 12, 14, 8],
  },
  {
    client: "Skyline Premium Realty",
    industry: "Real Estate",
    headline: "₹47 Cr in sales attributed to Search & PMax",
    challenge: "Too many low-quality broker leads, no lead verification, no CRM sync.",
    solution: "Proper conversion tracking, OTP lead verification, full CRM integration.",
    revenue: "₹47 Cr Revenue Attributed",
    roas: "9.1x ROAS",
    cpl: "₹420 CPL",
    timeline: "90 Days",
    chartPoints: [20, 25, 30, 42, 55, 68, 80, 85, 92],
  },
  {
    client: "LuxeMart Online",
    industry: "eCommerce",
    headline: "7.4x ROAS on Performance Max during peak season",
    challenge: "Flat sales from basic Shopping ads and a checkout flow losing customers at cart.",
    solution: "Cleaned product feed, launched cart-abandon retargeting, fixed checkout flow.",
    revenue: "↑ 480% Online Revenue",
    roas: "7.4x ROAS",
    cpl: "↑ 2.8x Cart CR",
    timeline: "120 Days",
    chartPoints: [30, 40, 35, 55, 62, 70, 68, 82, 95],
  },
];

export function CaseStudies() {
  return (
    <Section id="results" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center mb-20">
        <Eyebrow>Premium Case Studies</Eyebrow>
        <H2 className="mt-6">Real Results, Verified Numbers</H2>
      </div>

      <div className="space-y-10">
        {CASES.map((c, i) => (
          <motion.div
            key={c.client}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="grid grid-cols-1 rounded-[2.5rem] border border-border bg-white overflow-hidden shadow-card hover-card lg:grid-cols-[1fr_1.3fr]"
          >
            <div className="bg-navy p-10 md:p-14 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wider">{c.industry}</span>
                  <Award className="size-5.5 text-primary" />
                </div>
                <p className="mt-10 text-[15px] text-white/70 font-medium">{c.client}</p>
                <h3 className="mt-3 font-display text-[26px] md:text-[30px] font-bold leading-[1.2] tracking-[-0.01em]">{c.headline}</h3>
              </div>
              <div className="mt-10 pt-7 border-t border-white/10 flex items-center justify-between text-[13px] font-semibold text-white/80">
                <span>Optimized Timeline</span>
                <span className="text-primary font-mono font-bold">{c.timeline}</span>
              </div>
            </div>

            <div className="p-10 md:p-14 flex flex-col justify-between">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-navy">The Challenge</p>
                  <p className="text-[15px] text-muted-foreground mt-3 leading-[1.78]">{c.challenge}</p>
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-navy">The Solution</p>
                  <p className="text-[15px] text-muted-foreground mt-3 leading-[1.78]">{c.solution}</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-5">
                {[["Revenue", c.revenue], ["ROAS", c.roas], ["CPL", c.cpl]].map(([label, val]) => (
                  <div key={label} className="p-4 bg-surface-cream rounded-2xl text-center border border-border">
                    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
                    <p className="mt-2 font-display text-[16px] md:text-[18px] font-extrabold text-navy leading-tight">{val}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-navy/40 shrink-0">Scale Trend</span>
                <div className="w-28 h-8">
                  <MetricSparkline points={c.chartPoints} width={100} height={28} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
