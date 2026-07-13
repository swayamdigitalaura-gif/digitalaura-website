import { motion } from "framer-motion";

const row1 = [
  { name: "React",        dot: "#61DAFB" },
  { name: "Node.js",      dot: "#68A063" },
  { name: "Python",       dot: "#3776AB" },
  { name: "Next.js",      dot: "#000000" },
  { name: "Flutter",      dot: "#54C5F8" },
  { name: "React Native", dot: "#61DAFB" },
  { name: "AWS",          dot: "#FF9900" },
  { name: "Firebase",     dot: "#FFCA28" },
  { name: "Google Ads",   dot: "#4285F4" },
  { name: "Meta Ads",     dot: "#0866FF" },
  { name: "Google Analytics", dot: "#F9AB00" },
  { name: "LinkedIn Ads", dot: "#0A66C2" },
  { name: "Microsoft Ads", dot: "#00A4EF" },
  // duplicate for seamless loop
  { name: "React",        dot: "#61DAFB" },
  { name: "Node.js",      dot: "#68A063" },
  { name: "Python",       dot: "#3776AB" },
  { name: "Next.js",      dot: "#000000" },
  { name: "Flutter",      dot: "#54C5F8" },
  { name: "React Native", dot: "#61DAFB" },
  { name: "AWS",          dot: "#FF9900" },
  { name: "Firebase",     dot: "#FFCA28" },
  { name: "Google Ads",   dot: "#4285F4" },
  { name: "Meta Ads",     dot: "#0866FF" },
  { name: "Google Analytics", dot: "#F9AB00" },
  { name: "LinkedIn Ads", dot: "#0A66C2" },
  { name: "Microsoft Ads", dot: "#00A4EF" },
];

const row2 = [
  { name: "OpenAI",       dot: "#10A37F" },
  { name: "WordPress",    dot: "#21759B" },
  { name: "Shopify",      dot: "#96BF48" },
  { name: "Magento",      dot: "#F26322" },
  { name: "TailwindCSS",  dot: "#38B2AC" },
  { name: "MongoDB",      dot: "#4DB33D" },
  { name: "PostgreSQL",   dot: "#336791" },
  { name: "Docker",       dot: "#2496ED" },
  { name: "SEMrush",      dot: "#FF642D" },
  { name: "Ahrefs",       dot: "#FF7043" },
  { name: "HubSpot",      dot: "#FF7A59" },
  { name: "Mailchimp",    dot: "#FFE01B" },
  { name: "Google Tag Manager", dot: "#4285F4" },
  { name: "Google Merchant Center", dot: "#34A853" },
  // duplicate
  { name: "OpenAI",       dot: "#10A37F" },
  { name: "WordPress",    dot: "#21759B" },
  { name: "Shopify",      dot: "#96BF48" },
  { name: "Magento",      dot: "#F26322" },
  { name: "TailwindCSS",  dot: "#38B2AC" },
  { name: "MongoDB",      dot: "#4DB33D" },
  { name: "PostgreSQL",   dot: "#336791" },
  { name: "Docker",       dot: "#2496ED" },
  { name: "SEMrush",      dot: "#FF642D" },
  { name: "Ahrefs",       dot: "#FF7043" },
  { name: "HubSpot",      dot: "#FF7A59" },
  { name: "Mailchimp",    dot: "#FFE01B" },
  { name: "Google Tag Manager", dot: "#4285F4" },
  { name: "Google Merchant Center", dot: "#34A853" },
];

const TechPill = ({ name, dot }: { name: string; dot: string }) => (
  <span
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border text-sm font-semibold text-[#374151] whitespace-nowrap"
    style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
  >
    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
    {name}
  </span>
);

const TechStack = () => (
  <section className="pt-4 pb-16 px-0 overflow-hidden" style={{ background: "#F8F9FF" }}>
    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge" data-cms-key="techstack_badge_2" data-cms-label="Section Badge" data-cms-attr="text">Tech Stack</span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0A1628] mt-2 mb-2"><span data-cms-key="techstack_h2_3" data-cms-label="Section Heading" data-cms-attr="text">Technologies We Work With</span></h2>
        <p className="text-[#6B7280] text-sm"><span data-cms-key="techstack_1" data-cms-label="P Text" data-cms-attr="text">Modern tech stack for modern businesses</span></p>
      </motion.div>
    </div>

    {/* Row 1, scrolls left */}
    <div className="overflow-hidden mb-3">
      <div className="marquee-track flex gap-3" style={{ width: "max-content" }}>
        {row1.map((t, i) => <TechPill key={i} {...t} />)}
      </div>
    </div>

    {/* Row 2, scrolls right */}
    <div className="overflow-hidden">
      <div className="marquee-track-reverse flex gap-3" style={{ width: "max-content" }}>
        {row2.map((t, i) => <TechPill key={i} {...t} />)}
      </div>
    </div>
  </section>
);

export default TechStack;
