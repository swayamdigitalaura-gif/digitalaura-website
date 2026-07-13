import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PageHeroProps {
  badge: string;
  badgeColor?: string;
  badgeBg?: string;
  title: React.ReactNode;
  subtitle: string;
  Icon?: LucideIcon;
}

const PageHero = ({
  badge,
  badgeColor = "#FF6B2B",
  badgeBg = "rgba(255,107,43,0.1)",
  title,
  subtitle,
  Icon,
}: PageHeroProps) => (
  <section
    className="relative pt-[72px] pb-16 px-4 md:px-8 overflow-hidden"
    style={{ background: "#FFFFFF" }}
  >
    {/* Decorative blobs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute rounded-full animate-drift"
        style={{
          width: 500, height: 500, top: "-20%", right: "-10%",
          background: `radial-gradient(circle, ${badgeBg.replace("0.1", "0.12")} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute rounded-full animate-drift-2"
        style={{
          width: 400, height: 400, bottom: "-15%", left: "-8%",
          background: "radial-gradient(circle, rgba(26,111,232,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
    <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />

    <div className="max-w-4xl mx-auto text-center relative z-10 pt-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
          style={{
            background: badgeBg,
            color: badgeColor,
            border: `1px solid ${badgeColor}40`,
          }}
        >
          {Icon && <Icon size={12} />}
          <span data-cms-key="pagehero_1" data-cms-label="Page Hero Badge" data-cms-attr="text">{badge}</span>
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight">
          <span data-cms-key="pagehero_2" data-cms-label="Page Hero Title" data-cms-attr="text">{title}</span>
        </h1>
        <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
          <span data-cms-key="pagehero_3" data-cms-label="Page Hero Subtitle" data-cms-attr="text">{subtitle}</span>
        </p>
      </motion.div>
    </div>
  </section>
);

export default PageHero;
