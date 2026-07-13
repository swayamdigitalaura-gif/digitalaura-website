import { motion } from "framer-motion";
import { Bot, Smartphone, Code2, ShoppingCart, TrendingUp, Target } from "lucide-react";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";

const CHIP_DEFAULTS = [
  { icon: Bot,          iconName: "Bot",          color: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)",  label: "AI Development" },
  { icon: Code2,        iconName: "Code2",        color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", border: "rgba(26,111,232,0.2)",  label: "Web Solutions" },
  { icon: ShoppingCart, iconName: "ShoppingCart", color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.2)",  label: "eCommerce Development" },
  { icon: TrendingUp,   iconName: "TrendingUp",   color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", border: "rgba(26,111,232,0.2)",  label: "Digital Marketing" },
  { icon: Smartphone,   iconName: "Smartphone",   color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.2)",  label: "Mobile App" },
  { icon: Target,       iconName: "Target",       color: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)",  label: "Performance Marketing" },
];

const WhatWeDo = () => {
  const s = useSettings([
    'whatwedo_heading', 'whatwedo_heading_hl',
    'whatwedo_chip_0', 'whatwedo_chip_1', 'whatwedo_chip_2',
    'whatwedo_chip_3', 'whatwedo_chip_4', 'whatwedo_chip_5',
  ]);

  return (
  <section className="py-12 px-4 md:px-8" style={{ background: "#F8F9FF", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
    <div className="max-w-5xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl md:text-[32px] font-bold text-[#0A1628] mb-8">
          <span data-cms-key="whatwedo_heading" data-cms-label="WhatWeDo Heading" data-cms-attr="text">{s.whatwedo_heading || 'One Agency.'}</span>{" "}
          <span data-cms-key="whatwedo_hl_100" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">{s.whatwedo_heading_hl || 'Every Solution.'}</span>
        </h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3">
        {CHIP_DEFAULTS.map((chip, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.35 }} whileHover={{ scale: 1.06 }}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border cursor-default transition-all"
            style={{ borderColor: chip.border, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: chip.bg }}>
              <CMSIcon cmsKey={`whatwedo_icon_${i}`} cmsLabel={`${chip.label} Icon`} name={chip.iconName} size={14} color={chip.color} />
            </div>
            <span className="text-sm font-semibold text-[#0A1628]" data-cms-key={`whatwedo_chip_${i}`} data-cms-label={`Chip Label ${i+1}`} data-cms-attr="text">
              {s[`whatwedo_chip_${i}`] || chip.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  );
};

export default WhatWeDo;
