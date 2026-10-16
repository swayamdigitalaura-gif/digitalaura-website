// One-time content fix for the "AI Developer" opening (slug ai-developer), run on every backend deploy.
// The raw responsibilities text had been pasted into `description`, which renders as HTML and so
// showed as one long paragraph. Replaces it with a short Ahmedabad-specific overview (the structured
// Responsibilities list already exists), sets 2 openings and removes the salary.
// Guarded: only acts while the description still starts with the pasted raw text, so later edits
// made in the admin panel are never overwritten.
const { Career } = require('../src/models');

const DESCRIPTION = `<p><strong>Digital Aura is hiring 2 AI Developers for our Ahmedabad office.</strong> This is a full-time, on-site role at our office in Ahmedabad, Gujarat, open to freshers.</p>
<p>You will build AI-powered products for our clients and for the agency: LLM-based web apps, chatbots and virtual assistants, prompt systems, and automation workflows, working with OpenAI, Claude, Gemini, n8n, Make and Zapier.</p>
<h3>What you will work on</h3>
<ul>
  <li><strong>AI development and integration:</strong> AI web apps with React, Next.js or Python (FastAPI/Flask), chatbots and assistants for client websites and internal tools.</li>
  <li><strong>Prompt engineering:</strong> design, test and improve prompts, and maintain reusable prompt libraries.</li>
  <li><strong>Automation:</strong> end-to-end workflows for reporting, content generation, lead qualification and data extraction.</li>
  <li><strong>Client delivery:</strong> turn client requirements into AI solutions, document them and support handover and training.</li>
</ul>
<p><strong>Location:</strong> Ahmedabad, Gujarat (on-site). Candidates based in or willing to relocate to Ahmedabad are preferred.</p>`;

async function run() {
  const job = await Career.findOne({ where: { slug: 'ai-developer' } });
  if (!job) {
    console.log('ai-developer job not found — skipping.');
    return;
  }
  if (!/^\s*ROLES AND RESPONSIBILITIES/i.test(job.description || '')) {
    console.log('ai-developer job already cleaned up (id=' + job.id + ') — skipping.');
    return;
  }
  await job.update({
    description: DESCRIPTION,
    location: 'Ahmedabad, Gujarat',
    department: 'AI & Development',
    openings: 2,
    salary_range: null,
    work_mode: 'on-site',
  });
  console.log('ai-developer job updated (id=' + job.id + ').');
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('AI Developer fix failed:', err.message);
    process.exit(1);
  });
