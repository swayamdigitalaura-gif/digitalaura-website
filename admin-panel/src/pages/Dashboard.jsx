import { useEffect, useState } from 'react';
import api from '../api';
import { FileText, BookOpen, Briefcase, Star, Image, Users, TrendingUp, Globe } from 'lucide-react';

const Card = ({ icon: Icon, label, value, color }) => (
  <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={22} style={{ color }} />
    </div>
    <div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A' }}>{value}</div>
      <div style={{ fontSize: 13, color: '#64748B' }}>{label}</div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({ pages: 0, blogs: 0, careers: 0, testimonials: 0, media: 0, team: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/pages'), api.get('/blogs'), api.get('/careers'),
      api.get('/testimonials'), api.get('/media'), api.get('/team/all'),
    ]).then(([p, b, c, t, m, tm]) => {
      setStats({ pages: p.data.data.length, blogs: b.data.data.length, careers: c.data.data.length, testimonials: t.data.data.length, media: m.data.data.length, team: tm.data.data.length });
    }).catch(() => {});
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Welcome back! Here's your site overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <Card icon={FileText}  label="Total Pages"       value={stats.pages}        color="#1A6FE8" />
        <Card icon={BookOpen}  label="Blog Posts"        value={stats.blogs}        color="#7C3AED" />
        <Card icon={Briefcase} label="Job Openings"      value={stats.careers}      color="#FF6B2B" />
        <Card icon={Star}      label="Testimonials"      value={stats.testimonials} color="#F59E0B" />
        <Card icon={Users}     label="Team Members"      value={stats.team}         color="#22C55E" />
        <Card icon={Image}     label="Media Files"       value={stats.media}        color="#0EA5E9" />
      </div>

      {/* Quick actions */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {[
            { label: '+ New Blog Post', to: '/blogs?new=1', color: '#7C3AED' },
            { label: '+ New Job Opening', to: '/careers?new=1', color: '#FF6B2B' },
            { label: 'Manage Team', to: '/team', color: '#22C55E' },
            { label: 'Edit Home Page', to: '/pages', color: '#1A6FE8' },
            { label: 'Upload Media', to: '/media', color: '#0EA5E9' },
            { label: 'Site Settings', to: '/settings', color: '#64748B' },
          ].map(a => (
            <a key={a.label} href={a.to}
              style={{ padding: '9px 18px', borderRadius: 8, background: `${a.color}12`, color: a.color, fontWeight: 600, fontSize: 13.5, textDecoration: 'none', border: `1px solid ${a.color}25` }}>
              {a.label}
            </a>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{ marginTop: 20, padding: 20, background: '#EFF6FF', borderRadius: 12, border: '1px solid #BFDBFE' }}>
        <div style={{ fontSize: 13.5, color: '#1D4ED8', fontWeight: 600, marginBottom: 6 }}>🚀 Getting Started</div>
        <ul style={{ color: '#1E40AF', fontSize: 13, lineHeight: 1.8, paddingLeft: 18 }}>
          <li>Go to <strong>Pages & Builder</strong> to edit any page with the visual drag-drop builder</li>
          <li>Use <strong>Blogs</strong> to create and manage blog posts</li>
          <li>Manage job listings and view applications in <strong>Careers</strong></li>
          <li>Upload images in <strong>Media Library</strong> and use them anywhere</li>
          <li>Update company info, social links, and stats in <strong>Site Settings</strong></li>
        </ul>
      </div>
    </div>
  );
}
