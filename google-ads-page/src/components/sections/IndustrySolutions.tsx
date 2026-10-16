import { motion } from "framer-motion";
import { Building2, Dumbbell, ShoppingCart, Stethoscope, Wrench, Plane, Factory, Gamepad2, PartyPopper, AppWindow } from "lucide-react";
import { Section, SectionHead, CardBadge, CARD } from "../shared/SectionPrimitives";

const INDUSTRIES = [
  { icon: Stethoscope, name: "Healthcare & clinics", pain: "High patient acquisition costs on generic keywords across IVF, ophthalmology and diagnostics.", outcome: "More qualified appointment bookings" },
  { icon: Building2, name: "Real estate", pain: "Low-intent broker inquiries with no CRM sync or lead verification.", outcome: "Verified property enquiries" },
  { icon: ShoppingCart, name: "eCommerce & retail", pain: "Unoptimized Shopping feeds and high cart abandonment.", outcome: "Higher blended ROAS" },
  { icon: Dumbbell, name: "Education & fitness", pain: "High dropoff on admissions and membership signup funnels.", outcome: "Lower cost per enrollment" },
  { icon: Wrench, name: "Home & local services", pain: "Unverified lead calls with no attribution back to campaigns.", outcome: "Tracked, qualified service calls" },
  { icon: Plane, name: "Travel & hospitality", pain: "Inconsistent booking volume on custom package campaigns.", outcome: "Predictable booking growth" },
  { icon: Factory, name: "Manufacturing", pain: "Long B2B sales cycles with low-quality bulk enquiry leads.", outcome: "Qualified B2B buyer enquiries" },
  { icon: Gamepad2, name: "Gaming", pain: "High install costs with low-value, non-paying users.", outcome: "Higher LTV player acquisition" },
  { icon: PartyPopper, name: "Events", pain: "Inconsistent ticket sales and last-minute booking drop-offs.", outcome: "Predictable ticket & venue bookings" },
  { icon: AppWindow, name: "SaaS", pain: "High trial signup costs with low trial-to-paid conversion.", outcome: "More qualified demo & trial signups" },
];

export function IndustrySolutions() {
  return (
    <Section id="industries" className="bg-white">
      <SectionHead
        eyebrow="Industry solutions"
        title="We know how to sell in your industry"
        lead="We understand your margins, your customer value and what a qualified lead actually looks like."
      />
      <div className="pillar-cols-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {INDUSTRIES.map((ind, i) => (
          <motion.div
            key={ind.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (i % 5) * 0.05, duration: 0.45 }}
            className={`${CARD} flex flex-col`}
          >
            <CardBadge><ind.icon className="size-5" /></CardBadge>
            <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-navy">{ind.name}</h3>
            <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{ind.pain}</p>
            <p className="mt-3 border-t border-border pt-3 text-[13px] font-bold leading-snug text-primary">{ind.outcome}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
