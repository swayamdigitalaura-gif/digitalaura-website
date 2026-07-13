/**
 * patch12-dynamic-icons.js
 * Adds iconName string to data arrays and replaces dynamic icon renders with CMSIcon.
 * Handles patterns like:
 *   { icon: Bot, color: "#hex", label: "..." }  →  adds iconName: "Bot"
 *   <chip.icon size={N} style={{ color: chip.color }} />  →  <CMSIcon .../>
 */
const fs = require('fs');
const path = require('path');

// Known lucide icons (PascalCase)
const LUCIDE_ICONS = [
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
  'Wand2','Palette','PenTool','Sun','Moon','Battery','Power','Plug','Bot',
  'Brain','Network','GitBranch','Terminal','Workflow','Wrench','Tool','Hammer',
  'Activity','Antenna','Archive','AtSign','Binary','Blocks','Bolt',
  'CircuitBoard','Command','Cog','Coffee','Columns','Component',
  'Crosshair','Dumbbell','Earth','Eye','EyeOff','Factory','Filter','Fingerprint',
  'Flame','FlaskConical','Focus','Gauge','Gem','GitCommit','GitMerge',
  'GraduationCap','Hexagon','Infinity','Key','Keyboard','Layers2','Layers3',
  'LayoutDashboard','LifeBuoy','LineChart','ListChecks','Locate','LogIn','LogOut',
  'Map','Maximize','Minimize','MousePointer','Navigation','Newspaper','Orbit',
  'Paintbrush','PieChart','Pin','Presentation','Printer','QrCode','Radio',
  'RefreshCcw','Repeat','Reply','Route','Rss','Scale','Scan','ScrollText',
  'Share','Signal','Sliders','Sparkle','Speaker','Split','Stamp','Store',
  'Swords','Table','Telescope','Timer','ToggleLeft','ToggleRight',
  'Touchpad','Tv','Umbrella','Unlink','Users2','Variable',
  'Voicemail','Volume','Volume2','Watch','Webhook','Wind',
  'X','XCircle','Youtube','ZapOff','ZoomIn','ZoomOut',
  'Instagram','Linkedin','Twitter','Github','Facebook',
  'MessageSquareDashed','ShieldCheck','ShieldAlert',
  'ArrowUpRight','ArrowDownLeft','MoveRight','MoveLeft','CornerDownRight',
  'TrendingDown','PlusCircle','MinusCircle',
  'Circle','Square','Triangle','Hexagon','Octagon','Pentagon',
  'CheckSquare','Layout','LayoutTemplate','SlidersHorizontal',
  'MessageCircleCode','MessageCircleMore','Accessibility',
  'Banknote','Receipt','ChevronsRight','ChevronsLeft',
  'PlayCircle','PauseCircle','StopCircle','SkipForward',
  'Lightbulb','ShieldOff','WifiOff','CloudOff','BellOff',
  'UserCheck','UserPlus','UserMinus','UserX',
  'FilePlus','FileMinus','FileCheck','FileX',
  'FolderOpen','FolderPlus','FolderMinus',
  'PlugZap','Cpu','HardDrive','MemoryStick','ScanLine',
  'Scaling','Shrink','Expand','Maximize2','Minimize2',
  'MoreHorizontal','MoreVertical','AlignLeft','AlignRight','AlignCenter',
  'Bold','Italic','Underline','Strikethrough',
  'List','ListOrdered','Indent','Outdent',
  'Columns2','Columns3','Rows2','Rows3',
  'Layout','LayoutList','LayoutPanelLeft','LayoutPanelTop',
];

const ICON_SET = new Set(LUCIDE_ICONS);

const prefixMap = {
  'WhatWeDo.tsx': 'whatwedo',
  'SolutionsSection.tsx': 'solutions',
  'ProcessSection.tsx': 'process',
  'WhyChooseUs.tsx': 'whyus',
  'AIShowcase.tsx': 'aishow',
  'Services.tsx': 'svc',
  'StatsBar.tsx': 'stats',
  'OfficeLocations.tsx': 'offices',
  'About.tsx': 'about',
  'Careers.tsx': 'careers',
  'EngagementModelsPage.tsx': 'engage',
  'ServicesPage.tsx': 'svcpg',
  'WebAppDevPage.tsx': 'webapp',
  'FullStackDevelopmentPage.tsx': 'fullstack',
  'MobileAppDevPage.tsx': 'mobileapp',
  'WooCommercePage.tsx': 'woo',
  'ShopifyPage.tsx': 'shopify',
  'BigCommercePage.tsx': 'bigcommerce',
  'AIAutomationPage.tsx': 'aiauto',
  'AIChatbotAssistantPage.tsx': 'aichatbot',
  'AIWebAppsPage.tsx': 'aiwebapp',
  'CustomAIWebSolutionsPage.tsx': 'customai',
  'AIApiIntegrationPage.tsx': 'aiapi',
  'ChatbotsAssistantsPage.tsx': 'chatbots',
  'CustomMLModelsPage.tsx': 'mlmodels',
  'LLMPoweredAppsPage.tsx': 'llmapps',
  'WorkflowAutomationPage.tsx': 'workflow',
  'PredictiveAnalyticsPage.tsx': 'predictive',
  'SEOPage.tsx': 'seo',
  'GoogleAdsPage.tsx': 'gads',
  'MetaAdsPage.tsx': 'metaads',
  'LinkedInYouTubePage.tsx': 'linkedin',
  'EmailWhatsAppPage.tsx': 'emailwa',
  'CROPage.tsx': 'cro',
  'DigitalMarketingPage.tsx': 'digmkt',
  'DesignBrandingPage.tsx': 'design',
};

const targetFiles = Object.keys(prefixMap).map(f => {
  if (['WhatWeDo.tsx','SolutionsSection.tsx','ProcessSection.tsx','WhyChooseUs.tsx','AIShowcase.tsx','Services.tsx','StatsBar.tsx','OfficeLocations.tsx'].includes(f)) {
    return `./digital-aura-project/src/components/${f}`;
  } else if (['About.tsx','Careers.tsx','EngagementModelsPage.tsx','ServicesPage.tsx'].includes(f)) {
    return `./digital-aura-project/src/pages/${f}`;
  } else {
    return `./digital-aura-project/src/pages/services/${f}`;
  }
});

let totalChanged = 0;

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  const file = path.basename(filePath);
  const prefix = prefixMap[file];
  if (!prefix) return;

  let src = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const origSrc = src;

  // Step 1: Add iconName: "IconName" after each `icon: IconName,` in array object literals
  // Pattern: icon: SomeIcon, (on same line, in object)
  // We add iconName: "SomeIcon", right after
  LUCIDE_ICONS.forEach(iconName => {
    // Match: icon: IconName, (not already having iconName nearby)
    // Must be in object context - preceded by whitespace/newline
    const re = new RegExp(
      `(\\bicon:\\s*${iconName}\\b(?!Name))([,\\s])`,
      'g'
    );
    src = src.replace(re, (match, iconPart, after) => {
      // Check if iconName already present nearby (in next 60 chars)
      return match; // we'll handle this differently below
    });
  });

  // Better approach: find all `icon: ICONNAME,` lines and add iconName
  // Pattern: `  icon: Bot,` or `icon: Globe,`
  const iconFieldRe = /(\bicon:\s*)([A-Z][a-zA-Z0-9]+)(,)/g;
  src = src.replace(iconFieldRe, (match, prefix2, iconName, comma) => {
    if (!ICON_SET.has(iconName)) return match;
    // Check if there's already an iconName field nearby — look in surrounding 200 chars
    // We'll just always add it and deduplicate later
    return `${prefix2}${iconName}${comma} iconName: "${iconName}",`;
  });

  // Step 2: Remove duplicate iconName fields if they appeared
  // Pattern: `iconName: "X", iconName: "X",` — keep only first
  src = src.replace(/(iconName:\s*"[^"]+",\s*)(iconName:\s*"[^"]+",\s*)/g, '$1');

  // Step 3: Replace dynamic icon renders with CMSIcon
  // Common patterns:
  // <varname.icon size={N} style={{ color: varname.color }} />
  // <varname.icon size={N} style={{ color: varname.color, flexShrink: 0 }} />
  // <varname.icon size={N} style={{ color: "string" }} />
  // <varname.icon size={N} color="string" />
  // <varname.icon size={N} />  (no color — skip)

  let iconCounter = 100; // start high to avoid collision with static icons

  // Pattern: <varname.icon size={N} style={{ color: varname.something }} />
  // Also handles: <varname.icon size={N} style={{ color: varname.something, flexShrink: 0 }} />
  const dynRe1 = /(<)([a-z][a-zA-Z0-9]*)\.icon(\s+)size=\{(\d+)\}(\s+)style=\{\{\s*color:\s*([a-zA-Z][a-zA-Z0-9]*(?:\.[a-zA-Z][a-zA-Z0-9]*)*)(?:\s*,\s*flexShrink:\s*0)?\s*\}\}(\s*\/>)/g;
  src = src.replace(dynRe1, (match, lt, varname, sp1, size, sp2, colorExpr, end) => {
    if (match.includes('CMSIcon')) return match;
    const key = `${prefix}_dyn_${iconCounter++}`;
    return `<CMSIcon cmsKey={\`${key}_\${${varname}.iconName||'icon'}\`} cmsLabel={"Icon"} name={${varname}.iconName || "Star"} size={${size}} color={${colorExpr}} />`;
  });

  // Pattern: <varname.icon size={N} style={{ color: "string" }} />
  const dynRe2 = /(<)([a-z][a-zA-Z0-9]*)\.icon(\s+)size=\{(\d+)\}(\s+)style=\{\{\s*color:\s*["']([^"']+)["']\s*\}\}(\s*\/>)/g;
  src = src.replace(dynRe2, (match, lt, varname, sp1, size, sp2, color, end) => {
    if (match.includes('CMSIcon')) return match;
    const key = `${prefix}_dyn_${iconCounter++}`;
    return `<CMSIcon cmsKey={\`${key}_\${${varname}.iconName||'icon'}\`} cmsLabel={"Icon"} name={${varname}.iconName || "Star"} size={${size}} color="${color}" />`;
  });

  // Pattern: <varname.icon size={N} color="string" />
  const dynRe3 = /(<)([a-z][a-zA-Z0-9]*)\.icon(\s+)size=\{(\d+)\}(\s+)color=["']([^"']+)["'](\s*\/>)/g;
  src = src.replace(dynRe3, (match, lt, varname, sp1, size, sp2, color, end) => {
    if (match.includes('CMSIcon')) return match;
    const key = `${prefix}_dyn_${iconCounter++}`;
    return `<CMSIcon cmsKey={\`${key}_\${${varname}.iconName||'icon'}\`} cmsLabel={"Icon"} name={${varname}.iconName || "Star"} size={${size}} color="${color}" />`;
  });

  // Pattern: <varname.icon size={N} color={varname.something} />
  const dynRe4 = /(<)([a-z][a-zA-Z0-9]*)\.icon(\s+)size=\{(\d+)\}(\s+)color=\{([a-zA-Z][a-zA-Z0-9]*(?:\.[a-zA-Z][a-zA-Z0-9]*)*)\}(\s*\/>)/g;
  src = src.replace(dynRe4, (match, lt, varname, sp1, size, sp2, colorExpr, end) => {
    if (match.includes('CMSIcon')) return match;
    const key = `${prefix}_dyn_${iconCounter++}`;
    return `<CMSIcon cmsKey={\`${key}_\${${varname}.iconName||'icon'}\`} cmsLabel={"Icon"} name={${varname}.iconName || "Star"} size={${size}} color={${colorExpr}} />`;
  });

  // Pattern with index: <varname.icon size={N} style={{ color: varname.color }} /> where there may be surrounding map context
  // Also handle: <item.icon ...>, <step.icon ...>, <perk.icon ...>, etc.

  if (src === origSrc) return; // no changes

  // Add CMSIcon import if not already present
  if (!src.includes('CMSIcon') && src !== origSrc) return; // no icon replacements happened
  if (src.includes('CMSIcon') && !src.includes('import CMSIcon')) {
    // Add import after lucide-react import
    const lucideImportRe = /(import \{[^}]+\} from ['"]lucide-react['"];?\n)/;
    if (lucideImportRe.test(src)) {
      src = src.replace(lucideImportRe, `$1import CMSIcon from "@/components/CMSIcon";\n`);
    } else {
      // Add after first import
      src = src.replace(/(^import [^\n]+\n)/, `$1import CMSIcon from "@/components/CMSIcon";\n`);
    }
  }

  src = src.replace(/\n/g, '\r\n');
  fs.writeFileSync(filePath, src);
  console.log(`PATCHED ${file}`);
  totalChanged++;
});

console.log(`\nDone. Files changed: ${totalChanged}`);
