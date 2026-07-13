import { motion } from "framer-motion";
import { ArrowRight, Building2, Dumbbell, ShoppingCart, Stethoscope, Wrench, Plane, Factory, Gamepad2, PartyPopper, AppWindow } from "lucide-react";
import { Eyebrow, H2, Lead, Section } from "../shared/SectionPrimitives";

const INDUSTRIES = [
  {
    icon: Stethoscope,
    name: "Healthcare & Clinics",
    pain: "High patient acquisition costs on generic keywords across IVF, ophthalmology, and diagnostics.",
    outcome: "More qualified appointment bookings",
    stat: "↓ 52% cost / appointment",
  },
  {
    icon: Building2,
    name: "Real Estate",
    pain: "Low-intent broker inquiries with no CRM sync or lead verification.",
    outcome: "Verified property enquiries",
    stat: "↑ 280% site visits booked",
  },
  {
    icon: ShoppingCart,
    name: "eCommerce & Retail",
    pain: "Unoptimized Shopping feeds and high cart abandonment.",
    outcome: "Higher blended ROAS",
    stat: "↑ 7.2x ROAS achieved",
  },
  {
    icon: Dumbbell,
    name: "Education & Fitness",
    pain: "High dropoff on admissions and membership signup funnels.",
    outcome: "Lower cost per enrollment",
    stat: "↓ 46% cost / enquiry",
  },
  {
    icon: Wrench,
    name: "Home & Local Services",
    pain: "Unverified lead calls with no attribution back to campaigns.",
    outcome: "Tracked, qualified service calls",
    stat: "↓ 38% cost / call",
  },
  {
    icon: Plane,
    name: "Travel & Hospitality",
    pain: "Inconsistent booking volume on custom package campaigns.",
    outcome: "Predictable booking growth",
    stat: "↑ 5.1x ROAS on packages",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    pain: "Long B2B sales cycles with low-quality bulk enquiry leads.",
    outcome: "Qualified B2B buyer enquiries",
    stat: "↓ 41% cost / qualified lead",
  },
  {
    icon: Gamepad2,
    name: "Gaming",
    pain: "High install costs with low-value, non-paying users.",
    outcome: "Higher LTV player acquisition",
    stat: "↑ 3.8x ROAS on installs",
  },
  {
    icon: PartyPopper,
    name: "Events",
    pain: "Inconsistent ticket sales and last-minute booking drop-offs.",
    outcome: "Predictable ticket & venue bookings",
    stat: "↑ 4.4x ROAS on ticket sales",
  },
  {
    icon: AppWindow,
    name: "SaaS",
    pain: "High trial signup costs with low trial-to-paid conversion.",
    outcome: "More qualified demo & trial signups",
    stat: "↓ 44% cost / paid signup",
  },
];

export function IndustrySolutions() {
  return (
    <Section id="industries" className="bg-white">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Eyebrow>Industry Solutions</Eyebrow>
        <H2 className="mt-6">We Know How To Sell In Your Industry</H2>
        <Lead className="mt-6 mx-auto">
          We understand your margins, your customer value, and what a qualified lead actually looks like.
        </Lead>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((ind, i) => (
          <motion.div
            key={ind.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}
            className="group relative flex flex-col justify-between rounded-3xl border border-border bg-surface-cream p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="grid size-13 place-items-center rounded-2xl bg-navy text-white transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <ind.icon className="size-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-success bg-success/15 px-3 py-1.5 rounded-full leading-none">
                  {ind.stat}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-semibold text-navy tracking-[-0.01em]">{ind.name}</h3>
              <p className="mt-4 text-[14.5px] text-muted-foreground leading-[1.72]">{ind.pain}</p>
              <p className="mt-4 text-[14px] font-bold text-primary">{ind.outcome}</p>
            </div>
            <div className="mt-7 pt-5 border-t border-border flex items-center justify-between">
              <a href="#audit" className="text-[13px] font-bold text-navy hover-link-underline">Get Vertical Roadmap</a>
              <ArrowRight className="size-3.5 text-navy/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
