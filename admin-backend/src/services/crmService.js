// Forwards website form submissions to the Lead Genie CRM "website_form" webhook.
// Configured via server env (never hard-code — the secret grants write access to the CRM):
//   CRM_WEBHOOK_URL    e.g. https://leadgenie.tech/api/webhooks/website_form/<form-id>
//   CRM_WEBHOOK_SECRET sent in the X-LeadHive-Secret header (NOT in the URL)
// If either is missing this is a no-op, so local dev and un-configured servers keep working.

async function pushLeadToCRM(lead) {
  const url = process.env.CRM_WEBHOOK_URL;
  const secret = process.env.CRM_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error('[crm] CRM_WEBHOOK_URL / CRM_WEBHOOK_SECRET not set — lead not forwarded');
    return false;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-LeadHive-Secret': secret },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        message: lead.message,
        subject: lead.project, // the service/need the visitor picked
        budget: lead.budget,
        source: lead.source,
        submittedAt: new Date().toISOString(), // keeps repeat submissions unique in the CRM
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error('[crm] rejected:', res.status, await res.text());
    return res.ok;
  } catch (err) {
    // Never let a CRM outage break the form — the inquiry is already saved in our DB.
    console.error('[crm] request failed:', err.message);
    return false;
  }
}

module.exports = { pushLeadToCRM };
