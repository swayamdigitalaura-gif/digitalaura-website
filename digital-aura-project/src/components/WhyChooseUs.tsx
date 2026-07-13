import { motion } from "framer-motion";
import { Bot, Layers, FileText, Target } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import CMSIcon from "@/components/CMSIcon";

const FEATURE_ICONS = [Bot, Layers, FileText, Target];
const FEATURE_ICON_NAMES = ["Bot", "Layers", "FileText", "Target"];
const FEATURE_COLORS = ["#7C3AED", "#FF6B2B", "#1A6FE8", "#FF6B2B"];
const FEATURE_BG = ["rgba(124,58,237,0.08)", "rgba(255,107,43,0.08)", "rgba(26,111,232,0.08)", "rgba(255,107,43,0.08)"];

const FEATURE_DEFAULTS = [
  { title: "AI First Approach",       desc: "Every solution we build leverages the latest AI tools and automation to give your business a real edge." },
  { title: "End to End Execution",    desc: "From idea to launch to marketing, we handle everything in house, no outsourcing, no finger pointing." },
  { title: "Transparent Reporting",   desc: "Real time dashboards and monthly reports with zero fluff, you always know exactly where your money goes." },
  { title: "ROI Focused Always",      desc: "Whether it's an app or an ad campaign, we measure what matters, revenue, leads, and real growth." },
];

const WhyChooseUs = () => {
  const s = useSettings([
    'why_badge', 'why_heading',
    'why_left_h3', 'why_left_p1', 'why_left_p2',
    'why_stat1_n', 'why_stat1_l', 'why_stat2_n', 'why_stat2_l', 'why_stat3_n', 'why_stat3_l',
    'why_feat1_title', 'why_feat1_desc',
    'why_feat2_title', 'why_feat2_desc',
    'why_feat3_title', 'why_feat3_desc',
    'why_feat4_title', 'why_feat4_desc',
  ]);

  const features = FEATURE_DEFAULTS.map((def, i) => ({
    icon: FEATURE_ICONS[i],
    iconName: FEATURE_ICON_NAMES[i],
    color: FEATURE_COLORS[i],
    bg: FEATURE_BG[i],
    title: s[`why_feat${i+1}_title`] || def.title,
    desc: s[`why_feat${i+1}_desc`] || def.desc,
    titleKey: `why_feat${i+1}_title` as string,
    descKey: `why_feat${i+1}_desc` as string,
  }));

  return (
  <section className="py-20 px-4 md:px-8 relative overflow-hidden" style={{ background: "#F8FAFF" }}>
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      aria-hidden
    >
      <span className="text-[18vw] font-black tracking-widest uppercase leading-none text-[#7C3AED]/[0.03]">
        AI + RESULTS
      </span>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="section-badge" data-cms-key="why_badge" data-cms-label="Why Us Badge" data-cms-attr="text">
          {s.why_badge || 'Why Choose Us'}
        </span>
        <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight" data-cms-key="why_heading" data-cms-label="Why Us Heading" data-cms-attr="text">
          {s.why_heading || 'Why 750+ Businesses Trust Digital Aura'}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#0A1628] leading-tight mb-5" data-cms-key="why_left_h3" data-cms-label="Why Us Left H3" data-cms-attr="text">
            {s.why_left_h3 || 'We Build with AI. We Grow with Data.'}
          </h3>
          <p className="text-[#4B5563] leading-relaxed text-lg mb-5" data-cms-key="why_left_p1" data-cms-label="Why Us Left Paragraph 1" data-cms-attr="text">
            {s.why_left_p1 || 'At Digital Aura, we combine cutting edge AI development with data driven marketing to deliver solutions that actually move the needle, from custom web & app solutions to performance campaigns, measurably and consistently.'}
          </p>
          <p className="text-[#4B5563] leading-relaxed mb-8" data-cms-key="why_left_p2" data-cms-label="Why Us Left Paragraph 2" data-cms-attr="text">
            {s.why_left_p2 || "From the first strategy call to monthly performance reviews, we treat your business like our own. That's why our clients stay with us, not because of contracts, but because of results."}
          </p>

          <div className="flex gap-4 flex-wrap">
            {[
              { nKey: 'why_stat1_n', lKey: 'why_stat1_l', defN: '1000+', defL: 'Web & Apps Built',  color: '#7C3AED' },
              { nKey: 'why_stat2_n', lKey: 'why_stat2_l', defN: '750+', defL: 'Clients Served',    color: '#FF6B2B' },
              { nKey: 'why_stat3_n', lKey: 'why_stat3_l', defN: '50X',  defL: 'ROI Generated for Clients', color: '#1A6FE8' },
            ].map((st) => (
              <div
                key={st.lKey}
                className="px-5 py-4 rounded-xl border text-center"
                style={{ borderColor: "#E5E7EB", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <div className="text-2xl font-black" style={{ color: st.color }} data-cms-key={st.nKey} data-cms-label={`Why Stat Number`} data-cms-attr="text">
                  {s[st.nKey] || st.defN}
                </div>
                <div className="text-sm text-[#6B7280] mt-0.5 font-medium" data-cms-key={st.lKey} data-cms-label={`Why Stat Label`} data-cms-attr="text">
                  {s[st.lKey] || st.defL}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: feature rows */}
        <div className="space-y-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-hover flex gap-4 p-5 rounded-2xl border bg-white"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: f.bg }}
              >
                <CMSIcon cmsKey={`whyus_icon_${i}`} cmsLabel={`Feature ${i+1} Icon`} name={f.iconName} size={20} color={f.color} />
              </div>
              <div>
                <h4 className="font-bold text-[#0A1628] mb-1 text-[17px]" data-cms-key={f.titleKey} data-cms-label={`Feature ${i+1} Title`} data-cms-attr="text">{f.title}</h4>
                <p className="text-[15px] leading-relaxed text-[#4B5563]" data-cms-key={f.descKey} data-cms-label={`Feature ${i+1} Desc`} data-cms-attr="text">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default WhyChooseUs;
