import { motion } from "framer-motion";
import { EyeOff, MousePointerClick, FileWarning, TrendingDown } from "lucide-react";
import { Section, SectionHead, CardBadge, CARD } from "../shared/SectionPrimitives";

const CHALLENGES = [
  {
    icon: TrendingDown,
    title: "Wasted spend on broad keywords",
    desc: "Ads showing up for searches with zero buying intent, burning 30–50% of budget on clicks that never convert.",
  },
  {
    icon: EyeOff,
    title: "Tracking that hides the real numbers",
    desc: "Most accounts only track clicks. Without real calls, forms and sales data, optimization is just guesswork.",
  },
  {
    icon: MousePointerClick,
    title: "Landing pages that lose visitors",
    desc: "Ad traffic sent to a slow, generic homepage instead of a page built for that exact search intent.",
  },
  {
    icon: FileWarning,
    title: "Reports with no real numbers",
    desc: "Monthly PDFs full of clicks and impressions, never an answer to how much revenue the spend actually produced.",
  },
];

export function ChallengesWeSolve() {
  return (
    <Section id="challenges" className="bg-surface-cream">
      <SectionHead
        eyebrow="Google Ads challenges we solve"
        title="Most accounts leak 40%+ of their budget"
        lead="We have audited hundreds of ad accounts. The issues are consistent: budget leakage, weak tracking and generic funnels."
      />
      <div className="pillar-cols-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CHALLENGES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className={CARD}
          >
            <CardBadge><c.icon className="size-5" strokeWidth={2.2} /></CardBadge>
            <h3 className="mt-3 font-display text-[16.5px] font-bold leading-snug text-navy">{c.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
