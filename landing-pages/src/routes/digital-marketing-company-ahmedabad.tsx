import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Search,
  Target,
  Sparkles,
  Star,
  Quote,
  Check,
  Clock,
  Users,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Loader2,
  HeartPulse,
  Building2,
  ShoppingCart,
  GraduationCap,
  Wrench,
  Briefcase,
  Landmark,
  Hotel,
} from "lucide-react";
import googlePlatformLogo from "@/assets/platform-logos/google-logo.png";
import { toast, Toaster } from "sonner";
import { MainSiteNavbar } from "@/components/MainSiteNavbar";
import { MainSiteFooter } from "@/components/MainSiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PAGE_TITLE = "Digital Marketing Company in Ahmedabad | Digital Aura";
const PAGE_DESCRIPTION =
  "AI-powered digital marketing agency in Ahmedabad: SEO, Google Ads, Meta Ads and automation as one team. 750+ clients, 10+ years experience.";
const PAGE_URL = "https://thedigitalaura.com/digital-marketing-company-ahmedabad";

export const Route = createFileRoute("/digital-marketing-company-ahmedabad")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "Digital Marketing Company Ahmedabad, Digital Marketing Agency Ahmedabad, SEO Company Ahmedabad, Google Ads Agency Ahmedabad, Meta Ads Agency, AI SEO Ahmedabad, Local SEO Ahmedabad",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:locale", content: "en_IN" },
      { name: "robots", content: "index,follow" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: Index,
});

/* ---------------- Structured data ---------------- */

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Digital Aura",
    description: PAGE_DESCRIPTION,
    telephone: "+91-81412-00284",
    email: "info@thedigitalaura.com",
    url: PAGE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382330",
      addressCountry: "IN",
    },
    areaServed: "Ahmedabad, Gujarat, India",
    priceRange: "$$",
    serviceType: [
      "SEO Services",
      "AI Search Optimization (AEO/GEO)",
      "Google Ads Management",
      "Meta Ads Management",
      "Local SEO",
      "Marketing Automation",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "220",
    },
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      // Static, hard-coded JSON — no user input — safe to inject directly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ---------------- Reusable atoms ---------------- */

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`da-reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function PrimaryCTA({
  children,
  href = "#quote",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`da-shadow-cta da-focus-ring da-btn-sheen group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:brightness-95 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function SecondaryCTA({
  children,
  href = "#results",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`da-focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/15 bg-white px-6 py-3.5 text-base font-semibold text-brand-navy transition-all hover:-translate-y-0.5 hover:border-brand-navy/40 hover:bg-surface-2 active:translate-y-0 ${className}`}
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2 className="mt-4 text-3xl font-extrabold leading-[1.05] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-5 text-lg text-ink-muted md:text-xl">{sub}</p>}
    </div>
  );
}

/* ---------------- Lead form ---------------- */

const NEEDS = [
  "SEO (AIO + GEO)",
  "Google Ads",
  "Meta Ads",
  "Marketing Automation",
  "Full growth partnership",
];

function LeadForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("website"),
          message: fd.get("need"),
          project: "Digital Marketing",
          source: "digital-marketing-company-ahmedabad",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      (e.target as HTMLFormElement).reset();
      toast.success("Your Growth Audit request is in!", {
        description: "A senior strategist will call you within 1 business hour.",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "da-focus-ring w-full rounded-xl border border-brand-navy/14 bg-white px-4 py-2.5 text-base text-ink placeholder:text-ink-muted/70 outline-none transition focus:border-brand-orange";
  const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-muted";

  return (
    <form
      id="quote"
      onSubmit={onSubmit}
      className="da-shadow-card rounded-3xl border border-brand-navy/10 bg-white p-6 md:p-7"
    >
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
          <Sparkles className="h-3.5 w-3.5" /> Free · Worth ₹15,000 · No obligation
        </div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-[28px]">
          Claim Your FREE Growth Audit
        </h3>
        <p className="mt-1.5 text-sm text-ink-muted">
          We'll audit your ads, SEO &amp; funnel and hand you a custom 90-day growth plan — free, no
          strings attached.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Full name
          </label>
          <input required id="name" name="name" placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input
            required
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 00000 00000"
            className={inputCls}
          />
        </div>
      </div>
      <div className="mt-3.5">
        <label htmlFor="email" className={labelCls}>
          Work email
        </label>
        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          className={inputCls}
        />
      </div>
      <div className="mt-3.5">
        <label htmlFor="website" className={labelCls}>
          Website
        </label>
        <input
          id="website"
          name="website"
          type="text"
          placeholder="yourcompany.com"
          className={inputCls}
        />
      </div>
      <div className="mt-3.5">
        <label htmlFor="need" className={labelCls}>
          What do you need?
        </label>
        <select required id="need" name="need" defaultValue="" className={inputCls}>
          <option value="" disabled>
            Select a service
          </option>
          {NEEDS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="da-shadow-cta da-focus-ring da-btn-sheen mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Get My FREE Growth Audit
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-center text-xs text-ink-muted">
        100% confidential, no spam · Reply within 1 business hour
      </p>
    </form>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="da-gradient-hero relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            750+ Businesses Grown · 10+ Years · 4.9★ Average Rating
          </div>

          <h1 className="mt-6 text-[38px] font-extrabold leading-[1.12] tracking-tight text-brand-navy sm:text-5xl md:text-[54px] md:leading-[1.1]">
            Digital Marketing{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-orange">Company in Ahmedabad</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-orange/15" />
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            One AI-powered team running your SEO, Google Ads, Meta Ads and automation together — not
            five vendors billing you separately. Claim your free Growth Audit and see exactly where
            you're losing revenue today.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryCTA href="#quote">Get My Free Growth Audit</PrimaryCTA>
            <SecondaryCTA href="tel:+918141200284">Talk to a Strategist</SecondaryCTA>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm font-semibold text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 text-brand-orange">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              4.9 Rated on Google
            </span>
            <span
              className="hidden h-1 w-1 rounded-full bg-brand-navy/20 sm:inline-block"
              aria-hidden
            />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-orange" /> 10+ Years Experience
            </span>
            <span
              className="hidden h-1 w-1 rounded-full bg-brand-navy/20 sm:inline-block"
              aria-hidden
            />
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-brand-orange" /> 750+ Businesses Served
            </span>
          </div>
        </div>

        <div className="lg:pt-2">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */

function Industries() {
  const list = [
    {
      icon: HeartPulse,
      t: "Healthcare & Clinics",
      d: "SEO and ads that fill your appointment calendar with real patients.",
    },
    {
      icon: Building2,
      t: "Real Estate",
      d: "Qualified site-visit leads from search and Meta Ads, not just clicks.",
    },
    {
      icon: ShoppingCart,
      t: "E-commerce & Retail",
      d: "Full-funnel campaigns built around cost per purchase, not impressions.",
    },
    {
      icon: Hotel,
      t: "Hospitality & Travel",
      d: "More direct bookings through local SEO and creative-led paid social.",
    },
    {
      icon: GraduationCap,
      t: "Education",
      d: "More enrolments per intake with lead-gen built for admissions cycles.",
    },
    {
      icon: Wrench,
      t: "Home Services",
      d: "More local service calls with Google Business Profile and Local SEO.",
    },
    {
      icon: Briefcase,
      t: "B2B & Agencies",
      d: "SEO and LinkedIn/Meta funnels built for longer B2B sales cycles.",
    },
    {
      icon: Landmark,
      t: "Finance & Professional Services",
      d: "Trust-led content and SEO that ranks for high-intent local searches.",
    },
  ];
  return (
    <section id="industries" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Digital marketing by industry"
          title={
            <>
              Solutions for <span className="text-brand-orange">every industry in Ahmedabad</span>
            </>
          }
          sub="Generic playbooks fail. We build channel mix, offers and creative around how your specific industry actually buys."
        />
        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-brand-navy">{t}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Money leaks (problem / fix) ---------------- */

function MoneyLeaks() {
  const leaks = [
    {
      problem: "No tracking on what actually converts",
      cost: "Budget spent blind on channels that never see a sale",
    },
    {
      problem: "Generic landing pages built for every visitor",
      cost: "Up to 70% of paid traffic bounces before it converts",
    },
    {
      problem: "Leads followed up hours (or days) later",
      cost: "Response time past 5 minutes drops conversion 80%",
    },
    {
      problem: "Reports built around vanity metrics",
      cost: "No visibility into cost per qualified lead or ROI",
    },
  ];
  const fixes = [
    {
      problem: "Full-funnel conversion tracking, wired before spend starts",
      cost: "Every rupee attributed to a lead, a call, a sale",
    },
    {
      problem: "Purpose-built, CRO-tested landing pages per campaign",
      cost: "Higher Quality Score, lower CPC, more form completions",
    },
    {
      problem: "AI-automated instant lead response and routing",
      cost: "45-second average response time, day or night",
    },
    {
      problem: "Live dashboard + monthly review on pipeline, not clicks",
      cost: "You always know your real cost per qualified lead",
    },
  ];
  return (
    <section id="money-leaks" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="The hidden cost"
          title={
            <>
              Why Ahmedabad businesses <span className="text-brand-orange">lose money</span> on
              digital marketing
            </>
          }
          sub="It's rarely the channel — it's what happens before, during and after the click."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="da-shadow-card overflow-hidden rounded-3xl border border-brand-navy/12 bg-white">
            <div className="flex items-center gap-3 border-b border-brand-navy/10 bg-surface-2 px-6 py-5 sm:px-7">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-50">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </span>
              <h3 className="text-lg font-extrabold text-brand-navy">Where the money leaks out</h3>
            </div>
            <ul className="divide-y divide-brand-navy/8">
              {leaks.map((l) => (
                <li key={l.problem} className="px-6 py-5 sm:px-7">
                  <p className="font-bold text-brand-navy">{l.problem}</p>
                  <p className="mt-1.5 text-sm text-ink-muted">{l.cost}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="da-shadow-card overflow-hidden rounded-3xl border border-brand-orange/25 bg-white">
            <div className="flex items-center gap-3 border-b border-brand-orange/20 bg-brand-orange-soft px-6 py-5 sm:px-7">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white">
                <TrendingUp className="h-5 w-5 text-brand-orange" />
              </span>
              <h3 className="text-lg font-extrabold text-brand-navy">How Digital Aura fixes it</h3>
            </div>
            <ul className="divide-y divide-brand-navy/8">
              {fixes.map((f) => (
                <li key={f.problem} className="px-6 py-5 sm:px-7">
                  <p className="font-bold text-brand-orange">{f.problem}</p>
                  <p className="mt-1.5 text-sm text-ink-muted">{f.cost}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mt-10 text-center">
          <PrimaryCTA href="#quote">Find My Leaks — Free Growth Audit</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */

function Services() {
  const columns = [
    {
      title: "SEO & AI Visibility for Long-Term Growth",
      body: "We combine technical SEO, content and local visibility so you rank on Google and get cited inside AI answers, not just crawled.",
      items: [
        "Local SEO (Ahmedabad + nearby areas)",
        "On-Page & Technical SEO",
        "AI Search Optimization (AEO/GEO)",
        "Schema & Entity SEO",
        "Content & Topical Authority",
        "Link Building & Digital PR",
        "Google Business Profile Optimization",
      ],
      icon: Search,
    },
    {
      title: "Paid Advertising — Reach, Engage, Convert",
      body: "Full-funnel campaigns across Google and Meta with conversion tracking live from day one, so you always know what's driving business.",
      items: [
        "Google Ads (Search & PMax)",
        "Meta Ads (Facebook & Instagram)",
        "YouTube Ads",
        "Retargeting & Remarketing",
        "Marketing Automation & Lead Follow-up",
      ],
      icon: Target,
    },
  ];
  return (
    <section id="services" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="How we grow you"
          title={
            <>
              How We Boost Your <span className="text-brand-orange">Digital Presence</span> in
              Ahmedabad
            </>
          }
          sub="Two engines, working together — organic visibility that compounds over time, and paid campaigns that bring qualified leads today."
        />
        <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
          {columns.map((col) => (
            <div
              key={col.title}
              className="da-shadow-card rounded-3xl border border-brand-navy/12 bg-white p-7 md:p-8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange">
                <col.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-brand-navy sm:text-2xl">
                {col.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{col.body}</p>
              <ul className="mt-6 space-y-3 border-t border-brand-navy/10 pt-6">
                {col.items.map((label) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-orange-soft">
                      <Check className="h-3.5 w-3.5 text-brand-orange" />
                    </span>
                    <span className="text-sm font-semibold text-brand-navy">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Results ---------------- */

function Results() {
  const stats = [
    { value: "+174%", label: "Average traffic growth", note: "in 6–9 months" },
    { value: "+200%", label: "Average lead growth", note: "same ad budget" },
    { value: "50X", label: "ROI generated", note: "across client base" },
    { value: "+127%", label: "Revenue lift", note: "avg. client growth" },
  ];
  return (
    <section id="results" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Proven results"
          title={
            <>
              Real results from a{" "}
              <span className="text-brand-orange">performance marketing agency</span>
            </>
          }
          sub="Straight from live client dashboards, measured against leads and revenue — not impressions, not vanity charts."
        />
        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="da-shadow-card rounded-3xl border border-brand-navy/12 bg-surface-2 p-8 text-center"
            >
              <p className="text-[2.5rem] font-extrabold leading-none tracking-tight text-brand-orange">
                {s.value}
              </p>
              <p className="mt-3 text-base font-bold text-brand-navy">{s.label}</p>
              <p className="mt-1 text-sm text-ink-muted">{s.note}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials (real Google reviews) ---------------- */

function Testimonials() {
  const items = [
    {
      q: "Digital Aura's SEO and digital marketing expertise have helped us generate qualified leads that actually convert into sales. Their team is proactive, knowledgeable, and truly understands our industry's needs.",
      n: "Darshil Shah",
      role: "Elegant Event Solutions",
    },
    {
      q: "They designed a fantastic website for our Invisible Grills business, then started lead generation campaigns on Meta Ads which brought us high-quality leads that immediately turned into business.",
      n: "Chintan Joshi",
      role: "Invisible Grills",
    },
    {
      q: "Their lead generation strategies through Meta Ads were impeccable, delivering high-quality, consistent leads that swiftly converted into sales. We've witnessed significant growth from their campaigns.",
      n: "Tapan Joshi",
      role: "Invisible Grills",
    },
    {
      q: "Standout features were the seamless integration of modern design elements, the user-friendly interface, and the attention to detail — plus a strong focus on SEO and mobile responsiveness.",
      n: "Tirth Patel",
      role: "Website Redesign",
    },
    {
      q: "Their SEO strategy alone improved our search rankings significantly, driving more organic traffic to our site than we anticipated.",
      n: "Ketan Patel",
      role: "SEO & Digital Marketing",
    },
    {
      q: "Digital Aura didn't just design a new website, they created the whole package — engaging content, eye-catching graphics, and a unified brand feel.",
      n: "Bhavesh Patil",
      role: "Starline Advertising",
    },
  ];
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="4.9 rating on Google"
          title="What our clients say about us on Google"
        />
        <Reveal className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.n}
              className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-brand-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <img
                    src={googlePlatformLogo}
                    alt="Google"
                    className="h-4 w-auto object-contain"
                  />
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange-soft px-2 py-0.5 text-[10px] font-bold text-brand-orange">
                    <Check className="h-2.5 w-2.5" /> Verified
                  </span>
                </div>
              </div>
              <Quote className="mt-4 h-7 w-7 text-brand-orange/30" />
              <blockquote className="mt-2 flex-1 line-clamp-6 text-[15px] leading-relaxed text-ink">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-5 border-t border-brand-navy/8 pt-4">
                <div className="font-bold text-brand-navy">{t.n}</div>
                <div className="text-sm text-ink-muted">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const faqs = [
    {
      q: "What happens on the free strategy call?",
      a: "A senior strategist reviews your website, ad accounts and search visibility live, then walks you through the three biggest opportunities and what they're realistically worth.",
    },
    {
      q: "How quickly will I see results?",
      a: "Google Ads improvements typically show within 2–4 weeks of a restructure. SEO compounds from month 3, with most clients seeing meaningful organic traffic gains by month 6.",
    },
    {
      q: "Are you an Ahmedabad-based agency, or do you work nationally too?",
      a: "Both. Digital Aura is an Ahmedabad-based team, and a large share of our clients are local businesses. We also run campaigns for clients across India, Australia, the UAE, the UK and North America.",
    },
    {
      q: "What makes you different from other digital marketing agencies in Ahmedabad?",
      a: "Most agencies sell activity — posts published, ads live. We sell outcomes tied to a number: cost per lead, ranking position, ROAS.",
    },
    {
      q: "Do you lock clients into long contracts?",
      a: "No. We work on rolling engagements after an initial 90-day ramp, because the results should keep you, not the paperwork.",
    },
    {
      q: "How do we get started?",
      a: "Book the free strategy call. Onboarding takes about a week, and most accounts are live within 10–14 days.",
    },
  ];
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="FAQs" title="Everything you'd ask on the first call" />
        <Accordion type="multiple" className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="da-shadow-card overflow-hidden rounded-2xl border border-brand-navy/12 bg-white px-5 transition-colors hover:border-brand-orange/25 data-[state=open]:border-brand-orange/40 md:px-6"
            >
              <AccordionTrigger className="da-focus-ring rounded-lg py-5 text-left text-base font-bold text-brand-navy hover:no-underline md:text-lg [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-brand-orange">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-muted">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="da-gradient-navy da-shadow-card relative overflow-hidden rounded-3xl px-6 py-12 text-white md:px-14 md:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-orange/30 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionLabel>Limited weekly slots</SectionLabel>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Book your free strategy call and see the plan{" "}
                <span className="text-brand-orange">before you spend a rupee</span>.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/80">
                30 minutes with a senior strategist — a real audit, a real roadmap, numbers you can
                hold us to.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA href="#quote">Get My Free Growth Audit</PrimaryCTA>
                <a
                  href="https://wa.me/918141200284"
                  target="_blank"
                  rel="noopener"
                  className="da-focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </div>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Floating / sticky ---------------- */

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918141200284"
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="da-focus-ring fixed bottom-20 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(37,211,102,0.55)] transition hover:scale-105 md:bottom-5"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-navy/10 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <a
        href="#quote"
        className="da-shadow-cta da-focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[15px] font-extrabold text-primary-foreground"
      >
        Get My Free Growth Audit <ArrowRight className="h-4 w-4 shrink-0" />
      </a>
    </div>
  );
}

/* ---------------- Page ---------------- */

function Index() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <LocalBusinessSchema />
      <Toaster position="top-center" richColors />
      <MainSiteNavbar />
      <main className="pt-[72px]">
        <Hero />
        <Industries />
        <MoneyLeaks />
        <Services />
        <Results />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <MainSiteFooter />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </div>
  );
}
