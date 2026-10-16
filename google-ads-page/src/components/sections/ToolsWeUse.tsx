import { Section, SectionHead } from "../shared/SectionPrimitives";

const TOOLS = [
  { name: "Google Ads", logo: "/tools/google-ads.png", use: "Campaign build & optimisation" },
  { name: "Google Analytics 4", logo: "/tools/google-analytics-4.png", use: "Traffic & conversion data" },
  { name: "Google Tag Manager", logo: "/tools/google-tag-manager.png", use: "Event & conversion tracking setup" },
  { name: "Looker Studio", logo: "/tools/looker-studio.png", use: "Live reporting dashboards" },
  { name: "Google Merchant Center", logo: "/tools/google-merchant-center.png", use: "Product feeds for Shopping ads" },
  { name: "SEMrush", logo: "/tools/semrush.png", use: "Competitor & keyword research" },
  { name: "Bing Ads", logo: "/tools/bing-ads.png", use: "Microsoft Advertising campaigns" },
];

export function ToolsWeUse() {
  return (
    <Section id="tools" className="bg-white">
      <SectionHead
        eyebrow="Google Ads tools we use"
        title="The stack behind every campaign"
        lead="No black boxes. Every tool we use is auditable inside your own accounts."
      />
      <div className="pillar-cols-4 pillar-small grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TOOLS.map((t) => (
          <div key={t.name} className="pillar-card flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-xs transition-shadow hover:shadow-md">
            <div className="grid h-28 w-full place-items-center rounded-xl bg-white">
              <img src={t.logo} alt={`${t.name} logo`} className="h-24 w-auto max-w-[min(160px,100%)] object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-navy">{t.name}</div>
              <div className="mt-1 text-xs leading-snug text-muted-foreground">{t.use}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
