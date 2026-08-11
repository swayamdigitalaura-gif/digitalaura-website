import { ArrowRight, Gauge, MapPin, Search, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, SectionLabel } from "./Reveal";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const trustItems = [
  { icon: MapPin, text: "Trusted by Businesses Across Ahmedabad" },
  { icon: Search, text: "SEO-Ready Development" },
  { icon: Smartphone, text: "Mobile-First Websites" },
  { icon: ShieldCheck, text: "Fast & Secure Builds" },
  { icon: Gauge, text: "Conversion-Focused Design" },
];

export function Hero() {
  useCMSEditor();
  const s = useSettings([
    "wds_hero_label",
    "wds_hero_h1_main",
    "wds_hero_h1_highlight",
    "wds_hero_subtitle",
    "wds_hero_cta1",
    "wds_hero_cta2",
    ...trustItems.map((_, i) => `wds_hero_trust_${i}_text`),
  ]);
  const label = s.wds_hero_label || "Website Development Company · Ahmedabad";
  const h1Main = s.wds_hero_h1_main || "Websites that win customers.";
  const h1Highlight = s.wds_hero_h1_highlight || "Not just admirers.";
  const subtitle =
    s.wds_hero_subtitle ||
    "Digital Aura is a website design and development company in Ahmedabad building fast, SEO-friendly websites designed around one goal: turning visitors into enquiries. Every page is planned around your buyers, built for performance, and measured against real business results.";
  const cta1 = s.wds_hero_cta1 || "Get My Free Website Strategy";
  const cta2 = s.wds_hero_cta2 || "See Our Results";
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 grid-soft opacity-60" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/12 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[26rem] w-[26rem] rounded-full bg-navy/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <Reveal>
            <SectionLabel>
              <span data-cms-key="wds_hero_label" data-cms-label="Hero Label" data-cms-attr="text">
                {label}
              </span>
            </SectionLabel>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-display text-foreground">
              <span data-cms-key="wds_hero_h1_main" data-cms-label="Hero H1 Main" data-cms-attr="text">
                {h1Main}
              </span>{" "}
              <span className="relative text-primary">
                <span data-cms-key="wds_hero_h1_highlight" data-cms-label="Hero H1 Highlight" data-cms-attr="text">
                  {h1Highlight}
                </span>
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/25" />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p
              data-cms-key="wds_hero_subtitle"
              data-cms-label="Hero Subtitle"
              data-cms-attr="text"
              className="mt-6 max-w-xl text-muted-foreground"
            >
              {subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group h-[3.25rem] rounded-full px-7 text-base font-bold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
              >
                <a href="#strategy">
                  <span data-cms-key="wds_hero_cta1" data-cms-label="Hero CTA 1" data-cms-attr="text">
                    {cta1}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-[3.25rem] rounded-full border-foreground/15 bg-background px-7 text-base font-bold transition-transform hover:-translate-y-0.5 hover:bg-background"
              >
                <a href="#results">
                  <span data-cms-key="wds_hero_cta2" data-cms-label="Hero CTA 2" data-cms-attr="text">
                    {cta2}
                  </span>
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Hero showcase image */}
        <Reveal delay={200} className="relative flex justify-center">
          <div className="relative w-full max-w-3xl lg:scale-[1.09]">
            <div className="pointer-events-none absolute inset-x-6 top-10 h-[85%] rounded-[2rem] bg-primary/15 blur-3xl" />
            <img
              src="/wds/hero-showcase.png"
              alt="Digital Aura website showcase — browser and mobile preview with performance and SEO badges"
              className="relative h-auto w-full drop-shadow-[0_35px_60px_-15px_rgba(15,23,42,0.35)]"
            />
          </div>
        </Reveal>
      </div>

      <div className="relative border-t border-border/70 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:items-center lg:justify-between lg:gap-x-2 lg:gap-y-0">
            {trustItems.map((item, index) => (
              <li
                key={item.text}
                className={cn(
                  "flex items-center justify-center gap-2 text-center text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground last:col-span-2 sm:last:col-span-1 lg:justify-center lg:px-3 lg:text-xs lg:first:pl-0 lg:last:pr-0",
                  index !== 0 && "lg:border-l lg:border-border lg:pl-4"
                )}
              >
                <item.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span
                  data-cms-key={`wds_hero_trust_${index}_text`}
                  data-cms-label={`Hero Trust Item ${index + 1}`}
                  data-cms-attr="text"
                  className="lg:whitespace-nowrap"
                >
                  {s[`wds_hero_trust_${index}_text`] || item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
