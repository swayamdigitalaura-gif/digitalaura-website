import { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Trash2, Edit2, Check, X, ArrowRight } from 'lucide-react';

const empty = { from_url: '', to_url: '', redirect_type: '301', is_active: true };

const th = { padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #1E293B' };
const td = { padding: '12px 14px', fontSize: 13.5, color: '#E2E8F0', borderBottom: '1px solid #1E293B', verticalAlign: 'middle' };

export default function Redirects() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/redirects');
      setList(data.data || []);
    } catch { toast.error('Failed to load redirects'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (r) => { setForm({ from_url: r.from_url, to_url: r.to_url, redirect_type: r.redirect_type, is_active: r.is_active }); setEditId(r.id); setShowForm(true); };
  const cancel = () => { setShowForm(false); setEditId(null); setForm(empty); };

  const save = async () => {
    if (!form.from_url.trim() || !form.to_url.trim()) return toast.error('Both URLs are required');
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/redirects/${editId}`, form);
        toast.success('Redirect updated');
      } else {
        await api.post('/redirects', form);
        toast.success('Redirect created');
      }
      cancel();
      load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this redirect?')) return;
    try { await api.delete(`/redirects/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const toggleActive = async (r) => {
    try { await api.put(`/redirects/${r.id}`, { ...r, is_active: !r.is_active }); load(); }
    catch { toast.error('Failed to update'); }
  };

  const inp = {
    width: '100%', padding: '9px 12px', background: '#0F172A', border: '1px solid #334155',
    borderRadius: 8, color: '#E2E8F0', fontSize: 13.5, outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', margin: 0 }}>Redirects</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>Manage 301 / 302 URL redirects for your site</p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'linear-gradient(135deg,#FF6B2B,#e85a1a)', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          <Plus size={15} /> Add Redirect
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F1F5F9', fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>{editId ? 'Edit Redirect' : 'New Redirect'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 6 }}>FROM URL *</label>
              <input style={inp} value={form.from_url} onChange={e => setForm(f => ({ ...f, from_url: e.target.value }))} placeholder="/old-page" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 6 }}>TO URL *</label>
              <input style={inp} value={form.to_url} onChange={e => setForm(f => ({ ...f, to_url: e.target.value }))} placeholder="/new-page or https://..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 6 }}>TYPE</label>
              <select style={{ ...inp, width: 120 }} value={form.redirect_type} onChange={e => setForm(f => ({ ...f, redirect_type: e.target.value }))}>
                <option value="301">301 — Permanent</option>
                <option value="302">302 — Temporary</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
              <label style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>Active</label>
              <button onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                style={{ width: 40, height: 22, borderRadius: 11, background: form.is_active ? '#22C55E' : '#334155', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <span style={{ position: 'absolute', top: 3, left: form.is_active ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
              </button>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={cancel} style={{ padding: '8px 16px', background: '#334155', border: 'none', borderRadius: 8, color: '#94A3B8', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                <Check size={14} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#1E293B', borderRadius: 12, border: '1px solid #334155', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>Loading...</div>
        ) : list.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>↪</div>
            <div style={{ color: '#64748B', fontSize: 14 }}>No redirects yet. Add one to get started.</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>From URL</th>
                <th style={{ ...th, width: 30 }}></th>
                <th style={th}>To URL</th>
                <th style={{ ...th, width: 100 }}>Type</th>
                <th style={{ ...th, width: 80 }}>Status</th>
                <th style={{ ...th, width: 90 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map(r => (
                <tr key={r.id} style={{ opacity: r.is_active ? 1 : 0.5 }}>
                  <td style={td}><code style={{ fontSize: 12.5, color: '#FB923C' }}>{r.from_url}</code></td>
                  <td style={{ ...td, textAlign: 'center' }}><ArrowRight size={14} color="#64748B" /></td>
                  <td style={td}><code style={{ fontSize: 12.5, color: '#60A5FA' }}>{r.to_url}</code></td>
                  <td style={td}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: r.redirect_type === '301' ? 'rgba(124,58,237,0.15)' : 'rgba(34,197,94,0.12)', color: r.redirect_type === '301' ? '#A78BFA' : '#4ADE80' }}>
                      {r.redirect_type}
                    </span>
                  </td>
                  <td style={td}>
                    <button onClick={() => toggleActive(r)}
                      style={{ width: 40, height: 22, borderRadius: 11, background: r.is_active ? '#22C55E' : '#334155', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                      <span style={{ position: 'absolute', top: 3, left: r.is_active ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                    </button>
                  </td>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(r)} style={{ padding: '5px 8px', background: 'rgba(26,111,232,0.12)', border: 'none', borderRadius: 6, color: '#60A5FA', cursor: 'pointer' }}><Edit2 size={13} /></button>
                      <button onClick={() => remove(r.id)} style={{ padding: '5px 8px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 6, color: '#F87171', cursor: 'pointer' }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: '#475569' }}>
        {list.length} redirect{list.length !== 1 ? 's' : ''} total · {list.filter(r => r.is_active).length} active
      </div>
    </div>
  );
}
