import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const GROUPS = [
  { key: 'general', label: 'General', fields: [
    { key: 'site_name', label: 'Site Name', type: 'text' },
    { key: 'site_tagline', label: 'Site Tagline', type: 'text' },
  ]},
  { key: 'contact', label: 'Contact Info', fields: [
    { key: 'contact_email', label: 'Email', type: 'text' },
    { key: 'contact_phone', label: 'Phone', type: 'text' },
    { key: 'contact_whatsapp', label: 'WhatsApp Number', type: 'text' },
    { key: 'address_city', label: 'City / Address', type: 'text' },
  ]},
  { key: 'social', label: 'Social Media', fields: [
    { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
    { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
    { key: 'social_facebook', label: 'Facebook URL', type: 'text' },
    { key: 'social_twitter', label: 'Twitter/X URL', type: 'text' },
    { key: 'social_youtube', label: 'YouTube URL', type: 'text' },
  ]},
  { key: 'stats', label: 'Stats / Numbers', fields: [
    { key: 'stats_clients', label: 'Clients Served', type: 'text' },
    { key: 'stats_years', label: 'Years in Business', type: 'text' },
    { key: 'stats_services', label: 'Services Offered', type: 'text' },
    { key: 'stats_growth', label: 'Best-Case Growth', type: 'text' },
  ]},
  { key: 'seo', label: 'SEO & Meta', fields: [
    { key: 'meta_title', label: 'Default Meta Title', type: 'text' },
    { key: 'meta_desc', label: 'Default Meta Description', type: 'textarea' },
    { key: 'og_image', label: 'Default OG Image URL', type: 'text' },
  ]},
];

export default function SiteSettings() {
  const [values, setValues] = useState({});
  const [activeGroup, setActiveGroup] = useState('general');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings').then(r => setValues(r.data.data));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const group = GROUPS.find(g => g.key === activeGroup);
      const settings = group.fields.map(f => ({ key: f.key, value: values[f.key] || '', type: f.type === 'textarea' ? 'text' : f.type, group: group.key, label: f.label }));
      await api.post('/settings/bulk', { settings });
      try { new BroadcastChannel('da_settings').postMessage('saved'); } catch {}
      toast.success('Settings saved! Refresh the site to see changes.');
    } catch { toast.error('Error saving'); }
    finally { setSaving(false); }
  };

  const currentGroup = GROUPS.find(g => g.key === activeGroup);

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Site Settings</h1>
        <button onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
          <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Sidebar tabs */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            {GROUPS.map(g => (
              <button key={g.key} onClick={() => setActiveGroup(g.key)}
                style={{ width: '100%', padding: '12px 16px', textAlign: 'left', background: activeGroup === g.key ? '#FFF3ED' : '#fff', border: 'none', borderLeft: activeGroup === g.key ? '3px solid #FF6B2B' : '3px solid transparent', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: activeGroup === g.key ? '#FF6B2B' : '#374151', transition: 'all 0.15s' }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>{currentGroup?.label}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {currentGroup?.fields.map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 5, fontFamily: 'monospace' }}>key: {f.key}</div>
                {f.type === 'textarea'
                  ? <textarea value={values[f.key] || ''} onChange={e => setValues(p => ({ ...p, [f.key]: e.target.value }))} rows={3}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, resize: 'vertical', outline: 'none' }} />
                  : <input type="text" value={values[f.key] || ''} onChange={e => setValues(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
