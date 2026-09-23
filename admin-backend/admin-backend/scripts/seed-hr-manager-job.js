// One-time idempotent seed: adds the "HR Manager" opening to the live careers table
// if it isn't already there. Safe to run on every deploy (checked by slug).
const { Career } = require('../src/models');

const RESPONSIBILITIES = [
  'Manage end-to-end recruitment and hiring.',
  'Handle employee onboarding and HR documentation.',
  'Manage attendance, leave, and HR operations.',
  'Coordinate KRA & KPI setup and performance reviews.',
  'Conduct regular employee feedback and HR discussions.',
  'Manage employee grievances and conflict resolution.',
  'Build employee engagement and workplace culture initiatives.',
  'Develop and implement HR policies and processes.',
  'Monitor employee performance, retention, and attrition.',
  'Coordinate training and employee development.',
  'Prepare monthly HR reports and management updates.',
  'Manage employee exit and exit interviews.',
  'Support management with manpower and HR planning.',
];

const REQUIREMENTS = [
  '1–3 years of HR experience.',
  'Strong understanding of recruitment and HR operations.',
  'Experience with KRA/KPI and performance management.',
  'Strong communication and people-management skills.',
  'Mature, organised, proactive, and confidential.',
  'Ability to handle difficult conversations professionally.',
  'Experience in an IT, Digital Marketing, Agency, or Startup environment is preferred.',
];

const SKILLS = ['Recruitment', 'Onboarding', 'HR Operations', 'KRA/KPI', 'Performance Management', 'Employee Engagement', 'HR Policies', 'Grievance Handling'];

async function run() {
  const existing = await Career.findOne({ where: { slug: 'hr-manager' } });
  if (existing) {
    console.log('hr-manager job already exists (id=' + existing.id + ') — skipping.');
    return;
  }

  const count = await Career.count();
  await Career.create({
    title: 'HR Manager',
    slug: 'hr-manager',
    department: 'Human Resources',
    location: 'Hanspura, Ahmedabad, Gujarat',
    type: 'full-time',
    experience: '1–3 years',
    description:
      "Digital Aura is looking for a proactive and experienced HR Manager to manage and strengthen our complete HR function. The role focuses on recruitment, employee management, HR policies, KRA/KPI coordination, performance reviews, employee engagement, retention, and HR planning — building a structured, professional HR system that helps us hire the right people and support employee growth.",
    responsibilities: JSON.stringify(RESPONSIBILITIES),
    requirements: JSON.stringify(REQUIREMENTS),
    skills: JSON.stringify(SKILLS),
    salary_range: '₹2.5L – ₹4.5L / year',
    openings: 1,
    work_mode: 'on-site',
    status: 'open',
    order_index: count,
  });
  console.log('hr-manager job created.');
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exit(1);
  });
