import { Check, ShieldCheck } from "lucide-react";
import { Eyebrow, H2, Section } from "../shared/SectionPrimitives";

const PLATFORMS = [
  { name: "Google Reviews", rating: "4.9", sub: "180+ reviews", logo: "/google-logo.png" },
  { name: "DesignRush", rating: "5.0", sub: "Best Digital Marketing Agencies", logo: "/designrush-badge.webp" },
  { name: "GoodFirms", rating: "4.9", sub: "Top Digital Marketing Company", logo: "/goodfirms-badge.png" },
];

export function Certifications() {
  return (
    <Section className="bg-navy text-white">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <Eyebrow light>Google Partner & Certifications</Eyebrow>
        <H2 className="mt-6 text-white">Verified Authority, Not Just Claims</H2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[14px] font-bold text-white">
          <ShieldCheck className="size-4 text-primary" /> Google Premier Partner
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[14px] font-bold text-white">
          <Check className="size-4 text-primary" /> Google Ads Certified Team
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[14px] font-bold text-white">
          <Check className="size-4 text-primary" /> GA4 Analytics Certified
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {PLATFORMS.map((p) => (
          <div key={p.name} className="flex h-full flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <div className="grid h-32 w-full place-items-center rounded-2xl bg-white px-6 py-4">
              <img src={p.logo} alt={`${p.name} rating badge`} className="max-h-28 max-w-full w-auto object-contain" />
            </div>
            <p className="font-display text-[36px] font-extrabold text-white leading-none tracking-[-0.02em]">
              {p.rating}<span className="text-[16px] font-normal text-white/50">/5</span>
            </p>
            <p className="text-[15px] font-bold text-white">{p.name}</p>
            <p className="text-[13px] font-semibold text-white/50">{p.sub}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
