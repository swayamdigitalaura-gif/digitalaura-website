/**
 * Industry landing page layout (UX redesign of the 12 Round 3 pages).
 * Same data contract as LocalServicePage (LocalServiceConfig), so no copy is rewritten here: this file only decides how
 * the existing content is arranged. It uses the site header, footer, fonts and the home page palette (orange + navy).
 *
 * Intent order: 1) is this for me (answer first)  2) what goes wrong / what you get  3) how it works
 * 4) rules, tools and checklists  5) proof  6) who you will work with  7) how to start  8) questions answered.
 * Every answer stays in the DOM (also when a FAQ is closed) so crawlers and AI tools can read it.
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, X, Phone, MessageCircle, MapPin, ShieldAlert, Sparkles, Info, Clock, FileText,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import PageLeadForm from "@/components/PageLeadForm";
import { StickyCtaBar } from "@/components/PageCta";
import PillarLinks from "@/components/PillarLinks";
import BlogInsights from "@/components/BlogInsights";
import AdsCalculator from "@/components/AdsCalculators";
import { ReelGrid, FounderLinks } from "@/components/ReelsAndTeam";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";
import type { ExtraSection, LocalServiceConfig } from "@/components/LocalServicePage";
import { track, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/track";

const ORANGE = "#FF6B2B";
const NAVY = "#0A1628";
const SOFT = "#FFF7F2";
const GREEN = "#16A34A";

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Short tab label: explicit jumpLabel, else the eyebrow or the first words of the heading, kept to about 14 characters. */
function chipLabel(s: ExtraSection): string {
  const raw = s.jumpLabel || (s.eyebrow && s.eyebrow.length <= 14 ? s.eyebrow : s.title.split(/[:?,]/)[0]);
  if (raw.length <= 14) return raw;
  const words = raw.trim().split(/\s+/);
  while (words.length > 1 && /^(the|a|an|what|which|how|why|when|compare|is|are|do|does|our|your|of|to)$/i.test(words[0])) words.shift();
  let out = words[0];
  for (let i = 1; i < words.length; i++) {
    if ((out + " " + words[i]).length > 14) break;
    out += " " + words[i];
  }
  return out.charAt(0).toUpperCase() + out.slice(1);
}

/* ───────────── small building blocks ───────────── */

/** "industry" = tabbed landing page; "pillar" = same structure and look as the Google Ads / SEO / Website pillar pages. */
type Variant = "industry" | "pillar";
const VariantCtx = createContext<Variant>("industry");
const CREAM = "#FFF8F2";

const Eyebrow = ({ children }: { children: React.ReactNode }) => {
  const pillar = useContext(VariantCtx) === "pillar";
  if (pillar) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.16em] shadow-sm" style={{ borderColor: "#EDE3DA", color: "#3B3F5C" }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />{children}
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.14em]" style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}>
      {children}
    </span>
  );
};

const Head = ({ eyebrow, title, sub, center = true }: { eyebrow?: string; title: React.ReactNode; sub?: string; center?: boolean }) => {
  const pillar = useContext(VariantCtx) === "pillar";
  return (
    <div className={`${pillar ? "mb-10 md:mb-14" : "mb-8 md:mb-10"} ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {eyebrow && <div className={pillar ? "mb-6" : "mb-4"}><Eyebrow>{eyebrow}</Eyebrow></div>}
      {pillar
        ? <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.02em] md:text-[42px] lg:text-[46px]" style={{ color: NAVY }}>{title}</h2>
        : <h2 className="text-2xl font-black leading-tight tracking-tight md:text-[34px]" style={{ color: NAVY }}>{title}</h2>}
      {sub && <p className={pillar ? "mt-5 text-[17px] leading-[1.75] text-[#5B5F7A] md:text-[19px]" : "mt-3 text-[15.5px] leading-relaxed text-[#4B5563]"}>{sub}</p>}
    </div>
  );
};

const Wrap = ({ id, bg = "#fff", children, narrow = false }: { id?: string; bg?: string; children: React.ReactNode; narrow?: boolean }) => {
  const pillar = useContext(VariantCtx) === "pillar";
  return (
    <section id={id} className={`scroll-mt-32 xl:scroll-mt-36 px-5 md:px-8 ${pillar ? "py-14 md:py-20 lg:py-24" : "py-14 md:py-20"}`} style={{ background: pillar && bg === "#F8FAFF" ? CREAM : bg }}>
      <div className={`mx-auto ${narrow ? "max-w-4xl" : pillar ? "max-w-7xl" : "max-w-6xl"}`}>{children}</div>
    </section>
  );
};

const Card = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const pillar = useContext(VariantCtx) === "pillar";
  return (
    <div className={`border bg-white ${pillar ? "rounded-[28px] p-7 md:p-8" : "rounded-2xl p-6"} ${className}`}
      style={{ borderColor: pillar ? "#EDE3DA" : "#E5E7EB", boxShadow: pillar ? "0 6px 24px rgba(26,29,54,0.05)" : "0 2px 12px rgba(10,22,40,0.05)", ...style }}>{children}</div>
  );
};

const Pill = ({ href, children, variant = "solid", onClick, external = false }: { href: string; children: React.ReactNode; variant?: "solid" | "outline" | "ghost"; onClick?: () => void; external?: boolean }) => {
  const base = "inline-flex max-w-full shrink-0 items-center justify-center gap-2 whitespace-normal text-center rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const style: React.CSSProperties =
    variant === "solid" ? { background: ORANGE, color: "#fff", boxShadow: `0 8px 22px ${ORANGE}40` }
    : variant === "outline" ? { border: `2px solid ${NAVY}`, color: NAVY, background: "#fff" }
    : { color: ORANGE };
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return <a href={href} onClick={onClick} className={base} style={style} {...props}>{children}</a>;
};

/* ───────────── guide section renderers (existing content, new layout) ───────────── */

function TickItem({ text }: { text: string }) {
  const [on, setOn] = useState(false);
  return (
    <li>
      <button type="button" aria-pressed={on} onClick={() => setOn((v) => !v)} className="group flex w-full items-start gap-3 rounded-lg px-1 py-1.5 text-left">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors" style={{ borderColor: on ? GREEN : "#CBD5E1", background: on ? GREEN : "#fff" }}>
          {on && <Check size={13} color="#fff" strokeWidth={3} />}
        </span>
        <span className={`text-[14.5px] leading-relaxed ${on ? "text-[#6B7280] line-through decoration-[#9CA3AF]" : "text-[#374151]"}`}>{text}</span>
      </button>
    </li>
  );
}

function GuideSection({ sec, index }: { sec: ExtraSection; index: number }) {
  const eyebrow = sec.eyebrow;
  const sub = "subtext" in sec ? sec.subtext : undefined;
  const bg = index % 2 === 0 ? "#fff" : "#F8FAFF";
  const foot = "footnote" in sec && sec.footnote ? <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-[#6B7280]">{sec.footnote}</p> : null;

  if (sec.kind === "cards") {
    const items = sec.items;
    const stepper = items.length >= 3 && items.length <= 5 && items.every((i) => i.tag && !i.href);
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        {stepper ? (
          <ol className={`grid gap-5 ${items.length === 3 ? "md:grid-cols-3" : items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3 lg:grid-cols-5"}`}>
            {items.map((it, i) => (
              <li key={it.title} className="relative">
                <Card className="h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: ORANGE }}>{i + 1}</span>
                  <p className="mt-4 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: ORANGE }}>{it.tag}</p>
                  <h3 className="mt-1 text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{it.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#4B5563]">{it.desc}</p>
                </Card>
              </li>
            ))}
          </ol>
        ) : (
          <div className={`grid gap-5 sm:grid-cols-2 ${items.length === 2 ? "" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {items.map((it, n) => (
              <Card key={it.title} className="flex h-full flex-col">
                {!it.tag && items.length >= 5 && <span className="mb-3 text-[13px] font-black" style={{ color: ORANGE }}>{String(n + 1).padStart(2, "0")}</span>}
                {it.tag && <p className="mb-2 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: ORANGE }}>{it.tag}</p>}
                <h3 className="text-[16px] font-bold leading-snug" style={{ color: NAVY }}>
                  {it.href && !it.cta ? <a href={it.href} className="hover:underline">{it.title}</a> : it.title}
                </h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[#4B5563]">{it.desc}</p>
                {it.href && it.cta && (
                  <div className="mt-5 max-w-full">
                    <Pill href={it.href} variant="outline" external={/^https?:/.test(it.href)} onClick={() => track("cta_click", { cta_label: it.cta!, cta_location: sec.id })}>
                      {it.cta} <ArrowRight size={15} />
                    </Pill>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
        {foot}
      </Wrap>
    );
  }

  if (sec.kind === "compare") {
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <div className="grid gap-5 md:grid-cols-2">
          {[sec.left, sec.right].map((col) => {
            const good = col.tone === "good";
            const tint = good ? GREEN : "#DC2626";
            return (
              <div key={col.title} className="rounded-2xl border bg-white p-6" style={{ borderColor: `${tint}40`, borderTop: `4px solid ${tint}` }}>
                <h3 className="flex items-center gap-2 text-[17px] font-bold" style={{ color: NAVY }}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: `${tint}18`, color: tint }}>{good ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}</span>
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.items.map((t) => (
                    <li key={t} className="flex gap-3 text-[14.5px] leading-relaxed text-[#374151]">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tint }} />{t}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {foot}
      </Wrap>
    );
  }

  if (sec.kind === "checklist") {
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <div className={`grid gap-5 ${sec.groups.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {sec.groups.map((g) => (
            <Card key={g.title}>
              <h3 className="mb-3 text-[16px] font-bold" style={{ color: NAVY }}>{g.title}</h3>
              <ul className="space-y-1">{g.items.map((t) => <TickItem key={t} text={t} />)}</ul>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-[#9CA3AF]">Tap an item to tick it off as you go.</p>
        {foot}
      </Wrap>
    );
  }

  if (sec.kind === "calculator") {
    return (
      <Wrap id={sec.id} bg={bg} narrow>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <AdsCalculator variant={sec.variant} accent={ORANGE} />
        {foot}
      </Wrap>
    );
  }

  if (sec.kind === "reels") {
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <ReelGrid ids={sec.ids} accent={ORANGE} topic={sec.topic} slug={sec.slug} />
        {foot}
      </Wrap>
    );
  }

  if (sec.kind === "team") {
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <div className={`mx-auto grid gap-5 ${sec.members.length >= 3 ? "md:grid-cols-3" : "max-w-3xl md:grid-cols-2"}`}>
          {sec.members.map((m) => (
            <Card key={m.name}>
              <div className="flex items-center gap-3">
                <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" className="h-14 w-14 shrink-0 rounded-full bg-[#F3F4F6] object-cover" />
                <div>
                  <h3 className="font-bold leading-tight" style={{ color: NAVY }}>{m.name}</h3>
                  <p className="text-sm font-semibold" style={{ color: ORANGE }}>{m.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{m.bio}</p>
            </Card>
          ))}
        </div>
        {sec.founderLinks && <div className="mx-auto max-w-3xl"><FounderLinks accent={ORANGE} /></div>}
        {foot}
      </Wrap>
    );
  }

  if (sec.kind === "text") {
    return (
      <Wrap id={sec.id} bg={bg} narrow>
        <Head eyebrow={eyebrow} title={sec.title} />
        <div className="space-y-4 text-[16px] leading-relaxed text-[#4B5563]">{sec.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
        {sec.links && (
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            {sec.links.map((l) => (
              <Pill key={l.href} href={l.href} variant="outline" external={/^https?:/.test(l.href)}>{l.label} <ArrowRight size={15} /></Pill>
            ))}
          </div>
        )}
      </Wrap>
    );
  }
  return null;
}

/* ───────────── FAQ ───────────── */

/** Plain question and answer. Always visible, so readers, crawlers and AI tools all see the full answer. */
function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-6 first:pt-0">
      <h3 className="text-[17px] font-bold leading-snug md:text-[18px]" style={{ color: NAVY }}>{q}</h3>
      <p className="mt-2 text-[15.5px] leading-relaxed text-[#4B5563]">{a}</p>
    </div>
  );
}

/* ───────────── page ───────────── */

export default function IndustryLandingPage({ config, variant = "industry" }: { config: LocalServiceConfig; variant?: Variant }) {
  const pillar = variant === "pillar";
  useCMSEditor();
  // Same admin-edited copy overrides as LocalServicePage (settings keys are namespaced by slug), so nothing edited in the CMS is lost.
  const k = (field: string) => `${config.slug}_${field}`;
  const keys = [
    k("eyebrow"), k("h1"), k("heroParagraph"), k("heroParagraph2"), k("differentiatorBadge"), k("differentiatorHeading"),
    k("differentiatorText"), k("painPointsTitle"), k("warningText"), k("includedTitle"), k("processTitle"), k("processSubtext"),
    k("whyLocalTitle"), k("relatedCategoryLabel"), k("ctaHeading"), k("ctaText"), k("ctaButton"),
    ...config.painPoints.flatMap((_, i) => [k(`painPoint_${i}_pain`), k(`painPoint_${i}_detail`)]),
    ...config.included.flatMap((_, i) => [k(`included_${i}_title`), k(`included_${i}_desc`)]),
    ...config.process.flatMap((_, i) => [k(`process_${i}_title`), k(`process_${i}_desc`)]),
    ...config.whyLocal.map((_, i) => k(`whyLocal_${i}`)),
    ...config.relatedServices.flatMap((_, i) => [k(`related_${i}_title`), k(`related_${i}_desc`)]),
    ...config.faqs.flatMap((_, i) => [k(`faq_${i}_q`), k(`faq_${i}_a`)]),
  ];
  const s = useSettings(keys);
  const g = (field: string, fallback: string) => s[k(field)] || fallback;
  const c: LocalServiceConfig = {
    ...config,
    // Pages that shipped without an inline form still get one, so every page can capture a lead (and gets the mobile sticky CTA).
    leadForm: config.leadForm ?? {
      id: "audit-form", formName: config.slug, service: config.h1, heading: "Talk to us about this",
      text: "Send your details. It is free to ask, and we reply by email.", website: "optional",
      notesLabel: "What do you need help with?", submitLabel: "Send my details",
    },
    eyebrow: g("eyebrow", config.eyebrow),
    h1: g("h1", config.h1),
    heroParagraph: g("heroParagraph", config.heroParagraph),
    heroParagraph2: g("heroParagraph2", config.heroParagraph2 || "") || undefined,
    differentiatorBadge: g("differentiatorBadge", config.differentiatorBadge),
    differentiatorHeading: g("differentiatorHeading", config.differentiatorHeading),
    differentiatorText: g("differentiatorText", config.differentiatorText),
    painPointsTitle: g("painPointsTitle", config.painPointsTitle),
    warningText: g("warningText", config.warningText),
    includedTitle: g("includedTitle", config.includedTitle),
    processTitle: g("processTitle", config.processTitle),
    processSubtext: g("processSubtext", config.processSubtext),
    whyLocalTitle: g("whyLocalTitle", config.whyLocalTitle),
    relatedCategoryLabel: g("relatedCategoryLabel", config.relatedCategoryLabel),
    ctaHeading: g("ctaHeading", config.ctaHeading),
    ctaText: g("ctaText", config.ctaText),
    ctaButton: g("ctaButton", config.ctaButton),
    painPoints: config.painPoints.map((p, i) => ({ pain: g(`painPoint_${i}_pain`, p.pain), detail: g(`painPoint_${i}_detail`, p.detail) })),
    included: config.included.map((it, i) => ({ title: g(`included_${i}_title`, it.title), desc: g(`included_${i}_desc`, it.desc) })),
    process: config.process.map((st, i) => ({ title: g(`process_${i}_title`, st.title), desc: g(`process_${i}_desc`, st.desc) })),
    whyLocal: config.whyLocal.map((w, i) => g(`whyLocal_${i}`, w)),
    relatedServices: config.relatedServices.map((rs, i) => ({ ...rs, title: g(`related_${i}_title`, rs.title), desc: g(`related_${i}_desc`, rs.desc) })),
    faqs: config.faqs.map((f, i) => ({ q: g(`faq_${i}_q`, f.q), a: g(`faq_${i}_a`, f.a) })),
  };
  const hasForm = !!c.leadForm;
  const formId = c.leadForm?.id || "audit-form";
  const ctaLabel = c.heroCta?.label || c.leadForm?.submitLabel || (hasForm ? "Get started" : "Book a Free Consultation");
  const ctaHref = hasForm ? "#" + formId : "/contact/#contact-form";
  const sections: ExtraSection[] = [...(c.earlySections || []).map((x) => ({ ...x, slot: "early" as const })), ...(c.extraSections || [])];
  const special = new Set(["about-guide", "visit-us", "get-started"]);
  const guide = sections.filter((x) => !special.has(x.id) && x.id !== "team");
  const early = guide.filter((x) => x.slot === "early");
  const late = guide.filter((x) => x.slot !== "early");
  const getStarted = sections.find((s) => s.id === "get-started");
  const team = sections.find((s) => s.id === "team");
  const about = sections.find((s) => s.id === "about-guide");
  const visit = sections.find((s) => s.id === "visit-us");

  // In-page navigation: what the visitor can jump to, in page order.
  const nav = useMemo(() => {
    const items: { id: string; label: string }[] = [
      { id: "overview", label: "Overview" },
      { id: "what-we-handle", label: "What you get" },
      { id: "how-it-works", label: "How it works" },
      ...early.slice(0, 2).map((s) => ({ id: s.id, label: chipLabel(s) })),
      { id: "proof", label: "Results" },
      ...late.slice(0, 2).map((s) => ({ id: s.id, label: chipLabel(s) })),
      { id: "faqs", label: "FAQs" },
      { id: hasForm ? formId : "final-cta", label: "Get started" },
    ];
    return items;
  }, [early, late, formId, hasForm]);

  const [active, setActive] = useState("overview");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => { if (window.scrollY < 260) setActive(nav[0].id); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [nav]);

  const stats = c.statsBand || [];

  return (
    <VariantCtx.Provider value={variant}>
    <PageLayout>
      {/* 1. Hero: the answer first, with the next step beside it */}
      <section className={`relative overflow-hidden px-5 pb-12 pt-[92px] md:px-8 md:pb-16 md:pt-[104px] ${pillar ? "lg:pb-20" : ""}`} style={{ background: pillar ? `linear-gradient(180deg, ${CREAM} 0%, #fff 100%)` : "#fff" }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${ORANGE}1f 0%, transparent 70%)`, filter: "blur(60px)" }} />
        <div className={`relative mx-auto grid items-start gap-10 lg:gap-14 ${c.quickAnswer || stats.length > 0 || pillar ? (pillar ? "max-w-7xl lg:grid-cols-[1fr_1fr]" : "max-w-6xl lg:grid-cols-[1.1fr_0.9fr]") : "max-w-4xl"}`}>
          <div>
            <Link to={c.parentServiceHref} className="mb-5 inline-flex items-center gap-1 text-xs font-bold hover:underline" style={{ color: ORANGE }}>
              ← Back to {c.parentServiceLabel}
            </Link>
            <div className="mb-5"><Eyebrow><MapPin size={11} className="mr-1 inline -mt-0.5" />{c.eyebrow}</Eyebrow></div>
            <h1 className={pillar ? "text-[30px] font-bold leading-[1.18] tracking-[-0.02em] md:text-[44px] lg:text-[50px]" : "text-[28px] font-black leading-[1.15] tracking-tight md:text-[40px]"} style={{ color: NAVY }}><span data-cms-key={k("h1")} data-cms-label="Hero Heading" data-cms-attr="text">{c.h1}</span></h1>
            <p className="mt-5 text-[17px] leading-relaxed text-[#4B5563] md:text-lg"><span data-cms-key={k("heroParagraph")} data-cms-label="Hero Paragraph" data-cms-attr="text">{c.heroParagraph}</span></p>
            {c.heroParagraph2 && (
              <p className="mt-4 flex gap-2.5 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed text-[#6B7280]" style={{ borderColor: "#E5E7EB", background: "#F8FAFC" }}>
                <Info size={16} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />{c.heroParagraph2}
              </p>
            )}
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Pill href={c.heroCta?.href || ctaHref} onClick={() => track("cta_click", { cta_label: ctaLabel, cta_location: "hero" })}>{ctaLabel} <ArrowRight size={16} /></Pill>
              <Pill href={whatsappLink(`Hello, I have a question about: ${c.h1}`)} variant="outline" external onClick={() => track("whatsapp_click", { cta_location: "hero" })}>
                <MessageCircle size={16} /> WhatsApp us
              </Pill>
              <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "hero" })} aria-label={`Call ${PHONE_DISPLAY}`} className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 px-3.5 py-2.5 text-[13.5px] font-bold hover:bg-[#FFF7F2] xl:border-transparent xl:px-2" style={{ color: NAVY, borderColor: "#E5E7EB" }}>
                <Phone size={16} style={{ color: ORANGE }} /> <span className="sm:hidden xl:inline">{PHONE_DISPLAY}</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-[#6B7280]">Free to ask. No obligation. We reply by email.</p>
          </div>

          {pillar && (
            <aside aria-label="What we cover" className="rounded-[28px] border bg-white p-7 md:p-8" style={{ borderColor: "#EDE3DA", boxShadow: "0 18px 50px rgba(26,29,54,0.08)" }}>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ORANGE }}>What we cover</p>
              <ul className="mt-5 space-y-3.5">
                {c.included.slice(0, 6).map((it) => (
                  <li key={it.title} className="flex gap-3 text-[15.5px] font-semibold leading-snug" style={{ color: NAVY }}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a`, color: GREEN }}><Check size={12} strokeWidth={3} /></span>{it.title}
                  </li>
                ))}
              </ul>
            </aside>
          )}
          {!pillar && (c.quickAnswer || stats.length > 0) && <div className="space-y-5 lg:sticky lg:top-[150px]">
          {c.quickAnswer && (
            <aside id="quick-answer" aria-label="Quick answer" className="rounded-3xl border bg-white p-6 md:p-7" style={{ borderColor: `${ORANGE}40`, boxShadow: `0 18px 50px ${ORANGE}1f` }}>
              <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: ORANGE }}><Sparkles size={14} /> Quick answer</p>
              <h2 className="mt-3 text-xl font-black leading-snug md:text-[22px]" style={{ color: NAVY }}>{c.quickAnswer.heading}</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[#374151]">{c.quickAnswer.answer}</p>
              {c.quickAnswer.points && (
                <ul className="mt-4 space-y-2.5">
                  {c.quickAnswer.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[14.5px] text-[#374151]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a`, color: GREEN }}><Check size={12} strokeWidth={3} /></span>{p}
                    </li>
                  ))}
                </ul>
              )}
              {c.lastUpdated && (
                <p className="mt-5 flex items-start gap-2 border-t pt-4 text-xs leading-relaxed text-[#6B7280]" style={{ borderColor: "#E5E7EB" }}>
                  <Clock size={14} className="mt-0.5 shrink-0" />
                  <span>Published by <a href="/about/" className="underline">Digital Aura</a>, 713 Shilp Arcade, SP Ring Road, Hanspura, Ahmedabad. Last updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time>.</span>
                </p>
              )}
            </aside>
          )}
          {stats.length > 0 && !pillar && (
            <ul className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <li key={s.label} className="rounded-2xl border bg-white px-4 py-3.5" style={{ borderColor: "#E5E7EB" }}>
                  <p className="text-2xl font-black" style={{ color: ORANGE }}>{s.value}</p>
                  <p className="text-[12.5px] leading-snug text-[#6B7280]">{s.label}</p>
                </li>
              ))}
            </ul>
          )}
          </div>}
        </div>
      </section>

      {/* Audit tools: the form is the first thing after the answer */}
      {c.leadForm && c.leadFormTop && <PageLeadForm cfg={c.leadForm} accent={ORANGE} />}

      {pillar && c.quickAnswer && (
        <Wrap id="quick-answer" bg="#fff">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Quick answer</Eyebrow>
              <h2 className="mt-6 text-[30px] font-bold leading-[1.12] tracking-[-0.02em] md:text-[42px] lg:text-[46px]" style={{ color: NAVY }}>{c.quickAnswer.heading}</h2>
              <p className="mt-6 text-[17px] leading-[1.8] text-[#5B5F7A] md:text-[19px]">{c.quickAnswer.answer}</p>
              <div className="mt-8">
                <Pill href={c.heroCta?.href || ctaHref} onClick={() => track("cta_click", { cta_label: ctaLabel, cta_location: "quick_answer" })}>{ctaLabel} <ArrowRight size={16} /></Pill>
              </div>
              {c.lastUpdated && (
                <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#6B7280]">
                  <Clock size={14} className="mt-0.5 shrink-0" />
                  <span>Published by <a href="/about/" className="underline">Digital Aura</a>, 713 Shilp Arcade, SP Ring Road, Hanspura, Ahmedabad. Last updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time>.</span>
                </p>
              )}
            </div>
            {c.quickAnswer.points && (
              <Card>
                <ul className="space-y-4">
                  {c.quickAnswer.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[16px] leading-snug text-[#374151]">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a`, color: GREEN }}><Check size={14} strokeWidth={3} /></span>{p}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </Wrap>
      )}

      {pillar && stats.length > 0 && (
        <section aria-label="Digital Aura in numbers" className="px-5 pb-4 md:px-8" style={{ background: "#fff" }}>
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="rounded-[28px] border bg-white px-5 py-7 text-center" style={{ borderColor: "#EDE3DA", boxShadow: "0 6px 24px rgba(26,29,54,0.05)" }}>
                <p className="text-4xl font-bold tracking-tight md:text-5xl" style={{ color: NAVY }}>{s.value}</p>
                <p className="mt-2 text-[14px] text-[#5B5F7A]">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 2. Sticky in-page navigation (industry pages only) */}
      {!pillar && <nav aria-label="On this page" className="z-30 border-y bg-white/95 backdrop-blur xl:sticky xl:top-[72px]" style={{ borderColor: "#E5E7EB" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ul className="grid grid-cols-3 gap-2 py-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-flow-col xl:auto-cols-fr xl:grid-cols-none xl:gap-2 xl:py-2.5">
            {nav.map((n) => {
              const on = active === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={"#" + n.id}
                    aria-current={on ? "true" : undefined}
                    className="block whitespace-nowrap rounded-full px-2 py-1.5 text-center text-[12.5px] font-semibold transition-colors xl:px-1 xl:text-[13px]"
                    style={on ? { background: ORANGE, color: "#fff" } : { color: "#374151", background: "#F3F4F6" }}
                  >
                    {n.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>}

      {/* 3. Overview: the problem we solve */}
      <Wrap id="overview" bg="#fff">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>{c.differentiatorBadge}</Eyebrow>
            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight md:text-[34px]" style={{ color: NAVY }}>
              {c.differentiatorHeading}{c.differentiatorHeading2 && <> <span style={{ color: ORANGE }}>{c.differentiatorHeading2}</span></>}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#4B5563]"><span data-cms-key={k("differentiatorText")} data-cms-label="Differentiator Text" data-cms-attr="text">{c.differentiatorText}</span></p>
            <div className="mt-6 flex gap-3 rounded-2xl border-l-4 px-5 py-4" style={{ background: SOFT, borderLeftColor: ORANGE }}>
              <ShieldAlert size={20} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />
              <p className="text-[14.5px] font-semibold leading-relaxed text-[#374151]"><span data-cms-key={k("warningText")} data-cms-label="Warning Text" data-cms-attr="text">{c.warningText}</span></p>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#DC2626]">{c.painPointsTitle}</p>
            <ul className="space-y-3">
              {c.painPoints.map((p) => (
                <li key={p.pain} className="flex gap-3.5 rounded-2xl border bg-white p-4" style={{ borderColor: "#FECACA", background: "#FFF8F8" }}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "#FEE2E2", color: "#DC2626" }}><X size={18} strokeWidth={3} /></span>
                  <div>
                    <p className="text-[15.5px] font-bold leading-snug" style={{ color: NAVY }}>{p.pain}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[#6B7280]">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>

      {/* 4. What you get */}
      <Wrap id="what-we-handle" bg="#F8FAFF">
        <Head eyebrow="What you get" title={<span data-cms-key={k("includedTitle")} data-cms-label="Included Title" data-cms-attr="text">{c.includedTitle}</span>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.included.map((item) => (
            <Card key={item.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${ORANGE}14`, color: ORANGE }}><Check size={22} strokeWidth={3} /></span>
              <div>
                <h3 className="text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{item.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#4B5563]">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </Wrap>

      {/* 5. How it works */}
      <Wrap id="how-it-works" bg="#fff">
        <Head eyebrow="How it works" title={<span data-cms-key={k("processTitle")} data-cms-label="Process Title" data-cms-attr="text">{c.processTitle}</span>} sub={c.processSubtext} />
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {c.process.map((s, i) => (
            <li key={s.title} className="relative">
              <Card className="flex h-full gap-4 md:block">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-black text-white" style={{ background: i === c.process.length - 1 ? GREEN : ORANGE }}>{i + 1}</span>
                <div>
                  <h3 className="text-[16px] font-bold leading-snug md:mt-4" style={{ color: NAVY }}>{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#4B5563]">{s.desc}</p>
                </div>
              </Card>
              {i < c.process.length - 1 && <ArrowRight size={18} className="absolute -right-4 top-10 hidden text-[#CBD5E1] lg:block" />}
            </li>
          ))}
        </ol>
      </Wrap>

      {/* 6. Guide sections that answer "is it safe, how exactly, what should I check" */}
      {early.map((s, i) => <GuideSection key={s.id} sec={s} index={i + 1} />)}

      {/* Mid-page call to action */}
      {c.leadForm && !c.leadFormTop && (
        <section className="relative overflow-hidden px-4 py-14 md:px-8" style={{ background: NAVY }}>
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full" style={{ background: `radial-gradient(circle, ${ORANGE}33, transparent 70%)` }} />
          <div className="relative mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">Want this done properly for your business?</h2>
              <p className="mt-2 max-w-xl text-[15.5px] text-[#CBD5E1]">Send your details. It is free to ask, and we reply by email.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Pill href={ctaHref} onClick={() => track("cta_click", { cta_label: ctaLabel, cta_location: "mid_band" })}>{ctaLabel} <ArrowRight size={16} /></Pill>
              <a href={whatsappLink(`Hello, I have a question about: ${c.h1}`)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { cta_location: "mid_band" })}
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/40 px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-white/10">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 7. Proof: same components as the home page */}
      <div id="proof" className="scroll-mt-32 xl:scroll-mt-36" style={{ marginBottom: "-60px" }}>
        <CaseStudies />
      </div>
      <Testimonials />

      {/* 8. More guidance */}
      {late.map((s, i) => <GuideSection key={s.id} sec={s} index={i} />)}

      {/* 9. Who you work with: reasons + team */}
      <Wrap id="why-us" bg="#F8FAFF">
        <Head eyebrow="Why us" title={<span data-cms-key={k("whyLocalTitle")} data-cms-label="Why Us Title" data-cms-attr="text">{c.whyLocalTitle}</span>} />
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {c.whyLocal.map((w) => (
            <li key={w} className="flex items-start gap-3 rounded-2xl border bg-white p-4" style={{ borderColor: "#E5E7EB" }}>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a`, color: GREEN }}><Check size={14} strokeWidth={3} /></span>
              <span className="text-[15px] leading-relaxed text-[#374151]">{w}</span>
            </li>
          ))}
        </ul>
        {team && team.kind === "team" && (
          <div className="mt-14">
            <Head eyebrow={team.eyebrow} title={team.title} sub={team.subtext} />
            <div className={`mx-auto grid gap-5 ${team.members.length >= 3 ? "md:grid-cols-3" : "max-w-3xl md:grid-cols-2"}`}>
              {team.members.map((m) => (
                <Card key={m.name}>
                  <div className="flex items-center gap-3">
                    <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" className="h-14 w-14 shrink-0 rounded-full bg-[#F3F4F6] object-cover" />
                    <div>
                      <h3 className="font-bold leading-tight" style={{ color: NAVY }}>{m.name}</h3>
                      <p className="text-sm font-semibold" style={{ color: ORANGE }}>{m.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{m.bio}</p>
                </Card>
              ))}
            </div>
            {team.founderLinks && <div className="mx-auto max-w-3xl"><FounderLinks accent={ORANGE} /></div>}
          </div>
        )}
      </Wrap>

      {/* 10. How to start */}
      {getStarted && getStarted.kind === "cards" && (
        <Wrap id="get-started" bg="#fff">
          <Head eyebrow={getStarted.eyebrow} title={getStarted.title} sub={getStarted.subtext} />
          <div className="grid gap-5 md:grid-cols-3">
            {getStarted.items.map((it, i) => {
              const Icon = i === 0 ? FileText : i === 1 ? MessageCircle : Phone;
              return (
                <Card key={it.title} className="flex flex-col items-start" style={i === 0 ? { borderColor: `${ORANGE}66`, boxShadow: `0 14px 36px ${ORANGE}1f` } : undefined}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${ORANGE}14`, color: ORANGE }}><Icon size={22} /></span>
                  <h3 className="mt-4 text-[17px] font-bold" style={{ color: NAVY }}>{it.title}</h3>
                  <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-[#4B5563]">{it.desc}</p>
                  {it.href && it.cta && (
                    <div className="mt-5 max-w-full">
                      <Pill href={it.href} variant={i === 0 ? "solid" : "outline"} external={/^https?:/.test(it.href)} onClick={() => track("cta_click", { cta_label: it.cta!, cta_location: "get_started" })}>
                        {it.cta} <ArrowRight size={15} />
                      </Pill>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </Wrap>
      )}

      {/* 11. Trust: who is behind this + where to find us */}
      {(about || visit) && (
        <Wrap id="about" bg="#F8FAFF">
          <div className="mx-auto grid max-w-4xl gap-6">
            {about && about.kind === "text" && (
              <Card className="p-7">
                <Eyebrow>{about.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-xl font-black md:text-2xl" style={{ color: NAVY }}>{about.title}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#4B5563]">{about.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
                {about.links && (
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    {about.links.map((l) => <Pill key={l.href} href={l.href} variant="outline" external={/^https?:/.test(l.href)}>{l.label}</Pill>)}
                  </div>
                )}
              </Card>
            )}
            {visit && visit.kind === "text" && (
              <Card className="p-7">
                <Eyebrow>{visit.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-xl font-black md:text-2xl" style={{ color: NAVY }}>{visit.title}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#4B5563]">{visit.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
                {visit.links && (
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    {visit.links.map((l, i) => (
                      <Pill key={l.href} href={l.href} variant={i === 0 ? "solid" : "outline"} external={/^https?:/.test(l.href)}>
                        {l.label}
                      </Pill>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </div>
        </Wrap>
      )}

      {!c.storyLayout && <BlogInsights />}

      {/* 12. Related pages */}
      {c.relatedServices.length > 0 && <Wrap id="related" bg="#fff">
        <Head eyebrow={c.relatedCategoryLabel} title="More Ways We Can Help" />
        <div className="grid gap-5 md:grid-cols-3">
          {c.relatedServices.map((s) => (
            <Card key={s.title} className="flex flex-col">
              <h3 className="text-[16px] font-bold" style={{ color: NAVY }}>{s.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#4B5563]">{s.desc}</p>
              <ul className="mt-3 flex-1 space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium text-[#374151]"><span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />{p}</li>
                ))}
              </ul>
              <Link to={s.href} className="mt-4 inline-flex items-center gap-1 text-sm font-bold hover:gap-2" style={{ color: ORANGE }}>
                Learn more<span className="sr-only"> about {s.title}</span> <ArrowRight size={14} />
              </Link>
            </Card>
          ))}
        </div>
      </Wrap>}

      {/* 13. Lead form (existing component) */}
      {c.leadForm && !c.leadFormTop && !pillar && <PageLeadForm cfg={c.leadForm} accent={ORANGE} />}

      {/* 14. FAQ */}
      <Wrap id="faqs" bg="#F8FAFF" narrow>
        <Head eyebrow="FAQs" title={c.faqTitle || "Frequently Asked Questions"} />
        <div className="divide-y" style={{ borderColor: "#E5E7EB" }}>
          {c.faqs.map((f) => <Faq key={f.q} q={f.q} a={f.a} />)}
        </div>
        {c.sources && c.sources.length > 0 && (
          <div className="mt-10 rounded-2xl border bg-white p-5" style={{ borderColor: "#E5E7EB" }}>
            <h2 className="text-[13px] font-black uppercase tracking-[0.14em]" style={{ color: NAVY }}>Sources and further reading</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {c.sources.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: ORANGE }}>{s.label}</a></li>
              ))}
            </ul>
          </div>
        )}
      </Wrap>

      {/* 15. Closing call to action */}
      <section id="final-cta" className={pillar ? "px-5 pb-16 pt-4 md:px-8 md:pb-20" : "relative overflow-hidden px-4 py-16 text-center md:px-8 md:py-20"} style={{ background: pillar ? "#fff" : NAVY }}>
        {pillar ? (
          <div className={`relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-14 md:px-14 md:py-20 ${c.leadForm && !c.leadFormTop ? "" : "text-center"}`} style={{ background: NAVY }}>
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full" style={{ background: `radial-gradient(circle, ${ORANGE}33, transparent 70%)` }} />
            {c.leadForm && !c.leadFormTop ? (
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
                <div>
                  <div className="mb-5"><Eyebrow>Let&apos;s Build Together</Eyebrow></div>
                  <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[46px]"><span data-cms-key={k("ctaHeading")} data-cms-label="CTA Heading" data-cms-attr="text">{c.ctaHeading}</span></h2>
                  <p className="mt-5 text-[17px] leading-[1.75] text-white/80 md:text-[19px]"><span data-cms-key={k("ctaText")} data-cms-label="CTA Text" data-cms-attr="text">{c.ctaText}</span></p>
                  {c.leadForm.text && <p className="mt-4 text-[15.5px] leading-relaxed text-white/70">{c.leadForm.text}</p>}
                  <div className="mt-6"><Pill href={ctaHref} onClick={() => track("cta_click", { cta_label: c.ctaButton, cta_location: "final" })}>{c.ctaButton} <ArrowRight size={16} /></Pill></div>
                  <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.16em] text-white/60">What happens next</p>
                  <ul className="mt-4 space-y-3">
                    {(c.leadForm.steps || ["You send your details", "We review them and reply by email", "You decide what to do next. No obligation."]).map((st) => (
                      <li key={st} className="flex items-start gap-3 text-[15.5px] font-semibold text-white/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: ORANGE }}><Check size={12} strokeWidth={3} /></span>{st}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-[15px] font-semibold text-white">Prefer to talk?</p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "final" })}
                      className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/40 px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-white/10">
                      <Phone size={16} /> {PHONE_DISPLAY}
                    </a>
                    <a href={whatsappLink(`Hello, I have a question about: ${c.leadForm.service}`)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { cta_location: "final" })}
                      className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/40 px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-white/10">
                      <MessageCircle size={16} /> Message us on WhatsApp
                    </a>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/60">713 Shilp Arcade, SP Ring Road, Hanspura, Ahmedabad. Monday to Saturday, 10 am to 7 pm.</p>
                </div>
                <PageLeadForm cfg={c.leadForm} accent={ORANGE} embedded />
              </div>
            ) : (
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[48px]"><span data-cms-key={k("ctaHeading")} data-cms-label="CTA Heading" data-cms-attr="text">{c.ctaHeading}</span></h2>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.75] text-white/80 md:text-[19px]"><span data-cms-key={k("ctaText")} data-cms-label="CTA Text" data-cms-attr="text">{c.ctaText}</span></p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Pill href={ctaHref} onClick={() => track("cta_click", { cta_label: c.ctaButton, cta_location: "final" })}>{c.ctaButton} <ArrowRight size={16} /></Pill>
                <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "final" })}
                  className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/40 px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-white/10">
                  <Phone size={16} /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            )}
          </div>
        ) : (<>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `radial-gradient(circle, ${ORANGE}26 0%, transparent 70%)` }} />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl"><span data-cms-key={k("ctaHeading")} data-cms-label="CTA Heading" data-cms-attr="text">{c.ctaHeading}</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[#CBD5E1]"><span data-cms-key={k("ctaText")} data-cms-label="CTA Text" data-cms-attr="text">{c.ctaText}</span></p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Pill href={ctaHref} onClick={() => track("cta_click", { cta_label: c.ctaButton, cta_location: "final" })}>{c.ctaButton} <ArrowRight size={16} /></Pill>
            <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "final" })}
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/40 px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-white/10">
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        </>)}
      </section>

      {c.leadForm && (
        <>
          <div className="h-16 md:hidden" aria-hidden="true" />
          <StickyCtaBar accent={ORANGE} label={ctaLabel} href={ctaHref} topic={c.h1} />
        </>
      )}
      <PillarLinks slug={config.slug} />
    </PageLayout>
    </VariantCtx.Provider>
  );
}
