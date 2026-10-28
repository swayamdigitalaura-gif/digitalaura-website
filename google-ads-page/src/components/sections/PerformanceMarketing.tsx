import { motion } from "framer-motion";
import { Search, ShoppingCart, PlayCircle, Megaphone, Phone, FileBarChart, Layers, Activity } from "lucide-react";
import { CardBadge, CARD, PrimaryCTA, Section, SectionHead } from "../shared/SectionPrimitives";

/* Performance marketing / PPC section for the Google Ads pillar. Targets Ahmedabad
   buying-intent searches (agency, company, services, management). No new numeric
   claims: the only figures are the owner-supplied fee range already used on this page. */

const card = CARD;

const CHANNELS = [
  { Icon: Search, t: "Google Search ads", d: "Your ads show when people in Ahmedabad search for what you sell, such as a clinic, a repair, a class or a B2B service." },
  { Icon: Layers, t: "Performance Max", d: "Google runs your ads across Search, YouTube, Maps and Display from one campaign, guided by the leads or sales you track." },
  { Icon: ShoppingCart, t: "Shopping ads", d: "Product ads for online stores, built from a clean product feed so each click lands on the right product." },
  { Icon: PlayCircle, t: "YouTube ads", d: "Video ads aimed at people in the areas and groups you choose, tracked to the enquiries they lead to." },
  { Icon: Megaphone, t: "Meta ads", d: "Facebook and Instagram ads for businesses that need to create demand, run next to your Google campaigns.", h: "/meta-ads-agency-ahmedabad/", hl: "Meta ads agency in Ahmedabad" },
];

const REPORT = [
  { Icon: Phone, t: "Leads, counted", d: "Calls, WhatsApp clicks and form enquiries, each tied back to the campaign and keyword that brought it." },
  { Icon: Activity, t: "Cost per lead", d: "What each enquiry costs, so you can compare campaigns and move budget to the ones that pay." },
  { Icon: FileBarChart, t: "A monthly report and call", d: "Plain numbers on enquiries and cost per enquiry, and a call to agree what we change next." },
];

export function PerformanceMarketing() {
  return (
    <Section id="performance-marketing" className="bg-white">
      <SectionHead
        eyebrow="Performance marketing"
        title="Performance marketing agency in Ahmedabad"
        lead="Digital Aura is a Google Ads agency in Ahmedabad, and a performance marketing agency and PPC company in Hanspura. Our PPC services in Ahmedabad run your paid campaigns inside your own Google Ads account and judge them on the leads and sales they bring, not on clicks."
      />
      <div className="pillar-cols-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHANNELS.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={card}
          >
            <div className="flex items-center gap-3">
              <CardBadge><c.Icon className="size-5" /></CardBadge>
              <h3 className="font-display text-[17px] font-bold leading-snug text-navy">{c.t}</h3>
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{c.d}</p>
            {c.h && <a className="mt-2 inline-block text-[13.5px] font-semibold text-primary underline" href={c.h}>{c.hl}</a>}
          </motion.div>
        ))}
        <div className={card}>
          <h3 className="font-display text-[17px] font-bold leading-snug text-navy">PPC management services in Ahmedabad</h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
            Already running ads? We take over your existing account, fix wasted spend and tracking, and manage it every week as your PPC management company in Ahmedabad.
          </p>
          <a className="mt-2 inline-block text-[13.5px] font-semibold text-primary underline" href="/google-ads-audit-ahmedabad/">Free Google Ads audit</a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        <h3 className="text-center font-display text-[20px] font-bold text-navy">What you get from a performance marketing company in Ahmedabad</h3>
        <div className="pillar-cols-3 mt-5 grid gap-4 md:grid-cols-3">
          {REPORT.map((r) => (
            <div key={r.t} className={card}>
              <div className="flex items-center gap-3">
                <CardBadge><r.Icon className="size-5" /></CardBadge>
                <h4 className="font-display text-[16px] font-bold leading-snug text-navy">{r.t}</h4>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-3xl text-center text-[14.5px] text-muted-foreground">
        Our management fee is ₹15,000 to ₹60,000 a month plus GST, separate from your ad budget. See <a className="font-semibold text-primary underline" href="/google-ads-pricing-ahmedabad/">how Google Ads pricing works</a>, or read about our full <a className="font-semibold text-primary underline" href="/digital-marketing-company-ahmedabad/">digital marketing company in Ahmedabad</a> services.
      </p>
      <div className="pillar-btn-row pillar-btn-row--center">
        <PrimaryCTA href="#audit-final">Get a Free Google Ads Audit</PrimaryCTA>
      </div>
    </Section>
  );
}
