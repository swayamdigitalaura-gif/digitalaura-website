export type Job = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary_range: string;
  status: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
};

export const STATIC_JOBS: Job[] = [
  {
    id: "1",
    slug: "seo-executive",
    title: "SEO Executive",
    department: "Digital Marketing",
    location: "Ahmedabad, India",
    type: "full-time",
    experience: "1–3 years",
    salary_range: "₹2.5L – ₹4.5L / year",
    status: "open",
    description:
      "We're looking for a driven SEO Executive to join our growing digital marketing team. You'll work directly on client campaigns across healthcare, eCommerce, and real estate — handling on-page, off-page, and technical SEO with a focus on measurable organic growth.",
    responsibilities: [
      "Conduct keyword research and develop content strategies aligned with client goals.",
      "Perform on-page optimisation including meta tags, headers, schema, and internal linking.",
      "Build high-quality backlinks through outreach, guest posting, and digital PR.",
      "Run technical SEO audits and coordinate fixes with the dev team.",
      "Monitor rankings, traffic, and conversions using Google Analytics & Search Console.",
      "Prepare monthly performance reports for clients.",
    ],
    requirements: [
      "1–3 years of hands-on SEO experience (agency experience preferred).",
      "Strong understanding of Google's ranking algorithms and updates.",
      "Experience with tools: Ahrefs / SEMrush, Screaming Frog, GA4, GSC.",
      "Basic knowledge of HTML/CSS for on-page edits.",
      "Ability to manage multiple client accounts simultaneously.",
      "Good written English for content briefs and reporting.",
    ],
    skills: ["SEO", "Ahrefs", "SEMrush", "Google Analytics 4", "Search Console", "Content Strategy", "Link Building", "Technical SEO"],
  },
  {
    id: "2",
    slug: "meta-google-ads-specialist",
    title: "Meta & Google Ads Specialist",
    department: "Performance Marketing",
    location: "Ahmedabad, India",
    type: "full-time",
    experience: "1–4 years",
    salary_range: "₹3L – ₹6L / year",
    status: "open",
    description:
      "We need a performance-obsessed paid ads specialist who can run, optimise, and scale Meta and Google Ads campaigns for our diverse client portfolio. If you love digging into data, testing creatives, and driving down CPL — this role is for you.",
    responsibilities: [
      "Plan, launch, and manage Meta (Facebook/Instagram) and Google Ads campaigns.",
      "Conduct audience research and build detailed targeting strategies.",
      "Write compelling ad copy and brief the design team on creatives.",
      "A/B test ad formats, copy, audiences, and landing pages continuously.",
      "Manage budgets efficiently to hit ROAS and CPL targets.",
      "Provide weekly and monthly performance reports with insights.",
    ],
    requirements: [
      "1–4 years running paid campaigns (Meta Ads & Google Ads).",
      "Proven track record of managing ₹1L+ monthly ad budgets.",
      "Google Ads certified (preferred) or willing to get certified.",
      "Strong analytical mindset — comfortable with data and spreadsheets.",
      "Experience with conversion tracking, pixel setup, and UTM parameters.",
      "Knowledge of landing page best practices and CRO.",
    ],
    skills: ["Meta Ads", "Google Ads", "Campaign Optimisation", "A/B Testing", "GA4", "Pixel Setup", "ROAS Optimisation", "Ad Copywriting"],
  },
  {
    id: "3",
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Development",
    location: "Ahmedabad, India",
    type: "full-time",
    experience: "2–5 years",
    salary_range: "₹4L – ₹9L / year",
    status: "open",
    description:
      "Join our dev team as a Full Stack Developer and work on cutting-edge web applications, AI-powered tools, and client-facing platforms. You'll build things that real businesses depend on, using a modern React + Node stack.",
    responsibilities: [
      "Design and develop responsive web applications using React and Node.js.",
      "Build and maintain RESTful APIs and integrate third-party services.",
      "Work on AI-powered features using OpenAI/LLM APIs.",
      "Collaborate with designers to implement pixel-perfect UIs.",
      "Write clean, maintainable code with proper documentation.",
      "Participate in code reviews and contribute to architecture decisions.",
    ],
    requirements: [
      "2–5 years of full stack development experience.",
      "Strong proficiency in React.js, TypeScript, Node.js, and Express.",
      "Experience with databases: MySQL / PostgreSQL / MongoDB.",
      "Familiarity with REST APIs, JWT authentication, and cloud deployment.",
      "Experience with Git, CI/CD pipelines.",
      "Exposure to AI APIs (OpenAI, Anthropic) is a strong plus.",
    ],
    skills: ["React.js", "TypeScript", "Node.js", "Express", "MySQL", "REST APIs", "Git", "TailwindCSS", "OpenAI API"],
  },
  {
    id: "4",
    slug: "social-media-manager",
    title: "Social Media Manager",
    department: "Social Media",
    location: "Ahmedabad, India",
    type: "full-time",
    experience: "1–3 years",
    salary_range: "₹2.5L – ₹4L / year",
    status: "open",
    description:
      "We're hiring a creative and data-driven Social Media Manager to handle content strategy, scheduling, and community management for multiple client brands across Instagram, LinkedIn, Facebook, and YouTube.",
    responsibilities: [
      "Develop monthly social media content calendars for clients.",
      "Write engaging captions, hooks, and short-form scripts.",
      "Coordinate with graphic designers for visual content creation.",
      "Schedule and publish posts using scheduling tools.",
      "Monitor comments, DMs, and community engagement.",
      "Track performance metrics and optimise content strategy.",
    ],
    requirements: [
      "1–3 years of social media management experience.",
      "Strong copywriting skills in English and Hindi.",
      "Experience with scheduling tools: Buffer, Hootsuite, or Meta Business Suite.",
      "Understanding of Instagram, LinkedIn, and YouTube algorithms.",
      "Basic Canva/Adobe skills for content ideation.",
      "Portfolio of managed social accounts required.",
    ],
    skills: ["Instagram", "LinkedIn", "Facebook", "Content Calendar", "Copywriting", "Canva", "Buffer", "Community Management"],
  },
  {
    id: "5",
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Sales & Growth",
    location: "Ahmedabad, India",
    type: "full-time",
    experience: "1–3 years",
    salary_range: "₹3L – ₹5L + Incentives",
    status: "open",
    description:
      "We're looking for a confident, goal-oriented Business Development Executive to drive new client acquisition for Digital Aura. You'll work directly with our founder and senior team to pitch our services, close deals, and build long-term client relationships.",
    responsibilities: [
      "Identify and qualify new business opportunities through outreach and networking.",
      "Schedule and conduct discovery calls with potential clients.",
      "Prepare and deliver service proposals and presentations.",
      "Follow up on leads, negotiate contracts, and close deals.",
      "Maintain a healthy pipeline in the CRM.",
      "Coordinate with service teams for smooth client onboarding.",
    ],
    requirements: [
      "1–3 years of B2B sales or business development experience.",
      "Excellent communication and presentation skills.",
      "Understanding of digital marketing services is a strong advantage.",
      "Self-motivated with a proven track record of hitting targets.",
      "Experience with CRM tools (HubSpot, Zoho, or similar).",
      "Fluency in English and Hindi/Gujarati.",
    ],
    skills: ["B2B Sales", "Lead Generation", "CRM", "Proposal Writing", "Client Onboarding", "Negotiation", "Cold Outreach"],
  },
];
