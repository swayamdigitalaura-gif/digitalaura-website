import { Globe2, PenTool, Zap, ShieldCheck, RefreshCw, Layout, TrendingUp, Gauge, DollarSign, Star } from "lucide-react";
import { motion } from "framer-motion";
import ServicePageLayout from "@/components/ServicePageLayout";
import ClientLogoSection from "@/components/ClientLogoSection";
import { useSettings } from "@/hooks/useSettings";

const wpComparison = (
  <section className="py-16 px-4 md:px-8 bg-white">
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-6 inline-block" style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B" }}>Not Your Typical WordPress Agency</span>
        <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
          Any Freelancer Can Set Up WordPress.<br className="hidden md:block" /> Very Few Can Build a Site That Ranks and Converts.
        </h2>
        <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8">Most WordPress developers hand you a template with your logo swapped in. We build custom WordPress sites engineered for speed, search visibility, and long-term performance.</p>
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
          <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
          {[
            { pain: "Page builders that slow your site to a crawl", detail: "Elementor and Divi stacks that bloat your Core Web Vitals and kill your Google rankings." },
            { pain: "Themes you can't edit without breaking things", detail: "Locked-in templates with zero flexibility — requiring the agency for every minor content change." },
            { pain: "No security hardening or update strategy", detail: "WordPress sites left unpatched are compromised — most agencies disappear after launch." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
              <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
              <div>
                <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3" style={{ background: "rgba(255,107,43,0.06)", borderLeftColor: "#FF6B2B" }}>
          <span className="text-[#FF6B2B] text-lg font-black mt-0.5 shrink-0">⚠</span>
          <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">If your WordPress site scores below 70 on Google PageSpeed, you're losing organic rankings and conversions every single day it stays slow.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const WordPressPage = () => {
  const _sp = useSettings(["wordpress_hero_h1","wordpress_hero_sub","wordpress_cta_btn"]);
  return (
  <ServicePageLayout
    badge="WordPress Development"
    badgeColor="#21759B"
    accentColor="#21759B"
    glowColor="rgba(33,117,155,0.12)"
    HeaderIcon={Globe2}
    title="Custom WordPress Websites Built to Perform"
    subtitle="Fast, secure, and fully tailored WordPress sites: designed for your brand, optimised for search engines, and easy to manage yourself."
    desc="We build custom WordPress websites that go beyond templates. From bespoke theme development and plugin customisation to speed optimisation and SEO: every site we deliver is built for performance, security, and long term growth. Whether you need a business site, a blog, or a full content platform, we make WordPress work for you."
    services={["Custom WordPress Theme Development","Plugin Development & Customisation","Speed & Performance Optimisation","WordPress SEO Setup & Optimisation","Website Migration & Upgrades","Ongoing Maintenance & Support"]}
    whyUs={["100% custom: no bloated templates","Mobile first, pixel perfect design","Built for speed and Google rankings","Easy admin: manage content yourself","Secure setup with regular updates","Ongoing support after launch"]}
    techStack={[
      { label: "CMS",       color: "#21759B", bg: "rgba(33,117,155,0.08)",  pills: ["WordPress", "Gutenberg", "ACF"] },
      { label: "Frontend",  color: "#1A6FE8", bg: "rgba(26,111,232,0.08)",  pills: ["HTML5", "CSS3", "JavaScript"] },
      { label: "SEO",       color: "#22C55E", bg: "rgba(34,197,94,0.08)",   pills: ["Yoast SEO", "Rank Math", "Schema"] },
      { label: "Hosting",   color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  pills: ["WP Engine", "Cloudflare", "cPanel"] },
    ]}
    techLabel="Tools & Tech"
    builds={[
      { label: "Business Websites",      Icon: Globe2 },
      { label: "Custom Themes",          Icon: Layout },
      { label: "Plugin Development",     Icon: PenTool },
      { label: "Speed Optimisation",     Icon: Zap },
      { label: "Site Migrations",        Icon: RefreshCw },
      { label: "Security Hardening",     Icon: ShieldCheck },
    ]}
    buildsLabel="What We Build"
    results={[
      { Icon: DollarSign,  text: "Higher rankings with WordPress SEO" },
      { Icon: TrendingUp,  text: "Faster load times and better UX" },
      { Icon: Gauge,       text: "Easy self-management after launch" },
      { Icon: Star,        text: "Professional, brand aligned design" },
    ]}
    ctaLabel="Build My WordPress Site"
    ctaGradient="linear-gradient(135deg, #21759B, #185a78)"
    cmsPrefix="wordpress"
    comparisonSection={wpComparison}
  >
    <ClientLogoSection servicePage="wordpress-development" accentColor="#21759B" heading="Brands Running on WordPress by Digital Aura" fallback={[
      { name: "Geotexelin",              tag: "Industrial",           logo: "https://cdn.prod.website-files.com/66aba4a3fcdeb2e1f9831db2/6761225cd949ac8e332fc819_Texel%20Logo%20for%20Website.svg",                                    logoBg: "#f0f8ff" },
      { name: "MYP Services",            tag: "Professional Services",logo: "https://mypservices.com.au/wp-content/uploads/2025/09/MYPService-Black.png",                                                                                logoBg: "#f0f8ff" },
      { name: "AgriWorld Expo",          tag: "Agriculture",          logo: "https://agriworldexpo.in/wp-content/uploads/2024/09/AgriWorldExpo-Logo-New.png",                                                                             logoBg: "#f0fff0" },
      { name: "Aroma Immigration",       tag: "Immigration Services", logo: "https://aromaimmigration.com/wp-content/uploads/2022/08/Aroma-Immigration-png-1024x386.png",                                                               logoBg: "#f5f0ff" },
      { name: "Clarity Eye Surgeons",    tag: "Healthcare",           logo: "https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png",                                          logoBg: "#f0f8ff" },
      { name: "Silverstone Financial",   tag: "Financial Services",   logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png",                                                         logoBg: "#f0faff" },
      { name: "Infinity Manpower",       tag: "Staffing & HR",        logo: "https://infinitymanpowergroup.com/wp-content/uploads/2025/01/white-logo.png",                                                                               logoBg: "#1a1a2e" },
      { name: "Sure Freeze",             tag: "HVAC & Refrigeration", logo: "https://surefreeze.com.au/wp-content/uploads/2023/09/Sure-Freeze-Logo-Updated-2.png",                                                                      logoBg: "#f0faff" },
      { name: "IntegsCloud",             tag: "Cloud Solutions",      logo: "https://integscloud.com/wp-content/uploads/2024/10/logo1-1-1-1.webp",                                                                                      logoBg: "#f0f4ff" },
      { name: "Grand Bavarchi",          tag: "Restaurant & Events",  logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png",                                                                                      logoBg: "#fff8f0" },
      { name: "Polyform Group",          tag: "Manufacturing",        logo: "https://polyformgroup.com/assets/images/logo/POLYFORMNEWLOGO_B.svg",                                                                                        logoBg: "#f5f5f5" },
      { name: "Bin Drop Dumpsters",      tag: "Waste Management",     logo: "https://www.bindropdumpsters.com/wp-content/uploads/Bin-Drop-Logo.png",                                                                                    logoBg: "#f5fff5" },
      { name: "Bhayani Group",           tag: "Business Group",       logo: "https://bhayanigroup.com/wp-content/uploads/2025/06/logo-1-1.png",                                                                                        logoBg: "#fff8f0" },
      { name: "Parasher Academy",        tag: "Education",            logo: "https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png",                                                                           logoBg: "#f5f0ff" },
      { name: "Attention Hero",          tag: "Marketing",            logo: "https://cdn.prod.website-files.com/686cabbdef588234860ed3de/6938fac9f358d0e642c011fe_attention_hero_logo.png",                                             logoBg: "#fff8f0" },
      { name: "There You Grow",          tag: "Content & Growth",     logo: "https://thereyougrow.in/wp-content/uploads/2023/08/Professional-Content-Writing-Services-Expert-Content-Writers-for-Engaging-Content-e1695101657187.png", logoBg: "#f0fff8" },
      { name: "Karm Digital",            tag: "Digital Agency",       logo: "https://karm.digital/wp-content/uploads/2025/05/karm-logo.png",                                                                                            logoBg: "#f5f0ff" },
      { name: "Active Office Furniture", tag: "Office Furniture",     logo: "https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png",                                                     logoBg: "#f0f8ff" },
      { name: "Inn of the Dove",         tag: "Hospitality",          logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp",                                                                                    logoBg: "#fff8f5" },
      { name: "Dr Ronak Patel",          tag: "Healthcare",           logo: "https://drronakpatel.in/wp-content/uploads/2025/10/LOGO-PNG-1024x1024.png",                                                                               logoBg: "#f0f7ff" },
      { name: "Dreamfoot",               tag: "Sports & Footwear",    logo: "https://dreamfoot.in/wp-content/uploads/2025/04/logo-light-4-1.png",                                                                                      logoBg: "#1a1a2e" },
      { name: "AMVI Hospitals",          tag: "Healthcare",           logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png",                                                                       logoBg: "#f5f0ff" },
      { name: "Krisha Hospital",         tag: "Healthcare",           logo: "https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png",                                                                                    logoBg: "#fff0f5" },
      { name: "Krisha Eye Hospital",     tag: "Eye Care",             logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png",                                                       logoBg: "#f0faff" },
      { name: "Aagman Hospital",         tag: "Healthcare",           logo: "https://aagmanwomenshospital.com/wp-content/uploads/2025/03/cropped-Aagman-Women-Hospital-LOGO-270x270.jpg",                                              logoBg: "#fff0f8" },
      { name: "Shukan Hospital",         tag: "Healthcare",           logo: "https://thedigitalaura.com/uploads/shukan-hospital-logo.png",                                                                                                   logoBg: "#f0fff8" },
      { name: "Gleekey",                 tag: "EdTech",               logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png",                                                                                    logoBg: "#f5f0ff" },
      { name: "Monita",                  tag: "Consulting",           logo: "https://monita.com.au/wp-content/uploads/2024/09/MONITA_v01A_Logo_BG2-sbs-200x74.png",                                                                   logoBg: "#f0f8ff" },
      { name: "Game Zone Events",        tag: "Events",               logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png",                                                                   logoBg: "#f5fff5" },
      { name: "Track My Ads",            tag: "AdTech",               logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E", logoBg: "#f0f8ff" },
    ]} />
  </ServicePageLayout>
  );
};
export default WordPressPage;
