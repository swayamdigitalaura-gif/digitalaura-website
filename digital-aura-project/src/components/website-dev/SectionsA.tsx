import {
  Boxes,
  Braces,
  Clock,
  Frown,
  Gauge,
  LayoutTemplate,
  LifeBuoy,
  LineChart,
  Lock,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  PenTool,
  Rocket,
  Search,
  ServerCog,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TestTube,
  Timer,
  TrendingDown,
  Wrench,
} from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const metrics = [
  { value: "320+", label: "Websites delivered" },
  { value: "11", label: "Years driving business growth" },
  { value: "98%", label: "Clients who'd refer us" },
  { value: "24", label: "Industries served" },
  { value: "96", label: "Avg. performance score" },
];

export function TrustMetrics() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 70}>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {m.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const problems = [
  {
    icon: MousePointerClick,
    title: "Traffic that never converts",
    text: "Visitors land, scroll and leave. No clear next step means no enquiry — and no sale.",
  },
  {
    icon: Palette,
    title: "A design stuck in the past",
    text: "Your business has grown. Your website still looks like it did five years ago.",
  },
  {
    icon: Timer,
    title: "Pages that load too slowly",
    text: "Every extra second of load time quietly pushes buyers back to Google.",
  },
  {
    icon: Wrench,
    title: "A site only a developer can touch",
    text: "Simple edits need a call to a developer, so the content goes stale and out of date.",
  },
  {
    icon: Smartphone,
    title: "A poor mobile experience",
    text: "Most of your traffic is on a phone. If it's not fast and easy there, you're losing leads.",
  },
  {
    icon: Search,
    title: "Nowhere to be found on Google",
    text: "Weak structure and no technical SEO foundation mean competitors outrank you.",
  },
  {
    icon: Frown,
    title: "Nothing that builds trust",
    text: "No proof, no results, no reason for a buyer to pick you over the next search result.",
  },
  {
    icon: TrendingDown,
    title: "A high bounce rate",
    text: "Confusing navigation and slow pages send qualified prospects straight back to Google.",
  },
];

export function Problems() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Website Redesign Ahmedabad</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">Signs your website is losing you business</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted-foreground">
              Almost every redesign we take on starts with the same warning signs. If two or three
              of these sound familiar, your website is costing you more than it earns.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 70}>
              <article className="hover-lift gradient-border h-full rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const included = [
  { icon: PenTool, title: "Custom design", text: "Designed from scratch around your brand and your buyers — never a recycled template." },
  { icon: MonitorSmartphone, title: "Mobile-first design", text: "Looks and performs perfectly on every screen, from phone to ultrawide monitor." },
  { icon: LayoutTemplate, title: "UI & UX design", text: "Clear journeys and obvious next steps, mapped to how your customers actually buy." },
  { icon: Search, title: "SEO-friendly foundation", text: "Clean structure, metadata, schema and internal linking, built in from day one." },
  { icon: Gauge, title: "Core Web Vitals", text: "Optimised images, lean code and caching that pass Google's speed benchmarks." },
  { icon: Boxes, title: "A CMS you control", text: "Update pages, posts and offers yourself, without ever breaking the design." },
  { icon: ServerCog, title: "WordPress development", text: "Custom themes and blocks that stay fast, secure and easy to manage." },
  { icon: ShoppingCart, title: "Ecommerce website development", text: "Shopify and WooCommerce stores designed to lift average order value." },
  { icon: Rocket, title: "Landing page development", text: "Campaign pages built for one job: converting clicks into qualified enquiries." },
  { icon: LifeBuoy, title: "Website maintenance", text: "Updates, backups, monitoring and small changes handled for you every month, wherever you're based." },
  { icon: LineChart, title: "Analytics & tracking", text: "GA4, Tag Manager and conversion events set up so you can see exactly what works." },
  { icon: Lock, title: "Security & AI-ready builds", text: "SSL, firewall rules and clean architecture, built ready for AI automation and chatbots." },
];

export function Included() {
  return (
    <section id="included" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Our Website Development Services</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">One build. Every detail handled properly.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted-foreground">
              No surprise add-ons and no half-finished handover. Every custom website development
              project from Digital Aura — from business websites to online stores — includes
              responsive website design and the full scope below.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80}>
              <article className="hover-lift gradient-border group h-full rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="min-w-0 text-lg font-extrabold tracking-tight">{f.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: Search, title: "Discover", text: "We learn your market, your buyers, your competitors and the goals behind the project." },
  { icon: Sparkles, title: "Strategy", text: "Sitemap, messaging and a conversion plan agreed before a single pixel is drawn." },
  { icon: LayoutTemplate, title: "Wireframes", text: "Structure and hierarchy signed off early, so every design decision is cheap to change." },
  { icon: PenTool, title: "UI design", text: "Premium visual design in your brand, mapped across every screen size." },
  { icon: Braces, title: "Development", text: "A clean, fast, accessible build with a CMS your team can actually use." },
  { icon: TestTube, title: "Testing", text: "Cross-browser, mobile, speed, forms, tracking and SEO checked before launch." },
  { icon: Rocket, title: "Launch", text: "A careful migration with redirects and monitoring, so your rankings hold." },
  { icon: Clock, title: "Support", text: "Ongoing improvements based on real user behaviour, not guesswork." },
];

export function Process() {
  return (
    <section id="process" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Our Process</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">A proven process, with no black boxes</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted-foreground">
              Eight clear stages, fixed checkpoints and one accountable team — from the first call
              to post-launch growth.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[26px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-border to-transparent lg:block" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 80}>
                <article className="hover-lift relative h-full rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="text-3xl font-extrabold text-foreground/8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
