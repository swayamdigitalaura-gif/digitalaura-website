import { Section, SectionHead } from "../shared/SectionPrimitives";

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
    <Section id="tools" className="bg-white">
      <SectionHead
        eyebrow="Google Ads tools we use"
        title="The stack behind every campaign"
        lead="No black boxes. Every tool we use is auditable inside your own accounts."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {TOOLS.map((t) => (
          <div key={t.name} className="group flex h-28 items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-xs transition-shadow hover:shadow-md">
            <img src={t.logo} alt={t.name} className="max-h-16 w-full object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </Section>
  );
}
