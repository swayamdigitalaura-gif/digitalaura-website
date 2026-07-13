import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Monitor, Smartphone, Tablet, RefreshCw, MousePointer, Eye, AlignLeft, AlignCenter, AlignRight, ChevronDown, ChevronRight as ChevronR, X, Type, Sliders } from 'lucide-react';

const SITE = import.meta.env.VITE_SITE_BASE || 'http://localhost:8083';

const PAGE_URLS = {
  home: `${SITE}/`,
  about: `${SITE}/about`,
  services: `${SITE}/services`,
  blog: `${SITE}/blog`,
  careers: `${SITE}/careers`,
  'case-studies': `${SITE}/case-studies`,
  contact: `${SITE}/contact`,
  'ai-automation': `${SITE}/services/ai-automation`,
  'ai-chatbot-assistant': `${SITE}/services/ai-chatbot-assistant`,
  'ai-powered-web-apps': `${SITE}/services/ai-powered-web-apps`,
  'custom-ai-web-solutions': `${SITE}/services/custom-ai-web-solutions`,
  'web-app-development': `${SITE}/services/web-app-development`,
  'full-stack-development': `${SITE}/services/full-stack-development`,
  'wordpress-development': `${SITE}/services/wordpress-development`,
  'mobile-app-development': `${SITE}/services/mobile-app-development`,
  'seo-content-marketing': `${SITE}/services/seo-content-marketing`,
  'google-ads': `${SITE}/services/google-ads`,
  'meta-ads': `${SITE}/services/meta-ads`,
  'linkedin-youtube-ads': `${SITE}/services/linkedin-youtube-ads`,
  'email-whatsapp-marketing': `${SITE}/services/email-whatsapp-marketing`,
  cro: `${SITE}/services/cro`,
  'design-branding': `${SITE}/services/design-branding`,
  'shopify-development': `${SITE}/services/shopify-development`,
  'woocommerce-development': `${SITE}/services/woocommerce-development`,
  'bigcommerce-development': `${SITE}/services/bigcommerce-development`,
  'digital-marketing': `${SITE}/services/digital-marketing`,
  'seo-services': `${SITE}/services/seo-content-marketing`,
  'google-ads-mgmt': `${SITE}/services/google-ads`,
  'meta-ads-mgmt': `${SITE}/services/meta-ads`,
  'llm-powered-apps': `${SITE}/services/ai/llm-powered-apps`,
  'chatbots-assistants': `${SITE}/services/ai/chatbots-assistants`,
  'workflow-automation': `${SITE}/services/ai/workflow-automation`,
  'predictive-analytics': `${SITE}/services/ai/predictive-analytics`,
  'ai-api-integration': `${SITE}/services/ai/api-integration`,
  'custom-ml-models': `${SITE}/services/ai/custom-ml-models`,
  'conversion-rate-optimisation': `${SITE}/services/cro`,
  'linkedin-youtube-marketing': `${SITE}/services/linkedin-youtube-ads`,
  'engagement-models': `${SITE}/engagement-models`,
  'android-development': `${SITE}/services/android-development`,
  'flutter-apps': `${SITE}/services/flutter-apps`,
  'react-native-apps': `${SITE}/services/react-native-apps`,
  'ai-solutions': `${SITE}/ai-solutions`,
  testimonials: `${SITE}/testimonials`,
  'privacy-policy': `${SITE}/privacy-policy`,
  privacy: `${SITE}/privacy-policy`,
  'terms-and-conditions': `${SITE}/terms-and-conditions`,
  'cancellation-refund-policy': `${SITE}/cancellation-refund-policy`,
};

const PAGE_FIELDS = {
  home: [
    { group: '🌟 Hero Section', fields: [
      { key: 'hero_badge',         label: 'Top Badge',        type: 'text',     def: 'AI-Powered Digital Agency' },
      { key: 'hero_heading_line1', label: 'Heading Line 1',   type: 'text',     def: 'We Build. We Automate.' },
      { key: 'hero_heading_line2', label: 'Heading Line 2',   type: 'text',     def: 'We Grow Your Business.' },
      { key: 'hero_subtext',       label: 'Subtext',          type: 'textarea', def: 'From AI solutions to web & mobile apps, and powerful marketing systems, Digital Aura builds, launches, and scales your digital future.' },
      { key: 'hero_cta1',          label: 'Primary Button',   type: 'text',     def: 'Get Free Consultation' },
      { key: 'hero_cta2',          label: 'Secondary Button', type: 'text',     def: 'Explore Our Work' },
    ]},
    { group: '📊 Stats Bar', fields: [
      { key: 'stats_badge',     label: 'Section Badge',    type: 'text', def: 'By The Numbers' },
      { key: 'stats_heading',   label: 'Section Heading',  type: 'text', def: 'Our Impact Speaks for Itself' },
      { key: 'stats_apps',      label: 'Apps Built',       type: 'text', def: '57+' },
      { key: 'stats_clients',   label: 'Happy Clients',    type: 'text', def: '473+' },
      { key: 'stats_campaigns', label: 'Campaigns',        type: 'text', def: '218+' },
      { key: 'stats_rating',    label: 'Rating',           type: 'text', def: '4.9' },
    ]},
    { group: '🛠️ Services Section', fields: [
      { key: 'home_services_badge',   label: 'Section Badge',   type: 'text',     def: 'What We Do' },
      { key: 'home_services_heading', label: 'Section Heading', type: 'text',     def: 'One Agency, Every Solution' },
      { key: 'home_services_subtext', label: 'Section Subtext', type: 'textarea', def: 'From AI powered web solutions and apps to performance marketing, we build, automate, and grow your business.' },
    ]},
    { group: '💡 Why Choose Us', fields: [
      { key: 'why_badge',      label: 'Section Badge',     type: 'text',     def: 'Why Choose Us' },
      { key: 'why_heading',    label: 'Section Heading',   type: 'text',     def: 'Why 500+ Businesses Trust Digital Aura' },
      { key: 'why_left_h3',   label: 'Left Column H3',    type: 'text',     def: 'We Build with AI. We Grow with Data.' },
      { key: 'why_left_p1',   label: 'Left Paragraph 1',  type: 'textarea', def: 'At Digital Aura, we combine cutting edge AI development with data driven marketing.' },
      { key: 'why_left_p2',   label: 'Left Paragraph 2',  type: 'textarea', def: "From the first strategy call to monthly performance reviews, we treat your business like our own." },
      { key: 'why_stat1_n',   label: 'Stat 1 Number',     type: 'text', def: '50+' },
      { key: 'why_stat1_l',   label: 'Stat 1 Label',      type: 'text', def: 'Web & Apps Built' },
      { key: 'why_stat2_n',   label: 'Stat 2 Number',     type: 'text', def: '500+' },
      { key: 'why_stat2_l',   label: 'Stat 2 Label',      type: 'text', def: 'Clients Served' },
      { key: 'why_stat3_n',   label: 'Stat 3 Number',     type: 'text', def: '4.9★' },
      { key: 'why_stat3_l',   label: 'Stat 3 Label',      type: 'text', def: 'Avg Rating' },
      { key: 'why_feat1_title', label: 'Feature 1 Title', type: 'text',     def: 'AI First Approach' },
      { key: 'why_feat1_desc',  label: 'Feature 1 Desc',  type: 'textarea', def: 'Every solution we build leverages the latest AI tools and automation.' },
      { key: 'why_feat2_title', label: 'Feature 2 Title', type: 'text',     def: 'End to End Execution' },
      { key: 'why_feat2_desc',  label: 'Feature 2 Desc',  type: 'textarea', def: 'From idea to launch to marketing, we handle everything in house.' },
      { key: 'why_feat3_title', label: 'Feature 3 Title', type: 'text',     def: 'Transparent Reporting' },
      { key: 'why_feat3_desc',  label: 'Feature 3 Desc',  type: 'textarea', def: 'Real time dashboards and monthly reports with zero fluff.' },
      { key: 'why_feat4_title', label: 'Feature 4 Title', type: 'text',     def: 'ROI Focused Always' },
      { key: 'why_feat4_desc',  label: 'Feature 4 Desc',  type: 'textarea', def: 'Whether it\'s an app or an ad campaign, we measure what matters.' },
    ]},
    { group: '💬 Testimonials', fields: [
      { key: 'testimonials_badge',   label: 'Section Badge',   type: 'text', def: 'Client Love' },
      { key: 'testimonials_heading', label: 'Section Heading', type: 'text', def: 'What Our Clients Say' },
    ]},
    { group: '📣 CTA Banner', fields: [
      { key: 'cta_badge',   label: 'Badge Text',  type: 'text',     def: "Let's Build Together" },
      { key: 'cta_heading', label: 'Heading',     type: 'text',     def: 'Ready to Build, Automate & Grow?' },
      { key: 'cta_subtext', label: 'Subtext',     type: 'textarea', def: 'From your first app to your 100th lead, Digital Aura is your all in one AI powered digital partner.' },
      { key: 'cta_button',  label: 'Button Text', type: 'text',     def: 'Start Your Project Today' },
    ]},
    { group: '📞 Contact Info', fields: [
      { key: 'contact_phone',    label: 'Phone',    type: 'text', def: '+91 81412 00284' },
      { key: 'contact_email',    label: 'Email',    type: 'text', def: 'info@thedigitalaura.com' },
      { key: 'contact_whatsapp', label: 'WhatsApp', type: 'text', def: '+918141200284' },
    ]},
  ],
  about: [
    { group: '🏢 Hero Section', fields: [
      { key: 'about_hero_badge',    label: 'Top Badge',               type: 'text',     def: 'Est. 2016 · Ahmedabad, India' },
      { key: 'about_hero_heading',  label: 'Heading Line 1',          type: 'text',     def: 'The Agency Behind' },
      { key: 'about_hero_heading2', label: 'Heading Line 2 (Orange)', type: 'text',     def: '500+ Success Stories' },
      { key: 'about_hero_subtext',  label: 'Subtext',                 type: 'textarea', def: "Digital Aura is a full-service digital agency founded by Sambhav Shah in Ahmedabad. We've been helping businesses grow their online presence since 2016." },
      { key: 'about_hero_tags',     label: 'Service Tags',            type: 'tags',     def: 'SEO,Google Ads,Meta Ads,Shopify,WordPress,AI Solutions' },
    ]},
    { group: '📊 Hero Stats', fields: [
      { key: 'about_stat1_num',   label: 'Stat 1 Number',   type: 'text', def: '500+' },
      { key: 'about_stat1_label', label: 'Stat 1 Label',    type: 'text', def: 'Clients Served' },
      { key: 'about_stat1_sub',   label: 'Stat 1 Subtitle', type: 'text', def: 'Across India & globally' },
      { key: 'about_stat2_num',   label: 'Stat 2 Number',   type: 'text', def: '8+' },
      { key: 'about_stat2_label', label: 'Stat 2 Label',    type: 'text', def: 'Years in Business' },
      { key: 'about_stat2_sub',   label: 'Stat 2 Subtitle', type: 'text', def: 'Est. 2016, Ahmedabad' },
      { key: 'about_stat3_num',   label: 'Stat 3 Number',   type: 'text', def: '200%' },
      { key: 'about_stat3_label', label: 'Stat 3 Label',    type: 'text', def: 'Best-Case Growth' },
      { key: 'about_stat3_sub',   label: 'Stat 3 Subtitle', type: 'text', def: 'Ophthalmology client' },
      { key: 'about_stat4_num',   label: 'Stat 4 Number',   type: 'text', def: '15+' },
      { key: 'about_stat4_label', label: 'Stat 4 Label',    type: 'text', def: 'Services Offered' },
      { key: 'about_stat4_sub',   label: 'Stat 4 Subtitle', type: 'text', def: 'From SEO to AI & beyond' },
    ]},
    { group: '📖 Our Story', fields: [
      { key: 'about_story_badge',   label: 'Badge Text',  type: 'text',     def: 'Our Story' },
      { key: 'about_story_heading', label: 'Heading',     type: 'text',     def: 'A Decade of Digital Growth' },
      { key: 'about_story_p1', label: 'Paragraph 1', type: 'textarea', def: 'Digital Aura started in Ahmedabad in 2016 as a boutique agency with a clear purpose.' },
      { key: 'about_story_p2', label: 'Paragraph 2', type: 'textarea', def: 'Over the years, the agency grew from core digital marketing into a full-service powerhouse.' },
      { key: 'about_story_p3', label: 'Paragraph 3', type: 'textarea', def: 'Today, Digital Aura is a future-ready agency trusted by 500+ clients.' },
    ]},
    { group: '💡 Vision / Mission / Values', fields: [
      { key: 'about_vision_title',  label: 'Vision Title',        type: 'text',     def: 'Our Vision' },
      { key: 'about_vision_desc',   label: 'Vision Description',  type: 'textarea', def: "To be India's most trusted digital growth partner." },
      { key: 'about_mission_title', label: 'Mission Title',       type: 'text',     def: 'Our Mission' },
      { key: 'about_mission_desc',  label: 'Mission Description', type: 'textarea', def: 'Delivering exceptional, well-planned digital marketing services is our motto.' },
      { key: 'about_values_title',  label: 'Values Title',        type: 'text',     def: 'Our Values' },
      { key: 'about_values_desc',   label: 'Values Description',  type: 'textarea', def: "Equal opportunities, sheer dedication, and a belief that every client's business deserves the same attention." },
    ]},
    { group: '👤 Founder', fields: [
      { key: 'about_founder_name',      label: 'Founder Name',       type: 'text',     def: 'Sambhav Shah' },
      { key: 'about_founder_role',      label: 'Founder Role/Title', type: 'text',     def: 'Founder & CEO' },
      { key: 'about_founder_phone',     label: 'Founder Phone',      type: 'text',     def: '+91 81412 00284' },
      { key: 'about_founder_email',     label: 'Founder Email',      type: 'text',     def: 'info@thedigitalaura.com' },
      { key: 'about_founder_linkedin',  label: 'LinkedIn URL',       type: 'text',     def: 'https://www.linkedin.com/in/sambhav-shah' },
      { key: 'about_founder_instagram', label: 'Instagram URL',      type: 'text',     def: 'https://www.instagram.com/sambhavshah2' },
      { key: 'about_founder_skills',    label: 'Skills Tags',        type: 'tags',     def: 'SEO Strategy,Performance Marketing,AI Solutions,Team Leadership,Client Success,Business Growth' },
      { key: 'about_founder_p1',    label: 'Bio Paragraph 1', type: 'textarea', def: 'Sambhav Shah started Digital Aura in 2016 with a belief that every business deserves personalised attention, not a templated plan.' },
      { key: 'about_founder_p2',    label: 'Bio Paragraph 2', type: 'textarea', def: 'Eight years later, that belief has translated into 500+ clients served.' },
      { key: 'about_founder_p3',    label: 'Bio Paragraph 3', type: 'textarea', def: "Known for being highly responsive and personally invested in every client's strategy." },
      { key: 'about_founder_quote', label: 'Founder Quote',   type: 'textarea', def: '"Delivering exceptional services to enhance the client\'s business online presence is our motto."' },
    ]},
    { group: '✅ Why Digital Aura', fields: [
      { key: 'about_why_badge',   label: 'Section Badge',   type: 'text',     def: 'Why Digital Aura' },
      { key: 'about_why_heading', label: 'Section Heading', type: 'text',     def: 'Save Time & Effort With Digital Aura' },
      { key: 'about_why_subtext', label: 'Section Subtext', type: 'textarea', def: 'We emphasise customised solutions following a complete business analysis.' },
      { key: 'about_why1_title', label: 'Reason 1 Title', type: 'text',     def: 'Customised for Every Business' },
      { key: 'about_why1_desc',  label: 'Reason 1 Desc',  type: 'textarea', def: 'We fully analyse your business before we strategise. No templates.' },
      { key: 'about_why2_title', label: 'Reason 2 Title', type: 'text',     def: 'Transparent & Honest' },
      { key: 'about_why2_desc',  label: 'Reason 2 Desc',  type: 'textarea', def: 'Detailed reporting, open communication, and zero fluff.' },
      { key: 'about_why3_title', label: 'Reason 3 Title', type: 'text',     def: 'Always Trend-First' },
      { key: 'about_why3_desc',  label: 'Reason 3 Desc',  type: 'textarea', def: 'We adapt to algorithm changes before they impact your results.' },
      { key: 'about_why4_title', label: 'Reason 4 Title', type: 'text',     def: 'Dedicated Expert Team' },
      { key: 'about_why4_desc',  label: 'Reason 4 Desc',  type: 'textarea', def: 'Enthusiastic professionals ready to take up any challenge.' },
      { key: 'about_why5_title', label: 'Reason 5 Title', type: 'text',     def: 'Proven, Measurable Results' },
      { key: 'about_why5_desc',  label: 'Reason 5 Desc',  type: 'textarea', def: 'From 76.7% traffic boosts to 200% business growth.' },
      { key: 'about_why6_title', label: 'Reason 6 Title', type: 'text',     def: 'Truly Full-Service' },
      { key: 'about_why6_desc',  label: 'Reason 6 Desc',  type: 'textarea', def: 'SEO, paid ads, social media, web design, Shopify, WordPress, and AI — all under one roof.' },
    ]},
    { group: '📈 Case Studies', fields: [
      { key: 'about_cs_badge',   label: 'Section Badge',   type: 'text', def: 'Client Results' },
      { key: 'about_cs_heading', label: 'Section Heading', type: 'text', def: "What We've Delivered" },
      { key: 'about_cs1_industry', label: 'Case 1 Industry',    type: 'text',     def: 'IVF Hospital' },
      { key: 'about_cs1_result',   label: 'Case 1 Result',      type: 'text',     def: '76.7%' },
      { key: 'about_cs1_label',    label: 'Case 1 Label',       type: 'text',     def: 'Traffic Boost' },
      { key: 'about_cs1_via',      label: 'Case 1 Via',         type: 'text',     def: 'SEO + Content Marketing' },
      { key: 'about_cs1_desc',     label: 'Case 1 Description', type: 'textarea', def: 'Organic traffic increase in 6 months through targeted SEO.' },
      { key: 'about_cs2_industry', label: 'Case 2 Industry',    type: 'text',     def: 'Eye Hospital' },
      { key: 'about_cs2_result',   label: 'Case 2 Result',      type: 'text',     def: '120%' },
      { key: 'about_cs2_label',    label: 'Case 2 Label',       type: 'text',     def: 'Traffic Growth' },
      { key: 'about_cs2_via',      label: 'Case 2 Via',         type: 'text',     def: 'Digital Marketing' },
      { key: 'about_cs2_desc',     label: 'Case 2 Description', type: 'textarea', def: 'Traffic growth through integrated Google Ads, Meta Ads.' },
      { key: 'about_cs3_industry', label: 'Case 3 Industry',    type: 'text',     def: 'Home Appliance Repair' },
      { key: 'about_cs3_result',   label: 'Case 3 Result',      type: 'text',     def: '174.5%' },
      { key: 'about_cs3_label',    label: 'Case 3 Label',       type: 'text',     def: 'Traffic Increase' },
      { key: 'about_cs3_via',      label: 'Case 3 Via',         type: 'text',     def: 'SEO + Google Ads' },
      { key: 'about_cs3_desc',     label: 'Case 3 Description', type: 'textarea', def: 'Traffic surge powered by local SEO and Meta Ads.' },
      { key: 'about_cs4_industry', label: 'Case 4 Industry',    type: 'text',     def: 'Ophthalmology Clinic' },
      { key: 'about_cs4_result',   label: 'Case 4 Result',      type: 'text',     def: '200%' },
      { key: 'about_cs4_label',    label: 'Case 4 Label',       type: 'text',     def: 'Business Growth' },
      { key: 'about_cs4_via',      label: 'Case 4 Via',         type: 'text',     def: 'Performance Marketing' },
      { key: 'about_cs4_desc',     label: 'Case 4 Description', type: 'textarea', def: 'Overall business growth through full-funnel digital marketing.' },
      { key: 'about_cs5_industry', label: 'Case 5 Industry',    type: 'text',     def: 'Indian Restaurant' },
      { key: 'about_cs5_result',   label: 'Case 5 Result',      type: 'text',     def: '150%' },
      { key: 'about_cs5_label',    label: 'Case 5 Label',       type: 'text',     def: 'Traffic Surge' },
      { key: 'about_cs5_via',      label: 'Case 5 Via',         type: 'text',     def: 'Social Media + Meta Ads' },
      { key: 'about_cs5_desc',     label: 'Case 5 Description', type: 'textarea', def: 'Massive reach and footfall increase through targeted social campaigns.' },
    ]},
    { group: '🏭 Who We Serve', fields: [
      { key: 'about_serve_badge',   label: 'Section Badge',   type: 'text',     def: 'Who We Serve' },
      { key: 'about_serve_heading', label: 'Section Heading', type: 'text',     def: 'Industries We Work With' },
      { key: 'about_serve_subtext', label: 'Section Subtext', type: 'textarea', def: '500+ businesses across diverse sectors trust us to deliver digital growth that matters.' },
      { key: 'about_clients', label: 'Industries List', type: 'clients', def: '' },
    ]},
    { group: '💬 Client Voices', fields: [
      { key: 'about_voices_badge',   label: 'Section Badge',   type: 'text', def: 'Client Voices' },
      { key: 'about_voices_heading', label: 'Section Heading', type: 'text', def: 'What Our Clients Say' },
      { key: 'about_testimonials',   label: 'Testimonials',    type: 'testimonials', def: '' },
    ]},
    { group: '⭐ Recognition', fields: [
      { key: 'about_recog_badge',   label: 'Section Badge',   type: 'text',     def: 'Recognition' },
      { key: 'about_recog_heading', label: 'Section Heading', type: 'text',     def: 'Rated on Top Platforms' },
      { key: 'about_recog_subtext', label: 'Section Subtext', type: 'textarea', def: 'Recognised by leading industry directories across India and worldwide.' },
      { key: 'about_platforms',     label: 'Platform Ratings', type: 'platforms', def: '' },
    ]},
    { group: '👥 Team Members', fields: [
      { key: 'about_team', label: 'Team Members', type: 'team', def: '' },
    ]},
    { group: '📣 CTA Section', fields: [
      { key: 'about_cta_heading', label: 'CTA Heading', type: 'text',     def: 'Ready to Boost Your Online Presence?' },
      { key: 'about_cta_subtext', label: 'CTA Subtext', type: 'textarea', def: 'Partner with Digital Aura and let our dedicated team drive measurable results for your business.' },
      { key: 'about_cta_button',  label: 'Button Text', type: 'text',     def: 'Get In Touch' },
    ]},
  ],
  services: [
    { group: '🌟 Hero Section', fields: [
      { key: 'svc_hero_badge',    label: 'Hero Badge',    type: 'text',     def: 'Full Service Digital Agency' },
      { key: 'svc_hero_heading1', label: 'Heading Line 1', type: 'text',   def: 'AI Driven Digital Solutions' },
      { key: 'svc_hero_heading2', label: 'Heading Line 2', type: 'text',   def: 'We Build What Your Business Needs.' },
      { key: 'svc_hero_subtext',  label: 'Subtext',       type: 'textarea', def: 'From AI-powered apps to performance marketing — we design, build, and grow digital products.' },
      { key: 'svc_hero_cta1',     label: 'Primary Button', type: 'text',  def: 'Start Your Project' },
      { key: 'svc_hero_cta2',     label: 'Secondary Button', type: 'text', def: 'Explore Services' },
    ]},
    { group: '📊 Trust Strip Stats', fields: [
      { key: 'svc_stat1', label: 'Stat 1', type: 'text', def: '4.9★ Rating' },
      { key: 'svc_stat2', label: 'Stat 2', type: 'text', def: '500+ Projects' },
      { key: 'svc_stat3', label: 'Stat 3', type: 'text', def: 'AI First Execution' },
      { key: 'svc_stat4', label: 'Stat 4', type: 'text', def: '4–8 Week Delivery' },
    ]},
    { group: '✅ Why Us Section', fields: [
      { key: 'svc_why1_title', label: 'Why 1 Title', type: 'text',     def: 'AI First Execution' },
      { key: 'svc_why1_desc',  label: 'Why 1 Desc',  type: 'textarea', def: "AI isn't a feature we add, it's how we build. Every project is architected with intelligence from day one." },
      { key: 'svc_why2_title', label: 'Why 2 Title', type: 'text',     def: 'End to End Ownership' },
      { key: 'svc_why2_desc',  label: 'Why 2 Desc',  type: 'textarea', def: 'Strategy → Design → Build → Launch → Growth. One team. No finger pointing. Zero outsourcing.' },
      { key: 'svc_why3_title', label: 'Why 3 Title', type: 'text',     def: 'Tech + Growth Together' },
      { key: 'svc_why3_desc',  label: 'Why 3 Desc',  type: 'textarea', def: 'We build the product AND grow it. Our engineers talk to our marketers daily.' },
      { key: 'svc_why4_title', label: 'Why 4 Title', type: 'text',     def: 'Faster Than Agency Speed' },
      { key: 'svc_why4_desc',  label: 'Why 4 Desc',  type: 'textarea', def: 'AI assisted workflows let us deliver in weeks what agencies take months to scope.' },
    ]},
    { group: '⚙️ Process Steps', fields: [
      { key: 'svc_proc1_title', label: 'Step 1 Title', type: 'text',     def: 'Discover' },
      { key: 'svc_proc1_desc',  label: 'Step 1 Desc',  type: 'textarea', def: 'Deep-dive into your goals, users, competition, and constraints.' },
      { key: 'svc_proc2_title', label: 'Step 2 Title', type: 'text',     def: 'Strategy' },
      { key: 'svc_proc2_desc',  label: 'Step 2 Desc',  type: 'textarea', def: 'Roadmap, tech stack selection, sprint plan, and resource allocation.' },
      { key: 'svc_proc3_title', label: 'Step 3 Title', type: 'text',     def: 'Design' },
      { key: 'svc_proc3_desc',  label: 'Step 3 Desc',  type: 'textarea', def: 'Wireframes, UI systems, and prototypes — built to convert and delight.' },
      { key: 'svc_proc4_title', label: 'Step 4 Title', type: 'text',     def: 'Build' },
      { key: 'svc_proc4_desc',  label: 'Step 4 Desc',  type: 'textarea', def: 'AI assisted development, rigorous QA, and clean maintainable code.' },
      { key: 'svc_proc5_title', label: 'Step 5 Title', type: 'text',     def: 'Automate' },
      { key: 'svc_proc5_desc',  label: 'Step 5 Desc',  type: 'textarea', def: 'Embed AI workflows, integrations, and automation before launch.' },
      { key: 'svc_proc6_title', label: 'Step 6 Title', type: 'text',     def: 'Scale' },
      { key: 'svc_proc6_desc',  label: 'Step 6 Desc',  type: 'textarea', def: 'Deploy, monitor, optimise. We stay with you post launch.' },
    ]},
    { group: '❓ FAQ', fields: [
      { key: 'svc_faq1_q', label: 'FAQ 1 Question', type: 'text',     def: 'Do you only do digital marketing?' },
      { key: 'svc_faq1_a', label: 'FAQ 1 Answer',   type: 'textarea', def: 'No, marketing is just one of four service pillars. We also do AI, web/app development, and branding.' },
      { key: 'svc_faq2_q', label: 'FAQ 2 Question', type: 'text',     def: 'Can you build custom software from scratch?' },
      { key: 'svc_faq2_a', label: 'FAQ 2 Answer',   type: 'textarea', def: 'Yes. We handle everything from architecture and database design to frontend and deployment.' },
      { key: 'svc_faq3_q', label: 'FAQ 3 Question', type: 'text',     def: 'Do you work with early stage startups?' },
      { key: 'svc_faq3_a', label: 'FAQ 3 Answer',   type: 'textarea', def: 'Absolutely. We love working with founders who have a clear problem and need the right tech partner.' },
      { key: 'svc_faq4_q', label: 'FAQ 4 Question', type: 'text',     def: 'What AI solutions do you actually build?' },
      { key: 'svc_faq4_a', label: 'FAQ 4 Answer',   type: 'textarea', def: 'Custom AI chatbots, LLM powered apps, automation pipelines, and custom ML models.' },
      { key: 'svc_faq5_q', label: 'FAQ 5 Question', type: 'text',     def: 'How long does a typical project take?' },
      { key: 'svc_faq5_a', label: 'FAQ 5 Answer',   type: 'textarea', def: 'A landing page takes 1-2 weeks. A full web app MVP takes 4-8 weeks. Marketing campaigns go live in 5-7 days.' },
      { key: 'svc_faq6_q', label: 'FAQ 6 Question', type: 'text',     def: 'Do you provide ongoing support after launch?' },
      { key: 'svc_faq6_a', label: 'FAQ 6 Answer',   type: 'textarea', def: 'Yes. Every project includes a post launch support window and we offer retainer packages.' },
    ]},
    { group: '📣 CTA Section', fields: [
      { key: 'svc_cta_heading', label: 'CTA Heading', type: 'text',     def: "Let's Build Your Next Digital Product." },
      { key: 'svc_cta_subtext', label: 'CTA Subtext', type: 'textarea', def: 'Tell us what you want to build and we will come back with a strategy.' },
      { key: 'svc_cta_button',  label: 'Button Text', type: 'text',     def: 'Send My Project Brief' },
    ]},
  ],
  blog: [
    { group: '🌟 Hero Section', fields: [
      { key: 'blog_hero_badge',    label: 'Hero Badge',    type: 'text',     def: 'Blog & Insights' },
      { key: 'blog_hero_heading',  label: 'Hero Heading',  type: 'text',     def: 'Digital Intelligence, No Fluff.' },
      { key: 'blog_hero_subtext',  label: 'Hero Subtext',  type: 'textarea', def: 'Practical strategies on AI, development, marketing, and design — from the team that actually does it.' },
    ]},
    { group: '📝 Blog Posts', fields: [
      { key: 'blog_posts', label: 'Blog Posts', type: 'blogs', def: '' },
    ]},
    { group: '📣 CTA Section', fields: [
      { key: 'blog_cta_text',   label: 'CTA Text',   type: 'textarea', def: 'Want strategies like these implemented for your business?' },
      { key: 'blog_cta_button', label: 'CTA Button', type: 'text',     def: 'Talk to Our Team' },
    ]},
  ],
  'case-studies': [
    { group: '🌟 Hero Section', fields: [
      { key: 'cs_hero_badge',    label: 'Hero Badge',    type: 'text',     def: 'Proven Results' },
      { key: 'cs_hero_heading',  label: 'Hero Heading',  type: 'text',     def: 'Real Clients. Real Results.' },
      { key: 'cs_hero_subtext',  label: 'Hero Subtext',  type: 'textarea', def: 'Across marketing, development, and AI — these are the measurable outcomes we\'ve driven for real businesses.' },
    ]},
    { group: '📊 Case Studies', fields: [
      { key: 'case_studies', label: 'Case Studies', type: 'casestudies', def: '' },
    ]},
    { group: '📣 CTA Section', fields: [
      { key: 'cs_cta_text',   label: 'CTA Text',   type: 'textarea', def: 'Want results like these for your business?' },
      { key: 'cs_cta_button', label: 'CTA Button', type: 'text',     def: 'Start Your Project' },
    ]},
  ],
  contact: [
    { group: '🌟 Hero Section', fields: [
      { key: 'contact_hero_badge',    label: 'Hero Badge',    type: 'text',     def: 'Est. 2016 · Ahmedabad, India' },
      { key: 'contact_hero_heading',  label: 'Hero Heading',  type: 'text',     def: "Let's Grow Your Business Together" },
      { key: 'contact_hero_subtext',  label: 'Hero Subtext',  type: 'textarea', def: 'From SEO and paid ads to AI-powered web apps — Digital Aura has been delivering measurable digital growth since 2016.' },
    ]},
    { group: '📞 Contact Details', fields: [
      { key: 'contact_email',    label: 'Email',              type: 'text' },
      { key: 'contact_phone',    label: 'Phone / WhatsApp',   type: 'text' },
      { key: 'contact_whatsapp', label: 'WhatsApp (no spaces)',type: 'text' },
      { key: 'address_city',     label: 'City / Label',       type: 'text' },
      { key: 'address_full',     label: 'Full Address',       type: 'textarea' },
    ]},
    { group: '🔗 Social Links', fields: [
      { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
      { key: 'social_linkedin',  label: 'LinkedIn URL',  type: 'text' },
      { key: 'social_facebook',  label: 'Facebook URL',  type: 'text' },
    ]},
    { group: '⭐ Platform Ratings', fields: [
      { key: 'contact_rating1_platform', label: 'Rating 1 Platform', type: 'text', def: 'Google' },
      { key: 'contact_rating1_rating',   label: 'Rating 1 Score',    type: 'text', def: '5.0' },
      { key: 'contact_rating1_reviews',  label: 'Rating 1 Reviews',  type: 'text', def: '100+' },
      { key: 'contact_rating2_platform', label: 'Rating 2 Platform', type: 'text', def: 'Clutch' },
      { key: 'contact_rating2_rating',   label: 'Rating 2 Score',    type: 'text', def: '4.9' },
      { key: 'contact_rating2_reviews',  label: 'Rating 2 Reviews',  type: 'text', def: '50+' },
      { key: 'contact_rating3_platform', label: 'Rating 3 Platform', type: 'text', def: 'GoodFirms' },
      { key: 'contact_rating3_rating',   label: 'Rating 3 Score',    type: 'text', def: '4.8' },
      { key: 'contact_rating3_reviews',  label: 'Rating 3 Reviews',  type: 'text', def: '40+' },
    ]},
  ],
  'woocommerce-development': [
    { group: '🛒 Hero Section', fields: [
      { key: 'woo_hero_h1',  label: 'Hero Heading',  type: 'text',     def: 'Powerful WooCommerce Stores' },
      { key: 'woo_hero_sub', label: 'Hero Subtext',  type: 'textarea', def: 'We build flexible, scalable WooCommerce stores.' },
      { key: 'woo_cta_btn',  label: 'CTA Button',    type: 'text',     def: 'Get a Free Quote' },
    ]},
  ],
  'shopify-development': [
    { group: '🛍️ Hero Section', fields: [
      { key: 'shopify_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'High-Converting Shopify Stores' },
      { key: 'shopify_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'We design and develop Shopify stores that convert.' },
      { key: 'shopify_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Start Your Shopify Store' },
    ]},
  ],
  'bigcommerce-development': [
    { group: '🏪 Hero Section', fields: [
      { key: 'bigcommerce_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Enterprise BigCommerce Solutions' },
      { key: 'bigcommerce_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Scalable BigCommerce stores built for growth.' },
      { key: 'bigcommerce_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get a Free Quote' },
    ]},
  ],
  'web-app-development': [
    { group: '💻 Hero Section', fields: [
      { key: 'webapp_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Custom Web App Development' },
      { key: 'webapp_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'We build powerful web applications tailored to your business.' },
      { key: 'webapp_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Start Your Project' },
    ]},
  ],
  'fullstack-development': [
    { group: '🔧 Hero Section', fields: [
      { key: 'fullstack_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Full-Stack Development' },
      { key: 'fullstack_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'End-to-end development from frontend to backend.' },
      { key: 'fullstack_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get a Free Quote' },
    ]},
  ],
  'wordpress-development': [
    { group: '🌐 Hero Section', fields: [
      { key: 'wordpress_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Custom WordPress Websites' },
      { key: 'wordpress_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Fast, secure, and fully tailored WordPress sites.' },
      { key: 'wordpress_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get a Free Quote' },
    ]},
  ],
  'mobile-app-development': [
    { group: '📱 Hero Section', fields: [
      { key: 'mobileapp_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Mobile App Development' },
      { key: 'mobileapp_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Native and cross-platform mobile apps that users love.' },
      { key: 'mobileapp_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Start Your App' },
    ]},
  ],
  'ai-automation': [
    { group: '🤖 Hero Section', fields: [
      { key: 'aiauto_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'AI Automation Solutions' },
      { key: 'aiauto_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Automate workflows and boost efficiency with AI.' },
      { key: 'aiauto_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get Started' },
    ]},
  ],
  'ai-chatbot-assistant': [
    { group: '💬 Hero Section', fields: [
      { key: 'aichatbot_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'AI Chatbot & Assistant' },
      { key: 'aichatbot_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Intelligent chatbots that engage and convert.' },
      { key: 'aichatbot_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Build My Chatbot' },
    ]},
  ],
  'ai-web-apps': [
    { group: '🌐 Hero Section', fields: [
      { key: 'aiwebapp_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'AI-Powered Web Apps' },
      { key: 'aiwebapp_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Smart web applications built with AI at the core.' },
      { key: 'aiwebapp_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get Started' },
    ]},
  ],
  'custom-ai-solutions': [
    { group: '✨ Hero Section', fields: [
      { key: 'customai_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Custom AI Web Solutions' },
      { key: 'customai_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Bespoke AI solutions built for your unique needs.' },
      { key: 'customai_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Start Your AI Project' },
    ]},
  ],
  'ai-api-integration': [
    { group: '🔌 Hero Section', fields: [
      { key: 'aiapi_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'AI API Integration' },
      { key: 'aiapi_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Connect powerful AI APIs into your existing systems.' },
      { key: 'aiapi_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get Started' },
    ]},
  ],
  'chatbots-assistants': [
    { group: '🤖 Hero Section', fields: [
      { key: 'chatbots_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Chatbots & Assistants' },
      { key: 'chatbots_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Conversational AI that works 24/7 for your business.' },
      { key: 'chatbots_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Build My Chatbot' },
    ]},
  ],
  'custom-ml-models': [
    { group: '🧠 Hero Section', fields: [
      { key: 'mlmodels_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Custom ML Models' },
      { key: 'mlmodels_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Machine learning models trained on your data.' },
      { key: 'mlmodels_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get Started' },
    ]},
  ],
  'llm-powered-apps': [
    { group: '🚀 Hero Section', fields: [
      { key: 'llmapps_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'LLM-Powered Applications' },
      { key: 'llmapps_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Apps powered by the latest large language models.' },
      { key: 'llmapps_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Start Building' },
    ]},
  ],
  'workflow-automation': [
    { group: '⚙️ Hero Section', fields: [
      { key: 'workflow_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Workflow Automation' },
      { key: 'workflow_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Automate repetitive tasks and streamline your operations.' },
      { key: 'workflow_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Automate Now' },
    ]},
  ],
  'predictive-analytics': [
    { group: '📊 Hero Section', fields: [
      { key: 'predictive_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Predictive Analytics' },
      { key: 'predictive_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Data-driven insights to predict and shape your future.' },
      { key: 'predictive_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get Started' },
    ]},
  ],
  'seo-services': [
    { group: '🔍 Hero Section', fields: [
      { key: 'seo_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'SEO Services' },
      { key: 'seo_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Rank higher and drive organic traffic that converts.' },
      { key: 'seo_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Boost My Rankings' },
    ]},
  ],
  'google-ads': [
    { group: '📢 Hero Section', fields: [
      { key: 'gads_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Google Ads Management' },
      { key: 'gads_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'High-ROI Google Ads campaigns that drive real results.' },
      { key: 'gads_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Start My Campaign' },
    ]},
  ],
  'meta-ads': [
    { group: '📣 Hero Section', fields: [
      { key: 'metaads_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Meta Ads (Facebook & Instagram)' },
      { key: 'metaads_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Targeted social ads that reach your ideal customer.' },
      { key: 'metaads_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Launch My Ads' },
    ]},
  ],
  'linkedin-youtube-marketing': [
    { group: '🎬 Hero Section', fields: [
      { key: 'linkedin_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'LinkedIn & YouTube Marketing' },
      { key: 'linkedin_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'B2B and video marketing strategies that build authority.' },
      { key: 'linkedin_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Grow My Brand' },
    ]},
  ],
  'email-whatsapp-marketing': [
    { group: '📧 Hero Section', fields: [
      { key: 'emailwa_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Email & WhatsApp Marketing' },
      { key: 'emailwa_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Direct marketing campaigns that get opened and clicked.' },
      { key: 'emailwa_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Start Campaigns' },
    ]},
  ],
  'conversion-rate-optimisation': [
    { group: '📈 Hero Section', fields: [
      { key: 'cro_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Conversion Rate Optimisation' },
      { key: 'cro_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Turn more visitors into paying customers.' },
      { key: 'cro_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Boost Conversions' },
    ]},
  ],
  'digital-marketing': [
    { group: '📡 Hero Section', fields: [
      { key: 'digmkt_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Digital Marketing Services' },
      { key: 'digmkt_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Full-funnel digital marketing that drives growth.' },
      { key: 'digmkt_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Get a Strategy Call' },
    ]},
  ],
  'design-branding': [
    { group: '🎨 Hero Section', fields: [
      { key: 'design_hero_h1',  label: 'Hero Heading', type: 'text',     def: 'Design & Branding' },
      { key: 'design_hero_sub', label: 'Hero Subtext', type: 'textarea', def: 'Brand identities that make a lasting impression.' },
      { key: 'design_cta_btn',  label: 'CTA Button',   type: 'text',     def: 'Build My Brand' },
    ]},
  ],
  'engagement-models': [
    { group: '🌟 Hero Section', fields: [
      { key: 'engage_hero_badge', label: 'Hero Badge',              type: 'text', def: 'Engagement Models' },
      { key: 'engage_hero_h1',    label: 'Hero Heading',           type: 'text', def: 'Flexible Ways to' },
      { key: 'engage_hero_h1b',   label: 'Hero Heading (Highlight)', type: 'text', def: 'Work With Us' },
      { key: 'engage_hero_sub',   label: 'Hero Subtext',       type: 'textarea', def: '4 engagement models built around how businesses actually work — pick what fits your project, budget, and timeline.' },
      { key: 'engage_hero_cta',   label: 'Primary CTA Button', type: 'text',     def: 'Get a Free Recommendation' },
      { key: 'engage_hero_btn2',  label: 'Secondary Button',   type: 'text',     def: 'Explore Models' },
    ]},
    { group: '📊 Stats Strip', fields: [
      { key: 'engage_stat_0_n', label: 'Stat 1 Number', type: 'text', def: '4' },
      { key: 'engage_stat_0_l', label: 'Stat 1 Label',  type: 'text', def: 'Engagement Models' },
      { key: 'engage_stat_1_n', label: 'Stat 2 Number', type: 'text', def: '500+' },
      { key: 'engage_stat_1_l', label: 'Stat 2 Label',  type: 'text', def: 'Projects Delivered' },
      { key: 'engage_stat_2_n', label: 'Stat 3 Number', type: 'text', def: '8+' },
      { key: 'engage_stat_2_l', label: 'Stat 3 Label',  type: 'text', def: 'Years Experience' },
      { key: 'engage_stat_3_n', label: 'Stat 4 Number', type: 'text', def: '98%' },
      { key: 'engage_stat_3_l', label: 'Stat 4 Label',  type: 'text', def: 'Client Satisfaction' },
    ]},
    { group: '📋 Models Section', fields: [
      { key: 'engage_models_h2',  label: 'Section Heading',           type: 'text', def: 'Choose How We' },
      { key: 'engage_models_h2b', label: 'Section Heading (Highlight)', type: 'text', def: 'Work Together' },
      { key: 'engage_howit_h4',   label: 'How It Works Label',        type: 'text', def: 'How It Works' },
      { key: 'engage_bestfor_h4', label: 'Best For Label',            type: 'text', def: 'Best For' },
      { key: 'engage_benefits_h4', label: 'Key Benefits Label',       type: 'text', def: 'Key Benefits' },
    ]},
    { group: '📊 Comparison Section', fields: [
      { key: 'engage_cmp_h2',  label: 'Comparison Heading',           type: 'text', def: 'Side-by-Side' },
      { key: 'engage_cmp_h2b', label: 'Comparison Heading (Highlight)', type: 'text', def: 'Comparison' },
      { key: 'engage_p_4',     label: 'Comparison Subtext',           type: 'textarea', def: 'Not sure which model fits? Compare all four at a glance.' },
    ]},
    { group: '🎯 Decision Guide', fields: [
      { key: 'engage_guide_h2',  label: 'Guide Heading',              type: 'text',     def: 'Not Sure Which to' },
      { key: 'engage_guide_h2b', label: 'Guide Heading (Highlight)',   type: 'text',     def: 'Pick?' },
      { key: 'engage_p_5',       label: 'Guide Subtext',              type: 'text',     def: 'Answer one question — get a clear direction.' },
      { key: 'engage_p_6',       label: 'Guide Footer Text',          type: 'textarea', def: "Still unsure? Let's talk — we'll recommend the best model for your project, free of charge." },
      { key: 'engage_guide_cta', label: 'Guide CTA Button',           type: 'text',     def: 'Get a Free Consultation' },
    ]},
    { group: '🚀 CTA Section', fields: [
      { key: 'engage_cta_badge', label: 'CTA Badge',                  type: 'text',     def: "Let's Build Together" },
      { key: 'engage_cta_h2',   label: 'CTA Heading',                 type: 'text',     def: 'Ready to Find Your' },
      { key: 'engage_cta_h2b',  label: 'CTA Heading (Highlight)',     type: 'text',     def: 'Perfect Model' },
      { key: 'engage_p_7',      label: 'CTA Subtext',                 type: 'textarea', def: "Connect with us and we'll recommend the engagement model that fits your project, timeline, and budget — no commitment required." },
      { key: 'engage_cta_btn',  label: 'CTA Button',                  type: 'text',     def: 'Start a Conversation' },
    ]},
  ],
  careers: [
    { group: '🌟 Hero Section', fields: [
      { key: 'careers_hero_badge', label: 'Hero Badge',           type: 'text',     def: "We're Hiring · Ahmedabad" },
      { key: 'careers_hero_h1',    label: 'Hero Heading',         type: 'text',     def: 'Do Your Best Work' },
      { key: 'careers_hl_117',     label: 'Hero Heading (Highlight)', type: 'text', def: 'at Digital Aura' },
      { key: 'careers_pg_p_9',     label: 'Hero Subtext',         type: 'textarea', def: "We're a full-service digital agency delivering real growth since 2016." },
      { key: 'careers_hero_cta',   label: 'Primary CTA Button',   type: 'text',     def: 'See Open Roles' },
      { key: 'careers_hero_btn2',  label: 'Secondary Button',     type: 'text',     def: 'Send Open Application' },
    ]},
    { group: '📊 Stats Bar', fields: [
      { key: 'careers_stat_0_n', label: 'Stat 1 Number', type: 'text', def: '8+' },
      { key: 'careers_stat_0_l', label: 'Stat 1 Label',  type: 'text', def: 'Years in Business' },
      { key: 'careers_stat_1_n', label: 'Stat 2 Number', type: 'text', def: '10+' },
      { key: 'careers_stat_1_l', label: 'Stat 2 Label',  type: 'text', def: 'Team Members' },
      { key: 'careers_stat_2_n', label: 'Stat 3 Number', type: 'text', def: '500+' },
      { key: 'careers_stat_2_l', label: 'Stat 3 Label',  type: 'text', def: 'Happy Clients' },
      { key: 'careers_stat_3_n', label: 'Stat 4 Number', type: 'text', def: '2' },
      { key: 'careers_stat_3_l', label: 'Stat 4 Label',  type: 'text', def: 'Office Locations' },
    ]},
    { group: '🎁 Why Join Us', fields: [
      { key: 'careers_life_h2',    label: 'Section Heading',      type: 'text',     def: 'Why People Love' },
      { key: 'careers_hl_118',     label: 'Section Heading (Highlight)', type: 'text', def: 'Working Here' },
      { key: 'careers_pg_5',       label: 'Section Subtext',      type: 'textarea', def: "We're not just a workplace — we're a place where careers are built." },
      { key: 'careers_perk_0_t',   label: 'Perk 1 Title',         type: 'text',     def: 'Real Client Work' },
      { key: 'careers_perk_0_d',   label: 'Perk 1 Description',   type: 'textarea', def: 'Work on live campaigns with 500+ real clients.' },
      { key: 'careers_perk_1_t',   label: 'Perk 2 Title',         type: 'text',     def: 'Tight-Knit Team' },
      { key: 'careers_perk_1_d',   label: 'Perk 2 Description',   type: 'textarea', def: 'Small enough that your work matters.' },
      { key: 'careers_perk_2_t',   label: 'Perk 3 Title',         type: 'text',     def: 'AI-First Mindset' },
      { key: 'careers_perk_2_d',   label: 'Perk 3 Description',   type: 'textarea', def: 'From AI-powered SEO to LLM apps — we use the newest tools.' },
      { key: 'careers_perk_3_t',   label: 'Perk 4 Title',         type: 'text',     def: 'Culture First' },
      { key: 'careers_perk_3_d',   label: 'Perk 4 Description',   type: 'textarea', def: 'Equal opportunities, open communication.' },
      { key: 'careers_perk_4_t',   label: 'Perk 5 Title',         type: 'text',     def: 'Stable & Growing' },
      { key: 'careers_perk_4_d',   label: 'Perk 5 Description',   type: 'textarea', def: '8+ years in business, 500+ clients, 2 offices.' },
      { key: 'careers_perk_5_t',   label: 'Perk 6 Title',         type: 'text',     def: 'Your Voice Matters' },
      { key: 'careers_perk_5_d',   label: 'Perk 6 Description',   type: 'textarea', def: 'Flat enough that great ideas from anyone get heard.' },
    ]},
    { group: '🏢 Culture Strip', fields: [
      { key: 'careers_culture_badge', label: 'Culture Badge',     type: 'text',     def: 'Our Culture' },
      { key: 'careers_side_h2',       label: 'Culture Heading',   type: 'textarea', def: '"Equal Opportunities. Sheer Dedication."' },
      { key: 'careers_pg_p_10',       label: 'Culture Subtext',   type: 'textarea', def: 'Our doors are always open to individuals with the right attitude.' },
      { key: 'careers_val_0',         label: 'Value 1',           type: 'text',     def: "We don't do cookie-cutter work — ever." },
      { key: 'careers_val_1',         label: 'Value 2',           type: 'text',     def: "Every team member's growth is our growth." },
      { key: 'careers_val_2',         label: 'Value 3',           type: 'text',     def: 'Open doors, honest conversations always.' },
      { key: 'careers_val_3',         label: 'Value 4',           type: 'text',     def: 'Work hard, ship fast, learn continuously.' },
    ]},
    { group: '💼 Open Positions', fields: [
      { key: 'careers_jobs_h2',    label: 'Section Heading',      type: 'text',     def: 'Current' },
      { key: 'careers_hl_119',     label: 'Section Heading (Highlight)', type: 'text', def: 'Openings' },
      { key: 'careers_pg_6',       label: 'Section Subtext',      type: 'textarea', def: 'Based in Ahmedabad. Freshers welcome on select roles.' },
      { key: 'careers_pg_p_11',    label: 'No Openings Text',     type: 'textarea', def: 'No open positions right now. Check back soon!' },
      { key: 'careers_pg_2',       label: 'Open App Heading',     type: 'text',     def: "Don't See the Right Role?" },
      { key: 'careers_pg_p_12',    label: 'Open App Subtext',     type: 'textarea', def: "We're always open to exceptional people." },
      { key: 'careers_resume_btn', label: 'Send Resume Button',   type: 'text',     def: 'Send Your Resume' },
    ]},
    { group: '🚀 CTA Section', fields: [
      { key: 'careers_cta_badge', label: 'CTA Badge',             type: 'text',     def: 'Join the Team' },
      { key: 'careers_cta_h2',   label: 'CTA Heading',            type: 'text',     def: 'Ready to' },
      { key: 'careers_hl_120',   label: 'CTA Heading (Highlight)', type: 'text',    def: 'Build Something' },
      { key: 'careers_cta_h2b',  label: 'CTA Heading End',        type: 'text',     def: 'Great?' },
      { key: 'careers_pg_p_13',  label: 'CTA Subtext',            type: 'textarea', def: 'Explore the roles above or drop us a direct message.' },
      { key: 'careers_cta_btn',  label: 'CTA Button',             type: 'text',     def: 'Get In Touch' },
    ]},
  ],
  _all: [
    { group: '🖼️ Logo & Branding', fields: [
      { key: 'site_logo', label: 'Site Logo', type: 'image', def: '' },
    ]},
    { group: '🦶 Footer', fields: [
      { key: 'footer_tagline',   label: 'Footer Badge',       type: 'text' },
      { key: 'footer_desc',      label: 'Footer Description', type: 'textarea' },
      { key: 'footer_copyright', label: 'Copyright Text',     type: 'text' },
      { key: 'address_full',     label: 'Office Address',     type: 'textarea' },
      { key: 'address_city',     label: 'Office City Label',  type: 'text' },
    ]},
    { group: '🔗 Social Media', fields: [
      { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
      { key: 'social_linkedin',  label: 'LinkedIn URL',  type: 'text' },
      { key: 'social_facebook',  label: 'Facebook URL',  type: 'text' },
      { key: 'social_twitter',   label: 'Twitter URL',   type: 'text' },
    ]},
    { group: '⚙️ Site Info', fields: [
      { key: 'site_name',    label: 'Site Name',    type: 'text' },
      { key: 'site_tagline', label: 'Site Tagline', type: 'text' },
    ]},
  ],
};

/* ─── Utils ─── */
const rgbToHex = (rgb='') => {
  const m = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return '';
  return '#'+[m[1],m[2],m[3]].map(n=>parseInt(n).toString(16).padStart(2,'0')).join('');
};
const px = s => parseFloat(s)||0;

/* ─── Atomic inputs ─── */
function NumInput({value,onChange,unit='px',min=0,max=999}) {
  return (
    <div style={{display:'flex',alignItems:'center',background:'#1E293B',border:'1px solid #334155',borderRadius:6,overflow:'hidden',height:30}}>
      <input type="number" min={min} max={max} value={parseFloat(value)||''} onChange={e=>onChange(parseFloat(e.target.value))}
        style={{flex:1,background:'transparent',border:'none',color:'#E2E8F0',fontSize:12,padding:'0 6px',outline:'none',width:0}}/>
      {unit&&<span style={{fontSize:9,color:'#475569',padding:'0 5px',borderLeft:'1px solid #334155'}}>{unit}</span>}
    </div>
  );
}
function ColorInput({value,onChange}) {
  return (
    <div style={{display:'flex',gap:6,alignItems:'center'}}>
      <input type="color" value={value||'#000000'} onChange={e=>onChange(e.target.value)}
        style={{width:28,height:28,border:'none',borderRadius:4,cursor:'pointer',padding:2,background:'#1E293B',flexShrink:0}}/>
      <input type="text" value={value||''} onChange={e=>onChange(e.target.value)} placeholder="#000000"
        style={{flex:1,background:'#1E293B',border:'1px solid #334155',borderRadius:5,color:'#E2E8F0',fontSize:11,padding:'4px 7px',outline:'none'}}/>
    </div>
  );
}
function SelectInput({value,onChange,options}) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{width:'100%',background:'#1E293B',border:'1px solid #334155',borderRadius:5,color:'#E2E8F0',fontSize:11,padding:'5px 7px',outline:'none'}}>
      {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}
function ToggleBtn({active,onClick,children,title}) {
  return (
    <button title={title} onClick={onClick}
      style={{flex:1,padding:'5px 0',background:active?'rgba(255,107,43,0.15)':'#1E293B',border:`1px solid ${active?'#FF6B2B':'#334155'}`,borderRadius:5,color:active?'#FF6B2B':'#64748B',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
      {children}
    </button>
  );
}

function TagsInput({value, onChange}) {
  const tags = value ? value.split(',').map(t=>t.trim()).filter(Boolean) : [];
  const [input, setInput] = useState('');
  const add = () => {
    const t = input.trim();
    if (!t) return;
    onChange([...tags, t].join(','));
    setInput('');
  };
  const remove = (i) => onChange(tags.filter((_,idx)=>idx!==i).join(','));
  return (
    <div>
      <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:6}}>
        {tags.map((t,i)=>(
          <span key={i} style={{display:'flex',alignItems:'center',gap:3,background:'rgba(255,107,43,0.15)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:4,padding:'2px 6px',fontSize:10,color:'#FF6B2B'}}>
            {t}<button onClick={()=>remove(i)} style={{background:'none',border:'none',cursor:'pointer',color:'#FF6B2B',fontSize:12,padding:0,lineHeight:1}}>×</button>
          </span>
        ))}
      </div>
      <div style={{display:'flex',gap:4}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();add();}}} placeholder="Add tag, press Enter"
          style={{flex:1,padding:'5px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:5,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
        <button onClick={add} style={{padding:'5px 8px',background:'rgba(255,107,43,0.15)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,color:'#FF6B2B',cursor:'pointer',fontSize:11}}>+</button>
      </div>
    </div>
  );
}

const TEAM_COLORS = ["#1A6FE8","#7C3AED","#22C55E","#FF6B2B","#F59E0B","#EC4899"];
const DEFAULT_TEAM_JSON = JSON.stringify([
  {name:"Jaspreet Singh",role:"Web Design & Dev Project Manager",color:"#1A6FE8",ai:false,photo:""},
  {name:"Swayam Parikh",role:"AI Full Stack Developer",color:"#7C3AED",ai:true,photo:""},
  {name:"Jinali Lodariya",role:"SEO Executive",color:"#22C55E",ai:false,photo:""},
  {name:"Nitiksha Motivaras",role:"Social Media Manager",color:"#FF6B2B",ai:false,photo:""},
  {name:"Nidhi Changela",role:"SEO Executive",color:"#1A6FE8",ai:false,photo:""},
  {name:"Satish Prajapati",role:"Digital Marketing Executive",color:"#F59E0B",ai:false,photo:""},
  {name:"Ritu Boharwal",role:"Digital Marketing Executive",color:"#EC4899",ai:false,photo:""},
  {name:"Dharmik Akhani",role:"Business Development Executive",color:"#22C55E",ai:false,photo:"https://thedigitalaura.com/wp-content/uploads/2024/09/Dharmik-740x897.jpg"},
  {name:"Neha Panchal",role:"HR Executive",color:"#FF6B2B",ai:false,photo:""},
  {name:"Abhishek Kaushal",role:"Shopify Developer",color:"#7C3AED",ai:false,photo:""},
]);

function TeamEditor({value, onChange}) {
  const members = (() => { try { if(value) return JSON.parse(value); } catch {} try { return JSON.parse(DEFAULT_TEAM_JSON); } catch {} return []; })();
  const save = (u) => onChange(JSON.stringify(u));
  const upd = (i,f,v) => { const m=[...members]; m[i]={...m[i],[f]:v}; save(m); };
  const remove = (i) => save(members.filter((_,idx)=>idx!==i));
  const add = () => save([...members,{name:"New Member",role:"Role",color:TEAM_COLORS[members.length%6],ai:false,photo:""}]);
  return (
    <div>
      {members.map((m,i)=>(
        <div key={i} style={{background:'#0A1628',border:'1px solid #1E293B',borderRadius:6,padding:'8px',marginBottom:6}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
            <span style={{fontSize:10,fontWeight:700,color:'#94A3B8'}}>#{i+1} {m.name}</span>
            <button onClick={()=>remove(i)} style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:4,color:'#ef4444',cursor:'pointer',fontSize:10,padding:'1px 6px'}}>✕ Remove</button>
          </div>
          <input value={m.name} onChange={e=>upd(i,'name',e.target.value)} placeholder="Name"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <input value={m.role} onChange={e=>upd(i,'role',e.target.value)} placeholder="Role"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <input value={m.photo} onChange={e=>upd(i,'photo',e.target.value)} placeholder="Photo URL (optional)"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <select value={m.color} onChange={e=>upd(i,'color',e.target.value)}
              style={{flex:1,padding:'4px 6px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}>
              {TEAM_COLORS.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <label style={{display:'flex',alignItems:'center',gap:4,fontSize:10,color:'#94A3B8',cursor:'pointer'}}>
              <input type="checkbox" checked={!!m.ai} onChange={e=>upd(i,'ai',e.target.checked)}/> AI
            </label>
          </div>
        </div>
      ))}
      <button onClick={add} style={{width:'100%',padding:'6px',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,color:'#FF6B2B',cursor:'pointer',fontSize:11,fontWeight:700}}>+ Add Member</button>
    </div>
  );
}

const COLORS6 = ["#7C3AED","#FF6B2B","#1A6FE8","#22C55E","#F59E0B","#EC4899"];

function TestimonialsEditor({value, onChange}) {
  const items = (() => { try { if(value) return JSON.parse(value); } catch {} return [
    {quote:"Digital Aura is the best digital marketing agency in Ahmedabad.",name:"Shweta Sultania",service:"Web Design & Development",color:"#7C3AED"},
    {quote:"Working with Digital Aura for over a year. Very satisfied.",name:"Bharat Chavda",service:"SEO & Paid Ads",color:"#FF6B2B"},
    {quote:"They ranked our keywords high on search engines.",name:"Stephen Conolly",service:"SEO Services",color:"#1A6FE8"},
  ]; })();
  const save = (u) => onChange(JSON.stringify(u));
  const upd = (i,f,v) => { const m=[...items]; m[i]={...m[i],[f]:v}; save(m); };
  const remove = (i) => save(items.filter((_,idx)=>idx!==i));
  const add = () => save([...items,{quote:"Great service!",name:"Client Name",service:"Service Type",color:COLORS6[items.length%6]}]);
  return (
    <div>
      {items.map((t,i)=>(
        <div key={i} style={{background:'#0A1628',border:'1px solid #1E293B',borderRadius:6,padding:'8px',marginBottom:6}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <span style={{fontSize:10,color:'#94A3B8',fontWeight:700}}>#{i+1} {t.name}</span>
            <button onClick={()=>remove(i)} style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:4,color:'#ef4444',cursor:'pointer',fontSize:10,padding:'1px 6px'}}>✕</button>
          </div>
          <textarea value={t.quote} onChange={e=>upd(i,'quote',e.target.value)} rows={2} placeholder="Quote"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
          <input value={t.name} onChange={e=>upd(i,'name',e.target.value)} placeholder="Name"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <input value={t.service} onChange={e=>upd(i,'service',e.target.value)} placeholder="Service / Role"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <select value={t.color} onChange={e=>upd(i,'color',e.target.value)}
            style={{width:'100%',padding:'4px 6px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}>
            {COLORS6.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      ))}
      <button onClick={add} style={{width:'100%',padding:'6px',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,color:'#FF6B2B',cursor:'pointer',fontSize:11,fontWeight:700}}>+ Add Testimonial</button>
    </div>
  );
}

function PlatformsEditor({value, onChange}) {
  const items = (() => { try { if(value) return JSON.parse(value); } catch {} return [
    {name:"Clutch",rating:"4.9",reviews:"50+",tagline:"Best of Clutch · Digital Marketing 2025",color:"#E8251A"},
    {name:"GoodFirms",rating:"4.8",reviews:"40+",tagline:"Top Digital Marketing Company",color:"#2E86DE"},
    {name:"DesignRush",rating:"4.7",reviews:"30+",tagline:"Best Digital Marketing Agencies",color:"#6C47FF"},
    {name:"Google",rating:"5.0",reviews:"100+",tagline:"Google Reviews",color:"#4285F4"},
  ]; })();
  const save = (u) => onChange(JSON.stringify(u));
  const upd = (i,f,v) => { const m=[...items]; m[i]={...m[i],[f]:v}; save(m); };
  const remove = (i) => save(items.filter((_,idx)=>idx!==i));
  const add = () => save([...items,{name:"Platform",rating:"5.0",reviews:"10+",tagline:"Top Agency",color:"#22C55E"}]);
  return (
    <div>
      {items.map((p,i)=>(
        <div key={i} style={{background:'#0A1628',border:'1px solid #1E293B',borderRadius:6,padding:'8px',marginBottom:6}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <span style={{fontSize:10,color:'#94A3B8',fontWeight:700}}>{p.name}</span>
            <button onClick={()=>remove(i)} style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:4,color:'#ef4444',cursor:'pointer',fontSize:10,padding:'1px 6px'}}>✕</button>
          </div>
          <input value={p.name} onChange={e=>upd(i,'name',e.target.value)} placeholder="Platform name"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <input value={p.tagline} onChange={e=>upd(i,'tagline',e.target.value)} placeholder="Tagline"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,marginBottom:4}}>
            <input value={p.rating} onChange={e=>upd(i,'rating',e.target.value)} placeholder="4.9"
              style={{padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
            <input value={p.reviews} onChange={e=>upd(i,'reviews',e.target.value)} placeholder="50+"
              style={{padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
          </div>
          <div style={{display:'flex',gap:6,alignItems:'center'}}>
            <input type="color" value={p.color} onChange={e=>upd(i,'color',e.target.value)} style={{width:28,height:28,border:'none',borderRadius:4,cursor:'pointer'}}/>
            <input value={p.color} onChange={e=>upd(i,'color',e.target.value)}
              style={{flex:1,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
          </div>
        </div>
      ))}
      <button onClick={add} style={{width:'100%',padding:'6px',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,color:'#FF6B2B',cursor:'pointer',fontSize:11,fontWeight:700}}>+ Add Platform</button>
    </div>
  );
}

function ClientsEditor({value, onChange}) {
  const items = (() => { try { if(value) return JSON.parse(value); } catch {} return ["Healthcare","Restaurants","Real Estate","eCommerce","Education","Home Services","Retail","Ophthalmology","IVF Clinics","Fitness","Pest Control","Travel"]; })();
  const save = (u) => onChange(JSON.stringify(u));
  const upd = (i,v) => { const m=[...items]; m[i]=v; save(m); };
  const remove = (i) => save(items.filter((_,idx)=>idx!==i));
  const add = () => save([...items,"New Industry"]);
  return (
    <div>
      {items.map((c,i)=>(
        <div key={i} style={{display:'flex',gap:4,marginBottom:4}}>
          <input value={c} onChange={e=>upd(i,e.target.value)}
            style={{flex:1,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
          <button onClick={()=>remove(i)} style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:4,color:'#ef4444',cursor:'pointer',fontSize:11,padding:'0 7px'}}>✕</button>
        </div>
      ))}
      <button onClick={add} style={{width:'100%',padding:'6px',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,color:'#FF6B2B',cursor:'pointer',fontSize:11,fontWeight:700}}>+ Add Industry</button>
    </div>
  );
}

function BlogsEditor({value, onChange}) {
  const DEFAULT = [
    {category:"SEO",title:"10 SEO Strategies That Will Dominate Google in 2025",excerpt:"AI generated content, EEAT signals, and Core Web Vitals — here's what's actually moving the needle.",date:"Mar 28, 2025",readTime:"6 min read"},
    {category:"Meta Ads",title:"How Meta Ads Can Triple Your Leads in 30 Days",excerpt:"A breakdown of the exact audience structure, creative format, and bidding strategy we use to hit 3x ROAS consistently.",date:"Mar 15, 2025",readTime:"8 min read"},
    {category:"Google Ads",title:"Why Your Google Ads Are Losing Money (And How to Fix It)",excerpt:"The 5 most common mistakes that drain ad budgets — and the exact fixes that save clients lakhs every month.",date:"Feb 20, 2025",readTime:"7 min read"},
  ];
  const items = (() => { try { if(value) return JSON.parse(value); } catch {} return DEFAULT; })();
  const save = (u) => onChange(JSON.stringify(u));
  const upd = (i,f,v) => { const m=[...items]; m[i]={...m[i],[f]:v}; save(m); };
  const remove = (i) => save(items.filter((_,idx)=>idx!==i));
  const add = () => save([...items,{category:"Category",title:"New Blog Post Title",excerpt:"Short description of the post.",date:"Jan 1, 2025",readTime:"5 min read"}]);
  return (
    <div>
      {items.map((b,i)=>(
        <div key={i} style={{background:'#0A1628',border:'1px solid #1E293B',borderRadius:6,padding:'8px',marginBottom:6}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <span style={{fontSize:10,color:'#94A3B8',fontWeight:700}}>#{i+1}</span>
            <button onClick={()=>remove(i)} style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:4,color:'#ef4444',cursor:'pointer',fontSize:10,padding:'1px 6px'}}>✕</button>
          </div>
          <input value={b.category} onChange={e=>upd(i,'category',e.target.value)} placeholder="Category"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <input value={b.title} onChange={e=>upd(i,'title',e.target.value)} placeholder="Blog Title"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <textarea value={b.excerpt} onChange={e=>upd(i,'excerpt',e.target.value)} rows={2} placeholder="Excerpt"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
            <input value={b.date} onChange={e=>upd(i,'date',e.target.value)} placeholder="Mar 28, 2025"
              style={{padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
            <input value={b.readTime} onChange={e=>upd(i,'readTime',e.target.value)} placeholder="6 min read"
              style={{padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
          </div>
        </div>
      ))}
      <button onClick={add} style={{width:'100%',padding:'6px',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,color:'#FF6B2B',cursor:'pointer',fontSize:11,fontWeight:700}}>+ Add Blog Post</button>
    </div>
  );
}

function CaseStudiesEditor({value, onChange}) {
  const DEFAULT = [
    {tag:"Healthcare · SEO",badge:"+76.7% Traffic",title:"IVF Hospital, Organic Growth",statBig:"+76.7%",desc:"Targeted SEO and content authority building drove a 76.7% organic traffic increase in 6 months.",services:"Technical SEO,Content Strategy,Local SEO"},
    {tag:"Healthcare · Digital Marketing",badge:"+120% Traffic",title:"Eye Hospital, Full Funnel Growth",statBig:"+120%",desc:"Integrated Google Ads, Meta Ads, and a conversion optimised website drove 120% traffic growth.",services:"Google Ads,Meta Ads,Web Design"},
    {tag:"Home Services · Ads + SEO",badge:"+174.5% Traffic",title:"Home Appliance Repair, Local Dominance",statBig:"+174.5%",desc:"Local SEO, Meta Ads, and conversion optimised landing pages generated a 174.5% traffic surge.",services:"Local SEO,Meta Ads,Landing Pages"},
  ];
  const items = (() => { try { if(value) return JSON.parse(value); } catch {} return DEFAULT; })();
  const save = (u) => onChange(JSON.stringify(u));
  const upd = (i,f,v) => { const m=[...items]; m[i]={...m[i],[f]:v}; save(m); };
  const remove = (i) => save(items.filter((_,idx)=>idx!==i));
  const add = () => save([...items,{tag:"Industry · Service",badge:"+XX% Result",title:"Client Name, Short Result",statBig:"+XX%",desc:"Description of the result.",services:"Service 1,Service 2"}]);
  return (
    <div>
      {items.map((c,i)=>(
        <div key={i} style={{background:'#0A1628',border:'1px solid #1E293B',borderRadius:6,padding:'8px',marginBottom:6}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <span style={{fontSize:10,color:'#94A3B8',fontWeight:700}}>#{i+1}</span>
            <button onClick={()=>remove(i)} style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:4,color:'#ef4444',cursor:'pointer',fontSize:10,padding:'1px 6px'}}>✕</button>
          </div>
          <input value={c.tag} onChange={e=>upd(i,'tag',e.target.value)} placeholder="Tag (e.g. Healthcare · SEO)"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <input value={c.title} onChange={e=>upd(i,'title',e.target.value)} placeholder="Title"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,marginBottom:4}}>
            <input value={c.badge} onChange={e=>upd(i,'badge',e.target.value)} placeholder="+76.7% Traffic"
              style={{padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
            <input value={c.statBig} onChange={e=>upd(i,'statBig',e.target.value)} placeholder="+76.7%"
              style={{padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
          </div>
          <textarea value={c.desc} onChange={e=>upd(i,'desc',e.target.value)} rows={2} placeholder="Description"
            style={{width:'100%',marginBottom:4,padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
          <input value={c.services} onChange={e=>upd(i,'services',e.target.value)} placeholder="Services (comma-separated)"
            style={{width:'100%',padding:'4px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:4,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
        </div>
      ))}
      <button onClick={add} style={{width:'100%',padding:'6px',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,color:'#FF6B2B',cursor:'pointer',fontSize:11,fontWeight:700}}>+ Add Case Study</button>
    </div>
  );
}

function ImageUpload({fieldKey, currentUrl, onSaved}) {
  const [uploading, setUploading] = useState(false);
  const previewUrl = currentUrl ? `${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}${currentUrl}` : '';
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await api.post('/media', form, {headers:{'Content-Type':'multipart/form-data'}});
      onSaved(res.data.data.url);
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };
  return (
    <div>
      {previewUrl && <img src={previewUrl} alt="logo" style={{height:48,objectFit:'contain',marginBottom:6,background:'#fff',borderRadius:5,padding:4,display:'block'}}/>}
      <label style={{display:'flex',alignItems:'center',gap:6,padding:'6px 10px',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:5,cursor:'pointer',fontSize:11,color:'#FF6B2B',fontWeight:700}}>
        {uploading ? 'Uploading…' : '📁 Choose Image'}
        <input type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} disabled={uploading}/>
      </label>
    </div>
  );
}

function Accordion({title,defaultOpen=true,children}) {
  const [open,setOpen]=useState(defaultOpen);
  return (
    <div style={{borderBottom:'1px solid #1E293B',paddingBottom:open?8:0,marginBottom:4}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:'100%',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:6,padding:'6px 0',marginBottom:open?6:0}}>
        <span style={{fontSize:10,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.07em',flex:1,textAlign:'left'}}>{title}</span>
        {open?<ChevronDown size={10} color="#334155"/>:<ChevronR size={10} color="#334155"/>}
      </button>
      {open&&children}
    </div>
  );
}

/* ─── Style Panel (reused in both element-select mode and field style toggle) ─── */
function StylePanel({st, pushStyleFn}) {
  return (
    <>
      <Accordion title="Typography">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:6}}>
          <div>
            <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Size</div>
            <NumInput value={st.fontSize} onChange={v=>pushStyleFn('fontSize',v)} unit="px"/>
          </div>
          <div>
            <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Weight</div>
            <SelectInput value={st.fontWeight||'400'} onChange={v=>pushStyleFn('fontWeight',v)} options={[
              {v:'300',l:'Light'},{v:'400',l:'Regular'},{v:'500',l:'Medium'},
              {v:'600',l:'SemiBold'},{v:'700',l:'Bold'},{v:'800',l:'ExtraBold'},{v:'900',l:'Black'}
            ]}/>
          </div>
        </div>
        <div style={{marginBottom:6}}>
          <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Color</div>
          <ColorInput value={st.color} onChange={v=>pushStyleFn('color',v)}/>
        </div>
        <div style={{marginBottom:6}}>
          <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Alignment</div>
          <div style={{display:'flex',gap:4}}>
            <ToggleBtn active={st.textAlign==='left'}   onClick={()=>pushStyleFn('textAlign','left')}   title="Left"><AlignLeft size={12}/></ToggleBtn>
            <ToggleBtn active={st.textAlign==='center'} onClick={()=>pushStyleFn('textAlign','center')} title="Center"><AlignCenter size={12}/></ToggleBtn>
            <ToggleBtn active={st.textAlign==='right'}  onClick={()=>pushStyleFn('textAlign','right')}  title="Right"><AlignRight size={12}/></ToggleBtn>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:6}}>
          <div>
            <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Style</div>
            <div style={{display:'flex',gap:4}}>
              <ToggleBtn active={st.fontStyle==='italic'} onClick={()=>pushStyleFn('fontStyle',st.fontStyle==='italic'?'normal':'italic')} title="Italic"><em style={{fontSize:12}}>I</em></ToggleBtn>
              <ToggleBtn active={st.underline} onClick={()=>pushStyleFn('underline',!st.underline)} title="Underline"><u style={{fontSize:12}}>U</u></ToggleBtn>
            </div>
          </div>
          <div>
            <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Line H</div>
            <NumInput value={st.lineHeight} onChange={v=>pushStyleFn('lineHeight',v)} unit="" min={0.5} max={5}/>
          </div>
        </div>
        <div>
          <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Letter Spacing</div>
          <NumInput value={st.letterSpacing} onChange={v=>pushStyleFn('letterSpacing',v)} unit="px" min={-5} max={20}/>
        </div>
      </Accordion>
      <Accordion title="Spacing">
        <div style={{marginBottom:6}}>
          <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Padding</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
            {[['paddingTop','Top'],['paddingRight','Right'],['paddingBottom','Bot'],['paddingLeft','Left']].map(([k,l])=>(
              <div key={k}><div style={{fontSize:8,color:'#334155',marginBottom:2}}>{l}</div><NumInput value={st[k]} onChange={v=>pushStyleFn(k,v)} unit="px"/></div>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Margin</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
            {[['marginTop','Top'],['marginBottom','Bot']].map(([k,l])=>(
              <div key={k}><div style={{fontSize:8,color:'#334155',marginBottom:2}}>{l}</div><NumInput value={st[k]} onChange={v=>pushStyleFn(k,v)} unit="px"/></div>
            ))}
          </div>
        </div>
      </Accordion>
      <Accordion title="Appearance">
        <div style={{marginBottom:6}}>
          <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Background</div>
          <ColorInput value={st.bgColor} onChange={v=>pushStyleFn('bgColor',v)}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:6}}>
          <div>
            <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Radius</div>
            <NumInput value={st.borderRadius} onChange={v=>pushStyleFn('borderRadius',v)} unit="px"/>
          </div>
          <div>
            <div style={{fontSize:9,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Opacity</div>
            <NumInput value={Math.round((st.opacity||1)*100)} onChange={v=>pushStyleFn('opacity',v/100)} unit="%" min={0} max={100}/>
          </div>
        </div>
      </Accordion>
    </>
  );
}

/* ─── Icon Panel ─── */
const POPULAR_ICONS = [
  'Star','Heart','Zap','Shield','Target','Globe','Users','TrendingUp','BarChart3','Check',
  'CheckCircle2','ArrowRight','ArrowLeft','Plus','Minus','X','Search','Settings','Mail',
  'Phone','MapPin','Clock','Calendar','Camera','Code','Database','Server','Cpu','Wifi',
  'Lock','Unlock','Eye','EyeOff','Bell','BellOff','Bookmark','Tag','Flag','Award',
  'Trophy','Lightbulb','Layers','Grid','Layout','Sidebar','Monitor','Smartphone','Tablet',
  'Download','Upload','Share2','Copy','Edit','Trash2','RefreshCw','RotateCcw','Loader',
  'AlertCircle','AlertTriangle','Info','HelpCircle','MessageCircle','MessageSquare','Send',
  'DollarSign','CreditCard','ShoppingCart','ShoppingBag','Package','Box','Archive',
  'Truck','Plane','Rocket','Compass','Map','Navigation','Home','Building2','Briefcase',
  'BookOpen','FileText','Image','Video','Music','Mic','Headphones','Printer',
  'ChevronDown','ChevronUp','ChevronLeft','ChevronRight','ExternalLink','Link',
  'Github','Twitter','Linkedin','Instagram','Facebook','Youtube',
  'Sparkles','Wand2','Palette','PenTool','Scissors','Crop',
  'Sun','Moon','Cloud','Wind','Umbrella','Thermometer',
  'Battery','BatteryCharging','Power','Plug','Flashlight',
];

function IconPanel({iconState, onChange}) {
  const [search, setSearch] = React.useState('');
  const [tab, setTab] = React.useState('library'); // 'library' | 'upload'
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');
  const fileRef = React.useRef(null);
  const filtered = search ? POPULAR_ICONS.filter(n=>n.toLowerCase().includes(search.toLowerCase())) : POPULAR_ICONS;
  const isImageIcon = (iconState.name||'').startsWith('url:');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/image\/(png|jpeg|jpg|svg\+xml|webp|gif)/)) {
      setUploadError('Please upload PNG, JPG, SVG, WebP, or GIF');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File too large (max 2MB)');
      return;
    }
    setUploadError('');
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        onChange('name', `url:${dataUrl}`);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch(err) {
      setUploadError('Upload failed');
      setUploading(false);
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      {/* Tab switcher */}
      <div style={{display:'flex',gap:0,borderRadius:8,overflow:'hidden',border:'1px solid #334155'}}>
        <button onClick={()=>setTab('library')}
          style={{flex:1,padding:'7px 0',fontSize:11,fontWeight:700,cursor:'pointer',border:'none',
            background:tab==='library'?'#FF6B2B':'#1E293B',
            color:tab==='library'?'#fff':'#94A3B8',transition:'all 0.15s'}}>
          📚 Library
        </button>
        <button onClick={()=>setTab('upload')}
          style={{flex:1,padding:'7px 0',fontSize:11,fontWeight:700,cursor:'pointer',border:'none',
            background:tab==='upload'?'#FF6B2B':'#1E293B',
            color:tab==='upload'?'#fff':'#94A3B8',transition:'all 0.15s'}}>
          ⬆ Upload
        </button>
      </div>

      {tab==='library' && (
        <div>
          <div style={{fontSize:9,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:6}}>Icon Name</div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search icons..."
            style={{width:'100%',padding:'7px 10px',background:'#1E293B',border:'1px solid #334155',borderRadius:7,color:'#E2E8F0',fontSize:12,outline:'none',boxSizing:'border-box',marginBottom:8}}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:4,maxHeight:220,overflowY:'auto',padding:2}}>
            {filtered.slice(0,100).map(name=>{
              const isSelected = (iconState.name||'') === name;
              return (
                <button key={name} title={name} onClick={()=>onChange('name',name)}
                  style={{padding:'8px 4px',background:isSelected?'rgba(255,107,43,0.15)':'#1E293B',border:`1px solid ${isSelected?'#FF6B2B':'#334155'}`,borderRadius:6,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,transition:'all 0.1s'}}>
                  <span style={{fontSize:9,color:isSelected?'#FF6B2B':'#64748B',fontWeight:600}}>{name.slice(0,6)}</span>
                </button>
              );
            })}
          </div>
          <div style={{fontSize:10,color:'#64748B',marginTop:4}}>Current: <strong style={{color:'#FF6B2B'}}>{isImageIcon?'Custom Image':iconState.name||'—'}</strong></div>
        </div>
      )}

      {tab==='upload' && (
        <div>
          <div style={{fontSize:9,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:8}}>Upload Custom Icon</div>
          {/* Drop zone */}
          <div
            onClick={()=>fileRef.current?.click()}
            onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor='#FF6B2B';}}
            onDragLeave={e=>{e.currentTarget.style.borderColor='#334155';}}
            onDrop={e=>{
              e.preventDefault();
              e.currentTarget.style.borderColor='#334155';
              const dt = e.dataTransfer;
              if (dt.files[0]) { handleFileUpload({target:{files:dt.files}}); }
            }}
            style={{border:'2px dashed #334155',borderRadius:10,padding:'24px 12px',textAlign:'center',cursor:'pointer',
              background:'#0F172A',transition:'border-color 0.15s'}}>
            {isImageIcon ? (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
                <img src={iconState.name.slice(4)} alt="current icon" style={{width:48,height:48,objectFit:'contain',borderRadius:6,background:'#1E293B',padding:4}}/>
                <span style={{fontSize:10,color:'#64748B'}}>Click or drag to replace</span>
              </div>
            ) : (
              <div>
                <div style={{fontSize:28,marginBottom:6}}>🖼</div>
                <div style={{fontSize:12,color:'#94A3B8',fontWeight:600}}>Click or drag & drop</div>
                <div style={{fontSize:10,color:'#64748B',marginTop:4}}>PNG, JPG, SVG, WebP · Max 2MB</div>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp,image/gif"
            onChange={handleFileUpload} style={{display:'none'}}/>
          {uploading && <div style={{fontSize:11,color:'#FF6B2B',marginTop:6,textAlign:'center'}}>Uploading...</div>}
          {uploadError && <div style={{fontSize:11,color:'#EF4444',marginTop:6}}>{uploadError}</div>}
          {isImageIcon && (
            <button onClick={()=>onChange('name','Star')}
              style={{marginTop:8,width:'100%',padding:'6px 0',background:'transparent',border:'1px solid #334155',borderRadius:6,color:'#94A3B8',fontSize:11,cursor:'pointer'}}>
              ✕ Remove custom image (use library icon)
            </button>
          )}
          <div style={{fontSize:10,color:'#475569',marginTop:8,padding:'6px 8px',background:'#0A1628',borderRadius:5,border:'1px solid #1E293B'}}>
            💡 Uploaded images are stored as base64 in the database
          </div>
        </div>
      )}

      {/* Color — only for library icons */}
      {!isImageIcon && (
        <div>
          <div style={{fontSize:9,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:6}}>Icon Color</div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <input type="color" value={iconState.color||'#000000'} onChange={e=>onChange('color',e.target.value)}
              style={{width:40,height:32,border:'1px solid #334155',borderRadius:6,cursor:'pointer',background:'none',padding:2}}/>
            <input value={iconState.color||''} onChange={e=>onChange('color',e.target.value)} placeholder="#000000"
              style={{flex:1,padding:'7px 10px',background:'#1E293B',border:'1px solid #334155',borderRadius:7,color:'#E2E8F0',fontSize:12,outline:'none'}}/>
          </div>
        </div>
      )}

      <div>
        <div style={{fontSize:9,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:6}}>Icon Size: {iconState.size||24}px</div>
        <input type="range" min={10} max={80} value={iconState.size||24} onChange={e=>onChange('size',parseInt(e.target.value))}
          style={{width:'100%',accentColor:'#FF6B2B'}}/>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'#64748B',marginTop:2}}>
          <span>10px</span><span>80px</span>
        </div>
      </div>
      <div style={{fontSize:10,color:'#475569',padding:'6px 8px',background:'#0A1628',borderRadius:5,border:'1px solid #1E293B'}}>
        💡 Click Save to persist icon changes
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function PageBuilder() {
  const {id} = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const [page,setPage]           = useState(null);
  const [settings,setSettings]   = useState({});
  const [textEdits,setTextEdits] = useState({});
  const [styleEdits,setStyleEdits] = useState({});
  const [iconEdits,setIconEdits] = useState({});
  const [iconState,setIconState] = useState({name:'',size:24,color:''});
  const [saving,setSaving]       = useState(false);
  const [device,setDevice]       = useState('desktop');
  const [iframeKey,setIframeKey] = useState(0);
  const [editMode,setEditMode]   = useState(true);
  const [sel,setSel]             = useState(null);
  const [st,setSt]               = useState({});
  const [elTab,setElTab]         = useState('text');
  const [openGroups,setOpenGroups] = useState({0:true});
  const [openStyle,setOpenStyle] = useState({});
  const [sidebarW,setSidebarW]   = useState(300);
  const [iframeSlug,setIframeSlug] = useState(null); // actual slug from iframe pathname

  const send = useCallback((msg)=>{
    iframeRef.current?.contentWindow?.postMessage(msg, '*');
  },[]);

  const applyCSSToIframe = useCallback((allStyleEdits)=>{
    iframeRef.current?.contentWindow?.postMessage({type:'CMS_STYLES_BULK', edits:allStyleEdits}, '*');
  },[]);

  const resendAll = useCallback(()=>{
    setStyleEdits(prev=>{ iframeRef.current?.contentWindow?.postMessage({type:'CMS_STYLES_BULK', edits:prev},'*'); return prev; });
    setTextEdits(prev=>{ iframeRef.current?.contentWindow?.postMessage({type:'CMS_TEXTS_BULK', edits:prev},'*'); return prev; });
    setIconEdits(prev=>{ iframeRef.current?.contentWindow?.postMessage({type:'CMS_ICONS_BULK', edits:prev},'*'); return prev; });
  },[]);

  useEffect(() => {
    api.get('/pages').then(r=>{
      const found=r.data.data?.find(p=>String(p.id)===String(id));
      setPage(found||null);
    });
    api.get('/settings').then(r=>setSettings(r.data.data||{}));
  }, [id]);

  useEffect(() => {
    const handler = ({data}) => {
      if (data?.type==='CMS_READY') {
        // Derive slug from iframe pathname
        if (data.pathname) {
          const path = data.pathname.replace(/^\/+/,'').replace(/\/+$/,'') || 'home';
          // map pathname to slug key
          const slugMap = {
            '': 'home', 'about': 'about', 'services': 'services',
            'blog': 'blog', 'careers': 'careers', 'case-studies': 'case-studies', 'contact': 'contact',
            'services/ai-automation': 'ai-automation',
            'services/ai-chatbot-assistant': 'ai-chatbot-assistant',
            'services/ai-powered-web-apps': 'ai-web-apps',
            'services/custom-ai-web-solutions': 'custom-ai-solutions',
            'services/web-app-development': 'web-app-development',
            'services/full-stack-development': 'fullstack-development',
            'services/wordpress-development': 'wordpress-development',
            'services/mobile-app-development': 'mobile-app-development',
            'services/seo-content-marketing': 'seo-services',
            'services/google-ads': 'google-ads',
            'services/meta-ads': 'meta-ads',
            'services/linkedin-youtube-ads': 'linkedin-youtube-marketing',
            'services/email-whatsapp-marketing': 'email-whatsapp-marketing',
            'services/cro': 'conversion-rate-optimisation',
            'services/design-branding': 'design-branding',
            'services/shopify-development': 'shopify-development',
            'services/woocommerce-development': 'woocommerce-development',
            'services/bigcommerce-development': 'bigcommerce-development',
            'services/digital-marketing': 'digital-marketing',
            'services/ai/llm-powered-apps': 'llm-powered-apps',
            'services/ai/chatbots-assistants': 'chatbots-assistants',
            'services/ai/workflow-automation': 'workflow-automation',
            'services/ai/predictive-analytics': 'predictive-analytics',
            'services/ai/api-integration': 'ai-api-integration',
            'services/ai/custom-ml-models': 'custom-ml-models',
            'engagement-models': 'engagement-models',
          };
          setIframeSlug(slugMap[path] || path);
        }
        setStyleEdits(prev=>{ iframeRef.current?.contentWindow?.postMessage({type:'CMS_STYLES_BULK',edits:prev},'*'); return prev; });
        setTextEdits(prev=>{ iframeRef.current?.contentWindow?.postMessage({type:'CMS_TEXTS_BULK',edits:prev},'*'); return prev; });
        setIconEdits(prev=>{ iframeRef.current?.contentWindow?.postMessage({type:'CMS_ICONS_BULK',edits:prev},'*'); return prev; });
        return;
      }
      if (data?.type==='CMS_SELECT') {
        setSel(data);
        setElTab(data.attr==='icon'?'icon':'text');
        const c=data.computed||{};
        setSt({
          fontSize:     px(c.fontSize),
          fontWeight:   c.fontWeight||'400',
          color:        rgbToHex(c.color)||'#000000',
          textAlign:    c.textAlign||'left',
          fontStyle:    c.fontStyle||'normal',
          underline:    (c.textDecoration||'').includes('underline'),
          lineHeight:   parseFloat(c.lineHeight)||1.5,
          letterSpacing:px(c.letterSpacing),
          paddingTop:   px(c.paddingTop), paddingRight: px(c.paddingRight),
          paddingBottom:px(c.paddingBottom), paddingLeft: px(c.paddingLeft),
          marginTop:    px(c.marginTop),   marginBottom: px(c.marginBottom),
          bgColor:      rgbToHex(c.backgroundColor)||'',
          borderRadius: px(c.borderRadius),
          opacity:      parseFloat(c.opacity)||1,
        });
        if (data.attr==='icon') {
          setIconState({ name: data.iconName||'Star', size: data.iconSize||24, color: data.iconColor||'' });
        }
      } else if (data?.type==='CMS_DESELECT') {
        setSel(null);
      }
    };
    window.addEventListener('message',handler);
    return ()=>window.removeEventListener('message',handler);
  },[]);

  const injectScript = useCallback(()=>{
    setTimeout(resendAll, 800);
  },[resendAll]);

  /* Push style for selected iframe element */
  const pushStyle = useCallback((prop,cssVal)=>{
    setSt(prev=>({...prev,[prop]:cssVal}));
    if(!sel) return;
    const map = {
      fontSize:v=>v+'px', fontWeight:v=>String(v), color:v=>v, textAlign:v=>v,
      fontStyle:v=>v, underline:v=>v?'underline':'none',
      lineHeight:v=>String(v), letterSpacing:v=>v+'px',
      paddingTop:v=>v+'px', paddingRight:v=>v+'px', paddingBottom:v=>v+'px', paddingLeft:v=>v+'px',
      marginTop:v=>v+'px', marginBottom:v=>v+'px',
      bgColor:v=>v, borderRadius:v=>v+'px', opacity:v=>String(v),
    };
    const cssPropMap = {underline:'textDecoration', bgColor:'backgroundColor'};
    const cssKey   = cssPropMap[prop]||prop;
    const cssValue = map[prop]?map[prop](cssVal):cssVal;
    setStyleEdits(prev=>{
      const next = {...prev,[sel.key]:{...(prev[sel.key]||{}),[cssKey]:cssValue}};
      applyCSSToIframe(next);
      return next;
    });
  },[sel, applyCSSToIframe]);

  /* Push text for selected iframe element */
  const pushText = useCallback((val)=>{
    if(!sel) return;
    setTextEdits(prev=>({...prev,[sel.key]:val}));
    send({type:'CMS_PREVIEW_UPDATE', key:sel.key, value:val});
  },[sel, send]);

  /* Push text for a sidebar field */
  const pushFieldText = useCallback((key, val)=>{
    setTextEdits(prev=>({...prev,[key]:val}));
    send({type:'CMS_PREVIEW_UPDATE', key, value:val});
  },[send]);

  /* Push style for a sidebar field */
  const pushFieldStyle = useCallback((key, cssProp, cssVal)=>{
    setStyleEdits(prev=>{
      const next = {...prev,[key]:{...(prev[key]||{}),[cssProp]:cssVal}};
      applyCSSToIframe(next);
      return next;
    });
  },[applyCSSToIframe]);

  const handleSave = async()=>{
    const hasT=Object.keys(textEdits).length>0;
    const hasS=Object.keys(styleEdits).length>0;
    const hasI=Object.keys(iconEdits).length>0;
    if(!hasT&&!hasS&&!hasI) return toast('No changes to save');
    setSaving(true);
    try {
      await Promise.all(Object.entries(textEdits).map(([k,v])=>api.put(`/settings/${k}`,{value:v})));
      await Promise.all(Object.entries(styleEdits).map(([k,v])=>api.put(`/settings/__style__${k}`,{value:JSON.stringify(v)})));
      await Promise.all(Object.entries(iconEdits).map(([k,v])=>api.put(`/settings/__icon__${k}`,{value:JSON.stringify(v)})));
      setTextEdits({}); setStyleEdits({}); setIconEdits({});
      toast.success('✅ Saved! Changes are live.');
      const fresh = await api.get('/settings');
      setSettings(fresh.data.data || {});
      setTimeout(()=>setIframeKey(k=>k+1), 400);
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const hasChanges = Object.keys(textEdits).length+Object.keys(styleEdits).length+Object.keys(iconEdits).length>0;
  const previewUrl = page?(PAGE_URLS[page.slug]||`${SITE}/`):`${SITE}/`;
  const activeSlug = iframeSlug || page?.slug || 'home';
  const pageFields = [...(PAGE_FIELDS[activeSlug]||PAGE_FIELDS[page?.slug]||[]),...PAGE_FIELDS._all];
  const FIELD_DEFAULTS = pageFields.reduce((acc,g)=>{(g.fields||[]).forEach(f=>{if(f.def!=null)acc[f.key]=f.def});return acc},{});
  const getVal = k=>k in textEdits?textEdits[k]:(settings[k]||FIELD_DEFAULTS[k]||'');

  const DEVICE_W = {desktop:'100%',tablet:'768px',mobile:'390px'};
  const COMPLEX_TYPES = ['tags','image','team','testimonials','platforms','clients','blogs','casestudies'];

  /* ─── Field-level style state (for inline field style panels) ─── */
  const makeFieldStyleState = (key) => {
    const fs = styleEdits[key]||{};
    return {
      fontSize: fs.fontSize?parseFloat(fs.fontSize):'',
      fontWeight: fs.fontWeight||'',
      color: fs.color||'',
      textAlign: fs.textAlign||'',
      fontStyle: fs.fontStyle||'normal',
      underline: fs.textDecoration==='underline',
      lineHeight: parseFloat(fs.lineHeight)||'',
      letterSpacing: parseFloat(fs.letterSpacing)||'',
      paddingTop:'',paddingRight:'',paddingBottom:'',paddingLeft:'',
      marginTop:'',marginBottom:'',
      bgColor:fs.backgroundColor||'',
      borderRadius:parseFloat(fs.borderRadius)||'',
      opacity:parseFloat(fs.opacity)||1,
    };
  };

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',background:'#0F172A',overflow:'hidden',fontFamily:'Inter,system-ui,sans-serif'}}>

      {/* ── Topbar ── */}
      <div style={{height:52,background:'#1E293B',borderBottom:'1px solid #334155',display:'flex',alignItems:'center',gap:8,padding:'0 14px',flexShrink:0}}>
        <button onClick={()=>navigate('/pages')}
          style={{background:'none',border:'none',cursor:'pointer',color:'#94A3B8',display:'flex',alignItems:'center',gap:5,fontSize:13,fontWeight:600,padding:'4px 8px',borderRadius:6,transition:'all 0.1s'}}
          onMouseEnter={e=>e.currentTarget.style.background='#0F172A'}
          onMouseLeave={e=>e.currentTarget.style.background='none'}>
          <ArrowLeft size={14}/> Pages
        </button>
        <span style={{color:'#334155',fontSize:18}}>|</span>
        <span style={{fontSize:14,fontWeight:700,color:'#E2E8F0'}}>{iframeSlug&&iframeSlug!==page?.slug?`${page?.title||''} › ${iframeSlug}`:(page?.title||'Loading...')}</span>
        {hasChanges&&<span style={{fontSize:10,fontWeight:700,color:'#FF6B2B',background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.3)',borderRadius:20,padding:'2px 8px'}}>{Object.keys(textEdits).length+Object.keys(styleEdits).length} changes</span>}

        <div style={{flex:1}}/>

        {/* Edit toggle */}
        <button onClick={()=>{setEditMode(m=>{const next=!m; send({type:'CMS_TOGGLE', active:next}); if(!next)setSel(null); return next;});}}
          style={{padding:'5px 11px',background:editMode?'rgba(255,107,43,0.12)':'#0F172A',border:`1px solid ${editMode?'#FF6B2B':'#334155'}`,borderRadius:7,color:editMode?'#FF6B2B':'#64748B',cursor:'pointer',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
          {editMode?<><MousePointer size={12}/>Click to Edit</>:<><Eye size={12}/>Preview Mode</>}
        </button>

        {/* Device switcher */}
        <div style={{display:'flex',background:'#0F172A',borderRadius:7,padding:3,gap:2}}>
          {[{k:'desktop',I:Monitor},{k:'tablet',I:Tablet},{k:'mobile',I:Smartphone}].map(({k,I})=>(
            <button key={k} onClick={()=>setDevice(k)}
              style={{padding:'5px 8px',background:device===k?'#1E293B':'transparent',border:'none',borderRadius:5,cursor:'pointer',color:device===k?'#FF6B2B':'#475569',display:'flex',alignItems:'center'}}>
              <I size={13}/>
            </button>
          ))}
        </div>

        <button onClick={()=>{setIframeKey(k=>k+1);setSel(null);}}
          style={{padding:'5px 9px',background:'#0F172A',border:'1px solid #334155',borderRadius:6,color:'#64748B',cursor:'pointer',display:'flex',alignItems:'center',gap:4,fontSize:11}}>
          <RefreshCw size={11}/>
        </button>

        <button onClick={handleSave} disabled={saving||!hasChanges}
          style={{padding:'7px 16px',background:hasChanges?'linear-gradient(135deg,#FF6B2B,#e85a1a)':'#1E293B',border:'none',borderRadius:7,color:hasChanges?'#fff':'#475569',cursor:hasChanges?'pointer':'default',fontSize:13,fontWeight:700,display:'flex',alignItems:'center',gap:6,transition:'all 0.15s'}}>
          <Save size={13}/>{saving?'Saving...':hasChanges?'Save Changes':'Saved'}
        </button>
      </div>

      {/* ── Body ── */}
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{width:sidebarW,background:'#0F172A',borderRight:'1px solid #1E293B',display:'flex',flexDirection:'column',flexShrink:0,overflow:'hidden',position:'relative'}}>
          {/* Resize handle */}
          <div
            onMouseDown={e=>{
              e.preventDefault();
              const startX=e.clientX, startW=sidebarW;
              const onMove=ev=>setSidebarW(Math.max(240,Math.min(560,startW+(ev.clientX-startX))));
              const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};
              document.addEventListener('mousemove',onMove);
              document.addEventListener('mouseup',onUp);
            }}
            style={{position:'absolute',right:0,top:0,bottom:0,width:5,cursor:'col-resize',zIndex:10,background:'transparent'}}
            title="Drag to resize"
          />

          {/* ══ ELEMENT SELECTED MODE ══ */}
          {sel ? (
            <>
              {/* Header */}
              <div style={{padding:'10px 12px 8px',borderBottom:'1px solid #1E293B',flexShrink:0,background:'#0A1628'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <button onClick={()=>{ setSel(null); send({type:'CMS_DESELECT'}); }}
                    style={{background:'rgba(255,107,43,0.12)',border:'1px solid rgba(255,107,43,0.25)',borderRadius:6,color:'#FF6B2B',cursor:'pointer',fontSize:11,padding:'3px 8px',display:'flex',alignItems:'center',gap:4,fontWeight:700}}>
                    <ArrowLeft size={10}/> Back
                  </button>
                  <div style={{fontSize:9,fontWeight:700,color:'#FF6B2B',textTransform:'uppercase',letterSpacing:'0.08em'}}>Element Selected</div>
                </div>
                <div style={{fontSize:12,fontWeight:700,color:'#E2E8F0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{sel.label}</div>
                <div style={{fontSize:10,color:'#475569',marginTop:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>Key: {sel.key}</div>
              </div>

              {/* Tabs */}
              <div style={{display:'flex',borderBottom:'1px solid #1E293B',flexShrink:0}}>
                {(sel?.attr==='icon'
                  ? [{id:'icon',label:'🎨 Icon'}]
                  : [{id:'text',icon:Type,label:'Text'},{id:'style',icon:Sliders,label:'Style'}]
                ).map(({id:tid,icon:TIcon,label:tlabel})=>(
                  <button key={tid} onClick={()=>setElTab(tid)}
                    style={{flex:1,padding:'8px 4px',background:elTab===tid?'rgba(255,107,43,0.08)':'none',border:'none',cursor:'pointer',fontSize:11,fontWeight:700,color:elTab===tid?'#FF6B2B':'#475569',borderBottom:elTab===tid?'2px solid #FF6B2B':'2px solid transparent',display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
                    {TIcon&&<TIcon size={11}/>}{tlabel}
                  </button>
                ))}
              </div>

              <div style={{flex:1,overflowY:'auto',padding:'10px 12px'}}>
                {elTab==='text'&&(
                  <>
                    <div style={{fontSize:9,fontWeight:700,color:'#475569',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:6}}>Text Content</div>
                    <textarea value={sel.key in textEdits?textEdits[sel.key]:sel.value||''} onChange={e=>pushText(e.target.value)} rows={5}
                      style={{width:'100%',padding:'8px 10px',background:'#1E293B',border:'1px solid #FF6B2B',borderRadius:7,color:'#E2E8F0',fontSize:12,resize:'vertical',outline:'none',boxSizing:'border-box',lineHeight:1.6}}/>
                    <div style={{fontSize:10,color:'#475569',marginTop:6,padding:'6px 8px',background:'#0A1628',borderRadius:5,border:'1px solid #1E293B'}}>
                      💡 Changes preview instantly in the page
                    </div>
                  </>
                )}
                {elTab==='style'&&(
                  <StylePanel st={st} pushStyleFn={(prop,val)=>pushStyle(prop,val)}/>
                )}
                {elTab==='icon'&&sel?.attr==='icon'&&(
                  <IconPanel
                    iconState={iconEdits[sel.key]||iconState}
                    onChange={(field,val)=>{
                      const next = {...(iconEdits[sel.key]||iconState),[field]:val};
                      setIconEdits(p=>({...p,[sel.key]:next}));
                      iframeRef.current?.contentWindow?.postMessage({type:'CMS_ICON_UPDATE',key:sel.key,[field]:val},'*');
                    }}
                  />
                )}
              </div>

              <div style={{padding:'10px 12px',borderTop:'1px solid #1E293B',flexShrink:0}}>
                <button onClick={handleSave} disabled={saving||!hasChanges}
                  style={{width:'100%',padding:'9px',background:hasChanges?'linear-gradient(135deg,#FF6B2B,#e85a1a)':'#1E293B',border:'none',borderRadius:7,color:hasChanges?'#fff':'#475569',fontWeight:700,fontSize:13,cursor:hasChanges?'pointer':'default',transition:'all 0.15s'}}>
                  {saving?'Saving...'  :hasChanges?'💾 Save Changes':'✓ Saved'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* ══ CONTENT FIELDS MODE ══ */}
              <div style={{padding:'10px 12px 8px',borderBottom:'1px solid #1E293B',flexShrink:0,background:'#0A1628'}}>
                <div style={{fontSize:10,fontWeight:700,color:'#FF6B2B',textTransform:'uppercase',letterSpacing:'0.08em'}}>Content Editor</div>
                <div style={{fontSize:11,color:'#475569',marginTop:2}}>{iframeSlug?`/${iframeSlug}`:(page?.title||'Select a page')} · {pageFields.length} sections</div>
                {editMode&&<div style={{fontSize:9,color:'#334155',marginTop:4,display:'flex',alignItems:'center',gap:4}}><MousePointer size={9} color="#FF6B2B"/> Click orange elements to edit styles</div>}
              </div>

              <div style={{flex:1,overflowY:'auto',padding:'4px 0'}}>
                {pageFields.map((group,gi)=>(
                  <div key={gi} style={{borderBottom:'1px solid #0F172A'}}>
                    <button onClick={()=>setOpenGroups(p=>({...p,[gi]:!p[gi]}))}
                      style={{width:'100%',padding:'9px 12px',background:openGroups[gi]?'#0A1628':'#0F172A',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.1s'}}>
                      <span style={{fontSize:11,fontWeight:700,color:openGroups[gi]?'#E2E8F0':'#64748B'}}>{group.group}</span>
                      {openGroups[gi]?<ChevronDown size={11} color="#334155"/>:<ChevronR size={11} color="#334155"/>}
                    </button>
                    {openGroups[gi]&&(
                      <div style={{padding:'6px 12px 10px',minWidth:0,overflow:'hidden'}}>
                        {(group.fields||[]).map(f=>{
                          const fs = styleEdits[f.key]||{};
                          const fst = makeFieldStyleState(f.key);
                          const styleOpen = openStyle[f.key];
                          const isChanged = f.key in textEdits || f.key in styleEdits;
                          return (
                            <div key={f.key} style={{marginBottom:10,minWidth:0}}>
                              {/* Label row */}
                              <div style={{fontSize:9,fontWeight:700,color:isChanged?'#FF6B2B':'#475569',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:3,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <span style={{display:'flex',alignItems:'center',gap:4}}>
                                  {f.label}
                                  {isChanged&&<span style={{width:5,height:5,borderRadius:'50%',background:'#FF6B2B',display:'inline-block'}}/>}
                                </span>
                                {!COMPLEX_TYPES.includes(f.type)&&(
                                  <button onClick={()=>setOpenStyle(p=>({...p,[f.key]:!p[f.key]}))}
                                    style={{background:styleOpen?'rgba(255,107,43,0.15)':'#1E293B',border:`1px solid ${styleOpen?'#FF6B2B':'#334155'}`,borderRadius:4,color:styleOpen?'#FF6B2B':'#475569',cursor:'pointer',fontSize:8,padding:'2px 5px',fontWeight:700}}>
                                    {styleOpen?'▲ Style':'▼ Style'}
                                  </button>
                                )}
                              </div>

                              {/* Input */}
                              {f.type==='team' ? <TeamEditor value={getVal(f.key)} onChange={v=>pushFieldText(f.key,v)}/>
                               : f.type==='testimonials' ? <TestimonialsEditor value={getVal(f.key)} onChange={v=>pushFieldText(f.key,v)}/>
                               : f.type==='platforms' ? <PlatformsEditor value={getVal(f.key)} onChange={v=>pushFieldText(f.key,v)}/>
                               : f.type==='clients' ? <ClientsEditor value={getVal(f.key)} onChange={v=>pushFieldText(f.key,v)}/>
                               : f.type==='blogs' ? <BlogsEditor value={getVal(f.key)} onChange={v=>pushFieldText(f.key,v)}/>
                               : f.type==='casestudies' ? <CaseStudiesEditor value={getVal(f.key)} onChange={v=>pushFieldText(f.key,v)}/>
                               : f.type==='image' ? <ImageUpload fieldKey={f.key} currentUrl={settings[f.key]||''} onSaved={url=>{
                                   setSettings(prev=>({...prev,[f.key]:url}));
                                   api.put(`/settings/${f.key}`,{value:url}).then(()=>toast.success('Logo saved!'));
                                 }}/>
                               : f.type==='tags' ? <TagsInput value={getVal(f.key)||f.def||''} onChange={v=>pushFieldText(f.key,v)}/>
                               : f.type==='textarea' ? <textarea value={getVal(f.key)} onChange={e=>pushFieldText(f.key,e.target.value)} rows={2}
                                   style={{width:'100%',padding:'6px 8px',background:'#1E293B',border:`1px solid ${isChanged?'#FF6B2B':'#334155'}`,borderRadius:5,color:'#E2E8F0',fontSize:11,resize:'vertical',outline:'none',boxSizing:'border-box',lineHeight:1.5}}/>
                               : <input type="text" value={getVal(f.key)} onChange={e=>pushFieldText(f.key,e.target.value)}
                                   style={{width:'100%',padding:'6px 8px',background:'#1E293B',border:`1px solid ${isChanged?'#FF6B2B':'#334155'}`,borderRadius:5,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
                              }

                              {/* Inline style panel */}
                              {styleOpen&&!COMPLEX_TYPES.includes(f.type)&&(
                                <div style={{marginTop:6,padding:'8px',background:'#0A1628',borderRadius:6,border:'1px solid #1E293B'}}>
                                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:6}}>
                                    <div>
                                      <div style={{fontSize:8,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Size</div>
                                      <input type="number" min={8} max={120} placeholder="16"
                                        value={fs.fontSize?parseFloat(fs.fontSize):''}
                                        onChange={e=>pushFieldStyle(f.key,'fontSize',e.target.value+'px')}
                                        style={{width:'100%',padding:'5px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:5,color:'#E2E8F0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
                                    </div>
                                    <div>
                                      <div style={{fontSize:8,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Weight</div>
                                      <select value={fs.fontWeight||''} onChange={e=>pushFieldStyle(f.key,'fontWeight',e.target.value)}
                                        style={{width:'100%',padding:'5px 5px',background:'#1E293B',border:'1px solid #334155',borderRadius:5,color:'#E2E8F0',fontSize:10,outline:'none'}}>
                                        <option value="">Default</option>
                                        <option value="300">Light</option><option value="400">Regular</option>
                                        <option value="500">Medium</option><option value="600">SemiBold</option>
                                        <option value="700">Bold</option><option value="800">ExtraBold</option><option value="900">Black</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div style={{marginBottom:6}}>
                                    <div style={{fontSize:8,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Color</div>
                                    <div style={{display:'flex',gap:5,alignItems:'center'}}>
                                      <input type="color" value={fs.color||'#000000'} onChange={e=>pushFieldStyle(f.key,'color',e.target.value)}
                                        style={{width:28,height:28,border:'none',borderRadius:4,cursor:'pointer',padding:2,background:'#1E293B'}}/>
                                      <input type="text" value={fs.color||''} onChange={e=>pushFieldStyle(f.key,'color',e.target.value)} placeholder="#000000"
                                        style={{flex:1,padding:'5px 7px',background:'#1E293B',border:'1px solid #334155',borderRadius:5,color:'#E2E8F0',fontSize:11,outline:'none'}}/>
                                    </div>
                                  </div>
                                  <div>
                                    <div style={{fontSize:8,color:'#64748B',marginBottom:3,fontWeight:700,textTransform:'uppercase'}}>Alignment</div>
                                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:3}}>
                                      {[['left','←'],['center','↔'],['right','→']].map(([a,sym])=>(
                                        <button key={a} onClick={()=>pushFieldStyle(f.key,'textAlign',a)}
                                          style={{padding:'5px 2px',background:fs.textAlign===a?'rgba(255,107,43,0.15)':'#1E293B',border:`1px solid ${fs.textAlign===a?'#FF6B2B':'#334155'}`,borderRadius:5,color:fs.textAlign===a?'#FF6B2B':'#64748B',cursor:'pointer',fontSize:11,fontWeight:700}}>
                                          {sym}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {hasChanges&&(
                <div style={{padding:'10px 12px',borderTop:'1px solid #1E293B',flexShrink:0,background:'#0A1628'}}>
                  <button onClick={handleSave} disabled={saving}
                    style={{width:'100%',padding:'9px',background:'linear-gradient(135deg,#FF6B2B,#e85a1a)',border:'none',borderRadius:7,color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                    {saving?'Saving...':'💾 Save Changes'}
                  </button>
                  <div style={{fontSize:9,color:'#475569',textAlign:'center',marginTop:4}}>
                    {Object.keys(textEdits).length} text · {Object.keys(styleEdits).length} style edits pending
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── CENTER: iframe ── */}
        <div style={{flex:1,display:'flex',alignItems:device==='desktop'?'stretch':'flex-start',justifyContent:'center',background:'#334155',overflow:'auto',padding:device!=='desktop'?20:0}}>
          <div style={{width:DEVICE_W[device],minHeight:'100%',flexShrink:0,background:'#fff',boxShadow:device!=='desktop'?'0 8px 48px rgba(0,0,0,0.4)':'none',borderRadius:device!=='desktop'?16:0,overflow:'hidden'}}>
            <iframe key={`${page?.slug||'home'}-${iframeKey}`} ref={iframeRef} src={previewUrl} title="Live Preview"
              onLoad={()=>setTimeout(injectScript,800)}
              style={{width:'100%',height:device==='desktop'?'100%':'900px',border:'none',display:'block'}}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"/>
          </div>
        </div>
      </div>

      {/* Hint bar */}
      {editMode&&!sel&&(
        <div style={{position:'fixed',bottom:18,left:'50%',transform:'translateX(-50%)',background:'rgba(15,23,42,0.92)',color:'#E2E8F0',padding:'7px 16px',borderRadius:100,fontSize:11,fontWeight:600,display:'flex',alignItems:'center',gap:7,border:'1px solid #334155',pointerEvents:'none',zIndex:100,backdropFilter:'blur(4px)'}}>
          <MousePointer size={12} color="#FF6B2B"/> Click any orange-outlined element in the preview to edit it
        </div>
      )}
    </div>
  );
}
