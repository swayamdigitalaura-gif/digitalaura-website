import { motion } from "framer-motion";
import { EyeOff, MousePointerClick, FileWarning, TrendingDown } from "lucide-react";
import { Eyebrow, H2, Lead, PrimaryCTA, Section } from "../shared/SectionPrimitives";

const CHALLENGES = [
  {
    icon: TrendingDown,
    title: "Wasted Spend on Broad Keywords",
    desc: "Ads showing up for searches with zero buying intent, burning 30–50% of budget on clicks that never convert.",
  },
  {
    icon: EyeOff,
    title: "Tracking That Hides The Real Numbers",
    desc: "Most accounts only track clicks. Without real calls, forms, and sales data, optimization is just guesswork.",
  },
  {
    icon: MousePointerClick,
    title: "Landing Pages That Lose Visitors",
    desc: "Ad traffic sent to a slow, generic homepage instead of a page built for that exact search intent.",
  },
  {
    icon: FileWarning,
    title: "Reports With No Real Numbers",
    desc: "Monthly PDFs full of clicks and impressions — never an answer to how much revenue the spend actually produced.",
  },
];

export function ChallengesWeSolve() {
  return (
    <Section id="challenges" className="bg-white">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Google Ads Challenges We Solve</Eyebrow>
          <H2 className="mt-6">
            Most accounts leak <span className="text-primary">40%+</span> of their budget.
          </H2>
          <Lead className="mt-6">
            We've audited hundreds of ad accounts. The issues are consistent: budget leakage, weak tracking, and generic funnels.
          </Lead>
          <div className="mt-8">
            <PrimaryCTA>Fix My Campaign Leaks</PrimaryCTA>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CHALLENGES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="rounded-3xl border border-border bg-surface-cream p-8 shadow-xs hover-card"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-white text-primary shadow-xs">
                <c.icon className="size-5.5" strokeWidth={2.2} />
              </div>
              <p className="mt-6 font-display text-[19px] font-semibold text-navy leading-snug">{c.title}</p>
              <p className="mt-3 text-[15px] leading-[1.75] text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
