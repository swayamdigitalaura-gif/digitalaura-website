// Read-only diagnostic, run on every backend deploy: lists contact_inquiries rows that LOOK
// like career applications (job-title-shaped `project`, or `source`/`message` mentioning a
// resume/CV/application) so the team can confirm and delete them from Admin > Inquiries.
// Does NOT delete anything — career applications are a separate table (`applications`) and
// the live /api/careers/:id/apply code never writes to contact_inquiries (verified in
// careerController.js), so any such row here is old/stale data, not a live bug.
const { ContactInquiry } = require('../src/models');

const CAREER_WORDS = /\b(resume|cv|applicant|application|career|job opening|position|vacanc|hiring|openings?)\b/i;

async function run() {
  const rows = await ContactInquiry.findAll({ order: [['createdAt', 'DESC']] });
  const suspects = rows.filter(r =>
    CAREER_WORDS.test(r.project || '') ||
    CAREER_WORDS.test(r.source || '') ||
    CAREER_WORDS.test(r.message || '')
  );
  if (!suspects.length) {
    console.log('[career-like-inquiries] none found — contact_inquiries looks clean.');
    return;
  }
  console.log(`[career-like-inquiries] ${suspects.length} row(s) in contact_inquiries look like career applications, not leads. Review and delete in Admin > Inquiries if confirmed:`);
  suspects.forEach(r => {
    console.log(`  id=${r.id} name="${r.name}" project="${r.project || ''}" source="${r.source || ''}" page="${r.page || ''}" createdAt=${r.createdAt?.toISOString?.() || r.createdAt}`);
  });
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[career-like-inquiries] check failed:', err.message);
    process.exit(0); // never fail the deploy over a diagnostic
  });
