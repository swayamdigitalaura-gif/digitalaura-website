import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft } from "lucide-react";

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
  const [page, setPage] = useState(0);
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());
  const perPage = 4;
  const totalPages = Math.ceil(clients.length / perPage);
  const current = clients.slice(page * perPage, (page + 1) * perPage);

  const prev = () => setPage(p => (p - 1 + totalPages) % totalPages);
  const next = () => setPage(p => (p + 1) % totalPages);

  const handleImgError = useCallback((logo: string) => {
    setFailedLogos(prev => new Set(prev).add(logo));
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (totalPages <= 1) return;
    const t = setInterval(() => setPage(p => (p + 1) % totalPages), 4000);
    return () => clearInterval(t);
  }, [totalPages]);

  return (
    <div className="select-none">
      <AnimatePresence mode="wait">
        <motion.div key={page}
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap justify-center gap-5 mb-8">
          {current.map((c, i) => {
            const failed = failedLogos.has(c.logo);
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border flex flex-col items-center text-center overflow-hidden card-hover"
                style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", width: 240, flexShrink: 0 }}>
                <div className="w-full flex items-center justify-center p-6" style={{ background: failed ? "#F0F4F8" : (c.logoBg || "#F0F4F8"), minHeight: 120 }}>
                  {failed ? (
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#374151", textAlign: "center", padding: "0 8px" }}>{c.name}</span>
                  ) : (
                    <img src={c.logo} alt={c.name}
                      style={{
                        height: 64, maxWidth: 160, objectFit: "contain",
                        filter: "drop-shadow(0 0 2px rgba(0,0,0,0.18)) drop-shadow(0 1px 3px rgba(0,0,0,0.12))"
                      }}
                      onError={() => handleImgError(c.logo)} />
                  )}
                </div>
                <div className="w-full px-4 py-3 border-t" style={{ borderColor: "#F3F4F6" }}>
                  <p className="text-[13px] font-bold text-[#0A1628] leading-snug">{c.name}</p>
                  <p className="text-[11px] mt-0.5 font-semibold" style={{ color: accentColor }}>{c.tag}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button onClick={prev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "#fff", border: "1.5px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <ChevronLeft size={16} className="text-[#374151]" />
          </button>
          <div className="flex gap-2 items-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === page ? 24 : 8, height: 8, background: i === page ? accentColor : "#D1D5DB" }} />
            ))}
          </div>
          <button onClick={next}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "#fff", border: "1.5px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <ChevronLeft size={16} className="text-[#374151] rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientLogoGrid;
