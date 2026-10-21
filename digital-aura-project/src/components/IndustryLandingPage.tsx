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
import { AppLink } from "./AppLink";
import {
  ArrowRight, Check, X, Phone, MessageCircle, MapPin, ShieldAlert, Sparkles, Info, Clock, FileText,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PriceTable from "@/components/PriceTable";
import AuthorBox from "@/components/AuthorBox";
import { GUIDES } from "@/data/linkMap";
import RelatedGuides from "@/components/RelatedGuides";
import { PILLAR_TEAMS } from "@/data/pageExtras";
import CaseStudies, { type CaseCard } from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import PageLeadForm from "@/components/PageLeadForm";
import { StickyCtaBar } from "@/components/PageCta";
import PillarLinks from "@/components/PillarLinks";
import { renderInline } from "@/lib/inlineLinks";
import BlogInsights from "@/components/BlogInsights";
import AdsCalculator from "@/components/AdsCalculators";
import { ReelGrid, FounderLinks, MemberLinks } from "@/components/ReelsAndTeam";
import OfficeMap from "@/components/OfficeMap";
import VisitUs from "@/components/pillar/VisitUs";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";
import type { ExtraSection, LocalServiceConfig } from "@/components/LocalServicePage";
import { track, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/track";
import { InPillarContext, PillarFaq, PillarSection, PillarSubNav, PillarTabs, useInPillar } from "@/components/pillar/Pillar";
import TrustStrip from "@/components/pillar/TrustStrip";
import "@/pillar-pages.css";

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
/** True only for the standard pillar template (Meta Ads page); every other page keeps its current look. */
const StandardCtx = createContext(false);
const CREAM = "#FFF8F2";
/** Section grouping for the standard pillar template, so each SEO sub-page can group its own content. Tab keys: quick, problem, included, how, why, related, start, guides, or any extra section id. */
export type StdPart =
  | { type: "group"; id: string; tone: "white" | "light"; eyebrow: string; title: string; tabs: string[]; initial?: string }
  | { type: "proof"; tone?: "white" | "light" }
  | { type: "testimonials"; tone?: "white" | "light" }
  | { type: "team"; tone?: "white" | "light" }
  | { type: "explore"; tone?: "white" | "light"; title?: string };
export type StdLayout = {
  subnav: { href: string; label: string }[];
  parts: StdPart[];
  labels?: Record<string, string>;
  guides?: { topic: "seo" | "gads" | "meta" | "web"; slugs?: string[]; eyebrow: string; title: string; sub?: string; tabLabel?: string };
  visitLabel?: string;
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => {
  const std = useContext(StandardCtx);
  const pillar = useContext(VariantCtx) === "pillar";
  if (std) return <span className="pillar-eyebrow">{children}</span>;
  if (pillar) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm" style={{ borderColor: "#EDE3DA", color: "#3B3F5C" }}>
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
  const std = useContext(StandardCtx);
  const inGroup = useInPillar();
  const pillar = useContext(VariantCtx) === "pillar";
  if (std) {
    return inGroup ? (
      <div className="pillar-subhead">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3>{title}</h3>
        {sub && <p>{sub}</p>}
      </div>
    ) : (
      <div className="pillar-head">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
    );
  }
  return (
    <div className={`${pillar ? "mb-7 md:mb-9" : "mb-8 md:mb-10"} ${center ? (pillar ? "mx-auto max-w-6xl text-center" : "mx-auto max-w-3xl text-center") : "max-w-3xl"}`}>
      {eyebrow && <div className={pillar ? "mb-3.5" : "mb-4"}><Eyebrow>{eyebrow}</Eyebrow></div>}
      {pillar
        ? <h2 className="text-[26px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[30px] md:text-[34px]" style={{ color: NAVY }}>{title}</h2>
        : <h2 className="text-2xl font-black leading-tight tracking-tight md:text-[34px]" style={{ color: NAVY }}>{title}</h2>}
      {sub && <p className={pillar ? "mx-auto mt-3 max-w-2xl text-[16px] leading-[1.7] text-[#5B5F7A] md:text-[17px]" : "mt-3 text-[15.5px] leading-relaxed text-[#4B5563]"}>{sub}</p>}
    </div>
  );
};

const Wrap = ({ id, bg = "#fff", children, narrow = false }: { id?: string; bg?: string; children: React.ReactNode; narrow?: boolean }) => {
  const pillar = useContext(VariantCtx) === "pillar";
  return (
    <section id={id} className={`scroll-mt-32 xl:scroll-mt-36 px-5 md:px-8 ${pillar ? "py-9 md:py-11 lg:py-12" : "py-14 md:py-20"}`} style={{ background: pillar && bg === "#F8FAFF" ? CREAM : bg }}>
      <div className={`mx-auto ${narrow ? "max-w-4xl" : pillar ? "max-w-7xl" : "max-w-6xl"}`} {...(narrow ? { "data-narrow": "" } : {})}>{children}</div>
    </section>
  );
};

const Card = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const pillar = useContext(VariantCtx) === "pillar";
  const std = useContext(StandardCtx);
  return (
    <div className={`border bg-white ${pillar ? "rounded-2xl p-5" : "rounded-2xl p-6"} ${std ? "pillar-card" : ""} ${className}`}
      style={{ borderColor: pillar ? "#EDE3DA" : "#E5E7EB", boxShadow: pillar ? "0 2px 10px rgba(26,29,54,0.05)" : "0 2px 12px rgba(10,22,40,0.05)", ...style }}>{children}</div>
  );
};

const Pill = ({ href, children, variant = "solid", onClick, external = false }: { href: string; children: React.ReactNode; variant?: "solid" | "outline" | "ghost"; onClick?: () => void; external?: boolean }) => {
  const std = useContext(StandardCtx);
  if (std) {
    const cls = variant === "solid" ? "pillar-btn pillar-btn--primary" : variant === "outline" ? "pillar-btn pillar-btn--secondary" : "font-bold text-[#FF6B2B]";
    return <a href={href} onClick={onClick} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  }
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
      <button type="button" role="checkbox" aria-checked={on} onClick={() => setOn((v) => !v)} className="group flex w-full items-start gap-3 rounded-lg px-1 py-1.5 text-left">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors" style={{ borderRadius: 4, borderColor: on ? GREEN : "#94A3B8", background: on ? GREEN : "#fff" }}>
          {on && <Check size={13} color="#fff" strokeWidth={3} />}
        </span>
        <span className={`text-[14.5px] leading-relaxed ${on ? "text-[#6B7280] line-through decoration-[#9CA3AF]" : "text-[#374151]"}`}>{text}</span>
      </button>
    </li>
  );
}

function GuideSection({ sec, index }: { sec: ExtraSection; index: number }) {
  const pillar = useContext(VariantCtx) === "pillar";
  const std = useContext(StandardCtx);
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
          <ol className={`grid gap-5 ${items.length === 3 ? "md:grid-cols-3" : items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : std ? "md:grid-cols-3 2xl:grid-cols-5" : "md:grid-cols-3 lg:grid-cols-5"}`}>
            {items.map((it, i) => (
              <li key={it.title} className="relative">
                <Card className="h-full">
                  {pillar ? (
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: ORANGE }}>{it.tag}</p>
                      <h3 className="mt-1 text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{it.title}</h3>
                    </div>
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[15px] font-extrabold" style={{ background: ORANGE, color: "#fff", borderRadius: 9999 }}>{i + 1}</span>
                  )}
                  {!pillar && <p className="mt-4 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: ORANGE }}>{it.tag}</p>}
                  {!pillar && <h3 className="mt-1 text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{it.title}</h3>}
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#4B5563]">{it.desc}</p>
                </Card>
              </li>
            ))}
          </ol>
        ) : (
          <div className={`grid gap-5 sm:grid-cols-2 ${items.length === 2 ? "" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {items.map((it, n) => (
              <Card key={it.title} className="flex h-full flex-col">
                {it.tag && <p className="mb-2 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: ORANGE }}>{it.tag}</p>}
                <div className="flex items-center gap-3">
                  {!it.tag && items.length >= 5 && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[14px] font-extrabold" style={{ background: `${ORANGE}1a`, color: ORANGE }}>{String(n + 1).padStart(2, "0")}</span>
                  )}
                  <h3 className="text-[16px] font-bold leading-snug" style={{ color: NAVY }}>
                    {it.href && !it.cta ? <a href={it.href} className="hover:underline">{it.title}</a> : it.title}
                  </h3>
                </div>
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

  if (sec.kind === "pricing") {
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <PriceTable columns={sec.columns} rows={sec.rows} accent={ORANGE} featuredCol={sec.featuredCol} caption={sec.title} />
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
        <p className="mt-4 text-center text-xs text-[#6B7280]">Tap an item to tick it off as you go.</p>
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

  if (sec.kind === "team" && std && sec.members.length >= 2) {
    const [lead, ...rest] = sec.members;
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <div className="mx-auto max-w-6xl">
          <div className="pillar-team-founder">
            <img src={lead.photo} alt={`${lead.name}, ${lead.role} at Digital Aura`} width={96} height={96} loading="lazy" />
            <div>
              <h3>{lead.name}</h3>
              <p className="pillar-team-role">{lead.role}</p>
              <p className="pillar-team-bio">{lead.bio}</p>
              <MemberLinks links={lead.links} accent={ORANGE} />
            </div>
          </div>
          <div className="pillar-team-grid" style={{ "--team-cols": rest.length } as React.CSSProperties}>
            {rest.map((m) => (
              <div key={m.name} className="pillar-team-card">
                <div className="pillar-team-card-top">
                  <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" />
                  <div>
                    <h3>{m.name}</h3>
                    <p className="pillar-team-role">{m.role}</p>
                  </div>
                </div>
                <p className="pillar-team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
        {sec.founderLinks && <div className="mx-auto max-w-3xl"><FounderLinks accent={ORANGE} /></div>}
        {foot}
      </Wrap>
    );
  }

  if (sec.kind === "team") {
    return (
      <Wrap id={sec.id} bg={bg}>
        <Head eyebrow={eyebrow} title={sec.title} sub={sub} />
        <div className={`mx-auto grid gap-5 ${pillar && sec.members.length >= 4 ? "lg:grid-cols-[1fr_1.7fr]" : sec.members.length > 3 ? "sm:grid-cols-2 lg:grid-cols-3" : sec.members.length === 3 ? "md:grid-cols-3" : "max-w-3xl md:grid-cols-2"}`}>
          {pillar && sec.members.length >= 4 ? (<>
            <Card className="border-2 !bg-[#FFF8F2]" style={{ borderColor: `${ORANGE}66` }}>
              <div className="flex items-center gap-4">
                <img src={sec.members[0].photo} alt={`${sec.members[0].name}, ${sec.members[0].role} at Digital Aura`} width={72} height={72} loading="lazy" className="h-[72px] w-[72px] shrink-0 rounded-2xl bg-white object-cover" />
                <div>
                  <h3 className="text-[19px] font-bold leading-tight" style={{ color: NAVY }}>{sec.members[0].name}</h3>
                  <p className="text-sm font-semibold" style={{ color: ORANGE }}>{sec.members[0].role}</p>
                </div>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-[#4B5563]">{sec.members[0].bio}</p>
              <MemberLinks links={sec.members[0].links} accent={ORANGE} />
            </Card>
            <div className="pillar-cols-2 grid gap-5 sm:grid-cols-2">
              {sec.members.slice(1).map((m) => (
                <Card key={m.name}>
                  <div className="flex items-center gap-3">
                    <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-full bg-[#F3F4F6] object-cover" />
                    <div>
                      <h3 className="font-bold leading-tight" style={{ color: NAVY }}>{m.name}</h3>
                      <p className="text-sm font-semibold" style={{ color: ORANGE }}>{m.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#4B5563]">{m.bio}</p>
                </Card>
              ))}
            </div>
          </>) : sec.members.map((m) => (
            <Card key={m.name}>
              <div className="flex items-center gap-3">
                <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" className="h-14 w-14 shrink-0 rounded-full bg-[#F3F4F6] object-cover" />
                <div>
                  <h3 className="font-bold leading-tight" style={{ color: NAVY }}>{m.name}</h3>
                  <p className="text-sm font-semibold" style={{ color: ORANGE }}>{m.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{m.bio}</p>
              <MemberLinks links={m.links} accent={ORANGE} />
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
        <div className="space-y-4 text-[16px] leading-relaxed text-[#4B5563]">{sec.paragraphs.map((p) => <p key={p}>{renderInline(p)}</p>)}</div>
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

export default function IndustryLandingPage({ config, variant = "industry", officeMap: officeMapProp = false, caseCards, caseSub, standard = false, layout: layoutProp }: { config: LocalServiceConfig; variant?: Variant; /** Custom section grouping for the standard template (SEO sub-pages). The Meta page omits it and keeps its own layout. */ layout?: StdLayout | "auto"; /** Standard pillar template (same section order and look as the SEO / Google Ads pages). */ standard?: boolean; /** Service-specific case study cards (defaults to the home page set). */ caseCards?: CaseCard[]; caseSub?: string; /** Show the Google Map + "Talk to us" block above the footer instead of the "Visit us" card. */ officeMap?: boolean }) {
  const pillar = variant === "pillar";
  // Cluster pages (layout="auto") on Ahmedabad pages show the same "Find us" map block as the SEO sub-pages. Map stays Ahmedabad-only.
  const officeMap = officeMapProp || (layoutProp === "auto" && /ahmedabad/i.test(`${config.slug} ${config.h1} ${config.eyebrow}`));
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

  // Standard pillar template (Meta Ads page): same section order and look as the SEO / Google Ads pages. Existing content is only rearranged.
  if (standard) {
    const pool = [...early, ...late];
    // "auto": cluster pages. Same tabbed pillar layout as the SEO sub-pages, grouping this page's own sections by position (nothing is dropped; leftovers go to "Keep exploring").
    const autoTopic = /google-ads/.test(c.parentServiceHref || "") ? "gads" : /meta-ads/.test(c.parentServiceHref || "") ? "meta" : /seo/.test(c.parentServiceHref || "") ? "seo" : "web";
    const autoLabel = (sec: { title: string; jumpLabel?: string }) => {
      if (sec.jumpLabel && !/^(guide|checklist|do and avoid)$/i.test(sec.jumpLabel)) return sec.jumpLabel;
      const words = sec.title.split(/[:?,]/)[0].trim().split(/\s+/);
      while (words.length > 2 && /^(the|a|an|our|your)$/i.test(words[0])) words.shift();
      let out = words[0];
      for (let i = 1; i < words.length; i++) { if ((out + " " + words[i]).length > 24) break; out += " " + words[i]; }
      return out.charAt(0).toUpperCase() + out.slice(1);
    };
    const costSec = pool.find((x) => x.id === "cost");
    const mid = pool.filter((x) => x !== costSec && x.kind !== "team");
    // Cluster pages always show the pillar team for their service: founder first, then the members relevant to that service (same people and wording as the pillar page).
    const autoTeam: ExtraSection | undefined = layoutProp === "auto" ? {
      kind: "team", id: "team", eyebrow: "Our team",
      title: autoTopic === "web" ? "Meet the team behind every website we build" : `Meet the team behind your ${autoTopic === "seo" ? "SEO" : autoTopic === "gads" ? "Google Ads" : "Meta ads"}`,
      subtext: `Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that ${autoTopic === "web" ? "plans, designs and builds your website" : autoTopic === "seo" ? "plans and runs your SEO" : autoTopic === "gads" ? "plans and runs your Google Ads" : "plans and runs your Meta ads"}.`,
      members: PILLAR_TEAMS[autoTopic],
    } : undefined;
    const layout: StdLayout | undefined = layoutProp === "auto" ? {
      visitLabel: c.heroCta?.label || "Get a free review",
      labels: { ...Object.fromEntries(pool.map((x) => [x.id, autoLabel(x)])), cost: "What it costs" },
      guides: { topic: autoTopic, tabLabel: `${autoTopic === "seo" ? "SEO" : autoTopic === "gads" ? "Google Ads" : autoTopic === "meta" ? "Meta ads" : "Website"} guides`, eyebrow: "Guides from our team", title: "Read the plain-English guides before you decide", sub: "Written by our team. They help you judge any proposal, ours included." },
      subnav: [
        { href: "#overview-group", label: "Overview" }, { href: "#services", label: "Services" }, { href: "#process", label: "Process" },
        { href: "#results-proof", label: "Results" }, { href: "#pricing", label: "Pricing" }, { href: "#faqs", label: "FAQs" },
      ],
      parts: [
        { type: "group", id: "overview-group", tone: "white", eyebrow: "Overview", title: "What this covers, and the real problem", tabs: ["quick", "problem", ...(mid[0] ? [mid[0].id] : [])] },
        { type: "group", id: "services", tone: "light", eyebrow: "What's included", title: "What you get", tabs: ["included", ...(mid[1] ? [mid[1].id] : [])] },
        { type: "group", id: "process", tone: "white", eyebrow: "Our process", title: "How we work", tabs: ["how", ...(mid[2] ? [mid[2].id] : [])] },
        { type: "proof", tone: "light" },
        { type: "testimonials", tone: "white" },
        { type: "group", id: "pricing", tone: "light", eyebrow: "Fit & cost", title: costSec ? "What it costs, and why work with us" : "What to know, and why work with us", tabs: [...(costSec ? ["cost"] : []), "why", ...mid.slice(3).map((x) => x.id)] },
        { type: "team", tone: "white" },
        { type: "explore", tone: "light" },
      ],
    } : layoutProp;
    const labelFor: Record<string, string> = {
      "short-answer": "The short answer", "who-its-for": "Who it suits", "ad-formats": "Facebook, Instagram or WhatsApp",
      "monthly-work": "Monthly work", "first-30-days": "First 30 days", "tracking-lead-quality": "Tracking and lead quality",
      creative: "Creative", industries: "Industries", "ahmedabad-calendar": "Ahmedabad calendar", "industry-pages": "Industry guides",
      "management-fee": "Management fee", "ad-languages": "Ads in your language", cost: "What it costs", "meta-vs-google": "Meta vs Google Ads", "choose-an-agency": "How to choose",
    };
    const gtab = (id: string) => {
      const sec = pool.find((x) => x.id === id);
      return sec ? { id, label: labelFor[id] || chipLabel(sec), content: <GuideSection sec={sec} index={0} /> } : null;
    };
    const tabs = (list: ({ id: string; label: string; content: React.ReactNode } | null)[]) => list.filter(Boolean) as { id: string; label: string; content: React.ReactNode }[];
    const mapped = new Set(Object.keys(labelFor).concat(["meta-videos"]));
    const teamSec = team || pool.find((x) => x.kind === "team");
    const restSections = pool.filter((x) => !mapped.has(x.id) && x.id !== "meta-videos" && x !== teamSec);
    const videos = pool.find((x) => x.id === "meta-videos");
    const QuickBlock = c.quickAnswer ? (
      <Wrap id="quick-answer" bg="#fff">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <Eyebrow>Quick answer</Eyebrow>
            <h3 className="mt-3 text-[22px] font-bold leading-[1.2] tracking-[-0.01em] md:text-[26px]" style={{ color: NAVY }}>{c.quickAnswer.heading}</h3>
            <p className="mt-4 text-[16px] leading-[1.75] text-[#5B5F7A] md:text-[17px]">{renderInline(c.quickAnswer.answer)}</p>
            {c.lastUpdated && (
              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#6B7280]">
                <Clock size={14} className="mt-0.5 shrink-0" />
                <span>Published by <a href="/about/" className="underline">Digital Aura</a>. Last updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time>.</span>
              </p>
            )}
          </div>
          {c.quickAnswer.points && (
            <Card>
              <ul className="space-y-4">
                {c.quickAnswer.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-snug text-[#374151]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a`, color: GREEN }}><Check size={14} strokeWidth={3} /></span>{p}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </Wrap>
    ) : null;

    const OverviewBlock = (
      <Wrap id="overview" bg="#fff">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>{c.differentiatorBadge}</Eyebrow>
            <h3 className="mt-3 text-[22px] font-bold leading-[1.2] tracking-[-0.01em] md:text-[26px]" style={{ color: NAVY }}>
              {c.differentiatorHeading}{c.differentiatorHeading2 && <> <span style={{ color: ORANGE }}>{c.differentiatorHeading2}</span></>}
            </h3>
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
    );

    const IncludedBlock = (
      <Wrap id="what-we-handle" bg="#fff">
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
    );

    const ProcessBlock = (
      <Wrap id="how-it-works" bg="#fff">
        <Head eyebrow="How it works" title={<span data-cms-key={k("processTitle")} data-cms-label="Process Title" data-cms-attr="text">{c.processTitle}</span>} sub={c.processSubtext} />
        <ol className={`grid gap-5 md:grid-cols-2 ${c.process.length === 3 ? "lg:grid-cols-3" : c.process.length >= 5 ? "lg:grid-cols-3 2xl:grid-cols-5" : c.process.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4"}`}>
          {c.process.map((s, i) => (
            <li key={s.title}>
              <Card className="h-full">
                <p className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: ORANGE }}>Step {i + 1}</p>
                <h3 className="mt-1 text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{s.title.replace(/^\d+\.\s+/, "")}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4B5563]">{s.desc}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Wrap>
    );

    const WhyBlock = (
      <Wrap id="why-us" bg="#fff">
        <Head eyebrow="Why us" title={<span data-cms-key={k("whyLocalTitle")} data-cms-label="Why Us Title" data-cms-attr="text">{c.whyLocalTitle.split("Digital Aura").flatMap((part, i, arr) => (i < arr.length - 1 ? [part, <span key={i} style={{ color: ORANGE }}>Digital Aura</span>] : [part]))}</span>} />
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {c.whyLocal.map((w) => (
            <li key={w} className="flex items-start gap-3 rounded-2xl border bg-white p-4" style={{ borderColor: "#EDE3DA" }}>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a`, color: GREEN }}><Check size={14} strokeWidth={3} /></span>
              <span className="text-[15px] leading-relaxed text-[#374151]">{w}</span>
            </li>
          ))}
        </ul>
      </Wrap>
    );

    const RelatedBlock = c.relatedServices.length > 0 ? (
      <Wrap id="related" bg="#fff">
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
              <AppLink to={s.href} className="mt-4 inline-flex items-center gap-1 text-sm font-bold hover:gap-2" style={{ color: ORANGE }}>
                Learn more<span className="sr-only"> about {s.title}</span> <ArrowRight size={14} />
              </AppLink>
            </Card>
          ))}
        </div>
      </Wrap>
    ) : null;

    const StartBlock = getStarted && getStarted.kind === "cards" ? (
      <Wrap id="get-started" bg="#fff">
        <Head eyebrow={getStarted.eyebrow} title={getStarted.title} sub={getStarted.subtext} />
        <div className="grid gap-5 md:grid-cols-3">
          {getStarted.items.map((it, i) => {
            const Icon = i === 0 ? FileText : i === 1 ? MessageCircle : Phone;
            return (
              <Card key={it.title} className="flex flex-col items-start">
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
    ) : null;

    const aboutBlock = (sec: ExtraSection | undefined) => sec && sec.kind === "text" ? (
      <Wrap id={sec.id === "about-guide" ? "about" : sec.id} bg="#fff" narrow>
        <Card className="p-7">
          <Eyebrow>{sec.eyebrow}</Eyebrow>
          <h3 className="mt-3 text-xl font-bold md:text-2xl" style={{ color: NAVY }}>{sec.title}</h3>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#4B5563]">{sec.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
          {sec.links && (
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              {sec.links.map((l, i) => <Pill key={l.href} href={l.href} variant={i === 0 && sec.id === "visit-us" ? "solid" : "outline"} external={/^https?:/.test(l.href)}>{l.label}</Pill>)}
            </div>
          )}
        </Card>
      </Wrap>
    ) : null;

    const shortSec = pool.find((x) => x.id === "short-answer");
    const shortTab = shortSec ? { id: "short-answer", label: labelFor["short-answer"], content: <div className="pillar-center"><GuideSection sec={shortSec} index={0} /></div> } : null;
    const industryTabs = tabs([gtab("industries"), gtab("ahmedabad-calendar"), gtab("industry-pages"), gtab("ad-languages")]);
    const GuidesBlock = (
      <Wrap id="meta-guides" bg="#fff">
        <Head eyebrow="Meta ads guides" title="Learn how Meta ads work before you hire anyone" sub="Plain-English guides from our team. Read them to judge any Meta ads proposal, ours included." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.meta.map((g) => (
            <a key={g.slug} href={`/blog/${g.slug}/`} className="group flex h-full flex-col justify-between gap-3 rounded-2xl border bg-white p-5 transition-shadow hover:shadow-md" style={{ borderColor: "#E5E7EB" }}>
              <span className="text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{g.title}</span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2" style={{ color: ORANGE }}>Read the guide <ArrowRight size={14} /></span>
            </a>
          ))}
        </div>
      </Wrap>
    );
    const exploreFinal = tabs([
      RelatedBlock ? { id: "related", label: "More ways we can help", content: RelatedBlock } : null,
      StartBlock ? { id: "start", label: "How to start", content: StartBlock } : null,
      { id: "guides", label: "Meta ads guides", content: GuidesBlock },
      ...restSections.map((sec) => ({ id: sec.id, label: chipLabel(sec), content: <GuideSection sec={sec} index={0} /> })),
    ]);

    // Generic standard layout (SEO sub-pages): the same blocks as above, grouped into tabbed sections as the page's own content calls for.
    const genericMiddle = layout ? (() => {
      const gl = layout.guides;
      const guideList = gl ? (gl.slugs ? gl.slugs.map((sl) => GUIDES[gl.topic].find((x) => x.slug === sl)).filter(Boolean) : GUIDES[gl.topic]) as { slug: string; title: string }[] : [];
      const GuidesGeneric = gl && guideList.length ? (
        <Wrap id={`${gl.topic}-guides`} bg="#fff">
          <Head eyebrow={gl.eyebrow} title={gl.title} sub={gl.sub} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guideList.map((g) => (
              <a key={g.slug} href={`/blog/${g.slug}/`} className="group flex h-full flex-col justify-between gap-3 rounded-2xl border bg-white p-5 transition-shadow hover:shadow-md" style={{ borderColor: "#E5E7EB" }}>
                <span className="text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{g.title}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2" style={{ color: ORANGE }}>Read the guide <ArrowRight size={14} /></span>
              </a>
            ))}
          </div>
        </Wrap>
      ) : null;
      const keyed: Record<string, { label: string; node: React.ReactNode }> = {
        quick: { label: "Quick answer", node: QuickBlock },
        problem: { label: "The real problem", node: OverviewBlock },
        included: { label: "What you get", node: IncludedBlock },
        how: { label: "How it works", node: ProcessBlock },
        why: { label: "Why Digital Aura", node: WhyBlock },
        related: { label: "More ways we can help", node: RelatedBlock },
        start: { label: "How to start", node: StartBlock },
        guides: { label: gl?.tabLabel || "Guides", node: GuidesGeneric },
      };
      const used = new Set<string>();
      const tabFor = (key: string) => {
        used.add(key);
        const k2 = keyed[key];
        if (k2) return k2.node ? { id: key, label: layout.labels?.[key] || k2.label, content: k2.node } : null;
        const sec = pool.find((x) => x.id === key);
        return sec ? { id: key, label: layout.labels?.[key] || chipLabel(sec), content: <GuideSection sec={sec} index={0} /> } : null;
      };
      const teamSec2 = autoTeam || team || pool.find((x) => x.kind === "team");
      const asTabs = (keys: string[], label: string, initial?: string) => {
        const t = tabs(keys.map(tabFor));
        if (t.length === 0) return null;
        return t.length === 1 ? t[0].content : <PillarTabs label={label} initial={initial} tabs={t} />;
      };
      const parts = layout.parts.map((part, i) => {
        if (part.type === "group") {
          const body = asTabs(part.tabs, part.eyebrow, part.initial);
          return body ? <PillarSection key={part.id} id={part.id} tone={part.tone} eyebrow={part.eyebrow} title={part.title}>{body}</PillarSection> : null;
        }
        if (part.type === "proof") return <PillarSection key="proof" id="results-proof" tone={part.tone ?? "white"} bare noHead><CaseStudies cases={caseCards} sub={caseSub} centered /></PillarSection>;
        if (part.type === "testimonials") return <PillarSection key="testimonials" tone={part.tone ?? "white"} bare noHead><Testimonials /></PillarSection>;
        if (part.type === "team") return teamSec2 ? <PillarSection key="team" tone={part.tone ?? "white"} bare noHead><GuideSection sec={teamSec2} index={0} /></PillarSection> : null;
        // "explore": link cards and any leftover sections, so no existing content is dropped
        const left = pool.filter((x) => !used.has(x.id) && x !== teamSec2 && x.kind !== "team");
        const exploreTabs = tabs([
          ...((layoutProp === "auto" ? ["related", "guides"] : ["related", "start", "guides"]) as ("related" | "start" | "guides")[]).map((key) => (used.has(key) ? null : tabFor(key))),
          ...left.map((sec) => ({ id: sec.id, label: layout.labels?.[sec.id] || chipLabel(sec), content: <GuideSection sec={sec} index={0} /> })),
          about && layoutProp !== "auto" ? { id: "about", label: "About this page", content: aboutBlock(about) } : null,
          visit && !officeMap ? { id: "visit", label: "Visit us", content: aboutBlock(visit) } : null,
        ]);
        return exploreTabs.length ? (
          <PillarSection key={`explore-${i}`} id="explore" tone={part.tone ?? "light"} eyebrow="Keep exploring" title={part.title ?? "More ways we can help, and how to start"}>
            {exploreTabs.length === 1 ? exploreTabs[0].content : <PillarTabs label="Explore" tabs={exploreTabs} />}
          </PillarSection>
        ) : null;
      });
      return <>{parts}</>;
    })() : null;

    const subnav = layout?.subnav ?? [
      { href: "#overview-group", label: "Overview" }, { href: "#services", label: "Services" }, { href: "#process", label: "Process" },
      { href: "#results-proof", label: "Results" }, { href: "#pricing", label: "Pricing" }, { href: "#faqs", label: "FAQs" },
    ];

    return (
      <VariantCtx.Provider value="pillar">
      <StandardCtx.Provider value={true}>
      <PageLayout>
        <div className="pillar-page">
          {/* 1. Hero: text on the left, the lead form on the right */}
          <section id="top" className="relative overflow-hidden px-5 pb-12 pt-[92px] md:px-8 md:pb-16 md:pt-[104px]" style={{ background: `linear-gradient(180deg, ${CREAM} 0%, #fff 100%)` }}>
            <div className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${ORANGE}1f 0%, transparent 70%)`, filter: "blur(60px)" }} />
            <div className="relative mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div>
                <AppLink to={c.parentServiceHref} className="mb-5 inline-flex items-center gap-1 text-xs font-bold hover:underline" style={{ color: ORANGE }}>
                  ← Back to {c.parentServiceLabel}
                </AppLink>
                <div className="mb-5"><Eyebrow><MapPin size={11} className="mr-1 inline -mt-0.5" />{c.eyebrow}</Eyebrow></div>
                <h1 className="font-bold leading-[1.18] tracking-[-0.02em]" style={{ color: NAVY, fontSize: "clamp(30px, 4vw, 48px)" }}><span data-cms-key={k("h1")} data-cms-label="Hero Heading" data-cms-attr="text">{c.h1}</span></h1>
                <p className="mt-5 text-[17px] leading-relaxed text-[#4B5563] md:text-lg"><span data-cms-key={k("heroParagraph")} data-cms-label="Hero Paragraph" data-cms-attr="text">{c.heroParagraph}</span></p>
                {c.heroParagraph2 && (
                  <p className="mt-4 flex gap-2.5 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed text-[#6B7280]" style={{ borderColor: "#E5E7EB", background: "#F8FAFC" }}>
                    <Info size={16} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />{c.heroParagraph2}
                  </p>
                )}
                {(() => {
                  const cta = <Pill href={c.heroCta?.href || ctaHref} onClick={() => track("cta_click", { cta_label: ctaLabel, cta_location: "hero" })}>{ctaLabel} <ArrowRight size={16} /></Pill>;
                  const wa = (
                    <Pill href={whatsappLink(`Hello, I have a question about: ${c.h1}`)} variant="outline" external onClick={() => track("whatsapp_click", { cta_location: "hero" })}>
                      <MessageCircle size={16} /> WhatsApp us
                    </Pill>
                  );
                  const ph = (
                    <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "hero" })} aria-label={`Call ${PHONE_DISPLAY}`} className="pillar-btn pillar-btn--secondary">
                      <Phone size={16} style={{ color: ORANGE }} /> {PHONE_DISPLAY}
                    </a>
                  );
                  // SEO sub-pages: main button on its own row, WhatsApp and phone side by side below it (no lone wrapped button).
                  return layout ? (
                    <div className="mt-7 space-y-3"><div className="pillar-btn-row">{cta}</div><div className="pillar-btn-row">{wa}{ph}</div></div>
                  ) : (
                    <div className="pillar-btn-row mt-7">{cta}{wa}{ph}</div>
                  );
                })()}
                <p className="mt-3 text-xs text-[#6B7280]">Free to ask. No obligation. We reply by email.</p>
                <aside aria-label="What we cover" className="mt-8 rounded-2xl border bg-white p-5" style={{ borderColor: "#EDE3DA", boxShadow: "0 2px 10px rgba(26,29,54,0.05)" }}>
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ORANGE }}>What we cover</p>
                  <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {c.included.slice(0, 6).map((it) => (
                      <li key={it.title} className="flex gap-2.5 text-[14.5px] font-semibold leading-snug" style={{ color: NAVY }}>
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a`, color: GREEN }}><Check size={12} strokeWidth={3} /></span>{it.title}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
              {c.leadForm && (
                <div>
                  <div className="mb-4">
                    <h2 className="text-[22px] font-bold leading-tight md:text-[26px]" style={{ color: NAVY }}>{c.leadForm.heading}</h2>
                    {c.leadForm.text && <p className="mt-1.5 text-[15px] leading-relaxed text-[#5B5F7A]">{c.leadForm.text}</p>}
                  </div>
                  <PageLeadForm cfg={c.leadForm} accent={ORANGE} embedded />
                </div>
              )}
            </div>
          </section>
          {!layout && <TrustStrip stats={stats} />}
          <PillarSubNav items={subnav} />

          {layout ? genericMiddle : (<>
          {/* 2. Overview */}
          <PillarSection id="overview-group" tone="white" eyebrow="Overview" title="What Meta ads management in Ahmedabad covers">
            <PillarTabs label="Overview" initial="short-answer" tabs={tabs([QuickBlock ? { id: "quick", label: "Quick answer", content: QuickBlock } : null, shortTab])} />
          </PillarSection>

          {/* 3. Problems we solve */}
          <PillarSection id="problems" tone="light" eyebrow="Problems we solve" title="Where Meta ads go wrong, and who they suit">
            <PillarTabs label="Problems we solve" tabs={tabs([{ id: "problem", label: "The real problem", content: OverviewBlock }, gtab("who-its-for")])} />
          </PillarSection>

          {/* 4. Services */}
          <PillarSection id="services" tone="white" eyebrow="What's included" title="What our Meta ads service includes">
            <PillarTabs label="Services" tabs={tabs([{ id: "included", label: "What you get", content: IncludedBlock }, gtab("ad-formats"), gtab("monthly-work")])} />
          </PillarSection>

          {/* 5. Process */}
          <PillarSection id="process" tone="light" eyebrow="Our process" title="How we work, and what happens in the first 30 days">
            <PillarTabs label="Process" tabs={tabs([{ id: "how", label: "How it works", content: ProcessBlock }, gtab("first-30-days")])} />
          </PillarSection>

          {/* 6. Tracking and creative */}
          <PillarSection id="tracking" tone="white" eyebrow="Tracking & creative" title="Tracking, lead quality and the creative behind every campaign">
            <PillarTabs label="Tracking and creative" tabs={tabs([gtab("tracking-lead-quality"), gtab("creative")])} />
          </PillarSection>

          {/* 7. Industries */}
          <PillarSection id="industries-group" tone="light" eyebrow="Who we serve" title="Industries, the Ahmedabad calendar and the languages we run Meta ads in">
            <PillarTabs label="Industries" initial="industry-pages" tabs={industryTabs} />
          </PillarSection>

          {/* 8. Results & proof */}
          <PillarSection id="results-proof" tone="white" bare noHead>
            <CaseStudies cases={caseCards} sub={caseSub} centered />
          </PillarSection>
          {videos && (
            <PillarSection tone="light" bare noHead>
              <GuideSection sec={videos} index={0} />
            </PillarSection>
          )}

          {/* 9. Testimonials */}
          <PillarSection tone="white" bare noHead>
            <Testimonials />
          </PillarSection>

          {/* 10. Pricing and comparison */}
          <PillarSection id="pricing" tone="light" eyebrow="Pricing & comparison" title="What Meta ads cost, and how to choose an agency">
            <PillarTabs label="Pricing and comparison" tabs={tabs([gtab("management-fee"), gtab("cost"), { id: "why", label: "Why Digital Aura", content: WhyBlock }, gtab("meta-vs-google"), gtab("choose-an-agency")])} />
          </PillarSection>

          {/* 11. Team */}
          {teamSec && (
            <PillarSection tone="white" bare noHead>
              <GuideSection sec={teamSec} index={0} />
            </PillarSection>
          )}

          {/* Link cards */}
          {(exploreFinal.length > 0 || about || visit) && (
            <PillarSection id="explore" tone="light" eyebrow="Keep exploring" title="More ways we can help, and how to start">
              <PillarTabs
                label="Explore"
                tabs={tabs([
                  ...exploreFinal,
                  about ? { id: "about", label: "About this page", content: aboutBlock(about) } : null,
                  visit && !officeMap ? { id: "visit", label: "Visit us", content: aboutBlock(visit) } : null,
                ])}
              />
            </PillarSection>
          )}
          </>)}
          {(!c.storyLayout || layoutProp === "auto") && (
            <PillarSection tone="white" bare noHead>
              <BlogInsights />
            </PillarSection>
          )}

          {/* 12. FAQ (always open) */}
          <PillarSection id="faqs" tone="light" eyebrow="FAQs" title={c.faqTitle || "Frequently Asked Questions"}>
            <PillarFaq items={c.faqs} />
          </PillarSection>

          {/* 13. Final CTA + form */}
          <section id="final-cta" className="pillar-section pillar-section--navy">
            <div className="pillar-container">
              <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
                <div>
                  <div className="mb-3"><Eyebrow>Let&apos;s Build Together</Eyebrow></div>
                  <h2 className="mb-5 font-bold leading-[1.15] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(26px, 2.8vw, 34px)" }}><span data-cms-key={k("ctaHeading")} data-cms-label="CTA Heading" data-cms-attr="text">{c.ctaHeading}</span></h2>
                  <p className="text-[17px] leading-[1.7] text-white/80"><span data-cms-key={k("ctaText")} data-cms-label="CTA Text" data-cms-attr="text">{c.ctaText}</span></p>
                  {c.leadForm?.text && <p className="mt-4 text-[15.5px] leading-relaxed text-white/70">{c.leadForm.text}</p>}
                  <div className="pillar-btn-row mt-6"><Pill href={ctaHref} onClick={() => track("cta_click", { cta_label: c.ctaButton, cta_location: "final" })}>{c.ctaButton} <ArrowRight size={16} /></Pill></div>
                  <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.16em] text-white/60">What happens next</p>
                  <ul className="mt-4 space-y-3">
                    {(c.leadForm?.steps || ["You send your details", "We review them and reply by email", "You decide what to do next. No obligation."]).map((st) => (
                      <li key={st} className="flex items-start gap-3 text-[15.5px] font-semibold text-white/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: ORANGE }}><Check size={12} strokeWidth={3} /></span>{st}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-[15px] font-semibold text-white">Prefer to talk?</p>
                  <div className="pillar-btn-row mt-3">
                    <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "final" })} className="pillar-btn pillar-btn--ghost-light">
                      <Phone size={16} /> {PHONE_DISPLAY}
                    </a>
                    <a href={whatsappLink(`Hello, I have a question about: ${c.leadForm?.service || c.h1}`)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { cta_location: "final" })} className="pillar-btn pillar-btn--ghost-light">
                      <MessageCircle size={16} /> Message us on WhatsApp
                    </a>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/60">713 Shilp Arcade, SP Ring Road, Hanspura, Ahmedabad. Monday to Saturday, 10 am to 7 pm.</p>
                </div>
                {c.leadForm && <PageLeadForm cfg={{ ...c.leadForm, id: `${c.leadForm.id || "audit-form"}-final` }} accent={ORANGE} embedded idPrefix="plf-final" />}
              </div>
              {officeMap && <VisitUs auditHref={"#" + formId} auditLabel={layout?.visitLabel ?? "Get a free Meta ads account review"} />}
            </div>
          </section>
        </div>

        {c.leadForm && (
          <>
            <div className="h-16 md:hidden" aria-hidden="true" />
            <StickyCtaBar accent={ORANGE} label={ctaLabel} href={ctaHref} topic={c.h1} />
          </>
        )}
        <PillarLinks slug={config.slug} />
      </PageLayout>
      </StandardCtx.Provider>
      </VariantCtx.Provider>
    );
  }

  return (
    <VariantCtx.Provider value={variant}>
    <PageLayout>
      {/* 1. Hero: the answer first, with the next step beside it */}
      <section className={`relative overflow-hidden px-5 pb-12 pt-[92px] md:px-8 md:pb-16 md:pt-[104px] ${pillar ? "lg:pb-20" : ""}`} style={{ background: pillar ? `linear-gradient(180deg, ${CREAM} 0%, #fff 100%)` : "#fff" }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${ORANGE}1f 0%, transparent 70%)`, filter: "blur(60px)" }} />
        <div className={`relative mx-auto grid items-start gap-10 lg:gap-14 ${c.quickAnswer || stats.length > 0 || pillar ? (pillar ? "max-w-7xl lg:grid-cols-[1fr_1fr]" : "max-w-6xl lg:grid-cols-[1.1fr_0.9fr]") : "max-w-4xl"}`}>
          <div>
            <AppLink to={c.parentServiceHref} className="mb-5 inline-flex items-center gap-1 text-xs font-bold hover:underline" style={{ color: ORANGE }}>
              ← Back to {c.parentServiceLabel}
            </AppLink>
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
                  <span>Published by <a href="/about/" className="underline">Digital Aura</a>. Last updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time>.</span>
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
              <h2 className="mt-4 text-[26px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[30px] md:text-[34px]" style={{ color: NAVY }}>{c.quickAnswer.heading}</h2>
              <p className="mt-4 text-[16px] leading-[1.75] text-[#5B5F7A] md:text-[17px]">{c.quickAnswer.answer}</p>
              {c.lastUpdated && (
                <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#6B7280]">
                  <Clock size={14} className="mt-0.5 shrink-0" />
                  <span>Published by <a href="/about/" className="underline">Digital Aura</a>. Last updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time>.</span>
                </p>
              )}
            </div>
            {c.quickAnswer.points && (
              <Card>
                <ul className="space-y-4">
                  {c.quickAnswer.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-snug text-[#374151]">
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
              <li key={s.label} className="rounded-2xl border bg-white px-4 py-4 text-center" style={{ borderColor: "#EDE3DA", boxShadow: "0 2px 10px rgba(26,29,54,0.05)" }}>
                <p className="text-3xl font-bold tracking-tight md:text-4xl" style={{ color: NAVY }}>{s.value}</p>
                <p className="mt-1 text-[13.5px] text-[#5B5F7A]">{s.label}</p>
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
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[15px] font-extrabold" style={pillar ? { background: `${ORANGE}1a`, color: ORANGE } : { background: i === c.process.length - 1 ? GREEN : ORANGE, color: "#fff", borderRadius: 9999 }}>{i + 1}</span>
                  <h3 className="text-[16px] font-bold leading-snug" style={{ color: NAVY }}>{s.title}</h3>
                </div>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4B5563]">{s.desc}</p>
              </Card>
              {i < c.process.length - 1 && <ArrowRight size={18} className="absolute -right-4 top-10 hidden text-[#CBD5E1] lg:block" />}
            </li>
          ))}
        </ol>
      </Wrap>

      {/* 6. Guide sections that answer "is it safe, how exactly, what should I check" */}
      {early.map((s, i) => <GuideSection key={s.id} sec={s} index={i + 1} />)}

      {/* Mid-page call to action */}
      {c.leadForm && !c.leadFormTop && !pillar && (
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
        <CaseStudies cases={caseCards} sub={caseSub} centered={pillar} />
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
                  <MemberLinks links={m.links} accent={ORANGE} />
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
      {(about || (visit && !officeMap)) && (
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
            {visit && !officeMap && visit.kind === "text" && (
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
              <AppLink to={s.href} className="mt-4 inline-flex items-center gap-1 text-sm font-bold hover:gap-2" style={{ color: ORANGE }}>
                Learn more<span className="sr-only"> about {s.title}</span> <ArrowRight size={14} />
              </AppLink>
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
      </Wrap>

      {/* Author (E-E-A-T): same Sambhav Shah card as the blog posts and the About page */}
      <RelatedGuides parentHref={c.parentServiceHref} accent={ORANGE} />
      <section className="bg-white py-10"><AuthorBox accent={ORANGE} /></section>

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
      {officeMap && <OfficeMap auditHref={"#" + formId} auditLabel="Get a free Meta ads account review" />}
    </PageLayout>
    </VariantCtx.Provider>
  );
}
