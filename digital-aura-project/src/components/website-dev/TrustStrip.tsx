import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";
import { metrics } from "./SectionsA";
import { logos } from "./SectionsC";

/** Slim strip under the hero: the five trust figures and the client logos in one row (CMS keys unchanged). */
export function WdsTrustStrip() {
  useCMSEditor();
  const s = useSettings([
    ...metrics.flatMap((_, i) => [`wds_trust_${i}_value`, `wds_trust_${i}_label`]),
    "wds_logos_h2",
    "wds_logos_subtitle",
  ]);
  const row = [...logos, ...logos];
  return (
    <section id="clients" className="pillar-trust" aria-label="Results and clients">
      <div className="pillar-container">
        <div className="pillar-trust-stats" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
          {metrics.map((m, i) => (
            <div key={m.label}>
              <strong data-cms-key={`wds_trust_${i}_value`} data-cms-label={`Trust Metric ${i + 1} Value`} data-cms-attr="text">
                {s[`wds_trust_${i}_value`] || m.value}
              </strong>
              <span data-cms-key={`wds_trust_${i}_label`} data-cms-label={`Trust Metric ${i + 1} Label`} data-cms-attr="text">
                {s[`wds_trust_${i}_label`] || m.label}
              </span>
            </div>
          ))}
        </div>
        <div className="pillar-trust-logos">
          <p className="pillar-trust-caption">
            <span data-cms-key="wds_logos_h2" data-cms-label="Logos Heading" data-cms-attr="text">{s.wds_logos_h2 || "Clients We've Grown"}</span>
            {" · "}
            <span data-cms-key="wds_logos_subtitle" data-cms-label="Logos Subtitle" data-cms-attr="text">{s.wds_logos_subtitle || "120+ Businesses We've Helped Grow"}</span>
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-8">
              {row.map((l, i) => (
                <div key={`${l.name}-${i}`} className="flex w-[130px] flex-none flex-col items-center gap-1.5">
                  <div className="flex h-12 w-full items-center justify-center">
                    <img src={l.src} alt={l.name} loading="lazy" className="h-full max-h-12 w-auto max-w-full object-contain" />
                  </div>
                  <div className="text-center text-[11px] font-semibold leading-tight text-[#0A1628]">{l.name}</div>
                  <div className="-mt-1 text-center text-[10px] font-bold text-[#FF6B2B]">{l.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
