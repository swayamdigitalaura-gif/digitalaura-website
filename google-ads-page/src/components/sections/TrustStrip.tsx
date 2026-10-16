import { CLIENTS } from "./ClientLogoMarquee";
import { STATS_ITEMS } from "./PillarExtras";

/** Slim strip under the hero: the four company figures and the client logos in one row (replaces the separate stats band and logo marquee). */
export function TrustStrip() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section id="trust" className="pillar-trust" aria-label="Results and clients">
      <div className="pillar-container">
        <div className="pillar-trust-stats">
          {STATS_ITEMS.map((s) => (
            <div key={s.v}>
              <strong>{s.k}</strong>
              <span>{s.v}</span>
            </div>
          ))}
        </div>
        <div className="pillar-trust-logos">
          <p className="pillar-trust-caption">Trusted By Growth-Focused Brands</p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            <div className="flex w-max items-center gap-8 animate-marquee">
              {row.map((c, i) => (
                <div key={`${c.name}-${i}`} className="flex w-[130px] flex-none flex-col items-center gap-1.5">
                  <div className={`flex h-12 w-full items-center justify-center ${c.dark ? "rounded-md bg-navy px-2" : ""}`}>
                    <img src={c.logo} alt={c.name} loading="lazy" className="h-full max-h-12 w-auto max-w-full object-contain" />
                  </div>
                  <div className="text-center text-[11px] font-semibold leading-tight text-navy">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
