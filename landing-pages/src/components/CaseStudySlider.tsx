import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp, ChevronLeft, AlertTriangle, Lightbulb, Check, X } from "lucide-react";

/* Same "Results / Problem / How We Solved It" case-study slider as the home page "Proven Results" section. */

export interface SliderStat { num: string; label: string }

export interface SliderCase {
  tag: string;
  color: string;
  title: string;
  href: string;
  stats: SliderStat[];
  problems?: string[];
  solutions?: string[];
}

const FADE_MS = 180;

export function CaseStudySlider({ items }: { items: SliderCase[] }) {
  const total = items.length;
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);

  const go = useCallback((n: number) => {
    const target = ((n % total) + total) % total;
    setShow(false);
    setTimeout(() => {
      indexRef.current = target;
      setIndex(target);
      setShow(true);
    }, FADE_MS);
  }, [total]);

  useEffect(() => {
    if (total < 2) return;
    const t = setInterval(() => {
      if (!pausedRef.current) go(indexRef.current + 1);
    }, 8000);
    return () => clearInterval(t);
  }, [go, total]);

  const c = items[index];
  const multi = total > 1;
  const hasSteps = !!(c.problems?.length && c.solutions?.length);
  const arrowBtn = "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-110 md:h-11 md:w-11";
  const arrowStyle = { background: "#fff", border: "1.5px solid #E5E7EB", boxShadow: "0 4px 14px rgba(0,0,0,0.12)" };

  return (
    <div>
      <div className="relative" onMouseEnter={() => { pausedRef.current = true; }} onMouseLeave={() => { pausedRef.current = false; }}>
        {multi && (
          <>
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous case study" className={`${arrowBtn} -left-3 md:-left-5`} style={arrowStyle}>
              <ChevronLeft size={18} className="text-[#374151]" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next case study" className={`${arrowBtn} -right-3 md:-right-5`} style={arrowStyle}>
              <ChevronLeft size={18} className="rotate-180 text-[#374151]" />
            </button>
          </>
        )}

        <div
          className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)", opacity: show ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 md:px-10" style={{ background: `linear-gradient(135deg, ${c.color}14 0%, ${c.color}05 100%)` }}>
            <div>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: c.color, background: `${c.color}14` }}>{c.tag}</span>
              <h3 className="mt-3 text-xl font-bold text-[#0A1628] md:text-2xl">{c.title}</h3>
            </div>
            <a href={c.href} className="inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2" style={{ color: c.color }}>
              Read Full Case Study <ArrowRight size={14} />
            </a>
          </div>

          <div className="px-6 pt-6 md:px-10 md:pt-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: c.color }}>
              <TrendingUp size={15} /> Results We Delivered
            </div>
            <div className="grid gap-3 sm:grid-cols-3 md:gap-4">
              {c.stats.map((st) => (
                <div key={st.label} className="rounded-2xl border p-4 md:p-5" style={{ background: `${c.color}14`, borderColor: `${c.color}25` }}>
                  <div className="mb-2 text-[28px] font-black leading-none tracking-tight md:text-[34px]" style={{ color: c.color }}>{st.num}</div>
                  <div className="text-sm font-medium leading-snug text-[#374151]">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {hasSteps ? (
            <div className="grid items-stretch gap-6 p-6 md:p-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
              <div className="rounded-2xl p-5 md:p-6" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  <AlertTriangle size={15} /> The Problem
                </div>
                <ul className="space-y-3">
                  {c.problems!.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-[#374151]"><X size={15} className="mt-0.5 shrink-0 text-[#DC2626]" /> {p}</li>
                  ))}
                </ul>
              </div>
              <div className="hidden items-center lg:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: c.color }}><ArrowRight size={18} /></span>
              </div>
              <div className="rounded-2xl p-5 md:p-6" style={{ background: `${c.color}14`, border: `1px solid ${c.color}30` }}>
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: c.color }}>
                  <Lightbulb size={15} /> How We Solved It
                </div>
                <ul className="space-y-3">
                  {c.solutions!.map((s) => (
                    <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-[#374151]"><Check size={15} className="mt-0.5 shrink-0" style={{ color: c.color }} /> {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-6 md:h-8" />
          )}
        </div>
      </div>

      {multi && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {items.map((d, i) => (
            <button key={d.title} type="button" onClick={() => go(i)} aria-label={`Show ${d.title}`} className="rounded-full transition-all duration-300"
              style={{ width: i === index ? 20 : 7, height: 7, background: i === index ? "#FF6B2B" : "#D1D5DB" }} />
          ))}
        </div>
      )}
    </div>
  );
}
