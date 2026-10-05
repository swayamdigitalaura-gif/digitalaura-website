// Forwards website form submissions to the LeadGenie CRM "website_form" webhook.
// Configured via server env (never hard-code — the secret grants write access to the CRM):
//   CRM_WEBHOOK_URL    e.g. https://leadgenie.tech/api/webhooks/website_form/<form-id>
//   CRM_WEBHOOK_SECRET the ?secret= value LeadGenie shows for that form
// If either is missing this is a no-op, so local dev and un-configured servers keep working.

async function pushLeadToCRM(lead) {
  const base = process.env.CRM_WEBHOOK_URL;
  const secret = process.env.CRM_WEBHOOK_SECRET;
  if (!base || !secret) return;

  try {
    const url = `${base}?secret=${encodeURIComponent(secret)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error(`[crm] webhook responded ${res.status}`);
  } catch (err) {
    // Never let a CRM outage break the form — the inquiry is already saved in our DB.
    console.error('[crm] webhook failed:', err.message);
  }
}

module.exports = { pushLeadToCRM };
