import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-12 md:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.16em] shadow-xs ${
        light
          ? "border-white/15 bg-white/5 text-white/80"
          : "border-border bg-surface text-navy/70"
      }`}
    >
      <span className="size-1.5 rounded-full bg-primary animate-pulse-ring" />
      {children}
    </div>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[36px] md:text-[44px] lg:text-[48px] font-bold tracking-[-0.02em] text-navy leading-[1.1] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[18px] md:text-[20px] font-normal leading-[1.82] text-muted-foreground max-w-[640px] ${className}`}>
      {children}
    </p>
  );
}

export function PrimaryCTA({
  children = "Get My Free Revenue Audit",
  className = "",
  href = "#audit",
}: {
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-[16px] md:text-[18px] font-semibold leading-none text-primary-foreground shadow-md hover-btn-glow transition-all duration-300 ${className}`}
    >
      {children}
      <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

export function SecondaryCTA({ children, href = "#process" }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-white px-8 py-4 text-[16px] md:text-[18px] font-semibold leading-none text-navy transition-all duration-300 hover:border-navy/30 hover:shadow-sm hover:-translate-y-0.5"
    >
      {children}
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

export function Counter({
  to,
  suffix = "",
  duration = 1.6,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setVal(v.toFixed(decimals)));
    return () => unsub();
  }, [spring, decimals]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
