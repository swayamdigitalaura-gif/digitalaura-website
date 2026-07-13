import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Trash2, Mail, Phone, Globe, Building2, ExternalLink } from 'lucide-react';

const PAGES = [
  { key: 'seo-services-ahmedabad',      label: 'SEO Services',  color: '#7C3AED', url: '/seo-services-ahmedabad' },
  { key: 'google-ads-agency-ahmedabad', label: 'Google Ads',    color: '#1A6FE8', url: '/google-ads-agency-ahmedabad' },
];

const STATUS_COLOR = { new: '#1A6FE8', contacted: '#22C55E', closed: '#94A3B8' };
const STATUS_BG    = { new: '#EFF6FF', contacted: '#F0FDF4', closed: '#F8FAFF' };

export default function LandingPages() {
  const [allLeads, setAllLeads]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState(PAGES[0].key);
  const [filter, setFilter]       = useState('all');
  const [expanded, setExpanded]   = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get('/contact');
      const all = (r.data.data || []).filter(i =>
        PAGES.some(p => p.key === i.source)
      );
      setAllLeads(all);
    } catch { toast.error('Failed to load leads'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      setAllLeads(prev => prev.map(i => i.id === id ? { ...i, status } : i));
      toast.success('Status updated');
    } catch { toast.error('Failed to update'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setAllLeads(prev => prev.filter(i => i.id !== id));
      toast.success('Deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const page = PAGES.find(p => p.key === activeTab);
  const pageLeads = allLeads.filter(i => i.source === activeTab);
  const filtered  = filter === 'all' ? pageLeads : pageLeads.filter(i => i.status === filter);
  const counts = {
    all: pageLeads.length,
    new: pageLeads.filter(i => i.status === 'new').length,
    contacted: pageLeads.filter(i => i.status === 'contacted').length,
    closed: pageLeads.filter(i => i.status === 'closed').length,
  };

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Landing Pages</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>Leads submitted from your SEO and Google Ads landing pages</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {PAGES.map(p => (
            <a key={p.key} href={`https://thedigitalaura.com${p.url}`} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#374151', fontWeight: 600, fontSize: 12.5, textDecoration: 'none' }}>
              <ExternalLink size={13} /> {p.label} Page
            </a>
          ))}
          <button onClick={load} style={{ padding: '7px 14px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Page tabs + stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {PAGES.map(p => {
          const cnt = allLeads.filter(i => i.source === p.key).length;
          const isActive = p.key === activeTab;
          return (
            <button key={p.key} onClick={() => { setActiveTab(p.key); setFilter('all'); setExpanded(null); }}
              style={{
                flex: 1, padding: '14px 20px', borderRadius: 12, border: `2px solid ${isActive ? p.color : '#E5E7EB'}`,
                background: isActive ? `${p.color}12` : '#fff', cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s',
              }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                {p.label} Landing
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A' }}>{cnt}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Total leads</div>
            </button>
          );
        })}
      </div>

      {/* Status filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['all', 'new', 'contacted', 'closed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
              background: filter === s ? page.color : '#F1F5F9',
              color: filter === s ? '#fff' : '#64748B' }}>
            {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Leads list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94A3B8' }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94A3B8', background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB' }}>
          No leads yet for this page.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                {/* Avatar */}
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${page.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: page.color, flexShrink: 0 }}>
                  {item.name?.[0]?.toUpperCase() || '?'}
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{item.name}</span>
                    {item.company && <span style={{ fontSize: 12, color: '#64748B' }}>· {item.company}</span>}
                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: STATUS_BG[item.status], color: STATUS_COLOR[item.status], fontWeight: 700 }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Mail size={11} /> {item.email}
                    </span>
                    {item.phone && <span style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Phone size={11} /> {item.phone}
                    </span>}
                    {item.message && <span style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Globe size={11} /> {item.message}
                    </span>}
                  </div>
                </div>
                {/* Date + Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>
                    {new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <button onClick={e => { e.stopPropagation(); remove(item.id); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: 4 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === item.id && (
                <div style={{ padding: '14px 18px', borderTop: '1px solid #F1F5F9', background: '#FAFAFA' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
                    {[
                      { icon: Mail,      label: 'Email',   val: item.email },
                      { icon: Phone,     label: 'Phone',   val: item.phone || '—' },
                      { icon: Building2, label: 'Company', val: item.company || '—' },
                      { icon: Globe,     label: 'Website', val: item.message || '—' },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} style={{ background: '#fff', borderRadius: 8, padding: '10px 14px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <Icon size={12} color={page.color} />
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                        </div>
                        <div style={{ fontSize: 13, color: '#0F172A', fontWeight: 500 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Status:</span>
                    {['new', 'contacted', 'closed'].map(s => (
                      <button key={s} onClick={() => updateStatus(item.id, s)}
                        style={{ padding: '4px 14px', borderRadius: 20, border: `1.5px solid ${item.status === s ? STATUS_COLOR[s] : '#E5E7EB'}`,
                          background: item.status === s ? STATUS_BG[s] : 'transparent', color: STATUS_COLOR[s],
                          fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
