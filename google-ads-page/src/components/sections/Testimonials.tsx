import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Eyebrow, H2, Lead, Section } from "../shared/SectionPrimitives";

const QUOTES = [
  { quote: "Digital Aura helped us take our brand online and generate quality leads for our event solutions business.", name: "Darshil Shah", role: "Owner", company: "Elegant Event Solutions", industry: "Events", platform: "Google" },
  { quote: "Digital Aura understood our export business needs perfectly. Their SEO and Google Ads strategy helped us reach international buyers.", name: "Bharat Chavda", role: "Director", company: "Chavda Exports", industry: "Export & Trade", platform: "Clutch" },
  { quote: "Working with Digital Aura for Google Ads was a game-changer for our e-commerce store. ROAS improved by 4x in 60 days.", name: "Ananya Shah", role: "Co-Founder", company: "StyleHouse", industry: "eCommerce", platform: "GoodFirms" },
  { quote: "Excellent results and professional service! Our online presence has been outstanding since working with Digital Aura.", name: "Ketan Patel", role: "Business Owner", company: "", industry: "Local Business", platform: "Google" },
  { quote: "Working with Digital Aura transformed our online presence completely. The new website has been a game-changer.", name: "Shweta Sultania", role: "Interior Designer", company: "Sultania Interiors", industry: "Interior Design", platform: "Clutch" },
  { quote: "Outstanding digital marketing services. They understood our niche perfectly and delivered campaigns that actually convert.", name: "Rajesh Kumar", role: "Director", company: "K&R Manufacturing", industry: "Manufacturing", platform: "Clutch" },
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Eyebrow>Testimonials</Eyebrow>
        <H2 className="mt-6">Trusted By Founders & Growth Managers</H2>
        <Lead className="mt-6 mx-auto">Real reviews from Google, Clutch, and GoodFirms — verified and unedited.</Lead>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.div
            key={q.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
            className="flex flex-col rounded-3xl border border-border bg-white p-9 md:p-10 shadow-card hover-card justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
                <div className="flex gap-0.5 text-primary">
                  {[0, 1, 2, 3, 4].map((k) => <Star key={k} className="size-4 fill-primary" />)}
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <Check className="size-3" strokeWidth={3} />
                  <span>Verified {q.platform}</span>
                </div>
              </div>
              <p className="text-[16.5px] leading-[1.9] text-navy/90 font-medium italic">"{q.quote}"</p>
            </div>

            <div className="mt-8 pt-7 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="grid size-16 shrink-0 place-items-center rounded-full bg-navy font-bold text-white text-lg shadow-sm">
                  {q.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <p className="text-[15px] font-bold text-navy">{q.name}</p>
                  <p className="text-[13px] text-muted-foreground mt-0.5">
                    {q.role}{q.company ? <> · <span className="font-semibold text-navy/80">{q.company}</span></> : null}
                  </p>
                </div>
              </div>
              <span className="mt-3 inline-block rounded-full bg-navy-soft px-2.5 py-1 text-[11px] font-bold text-navy/70 uppercase tracking-wider">{q.industry}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
