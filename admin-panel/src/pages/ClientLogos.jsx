import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Image } from 'lucide-react';

const SERVICE_PAGES = [
  { value: 'ai-automation', label: 'AI Automation' },
  { value: 'ai-chatbot-assistant', label: 'AI Chatbot Assistant' },
  { value: 'ai-web-apps', label: 'AI Web Apps' },
  { value: 'custom-ai-web-solutions', label: 'Custom AI Web Solutions' },
  { value: 'web-app-development', label: 'Web App Development' },
  { value: 'full-stack-development', label: 'Full Stack Development' },
  { value: 'mobile-app-development', label: 'Mobile App Development' },
  { value: 'wordpress-development', label: 'WordPress Development' },
  { value: 'woocommerce-development', label: 'WooCommerce Development' },
  { value: 'shopify-development', label: 'Shopify Development' },
  { value: 'seo', label: 'SEO' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'meta-ads', label: 'Meta Ads' },
  { value: 'design-branding', label: 'Design & Branding' },
  { value: 'email-whatsapp', label: 'Email & WhatsApp Marketing' },
];

const empty = { service_page: 'ai-automation', name: '', tag: '', logo_url: '', logo_bg: '#f0f8ff', order_index: 0, is_active: true };

export default function ClientLogos() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [filterPage, setFilterPage] = useState('');

  const load = () => api.get('/client-logos/all').then(r => setList(r.data.data));
  useEffect(() => { load(); }, []);

  const open = (item = null) => { setEditing(item?.id || 'new'); setForm(item || empty); };
  const close = () => setEditing(null);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing === 'new') await api.post('/client-logos', form);
      else await api.put(`/client-logos/${editing}`, form);
      toast.success('Saved');
      load(); close();
    } catch { toast.error('Failed to save'); }
  };

  const del = async (id) => {
    if (!confirm('Delete this logo?')) return;
    await api.delete(`/client-logos/${id}`);
    toast.success('Deleted'); load();
  };

  const filtered = filterPage ? list.filter(l => l.service_page === filterPage) : list;

  const pageLabel = (slug) => SERVICE_PAGES.find(p => p.value === slug)?.label || slug;

  return (
    <div style={{ padding: 32, maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: 0 }}>Client Logos</h1>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>Manage "Clients We've Grown" logos per service page</p>
        </div>
        <button onClick={() => open()} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FF6B2B', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          <Plus size={15} /> Add Logo
        </button>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: 20 }}>
        <select value={filterPage} onChange={e => setFilterPage(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13, background: '#fff', color: '#0F172A', minWidth: 220 }}>
          <option value="">All Pages</option>
          {SERVICE_PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <span style={{ marginLeft: 12, color: '#64748B', fontSize: 12 }}>{filtered.length} logos</span>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Logo', 'Name', 'Tag', 'Service Page', 'Order', 'Active', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748B', borderBottom: '1px solid #E2E8F0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ width: 64, height: 36, borderRadius: 6, background: item.logo_bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={item.logo_url} alt={item.name} style={{ maxWidth: 56, maxHeight: 28, objectFit: 'contain' }}
                      onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                </td>
                <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{item.name}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: '#64748B' }}>{item.tag}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ background: '#EFF6FF', color: '#1A6FE8', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>{pageLabel(item.service_page)}</span>
                </td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: '#64748B' }}>{item.order_index}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ background: item.is_active ? '#DCFCE7' : '#FEE2E2', color: item.is_active ? '#16A34A' : '#DC2626', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
                    {item.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => open(item)} style={{ background: '#EFF6FF', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#1A6FE8' }}><Edit2 size={13} /></button>
                    <button onClick={() => del(item.id)} style={{ background: '#FEE2E2', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#DC2626' }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>No logos yet. Add your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>{editing === 'new' ? 'Add Logo' : 'Edit Logo'}</h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Service Page</label>
                  <select value={form.service_page} onChange={e => setForm(f => ({ ...f, service_page: e.target.value }))} required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13 }}>
                    {SERVICE_PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Client Name</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Gleekey"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Tag / Industry</label>
                    <input value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} required placeholder="e.g. EdTech"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13, boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Logo URL</label>
                  <input value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} required placeholder="https://..."
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13, boxSizing: 'border-box' }} />
                  {form.logo_url && (
                    <div style={{ marginTop: 8, padding: 8, borderRadius: 8, background: form.logo_bg, display: 'flex', justifyContent: 'center' }}>
                      <img src={form.logo_url} alt="preview" style={{ maxHeight: 44, maxWidth: 130, objectFit: 'contain' }}
                        onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Card Background</label>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input type="color" value={form.logo_bg} onChange={e => setForm(f => ({ ...f, logo_bg: e.target.value }))}
                        style={{ width: 36, height: 36, borderRadius: 6, border: '1.5px solid #E2E8F0', cursor: 'pointer', padding: 2 }} />
                      <input value={form.logo_bg} onChange={e => setForm(f => ({ ...f, logo_bg: e.target.value }))}
                        style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 12, boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Order</label>
                    <input type="number" value={form.order_index} onChange={e => setForm(f => ({ ...f, order_index: +e.target.value }))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Status</label>
                    <select value={form.is_active ? 'true' : 'false'} onChange={e => setForm(f => ({ ...f, is_active: e.target.value === 'true' }))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 13 }}>
                      <option value="true">Active</option>
                      <option value="false">Hidden</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
                <button type="button" onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 18px', borderRadius: 8, background: '#FF6B2B', color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
