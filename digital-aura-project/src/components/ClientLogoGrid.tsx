import { useState, useCallback } from "react";

interface Client {
  name: string;
  tag: string;
  logo: string;
  logoBg: string;
}

interface Props {
  clients: Client[];
  accentColor?: string;
}

const ClientLogoGrid = ({ clients, accentColor = "#22C55E" }: Props) => {
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

  const handleImgError = useCallback((logo: string) => {
    setFailedLogos(prev => new Set(prev).add(logo));
  }, []);

  // Duplicate the list so the CSS marquee can loop seamlessly at -50%.
  const track = [...clients, ...clients];

  const Card = ({ c, i }: { c: Client; i: number }) => {
    const failed = failedLogos.has(c.logo);
    return (
      <div
        className="rounded-2xl bg-white border flex flex-col items-center text-center overflow-hidden card-hover shrink-0"
        style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", width: 220 }}
      >
        <div className="w-full flex items-center justify-center p-5" style={{ background: failed ? "#F0F4F8" : (c.logoBg || "#F0F4F8"), minHeight: 110 }}>
          {failed ? (
            <span style={{ fontSize: 13, fontWeight: 800, color: "#374151", textAlign: "center", padding: "0 8px" }}>{c.name}</span>
          ) : (
            <img src={c.logo} alt={c.name}
              style={{
                height: 58, maxWidth: 150, objectFit: "contain",
                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.18)) drop-shadow(0 1px 3px rgba(0,0,0,0.12))"
              }}
              onError={() => handleImgError(c.logo)}
              loading="lazy" />
          )}
        </div>
        <div className="w-full px-4 py-2.5 border-t" style={{ borderColor: "#F3F4F6" }}>
          <p className="text-[12.5px] font-bold text-[#0A1628] leading-snug">{c.name}</p>
          <p className="text-[10.5px] mt-0.5 font-semibold" style={{ color: accentColor }}>{c.tag}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="select-none overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)" }}>
      <div className="client-logo-marquee flex gap-5" style={{ width: "max-content" }}>
        {track.map((c, i) => (
          <Card key={`${c.name}-${i}`} c={c} i={i} />
        ))}
      </div>
    </div>
  );
};

export default ClientLogoGrid;
