import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

type Item = { quote: string; name: string; personName?: string; company: string; initials: string; color: string };

const FADE_MS = 180;

const useVisibleCount = () => {
  const [count, setCount] = useState(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    return 3;
  });
  useEffect(() => {
    const fn = () => {
      if (window.innerWidth < 640) setCount(1);
      else if (window.innerWidth < 768) setCount(2);
      else setCount(3);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return count;
};

const TestimonialCarousel = ({ items }: { items: Item[] }) => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(true);
  const visibleCount = useVisibleCount();
  const currentRef = useRef(0);
  const lenRef = useRef(items.length);

  useEffect(() => { lenRef.current = items.length; }, [items.length]);

  const goTo = useCallback((idx: number) => {
    setShow(false);
    setTimeout(() => {
      currentRef.current = idx;
      setCurrent(idx);
      setShow(true);
    }, FADE_MS);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      goTo((currentRef.current + 1) % lenRef.current);
    }, 5000);
    return () => clearInterval(t);
  }, [goTo]);

  const visible = Array.from({ length: Math.min(visibleCount, items.length) }, (_, i) =>
    items[(current + i) % items.length]
  );

  const gridClass =
    visibleCount === 1 ? "grid grid-cols-1 gap-6 mb-10"
    : visibleCount === 2 ? "grid grid-cols-2 gap-6 mb-10"
    : "grid grid-cols-3 gap-6 mb-10";

  return (
    <div>
      {/* Smooth CSS crossfade — no unmount, no blink */}
      <div
        className={gridClass}
        style={{ opacity: show ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
      >
        {visible.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="card-hover rounded-2xl p-7 border bg-white relative overflow-hidden flex flex-col"
            style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: t.color }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${t.color}15` }}>
              <Quote size={18} style={{ color: t.color }} />
            </div>
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={15} fill="#FF6B2B" color="#FF6B2B" />)}
            </div>
            <p className="text-[#374151] leading-relaxed text-[15px] flex-1 mb-6 italic">"{t.quote}"</p>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div>
                  {t.personName && <p className="font-bold text-[#0A1628] text-[15px]">{t.personName}</p>}
                  <p className={t.personName ? "text-sm text-[#6B7280]" : "font-bold text-[#0A1628] text-[15px]"}>
                    {t.name}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">{t.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[10px] text-[#6B7280] font-medium">Google</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => goTo((current - 1 + items.length) % items.length)}
          className="w-10 h-10 rounded-full border flex items-center justify-center text-[#6B7280] hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition-all"
          style={{ borderColor: "#E5E7EB" }}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2 flex-wrap justify-center max-w-[200px]">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current % items.length ? 24 : 8,
                height: 8,
                background: i === current % items.length ? "#FF6B2B" : "#E5E7EB",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => goTo((current + 1) % items.length)}
          className="w-10 h-10 rounded-full border flex items-center justify-center text-[#6B7280] hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition-all"
          style={{ borderColor: "#E5E7EB" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
