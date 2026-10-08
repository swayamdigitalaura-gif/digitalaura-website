/**
 * Client-side calculators for the pricing pages (blueprint gads-02 and meta-02).
 * Pure arithmetic on numbers the visitor types in: nothing is sent anywhere or stored,
 * and the defaults are illustrative examples, not Digital Aura benchmarks.
 */
import { useState } from "react";

export type CalculatorVariant = "ads-budget" | "break-even";

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

const AdsCalculator = ({ variant, accent }: { variant: CalculatorVariant; accent: string }) =>
  variant === "ads-budget" ? <AdsBudget accent={accent} /> : <BreakEven accent={accent} />;

export default AdsCalculator;
