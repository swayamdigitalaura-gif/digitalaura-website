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
  ArrowUp,
  Download,
} from "lucide-react";
import digitalAuraLogo from "@/assets/brand/digital-aura-logo.png";
import googlePlatformLogo from "@/assets/platform-logos/google-logo.png";
import sampleAuditPage1 from "@/assets/sample-seo-audit-page1.webp";
import semrushLogo from "@/assets/tool-logos/semrush.png";
import ahrefsLogo from "@/assets/tool-logos/ahrefs.png";
import screamingFrogLogo from "@/assets/tool-logos/screaming-frog.png";
import surferSeoLogo from "@/assets/tool-logos/surfer-seo.png";
import localFalconLogo from "@/assets/tool-logos/local-falcon.jpg";
import dataForSeoLogo from "@/assets/tool-logos/dataforseo.png";
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
import "@/pillar-pages.css";
import {
  InPillarContext,
  PillarFaq,
  PillarSection,
  PillarSubNav,
  PillarTabs,
  useInPillar,
} from "@/components/pillar/Pillar";

export const Route = createFileRoute("/seo-services-ahmedabad")({
  head: () => ({
    meta: [
      { title: "SEO Company in Ahmedabad | Digital Aura" },
      {
        name: "description",
        content:
          "Ahmedabad SEO company for local, technical and AI search. A clear 90-day plan, monthly lead reporting and a free SEO audit. Get yours today.",
      },
      {
        name: "keywords",
        content:
          "Best SEO Company in Ahmedabad, SEO Expert in Ahmedabad, SEO Services Agency in Ahmedabad, SEO Companies in Ahmedabad, Leading SEO Company in Ahmedabad, AI Powered SEO Services in Ahmedabad, AEO SEO Services in Ahmedabad, Search Engine Optimization Company Ahmedabad, Technical SEO Company Ahmedabad, Local SEO Company Ahmedabad, Enterprise SEO Services Ahmedabad",
      },
      { property: "og:title", content: "SEO Company in Ahmedabad | Digital Aura" },
      {
        property: "og:description",
        content:
          "Technical SEO, On-Page SEO, AI SEO (AIO) & Generative Engine Optimization (GEO) for Ahmedabad businesses. Get cited on Google and AI search — book your free audit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://thedigitalaura.com/seo-services-ahmedabad" },
      { property: "og:locale", content: "en_IN" },
      { name: "robots", content: "index,follow" },
      { name: "twitter:title", content: "SEO Company in Ahmedabad | Digital Aura" },
      {
        name: "twitter:description",
        content:
          "Technical SEO, On-Page SEO, AI SEO (AIO) & Generative Engine Optimization (GEO) for Ahmedabad businesses. Get cited on Google and AI search — book your free audit.",
      },
    ],
    links: [{ rel: "canonical", href: "https://thedigitalaura.com/seo-services-ahmedabad" }],
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

/* ---------------- Structured data (Breadcrumb + Service) ---------------- */

function BreadcrumbAndServiceSchema() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thedigitalaura.com/" },
      { "@type": "ListItem", position: 2, name: "SEO Company in Ahmedabad", item: "https://thedigitalaura.com/seo-services-ahmedabad" },
    ],
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO services in Ahmedabad",
    serviceType: "Search engine optimization",
    url: "https://thedigitalaura.com/seo-services-ahmedabad",
    description:
      "Technical SEO, local SEO, content and AI search optimisation for Ahmedabad businesses, with monthly reporting on calls, forms and enquiries.",
    provider: { "@type": "ProfessionalService", name: "Digital Aura", url: "https://thedigitalaura.com/" },
    areaServed: { "@type": "City", name: "Ahmedabad" },
    offers: SEO_PLANS.map((pl) => ({
      "@type": "Offer",
      name: pl.name,
      description: pl.best,
      priceCurrency: "INR",
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "INR", minPrice: pl.min, maxPrice: pl.max, unitText: "MONTH" },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        // Static, hard-coded JSON, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        // Static, hard-coded JSON, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}

/* ---------------- Videos and team (owner-supplied, 2026-10-09) ---------------- */

const SEO_REELS = ["DXwAkPRMl9c", "DTktVf7gdFf", "DcoMJiOskzp"];

const FOUNDER = {
  name: "Sambhav Shah",
  role: "Founder & CEO",
  photo: "/team/sambhav-shah.webp",
  bio: "Sambhav started in digital marketing in 2015 and built his expertise hands-on, leading business development, client relationships and growing teams. With 10+ years across client acquisition, team leadership and digital execution, he stays personally involved in strategy on every account.",
};

const TEAM_MEMBERS = [
  { name: "Satish Prajapati", role: "SEO Specialist", photo: "/team/satish.png", bio: "Satish leads SEO delivery and project management on your account. Audit findings become a prioritised plan, and every month's work, report and next step is explained to you clearly." },
  { name: "Jinali Lodariya", role: "SEO Executive", photo: "/team/jinali.png", bio: "Jinali handles keyword research, on-page optimisation and content improvements. Titles, headings and page copy are worked through so each service page matches what people in Ahmedabad actually search for." },
  { name: "Bhavesh Bhavsar", role: "SEO Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh looks after website optimisation, content planning and technical checks. The aim is pages that are crawlable, fast and well structured, so Google can find and understand them." },
  { name: "Krishna Jani", role: "SEO Executive", photo: "/team/krishna.webp", bio: "Krishna supports on-page work, Google Business Profile updates and local search tasks, keeping your listings and pages accurate and consistent across the places customers look." },
  { name: "Diya Mahida", role: "SEO Executive", photo: "/team/diya.webp", bio: "Diya supports keyword tracking, reporting and content research, and helps prepare the monthly updates that show which pages moved and what to work on next." },
];

const FOUNDER_SAME_AS = ["https://www.linkedin.com/in/sambhav-shah/", "https://www.instagram.com/sambhavshah2/"];

/** Reel card styled like an Instagram post: thumbnail /reels/seo-<n>.webp, video /reels/seo-<n>.mp4 played in place; Instagram link if the file is missing. */
function ReelCard({ id, n }: { id: string; n: number }) {
  const label = `SEO reel ${n}`;
  const thumb = `/reels/seo-${n}.webp`;
  const video = `/reels/seo-${n}.mp4`;
  const [mode, setMode] = useState<"idle" | "playing" | "error">("idle");
  const [thumbOk, setThumbOk] = useState(true);
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: "#DBDBDB" }}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <img src="/reels/sambhav-avatar.jpg" alt="Sambhav Shah" width={28} height={28} loading="lazy" className="h-7 w-7 shrink-0 rounded-full bg-[#EFEFEF] object-cover" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[11px] font-semibold text-[#262626]">sambhavshah2</p>
          <p className="truncate text-[10px] text-[#8E8E8E]">Original audio</p>
        </div>
        <a href="https://www.instagram.com/sambhavshah2/" target="_blank" rel="noopener noreferrer" className="rounded px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: "#4C5FEF" }}>View profile</a>
      </div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5", background: thumbOk ? "#000" : "linear-gradient(160deg, #0A1628, #3a3a5c)" }}>
        {mode === "playing" ? (
          <video src={video} poster={thumb} controls autoPlay playsInline preload="auto" className="absolute inset-0 h-full w-full bg-black object-contain" onError={() => setMode("error")} />
        ) : mode === "error" ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center text-white">
            <span className="text-sm font-bold">This video could not be loaded here</span>
            <span className="text-xs underline">Watch it on Instagram</span>
          </a>
        ) : (
          <button type="button" onClick={() => setMode("playing")} aria-label={`Play video: ${label}`} className="group absolute inset-0 block h-full w-full">
            <img src={thumb} alt={`${label} thumbnail`} loading="lazy" className={`absolute inset-0 h-full w-full object-contain ${thumbOk ? "" : "hidden"}`} onError={() => setThumbOk(false)} />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#262626] shadow-lg transition-transform group-hover:scale-110"><span className="ml-1">&#9654;</span></span>
            </span>
          </button>
        )}
      </div>
      <div className="px-3 pb-2 pt-2.5">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium text-[#3897F0]">View more on Instagram</a>
      </div>
      <div className="mx-3 border-t border-[#EFEFEF]" />
      <div className="flex items-center gap-3 px-3 py-2.5 text-[#262626]" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" /></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
        <span className="ml-auto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg></span>
      </div>
      <div className="mx-3 border-t border-[#EFEFEF]" />
      <div className="flex items-center justify-between px-3 py-2.5 text-[11px] text-[#8E8E8E]" aria-hidden="true">
        <span>Add a comment...</span>
        <span className="text-[#262626]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></span>
      </div>
    </div>
  );
}

function SEOReels() {
  return (
    <section id="seo-videos" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading eyebrow="Watch" title="SEO in short videos" sub="Short, practical videos from our founder, Sambhav Shah, on how SEO works for businesses in Ahmedabad." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SEO_REELS.map((id, i) => <ReelCard key={id} id={id} n={i + 1} />)}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const all = [FOUNDER, ...TEAM_MEMBERS];
  return (
    <section id="team" className="bg-surface-2">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Our team"
          title="Meet the team that ranks your business"
          sub="Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that works on your SEO."
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
  download,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  download?: string;
}) {
  return (
    <a
      href={href}
      download={download}
      className={`pillar-btn pillar-btn--primary group ${className}`}
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
      className={`pillar-btn pillar-btn--secondary ${className}`}
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pillar-eyebrow">{children}</span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
  wide = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  /** Lets a short title stay on one line on desktop. */
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
          className="pillar-btn pillar-btn--primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70"
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
        <div className="flex items-center justify-between max-sm:flex-wrap max-sm:gap-y-1">
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
            SEO Company in Ahmedabad
          </div>

          <h1 className="mt-6 font-extrabold leading-[1.12] tracking-tight text-brand-navy [font-size:clamp(32px,4vw,48px)]">
            SEO Company in Ahmedabad Built Around{" "}
            <span className="text-brand-orange">Leads</span>, Not Rankings Reports
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            We help Ahmedabad businesses grow qualified organic traffic, generate more leads
            and stay visible across Google Search, AI Search and local results — with a
            structured, transparent SEO process built around real business outcomes.
          </p>

          <div className="pillar-btn-row mt-8">
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

function QuickAnswer() {
  const links = [
    { href: "/seo/free-audit/", label: "Free SEO audit" },
    { href: "/downloads/Digital-Aura-Sample-SEO-Audit-Report.pdf", label: "Sample SEO audit report (PDF)", download: true },
    { href: "/seo/pricing-ahmedabad/", label: "SEO packages and pricing" },
    { href: "/blog/seo-in-2026-ai-era/", label: "How SEO works in 2026 (guide)" },
    { href: "/seo/doctors-hospitals-ahmedabad/", label: "SEO for doctors and hospitals" },
    { href: "/seo/manufacturers-b2b-gujarat/", label: "SEO for manufacturers" },
  ];
  return (
    <section id="quick-answer" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <SectionLabel>Quick answer</SectionLabel>
            <h2 className="pillar-h2">What does an SEO company in Ahmedabad do?</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
              An SEO company in Ahmedabad helps your business appear in Google, Google Maps and AI search when customers look for what you sell. At Digital Aura that means fixing technical problems, building pages around real search intent, improving your Google Business Profile and earning relevant links, then reporting on calls, forms and enquiries, not only rankings.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    {...(l.download ? { download: "Digital-Aura-Sample-SEO-Audit-Report.pdf" } : {})}
                    className="inline-flex items-center rounded-full border border-brand-navy/12 bg-white px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-muted">
              Published by <a className="underline" href="/about/">Digital Aura</a>. Last updated <time dateTime="2026-10-09">9 October 2026</time>.
            </p>
          </div>
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
        <SectionHeading
          eyebrow="The real problem"
          title={<>Your Business Isn't Losing Leads. It's Losing <span className="text-brand-orange">Visibility</span>.</>}
          sub="Buyers don't just search Google anymore — they ask AI Overviews, ChatGPT, Gemini and Perplexity too. If you're invisible there, you don't exist to them."
        />
        <div className="pillar-cols-4 mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
    <section id="ai-search-shift" className="pillar-dark-card">
      <span className="pillar-eyebrow inline-flex items-center gap-2">
        <Bot className="h-3.5 w-3.5" /> The AI search shift
      </span>
      <h3 className="pillar-oneline mt-3 text-2xl font-extrabold leading-tight md:text-[28px]">
        Traditional SEO is dying.{" "}
        <span className="text-brand-orange">AI Search</span> is the new battlefield.
      </h3>
      <p className="mt-4 text-base text-white/75">
        Our AI-powered SEO services in Ahmedabad optimize you for both — Google's classic SERP and the new
        generation of generative answer engines. One agency. One strategy. Full-funnel visibility.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Google", "ChatGPT", "Gemini", "Perplexity", "AI Overviews"].map((p) => (
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
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    { name: "Google Search Console", logo: googleSearchConsoleToolLogo, use: "Indexing & search performance" },
    { name: "Google Analytics", logo: googleAnalyticsToolLogo, use: "Traffic & conversion data" },
    { name: "Google Tag Manager", logo: googleTagManagerLogo, use: "Event & conversion tracking setup" },
    { name: "Semrush", logo: semrushLogo, use: "Competitive keyword & market research" },
    { name: "Ahrefs", logo: ahrefsLogo, use: "Backlink & content gap analysis" },
    { name: "Screaming Frog", logo: screamingFrogLogo, use: "Technical crawl audits" },
    { name: "Surfer SEO", logo: surferSeoLogo, use: "On-page content optimisation" },
    { name: "Local Falcon", logo: localFalconLogo, use: "Local pack & Map rank tracking" },
    { name: "DataForSEO", logo: dataForSeoLogo, use: "Large-scale SERP & rank data" },
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
        <Reveal className="pillar-cols-4 pillar-small mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="da-shadow-card da-card-hover flex h-full flex-col items-center gap-3 rounded-2xl border border-brand-navy/12 bg-white p-6 text-center"
            >
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

/* ---------------- Results (same card design as the home page "Proven Results") ---------------- */

const SEO_CASES = [
  {
    tag: "Industrial B2B · SEO & AEO/GEO",
    badge: "70–100 Leads/mo",
    color: "#22C55E",
    title: "Prism Calibration Centre",
    statBig: "70–100",
    statDesc: "qualified leads generated every month after we rebuilt their site into a search & AI-visibility engine.",
    href: "/case-studies/prism-calibration/",
  },
  {
    tag: "Healthcare & Fertility · SEO + YouTube",
    badge: "+76.7% Traffic",
    color: "#7C3AED",
    title: "IVF Clinic",
    statBig: "76.7%",
    statDesc: "organic traffic growth in 6 months, turning a strong offline reputation into daily online demand.",
    href: "/case-studies/ivf-clinic/",
  },
  {
    tag: "Home Services · Local SEO & AEO",
    badge: "10–15 Leads/day",
    color: "#FF6B2B",
    title: "DP Electrical Repairs",
    statBig: "10–15",
    statDesc: "qualified leads generated every day from the website — from invisible to local search leader in 4 months.",
    href: "/case-studies/dp-electrical-repairs/",
  },
  {
    tag: "Hospitality & Restaurant · SEO & Social",
    badge: "1.26K+ Organic Visitors",
    color: "#c8952f",
    title: "The Grand Palace",
    statBig: "1.26K+",
    statDesc: "organic search sessions in 90 days, from a standing start — a decade-old restaurant's first real digital front door.",
    href: "/case-studies/grand-palace/",
  },
];

function Results() {
  const VISIBLE = 3;
  const maxIndex = Math.max(0, SEO_CASES.length - VISIBLE);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const indexRef = useRef(0);
  const go = (n: number) => {
    const clamped = Math.max(0, Math.min(n, maxIndex));
    setShow(false);
    setTimeout(() => {
      indexRef.current = clamped;
      setIndex(clamped);
      setShow(true);
    }, 180);
  };
  useEffect(() => {
    if (maxIndex === 0) return;
    const t = setInterval(() => {
      const cur = indexRef.current;
      const n = cur >= maxIndex ? 0 : cur + 1;
      setShow(false);
      setTimeout(() => { indexRef.current = n; setIndex(n); setShow(true); }, 180);
    }, 4000);
    return () => clearInterval(t);
  }, [maxIndex]);
  const visible = SEO_CASES.slice(index, index + VISIBLE);
  return (
    <section id="results" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10">
          <SectionHeading
            wide
            eyebrow="Proven Results"
            title={<>Real Clients. <span className="text-brand-orange">Real Growth.</span> Real Results.</>}
            sub="Real search results from real businesses we handle SEO for."
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3" style={{ opacity: show ? 1 : 0, transition: "opacity 180ms ease" }}>
          {visible.map((c) => (
            <div key={c.title} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-transform hover:-translate-y-1" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="relative flex h-20 items-end px-4 pb-3" style={{ background: `linear-gradient(135deg, ${c.color}14 0%, ${c.color}05 100%)` }}>
                <span className="max-w-[55%] truncate rounded-full px-3 py-1 text-xs font-semibold" style={{ color: c.color, background: `${c.color}14` }}>{c.tag}</span>
                <span className="absolute right-3 top-3 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold" style={{ color: c.color, background: `${c.color}14`, border: `1px solid ${c.color}30` }}>{c.badge}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <a href={c.href}><h3 className="mb-3 text-base font-bold text-brand-navy hover:underline">{c.title}</h3></a>
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" style={{ color: c.color }} />
                  <span className="text-[36px] font-black leading-none" style={{ color: c.color }}>{c.statBig}</span>
                </div>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-muted">{c.statDesc}</p>
                <a href={c.href} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2" style={{ color: c.color }}>
                  Read Full Case Study <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
        {maxIndex > 0 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button type="button" aria-label="Previous case studies" onClick={() => go(indexRef.current - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white shadow-sm transition-transform hover:scale-110">
              <ArrowRight className="h-4 w-4 rotate-180 text-brand-navy" />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button key={i} type="button" aria-label={`Show case studies ${i + 1}`} onClick={() => go(i)} className="rounded-full transition-all duration-300" style={{ width: i === index ? 20 : 7, height: 7, background: i === index ? "#FF6B2B" : "#D1D5DB" }} />
              ))}
            </div>
            <button type="button" aria-label="Next case studies" onClick={() => go(indexRef.current < maxIndex ? indexRef.current + 1 : 0)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white shadow-sm transition-transform hover:scale-110">
              <ArrowRight className="h-4 w-4 text-brand-navy" />
            </button>
          </div>
        )}
        <div className="mt-8 text-center">
          <a href="/case-studies/" className="inline-flex items-center gap-2 rounded-full border-2 border-brand-orange px-6 py-3 text-sm font-bold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white">
            View All Case Studies <ArrowRight className="h-4 w-4" />
          </a>
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
            <CarouselPrevious className="left-2 xl:-left-14" />
            <CarouselNext className="right-2 xl:-right-14" />
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

const TRUST_STATS = [
  { k: "10×", v: "Average organic growth in 6 months" },
  { k: "85%", v: "Of clients rank in AI search results" },
  { k: "120+", v: "Clients served" },
  { k: "48h", v: "Free audit turnaround time" },
];

/** Slim strip under the hero: 4 stats + client logos in one row (replaces the separate Stats and Trusted-by sections). */
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
            Trusted by Businesses We've Helped Grow. From healthcare and education to eCommerce and local businesses, we're proud to work with ambitious brands across multiple industries.
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
          {items.map((t) => (
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
                <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-ink">
                  "{t.q}"
                </blockquote>
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
        {items.map((t, i) => (
          <button
            key={t.n}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn("h-2.5 rounded-full transition-all", selected === i ? "w-7 bg-brand-orange" : "w-2.5 bg-brand-navy/20")}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Sample audit report snapshot ---------------- */

const SAMPLE_AUDIT_PDF = "/downloads/Digital-Aura-Sample-SEO-Audit-Report.pdf";

function SampleAuditSnapshot() {
  return (
    <section id="sample-audit" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Sample report"
          title="See what a Digital Aura SEO audit looks like"
          sub="Download the full report to see every finding and the plan that follows."
        />
        <Reveal className="mx-auto mt-12 max-w-[760px]">
          <a href={SAMPLE_AUDIT_PDF} download="Digital-Aura-Sample-SEO-Audit-Report.pdf" className="da-shadow-card block overflow-hidden rounded-[18px] border border-brand-navy/10 bg-white">
            <img
              src={sampleAuditPage1}
              alt="First page of the Digital Aura sample SEO audit report, with the client name hidden"
              width={1000}
              height={1049}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
          </a>
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <PrimaryCTA href={SAMPLE_AUDIT_PDF} download="Digital-Aura-Sample-SEO-Audit-Report.pdf">
              Download the full sample report (PDF)
            </PrimaryCTA>
            <p className="text-sm text-ink-muted">31 pages, PDF. Downloads in this tab.</p>
          </div>
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
          wide
          eyebrow="Why Digital Aura"
          title={<>Why Businesses Choose <span className="text-brand-orange">Digital Aura</span></>}
          sub="Real reasons businesses across Ahmedabad call us the leading SEO company in Ahmedabad."
        />
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <Reveal className="pillar-cols-5 pillar-small mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ logo, name }) => (
            <div
              key={name}
              className="da-shadow-card da-card-hover flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-brand-navy/12 bg-white p-6 text-center"
            >
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
        <Reveal className="pillar-cols-4 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

const FAQS = [
    {
      q: "Do you do AI search optimisation (AEO and GEO)?",
      a: "Yes. It is part of our SEO work. We structure pages with clear answers, add schema and entity details, and build topic coverage so your business is easier for Google AI Overviews, ChatGPT, Gemini and Perplexity to understand. Nobody controls what an AI answer says, so we do not promise citations. We track where your brand shows up and improve from there.",
    },
    {
      q: "Are there long-term SEO contracts?",
      a: "The contract length and notice period are written in your proposal before you decide, so there is nothing hidden. SEO takes months to build, so we are honest that short trials rarely show the full picture.",
    },
    {
      q: "Who will work on my SEO account?",
      a: "An in-house team at our Hanspura office, led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. SEO work is done by Jinali Lodariya (SEO Executive) with Bhavesh Bhavsar (Digital Marketing Executive), and Satish Prajapati (Project Manager) coordinates the work. You can meet them on this page.",
    },
    {
      q: "How much does SEO cost in Ahmedabad?",
      a: "In Ahmedabad, our SEO plans run from ₹15,000 to ₹1,50,000 per month, plus GST: SEO Basic ₹15,000–₹25,000, SEO Growth ₹25,000–₹50,000 and SEO Advance ₹50,000–₹1,50,000. Where you land depends on your competition, current site health, the number of services and locations, and how fast you want to move. After the free audit, we give you a fixed monthly scope and price — no hidden add-ons, no surprise invoices mid-engagement.",
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
    {
      q: "What is the difference between an SEO company, an SEO agency and SEO services?",
      a: "Mostly the name. What actually matters is what is included each month, who does the work, and how results are measured. Ask every provider for a written scope, a sample report and the name of the person who will run your account.",
    },
    {
      q: "Local SEO or national SEO: which do I need in Ahmedabad?",
      a: "If most of your customers come from Ahmedabad or nearby, start with local SEO: Google Business Profile, reviews, local pages and citations. If you sell across India or abroad, you need national SEO with deeper content and technical work. Many businesses need both, and the audit shows which one to start with.",
    },
    {
      q: "Can you take over SEO from my current agency?",
      a: "Yes. We begin with an access and history check: Search Console, Analytics, existing backlinks and any past penalties. Then we keep what is working and fix what is not, without disrupting the rankings you already have.",
    },
    {
      q: "How do you measure SEO success?",
      a: "By leads, not just rankings: calls, form fills and qualified enquiries, tracked through Google Search Console and Google Analytics. Rankings and traffic are reported too, but only as a means to the enquiries.",
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
      // Static, hard-coded content only (the FAQ list above) - no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQ() {
  return (
    <PillarSection
      id="faq"
      tone="white"
      eyebrow="FAQs"
      title="Answers to what serious founders ask first"
    >
      <PillarFaq items={FAQS} />
    </PillarSection>
  );
}

/* ---------------- Areas + service links ---------------- */

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
    { t: "SEO Services Overview", href: "/services/seo-content-marketing/" },
    { t: "Technical SEO", href: "/services/seo-content-marketing/technical-seo/" },
    { t: "On-Page SEO", href: "/services/seo-content-marketing/on-page-seo/" },
    { t: "Local SEO", href: "/services/seo-content-marketing/local-seo/" },
    { t: "Off-Page SEO", href: "/services/seo-content-marketing/off-page-seo/" },
    { t: "Ecommerce SEO", href: "/services/seo-content-marketing/ecommerce-seo/" },
    { t: "SEO Audit & Strategy", href: "/services/seo-content-marketing/seo-audit-strategy/" },
    { t: "Free SEO Audit", href: "/seo/free-audit/" },
    { t: "SEO Packages & Pricing", href: "/seo/pricing-ahmedabad/" },
    { t: "SEO in 2026 and AI Overviews", href: "/blog/seo-in-2026-ai-era/" },
    { t: "SEO for Doctors & Hospitals", href: "/seo/doctors-hospitals-ahmedabad/" },
    { t: "SEO for Manufacturers & B2B", href: "/seo/manufacturers-b2b-gujarat/" },
    { t: "SEO Company in Gujarat", href: "/seo-company-gujarat/" },
    { t: "SEO for International Clients", href: "/seo-agency-international/" },
  ];
  return (
    <section id="areas" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Where we work</SectionLabel>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-brand-navy md:text-[28px]">
              SEO for businesses across Ahmedabad
            </h3>
            <p className="mt-4 text-lg text-ink-muted">
              Customers in Ahmedabad search by area, so your pages, Google Business Profile and reviews should too. We work with businesses in:
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
            <SectionLabel>SEO in detail</SectionLabel>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-brand-navy md:text-[28px]">
              Explore each SEO service
            </h3>
            <p className="mt-4 text-lg text-ink-muted">
              Want to see exactly what is included? Each service has its own page.
            </p>
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

/* ---------------- SEO guides (supporting blog posts) ---------------- */

function SEOGuides() {
  const guides = [
    { t: "What SEO costs in Ahmedabad", d: "Monthly fees, what decides the price and how to compare quotes.", href: "/blog/seo-cost-in-ahmedabad/" },
    { t: "How to choose an SEO company in Ahmedabad", d: "12 questions to ask and the red flags to watch for.", href: "/blog/how-to-choose-seo-company-ahmedabad/" },
    { t: "SEO or Google Ads first", d: "Which brings more leads for an Ahmedabad business, and when to use both.", href: "/blog/seo-vs-paid-ads-which-first-ahmedabad/" },
    { t: "How long SEO takes in Ahmedabad", d: "A realistic timeline by business type, with no promised rankings.", href: "/blog/how-long-does-seo-take-ahmedabad/" },
    { t: "Google Maps ranking checklist", d: "A 15-point local SEO checklist for Ahmedabad businesses.", href: "/blog/google-maps-ranking-ahmedabad-checklist/" },
    { t: "How SEO works in 2026", d: "What changed with AI Overviews, and what still matters.", href: "/blog/seo-in-2026-ai-era/" },
    { t: "AEO vs GEO vs LLMO explained", d: "How answer engines and AI assistants choose what to cite.", href: "/blog/aeo-vs-geo-vs-llmo-explained/" },
    { t: "How to rank a new website on Google", d: "A realistic, ordered plan for a site with no history.", href: "/blog/how-to-rank-new-website-on-google/" },
    { t: "How to increase organic website traffic", d: "Where organic growth usually comes from.", href: "/blog/increase-organic-website-traffic-10x/" },
    { t: "Technical SEO practices for 2026", d: "Crawling, indexing, speed and structured data.", href: "/blog/technical-seo-practices-2026/" },
    { t: "On-page SEO checklist for 2026", d: "Titles, headings, content and internal links.", href: "/blog/on-page-seo-checklist-2026/" },
    { t: "Local SEO strategies for 2026", d: "Maps, citations and reviews for local businesses.", href: "/blog/local-seo-strategies-2026/" },
    { t: "Google Business Profile SEO checklist", d: "Set up and keep your profile working for you.", href: "/blog/google-business-profile-seo-checklist/" },
    { t: "Google Business Profile tricks for Maps", d: "Small profile changes that help you show up locally.", href: "/blog/google-business-profile-tricks-google-maps/" },
    { t: "Shopify SEO tutorial", d: "Product, collection and store-level SEO basics.", href: "/blog/shopify-seo-tutorial-2026/" },
    { t: "AI SEO skills for marketers", d: "What to learn as search and AI assistants overlap.", href: "/blog/ai-seo-skills-for-marketers-2026/" },
    { t: "How to rank in ChatGPT, Perplexity and AI Overviews", d: "Making your pages easy for AI tools to cite.", href: "/blog/how-to-rank-chatgpt-perplexity-ai-overviews/" },
  ];
  return (
    <section id="seo-guides" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="SEO guides"
          title="Learn how SEO works before you hire anyone"
          sub="Plain-English guides from our team. Read them to judge any SEO proposal, ours included."
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
      </div>
    </section>
  );
}

/* ---------------- How to choose an SEO company ---------------- */

function ChooseSEO() {
  const flags = [
    "Guarantees page-one or #1 rankings, or promises results in a fixed number of days",
    "Will not give you access to your own Google Search Console, Analytics or Business Profile",
    "Sells backlink packages or talks about buying links",
    "Reports only keyword rankings, with no calls, forms or leads",
    "Cannot tell you who will actually work on your account",
    "Quotes a standard package before looking at your website",
  ];
  const questions = [
    "Who will work on my account, and are they in-house?",
    "Will I own the accounts, the content and the data if I leave?",
    "How do you report leads, not just rankings?",
    "What will you fix in the first 30 days?",
    "Can I see a sample monthly report?",
    "What are the contract and notice terms?",
  ];
  return (
    <section id="choose" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Choosing an agency"
          title={<>How to choose an <span className="text-brand-orange">SEO company</span> in Ahmedabad</>}
          sub="Whether you pick us or someone else, use this checklist. It will save you months and money."
        />
        <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="da-shadow-card rounded-2xl border border-brand-navy/12 bg-white p-7">
            <h3 className="text-lg font-bold text-brand-navy">Red flags to walk away from</h3>
            <ul className="mt-4 space-y-3">
              {flags.map((x) => (
                <li key={x} className="flex gap-3 text-sm text-ink-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="da-shadow-card rounded-2xl border border-brand-navy/12 bg-white p-7">
            <h3 className="text-lg font-bold text-brand-navy">Questions to ask any SEO company</h3>
            <ul className="mt-4 space-y-3">
              {questions.map((x) => (
                <li key={x} className="flex gap-3 text-sm text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-muted">
          We may not be the right fit if you need guaranteed rankings within weeks, cannot change anything on your website, or have no plan to publish useful content.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Sections added from the page blueprint (seo-01). No prices, rankings or new numeric claims. ---------------- */

function SEOServicesScope() {
  const items = [
    { t: "Technical SEO", d: "Crawling, indexing, site speed, Core Web Vitals and schema. We fix these first because they cap everything that comes after.", h: "/services/seo-content-marketing/technical-seo/" },
    { t: "On-page SEO and content", d: "Pages built around what buyers actually search, with clear headings, internal links and a next step on every page.", h: "/services/seo-content-marketing/on-page-seo/" },
    { t: "Local SEO", d: "Google Business Profile, citations, reviews and Map Pack work for searches made in and around Ahmedabad.", h: "/services/seo-content-marketing/local-seo/" },
    { t: "Off-page SEO", d: "Earning relevant links and mentions from real sites. We do not buy links or use link farms.", h: "/services/seo-content-marketing/off-page-seo/" },
    { t: "Ecommerce SEO", d: "Category and product page structure, product data and speed, so an online store can be found for what it sells.", h: "/services/seo-content-marketing/ecommerce-seo/" },
    { t: "SEO audit and strategy", d: "A full review of what holds your site back, with a written priority list you can act on, with us or without us.", h: "/seo/free-audit/" },
  ];
  return (
    <section id="seo-services" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="SEO services"
          title={<>SEO services in Ahmedabad: <span className="text-brand-orange">what we actually do</span></>}
          sub="An SEO company, an SEO agency and SEO services all mean the same job: getting your business found by people who are ready to enquire. This is the work behind it."
        />
        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <a key={x.h} href={x.h} className="da-shadow-card da-card-hover group flex h-full flex-col rounded-2xl border border-brand-navy/12 bg-white p-7">
              <h3 className="text-lg font-bold text-brand-navy">{x.t}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{x.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-orange group-hover:gap-2">
                Learn more<span className="sr-only"> about {x.t}</span> <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-ink-muted">
          Not sure which of these your business needs first? Start with the{" "}
          <a className="font-semibold text-brand-orange underline" href="/seo/free-audit/">free SEO audit</a>. It shows where you stand and what to fix first.
        </p>
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
        "Google Search Console, Google Analytics and call and form tracking are set up in your own accounts.",
        "A full crawl and audit finds what is blocking your pages, and the critical technical problems are fixed first.",
        "We choose the pages and searches that matter most to your revenue, so effort goes where it pays.",
      ],
    },
    {
      m: "Days 31 to 60",
      t: "Pages and local presence",
      items: [
        "Priority pages are rewritten or built around real search intent, with clear headings and a next step on each one.",
        "Internal links and schema are added so search engines and AI answers can understand the pages.",
        "Your Google Business Profile and local listings are cleaned up and made consistent.",
        "You see a short progress note on what shipped, not just a list of keywords.",
      ],
    },
    {
      m: "Days 61 to 90",
      t: "Measure and extend",
      items: [
        "The first full report covers impressions, clicks, calls and forms, and which pages are starting to move.",
        "We review what is working and decide where to put more effort in the next quarter.",
        "Content, local and link work are planned from real data from your own site.",
        "We agree the next steps with you in a call.",
      ],
    },
  ];
  return (
    <section id="first-90-days" className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Your first 90 days"
          title={<>What happens in the <span className="text-brand-orange">first 90 days</span></>}
          sub="A clear start, so you know what is being done and when. Here is what you can expect from us."
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
          Rankings rarely move in the first weeks. We judge the first 90 days on fixes shipped, tracking in place and early movement in impressions, not on a promised position.
        </p>
        <div className="pillar-btn-row pillar-btn-row--center">
          <PrimaryCTA href="#audit">Get my free SEO audit</PrimaryCTA>
          <SecondaryCTA href="https://wa.me/918141200284">Chat on WhatsApp</SecondaryCTA>
        </div>
      </div>
    </section>
  );
}

/** Owner-supplied monthly fees (2026-10-17), excluding GST. Final fee is set in the written quote after the free audit. */
const SEO_PLANS = [
  {
    name: "SEO Basic",
    fee: "₹15,000 – ₹25,000",
    min: 15000,
    max: 25000,
    best: "A clinic, shop or service business serving one city, with a small site.",
    items: ["SEO audit and tracking set up", "On-page fixes on your key service pages", "Google Business Profile set-up and upkeep", "Local citations and review requests", "Monthly report on calls and enquiries"],
  },
  {
    name: "SEO Growth",
    fee: "₹25,000 – ₹50,000",
    min: 25000,
    max: 50000,
    best: "Businesses ready to compete for more services and areas.",
    items: ["Everything in SEO Basic", "New service and location pages, written every month", "Link building from relevant, earned sources", "Technical fixes and speed work", "Conversion improvements on key pages", "Monthly review call"],
  },
  {
    name: "SEO Advance",
    fee: "₹50,000 – ₹1,50,000",
    min: 50000,
    max: 150000,
    best: "Large catalogues, several locations, export or multi-language projects, and crowded markets.",
    items: ["Everything in SEO Growth", "Category and product optimisation for online stores", "A larger content and link programme", "AI search (AEO and GEO) work on your key pages", "Multi-location or multi-language scope", "A named lead and strategy reviews"],
  },
];

function SEOPlanTable() {
  return (
    <Reveal className="mt-12">
      <div className="mx-auto max-w-6xl space-y-4 md:hidden">
        {SEO_PLANS.map((pl) => (
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
          <caption className="sr-only">SEO plans in Ahmedabad with monthly fee ranges, excluding GST</caption>
          <thead>
            <tr className="bg-brand-orange-soft text-brand-navy">
              <th scope="col" className="w-[16%] p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Plan</th>
              <th scope="col" className="w-[18%] p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Monthly fee</th>
              <th scope="col" className="w-[24%] p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Best for</th>
              <th scope="col" className="p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">What is included</th>
            </tr>
          </thead>
          <tbody>
            {SEO_PLANS.map((pl) => (
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
        These prices are for businesses in Ahmedabad; projects in other cities or countries are quoted separately. Fees are monthly and exclude GST. Your exact fee is set in a written quote after the free audit, and it lists the work it covers. No ranking is guaranteed on any plan.
      </p>
    </Reveal>
  );
}

function SEOPricing() {
  const drivers = [
    { t: "How strong your competition is", d: "A search with many established sites ranking needs more work than a quiet local one." },
    { t: "The health of your website", d: "A site with technical problems needs fixing before content can do its job." },
    { t: "How much there is to cover", d: "The number of services, pages, locations and languages changes the scope." },
    { t: "How fast you want to move", d: "More content, local work and link building in a month means a bigger scope." },
  ];
  const includes = ["A written scope with named deliverables", "Reporting on calls, forms and leads, not just rankings", "Access to your own Search Console, Analytics and Business Profile", "Contract and notice terms you can read before you sign"];
  const excludes = ["A guaranteed ranking or a fixed number of days", "Hidden add-ons that appear in a later invoice", "Bought links or a standard package chosen before anyone looks at your site"];
  return (
    <section id="seo-pricing" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          wide
          eyebrow="Pricing"
          title={<>SEO pricing in Ahmedabad: <span className="text-brand-orange">what to expect</span></>}
          sub="Three plans, from ₹15,000 to ₹1,50,000 a month. Where you land inside a range depends on four things, and the final fee is written after we have looked at your site."
        />
        <SEOPlanTable />
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
              <h3 className="text-lg font-bold text-brand-navy">A fair SEO quote should include</h3>
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
        <p className="mx-auto mt-8 max-w-3xl text-center text-ink-muted">
          Want to see how packages are put together? Read{" "}
          <a className="font-semibold text-brand-orange underline" href="/seo/pricing-ahmedabad/">how SEO packages are priced in Ahmedabad</a>, see{" "}
          <a className="font-semibold text-brand-orange underline" href="/blog/seo-cost-in-ahmedabad/">what SEO costs in Ahmedabad</a>, or start with the{" "}
          <a className="font-semibold text-brand-orange underline" href="/seo/free-audit/">free SEO audit</a>.
        </p>
        <div className="pillar-btn-row pillar-btn-row--center">
          <PrimaryCTA href="#audit">Get a free audit and a written quote</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4042735126313!2d72.6881782!3d23.082292199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83bdb5cc83a9%3A0xcbe9af162f4cdebc!2sDigital%20Aura!5e0!3m2!1sen!2sin!4v1792055176408!5m2!1sen!2sin";

/** Map and contact details, placed directly above the site footer. */
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
              <PrimaryCTA href="/seo/free-audit/" className="w-full">Request the free SEO audit</PrimaryCTA>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------------- SEO vs Google Ads ---------------- */

function SEOvsAds() {
  const rows = [
    ["Time to first leads", "Days", "Usually 3 to 6 months"],
    ["When you stop paying", "Leads stop", "Pages can keep ranking"],
    ["Cost per lead over time", "Stays roughly the same", "Tends to fall as pages rank"],
    ["Best for", "Urgent leads and testing demand", "Steady, long-term lead flow"],
  ];
  return (
    <section id="seo-vs-ads" className="bg-white">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="SEO or ads?"
          title={<>SEO vs Google Ads for Ahmedabad businesses</>}
          sub="They solve different problems. Most growing businesses end up using both."
        />
        <Reveal className="da-shadow-card mt-10 overflow-x-auto rounded-2xl border border-brand-navy/12 bg-white">
          <table className="w-full text-left text-[13px] sm:text-sm">
            <thead className="bg-surface-2 text-brand-navy">
              <tr>
                <th className="px-3 py-3 sm:px-5 font-bold"> </th>
                <th className="px-3 py-3 sm:px-5 font-bold">Google Ads</th>
                <th className="px-3 py-3 sm:px-5 font-bold">SEO</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, a, b]) => (
                <tr key={k} className="border-t border-brand-navy/10">
                  <td className="px-3 py-3 sm:px-5 font-semibold text-brand-navy">{k}</td>
                  <td className="px-3 py-3 sm:px-5 text-ink-muted">{a}</td>
                  <td className="px-3 py-3 sm:px-5 text-ink-muted">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-6 text-center text-ink-muted">
          Need leads this month while SEO builds? See our{" "}
          <a className="font-semibold text-brand-orange underline" href="/google-ads-agency-ahmedabad">Google Ads agency in Ahmedabad</a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section id="contact" className="pillar-section pillar-section--navy">
      <div className="pillar-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionLabel>Ready when you are</SectionLabel>
            <h2 className="mt-3 mb-5 font-extrabold leading-tight text-white [font-size:clamp(26px,2.8vw,34px)]">
              Find out exactly why your SEO isn't generating leads — <span className="text-brand-orange">in 48 hours</span>.
            </h2>
            <p className="max-w-xl text-[17px] leading-relaxed text-white/80">
              Free, no-obligation audit covering Technical SEO, On-Page SEO, Schema, Core Web Vitals, AI Search
              visibility and GEO readiness. Delivered with a 30-minute strategy walkthrough by a senior consultant —
              not a junior account manager reading a template.
            </p>
            <div className="pillar-btn-row mt-7">
              <PrimaryCTA href="#audit">Get My Free SEO Audit</PrimaryCTA>
              <a href="https://wa.me/918141200284" target="_blank" rel="noopener" className="pillar-btn pillar-btn--ghost-light">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
        <OfficeMap />
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

function WhatsAppIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.5 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42z" />
    </svg>
  );
}

/** Bottom-right floating actions: scroll-to-top sits above the WhatsApp button. */
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
      <BreadcrumbAndServiceSchema />
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
        <PillarSection id="problems" tone="light" eyebrow="Problems we solve" title="Why your SEO isn't bringing leads, and how we fix it">
          <PillarTabs
            label="Problems we solve"
            tabs={[
              { id: "visibility", label: "The real problem", content: <Problem /> },
              { id: "challenges", label: "SEO challenges we solve", content: <SEOChallenges /> },
            ]}
          />
        </PillarSection>

        {/* 4. Services */}
        <PillarSection id="services" tone="white" eyebrow="What's included" title="Our SEO services">
          <PillarTabs
            label="SEO services"
            tabs={[
              { id: "scope", label: "SEO services", content: <SEOServicesScope /> },
              { id: "framework", label: "9-pillar framework", content: <Framework /> },
            ]}
          />
        </PillarSection>

        {/* 5. Process */}
        <PillarSection id="process" tone="light" eyebrow="Our process" title="How we work, and what happens in the first 90 days">
          <PillarTabs
            label="Process"
            tabs={[
              { id: "how", label: "How we engineer growth", content: <Process /> },
              { id: "90days", label: "First 90 days", content: <First90Days /> },
            ]}
          />
        </PillarSection>

        {/* 6. Tools, tracking & platforms */}
        <PillarSection id="tools" tone="white" eyebrow="Tools & tracking" title="The tools, tracking and platforms behind every account">
          <PillarTabs
            label="Tools, tracking and platforms"
            tabs={[
              { id: "tools", label: "SEO tools we use", content: <SEOToolsWeUse /> },
              { id: "reporting", label: "Tracking & reporting", content: <GAReporting /> },
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
        <PillarSection tone="light" bare noHead>
          <SEOReels />
        </PillarSection>

        {/* 9. Testimonials */}
        <PillarSection id="testimonials" tone="white" bare eyebrow="What clients say" title="Loved by founders who care about outcomes">
          <Testimonials />
        </PillarSection>

        {/* 10. Pricing, comparison */}
        <PillarSection id="pricing" tone="light" eyebrow="Pricing & comparison" title="SEO pricing, and how we compare">
          <PillarTabs
            label="Pricing and comparison"
            tabs={[
              { id: "pricing", label: "SEO pricing", content: <SEOPricing /> },
              { id: "why", label: "Why Digital Aura", content: <WhyChooseUs /> },
              { id: "compare", label: "Us vs a typical agency", content: <Compare /> },
              { id: "choose", label: "How to choose", content: <ChooseSEO /> },
              { id: "vs-ads", label: "SEO vs Google Ads", content: <SEOvsAds /> },
            ]}
          />
        </PillarSection>

        {/* 11. Team */}
        <PillarSection tone="white" bare noHead>
          <TeamSection />
        </PillarSection>

        {/* Link cards before FAQ */}
        <PillarSection id="explore" tone="light" eyebrow="Keep exploring" title="Areas we cover, service pages and SEO guides">
          <PillarTabs
            label="Explore"
            tabs={[
              { id: "areas", label: "Areas & service pages", content: <AreasAndServices /> },
              { id: "guides", label: "SEO guides", content: <SEOGuides /> },
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
