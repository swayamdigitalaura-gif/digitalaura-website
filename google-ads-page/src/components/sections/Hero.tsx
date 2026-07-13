import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { PrimaryCTA, SecondaryCTA } from "../shared/SectionPrimitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-surface-cream pt-10 pb-16 md:pt-14 md:pb-20">
      {/* Soft cream background, subtle orange radial glow, minimal abstract pattern */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_60%)] opacity-30" />
      <div className="pointer-events-none absolute top-1/4 right-[8%] size-[460px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-16 size-[320px] rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14 items-center">
        {/* LEFT COLUMN */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-navy w-fit shadow-xs"
          >
            <ShieldCheck className="size-3.5 text-primary" /> Google Partner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-8 max-w-[600px] font-display font-bold leading-[1.22] tracking-[-0.02em] text-navy"
            style={{ fontSize: "clamp(30px, 4.1vw, 50px)" }}
          >
            Google Ads Management Company in Ahmedabad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-9 text-[19px] md:text-[21px] leading-[1.75] text-muted-foreground max-w-[560px]"
          >
            Generate more qualified leads with AI-powered Google Ads campaigns, conversion tracking and landing page optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            id="audit"
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <PrimaryCTA href="#audit-final">Get Free Google Ads Audit</PrimaryCTA>
            <SecondaryCTA href="#results">View Case Studies</SecondaryCTA>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Phone mockup is the dominant visual */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-[768px]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/hero-section-image.png"
              alt="Google Ads campaign dashboard, GA4 analytics, and Google Search result preview for Digital Aura"
              className="w-full h-auto drop-shadow-[0_40px_90px_rgba(26,29,54,0.18)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
