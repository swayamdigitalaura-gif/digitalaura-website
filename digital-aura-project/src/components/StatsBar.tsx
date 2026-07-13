import { useEffect, useRef, useState } from "react";
import { Users, Rocket, Star, AppWindow } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import CMSIcon from "@/components/CMSIcon";

const DEFAULT_STATS = [
  { key: 'stats_apps',      labelKey: 'stats_apps_label',      defTarget: 1000, suffix: "+", defLabel: "Apps & Web Solutions Built", iconName: "AppWindow", color: "#7C3AED", bg: "rgba(124,58,237,0.1)" },
  { key: 'stats_clients',   labelKey: 'stats_clients_label',   defTarget: 750, suffix: "+", defLabel: "Happy Clients",              iconName: "Users",     color: "#FF6B2B", bg: "rgba(255,107,43,0.1)" },
  { key: 'stats_campaigns', labelKey: 'stats_campaigns_label', defTarget: 218, suffix: "+", defLabel: "Campaigns Delivered",        iconName: "Rocket",    color: "#1A6FE8", bg: "rgba(26,111,232,0.1)" },
  { key: 'stats_rating',    labelKey: 'stats_rating_label',    defTarget: 4.9, suffix: "★", defLabel: "Average Rating",             iconName: "Star",      color: "#FF6B2B", bg: "rgba(255,107,43,0.1)" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const isDecimal = !Number.isInteger(target);
        const steps = 60, duration = 1800;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / steps, 3);
          const current = target * eased;
          setVal(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
          if (step >= steps) { setVal(target); clearInterval(timer); }
        }, duration / steps);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display = Number.isInteger(target) ? Math.floor(val) : val.toFixed(1);
  return (
    <div ref={ref} className="text-[60px] md:text-[72px] font-bold leading-none" style={{ color: "#0A1628" }}>
      {display}<span style={{ color: "#FF6B2B" }}>{suffix}</span>
    </div>
  );
};

const StatsBar = () => {
  const s = useSettings([
    ...DEFAULT_STATS.map(x => x.key),
    ...DEFAULT_STATS.map(x => x.labelKey),
    'stats_badge', 'stats_heading',
    'stats_icon_0','stats_icon_1','stats_icon_2','stats_icon_3',
  ]);

  const stats = DEFAULT_STATS.map((x, i) => {
    const raw = s[x.key] || '';
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    return { ...x, target: isNaN(num) ? x.defTarget : num, label: s[x.labelKey] || x.defLabel, iconName: s[`stats_icon_${i}`] || x.iconName };
  });

  return (
  <section className="py-20 px-4 md:px-8 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #7C3AED, #FF6B2B, #1A6FE8)" }} />
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="section-badge" data-cms-key="stats_badge" data-cms-label="Stats Badge" data-cms-attr="text">{s.stats_badge || 'By The Numbers'}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] mt-1" data-cms-key="stats_heading" data-cms-label="Stats Heading" data-cms-attr="text">
          {s.stats_heading || 'Our Impact Speaks for Itself'}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-[#E5E7EB]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
        {stats.map((st, i) => (
          <div key={i} className={`text-center py-10 px-4 relative ${i < stats.length-1 ? "border-r border-[#E5E7EB]" : ""} ${i < 2 ? "border-b border-[#E5E7EB] md:border-b-0" : ""}`}
            style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F8FAFF" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: st.bg }}>
              <CMSIcon cmsKey={`stats_icon_${i}`} cmsLabel={`Stat ${i+1} Icon`} name={st.iconName} size={20} color={st.color} />
            </div>
            <div data-cms-key={st.key} data-cms-label={`Stat ${i+1} Number`} data-cms-attr="text">
              <CountUp target={st.target} suffix={st.suffix} />
            </div>
            <p className="mt-2 text-[15px] font-medium text-[#6B7280]" data-cms-key={st.labelKey} data-cms-label={`Stat ${i+1} Label`} data-cms-attr="text">{st.label}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full" style={{ background: st.color }} />
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default StatsBar;
