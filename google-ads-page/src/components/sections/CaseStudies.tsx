import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Section, SectionHead } from "../shared/SectionPrimitives";

/* Same card design as the "Proven Results" section on the home page. Only real, published case studies
   where Google Ads was part of the work are listed here. */
const CASES = [
  {
    tag: "Custom Printing & Signage · Google Ads & Shopping",
    badge: "35 WhatsApp Chats/mo",
    color: "#1A6FE8",
    title: "OBLPrint",
    statBig: "35",
    statDesc: "WhatsApp click-to-chats in a month, after we rebuilt a silent Google Ads account from the ground up, across Search and Shopping.",
    href: "/case-studies/oblprint/",
  },
  {
    tag: "Local Business · Website, Booking System & Google Ads",
    badge: "230 Customers Managed",
    color: "#FF6B2B",
    title: "Riant Bikes",
    statBig: "177",
    statDesc: "bookings processed through the new website and online booking system, with Google Ads bringing in consistent bookings.",
    href: "/case-studies/riant-bikes/",
  },
];

export function CaseStudies() {
  return (
    <Section id="results" className="bg-white">
      <SectionHead eyebrow="Proven Results" title="Real Clients. Real Growth. Real Results." lead="Real numbers from real businesses we run Google Ads for." />

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {CASES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-transform hover:-translate-y-1"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <div className="relative flex h-20 items-end px-4 pb-3" style={{ background: `linear-gradient(135deg, ${c.color}14 0%, ${c.color}05 100%)` }}>
              <span className="max-w-[55%] truncate rounded-full px-3 py-1 text-xs font-semibold" style={{ color: c.color, background: `${c.color}14` }}>{c.tag}</span>
              <span className="absolute right-3 top-3 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold" style={{ color: c.color, background: `${c.color}14`, border: `1px solid ${c.color}30` }}>{c.badge}</span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <a href={c.href}><h3 className="mb-3 text-base font-bold text-navy hover:underline">{c.title}</h3></a>
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="size-4" style={{ color: c.color }} />
                <span className="text-[36px] font-black leading-none" style={{ color: c.color }}>{c.statBig}</span>
              </div>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{c.statDesc}</p>
              <a href={c.href} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2" style={{ color: c.color }}>
                Read Full Case Study <ArrowRight className="size-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="/case-studies/" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          View All Case Studies <ArrowRight className="size-4" />
        </a>
      </div>
    </Section>
  );
}
