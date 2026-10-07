import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { MapPin, ArrowRight } from "lucide-react";

const HEADING = "#0A1628";
const ORANGE = "#FF6B2B";

interface AreaLink {
  label: string;
  href: string;
}

interface AreaGroup {
  title: string;
  subtitle: string;
  color: string;
  links: AreaLink[];
}

const groups: AreaGroup[] = [
  {
    title: "Ahmedabad",
    subtitle: "Our home base — the full range of services, delivered locally.",
    color: "#FF6B2B",
    links: [
      { label: "Digital Marketing Agency in Ahmedabad", href: "/digital-marketing-agency-ahmedabad/" },
      { label: "SEO Agency in Ahmedabad", href: "/seo-agency-ahmedabad/" },
      { label: "Google Ads Agency in Ahmedabad", href: "/google-ads-agency-ahmedabad" },
      { label: "Meta Ads Agency in Ahmedabad", href: "/meta-ads-agency-ahmedabad/" },
      { label: "Website Design & Development in Ahmedabad", href: "/website-design-development-ahmedabad/" },
      { label: "Website Development Services in Ahmedabad", href: "/website-development-services-ahmedabad/" },
      { label: "Full Stack Development in Ahmedabad", href: "/full-stack-development-ahmedabad/" },
      { label: "Shopify Website Design in Ahmedabad", href: "/shopify-website-design-ahmedabad/" },
      { label: "WooCommerce Website Design in Ahmedabad", href: "/woocommerce-website-design-ahmedabad/" },
      { label: "Mobile App Development in Ahmedabad", href: "/mobile-app-development-ahmedabad/" },
      { label: "AI Automation Company in Ahmedabad", href: "/ai-automation-ahmedabad/" },
      { label: "AI Filmmaking in Ahmedabad", href: "/ai-filmmaking-ahmedabad/" },
    ],
  },
  {
    title: "Gujarat-Wide",
    subtitle: "Serving Surat, Vadodara, Rajkot, Gandhinagar, and beyond — remotely.",
    color: "#1A6FE8",
    links: [
      { label: "Digital Marketing Agency in Gujarat", href: "/digital-marketing-agency-gujarat/" },
      { label: "SEO Company in Gujarat", href: "/seo-company-gujarat/" },
      { label: "Website Design & Development in Gujarat", href: "/website-design-development-gujarat/" },
      { label: "Full Stack Development in Gujarat", href: "/full-stack-development-gujarat/" },
      { label: "WooCommerce Development in Gujarat", href: "/woocommerce-development-gujarat/" },
      { label: "Mobile App Development in Gujarat", href: "/mobile-app-development-gujarat/" },
      { label: "AI Automation Company in Gujarat", href: "/ai-automation-gujarat/" },
      { label: "AI Filmmaking Company in Gujarat", href: "/ai-filmmaking-gujarat/" },
    ],
  },
  {
    title: "International",
    subtitle: "Working async with D2C and SaaS brands across the US, UK, and Australia.",
    color: "#7C3AED",
    links: [
      { label: "SEO Agency for International Clients", href: "/seo-agency-international/" },
      { label: "Shopify Development for International Brands", href: "/shopify-development-international/" },
    ],
  },
];

const ServiceAreasPage = () => {
  return (
    <PageLayout>
      <section className="pt-32 pb-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,107,43,0.1)" }}>
            <MapPin size={14} style={{ color: ORANGE }} />
            <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: ORANGE }}>Where We Work</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: HEADING }}>
            Service Areas We Serve
          </h1>
          <p className="text-[15px] md:text-base max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Digital Aura is based in Ahmedabad, Gujarat — but our in-house team delivers SEO, web development,
            AI automation, and digital marketing to businesses across the state and around the world.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-14">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: group.color }} />
                <h2 className="text-xl font-bold" style={{ color: HEADING }}>{group.title}</h2>
              </div>
              <p className="text-[13.5px] mb-5 ml-[22px]" style={{ color: "#6B7280" }}>{group.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.links.map((link) => (
                  <motion.div key={link.href} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                    <Link
                      to={link.href}
                      className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl border transition-colors"
                      style={{ borderColor: "#E5E7EB" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = group.color; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E5E7EB"; }}
                    >
                      <span className="text-[13.5px] font-medium" style={{ color: HEADING }}>{link.label}</span>
                      <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: group.color }} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceAreasPage;
