import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  useCMSEditor();
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingElements />
    </div>
  );
};

export default PageLayout;
