require('dotenv').config();
const sequelize = require('./src/config/database');
const { Testimonial, Career } = require('./src/models');

async function seed() {
  await sequelize.authenticate();

  // ── 1. TESTIMONIALS ──────────────────────────────────────────────────
  const existingT = await Testimonial.count();
  if (existingT >= 10) {
    console.log(`⏭  Testimonials already seeded (${existingT} rows) — skipping.`);
  } else {
    // Clear any partial data first
    await Testimonial.destroy({ where: {}, truncate: true });

    const testimonials = [
      { name: "Sahebrav Patil",     role: "Business Owner",     company: "Pest Control Business",   quote: "Digital Aura's team designed a professional website and executed a highly effective Meta Ads campaign that brought us real, measurable results.", rating: 5, platform: "Google",     is_visible: true, order_index: 1 },
      { name: "Chintan Joshi",      role: "Local Guide",        company: "141 Reviews",              quote: "We partnered with them for website development and lead generation campaigns, and the results were beyond our expectations.", rating: 5, platform: "Google",     is_visible: true, order_index: 2 },
      { name: "Darshil Shah",       role: "Owner",              company: "Elegant Event Solutions",  quote: "Digital Aura helped us take our brand online and generate quality leads for our event solutions business.", rating: 5, platform: "Google",     is_visible: true, order_index: 3 },
      { name: "Tapan Joshi",        role: "Business Owner",     company: "Invisible Grills Business",quote: "Their lead generation strategies through Meta Ads were impeccable, delivering high quality leads that swiftly converted into sales.", rating: 5, platform: "Google",     is_visible: true, order_index: 4 },
      { name: "Ketan Patel",        role: "Business Owner",     company: "",                         quote: "Excellent results and professional service! Our online presence has been outstanding since working with Digital Aura.", rating: 5, platform: "Google",     is_visible: true, order_index: 5 },
      { name: "Tirth Patel",        role: "Local Guide",        company: "18 Reviews",               quote: "Digital Aura improved our website user experience and boosted brand visibility, crucial for attracting more customers.", rating: 5, platform: "Google",     is_visible: true, order_index: 6 },
      { name: "Vrukshal Shah",      role: "Insurance Consultant",company: "",                        quote: "Digital Aura transformed my online presence as an insurance consultant, helping me reach the right audience effectively.", rating: 5, platform: "Google",     is_visible: true, order_index: 7 },
      { name: "Samkit Talajia",     role: "Business Owner",     company: "New Zealand",              quote: "Sambhav helped me start my business online in New Zealand and did a fantastic job. I strongly recommend them.", rating: 5, platform: "Google",     is_visible: true, order_index: 8 },
      { name: "Shweta Sultania",    role: "Interior Designer",  company: "Sultania Interiors",       quote: "Working with Digital Aura transformed our online presence completely. The new website has been a game-changer for lead generation.", rating: 5, platform: "Clutch",     is_visible: true, order_index: 9 },
      { name: "Bharat Chavda",      role: "Director",           company: "Chavda Exports",           quote: "Digital Aura understood our export business needs perfectly. Their SEO and Google Ads strategy helped us reach international buyers.", rating: 5, platform: "Clutch",     is_visible: true, order_index: 10 },
      { name: "Priya Mehta",        role: "Founder",            company: "Ayurveda Wellness",        quote: "The SEO work they did for our website dramatically increased our organic traffic within just 3 months. Highly professional team.", rating: 5, platform: "Clutch",     is_visible: true, order_index: 11 },
      { name: "Rajesh Kumar",       role: "Director",           company: "K&R Manufacturing",        quote: "Outstanding digital marketing services. They understood our niche perfectly and delivered campaigns that actually convert.", rating: 5, platform: "Clutch",     is_visible: true, order_index: 12 },
      { name: "Ananya Shah",        role: "Co-Founder",         company: "StyleHouse",               quote: "Working with Digital Aura for Google Ads was a game-changer for our e-commerce store. ROAS improved by 4x in 60 days.", rating: 5, platform: "GoodFirms",  is_visible: true, order_index: 13 },
      { name: "Mohammed Al-Rashid", role: "CEO",                company: "Gulf Trade Hub",           quote: "Their web development team built exactly what we envisioned — fast, beautiful, and conversion-optimized.", rating: 5, platform: "GoodFirms",  is_visible: true, order_index: 14 },
      { name: "Stephen Conolly",    role: "CEO",                company: "ConnTech",                 quote: "The team at Digital Aura delivered a world-class web app for our SaaS platform. Communication was seamless and delivery was ahead of schedule.", rating: 5, platform: "Google",     is_visible: true, order_index: 15 },
    ];

    await Testimonial.bulkCreate(testimonials);
    console.log(`✅ Seeded ${testimonials.length} testimonials.`);
  }

  // ── 2. CAREERS ───────────────────────────────────────────────────────
  const existingC = await Career.count();
  if (existingC >= 5) {
    console.log(`⏭  Careers already seeded (${existingC} rows) — skipping.`);
  } else {
    // Clear any partial/typo data (use force to bypass FK checks)
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Career.destroy({ where: {}, truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    const careers = [
      {
        title: "SEO Executive",
        department: "Digital Marketing",
        location: "Ahmedabad, India",
        type: "full-time",
        experience: "1–3 years",
        salary_range: "₹2.5L – ₹4.5L / year",
        status: "open",
        work_mode: "on-site",
        order_index: 1,
        description: "We're looking for a driven SEO Executive to join our growing digital marketing team. You'll work directly on client campaigns across healthcare, eCommerce, and real estate — handling on-page, off-page, and technical SEO with a focus on measurable organic growth.",
        responsibilities: JSON.stringify([
          "Conduct keyword research and develop content strategies aligned with client goals.",
          "Perform on-page optimisation including meta tags, headers, schema, and internal linking.",
          "Build high-quality backlinks through outreach, guest posting, and digital PR.",
          "Run technical SEO audits and coordinate fixes with the dev team.",
          "Monitor rankings, traffic, and conversions using Google Analytics & Search Console.",
          "Prepare monthly performance reports for clients.",
        ]),
        requirements: JSON.stringify([
          "1–3 years of hands-on SEO experience (agency experience preferred).",
          "Strong understanding of Google's ranking algorithms and updates.",
          "Experience with tools: Ahrefs / SEMrush, Screaming Frog, GA4, GSC.",
          "Basic knowledge of HTML/CSS for on-page edits.",
          "Ability to manage multiple client accounts simultaneously.",
          "Good written English for content briefs and reporting.",
        ]),
        skills: JSON.stringify(["SEO", "Ahrefs", "SEMrush", "Google Analytics 4", "Search Console", "Content Strategy", "Link Building", "Technical SEO"]),
      },
      {
        title: "Meta & Google Ads Specialist",
        department: "Performance Marketing",
        location: "Ahmedabad, India",
        type: "full-time",
        experience: "1–4 years",
        salary_range: "₹3L – ₹6L / year",
        status: "open",
        work_mode: "on-site",
        order_index: 2,
        description: "We need a performance-obsessed paid ads specialist who can run, optimise, and scale Meta and Google Ads campaigns for our diverse client portfolio. If you love digging into data, testing creatives, and driving down CPL — this role is for you.",
        responsibilities: JSON.stringify([
          "Plan, launch, and manage Meta (Facebook/Instagram) and Google Ads campaigns.",
          "Conduct audience research and build detailed targeting strategies.",
          "Write compelling ad copy and brief the design team on creatives.",
          "A/B test ad formats, copy, audiences, and landing pages continuously.",
          "Manage budgets efficiently to hit ROAS and CPL targets.",
          "Provide weekly and monthly performance reports with insights.",
        ]),
        requirements: JSON.stringify([
          "1–4 years running paid campaigns (Meta Ads & Google Ads).",
          "Proven track record of managing ₹1L+ monthly ad budgets.",
          "Google Ads certified (preferred) or willing to get certified.",
          "Strong analytical mindset — comfortable with data and spreadsheets.",
          "Experience with conversion tracking, pixel setup, and UTM parameters.",
          "Knowledge of landing page best practices and CRO.",
        ]),
        skills: JSON.stringify(["Meta Ads", "Google Ads", "Campaign Optimisation", "A/B Testing", "GA4", "Pixel Setup", "ROAS Optimisation", "Ad Copywriting"]),
      },
      {
        title: "Full Stack Developer",
        department: "Development",
        location: "Ahmedabad, India",
        type: "full-time",
        experience: "2–5 years",
        salary_range: "₹4L – ₹9L / year",
        status: "open",
        work_mode: "on-site",
        order_index: 3,
        description: "Join our dev team as a Full Stack Developer and work on cutting-edge web applications, AI-powered tools, and client-facing platforms. You'll build things that real businesses depend on, using a modern React + Node stack.",
        responsibilities: JSON.stringify([
          "Design and develop responsive web applications using React and Node.js.",
          "Build and maintain RESTful APIs and integrate third-party services.",
          "Work on AI-powered features using OpenAI/LLM APIs.",
          "Collaborate with designers to implement pixel-perfect UIs.",
          "Write clean, maintainable code with proper documentation.",
          "Participate in code reviews and contribute to architecture decisions.",
        ]),
        requirements: JSON.stringify([
          "2–5 years of full stack development experience.",
          "Strong proficiency in React.js, TypeScript, Node.js, and Express.",
          "Experience with databases: MySQL / PostgreSQL / MongoDB.",
          "Familiarity with REST APIs, JWT authentication, and cloud deployment.",
          "Experience with Git, CI/CD pipelines.",
          "Exposure to AI APIs (OpenAI, Anthropic) is a strong plus.",
        ]),
        skills: JSON.stringify(["React.js", "TypeScript", "Node.js", "Express", "MySQL", "REST APIs", "Git", "TailwindCSS", "OpenAI API"]),
      },
      {
        title: "Social Media Manager",
        department: "Social Media",
        location: "Ahmedabad, India",
        type: "full-time",
        experience: "1–3 years",
        salary_range: "₹2.5L – ₹4L / year",
        status: "open",
        work_mode: "on-site",
        order_index: 4,
        description: "We're hiring a creative and data-driven Social Media Manager to handle content strategy, scheduling, and community management for multiple client brands across Instagram, LinkedIn, Facebook, and YouTube.",
        responsibilities: JSON.stringify([
          "Develop monthly social media content calendars for clients.",
          "Write engaging captions, hooks, and short-form scripts.",
          "Coordinate with graphic designers for visual content creation.",
          "Schedule and publish posts using scheduling tools.",
          "Monitor comments, DMs, and community engagement.",
          "Track performance metrics and optimise content strategy.",
        ]),
        requirements: JSON.stringify([
          "1–3 years of social media management experience.",
          "Strong copywriting skills in English and Hindi.",
          "Experience with scheduling tools: Buffer, Hootsuite, or Meta Business Suite.",
          "Understanding of Instagram, LinkedIn, and YouTube algorithms.",
          "Basic Canva/Adobe skills for content ideation.",
          "Portfolio of managed social accounts required.",
        ]),
        skills: JSON.stringify(["Instagram", "LinkedIn", "Facebook", "Content Calendar", "Copywriting", "Canva", "Buffer", "Community Management"]),
      },
      {
        title: "Business Development Executive",
        department: "Sales & Growth",
        location: "Ahmedabad, India",
        type: "full-time",
        experience: "1–3 years",
        salary_range: "₹3L – ₹5L + Incentives",
        status: "open",
        work_mode: "on-site",
        order_index: 5,
        description: "We're looking for a confident, goal-oriented Business Development Executive to drive new client acquisition for Digital Aura. You'll work directly with our founder and senior team to pitch our services, close deals, and build long-term client relationships.",
        responsibilities: JSON.stringify([
          "Identify and qualify new business opportunities through outreach and networking.",
          "Schedule and conduct discovery calls with potential clients.",
          "Prepare and deliver service proposals and presentations.",
          "Follow up on leads, negotiate contracts, and close deals.",
          "Maintain a healthy pipeline in the CRM.",
          "Coordinate with service teams for smooth client onboarding.",
        ]),
        requirements: JSON.stringify([
          "1–3 years of B2B sales or business development experience.",
          "Excellent communication and presentation skills.",
          "Understanding of digital marketing services is a strong advantage.",
          "Self-motivated with a proven track record of hitting targets.",
          "Experience with CRM tools (HubSpot, Zoho, or similar).",
          "Fluency in English and Hindi/Gujarati.",
        ]),
        skills: JSON.stringify(["B2B Sales", "Lead Generation", "CRM", "Proposal Writing", "Client Onboarding", "Negotiation", "Cold Outreach"]),
      },
    ];

    await Career.bulkCreate(careers);
    console.log(`✅ Seeded ${careers.length} careers.`);
  }

  console.log('\n📊 Final counts:');
  console.log('  Testimonials:', await Testimonial.count());
  console.log('  Careers:     ', await Career.count());

  process.exit(0);
}

seed().catch(e => { console.error('❌ Seed failed:', e.message); process.exit(1); });
