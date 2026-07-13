import { motion } from "framer-motion";
import { Lightbulb, Cpu, Bot, TrendingUp } from "lucide-react";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";

const STEP_DEFAULTS = [
  { num: "01", icon: Lightbulb, iconName: "Lightbulb", color: "#7C3AED", bg: "rgba(124,58,237,0.1)", title: "Strategic Thinking",   desc: "We audit your market, competitors, and goals, then build a precise digital roadmap tailored to your business, not a template." },
  { num: "02", icon: Cpu,       iconName: "Cpu",       color: "#FF6B2B", bg: "rgba(255,107,43,0.1)",  title: "Product Engineering",  desc: "Design, build, and ship, from UI/UX to full stack development. Clean code, tested thoroughly, delivered on time." },
  { num: "03", icon: Bot,       iconName: "Bot",       color: "#1A6FE8", bg: "rgba(26,111,232,0.1)",  title: "AI Enhancement",       desc: "Every product we ship is layered with AI, automation, intelligent workflows, and smart integrations that give you an unfair advantage." },
  { num: "04", icon: TrendingUp,iconName: "TrendingUp",color: "#22C55E", bg: "rgba(34,197,94,0.1)",   title: "Continuous Growth",    desc: "Post launch isn't the end, it's the start. We optimise, iterate, and scale your product and marketing in continuous cycles." },
];

const ProcessSection = () => {
  const s = useSettings([
    'process_badge', 'process_heading', 'process_heading_hl', 'process_subtext', 'process_cta',
    'process_step_0_title','process_step_0_desc',
    'process_step_1_title','process_step_1_desc',
    'process_step_2_title','process_step_2_desc',
    'process_step_3_title','process_step_3_desc',
  ]);

  const steps = STEP_DEFAULTS.map((def, i) => ({
    ...def,
    title: s[`process_step_${i}_title`] || def.title,
    desc:  s[`process_step_${i}_desc`]  || def.desc,
  }));

  return (
  <section className="pt-20 pb-10 px-4 md:px-8 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)" }} />

    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 tracking-widest uppercase"
          style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}
          data-cms-key="process_badge" data-cms-label="Process Badge" data-cms-attr="text">
          {s.process_badge || 'The Journey'}
        </span>
        <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mb-4">
          <span data-cms-key="process_heading" data-cms-label="Process Heading" data-cms-attr="text">{s.process_heading || 'What Happens When You'}</span>{" "}
          <span data-cms-key="process_heading_hl" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">{s.process_heading_hl || 'Work With Digital Aura'}</span>
        </h2>
        <p className="text-[#4B5563] max-w-lg mx-auto text-lg">
          <span data-cms-key="process_subtext" data-cms-label="Process Subtext" data-cms-attr="text">
            {s.process_subtext || 'Not just steps, a partnership that evolves with your business from day one to long term scale.'}
          </span>
        </p>
      </motion.div>

      <div className="relative">
        <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px"
          style={{ background: "linear-gradient(90deg, #7C3AED40, #FF6B2B40, #1A6FE840, #22C55E40)" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((st, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: si * 0.13 }} className="flex flex-col items-center text-center relative">
              <div className="relative mb-6">
                <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center border-2 bg-white"
                  style={{ borderColor: st.color, boxShadow: `0 0 0 8px ${st.bg}` }}>
                  <CMSIcon cmsKey={`process_icon_${si}`} cmsLabel={`${st.title} Icon`} name={st.iconName} size={36} color={st.color} />
                </div>
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: st.color }}>
                  {st.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-3">
                <span data-cms-key={`process_step_${si}_title`} data-cms-label="Step Title" data-cms-attr="text">{st.title}</span>
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4B5563] max-w-[200px]">
                <span data-cms-key={`process_step_${si}_desc`} data-cms-label="Step Desc" data-cms-attr="text">{st.desc}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center mt-10">
        <a href="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
          <span data-cms-key="process_cta" data-cms-label="Process CTA Button" data-cms-attr="text">{s.process_cta || 'Start Your Project'}</span>
        </a>
      </motion.div>
    </div>
  </section>
  );
};

export default ProcessSection;
