import { motion } from "framer-motion";
import { Search, ShoppingBag, MonitorPlay, SquarePlay, Layers, Sparkles } from "lucide-react";
import { Section, SectionHead, CardBadge, CARD } from "../shared/SectionPrimitives";

const PLATFORMS = [
  { icon: Search, name: "Search campaigns", desc: "High-intent keyword targeting for buyers actively searching." },
  { icon: Sparkles, name: "Performance Max", desc: "AI-driven bidding across every Google inventory in one campaign." },
  { icon: ShoppingBag, name: "Shopping campaigns", desc: "Product feed optimization built for retail and eCommerce margins." },
  { icon: MonitorPlay, name: "Display network", desc: "Remarketing and awareness placements across publisher sites." },
  { icon: SquarePlay, name: "YouTube ads", desc: "In-stream and Shorts placements for brand demand and recall." },
  { icon: Layers, name: "Demand Gen", desc: "Visual-first campaigns across Discover, Gmail and YouTube feeds." },
];

export function PlatformsWeManage() {
  return (
    <Section id="platforms" className="bg-white">
      <SectionHead
        eyebrow="Google Ads platforms we manage"
        title="Every Google channel, run as one system"
        lead="We do not run isolated campaigns. We connect every Google Ads surface into a single growth engine."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}
            className={`${CARD} flex items-start gap-4`}
          >
            <CardBadge><p.icon className="size-5" strokeWidth={2.2} /></CardBadge>
            <div>
              <h3 className="font-display text-[17px] font-bold leading-snug text-navy">{p.name}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
