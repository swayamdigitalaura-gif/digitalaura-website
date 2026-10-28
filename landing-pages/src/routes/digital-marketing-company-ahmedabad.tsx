import { createFileRoute } from "@tanstack/react-router";
import { CaseStudySlider, type SliderCase } from "@/components/CaseStudySlider";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Crosshair,
  Database,
  Dumbbell,
  FileBarChart,
  FileCode2,
  Gauge,
  GraduationCap,
  HeartPulse,
  Layers,
  Lightbulb,
  Loader2,
  Mail,
  MapPin,
  MapPinned,
  MessageCircle,
  MousePointerClick,
  Network,
  Phone,
  Quote,
  RefreshCw,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import digitalAuraLogo from "@/assets/brand/digital-aura-logo.png";
import googlePlatformLogo from "@/assets/platform-logos/google-logo.png";
import sampleAuditPage1 from "@/assets/sample-seo-audit-page1.webp";
import semrushLogo from "@/assets/tool-logos/semrush.png";
import ahrefsLogo from "@/assets/tool-logos/ahrefs.png";
import screamingFrogLogo from "@/assets/tool-logos/screaming-frog.png";
import surferSeoLogo from "@/assets/tool-logos/surfer-seo.png";
import localFalconLogo from "@/assets/tool-logos/local-falcon.jpg";
import googleSearchConsoleToolLogo from "@/assets/tool-logos/google-search-console.png";
import googleAnalyticsToolLogo from "@/assets/tool-logos/google-analytics.png";
import googleTagManagerLogo from "@/assets/tool-logos/google-tag-manager.svg";
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
import "@/pillar-pages.css";
import {
  InPillarContext,
  PillarFaq,
  PillarSection,
  PillarSubNav,
  PillarTabs,
  useInPillar,
} from "@/components/pillar/Pillar";

const PAGE_TITLE = "Digital Marketing Company in Ahmedabad | Top Agency | Digital Aura";
const PAGE_DESCRIPTION =
  "Digital marketing company in Ahmedabad and a full-service agency: SEO, Google Ads, Meta Ads and social media in one plan. Rated 4.9 on Google. From ₹30,000 a month.";
const OG_DESCRIPTION =
  "SEO, Google Ads, Meta Ads and social media run as one team by a digital marketing company and agency in Ahmedabad. Clear pricing, monthly lead reporting and a free growth audit.";
const PAGE_URL = "https://thedigitalaura.com/digital-marketing-company-ahmedabad";
const LAST_UPDATED_ISO = "2026-10-23";
const LAST_UPDATED_LABEL = "23 October 2026";

export const Route = createFileRoute("/digital-marketing-company-ahmedabad")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "Digital Marketing Company in Ahmedabad, Digital Marketing Agency in Ahmedabad, Best Digital Marketing Agency in Ahmedabad, Top Digital Marketing Companies in Ahmedabad, Top Digital Marketing Agency in Ahmedabad, Best Digital Marketing Companies in Ahmedabad, Online Marketing Agency in Ahmedabad, Online Marketing Company in Ahmedabad, Internet Marketing Ahmedabad, Digital Agency Ahmedabad, Digital Marketing Services in Ahmedabad, Best Digital Marketing Company in Ahmedabad, Digital Marketing Ahmedabad, Performance Marketing Agency Ahmedabad, Full Service Digital Marketing Agency Ahmedabad, Digital Marketing for Small Business Ahmedabad",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:locale", content: "en_IN" },
      { name: "robots", content: "index,follow" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: OG_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: Index,
});

/* ---------------- Structured data ---------------- */

const ORG_SAME_AS = [
  "https://www.google.com/maps?cid=14693467769090662076",
  "https://maps.app.goo.gl/rNtQ9RkNtePogkJeA",
  "https://www.linkedin.com/company/thedigitalaura/",
  "https://www.instagram.com/thedigitalaura/",
];

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://thedigitalaura.com/#organization",
    name: "Digital Aura",
    description:
      "Digital marketing company in Ahmedabad running SEO, Google Ads, Meta Ads and social media as one team, with monthly reporting on calls, forms and enquiries.",
    image: digitalAuraLogo,
    telephone: "+91-81412-00284",
    email: "info@thedigitalaura.com",
    url: "https://thedigitalaura.com/",
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
    sameAs: ORG_SAME_AS,
  };
  return (
    <script
      type="application/ld+json"
      // Static, hard-coded JSON, no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function PageSchema() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thedigitalaura.com/" },
      { "@type": "ListItem", position: 2, name: "Digital Marketing Company in Ahmedabad", item: PAGE_URL },
    ],
  };
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "en-IN",
    dateModified: LAST_UPDATED_ISO,
    isPartOf: { "@type": "WebSite", name: "Digital Aura", url: "https://thedigitalaura.com/" },
    about: { "@id": "https://thedigitalaura.com/#organization" },
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital marketing services in Ahmedabad",
    serviceType: "Digital marketing",
    url: PAGE_URL,
    description:
      "SEO, Google Ads, Meta Ads and social media marketing for Ahmedabad businesses, planned together and reported on calls, forms and enquiries.",
    provider: { "@id": "https://thedigitalaura.com/#organization" },
    areaServed: { "@type": "City", name: "Ahmedabad" },
  };
  return (
    <>
      {[breadcrumb, webPage, service].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Static, hard-coded JSON, no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

/* ---------------- Team (founder and Jinali match the SEO page; other roles are digital marketing) ---------------- */

const FOUNDER = {
  name: "Sambhav Shah",
  role: "Founder & CEO",
  photo: "/team/sambhav-shah.webp",
  bio: "Sambhav started in digital marketing in 2015 and built his expertise hands-on, leading business development, client relationships and growing teams. With 10+ years across client acquisition, team leadership and digital execution, he stays personally involved in strategy on every account.",
};

const TEAM_MEMBERS = [
  { name: "Satish Prajapati", role: "Digital Marketing Expert", photo: "/team/satish.png", bio: "Satish leads digital marketing delivery and project management on your account. He turns your goals into a monthly plan across SEO, ads and social, coordinates the team, and explains each month's work, report and next step in plain language." },
  { name: "Jinali Lodariya", role: "SEO Executive", photo: "/team/jinali.png", bio: "Jinali handles keyword research, on-page optimisation and content improvements. Titles, headings and page copy are worked through so each service page matches what people in Ahmedabad actually search for." },
  { name: "Bhavesh Bhavsar", role: "Digital Marketing Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh supports campaign set-up, landing page checks, content planning and conversion tracking, so SEO, Google Ads and social media all work from the same data and send visitors to pages that are ready for them." },
  { name: "Krishna Jani", role: "Digital Marketing Executive", photo: "/team/krishna.webp", bio: "Krishna supports Google Business Profile updates, local listings and day-to-day ad account tasks, keeping your business details accurate and consistent across the places customers look and click." },
  { name: "Diya Mahida", role: "Digital Marketing Executive", photo: "/team/diya.webp", bio: "Diya supports keyword and audience research, content planning and reporting, and helps prepare the monthly update that shows what each channel delivered and what to work on next." },
];

const FOUNDER_SAME_AS = ["https://www.linkedin.com/in/sambhav-shah/", "https://www.instagram.com/sambhavshah2/"];

function TeamSection() {
  const all = [FOUNDER, ...TEAM_MEMBERS];
  return (
    <section id="team" className="bg-surface-2">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Our team"
          title="Meet the team that grows your business"
          sub="Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that plans and runs your SEO, ads and social media."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((m, i) => (
            <div key={m.name} className="rounded-2xl border border-border bg-white p-5">
              <div className="flex items-center gap-3">
                <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" className="h-14 w-14 shrink-0 rounded-full bg-surface-2 object-cover" />
                <div>
                  <h3 className="font-bold leading-tight">{m.name}</h3>
                  <p className="text-sm font-semibold text-brand-orange">{m.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{m.bio}</p>
              {i === 0 && (
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a className="font-bold text-brand-orange underline" href={FOUNDER_SAME_AS[0]} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a className="font-bold text-brand-orange underline" href={FOUNDER_SAME_AS[1]} target="_blank" rel="noopener noreferrer">Instagram</a>
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-muted">
          Want the full story? Read <a className="font-semibold text-brand-orange underline" href="/about/">about Digital Aura</a> or see what clients say on our{" "}
          <a className="font-semibold text-brand-orange underline" href="/testimonials/">testimonials page</a>.
        </p>
      </div>
    </section>
  );
}

function PeopleSchema() {
  const org = { "@type": "ProfessionalService", name: "Digital Aura", url: "https://thedigitalaura.com/" };
  const people = [
    { "@context": "https://schema.org", "@type": "Person", name: FOUNDER.name, jobTitle: "Founder", description: FOUNDER.bio, worksFor: org, url: "https://thedigitalaura.com/about/", sameAs: FOUNDER_SAME_AS },
    ...TEAM_MEMBERS.map((m) => ({ "@context": "https://schema.org", "@type": "Person", name: m.name, jobTitle: m.role, description: m.bio, worksFor: org })),
  ];
  return (
    <>
      {people.map((p) => (
        <script
          key={p.name}
          type="application/ld+json"
          // Static, hard-coded JSON, no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
    </>
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
  href = "#audit",
  className = "",
  download,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  download?: string;
}) {
  return (
    <a href={href} download={download} className={`pillar-btn pillar-btn--primary group ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function SecondaryCTA({ children, href = "#contact", className = "" }: { children: React.ReactNode; href?: string; className?: string }) {
  return (
    <a href={href} className={`pillar-btn pillar-btn--secondary ${className}`}>
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="pillar-eyebrow">{children}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  wide?: boolean;
}) {
  // Inside a pillar group/tab the block's own heading becomes a sub-heading (H3) under the group's H2.
  const inPillar = useInPillar();
  if (inPillar) {
    return (
      <div className="pillar-subhead">
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
        <h3>{title}</h3>
        {sub && <p>{sub}</p>}
      </div>
    );
  }
  return (
    <div className="pillar-head">
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

/** Small icon card used by several grids. */
function IconCard({ icon: Icon, t, d }: { icon: React.ElementType; t: string; d: string }) {
  return (
    <div className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-bold text-brand-navy">{t}</h3>
      <p className="mt-1.5 text-sm text-ink-muted">{d}</p>
    </div>
  );
}

/* ---------------- Hero + form ---------------- */

const NEEDS = [
  "Full digital marketing plan",
  "SEO (Google and AI search)",
  "Google Ads",
  "Meta Ads (Facebook and Instagram)",
  "Social media marketing",
  "AI workflow automation",
  "Not sure yet",
];

function LeadForm({ idPrefix = "lf", withAnchor = true }: { idPrefix?: string; withAnchor?: boolean }) {
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
          message: `${fd.get("need") || ""} | ${fd.get("website") || ""}`,
          project: "Digital Marketing",
          source: "digital-marketing-company-ahmedabad",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      (e.target as HTMLFormElement).reset();
      toast.success("Growth audit request received!", {
        description: "A senior digital marketing strategist will reach out within 1 business hour.",
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
    "Website and tracking review",
    "SEO and Google Business Profile check",
    "Google Ads and Meta Ads account review",
    "Competitor and keyword gaps",
    "Channel-by-channel priorities",
    "90-day growth roadmap",
  ];

  return (
    <div>
      <form
        id={withAnchor ? "audit" : undefined}
        onSubmit={onSubmit}
        className="da-shadow-card rounded-3xl border border-brand-navy/10 bg-white p-6 md:p-7"
      >
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <Zap className="h-3.5 w-3.5" /> Free · reply within 1 business hour
          </div>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-[28px]">Get My Free Growth Audit</h3>
          <p className="mt-1.5 text-sm text-ink-muted">
            Reviewed personally by a senior digital marketing strategist in Ahmedabad, not an automated report.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-name`} className={labelCls}>Full name</label>
            <input required id={`${idPrefix}-name`} name="name" autoComplete="name" placeholder="e.g. Raj Patel" className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-business`} className={labelCls}>Business name</label>
            <input required id={`${idPrefix}-business`} name="business" placeholder="Your company" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${idPrefix}-website`} className={labelCls}>Website URL</label>
            <input required id={`${idPrefix}-website`} name="website" type="text" placeholder="yourwebsite.com" className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`} className={labelCls}>Phone number</label>
            <input required id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-email`} className={labelCls}>Work email</label>
            <input required id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@business.com" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${idPrefix}-need`} className={labelCls}>What do you need?</label>
            <select required id={`${idPrefix}-need`} name="need" defaultValue="" className={inputCls}>
              <option value="" disabled>Select a service</option>
              {NEEDS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className="pillar-btn pillar-btn--primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? (
            <>
              Sending…
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
            </>
          ) : (
            <>
              Get My Free Growth Audit
              <ArrowRight className="h-5 w-5 shrink-0" />
            </>
          )}
        </button>
        <p className="mt-2.5 text-center text-xs text-ink-muted">Takes 45 seconds · No credit card · No spam, ever.</p>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
          {["No obligation", "100% confidential", "Senior strategist call"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-orange" /> {t}
            </li>
          ))}
        </ul>
      </form>

      <div className="mt-4 rounded-2xl border border-brand-navy/8 bg-surface-2 p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">Your free audit includes</div>
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
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Digital Marketing Company in Ahmedabad
          </div>

          <h1 className="mt-6 font-extrabold leading-[1.12] tracking-tight text-brand-navy [font-size:clamp(32px,4vw,48px)]">
            Digital Marketing Company in Ahmedabad That Turns Spend into{" "}
            <span className="text-brand-orange">Leads</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            As a digital marketing agency in Ahmedabad, we run <a className="font-semibold text-brand-navy underline decoration-brand-orange/50 underline-offset-2" href="/seo-services-ahmedabad">SEO</a>,{" "}
            <a className="font-semibold text-brand-navy underline decoration-brand-orange/50 underline-offset-2" href="/google-ads-agency-ahmedabad">Google Ads</a>,{" "}
            <a className="font-semibold text-brand-navy underline decoration-brand-orange/50 underline-offset-2" href="/meta-ads-agency-ahmedabad/">Meta Ads</a> and social media as one plan, so Ahmedabad businesses get more calls, forms and WhatsApp enquiries, and see exactly what each rupee produced.
          </p>

          <div className="pillar-btn-row mt-8">
            <PrimaryCTA href="#audit">Get My Free Growth Audit</PrimaryCTA>
            <SecondaryCTA href="#pricing">See Pricing</SecondaryCTA>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm font-semibold text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 text-brand-orange">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <a className="underline" href="#testimonials">Google reviews</a>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-brand-navy/20 sm:inline-block" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-orange" /> 10+ years of experience
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-brand-navy/20 sm:inline-block" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-brand-orange" /> 120+ businesses served
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

/* ---------------- Trust strip ---------------- */

const TRUST_STATS = [
  { k: "120+", v: "Businesses served" },
  { k: "750+", v: "Projects delivered" },
  { k: "10+", v: "Years of experience" },
  { k: "1 hr", v: "Reply to every enquiry (business hours)" },
];

function TrustStrip() {
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
    <section id="trust" className="pillar-trust" aria-label="Results and clients">
      <div className="pillar-container">
        <div className="pillar-trust-stats">
          {TRUST_STATS.map((s) => (
            <div key={s.v}>
              <strong>{s.k}</strong>
              <span>{s.v}</span>
            </div>
          ))}
        </div>
        <div className="pillar-trust-logos">
          <div className="mb-2 text-center"><span className="pillar-eyebrow">Our clients</span></div>
          <p className="pillar-trust-caption">
            Trusted by businesses we've helped grow. From healthcare and education to eCommerce and local services, we work with ambitious brands across industries.
          </p>
          <div
            className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="da-marquee-track flex w-max items-center gap-8" data-paused={paused}>
              {track.map(({ src, name, dark }, i) => (
                <div key={`${name}-${i}`} className="flex w-[130px] flex-none flex-col items-center gap-1.5">
                  <div className={cn("flex h-12 w-full items-center justify-center", dark && "rounded-md bg-brand-navy px-2")}>
                    <img src={src} alt={`${name} logo`} loading="lazy" className="h-full max-h-12 w-auto max-w-full object-contain" />
                  </div>
                  <div className="text-center text-[11px] font-semibold leading-tight text-brand-navy">{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Overview: quick answer + AI shift ---------------- */

function QuickAnswer() {
  const links = [
    { href: "#audit", label: "Free growth audit" },
    { href: "#pricing", label: "Digital marketing pricing" },
    { href: "/seo/pricing-ahmedabad/", label: "SEO packages and pricing" },
    { href: "/google-ads-pricing-ahmedabad/", label: "Google Ads pricing" },
    { href: "/meta-ads-agency-ahmedabad/pricing", label: "Meta Ads pricing" },
    { href: "/blog/seo-vs-paid-ads-which-first-ahmedabad/", label: "SEO or Google Ads first?" },
  ];
  return (
    <section id="quick-answer" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <SectionLabel>Quick answer</SectionLabel>
            <h2 className="pillar-h2">What does a digital marketing company in Ahmedabad do?</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
              A digital marketing company in Ahmedabad helps your business get found and chosen online. At Digital Aura, that means{" "}
              <a className="font-semibold text-brand-orange underline" href="/seo-services-ahmedabad">SEO</a> so you show up on Google, Maps and AI search,{" "}
              <a className="font-semibold text-brand-orange underline" href="/google-ads-agency-ahmedabad">Google Ads</a> and{" "}
              <a className="font-semibold text-brand-orange underline" href="/meta-ads-agency-ahmedabad/">Meta Ads</a> for faster leads, and{" "}
              <a className="font-semibold text-brand-orange underline" href="/services/social-media-marketing/">social media marketing</a> to build trust, plus <a className="font-semibold text-brand-orange underline" href="/ai-automation-ahmedabad/">AI workflow automation</a> so no enquiry goes cold, all planned together and reported on calls, forms and enquiries. Our plans start at ₹30,000 a month plus GST, with ad spend paid separately. For the paid side on its own, see our <a className="font-semibold text-brand-orange underline" href="/google-ads-agency-ahmedabad">performance marketing agency in Ahmedabad</a> page.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center rounded-full border border-brand-navy/12 bg-white px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-muted">
              Published by <a className="underline" href="/about/">Digital Aura</a>, 713 Shilp Arcade, Hanspura, Ahmedabad. Last updated{" "}
              <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AIShift() {
  const points = [
    "Google AI Overviews now answer many searches directly, often without a click",
    "Buyers also research on ChatGPT, Gemini and Perplexity before they call anyone",
    "Clear answers, structured pages and consistent business details decide who gets quoted",
    "Paid ads still win the urgent click, so the two channels work best together",
  ];
  return (
    <section id="ai-search-shift" className="pillar-dark-card">
      <span className="pillar-eyebrow inline-flex items-center gap-2">
        <Bot className="h-3.5 w-3.5" /> Digital marketing in 2026
      </span>
      <h3 className="pillar-oneline mt-3 text-2xl font-extrabold leading-tight md:text-[28px]">
        One channel is not a strategy. <span className="text-brand-orange">SEO, ads and AI search</span> now work as one system.
      </h3>
      <p className="mt-4 text-base text-white/75">
        People find businesses through Google, Maps, Instagram, YouTube and AI assistants, often in the same week. We plan the channels together, so you do not pay for the same customer twice or miss the places buyers actually look. Read how this changes search in our guide to{" "}
        <a className="font-semibold text-white underline" href="/blog/seo-in-2026-ai-era/">SEO in 2026</a>.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Google", "Google Maps", "Instagram", "ChatGPT", "Gemini", "Perplexity"].map((p) => (
          <span key={p} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white">
            {p}
          </span>
        ))}
      </div>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <span className="text-[15px] text-white/90">{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Problems ---------------- */

function Problem() {
  const pains = [
    { icon: TrendingUp, t: "Spending, but no clear leads", d: "Ads and posts are running, yet nobody can say which rupee brought which enquiry." },
    { icon: Bot, t: "Invisible in AI search", d: "ChatGPT, Gemini and Perplexity name your competitors, not your business." },
    { icon: Gauge, t: "A website that leaks visitors", d: "Slow pages, weak calls to action and missing tracking waste the traffic you pay for." },
    { icon: ShieldCheck, t: "Burned by past agencies", d: "Vanity reports, one-size packages and nobody who owns the result." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="The real problem"
          title={<>Your marketing is not failing. It is <span className="text-brand-orange">disconnected</span>.</>}
          sub="Most Ahmedabad businesses run SEO with one vendor, ads with another and social media with a third. Nobody sees the whole funnel, so money leaks between the channels."
        />
        <div className="pillar-cols-4 mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map(({ icon: Icon, t, d }) => (
            <IconCard key={t} icon={Icon} t={t} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketingChallenges() {
  const challenges = [
    { icon: TrendingDown, t: "Traffic but few enquiries", problem: "Visitors arrive and leave without calling or filling the form.", solution: "Landing pages that match the ad or search, with a clear next step and call and form tracking." },
    { icon: Users, t: "Leads that never buy", problem: "Enquiries come in, but they are the wrong people or the wrong budget.", solution: "Sharper targeting, qualifying questions on forms and feedback from your sales team to the campaigns." },
    { icon: Crosshair, t: "Competitors ranking higher", problem: "Rivals own the first page for the searches that bring you business.", solution: "Competitor and keyword gap work, then pages and local signals built to beat them." },
    { icon: Settings2, t: "Ads that burn budget", problem: "Clicks are paid for, but few turn into leads.", solution: "Account clean-up, negative keywords, better creative and conversion tracking before more budget." },
    { icon: RefreshCw, t: "Results that stop growing", problem: "Early gains flatten and nobody knows what to try next.", solution: "A monthly roadmap that moves budget and effort to the channel that is working." },
    { icon: MapPinned, t: "Weak local visibility", problem: "You are missing from the Map Pack when nearby customers search.", solution: "Google Business Profile, citations, reviews and area pages for Ahmedabad searches." },
    { icon: BarChart3, t: "Reports nobody understands", problem: "Impressions and likes, but no link to revenue.", solution: "Plain monthly reports on calls, forms, WhatsApp clicks and cost per lead." },
    { icon: Briefcase, t: "Too many vendors", problem: "SEO, ads, design and social media sit with different people who never talk.", solution: "One team, one plan and one monthly call for every channel." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Where marketing breaks down"
          title={<>Marketing challenges we <span className="text-brand-orange">solve</span></>}
          sub="Common problems businesses face before their marketing starts paying back."
        />
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map(({ icon: Icon, t, problem, solution }) => (
            <div key={t} className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7">
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

/* ---------------- Services ---------------- */

function ServicesScope() {
  const items = [
    { t: "SEO and AI search", d: "Technical fixes, local SEO, content and AI search work so you rank on Google, in Maps and in AI answers.", h: "/seo-services-ahmedabad", n: "SEO services in Ahmedabad" },
    { t: "Google Ads", d: "Search and Performance Max campaigns with call, form and WhatsApp tracking, for leads you can count.", h: "/google-ads-agency-ahmedabad", n: "Google Ads agency in Ahmedabad" },
    { t: "Meta Ads", d: "Facebook and Instagram campaigns with creative testing and lead quality checks.", h: "/meta-ads-agency-ahmedabad/", n: "Meta ads agency in Ahmedabad" },
    { t: "Social media marketing", d: "A content plan, Reels and community work that builds trust before a customer calls.", h: "/social-media-marketing-agency-ahmedabad/", n: "social media marketing agency in Ahmedabad" },
    { t: "Website and landing pages", d: "Fast, SEO-ready sites and landing pages built to turn visits into enquiries.", h: "/website-development-services-ahmedabad/", n: "website development in Ahmedabad" },
    { t: "AI workflow automation", d: "Instant lead follow-up, CRM automation and live dashboards, so no enquiry goes cold and your team skips the manual work.", h: "/ai-automation-ahmedabad/", n: "AI automation in Ahmedabad" },
  ];
  return (
    <section id="digital-marketing-services" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Digital marketing services"
          title={<>Digital marketing services in Ahmedabad: <span className="text-brand-orange">what we actually do</span></>}
          sub="A digital marketing company, a digital marketing agency, an online marketing agency in Ahmedabad and an online marketing company in Ahmedabad all do the same job: getting your business found by people ready to enquire. This is the work behind it."
        />
        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <a key={x.h} href={x.h} className="da-shadow-card da-card-hover group flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7">
              <h3 className="text-lg font-bold text-brand-navy">{x.t}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{x.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-orange group-hover:gap-2">
                Learn more<span className="sr-only"> about {x.n}</span> <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-ink-muted">
          Not sure which of these your business needs first? Start with the{" "}
          <a className="font-semibold text-brand-orange underline" href="#audit">free growth audit</a>. If you only need one channel, our{" "}
          <a className="font-semibold text-brand-orange underline" href="/services/digital-marketing/">digital marketing services overview</a> shows each one in detail.
        </p>
      </div>
    </section>
  );
}

function AutomationSection() {
  const items = [
    { icon: Zap, t: "Instant lead follow-up", d: "A new enquiry from a form, ad or call gets a reply in seconds, not hours, so the lead is still warm when your team calls." },
    { icon: Workflow, t: "CRM automation", d: "Leads are routed to the right person, tagged by source and tracked until they buy or drop out." },
    { icon: MessageCircle, t: "WhatsApp and email follow-ups", d: "Reminders, quotes and check-ins go out on schedule, so fewer enquiries go quiet." },
    { icon: FileBarChart, t: "Live dashboards", d: "Leads, response time and cost per lead by channel in one place, without waiting for a monthly PDF." },
  ];
  return (
    <section id="ai-automation" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="AI workflow automation"
          title={<>Get the lead, then <span className="text-brand-orange">keep it</span>: AI workflow automation</>}
          sub="Marketing brings the enquiry. Automation makes sure it is answered fast, followed up and measured. Typical set-up takes 1 to 2 weeks."
        />
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon, t, d }) => (
            <IconCard key={t} icon={icon} t={t} d={d} />
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-ink-muted">
          See the full service on our{" "}
          <a className="font-semibold text-brand-orange underline" href="/ai-automation-ahmedabad/">AI automation page for Ahmedabad businesses</a>, the{" "}
          <a className="font-semibold text-brand-orange underline" href="/services/ai/workflow-automation/">workflow automation service</a> and{" "}
          <a className="font-semibold text-brand-orange underline" href="/services/email-whatsapp-marketing/">email and WhatsApp marketing</a>.
        </p>
        <div className="pillar-btn-row pillar-btn-row--center">
          <PrimaryCTA href="#audit">Ask how automation fits my business</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

function Framework() {
  const items = [
    { icon: Search, t: "Search (SEO)", d: "Technical SEO, on-page work and local SEO so you are found when people search." },
    { icon: Target, t: "Paid search (Google Ads)", d: "Intent-based ads that catch people ready to call, tracked to the lead." },
    { icon: Share2, t: "Paid social (Meta Ads)", d: "Facebook and Instagram campaigns that create demand and capture leads." },
    { icon: Users, t: "Organic social", d: "Content and Reels that make your brand familiar and trusted." },
    { icon: Bot, t: "AI search (AEO and GEO)", d: "Clear answers and structured pages so AI assistants understand and cite you." },
    { icon: Database, t: "Tracking and data", d: "Search Console, Analytics and Tag Manager set up in your own accounts." },
    { icon: MousePointerClick, t: "Conversion work", d: "Landing page and form improvements that lift the share of visitors who enquire." },
    { icon: Network, t: "Local presence", d: "Google Business Profile, reviews and listings for Ahmedabad searches." },
    { icon: FileBarChart, t: "Monthly reporting", d: "One report across every channel, with the next step clearly stated." },
  ];
  return (
    <section id="framework" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="The Digital Aura framework"
          title={<>9 parts. <span className="text-brand-orange">One connected plan</span>.</>}
          sub="Every account is built from the same nine parts. We switch on the ones your business needs first and add the rest as results come in."
        />
        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="da-shadow-card da-card-hover group relative overflow-hidden rounded-2xl border border-brand-navy/12 bg-white p-7">
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
    { n: "01", t: "Growth audit", d: "We review your website, tracking, search visibility, ad accounts and competitors, and list what to fix first." },
    { n: "02", t: "Plan and priorities", d: "A 90-day roadmap that picks the channels and pages with the fastest path to enquiries." },
    { n: "03", t: "Launch and build", d: "Tracking, fixes, campaigns and content go live in sprints, with you seeing each change." },
    { n: "04", t: "Report and scale", d: "Monthly reporting on leads and cost per lead, then budget moves to what is working." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Our process"
          title="How we plan and run your digital marketing"
          sub="A transparent system, so you always know what is being done, what moved and why."
        />
        <div className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="da-shadow-card da-card-hover relative flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7">
              <div className="text-5xl font-extrabold text-brand-orange/30">{s.n}</div>
              <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">{s.d}</p>
              {i < steps.length - 1 && <ArrowRight className="absolute right-4 top-7 hidden h-5 w-5 text-brand-navy/20 lg:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function First90Days() {
  const phases = [
    {
      m: "Days 1 to 30",
      t: "Audit, tracking and fixes",
      items: [
        "We agree what counts as a lead for your business: a call, a form, a WhatsApp message or a booking.",
        "Search Console, Analytics, Tag Manager and call and form tracking are set up in your own accounts.",
        "Your website, Google Business Profile and any existing ad accounts are audited and the critical problems fixed.",
        "We choose the first channels and the pages that matter most to your revenue.",
      ],
    },
    {
      m: "Days 31 to 60",
      t: "Campaigns and pages go live",
      items: [
        "Google Ads and Meta Ads campaigns launch against the tracked goals, with creative and landing pages ready.",
        "Priority SEO pages are rewritten or built around real search intent, with internal links and schema.",
        "Your Google Business Profile and local listings are made accurate and consistent.",
        "You get a short progress note on what shipped, not just a list of keywords.",
      ],
    },
    {
      m: "Days 61 to 90",
      t: "Measure and extend",
      items: [
        "The first full report covers leads, cost per lead and which pages and campaigns are starting to move.",
        "We cut what is not working and put more effort into what is.",
        "Content, local and paid work are planned for the next quarter from your own data.",
        "We agree the next steps with you on a call.",
      ],
    },
  ];
  return (
    <section id="first-90-days" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Your first 90 days"
          title={<>What happens in the <span className="text-brand-orange">first 90 days</span></>}
          sub="A clear start, so you know what is being done and when."
        />
        <Reveal className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {phases.map((x) => (
            <div key={x.m} className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">{x.m}</span>
              <h3 className="mt-2 text-lg font-bold text-brand-navy">{x.t}</h3>
              <ul className="mt-4 space-y-3">
                {x.items.map((i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-muted">
          Paid ads can bring leads within weeks, while SEO usually takes longer to compound. We judge the first 90 days on fixes shipped, tracking in place and early movement, not on a promised position or lead count.
        </p>
        <div className="pillar-btn-row pillar-btn-row--center">
          <PrimaryCTA href="#audit">Get my free growth audit</PrimaryCTA>
          <SecondaryCTA href="https://wa.me/918141200284">Chat on WhatsApp</SecondaryCTA>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tools, reporting, certified platforms ---------------- */

function ToolsWeUse() {
  const tools = [
    { name: "Google Search Console", logo: googleSearchConsoleToolLogo, use: "Indexing and search performance" },
    { name: "Google Analytics", logo: googleAnalyticsToolLogo, use: "Traffic and conversion data" },
    { name: "Google Tag Manager", logo: googleTagManagerLogo, use: "Event and conversion tracking" },
    { name: "Semrush", logo: semrushLogo, use: "Competitive keyword and market research" },
    { name: "Ahrefs", logo: ahrefsLogo, use: "Backlink and content gap analysis" },
    { name: "Screaming Frog", logo: screamingFrogLogo, use: "Technical crawl audits" },
    { name: "Surfer SEO", logo: surferSeoLogo, use: "On-page content optimisation" },
    { name: "Local Falcon", logo: localFalconLogo, use: "Local pack and Map rank tracking" },
    { name: "ChatGPT", logo: chatgptLogo, use: "AI-assisted research and workflows" },
    { name: "Claude", logo: claudeLogo, use: "AI-assisted research and workflows" },
    { name: "Gemini", logo: geminiLogo, use: "AI search visibility checks" },
  ];
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Our stack"
          title={<>Professional marketing <span className="text-brand-orange">tools</span> we use</>}
          sub="Every account runs on the same stack used by serious in-house marketing teams, with AI-assisted workflows for faster research. The tools inform the plan; our team makes the call."
        />
        <Reveal className="pillar-cols-4 pillar-small mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool) => (
            <div key={tool.name} className="da-shadow-card da-card-hover flex h-full flex-col items-center gap-3 rounded-2xl border border-brand-navy/12 bg-white p-6 text-center">
              <div className="grid h-28 w-full place-items-center rounded-xl bg-white">
                <img src={tool.logo} alt={`${tool.name} logo`} className="h-24 w-auto max-w-[min(160px,100%)] object-contain" />
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

function Reporting() {
  const items = [
    { icon: BarChart3, t: "Google Analytics", d: "Who visits, where they come from and what they do next." },
    { icon: Search, t: "Google Search Console", d: "Impressions, clicks and indexing data straight from Google, reviewed monthly." },
    { icon: Target, t: "Ad account reporting", d: "Spend, clicks and cost per lead for Google Ads and Meta Ads in one place." },
    { icon: FileBarChart, t: "Monthly reports", d: "A clear, jargon-free report: what we did, what moved, what is next." },
    { icon: MousePointerClick, t: "Conversion tracking", d: "Form fills, calls and WhatsApp clicks tracked to the page and source." },
    { icon: Users, t: "Lead tracking", d: "Every enquiry tied back to the channel and campaign that produced it." },
    { icon: TrendingUp, t: "Channel comparison", d: "See which channel brings the cheapest and best leads, side by side." },
    { icon: Lightbulb, t: "Business insights", d: "Reporting turned into decisions: what to scale, fix or stop." },
  ];
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Reporting and insights"
          title={<>You will always know what is <span className="text-brand-orange">working</span></>}
          sub="Every account gets proper tracking and a reporting cadence built for decision makers, not vanity metrics."
        />
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon, t, d }) => (
            <IconCard key={t} icon={icon} t={t} d={d} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

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
        <SectionHeading eyebrow="Trust and certifications" title="Certified platforms and trusted ecosystem" sub="The platforms and certifications behind every account we run." />
        <Reveal className="pillar-cols-5 pillar-small mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ logo, name }) => (
            <div key={name} className="da-shadow-card da-card-hover flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-brand-navy/12 bg-white p-6 text-center">
              <div className="grid h-28 w-full place-items-center rounded-xl bg-white">
                <img src={logo} alt={`${name} logo`} className="h-24 w-auto max-w-[min(160px,100%)] object-contain" />
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
    { icon: HeartPulse, t: "Healthcare", d: "Patients search by symptom and area. Local SEO, careful ads and tracked appointments bring them to you.", h: "/seo/doctors-hospitals-ahmedabad/", n: "SEO for doctors and hospitals" },
    { icon: UtensilsCrossed, t: "Restaurants", d: "Diners search near me and scroll Instagram. Maps, Reels and Meta ads turn that into bookings.", h: "/meta-ads-agency-ahmedabad/restaurants", n: "Meta ads for restaurants" },
    { icon: Building2, t: "Real estate", d: "Listings get buried under portals. Location-based SEO and lead ads reach buyers ready to act.", h: "/meta-ads-agency-ahmedabad/real-estate", n: "Meta ads for real estate" },
    { icon: ShoppingCart, t: "eCommerce", d: "Browsers do not become buyers by themselves. Search, shopping ads and retargeting close the gap.", h: "/meta-ads-agency-ahmedabad/ecommerce", n: "Meta ads for eCommerce" },
    { icon: GraduationCap, t: "Education and coaching", d: "Parents and students compare many options. Admission-intent search and lead ads fill batches.", h: "/meta-ads-agency-ahmedabad/education-coaching", n: "Meta ads for education and coaching" },
    { icon: Wrench, t: "Manufacturers and B2B", d: "Buyers search by product and specification. Catalogue SEO and an enquiry funnel bring RFQs.", h: "/seo/manufacturers-b2b-gujarat/", n: "SEO for manufacturers and B2B" },
    { icon: Dumbbell, t: "Home and local services", d: "Near me and emergency searches go to whoever shows up first. Local SEO and Google Ads win the call.", h: "/google-ads-agency-ahmedabad", n: "Google Ads agency in Ahmedabad" },
    { icon: Briefcase, t: "Professional services", d: "Trust decides the call. Reviews, expert content and focused ads build it.", h: "/services/digital-marketing/", n: "digital marketing services" },
  ];
  return (
    <section id="industries" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Who we serve" title={<>Industries we move the <span className="text-brand-orange">needle</span> for</>} />
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map(({ icon: Icon, t, d, h, n }) => (
            <a key={t} href={h} className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-brand-navy">{t}</h3>
              <p className="mt-1.5 flex-1 text-sm text-ink-muted">{d}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-orange">
                See how<span className="sr-only"> with {n}</span> <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Results & proof ---------------- */

const CASES: SliderCase[] = [
  {
    tag: "Local Business · Web + Booking System",
    color: "#1A6FE8",
    title: "Riant Bikes",
    href: "/case-studies/riant-bikes/",
    stats: [
      { num: "177", label: "Bookings processed through the new website" },
      { num: "₹1.6L+", label: "Revenue tracked inside the platform" },
      { num: "230", label: "Customers managed in one system" },
    ],
    problems: ["Every booking depended on someone answering the phone", "No idea which bike earned the most or sat idle", "Static pricing while weekend demand kept changing", "No digital record of bike condition at rental"],
    solutions: ["Built a new website with instant online booking", "Fleet management dashboard for demand, branches and revenue", "Customer database to spot and reward repeat renters", "Launched Google Ads for consistent daily bookings"],
  },
  {
    tag: "Industrial B2B · SEO & AEO/GEO",
    color: "#22C55E",
    title: "Prism Calibration Centre",
    href: "/case-studies/prism-calibration/",
    stats: [
      { num: "70–100", label: "Qualified leads every month" },
      { num: "Top 3", label: "Google rankings on major keywords" },
      { num: "AI Overview", label: "Featured in Google's AI answers" },
    ],
    problems: ["Strong expertise, but growth came from word-of-mouth only", "Outdated website with no search-friendly structure", "Enquiries untracked across multiple forms", "Legacy PBN backlinks and weak local signals"],
    solutions: ["Rebuilt the site for speed, SEO and scale", "Service → industry → instrument page architecture", "Pillar content, internal linking, schema and local SEO", "Optimised for AI search with AEO + GEO"],
  },
  {
    tag: "Healthcare & Fertility · SEO + YouTube",
    color: "#7C3AED",
    title: "IVF Clinic",
    href: "/case-studies/ivf-clinic/",
    stats: [
      { num: "+76.7%", label: "Organic website traffic growth in 6 months" },
      { num: "1 → 10", label: "Keywords ranking #1 on Google" },
      { num: "SEO + YouTube", label: "Two growth channels running together" },
    ],
    problems: ["No authority on Google despite being an industry leader", "Slow site; patients couldn't find treatment information", "Weaker competitors outranked them", "YouTube library with almost no reach"],
    solutions: ["Keyword research and a patient-first site rebuild", "Treatment pages, blogs and AIO/GEO pages with internal links", "CRO plus targeted Google Ads for quick leads", "YouTube SEO and a consistent short + long video schedule"],
  },
  {
    tag: "Home Services · Local SEO & AEO",
    color: "#FF6B2B",
    title: "DP Electrical Repairs",
    href: "/case-studies/dp-electrical-repairs/",
    stats: [
      { num: "10–15", label: "Qualified leads every day from the website" },
      { num: "3,000+", label: "Monthly website visitors, up from almost none" },
      { num: "200+", label: "Suburbs covered with local pages" },
    ],
    problems: ["Website generated almost no organic enquiries", "Growth capped by referrals only", "Shared paid leads led to a constant price war", "Lower-skilled competitors ranked higher"],
    solutions: ["A dedicated page for every repair service and brand", "Suburb-level pages covering 200+ local areas", "Local SEO and AEO built for “repair near me” searches", "Exit-intent callback popup to capture leaving visitors"],
  },
  {
    tag: "Custom Printing · Google Ads & Shopping",
    color: "#0891B2",
    title: "OBLPrint",
    href: "/case-studies/oblprint/",
    stats: [
      { num: "35", label: "WhatsApp click-to-chats in a month" },
      { num: "79.1%", label: "Optimization score, up from 31/100" },
      { num: "14.6%", label: "Click-through rate on top search keywords" },
    ],
    problems: ["Only 10% impression share; every landing page rated Poor by Google", "80+ keywords in one ad group, with no negative keywords", "Broken website migration left old URLs indexed", "Budget went out every month while the WhatsApp stayed silent"],
    solutions: ["Rebuilt the account into focused, product-specific campaigns", "Launched Google Shopping for stickers, banners and foam board", "Tracked WhatsApp chats, calls and form fills properly", "Removed wasted keywords and added negative keywords everywhere"],
  },
  {
    tag: "Hospitality & Restaurant · SEO & Social",
    color: "#c8952f",
    title: "The Grand Palace",
    href: "/case-studies/grand-palace/",
    stats: [
      { num: "1.26K+", label: "Visitors from Google search in 90 days" },
      { num: "+73%", label: "Instagram engagement growth" },
      { num: "+78.3%", label: "More Google Business Profile interactions" },
    ],
    problems: ["No website, so nowhere to send curious customers", "Venue hire and catering went unnoticed", "No online booking; every enquiry needed a phone call", "Invisible in search, so competitors were found first"],
    solutions: ["Built the restaurant's first digital front door", "Local SEO and Google Business Profile optimisation", "Pages for events, catering and banquet bookings", "Social media content to grow engagement"],
  },
];

function Results() {
  return (
    <section id="results" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 text-center">
          <SectionHeading
            eyebrow="Proven results"
            title={<>Real clients. <span className="text-brand-orange">Real growth.</span> Real results.</>}
            sub="Results from real businesses we handle SEO, ads and social media for."
          />
        </div>
        <CaseStudySlider items={CASES} />
        <div className="mt-8 text-center">
          <a href="/case-studies/" className="inline-flex items-center gap-2 rounded-full border-2 border-brand-orange px-6 py-3 text-sm font-bold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white">
            View All Case Studies <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function GSCSnapshots() {
  const slides = [gscSlideBfi, gscSlideKrisha, gscSlideTgp];
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));

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
        <SectionHeading eyebrow="Proof, not promises" title="Verified organic growth snapshots" sub="Real Google Search Console performance from active campaigns." />
        <div className="mx-auto mt-12 max-w-[1100px]">
          <Carousel opts={{ align: "center", loop: true }} plugins={[autoplay.current]} setApi={setApi} className="w-full">
            <CarouselContent className="ml-0">
              {slides.map((src, i) => (
                <CarouselItem key={i} className="basis-full pl-0">
                  <div
                    className={cn(
                      "da-shadow-card mx-auto overflow-hidden rounded-[18px] border border-brand-navy/10 bg-white transition-all duration-700 ease-out",
                      selected === i ? "scale-100 opacity-100" : "scale-[0.98] opacity-60",
                    )}
                  >
                    <img src={src} alt={`Google Search Console performance snapshot ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} decoding="async" width={800} height={335} className="h-auto w-full object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 xl:-left-14" />
            <CarouselNext className="right-2 xl:-right-14" />
          </Carousel>
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={cn("h-2.5 rounded-full transition-all duration-300", selected === i ? "w-7 bg-brand-orange" : "w-2.5 bg-brand-navy/20")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SAMPLE_AUDIT_PDF = "/downloads/Digital-Aura-Sample-SEO-Audit-Report.pdf";

function SampleAuditSnapshot() {
  return (
    <section id="sample-audit" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Sample report"
          title="See what a Digital Aura audit looks like"
          sub="Your growth audit looks at every channel. This sample shows the SEO part in full, with every finding and the plan that follows."
        />
        <Reveal className="mx-auto mt-12 max-w-[760px]">
          <a href={SAMPLE_AUDIT_PDF} download="Digital-Aura-Sample-SEO-Audit-Report.pdf" className="da-shadow-card block overflow-hidden rounded-[18px] border border-brand-navy/10 bg-white">
            <img src={sampleAuditPage1} alt="First page of the Digital Aura sample SEO audit report, with the client name hidden" width={1000} height={1049} loading="lazy" decoding="async" className="h-auto w-full object-contain" />
          </a>
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <PrimaryCTA href={SAMPLE_AUDIT_PDF} download="Digital-Aura-Sample-SEO-Audit-Report.pdf">
              Download the full sample report (PDF)
            </PrimaryCTA>
            <p className="text-sm text-ink-muted">31 pages, PDF. Downloads in this tab. For a Google Ads view, see our <a className="font-semibold text-brand-orange underline" href="/google-ads-audit-ahmedabad/">Google Ads audit</a>.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials (verified Google reviews) ---------------- */

const GMB_REVIEWS_URL = "https://share.google/4K6eW3tz4YaSyx0Zh";

const REVIEWS = [
  { n: "Darshil Shah", role: "Elegant Event Solutions", q: "We partnered with Digital Aura to enhance our online presence, and it has been a game-changer for our business! Digital Aura's SEO and digital marketing expertise have helped us generate qualified leads that actually convert into sales. Their team is proactive, knowledgeable, and truly understands our industry's needs." },
  { n: "Chintan Joshi", role: "Invisible Grills", q: "Digital Aura is an outstanding digital marketing company in Ahmedabad! They designed a fantastic website for our Invisible Grills business, then started lead generation campaigns on Meta Ads which brought us high-quality leads that immediately turned into business. We've also started receiving referrals from happy clients." },
  { n: "Tapan Joshi", role: "Invisible Grills", q: "Digital Aura has revolutionized our Invisible Grills business! Their lead generation strategies through Meta Ads were impeccable, delivering high-quality, consistent leads that swiftly converted into sales. We've witnessed significant growth from their campaigns, along with valuable referrals from satisfied customers." },
  { n: "Tirth Patel", role: "Website Redesign", q: "Digital Aura helped us streamline our online presence, improve our website's user experience, and boost our brand visibility. Standout features were the seamless integration of modern design elements, the user-friendly interface, and the attention to detail, plus a strong focus on SEO and mobile responsiveness." },
  { n: "Ketan Patel", role: "SEO & Digital Marketing", q: "Their team of experts took the time to understand our brand and goals, which showed in the highly targeted and effective campaigns they crafted for us. Their SEO strategy alone improved our search rankings significantly, driving more organic traffic to our site than we anticipated." },
  { n: "Vrukshal Shah", role: "Insurance Consultant", q: "Their team suggested an approach I hadn't considered: using webinars along with Meta Ads for lead generation. The people who attended were genuinely interested in my services, and the quality of leads improved significantly. I was no longer chasing uninterested prospects." },
  { n: "Bhavesh Patil", role: "Starline Advertising", q: "Digital Aura didn't just design a new website, they created the whole package: engaging content, eye-catching graphics, and a unified brand feel. We always knew what was going on, and they were happy to make any changes we requested. Super flexible and great listeners." },
];

function Testimonials() {
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
    <div>
      <Carousel opts={{ align: "start", loop: false }} setApi={setApi} aria-label="Client testimonials">
        <CarouselContent className="-ml-6">
          {REVIEWS.map((t) => (
            <CarouselItem key={t.n} className="basis-full pl-6 md:basis-1/2 lg:basis-1/3">
              <figure className="da-shadow-card flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-6">
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
                <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-ink">"{t.q}"</blockquote>
                <figcaption className="mt-5 border-t border-brand-navy/8 pt-4">
                  <div className="font-bold text-brand-navy">{t.n}</div>
                  <div className="text-sm text-ink-muted">{t.role}</div>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 xl:-left-12" />
        <CarouselNext className="right-2 xl:-right-12" />
      </Carousel>
      <div className="pillar-carousel-dots">
        {REVIEWS.map((t, i) => (
          <button
            key={t.n}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn("h-2.5 rounded-full transition-all", selected === i ? "w-7 bg-brand-orange" : "w-2.5 bg-brand-navy/20")}
          />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-ink-muted">
        Read more on our <a className="font-semibold text-brand-orange underline" href={GMB_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Google reviews</a> or the{" "}
        <a className="font-semibold text-brand-orange underline" href="/testimonials/">testimonials page</a>.
      </p>
    </div>
  );
}

/* ---------------- Pricing ---------------- */

/**
 * Monthly management fees, excluding GST and ad spend. Each range is built from the published service ranges:
 * SEO Rs 15,000 to 1,50,000 (Basic 15-25k, Growth 25-50k, Advance 50k-1.5L), Google Ads management Rs 15,000 to 60,000,
 * Meta Ads management Rs 15,000 to 60,000. Bundle ranges are derived from those, not separately confirmed by the owner.
 */
const DM_PLANS = [
  {
    name: "Digital Marketing Starter",
    fee: "₹30,000 – ₹55,000",
    best: "A clinic, shop or service business serving one city, with a small site and one main goal.",
    items: ["Growth audit and tracking set up", "SEO Basic scope: key page fixes, Google Business Profile, local citations", "One paid channel managed: Google Ads or Meta Ads", "Landing page and form check", "Monthly report on calls and enquiries"],
  },
  {
    name: "Digital Marketing Growth",
    fee: "₹55,000 – ₹1,00,000",
    best: "Businesses ready to compete on search and paid at the same time.",
    items: ["Everything in Starter", "SEO Growth scope: new service and location pages every month", "Google Ads and Meta Ads both managed", "Creative testing and conversion improvements", "Social media plan scoped in your quote", "Monthly review call"],
  },
  {
    name: "Digital Marketing Advance",
    fee: "₹1,00,000 – ₹2,70,000",
    best: "Large catalogues, several locations, export projects and crowded markets.",
    items: ["Everything in Growth", "SEO Advance scope: larger content, link and AI search programme", "Larger multi-campaign ad management", "Multi-location or multi-language scope", "A named lead and quarterly strategy reviews"],
  },
];

const SERVICE_PRICES = [
  { s: "SEO", p: "₹15,000 – ₹1,50,000 per month", n: "Three plans: Basic, Growth and Advance", href: "/seo/pricing-ahmedabad/", l: "SEO packages and pricing" },
  { s: "Google Ads management", p: "₹15,000 – ₹60,000 per month", n: "Ad spend is paid to Google separately", href: "/google-ads-pricing-ahmedabad/", l: "Google Ads pricing and calculator" },
  { s: "Meta Ads management", p: "₹15,000 – ₹60,000 per month", n: "Ad spend is paid to Meta separately", href: "/meta-ads-agency-ahmedabad/pricing", l: "Meta Ads pricing" },
  { s: "Website and landing pages", p: "Fixed written quote", n: "Starter, Business, Growth and Custom packages", href: "/website-packages-ahmedabad/", l: "Website packages" },
  { s: "Social media marketing", p: "Scoped in your quote", n: "Depends on the number of platforms and posts", href: "/social-media-marketing-agency-ahmedabad/", l: "Social media marketing" },
];

function PlanTable() {
  return (
    <Reveal className="mt-12">
      <div className="mx-auto max-w-6xl space-y-4 md:hidden">
        {DM_PLANS.map((pl) => (
          <div key={pl.name} className="da-shadow-card rounded-2xl border border-brand-navy/12 bg-white p-5">
            <h3 className="text-lg font-extrabold text-brand-navy">{pl.name}</h3>
            <p className="mt-1 text-xl font-extrabold text-brand-navy">{pl.fee} <span className="text-xs font-medium text-ink-muted">per month, plus GST</span></p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pl.best}</p>
            <ul className="mt-3 space-y-2">
              {pl.items.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto hidden max-w-6xl overflow-x-auto rounded-2xl border border-brand-navy/12 bg-white da-shadow-card md:block">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Digital marketing plans in Ahmedabad with monthly management fee ranges, excluding GST and ad spend</caption>
          <thead>
            <tr className="bg-brand-orange-soft text-brand-navy">
              <th scope="col" className="w-[18%] p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Plan</th>
              <th scope="col" className="w-[18%] p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Monthly fee</th>
              <th scope="col" className="w-[24%] p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Best for</th>
              <th scope="col" className="p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">What is included</th>
            </tr>
          </thead>
          <tbody>
            {DM_PLANS.map((pl) => (
              <tr key={pl.name} className="border-t border-brand-navy/10 align-top">
                <th scope="row" className="p-4 text-base font-extrabold text-brand-navy">{pl.name}</th>
                <td className="p-4">
                  <span className="block text-lg font-extrabold text-brand-navy">{pl.fee}</span>
                  <span className="text-xs text-ink-muted">per month, plus GST</span>
                </td>
                <td className="p-4 text-sm leading-relaxed text-ink-muted">{pl.best}</td>
                <td className="p-4">
                  <ul className="space-y-2">
                    {pl.items.map((x) => (
                      <li key={x} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />{x}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-ink-muted">
        These prices are for businesses in Ahmedabad; projects in other cities or countries are quoted separately. Fees are monthly management fees and exclude GST and your ad spend, which you pay directly to Google and Meta. Your exact fee is set in a written quote after the free growth audit, and it lists the work it covers. No ranking or lead count is guaranteed on any plan.
      </p>
    </Reveal>
  );
}

function DigitalMarketingPricing() {
  const drivers = [
    { t: "How many channels you need", d: "SEO alone is a smaller scope than SEO, Google Ads, Meta Ads and social media together." },
    { t: "How strong your competition is", d: "A crowded market needs more content, more testing and more budget management." },
    { t: "The health of your website", d: "A site with technical or tracking problems needs fixing before marketing can pay back." },
    { t: "Locations, languages and catalogue size", d: "More services, areas and products mean more pages and campaigns to build and run." },
  ];
  const includes = ["A written scope with named deliverables", "Reporting on calls, forms and leads, not just clicks", "Access to your own ad accounts, Analytics and Business Profile", "Contract and notice terms you can read before you sign"];
  const excludes = ["A guaranteed ranking, lead count or fixed number of days", "Hidden add-ons that appear in a later invoice", "A standard package chosen before anyone looks at your business"];
  return (
    <section id="digital-marketing-pricing" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Digital marketing pricing in Ahmedabad: <span className="text-brand-orange">what to expect</span></>}
          sub="Three plans, from ₹30,000 to ₹2,70,000 a month. Where you land inside a range depends on four things, and the final fee is written after we have looked at your business."
        />
        <PlanTable />
        <h3 className="mx-auto mt-14 max-w-3xl text-center text-xl font-extrabold text-brand-navy md:text-2xl">What decides where you land in the range</h3>
        <Reveal className="pillar-cols-4 mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {drivers.map((x, i) => (
            <div key={x.t} className="da-shadow-card da-card-hover flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-orange-soft text-sm font-extrabold text-brand-orange">0{i + 1}</span>
              <h3 className="mt-4 text-base font-bold leading-snug text-brand-navy">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{x.d}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="da-shadow-card rounded-2xl border border-brand-navy/12 bg-white p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-50 text-green-600"><Check className="h-5 w-5" /></span>
              <h3 className="text-lg font-bold text-brand-navy">A fair digital marketing quote should include</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {includes.map((x) => (
                <li key={x} className="flex gap-3 text-sm leading-relaxed text-ink-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="da-shadow-card rounded-2xl border border-brand-navy/12 bg-white p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-50 text-red-500"><X className="h-5 w-5" /></span>
              <h3 className="text-lg font-bold text-brand-navy">It should not include</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {excludes.map((x) => (
                <li key={x} className="flex gap-3 text-sm leading-relaxed text-ink-muted"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="pillar-btn-row pillar-btn-row--center">
          <PrimaryCTA href="#audit">Get a free audit and a written quote</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

function PriceByService() {
  return (
    <section id="price-by-service" className="bg-surface-2">
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Price by service"
          title="Only need one channel? Here is what each costs"
          sub="Each service has its own pricing page with what is included and what is not."
        />
        <Reveal className="mt-10 grid gap-4 md:grid-cols-2">
          {SERVICE_PRICES.map((x) => (
            <a key={x.s} href={x.href} className="da-shadow-card da-card-hover group flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-6">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">{x.s}</span>
              <span className="mt-2 text-xl font-extrabold text-brand-navy">{x.p}</span>
              <span className="mt-1 flex-1 text-sm text-ink-muted">{x.n}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-orange group-hover:gap-2">
                {x.l} <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-muted">
          Prices are monthly, exclude GST and are for businesses in Ahmedabad. Read what the market charges in our guides to{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/seo-cost-in-ahmedabad/">SEO cost in Ahmedabad</a>,{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/meta-ads-cost-in-ahmedabad/">Meta ads cost in Ahmedabad</a> and{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/website-development-cost-ahmedabad-guide/">website development cost in Ahmedabad</a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Why us, compare, choose ---------------- */

function WhyChooseUs() {
  const items = [
    { icon: FileBarChart, t: "Transparent reporting", d: "No vanity dashboards. You see what was done and what it moved." },
    { icon: Users, t: "One team, every channel", d: "SEO, ads and social media planned together, with one monthly call." },
    { icon: Bot, t: "Built for AI search", d: "Pages and business details structured so AI assistants can understand and cite you." },
    { icon: FileCode2, t: "Tracking first", d: "Calls, forms and WhatsApp clicks are measured before budget goes up." },
    { icon: MapPinned, t: "Local Ahmedabad focus", d: "An in-house team at our Hanspura office who know the local market." },
    { icon: BarChart3, t: "Data-driven decisions", d: "Every recommendation is backed by your own numbers, not opinion." },
    { icon: Briefcase, t: "Business-focused", d: "We optimise for enquiries and revenue, not impressions and likes." },
    { icon: TrendingUp, t: "Monthly growth plan", d: "A living roadmap that changes as your market and competitors move." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Why Digital Aura"
          title={<>Why businesses choose <span className="text-brand-orange">Digital Aura</span></>}
          sub="Real reasons businesses across Ahmedabad pick us as their digital marketing company."
        />
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon, t, d }) => (
            <IconCard key={t} icon={icon} t={t} d={d} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Compare() {
  const rows: [string, boolean, boolean | string][] = [
    ["SEO, ads and social planned together", true, false],
    ["AI search (AEO and GEO) included", true, false],
    ["Calls, forms and WhatsApp tracked", true, "Often missing"],
    ["Pricing shown before you call", true, false],
    ["Monthly report on leads and cost per lead", true, "Vanity dashboards"],
    ["You own your ad accounts and data", true, "Not always"],
    ["Senior strategist on every account", true, false],
    ["Guaranteed rankings or fixed lead counts", false, true],
  ];
  return (
    <section id="compare" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="The difference"
          title={<>Digital Aura vs. a <span className="text-brand-orange">typical agency</span></>}
          sub="See why businesses comparing digital marketing companies in Ahmedabad choose Digital Aura."
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
            <div key={label} className={`grid grid-cols-[1.4fr_1fr_1fr] px-4 text-sm transition-colors md:px-8 md:text-base ${i % 2 ? "bg-white" : "bg-surface-2/40"}`}>
              <div className="flex items-center py-4 pr-3 font-semibold text-ink md:py-5">{label}</div>
              <div className="flex h-full items-center justify-center bg-brand-orange-soft/50 py-4 md:py-5">
                {a ? (
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

function ChooseAgency() {
  const flags = [
    "Guarantees page-one rankings or a fixed number of leads",
    "Will not give you access to your own ad accounts, Analytics or Business Profile",
    "Reports clicks and likes, but no calls, forms or leads",
    "Cannot tell you who will actually work on your account",
    "Quotes a standard package before looking at your business",
    "Has no written scope, contract terms or sample report",
  ];
  const questions = [
    "Who will work on my account, and are they in-house?",
    "Will I own the ad accounts, content and data if I leave?",
    "How do you report leads and cost per lead?",
    "What will you fix in the first 30 days?",
    "Can I see a sample monthly report?",
    "What are the contract and notice terms?",
  ];
  return (
    <section id="choose" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Choosing an agency"
          title={<>How to choose the best <span className="text-brand-orange">digital marketing agency</span> in Ahmedabad</>}
          sub="Whether you pick a digital marketing company in Ahmedabad like us or shortlist the top digital marketing companies in Ahmedabad, use this checklist. It will save you months and money."
        />
        <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="da-shadow-card rounded-2xl border border-brand-navy/12 bg-white p-7">
            <h3 className="text-lg font-bold text-brand-navy">Red flags to walk away from</h3>
            <ul className="mt-4 space-y-3">
              {flags.map((x) => (
                <li key={x} className="flex gap-3 text-sm text-ink-muted"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="da-shadow-card rounded-2xl border border-brand-navy/12 bg-white p-7">
            <h3 className="text-lg font-bold text-brand-navy">Questions to ask any agency</h3>
            <ul className="mt-4 space-y-3">
              {questions.map((x) => (
                <li key={x} className="flex gap-3 text-sm text-ink-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-muted">
          Comparing the best digital marketing companies in Ahmedabad, or a top digital marketing agency in Ahmedabad? Ask each one the questions above and check their Google reviews and case studies. We may not be the right fit if you need guaranteed rankings within weeks or have no plan to act on what the audit finds. For a deeper checklist, read{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/how-to-choose-google-ads-agency-ahmedabad/">how to choose a Google Ads agency</a> and{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/how-to-choose-seo-company-ahmedabad/">how to choose an SEO company</a>.
        </p>
      </div>
    </section>
  );
}

function ChannelCompare() {
  const rows = [
    ["Speed to first leads", "Days to weeks", "Days to weeks", "Usually 3 to 6 months"],
    ["Best for", "People searching right now", "Creating demand and reach", "Steady, long-term lead flow"],
    ["When you stop paying", "Leads stop", "Leads stop", "Pages can keep ranking"],
    ["Where it works", "Google Search", "Facebook and Instagram", "Google, Maps and AI answers"],
  ];
  return (
    <section id="channel-compare" className="bg-white">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Which channel first?"
          title="Google Ads vs Meta Ads vs SEO for Ahmedabad businesses"
          sub="They solve different problems. Most growing businesses end up using all three, in a sensible order."
        />
        <Reveal className="da-shadow-card mt-10 overflow-x-auto rounded-2xl border border-brand-navy/12 bg-white">
          <table className="w-full text-left text-[13px] sm:text-sm">
            <thead className="bg-surface-2 text-brand-navy">
              <tr>
                <th className="px-3 py-3 font-bold sm:px-5"> </th>
                <th className="px-3 py-3 font-bold sm:px-5">Google Ads</th>
                <th className="px-3 py-3 font-bold sm:px-5">Meta Ads</th>
                <th className="px-3 py-3 font-bold sm:px-5">SEO</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, a, b, c]) => (
                <tr key={k} className="border-t border-brand-navy/10">
                  <td className="px-3 py-3 font-semibold text-brand-navy sm:px-5">{k}</td>
                  <td className="px-3 py-3 text-ink-muted sm:px-5">{a}</td>
                  <td className="px-3 py-3 text-ink-muted sm:px-5">{b}</td>
                  <td className="px-3 py-3 text-ink-muted sm:px-5">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-6 text-center text-ink-muted">
          Want the longer version? Read{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/google-ads-vs-meta-ads-ahmedabad/">Google Ads vs Meta Ads in Ahmedabad</a> and{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/seo-vs-paid-ads-which-first-ahmedabad/">SEO or paid ads first</a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Areas, services and guides ---------------- */

function AreasAndServices() {
  const areas = [
    "SG Highway & Bodakdev",
    "Satellite & Prahlad Nagar",
    "Navrangpura & CG Road",
    "Maninagar & Vastral",
    "Naroda & Vatva industrial areas",
    "Hanspura & SP Ring Road",
    "Gandhinagar & wider Gujarat",
  ];
  const services = [
    { t: "SEO Services in Ahmedabad", href: "/seo-services-ahmedabad" },
    { t: "Google Ads Agency in Ahmedabad", href: "/google-ads-agency-ahmedabad" },
    { t: "Meta Ads Agency in Ahmedabad", href: "/meta-ads-agency-ahmedabad/" },
    { t: "Social Media Marketing Agency", href: "/social-media-marketing-agency-ahmedabad/" },
    { t: "Advertising Agency in Ahmedabad", href: "/advertising-agency-ahmedabad/" },
    { t: "Website Development Services", href: "/website-development-services-ahmedabad/" },
    { t: "Local SEO", href: "/services/seo-content-marketing/local-seo/" },
    { t: "Conversion Rate Optimisation", href: "/services/cro/" },
    { t: "Free SEO Audit", href: "/seo/free-audit/" },
    { t: "Google Ads Audit", href: "/google-ads-audit-ahmedabad/" },
    { t: "Digital Marketing Agency in Gujarat", href: "/digital-marketing-agency-gujarat/" },
    { t: "Service Areas We Cover", href: "/service-areas/" },
  ];
  return (
    <section id="areas" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Where we work</SectionLabel>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-brand-navy md:text-[28px]">Digital marketing for businesses across Ahmedabad</h3>
            <p className="mt-4 text-lg text-ink-muted">
              Customers in Ahmedabad search by area, so your pages, Google Business Profile and ads should too. We work with businesses in:
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy/12 bg-surface-2 px-3.5 py-1.5 text-sm font-semibold text-brand-navy">
                  <MapPin className="h-3.5 w-3.5 text-brand-orange" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-muted">
              See every city we cover on our <a className="font-semibold text-brand-orange underline" href="/service-areas/">service areas page</a>.
            </p>
          </div>
          <div>
            <SectionLabel>Digital marketing in detail</SectionLabel>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-brand-navy md:text-[28px]">Explore each service</h3>
            <p className="mt-4 text-lg text-ink-muted">Want to see exactly what is included? Each service has its own page.</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {services.map((x) => (
                <li key={x.href}>
                  <a href={x.href} className="da-card-hover flex items-center justify-between rounded-xl border border-brand-navy/12 bg-white px-4 py-3 text-sm font-bold text-brand-navy">
                    {x.t}
                    <ArrowRight className="h-4 w-4 text-brand-orange" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketingGuides() {
  const guides = [
    { t: "What SEO costs in Ahmedabad", d: "Monthly fees, what decides the price and how to compare quotes.", href: "/blog/seo-cost-in-ahmedabad/" },
    { t: "Meta ads cost in Ahmedabad", d: "Management fee, ad spend and what changes the price.", href: "/blog/meta-ads-cost-in-ahmedabad/" },
    { t: "Website development cost in Ahmedabad", d: "What a website costs and what you should expect for the price.", href: "/blog/website-development-cost-ahmedabad-guide/" },
    { t: "How to choose a Google Ads agency", d: "Questions to ask and red flags to watch for.", href: "/blog/how-to-choose-google-ads-agency-ahmedabad/" },
    { t: "Google Ads vs Meta Ads", d: "Which brings more leads for an Ahmedabad business, and when to use both.", href: "/blog/google-ads-vs-meta-ads-ahmedabad/" },
    { t: "SEO or Google Ads first", d: "A simple way to decide where the first rupee should go.", href: "/blog/seo-vs-paid-ads-which-first-ahmedabad/" },
    { t: "Google Ads clicks but no leads", d: "The usual causes and how to fix them.", href: "/blog/google-ads-clicks-but-no-leads-fixes/" },
    { t: "SEO audit checklist before hiring", d: "Check indexing, speed, on-page and tracking yourself first.", href: "/blog/seo-audit-checklist-before-hiring-agency/" },
    { t: "Website features that generate leads", d: "What a website needs to turn visitors into enquiries.", href: "/blog/website-features-that-generate-leads/" },
    { t: "How SEO works in 2026", d: "What changed with AI Overviews, and what still matters.", href: "/blog/seo-in-2026-ai-era/" },
    { t: "Local SEO strategies for 2026", d: "Maps, citations and reviews for local businesses.", href: "/blog/local-seo-strategies-2026/" },
    { t: "How to choose an SEO company", d: "12 questions to ask and the red flags to watch for.", href: "/blog/how-to-choose-seo-company-ahmedabad/" },
  ];
  return (
    <section id="guides" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Marketing guides"
          title="Learn how digital marketing works before you hire anyone"
          sub="Plain-English guides from our team. Read them to judge any proposal, ours included."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.href}>
              <a href={g.href} className="da-card-hover block h-full rounded-2xl border border-brand-navy/12 bg-white p-5">
                <span className="block text-base font-bold text-brand-navy">{g.t}</span>
                <span className="mt-1 block text-sm text-ink-muted">{g.d}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
                  Read the guide <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-ink-muted">
          More guides are on the <a className="font-semibold text-brand-orange underline" href="/blog/">Digital Aura blog</a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS = [
  {
    q: "What does a digital marketing company in Ahmedabad do?",
    a: "It plans and runs the channels that bring customers online: SEO, Google Ads, Meta Ads, social media and the website they send people to. At Digital Aura one team handles all of them, tracks calls, forms and WhatsApp clicks, and reports what each channel produced every month.",
  },
  {
    q: "How much does digital marketing cost in Ahmedabad?",
    a: "Our digital marketing plans run from ₹30,000 to ₹2,70,000 a month plus GST: Starter ₹30,000–₹55,000, Growth ₹55,000–₹1,00,000 and Advance ₹1,00,000–₹2,70,000. Ad spend is separate and is paid to Google or Meta from your own account. After a free growth audit you get the exact fee in writing, with no hidden add-ons.",
  },
  {
    q: "What is the price of each service on its own?",
    a: "SEO is ₹15,000 to ₹1,50,000 a month. Google Ads management is ₹15,000 to ₹60,000 a month and Meta Ads management is ₹15,000 to ₹60,000 a month, all plus GST and excluding ad spend. Website projects are a fixed written quote, and social media marketing is scoped in your quote. Each service has its own pricing page.",
  },
  {
    q: "Which channel should I start with: SEO, Google Ads or Meta Ads?",
    a: "If people already search for what you sell, start with Google Ads for faster leads while SEO builds. If you sell something people do not search for yet, Meta Ads can create demand. Most businesses end up using all three. The free growth audit tells you which to switch on first.",
  },
  {
    q: "How long before I see results?",
    a: "Paid ads can bring first leads within weeks once tracking and landing pages are ready. SEO usually shows early movement in 30 to 45 days and meaningful lead growth from about month 3. We do not promise a ranking or lead count, and we report progress every month.",
  },
  {
    q: "Is ad spend included in your fee?",
    a: "No. Our fee covers the work of planning, running and improving your campaigns. Your ad budget is paid directly to Google or Meta from your own ad account, so you can see every rupee. We keep the two clearly separate in your quote.",
  },
  {
    q: "Do you offer digital marketing for small businesses in Ahmedabad?",
    a: "Yes. Our Starter plan is built for a clinic, shop or service business serving one city with a small site. We focus on the few things that bring enquiries first: Google Business Profile, key pages and one paid channel, then add more as results come in.",
  },
  {
    q: "Are there long-term contracts?",
    a: "The contract length and notice period are written in your proposal before you decide, so there is nothing hidden. SEO takes months to build, so we are honest that very short trials rarely show the full picture.",
  },
  {
    q: "Who will work on my account?",
    a: "An in-house team at our Hanspura office, led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. Satish Prajapati (Digital Marketing Expert) coordinates the work, Jinali Lodariya (SEO Executive) handles SEO, and Bhavesh Bhavsar, Krishna Jani and Diya Mahida (Digital Marketing Executives) support campaigns, local listings and reporting. You can meet them on this page.",
  },
  {
    q: "Do you offer AI workflow automation?",
    a: "Yes. We set up instant lead follow-up, CRM routing, WhatsApp and email follow-ups and live dashboards so no enquiry goes cold. It usually takes 1 to 2 weeks to set up and works alongside your SEO and ads. It is scoped in your written quote.",
  },
  {
    q: "Do you do AI search optimisation (AEO and GEO)?",
    a: "Yes. It is part of our SEO work. We structure pages with clear answers, add schema and entity details, and build topic coverage so your business is easier for Google AI Overviews, ChatGPT, Gemini and Perplexity to understand. Nobody controls what an AI answer says, so we do not promise citations.",
  },
  {
    q: "How do you measure success?",
    a: "By leads, not just clicks: calls, form fills, WhatsApp messages and qualified enquiries, tracked through Search Console, Analytics and your ad accounts. We report cost per lead by channel every month, with rankings and traffic as supporting numbers.",
  },
  {
    q: "What is included in the free growth audit?",
    a: "A review of your website and tracking, SEO and Google Business Profile, Google Ads and Meta Ads accounts if you have them, competitor and keyword gaps, and a 90-day roadmap that ranks the channels by priority. A senior strategist walks you through it, and you keep the plan whether or not you work with us.",
  },
  {
    q: "Can you take over from my current agency?",
    a: "Yes. We begin with an access and history check: ad accounts, Search Console, Analytics and any past penalties. Then we keep what is working and fix what is not, without disrupting the leads you already get.",
  },
  {
    q: "Do you guarantee #1 rankings or a fixed number of leads?",
    a: "No serious agency can. What we commit to is process: proper tracking, clean campaigns, strong pages, AI-search readiness, transparent monthly reporting and a senior strategist on every account.",
  },
  {
    q: "Which industries do you work with?",
    a: "Healthcare, manufacturing, hospitality, real estate, education, home services, eCommerce and professional services across Ahmedabad and Gujarat, plus clients across India. Industry pages for SEO and Meta Ads show how we approach each one.",
  },
  {
    q: "Do you work only with businesses in Ahmedabad?",
    a: "Mostly, and our pricing on this page is for Ahmedabad businesses. We also work with clients in other cities and countries, and quote those projects separately after the audit.",
  },
  {
    q: "Which is the best digital marketing agency in Ahmedabad?",
    a: "There is no official ranking of the top digital marketing company in Ahmedabad, and any agency calling itself number one is marketing itself. Judge on proof: named case studies, real Google reviews, written pricing and monthly reporting on calls and enquiries. Digital Aura is rated 4.9 on Google from 34 reviews, publishes its pricing and case studies, and offers a free growth audit so you can judge before you spend.",
  },
  {
    q: "What is the difference between a digital marketing company, agency and firm?",
    a: "In practice, nothing. A digital marketing company, a digital marketing agency, a digital agency, an online marketing agency in Ahmedabad and an online marketing company in Ahmedabad all plan and run SEO, ads, social media and the website for you. Internet marketing in Ahmedabad is the older name for the same work. What matters is the team, the tracking and the proof, not the label.",
  },
  {
    q: "What should a top digital marketing agency in Ahmedabad offer?",
    a: "A top digital marketing agency in Ahmedabad should run SEO, Google Ads, Meta Ads and social media as one plan, track calls, forms and WhatsApp enquiries, and send a monthly report you can read without a dictionary. It should show real case studies and Google reviews, quote in writing, and let you keep your ad accounts and data.",
  },
  {
    q: "Should I hire a digital marketer in Ahmedabad or a digital marketing agency?",
    a: "A single digital marketer is a good fit for a small, steady workload on one channel. A digital marketing agency in Ahmedabad suits you when you need SEO, ads, tracking and design working together, because one person rarely covers all of them. You also avoid the cost and risk of a full-time hire.",
  },
];

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // Static, hard-coded content only (the FAQ list above), no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQ() {
  return (
    <PillarSection id="faq" tone="white" eyebrow="FAQs" title="Answers to what business owners ask first">
      <PillarFaq items={FAQS} />
    </PillarSection>
  );
}

/* ---------------- Map, final CTA, floating widgets ---------------- */

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4042735126313!2d72.6881782!3d23.082292199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83bdb5cc83a9%3A0xcbe9af162f4cdebc!2sDigital%20Aura!5e0!3m2!1sen!2sin!4v1792055176408!5m2!1sen!2sin";

function WhatsAppIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.5 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42z" />
    </svg>
  );
}

function OfficeMap() {
  const rows = [
    { Icon: Phone, label: "Call us", value: "+91 81412 00284", href: "tel:+918141200284" },
    { Icon: MessageCircle, label: "WhatsApp", value: "Message us", href: "https://wa.me/918141200284" },
    { Icon: Mail, label: "Email", value: "info@thedigitalaura.com", href: "mailto:info@thedigitalaura.com" },
  ];
  return (
    <div id="visit-us" className="mt-14 border-t border-white/15 pt-12">
      <div className="pillar-head !mb-8">
        <span className="pillar-eyebrow">Find us</span>
        <h3 className="mt-3 text-2xl font-extrabold text-white md:text-[28px]">Talk to us, or drop in at our Hanspura office</h3>
      </div>
      <div>
        <Reveal className="da-shadow-card grid overflow-hidden rounded-2xl border border-white/10 bg-white md:grid-cols-[1.5fr_1fr]">
          <div className="relative min-h-[300px] bg-surface-2 md:min-h-[420px]">
            <iframe
              src={MAPS_EMBED}
              title="Digital Aura office on Google Maps: 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad"
              width="600"
              height="450"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="flex flex-col p-6 md:p-8">
            <h3 className="text-xl font-extrabold text-brand-navy">Talk to us</h3>
            <ul className="mt-5 space-y-4">
              {rows.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} className="group flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-orange-soft text-brand-orange"><Icon className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
                      <span className="block truncate text-sm font-bold text-brand-navy group-hover:text-brand-orange">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-brand-navy/10 pt-5 text-sm text-ink-muted">
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /><span>713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad, Gujarat 382330</span></p>
              <p className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /><span>Monday to Saturday, 10 AM to 7 PM. Closed on Sunday.</span></p>
            </div>
            <div className="mt-6 md:mt-auto md:pt-6">
              <PrimaryCTA href="#audit" className="w-full">Request the free growth audit</PrimaryCTA>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="pillar-section pillar-section--navy">
      <div className="pillar-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionLabel>Ready when you are</SectionLabel>
            <h2 className="mt-3 mb-5 font-extrabold leading-tight text-white [font-size:clamp(26px,2.8vw,34px)]">
              See the plan before you spend a rupee: <span className="text-brand-orange">your free growth audit</span>.
            </h2>
            <p className="max-w-xl text-[17px] leading-relaxed text-white/80">
              A free, no-obligation review of your website, tracking, search visibility and ad accounts, with a 90-day roadmap ranked by what will bring enquiries fastest. Walked through by a senior strategist, not a junior reading a template.
            </p>
            <div className="pillar-btn-row mt-7">
              <PrimaryCTA href="#audit">Get My Free Growth Audit</PrimaryCTA>
              <a href="https://wa.me/918141200284" target="_blank" rel="noopener" className="pillar-btn pillar-btn--ghost-light">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
          <div>
            <LeadForm idPrefix="cta" withAnchor={false} />
          </div>
        </div>
        <OfficeMap />
      </div>
    </section>
  );
}

function FloatingWhatsApp() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 hidden flex-col items-center gap-3 md:flex">
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        tabIndex={showTop ? 0 : -1}
        className={`grid h-12 w-12 place-items-center rounded-full bg-brand-navy text-white shadow-[0_8px_22px_-6px_rgba(30,27,75,0.5)] transition hover:scale-105 ${showTop ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <a
        href="https://wa.me/918141200284"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="da-focus-ring grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(37,211,102,0.55)] transition hover:scale-105"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

function MobileStickyCTA() {
  return (
    <div className="pillar-mobilebar">
      <a href="#audit" className="bg-primary text-primary-foreground">
        Free Audit
      </a>
      <a href="tel:+918141200284" className="border border-brand-navy/20 bg-white text-brand-navy">
        <Phone className="mr-1.5 h-4 w-4" /> Call
      </a>
      <a href="https://wa.me/918141200284" target="_blank" rel="noopener" className="bg-[#25D366] text-white">
        <WhatsAppIcon className="mr-1.5 h-4 w-4" /> WhatsApp
      </a>
    </div>
  );
}

/* ---------------- Page ---------------- */

const SUBNAV = [
  { href: "#overview", label: "Overview" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#results-proof", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

function Index() {
  return (
    <div className="pillar-page min-h-screen bg-white pb-20 md:pb-0">
      <LocalBusinessSchema />
      <PageSchema />
      <PeopleSchema />
      <FAQSchema />
      <Toaster position="top-center" richColors />
      <MainSiteNavbar />
      <main className="pt-[72px]">
        {/* 1. Hero + trust strip */}
        <Hero />
        <TrustStrip />
        <PillarSubNav items={SUBNAV} />

        {/* 2. Overview */}
        <PillarSection id="overview" tone="white" bare noHead>
          <QuickAnswer />
          <div className="mt-12"><AIShift /></div>
        </PillarSection>

        {/* 3. Problems we solve */}
        <PillarSection id="problems" tone="light" eyebrow="Problems we solve" title="Why your marketing isn't bringing leads, and how we fix it">
          <PillarTabs
            label="Problems we solve"
            tabs={[
              { id: "visibility", label: "The real problem", content: <Problem /> },
              { id: "challenges", label: "Marketing challenges we solve", content: <MarketingChallenges /> },
            ]}
          />
        </PillarSection>

        {/* 4. Services */}
        <PillarSection id="services" tone="white" eyebrow="What's included" title="Our digital marketing services">
          <PillarTabs
            label="Digital marketing services"
            tabs={[
              { id: "scope", label: "Digital marketing services", content: <ServicesScope /> },
              { id: "automation", label: "AI workflow automation", content: <AutomationSection /> },
              { id: "framework", label: "9-part framework", content: <Framework /> },
            ]}
          />
        </PillarSection>

        {/* 5. Process */}
        <PillarSection id="process" tone="light" eyebrow="Our process" title="How we work, and what happens in the first 90 days">
          <PillarTabs
            label="Process"
            tabs={[
              { id: "how", label: "How we plan and run it", content: <Process /> },
              { id: "90days", label: "First 90 days", content: <First90Days /> },
            ]}
          />
        </PillarSection>

        {/* 6. Tools, tracking and platforms */}
        <PillarSection id="tools" tone="white" eyebrow="Tools & tracking" title="The tools, tracking and platforms behind every account">
          <PillarTabs
            label="Tools, tracking and platforms"
            tabs={[
              { id: "tools", label: "Tools we use", content: <ToolsWeUse /> },
              { id: "reporting", label: "Tracking & reporting", content: <Reporting /> },
              { id: "platforms", label: "Certified platforms", content: <CertifiedTrusted /> },
            ]}
          />
        </PillarSection>

        {/* 7. Industries */}
        <PillarSection tone="light" bare noHead>
          <Industries />
        </PillarSection>

        {/* 8. Results & proof */}
        <PillarSection id="results-proof" tone="white" bare noHead>
          <Results />
          <div className="mt-16"><GSCSnapshots /></div>
          <div className="mt-16"><SampleAuditSnapshot /></div>
        </PillarSection>

        {/* 9. Testimonials */}
        <PillarSection id="testimonials" tone="light" bare eyebrow="What clients say" title="Loved by founders who care about outcomes">
          <Testimonials />
        </PillarSection>

        {/* 10. Pricing, comparison */}
        <PillarSection id="pricing" tone="white" eyebrow="Pricing & comparison" title="Digital marketing pricing, and how we compare">
          <PillarTabs
            label="Pricing and comparison"
            tabs={[
              { id: "pricing", label: "Digital marketing pricing", content: <DigitalMarketingPricing /> },
              { id: "by-service", label: "Price by service", content: <PriceByService /> },
              { id: "why", label: "Why Digital Aura", content: <WhyChooseUs /> },
              { id: "compare", label: "Us vs a typical agency", content: <Compare /> },
              { id: "choose", label: "How to choose", content: <ChooseAgency /> },
              { id: "channels", label: "Which channel first", content: <ChannelCompare /> },
            ]}
          />
        </PillarSection>

        {/* 11. Team */}
        <PillarSection tone="light" bare noHead>
          <TeamSection />
        </PillarSection>

        {/* Link cards before FAQ */}
        <PillarSection id="explore" tone="white" eyebrow="Keep exploring" title="Areas we cover, service pages and marketing guides">
          <PillarTabs
            label="Explore"
            tabs={[
              { id: "areas", label: "Areas & service pages", content: <AreasAndServices /> },
              { id: "guides", label: "Marketing guides", content: <MarketingGuides /> },
            ]}
          />
        </PillarSection>

        {/* 12. FAQ (always open) */}
        <FAQ />

        {/* 13. Final CTA + contact */}
        <FinalCTA />
      </main>
      <MainSiteFooter />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </div>
  );
}
