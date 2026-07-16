import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";


// Pages
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import AIAutomationPage from "./pages/services/AIAutomationPage.tsx";
import AIChatbotAssistantPage from "./pages/services/AIChatbotAssistantPage.tsx";
import AIWebAppsPage from "./pages/services/AIWebAppsPage.tsx";
import CustomAIWebSolutionsPage from "./pages/services/CustomAIWebSolutionsPage.tsx";
import WebAppDevPage from "./pages/services/WebAppDevPage.tsx";
import DigitalMarketingPage from "./pages/services/DigitalMarketingPage.tsx";
import DesignBrandingPage from "./pages/services/DesignBrandingPage.tsx";
import ShopifyPage from "./pages/services/ShopifyPage.tsx";
import WooCommercePage from "./pages/services/WooCommercePage.tsx";
import FullStackDevelopmentPage from "./pages/services/FullStackDevelopmentPage.tsx";
import WordPressPage from "./pages/services/WordPressPage.tsx";
import SEOPage from "./pages/services/SEOPage.tsx";
import GoogleAdsPage from "./pages/services/GoogleAdsPage.tsx";
import MetaAdsPage from "./pages/services/MetaAdsPage.tsx";
import EmailWhatsAppPage from "./pages/services/EmailWhatsAppPage.tsx";
import LinkedInYouTubePage from "./pages/services/LinkedInYouTubePage.tsx";
import CROPage from "./pages/services/CROPage.tsx";
import MobileAppDevPage from "./pages/services/MobileAppDevPage.tsx";
import LLMPoweredAppsPage from "./pages/services/LLMPoweredAppsPage.tsx";
import ChatbotsAssistantsPage from "./pages/services/ChatbotsAssistantsPage.tsx";
import WorkflowAutomationPage from "./pages/services/WorkflowAutomationPage.tsx";
import PredictiveAnalyticsPage from "./pages/services/PredictiveAnalyticsPage.tsx";
import AIApiIntegrationPage from "./pages/services/AIApiIntegrationPage.tsx";
import CustomMLModelsPage from "./pages/services/CustomMLModelsPage.tsx";
import AISolutionsPage from "./pages/AISolutionsPage.tsx";
import CaseStudiesPage from "./pages/CaseStudiesPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import EngagementModelsPage from "./pages/EngagementModelsPage.tsx";
import CareersPage from "./pages/Careers.tsx";
import JobDetailPage from "./pages/JobDetailPage.tsx";
import ScrollToTopButton from "./components/ScrollToTopButton.tsx";
import PageSEO from "./components/PageSEO.tsx";
import AndroidDevelopmentPage from "./pages/services/AndroidDevelopmentPage.tsx";
import FlutterAppsPage from "./pages/services/FlutterAppsPage.tsx";
import ReactNativeAppsPage from "./pages/services/ReactNativeAppsPage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage.tsx";
import CancellationRefundPage from "./pages/CancellationRefundPage.tsx";
import TestimonialsPage from "./pages/TestimonialsPage.tsx";
import AIFilmmakingPage from "./pages/services/AIFilmmakingPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageSEO />
        <ScrollToTopButton />
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Index />} />

          {/* Core pages */}
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<JobDetailPage />} />
          <Route path="/engagement-models" element={<EngagementModelsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Services hub */}
          <Route path="/services" element={<ServicesPage />} />

          {/* Service sub-pages */}
          <Route path="/services/ai-automation" element={<AIAutomationPage />} />
          <Route path="/services/ai-chatbot-assistant" element={<AIChatbotAssistantPage />} />
          <Route path="/services/ai-powered-web-apps" element={<AIWebAppsPage />} />
          <Route path="/services/custom-ai-web-solutions" element={<CustomAIWebSolutionsPage />} />
          <Route path="/services/web-app-development" element={<WebAppDevPage />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
          <Route path="/services/design-branding" element={<DesignBrandingPage />} />
          <Route path="/services/shopify-development" element={<ShopifyPage />} />
          <Route path="/services/woocommerce-development" element={<WooCommercePage />} />
          <Route path="/services/full-stack-development" element={<FullStackDevelopmentPage />} />
          <Route path="/services/wordpress-development" element={<WordPressPage />} />
          <Route path="/services/seo-content-marketing" element={<SEOPage />} />
          <Route path="/services/google-ads" element={<GoogleAdsPage />} />
          <Route path="/services/meta-ads" element={<MetaAdsPage />} />
          <Route path="/services/email-whatsapp-marketing" element={<EmailWhatsAppPage />} />
          <Route path="/services/linkedin-youtube-ads" element={<LinkedInYouTubePage />} />
          <Route path="/services/cro" element={<CROPage />} />
          <Route path="/services/mobile-app-development" element={<MobileAppDevPage />} />
          <Route path="/mobile-apps" element={<MobileAppDevPage />} />
          <Route path="/services/android-development" element={<AndroidDevelopmentPage />} />
          <Route path="/services/flutter-apps" element={<FlutterAppsPage />} />
          <Route path="/services/react-native-apps" element={<ReactNativeAppsPage />} />

          {/* AI sub-service pages */}
          <Route path="/services/ai/llm-powered-apps" element={<LLMPoweredAppsPage />} />
          <Route path="/services/ai/chatbots-assistants" element={<ChatbotsAssistantsPage />} />
          <Route path="/services/ai/workflow-automation" element={<WorkflowAutomationPage />} />
          <Route path="/services/ai/predictive-analytics" element={<PredictiveAnalyticsPage />} />
          <Route path="/services/ai/api-integration" element={<AIApiIntegrationPage />} />
          <Route path="/services/ai/custom-ml-models" element={<CustomMLModelsPage />} />

          {/* AI Solutions hub */}
          <Route path="/ai-solutions" element={<AISolutionsPage />} />

          {/* Testimonials */}
          <Route path="/testimonials" element={<TestimonialsPage />} />

          <Route path="/services/ai-filmmaking" element={<AIFilmmakingPage />} />

          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/cancellation-refund-policy" element={<CancellationRefundPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
