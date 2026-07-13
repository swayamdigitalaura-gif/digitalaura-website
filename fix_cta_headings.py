import os, glob

pages_dir = r"d:\claudeproject\digitalaura\digital-aura-project\src\pages\services"

# Map: old heading text -> new heading with gradient spans
# Only the FINAL CTA heading (tracking-tight ones, not the duplicates)
replacements = {
    # AIApiIntegrationPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Connect Your Stack With AI?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Connect Your Stack <span className="text-orange-gradient">With AI</span>?</h2>',

    # AIAutomationPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Find Your First Automation in 60 Minutes.</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Find Your First <span className="text-orange-gradient">Automation</span> in <span className="text-purple-gradient">60 Minutes</span>.</h2>',

    # AIChatbotAssistantPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Build an Assistant That Actually Resolves Things.</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Build an <span className="text-orange-gradient">Assistant</span> That Actually <span className="text-purple-gradient">Resolves Things</span>.</h2>',

    # BigCommercePage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Scale on BigCommerce?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Scale</span> on <span className="text-purple-gradient">BigCommerce</span>?</h2>',

    # CROPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Convert More of the Traffic You Already Have?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Convert More</span> of the Traffic You Already Have?</h2>',

    # ChatbotsAssistantsPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Deploy an AI Assistant That Actually Works?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Deploy an <span className="text-orange-gradient">AI Assistant</span> That <span className="text-purple-gradient">Actually Works</span>?</h2>',

    # CustomAIWebSolutionsPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Build the Platform Your Business Actually Needs.</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Build the <span className="text-orange-gradient">Platform</span> Your Business <span className="text-purple-gradient">Actually Needs</span>.</h2>',

    # CustomMLModelsPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build a Model Trained on Your Data?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build a <span className="text-orange-gradient">Model</span> Trained on <span className="text-purple-gradient">Your Data</span>?</h2>',

    # DesignBrandingPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build a Brand That Stands Out?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build a <span className="text-orange-gradient">Brand</span> That <span className="text-purple-gradient">Stands Out</span>?</h2>',

    # DigitalMarketingPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Grow Your Business Online?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Grow</span> Your Business <span className="text-purple-gradient">Online</span>?</h2>',

    # EmailWhatsAppPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Turn Your List Into Revenue?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Turn Your List Into <span className="text-orange-gradient">Revenue</span>?</h2>',

    # FullStackDevelopmentPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Build Something That Works in Production.</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Let\'s Build Something That <span className="text-orange-gradient">Works</span> in <span className="text-purple-gradient">Production</span>.</h2>',

    # GoogleAdsPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Get More Leads From Google?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Get <span className="text-orange-gradient">More Leads</span> From <span className="text-purple-gradient">Google</span>?</h2>',

    # LLMPoweredAppsPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build With the World\'s Most Powerful Language Models?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build With the World\'s Most <span className="text-orange-gradient">Powerful</span> <span className="text-purple-gradient">Language Models</span>?</h2>',

    # LinkedInYouTubePage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build an Audience That Converts?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build an <span className="text-orange-gradient">Audience</span> That <span className="text-purple-gradient">Converts</span>?</h2>',

    # MetaAdsPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Scale With Facebook and Instagram Ads?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Scale</span> With <span className="text-purple-gradient">Facebook and Instagram Ads</span>?</h2>',

    # MobileAppDevPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Launch Your Mobile App?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Launch</span> Your <span className="text-purple-gradient">Mobile App</span>?</h2>',

    # PredictiveAnalyticsPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Make Decisions With Predictive Intelligence?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Make <span className="text-orange-gradient">Decisions</span> With <span className="text-purple-gradient">Predictive Intelligence</span>?</h2>',

    # SEOPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Rank on Page 1?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Rank</span> on <span className="text-purple-gradient">Page 1</span>?</h2>',

    # ShopifyPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Launch Your Shopify Store?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Launch</span> Your <span className="text-purple-gradient">Shopify Store</span>?</h2>',

    # WebAppDevPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build a Web App That Performs?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build a <span className="text-orange-gradient">Web App</span> That <span className="text-purple-gradient">Performs</span>?</h2>',

    # WooCommercePage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build Your WooCommerce Store?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Build Your <span className="text-orange-gradient">WooCommerce</span> <span className="text-purple-gradient">Store</span>?</h2>',

    # WorkflowAutomationPage
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Automate Your Most Repetitive Workflows?</h2>':
    '<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to <span className="text-orange-gradient">Automate</span> Your Most Repetitive <span className="text-purple-gradient">Workflows</span>?</h2>',
}

updated = 0
for fpath in glob.glob(os.path.join(pages_dir, "*.tsx")):
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)

    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {os.path.basename(fpath)}")
        updated += 1

print(f"\nTotal updated: {updated}")
