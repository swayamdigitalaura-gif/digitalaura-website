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
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const metrics = [
  { value: "320+", label: "Websites delivered" },
  { value: "11", label: "Years driving business growth" },
  { value: "98%", label: "Clients who'd refer us" },
  { value: "24", label: "Industries served" },
  { value: "96", label: "Avg. performance score" },
];

export function TrustMetrics() {
  useCMSEditor();
  const s = useSettings(
    metrics.flatMap((_, i) => [`wds_trust_${i}_value`, `wds_trust_${i}_label`])
  );
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 70}>
              <div className="text-center lg:text-left">
                <p
                  data-cms-key={`wds_trust_${i}_value`}
                  data-cms-label={`Trust Metric ${i + 1} Value`}
                  data-cms-attr="text"
                  className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
                >
                  {s[`wds_trust_${i}_value`] || m.value}
                </p>
                <p
                  data-cms-key={`wds_trust_${i}_label`}
                  data-cms-label={`Trust Metric ${i + 1} Label`}
                  data-cms-attr="text"
                  className="mt-1 text-sm font-semibold text-muted-foreground"
                >
                  {s[`wds_trust_${i}_label`] || m.label}
                </p>
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
  useCMSEditor();
  const s = useSettings([
    "wds_problems_label",
    "wds_problems_h2",
    "wds_problems_p",
    ...problems.flatMap((_, i) => [`wds_problems_${i}_title`, `wds_problems_${i}_text`]),
  ]);
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>
              <span data-cms-key="wds_problems_label" data-cms-label="Problems Label" data-cms-attr="text">
                {s.wds_problems_label || "Website Redesign Ahmedabad"}
              </span>
            </SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-cms-key="wds_problems_h2"
              data-cms-label="Problems Heading"
              data-cms-attr="text"
              className="mt-5 text-section"
            >
              {s.wds_problems_h2 || "Signs your website is losing you business"}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              data-cms-key="wds_problems_p"
              data-cms-label="Problems Paragraph"
              data-cms-attr="text"
              className="mt-4 text-muted-foreground"
            >
              {s.wds_problems_p ||
                "Almost every redesign we take on starts with the same warning signs. If two or three of these sound familiar, your website is costing you more than it earns."}
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
                <h3
                  data-cms-key={`wds_problems_${i}_title`}
                  data-cms-label={`Problem ${i + 1} Title`}
                  data-cms-attr="text"
                  className="mt-5 text-lg font-extrabold tracking-tight"
                >
                  {s[`wds_problems_${i}_title`] || p.title}
                </h3>
                <p
                  data-cms-key={`wds_problems_${i}_text`}
                  data-cms-label={`Problem ${i + 1} Text`}
                  data-cms-attr="text"
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                >
                  {s[`wds_problems_${i}_text`] || p.text}
                </p>
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
  useCMSEditor();
  const s = useSettings([
    "wds_included_label",
    "wds_included_h2",
    "wds_included_p",
    ...included.flatMap((_, i) => [`wds_included_${i}_title`, `wds_included_${i}_text`]),
  ]);
  return (
    <section id="included" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>
              <span data-cms-key="wds_included_label" data-cms-label="Included Label" data-cms-attr="text">
                {s.wds_included_label || "Our Website Development Services"}
              </span>
            </SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-cms-key="wds_included_h2"
              data-cms-label="Included Heading"
              data-cms-attr="text"
              className="mt-5 text-section"
            >
              {s.wds_included_h2 || "One build. Every detail handled properly."}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              data-cms-key="wds_included_p"
              data-cms-label="Included Paragraph"
              data-cms-attr="text"
              className="mt-4 text-muted-foreground"
            >
              {s.wds_included_p ||
                "No surprise add-ons and no half-finished handover. Every custom website development project from Digital Aura — from business websites to online stores — includes responsive website design and the full scope below."}
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
                  <h3
                    data-cms-key={`wds_included_${i}_title`}
                    data-cms-label={`Included ${i + 1} Title`}
                    data-cms-attr="text"
                    className="min-w-0 text-lg font-extrabold tracking-tight"
                  >
                    {s[`wds_included_${i}_title`] || f.title}
                  </h3>
                </div>
                <p
                  data-cms-key={`wds_included_${i}_text`}
                  data-cms-label={`Included ${i + 1} Text`}
                  data-cms-attr="text"
                  className="mt-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {s[`wds_included_${i}_text`] || f.text}
                </p>
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
  useCMSEditor();
  const s = useSettings([
    "wds_process_label",
    "wds_process_h2",
    "wds_process_p",
    ...steps.flatMap((_, i) => [`wds_process_${i}_title`, `wds_process_${i}_text`]),
  ]);
  return (
    <section id="process" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>
              <span data-cms-key="wds_process_label" data-cms-label="Process Label" data-cms-attr="text">
                {s.wds_process_label || "Our Process"}
              </span>
            </SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-cms-key="wds_process_h2"
              data-cms-label="Process Heading"
              data-cms-attr="text"
              className="mt-5 text-section"
            >
              {s.wds_process_h2 || "A proven process, with no black boxes"}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              data-cms-key="wds_process_p"
              data-cms-label="Process Paragraph"
              data-cms-attr="text"
              className="mt-4 text-muted-foreground"
            >
              {s.wds_process_p ||
                "Eight clear stages, fixed checkpoints and one accountable team — from the first call to post-launch growth."}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[26px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-border to-transparent lg:block" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 4) * 80}>
                <article className="hover-lift relative h-full rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="text-3xl font-extrabold text-foreground/8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    data-cms-key={`wds_process_${i}_title`}
                    data-cms-label={`Process ${i + 1} Title`}
                    data-cms-attr="text"
                    className="mt-5 text-lg font-extrabold tracking-tight"
                  >
                    {s[`wds_process_${i}_title`] || step.title}
                  </h3>
                  <p
                    data-cms-key={`wds_process_${i}_text`}
                    data-cms-label={`Process ${i + 1} Text`}
                    data-cms-attr="text"
                    className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    {s[`wds_process_${i}_text`] || step.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
