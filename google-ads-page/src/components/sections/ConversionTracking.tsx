import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Eyebrow, H2, PrimaryCTA, Section } from "../shared/SectionPrimitives";
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
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 items-center">
        <div>
          <Eyebrow light>Conversion Tracking & Analytics</Eyebrow>
          <H2 className="mt-6 text-white">If You Can't Track It, You Can't Scale It.</H2>
          <p className="mt-6 text-[18px] md:text-[20px] leading-[1.8] text-white/70 max-w-[560px]">
            Every campaign we run sits on top of clean GA4 and Google Ads conversion tracking —
            so every rupee of spend is tied to a real lead, call, or sale.
          </p>
          <ul className="mt-8 space-y-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] font-semibold text-white/90">
                <span className="mt-0.5 grid size-5.5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <PrimaryCTA>Audit My Tracking Setup</PrimaryCTA>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <GA4ReportCard />
          <ConversionFunnelCard />
        </motion.div>
      </div>
    </Section>
  );
}
