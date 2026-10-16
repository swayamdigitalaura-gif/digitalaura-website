import { useEffect, useState } from "react";
import { Check, Star } from "lucide-react";
import { Section, SectionHead } from "../shared/SectionPrimitives";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const QUOTES = [
  { quote: "Digital Aura helped us take our brand online and generate quality leads for our event solutions business.", name: "Darshil Shah", role: "Owner", company: "Elegant Event Solutions", industry: "Events", platform: "Google" },
  { quote: "Digital Aura understood our export business needs perfectly. Their SEO and Google Ads strategy helped us reach international buyers.", name: "Bharat Chavda", role: "Director", company: "Chavda Exports", industry: "Export & Trade", platform: "Clutch" },
  { quote: "Working with Digital Aura for Google Ads was a game-changer for our e-commerce store. ROAS improved by 4x in 60 days.", name: "Ananya Shah", role: "Co-Founder", company: "StyleHouse", industry: "eCommerce", platform: "GoodFirms" },
  { quote: "Excellent results and professional service! Our online presence has been outstanding since working with Digital Aura.", name: "Ketan Patel", role: "Business Owner", company: "", industry: "Local Business", platform: "Google" },
  { quote: "Working with Digital Aura transformed our online presence completely. The new website has been a game-changer.", name: "Shweta Sultania", role: "Interior Designer", company: "Sultania Interiors", industry: "Interior Design", platform: "Clutch" },
  { quote: "Outstanding digital marketing services. They understood our niche perfectly and delivered campaigns that actually convert.", name: "Rajesh Kumar", role: "Director", company: "K&R Manufacturing", industry: "Manufacturing", platform: "Clutch" },
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Section id="testimonials" className="bg-surface-cream">
      <SectionHead
        eyebrow="Testimonials"
        title="Trusted by founders and growth managers"
        lead="Real reviews from Google, Clutch and GoodFirms, verified and unedited."
      />
      <Carousel opts={{ align: "start", loop: false }} setApi={setApi} aria-label="Client testimonials">
        <CarouselContent className="-ml-6">
          {QUOTES.map((q) => (
            <CarouselItem key={q.name} className="basis-full pl-6 md:basis-1/2 lg:basis-1/3">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-xs">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 xl:-left-12" />
        <CarouselNext className="right-2 xl:-right-12" />
      </Carousel>
      <div className="pillar-carousel-dots">
        {QUOTES.map((q, i) => (
          <button
            key={q.name}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${selected === i ? "w-7 bg-primary" : "w-2.5 bg-navy/20"}`}
          />
        ))}
      </div>
    </Section>
  );
}
