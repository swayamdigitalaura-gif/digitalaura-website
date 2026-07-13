const industries = [
  "Healthcare", "Restaurant", "eCommerce", "Real Estate", "Education",
  "Legal", "Fitness", "Finance", "Automotive", "Hospitality",
  "Healthcare", "Restaurant", "eCommerce", "Real Estate", "Education",
  "Legal", "Fitness", "Finance", "Automotive", "Hospitality",
];

const ClientLogos = () => (
  <section
    className="py-4 overflow-hidden"
    style={{
      background: "#F8FAFF",
      borderTop: "1px solid #E5E7EB",
      borderBottom: "1px solid #E5E7EB",
    }}
  >
    <div className="flex items-center">
      <div
        className="shrink-0 px-6 text-sm font-semibold whitespace-nowrap text-[#6B7280]"
      >
        Industries We Serve:
      </div>

      <div className="overflow-hidden flex-1">
        <div className="marquee-track flex gap-3" style={{ width: "max-content" }}>
          {industries.map((ind, i) => (
            <span
              key={i}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{
                border: "1.5px solid rgba(26,111,232,0.25)",
                color: "#1A6FE8",
                background: "rgba(26,111,232,0.05)",
              }}
            >
              {ind}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ClientLogos;
