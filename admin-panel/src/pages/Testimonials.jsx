import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Star, Play } from 'lucide-react';

const emptyForm = { name: '', role: '', company: '', photo: '', quote: '', rating: 5, platform: 'Google', is_visible: true, order_index: 0, testimonial_type: 'text', video_url: '' };

export default function Testimonials() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => api.get('/testimonials').then(r => setList(r.data.data));
  useEffect(() => { load(); }, []);

  const open = (t = null) => { setEditing(t?.id || 'new'); setForm(t ? { ...emptyForm, ...t } : emptyForm); };
  const close = () => setEditing(null);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing === 'new') await api.post('/testimonials', form);
      else await api.put(`/testimonials/${editing}`, form);
      toast.success('Saved!'); close(); load();
    } catch { toast.error('Error saving'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.delete(`/testimonials/${id}`); toast.success('Deleted'); load();
  };

  const toggleVisible = async (t) => {
    await api.put(`/testimonials/${t.id}`, { ...t, is_visible: !t.is_visible });
    load();
  };

  const inp = (name, label, opts = {}) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      {opts.type === 'textarea'
        ? <textarea name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} rows={3} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }} />
        : opts.type === 'select'
        ? <select name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }}>
            {opts.options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
          </select>
        : <input type={opts.type || 'text'} name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: opts.type === 'number' ? Number(e.target.value) : e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} placeholder={opts.placeholder} min={opts.min} max={opts.max} />}
    </div>
  );

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Testimonials</h1>
          <p style={{ color: '#64748B', fontSize: 13, margin: '4px 0 0' }}>Manage text and video testimonials</p>
        </div>
        <button onClick={() => open()} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>{editing === 'new' ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Type selector */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Testimonial Type</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['text', 'video'].map(t => (
                    <button key={t} type="button" onClick={() => setForm(p => ({ ...p, testimonial_type: t }))}
                      style={{ flex: 1, padding: '10px', border: `2px solid ${form.testimonial_type === t ? '#FF6B2B' : '#E5E7EB'}`, borderRadius: 8, background: form.testimonial_type === t ? 'rgba(255,107,43,0.08)' : '#fff', color: form.testimonial_type === t ? '#FF6B2B' : '#64748B', fontWeight: 700, fontSize: 13, cursor: 'pointer', textTransform: 'capitalize' }}>
                      {t === 'video' ? '🎬 Video' : '💬 Text'}
                    </button>
                  ))}
                </div>
              </div>

              {inp('name', 'Client Name *', { placeholder: 'Shweta Sultania' })}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {inp('role', 'Role', { placeholder: 'Founder' })}
                {inp('company', 'Company', { placeholder: 'ABC Pvt Ltd' })}
              </div>
              {inp('quote', 'Testimonial Quote *', { type: 'textarea' })}
              {inp('photo', 'Photo URL', { placeholder: 'https://... or leave blank for initials' })}

              {/* Video URL — shown only for video type */}
              {form.testimonial_type === 'video' && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Video URL *</label>
                  <input
                    type="url"
                    name="video_url"
                    value={form.video_url}
                    onChange={e => setForm(p => ({ ...p, video_url: e.target.value }))}
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    style={{ width: '100%', padding: '9px 12px', border: '2px solid #FF6B2B', borderRadius: 7, fontSize: 13, boxSizing: 'border-box' }}
                  />
                  <p style={{ fontSize: 11, color: '#64748B', margin: '4px 0 0' }}>YouTube, Vimeo, or direct video file URL</p>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {inp('rating', 'Rating (1-5)', { type: 'number', min: 1, max: 5 })}
                {inp('platform', 'Platform', {
                  type: 'select',
                  options: ['Google', 'Clutch', 'GoodFirms', 'DesignRush', 'Direct', 'Video'],
                })}
              </div>
              {inp('order_index', 'Display Order', { type: 'number', min: 0 })}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '11px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                <button type="button" onClick={close} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total', value: list.length, color: '#1A6FE8' },
          { label: 'Video', value: list.filter(t => t.testimonial_type === 'video').length, color: '#7C3AED' },
          { label: 'Visible', value: list.filter(t => t.is_visible).length, color: '#22C55E' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 10, padding: '12px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {list.map(t => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', opacity: t.is_visible ? 1 : 0.5, borderLeft: `4px solid ${t.testimonial_type === 'video' ? '#7C3AED' : '#FF6B2B'}` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'start', marginBottom: 12 }}>
              {t.photo
                ? <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                : <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.testimonial_type === 'video' ? '#7C3AED' : '#FF6B2B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{t.name[0]}</div>
              }
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>{t.name}</span>
                  {t.testimonial_type === 'video' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 7px', background: 'rgba(124,58,237,0.1)', color: '#7C3AED', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>
                      <Play size={9} fill="#7C3AED" /> VIDEO
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{t.role}{t.company ? `, ${t.company}` : ''}</div>
                <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill={i < t.rating ? '#F59E0B' : 'none'} stroke={i < t.rating ? '#F59E0B' : '#CBD5E1'} />)}
                  <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 4 }}>{t.platform}</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#374151', fontStyle: 'italic', lineHeight: 1.6, marginBottom: t.video_url ? 10 : 14 }}>"{t.quote}"</p>
            {t.video_url && (
              <a href={t.video_url} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 6, color: '#7C3AED', fontSize: 12, fontWeight: 600, textDecoration: 'none', marginBottom: 12 }}>
                <Play size={12} fill="#7C3AED" /> Watch Video
              </a>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggleVisible(t)} style={{ padding: '5px 10px', background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 6, color: '#64748B', cursor: 'pointer', fontSize: 12 }}>{t.is_visible ? 'Hide' : 'Show'}</button>
              <button onClick={() => open(t)} style={{ padding: '5px 10px', background: '#EFF6FF', border: 'none', borderRadius: 6, color: '#1A6FE8', cursor: 'pointer', fontSize: 12 }}><Edit2 size={12} /></button>
              <button onClick={() => handleDelete(t.id)} style={{ padding: '5px 10px', background: '#FEF2F2', border: 'none', borderRadius: 6, color: '#EF4444', cursor: 'pointer' }}><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
        {list.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#94A3B8', background: '#fff', borderRadius: 12 }}>No testimonials yet.</div>}
      </div>
    </div>
  );
}
