import { motion } from "framer-motion";
import { Gauge, MousePointerClick, Smartphone, Zap } from "lucide-react";
import { Section, SectionHead, CardBadge, CARD } from "../shared/SectionPrimitives";

const METRICS = [
  { icon: Gauge, label: "Core Web Vitals", before: "62", after: "97", unit: "/100" },
  { icon: Zap, label: "Page load time", before: "4.8s", after: "1.1s", unit: "" },
  { icon: MousePointerClick, label: "Form conversion rate", before: "2.1%", after: "6.4%", unit: "" },
  { icon: Smartphone, label: "Mobile bounce rate", before: "68%", after: "31%", unit: "" },
];

export function LandingPageOptimization() {
  return (
    <Section id="landing-pages" className="bg-surface-cream">
      <SectionHead
        eyebrow="Landing page optimization"
        title="Pages built to convert the click you paid for"
        lead="Sending paid traffic to a slow, generic homepage is the fastest way to waste ad spend. We build fast, intent-matched pages instead."
      />
      <div className="pillar-cols-4 pillar-small grid grid-cols-2 gap-4 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className={CARD}
          >
            <CardBadge><m.icon className="size-5" strokeWidth={2.2} /></CardBadge>
            <p className="mt-3 text-[12px] font-bold uppercase tracking-wider text-navy/60">{m.label}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
              <span className="text-[14px] font-semibold text-muted-foreground line-through">{m.before}{m.unit}</span>
              <span className="font-display text-[24px] font-extrabold text-navy">{m.after}{m.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
