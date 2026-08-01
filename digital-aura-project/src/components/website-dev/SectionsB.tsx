import {
  Activity,
  Car,
  Dumbbell,
  Factory,
  GraduationCap,
  HardHat,
  Home,
  Plane,
  Rocket,
  ShoppingBag,
  Stethoscope,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { BrowserFrame } from "./mockups";

const stack = [
  { name: "Next.js", src: "/wds/tech/nextjs.png" },
  { name: "React", src: "/wds/tech/react.jpg" },
  { name: "Node.js", src: "/wds/tech/nodejs.jpg" },
  { name: "WordPress", src: "/wds/tech/wordpress.jpg" },
  { name: "Shopify", src: "/wds/tech/shopify.jpg" },
  { name: "WooCommerce", src: "/wds/tech/woocommerce.svg" },
];

export function TechStack() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Technology Stack</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">The right platform for your goals, not ours</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted-foreground">
              A brochure site, an online store and a custom web application shouldn't be built the
              same way. We choose the platform that keeps you fast today and scalable for years.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 text-sm font-semibold text-foreground/70">
              We recommend the platform that best fits your business goals — not the one that's
              easiest to build.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stack.map((t, i) => (
            <Reveal key={t.name} delay={(i % 6) * 60}>
              <div className="hover-lift overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary/10 to-navy/10 p-6 sm:h-32">
                  <img src={t.src} alt={t.name} className="h-full w-full object-contain" />
                </div>
                <div className="border-t border-border bg-background px-4 py-4 text-center">
                  <p className="truncate text-sm font-extrabold">{t.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PerformanceSnapshot() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <SectionLabel>Performance Snapshot</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">A fast website isn't a bonus. It's revenue.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted-foreground">
              Speed shapes your rankings, your bounce rate and how much a visitor trusts you before
              they read a word. We benchmark every build in PageSpeed Insights, Lighthouse and
              GTmetrix, then tune it until the numbers hold on a real mobile connection.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <dl className="mt-9 grid gap-5 sm:grid-cols-2">
              {[
                ["Load time", "6.8s → 1.4s"],
                ["Lighthouse", "42 → 98"],
                ["Bounce rate", "-38%"],
                ["Enquiries", "+186%"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="hover-lift rounded-2xl border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-primary/40"
                >
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-2 text-2xl font-extrabold tracking-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={180} className="relative">
          <BrowserFrame
            url="pagespeed.web.dev/analysis"
            className="shadow-[var(--shadow-mock)] transition-transform duration-500 hover:-translate-y-1.5"
          >
            <div className="bg-background p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-extrabold">Mobile performance report</p>
                <span className="rounded-full bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  All checks passed
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["Performance", 98],
                  ["Accessibility", 100],
                  ["Best practices", 96],
                  ["SEO", 100],
                ].map(([label, val]) => (
                  <div key={label as string} className="text-center">
                    <div className="relative mx-auto h-20 w-20">
                      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                        <circle cx="40" cy="40" r="33" fill="none" strokeWidth="6" className="stroke-border" />
                        <circle
                          cx="40"
                          cy="40"
                          r="33"
                          fill="none"
                          strokeWidth="6"
                          strokeLinecap="round"
                          className="stroke-primary"
                          strokeDasharray={2 * Math.PI * 33}
                          strokeDashoffset={2 * Math.PI * 33 * (1 - (val as number) / 100)}
                        />
                      </svg>
                      <span className="absolute inset-0 grid place-items-center text-lg font-extrabold">
                        {val}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ["Largest Contentful Paint", "1.4s"],
                  ["Total Blocking Time", "40ms"],
                  ["Cumulative Layout Shift", "0.01"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3">
                    <Activity className="h-4 w-4 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{k}</span>
                    <span className="shrink-0 text-sm font-extrabold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  );
}

const industries = [
  { icon: Stethoscope, name: "Healthcare" },
  { icon: UtensilsCrossed, name: "Restaurants" },
  { icon: HardHat, name: "Construction" },
  { icon: Home, name: "Real estate" },
  { icon: Users, name: "Professional services" },
  { icon: GraduationCap, name: "Education" },
  { icon: Dumbbell, name: "Fitness" },
  { icon: Plane, name: "Travel" },
  { icon: Factory, name: "Manufacturing" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Car, name: "Automotive" },
  { icon: Rocket, name: "Startups" },
];

export function Industries() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Sector-Specific Builds</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">Industries We Serve</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted-foreground">
              A trade enquiry and a specialist referral don't convert the same way. We bring
              sector benchmarks to every build, so your site matches how your customers actually buy.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 4) * 70}>
              <article className="hover-lift gradient-border group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-primary/40">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream-deep text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ind.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-extrabold tracking-tight">{ind.name}</h3>
                  <p className="text-xs font-semibold text-muted-foreground">Sector-specific builds</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
