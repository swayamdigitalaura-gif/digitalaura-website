import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, TrendingUp, BadgeCheck, Bot, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSettings } from "@/hooks/useSettings";

const barHeights = [30, 45, 38, 60, 52, 75, 65, 85, 80, 92, 88, 100];

const Hero = () => {
  const s = useSettings(['hero_badge','hero_heading_line1','hero_heading_line2','hero_subtext','hero_cta1','hero_cta2']);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          bar.style.transition = `height 0.55s cubic-bezier(0.34,1.56,0.64,1) ${0.9 + i * 0.06}s`;
          bar.style.height = `${barHeights[i]}%`;
        }
      });
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
      style={{ background: "#FFFFFF" }}
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute animate-drift rounded-full"
          style={{
            width: 640, height: 640, top: "-15%", right: "-10%",
            background: "radial-gradient(circle at 40% 40%, rgba(255,107,43,0.13) 0%, rgba(255,107,43,0.04) 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute animate-drift-2 rounded-full"
          style={{
            width: 560, height: 560, bottom: "-12%", left: "-8%",
            background: "radial-gradient(circle at 60% 60%, rgba(124,58,237,0.08) 0%, rgba(26,111,232,0.05) 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "20%", right: "15%", width: 300, height: 300,
            background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-40" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* LEFT, 60% */}
          <div className="lg:col-span-3">
            {/* Animated AI badge */}
            <motion.div {...fadeUp(0.05)}>
              <span
                data-cms-key="hero_badge" data-cms-label="Hero Badge" data-cms-attr="text"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border animate-ai-glow"
                style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.3)", color: "#7C3AED" }}
              >
                <Zap size={14} fill="#7C3AED" />
                {s.hero_badge || "AI Powered Full Service Digital Company"}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.15)}
              className="text-4xl md:text-5xl lg:text-[60px] font-bold leading-[1.1] text-[#0A1628] mb-5 tracking-tight"
            >
              <span data-cms-key="hero_heading_line1" data-cms-label="Heading Line 1" data-cms-attr="text">
                {s.hero_heading_line1 || <>We <span className="text-[#0A1628]">Build.</span> We <span className="text-orange-gradient">Automate.</span></>}
              </span>
              <br />
              <span data-cms-key="hero_heading_line2" data-cms-label="Heading Line 2" data-cms-attr="text">
                {s.hero_heading_line2 || <>We <span className="text-blue-gradient">Grow</span> <span className="text-[#0A1628]">Your Business.</span></>}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.25)}
              data-cms-key="hero_subtext" data-cms-label="Hero Subtext" data-cms-attr="text"
              className="text-lg leading-relaxed mb-8 max-w-xl text-[#4B5563]"
            >
              {s.hero_subtext || "From AI solutions to web & mobile apps, and powerful marketing systems, Digital Aura builds, launches, and scales your digital future."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-4 mb-9">
              <a href="#contact" data-cms-key="hero_cta1" data-cms-label="Primary Button" data-cms-attr="text" className="btn-orange px-8 py-4 text-base gap-2">
                {s.hero_cta1 || "Get Free Consultation"} <ArrowRight size={18} />
              </a>
              <a href="#case-studies" data-cms-key="hero_cta2" data-cms-label="Secondary Button" data-cms-attr="text" className="btn-outline-dark px-8 py-4 text-base gap-2">
                {s.hero_cta2 || "Explore Our Work"}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-x-6 gap-y-3">
              {["AI First Approach", "750+ Projects Delivered", "End to End Solutions"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                  <CheckCircle2 size={16} className="text-[#22C55E] shrink-0" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT, 40%: Floating Dashboard Card */}
          <div className="lg:col-span-2 hidden lg:flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="animate-bob w-full max-w-[340px]"
            >
              <div
                className="rounded-2xl p-6 border"
                style={{
                  background: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(124,58,237,0.07)",
                }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    {/* AI chip */}
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold"
                      style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}
                    >
                      <Bot size={10} /> AI
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A1628] text-sm"><span data-cms-key="hero_h3_7" data-cms-label="Card Heading" data-cms-attr="text">Project & Growth Dashboard</span></h3>
                      <p className="text-[#6B7280] text-xs mt-0.5"><span data-cms-key="hero_p_8" data-cms-label="Body Text" data-cms-attr="text">Last 12 months</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-ring" />
                    <span className="text-xs text-[#22C55E] font-semibold">Live</span>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-1 h-28 mb-4 px-1">
                  {barHeights.map((_, i) => (
                    <div
                      key={i}
                      ref={(el) => { if (el) barsRef.current[i] = el; }}
                      className="flex-1 rounded-t"
                      style={{
                        height: 0,
                        background: i >= barHeights.length - 4
                          ? "linear-gradient(to top, #22C55E, #86efac)"
                          : i % 3 === 0
                            ? "linear-gradient(to top, #7C3AED, #c4b5fd)"
                            : i % 2 === 0
                              ? "linear-gradient(to top, #FF6B2B, #fdba74)"
                              : "linear-gradient(to top, #1A6FE8, #93c5fd)",
                        minWidth: 0,
                      }}
                    />
                  ))}
                </div>

                {/* Metric pills */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {[
                    { label: "↑ 1000+ Web & Apps Built",  color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
                    { label: "↑ 174% Traffic",    color: "#FF6B2B", bg: "rgba(255,107,43,0.08)" },
                    { label: "↑ 200% Leads",      color: "#1A6FE8", bg: "rgba(26,111,232,0.08)" },
                  ].map((m) => (
                    <span
                      key={m.label}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                      style={{ color: m.color, background: m.bg, borderColor: m.bg }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Bottom stats */}
                <div
                  className="pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "#F3F4F6" }}
                >
                  <div>
                    <p className="text-xs text-[#6B7280]"><span data-cms-key="hero_p_9" data-cms-label="Body Text" data-cms-attr="text">Avg. Client Growth</span></p>
                    <p className="text-xl font-bold text-[#0A1628] flex items-center gap-1">
                      +127% <TrendingUp size={16} className="text-[#22C55E]" />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B7280]"><span data-cms-key="hero_p_10" data-cms-label="Body Text" data-cms-attr="text">Happy Clients</span></p>
                    <p className="text-xl font-bold text-[#FF6B2B]">750+</p>
                  </div>
                </div>
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-4 flex justify-end"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm"
                  style={{ background: "#FBF9FF", borderColor: "rgba(124,58,237,0.2)" }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124,58,237,0.12)" }}>
                    <BadgeCheck size={16} style={{ color: "#7C3AED" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#7C3AED]"><span data-cms-key="hero_p_11" data-cms-label="Body Text" data-cms-attr="text">Google Partner</span></p>
                    <p className="text-[10px] text-[#6B7280]"><span data-cms-key="hero_p_12" data-cms-label="Body Text" data-cms-attr="text">Certified Agency</span></p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer z-20"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={24} className="text-[#FF6B2B] animate-chevron" />
      </button>
    </section>
  );
};

export default Hero;
