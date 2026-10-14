const { readFile } = require('node:fs/promises');
const path = require('node:path');

// Careers → HRMS (https://dahrms.online). The secret is read from the server .env only.
const HRMS_URL = process.env.HRMS_WEBHOOK_URL || 'https://dahrms.online/api/webhooks/careers';
const HRMS_SECRET = process.env.HRMS_WEBHOOK_SECRET;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Sends one application + CV to the HRMS.
 * Never throws: a failed sync must not break the applicant's submission.
 * Retries 3 times (after 2s and 6s). Safe to call twice for the same application:
 * the HRMS ignores an applicationId it already has.
 *
 * `app` is the Application row (plain object); `cvPath` is the CV file path on disk.
 */
async function pushApplicationToHrms(app, job, cvPath) {
  if (!HRMS_SECRET) { console.warn('[HRMS sync] HRMS_WEBHOOK_SECRET not set, skipping'); return false; }
  if (!cvPath) { console.warn(`[HRMS sync] application ${app.id} has no CV`); return false; }

  let cv;
  try {
    cv = await readFile(path.isAbsolute(cvPath) ? cvPath : path.resolve(process.cwd(), cvPath));
  } catch (e) { console.error('[HRMS sync] cannot read CV', e.message); return false; }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      // FormData is rebuilt on every attempt because fetch consumes its body.
      const f = new FormData();
      f.set('applicationId', String(app.id));
      f.set('name', String(app.name || ''));
      f.set('email', String(app.email || ''));
      f.set('phone', String(app.phone || ''));
      f.set('linkedin', String(app.linkedin || ''));
      f.set('experience', String(app.experience || ''));
      f.set('message', String(app.why_join || ''));
      f.set('jobId', String(job.id));
      f.set('jobTitle', String(job.title || ''));
      f.set('jobDepartment', String(job.department || ''));
      f.set('jobLocation', String(job.location || ''));
      f.set('cv', new Blob([cv]), path.basename(cvPath));

      const res = await fetch(HRMS_URL, {
        method: 'POST',
        headers: { 'X-Webhook-Secret': HRMS_SECRET },
        body: f,
        signal: AbortSignal.timeout(30_000), // the HRMS reads the CV with OCR, which can take a few seconds
      });
      if (res.ok) { console.log(`[HRMS sync] sent application ${app.id}`); return true; }
      // 4xx = wrong secret / bad data, retrying will not help
      if (res.status >= 400 && res.status < 500) {
        console.error(`[HRMS sync] rejected ${res.status}:`, await res.text()); return false;
      }
      console.error(`[HRMS sync] HRMS error ${res.status} (attempt ${attempt})`);
    } catch (e) { console.error(`[HRMS sync] attempt ${attempt} failed`, e.message); }
    if (attempt < 3) await sleep(attempt === 1 ? 2000 : 6000);
  }
  return false;
}

module.exports = { pushApplicationToHrms };
