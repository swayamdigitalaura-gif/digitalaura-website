/**
 * Add CMSIcon to all content files across the project.
 * Strategy: Find static icon usages like <Globe size={n} style={{ color: ... }} />
 * and wrap them with CMSIcon or replace with CMSIcon component.
 *
 * We target: icon rendered inside card/section containers with size + color props.
 * Pattern: <IconName size={N} style={{ color: "..." }} />
 *          <IconName size={N} color="..." />
 *          <icon.name size={N} style={{ color: ... }} />  (dynamic - skip)
 */
const fs = require('fs');
const path = require('path');

// Files to process (skip ui/, modals, navbar, scroll button, floating elements)
const targetFiles = [
  './digital-aura-project/src/components/WhatWeDo.tsx',
  './digital-aura-project/src/components/SolutionsSection.tsx',
  './digital-aura-project/src/components/ProcessSection.tsx',
  './digital-aura-project/src/components/WhyChooseUs.tsx',
  './digital-aura-project/src/components/AIShowcase.tsx',
  './digital-aura-project/src/components/Services.tsx',
  './digital-aura-project/src/components/StatsBar.tsx',
  './digital-aura-project/src/components/OfficeLocations.tsx',
  './digital-aura-project/src/pages/About.tsx',
  './digital-aura-project/src/pages/Careers.tsx',
  './digital-aura-project/src/pages/EngagementModelsPage.tsx',
  './digital-aura-project/src/pages/ServicesPage.tsx',
  './digital-aura-project/src/pages/services/WebAppDevPage.tsx',
  './digital-aura-project/src/pages/services/FullStackDevelopmentPage.tsx',
  './digital-aura-project/src/pages/services/MobileAppDevPage.tsx',
  './digital-aura-project/src/pages/services/WooCommercePage.tsx',
  './digital-aura-project/src/pages/services/ShopifyPage.tsx',
  './digital-aura-project/src/pages/services/BigCommercePage.tsx',
  './digital-aura-project/src/pages/services/AIAutomationPage.tsx',
  './digital-aura-project/src/pages/services/AIChatbotAssistantPage.tsx',
  './digital-aura-project/src/pages/services/AIWebAppsPage.tsx',
  './digital-aura-project/src/pages/services/CustomAIWebSolutionsPage.tsx',
  './digital-aura-project/src/pages/services/AIApiIntegrationPage.tsx',
  './digital-aura-project/src/pages/services/ChatbotsAssistantsPage.tsx',
  './digital-aura-project/src/pages/services/CustomMLModelsPage.tsx',
  './digital-aura-project/src/pages/services/LLMPoweredAppsPage.tsx',
  './digital-aura-project/src/pages/services/WorkflowAutomationPage.tsx',
  './digital-aura-project/src/pages/services/PredictiveAnalyticsPage.tsx',
  './digital-aura-project/src/pages/services/SEOPage.tsx',
  './digital-aura-project/src/pages/services/GoogleAdsPage.tsx',
  './digital-aura-project/src/pages/services/MetaAdsPage.tsx',
  './digital-aura-project/src/pages/services/LinkedInYouTubePage.tsx',
  './digital-aura-project/src/pages/services/EmailWhatsAppPage.tsx',
  './digital-aura-project/src/pages/services/CROPage.tsx',
  './digital-aura-project/src/pages/services/DigitalMarketingPage.tsx',
  './digital-aura-project/src/pages/services/DesignBrandingPage.tsx',
];

// Prefix map by file
const prefixMap = {
  'WhatWeDo.tsx': 'whatwedo', 'SolutionsSection.tsx': 'solutions', 'ProcessSection.tsx': 'process',
  'WhyChooseUs.tsx': 'whyus', 'AIShowcase.tsx': 'aishow', 'Services.tsx': 'svc',
  'StatsBar.tsx': 'stats', 'OfficeLocations.tsx': 'offices', 'About.tsx': 'about',
  'Careers.tsx': 'careers', 'EngagementModelsPage.tsx': 'engage', 'ServicesPage.tsx': 'svcpg',
  'WebAppDevPage.tsx': 'webapp', 'FullStackDevelopmentPage.tsx': 'fullstack',
  'MobileAppDevPage.tsx': 'mobileapp', 'WooCommercePage.tsx': 'woo', 'ShopifyPage.tsx': 'shopify',
  'BigCommercePage.tsx': 'bigcommerce', 'AIAutomationPage.tsx': 'aiauto',
  'AIChatbotAssistantPage.tsx': 'aichatbot', 'AIWebAppsPage.tsx': 'aiwebapp',
  'CustomAIWebSolutionsPage.tsx': 'customai', 'AIApiIntegrationPage.tsx': 'aiapi',
  'ChatbotsAssistantsPage.tsx': 'chatbots', 'CustomMLModelsPage.tsx': 'mlmodels',
  'LLMPoweredAppsPage.tsx': 'llmapps', 'WorkflowAutomationPage.tsx': 'workflow',
  'PredictiveAnalyticsPage.tsx': 'predictive', 'SEOPage.tsx': 'seo',
  'GoogleAdsPage.tsx': 'gads', 'MetaAdsPage.tsx': 'metaads',
  'LinkedInYouTubePage.tsx': 'linkedin', 'EmailWhatsAppPage.tsx': 'emailwa',
  'CROPage.tsx': 'cro', 'DigitalMarketingPage.tsx': 'digmkt', 'DesignBrandingPage.tsx': 'design',
};

// Known lucide icon names (uppercase first letter, PascalCase)
const LUCIDE_ICONS = new Set([
  'Globe','Globe2','Smartphone','Cloud','ShoppingCart','Code','Code2','Layout','LayoutGrid',
  'Monitor','Tablet','Lightbulb','Target','Heart','Star','Zap','Shield','Users','TrendingUp',
  'BarChart3','BarChart','BarChart2','Check','CheckCircle','CheckCircle2','ArrowRight','ArrowLeft',
  'Plus','Search','Settings','Mail','Phone','MapPin','Clock','Calendar','Camera','Database',
  'Server','Cpu','Wifi','Lock','Bell','Bookmark','Tag','Flag','Award','Trophy','Layers',
  'Grid','Sidebar','Download','Upload','Share2','Copy','Edit','Trash2','RefreshCw','Loader',
  'AlertCircle','AlertTriangle','Info','HelpCircle','MessageCircle','MessageSquare','Send',
  'DollarSign','CreditCard','ShoppingBag','Package','Box','Truck','Plane','Rocket','Compass',
  'Home','Building2','Briefcase','BookOpen','FileText','Image','Video','Mic','Headphones',
  'ChevronDown','ChevronUp','ChevronLeft','ChevronRight','ExternalLink','Link','Sparkles',
  'Wand2','Palette','PenTool','Sun','Moon','Flashlight','Battery','Power','Plug','Bot',
  'Brain','Network','GitBranch','Terminal','Workflow','Wrench','Tool','Hammer',
  'Activity','Antenna','Archive','AtSign','Backpack','Binary','Blocks','Bolt',
  'CircuitBoard','Command','Cog','Coffee','Columns','Combine','Component','Codesandbox',
  'Crosshair','Dumbbell','Earth','Eye','EyeOff','Factory','Filter','Fingerprint',
  'Flame','FlaskConical','Focus','Forklift','Gauge','Gem','GitCommit','GitMerge',
  'GraduationCap','HandshakeIcon','Hexagon','Infinity','Key','Keyboard','Layers2','Layers3',
  'LayoutDashboard','LifeBuoy','LineChart','ListChecks','Locate','LogIn','LogOut',
  'Map','Maximize','Minimize','MousePointer','Navigation','Newspaper','Orbit',
  'Paintbrush','PieChart','Pin','Presentation','Printer','QrCode','Radio',
  'RefreshCcw','Repeat','Reply','Route','Rss','Scale','Scan','ScrollText',
  'Share','Signal','Sliders','Sparkle','Speaker','Split','Stamp','Store',
  'Swords','Table','Telescope','Timer','ToggleLeft','ToggleRight','Tornado',
  'Touchpad','Trophy','Tv','Umbrella','Unlink','Users2','Variable','Vibrate',
  'Voicemail','Volume','Volume2','Vote','Watch','Webhook','Wind','Wifi',
  'X','XCircle','Youtube','ZapOff','ZoomIn','ZoomOut',
  'Instagram','Linkedin','Twitter','Github','Facebook',
  'MessageSquareDashed','MessagesSquare','ShieldCheck','ShieldAlert',
  'ArrowUpRight','ArrowDownLeft','MoveRight','MoveLeft','CornerDownRight',
  'TrendingDown','LineChart','PlusCircle','MinusCircle','XCircle',
  'Circle','Square','Triangle','Hexagon','Octagon','Pentagon',
]);

let totalIcons = 0;

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  const file = path.basename(filePath);
  const prefix = prefixMap[file];
  if (!prefix) return;

  let src = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-icon-name/g) || []).length;
  let n = before + 1;

  // Check if CMSIcon is already imported
  const hasCMSImport = src.includes('CMSIcon');

  // Pattern 1: <IconName size={N} style={{ color: "COLOR" }} />
  // Pattern 2: <IconName size={N} style={{ color: varname }} />  — skip (dynamic)
  // Pattern 3: <IconName size={N} />  (no color — skip, can't determine color)

  // We replace: <ICON size={N} style={{ color: "COLOR" }} />
  // with: <CMSIcon cmsKey="prefix_icon_N" cmsLabel="ICON Icon" name="ICON" size={N} color="COLOR" />

  let changed = false;

  // Match <IconName size={number} style={{ color: "string" }} />
  // or <IconName size={number} style={{ color: '#xxx' }} />
  LUCIDE_ICONS.forEach(iconName => {
    // Pattern: <IconName size={N} style={{ color: "..." }} />
    const re1 = new RegExp(
      `<${iconName}\\s+size=\\{(\\d+)\\}\\s+style=\\{\\{\\s*color:\\s*["']([^"']+)["']\\s*\\}\\}\\s*\\/>`,
      'g'
    );
    src = src.replace(re1, (match, size, color) => {
      if (match.includes('data-cms-')) return match;
      changed = true;
      const key = `${prefix}_icon_${n++}`;
      return `<CMSIcon cmsKey="${key}" cmsLabel="${iconName} Icon" name="${iconName}" size={${size}} color="${color}" />`;
    });

    // Pattern: <IconName size={N} style={{ color: varExpr }} /> where varExpr is a variable/expression
    const re2 = new RegExp(
      `<${iconName}\\s+size=\\{(\\d+)\\}\\s+style=\\{\\{\\s*color:\\s*(\\{[^}]+\\}|[a-zA-Z_.]+(?:\\.[a-zA-Z_]+)*)\\s*,?\\s*(?:flexShrink:\\s*\\d+)?\\s*\\}\\}\\s*\\/>`,
      'g'
    );
    src = src.replace(re2, (match, size, colorExpr) => {
      if (match.includes('data-cms-') || match.includes('CMSIcon')) return match;
      // Only replace if colorExpr looks like a simple variable (no template literals)
      if (colorExpr.includes('`') || colorExpr.includes('(')) return match;
      changed = true;
      const key = `${prefix}_icon_${n++}`;
      return `<CMSIcon cmsKey="${key}" cmsLabel="${iconName} Icon" name="${iconName}" size={${size}} color={${colorExpr}} />`;
    });

    // Pattern: <IconName size={N} color="string" /> (direct color prop)
    const re3 = new RegExp(
      `<${iconName}\\s+size=\\{(\\d+)\\}\\s+color=["']([^"']+)["']\\s*\\/>`,
      'g'
    );
    src = src.replace(re3, (match, size, color) => {
      if (match.includes('data-cms-')) return match;
      changed = true;
      const key = `${prefix}_icon_${n++}`;
      return `<CMSIcon cmsKey="${key}" cmsLabel="${iconName} Icon" name="${iconName}" size={${size}} color="${color}" />`;
    });

    // Pattern: <IconName size={N} style={{ color: varExpr, flexShrink: 0 }} />
    const re4 = new RegExp(
      `<${iconName}\\s+size=\\{(\\d+)\\}\\s+style=\\{\\{\\s*color:\\s*([a-zA-Z_.]+(?:\\.[a-zA-Z_]+)*)\\s*,\\s*flexShrink:\\s*0\\s*\\}\\}\\s*\\/>`,
      'g'
    );
    src = src.replace(re4, (match, size, colorExpr) => {
      if (match.includes('data-cms-') || match.includes('CMSIcon')) return match;
      changed = true;
      const key = `${prefix}_icon_${n++}`;
      return `<CMSIcon cmsKey="${key}" cmsLabel="${iconName} Icon" name="${iconName}" size={${size}} color={${colorExpr}} />`;
    });
  });

  if (changed) {
    // Add CMSIcon import if not present
    if (!hasCMSImport) {
      src = src.replace(
        /^(import [^\n]+from ["']@\/components\/PageLayout["'];?\n?)/m,
        `$1import CMSIcon from "@/components/CMSIcon";\n`
      );
      // Fallback: add after first import block
      if (!src.includes('import CMSIcon')) {
        src = src.replace(
          /^(import \{ useSettings[^\n]*\n)/m,
          `$1import CMSIcon from "@/components/CMSIcon";\n`
        );
      }
      if (!src.includes('import CMSIcon')) {
        src = src.replace(
          /(import [^\n]+from ["']lucide-react["'];?\n)/,
          `$1import CMSIcon from "@/components/CMSIcon";\n`
        );
      }
    }

    const after = (src.match(/data-cms-icon-name/g) || []).length;
    totalIcons += (after - before);
    src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(filePath, src);
    console.log(`PATCHED ${file}: +${after - before} icons (${before} -> ${after})`);
  } else {
    // console.log(`no change: ${file}`);
  }
});

console.log(`\nTotal icons made editable: ${totalIcons}`);
