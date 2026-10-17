const NAVY = "#0A1628";

/**
 * Pricing table used by the "pricing" extra section. Real <table> markup so search engines and AI answers can read
 * the figures. Scrolls sideways on phones instead of squeezing the columns. First column is the row heading and the
 * featured column (usually the amount) is tinted in the accent colour.
 */
export default function PriceTable({
  columns,
  rows,
  accent,
  featuredCol = 1,
  caption,
}: {
  columns: string[];
  rows: string[][];
  accent: string;
  featuredCol?: number;
  caption?: string;
}) {
  return (
    <>
    <div className="space-y-4 md:hidden">
      {rows.map((r) => (
        <div key={r[0]} className="rounded-2xl border bg-white p-5" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(10,22,40,0.05)" }}>
          <h3 className="text-[17px] font-extrabold" style={{ color: NAVY }}>{r[0]}</h3>
          {r[featuredCol] && <p className="mt-1 text-[18px] font-extrabold" style={{ color: accent }}>{r[featuredCol]}</p>}
          <dl className="mt-3 space-y-3">
            {r.map((cell, i) => i === 0 || i === featuredCol ? null : (
              <div key={i}>
                <dt className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: "#6B7280" }}>{columns[i]}</dt>
                <dd className="mt-0.5 text-[14.5px] leading-relaxed" style={{ color: "#374151" }}>{cell}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
    <div className="hidden overflow-x-auto rounded-2xl border bg-white md:block" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(10,22,40,0.05)" }}>
      <table className="w-full border-collapse text-left" style={{ minWidth: 640 }}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr style={{ background: `${accent}10` }}>
            {columns.map((c) => (
              <th key={c} scope="col" className="p-4 text-[12px] font-black uppercase tracking-[0.12em]" style={{ color: "#4B5563" }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="align-top" style={{ borderTop: "1px solid #E5E7EB" }}>
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="p-4 text-[15.5px] font-extrabold" style={{ color: NAVY }}>{cell}</th>
                ) : (
                  <td
                    key={i}
                    className={`p-4 text-[14.5px] leading-relaxed ${i === featuredCol ? "font-extrabold" : ""}`}
                    style={i === featuredCol ? { color: accent, background: `${accent}0d`, fontSize: 16 } : { color: "#374151" }}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
