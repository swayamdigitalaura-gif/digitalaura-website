import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section, SectionHead } from "../shared/SectionPrimitives";
import { ConversionFunnelCard, GA4ReportCard } from "../shared/DashboardMockups";

const POINTS = [
  "Server-side conversion tracking (GTM + GA4)",
  "Enhanced conversions for accurate attribution",
  "Call & form-fill tracking wired to revenue",
  "Cross-device, cross-channel attribution model",
];

export function ConversionTracking() {
  return (
    <Section id="dashboards" className="bg-navy text-white">
      <SectionHead
        light
        eyebrow="Conversion tracking & analytics"
        title="If you can't track it, you can't scale it"
        lead="Every campaign sits on top of clean GA4 and Google Ads conversion tracking, so every rupee of spend is tied to a real lead, call or sale."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map((p) => (
          <li key={p} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-[14.5px] font-semibold text-white/90">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-6 grid gap-5 lg:grid-cols-2"
      >
        <GA4ReportCard />
        <ConversionFunnelCard />
      </motion.div>
    </Section>
  );
}
