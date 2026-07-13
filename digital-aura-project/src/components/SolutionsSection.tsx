import { motion } from "framer-motion";
import { Rocket, Bot, TrendingUp, Layers, ArrowRight } from "lucide-react";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";

const SOLUTION_DEFAULTS = [
  {
    icon: Bot, iconName: "Bot", color: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)",
    tag: "AI Automation", title: "Automate Your Business",
    desc: "Cut manual work, reduce errors, and save thousands of hours per year with intelligent AI automation and smart workflow systems.",
    outcomes: ["Custom AI workflows", "Chatbot & assistants", "System integration"],
    href: "/services/ai-automation",
  },
  {
    icon: Rocket, iconName: "Rocket", color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.2)",
    tag: "Web & App Development", title: "Build Your Web & Mobile App",
    desc: "From concept to live product in weeks. We build high performance websites, web apps, and mobile apps tailored to your business goals.",
    outcomes: ["Custom Web Apps", "iOS & Android Apps", "UI/UX Design"],
    href: "/services/web-app-development",
  },
  {
    icon: TrendingUp, iconName: "TrendingUp", color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", border: "rgba(26,111,232,0.2)",
    tag: "Digital Growth", title: "Scale Digitally",
    desc: "Dominate search, paid ads, and social media with data driven campaigns managed by AI assisted marketing experts.",
    outcomes: ["SEO & Google Ads", "Meta & Social", "Analytics dashboards"],
    href: "/services/digital-marketing",
  },
  {
    icon: Layers, iconName: "Layers", color: "#22C55E", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)",
    tag: "eCommerce & Platforms", title: "Launch Your eCommerce Store",
    desc: "Build conversion optimised online stores on Shopify, WooCommerce, or custom platforms, built to sell and scale.",
    outcomes: ["Shopify & WooCommerce", "Custom eCommerce", "Payment integration"],
    href: "/services/web-app-development",
  },
];

const SolutionsSection = () => {
  const s = useSettings([
    'solutions_badge', 'solutions_heading', 'solutions_heading_hl', 'solutions_subtext',
    'solutions_card_0_tag','solutions_card_0_title','solutions_card_0_desc',
    'solutions_card_0_o0','solutions_card_0_o1','solutions_card_0_o2',
    'solutions_card_1_tag','solutions_card_1_title','solutions_card_1_desc',
    'solutions_card_1_o0','solutions_card_1_o1','solutions_card_1_o2',
    'solutions_card_2_tag','solutions_card_2_title','solutions_card_2_desc',
    'solutions_card_2_o0','solutions_card_2_o1','solutions_card_2_o2',
    'solutions_card_3_tag','solutions_card_3_title','solutions_card_3_desc',
    'solutions_card_3_o0','solutions_card_3_o1','solutions_card_3_o2',
  ]);

  const solutions = SOLUTION_DEFAULTS.map((def, i) => ({
    ...def,
    tag:   s[`solutions_card_${i}_tag`]   || def.tag,
    title: s[`solutions_card_${i}_title`] || def.title,
    desc:  s[`solutions_card_${i}_desc`]  || def.desc,
    outcomes: def.outcomes.map((o, j) => s[`solutions_card_${i}_o${j}`] || o),
  }));

  return (
  <section className="pt-10 pb-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="section-badge" data-cms-key="solutions_badge" data-cms-label="Solutions Badge" data-cms-attr="text">
          {s.solutions_badge || 'Solutions'}
        </span>
        <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight mb-4">
          <span data-cms-key="solutions_heading" data-cms-label="Solutions Heading" data-cms-attr="text">{s.solutions_heading || 'What Can We'}</span>{" "}
          <span data-cms-key="solutions_heading_hl" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">{s.solutions_heading_hl || 'Build For You?'}</span>
        </h2>
        <p className="text-[#4B5563] max-w-xl mx-auto text-lg">
          <span data-cms-key="solutions_subtext" data-cms-label="Solutions Subtext" data-cms-attr="text">
            {s.solutions_subtext || 'We focus on outcomes, not just deliverables. Choose the path that matches your business goal.'}
          </span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {solutions.map((sol, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, boxShadow: `0 20px 48px ${sol.color}22` }}
            className="group rounded-2xl p-7 border bg-white relative overflow-hidden cursor-pointer"
            style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", transition: "border-color 0.25s, box-shadow 0.25s" }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = sol.color + "60"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"}>
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: sol.color }} />
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: sol.bg, border: `1.5px solid ${sol.border}` }}>
                <CMSIcon cmsKey={`solutions_icon_${i}`} cmsLabel={`${sol.tag} Icon`} name={sol.iconName} size={26} color={sol.color} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 inline-block" style={{ background: sol.bg, color: sol.color }}>
                  <span data-cms-key={`solutions_card_${i}_tag`} data-cms-label="Solution Tag" data-cms-attr="text">{sol.tag}</span>
                </span>
                <h3 className="text-xl font-bold text-[#0A1628] mb-2">
                  <span data-cms-key={`solutions_card_${i}_title`} data-cms-label="Solution Title" data-cms-attr="text">{sol.title}</span>
                </h3>
                <p className="text-[15px] leading-relaxed text-[#4B5563] mb-5">
                  <span data-cms-key={`solutions_card_${i}_desc`} data-cms-label="Solution Description" data-cms-attr="text">{sol.desc}</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {sol.outcomes.map((o, j) => (
                    <span key={j} data-cms-key={`solutions_card_${i}_o${j}`} data-cms-label={`Outcome ${j+1}`} data-cms-attr="text"
                      className="text-sm font-semibold px-3 py-1 rounded-full"
                      style={{ background: sol.bg, color: sol.color, border: `1px solid ${sol.border}` }}>
                      ✓ {o}
                    </span>
                  ))}
                </div>
                <a href={sol.href} className="text-sm font-bold inline-flex items-center gap-1.5 group-hover:gap-3 transition-all" style={{ color: sol.color }}>
                  Explore This Solution <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default SolutionsSection;
