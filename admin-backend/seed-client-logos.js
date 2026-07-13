require('dotenv').config({ path: '.env' });
const { ClientLogo } = require('./src/models');

const TMA_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E";

const logos = [
  // ── AI Automation ──────────────────────────────────────────────
  { service_page: 'ai-automation', name: 'Track My Ads',         tag: 'AdTech',            logo_url: TMA_SVG,                                                                                                                              logo_bg: '#f0f8ff', order_index: 0 },
  { service_page: 'ai-automation', name: 'Silverstone Financial', tag: 'Financial Services', logo_url: 'https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png',                                  logo_bg: '#f0faff', order_index: 1 },
  { service_page: 'ai-automation', name: 'Gleekey',              tag: 'EdTech',            logo_url: 'https://www.gleekey.in/public/front/images/logos/1765275447_logo.png',                                                               logo_bg: '#f5f0ff', order_index: 2 },
  { service_page: 'ai-automation', name: 'Digital Aura',         tag: 'Digital Marketing', logo_url: 'http://thedigitalaura.com/wp-content/uploads/2021/04/Digital-Aura-Logo_-Final.png',                                                  logo_bg: '#fff8f0', order_index: 3 },

  // ── AI Chatbot Assistant ────────────────────────────────────────
  { service_page: 'ai-chatbot-assistant', name: 'Digital Aura',        tag: 'Digital Marketing', logo_url: 'http://thedigitalaura.com/wp-content/uploads/2021/04/Digital-Aura-Logo_-Final.png',                                              logo_bg: '#fff8f0', order_index: 0 },
  { service_page: 'ai-chatbot-assistant', name: 'Game Zone Events',    tag: 'Events',            logo_url: 'https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png',                                          logo_bg: '#f5fff5', order_index: 1 },
  { service_page: 'ai-chatbot-assistant', name: 'Krisha Eye Hospital', tag: 'Eye Care',          logo_url: 'https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png',                              logo_bg: '#f0faff', order_index: 2 },
  { service_page: 'ai-chatbot-assistant', name: 'Parasher Academy',    tag: 'Education',         logo_url: 'https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png',                                                  logo_bg: '#f5f0ff', order_index: 3 },
  { service_page: 'ai-chatbot-assistant', name: 'Gleekey',             tag: 'EdTech',            logo_url: 'https://www.gleekey.in/public/front/images/logos/1765275447_logo.png',                                                           logo_bg: '#f5f0ff', order_index: 4 },
  { service_page: 'ai-chatbot-assistant', name: 'Dr Parth Shah',       tag: 'Healthcare',        logo_url: 'https://www.drparthshah.com.au/wp-content/uploads/2020/02/site_logo.png',                                                        logo_bg: '#f0f7ff', order_index: 5 },

  // ── AI Web Apps ─────────────────────────────────────────────────
  { service_page: 'ai-web-apps', name: 'Track My Ads',         tag: 'AdTech',            logo_url: TMA_SVG,                                                                                                                                   logo_bg: '#f0f8ff', order_index: 0 },
  { service_page: 'ai-web-apps', name: 'Silverstone Financial', tag: 'Financial Services', logo_url: 'https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png',                                     logo_bg: '#f0faff', order_index: 1 },
  { service_page: 'ai-web-apps', name: 'Gleekey',              tag: 'Tech & SaaS',       logo_url: 'https://www.gleekey.in/public/front/images/logos/1765275447_logo.png',                                                                  logo_bg: '#f5f0ff', order_index: 2 },

  // ── Custom AI Web Solutions ─────────────────────────────────────
  { service_page: 'custom-ai-web-solutions', name: 'Inn of the Dove',    tag: 'Hospitality',      logo_url: 'https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp',              logo_bg: '#fff8f5', order_index: 0 },
  { service_page: 'custom-ai-web-solutions', name: 'Game Zone Events',   tag: 'Events',           logo_url: 'https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png', logo_bg: '#f0fff0', order_index: 1 },
  { service_page: 'custom-ai-web-solutions', name: 'Shree Sahajanand',   tag: 'Religious & Food', logo_url: 'https://shreesahajanandprasadam.com/wp-content/uploads/logo.png',                  logo_bg: '#fff8f0', order_index: 2 },
  { service_page: 'custom-ai-web-solutions', name: 'Dr Aarti Pediatric', tag: 'Healthcare',       logo_url: 'https://draartipediatric.in/wp-content/uploads/logo.png',                          logo_bg: '#f0f8ff', order_index: 3 },

  // ── Web App Development ─────────────────────────────────────────
  { service_page: 'web-app-development', name: 'Gleekey',          tag: 'EdTech',           logo_url: 'https://www.gleekey.in/public/front/images/logos/1765275447_logo.png',                                          logo_bg: '#f5f0ff', order_index: 0 },
  { service_page: 'web-app-development', name: 'Monita',           tag: 'Consulting',       logo_url: 'https://monita.com.au/wp-content/uploads/2024/09/MONITA_v01A_Logo_BG2-sbs-200x74.png',                          logo_bg: '#f0f8ff', order_index: 1 },
  { service_page: 'web-app-development', name: 'Shree Sahajanand', tag: 'Religious & Food', logo_url: 'https://shreesahajanandprasadam.com/wp-content/uploads/logo.png',                                               logo_bg: '#fff8f0', order_index: 2 },
  { service_page: 'web-app-development', name: 'Gift Care',        tag: 'Healthcare',       logo_url: 'https://giftcare.in/wp-content/uploads/logo.png',                                                               logo_bg: '#f0fff8', order_index: 3 },
  { service_page: 'web-app-development', name: 'Game Zone Events', tag: 'Events',           logo_url: 'https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png',                         logo_bg: '#f5fff5', order_index: 4 },

  // ── Full Stack Development ──────────────────────────────────────
  { service_page: 'full-stack-development', name: 'Geotexelin',             tag: 'Industrial',         logo_url: 'https://cdn.prod.website-files.com/66aba4a3fcdeb2e1f9831db2/6761225cd949ac8e332fc819_Texel%20Logo%20for%20Website.svg', logo_bg: '#f0f8ff', order_index: 0 },
  { service_page: 'full-stack-development', name: 'MYP Services',           tag: 'Professional Svcs',  logo_url: 'https://mypservices.com.au/wp-content/uploads/2025/09/MYPService-Black.png',                                            logo_bg: '#f0f8ff', order_index: 1 },
  { service_page: 'full-stack-development', name: 'AgriWorld Expo',         tag: 'Agriculture',        logo_url: 'https://agriworldexpo.in/wp-content/uploads/2024/09/AgriWorldExpo-Logo-New.png',                                        logo_bg: '#f0fff0', order_index: 2 },
  { service_page: 'full-stack-development', name: 'Aroma Immigration',      tag: 'Immigration',        logo_url: 'https://aromaimmigration.com/wp-content/uploads/2022/08/Aroma-Immigration-png-1024x386.png',                            logo_bg: '#f5f0ff', order_index: 3 },
  { service_page: 'full-stack-development', name: 'Clarity Eye Surgeons',   tag: 'Healthcare',         logo_url: 'https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png',       logo_bg: '#f0f8ff', order_index: 4 },
  { service_page: 'full-stack-development', name: 'Silverstone Financial',  tag: 'Financial Services', logo_url: 'https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png',                     logo_bg: '#f0faff', order_index: 5 },
  { service_page: 'full-stack-development', name: 'Infinity Manpower',      tag: 'Staffing & HR',      logo_url: 'https://infinitymanpowergroup.com/wp-content/uploads/2025/01/white-logo.png',                                          logo_bg: '#1a1a2e', order_index: 6 },
  { service_page: 'full-stack-development', name: 'Sure Freeze',            tag: 'HVAC & Refrigeration',logo_url: 'https://surefreeze.com.au/wp-content/uploads/2023/09/Sure-Freeze-Logo-Updated-2.png',                               logo_bg: '#f0faff', order_index: 7 },
  { service_page: 'full-stack-development', name: 'IntegsCloud',            tag: 'Cloud Solutions',    logo_url: 'https://integscloud.com/wp-content/uploads/2024/10/logo1-1-1-1.webp',                                                 logo_bg: '#f0f4ff', order_index: 8 },
  { service_page: 'full-stack-development', name: 'Grand Bavarchi',         tag: 'Restaurant',         logo_url: 'https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png',                                                  logo_bg: '#fff8f0', order_index: 9 },
  { service_page: 'full-stack-development', name: 'Polyform Group',         tag: 'Manufacturing',      logo_url: 'https://polyformgroup.com/assets/images/logo/POLYFORMNEWLOGO_B.svg',                                                   logo_bg: '#f5f5f5', order_index: 10 },
  { service_page: 'full-stack-development', name: 'Bin Drop Dumpsters',     tag: 'Waste Management',   logo_url: 'https://www.bindropdumpsters.com/wp-content/uploads/Bin-Drop-Logo.png',                                                logo_bg: '#f5fff5', order_index: 11 },
  { service_page: 'full-stack-development', name: 'Bhayani Group',          tag: 'Business Group',     logo_url: 'https://bhayanigroup.com/wp-content/uploads/2025/06/logo-1-1.png',                                                     logo_bg: '#fff8f0', order_index: 12 },
  { service_page: 'full-stack-development', name: 'Parasher Academy',       tag: 'Education',          logo_url: 'https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png',                                        logo_bg: '#f5f0ff', order_index: 13 },
  { service_page: 'full-stack-development', name: 'Attention Hero',         tag: 'Marketing',          logo_url: 'https://cdn.prod.website-files.com/686cabbdef588234860ed3de/6938fac9f358d0e642c011fe_attention_hero_logo.png',        logo_bg: '#fff8f0', order_index: 14 },
  { service_page: 'full-stack-development', name: 'There You Grow',         tag: 'Content & Growth',   logo_url: 'https://thereyougrow.in/wp-content/uploads/2023/08/Professional-Content-Writing-Services-Expert-Content-Writers-for-Engaging-Content-e1695101657187.png', logo_bg: '#f0fff8', order_index: 15 },
  { service_page: 'full-stack-development', name: 'Karm Digital',           tag: 'Digital Agency',     logo_url: 'https://karm.digital/wp-content/uploads/2025/05/karm-logo.png',                                                        logo_bg: '#f5f0ff', order_index: 16 },
  { service_page: 'full-stack-development', name: 'Active Office Furniture',tag: 'Office Furniture',   logo_url: 'https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png',                logo_bg: '#f0f8ff', order_index: 17 },
  { service_page: 'full-stack-development', name: 'Inn of the Dove',        tag: 'Hospitality',        logo_url: 'https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp',                                                logo_bg: '#fff8f5', order_index: 18 },
  { service_page: 'full-stack-development', name: 'Dr Ronak Patel',         tag: 'Healthcare',         logo_url: 'https://drronakpatel.in/wp-content/uploads/2025/10/LOGO-PNG-1024x1024.png',                                           logo_bg: '#f0f7ff', order_index: 19 },
  { service_page: 'full-stack-development', name: 'Dreamfoot',              tag: 'Sports & Footwear',  logo_url: 'https://dreamfoot.in/wp-content/uploads/2025/04/logo-light-4-1.png',                                                  logo_bg: '#1a1a2e', order_index: 20 },
  { service_page: 'full-stack-development', name: 'AMVI Hospitals',         tag: 'Healthcare',         logo_url: 'https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png',                                   logo_bg: '#f5f0ff', order_index: 21 },
  { service_page: 'full-stack-development', name: 'Krisha Hospital',        tag: 'Healthcare',         logo_url: 'https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png',                                                logo_bg: '#fff0f5', order_index: 22 },
  { service_page: 'full-stack-development', name: 'Krisha Eye Hospital',    tag: 'Eye Care',           logo_url: 'https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png',                   logo_bg: '#f0faff', order_index: 23 },
  { service_page: 'full-stack-development', name: 'Aagman Hospital',        tag: 'Healthcare',         logo_url: 'https://aagmanwomenshospital.com/wp-content/uploads/logo.png',                                                         logo_bg: '#fff0f8', order_index: 24 },
  { service_page: 'full-stack-development', name: 'Shukan Hospital',        tag: 'Healthcare',         logo_url: 'https://shukanhospital.com/wp-content/uploads/2025/11/Frame-16-removebg-preview.png',                                 logo_bg: '#f0fff8', order_index: 25 },
  { service_page: 'full-stack-development', name: 'Gleekey',                tag: 'EdTech',             logo_url: 'https://www.gleekey.in/public/front/images/logos/1765275447_logo.png',                                                logo_bg: '#f5f0ff', order_index: 26 },
  { service_page: 'full-stack-development', name: 'Monita',                 tag: 'Consulting',         logo_url: 'https://monita.com.au/wp-content/uploads/2024/09/MONITA_v01A_Logo_BG2-sbs-200x74.png',                               logo_bg: '#f0f8ff', order_index: 27 },
  { service_page: 'full-stack-development', name: 'Game Zone Events',       tag: 'Events',             logo_url: 'https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png',                               logo_bg: '#f5fff5', order_index: 28 },
  { service_page: 'full-stack-development', name: 'Track My Ads',           tag: 'AdTech',             logo_url: TMA_SVG,                                                                                                               logo_bg: '#f0f8ff', order_index: 29 },

  // ── Mobile App Development ──────────────────────────────────────
  { service_page: 'mobile-app-development', name: 'Track My Ads', tag: 'AdTech', logo_url: TMA_SVG,                                                                    logo_bg: '#f0f8ff', order_index: 0 },
  { service_page: 'mobile-app-development', name: 'Gleekey',      tag: 'EdTech', logo_url: 'https://www.gleekey.in/public/front/images/logos/1765275447_logo.png',     logo_bg: '#f5f0ff', order_index: 1 },

  // ── WordPress Development ───────────────────────────────────────
  { service_page: 'wordpress-development', name: 'Krisha Hospital',  tag: 'Healthcare',  logo_url: 'https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png',             logo_bg: '#fff0f5', order_index: 0 },
  { service_page: 'wordpress-development', name: 'Parasher Academy', tag: 'Education',   logo_url: 'https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png',    logo_bg: '#f5f0ff', order_index: 1 },
  { service_page: 'wordpress-development', name: 'Aagman Hospital',  tag: 'Healthcare',  logo_url: 'https://aagmanwomenshospital.com/wp-content/uploads/logo.png',                     logo_bg: '#fff0f8', order_index: 2 },
  { service_page: 'wordpress-development', name: 'Grand Bavarchi',   tag: 'Restaurant',  logo_url: 'https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png',              logo_bg: '#fff8f0', order_index: 3 },

  // ── WooCommerce Development ─────────────────────────────────────
  { service_page: 'woocommerce-development', name: 'Karm Digital',           tag: 'Digital Agency',   logo_url: 'https://karm.digital/wp-content/uploads/2025/05/karm-logo.png',                                                  logo_bg: '#f5f0ff', order_index: 0 },
  { service_page: 'woocommerce-development', name: 'Active Office Furniture',tag: 'Office Furniture', logo_url: 'https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png',           logo_bg: '#f0f8ff', order_index: 1 },
  { service_page: 'woocommerce-development', name: 'Dreamfoot',              tag: 'Sports & Footwear',logo_url: 'https://dreamfoot.in/wp-content/uploads/2025/04/logo-light-4-1.png',                                            logo_bg: '#1a1a2e', order_index: 2 },
  { service_page: 'woocommerce-development', name: 'Bhayani Group',          tag: 'Real Estate',      logo_url: 'https://bhayanigroup.com/wp-content/uploads/2025/06/logo-1-1.png',                                              logo_bg: '#f0faff', order_index: 3 },

  // ── SEO ─────────────────────────────────────────────────────────
  { service_page: 'seo', name: 'Dr Parth Shah',         tag: 'Healthcare',          logo_url: 'https://www.drparthshah.com.au/wp-content/uploads/2020/02/site_logo.png',                  logo_bg: '#f0f7ff', order_index: 0 },
  { service_page: 'seo', name: 'Clarity Eye Surgeons',  tag: 'Healthcare',          logo_url: 'https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png', logo_bg: '#f0f8ff', order_index: 1 },
  { service_page: 'seo', name: 'Grand Bavarchi',        tag: 'Restaurant',          logo_url: 'https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png',                       logo_bg: '#fff8f0', order_index: 2 },
  { service_page: 'seo', name: 'Sure Freeze',           tag: 'HVAC & Refrigeration',logo_url: 'https://surefreeze.com.au/wp-content/uploads/2023/09/Sure-Freeze-Logo-Updated-2.png',       logo_bg: '#f0faff', order_index: 3 },
  { service_page: 'seo', name: 'AMVI Hospitals',        tag: 'Healthcare',          logo_url: 'https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png',         logo_bg: '#f5f0ff', order_index: 4 },
  { service_page: 'seo', name: 'Bin Drop Dumpsters',    tag: 'Waste Management',    logo_url: 'https://www.bindropdumpsters.com/wp-content/uploads/Bin-Drop-Logo.png',                     logo_bg: '#f5fff5', order_index: 5 },
  { service_page: 'seo', name: 'Active Office Furniture',tag: 'Office Furniture',  logo_url: 'https://www.activeofficefurniture.com.au/wp-content/uploads/2025/09/Active-Office-Furniture-Logo.png', logo_bg: '#f0f8ff', order_index: 6 },
  { service_page: 'seo', name: 'Inn of the Dove',       tag: 'Hospitality',         logo_url: 'https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp',                      logo_bg: '#fff8f5', order_index: 7 },
  { service_page: 'seo', name: 'Karm Digital',          tag: 'Digital Agency',      logo_url: 'https://karm.digital/wp-content/uploads/2025/05/karm-logo.png',                             logo_bg: '#f5f0ff', order_index: 8 },
  { service_page: 'seo', name: 'Krisha Hospital',       tag: 'Healthcare',          logo_url: 'https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png',                      logo_bg: '#fff0f5', order_index: 9 },
  { service_page: 'seo', name: 'Krisha Eye Hospital',   tag: 'Eye Care',            logo_url: 'https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png', logo_bg: '#f0faff', order_index: 10 },
  { service_page: 'seo', name: 'Aagman Hospital',       tag: 'Healthcare',          logo_url: 'https://aagmanwomenshospital.com/wp-content/uploads/logo.png',                              logo_bg: '#fff0f8', order_index: 11 },
  { service_page: 'seo', name: 'Shukan Hospital',       tag: 'Healthcare',          logo_url: 'https://shukanhospital.com/wp-content/uploads/2025/11/Frame-16-removebg-preview.png',       logo_bg: '#f0fff8', order_index: 12 },
  { service_page: 'seo', name: 'Dr Ronak Patel',        tag: 'Healthcare',          logo_url: 'https://drronakpatel.in/wp-content/uploads/2025/10/LOGO-PNG-1024x1024.png',                 logo_bg: '#f0f7ff', order_index: 13 },
  { service_page: 'seo', name: 'Parasher Academy',      tag: 'Education',           logo_url: 'https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png',             logo_bg: '#f5f0ff', order_index: 14 },
  { service_page: 'seo', name: 'Game Zone Events',      tag: 'Events',              logo_url: 'https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png',     logo_bg: '#f5fff5', order_index: 15 },
  { service_page: 'seo', name: 'Dreamfoot',             tag: 'Sports & Footwear',   logo_url: 'https://dreamfoot.in/wp-content/uploads/2025/04/logo-light-4-1.png',                        logo_bg: '#1a1a2e', order_index: 16 },
  { service_page: 'seo', name: 'Spinx Digital',         tag: 'Digital Agency',      logo_url: 'https://cdn-eahjn.nitrocdn.com/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-4b7d23a/www.spinxdigital.com/app/uploads/2023/03/spinx-logo-white.png', logo_bg: '#1a1a2e', order_index: 17 },

  // ── Google Ads ──────────────────────────────────────────────────
  { service_page: 'google-ads', name: 'The Grand Palace',      tag: 'Hospitality',         logo_url: 'https://www.thegrandpalace.com.au/wp-content/uploads/2025/04/Logo-removebg-preview.png', logo_bg: '#fffbf0', order_index: 0 },
  { service_page: 'google-ads', name: 'MYP Services',          tag: 'Professional Svcs',   logo_url: 'https://mypservices.com.au/wp-content/uploads/2025/09/MYPService-Black.png',            logo_bg: '#f0f8ff', order_index: 1 },
  { service_page: 'google-ads', name: 'SK Travels',            tag: 'Travel & Tourism',    logo_url: 'https://sktravelssltd.co.uk/wp-content/uploads/2024/05/sk-travelss-ltd-logo.webp',     logo_bg: '#fff8f0', order_index: 2 },
  { service_page: 'google-ads', name: 'Mainstream Real Estate',tag: 'Real Estate',         logo_url: 'https://mainstreamrealestate.com.au/wp-content/uploads/2023/02/logo-320x184-1.png',   logo_bg: '#f0fff8', order_index: 3 },
  { service_page: 'google-ads', name: 'Sure Freeze',           tag: 'HVAC & Refrigeration',logo_url: 'https://surefreeze.com.au/wp-content/uploads/2023/09/Sure-Freeze-Logo-Updated-2.png', logo_bg: '#f0faff', order_index: 4 },
  { service_page: 'google-ads', name: 'IntegsCloud',           tag: 'Cloud Solutions',     logo_url: 'https://integscloud.com/wp-content/uploads/2024/10/logo1-1-1-1.webp',                 logo_bg: '#f0f4ff', order_index: 5 },
  { service_page: 'google-ads', name: 'Grand Bavarchi',        tag: 'Restaurant',          logo_url: 'https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png',                 logo_bg: '#fff8f0', order_index: 6 },
  { service_page: 'google-ads', name: 'Inn of the Dove',       tag: 'Hospitality',         logo_url: 'https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp',                logo_bg: '#fff8f5', order_index: 7 },
  { service_page: 'google-ads', name: 'Game Zone Events',      tag: 'Events',              logo_url: 'https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png',logo_bg: '#f5fff5', order_index: 8 },
  { service_page: 'google-ads', name: 'OBL Print',             tag: 'Printing Services',   logo_url: 'https://oblprint.com/assets/logo/logo.webp',                                          logo_bg: '#f8f5f0', order_index: 9 },
  { service_page: 'google-ads', name: 'AMVI Hospitals',        tag: 'Healthcare',          logo_url: 'https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png',  logo_bg: '#f5f0ff', order_index: 10 },
  { service_page: 'google-ads', name: 'Krisha Hospital',       tag: 'Healthcare',          logo_url: 'https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png',               logo_bg: '#fff0f5', order_index: 11 },
  { service_page: 'google-ads', name: 'Krisha Eye Hospital',   tag: 'Eye Care',            logo_url: 'https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png', logo_bg: '#f0faff', order_index: 12 },
  { service_page: 'google-ads', name: 'Spinx Digital',         tag: 'Digital Agency',      logo_url: 'https://cdn-eahjn.nitrocdn.com/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-4b7d23a/www.spinxdigital.com/app/uploads/2023/03/spinx-logo-white.png', logo_bg: '#1a1a2e', order_index: 13 },

  // ── Meta Ads ────────────────────────────────────────────────────
  { service_page: 'meta-ads', name: 'Silverstone Financial',  tag: 'Financial Services', logo_url: 'https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png',  logo_bg: '#f0faff', order_index: 0 },
  { service_page: 'meta-ads', name: 'The Grand Palace',       tag: 'Hospitality',        logo_url: 'https://www.thegrandpalace.com.au/wp-content/uploads/2025/04/Logo-removebg-preview.png',           logo_bg: '#fffbf0', order_index: 1 },
  { service_page: 'meta-ads', name: 'Mainstream Real Estate', tag: 'Real Estate',        logo_url: 'https://mainstreamrealestate.com.au/wp-content/uploads/2023/02/logo-320x184-1.png',               logo_bg: '#f0fff8', order_index: 2 },
  { service_page: 'meta-ads', name: 'Parasher Academy',       tag: 'Education',          logo_url: 'https://parasher.academy/wp-content/uploads/2025/02/Logo-02_1700647906259.png',                    logo_bg: '#f5f0ff', order_index: 3 },
  { service_page: 'meta-ads', name: 'Upmatrix',               tag: 'Tech & Software',    logo_url: 'https://upmatrix.in/wp-content/uploads/2025/09/UpMatrix-Logo-1.svg',                               logo_bg: '#f0f4ff', order_index: 4 },
  { service_page: 'meta-ads', name: 'Inn of the Dove',        tag: 'Hospitality',        logo_url: 'https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp',                             logo_bg: '#fff8f5', order_index: 5 },
  { service_page: 'meta-ads', name: 'Game Zone Events',       tag: 'Events',             logo_url: 'https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png',            logo_bg: '#f5fff5', order_index: 6 },
  { service_page: 'meta-ads', name: 'Dr Ronak Patel',         tag: 'Healthcare',         logo_url: 'https://drronakpatel.in/wp-content/uploads/2025/10/LOGO-PNG-1024x1024.png',                        logo_bg: '#f0f7ff', order_index: 7 },
  { service_page: 'meta-ads', name: 'Atul Bakery',            tag: 'Food & Bakery',      logo_url: 'https://image.pngaaa.com/331/3078331-middle.png',                                                   logo_bg: '#fff8f0', order_index: 8 },
  { service_page: 'meta-ads', name: 'AMVI Hospitals',         tag: 'Healthcare',         logo_url: 'https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png',               logo_bg: '#f5f0ff', order_index: 9 },
  { service_page: 'meta-ads', name: 'Krisha Hospital',        tag: 'Healthcare',         logo_url: 'https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png',                             logo_bg: '#fff0f5', order_index: 10 },
  { service_page: 'meta-ads', name: 'Krisha Eye Hospital',    tag: 'Eye Care',           logo_url: 'https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png',logo_bg: '#f0faff', order_index: 11 },
  { service_page: 'meta-ads', name: 'Grand Bavarchi',         tag: 'Restaurant',         logo_url: 'https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png',                             logo_bg: '#fff8f0', order_index: 12 },
  { service_page: 'meta-ads', name: 'Shukan Hospital',        tag: 'Healthcare',         logo_url: 'https://shukanhospital.com/wp-content/uploads/2025/11/Frame-16-removebg-preview.png',              logo_bg: '#f0fff8', order_index: 13 },
];

async function seed() {
  try {
    const existing = await ClientLogo.count();
    if (existing > 0) {
      console.log(`Already seeded (${existing} logos in DB). Skipping.`);
      console.log('To re-seed, run: DELETE FROM client_logos; then re-run this script.');
      process.exit(0);
    }
    await ClientLogo.bulkCreate(logos);
    console.log(`✅ Seeded ${logos.length} client logos across ${[...new Set(logos.map(l => l.service_page))].length} service pages.`);
    process.exit(0);
  } catch (e) {
    console.error('❌ Seed failed:', e.message);
    process.exit(1);
  }
}

seed();
