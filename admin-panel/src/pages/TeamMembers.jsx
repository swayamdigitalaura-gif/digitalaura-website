import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, GripVertical } from 'lucide-react';

const COLOR_OPTIONS = [
  { label: 'Orange', value: '#FF6B2B' },
  { label: 'Purple', value: '#7C3AED' },
  { label: 'Blue', value: '#1A6FE8' },
  { label: 'Green', value: '#22C55E' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Sky', value: '#0EA5E9' },
  { label: 'Teal', value: '#14B8A6' },
];

const DEPT_OPTIONS = ['Leadership', 'Web Development', 'Digital Marketing', 'SEO', 'Social Media', 'Design', 'Business Development', 'AI & Tech'];

const EMPTY_FORM = {
  name: '', role: '', department: '', photo: '', color: '#FF6B2B',
  is_ai: false, bio: '', linkedin: '', is_visible: true, order_index: 0,
};

const inputStyle = {
  width: '100%', padding: '9px 14px', border: '1px solid #E5E7EB',
  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
};

const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 };

export default function TeamMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get('/team/all');
      setMembers(r.data.data || []);
    } catch { toast.error('Failed to load team members'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (m) => { setEditing(m); setForm({ ...m }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/team/${editing.id}`, form);
        toast.success('Member updated!');
      } else {
        await api.post('/team', form);
        toast.success('Member added!');
      }
      closeModal();
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    setDeleting(id);
    try {
      await api.delete(`/team/${id}`);
      toast.success('Member deleted');
      load();
    } catch { toast.error('Error deleting'); }
    finally { setDeleting(null); }
  };

  const toggleVisibility = async (m) => {
    try {
      await api.put(`/team/${m.id}`, { is_visible: !m.is_visible });
      toast.success(m.is_visible ? 'Hidden from website' : 'Now visible on website');
      load();
    } catch { toast.error('Error updating visibility'); }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Team Members</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>{members.length} members · Manage your About page team</p>
        </div>
        <button onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={15} /> Add Member
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#64748B' }}>Loading...</div>
      ) : members.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>No team members yet. Add your first one!</p>
          <button onClick={openAdd} style={{ marginTop: 16, padding: '10px 24px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            Add First Member
          </button>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                {['Member', 'Role / Dept', 'Color', 'AI Tag', 'Visible', 'Order', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={m.id} style={{ borderBottom: i < members.length - 1 ? '1px solid #F1F5F9' : 'none', opacity: m.is_visible ? 1 : 0.5 }}>
                  {/* Member */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${m.color}40` }} />
                      ) : (
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                          {m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span style={{ fontWeight: 600, color: '#0F172A', fontSize: 14 }}>{m.name}</span>
                    </div>
                  </td>
                  {/* Role */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, color: '#374151' }}>{m.role || '—'}</div>
                    {m.department && <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{m.department}</div>}
                  </td>
                  {/* Color */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: m.color, border: '2px solid rgba(0,0,0,0.1)' }} />
                  </td>
                  {/* AI */}
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: m.is_ai ? '#7C3AED15' : '#F1F5F9', color: m.is_ai ? '#7C3AED' : '#94A3B8' }}>
                      {m.is_ai ? 'AI' : '—'}
                    </span>
                  </td>
                  {/* Visible */}
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => toggleVisibility(m)} title={m.is_visible ? 'Hide' : 'Show'}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: m.is_visible ? '#22C55E' : '#CBD5E1', padding: 4 }}>
                      {m.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </td>
                  {/* Order */}
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 13, color: '#64748B', fontFamily: 'monospace' }}>{m.order_index}</span>
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(m)} title="Edit"
                        style={{ padding: '6px 10px', background: '#F1F5F9', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}>
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(m.id)} disabled={deleting === m.id} title="Delete"
                        style={{ padding: '6px 10px', background: '#FEF2F2', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}>
                        <Trash2 size={12} /> {deleting === m.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }} onClick={closeModal} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #FF6B2B, #7C3AED)', borderRadius: '16px 16px 0 0' }} />
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {editing ? 'Edit Member' : 'Add Team Member'}
                </h2>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: 4 }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Name + Role */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                    <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Sambhav Parikh" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Job Title / Role</label>
                    <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="CEO & Founder" style={inputStyle} />
                  </div>
                </div>

                {/* Department + Order */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Department</label>
                    <select value={form.department} onChange={e => set('department', e.target.value)} style={inputStyle}>
                      <option value="">Select department</option>
                      {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Display Order</label>
                    <input type="number" value={form.order_index} onChange={e => set('order_index', parseInt(e.target.value) || 0)} style={inputStyle} min={0} />
                  </div>
                </div>

                {/* Photo URL */}
                <div>
                  <label style={labelStyle}>Photo URL</label>
                  <input value={form.photo} onChange={e => set('photo', e.target.value)} placeholder="https://example.com/photo.jpg" style={inputStyle} />
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Leave empty to show initials avatar. Use Media Library to upload photos.</div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label style={labelStyle}>LinkedIn URL</label>
                  <input value={form.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" style={inputStyle} />
                </div>

                {/* Bio */}
                <div>
                  <label style={labelStyle}>Short Bio</label>
                  <textarea value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Brief description about this team member..." rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {/* Color */}
                <div>
                  <label style={labelStyle}>Accent Color</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {COLOR_OPTIONS.map(c => (
                      <button key={c.value} type="button" onClick={() => set('color', c.value)} title={c.label}
                        style={{ width: 32, height: 32, borderRadius: 8, background: c.value, border: form.color === c.value ? '3px solid #0F172A' : '2px solid rgba(0,0,0,0.15)', cursor: 'pointer', transition: 'transform 0.1s', transform: form.color === c.value ? 'scale(1.15)' : 'scale(1)' }} />
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', gap: 20 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                    <input type="checkbox" checked={form.is_ai} onChange={e => set('is_ai', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
                    Show AI Tag
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                    <input type="checkbox" checked={form.is_visible} onChange={e => set('is_visible', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
                    Visible on Website
                  </label>
                </div>

                {/* Preview */}
                {(form.name || form.photo) && (
                  <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginRight: 4 }}>Preview</div>
                    {form.photo ? (
                      <img src={form.photo} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${form.color}` }} onError={e => e.target.style.display = 'none'} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: form.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {form.name ? form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>{form.name || 'Name'}</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>{form.role || 'Role'}</div>
                      {form.is_ai && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10, background: '#7C3AED15', color: '#7C3AED', marginTop: 2, display: 'inline-block' }}>AI</span>}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                  <button type="button" onClick={closeModal}
                    style={{ padding: '10px 20px', background: '#F1F5F9', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                    <Save size={14} /> {saving ? 'Saving...' : (editing ? 'Save Changes' : 'Add Member')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
