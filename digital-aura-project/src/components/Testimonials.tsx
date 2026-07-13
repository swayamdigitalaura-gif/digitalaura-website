import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const COLORS = ["#FF6B2B","#7C3AED","#1A6FE8","#22C55E"];
const FALLBACK = [
  { quote: "Digital Aura's team designed a professional website and executed a highly effective Meta Ads campaign.", name: "Sahebrav Patil", company: "Pest Control Business Owner", initials: "SP" },
  { quote: "We partnered with them for website development and lead generation campaigns, and the results were beyond our expectations.", name: "Chintan Joshi", company: "Local Guide · 141 Reviews", initials: "CJ" },
  { quote: "Digital Aura helped us take our brand online and generate quality leads for our event solutions business.", name: "Darshil Shah", company: "Elegant Event Solutions", initials: "DS" },
  { quote: "Their lead generation strategies through Meta Ads were impeccable, delivering high quality leads that swiftly converted into sales.", name: "Tapan Joshi", company: "Invisible Grills Business", initials: "TJ" },
  { quote: "Excellent results and professional service! Our online presence has been outstanding since working with Digital Aura.", name: "Ketan Patel", company: "Business Owner", initials: "KP" },
  { quote: "Digital Aura improved our website user experience and boosted brand visibility, crucial for attracting more customers.", name: "Tirth Patel", company: "Local Guide · 18 Reviews", initials: "TP" },
  { quote: "Digital Aura transformed my online presence as an insurance consultant, helping me reach the right audience effectively.", name: "Vrukshal Shah", company: "Insurance Consultant", initials: "VS" },
  { quote: "Sambhav helped me start my business online in New Zealand and did a fantastic job. I strongly recommend them.", name: "Samkit Talajia", company: "Business Owner · New Zealand", initials: "ST" },
];

const VISIBLE = 3;
const FADE_MS = 180;

const Testimonials = () => {
  const s = useSettings(['testimonials_badge', 'testimonials_heading']);
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(true);
  const [testimonials, setTestimonials] = useState(FALLBACK.map((t,i) => ({ ...t, color: COLORS[i%4] })));
  const currentRef = useRef(0);
  const lenRef = useRef(testimonials.length);

  useEffect(() => { lenRef.current = testimonials.length; }, [testimonials.length]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/testimonials`)
      .then(r => r.json())
      .then(d => {
        if (d.data?.length) {
          setTestimonials(d.data.map((t: Record<string, string>, i: number) => ({
            quote: t.quote,
            name: t.name,
            company: `${t.role}${t.company ? ' · ' + t.company : ''}`,
            initials: t.name.split(' ').map((w:string) => w[0]).join('').slice(0,2).toUpperCase(),
            color: COLORS[i % 4],
          })));
        }
      }).catch(() => {});
  }, []);

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

  const getVisible = () =>
    Array.from({ length: VISIBLE }, (_, i) => testimonials[(current + i) % testimonials.length]);

  return (
    <section className="py-20 px-4 md:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge" data-cms-key="testimonials_badge" data-cms-label="Testimonials Badge" data-cms-attr="text">{s.testimonials_badge || 'Client Love'}</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight" data-cms-key="testimonials_heading" data-cms-label="Testimonials Heading" data-cms-attr="text">
            {s.testimonials_heading || 'What Our Clients Say'}
          </h2>
        </motion.div>

        {/* Smooth CSS crossfade — no unmount, no blink */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          style={{ opacity: show ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
        >
          {getVisible().map((t, i) => (
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
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={15} fill="#FF6B2B" color="#FF6B2B" />
                ))}
              </div>
              <p className="text-[#374151] leading-relaxed text-[15px] flex-1 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#0A1628] text-[15px]">{t.name}</p>
                    <p className="text-sm text-[#6B7280]">{t.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full border flex items-center justify-center text-[#6B7280] hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition-all"
            style={{ borderColor: "#E5E7EB" }}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2 flex-wrap justify-center max-w-[220px]">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === current % testimonials.length ? 24 : 8,
                  height: 8,
                  background: i === current % testimonials.length ? "#FF6B2B" : "#E5E7EB",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => goTo((current + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full border flex items-center justify-center text-[#6B7280] hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition-all"
            style={{ borderColor: "#E5E7EB" }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
