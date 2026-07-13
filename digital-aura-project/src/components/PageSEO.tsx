import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE  = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
const SITE_URL  = 'https://thedigitalaura.com';
const DEFAULT_IMAGE = `${SITE_URL}/logos/digital-aura-logo.png`;

// Per-page SEO defaults — overridden by DB values if set via admin panel
const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Digital Aura — Data-Driven Digital Marketing Agency',
    description: 'Digital Aura is a data-driven digital marketing agency specializing in SEO, Google Ads, Meta Ads, Social Media Marketing & Web Design. 500+ happy clients.',
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
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '750', bestRating: '5', worstRating: '1' } },
  '/blog': { '@context': 'https://schema.org', '@type': 'Blog', name: 'Digital Aura Blog',
    url: `${SITE_URL}/blog/`, description: 'Digital marketing trends, SEO tips, and AI insights.',
    publisher: { '@type': 'Organization', name: 'Digital Aura', logo: DEFAULT_IMAGE } },
  '/case-studies': { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Case Studies | Digital Aura', url: `${SITE_URL}/case-studies/` },
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
          script.text = page.schema_code;
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
