import { PILLAR_CLIENTS, PILLAR_TRUST_CAPTION } from "./clientLogos";

/** Slim strip under the hero: up to four figures and the client logos in one row. */
export default function TrustStrip({ stats }: { stats: { value: string; label: string }[] }) {
  const row = [...PILLAR_CLIENTS, ...PILLAR_CLIENTS];
  return (
    <section id="trust" className="pillar-trust" aria-label="Results and clients">
      <div className="pillar-container">
        {stats.length > 0 && (
          <div className="pillar-trust-stats" style={stats.length !== 4 ? { gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` } : undefined}>
            {stats.slice(0, 4).map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className={stats.length > 0 ? "pillar-trust-logos" : ""}>
          <p className="pillar-trust-caption">{PILLAR_TRUST_CAPTION}</p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            <div className="marquee-track flex w-max items-center gap-8">
              {row.map((c, i) => (
                <div key={`${c.name}-${i}`} className="flex w-[130px] flex-none flex-col items-center gap-1.5">
                  <div className={`flex h-12 w-full items-center justify-center ${c.dark ? "rounded-md bg-[#0A1628] px-2" : ""}`}>
                    <img src={c.logo} alt={c.name} loading="lazy" className="h-full max-h-12 w-auto max-w-full object-contain" />
                  </div>
                  <div className="text-center text-[11px] font-semibold leading-tight text-[#0A1628]">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
