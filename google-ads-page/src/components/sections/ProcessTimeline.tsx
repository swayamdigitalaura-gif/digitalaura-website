import { motion } from "framer-motion";
import { Activity, FileBarChart, Rocket, Search, TrendingUp, Trophy } from "lucide-react";
import { Eyebrow, H2, Lead, Section } from "../shared/SectionPrimitives";

const STEPS = [
  { stepNum: "01", title: "Audit", desc: "Full account review to find wasted budget and broken tracking.", icon: Search },
  { stepNum: "02", title: "Strategy", desc: "Keyword and campaign structure mapped to clear 90-day targets.", icon: FileBarChart },
  { stepNum: "03", title: "Build", desc: "Landing pages, tracking, and ad creative built and shipped.", icon: Rocket },
  { stepNum: "04", title: "Optimize", desc: "Weekly bid, keyword, and creative testing cycles.", icon: Activity },
  { stepNum: "05", title: "Scale", desc: "Budget shifted behind what's proven to convert.", icon: TrendingUp },
  { stepNum: "06", title: "Compound", desc: "Organic and remarketing layered on top of paid growth.", icon: Trophy },
];

export function ProcessTimeline() {
  return (
    <Section id="process" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center mb-20">
        <Eyebrow>Google Ads Process Timeline</Eyebrow>
        <H2 className="mt-6">How We Grow Your Account, Step By Step</H2>
        <Lead className="mt-6 mx-auto">A clear process from first audit to compounding growth — no guesswork.</Lead>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative rounded-3xl border border-border bg-white p-6 shadow-card hover-card"
            >
              <div className="absolute -top-7 left-5 grid size-13 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-primary-glow ring-4 ring-white">
                <s.icon className="size-5.5" />
              </div>
              <div className="pt-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">Step {s.stepNum}</p>
                <h3 className="mt-2 font-display text-[19px] font-semibold text-navy">{s.title}</h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
