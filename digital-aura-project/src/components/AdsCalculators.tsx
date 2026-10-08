/**
 * Client-side calculators for the pricing pages (blueprint gads-02 and meta-02).
 * Pure arithmetic on numbers the visitor types in: nothing is sent anywhere or stored,
 * and the defaults are illustrative examples, not Digital Aura benchmarks.
 */
import { useState } from "react";

export type CalculatorVariant = "ads-budget" | "break-even" | "package-picker";

const inr = (n: number) =>
  Number.isFinite(n) ? "₹" + Math.round(n).toLocaleString("en-IN") : "–";
const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  hint?: string;
}

const Field = ({ id, label, value, onChange, suffix, hint }: FieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-[#0A1628]">{label}</label>
    <div className="mt-1 flex items-center rounded-xl border bg-white px-3" style={{ borderColor: "#D1D5DB" }}>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent py-2.5 text-[15px] text-[#0A1628] outline-none"
      />
      {suffix && <span className="ml-2 text-sm text-[#6B7280]">{suffix}</span>}
    </div>
    {hint && <p className="mt-1 text-xs text-[#6B7280]">{hint}</p>}
  </div>
);

const Result = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
  <div className="rounded-xl bg-white p-4 border" style={{ borderColor: "#E5E7EB" }}>
    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">{label}</p>
    <p className={`mt-1 font-black text-[#0A1628] ${strong ? "text-2xl" : "text-xl"}`}>{value}</p>
  </div>
);

const AdsBudget = ({ accent }: { accent: string }) => {
  const [spend, setSpend] = useState("30000");
  const [cpc, setCpc] = useState("20");
  const [conv, setConv] = useState("5");
  const [close, setClose] = useState("20");
  const [profit, setProfit] = useState("5000");
  const [fee, setFee] = useState("0");
  const [gstOn, setGstOn] = useState(false);
  const [gst, setGst] = useState("18");

  const s = num(spend), cp = num(cpc), cv = num(conv) / 100, cl = num(close) / 100, pr = num(profit), fe = num(fee);
  const clicks = cp > 0 ? s / cp : 0;
  const leads = clicks * cv;
  const customers = leads * cl;
  const cpl = leads > 0 ? s / leads : NaN;
  const cpa = customers > 0 ? s / customers : NaN;
  const gstAmt = gstOn ? (s + fe) * (num(gst) / 100) : 0;
  const outlay = s + fe + gstAmt;
  const gross = customers * pr;
  const net = gross - outlay;
  const breakEvenCpl = pr * cl;

  return (
    <div className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field id="ab-spend" label="Monthly ad spend" value={spend} onChange={setSpend} suffix="₹" />
        <Field id="ab-cpc" label="Average cost per click" value={cpc} onChange={setCpc} suffix="₹" hint="Check your own account or keyword planner." />
        <Field id="ab-conv" label="Website conversion rate" value={conv} onChange={setConv} suffix="%" hint="Share of clicks that become enquiries." />
        <Field id="ab-close" label="Enquiry to customer rate" value={close} onChange={setClose} suffix="%" hint="Share of enquiries that you convert." />
        <Field id="ab-profit" label="Profit per customer" value={profit} onChange={setProfit} suffix="₹" />
        <Field id="ab-fee" label="Agency management fee (monthly)" value={fee} onChange={setFee} suffix="₹" hint="Optional. Use the fee in your quote." />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-[#0A1628]">
          <input type="checkbox" checked={gstOn} onChange={(e) => setGstOn(e.target.checked)} /> Add GST to ad spend and fee
        </label>
        {gstOn && (
          <div className="w-32"><Field id="ab-gst" label="GST rate" value={gst} onChange={setGst} suffix="%" /></div>
        )}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-live="polite">
        <Result label="Estimated clicks" value={Math.round(clicks).toLocaleString("en-IN")} />
        <Result label="Estimated enquiries" value={(Math.round(leads * 10) / 10).toLocaleString("en-IN")} />
        <Result label="Cost per enquiry" value={inr(cpl)} strong />
        <Result label="Cost per customer" value={inr(cpa)} strong />
        <Result label="Total monthly outlay" value={inr(outlay)} />
        <Result label="Profit from customers" value={inr(gross)} />
        <Result label={net >= 0 ? "Profit after ad costs" : "Loss after ad costs"} value={inr(Math.abs(net))} strong />
        <Result label="Break-even cost per enquiry" value={inr(breakEvenCpl)} />
      </div>
      <p className="mt-4 text-xs text-[#6B7280] leading-relaxed">
        The starting numbers are examples only, not Digital Aura results or market averages. Replace them with your own. This is a simple estimate: real results vary with competition, season, your offer and how quickly you follow up.
      </p>
    </div>
  );
};

const BreakEven = ({ accent }: { accent: string }) => {
  const [value, setValue] = useState("10000");
  const [margin, setMargin] = useState("40");
  const [close, setClose] = useState("20");

  const v = num(value), m = num(margin) / 100, c = num(close) / 100;
  const profitPer = v * m;
  const breakEvenCpl = profitPer * c;
  const breakEvenCpa = profitPer;
  const breakEvenRoas = m > 0 ? 1 / m : NaN;

  return (
    <div className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field id="be-value" label="Average sale value" value={value} onChange={setValue} suffix="₹" />
        <Field id="be-margin" label="Gross margin" value={margin} onChange={setMargin} suffix="%" hint="What remains after the cost of delivering it." />
        <Field id="be-close" label="Enquiry to customer rate" value={close} onChange={setClose} suffix="%" hint="Share of enquiries that you convert." />
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-live="polite">
        <Result label="Profit per customer" value={inr(profitPer)} />
        <Result label="Most you can pay per enquiry" value={inr(breakEvenCpl)} strong />
        <Result label="Most you can pay per customer" value={inr(breakEvenCpa)} strong />
        <Result label="Break-even return on ad spend" value={Number.isFinite(breakEvenRoas) ? (Math.round(breakEvenRoas * 100) / 100).toString() + "x" : "–"} />
      </div>
      <p className="mt-4 text-xs text-[#6B7280] leading-relaxed">
        Paying more than these amounts loses money on each sale before other costs. Real campaigns also carry fees, tools and your team's time, so aim well below them. The starting numbers are examples only.
      </p>
    </div>
  );
};

type Tier = "Starter" | "Business" | "Growth" | "Custom";

interface SelectProps { id: string; label: string; value: string; onChange: (v: string) => void; options: [string, string][]; }
const Select = ({ id, label, value, onChange, options }: SelectProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-[#0A1628]">{label}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[15px] text-[#0A1628]" style={{ borderColor: "#D1D5DB" }}>
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  </div>
);

const TIER_TEXT: Record<Tier, string> = {
  Starter: "A small, focused site that gets you found: key pages, a lead form, WhatsApp button and basic on-page SEO.",
  Business: "A complete lead-generating website: service pages, blog, FAQ, forms routed to email and WhatsApp, and an editable CMS.",
  Growth: "A site built to win search and convert paid traffic: dedicated service and location pages, SEO architecture and CRM or WhatsApp integration.",
  Custom: "A custom build for logins, bookings, payments, dashboards or integrations. We scope and quote it separately.",
};

const PackagePicker = ({ accent }: { accent: string }) => {
  const [goal, setGoal] = useState("enquiries");
  const [sell, setSell] = useState("no");
  const [size, setSize] = useState("mid");
  const [needs, setNeeds] = useState("none");
  const [content, setContent] = useState("ready");

  let tier: Tier = "Business";
  const why: string[] = [];
  if (goal === "bookings" || needs === "systems" || sell === "large") {
    tier = "Custom";
    if (goal === "bookings") why.push("Bookings or a portal usually need custom development.");
    if (needs === "systems") why.push("Logins, dashboards or integrations are outside a standard package.");
    if (sell === "large") why.push("A large catalogue needs a more advanced build.");
  } else if (goal === "sales" || sell === "small" || size === "large" || needs === "multi") {
    tier = "Growth";
    if (goal === "sales" || sell === "small") why.push("Selling online needs product pages, payments and conversion-focused layouts.");
    if (size === "large") why.push("Many services or locations need dedicated pages and a clear structure.");
    if (needs === "multi") why.push("Several languages or locations need extra planning.");
  } else if (goal === "credibility" && size === "small") {
    tier = "Starter";
    why.push("A credible online presence with a handful of pages is what you need.");
  } else {
    why.push("You want enquiries from a set of services, which a complete site with an editable CMS supports.");
  }
  if (content === "help") why.push("You need help with writing or photos, which is quoted as an add-on.");

  return (
    <div className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select id="pp-goal" label="Main goal of the website" value={goal} onChange={setGoal} options={[["credibility", "Look credible online"], ["enquiries", "Get enquiries and calls"], ["sales", "Sell products online"], ["bookings", "Take bookings or run a portal"]]} />
        <Select id="pp-sell" label="Do you need to sell online?" value={sell} onChange={setSell} options={[["no", "No"], ["small", "Yes, a small catalogue"], ["large", "Yes, a large catalogue"]]} />
        <Select id="pp-size" label="How many services or products?" value={size} onChange={setSize} options={[["small", "A few (up to 3)"], ["mid", "A handful (4 to 10)"], ["large", "Many (10 or more) or several locations"]]} />
        <Select id="pp-needs" label="Any special needs?" value={needs} onChange={setNeeds} options={[["none", "None"], ["multi", "More than one language"], ["systems", "Logins, dashboards or integrations"]]} />
        <Select id="pp-content" label="Is your content ready?" value={content} onChange={setContent} options={[["ready", "Yes, text and photos are ready"], ["help", "No, we need help"]]} />
      </div>
      <div className="mt-6 rounded-xl bg-white p-5 border" style={{ borderColor: "#E5E7EB" }} aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Recommended package</p>
        <p className="mt-1 text-2xl font-black text-[#0A1628]">{tier}</p>
        <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">{TIER_TEXT[tier]}</p>
        <ul className="mt-3 space-y-1 text-sm text-[#4B5563]">
          {why.map((w) => <li key={w} className="flex gap-2"><span style={{ color: accent }}>✓</span>{w}</li>)}
        </ul>
        <a href="/contact/#contact-form" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border" style={{ color: accent, borderColor: `${accent}40` }}>Get a written quote for {tier}</a>
      </div>
      <p className="mt-4 text-xs text-[#6B7280] leading-relaxed">This is a guide, not a quote. Nothing you choose here is sent to us. The final scope and fee are confirmed in writing.</p>
    </div>
  );
};

const AdsCalculator = ({ variant, accent }: { variant: CalculatorVariant; accent: string }) =>
  variant === "ads-budget" ? <AdsBudget accent={accent} /> : variant === "package-picker" ? <PackagePicker accent={accent} /> : <BreakEven accent={accent} />;

export default AdsCalculator;
