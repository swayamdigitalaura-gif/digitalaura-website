const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export interface LeadFields {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project?: string;
  message?: string;
  /** Value of the hidden honeypot input (company_site); bots fill it. */
  honeypot?: string;
}

/** Posts a lead form to /api/contact (saved to DB, emailed, forwarded to Lead Genie by the backend). */
export async function submitLead(
  fields: LeadFields,
  formName: string,
): Promise<{ ok: boolean; error?: string }> {
  const { honeypot, ...rest } = fields;
  const params = new URLSearchParams(window.location.search);
  try {
    const res = await fetch(`${API}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...rest,
        company_site: honeypot || undefined,
        source: formName.slice(0, 100),
        page: window.location.pathname,
        utm_source: params.get("utm_source") ?? undefined,
        utm_medium: params.get("utm_medium") ?? undefined,
        utm_campaign: params.get("utm_campaign") ?? undefined,
      }),
    });
    if (res.ok) return { ok: true };
    const j = await res.json().catch(() => null);
    return { ok: false, error: j?.message ?? "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
