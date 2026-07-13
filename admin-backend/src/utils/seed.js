require('dotenv').config();
const { sequelize, User, Page, Section, Setting, Testimonial, Career, NavItem } = require('../models');

async function seed() {
  await sequelize.sync({ force: true });
  console.log('DB synced');

  // Admin user — credentials come from env (never hardcode secrets in the repo)
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@thedigitalaura.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe_Set_SEED_ADMIN_PASSWORD';
  await User.create({ name: 'Sambhav Shah', email: adminEmail, password: adminPassword, role: 'admin' });
  console.log(`Admin user created: ${adminEmail}`);

  // Pages
  const pages = [
    { slug: 'home', title: 'Home', status: 'published', grapes_data: '{}' },
    { slug: 'about', title: 'About Us', status: 'published', grapes_data: '{}' },
    { slug: 'services', title: 'Services', status: 'published', grapes_data: '{}' },
    { slug: 'blog', title: 'Blog', status: 'published', grapes_data: '{}' },
    { slug: 'careers', title: 'Careers', status: 'published', grapes_data: '{}' },
    { slug: 'case-studies', title: 'Case Studies', status: 'published', grapes_data: '{}' },
    { slug: 'contact', title: 'Contact', status: 'published', grapes_data: '{}' },
  ];
  const createdPages = await Page.bulkCreate(pages);
  const homePage = createdPages[0];

  // Sample sections for home
  await Section.bulkCreate([
    { page_id: homePage.id, name: 'Hero', type: 'hero', order_index: 0, is_visible: true, data: JSON.stringify({ heading: 'Digital Growth, Delivered.', subheading: 'SEO · Ads · Web · AI', cta_text: 'Get Growth Plan', cta_link: '/contact' }), styles: JSON.stringify({ bg: '#ffffff', textColor: '#0A1628' }) },
    { page_id: homePage.id, name: 'Stats', type: 'stats', order_index: 1, is_visible: true, data: JSON.stringify({ items: [{ n: '500+', l: 'Clients Served' }, { n: '8+', l: 'Years' }, { n: '15+', l: 'Services' }] }), styles: JSON.stringify({}) },
    { page_id: homePage.id, name: 'Services', type: 'services', order_index: 2, is_visible: true, data: JSON.stringify({ heading: 'What We Do', items: [] }), styles: JSON.stringify({}) },
  ]);

  // Testimonials
  await Testimonial.bulkCreate([
    { name: 'Shweta Sultania', role: 'Founder', company: 'Sultania Interiors', quote: 'Digital Aura is the best digital marketing agency in Ahmedabad. They handled our website very professionally.', rating: 5, platform: 'Google', order_index: 0 },
    { name: 'Bharat Chavda', role: 'Director', company: 'Chavda Exports', quote: 'Working with Digital Aura for over a year. Very satisfied with quality leads from organic SEO and paid channels.', rating: 5, platform: 'Clutch', order_index: 1 },
    { name: 'Stephen Conolly', role: 'CEO', company: 'ConnTech', quote: 'They ranked our keywords high on search engines and organic traffic has been increasing exponentially.', rating: 5, platform: 'Google', order_index: 2 },
  ]);

  // Careers
  await Career.bulkCreate([
    { title: 'SEO Executive', department: 'Marketing', location: 'Ahmedabad', type: 'full-time', experience: '1-2 years', description: 'Responsible for on-page & off-page SEO strategies.', skills: JSON.stringify(['SEO', 'Google Analytics', 'Ahrefs']), status: 'open', order_index: 0 },
    { title: 'React Developer', department: 'Tech', location: 'Ahmedabad', type: 'full-time', experience: '2-4 years', description: 'Build and maintain React.js applications.', skills: JSON.stringify(['React', 'TypeScript', 'Node.js']), status: 'open', order_index: 1 },
    { title: 'Social Media Manager', department: 'Marketing', location: 'Ahmedabad / Remote', type: 'full-time', experience: '1-3 years', description: 'Manage social media channels and create engaging content.', skills: JSON.stringify(['Instagram', 'Facebook Ads', 'Content Writing']), status: 'open', order_index: 2 },
  ]);

  // Settings
  await Setting.bulkCreate([
    { key: 'site_name', value: 'Digital Aura', type: 'text', group: 'general', label: 'Site Name' },
    { key: 'site_tagline', value: 'Digital Growth, Delivered.', type: 'text', group: 'general', label: 'Tagline' },
    { key: 'contact_email', value: 'info@thedigitalaura.com', type: 'text', group: 'contact', label: 'Contact Email' },
    { key: 'contact_phone', value: '+91 81412 00284', type: 'text', group: 'contact', label: 'Phone' },
    { key: 'contact_whatsapp', value: '+918141200284', type: 'text', group: 'contact', label: 'WhatsApp' },
    { key: 'address_city', value: 'Ahmedabad, Gujarat, India', type: 'text', group: 'contact', label: 'City' },
    { key: 'social_instagram', value: 'https://www.instagram.com/thedigitalaura/', type: 'text', group: 'social', label: 'Instagram URL' },
    { key: 'social_linkedin', value: 'https://www.linkedin.com/company/thedigitalaura/', type: 'text', group: 'social', label: 'LinkedIn URL' },
    { key: 'stats_clients', value: '500+', type: 'text', group: 'stats', label: 'Clients Served' },
    { key: 'stats_years', value: '8+', type: 'text', group: 'stats', label: 'Years in Business' },
    { key: 'stats_services', value: '15+', type: 'text', group: 'stats', label: 'Services Offered' },
    { key: 'stats_growth', value: '200%', type: 'text', group: 'stats', label: 'Best-Case Growth' },
  ]);

  // Nav items
  await NavItem.bulkCreate([
    { label: 'Home', href: '/', order_index: 0, location: 'header' },
    { label: 'Company', href: '/about', order_index: 1, location: 'header' },
    { label: 'Services', href: '/services', order_index: 2, location: 'header' },
    { label: 'Case Studies', href: '/case-studies', order_index: 3, location: 'header' },
    { label: 'Blogs', href: '/blog', order_index: 4, location: 'header' },
    { label: 'Contact', href: '/contact', order_index: 5, location: 'header' },
  ]);

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
