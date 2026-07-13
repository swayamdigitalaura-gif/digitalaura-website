import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import {
  LayoutDashboard, FileText, Image, BookOpen, Briefcase,
  Star, Settings, LogOut, Globe, Navigation, Users, Award, Inbox, Map, Bot, ArrowLeftRight, Code2, LayoutTemplate,
} from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inquiries', icon: Inbox, label: 'Inquiries' },
  { to: '/landing-pages', icon: LayoutTemplate, label: 'Landing Pages' },
  { to: '/pages', icon: FileText, label: 'Pages & Builder' },
  { to: '/blogs', icon: BookOpen, label: 'Blogs' },
  { to: '/careers', icon: Briefcase, label: 'Careers' },
  { to: '/testimonials', icon: Star, label: 'Testimonials' },
  { to: '/client-logos', icon: Award, label: 'Client Logos' },
  { to: '/team', icon: Users, label: 'Team Members' },
  { to: '/media', icon: Image, label: 'Media Library' },
  { to: '/navigation', icon: Navigation, label: 'Navigation' },
  { to: '/settings', icon: Settings, label: 'Site Settings' },
  { to: '/sitemap', icon: Map, label: 'Sitemap' },
  { to: '/robots', icon: Bot, label: 'robots.txt' },
  { to: '/redirects', icon: ArrowLeftRight, label: 'Redirects' },
  { to: '/header-footer', icon: Code2, label: 'Header & Footer' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside style={{ width: 240, minHeight: '100vh', background: '#0F172A', display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50 }}>
      {/* Logo */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={logo} alt="Digital Aura" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
        <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Admin Panel</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
              borderRadius: 8, marginBottom: 3, textDecoration: 'none', fontSize: 13.5, fontWeight: 500,
              color: isActive ? '#FF6B2B' : '#94A3B8',
              background: isActive ? 'rgba(255,107,43,0.1)' : 'transparent',
              transition: 'all 0.15s',
            })}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Preview site */}
      <div style={{ padding: '10px 10px' }}>
        <a href={import.meta.env.VITE_SITE_BASE || 'http://localhost:8083'} target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(26,111,232,0.12)', color: '#1A6FE8', fontSize: 12.5, fontWeight: 600, textDecoration: 'none' }}>
          <Globe size={14} /> View Live Site
        </a>
      </div>

      {/* User */}
      <div style={{ padding: '12px 12px 16px', borderTop: '1px solid #1E293B', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B2B,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
          {user?.name?.[0] || 'A'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#E2E8F0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
          <div style={{ fontSize: 11, color: '#64748B' }}>{user?.role}</div>
        </div>
        <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: 4 }} title="Logout">
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
