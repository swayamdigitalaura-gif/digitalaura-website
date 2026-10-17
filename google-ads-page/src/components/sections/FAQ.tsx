import { PillarFaq, PillarSection } from "../shared/Pillar";

const FAQS = [
  { q: "Why hire a Google Ads agency instead of running ads yourself?", a: "Google Ads has hundreds of settings that affect cost and results. A small mistake can waste your entire budget on the wrong searches. We manage accounts daily and know what to fix immediately." },
  { q: "How much does Google Ads management cost?", a: "For Ahmedabad businesses, our Google Ads management fee is ₹15,000 to ₹60,000 per month, plus GST. Where you land depends on your ad spend, the number of campaigns and channels, the languages you run ads in and how much tracking work is needed. Your ad budget is separate and is paid to Google from your own account. You get the exact fee in writing after your free Google Ads audit, before you commit to anything." },
  { q: "What's the minimum ad budget to get started?", a: "We work best with businesses spending ₹50,000+ a month on Google Ads. This is enough budget for campaigns to collect real data and start optimizing toward results." },
  { q: "How long before Google Ads start generating leads?", a: "Most accounts see lower cost per lead within 14–30 days of optimization. Reaching your target ROAS usually takes 60–90 days." },
  { q: "What's included in your Google Ads Audit?", a: "A full review of your account structure, conversion tracking, landing pages, competitor activity, and keyword opportunities, plus a 90-day plan to fix what's broken." },
  { q: "Do I need to sign a long-term contract?", a: "No. We work month-to-month with a 15-day cancellation notice. If the results aren't there, you're not locked in." },
  { q: "Who actually manages my Google Ads account?", a: "A senior strategist with at least 5 years of hands-on campaign experience. No interns, no account handoffs." },
  { q: "Will I own my Google Ads account and data?", a: "Yes, 100%. We run all campaigns inside your own Google Ads and Google Analytics accounts. Everything stays yours if you ever leave." },
  { q: "Do you guarantee leads or a fixed ROAS?", a: "No. Nobody can honestly guarantee leads or a return on ad spend, because results depend on your market, your offer, your website and your budget. What we commit to is a clear plan, proper tracking, regular optimisation and reports that show leads and cost per lead." },
  { q: "Performance Max, Search or Shopping: which should my business use?", a: "Search suits businesses where people look for a service, such as clinics, agencies and repair services. Shopping and Performance Max suit stores with product feeds. Many accounts use a mix. We recommend the starting setup after reviewing your business, your tracking and your budget." },
  { q: "Can you take over my existing Google Ads account?", a: "Yes. We start with an audit of the account: structure, search terms, conversion tracking and landing pages. Then we keep what works, stop what wastes budget and rebuild what is broken, all inside your existing account so your history is preserved." },
  { q: "How do you count phone call and WhatsApp leads?", a: "We set up conversion tracking for form submissions, click-to-call, calls from ads and WhatsApp clicks, so each one is counted as a lead and tied back to the campaign and keyword. We also tell you where tracking has limits, for example a WhatsApp click shows interest but not a completed chat." },
  { q: "Do you work with businesses outside Ahmedabad?", a: "Yes. Our team is based in Ahmedabad and we run campaigns for businesses across Gujarat, India and overseas, with location targeting set to wherever your customers are." },
  { q: "Google Ads or Meta ads: which should I start with?", a: "If customers already search for what you sell, such as a repair, a clinic or a service near them, Google Search usually comes first. If you need to create demand, for example for a new product or a visual offer, Meta ads can reach people who are not searching yet. Many businesses end up using both, and we will tell you honestly which fits first." },
  { q: "Can you run Google Ads for doctors and clinics?", a: "Yes, with care. Health advertising has stricter rules from Google and from medical regulators in India, so we keep claims factual, avoid before-and-after promises, and review every ad and page before it goes live." },
  { q: "What do you need from me to start?", a: "Access to your Google Ads account if you have one (or we set one up in your name), your Google Analytics, your website, your phone and WhatsApp numbers, and a clear idea of what a good lead is for your business." },
  { q: "What if my website is not turning clicks into enquiries?", a: "We start by showing where visitors drop off. Then we suggest page changes or build a focused landing page, so the clicks you pay for are more likely to turn into calls, WhatsApp messages and forms." },
  { q: "Are you a Google Partner agency?", a: "Yes. Digital Aura is a Google Partner agency. That means we are recognised by Google for managing Google Ads accounts, and our campaigns follow Google's own recommended practices. We always run your campaigns inside your own Google Ads account." },
  { q: "Can you run Google Ads in Gujarati or Hindi?", a: "Yes. We write and run Google Ads in English, Hindi, Gujarati, Marathi, Tamil and other languages, with keyword research, ad copy and landing pages in the same language, so you reach customers in the language they search in across Ahmedabad, Gujarat and the rest of India." },
];

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // Static content from the FAQS list above - no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQ() {
  return (
    <PillarSection id="faq" tone="white" eyebrow="Common questions" title="Google Ads management, explained simply" intro="Straightforward answers about cost, timelines, contracts and who owns your account.">
      <FAQSchema />
      <PillarFaq items={FAQS} />
    </PillarSection>
  );
}
