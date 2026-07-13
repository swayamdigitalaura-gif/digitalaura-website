import { ArrowUpRight, ArrowDownRight, Circle } from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Shared primitives for building realistic dashboard chrome
   ────────────────────────────────────────────────────────── */

function WindowChrome({ tool, account }: { tool: string; account: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5 bg-surface-muted/40">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] font-semibold text-navy/50">{tool}</span>
      </div>
      <span className="text-[10px] font-mono text-navy/35">{account}</span>
    </div>
  );
}

export function MetricSparkline({
  points,
  color = "oklch(0.72 0.18 50)",
  width = 120,
  height = 36,
}: {
  points: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${height - ((p - min) / range) * (height - 4) - 2}`)
    .join(" ");
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  const gradId = `spark-${color.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} stroke="none" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   Google Ads campaign table mockup
   ────────────────────────────────────────────────────────── */

const CAMPAIGNS = [
  { name: "Search | High-Intent Brand", status: "ok", impr: "184.2K", ctr: "9.8%", cpc: "₹14.20", conv: "412", trend: "up" },
  { name: "PMax | Revenue Max", status: "ok", impr: "302.5K", ctr: "7.1%", cpc: "₹18.60", conv: "598", trend: "up" },
  { name: "Search | Competitor Terms", status: "warn", impr: "96.4K", ctr: "4.3%", cpc: "₹26.90", conv: "121", trend: "down" },
  { name: "Shopping | Catalog Sync", status: "ok", impr: "221.8K", ctr: "6.4%", cpc: "₹12.10", conv: "486", trend: "up" },
];

export function GoogleAdsDashboardCard({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-border bg-white shadow-dashboard ${className}`}>
      <WindowChrome tool="ads.google.com — Campaigns" account="MCC · 814-120-0284" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Account Performance · Last 30 days</p>
            <p className="font-display text-[15px] font-bold text-navy mt-0.5">All Campaigns</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold text-success uppercase">
            <span className="size-1.5 rounded-full bg-success animate-pulse" /> Optimized
          </span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-wider text-navy/40 px-1">
          <span className="col-span-1">Campaign</span>
          <span className="text-right">CTR</span>
          <span className="text-right">CPC</span>
          <span className="text-right">Conv.</span>
        </div>
        <div className="mt-1 divide-y divide-border/60">
          {CAMPAIGNS.map((c) => (
            <div key={c.name} className="grid grid-cols-4 items-center gap-2 px-1 py-2.5 text-[12px]">
              <div className="flex items-center gap-1.5 truncate">
                <Circle className={`size-2 shrink-0 fill-current ${c.status === "ok" ? "text-success" : "text-warning"}`} strokeWidth={0} />
                <span className="truncate font-semibold text-navy">{c.name}</span>
              </div>
              <span className="text-right font-mono text-navy/80">{c.ctr}</span>
              <span className="text-right font-mono text-navy/80">{c.cpc}</span>
              <span className="text-right font-mono font-bold text-navy flex items-center justify-end gap-0.5">
                {c.conv}
                {c.trend === "up" ? (
                  <ArrowUpRight className="size-3 text-success" />
                ) : (
                  <ArrowDownRight className="size-3 text-destructive" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   GA4-style report card
   ────────────────────────────────────────────────────────── */

export function GA4ReportCard({ className = "" }: { className?: string }) {
  const sessions = [22, 28, 26, 34, 31, 40, 38, 46, 52, 49, 58, 64, 60, 70, 76];
  return (
    <div className={`overflow-hidden rounded-3xl border border-border bg-white shadow-dashboard ${className}`}>
      <WindowChrome tool="analytics.google.com — GA4" account="Property · G-DA48120" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Users · Last 30 days</p>
            <p className="font-display text-[26px] font-extrabold text-navy leading-none mt-1">48,206</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[12px] font-bold text-success">
            <ArrowUpRight className="size-4" /> +38.4%
          </span>
        </div>
        <div className="mt-4 h-16">
          <MetricSparkline points={sessions} color="oklch(0.6 0.14 240)" width={300} height={64} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Engagement</p>
            <p className="text-[14px] font-bold text-navy mt-1">68.2%</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Avg Session</p>
            <p className="text-[14px] font-bold text-navy mt-1">3m 12s</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Conversions</p>
            <p className="text-[14px] font-bold text-navy mt-1">1,482</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Looker Studio style multi-metric report tile
   ────────────────────────────────────────────────────────── */

export function LookerStudioCard({ className = "" }: { className?: string }) {
  const bars = [38, 52, 44, 61, 58, 70, 66, 78, 84, 80, 92, 98];
  return (
    <div className={`overflow-hidden rounded-3xl border border-border bg-white shadow-dashboard ${className}`}>
      <WindowChrome tool="lookerstudio.google.com — Report" account="Digital Aura · Live" />
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Blended Channel Revenue</p>
        <p className="font-display text-[24px] font-extrabold text-navy mt-1">₹2.94 Cr</p>
        <div className="mt-4 flex items-end gap-1.5 h-20">
          {bars.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-primary"
              style={{ height: `${b}%`, opacity: 0.5 + (i / bars.length) * 0.5 }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-[12px]">
          <div className="flex items-center justify-between">
            <span className="text-navy/60 font-medium">Google Ads</span>
            <span className="font-bold text-navy">61%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-navy/60 font-medium">Organic Search</span>
            <span className="font-bold text-navy">24%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Conversion funnel mockup
   ────────────────────────────────────────────────────────── */

export function ConversionFunnelCard({ className = "" }: { className?: string }) {
  const steps = [
    { label: "Impressions", value: "4.8M", width: 100 },
    { label: "Clicks", value: "186.4K", width: 72 },
    { label: "Leads", value: "12,840", width: 44 },
    { label: "Conversions", value: "1,482", width: 22 },
  ];
  return (
    <div className={`overflow-hidden rounded-3xl border border-border bg-white shadow-dashboard ${className}`}>
      <WindowChrome tool="Conversion Funnel — GA4 + Google Ads" account="Blended view" />
      <div className="p-5 space-y-3">
        {steps.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between text-[11px] font-semibold text-navy/60 mb-1.5">
              <span>{s.label}</span>
              <span className="font-mono font-bold text-navy">{s.value}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-surface-muted overflow-hidden">
              <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${s.width}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
