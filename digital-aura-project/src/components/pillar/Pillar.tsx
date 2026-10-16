import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Shared building blocks for the four pillar pages (SEO, Google Ads, Meta Ads, Website Development).
 * Styles live in src/pillar-pages.css and are scoped under .pillar-page.
 */

/** True when a block is rendered inside a PillarSection / tab / column, so its own heading becomes a sub-heading. */
export const InPillarContext = createContext(false);
export const useInPillar = () => useContext(InPillarContext);

type Tone = "white" | "light" | "navy";

export function PillarSection({
  id,
  tone = "white",
  eyebrow,
  title,
  intro,
  children,
  className = "",
  noHead = false,
  bare = false,
}: {
  id?: string;
  tone?: Tone;
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  noHead?: boolean;
  /** Wraps a single existing block that keeps its own H2 heading (no group heading, no sub-heading demotion). */
  bare?: boolean;
}) {
  return (
    <section id={id} className={`pillar-section pillar-section--${tone} ${className}`}>
      <div className="pillar-container">
        {!noHead && title && (
          <div className="pillar-head">
            {eyebrow && <span className="pillar-eyebrow">{eyebrow}</span>}
            <h2>{title}</h2>
            {intro && <p>{intro}</p>}
          </div>
        )}
        <InPillarContext.Provider value={!bare}>
          <div className="pillar-group">{children}</div>
        </InPillarContext.Provider>
      </div>
    </section>
  );
}

export type PillarTab = { id: string; label: string; content: ReactNode };

/** Accessible tabs. Every panel stays in the DOM (inactive ones use the `hidden` attribute). */
export function PillarTabs({ tabs, label, initial }: { tabs: PillarTab[]; label: string; /** id of the tab that is open on first load (defaults to the first) */ initial?: string }) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(initial && tabs.some((t) => t.id === initial) ? initial : tabs[0].id);
  const listRef = useRef<HTMLDivElement>(null);

  // Opening /page#some-id where that id lives inside a hidden panel switches to that tab and scrolls to it.
  const revealHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    const panel = el?.closest<HTMLElement>("[data-pillar-panel]");
    if (!el || !panel || panel.dataset.tabsId !== uid) return;
    setActive(panel.dataset.tabId as string);
    requestAnimationFrame(() => requestAnimationFrame(() => el.scrollIntoView({ block: "start" })));
  }, [uid]);

  useEffect(() => {
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, [revealHash]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    if (n < 0) return;
    e.preventDefault();
    setActive(tabs[n].id);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[n]?.focus();
  };

  return (
    <div>
      <div className="pillar-tabs-list" role="tablist" aria-label={label} ref={listRef}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            className="pillar-tab"
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          className="pillar-panel"
          data-pillar-panel
          data-tabs-id={uid}
          data-tab-id={t.id}
          hidden={active !== t.id}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

/** Sticky anchor bar under the site header (desktop only). */
export function PillarSubNav({ items }: { items: { href: string; label: string }[] }) {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.href.slice(1)))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const onScroll = () => {
      const y = window.scrollY + 160;
      let cur = "";
      for (const el of els) if (el.offsetTop <= y) cur = el.id;
      setCurrent(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  return (
    <nav className="pillar-subnav" aria-label="On this page">
      <div className="pillar-container">
        <ul>
          {items.map((i) => (
            <li key={i.href}>
              <a href={i.href} aria-current={current === i.href.slice(1) ? "true" : undefined}>
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** FAQ list: always fully open, two columns on desktop. Question is an H3. No accordion. */
export function PillarFaq({ items }: { items: { q: ReactNode; a: ReactNode; key?: string }[] }) {
  return (
    <div className="pillar-faq">
      {items.map((f, i) => (
        <div key={f.key || (typeof f.q === "string" ? f.q : i)} className="pillar-faq-item">
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </div>
  );
}
