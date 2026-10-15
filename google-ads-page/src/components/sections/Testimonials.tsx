import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Section, SectionHead, CARD } from "../shared/SectionPrimitives";

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
      <SectionHead
        eyebrow="Testimonials"
        title="Trusted by founders and growth managers"
        lead="Real reviews from Google, Clutch and GoodFirms, verified and unedited."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.div
            key={q.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}
            className={`${CARD} flex flex-col justify-between`}
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-0.5 text-primary">
                  {[0, 1, 2, 3, 4].map((k) => <Star key={k} className="size-4 fill-primary" />)}
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <Check className="size-3" strokeWidth={3} />
                  <span>Verified {q.platform}</span>
                </div>
              </div>
              <p className="text-[15px] font-medium leading-[1.7] text-navy/90">&ldquo;{q.quote}&rdquo;</p>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-[15px] font-bold text-white">
                {q.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-[14.5px] font-bold text-navy">{q.name}</p>
                <p className="text-[12.5px] text-muted-foreground">
                  {q.role}{q.company ? <> · <span className="font-semibold text-navy/80">{q.company}</span></> : null}
                </p>
              </div>
              <span className="ml-auto hidden shrink-0 rounded-full bg-navy-soft px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-navy/70 xl:inline-block">{q.industry}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
