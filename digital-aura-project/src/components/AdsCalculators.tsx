/**
 * Client-side calculators for the pricing pages (blueprint gads-02 and meta-02).
 * Pure arithmetic on numbers the visitor types in: nothing is sent anywhere or stored,
 * and the defaults are illustrative examples, not Digital Aura benchmarks.
 */
import { useRef, useState } from "react";
import { track } from "@/lib/track";

export type CalculatorVariant = "ads-budget" | "break-even" | "package-picker" | "ads-selfcheck" | "downtime";

/** Fires one calculator_use event the first time a visitor changes any input. */
const useUseTracking = (name: string) => {
  const done = useRef(false);
  return () => {
    if (!done.current) { done.current = true; track("calculator_use", { calculator: name }); }
  };
};

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
  const mark = useUseTracking("google_ads_budget");
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
    <div onChangeCapture={mark} className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
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
  const mark = useUseTracking("break_even");
  const [value, setValue] = useState("10000");
  const [margin, setMargin] = useState("40");
  const [close, setClose] = useState("20");

  const v = num(value), m = num(margin) / 100, c = num(close) / 100;
  const profitPer = v * m;
  const breakEvenCpl = profitPer * c;
  const breakEvenCpa = profitPer;
  const breakEvenRoas = m > 0 ? 1 / m : NaN;

  return (
    <div onChangeCapture={mark} className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
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
  const mark = useUseTracking("package_picker");
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
    <div onChangeCapture={mark} className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
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

/* ───────── Google Ads self-check (blueprint gads-03): 12 yes/no questions, no account access ───────── */
const SELF_CHECK: { q: string; area: string; tip: string }[] = [
  { q: "Are phone calls and WhatsApp clicks counted as conversions?", area: "Conversion tracking", tip: "Calls and WhatsApp clicks are often your best leads. If they are not counted, the account cannot learn from them." },
  { q: "Is only a real enquiry (not a page view or button click) set as the main conversion?", area: "Conversion tracking", tip: "If page views count as conversions, the account optimises for the wrong thing." },
  { q: "Do you read the search terms report at least once a month?", area: "Search terms", tip: "The report shows what people typed before they saw your ad. It is where wasted spend hides." },
  { q: "Do you keep a negative keyword list and add to it?", area: "Negative keywords", tip: "Negatives block searches that will never buy, such as jobs, free, or unrelated products." },
  { q: "Are campaigns split by service or intent, rather than one catch-all campaign?", area: "Account structure", tip: "Separate campaigns let you control budget and message for each service." },
  { q: "Do you target people physically in your area, not just 'interested in' it?", area: "Location settings", tip: "The wider location option can show ads to people who are not nearby." },
  { q: "Do your ads run only when someone can answer calls or messages?", area: "Ad schedule", tip: "An unanswered call or message is a wasted click." },
  { q: "Does each ad match the offer on the page it opens?", area: "Message match", tip: "If the ad promises one thing and the page shows another, visitors leave." },
  { q: "Does your landing page load fast on mobile and show a call or WhatsApp button?", area: "Landing page", tip: "Most clicks come from phones. Slow pages and hidden contact buttons lose enquiries." },
  { q: "Do you know your cost per enquiry and cost per customer?", area: "Measurement", tip: "Without these two numbers you cannot tell whether the ads pay back." },
  { q: "Do you reply to enquiries within about 15 minutes?", area: "Response speed", tip: "Fast replies convert more enquiries than slow ones." },
  { q: "Do you own the ad account and have admin access?", area: "Account ownership", tip: "The account, its history and data should belong to you, not to an agency." },
];

const AdsSelfCheck = ({ accent }: { accent: string }) => {
  const mark = useUseTracking("ads_selfcheck");
  const [ans, setAns] = useState<Record<number, "yes" | "no">>({});
  const answered = Object.keys(ans).length;
  const flagged = SELF_CHECK.map((x, i) => ({ ...x, i })).filter((x) => ans[x.i] === "no");
  const areas = Array.from(new Set(flagged.map((x) => x.area)));
  return (
    <div onChangeCapture={mark} className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
      <ol className="space-y-4">
        {SELF_CHECK.map((x, i) => (
          <li key={x.q} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span id={`sc-q-${i}`} className="text-sm font-semibold text-[#0A1628]">{i + 1}. {x.q}</span>
            <span role="radiogroup" aria-labelledby={`sc-q-${i}`} className="flex gap-2 shrink-0">
              {(["yes", "no"] as const).map((v) => (
                <label key={v} className="cursor-pointer">
                  <input type="radio" name={`sc-${i}`} value={v} checked={ans[i] === v} onChange={() => setAns((p) => ({ ...p, [i]: v }))} className="sr-only peer" />
                  <span className="inline-block px-4 py-1.5 rounded-full border text-sm font-semibold bg-white text-[#4B5563] peer-focus-visible:ring-2" style={ans[i] === v ? { background: v === "yes" ? accent : "#EF4444", borderColor: v === "yes" ? accent : "#EF4444", color: "#fff" } : { borderColor: "#D1D5DB" }}>{v === "yes" ? "Yes" : "No"}</span>
                </label>
              ))}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-6 rounded-xl bg-white p-5 border" style={{ borderColor: "#E5E7EB" }} aria-live="polite">
        {answered < SELF_CHECK.length ? (
          <p className="text-sm text-[#4B5563]">Answered {answered} of {SELF_CHECK.length}. Answer all questions to see your result.</p>
        ) : flagged.length === 0 ? (
          <p className="text-sm text-[#0A1628] font-semibold">No obvious gaps from these questions. An audit can still find less visible issues, such as budget split and search terms.</p>
        ) : (
          <>
            <p className="text-lg font-black text-[#0A1628]">{flagged.length} of {SELF_CHECK.length} areas may be leaking budget</p>
            <ul className="mt-3 space-y-2">
              {flagged.map((x) => (
                <li key={x.q} className="text-sm text-[#4B5563] leading-relaxed"><span className="font-bold text-[#0A1628]">{x.area}.</span> {x.tip}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[#6B7280]">Areas to look at first: {areas.join(", ")}.</p>
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-[#6B7280] leading-relaxed">This is a quick self-check, not an audit. It runs in your browser and nothing is sent to us. Results depend on your account, so an audit confirms what is really happening.</p>
    </div>
  );
};

/* ───────── Website downtime cost (blueprint web-05): visitor-entered numbers only ───────── */
const Downtime = ({ accent }: { accent: string }) => {
  const mark = useUseTracking("downtime_cost");
  const [perDay, setPerDay] = useState("5");
  const [value, setValue] = useState("3000");
  const [hours, setHours] = useState("24");
  const [open, setOpen] = useState("10");
  const lostEnquiries = (num(perDay) * num(hours)) / Math.max(1, num(open) || 24);
  const lostValue = lostEnquiries * num(value);
  return (
    <div onChangeCapture={mark} className="rounded-2xl border p-5 md:p-7" style={{ borderColor: `${accent}40`, background: "#F8FAFF" }}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field id="dt-perday" label="Website enquiries per day" value={perDay} onChange={setPerDay} />
        <Field id="dt-value" label="Value of one enquiry" value={value} onChange={setValue} suffix="₹" hint="Average profit per enquiry, after your close rate." />
        <Field id="dt-hours" label="Hours the site is down" value={hours} onChange={setHours} suffix="hours" />
        <Field id="dt-open" label="Hours per day enquiries arrive" value={open} onChange={setOpen} suffix="hours" hint="For example 10 for a business that gets enquiries during the day." />
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-4" aria-live="polite">
        <Result label="Enquiries you could lose" value={(Math.round(lostEnquiries * 10) / 10).toLocaleString("en-IN")} />
        <Result label="Value at risk" value={inr(lostValue)} strong />
      </div>
      <p className="mt-4 text-xs text-[#6B7280] leading-relaxed">A simple estimate from the numbers you enter. The starting values are examples only. It runs in your browser and nothing is sent to us.</p>
    </div>
  );
};

const AdsCalculator = ({ variant, accent }: { variant: CalculatorVariant; accent: string }) => {
  if (variant === "ads-budget") return <AdsBudget accent={accent} />;
  if (variant === "package-picker") return <PackagePicker accent={accent} />;
  if (variant === "ads-selfcheck") return <AdsSelfCheck accent={accent} />;
  if (variant === "downtime") return <Downtime accent={accent} />;
  return <BreakEven accent={accent} />;
};

export default AdsCalculator;
