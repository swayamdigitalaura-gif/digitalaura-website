import { motion } from "framer-motion";
import { Search, ShoppingBag, MonitorPlay, SquarePlay, Layers, Sparkles } from "lucide-react";
import { Eyebrow, H2, Lead, Section } from "../shared/SectionPrimitives";

const PLATFORMS = [
  { icon: Search, name: "Search Campaigns", desc: "High-intent keyword targeting for buyers actively searching." },
  { icon: Sparkles, name: "Performance Max", desc: "AI-driven bidding across every Google inventory in one campaign." },
  { icon: ShoppingBag, name: "Shopping Campaigns", desc: "Product feed optimization built for retail and eCommerce margins." },
  { icon: MonitorPlay, name: "Display Network", desc: "Remarketing and awareness placements across 2M+ publisher sites." },
  { icon: SquarePlay, name: "YouTube Ads", desc: "In-stream and Shorts placements for brand demand and recall." },
  { icon: Layers, name: "Demand Gen", desc: "Visual-first campaigns across Discover, Gmail, and YouTube feeds." },
];

export function PlatformsWeManage() {
  return (
    <Section id="platforms" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Eyebrow>Google Ads Platforms We Manage</Eyebrow>
        <H2 className="mt-6">Every Google Channel, Run As One System</H2>
        <Lead className="mt-6 mx-auto">
          We don't run isolated campaigns — we connect every Google Ads surface into a single growth engine.
        </Lead>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}
            className="group rounded-3xl border border-border bg-white p-7 shadow-card hover-card"
          >
            <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <p.icon className="size-5.5" strokeWidth={2.2} />
            </div>
            <p className="mt-6 font-display text-[19px] font-semibold text-navy leading-snug">{p.name}</p>
            <p className="mt-3 text-[14.5px] leading-[1.7] text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
