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

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-4 md:px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 items-center">
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
            className="mt-6 max-w-[600px] font-display font-bold leading-[1.22] tracking-[-0.02em] text-navy"
            style={{ fontSize: "clamp(30px, 4.1vw, 48px)" }}
          >
            Google Ads Agency in Ahmedabad Focused on Leads You Can Track
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[17px] md:text-[19px] leading-[1.7] text-muted-foreground max-w-[560px]"
          >
            Generate more qualified leads with AI-powered Google Ads campaigns, conversion tracking and landing page optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="pillar-btn-row mt-8"
          >
            <PrimaryCTA href="#audit-final">Get Free Google Ads Audit</PrimaryCTA>
            <SecondaryCTA href="#results">View Case Studies</SecondaryCTA>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: campaign dashboard visual (the audit form lives in the final CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full"
        >
          <img
            src="/hero-section-image.webp"
            alt="Google Ads campaign dashboard, GA4 analytics, and Google Search result preview for Digital Aura"
            className="w-full h-auto drop-shadow-[0_30px_60px_rgba(26,29,54,0.16)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
