// Turns raw attribution fields into one human label for the admin Inquiries page.
const SEARCH = { google: 'Google', bing: 'Bing', duckduckgo: 'DuckDuckGo', yahoo: 'Yahoo', yandex: 'Yandex' };
const SOCIAL = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', twitter: 'X / Twitter', 't.co': 'X / Twitter', 'x.com': 'X / Twitter', youtube: 'YouTube', whatsapp: 'WhatsApp', pinterest: 'Pinterest', reddit: 'Reddit' };
const CHATBOTS = { chatgpt: 'ChatGPT', openai: 'ChatGPT', perplexity: 'Perplexity', gemini: 'Gemini', copilot: 'Copilot', claude: 'Claude' };

const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, '').toLowerCase(); } catch { return ''; } };
const find = (map, host) => { for (const k of Object.keys(map)) if (host.includes(k)) return map[k]; return null; };

function deriveTrafficSource({ utm_source, utm_medium, referrer, gclid, fbclid }) {
  const src = (utm_source || '').toLowerCase();
  const med = (utm_medium || '').toLowerCase();
  const paid = /cpc|ppc|paid|ads|display/.test(med);
  if (gclid || (src.includes('google') && paid)) return 'Google Ads';
  if (fbclid && !src) return 'Meta Ads';
  if (/facebook|instagram|meta|fb|ig/.test(src) && paid) return 'Meta Ads';
  if (src) return paid ? `Paid: ${utm_source}` : `Campaign: ${utm_source}`;
  const host = hostOf(referrer);
  if (!host || host.endsWith('thedigitalaura.com')) return 'Direct';
  const bot = find(CHATBOTS, host);
  if (bot) return `AI: ${bot}`;
  const search = find(SEARCH, host);
  if (search) return `${search} Organic`;
  return find(SOCIAL, host) || `Referral: ${host}`;
}

module.exports = { deriveTrafficSource, hostOf };
