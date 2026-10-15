import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4042735126313!2d72.6881782!3d23.082292199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83bdb5cc83a9%3A0xcbe9af162f4cdebc!2sDigital%20Aura!5e0!3m2!1sen!2sin!4v1792055176408!5m2!1sen!2sin";

const ORANGE = "#FF6B2B";
const NAVY = "#0A1628";

const ROWS = [
  { Icon: Phone, label: "Call us", value: "+91 81412 00284", href: "tel:+918141200284" },
  { Icon: MessageCircle, label: "WhatsApp", value: "Message us", href: "https://wa.me/918141200284" },
  { Icon: Mail, label: "Email", value: "info@thedigitalaura.com", href: "mailto:info@thedigitalaura.com" },
];

/**
 * Google Map of the Hanspura office next to a "Talk to us" card. Rendered directly above the site footer on the four
 * pillar pages. The iframe is plain markup, so it is part of the prerendered HTML and lazy-loads in the browser.
 */
export default function OfficeMap({ auditHref, auditLabel }: { auditHref: string; auditLabel: string }) {
  return (
    <section id="visit-us" className="bg-[#F8FAFF]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ borderColor: "#E5E7EB", color: NAVY }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />
            Find us
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-4xl" style={{ color: NAVY }}>
            Talk to us, or drop in at our Hanspura office
          </h2>
        </div>
        <div className="mt-10 grid overflow-hidden rounded-2xl border bg-white shadow-sm md:grid-cols-[1.5fr_1fr]" style={{ borderColor: "#E5E7EB" }}>
          <div className="relative min-h-[300px] bg-[#F3F4F6] md:min-h-[420px]">
            <iframe
              src={MAPS_EMBED}
              title="Digital Aura office on Google Maps: 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad"
              width="600"
              height="450"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="flex flex-col p-6 md:p-8">
            <h3 className="text-xl font-extrabold" style={{ color: NAVY }}>Talk to us</h3>
            <ul className="mt-5 space-y-4">
              {ROWS.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} className="group flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: `${ORANGE}1a`, color: ORANGE }}><Icon size={20} /></span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280]">{label}</span>
                      <span className="block truncate text-sm font-bold group-hover:underline" style={{ color: NAVY }}>{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t pt-5 text-sm text-[#4B5563]" style={{ borderColor: "#E5E7EB" }}>
              <p className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0" style={{ color: ORANGE }} /><span>713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad, Gujarat 382330</span></p>
              <p className="flex items-start gap-3"><Clock size={16} className="mt-0.5 shrink-0" style={{ color: ORANGE }} /><span>Monday to Saturday, 10 AM to 7 PM. Closed on Sunday.</span></p>
            </div>
            <div className="mt-6 md:mt-auto md:pt-6">
              <a
                href={auditHref}
                className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: ORANGE, boxShadow: `0 8px 22px ${ORANGE}40` }}
              >
                {auditLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
