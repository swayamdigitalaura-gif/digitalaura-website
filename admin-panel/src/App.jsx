import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pages from './pages/Pages';
import PageBuilder from './pages/PageBuilder';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import Testimonials from './pages/Testimonials';
import MediaLibrary from './pages/MediaLibrary';
import Navigation from './pages/Navigation';
import SiteSettings from './pages/SiteSettings';
import TeamMembers from './pages/TeamMembers';
import ClientLogos from './pages/ClientLogos';
import Inquiries from './pages/Inquiries';
import SitemapManager from './pages/SitemapManager';
import RobotsEditor from './pages/RobotsEditor';
import Redirects from './pages/Redirects';
import HeaderFooter from './pages/HeaderFooter';
import LandingPages from './pages/LandingPages';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0F172A', color: '#FF6B2B', fontSize: 18, fontWeight: 700 }}>
      Loading...
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="pages" element={<Pages />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="careers" element={<Careers />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="client-logos" element={<ClientLogos />} />
        <Route path="team" element={<TeamMembers />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="navigation" element={<Navigation />} />
        <Route path="settings" element={<SiteSettings />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="sitemap" element={<SitemapManager />} />
        <Route path="robots" element={<RobotsEditor />} />
        <Route path="redirects" element={<Redirects />} />
        <Route path="header-footer" element={<HeaderFooter />} />
        <Route path="landing-pages" element={<LandingPages />} />
      </Route>
      <Route path="/pages/:id/builder" element={<PrivateRoute><PageBuilder /></PrivateRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || '/'}>
        <Toaster position="top-right" toastOptions={{ style: { fontSize: 14, fontWeight: 600 } }} />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
