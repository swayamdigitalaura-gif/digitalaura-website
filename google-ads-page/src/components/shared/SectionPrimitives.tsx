import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useInPillar } from "./Pillar";

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
    <section id={id} className={`relative py-9 md:py-11 lg:py-12 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode; light?: boolean }) {
  return <span className="pillar-eyebrow">{children}</span>;
}

/**
 * Centred section header used by every section of the page: eyebrow, a one-line title on desktop and a short lead.
 * Keeping one header style is what makes the sections read as one system.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  // Inside a pillar group/tab the block's own heading becomes a sub-heading (H3) under the group's H2.
  const inPillar = useInPillar();
  if (inPillar) {
    return (
      <div className={`pillar-subhead ${light ? "pillar-subhead--light" : ""} ${className}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3>{title}</h3>
        {lead && <p>{lead}</p>}
      </div>
    );
  }
  return (
    <div className={`pillar-head ${light ? "pillar-head--light" : ""} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

/** Icon or number in a rounded square: the one badge style used on every card of the page. */
export function CardBadge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`pillar-badge grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-[15px] font-extrabold text-primary ${className}`}>
      {children}
    </span>
  );
}

/** Shared card surface. */
export const CARD = "pillar-card rounded-2xl border border-border bg-white p-5 shadow-xs transition-shadow hover:shadow-md";

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
      className={`pillar-btn pillar-btn--primary group ${className}`}
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
      className="pillar-btn pillar-btn--secondary group"
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
