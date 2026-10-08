/**
 * Conversion event helper. Pushes to window.dataLayer (Google Tag Manager is loaded from the CMS
 * global head code), so events can be mapped to GA4 conversions in GTM without code changes.
 *
 * Events: cta_click, phone_click, whatsapp_click, lead_form_start, lead_form_submit, calculator_use.
 */
export type TrackParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: TrackParams = {}): void {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, page_path: window.location.pathname, ...params });
  } catch {
    /* tracking must never break the page */
  }
}

export const PHONE_DISPLAY = "+91 81412 00284";
export const PHONE_TEL = "tel:+918141200284";
export const whatsappLink = (message: string) =>
  `https://api.whatsapp.com/send/?phone=918141200284&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
