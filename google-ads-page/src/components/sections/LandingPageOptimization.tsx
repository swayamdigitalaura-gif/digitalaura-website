import { motion } from "framer-motion";
import { Gauge, MousePointerClick, Smartphone, Zap } from "lucide-react";
import { Eyebrow, H2, Lead, Section } from "../shared/SectionPrimitives";

const METRICS = [
  { icon: Gauge, label: "Core Web Vitals", before: "62", after: "97", unit: "/100" },
  { icon: Zap, label: "Page Load Time", before: "4.8s", after: "1.1s", unit: "" },
  { icon: MousePointerClick, label: "Form Conversion Rate", before: "2.1%", after: "6.4%", unit: "" },
  { icon: Smartphone, label: "Mobile Bounce Rate", before: "68%", after: "31%", unit: "" },
];

export function LandingPageOptimization() {
  return (
    <Section id="landing-pages" className="bg-white">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Eyebrow>Landing Page Optimization</Eyebrow>
        <H2 className="mt-6">Pages Built To Convert The Click You Paid For</H2>
        <Lead className="mt-6 mx-auto">
          Sending paid traffic to a slow, generic homepage is the fastest way to waste ad spend. We build fast, intent-matched pages instead.
        </Lead>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className="rounded-3xl border border-border bg-surface-cream p-7 shadow-xs hover-card"
          >
            <div className="grid size-11 place-items-center rounded-xl bg-white text-primary shadow-xs">
              <m.icon className="size-5" strokeWidth={2.2} />
            </div>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-wider text-navy/50">{m.label}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[15px] font-semibold text-muted-foreground line-through">{m.before}{m.unit}</span>
              <span className="font-display text-[24px] font-extrabold text-navy">{m.after}{m.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
