const CLIENTS = [
  { name: "A-One Autocare", logo: "/clients/a-one-autocare.png" },
  { name: "DP Electric", logo: "/clients/dp-electric.png" },
  { name: "Game Zone Events", logo: "/clients/game-zone-events.webp" },
  { name: "Krisha Hospital", logo: "/clients/krisha-hospital.png" },
  { name: "Atul Bakery", logo: "/clients/atul-bakery.png" },
  { name: "Grand Bavarchi", logo: "/clients/grand-bavarchi.png" },
  { name: "Inn of the Dove", logo: "/clients/inn-of-the-dove.png" },
  { name: "Levapor", logo: "/clients/levapor.png" },
  { name: "OBL Prints", logo: "/clients/oblprint.webp" },
  { name: "Shukan Hospital", logo: "/clients/shukan-hospital.png" },
  { name: "Spinx", logo: "/clients/spinx.png", dark: true },
  { name: "The Grand Palace", logo: "/clients/the-grand-palace.jpg" },
];

export function ClientLogoMarquee() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-border bg-white py-14 overflow-hidden">
      <p className="mb-10 text-center text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy/70">
        Trusted By Growth-Focused Brands
      </p>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max items-center gap-6 animate-marquee">
          {row.map((c, i) => (
            <div key={`${c.name}-${i}`} className="flex flex-col items-center gap-3 shrink-0">
              <div
                className={`flex h-28 w-44 items-center justify-center rounded-2xl border border-border p-4 shadow-xs ${
                  c.dark ? "bg-navy" : "bg-white"
                }`}
              >
                <img src={c.logo} alt={c.name} className="max-h-20 max-w-full w-auto object-contain" />
              </div>
              <p className="text-[13px] font-semibold text-navy/70 text-center">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
