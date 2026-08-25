import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE  = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
const SITE_URL  = 'https://thedigitalaura.com';
const DEFAULT_IMAGE = `${SITE_URL}/logos/digital-aura-logo.png`;

// Per-page SEO defaults — overridden by DB values if set via admin panel
const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Digital Marketing Agency in Ahmedabad | Digital Aura',
    description: 'Digital Aura is a data-driven digital marketing agency in Ahmedabad specializing in SEO, Google Ads, Meta Ads, Social Media Marketing & Web Design. 750+ happy clients.',
  },
  '/about': {
    title: 'About Digital Aura | Our Story, Vision & Expert Team',
    description: "A decade of digital growth. Learn about Digital Aura's vision, mission, values, and the expert team behind 750+ successful client projects.",
  },
  '/services': {
    title: 'Digital Marketing Services | SEO, Ads, Web Dev & AI | Digital Aura',
    description: "Explore Digital Aura's full suite: SEO, Google Ads, Meta Ads, Web Development, AI Automation, Mobile Apps, Shopify, WooCommerce, and more.",
  },
  '/ai-solutions': {
    title: 'AI Solutions & Automation Services | Digital Aura',
    description: "Transform your business with Digital Aura's AI solutions: LLM-powered apps, chatbots, workflow automation, predictive analytics, and custom ML models.",
  },
  '/testimonials': {
    title: 'Client Testimonials & Reviews | Digital Aura',
    description: 'See what 750+ businesses say about Digital Aura. Real client testimonials from healthcare, e-commerce, education, and hospitality.',
  },
  '/case-studies': {
    title: 'Case Studies | Real Results for Real Clients | Digital Aura',
    description: "Explore Digital Aura's case studies — measurable results in SEO, PPC, web development, and digital marketing across multiple industries.",
  },
  '/case-studies/riant-bikes': {
    title: 'Riant Bikes Case Study: How Digital Aura Saved a Bike Rental Business From Going Extinct',
    description: 'Riant Bikes was losing customers to competitors with a stronger online presence. See how Digital Aura rebuilt their website, booking system, and Google Ads to bring back daily bookings and grow revenue.',
  },
  '/case-studies/prism-calibration': {
    title: 'From Being Known to Being Found — Prism Calibration Centre | Digital Aura Case Study',
    description: "How Digital Aura took a 20-year NABL-accredited calibration company in Ahmedabad from referral-only to 70–100 qualified search leads a month — and into Google's AI Overview.",
  },
  '/case-studies/bavishi-ivf': {
    title: 'IVF Clinic SEO & YouTube Case Study | Digital Aura',
    description: 'How an IVF hospital turned quiet authority into measurable demand: 76.7% organic traffic growth, 85.9% YouTube views growth, and 25–30 qualified leads a day in six months.',
  },
  '/case-studies/dp-electrical-repairs': {
    title: 'DP Electrical Repairs SEO & AEO Case Study | Digital Aura',
    description: 'How a Melbourne appliance repair business went from invisible to 10–15 qualified leads a day with a local SEO structure built around service, brand, and suburb pages.',
  },
  '/blog': {
    title: 'Digital Marketing Blog | Insights & Strategies | Digital Aura',
    description: 'Stay updated with the latest digital marketing trends, SEO tips, Google Ads strategies, and AI insights from the Digital Aura team.',
  },
  '/contact': {
    title: 'Contact Digital Aura | Get a Free Consultation',
    description: 'Ready to grow your business? Contact Digital Aura for a free consultation on SEO, Google Ads, web development, and AI marketing solutions.',
  },
  '/careers': {
    title: 'Careers at Digital Aura | Join Our Growing Team',
    description: "Join Digital Aura's growing team. We're hiring talented marketers, developers, and AI specialists. Explore open positions and apply today.",
  },
  '/engagement-models': {
    title: 'Engagement Models | Flexible Pricing | Digital Aura',
    description: 'Choose the right engagement model for your business. Digital Aura offers flexible retainer, project-based, and performance-based pricing.',
  },
  '/mobile-apps': {
    title: 'Mobile App Development Services | Digital Aura',
    description: 'Build powerful mobile apps with Digital Aura. iOS, Android, Flutter, and React Native development for startups and enterprises.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Digital Aura',
    description: "Read Digital Aura's privacy policy to understand how we collect, use, and protect your personal information.",
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | Digital Aura',
    description: "Read Digital Aura's terms and conditions governing use of our services and website.",
  },
  '/cancellation-refund-policy': {
    title: 'Cancellation & Refund Policy | Digital Aura',
    description: "Understand Digital Aura's cancellation and refund policy for all services.",
  },
  '/services/ai-automation': {
    title: 'AI Automation Services | Automate Business Workflows | Digital Aura',
    description: "Automate repetitive tasks and scale operations with Digital Aura's AI automation. Custom workflows, integrations, and intelligent process automation.",
  },
  '/services/ai-chatbot-assistant': {
    title: 'AI Chatbot & Assistant Development | Digital Aura',
    description: 'Build intelligent AI chatbots and virtual assistants for your business. 24/7 customer support, lead generation, and automated interactions.',
  },
  '/services/ai-powered-web-apps': {
    title: 'AI-Powered Web Applications | Digital Aura',
    description: 'Develop cutting-edge AI-powered web applications. Smart recommendation engines, natural language interfaces, and intelligent data processing.',
  },
  '/services/custom-ai-web-solutions': {
    title: 'Custom AI Web Solutions | Digital Aura',
    description: "Custom AI web solutions tailored to your business needs. From concept to deployment, Digital Aura builds AI that drives real results.",
  },
  '/services/web-app-development': {
    title: 'Web Application Development Services | Digital Aura',
    description: 'Build scalable, high-performance web applications with Digital Aura. React, Node.js, full-stack development for startups and enterprises.',
  },
  '/services/digital-marketing': {
    title: 'Digital Marketing Services | SEO, Ads & Social Media | Digital Aura',
    description: "Comprehensive digital marketing by Digital Aura: SEO, Google Ads, Meta Ads, social media, email marketing, and content strategy.",
  },
  '/services/design-branding': {
    title: 'Design & Branding Services | Digital Aura',
    description: "Elevate your brand with Digital Aura's design and branding: logo design, brand identity, UI/UX design, and visual strategy.",
  },
  '/services/shopify-development': {
    title: 'Shopify Development Services | E-Commerce Experts | Digital Aura',
    description: 'Expert Shopify development by Digital Aura. Custom themes, app integrations, Shopify Plus, and e-commerce optimization for growing brands.',
  },
  '/services/woocommerce-development': {
    title: 'WooCommerce Development Services | Digital Aura',
    description: 'Professional WooCommerce development by Digital Aura. Custom store builds, plugin development, performance optimization, and ongoing support.',
  },
  '/services/full-stack-development': {
    title: 'Full-Stack Development Services | Digital Aura',
    description: 'End-to-end full-stack development by Digital Aura. React, Node.js, databases, APIs, and cloud deployment for modern web applications.',
  },
  '/services/wordpress-development': {
    title: 'WordPress Development Services | Digital Aura',
    description: 'Custom WordPress development by Digital Aura. Bespoke themes, plugin development, WooCommerce, and WordPress optimization.',
  },
  '/services/seo-content-marketing': {
    title: 'SEO & Content Marketing Services | Drive Organic Growth | Digital Aura',
    description: "Drive organic growth with Digital Aura's data-driven SEO and content marketing. Technical SEO, keyword strategy, link building, and content creation.",
  },
  '/services/google-ads': {
    title: 'Google Ads Management Services | Maximize ROI | Digital Aura',
    description: "Maximize ROI with Digital Aura's Google Ads management. Search, Display, Shopping, and YouTube campaigns optimized for conversions.",
  },
  '/services/meta-ads': {
    title: 'Meta Ads (Facebook & Instagram) Management | Digital Aura',
    description: "Scale your business with Digital Aura's Meta Ads expertise. Facebook and Instagram advertising campaigns that convert and grow.",
  },
  '/services/email-whatsapp-marketing': {
    title: 'Email & WhatsApp Marketing Services | Digital Aura',
    description: "Reach customers directly with Digital Aura's email and WhatsApp marketing. Automated campaigns, segmentation, and high-converting sequences.",
  },
  '/services/linkedin-youtube-ads': {
    title: 'LinkedIn & YouTube Advertising | Digital Aura',
    description: 'Professional LinkedIn and YouTube ad campaigns by Digital Aura. B2B lead generation, brand awareness, and video marketing that delivers results.',
  },
  '/services/cro': {
    title: 'Conversion Rate Optimisation (CRO) Services | Digital Aura',
    description: "Turn more visitors into customers with Digital Aura's CRO services. A/B testing, landing page optimization, UX improvements, and funnel analysis.",
  },
  '/services/mobile-app-development': {
    title: 'Mobile App Development | iOS & Android | Digital Aura',
    description: 'Custom mobile app development by Digital Aura. iOS, Android, Flutter, and React Native apps built for performance and great user experience.',
  },
  '/services/android-development': {
    title: 'Android App Development Services | Digital Aura',
    description: 'Expert Android app development by Digital Aura. Native Android apps with Kotlin and Java, custom solutions for businesses of all sizes.',
  },
  '/services/flutter-apps': {
    title: 'Flutter App Development Services | Digital Aura',
    description: 'Cross-platform Flutter app development by Digital Aura. Beautiful, performant apps for iOS and Android from a single codebase.',
  },
  '/services/react-native-apps': {
    title: 'React Native App Development | Cross-Platform | Digital Aura',
    description: 'Build cross-platform mobile apps with React Native. Digital Aura delivers high-performance iOS and Android apps with a shared codebase.',
  },
  '/services/ai/llm-powered-apps': {
    title: 'LLM-Powered App Development | GPT & Claude Integration | Digital Aura',
    description: 'Build applications powered by Large Language Models (GPT-4, Claude, Gemini). Digital Aura develops custom LLM integrations for enterprise and startups.',
  },
  '/services/ai/chatbots-assistants': {
    title: 'AI Chatbots & Virtual Assistants Development | Digital Aura',
    description: 'Intelligent AI chatbots and virtual assistants by Digital Aura. Customer support automation, lead qualification, and 24/7 engagement.',
  },
  '/services/ai/workflow-automation': {
    title: 'AI Workflow Automation Services | Digital Aura',
    description: 'Streamline operations with AI workflow automation by Digital Aura. n8n, Zapier, Make, and custom automation pipelines for modern businesses.',
  },
  '/services/ai/predictive-analytics': {
    title: 'Predictive Analytics Services | AI-Driven Insights | Digital Aura',
    description: "Make smarter decisions with Digital Aura's predictive analytics. AI-driven forecasting, customer behavior analysis, and data-driven strategy.",
  },
  '/services/ai/api-integration': {
    title: 'AI API Integration Services | OpenAI & Anthropic | Digital Aura',
    description: 'Seamlessly integrate AI APIs into your systems. Digital Aura connects OpenAI, Anthropic, Google AI, and custom models to your tech stack.',
  },
  '/services/ai/custom-ml-models': {
    title: 'Custom ML Model Development | Machine Learning | Digital Aura',
    description: 'Build bespoke machine learning models with Digital Aura. Image recognition, NLP, recommendation engines, and custom AI solutions for your business.',
  },

  // ── Previously missing pages (were falling back to homepage title/description) ──
  '/awards': {
    title: 'Awards & Recognition | Digital Aura',
    description: "From an Emerging Business Award in 2017 to Growth Partner of the Year in 2025 — Digital Aura's work has been recognized by national and global business councils every step of the way.",
  },
  '/services/ai-filmmaking': {
    title: 'AI Video & Film Making for Social Media Marketing | Digital Aura',
    description: 'Get scroll-stopping Reels, Shorts and video ads made with AI — no camera crew, no studio. Strategy, production and paid promotion in one team.',
  },
  '/services/seo-content-marketing/ecommerce-seo': {
    title: 'eCommerce SEO Services | Shopify & WooCommerce SEO | Digital Aura',
    description: 'eCommerce SEO for Shopify and WooCommerce stores — product page optimisation, Product schema, and Google Shopping visibility to turn traffic into sales.',
  },
  '/services/seo-content-marketing/local-seo': {
    title: 'Local SEO Services | Google Business Profile & Maps Ranking | Digital Aura',
    description: 'Local SEO services to rank higher on Google Maps and the local pack — Google Business Profile optimisation, citations, and location page strategy.',
  },
  '/services/seo-content-marketing/off-page-seo': {
    title: 'Off-Page SEO & Link Building Services | Digital Aura',
    description: 'Off-page SEO and link building services — earned backlinks, digital PR, and authority building through manual, relevant outreach, not spam link schemes.',
  },
  '/services/seo-content-marketing/on-page-seo': {
    title: 'On-Page SEO Services | Digital Aura',
    description: 'On-page SEO services — title tags, headings, content, internal links, and images optimised so search engines understand and rank your pages for the right searches.',
  },
  '/services/seo-content-marketing/seo-audit-strategy': {
    title: 'SEO Audit & Strategy Services | Digital Aura',
    description: 'A full SEO audit and strategy — site crawl, keyword gap analysis, competitor benchmarking, and a prioritised action roadmap tied to your business goals.',
  },
  '/services/seo-content-marketing/technical-seo': {
    title: 'Technical SEO Services | Core Web Vitals & Site Health | Digital Aura',
    description: 'Technical SEO services covering site speed, Core Web Vitals, crawlability, structured data, and site health so search engines can properly index your pages.',
  },

  // ── Local / city landing pages ──
  '/website-design-development-ahmedabad': {
    title: "Website Design & Development Company in Ahmedabad, Gujarat | Digital Aura",
    description: "Digital Aura is a website design and development company based in Ahmedabad, Gujarat, building custom-coded websites and web applications for local businesses that have outgrown template builders.",
  },
  '/website-design-development-gujarat': {
    title: "Website Design & Development Company in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based website design and development company serving businesses across Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar with custom-coded websites and web applications.",
  },
  '/shopify-website-design-ahmedabad': {
    title: "Shopify Website Design Company in Ahmedabad | Digital Aura",
    description: "Digital Aura is a Shopify website design company in Ahmedabad, building custom-themed Shopify stores for local D2C and retail brands that need more than a stock template.",
  },
  '/shopify-development-international': {
    title: "Shopify Development Agency for International Brands | Digital Aura",
    description: "Digital Aura is a Shopify development agency working with D2C brands across the US, UK, Australia, and Canada, building custom-themed stores at a fraction of typical Western agency rates.",
  },
  '/full-stack-development-ahmedabad': {
    title: "Full Stack Development Company in Ahmedabad, Gujarat | Digital Aura",
    description: "Digital Aura is a full stack development company in Ahmedabad, Gujarat, building web applications, SaaS platforms, and internal tools end-to-end — front end, back end, database, and deployment.",
  },
  '/full-stack-development-gujarat': {
    title: "Full Stack Development Company in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based full stack development company serving startups and businesses across Ahmedabad, Surat, Vadodara, and Rajkot with end-to-end web application development.",
  },
  '/ai-automation-ahmedabad': {
    title: "AI Automation Company in Ahmedabad, Gujarat | Digital Aura",
    description: "Digital Aura is an AI automation company in Ahmedabad, Gujarat, building AI agents, workflow automation, and intelligent systems that replace manual, repetitive work for local businesses.",
  },
  '/ai-automation-gujarat': {
    title: "AI Automation Company in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based AI automation company serving manufacturers, retailers, and service businesses across Ahmedabad, Surat, Vadodara, and Rajkot with custom AI agents and workflow automation.",
  },
  '/seo-agency-ahmedabad': {
    title: "SEO Agency in Ahmedabad | Digital Aura",
    description: "Digital Aura is an SEO agency in Ahmedabad helping local businesses rank higher on Google through technical SEO, content strategy, and local search optimisation.",
  },
  '/seo-company-gujarat': {
    title: "SEO Company in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based SEO company serving businesses across Ahmedabad, Surat, Vadodara, and Rajkot — often searched for as the best SEO agency in Gujarat by businesses comparing options statewide.",
  },
  '/seo-agency-international': {
    title: "SEO Agency for International Clients | Digital Aura",
    description: "Digital Aura is an SEO agency working with businesses across the US, UK, and Australia, delivering the same data-driven SEO, AIO, and GEO strategy at a fraction of typical Western agency rates.",
  },
  '/ai-filmmaking-ahmedabad': {
    title: "AI Filmmaking & Video Production Company in Ahmedabad | Digital Aura",
    description: "Digital Aura is an AI filmmaking and video production company in Ahmedabad, producing Reels, Shorts, and ad creatives in days rather than weeks, without a traditional camera crew or studio shoot.",
  },
  '/ai-filmmaking-gujarat': {
    title: "AI Filmmaking Company in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based AI filmmaking company producing Reels, Shorts, and video ads for brands across Ahmedabad, Surat, Vadodara, and Rajkot, delivered remotely with the same speed as our Ahmedabad clients.",
  },
  '/woocommerce-website-design-ahmedabad': {
    title: "WooCommerce Website Design Company in Ahmedabad | Digital Aura",
    description: "Digital Aura is a WooCommerce website design company in Ahmedabad, building custom WordPress and WooCommerce stores for local retailers who want full ownership of their platform.",
  },
  '/woocommerce-development-gujarat': {
    title: "WooCommerce Development Company in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based WooCommerce development company serving retailers across Ahmedabad, Surat, Vadodara, and Rajkot with custom WordPress and WooCommerce stores.",
  },
  '/mobile-app-development-ahmedabad': {
    title: "Mobile App Development Company in Ahmedabad | Digital Aura",
    description: "Digital Aura is a mobile app development company in Ahmedabad, building Android, iOS, Flutter, and React Native apps for local startups and businesses.",
  },
  '/mobile-app-development-gujarat': {
    title: "Mobile App Development Company in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based mobile app development company serving startups and businesses across Ahmedabad, Surat, Vadodara, and Rajkot with Android, iOS, Flutter, and React Native apps.",
  },
  '/google-ads-agency-ahmedabad': {
    title: "Google Ads Agency in Ahmedabad | Digital Aura",
    description: "Digital Aura is a Google Ads agency in Ahmedabad, running Search, Display, and Shopping campaigns for local businesses focused on lowering cost-per-lead, not just increasing clicks.",
  },
  '/meta-ads-agency-ahmedabad': {
    title: "Meta Ads Agency in Ahmedabad | Digital Aura",
    description: "Digital Aura is a Meta Ads agency in Ahmedabad, running Facebook and Instagram ad campaigns for local businesses focused on lead generation, remarketing, and eCommerce sales.",
  },
  '/digital-marketing-agency-ahmedabad': {
    title: "Digital Marketing Agency in Ahmedabad | Digital Aura",
    description: "Digital Aura is a digital marketing agency in Ahmedabad offering SEO, Google Ads, Meta Ads, website development, and AI automation under one in-house team.",
  },
  '/digital-marketing-agency-gujarat': {
    title: "Digital Marketing Agency in Gujarat | Digital Aura",
    description: "Digital Aura is a Gujarat-based digital marketing agency serving businesses across Ahmedabad, Surat, Vadodara, and Rajkot with SEO, paid ads, web development, and AI automation.",
  },
};

const ORG = {
  '@type': 'Organization',
  name: 'Digital Aura',
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  description: 'Data-driven digital marketing agency specializing in SEO, Google Ads, Meta Ads, Web Development, and AI solutions.',
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'swayam.digitalaura@gmail.com' },
  sameAs: ['https://www.linkedin.com/in/sambhav-shah/', 'https://www.instagram.com/sambhavshah2/'],
};

// Per-page JSON-LD schema — overridden by DB schema_code if set via admin panel
const PAGE_SCHEMA: Record<string, object | object[]> = {
  '/': [
    { '@context': 'https://schema.org', ...ORG },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Digital Aura', url: SITE_URL,
      potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/blog?q={search_term_string}`, 'query-input': 'required name=search_term_string' } },
  ],
  '/about': { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Digital Aura',
    url: `${SITE_URL}/about/`, description: "A decade of digital growth. Digital Aura's vision, mission, and expert team.",
    mainEntity: { ...ORG, '@context': undefined, foundingDate: '2015' } },
  '/contact': [
    { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Digital Aura', url: `${SITE_URL}/contact/` },
    { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Digital Aura', url: SITE_URL,
      email: 'swayam.digitalaura@gmail.com', description: 'Data-driven digital marketing agency', logo: DEFAULT_IMAGE },
  ],
  '/testimonials': { '@context': 'https://schema.org', '@type': 'Organization', name: 'Digital Aura', url: SITE_URL,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '34', bestRating: '5', worstRating: '1' } },
  '/blog': { '@context': 'https://schema.org', '@type': 'Blog', name: 'Digital Aura Blog',
    url: `${SITE_URL}/blog/`, description: 'Digital marketing trends, SEO tips, and AI insights.',
    publisher: { '@type': 'Organization', name: 'Digital Aura', logo: DEFAULT_IMAGE } },
  '/case-studies': { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Case Studies | Digital Aura', url: `${SITE_URL}/case-studies/` },
  '/case-studies/riant-bikes': { '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Riant Bikes Case Study: How Digital Aura Saved a Bike Rental Business From Going Extinct',
    description: 'Riant Bikes was losing customers to competitors with a stronger online presence. See how Digital Aura rebuilt their website, booking system, and Google Ads to bring back daily bookings and grow revenue.',
    author: { '@type': 'Organization', name: 'Digital Aura' },
    publisher: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/case-studies/riant-bikes/` } },
  '/case-studies/prism-calibration': { '@context': 'https://schema.org', '@type': 'Article',
    headline: 'From Being Known to Being Found — Prism Calibration Centre',
    description: "How Digital Aura took a 20-year NABL-accredited calibration company in Ahmedabad from referral-only to 70–100 qualified search leads a month — and into Google's AI Overview.",
    author: { '@type': 'Organization', name: 'Digital Aura' },
    publisher: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/case-studies/prism-calibration/` } },
  '/case-studies/bavishi-ivf': { '@context': 'https://schema.org', '@type': 'Article',
    headline: 'How an IVF Hospital Turned Quiet Authority Into Measurable Demand — In Six Months',
    description: 'How an IVF hospital turned quiet authority into measurable demand: 76.7% organic traffic growth, 85.9% YouTube views growth, and 25–30 qualified leads a day in six months.',
    author: { '@type': 'Organization', name: 'Digital Aura' },
    publisher: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/case-studies/bavishi-ivf/` } },
  '/case-studies/dp-electrical-repairs': { '@context': 'https://schema.org', '@type': 'Article',
    headline: 'How DP Electrical Repairs Went From Invisible to 10–15 Qualified Leads a Day',
    description: 'How a Melbourne appliance repair business went from invisible to 10–15 qualified leads a day with a local SEO structure built around service, brand, and suburb pages.',
    author: { '@type': 'Organization', name: 'Digital Aura' },
    publisher: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/case-studies/dp-electrical-repairs/` } },
  '/ai-solutions': { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Solutions & Automation',
    provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL },
    description: 'LLM-powered apps, chatbots, workflow automation, predictive analytics, and custom ML models.', url: `${SITE_URL}/ai-solutions/`, areaServed: 'Worldwide' },
  '/services': { '@context': 'https://schema.org', '@type': 'Service', name: 'Digital Marketing Services',
    provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL },
    description: 'Full suite: SEO, Google Ads, Meta Ads, Web Development, AI Automation, and more.', url: `${SITE_URL}/services/`, areaServed: 'Worldwide' },
  '/services/seo-content-marketing':    { '@context': 'https://schema.org', '@type': 'Service', name: 'SEO & Content Marketing', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'SEO & Content Marketing', areaServed: 'Worldwide', url: `${SITE_URL}/services/seo-content-marketing/` },
  '/services/google-ads':               { '@context': 'https://schema.org', '@type': 'Service', name: 'Google Ads Management', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Google Ads Management', areaServed: 'Worldwide', url: `${SITE_URL}/services/google-ads/` },
  '/services/meta-ads':                 { '@context': 'https://schema.org', '@type': 'Service', name: 'Meta Ads (Facebook & Instagram)', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Social Media Advertising', areaServed: 'Worldwide', url: `${SITE_URL}/services/meta-ads/` },
  '/services/shopify-development':      { '@context': 'https://schema.org', '@type': 'Service', name: 'Shopify Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'E-Commerce Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/shopify-development/` },
  '/services/woocommerce-development':  { '@context': 'https://schema.org', '@type': 'Service', name: 'WooCommerce Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'E-Commerce Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/woocommerce-development/` },
  '/services/full-stack-development':   { '@context': 'https://schema.org', '@type': 'Service', name: 'Full-Stack Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Web Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/full-stack-development/` },
  '/services/wordpress-development':    { '@context': 'https://schema.org', '@type': 'Service', name: 'WordPress Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Web Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/wordpress-development/` },
  '/services/web-app-development':      { '@context': 'https://schema.org', '@type': 'Service', name: 'Web Application Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Web Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/web-app-development/` },
  '/services/mobile-app-development':   { '@context': 'https://schema.org', '@type': 'Service', name: 'Mobile App Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Mobile App Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/mobile-app-development/` },
  '/services/android-development':      { '@context': 'https://schema.org', '@type': 'Service', name: 'Android App Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Mobile App Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/android-development/` },
  '/services/flutter-apps':             { '@context': 'https://schema.org', '@type': 'Service', name: 'Flutter App Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Mobile App Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/flutter-apps/` },
  '/services/react-native-apps':        { '@context': 'https://schema.org', '@type': 'Service', name: 'React Native App Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Mobile App Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/react-native-apps/` },
  '/services/digital-marketing':        { '@context': 'https://schema.org', '@type': 'Service', name: 'Digital Marketing Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Digital Marketing', areaServed: 'Worldwide', url: `${SITE_URL}/services/digital-marketing/` },
  '/services/design-branding':          { '@context': 'https://schema.org', '@type': 'Service', name: 'Design & Branding', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Graphic Design', areaServed: 'Worldwide', url: `${SITE_URL}/services/design-branding/` },
  '/services/email-whatsapp-marketing': { '@context': 'https://schema.org', '@type': 'Service', name: 'Email & WhatsApp Marketing', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Email Marketing', areaServed: 'Worldwide', url: `${SITE_URL}/services/email-whatsapp-marketing/` },
  '/services/linkedin-youtube-ads':     { '@context': 'https://schema.org', '@type': 'Service', name: 'LinkedIn & YouTube Advertising', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Social Media Advertising', areaServed: 'Worldwide', url: `${SITE_URL}/services/linkedin-youtube-ads/` },
  '/services/cro':                      { '@context': 'https://schema.org', '@type': 'Service', name: 'Conversion Rate Optimisation', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'CRO', areaServed: 'Worldwide', url: `${SITE_URL}/services/cro/` },
  '/services/ai-automation':            { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Automation Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Automation', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai-automation/` },
  '/services/ai-chatbot-assistant':     { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Chatbot & Assistant', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai-chatbot-assistant/` },
  '/services/ai-powered-web-apps':      { '@context': 'https://schema.org', '@type': 'Service', name: 'AI-Powered Web Apps', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai-powered-web-apps/` },
  '/services/custom-ai-web-solutions':  { '@context': 'https://schema.org', '@type': 'Service', name: 'Custom AI Web Solutions', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/custom-ai-web-solutions/` },
  '/services/ai/llm-powered-apps':      { '@context': 'https://schema.org', '@type': 'Service', name: 'LLM-Powered App Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai/llm-powered-apps/` },
  '/services/ai/chatbots-assistants':   { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Chatbots & Assistants', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai/chatbots-assistants/` },
  '/services/ai/workflow-automation':   { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Workflow Automation', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Automation', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai/workflow-automation/` },
  '/services/ai/predictive-analytics':  { '@context': 'https://schema.org', '@type': 'Service', name: 'Predictive Analytics', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Data Analytics', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai/predictive-analytics/` },
  '/services/ai/api-integration':       { '@context': 'https://schema.org', '@type': 'Service', name: 'AI API Integration', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Development', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai/api-integration/` },
  '/services/ai/custom-ml-models':      { '@context': 'https://schema.org', '@type': 'Service', name: 'Custom ML Model Development', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Machine Learning', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai/custom-ml-models/` },

  // ── Local / city landing pages: ProfessionalService + FAQPage ──
  '/website-design-development-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Website Design & Development Company in Ahmedabad, Gujarat", "description": "Digital Aura is a website design and development company based in Ahmedabad, Gujarat, building custom-coded websites and web applications for local businesses that have outgrown template builders.", "url": "https://thedigitalaura.com/website-design-development-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good website design company in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based website design and development company that has delivered 750+ projects, handling custom website designing, development, and ongoing support in-house."}}, {"@type": "Question", "name": "What's the difference between website design and website development?", "acceptedAnswer": {"@type": "Answer", "text": "Design covers the look, layout, and user experience of the site. Development is the actual coding that makes it work — forms, databases, page speed, and functionality. Digital Aura handles both under one roof."}}, {"@type": "Question", "name": "How much does custom website designing cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Pricing depends on scope — a template-based site costs less than a fully custom-coded web application. An exact quote follows a short discovery call."}}, {"@type": "Question", "name": "How long does it take to build a website?", "acceptedAnswer": {"@type": "Answer", "text": "A standard business website typically takes 3-5 weeks from approved design to launch; more complex web applications take longer depending on features."}}, {"@type": "Question", "name": "Do you also handle WordPress or Shopify builds?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — alongside custom-coded websites, we build on WordPress, Shopify, and WooCommerce depending on what best fits your business needs."}}]},
  ],
  '/website-design-development-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Website Design & Development Company in Gujarat", "description": "Digital Aura is a Gujarat-based website design and development company serving businesses across Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar with custom-coded websites and web applications.", "url": "https://thedigitalaura.com/website-design-development-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you only work with Ahmedabad businesses, or all of Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "We serve businesses across Gujarat — Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar, and beyond — with the same in-house team and process regardless of city."}}, {"@type": "Question", "name": "Can a project be managed fully remotely?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — most Gujarat clients outside Ahmedabad work with us entirely over calls, email, and shared project boards, with no need to visit our office."}}, {"@type": "Question", "name": "What industries have you built websites for in Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Manufacturing, textiles, healthcare, retail, real estate, and professional services are among the industries we've built for across the state."}}, {"@type": "Question", "name": "How much does a website cost for a Gujarat-based business?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on scope and features. Most business websites fall in a predictable range; an exact quote follows a short discovery call."}}, {"@type": "Question", "name": "How long does delivery take for clients outside Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Timelines are the same regardless of city — typically 3-5 weeks for a standard business website from approved design to launch."}}]},
  ],
  '/shopify-website-design-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Shopify Website Design Company in Ahmedabad", "description": "Digital Aura is a Shopify website design company in Ahmedabad, building custom-themed Shopify stores for local D2C and retail brands that need more than a stock template.", "url": "https://thedigitalaura.com/shopify-website-design-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good Shopify agency in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based Shopify website design company building custom-themed stores for local D2C and retail brands, with the full build handled in-house."}}, {"@type": "Question", "name": "Do I need a custom Shopify theme, or is a paid theme enough?", "acceptedAnswer": {"@type": "Answer", "text": "A paid theme works for a quick start, but a custom theme differentiates your brand and can be built specifically around your product catalogue and conversion goals — worth it once you're past the earliest launch stage."}}, {"@type": "Question", "name": "How much does a Shopify store cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on how custom the design and functionality need to be. A quote follows a short discovery call once we understand your catalogue and requirements."}}, {"@type": "Question", "name": "Can you migrate an existing store to Shopify?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we handle migrations from WooCommerce, Magento, and other platforms, including product data, images, and SEO redirects."}}, {"@type": "Question", "name": "How long does a Shopify store take to build?", "acceptedAnswer": {"@type": "Answer", "text": "A standard custom Shopify store typically takes 3-4 weeks from approved design to launch, depending on catalogue size and integrations."}}]},
  ],
  '/shopify-development-international': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Shopify Development Agency for International Brands", "description": "Digital Aura is a Shopify development agency working with D2C brands across the US, UK, Australia, and Canada, building custom-themed stores at a fraction of typical Western agency rates.", "url": "https://thedigitalaura.com/shopify-development-international/", "areaServed": "Worldwide"},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you work with brands outside India?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura works with D2C and retail brands across the US, UK, Australia, and Canada, in addition to Indian clients, with a track record that includes existing international case studies."}}, {"@type": "Question", "name": "How do you manage the time zone difference?", "acceptedAnswer": {"@type": "Answer", "text": "Work is structured async wherever possible — clear written briefs, recorded loom walkthroughs, and scheduled overlap calls when live discussion is needed, so the time difference doesn't stall a project."}}, {"@type": "Question", "name": "Why would an international brand hire an agency in India?", "acceptedAnswer": {"@type": "Answer", "text": "Primarily cost efficiency without a quality trade-off — you get a dedicated in-house team at a fraction of typical US, UK, or Australian agency rates."}}, {"@type": "Question", "name": "Can you set up multi-currency and multi-language for our store?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — multi-currency and multi-language configuration is a standard part of international Shopify builds, matched to the specific markets you're targeting."}}, {"@type": "Question", "name": "What does the payment and contract process look like for international clients?", "acceptedAnswer": {"@type": "Answer", "text": "Standard international invoicing with milestone-based payments; contracts and scope are documented up front before work begins."}}]},
  ],
  '/full-stack-development-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Full Stack Development Company in Ahmedabad, Gujarat", "description": "Digital Aura is a full stack development company in Ahmedabad, Gujarat, building web applications, SaaS platforms, and internal tools end-to-end — front end, back end, database, and deployment.", "url": "https://thedigitalaura.com/full-stack-development-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good full stack development company in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based full stack development company that has delivered 750+ projects, handling front end, back end, and infrastructure in-house."}}, {"@type": "Question", "name": "What does 'full stack' actually mean for my project?", "acceptedAnswer": {"@type": "Answer", "text": "It means one team builds and owns the entire application — the interface, the server logic, the database, and the deployment — instead of you coordinating separate front-end and back-end vendors."}}, {"@type": "Question", "name": "Can you build a SaaS MVP from scratch?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — SaaS MVP development is one of our core services, typically delivered in 6 weeks from a well-defined scope to a production-ready launch."}}, {"@type": "Question", "name": "What tech stack do you build with?", "acceptedAnswer": {"@type": "Answer", "text": "React and Next.js on the front end, Node.js and Python on the back end, with PostgreSQL or MongoDB depending on the project — matched to what the product actually needs."}}, {"@type": "Question", "name": "How much does full stack development cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on project scope and complexity. An exact quote follows a discovery call once requirements are mapped."}}]},
  ],
  '/full-stack-development-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Full Stack Development Company in Gujarat", "description": "Digital Aura is a Gujarat-based full stack development company serving startups and businesses across Ahmedabad, Surat, Vadodara, and Rajkot with end-to-end web application development.", "url": "https://thedigitalaura.com/full-stack-development-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you build for startups outside Ahmedabad in Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we work with startups and businesses across Gujarat, including Surat, Vadodara, and Rajkot, using the same remote sprint process as our Ahmedabad clients."}}, {"@type": "Question", "name": "Can a full-stack project be managed entirely remotely?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — fortnightly sprint reviews, shared project boards, and regular calls make it possible to manage the full build without an in-person visit."}}, {"@type": "Question", "name": "How fast can you build a SaaS MVP?", "acceptedAnswer": {"@type": "Answer", "text": "A typical SaaS MVP is delivered in around 6 weeks from a well-defined scope, using our standard discovery-design-build-launch sprint structure."}}, {"@type": "Question", "name": "What industries have you built full-stack products for in Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Manufacturing, logistics, healthcare, and retail businesses across the state have used our full-stack development services for internal tools and customer platforms."}}, {"@type": "Question", "name": "How much does a full-stack build cost?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on project scope and complexity. An exact quote follows a discovery call once requirements are mapped."}}]},
  ],
  '/ai-automation-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "AI Automation Company in Ahmedabad, Gujarat", "description": "Digital Aura is an AI automation company in Ahmedabad, Gujarat, building AI agents, workflow automation, and intelligent systems that replace manual, repetitive work for local businesses.", "url": "https://thedigitalaura.com/ai-automation-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good AI automation company in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based AI automation company building AI agents and workflow automation systems tailored to local businesses' actual processes."}}, {"@type": "Question", "name": "What kind of tasks can AI automation actually handle?", "acceptedAnswer": {"@type": "Answer", "text": "Lead qualification, document data extraction, customer support triage, inventory alerts, and report generation are common examples — generally any repetitive task with a clear, describable process."}}, {"@type": "Question", "name": "Will AI automation replace my staff?", "acceptedAnswer": {"@type": "Answer", "text": "Usually not entirely — most automation removes the repetitive, low-judgment parts of a role so staff can focus on decisions and relationships that still need a human."}}, {"@type": "Question", "name": "How much does AI automation cost?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on the complexity of the workflow being automated. A scoped quote follows a discovery call mapping your current process."}}, {"@type": "Question", "name": "How long does it take to build an automation system?", "acceptedAnswer": {"@type": "Answer", "text": "Simple single-workflow automations can launch in 2-3 weeks; multi-system automation platforms take longer depending on integration complexity."}}]},
  ],
  '/ai-automation-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "AI Automation Company in Gujarat", "description": "Digital Aura is a Gujarat-based AI automation company serving manufacturers, retailers, and service businesses across Ahmedabad, Surat, Vadodara, and Rajkot with custom AI agents and workflow automation.", "url": "https://thedigitalaura.com/ai-automation-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you build automation for manufacturing businesses in Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we've built automation systems for manufacturing and logistics operations across Gujarat, covering things like inventory alerts, dealer performance tracking, and document processing."}}, {"@type": "Question", "name": "Can automation work be done fully remotely for clients outside Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — discovery, build, and rollout can all be managed remotely over calls and shared documentation, the same process used for our Ahmedabad clients."}}, {"@type": "Question", "name": "What kind of ROI can I expect from AI automation?", "acceptedAnswer": {"@type": "Answer", "text": "It depends on the workflow, but clients typically see meaningful reductions in manual processing time and error rates within the first few months of a live automation."}}, {"@type": "Question", "name": "How much does AI automation cost in Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on the complexity of the workflow being automated. A scoped quote follows a discovery call mapping your current process."}}, {"@type": "Question", "name": "How long does an automation project take?", "acceptedAnswer": {"@type": "Answer", "text": "Simple single-workflow automations can launch in 2-3 weeks; multi-system automation platforms take longer depending on integration complexity."}}]},
  ],
  '/seo-agency-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "SEO Agency in Ahmedabad", "description": "Digital Aura is an SEO agency in Ahmedabad helping local businesses rank higher on Google through technical SEO, content strategy, and local search optimisation.", "url": "https://thedigitalaura.com/seo-agency-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good SEO agency in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based SEO agency and SEO company that has delivered 750+ projects, with dedicated in-house SEO, content, and technical specialists."}}, {"@type": "Question", "name": "What's the difference between an SEO agency and an SEO company?", "acceptedAnswer": {"@type": "Answer", "text": "In practice, the terms are used interchangeably — both describe a business that provides SEO services. What matters more is whether the agency does the work in-house and reports on real outcomes, not just activity."}}, {"@type": "Question", "name": "How much does SEO cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "SEO packages typically start from a fixed monthly retainer, scaled to the size of your site and competitiveness of your industry. An exact quote follows a free audit call."}}, {"@type": "Question", "name": "How long does SEO take to show results in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Local SEO improvements can show local pack movement within 4-6 weeks; broader organic ranking growth typically builds over 3-6 months."}}, {"@type": "Question", "name": "Do you also handle AI search visibility (AIO/GEO)?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — alongside traditional SEO, we optimise for Google AI Overviews and for being cited by tools like ChatGPT and Perplexity."}}]},
  ],
  '/seo-company-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "SEO Company in Gujarat", "description": "Digital Aura is a Gujarat-based SEO company serving businesses across Ahmedabad, Surat, Vadodara, and Rajkot — often searched for as the best SEO agency in Gujarat by businesses comparing options statewide.", "url": "https://thedigitalaura.com/seo-company-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good SEO company that serves all of Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura works with businesses across Ahmedabad, Surat, Vadodara, Rajkot, and other Gujarat cities, often being searched for as the best SEO agency in Gujarat by businesses comparing options statewide."}}, {"@type": "Question", "name": "Do you build separate local SEO pages for each city?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — genuine local SEO requires content specific to each city, not one page trying to rank for five different locations at once."}}, {"@type": "Question", "name": "How much does SEO cost for a Gujarat-based business?", "acceptedAnswer": {"@type": "Answer", "text": "SEO packages typically start from a fixed monthly retainer, scaled to the size of your site and competitiveness of your industry. An exact quote follows a free audit call."}}, {"@type": "Question", "name": "Can SEO work be managed remotely for clients outside Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — audits, strategy calls, and monthly reporting are all handled over video calls and shared dashboards regardless of your city."}}, {"@type": "Question", "name": "How long does SEO take to show results?", "acceptedAnswer": {"@type": "Answer", "text": "Local SEO improvements can show local pack movement within 4-6 weeks; broader organic ranking growth typically builds over 3-6 months."}}]},
  ],
  '/seo-agency-international': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "SEO Agency for International Clients", "description": "Digital Aura is an SEO agency working with businesses across the US, UK, and Australia, delivering the same data-driven SEO, AIO, and GEO strategy at a fraction of typical Western agency rates.", "url": "https://thedigitalaura.com/seo-agency-international/", "areaServed": "Worldwide"},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you work with SEO clients outside India?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura works with businesses across the US, UK, and Australia, with existing case studies from Australian and UK clients."}}, {"@type": "Question", "name": "Why would a US or UK business hire an SEO agency in India?", "acceptedAnswer": {"@type": "Answer", "text": "Primarily cost efficiency — you get the same in-house SEO, content, and technical expertise at a fraction of typical US, UK, or Australian agency rates."}}, {"@type": "Question", "name": "How do you handle strategy calls across time zones?", "acceptedAnswer": {"@type": "Answer", "text": "Calls are scheduled during overlap hours where possible, with detailed written reports and recorded walkthroughs for anything asynchronous."}}, {"@type": "Question", "name": "Do you optimise for AI search tools relevant to international markets?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — AIO (Google AI Overviews) and GEO (citations in ChatGPT, Perplexity, Gemini) are part of every SEO engagement, not an add-on."}}, {"@type": "Question", "name": "How much does SEO cost for an international client?", "acceptedAnswer": {"@type": "Answer", "text": "Pricing is quoted in your preferred currency, typically well below equivalent US, UK, or Australian agency rates for the same scope of work. An exact quote follows a free audit call."}}]},
  ],
  '/ai-filmmaking-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "AI Filmmaking & Video Production Company in Ahmedabad", "description": "Digital Aura is an AI filmmaking and video production company in Ahmedabad, producing Reels, Shorts, and ad creatives in days rather than weeks, without a traditional camera crew or studio shoot.", "url": "https://thedigitalaura.com/ai-filmmaking-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there an AI filmmaking company in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based AI filmmaking and video production company producing Reels, Shorts, and ad creatives for local businesses, typically delivering a first batch within 5-7 working days."}}, {"@type": "Question", "name": "Do I need to be on camera for AI video content?", "acceptedAnswer": {"@type": "Answer", "text": "No — we can produce fully faceless videos using AI avatars and voiceover, or a hybrid combining AI avatars with your real product footage."}}, {"@type": "Question", "name": "How much does AI video production cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Packages typically start from a fixed monthly rate covering video production and social media management, scaling with volume and platforms covered. An exact quote follows a free content strategy call."}}, {"@type": "Question", "name": "Can I meet the team in person in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — our team is physically based in Ahmedabad, so in-person discovery and strategy sessions are available alongside remote calls."}}, {"@type": "Question", "name": "Is AI video content actually more affordable than a traditional shoot?", "acceptedAnswer": {"@type": "Answer", "text": "Generally yes — with no film crew, studio rental, or multi-day shoot required, AI-produced video typically costs a fraction of a traditional production per finished video."}}]},
  ],
  '/ai-filmmaking-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "AI Filmmaking Company in Gujarat", "description": "Digital Aura is a Gujarat-based AI filmmaking company producing Reels, Shorts, and video ads for brands across Ahmedabad, Surat, Vadodara, and Rajkot, delivered remotely with the same speed as our Ahmedabad clients.", "url": "https://thedigitalaura.com/ai-filmmaking-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you produce AI video content for businesses outside Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we work with brands across Gujarat, including Surat, Vadodara, and Rajkot, with the entire production and strategy process delivered remotely."}}, {"@type": "Question", "name": "How fast can a Gujarat-based business get its first batch of videos?", "acceptedAnswer": {"@type": "Answer", "text": "A first batch of 8-10 short-form videos is typically scripted, produced, and delivered within 5-7 working days after brand discovery, regardless of city."}}, {"@type": "Question", "name": "Do you need to visit our location to produce the videos?", "acceptedAnswer": {"@type": "Answer", "text": "No — most AI video production happens remotely using scripts, AI avatars, and voice generation, with strategy calls conducted over video."}}, {"@type": "Question", "name": "How much does AI video production cost for a Gujarat business?", "acceptedAnswer": {"@type": "Answer", "text": "Packages typically start from a fixed monthly rate covering video production and social media management, scaling with volume and platforms covered."}}, {"@type": "Question", "name": "What industries in Gujarat have you produced AI video content for?", "acceptedAnswer": {"@type": "Answer", "text": "Retail, restaurants, healthcare, and manufacturing brands across the state have used our AI video production and social media management services."}}]},
  ],
  '/woocommerce-website-design-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "WooCommerce Website Design Company in Ahmedabad", "description": "Digital Aura is a WooCommerce website design company in Ahmedabad, building custom WordPress and WooCommerce stores for local retailers who want full ownership of their platform.", "url": "https://thedigitalaura.com/woocommerce-website-design-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good WooCommerce agency in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based WooCommerce website design company building custom WordPress stores for local retailers, with the full build handled in-house."}}, {"@type": "Question", "name": "Why choose WooCommerce over Shopify?", "acceptedAnswer": {"@type": "Answer", "text": "WooCommerce gives you full ownership of your code and data on your own WordPress hosting, with no monthly platform fee — a good fit if you want more control or already run on WordPress."}}, {"@type": "Question", "name": "How much does a WooCommerce store cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on design complexity and required integrations. An exact quote follows a short discovery call."}}, {"@type": "Question", "name": "Can you migrate an existing store to WooCommerce?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we handle migrations from Shopify, Magento, and other platforms, including product data, images, and SEO redirects."}}, {"@type": "Question", "name": "How long does a WooCommerce store take to build?", "acceptedAnswer": {"@type": "Answer", "text": "A standard custom WooCommerce store typically takes 3-4 weeks from approved design to launch, depending on catalogue size and integrations."}}]},
  ],
  '/woocommerce-development-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "WooCommerce Development Company in Gujarat", "description": "Digital Aura is a Gujarat-based WooCommerce development company serving retailers across Ahmedabad, Surat, Vadodara, and Rajkot with custom WordPress and WooCommerce stores.", "url": "https://thedigitalaura.com/woocommerce-development-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you build WooCommerce stores for retailers outside Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we serve retailers across Gujarat, including Surat, Vadodara, and Rajkot, with the same in-house team and process regardless of city."}}, {"@type": "Question", "name": "Can a WooCommerce project be managed fully remotely?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — from design review to launch, projects are managed over calls and shared boards without needing an in-person visit."}}, {"@type": "Question", "name": "How much does a WooCommerce store cost for a Gujarat-based retailer?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on design complexity and required integrations. An exact quote follows a short discovery call."}}, {"@type": "Question", "name": "What industries in Gujarat have you built WooCommerce stores for?", "acceptedAnswer": {"@type": "Answer", "text": "Textiles, home goods, retail, and specialty product businesses across the state have used our WooCommerce development services."}}, {"@type": "Question", "name": "How long does delivery take for clients outside Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Timelines are the same regardless of city — typically 3-4 weeks for a standard WooCommerce store from approved design to launch."}}]},
  ],
  '/mobile-app-development-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Mobile App Development Company in Ahmedabad", "description": "Digital Aura is a mobile app development company in Ahmedabad, building Android, iOS, Flutter, and React Native apps for local startups and businesses.", "url": "https://thedigitalaura.com/mobile-app-development-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good mobile app development company in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based mobile app development company that has delivered 750+ projects, building native and cross-platform apps in-house."}}, {"@type": "Question", "name": "Should I build a native app or use Flutter/React Native?", "acceptedAnswer": {"@type": "Answer", "text": "Native (Kotlin/Swift) suits apps needing maximum performance or deep hardware access; Flutter or React Native suits most business apps needing to launch on both platforms faster and cheaper."}}, {"@type": "Question", "name": "How much does mobile app development cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on feature complexity and whether the app is native or cross-platform. An exact quote follows a discovery call."}}, {"@type": "Question", "name": "How long does it take to build a mobile app?", "acceptedAnswer": {"@type": "Answer", "text": "A standard MVP mobile app typically takes 8-12 weeks depending on feature scope and platform choice."}}, {"@type": "Question", "name": "Do you handle Google Play and App Store submission?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — submission, compliance requirements, and store optimisation are handled as part of every mobile app project."}}]},
  ],
  '/mobile-app-development-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Mobile App Development Company in Gujarat", "description": "Digital Aura is a Gujarat-based mobile app development company serving startups and businesses across Ahmedabad, Surat, Vadodara, and Rajkot with Android, iOS, Flutter, and React Native apps.", "url": "https://thedigitalaura.com/mobile-app-development-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you build mobile apps for businesses outside Ahmedabad in Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we work with startups and businesses across Gujarat, including Surat, Vadodara, and Rajkot, using the same in-house team and process as our Ahmedabad clients."}}, {"@type": "Question", "name": "Can a mobile app project be managed fully remotely?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — design reviews, sprint updates, and testing can all be coordinated over calls and shared tools without an in-person visit."}}, {"@type": "Question", "name": "How much does mobile app development cost for a Gujarat business?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on feature complexity and whether the app is native or cross-platform. An exact quote follows a discovery call."}}, {"@type": "Question", "name": "What kind of apps have you built for Gujarat businesses?", "acceptedAnswer": {"@type": "Answer", "text": "Customer-facing apps for retail and healthcare, and internal field-operations apps for manufacturing and logistics businesses, are among our past projects."}}, {"@type": "Question", "name": "How long does it take to build a mobile app?", "acceptedAnswer": {"@type": "Answer", "text": "A standard MVP mobile app typically takes 8-12 weeks depending on feature scope and platform choice."}}]},
  ],
  '/google-ads-agency-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Google Ads Agency in Ahmedabad", "description": "Digital Aura is a Google Ads agency in Ahmedabad, running Search, Display, and Shopping campaigns for local businesses focused on lowering cost-per-lead, not just increasing clicks.", "url": "https://thedigitalaura.com/google-ads-agency-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good Google Ads agency in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based Google Ads agency running Search, Display, and Shopping campaigns for local businesses, with in-house paid media specialists managing every account."}}, {"@type": "Question", "name": "How much should I budget for Google Ads in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Budget depends on your industry's competitiveness and lead value. Most local businesses start testing with a modest monthly budget before scaling what works."}}, {"@type": "Question", "name": "What's a good cost-per-lead for Google Ads?", "acceptedAnswer": {"@type": "Answer", "text": "It varies significantly by industry — a benchmark is set during your account audit by comparing your current metrics against realistic targets for your specific market."}}, {"@type": "Question", "name": "How long before Google Ads start delivering results?", "acceptedAnswer": {"@type": "Answer", "text": "Campaigns typically need 2-4 weeks of data to optimise properly; meaningful cost-per-lead improvements are usually visible within the first 4-6 weeks."}}, {"@type": "Question", "name": "Do you manage the whole account, or just set it up?", "acceptedAnswer": {"@type": "Answer", "text": "Both options are available — a one-time setup and handover, or full ongoing management including bid optimisation and monthly reporting."}}]},
  ],
  '/meta-ads-agency-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Meta Ads Agency in Ahmedabad", "description": "Digital Aura is a Meta Ads agency in Ahmedabad, running Facebook and Instagram ad campaigns for local businesses focused on lead generation, remarketing, and eCommerce sales.", "url": "https://thedigitalaura.com/meta-ads-agency-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good Meta Ads agency in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based Meta Ads agency running Facebook and Instagram campaigns for local businesses, with in-house paid media specialists managing every account."}}, {"@type": "Question", "name": "How much should I budget for Meta Ads in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Budget depends on your industry and campaign goal. Most local businesses start testing with a modest monthly budget before scaling what works."}}, {"@type": "Question", "name": "What's a good ROAS for Meta Ads?", "acceptedAnswer": {"@type": "Answer", "text": "It varies by industry and margin — a realistic benchmark is set during your account audit based on your specific business economics."}}, {"@type": "Question", "name": "Do you handle both lead generation and eCommerce campaigns?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — lead generation ads for service businesses and catalogue/conversion campaigns for eCommerce brands are both core parts of our Meta Ads service."}}, {"@type": "Question", "name": "How long before Meta Ads start delivering results?", "acceptedAnswer": {"@type": "Answer", "text": "Campaigns typically need 1-2 weeks of data and creative testing to optimise properly; meaningful improvements are usually visible within the first month."}}]},
  ],
  '/digital-marketing-agency-ahmedabad': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Digital Marketing Agency in Ahmedabad", "description": "Digital Aura is a digital marketing agency in Ahmedabad offering SEO, Google Ads, Meta Ads, website development, and AI automation under one in-house team.", "url": "https://thedigitalaura.com/digital-marketing-agency-ahmedabad/", "areaServed": "Ahmedabad, Gujarat, India", "address": {"@type": "PostalAddress", "streetAddress": "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "postalCode": "382330", "addressCountry": "IN"}},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is there a good digital marketing agency in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — Digital Aura is an Ahmedabad-based digital marketing agency that has delivered 750+ projects, covering SEO, paid ads, web development, and AI automation under one in-house team."}}, {"@type": "Question", "name": "I don't know which service I need — where do I start?", "acceptedAnswer": {"@type": "Answer", "text": "Book a free consultation. We'll talk through your business goals and current challenges before recommending anything, rather than defaulting to the most expensive package."}}, {"@type": "Question", "name": "Do you handle everything in-house, or outsource work?", "acceptedAnswer": {"@type": "Answer", "text": "Everything is handled in-house — SEO, paid media, development, and AI automation are all delivered by our own team, not subcontracted out."}}, {"@type": "Question", "name": "How much does digital marketing cost in Ahmedabad?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on which services and how much ad spend or scope is involved. An exact quote follows a discovery call about your specific goals."}}, {"@type": "Question", "name": "How long before I see results from digital marketing?", "acceptedAnswer": {"@type": "Answer", "text": "Paid ads can show results within weeks; SEO and content typically take 3-6 months to build meaningful, compounding results."}}]},
  ],
  '/digital-marketing-agency-gujarat': [
    {"@context": "https://schema.org", "@type": "ProfessionalService", "name": "Digital Marketing Agency in Gujarat", "description": "Digital Aura is a Gujarat-based digital marketing agency serving businesses across Ahmedabad, Surat, Vadodara, and Rajkot with SEO, paid ads, web development, and AI automation.", "url": "https://thedigitalaura.com/digital-marketing-agency-gujarat/", "areaServed": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Gujarat"]},
    {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Do you serve digital marketing clients across all of Gujarat?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — we work with businesses across Ahmedabad, Surat, Vadodara, Rajkot, and other Gujarat cities, delivering every service through the same in-house team."}}, {"@type": "Question", "name": "I don't know which service I need — where do I start?", "acceptedAnswer": {"@type": "Answer", "text": "Book a free consultation. We'll talk through your business goals and current challenges before recommending anything, rather than defaulting to the most expensive package."}}, {"@type": "Question", "name": "Can digital marketing services be managed fully remotely?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — strategy calls, reporting, and campaign management are all handled over video calls and shared dashboards regardless of your city."}}, {"@type": "Question", "name": "How much does digital marketing cost for a Gujarat business?", "acceptedAnswer": {"@type": "Answer", "text": "Cost depends on which services and how much ad spend or scope is involved. An exact quote follows a discovery call about your specific goals."}}, {"@type": "Question", "name": "What industries in Gujarat have you worked with?", "acceptedAnswer": {"@type": "Answer", "text": "Manufacturing, textiles, healthcare, retail, and professional services are among the industries we've delivered digital marketing for across the state."}}]},
  ],

  // ── Previously missing pages ──
  '/awards': { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Awards & Recognition | Digital Aura', url: `${SITE_URL}/awards/`,
    description: "From an Emerging Business Award in 2017 to Growth Partner of the Year in 2025 — Digital Aura's work has been recognized by national and global business councils every step of the way." },
  '/services/ai-filmmaking': { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Filmmaking & Video Production', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'AI Video Production', areaServed: 'Worldwide', url: `${SITE_URL}/services/ai-filmmaking/`,
    description: 'Get scroll-stopping Reels, Shorts and video ads made with AI — no camera crew, no studio. Strategy, production and paid promotion in one team.' },
  '/services/seo-content-marketing/ecommerce-seo': [
    { '@context': 'https://schema.org', '@type': 'Service', name: 'eCommerce SEO Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'eCommerce SEO', areaServed: 'Worldwide', url: `${SITE_URL}/services/seo-content-marketing/ecommerce-seo/` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is ecommerce SEO and how is it different from regular SEO?', acceptedAnswer: { '@type': 'Answer', text: 'eCommerce SEO applies SEO principles specifically to online stores — optimising product pages, category structures, and Product schema for platforms like Shopify and WooCommerce. It differs from regular SEO in managing crawl budget across thousands of product URLs and handling commercial, transactional search intent.' } },
      { '@type': 'Question', name: "Why don't my product pages rank even though the site has good SEO overall?", acceptedAnswer: { '@type': 'Answer', text: 'Usually duplicate manufacturer descriptions, thin content, or missing schema. If ten other stores sell the identical product with the identical description, Google has no reason to rank yours above theirs — unique content and proper schema are what create differentiation.' } },
      { '@type': 'Question', name: 'Do you work with Shopify and WooCommerce specifically?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — both platforms have SEO limitations in how they handle URLs, canonical tags, and faceted navigation by default, and we implement platform-specific fixes for each.' } },
      { '@type': 'Question', name: 'How do I get my products to show up in Google Shopping?', acceptedAnswer: { '@type': 'Answer', text: 'Google Shopping visibility depends on a Merchant Center feed plus properly implemented Product and Offer schema on the page itself — both need to align on price, availability, and product identifiers.' } },
      { '@type': 'Question', name: 'Should every product variant have its own page?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on search volume and cannibalisation risk. Significant variants (different colours or sizes with real independent search demand) usually warrant their own optimised page; minor variants are better handled as options on one page.' } },
      { '@type': 'Question', name: 'How long does ecommerce SEO take to increase sales?', acceptedAnswer: { '@type': 'Answer', text: 'Initial technical and schema fixes can show visibility improvements within 4-6 weeks. Meaningful organic sales growth from ranking and content improvements typically builds over 3-4 months as new pages gain authority.' } },
    ] },
  ],
  '/services/seo-content-marketing/local-seo': [
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Local SEO Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Local SEO', areaServed: 'Worldwide', url: `${SITE_URL}/services/seo-content-marketing/local-seo/` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is local SEO and how is it different from regular SEO?', acceptedAnswer: { '@type': 'Answer', text: 'Local SEO optimises a business to appear in location-based searches — Google Maps, the local pack, and "near me" queries. It differs from regular SEO by weighting signals like Google Business Profile completeness, local citations, and proximity, alongside standard ranking factors.' } },
      { '@type': 'Question', name: 'How do I rank higher on Google Maps?', acceptedAnswer: { '@type': 'Answer', text: 'Google Maps ranking depends on relevance, distance, and prominence. Prominence is built through a complete, active Google Business Profile, consistent citations, strong review volume and ratings, and locally relevant content on your website.' } },
      { '@type': 'Question', name: 'Do I need a separate page for every city I serve?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if you genuinely serve multiple distinct areas — one generic page trying to rank for five cities dilutes local relevance for all of them. Each location page needs unique, locally specific content, not a copy-pasted template with the city name swapped.' } },
      { '@type': 'Question', name: 'How important are Google reviews for local SEO?', acceptedAnswer: { '@type': 'Answer', text: 'Very important — review count, rating, and recency are direct ranking factors for the local pack, and reviews also strongly influence whether users actually click through and convert.' } },
      { '@type': 'Question', name: 'How long does local SEO take to show results?', acceptedAnswer: { '@type': 'Answer', text: 'Google Business Profile optimisation can show local pack movement within 4-6 weeks. Citation building and location page authority typically take 2-3 months to fully compound.' } },
      { '@type': 'Question', name: 'Do you manage the Google Business Profile ongoing, or just set it up once?', acceptedAnswer: { '@type': 'Answer', text: 'Both options are available. Ongoing management includes weekly posts, review responses, and monthly monitoring, since local pack rankings respond to consistent activity, not a one-time setup.' } },
    ] },
  ],
  '/services/seo-content-marketing/off-page-seo': [
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Off-Page SEO & Link Building Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Off-Page SEO', areaServed: 'Worldwide', url: `${SITE_URL}/services/seo-content-marketing/off-page-seo/` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is off-page SEO?', acceptedAnswer: { '@type': 'Answer', text: "Off-page SEO covers everything that builds your site's authority from outside your own domain — primarily backlinks from other websites, along with brand mentions and digital PR. It signals to Google that other credible sites vouch for your content." } },
      { '@type': 'Question', name: 'Is link building still effective, or does Google penalise it?', acceptedAnswer: { '@type': 'Answer', text: "Earned, relevant backlinks are still one of Google's strongest ranking factors. What gets penalised is manipulative link building — private blog networks, paid link schemes, and irrelevant mass link placements. We only do manual, relevant outreach." } },
      { '@type': 'Question', name: 'How many backlinks do I need to rank?', acceptedAnswer: { '@type': 'Answer', text: "There's no fixed number — what matters is relevance and authority relative to what's already ranking for your target keywords. A competitor analysis reveals the realistic link profile needed to compete." } },
      { '@type': 'Question', name: "What's the difference between link building and digital PR?", acceptedAnswer: { '@type': 'Answer', text: 'Link building is direct outreach to place links on relevant sites. Digital PR earns links indirectly by pitching newsworthy stories, data, or expert commentary to journalists and publications, often resulting in higher-authority coverage.' } },
      { '@type': 'Question', name: 'Can bad backlinks hurt my site?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — toxic or spammy links can trigger algorithmic devaluation or, in severe cases, manual penalties. Part of off-page SEO is auditing the existing profile and disavowing harmful links.' } },
      { '@type': 'Question', name: 'How long does it take to see results from link building?', acceptedAnswer: { '@type': 'Answer', text: "Individual links can be indexed within days, but their ranking impact typically compounds over 2-4 months as Google re-evaluates the site's overall authority signals." } },
    ] },
  ],
  '/services/seo-content-marketing/on-page-seo': [
    { '@context': 'https://schema.org', '@type': 'Service', name: 'On-Page SEO Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'On-Page SEO', areaServed: 'Worldwide', url: `${SITE_URL}/services/seo-content-marketing/on-page-seo/` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is on-page SEO and why does it matter?', acceptedAnswer: { '@type': 'Answer', text: "On-page SEO is the practice of optimising individual pages — titles, headings, content, internal links, and images — so search engines understand what the page is about and rank it for the right searches. It matters because even great content won't rank if the on-page signals don't clearly match search intent." } },
      { '@type': 'Question', name: "What's the difference between on-page and off-page SEO?", acceptedAnswer: { '@type': 'Answer', text: 'On-page SEO covers everything you control directly on your own pages: content, titles, headings, and internal links. Off-page SEO covers external signals like backlinks and brand mentions from other websites.' } },
      { '@type': 'Question', name: 'How many keywords should one page target?', acceptedAnswer: { '@type': 'Answer', text: 'One primary keyword per page, supported by 3-5 closely related secondary keywords and variations. Targeting too many unrelated keywords on one page dilutes relevance and confuses search engines about what the page is really for.' } },
      { '@type': 'Question', name: 'Will on-page SEO changes affect my current rankings?', acceptedAnswer: { '@type': 'Answer', text: 'Well-executed on-page changes typically improve rankings within weeks, since they directly clarify relevance signals to Google. Poorly planned changes — like removing ranking content — can hurt, which is why every change is mapped against current performance data first.' } },
      { '@type': 'Question', name: 'Do you rewrite existing content or just the technical elements?', acceptedAnswer: { '@type': 'Answer', text: 'Both, where needed. Some pages only need title, meta, and heading fixes; others need the body content itself restructured or expanded to properly match search intent.' } },
      { '@type': 'Question', name: 'How long does an on-page SEO project take?', acceptedAnswer: { '@type': 'Answer', text: 'For a site with 20-50 pages, a full on-page optimisation pass typically takes 2-3 weeks. Larger sites are prioritised by traffic and revenue potential so the highest-impact pages are fixed first.' } },
    ] },
  ],
  '/services/seo-content-marketing/seo-audit-strategy': [
    { '@context': 'https://schema.org', '@type': 'Service', name: 'SEO Audit & Strategy Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'SEO Audit', areaServed: 'Worldwide', url: `${SITE_URL}/services/seo-content-marketing/seo-audit-strategy/` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is an SEO audit and what does it actually include?', acceptedAnswer: { '@type': 'Answer', text: 'An SEO audit is a full review of a website\'s technical health, on-page optimisation, content quality, and backlink profile, benchmarked against real competitors. Ours includes a full site crawl, keyword gap analysis, competitor benchmarking, content review, backlink audit, and a prioritised action roadmap.' } },
      { '@type': 'Question', name: 'How long does an SEO audit take?', acceptedAnswer: { '@type': 'Answer', text: 'A standard audit for a site under 500 pages typically takes 5-7 working days from kickoff to the final report and walkthrough call. Larger or more complex sites can take up to 2 weeks.' } },
      { '@type': 'Question', name: 'How much does an SEO audit cost?', acceptedAnswer: { '@type': 'Answer', text: 'Audit pricing depends on site size and complexity. A free initial audit is available to assess fit; a full in-depth audit with a custom strategy roadmap is quoted after a short discovery call.' } },
      { '@type': 'Question', name: 'Do I need an SEO audit if my site is already ranking well?', acceptedAnswer: { '@type': 'Answer', text: "Yes — audits aren't only for underperforming sites. Rankings can quietly erode from technical issues, algorithm updates, or new competitors, and a periodic audit catches problems before they show up as a traffic drop." } },
      { '@type': 'Question', name: "What's the difference between an SEO audit and an SEO strategy?", acceptedAnswer: { '@type': 'Answer', text: 'An audit tells you what\'s wrong and what\'s working right now. A strategy is the plan built from those findings — which keywords to target, what content to create, and in what order, tied to your business goals.' } },
      { '@type': 'Question', name: 'Will someone walk me through the findings, or do I just get a PDF?', acceptedAnswer: { '@type': 'Answer', text: 'You get a full written report plus a live call where we walk through every finding in plain English, answer questions, and agree on next steps together.' } },
    ] },
  ],
  '/services/seo-content-marketing/technical-seo': [
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Technical SEO Services', provider: { '@type': 'Organization', name: 'Digital Aura', url: SITE_URL }, serviceType: 'Technical SEO', areaServed: 'Worldwide', url: `${SITE_URL}/services/seo-content-marketing/technical-seo/` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is technical SEO and why does it matter?', acceptedAnswer: { '@type': 'Answer', text: "Technical SEO covers everything that affects how search engines crawl, index, and render your site — site speed, mobile usability, crawlability, structured data, and security. It matters because no amount of great content will rank if Google can't properly access or understand your pages." } },
      { '@type': 'Question', name: 'What are Core Web Vitals and do they really affect rankings?', acceptedAnswer: { '@type': 'Answer', text: "Core Web Vitals are Google's metrics for loading speed (LCP), interactivity (INP), and visual stability (CLS). Yes, they're a confirmed ranking factor, and pages that fail them are also proven to lose users before content is even seen." } },
      { '@type': 'Question', name: 'How do I know if my site has technical SEO problems?', acceptedAnswer: { '@type': 'Answer', text: 'Common signs include pages that rank well but suddenly drop, slow load times reported in PageSpeed Insights, or a gap between how many pages you have and how many Google Search Console shows as indexed. A technical audit reveals the exact list.' } },
      { '@type': 'Question', name: 'Will fixing technical SEO issues improve my rankings immediately?', acceptedAnswer: { '@type': 'Answer', text: 'Some fixes, like resolving a blocked crawl directive, can show impact within days. Others, like Core Web Vitals improvements, typically show measurable ranking movement within 4-8 weeks as Google re-crawls and re-evaluates the site.' } },
      { '@type': 'Question', name: 'Do you need developer access to fix technical SEO issues?', acceptedAnswer: { '@type': 'Answer', text: 'For most fixes, yes — changes typically require code, server configuration, or CMS-level access. We work directly with your development team or CMS admin to implement fixes safely.' } },
      { '@type': 'Question', name: 'How often should technical SEO be checked?', acceptedAnswer: { '@type': 'Answer', text: 'A full technical audit is recommended quarterly, with continuous monitoring for crawl errors and Core Web Vitals in between, since site changes and algorithm updates can introduce new technical issues at any time.' } },
    ] },
  ],
};

function setTag(selector: string, valueAttr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    const isLink = selector.trimStart().startsWith('link');
    el = document.createElement(isLink ? 'link' : 'meta');
    const m = selector.match(/\[([^\]=]+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

function pathToSlug(pathname: string): string {
  if (pathname === '/') return 'home';
  return pathname.replace(/\/$/, '').split('/').filter(Boolean).pop() || 'home';
}

// Admin-panel users paste schema into a plain code box and sometimes include
// the <script> wrapper themselves (copied straight from a schema generator).
// Assigning that whole string to a <script>.text creates a literal nested
// <script type="application/ld+json"><script type="application/ld+json">...
// tag in the rendered HTML, which every structured-data parser — Google's
// included — treats as invalid and ignores entirely. Stripping any wrapper
// the author already included keeps the element valid either way.
function stripScriptWrapper(code: string): string {
  return code
    .trim()
    .replace(/^<script[^>]*>/i, '')
    .replace(/<\/script>\s*$/i, '')
    .trim();
}

export default function PageSEO() {
  const { pathname } = useLocation();
  const schemaRef   = useRef<HTMLScriptElement | null>(null);
  const headTagsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Clean up previous injections
    if (schemaRef.current)   { schemaRef.current.remove();   schemaRef.current   = null; }
    if (headTagsRef.current) { headTagsRef.current.remove(); headTagsRef.current = null; }

    const normalPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const meta = PAGE_META[normalPath];

    // ── Title ─────────────────────────────────────────────────────────
    if (meta) document.title = meta.title;

    // ── Meta description ──────────────────────────────────────────────
    if (meta) setTag('meta[name="description"]', 'content', meta.description);

    // ── Open Graph ────────────────────────────────────────────────────
    const title = meta?.title || document.title;
    const desc  = meta?.description || '';
    setTag('meta[property="og:title"]',       'content', title);
    setTag('meta[property="og:description"]', 'content', desc);
    setTag('meta[property="og:image"]',       'content', DEFAULT_IMAGE);

    // ── Twitter ───────────────────────────────────────────────────────
    setTag('meta[name="twitter:title"]',       'content', title);
    setTag('meta[name="twitter:description"]', 'content', desc);
    setTag('meta[name="twitter:image"]',       'content', DEFAULT_IMAGE);

    // ── Canonical (with trailing slash to match server behaviour) ─────
    const canonicalUrl = normalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalPath}/`;
    setTag('link[rel="canonical"]', 'href', canonicalUrl);
    setTag('meta[property="og:url"]', 'content', canonicalUrl);

    // ── Per-page JSON-LD schema ───────────────────────────────────────
    const pageSchema = PAGE_SCHEMA[normalPath];
    if (pageSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(pageSchema);
      document.head.appendChild(script);
      schemaRef.current = script;
    }

    // ── Fetch DB overrides (schema_code, head_tags, meta overrides) ───
    const slug = pathToSlug(pathname);
    fetch(`${API_BASE}/api/pages/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        if (!data?.success || !data?.data) return;
        const page = data.data;

        if (page.meta_title?.trim()) {
          document.title = page.meta_title;
          setTag('meta[property="og:title"]',    'content', page.meta_title);
          setTag('meta[name="twitter:title"]',   'content', page.meta_title);
        }
        if (page.meta_desc?.trim()) {
          setTag('meta[name="description"]',        'content', page.meta_desc);
          setTag('meta[property="og:description"]', 'content', page.meta_desc);
          setTag('meta[name="twitter:description"]','content', page.meta_desc);
        }
        if (page.og_image?.trim()) {
          setTag('meta[property="og:image"]',  'content', page.og_image);
          setTag('meta[name="twitter:image"]', 'content', page.og_image);
        }
        if (page.canonical?.trim()) {
          const c = page.canonical.endsWith('/') ? page.canonical : page.canonical + '/';
          setTag('link[rel="canonical"]', 'href', c);
          setTag('meta[property="og:url"]', 'content', c);
        }

        if (page.schema_code?.trim()) {
          // Remove default schema if DB provides one
          if (schemaRef.current) { schemaRef.current.remove(); schemaRef.current = null; }
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.text = stripScriptWrapper(page.schema_code);
          document.head.appendChild(script);
          schemaRef.current = script;
        }

        if (page.head_tags?.trim()) {
          const container = document.createElement('div');
          container.setAttribute('data-page-head-tags', slug);
          container.style.display = 'none';
          const wrapper = document.createElement('div');
          wrapper.innerHTML = page.head_tags;
          Array.from(wrapper.children).forEach(c => container.appendChild(c.cloneNode(true)));
          document.head.appendChild(container);
          headTagsRef.current = container;
        }
      });
  }, [pathname]);

  return null;
}
