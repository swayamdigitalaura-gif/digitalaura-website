import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Search,
  Sparkles,
  Bot,
  Network,
  ShieldCheck,
  Zap,
  Target,
  Layers,
  Database,
  FileCode2,
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
  TrendingDown,
  Users,
  Crosshair,
  Settings2,
  RefreshCw,
  MapPinned,
  Link2,
  BarChart3,
  FileBarChart,
  MousePointerClick,
  Lightbulb,
  Briefcase,
  ArrowDown,
} from "lucide-react";
import digitalAuraLogo from "@/assets/brand/digital-aura-logo.png";
import googlePlatformLogo from "@/assets/platform-logos/google-logo.png";
import clutchBadge from "@/assets/platform-logos/clutch-badge.png";
import goodfirmsBadge from "@/assets/platform-logos/goodfirms-badge.png";
import designrushBadge from "@/assets/platform-logos/designrush-badge.webp";
import semrushLogo from "@/assets/tool-logos/semrush.png";
import ahrefsLogo from "@/assets/tool-logos/ahrefs.png";
import screamingFrogLogo from "@/assets/tool-logos/screaming-frog.png";
import surferSeoLogo from "@/assets/tool-logos/surfer-seo.png";
import localFalconLogo from "@/assets/tool-logos/local-falcon.jpg";
import dataForSeoLogo from "@/assets/tool-logos/dataforseo.png";
import googleSearchConsoleToolLogo from "@/assets/tool-logos/google-search-console.png";
import googleAnalyticsToolLogo from "@/assets/tool-logos/google-analytics.png";
import chatgptLogo from "@/assets/tool-logos/chatgpt.jpg";
import claudeLogo from "@/assets/tool-logos/claude.png";
import geminiLogo from "@/assets/tool-logos/gemini.png";
import googlePartnerLogo from "@/assets/certified-logos/google-partner.png";
import bingPartnerLogo from "@/assets/certified-logos/bing-partner.png";
import googleAnalyticsCertLogo from "@/assets/certified-logos/google-analytics.png";
import googleSearchConsoleCertLogo from "@/assets/certified-logos/google-search-console.png";
import googleBusinessProfileLogo from "@/assets/certified-logos/google-business-profile.jpg";
import gscSlideBfi from "@/assets/gsc-slider/bfi.jpg";
import gscSlideKrisha from "@/assets/gsc-slider/krisha.png";
import gscSlideTgp from "@/assets/gsc-slider/tgp.png";
import clientLogoGameZone from "@/assets/client-logos/game-zone-events.webp";
import clientLogoAmvi from "@/assets/client-logos/amvi-hospital.png";
import clientLogoAOneAutoCare from "@/assets/client-logos/a-one-auto-care.png";
import clientLogoInnOfTheDove from "@/assets/client-logos/inn-of-the-dove.png";
import clientLogoLevapor from "@/assets/client-logos/levapor.png";
import clientLogoMisc from "@/assets/client-logos/logo-misc.png";
import clientLogoKrishaHospital from "@/assets/client-logos/new-logo.png";
import clientLogoPrism from "@/assets/client-logos/prism.png";
import clientLogoShukanHospital from "@/assets/client-logos/shukan-hospital.png";
import clientLogoDrParthShah from "@/assets/client-logos/site-logo.png";
import clientLogoSpinx from "@/assets/client-logos/spinx-logo-white.png";
import clientLogoTgp from "@/assets/client-logos/tgp.webp";
import clientLogoClarityEyeSurgeons from "@/assets/client-logos/clarity-eye-surgeons.png";
import clientLogoKrishaEyeHospital from "@/assets/client-logos/krisha-eye-hospital.webp";
import { toast, Toaster } from "sonner";
import { MainSiteNavbar } from "@/components/MainSiteNavbar";
import { MainSiteFooter } from "@/components/MainSiteFooter";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/seo-services-ahmedabad")({
  head: () => ({
    meta: [
      { title: "Best SEO Company in Ahmedabad | Digital Aura — Google + AI Search SEO Agency" },
      {
        name: "description",
        content:
          "Digital Aura is the best SEO company in Ahmedabad — a full-service SEO services agency ranking businesses on Google and getting them cited on ChatGPT, Gemini & Perplexity. Technical SEO, Local SEO, AIO & GEO. Get your free SEO + AI Search audit.",
      },
      {
        name: "keywords",
        content:
          "Best SEO Company in Ahmedabad, SEO Expert in Ahmedabad, SEO Services Agency in Ahmedabad, SEO Companies in Ahmedabad, Leading SEO Company in Ahmedabad, AI Powered SEO Services in Ahmedabad, AEO SEO Services in Ahmedabad, Search Engine Optimization Company Ahmedabad, Technical SEO Company Ahmedabad, Local SEO Company Ahmedabad, Enterprise SEO Services Ahmedabad",
      },
      { property: "og:title", content: "Best SEO Company in Ahmedabad | Digital Aura — Google + AI Search SEO Agency" },
      {
        property: "og:description",
        content:
          "Technical SEO, On-Page SEO, AI SEO (AIO) & Generative Engine Optimization (GEO) for Ahmedabad businesses. Get cited on Google and AI search — book your free audit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Index,
});

/* ---------------- Structured data (LocalBusiness) ---------------- */

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Digital Aura",
    description:
      "Search engine optimization company in Ahmedabad specializing in Technical SEO, Local SEO, On-Page SEO, AI SEO (AIO) and Generative Engine Optimization (GEO).",
    image: digitalAuraLogo,
    telephone: "+91-81412-00284",
    email: "info@thedigitalaura.com",
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
  href = "#audit",
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
  href = "#contact",
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

/* ---------------- Header ---------------- */

const NAV_LINKS = [
  { href: "#framework", label: "Framework" },
  { href: "#results", label: "Results" },
  { href: "#industries", label: "Industries" },
  { href: "#compare", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-navy/10 bg-white/90 shadow-[0_4px_24px_-12px_rgba(30,27,75,0.18)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 md:px-8">
        <Logo imgClassName="h-[48px] md:h-[60px]" />
        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="da-focus-ring group relative rounded-md py-1 text-sm font-semibold text-ink transition-colors hover:text-brand-orange"
            >
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-brand-orange transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5 justify-self-end md:gap-3">
          <a
            href="tel:+918141200284"
            className="da-focus-ring hidden items-center gap-2 rounded-md text-sm font-semibold text-brand-navy transition-colors hover:text-brand-orange md:inline-flex"
          >
            <Phone className="h-4 w-4" /> +91 81412 00284
          </a>
          <PrimaryCTA href="#audit" className="!px-4 !py-2.5 !text-sm">
            <span className="hidden sm:inline">Get My Free SEO Audit</span>
            <span className="sm:hidden">Free Audit</span>
          </PrimaryCTA>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="da-focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-navy/12 text-brand-navy transition hover:border-brand-orange/40 hover:text-brand-orange lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85%] flex-col gap-0 border-l border-brand-navy/10 bg-white p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="border-b border-brand-navy/8 px-5 py-4">
                <Logo />
              </div>
              <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
                {NAV_LINKS.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="rounded-xl px-3 py-3.5 text-base font-semibold text-ink transition hover:bg-surface-2 hover:text-brand-orange"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="space-y-3 border-t border-brand-navy/8 px-5 py-5">
                <a
                  href="tel:+918141200284"
                  className="flex items-center gap-2 text-sm font-semibold text-brand-navy"
                >
                  <Phone className="h-4 w-4 text-brand-orange" /> +91 81412 00284
                </a>
                <SheetClose asChild>
                  <PrimaryCTA href="#audit" className="w-full">
                    Get My Free SEO Audit
                  </PrimaryCTA>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero + Form ---------------- */

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
          company: fd.get("business"),
          message: fd.get("website") || "",
          project: "SEO Services",
          source: "seo-services-ahmedabad",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      (e.target as HTMLFormElement).reset();
      toast.success("Audit request received!", {
        description: "Our senior SEO consultant will reach out within 1 business hour.",
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

  const auditIncludes = [
    "SEO Audit",
    "Technical SEO Review",
    "Keyword Gap Analysis",
    "Competitor Analysis",
    "Google Search Console Review",
    "Google Analytics Review",
    "Growth Roadmap",
  ];

  return (
    <div>
      <form
        id="audit"
        onSubmit={onSubmit}
        className="da-shadow-card rounded-3xl border border-brand-navy/10 bg-white p-6 md:p-7"
      >
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <Zap className="h-3.5 w-3.5" /> Free · 48-hour delivery
          </div>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-[28px]">
            Get My Free SEO Audit
          </h3>
          <p className="mt-1.5 text-sm text-ink-muted">
            Reviewed personally by a senior SEO expert in Ahmedabad — not an automated report.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelCls}>Full name</label>
            <input required id="name" name="name" placeholder="e.g. Raj Patel" className={inputCls} />
          </div>
          <div>
            <label htmlFor="business" className={labelCls}>Business name</label>
            <input required id="business" name="business" placeholder="Your company" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="website" className={labelCls}>Website URL</label>
            <input
              required
              id="website"
              name="website"
              type="text"
              placeholder="yourwebsite.com"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>Phone number</label>
            <input required id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className={inputCls} />
          </div>
          <div>
            <label htmlFor="email" className={labelCls}>Work email</label>
            <input required id="email" name="email" type="email" placeholder="you@business.com" className={inputCls} />
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
              Get My Free SEO Audit
              <ArrowRight className="h-5 w-5 shrink-0" />
            </>
          )}
        </button>
        <p className="mt-2.5 text-center text-xs text-ink-muted">Takes 45 seconds · No credit card · No spam, ever.</p>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
          {["No obligation", "100% confidential", "Senior consultant call"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-orange" /> {t}
            </li>
          ))}
        </ul>
      </form>

      <div className="mt-4 rounded-2xl border border-brand-navy/8 bg-surface-2 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">Your Free Audit Includes</div>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-ink-muted/70 line-through">Worth ₹15,000</span>
            <span className="font-extrabold text-brand-orange">FREE</span>
          </div>
        </div>
        <ul className="mt-2.5 grid grid-cols-1 gap-1.5 text-sm text-ink sm:grid-cols-2">
          {auditIncludes.map((t) => (
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
            Best SEO Company in Ahmedabad
          </div>

          <h1 className="mt-6 text-[38px] font-extrabold leading-[1.12] tracking-tight text-brand-navy sm:text-5xl md:text-[54px] md:leading-[1.1]">
            No{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-orange">#1</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-orange/15" />
            </span>{" "}
            SEO Services in Ahmedabad.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            We help Ahmedabad businesses grow qualified organic traffic, generate more leads
            and stay visible across Google Search, AI Search and local results — with a
            structured, transparent SEO process built around real business outcomes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryCTA href="#audit">Get My Free SEO Audit</PrimaryCTA>
            <SecondaryCTA href="#results">View Case Studies</SecondaryCTA>
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
    { k: "10×", v: "Average organic growth in 6 months" },
    { k: "85%", v: "Of clients rank in AI search results" },
    { k: "120+", v: "Websites optimized end-to-end" },
    { k: "48h", v: "Free audit turnaround time" },
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
      icon: TrendingUp,
      t: "Traffic up, leads flat",
      d: "Rankings improve but the phone doesn't ring. Your SEO isn't tied to revenue intent.",
    },
    {
      icon: Bot,
      t: "Invisible in AI search",
      d: "ChatGPT, Gemini and Perplexity recommend competitors — your brand isn't being cited.",
    },
    {
      icon: Gauge,
      t: "Slow, leaky website",
      d: "Poor Core Web Vitals, weak schema and broken internal linking cap your ceiling.",
    },
    {
      icon: ShieldCheck,
      t: "Burned by past agencies",
      d: "Vanity reports, generic blogs, zero technical work, no accountability for outcomes.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[720px] text-center">
          <SectionLabel>The real problem</SectionLabel>
          <h2 className="mt-4 text-[28px] font-extrabold leading-[1.25] tracking-tight text-brand-navy sm:text-[32px] md:text-[36px]">
            Your Business Isn't Losing Leads.
            <br />
            It's Losing <span className="text-brand-orange">Visibility</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base leading-relaxed text-ink-muted md:text-lg">
            Buyers don't just search Google anymore — they ask AI Overviews, ChatGPT, Gemini and Perplexity too.
            If you're invisible there, you don't exist to them.
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

/* ---------------- AI Search shift ---------------- */

function AIShift() {
  const points = [
    "Google AI Overviews now answer many queries directly, often without a click",
    "Buyers increasingly research on ChatGPT, Gemini & Perplexity before Google",
    "Citations in AI answers tend to drive higher-intent traffic than blue links",
    "Entity SEO, structured data & topical authority decide who gets quoted",
  ];
  return (
    <section className="da-gradient-navy relative overflow-hidden text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            <Bot className="h-3.5 w-3.5" /> The AI search shift
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Traditional SEO is dying.{" "}
            <span className="text-brand-orange">AI Search</span> is the new battlefield.
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Our AI-powered SEO services in Ahmedabad optimize you for both — Google's classic SERP and the new
            generation of generative answer engines. One agency. One strategy. Full-funnel visibility.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Google", "ChatGPT", "Gemini", "Perplexity", "AI Overviews"].map((p) => (
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

/* ---------------- SEO Challenges We Solve ---------------- */

function SEOChallenges() {
  const challenges = [
    {
      icon: TrendingDown,
      t: "Struggling to Improve Organic Traffic",
      problem: "Rankings have stalled and organic sessions haven't moved in months.",
      solution: "Full technical + content gap audit, then a rebuild of pages with real ranking potential.",
    },
    {
      icon: Users,
      t: "Getting Traffic but Not Enough Leads",
      problem: "Visitors land on your site but enquiries don't follow.",
      solution: "Intent-mapped pages with message-match and CTAs built around your buyer journey.",
    },
    {
      icon: Crosshair,
      t: "Competitors Ranking Higher",
      problem: "Rivals own page one for the keywords that actually bring you business.",
      solution: "We reverse-engineer what's winning for them and out-execute it on content and authority.",
    },
    {
      icon: Settings2,
      t: "Slow Website or Technical SEO Issues",
      problem: "A slow, error-prone site is quietly capping every ranking you could win.",
      solution: "Core Web Vitals, crawl errors, indexing and architecture fixed at the root, not the symptoms.",
    },
    {
      icon: RefreshCw,
      t: "Google Algorithm Updates",
      problem: "An algorithm update wiped out rankings you'd worked years to build.",
      solution: "We diagnose what was actually penalised and rebuild on update-resistant foundations.",
    },
    {
      icon: MapPinned,
      t: "Poor Local Search Visibility",
      problem: "You don't show up in the Map Pack when nearby customers search.",
      solution: "Google Business Profile, citations and local content built to win searches near you.",
    },
    {
      icon: Link2,
      t: "Weak Backlink Profile",
      problem: "Thin or spammy backlinks are holding your domain authority back.",
      solution: "A credible link profile built through digital PR and relevant, earned placements.",
    },
    {
      icon: BarChart3,
      t: "Low ROI from SEO",
      problem: "Money's going into SEO but it isn't showing up as revenue.",
      solution: "Every activity tied to rankings, leads and revenue — reported in numbers, not jargon.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Where most SEO breaks down"
          title={<>SEO Challenges We <span className="text-brand-orange">Solve</span></>}
          sub="Common SEO problems businesses face before they start seeing real growth."
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
    { icon: FileCode2, t: "Technical SEO", d: "Crawlability, indexability, redirects, log-file audits & architecture fixes that unlock growth." },
    { icon: Search, t: "On-Page SEO", d: "Intent-mapped pages, entity-rich content & internal linking that compounds rankings." },
    { icon: Bot, t: "AI SEO (AIO)", d: "Get cited inside ChatGPT, Gemini, Perplexity & Google AI Overviews — not just ranked." },
    { icon: Sparkles, t: "Generative Engine Optimization (GEO)", d: "AEO SEO services that structure your brand to win answer-engine real estate across LLMs." },
    { icon: Layers, t: "Content Strategy", d: "Topical clusters & priority pages built around buying intent, not blog volume." },
    { icon: Database, t: "Schema & Entity SEO", d: "Rich structured data, Knowledge Graph alignment & entity authority signals." },
    { icon: Gauge, t: "Core Web Vitals", d: "LCP, INP, CLS engineered to green — faster pages, better rankings, more conversions." },
    { icon: Network, t: "Site Architecture", d: "Information architecture, internal linking & hub-and-spoke models that scale." },
    { icon: Target, t: "Conversion-Focused SEO", d: "Every page is a sales asset — message match, CRO and lead capture, not just traffic." },
  ];
  return (
    <section id="framework" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="The Digital Aura Framework"
          title={<>9 pillars. <span className="text-brand-orange">One unfair advantage</span>.</>}
          sub="A single, integrated system covering technical foundations, content depth, and AI-search dominance — the full scope of search engine optimization, engineered to compound results month after month."
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
    { n: "01", t: "Deep audit", d: "Technical, on-page, content, schema & AI-visibility audit on your domain and top competitors." },
    { n: "02", t: "Strategy & roadmap", d: "A 90-day priority roadmap mapped to your revenue pages, intent gaps & quick wins." },
    { n: "03", t: "Execution sprints", d: "Bi-weekly sprints: technical fixes, on-page optimization, content production, schema, GEO." },
    { n: "04", t: "Compound & scale", d: "Monthly reporting on rankings, AI citations, traffic, leads — and the next growth lever." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Our process"
          title="How we engineer your SEO growth"
          sub="A transparent, accountable system — so you always know what's being done, what's being moved, and why."
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

/* ---------------- SEO Tools We Use ---------------- */

function SEOToolsWeUse() {
  const tools = [
    { name: "Semrush", logo: semrushLogo, use: "Competitive keyword & market research" },
    { name: "Ahrefs", logo: ahrefsLogo, use: "Backlink & content gap analysis" },
    { name: "Screaming Frog", logo: screamingFrogLogo, use: "Technical crawl audits" },
    { name: "Surfer SEO", logo: surferSeoLogo, use: "On-page content optimisation" },
    { name: "Local Falcon", logo: localFalconLogo, use: "Local pack & Map rank tracking" },
    { name: "DataForSEO", logo: dataForSeoLogo, use: "Large-scale SERP & rank data" },
    { name: "Google Search Console", logo: googleSearchConsoleToolLogo, use: "Indexing & search performance" },
    { name: "Google Analytics", logo: googleAnalyticsToolLogo, use: "Traffic & conversion data" },
    { name: "ChatGPT", logo: chatgptLogo, use: "AI-assisted research & workflows" },
    { name: "Claude", logo: claudeLogo, use: "AI-assisted research & workflows" },
    { name: "Gemini", logo: geminiLogo, use: "AI search visibility monitoring" },
  ];
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Our stack"
          title={<>Professional SEO <span className="text-brand-orange">Tools</span> We Use</>}
          sub="From enterprise SEO services in Ahmedabad to AI-assisted research, Digital Aura runs every account on the same stack used by serious in-house SEO teams — combining enterprise platforms with AI-assisted workflows for faster, sharper decisions. The tools inform the strategy; our consultants make the call."
        />
        <Reveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="da-shadow-card da-card-hover flex h-full flex-col items-center gap-3 rounded-2xl border border-brand-navy/12 bg-white p-6 text-center"
            >
              <div className="grid h-28 w-full place-items-center rounded-xl bg-white">
                <img src={tool.logo} alt={`${tool.name} logo`} className="h-24 w-auto max-w-[160px] object-contain" />
              </div>
              <div>
                <div className="text-sm font-bold text-brand-navy">{tool.name}</div>
                <div className="mt-1 text-xs leading-snug text-ink-muted">{tool.use}</div>
              </div>
            </div>
          ))}
        </Reveal>
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
      growthLabel: "Organic traffic",
      timeline: "6 Months",
      title: "IVF Hospital — Organic Growth",
      description:
        "Targeted technical SEO and content authority building drove a 76.7% organic traffic increase in six months, generating 3× more appointment leads.",
      tags: ["Technical SEO", "Content Strategy", "Local SEO"],
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
        "An integrated Google Ads, Meta Ads and conversion-optimized website drove 120% traffic growth and doubled OPD bookings.",
      tags: ["Google Ads", "Meta Ads", "Web Design"],
      graph: [18, 26, 40, 55, 70, 92],
    },
    {
      category: "Home Services",
      icon: Wrench,
      growth: "+174.5%",
      growthLabel: "Local traffic surge",
      timeline: "Ongoing Engagement",
      title: "Home Appliance Repair — Local Dominance",
      description:
        "Local SEO, Meta Ads and conversion-optimized landing pages generated a 174.5% traffic surge and 200% more service bookings.",
      tags: ["Local SEO", "Meta Ads", "Landing Pages"],
      graph: [15, 24, 38, 60, 76, 96],
    },
  ];
  return (
    <section id="results" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Case studies"
          title={<>Real businesses. <span className="text-brand-orange">Real revenue</span>.</>}
          sub="A glimpse into the kind of compounding outcomes our clients see when SEO is treated as engineering, not guesswork."
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

/* ---------------- GSC Performance Snapshots ---------------- */

function GSCSnapshots() {
  const slides = [gscSlideBfi, gscSlideKrisha, gscSlideTgp];
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

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
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Proof, not promises"
          title="Verified Organic Growth Snapshots"
          sub="Real Google Search Console performance from active SEO campaigns."
        />
        <div className="mx-auto mt-12 max-w-[1100px]">
          <Carousel
            opts={{ align: "center", loop: true }}
            plugins={[autoplay.current]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {slides.map((src, i) => (
                <CarouselItem key={i} className="basis-full pl-0">
                  <div
                    className={cn(
                      "da-shadow-card mx-auto overflow-hidden rounded-[18px] border border-brand-navy/10 bg-white transition-all duration-700 ease-out",
                      selected === i ? "scale-100 opacity-100" : "scale-[0.98] opacity-60",
                    )}
                  >
                    <img
                      src={src}
                      alt={`Google Search Console performance snapshot ${i + 1}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      width={800}
                      height={335}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:-left-14" />
            <CarouselNext className="right-2 md:-right-14" />
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  selected === i ? "w-7 bg-brand-orange" : "w-2.5 bg-brand-navy/20",
                )}
              />
            ))}
          </div>
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
          sub="From healthcare and education to eCommerce and local businesses, we're proud to work with ambitious brands across multiple industries."
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
  // A 4th review (Navneet Singh) is pending the verified quote — add it here once supplied.
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
    { icon: FileBarChart, t: "Transparent Reporting", d: "No vanity dashboards — you see exactly what's been done and what it moved." },
    { icon: Users, t: "Dedicated SEO Experts", d: "A senior consultant on your account, not a rotating junior team." },
    { icon: Bot, t: "AI-Assisted SEO", d: "Enterprise tools plus AI-assisted research speed up decisions without replacing judgement." },
    { icon: FileCode2, t: "Technical SEO First", d: "We fix the foundation before content and links — rankings hold longer that way." },
    { icon: MapPinned, t: "Local SEO Expertise", d: "Deep experience winning the Map Pack and local search visibility in Ahmedabad." },
    { icon: BarChart3, t: "Data-Driven Decisions", d: "Every recommendation is backed by data, not opinion or guesswork." },
    { icon: Briefcase, t: "Business-Focused SEO", d: "We optimise for enquiries and revenue, not just traffic and rankings." },
    { icon: TrendingUp, t: "Monthly Growth Strategy", d: "A living roadmap that adapts every month as your market and competitors move." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Why Digital Aura"
          title={<>Why Businesses Choose <span className="text-brand-orange">Digital Aura</span></>}
          sub="Real reasons businesses across Ahmedabad call us the leading SEO company in Ahmedabad."
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

/* ---------------- Google Analytics & Reporting ---------------- */

function GAReporting() {
  const items = [
    { icon: BarChart3, t: "Google Analytics", d: "Full visibility into who's visiting, where they're from and what they do next." },
    { icon: Search, t: "Google Search Console", d: "Indexing, impressions and click data straight from Google, reviewed monthly." },
    { icon: Target, t: "Keyword Tracking", d: "Rank tracking on the keywords tied to your revenue, not vanity terms." },
    { icon: FileBarChart, t: "Monthly Reports", d: "A clear, jargon-free report — what we did, what moved, what's next." },
    { icon: TrendingUp, t: "Traffic Analysis", d: "Channel-by-channel breakdown so you know where growth is actually coming from." },
    { icon: MousePointerClick, t: "Conversion Tracking", d: "Form fills, calls and bookings tracked back to the exact page and source." },
    { icon: Users, t: "Lead Tracking", d: "Every enquiry tied back to the keyword and campaign that generated it." },
    { icon: Lightbulb, t: "Business Insights", d: "Reporting translated into decisions — what to scale, fix or stop." },
  ];
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Reporting & insights"
          title={<>You'll Always Know What's <span className="text-brand-orange">Working</span></>}
          sub="Every account gets enterprise-grade tracking and a reporting cadence built for decision-makers — not vanity metrics."
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
          sub="The platforms and certifications behind every account we run."
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
    { icon: HeartPulse, t: "Healthcare", d: "Patients can't find you when they search by symptom and location — local SEO and medical schema fix that." },
    { icon: UtensilsCrossed, t: "Restaurants", d: "Diners search ‘near me’ and never see you on the map — Map Pack optimisation turns that into table bookings." },
    { icon: Building2, t: "Real Estate", d: "Listings get buried under bigger portals — location-based SEO puts them in front of buyers ready to act." },
    { icon: ShoppingCart, t: "eCommerce", d: "Category pages aren't converting browsers into buyers — purchase-intent SEO fixes that, page by page." },
    { icon: GraduationCap, t: "Education", d: "Prospective students can't find your courses in the noise — admission-intent SEO gets you in front of them." },
    { icon: Wrench, t: "Home Services", d: "From repairs to pest control, ‘near me’ and emergency searches go to competitors first — local SEO and landing pages turn them into booked jobs." },
    { icon: Dumbbell, t: "Fitness", d: "Empty classes mean you're not showing up for the right local searches — local SEO fills classes and converts trials." },
    { icon: Plane, t: "Travel", d: "Travellers research extensively before booking — destination and itinerary content engineered to rank captures them early." },
  ];
  return (
    <section id="industries" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Who we serve"
          title={<>Industries we move the <span className="text-brand-orange">needle</span> for</>}
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
    ["AI-Search & GEO optimization", true, false],
    ["Technical SEO + Core Web Vitals", true, "Surface-level"],
    ["Entity SEO, schema & Knowledge Graph", true, false],
    ["Conversion-focused page design", true, false],
    ["Transparent monthly reporting", true, "Vanity dashboards"],
    ["Senior consultant on every account", true, false],
    ["Off-page link spam", false, true],
    ["Generic blog factory", false, true],
  ];
  return (
    <section id="compare" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="The difference"
          title={<>Digital Aura vs. a <span className="text-brand-orange">typical SEO agency</span></>}
          sub="See why businesses comparing SEO companies in Ahmedabad choose Digital Aura."
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
      q: "How much does SEO cost in Ahmedabad?",
      a: "SEO pricing depends on your competition, current site health and how fast you want to move. After the free audit, we give you a fixed monthly scope and price — no hidden add-ons, no surprise invoices mid-engagement.",
    },
    {
      q: "How long before SEO shows results?",
      a: "Most clients see early movement — impressions, technical fixes, AI citations — within 30–45 days. Meaningful ranking and lead growth typically compounds from month 3 onward. SEO is engineering, not magic — we move you forward every sprint.",
    },
    {
      q: "Can SEO actually generate qualified leads, not just traffic?",
      a: "Yes, when pages are built around buying intent instead of vanity keywords. We map content to where a buyer actually is in their decision and put a clear next step on every page — that's what turns rankings into enquiries.",
    },
    {
      q: "Do you provide Technical SEO services?",
      a: "Yes — Technical SEO is the first thing we fix, not an add-on. Crawlability, indexing, site speed, Core Web Vitals, schema and architecture are addressed before content or links, because they cap everything else.",
    },
    {
      q: "Do you optimise our Google Business Profile?",
      a: "Yes. Categories, services, posts, photos, Q&A and review strategy are managed as part of Local SEO, alongside citations and Map Pack optimisation for Ahmedabad-based searches.",
    },
    {
      q: "Can you recover rankings after a Google algorithm update?",
      a: "Yes. We diagnose what the update actually penalised — thin content, technical debt, weak E-E-A-T signals — and rebuild on foundations designed to hold up against future updates, not just this one.",
    },
    {
      q: "Do you work with local businesses, or only large companies?",
      a: "Both. We work with local businesses across Ahmedabad as well as larger, multi-location and enterprise accounts — the depth of work scales with the account, the process doesn't change.",
    },
    {
      q: "Do you guarantee #1 rankings?",
      a: "No serious SEO company does. What we guarantee is process: technical excellence, on-page depth, schema, AI-search optimization, transparent reporting and a senior consultant on every call.",
    },
    {
      q: "What makes Digital Aura the best SEO company in Ahmedabad?",
      a: "Most SEO companies in Ahmedabad still sell SEO services built for 2015-era Google. We're built for the AI-search era — Technical SEO, On-Page SEO, AI SEO (AIO) and Generative Engine Optimization (GEO), getting you cited inside ChatGPT, Gemini, Perplexity and Google AI Overviews, not just ranked on page one.",
    },
    {
      q: "Do you do off-page SEO or link building?",
      a: "We focus on Technical SEO, On-Page, Local SEO, AI SEO and GEO — the levers with the highest ROI right now — and build links through digital PR and earned placements only. We don't sell link packages or PBN-style services.",
    },
    {
      q: "What's included in the free SEO audit?",
      a: "Technical SEO, on-page, schema, Core Web Vitals, competitor visibility, keyword gap, Google Search Console and Google Analytics review, and an AI-search visibility report covering ChatGPT, Gemini and Perplexity — delivered within 48 hours, plus a 30-minute walkthrough.",
    },
    {
      q: "Which industries do you work with?",
      a: "We've scaled brands in manufacturing, healthcare, education, professional services, SaaS and local SMBs across Ahmedabad and India.",
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
                Find out exactly why your SEO isn't generating leads — <span className="text-brand-orange">in 48 hours</span>.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/80">
                Free, no-obligation audit covering Technical SEO, On-Page SEO, Schema, Core Web Vitals, AI Search
                visibility and GEO readiness. Delivered with a 30-minute strategy walkthrough by a senior consultant —
                not a junior account manager reading a template.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA href="#audit">Get My Free SEO Audit</PrimaryCTA>
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

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-brand-navy/10 bg-surface-2">
      {/* Mini conversion strip */}
      <div className="border-b border-brand-navy/8 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-7 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <div className="text-lg font-bold text-brand-navy">Still deciding?</div>
            <p className="mt-0.5 text-sm text-ink-muted">
              Get a free, no-obligation SEO + AI Search audit — delivered within 48 hours.
            </p>
          </div>
          <PrimaryCTA href="#audit" className="shrink-0">
            Get My Free SEO Audit
          </PrimaryCTA>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
            Digital Aura is a search engine optimization company in Ahmedabad — a team of SEO experts engineering
            visibility across Google and AI search engines through Technical SEO, On-Page SEO, AI SEO (AIO) and
            Generative Engine Optimization (GEO).
          </p>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-brand-navy">Quick Links</div>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="da-focus-ring rounded-sm transition-colors hover:text-brand-orange">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#audit" className="da-focus-ring rounded-sm font-semibold text-brand-orange transition-colors hover:text-brand-navy">
                Free SEO Audit
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-brand-navy">SEO Services</div>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            <li>Technical SEO Company in Ahmedabad</li>
            <li>Local SEO Company in Ahmedabad</li>
            <li>Enterprise SEO Services Ahmedabad</li>
            <li>AI SEO (AIO) &amp; AEO Services</li>
            <li>Generative Engine Optimization (GEO)</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-brand-navy">Contact Details</div>
          <ul className="mt-4 space-y-4 text-sm text-ink-muted">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-orange-soft text-brand-orange">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="leading-relaxed">713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura, Ahmedabad, Gujarat 382330</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-orange-soft text-brand-orange">
                <Phone className="h-4 w-4" />
              </span>
              <a href="tel:+918141200284" className="da-focus-ring rounded-sm font-semibold text-ink transition-colors hover:text-brand-orange">
                +91 81412 00284
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-orange-soft text-brand-orange">
                <Mail className="h-4 w-4" />
              </span>
              <a href="mailto:info@thedigitalaura.com" className="da-focus-ring rounded-sm font-semibold text-ink transition-colors hover:text-brand-orange">
                info@thedigitalaura.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-orange-soft text-brand-orange">
                <Clock className="h-4 w-4" />
              </span>
              {/* Working hours placeholder — confirm exact hours before publishing */}
              <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-navy/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ink-muted md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} Digital Aura™. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="da-focus-ring rounded-sm transition-colors hover:text-brand-navy">Privacy Policy</a>
            <a href="#" className="da-focus-ring rounded-sm transition-colors hover:text-brand-navy">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating widgets ---------------- */

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
        href="#audit"
        className="da-shadow-cta da-focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[15px] font-extrabold text-primary-foreground"
      >
        Get My Free SEO Audit <ArrowRight className="h-4 w-4 shrink-0" />
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
        <Stats />
        <Problem />
        <AIShift />
        <SEOChallenges />
        <Framework />
        <Process />
        <SEOToolsWeUse />
        <Results />
        <GSCSnapshots />
        <ClientLogoWall />
        <Testimonials />
        <RatedOnPlatforms />
        <WhyChooseUs />
        <GAReporting />
        <CertifiedTrusted />
        <Industries />
        <Compare />
        <FAQ />
        <FinalCTA />
      </main>
      <MainSiteFooter />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </div>
  );
}
