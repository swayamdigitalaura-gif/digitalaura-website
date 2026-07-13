import { MapPin } from "lucide-react";
import CMSIcon from "@/components/CMSIcon";

const offices = [
  {
    city: "Ahmedabad Office",
    address: "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura, Ahmedabad, Gujarat 382330",
  },
  {
    city: "Chandigarh Office",
    address: "F298, R&R Tower, Phase 8-B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160055",
  },
];

const OfficeLocations = () => (
  <section className="py-10 px-4 md:px-8 border-t border-[#E5E7EB]" style={{ background: "#FFFFFF" }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {offices.map((o, oi) => (
          <div key={o.city} className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "#1A237E" }}
            >
              <CMSIcon cmsKey="offices_icon_1" cmsLabel="MapPin Icon" name="MapPin" size={24} color="#FFFFFF" />
            </div>
            <div>
              <p className="font-bold text-[#0A1628] text-sm mb-1">
                <span data-cms-key={`offices_${oi}_city`} data-cms-label="Office City" data-cms-attr="text">{o.city}</span>
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                <span data-cms-key={`offices_${oi}_address`} data-cms-label="Office Address" data-cms-attr="text">{o.address}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OfficeLocations;
