/**
 * Ahmedabad pricing page template (SEO, Google Ads, Meta Ads). Same section order, look and building blocks as the pillar
 * pages: site header and footer, hero + trust strip + sticky sub-nav, tabs, always-open FAQ and the navy final CTA with the
 * "Find us" map block. Content comes from data/pricingPages.ts, so the three pages can never drift apart.
 *
 * Order follows the visitor's pricing intent: the price first, what it buys, what moves it, how to plan the number,
 * how to compare quotes, how it is quoted, the contract terms, proof, who wrote it, where to go next, questions, quote.
 */
import {
  ArrowRight, Check, X, Phone, MessageCircle, MapPin, Search, Wrench, FileText, Link2, Bot, BarChart3, Target, Gauge, Layers,
  Languages, ShieldCheck, KeyRound, Receipt, CalendarClock, Users, Megaphone, TrendingUp, ClipboardCheck, Wallet, Sparkles,
  PenLine, PhoneCall, Stethoscope, Factory, ShoppingCart, Clock, Scale, Globe, type LucideIcon,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PriceTable from "@/components/PriceTable";
import AuthorBox from "@/components/AuthorBox";
import Testimonials from "@/components/Testimonials";
import PageLeadForm from "@/components/PageLeadForm";
import { StickyCtaBar } from "@/components/PageCta";
import AdsCalculator from "@/components/AdsCalculators";
import VisitUs from "@/components/pillar/VisitUs";
import TrustStrip from "@/components/pillar/TrustStrip";
import { PillarFaq, PillarSection, PillarSubNav, PillarTabs } from "@/components/pillar/Pillar";
import { renderInline } from "@/lib/inlineLinks";
import { track, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/track";
import type { IconName, Item, LinkCard, PricingPageConfig, Step, TableData } from "@/data/pricingPages";
import "@/pillar-pages.css";

const ORANGE = "#FF6B2B";
const NAVY = "#0A1628";
const GREEN = "#16A34A";
const CREAM = "#FFF8F2";
const BORDER = "#EDE3DA";

const ICONS: Record<IconName, LucideIcon> = {
  search: Search, wrench: Wrench, filetext: FileText, mappin: MapPin, link: Link2, bot: Bot, chart: BarChart3, target: Target,
  gauge: Gauge, layers: Layers, languages: Languages, shield: ShieldCheck, key: KeyRound, receipt: Receipt, calendar: CalendarClock,
  users: Users, megaphone: Megaphone, trending: TrendingUp, clipboard: ClipboardCheck, wallet: Wallet, sparkles: Sparkles, pen: PenLine,
  phone: PhoneCall, stethoscope: Stethoscope, factory: Factory, cart: ShoppingCart, clock: Clock, scale: Scale, globe: Globe,
};

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/* ───────────── small building blocks (same card, badge and button look as the pillar pages) ───────────── */

const Badge = ({ name }: { name: IconName }) => {
  const I = ICONS[name];
  return (
    <span className="pillar-badge grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `${ORANGE}1a`, color: ORANGE }}>
      <I size={20} aria-hidden="true" />
    </span>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`pillar-card rounded-2xl border bg-white p-5 ${className}`} style={{ borderColor: BORDER, boxShadow: "0 2px 10px rgba(26,29,54,0.05)" }}>{children}</div>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[19px] font-bold leading-snug md:text-[21px]" style={{ color: NAVY }}>{children}</h3>
);

const Foot = ({ children }: { children: React.ReactNode }) => (
  <p className="mx-auto mt-5 max-w-3xl text-center text-[14.5px] leading-relaxed text-[#4B5563]">{children}</p>
);

const ItemCards = ({ items, cols = 3 }: { items: Item[]; cols?: 2 | 3 | 4 }) => (
  <div className={`pillar-cols-${cols} grid gap-4 sm:grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : cols === 3 ? "lg:grid-cols-3" : ""}`}>
    {items.map((it) => (
      <Card key={it.title}>
        <div className="flex items-center gap-3">
          <Badge name={it.icon} />
          <h3 className="text-[16.5px] font-bold leading-snug" style={{ color: NAVY }}>{it.title}</h3>
        </div>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[#4B5563]">{renderInline(it.desc)}</p>
      </Card>
    ))}
  </div>
);

const Stepper = ({ steps }: { steps: Step[] }) => (
  <ol className={`pillar-cols-${steps.length === 3 ? 3 : 4} grid gap-4 sm:grid-cols-2 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
    {steps.map((st, i) => (
      <li key={st.title}>
        <Card className="h-full">
          <div className="flex items-center gap-3">
            <span className="pillar-badge grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[15px] font-extrabold" style={{ background: `${ORANGE}1a`, color: ORANGE }}>{i + 1}</span>
            <h3 className="text-[16.5px] font-bold leading-snug" style={{ color: NAVY }}>{st.title}</h3>
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[#4B5563]">{renderInline(st.desc)}</p>
        </Card>
      </li>
    ))}
  </ol>
);

const TickList = ({ title, items, good }: { title: string; items: string[]; good: boolean }) => {
  const tint = good ? GREEN : "#DC2626";
  return (
    <Card>
      <h3 className="flex items-center gap-3 text-[17px] font-bold" style={{ color: NAVY }}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: `${tint}18`, color: tint }}>{good ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}</span>
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-[14.5px] leading-relaxed text-[#374151]">
            {good ? <Check size={16} className="mt-0.5 shrink-0" style={{ color: tint }} /> : <X size={16} className="mt-0.5 shrink-0" style={{ color: tint }} />}{t}
          </li>
        ))}
      </ul>
    </Card>
  );
};

const Table = ({ t }: { t: TableData }) => <PriceTable columns={t.columns} rows={t.rows} accent={ORANGE} featuredCol={t.featuredCol} caption={t.caption} />;

const Pill = ({ href, children, variant = "solid", external = false, onClick }: { href: string; children: React.ReactNode; variant?: "solid" | "outline"; external?: boolean; onClick?: () => void }) => (
  <a href={href} onClick={onClick} className={variant === "solid" ? "pillar-btn pillar-btn--primary" : "pillar-btn pillar-btn--secondary"} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>
);

const LinkCardView = ({ c, big = false }: { c: LinkCard; big?: boolean }) => (
  <a href={c.href} className={`${big ? "" : "pillar-card "}group flex h-full flex-col rounded-2xl border bg-white p-5 transition-shadow hover:shadow-md ${big ? "w-full md:flex-row md:items-center md:gap-6 md:p-7" : ""}`} style={{ borderColor: big ? ORANGE : BORDER, boxShadow: "0 2px 10px rgba(26,29,54,0.05)" }}>
    <div className={`flex items-center gap-3 ${big ? "md:shrink-0" : ""}`}><Badge name={c.icon} />{big && c.tag && <span className="pillar-eyebrow">{c.tag}</span>}</div>
    <div className={`${big ? "mt-3 flex-1 md:mt-0" : "mt-3 flex-1"}`}>
      <h3 className={`font-bold leading-snug ${big ? "text-[20px] md:text-[22px]" : "text-[16.5px]"}`} style={{ color: NAVY }}>{c.title}</h3>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#4B5563]">{c.desc}</p>
    </div>
    <span className={`mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold transition-all group-hover:gap-2 ${big ? "md:mt-0 md:shrink-0" : ""}`} style={{ color: "#C2410C" }}>
      {big ? "Read the full page" : "Learn more"} <ArrowRight size={15} />
    </span>
  </a>
);

/* ───────────── page ───────────── */

export default function PricingPage({ config: c }: { config: PricingPageConfig }) {
  const ctaHref = "#get-quote";
  const subnav = [
    { href: "#prices", label: "Prices" },
    { href: "#included", label: "What you get" },
    { href: "#factors", label: "Cost factors" },
    { href: "#compare", label: "Compare quotes" },
    { href: "#terms", label: "Contract" },
    { href: "#faqs", label: "FAQs" },
  ];

  const compareTabs = [
    { id: "us", label: "Our quote vs a typical quote", content: <Table t={c.compare.us} /> },
    ...(c.compare.fees ? [{ id: "fees", label: c.compare.fees.title.length > 26 ? "Fee models" : c.compare.fees.title, content: <div><div className="mb-5"><Sub>{c.compare.fees.title}</Sub></div><ItemCards items={c.compare.fees.items} cols={c.compare.fees.items.length === 4 ? 4 : 3} /></div> }] : []),
    { id: "options", label: "Agency, freelancer or in-house", content: <Table t={c.compare.options} /> },
  ];

  const planBody =
    c.plan.kind === "timeline" ? (
      <Stepper steps={c.plan.timeline || []} />
    ) : (
      <PillarTabs
        label="Plan your budget"
        tabs={[
          ...(c.plan.calculators || []).map((k) => ({
            id: k.id,
            label: k.label,
            content: <div className="mx-auto max-w-4xl"><AdsCalculator variant={k.variant} accent={ORANGE} /></div>,
          })),
          ...(c.plan.staged ? [{ id: "staged", label: "How a budget grows", content: <div><div className="mb-5"><Sub>{c.plan.staged.title}</Sub></div><Stepper steps={c.plan.staged.steps} /></div> }] : []),
        ]}
      />
    );

  return (
    <PageLayout>
      <div className="pillar-page">
        {/* 1. Hero: the answer first, with the numbers beside it */}
        <section id="top" className="relative overflow-hidden px-5 pb-12 pt-[92px] md:px-8 md:pb-16 md:pt-[104px]" style={{ background: `linear-gradient(180deg, ${CREAM} 0%, #fff 100%)` }}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${ORANGE}1f 0%, transparent 70%)`, filter: "blur(60px)" }} />
          <div className="relative mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <a href={c.pillar.href} className="mb-5 inline-flex items-center gap-1 text-xs font-bold hover:underline" style={{ color: "#C2410C" }}>← Back to {c.pillar.label}</a>
              <div className="mb-5"><span className="pillar-eyebrow"><MapPin size={11} className="mr-1 inline -mt-0.5" />{c.eyebrow}</span></div>
              <h1 className="font-bold leading-[1.18] tracking-[-0.02em]" style={{ color: NAVY, fontSize: "clamp(28px, 3.8vw, 44px)" }}>{c.h1}</h1>
              <p className="mt-5 text-[17px] leading-relaxed text-[#374151] md:text-lg">{renderInline(c.answer)}</p>
              <p className="mt-4 text-[13.5px] text-[#6B7280]">
                Updated <time dateTime={c.updated}>{formatDate(c.updated)}</time> · Written by <a href="/about/" className="font-semibold underline" style={{ color: NAVY }}>Sambhav Shah</a>, Founder &amp; CEO
              </p>
              <div className="pillar-btn-row mt-7">
                <Pill href={ctaHref} onClick={() => track("cta_click", { cta_label: c.heroCta, cta_location: "hero" })}>{c.heroCta} <ArrowRight size={16} /></Pill>
                <Pill href={whatsappLink(`Hello, I have a question about: ${c.h1}`)} variant="outline" external onClick={() => track("whatsapp_click", { cta_location: "hero" })}><MessageCircle size={16} /> WhatsApp us</Pill>
                <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "hero" })} aria-label={`Call ${PHONE_DISPLAY}`} className="pillar-btn pillar-btn--secondary"><Phone size={16} style={{ color: ORANGE }} /> {PHONE_DISPLAY}</a>
              </div>
              <p className="mt-3 text-xs text-[#6B7280]">Free to ask. No obligation. We reply by email.</p>
            </div>
            <aside aria-label={c.glance.title} className="rounded-2xl border bg-white p-6 md:p-7" style={{ borderColor: BORDER, boxShadow: "0 8px 30px rgba(26,29,54,0.08)" }}>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: "#C2410C" }}>{c.glance.title}</p>
              <ul className="mt-4 divide-y" style={{ borderColor: "#EEE" }}>
                {c.glance.rows.map((r) => (
                  <li key={r.label} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span>
                      <span className="block text-[15px] font-bold" style={{ color: NAVY }}>{r.label}</span>
                      {r.note && <span className="block text-[12.5px] text-[#6B7280]">{r.note}</span>}
                    </span>
                    <span className="text-right text-[17px] font-extrabold leading-tight" style={{ color: NAVY }}>{r.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6B7280]">{c.glance.foot}</p>
              <div className="mt-5"><a href={ctaHref} className="pillar-btn pillar-btn--primary w-full justify-center">{c.heroCta} <ArrowRight size={16} /></a></div>
            </aside>
          </div>
        </section>
        <TrustStrip stats={c.stats} />
        <PillarSubNav items={subnav} />

        {/* 2. Prices */}
        <PillarSection id="prices" tone="white" eyebrow={c.prices.eyebrow} title={c.prices.title} intro={c.prices.sub}>
          <Table t={c.prices.table} />
          <Foot>{c.prices.footnote}</Foot>
          {c.prices.extra && (
            <div className="pillar-cols-2 mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
              <TickList title={c.prices.extra.left.title} items={c.prices.extra.left.items} good />
              <TickList title={c.prices.extra.right.title} items={c.prices.extra.right.items} good />
            </div>
          )}
          {c.fit && (
            <div className="mt-12">
              <div className="mb-5 text-center"><Sub>{c.fit.title}</Sub><p className="mx-auto mt-2 max-w-2xl text-[15px] text-[#4B5563]">{c.fit.sub}</p></div>
              <Table t={c.fit.table} />
            </div>
          )}
        </PillarSection>

        {/* 3. What the fee buys */}
        <PillarSection id="included" tone="light" eyebrow={c.included.eyebrow} title={c.included.title} intro={c.included.sub}>
          <ItemCards items={c.included.items} cols={3} />
          <div className="pillar-cols-2 mt-5 grid gap-4 md:grid-cols-2">
            <TickList title={c.included.paid.title} items={c.included.paid.items} good={false} />
            <TickList title={c.included.never.title} items={c.included.never.items} good={false} />
          </div>
        </PillarSection>

        {/* 4. What moves the price */}
        <PillarSection id="factors" tone="white" eyebrow={c.factors.eyebrow} title={c.factors.title} intro={c.factors.sub}>
          <ItemCards items={c.factors.items} cols={3} />
        </PillarSection>

        {/* 5. Plan the number */}
        <PillarSection id="plan" tone="light" eyebrow={c.plan.eyebrow} title={c.plan.title} intro={c.plan.sub}>
          {planBody}
          {c.plan.note && <Foot>{c.plan.note}</Foot>}
        </PillarSection>

        {/* 6. Compare quotes */}
        <PillarSection id="compare" tone="white" eyebrow={c.compare.eyebrow} title={c.compare.title} intro={c.compare.sub}>
          <PillarTabs label="Compare quotes" tabs={compareTabs} />
        </PillarSection>

        {/* 7. Languages (ads) or industries (SEO) */}
        <PillarSection id="reach" tone="light" eyebrow={c.reach.eyebrow} title={c.reach.title} intro={c.reach.sub}>
          {c.reach.kind === "languages" ? (
            <div className="pillar-cols-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.reach.cards.map((l) => (
                <Card key={l.title}>
                  <p className="text-[24px] font-extrabold leading-tight" style={{ color: "#C2410C" }}>{l.tag}</p>
                  {l.title !== l.tag && <h3 className="mt-1 text-[16.5px] font-bold" style={{ color: NAVY }}>{l.title}</h3>}
                  {l.title === l.tag && <h3 className="sr-only">{l.title}</h3>}
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#4B5563]">{l.desc}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="pillar-cols-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.reach.cards.map((l) => (
                <LinkCardView key={l.title} c={{ title: l.title, desc: l.desc, href: l.href || "#", icon: l.icon || "search", tag: l.tag }} />
              ))}
            </div>
          )}
          {c.reach.links && (
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {c.reach.links.map((l) => (
                <li key={l.href}><a href={l.href} className="inline-block rounded-full border bg-white px-4 py-2 text-[13.5px] font-semibold hover:underline" style={{ borderColor: BORDER, color: "#C2410C" }}>{l.label}</a></li>
              ))}
            </ul>
          )}
          {c.reach.note && <Foot>{c.reach.note}</Foot>}
        </PillarSection>

        {/* 8. How we quote */}
        <PillarSection id="steps" tone="white" eyebrow={c.steps.eyebrow} title={c.steps.title} intro={c.steps.sub}>
          <Stepper steps={c.steps.items} />
        </PillarSection>

        {/* 9. Contract and ownership */}
        <PillarSection id="terms" tone="light" eyebrow={c.terms.eyebrow} title={c.terms.title} intro={c.terms.sub}>
          <ItemCards items={c.terms.items} cols={c.terms.items.length === 4 ? 4 : 3} />
        </PillarSection>

        {/* 10. Proof */}
        <PillarSection tone="white" bare noHead>
          <Testimonials />
        </PillarSection>

        {/* 11. Who wrote this */}
        <PillarSection id="author" tone="light" bare noHead>
          <AuthorBox accent={ORANGE} />
        </PillarSection>

        {/* 12. Where next: the pillar page first, because it is the page we want to rank */}
        <PillarSection id="explore" tone="white" eyebrow={c.explore.eyebrow} title={c.explore.title} intro={c.explore.sub}>
          <div className="mb-4"><LinkCardView c={c.explore.pillarCard} big /></div>
          <div className="pillar-cols-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.explore.cards.map((x) => <LinkCardView key={x.href} c={x} />)}
          </div>
        </PillarSection>

        {/* 13. FAQ (always open, same as the pillar pages) */}
        <PillarSection id="faqs" tone="light" eyebrow="FAQs" title={c.faqTitle}>
          <PillarFaq items={c.faqs.map((f) => ({ q: f.q, a: renderInline(f.a) }))} />
        </PillarSection>

        {/* 14. Final CTA + form + Find us */}
        <section id="get-quote" className="pillar-section pillar-section--navy">
          <div className="pillar-container">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div>
                <div className="mb-3"><span className="pillar-eyebrow">Let&apos;s Build Together</span></div>
                <h2 className="mb-5 font-bold leading-[1.15] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(26px, 2.8vw, 34px)" }}>{c.cta.heading}</h2>
                <p className="text-[17px] leading-[1.7] text-white/80">{c.cta.text}</p>
                <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.16em] text-white/60">What happens next</p>
                <ul className="mt-4 space-y-3">
                  {["You send your details", "We review them and reply by email", "You decide what to do next. No obligation."].map((st) => (
                    <li key={st} className="flex items-start gap-3 text-[15.5px] font-semibold text-white/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: ORANGE }}><Check size={12} strokeWidth={3} /></span>{st}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[15px] font-semibold text-white">Prefer to talk?</p>
                <div className="pillar-btn-row mt-3">
                  <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "final" })} className="pillar-btn pillar-btn--ghost-light"><Phone size={16} /> {PHONE_DISPLAY}</a>
                  <a href={whatsappLink(`Hello, I have a question about: ${c.leadForm.service}`)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { cta_location: "final" })} className="pillar-btn pillar-btn--ghost-light"><MessageCircle size={16} /> Message us on WhatsApp</a>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/60">713 Shilp Arcade, SP Ring Road, Hanspura, Ahmedabad. Monday to Saturday, 10 am to 7 pm. See also our <a href={c.pillar.href} className="underline">{c.pillar.short}</a> page.</p>
              </div>
              <PageLeadForm cfg={c.leadForm} accent={ORANGE} embedded idPrefix="plf-final" />
            </div>
            <VisitUs auditHref="#get-quote" auditLabel={c.cta.findUsLabel} />
          </div>
        </section>
      </div>

      <div className="h-16 md:hidden" aria-hidden="true" />
      <StickyCtaBar accent={ORANGE} label={c.heroCta} href={ctaHref} topic={c.h1} />
    </PageLayout>
  );
}
