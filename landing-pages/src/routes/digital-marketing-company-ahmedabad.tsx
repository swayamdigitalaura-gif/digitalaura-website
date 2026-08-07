import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ElementType,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  ExternalLink,
  Factory,
  FileText,
  Gavel,
  GraduationCap,
  Hotel,
  Landmark,
  Laptop,
  Link2,
  Loader2,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  RefreshCw,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  Target,
  TrendingDown,
  TrendingUp,
  Workflow,
  Youtube,
} from "lucide-react";
import heroVisual from "@/assets/hero-visual-full.webp";
import clientAOneAutoCare from "@/assets/client-logos/a-one-auto-care.png";
import clientAmvi from "@/assets/client-logos/amvi-hospital.png";
import clientClarityEye from "@/assets/client-logos/clarity-eye-surgeons.png";
import clientGameZone from "@/assets/client-logos/game-zone-events.webp";
import clientInnOfTheDove from "@/assets/client-logos/inn-of-the-dove.png";
import clientIvf from "@/assets/client-logos/ivf.png";
import clientKrishaEye from "@/assets/client-logos/krisha-eye-hospital.webp";
import clientLevapor from "@/assets/client-logos/levapor.png";
import clientPrism from "@/assets/client-logos/prism.png";
import clientShukan from "@/assets/client-logos/shukan-hospital.png";
import clientSpinx from "@/assets/client-logos/spinx-logo-white.png";
import clientTgp from "@/assets/client-logos/tgp.webp";
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

/* ---------------- Design tokens (page-local blue palette) ---------------- */
// This page intentionally uses its own blue palette rather than the site's
// shared brand-orange tokens, matching the approved design built and
// signed off on separately. Kept as plain arbitrary-value classes so it
// doesn't touch (or depend on) the rest of the site's theme.

const CARD =
  "rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05),0_18px_40px_-22px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08),0_32px_60px_-28px_rgba(15,23,42,0.22)]";
const EYEBROW =
  "inline-flex items-center gap-2 rounded-full border border-[#2563EB]/25 bg-[#EFF6FF] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#1D4ED8]";
const GRADIENT_TEXT = "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent";
const PRIMARY_BTN =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] px-7 py-3.5 font-bold text-white shadow-[0_12px_34px_-12px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5";
const SECONDARY_BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-6 py-3.5 font-semibold text-[#0F172A] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#EFF6FF]";

function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
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
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className={EYEBROW}>{eyebrow}</span>
      <h2 className="mt-5 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-[#0F172A] sm:text-[2.6rem]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-lg leading-relaxed text-[#475569] sm:text-xl">{sub}</p>}
    </div>
  );
}

function Section({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: "white" | "cream" | "tint" | "gray";
  className?: string;
  children: ReactNode;
}) {
  const bg =
    tone === "cream"
      ? "bg-[#F8FAFC]"
      : tone === "tint"
        ? "bg-[#EFF6FF]"
        : tone === "gray"
          ? "bg-[#F1F5F9]"
          : "bg-white";
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-11 sm:px-8 md:py-14 ${bg} ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
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

function LeadForm({ idPrefix = "lf" }: { idPrefix?: string }) {
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

  const field =
    "h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-[0.95rem] text-[#0F172A] outline-none transition-all placeholder:text-[#475569]/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25";
  const labelCls = "mb-1.5 block text-xs font-bold tracking-wide text-[#475569]";

  return (
    <form id="quote" onSubmit={onSubmit} className="space-y-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={`${idPrefix}-name`}>
            Full name*
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`${idPrefix}-phone`}>
            Phone*
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 00000 00000"
            className={field}
          />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor={`${idPrefix}-email`}>
          Work email*
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor={`${idPrefix}-website`}>
          Website
        </label>
        <input
          id={`${idPrefix}-website`}
          name="website"
          type="url"
          autoComplete="url"
          placeholder="https://yourcompany.com"
          className={field}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor={`${idPrefix}-need`}>
          What do you need?*
        </label>
        <select id={`${idPrefix}-need`} name="need" required defaultValue="" className={field}>
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
        className={`w-full ${PRIMARY_BTN} disabled:pointer-events-none disabled:opacity-60`}
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
        Get My FREE Growth Audit
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-[#475569]">
        <span className="flex items-center gap-1.5">
          <Lock className="size-3.5" /> 100% confidential, no spam
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" /> Reply within 1 business hour
        </span>
      </div>
    </form>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white px-5 pt-10 pb-12 sm:px-8 md:pt-14 md:pb-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_15%_0%,#EFF6FF_0%,transparent_55%),radial-gradient(90%_60%_at_100%_10%,#F8FAFC_0%,transparent_60%)]"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className={EYEBROW}>
            <TrendingUp className="size-3.5" />
            750+ Businesses Grown · 10+ Years · 4.9★ Average Rating
          </span>

          <h1 className="mt-6 text-[2.15rem] leading-[1.08] font-extrabold tracking-tight text-[#0F172A] sm:text-[3.1rem]">
            Digital Marketing <span className={GRADIENT_TEXT}>Company in Ahmedabad</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#475569] sm:text-xl">
            One AI-powered team running your SEO, Google Ads, Meta Ads and automation together — not
            five vendors billing you separately. Claim your free Growth Audit and see exactly where
            you're losing revenue today.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#quote" className={PRIMARY_BTN}>
              Get My Free Growth Audit
              <ArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="tel:+918141200284" className={SECONDARY_BTN}>
              <Phone className="size-4 text-[#2563EB]" />
              Talk to a Strategist
            </a>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <div className="relative mx-auto max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-8 -z-10 rounded-full bg-[#2563EB]/15 blur-3xl"
            />
            <img
              src={heroVisual}
              alt="Digital Aura growth marketing services — SEO, Google Ads, Meta Ads, Google Business Profile and AI automation"
              width={960}
              height={1440}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trusted by (client logo marquee) ---------------- */

const CLIENTS = [
  { name: "Inn of the Dove", industry: "Hospitality", logo: clientInnOfTheDove },
  { name: "AMVI Hospitals", industry: "Healthcare", logo: clientAmvi },
  { name: "Game Zone Events", industry: "Events", logo: clientGameZone },
  { name: "Krisha Eye Hospital", industry: "Healthcare", logo: clientKrishaEye },
  { name: "Clarity Eye Surgeons", industry: "Healthcare", logo: clientClarityEye },
  { name: "IVF Hospital", industry: "Healthcare", logo: clientIvf },
  { name: "Shukan Hospital", industry: "Healthcare", logo: clientShukan },
  { name: "The Grand Palace", industry: "Hospitality", logo: clientTgp },
  { name: "A-One Auto Care", industry: "Automotive", logo: clientAOneAutoCare },
  { name: "Spinx", industry: "eCommerce", logo: clientSpinx, dark: true },
  { name: "Levapor", industry: "eCommerce", logo: clientLevapor },
  { name: "Prism Calibration", industry: "Industrial Services", logo: clientPrism },
];
const TINTS = ["bg-[#FFF1EC]", "bg-[#F2EEFB]", "bg-[#EAF1FD]", "bg-[#EAF9EF]"];

function TrustedBy() {
  return (
    <section aria-label="Clients we have grown" className="bg-[#F8FAFC] py-11 md:py-14">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="text-center text-[1.9rem] leading-[1.1] font-extrabold tracking-tight text-[#0F172A] sm:text-[2.4rem]">
          750+ Businesses We've Helped Grow
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#475569]">
          From Ahmedabad's hospitals and hospitality brands to eCommerce and home services companies
          across India — real businesses, real growth.
        </p>
      </div>

      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
        <div className="da-marquee-track flex w-max gap-5">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <article
              key={`${c.name}-${i}`}
              className="w-64 shrink-0 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm sm:w-72"
            >
              <div
                className={`flex h-32 items-center justify-center p-6 ${c.dark ? "bg-[#15131F]" : TINTS[i % TINTS.length]}`}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
              <div className="border-t border-[#E2E8F0] p-4 text-center">
                <p className="truncate text-[0.95rem] font-extrabold tracking-tight text-[#0F172A]">
                  {c.name}
                </p>
                <p className="mt-1 text-sm font-bold text-[#2563EB]">{c.industry}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */

const INDUSTRIES = [
  { icon: ShoppingBag, label: "E-commerce & Retail" },
  { icon: Stethoscope, label: "Healthcare & Medical" },
  { icon: Building2, label: "Real Estate" },
  { icon: GraduationCap, label: "Education & E-learning" },
  { icon: Hotel, label: "Hospitality & Travel" },
  { icon: Laptop, label: "IT & Software" },
  { icon: Factory, label: "Automotive & Manufacturing" },
  { icon: Store, label: "Small Business" },
  { icon: Briefcase, label: "B2B Agency" },
  { icon: Gavel, label: "Law Firm" },
  { icon: Landmark, label: "Finance & Accounting" },
];

function Industries() {
  return (
    <Section id="industries" tone="gray">
      <SectionHeading
        eyebrow="Digital marketing by industry"
        title={
          <>
            Digital marketing solutions for{" "}
            <span className={GRADIENT_TEXT}>every industry in Ahmedabad</span>
          </>
        }
        sub="Generic playbooks fail. As a digital marketing agency in Ahmedabad, we build channel mix, offers and creative around how your specific industry actually buys — and it shows in the numbers."
      />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {INDUSTRIES.map(({ icon: Icon, label }, idx) => (
          <Reveal
            key={label}
            delay={idx * 50}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-[#EFF6FF] transition-transform duration-300 group-hover:scale-110">
              <Icon className="size-7 text-[#2563EB]" />
            </span>
            <p className="max-w-[9rem] text-sm font-bold leading-tight text-[#0F172A]">{label}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-[#475569]">
          Don't see your industry? We've still run campaigns for it — most agencies in Ahmedabad
          specialise in one or two verticals; we build a custom strategy for yours.
        </p>
        <a
          href="#quote"
          className="da-focus-ring inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-bold text-[#0F172A] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#EFF6FF]"
        >
          Get My Industry-Specific Plan
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </Section>
  );
}

/* ---------------- Money leaks (problem / fix) ---------------- */

const LEAKS = [
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
const FIXES = [
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

function MoneyLeaks() {
  return (
    <Section id="money-leaks" tone="cream">
      <SectionHeading
        eyebrow="The hidden cost"
        title={
          <>
            Why Ahmedabad businesses <span className={GRADIENT_TEXT}>lose money</span> on digital
            marketing
          </>
        }
        sub="It's rarely the channel — it's what happens before, during and after the click. You close every one of these gaps when you work with us, not just the obvious ones."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal className={`${CARD} overflow-hidden`}>
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] bg-white px-6 py-5 sm:px-7">
            <span className="grid size-10 place-items-center rounded-xl bg-red-50">
              <TrendingDown className="size-5 text-red-500" />
            </span>
            <h3 className="text-lg font-extrabold tracking-tight text-[#0F172A]">
              Where the money leaks out
            </h3>
          </div>
          <ul className="divide-y divide-[#E2E8F0]">
            {LEAKS.map((l) => (
              <li key={l.problem} className="px-6 py-5 sm:px-7">
                <p className="font-bold text-[#0F172A]">{l.problem}</p>
                <p className="mt-1.5 text-sm text-[#475569]">{l.cost}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className={`${CARD} overflow-hidden border-[#2563EB]/30`}>
          <div className="flex items-center gap-3 border-b border-[#2563EB]/20 bg-[#EFF6FF] px-6 py-5 sm:px-7">
            <span className="grid size-10 place-items-center rounded-xl bg-[#2563EB]/15">
              <TrendingUp className="size-5 text-[#2563EB]" />
            </span>
            <h3 className="text-lg font-extrabold tracking-tight text-[#0F172A]">
              How Digital Aura fixes it
            </h3>
          </div>
          <ul className="divide-y divide-[#E2E8F0]">
            {FIXES.map((f) => (
              <li key={f.problem} className="px-6 py-5 sm:px-7">
                <p className="font-bold text-[#2563EB]">{f.problem}</p>
                <p className="mt-1.5 text-sm text-[#475569]">{f.cost}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-8 text-center">
        <a href="#quote" className={PRIMARY_BTN}>
          Find My Leaks — Free Growth Audit
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </Section>
  );
}

/* ---------------- Solutions (service cards) ---------------- */

const SOLUTIONS = [
  {
    icon: Search,
    title: "SEO Services (AEO + GEO)",
    body: "Get an SEO company in Ahmedabad that combines technical fixes, entity-led content and Local SEO Ahmedabad coverage — so you rank on Google and get cited inside AI answers, not just crawled.",
    timeline: "Results from month 3",
    impact: "+174% avg. organic traffic",
    points: ["AI Search Optimization (AEO/GEO)", "Topical authority", "Local SEO + national reach"],
  },
  {
    icon: Target,
    title: "Google Ads (PPC)",
    body: "Get a Google Ads agency in Ahmedabad that rebuilds Search, PMax and remarketing around cost-per-qualified-lead, not clicks — with full conversion tracking live from day one, so every rupee is accountable.",
    timeline: "Impact within 2–4 weeks",
    impact: "-38% avg. cost per lead",
    points: ["Lower cost per lead", "Quality Score fixes", "Offline conversion sync"],
  },
  {
    icon: Sparkles,
    title: "Meta Ads",
    body: "Get a Meta Ads agency that builds creative-first funnels with structured testing, so your cost per lead keeps falling while volume scales — not creative that just looks good.",
    timeline: "Optimised within 3 weeks",
    impact: "3.8x avg. ROAS",
    points: ["Creative test engine", "Lookalike scaling", "Lead-quality filters"],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    body: "Consistent posting, reels and community management that build brand trust and feed your paid campaigns with proof, not just followers.",
    timeline: "Live within 2 weeks",
    impact: "+3.2x avg. engagement",
    points: ["Content calendar & design", "Reels & short-form video", "Community management"],
  },
  {
    icon: Code2,
    title: "Website Development",
    body: "Fast, accessible, conversion-engineered sites and landing pages that lift Quality Score and close rate together.",
    timeline: "Live in 2–4 weeks",
    impact: "+2.1x form completion",
    points: ["Sub-second loads", "CRO-led layouts", "Headless & Shopify"],
  },
  {
    icon: Bot,
    title: "AI Workflow Automation",
    body: "Automated lead routing, follow-up and reporting so no enquiry goes cold and your team stops doing manual work.",
    timeline: "Deployed in 1–2 weeks",
    impact: "45 sec avg. response time",
    points: ["Instant lead follow-up", "CRM automation", "Live dashboards"],
  },
];

function Solutions() {
  return (
    <Section id="solutions">
      <SectionHeading
        eyebrow="Digital marketing services in Ahmedabad"
        title={
          <>
            Digital marketing services that{" "}
            <span className={GRADIENT_TEXT}>generate qualified leads</span>
          </>
        }
        sub="No vague retainers. Every service below ships with a fixed timeline and a business-impact number we're accountable to — SEO, PPC, Meta Ads, build and automation, under one roof."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map(({ icon: Icon, title, body, timeline, impact, points }, idx) => (
          <Reveal key={title} delay={idx * 80} as="article" className={`${CARD} flex flex-col p-7`}>
            <span className="grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-[0_12px_34px_-12px_rgba(37,99,235,0.45)] transition-transform duration-300 group-hover:-rotate-6">
              <Icon className="size-6 text-white" />
            </span>
            <h3 className="mt-5 text-xl font-extrabold tracking-tight text-[#0F172A]">{title}</h3>
            <p className="mt-2.5 text-[0.98rem] leading-relaxed text-[#475569]">{body}</p>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
                <p className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-wide text-[#475569] uppercase">
                  <Clock className="size-3" /> Timeline
                </p>
                <p className="mt-1 text-sm font-bold text-[#0F172A]">{timeline}</p>
              </div>
              <div className="rounded-xl border border-[#2563EB]/30 bg-[#EFF6FF] p-3">
                <p className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-wide text-[#2563EB] uppercase">
                  <TrendingUp className="size-3" /> Impact
                </p>
                <p className="mt-1 text-sm font-extrabold text-[#2563EB]">{impact}</p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 border-t border-[#E2E8F0] pt-5">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
                >
                  <span className="size-1.5 rounded-full bg-[#2563EB]" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <Reveal delay={SOLUTIONS.length * 80}>
          <a
            href="#quote"
            className="group flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-[#1E3A6D] to-[#1E40AF] p-7 text-white shadow-[0_10px_30px_rgba(15,23,42,0.08),0_32px_60px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                Not sure which lever moves first?
              </h3>
              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-white/85">
                We'll tell you exactly which lever moves fastest for your business — on a free
                Growth Audit call, no guesswork.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 font-bold text-white">
              Get My Free Growth Audit
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Digital presence (SEO + Ads columns) ---------------- */

const PRESENCE_COLUMNS = [
  {
    title: "SEO & AI Visibility for Long-Term Growth",
    body: "The most important factor in ranking today isn't just Google anymore — it's showing up wherever your customers search, including AI answer engines. We combine technical SEO, content and local visibility so you rank on Google and get cited inside AI answers, not just crawled.",
    items: [
      { icon: MapPin, label: "Local SEO (Ahmedabad + nearby areas)" },
      { icon: Search, label: "On-Page & Technical SEO" },
      { icon: Bot, label: "AI Search Optimization (AEO/GEO)" },
      { icon: Code2, label: "Schema & Entity SEO" },
      { icon: FileText, label: "Content & Topical Authority" },
      { icon: Link2, label: "Link Building & Digital PR" },
      { icon: Store, label: "Google Business Profile Optimization" },
    ],
  },
  {
    title: "Paid Advertising — Reach, Engage, Convert",
    body: "Paid ads only work when every rupee is tracked back to a real lead. We build and manage full-funnel campaigns across Google and Meta with conversion tracking live from day one, so you always know what's actually driving business.",
    items: [
      { icon: Target, label: "Google Ads (Search & PMax)" },
      { icon: Share2, label: "Meta Ads (Facebook & Instagram)" },
      { icon: Youtube, label: "YouTube Ads" },
      { icon: RefreshCw, label: "Retargeting & Remarketing" },
      { icon: Workflow, label: "Marketing Automation & Lead Follow-up" },
    ],
  },
];

function DigitalPresence() {
  return (
    <Section id="digital-presence" tone="tint">
      <SectionHeading
        eyebrow="How we grow you"
        title={
          <>
            How We Boost Your <span className={GRADIENT_TEXT}>Digital Presence</span> in Ahmedabad
          </>
        }
        sub="Two engines, working together — organic visibility that compounds over time, and paid campaigns that bring qualified leads today."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PRESENCE_COLUMNS.map((col, i) => (
          <Reveal key={col.title} delay={i * 100} as="article" className={`${CARD} p-7 sm:p-8`}>
            <h3 className="text-xl font-extrabold tracking-tight text-[#0F172A] sm:text-2xl">
              {col.title}
            </h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-[#475569]">{col.body}</p>

            <ul className="mt-6 space-y-3 border-t border-[#E2E8F0] pt-6">
              {col.items.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#EFF6FF]">
                    <Icon className="size-4.5 text-[#2563EB]" />
                  </span>
                  <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Results (animated stat counters) ---------------- */

const STATS = [
  { value: 174, suffix: "%", prefix: "+", label: "Average traffic growth", note: "in 6–9 months" },
  { value: 200, suffix: "%", prefix: "+", label: "Average lead growth", note: "same ad budget" },
  { value: 50, suffix: "X", prefix: "", label: "ROI generated", note: "across client base" },
  { value: 127, suffix: "%", prefix: "+", label: "Revenue lift", note: "avg. client growth" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function Counter({
  to,
  prefix,
  suffix,
  run,
}: {
  to: number;
  prefix: string;
  suffix: string;
  run: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <span>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

function Results() {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <Section id="results">
      <SectionHeading
        eyebrow="Proven results"
        title={
          <>
            Real results from a <span className={GRADIENT_TEXT}>performance marketing agency</span>
          </>
        }
        sub="Straight from live client dashboards, measured against leads and revenue — not impressions, not vanity charts."
      />
      <div ref={ref} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className={`${CARD} bg-[#F8FAFC] p-8 text-center`}>
            <p className="text-[2.75rem] leading-none font-extrabold tracking-tight text-[#2563EB]">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} run={seen} />
            </p>
            <p className="mt-3 text-base font-bold text-[#0F172A]">{s.label}</p>
            <p className="mt-1 text-sm text-[#475569]">{s.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="mx-auto max-w-xl text-sm text-[#475569]">
          Every client gets their own login to the same dashboard you'd see here — no agency hides
          behind a monthly PDF when the numbers are this good.
        </p>
        <div className="mt-5">
          <a href="#quote" className={SECONDARY_BTN}>
            See What Your Numbers Could Look Like
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Case studies ---------------- */

const CASES = [
  {
    client: "IVF Hospital",
    industry: "Healthcare · SEO (AIO)",
    stats: [
      { label: "Organic Traffic", value: "+76.7%" },
      { label: "Cost Per Lead", value: "-68%" },
      { label: "Monthly Enquiries", value: "112" },
    ],
    quote:
      "Patient inquiries tripled in 90 days. Doctors who never referred to us before now send cases every week.",
    author: "Dr. Karan Maheshwari, Hand Surgeon · Krisha Hospital",
  },
  {
    client: "Restaurant Chain",
    industry: "Hospitality · Meta Ads",
    stats: [
      { label: "ROAS", value: "3.8X" },
      { label: "New Covers / mo", value: "+333%" },
      { label: "Cost Per Lead", value: "-52%" },
    ],
    quote:
      "We finally know which creative drives covers, not just clicks. Three locations are booked out on weekends now.",
    author: "Operations Director · Restaurant Chain (name withheld by request)",
  },
  {
    client: "Home Appliance Repair",
    industry: "Home Services · Ads + SEO + Automation",
    stats: [
      { label: "Traffic Growth", value: "+174.5%" },
      { label: "Booked Jobs / mo", value: "+210" },
      { label: "Lead Response", value: "45 sec" },
    ],
    quote:
      "Three agencies failed this integration. Digital Aura shipped it in six weeks, seamlessly, and it hasn't broken since.",
    author: "Sachin Salunkhe, Co-Founder · IntegsCloud Technologies",
  },
];

function CaseStudies() {
  return (
    <Section id="case-studies" tone="cream">
      <SectionHeading
        eyebrow="Real results, real businesses"
        title={
          <>
            Before and after, <span className={GRADIENT_TEXT}>with the receipts</span>
          </>
        }
        sub="Three engagements, three industries, one method our Ahmedabad-based digital marketing team runs every time: find the leak, fix it, then scale what converts."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.client} delay={i * 80} as="article" className={`${CARD} p-7`}>
            <span className={`${EYEBROW} max-w-full flex-wrap`}>{c.industry}</span>
            <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[#0F172A]">
              {c.client}
            </h3>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-2.5">
              {c.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#2563EB]/25 bg-[#EFF6FF] p-2.5 text-center"
                >
                  <p className="text-base font-extrabold tracking-tight text-[#2563EB] sm:text-lg">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[0.6rem] leading-tight font-bold text-[#1D4ED8]/70 uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <blockquote className="mt-6 border-t border-[#E2E8F0] pt-5">
              <Quote className="size-5 text-[#2563EB]" />
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#0F172A] italic">
                "{c.quote}"
              </p>
              <footer className="mt-3 text-sm font-bold text-[#475569]">{c.author}</footer>
            </blockquote>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <a href="#quote" className={PRIMARY_BTN}>
          Get My Free Growth Audit
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </Section>
  );
}

/* ---------------- Google reviews (auto-scrolling slider) ---------------- */

const GMB_REVIEWS_URL = "https://share.google/4K6eW3tz4YaSyx0Zh";

const REVIEWS = [
  {
    name: "Darshil Shah",
    business: "Elegant Event Solutions",
    text: "We partnered with Digital Aura to enhance our online presence, and it has been a game-changer for our business! Digital Aura's SEO and digital marketing expertise have helped us generate qualified leads that actually convert into sales. Their team is proactive, knowledgeable, and truly understands our industry's needs.",
  },
  {
    name: "Chintan Joshi",
    business: "Invisible Grills",
    text: "Digital Aura is an outstanding digital marketing company in Ahmedabad! They designed a fantastic website for our Invisible Grills business, then started lead generation campaigns on Meta Ads which brought us high-quality leads that immediately turned into business. We've also started receiving referrals from happy clients.",
  },
  {
    name: "Tapan Joshi",
    business: "Invisible Grills",
    text: "Digital Aura has revolutionized our Invisible Grills business! Their lead generation strategies through Meta Ads were impeccable, delivering high-quality, consistent leads that swiftly converted into sales. We've witnessed significant growth from their campaigns, along with valuable referrals from satisfied customers.",
  },
  {
    name: "Tirth Patel",
    business: "Website Redesign",
    text: "Digital Aura helped us streamline our online presence, improve our website's user experience, and boost our brand visibility. Standout features were the seamless integration of modern design elements, the user-friendly interface, and the attention to detail — plus a strong focus on SEO and mobile responsiveness.",
  },
  {
    name: "Ketan Patel",
    business: "SEO & Digital Marketing",
    text: "Their team of experts took the time to understand our brand and goals, which showed in the highly targeted and effective campaigns they crafted for us. Their SEO strategy alone improved our search rankings significantly, driving more organic traffic to our site than we anticipated.",
  },
  {
    name: "Vrukshal Shah",
    business: "Insurance Consultant",
    text: "Their team suggested an approach I hadn't considered — using webinars along with Meta Ads for lead generation. The people who attended were genuinely interested in my services, and the quality of leads improved significantly. I was no longer chasing uninterested prospects.",
  },
  {
    name: "Bhavesh Patil",
    business: "Starline Advertising",
    text: "Digital Aura didn't just design a new website, they created the whole package — engaging content, eye-catching graphics, and a unified brand feel. We always knew what was going on, and they were happy to make any changes we requested. Super flexible and great listeners.",
  },
];

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.93 21.93 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function GoogleReviews() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  function scrollByCard(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 20;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => scrollByCard(1), 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <Section id="reviews" tone="tint">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          align="left"
          eyebrow="4.9 rating on Google"
          title={
            <>
              What our clients <span className={GRADIENT_TEXT}>say about us on Google</span>
            </>
          }
          sub="Real, verified reviews from our Google Business Profile — not handpicked quotes."
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous reviews"
            className="grid size-11 place-items-center rounded-full border border-[#E2E8F0] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#EFF6FF]"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next reviews"
            className="grid size-11 place-items-center rounded-full border border-[#E2E8F0] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-[#EFF6FF]"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((r, i) => (
          <Reveal
            key={r.name}
            delay={i * 60}
            as="article"
            className="w-[300px] shrink-0 snap-start rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:w-[340px]"
          >
            <div className="flex items-center justify-between">
              <Stars />
              <GoogleIcon className="size-5" />
            </div>
            <p className="mt-4 line-clamp-6 text-[0.92rem] leading-relaxed text-[#475569]">
              {r.text}
            </p>
            <div className="mt-5 flex items-end justify-between border-t border-[#E2E8F0] pt-4">
              <div>
                <p className="text-sm font-extrabold text-[#0F172A]">{r.name}</p>
                <p className="text-xs font-semibold text-[#2563EB]">{r.business}</p>
              </div>
              <Quote className="size-5 shrink-0 text-[#2563EB]/30" />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={GMB_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-bold text-[#0F172A] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/40"
        >
          <GoogleIcon className="size-5" />
          See All Our Reviews on Google
          <ExternalLink className="size-4 text-[#475569]" />
        </a>
      </div>
    </Section>
  );
}

/* ---------------- Process (6-stage timeline) ---------------- */

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "A senior strategist maps your offer, margins, sales process and what a genuinely qualified lead looks like.",
  },
  {
    n: "02",
    title: "Research",
    body: "Competitor teardown, keyword and AI-answer gap analysis, funnel and tracking audit with every leak documented.",
  },
  {
    n: "03",
    title: "Strategy",
    body: "A 90-day roadmap with channel mix, budget allocation, CPL targets and the exact assets we will ship.",
  },
  {
    n: "04",
    title: "Execution",
    body: "Campaigns, pages, content and automations go live in sprints — instrumented end-to-end before launch.",
  },
  {
    n: "05",
    title: "Optimisation",
    body: "Weekly reviews on lead quality, not clicks. Creative, bids, keywords and landing pages iterate continuously.",
  },
  {
    n: "06",
    title: "Scaling",
    body: "Once CPL is stable and predictable, we expand budget, geographies and channels without losing efficiency.",
  },
];

function Process() {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How we work"
        title={
          <>
            How our digital marketing agency{" "}
            <span className={GRADIENT_TEXT}>turns spend into growth</span>
          </>
        }
        sub="The exact six-stage system we've run 750+ times — not reinvented for your account, just applied correctly."
      />

      <div ref={ref} className="mt-11">
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-6 right-0 left-0 h-0.5 bg-[#E2E8F0]" />
            <div
              className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] transition-all duration-[1600ms] ease-out"
              style={{ width: seen ? "100%" : "0%" }}
            />
            <ol className="relative grid grid-cols-6 gap-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  style={{
                    transitionDelay: seen ? `${i * 140 + 200}ms` : "0ms",
                    opacity: seen ? 1 : 0,
                    transform: seen ? "translateY(0)" : "translateY(16px)",
                  }}
                  className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="relative z-10 grid size-12 place-items-center rounded-full border-2 border-[#2563EB] bg-white text-sm font-extrabold text-[#2563EB]">
                    {s.n}
                  </span>
                  <div className={`${CARD} mt-4 p-5`}>
                    <h3 className="text-base font-extrabold tracking-tight text-[#0F172A]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[1.4rem] before:w-px before:bg-[#E2E8F0] lg:hidden">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              style={{
                transitionDelay: seen ? `${i * 100}ms` : "0ms",
                opacity: seen ? 1 : 0,
                transform: seen ? "translateX(0)" : "translateX(-12px)",
              }}
              className="relative pl-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span className="absolute top-6 left-[0.65rem] grid size-6 place-items-center rounded-full border-2 border-[#2563EB] bg-white">
                <span className="size-2 rounded-full bg-[#2563EB]" />
              </span>
              <div className={`${CARD} p-6`}>
                <span className="text-sm font-extrabold tracking-wide text-[#2563EB]">{s.n}</span>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#0F172A]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-[#475569]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-9 text-center">
        <p className="mx-auto max-w-xl text-sm text-[#475569]">
          No stage gets skipped to hit a deadline, and no stage repeats because a junior missed a
          step the first time — you get the same senior strategist end to end.
        </p>
        <div className="mt-5">
          <a href="#quote" className={SECONDARY_BTN}>
            Start With Stage One — Free Audit
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS = [
  {
    q: "What happens on the free strategy call?",
    a: "A senior strategist reviews your website, ad accounts and search visibility live, then walks you through the three biggest opportunities and what they're realistically worth. You leave with the plan whether or not you work with us.",
  },
  {
    q: "How quickly will I see results?",
    a: "Google Ads improvements typically show within 2–4 weeks of a restructure. SEO compounds from month 3, with most clients seeing meaningful organic traffic gains by month 6.",
  },
  {
    q: "Are you an Ahmedabad-based agency, or do you work nationally too?",
    a: "Both. Digital Aura is an Ahmedabad-based team, and a large share of our clients are local businesses across healthcare, hospitality and real estate. We also run Google Ads, SEO and Meta Ads campaigns for clients across India, Australia, the UAE, the UK and North America.",
  },
  {
    q: "What makes you different from other digital marketing agencies in Ahmedabad?",
    a: "Most agencies sell activity — posts published, ads live. We sell outcomes tied to a number: cost per lead, ranking position, ROAS. Every service on this page ships with a timeline and an impact figure we're accountable to on your monthly call.",
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

function Faq() {
  return (
    <Section id="faq" tone="cream">
      <SectionHeading
        eyebrow="FAQs"
        title={
          <>
            Everything you'd ask on <span className={GRADIENT_TEXT}>the first call</span>
          </>
        }
        sub="No sales fog, no hedging — straight answers, the same ones we'd give on the call."
      />
      <div className="mx-auto mt-9 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white px-6 shadow-sm transition-all duration-300 last:border-b hover:border-[#2563EB]/25 data-[state=open]:border-[#2563EB]/40"
            >
              <AccordionTrigger className="py-6 text-left text-[1.05rem] font-bold text-[#0F172A] hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[0.98rem] leading-relaxed text-[#475569]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

/* ---------------- Final CTA ---------------- */

const INCLUDES = [
  "Google Ads & Meta account teardown",
  "SEO + AI visibility gap report",
  "Landing page conversion review",
  "90-day growth roadmap with CPL targets",
];

function FinalCta() {
  return (
    <section
      id="book"
      className="scroll-mt-24 bg-gradient-to-br from-[#1E3A6D] to-[#1E40AF] px-5 py-11 text-white sm:px-8 md:py-14"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-bold tracking-wide text-white uppercase">
            Limited weekly slots
          </span>
          <h2 className="mt-5 text-[2.1rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-[2.75rem]">
            Book your free strategy call and see the plan before you spend a rupee.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            30 minutes with a senior strategist from our Ahmedabad team — not a slideshow, not a
            junior on commission. A real audit, a real roadmap, numbers you can hold us to.
          </p>

          <ul className="mt-8 space-y-3">
            {INCLUDES.map((i) => (
              <li key={i} className="flex items-start gap-3 font-medium">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/15">
                  <Check className="size-3.5 text-white" />
                </span>
                {i}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:+918141200284"
              className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-3 font-semibold text-[#0F172A] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#EFF6FF]"
            >
              <Phone className="size-4 text-[#2563EB]" />
              +91 81412 00284
            </a>
            <a
              href="https://wa.me/918141200284"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-3 font-semibold text-[#0F172A] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#EFF6FF]"
            >
              <MessageCircle className="size-4 text-[#2563EB]" />
              WhatsApp us
            </a>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Prefer email?{" "}
            <a
              href="mailto:info@thedigitalaura.com"
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              info@thedigitalaura.com
            </a>
          </p>
        </div>

        <div className="min-w-0 rounded-[1.75rem] border border-white/10 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08),0_32px_60px_-28px_rgba(15,23,42,0.22)] sm:p-8">
          <h3 className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
            Claim your free audit
          </h3>
          <p className="mt-2 text-[0.95rem] text-[#475569]">We reply within one business hour.</p>
          <div className="mt-6">
            <LeadForm idPrefix="finalcta-lf" />
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-[#475569]">
            No Spam. No Sales Pressure. 100% Free Consultation.
          </p>
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
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-20 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(37,211,102,0.55)] transition hover:scale-105 md:bottom-5"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <a href="#quote" className={`w-full ${PRIMARY_BTN} text-[15px]`}>
        Get My Free Growth Audit <ArrowRight className="size-4 shrink-0" />
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
        <TrustedBy />
        <Industries />
        <MoneyLeaks />
        <Solutions />
        <DigitalPresence />
        <Results />
        <CaseStudies />
        <GoogleReviews />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <MainSiteFooter />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </div>
  );
}
