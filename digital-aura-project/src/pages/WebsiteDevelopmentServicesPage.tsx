import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Layers,
  Code2,
  Smartphone,
  Quote,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Star,
  X,
  Check,
  TrendingUp,
  Menu,
  Clock,
  HeartPulse,
  UtensilsCrossed,
  Building2,
  ShoppingCart,
  GraduationCap,
  Wrench,
  Eye,
  Baby,
  Dumbbell,
  Plane,
  Loader2,
  Users,
  RefreshCw,
  MousePointerClick,
  Briefcase,
  ArrowDown,
  Palette,
  Server,
  Lock,
  Rocket,
  LayoutGrid,
} from "lucide-react";
import digitalAuraLogo from "@/assets/wds/brand/digital-aura-logo.png";
import googlePlatformLogo from "@/assets/wds/platform-logos/google-logo.png";
import clutchBadge from "@/assets/wds/platform-logos/clutch-badge.png";
import goodfirmsBadge from "@/assets/wds/platform-logos/goodfirms-badge.png";
import designrushBadge from "@/assets/wds/platform-logos/designrush-badge.webp";
import googlePartnerLogo from "@/assets/wds/certified-logos/google-partner.png";
import bingPartnerLogo from "@/assets/wds/certified-logos/bing-partner.png";
import googleAnalyticsCertLogo from "@/assets/wds/certified-logos/google-analytics.png";
import googleSearchConsoleCertLogo from "@/assets/wds/certified-logos/google-search-console.png";
import googleBusinessProfileLogo from "@/assets/wds/certified-logos/google-business-profile.jpg";
import clientLogoGameZone from "@/assets/wds/client-logos/game-zone-events.webp";
import clientLogoAmvi from "@/assets/wds/client-logos/amvi-hospital.png";
import clientLogoAOneAutoCare from "@/assets/wds/client-logos/a-one-auto-care.png";
import clientLogoInnOfTheDove from "@/assets/wds/client-logos/inn-of-the-dove.png";
import clientLogoLevapor from "@/assets/wds/client-logos/levapor.png";
import clientLogoMisc from "@/assets/wds/client-logos/logo-misc.png";
import clientLogoKrishaHospital from "@/assets/wds/client-logos/new-logo.png";
import clientLogoPrism from "@/assets/wds/client-logos/prism.png";
import clientLogoShukanHospital from "@/assets/wds/client-logos/shukan-hospital.png";
import clientLogoDrParthShah from "@/assets/wds/client-logos/site-logo.png";
import clientLogoSpinx from "@/assets/wds/client-logos/spinx-logo-white.png";
import clientLogoTgp from "@/assets/wds/client-logos/tgp.webp";
import clientLogoClarityEyeSurgeons from "@/assets/wds/client-logos/clarity-eye-surgeons.png";
import clientLogoKrishaEyeHospital from "@/assets/wds/client-logos/krisha-eye-hospital.webp";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const PAGE_TITLE = "Website Development Services | Custom Business Websites | Digital Aura";
const PAGE_DESCRIPTION =
  "Get custom website development services in Ahmedabad with fast, mobile-friendly, SEO-ready websites built to generate more leads, sales, and business growth. Contact Digital Aura today.";
const PAGE_URL = "https://thedigitalaura.com/website-development-services-ahmedabad";

function useBasicSEO() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    const setTag = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!el) {
        const tagName = selector.startsWith("link") ? "link" : "meta";
        el = document.createElement(tagName) as HTMLMetaElement | HTMLLinkElement;
        if (tagName === "meta") {
          const nameMatch = selector.match(/name="([^"]+)"/);
          const propMatch = selector.match(/property="([^"]+)"/);
          if (nameMatch) el.setAttribute("name", nameMatch[1]);
          if (propMatch) el.setAttribute("property", propMatch[1]);
        } else {
          el.setAttribute("rel", "canonical");
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setTag('meta[name="description"]', "content", PAGE_DESCRIPTION);
    setTag('meta[property="og:title"]', "content", PAGE_TITLE);
    setTag('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
    setTag('meta[property="og:url"]', "content", PAGE_URL);
    setTag('link[rel="canonical"]', "href", PAGE_URL);
  }, []);
}

/* ---------------- Structured data (LocalBusiness) ---------------- */

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Digital Aura",
    description: PAGE_DESCRIPTION,
    image: digitalAuraLogo,
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
      "Website Development",
      "Website Design",
      "Custom Web Development",
      "Ecommerce Website Development",
      "WordPress Development",
      "Landing Page Development",
      "Website Redesign",
      "Website Maintenance",
    ],
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

function Logo({
  className = "",
  imgClassName = "h-12 w-auto md:h-14",
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`} aria-label="Digital Aura home">
      <img
        src={digitalAuraLogo}
        alt="Digital Aura"
        width={341}
        height={220}
        decoding="async"
        className={`w-auto ${imgClassName}`}
      />
    </a>
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
      <h2 className="mt-4 text-3xl font-extrabold leading-[1.05] sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-ink-muted md:text-xl">{sub}</p>}
    </div>
  );
}

/* ---------------- Hero + Form ---------------- */

const projectTypes = ["New Website", "Website Redesign", "Ecommerce Website", "Landing Page", "Not Sure Yet"];

function LeadForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("business"),
          message: [fd.get("website"), fd.get("project")].filter(Boolean).join(" — "),
          project: "Website Development",
          source: "website-development-services-ahmedabad",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      (e.target as HTMLFormElement).reset();
      toast.success("Request received!", {
        description: "Our website strategist will reach out within 1 business day.",
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

  const proposalIncludes = [
    "Website Audit (if you have one)",
    "Design & UX Recommendations",
    "Tech Stack Recommendation",
    "Timeline & Fixed Pricing",
    "SEO-Readiness Checklist",
    "Conversion Strategy",
  ];

  return (
    <div>
      <form
        id="quote"
        onSubmit={onSubmit}
        className="da-shadow-card rounded-3xl border border-brand-navy/10 bg-white p-6 md:p-7"
      >
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <Zap className="h-3.5 w-3.5" /> Free · No obligation
          </div>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-[28px]">
            Request My Website Proposal
          </h3>
          <p className="mt-1.5 text-sm text-ink-muted">
            Tell us about your business and we'll come back with a plan, timeline and fixed price.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelCls}>Full name</label>
            <input required id="name" name="name" placeholder="e.g. Priya Sharma" className={inputCls} />
          </div>
          <div>
            <label htmlFor="business" className={labelCls}>Business name</label>
            <input required id="business" name="business" placeholder="Your company" className={inputCls} />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>Phone number</label>
            <input required id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className={inputCls} />
          </div>
          <div>
            <label htmlFor="email" className={labelCls}>Work email</label>
            <input required id="email" name="email" type="email" placeholder="you@business.com" className={inputCls} />
          </div>
          <div>
            <label htmlFor="website" className={labelCls}>Current website (optional)</label>
            <input id="website" name="website" type="text" placeholder="yourwebsite.com" className={inputCls} />
          </div>
          <div>
            <label htmlFor="project" className={labelCls}>Project type</label>
            <select id="project" name="project" defaultValue="" className={inputCls}>
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="da-shadow-cta da-focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-extrabold text-primary-foreground transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
        >
          {loading ? (
            <>
              Sending…
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
            </>
          ) : (
            <>
              Request My Website Proposal
              <ArrowRight className="h-5 w-5 shrink-0" />
            </>
          )}
        </button>
        <p className="mt-2.5 text-center text-xs text-ink-muted">Takes 45 seconds · No credit card · No spam, ever.</p>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
          {["No obligation", "100% confidential", "Reply within 1 business day"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-orange" /> {t}
            </li>
          ))}
        </ul>
      </form>

      <div className="mt-4 rounded-2xl border border-brand-navy/8 bg-surface-2 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">Your Proposal Includes</div>
        </div>
        <ul className="mt-2.5 grid grid-cols-1 gap-1.5 text-sm text-ink sm:grid-cols-2">
          {proposalIncludes.map((t) => (
            <li key={t} className="flex items-start gap-1.5">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="da-gradient-hero relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Website Development Services in Ahmedabad
          </div>

          <h1 className="mt-6 text-[38px] font-extrabold leading-[1.12] tracking-tight text-brand-navy sm:text-5xl md:text-[54px] md:leading-[1.1]">
            Custom Websites Built to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-orange">Win Business</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-orange/15" />
            </span>
            , Not Just Look Good.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            We design and develop fast, mobile-friendly, SEO-ready websites for Ahmedabad businesses —
            built on a proper technical foundation so every visitor has a real chance of becoming a lead.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryCTA href="#quote">Request My Website Proposal</PrimaryCTA>
            <SecondaryCTA href="#results">View Our Work</SecondaryCTA>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm font-semibold text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 text-brand-orange">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              5.0 Rated
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-brand-navy/20 sm:inline-block" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-orange" /> Years of Experience
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-brand-navy/20 sm:inline-block" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-brand-orange" /> Businesses Served
            </span>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:pt-2">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */

function Stats() {
  const items = [
    { k: "100%", v: "Custom-built, no rigid templates" },
    { k: "3×", v: "Faster load times vs. typical WordPress sites" },
    { k: "40+", v: "Websites designed and shipped" },
    { k: "SEO", v: "Ready from day one, not bolted on later" },
  ];
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((s) => (
            <div
              key={s.v}
              className="da-shadow-card da-card-hover flex h-full flex-col items-center justify-center rounded-2xl border border-brand-navy/12 bg-white p-7 text-center"
            >
              <div className="text-4xl font-extrabold text-brand-navy md:text-5xl">{s.k}</div>
              <div className="mt-2 text-sm font-medium text-ink-muted md:text-base">{s.v}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Problem (PAS) ---------------- */

function Problem() {
  const pains = [
    {
      icon: Gauge,
      t: "Slow, clunky website",
      d: "Visitors bounce before the page even loads — every extra second costs you leads.",
    },
    {
      icon: Smartphone,
      t: "Broken on mobile",
      d: "Most of your traffic is on a phone, but the site was only ever tested on desktop.",
    },
    {
      icon: MousePointerClick,
      t: "Traffic that doesn't convert",
      d: "Visitors land on the site but there's no clear next step, so they leave without enquiring.",
    },
    {
      icon: ShieldCheck,
      t: "Outdated, hard to maintain",
      d: "Old themes, no support, and every small change takes weeks and costs extra.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[720px] text-center">
          <SectionLabel>The real problem</SectionLabel>
          <h2 className="mt-4 text-[28px] font-extrabold leading-[1.25] tracking-tight text-brand-navy sm:text-[32px] md:text-[36px]">
            Your Website Isn't Just a Brochure.
            <br />
            It's Your Best <span className="text-brand-orange">Salesperson</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base leading-relaxed text-ink-muted md:text-lg">
            A slow, generic or outdated website quietly turns away the customers your marketing works hard to bring in.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="da-shadow-card da-card-hover group flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="mt-5 text-base font-bold leading-snug text-brand-navy">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why a proper website matters ---------------- */

function WhyItMatters() {
  const points = [
    "A fast, well-built site keeps visitors engaged instead of bouncing to a competitor",
    "Every business website we build starts SEO-ready — clean code, proper structure, no retrofitting later",
    "Mobile-first design means the majority of your traffic gets a site that actually works",
    "Clear calls-to-action and conversion-focused layout turn visits into real enquiries",
  ];
  return (
    <section className="da-gradient-navy relative overflow-hidden text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            <Rocket className="h-3.5 w-3.5" /> Built to perform
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            A website that just <span className="text-brand-orange">exists</span> isn't good enough anymore.
          </h2>
          <p className="mt-5 text-lg text-white/75">
            We build websites engineered for speed, mobile usability and search visibility from the first line
            of code — so your website works as hard as the rest of your marketing.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Speed", "Mobile-First", "SEO-Ready", "Conversion-Focused", "Secure"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <ul className="space-y-3">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
              <span className="text-base text-white/90 md:text-lg">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Challenges We Solve ---------------- */

function WebsiteChallenges() {
  const challenges = [
    {
      icon: TrendingUp,
      t: "Website Not Generating Leads",
      problem: "Traffic comes in but the site isn't converting visitors into enquiries.",
      solution: "Conversion-focused layouts, clear CTAs and message-match built into every page.",
    },
    {
      icon: Gauge,
      t: "Slow Page Load Times",
      problem: "Pages take too long to load, so visitors leave before they even see your offer.",
      solution: "Modern, lightweight tech stack engineered for sub-second load times.",
    },
    {
      icon: Smartphone,
      t: "Poor Mobile Experience",
      problem: "The site looks broken or hard to use on phones, where most visitors are.",
      solution: "Mobile-first, responsive design tested across real devices before launch.",
    },
    {
      icon: RefreshCw,
      t: "Outdated Design",
      problem: "An old-looking website quietly makes visitors question your credibility.",
      solution: "A modern, on-brand design system that builds trust the moment the page loads.",
    },
    {
      icon: Search,
      t: "Not Showing Up on Google",
      problem: "The site was never built with SEO fundamentals in mind.",
      solution: "Clean semantic code, proper structure and metadata built in from day one.",
    },
    {
      icon: Lock,
      t: "Security & Maintenance Headaches",
      problem: "Constant plugin issues, hacks and maintenance costs on an old platform.",
      solution: "A secure, modern stack with far fewer moving parts to break or exploit.",
    },
    {
      icon: LayoutGrid,
      t: "Hard to Update Content",
      problem: "Every small text or image change requires a developer and days of waiting.",
      solution: "A clean, manageable content structure your team can actually update.",
    },
    {
      icon: ShoppingCart,
      t: "No Ecommerce Capability",
      problem: "You need to sell online but your current site can't support it.",
      solution: "Ecommerce-ready builds with secure payments, catalog and order management.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Where most websites break down"
          title={<>Website Challenges We <span className="text-brand-orange">Solve</span></>}
          sub="Common problems businesses face with their website before it starts driving real growth."
        />
        <Reveal className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map(({ icon: Icon, t, problem, solution }) => (
            <div
              key={t}
              className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="mt-5 text-base font-bold leading-snug text-brand-navy">{t}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">{problem}</p>
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-orange">
                <ArrowDown className="h-3 w-3" /> Our Solution
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{solution}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Framework ---------------- */

function Framework() {
  const items = [
    { icon: Palette, t: "Custom UI/UX Design", d: "On-brand, conversion-focused design — never a generic templated theme." },
    { icon: Code2, t: "Custom Development", d: "Hand-built with modern frameworks, not bloated page builders." },
    { icon: Smartphone, t: "Mobile-First Build", d: "Designed and tested for mobile first, then scaled up to desktop." },
    { icon: Search, t: "SEO-Ready Foundation", d: "Clean semantic HTML, structured data and metadata built in from day one." },
    { icon: Gauge, t: "Speed & Core Web Vitals", d: "Engineered for fast load times — good for users and for rankings." },
    { icon: ShoppingCart, t: "Ecommerce Ready", d: "Secure payments, catalog management and order workflows when you need to sell online." },
    { icon: Lock, t: "Security Built In", d: "Modern, secure hosting and code practices — far fewer vulnerabilities than legacy CMS setups." },
    { icon: Server, t: "Reliable Hosting & Support", d: "Deployment, monitoring and ongoing support so the site stays fast and online." },
    { icon: Target, t: "Conversion-Focused Layout", d: "Every page is built as a sales asset — message match, CRO and lead capture." },
  ];
  return (
    <section id="framework" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="What we build"
          title={<>9 pillars. <span className="text-brand-orange">One website that works</span>.</>}
          sub="A single, integrated system covering design, engineering and growth-readiness — the full scope of modern website development, built to compound results over time."
        />
        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="da-shadow-card da-card-hover group relative overflow-hidden rounded-2xl border border-brand-navy/12 bg-white p-7"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-orange/0 transition group-hover:bg-brand-orange/8" />
              <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-brand-navy text-white">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="relative mt-5 text-xl font-bold">{t}</h3>
              <p className="relative mt-2 text-[15px] text-ink-muted">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process() {
  const steps = [
    { n: "01", t: "Discovery & strategy", d: "We learn your business, your buyers and what the website actually needs to achieve." },
    { n: "02", t: "Design", d: "Wireframes and on-brand visual design, reviewed with you before a single line of code." },
    { n: "03", t: "Development", d: "Custom-built, mobile-first, SEO-ready pages — tested across devices and browsers." },
    { n: "04", t: "Launch & support", d: "Go-live, then ongoing monitoring, updates and support to keep the site performing." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Our process"
          title="How we build your website"
          sub="A transparent, structured process — so you always know what's happening and when you'll launch."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="da-shadow-card da-card-hover relative flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7"
            >
              <div className="text-5xl font-extrabold text-brand-orange/30">{s.n}</div>
              <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">{s.d}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute right-4 top-7 hidden h-5 w-5 text-brand-navy/20 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Results ---------------- */

function MiniGrowthGraph({ bars }: { bars: number[] }) {
  return (
    <div className="flex h-8 items-end gap-1" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-white/70 transition-colors group-hover:bg-white"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function Results() {
  const cases = [
    {
      category: "Healthcare · IVF Clinic",
      icon: Baby,
      growth: "+76.7%",
      growthLabel: "Organic traffic after rebuild",
      timeline: "6 Months",
      title: "IVF Hospital — Website Rebuild",
      description:
        "A conversion-focused, SEO-ready website rebuild drove a 76.7% organic traffic increase in six months, generating 3× more appointment leads.",
      tags: ["Web Design", "SEO-Ready Build", "Local SEO"],
      graph: [22, 30, 28, 48, 65, 88],
    },
    {
      category: "Healthcare · Ophthalmology",
      icon: Eye,
      growth: "+120%",
      growthLabel: "Full-funnel traffic",
      timeline: "Ongoing Engagement",
      title: "Eye Hospital — Full Funnel Growth",
      description:
        "A new conversion-optimized website paired with Google Ads and Meta Ads drove 120% traffic growth and doubled OPD bookings.",
      tags: ["Web Design", "Google Ads", "Meta Ads"],
      graph: [18, 26, 40, 55, 70, 92],
    },
    {
      category: "Home Services",
      icon: Wrench,
      growth: "+174.5%",
      growthLabel: "Local traffic surge",
      timeline: "Ongoing Engagement",
      title: "Home Appliance Repair — New Website + Landing Pages",
      description:
        "A fast, mobile-first website and dedicated landing pages generated a 174.5% traffic surge and 200% more service bookings.",
      tags: ["Landing Pages", "Local SEO", "Meta Ads"],
      graph: [15, 24, 38, 60, 76, 96],
    },
  ];
  return (
    <section id="results" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Our work"
          title={<>Real businesses. <span className="text-brand-orange">Real results</span>.</>}
          sub="A glimpse into the kind of outcomes our clients see when a website is engineered, not just designed."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.title}
              className="da-shadow-card da-card-hover group flex flex-col overflow-hidden rounded-3xl border border-brand-navy/12 bg-white"
            >
              <div className="da-gradient-navy px-6 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">{c.category}</div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10">
                    <c.icon className="h-4.5 w-4.5" />
                  </span>
                </div>
                <div className="mt-3 text-4xl font-extrabold leading-none text-white">{c.growth}</div>
                <div className="mt-1 text-sm text-white/75">{c.growthLabel}</div>
                <div className="mt-4">
                  <MiniGrowthGraph bars={c.graph} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                  <Clock className="h-3.5 w-3.5 text-brand-orange" /> {c.timeline}
                </div>
                <h3 className="text-lg font-bold leading-snug text-brand-navy">{c.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{c.description}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand-orange/25 bg-brand-orange-soft px-3 py-1 text-xs font-semibold text-brand-orange"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://thedigitalaura.com/case-studies"
                  target="_blank"
                  rel="noopener"
                  className="da-focus-ring group/link mt-auto inline-flex items-center gap-1.5 rounded-sm text-sm font-bold text-brand-navy transition-colors hover:text-brand-orange"
                >
                  View Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Client Logo Wall ---------------- */

function ClientLogoWall() {
  const [paused, setPaused] = useState(false);
  const logos = [
    { src: clientLogoGameZone, name: "Game Zone Events" },
    { src: clientLogoAmvi, name: "Amvi Hospital" },
    { src: clientLogoAOneAutoCare, name: "A-One Auto Care" },
    { src: clientLogoInnOfTheDove, name: "Inn of the Dove" },
    { src: clientLogoLevapor, name: "Levapor" },
    { src: clientLogoMisc, name: "DP Electric" },
    { src: clientLogoKrishaHospital, name: "Krisha Hospital" },
    { src: clientLogoPrism, name: "Prism Calibration" },
    { src: clientLogoShukanHospital, name: "Shukan Hospital" },
    { src: clientLogoDrParthShah, name: "Dr Parth Shah" },
    { src: clientLogoSpinx, name: "Spinx", dark: true },
    { src: clientLogoTgp, name: "The Grand Palace" },
    { src: clientLogoClarityEyeSurgeons, name: "Clarity Eye Surgeons" },
    { src: clientLogoKrishaEyeHospital, name: "Krisha Eye Hospital" },
  ];
  const track = [...logos, ...logos];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Our clients"
          title="Trusted by Businesses We've Helped Grow"
          sub="From healthcare and education to eCommerce and local businesses, we're proud to build websites for ambitious brands across multiple industries."
        />

        <div
          className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="da-marquee-track flex w-max items-stretch gap-5" data-paused={paused}>
            {track.map(({ src, name, dark }, i) => (
              <div
                key={`${name}-${i}`}
                className={cn(
                  "da-shadow-card flex w-[200px] flex-none flex-col items-center justify-center gap-3 rounded-2xl border border-brand-navy/10 bg-[#FAFAFA] p-4 transition-all duration-[250ms] ease-out sm:w-[220px] lg:w-[240px]",
                  "hover:-translate-y-1 hover:border-brand-orange hover:shadow-lg",
                )}
              >
                <div
                  className={cn(
                    "flex h-20 w-full items-center justify-center",
                    dark && "rounded-lg bg-brand-navy px-3 py-2",
                  )}
                >
                  <img
                    src={src}
                    alt={`${name} logo`}
                    loading="lazy"
                    className="h-full max-h-20 w-auto max-w-full object-contain"
                  />
                </div>
                <div className="text-center text-xs font-bold leading-snug text-brand-navy">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

function Testimonials() {
  // Verified Google reviews from thedigitalaura.com/testimonials.
  const items = [
    {
      q: "Digital Aura's team designed a professional website and executed a highly effective Meta Ads campaign that brought us real, measurable results.",
      n: "Sahebrav Patil",
      role: "Pest Control Business",
    },
    {
      q: "Digital Aura helped us take our brand online and generate quality leads for our event solutions business.",
      n: "Darshil Shah",
      role: "Elegant Event Solutions",
    },
    {
      q: "Excellent results and professional service! Our online presence has been outstanding since working with Digital Aura.",
      n: "Ketan Patel",
      role: "Business Owner",
    },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="What clients say"
          title="Loved by founders who care about outcomes"
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
                  <img src={googlePlatformLogo} alt="Google" className="h-4 w-auto object-contain" />
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange-soft px-2 py-0.5 text-[10px] font-bold text-brand-orange">
                    <Check className="h-2.5 w-2.5" /> Verified
                  </span>
                </div>
              </div>
              <Quote className="mt-4 h-7 w-7 text-brand-orange/30" />
              <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-ink">
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

/* ---------------- Rated on top platforms ---------------- */

function RatedOnPlatforms() {
  const platforms = [
    { name: "Google", logo: googlePlatformLogo, rating: "5.0", reviews: "100+ Reviews" },
    { name: "Clutch", logo: clutchBadge, rating: "4.9", reviews: "50+ Reviews" },
    { name: "GoodFirms", logo: goodfirmsBadge, rating: "4.8", reviews: "40+ Reviews" },
    { name: "DesignRush", logo: designrushBadge, rating: "4.7", reviews: "30+ Reviews" },
  ];
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Verified reviews"
          title="Rated on the platforms that matter"
          sub="Independently reviewed by clients on the review platforms B2B buyers actually check."
        />
        <Reveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {platforms.map(({ name, logo, rating, reviews }) => (
            <div
              key={name}
              className="da-shadow-card da-card-hover flex h-full flex-col items-center justify-between gap-4 rounded-2xl border border-brand-navy/12 bg-white p-7 text-center"
            >
              <img src={logo} alt={`${name} rating badge`} className="h-24 w-auto max-w-[170px] object-contain" />
              <div>
                <div className="flex items-center justify-center gap-0.5 text-brand-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <div className="mt-1 text-lg font-extrabold text-brand-navy">{rating}</div>
                <div className="text-xs text-ink-muted">{reviews}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Why Businesses Choose Digital Aura ---------------- */

function WhyChooseUs() {
  const items = [
    { icon: Palette, t: "Custom Design, Not Templates", d: "Every website is designed around your brand, not a reused theme." },
    { icon: Code2, t: "Modern Development Stack", d: "Built on modern frameworks for speed, security and reliability." },
    { icon: Search, t: "SEO-Ready From Day One", d: "Clean code and structure means the site is ready to rank the moment it launches." },
    { icon: Smartphone, t: "Mobile-First By Default", d: "Designed and tested for mobile first, then scaled up — not the other way around." },
    { icon: Target, t: "Conversion-Focused", d: "We optimise for enquiries and sales, not just how the site looks." },
    { icon: Server, t: "Reliable Support", d: "Ongoing monitoring, updates and support after launch — not a one-time handoff." },
    { icon: Briefcase, t: "Business-Focused Process", d: "A transparent process with fixed pricing and clear timelines, start to finish." },
    { icon: TrendingUp, t: "Built to Scale", d: "Architecture that grows with your business instead of needing a rebuild in a year." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Why Digital Aura"
          title={<>Why Businesses Choose <span className="text-brand-orange">Digital Aura</span></>}
          sub="Real reasons businesses across Ahmedabad choose Digital Aura for website development."
        />
        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }) => (
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

/* ---------------- Certified & Trusted ---------------- */

function CertifiedTrusted() {
  const items = [
    { logo: googlePartnerLogo, name: "Google Partner" },
    { logo: bingPartnerLogo, name: "Microsoft Advertising (Bing)" },
    { logo: googleAnalyticsCertLogo, name: "Google Analytics" },
    { logo: googleSearchConsoleCertLogo, name: "Google Search Console" },
    { logo: googleBusinessProfileLogo, name: "Google Business Profile" },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Trust & certifications"
          title="Certified Platforms & Trusted Ecosystem"
          sub="The platforms and certifications behind every website we build."
        />
        <Reveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ logo, name }) => (
            <div
              key={name}
              className="da-shadow-card da-card-hover flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-brand-navy/12 bg-white p-6 text-center"
            >
              <div className="grid h-28 w-full place-items-center rounded-xl bg-white">
                <img src={logo} alt={`${name} logo`} className="h-24 w-auto max-w-[160px] object-contain" />
              </div>
              <div className="text-xs font-bold leading-snug text-brand-navy">{name}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */

function Industries() {
  const list = [
    { icon: HeartPulse, t: "Healthcare", d: "Patient-friendly websites with appointment booking, service pages and local SEO built in." },
    { icon: UtensilsCrossed, t: "Restaurants", d: "Menu-forward sites with online ordering and reservation flows that turn browsers into diners." },
    { icon: Building2, t: "Real Estate", d: "Listing-rich websites with strong visuals and lead capture built for serious buyers." },
    { icon: ShoppingCart, t: "eCommerce", d: "Conversion-optimised storefronts with secure checkout and fast product pages." },
    { icon: GraduationCap, t: "Education", d: "Course and admissions-focused websites that make enquiring effortless." },
    { icon: Wrench, t: "Home Services", d: "Fast, mobile-first sites with click-to-call and quote-request flows built in." },
    { icon: Dumbbell, t: "Fitness", d: "Class schedules, trial sign-ups and membership pages designed to fill your calendar." },
    { icon: Plane, t: "Travel", d: "Destination and itinerary-rich websites built to inform and convert researching travellers." },
  ];
  return (
    <section id="industries" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Who we serve"
          title={<>Industries we build <span className="text-brand-orange">websites</span> for</>}
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

/* ---------------- Comparison ---------------- */

function Compare() {
  const rows = [
    ["Custom design, not a reused theme", true, false],
    ["SEO-ready code from day one", true, "Added later, if at all"],
    ["Mobile-first, tested across devices", true, "Surface-level"],
    ["Conversion-focused page structure", true, false],
    ["Transparent, fixed-price scope", true, "Vague, hourly billing"],
    ["Ongoing support after launch", true, false],
    ["Cheap template with hidden limits", false, true],
    ["Slow, bloated page builders", false, true],
  ];
  return (
    <section id="compare" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="The difference"
          title={<>Digital Aura vs. a <span className="text-brand-orange">typical web agency</span></>}
          sub="See why businesses comparing website development companies in Ahmedabad choose Digital Aura."
        />
        <div className="da-shadow-card mt-12 overflow-hidden rounded-3xl border border-brand-navy/12 bg-white">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-surface-2 px-4 py-4 text-xs font-bold uppercase tracking-wider text-ink-muted md:px-8 md:text-sm">
            <div className="flex items-center">What you get</div>
            <div className="flex h-full items-center justify-center text-brand-navy">
              <img src={digitalAuraLogo} alt="Digital Aura" className="h-10 w-auto object-contain md:h-12" />
            </div>
            <div className="flex items-center justify-center font-bold">Other agency</div>
          </div>
          {rows.map(([label, a, b], i) => (
            <div
              key={String(label)}
              className={`grid grid-cols-[1.4fr_1fr_1fr] px-4 text-sm transition-colors md:px-8 md:text-base ${
                i % 2 ? "bg-white" : "bg-surface-2/40"
              }`}
            >
              <div className="flex items-center py-4 pr-3 font-semibold text-ink md:py-5">{label as string}</div>
              <div className="flex h-full items-center justify-center bg-brand-orange-soft/50 py-4 md:py-5">
                {a === true ? (
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange text-white shadow-[0_4px_12px_-2px_rgba(234,88,12,0.45)]">
                    <Check className="h-4.5 w-4.5" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-navy/10 text-brand-navy/50">
                    <X className="h-4 w-4" />
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center py-4 md:py-5">
                {b === true ? (
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-navy/10 text-brand-navy/60">
                    <Check className="h-4 w-4" />
                  </span>
                ) : b === false ? (
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-navy/10 text-brand-navy/40">
                    <X className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-ink-muted md:text-sm">{b}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const faqs = [
    {
      q: "How much does website development cost in Ahmedabad?",
      a: "Pricing depends on scope — a brochure site, an ecommerce store and a large multi-page site all cost differently. After understanding your goals, we give you a fixed price and timeline — no hidden add-ons.",
    },
    {
      q: "How long does it take to build a website?",
      a: "A standard business website typically takes 3-5 weeks from kickoff to launch. Ecommerce or larger custom builds can take longer depending on scope — we confirm an exact timeline before starting.",
    },
    {
      q: "Will my new website be SEO-friendly?",
      a: "Yes. Every website we build starts with clean, semantic code, proper heading structure, fast load times and metadata in place — the technical foundation SEO needs, built in from day one, not retrofitted later.",
    },
    {
      q: "Do you build on WordPress or custom code?",
      a: "Both, depending on your needs. We build custom React-based websites for speed and flexibility, and WordPress sites when a client needs a specific content workflow — we recommend the right platform for your case.",
    },
    {
      q: "Can you redesign my existing website instead of building new?",
      a: "Yes. We regularly redesign outdated sites — improving design, speed, mobile experience and SEO foundations while keeping what's already working for you.",
    },
    {
      q: "Do you build ecommerce websites?",
      a: "Yes — secure payments, product catalogs, inventory and order management, built to convert browsers into buyers.",
    },
    {
      q: "Will I be able to update the website myself after launch?",
      a: "Yes. We build with a manageable content structure so your team can update text, images and basic content without needing a developer for every small change.",
    },
    {
      q: "Do you offer ongoing support after the website launches?",
      a: "Yes. We offer ongoing maintenance, monitoring and support plans so your website stays fast, secure and up to date after launch.",
    },
    {
      q: "What makes Digital Aura different from other website development companies in Ahmedabad?",
      a: "We don't just design — we engineer. Every website is custom-built, mobile-first, SEO-ready and conversion-focused from day one, with a transparent process and fixed pricing, not an open-ended retainer.",
    },
    {
      q: "Can you also help with marketing once the website is live?",
      a: "Yes. Digital Aura also offers SEO, Google Ads and Meta Ads — so the same team that builds your website can help drive traffic and leads to it.",
    },
  ];
  return (
    <section id="faq" className="bg-surface-2">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="FAQs"
          title="Answers to what serious founders ask first"
        />
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
              <SectionLabel>Ready when you are</SectionLabel>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Let's build a website that works for your business — <span className="text-brand-orange">not against it</span>.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/80">
                Free, no-obligation proposal covering design direction, tech recommendation, timeline and fixed
                pricing. Delivered after a short call with a senior website strategist.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA href="#quote">Request My Website Proposal</PrimaryCTA>
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
/* ---------------- Floating widgets ---------------- */

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-navy/10 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <a
        href="#quote"
        className="da-shadow-cta da-focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[15px] font-extrabold text-primary-foreground"
      >
        Request My Website Proposal <ArrowRight className="h-4 w-4 shrink-0" />
      </a>
    </div>
  );
}

/* ---------------- Page ---------------- */

const WebsiteDevelopmentServicesPage = () => {
  useBasicSEO();
  return (
    <PageLayout>
      <div className="bg-white pb-20 md:pb-0">
        <LocalBusinessSchema />
        <Hero />
        <Stats />
        <Problem />
        <WhyItMatters />
        <WebsiteChallenges />
        <Framework />
        <Process />
        <Results />
        <ClientLogoWall />
        <Testimonials />
        <RatedOnPlatforms />
        <WhyChooseUs />
        <CertifiedTrusted />
        <Industries />
        <Compare />
        <FAQ />
        <FinalCTA />
        <MobileStickyCTA />
      </div>
    </PageLayout>
  );
};

export default WebsiteDevelopmentServicesPage;
