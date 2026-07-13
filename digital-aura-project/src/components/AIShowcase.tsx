import { motion } from "framer-motion";
import { Zap, Target, Bot, BarChart3, ArrowRight, Brain, Code2, Cpu, Sparkles } from "lucide-react";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";

const FEATURE_DEFAULTS = [
  { icon: Zap,      iconName: "Zap",      color: "#FF6B2B", title: "10x Faster Development",      desc: "AI assisted coding means we ship products faster without cutting corners." },
  { icon: Target,   iconName: "Target",   color: "#1A6FE8", title: "Smarter Marketing Decisions",  desc: "AI analyzes your data to find exactly what drives conversions and revenue." },
  { icon: Bot,      iconName: "Bot",      color: "#7C3AED", title: "Automation Built In",          desc: "Every project includes workflow automation to save your team hours daily." },
  { icon: BarChart3,iconName: "BarChart3",color: "#22C55E", title: "Predictive Analytics",         desc: "Know what your customers want before they do with AI powered insights." },
];

const TECH_PILLS_DEFAULT = ["GPT-4", "LangChain", "TensorFlow", "OpenAI API", "ML Models"];

const floatingIcons = [
  { Icon: Brain,    top: "8%",    left: "8%",   size: 32, color: "#a78bfa", cls: "animate-float-1" },
  { Icon: Code2,    top: "10%",   right: "8%",  size: 28, color: "#60a5fa", cls: "animate-float-2" },
  { Icon: Cpu,      bottom: "10%",left: "10%",  size: 30, color: "#f97316", cls: "animate-float-3" },
  { Icon: Sparkles, bottom: "8%", right: "8%",  size: 26, color: "#34d399", cls: "animate-float-4" },
];

const AIShowcase = () => {
  const s = useSettings([
    'aishow_badge', 'aishow_heading', 'aishow_heading_hl', 'aishow_subtext',
    'aishow_card_title', 'aishow_card_sub',
    'aishow_pill_1', 'aishow_pill_2', 'aishow_pill_3', 'aishow_pill_4', 'aishow_pill_5',
    'aishow_cta',
    'aishow_feat1_title', 'aishow_feat1_desc',
    'aishow_feat2_title', 'aishow_feat2_desc',
    'aishow_feat3_title', 'aishow_feat3_desc',
    'aishow_feat4_title', 'aishow_feat4_desc',
  ]);

  const features = FEATURE_DEFAULTS.map((def, i) => ({
    ...def,
    title: s[`aishow_feat${i+1}_title`] || def.title,
    desc:  s[`aishow_feat${i+1}_desc`]  || def.desc,
    titleKey: `aishow_feat${i+1}_title`,
    descKey:  `aishow_feat${i+1}_desc`,
  }));

  const pills = [
    s.aishow_pill_1 || TECH_PILLS_DEFAULT[0],
    s.aishow_pill_2 || TECH_PILLS_DEFAULT[1],
    s.aishow_pill_3 || TECH_PILLS_DEFAULT[2],
    s.aishow_pill_4 || TECH_PILLS_DEFAULT[3],
    s.aishow_pill_5 || TECH_PILLS_DEFAULT[4],
  ];

  return (
  <section id="ai-solutions" className="pt-20 pb-10 px-4 md:px-8 relative overflow-hidden" style={{ background: "#FAFAFF" }}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(124,58,237,0.05) 0%, transparent 60%)" }} />

    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span
          data-cms-key="aishow_badge" data-cms-label="AI Showcase Badge" data-cms-attr="text"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 tracking-widest uppercase animate-ai-glow"
          style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          <Bot size={12} /> {s.aishow_badge || 'AI First Company'}
        </span>
        <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mb-4">
          <span data-cms-key="aishow_heading" data-cms-label="AI Showcase Heading" data-cms-attr="text">
            {s.aishow_heading || "We Don't Just Use AI ,"}
          </span>{" "}
          <span data-cms-key="aishow_heading_hl" data-cms-label="AI Showcase Heading Highlight" data-cms-attr="text" className="text-purple-gradient">
            {s.aishow_heading_hl || 'We Build With It'}
          </span>
        </h2>
        <p data-cms-key="aishow_subtext" data-cms-label="AI Showcase Subtext" data-cms-attr="text" className="text-[#4B5563] max-w-xl mx-auto text-lg">
          {s.aishow_subtext || 'Every solution we create is infused with artificial intelligence to give your business a competitive edge.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT: Visual card */}
        <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="relative rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 md:p-10 lg:p-14"
            style={{ minHeight: "520px", background: "linear-gradient(135deg, #0A1628 0%, #1a1040 50%, #0f2044 100%)", boxShadow: "0 40px 100px rgba(124,58,237,0.25), 0 8px 32px rgba(0,0,0,0.35)" }}>
            <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.5) 0%, rgba(26,111,232,0.3) 40%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* Floating icons */}
            {floatingIcons.map(({ Icon, top, left, right, bottom, size, color, cls }, i) => (
              <div key={i} className={`absolute ${cls}`}
                style={{ top, left, right, bottom, width: size + 20, height: size + 20, background: "rgba(255,255,255,0.07)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                <Icon size={size} color={color} />
              </div>
            ))}

            {/* Center content */}
            <div className="relative z-10 text-center">
              <div className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-7"
                style={{ background: "linear-gradient(135deg, #7C3AED, #1A6FE8)", boxShadow: "0 12px 48px rgba(124,58,237,0.6)" }}>
                <CMSIcon cmsKey="aishow_icon_1" cmsLabel="Center Bot Icon" name="Bot" size={52} color="#fff" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                <span data-cms-key="aishow_card_title" data-cms-label="Card Title" data-cms-attr="text">{s.aishow_card_title || 'AI Powered'}</span>
              </h3>
              <p className="text-[#a78bfa] text-base font-medium">
                <span data-cms-key="aishow_card_sub" data-cms-label="Card Subtitle" data-cms-attr="text">{s.aishow_card_sub || 'Every solution. Every project.'}</span>
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2.5 justify-center mt-8">
                {pills.map((t, pi) => (
                  <span key={pi} data-cms-key={`aishow_pill_${pi+1}`} data-cms-label={`Tech Pill ${pi+1}`} data-cms-attr="text"
                    className="px-4 py-1.5 rounded-full text-sm font-semibold"
                    style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Feature rows + CTA */}
        <div>
          <div className="space-y-4 mb-8">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-hover flex gap-4 p-5 rounded-2xl border bg-white"
                style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${f.color}14` }}>
                  <CMSIcon cmsKey={`aishow_feat_icon_${i}`} cmsLabel={`${f.title} Icon`} name={f.iconName} size={20} color={f.color} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A1628] mb-1" data-cms-key={f.titleKey} data-cms-label={`Feature ${i+1} Title`} data-cms-attr="text">{f.title}</h4>
                  <p className="text-sm leading-relaxed text-[#4B5563]" data-cms-key={f.descKey} data-cms-label={`Feature ${i+1} Desc`} data-cms-attr="text">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <a href="#contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex"
              style={{ background: "linear-gradient(135deg, #7C3AED, #6d28d9)", boxShadow: "0 4px 18px rgba(124,58,237,0.35)" }}>
              <span data-cms-key="aishow_cta" data-cms-label="CTA Button Text" data-cms-attr="text">{s.aishow_cta || 'See How We Use AI'}</span> <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default AIShowcase;
