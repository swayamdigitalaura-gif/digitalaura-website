import { Eyebrow, H2, Lead, Section } from "../shared/SectionPrimitives";

const TOOLS = [
  { name: "Google Ads", logo: "/tools/google-ads.png" },
  { name: "Google Analytics 4", logo: "/tools/google-analytics-4.png" },
  { name: "Google Tag Manager", logo: "/tools/google-tag-manager.png" },
  { name: "Looker Studio", logo: "/tools/looker-studio.png" },
  { name: "Google Merchant Center", logo: "/tools/google-merchant-center.png" },
  { name: "SEMrush", logo: "/tools/semrush.png" },
  { name: "Bing Ads", logo: "/tools/bing-ads.png" },
];

export function ToolsWeUse() {
  return (
    <Section id="tools" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <Eyebrow>Google Ads Tools We Use</Eyebrow>
        <H2 className="mt-6">The Stack Behind Every Campaign</H2>
        <Lead className="mt-6 mx-auto">No black boxes — every tool we use is auditable inside your own accounts.</Lead>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {TOOLS.map((t) => (
          <div
            key={t.name}
            className="group flex h-52 items-center justify-center rounded-3xl border border-border bg-white p-8 shadow-xs hover-card"
          >
            <img
              src={t.logo}
              alt={t.name}
              className="max-h-28 w-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
