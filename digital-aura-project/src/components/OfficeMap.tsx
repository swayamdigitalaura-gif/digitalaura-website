const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4042735126313!2d72.6881782!3d23.082292199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83bdb5cc83a9%3A0xcbe9af162f4cdebc!2sDigital%20Aura!5e0!3m2!1sen!2sin!4v1792055176408!5m2!1sen!2sin";

const ORANGE = "#FF6B2B";
const NAVY = "#0A1628";

/**
 * Google Map of the Hanspura office next to a "Talk to us" card. Rendered directly above the site footer on the four
 * pillar pages. The iframe is plain markup, so it is part of the prerendered HTML and lazy-loads in the browser.
 */
export default function OfficeMap({ auditHref, auditLabel }: { auditHref: string; auditLabel: string }) {
  return (
    <section id="visit-us" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <h2 className="sr-only">Find Digital Aura in Hanspura, Ahmedabad</h2>
        <div className="grid gap-5 md:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-2xl border bg-[#F3F4F6]" style={{ borderColor: "#E5E7EB" }}>
            <iframe
              src={MAPS_EMBED}
              title="Digital Aura office on Google Maps: 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad"
              width="600"
              height="450"
              style={{ border: 0, width: "100%", height: "100%", minHeight: 320, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="rounded-2xl border bg-white p-7" style={{ borderColor: "#E5E7EB" }}>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Talk to us</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
              <li>Phone: <a className="font-semibold underline" style={{ color: ORANGE }} href="tel:+918141200284">+91 81412 00284</a></li>
              <li>WhatsApp: <a className="font-semibold underline" style={{ color: ORANGE }} href="https://wa.me/918141200284">message us</a></li>
              <li>Email: <a className="font-semibold underline" style={{ color: ORANGE }} href="mailto:info@thedigitalaura.com">info@thedigitalaura.com</a></li>
            </ul>
            <p className="mt-4 text-sm text-[#4B5563]">
              Prefer to start with a review? <a className="font-semibold underline" style={{ color: ORANGE }} href={auditHref}>{auditLabel}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
