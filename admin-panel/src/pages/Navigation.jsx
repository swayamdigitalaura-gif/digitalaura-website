import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, GripVertical, Save } from 'lucide-react';

const emptyForm = { label: '', href: '', location: 'header', target: '_self', is_visible: true };

export default function Navigation() {
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState('header');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => api.get('/nav').then(r => setItems(r.data.data));
  useEffect(() => { load(); }, []);

  const filtered = items.filter(i => i.location === tab);

  const open = (item = null) => { setEditing(item?.id || 'new'); setForm(item ? { ...item } : { ...emptyForm, location: tab }); };
  const close = () => setEditing(null);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing === 'new') await api.post('/nav', form);
      else await api.put(`/nav/${editing}`, form);
      toast.success('Saved!'); close(); load();
    } catch { toast.error('Error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this nav item?')) return;
    await api.delete(`/nav/${id}`); toast.success('Deleted'); load();
  };

  const toggleVisible = async (item) => {
    await api.put(`/nav/${item.id}`, { ...item, is_visible: !item.is_visible }); load();
  };

  const inp = (name, label, opts = {}) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      {opts.type === 'select'
        ? <select name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }}>
            {opts.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        : <input name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} placeholder={opts.placeholder} />}
    </div>
  );

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Navigation Manager</h1>
        <button onClick={() => open()} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={16} /> Add Link
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#fff', padding: 4, borderRadius: 10, width: 'fit-content', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        {['header', 'footer'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '8px 24px', background: tab === t ? '#FF6B2B' : 'transparent', border: 'none', borderRadius: 8, color: tab === t ? '#fff' : '#64748B', fontWeight: 700, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize' }}>
            {t} Nav
          </button>
        ))}
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 440 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>{editing === 'new' ? 'Add Link' : 'Edit Link'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {inp('label', 'Link Label *', { placeholder: 'e.g. About Us' })}
              {inp('href', 'URL / Path *', { placeholder: '/about' })}
              {inp('location', 'Location', { type: 'select', options: [{ value: 'header', label: 'Header Nav' }, { value: 'footer', label: 'Footer Nav' }] })}
              {inp('target', 'Open In', { type: 'select', options: [{ value: '_self', label: 'Same Tab' }, { value: '_blank', label: 'New Tab' }] })}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '11px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                <button type="button" onClick={close} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#94A3B8' }}>No {tab} nav links yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E5E7EB' }}>
              {['Order', 'Label', 'URL', 'Visible', 'Actions'].map(h => <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 20px', color: '#94A3B8', fontSize: 13 }}>{item.order_index}</td>
                  <td style={{ padding: '12px 20px', fontWeight: 600, color: '#0F172A', fontSize: 14 }}>{item.label}</td>
                  <td style={{ padding: '12px 20px', color: '#64748B', fontSize: 13, fontFamily: 'monospace' }}>{item.href}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <button onClick={() => toggleVisible(item)} style={{ padding: '4px 10px', border: 'none', borderRadius: 20, cursor: 'pointer', fontSize: 11, fontWeight: 700, background: item.is_visible ? '#DCFCE7' : '#FEE2E2', color: item.is_visible ? '#15803D' : '#DC2626' }}>
                      {item.is_visible ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => open(item)} style={{ padding: '6px 12px', background: '#EFF6FF', border: 'none', borderRadius: 6, color: '#1A6FE8', cursor: 'pointer' }}><Edit2 size={12} /></button>
                      <button onClick={() => handleDelete(item.id)} style={{ padding: '6px 10px', background: '#FEF2F2', border: 'none', borderRadius: 6, color: '#EF4444', cursor: 'pointer' }}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
