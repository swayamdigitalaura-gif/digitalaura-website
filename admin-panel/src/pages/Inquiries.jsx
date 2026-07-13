import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Trash2, Mail, Phone, Building2, Tag, DollarSign, MessageSquare } from 'lucide-react';

const STATUS_COLOR = { new: '#1A6FE8', contacted: '#22C55E', closed: '#94A3B8' };
const STATUS_BG    = { new: '#EFF6FF', contacted: '#F0FDF4', closed: '#F8FAFF' };

export default function Inquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get('/contact');
      setItems(r.data.data || []);
    } catch { toast.error('Failed to load inquiries'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
      toast.success('Status updated');
    } catch { toast.error('Failed to update'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('Deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);
  const counts = { all: items.length, new: items.filter(i => i.status === 'new').length, contacted: items.filter(i => i.status === 'contacted').length, closed: items.filter(i => i.status === 'closed').length };

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Contact Inquiries</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>Project inquiries submitted from the website contact form</p>
        </div>
        <button onClick={load} style={{ padding: '8px 16px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          ↻ Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['all', 'new', 'contacted', 'closed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
              background: filter === s ? '#FF6B2B' : '#F1F5F9',
              color: filter === s ? '#fff' : '#64748B' }}>
            {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94A3B8' }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94A3B8', background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB' }}>
          No inquiries yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              {/* Top bar */}
              <div style={{ height: 3, background: STATUS_COLOR[item.status] }} />

              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  {/* Avatar */}
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B2B,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                    {item.name?.[0]?.toUpperCase()}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Name row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{item.name}</span>
                      {item.company && <span style={{ fontSize: 12, color: '#64748B', background: '#F8FAFF', padding: '2px 8px', borderRadius: 20, border: '1px solid #E5E7EB' }}>{item.company}</span>}
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: STATUS_BG[item.status], color: STATUS_COLOR[item.status], marginLeft: 'auto' }}>
                        ● {item.status}
                      </span>
                    </div>

                    {/* Contact info row */}
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
                      <a href={`mailto:${item.email}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#1A6FE8', textDecoration: 'none', fontWeight: 500 }}>
                        <Mail size={12} /> {item.email}
                      </a>
                      {item.phone && (
                        <a href={`tel:${item.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#374151', textDecoration: 'none' }}>
                          <Phone size={12} /> {item.phone}
                        </a>
                      )}
                    </div>

                    {/* Tags row */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                      {item.project && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#FF6B2B', background: 'rgba(255,107,43,0.08)', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(255,107,43,0.2)', fontWeight: 600 }}>
                          <Tag size={10} /> {item.project}
                        </span>
                      )}
                      {item.budget && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#22C55E', background: 'rgba(34,197,94,0.08)', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(34,197,94,0.2)', fontWeight: 600 }}>
                          <DollarSign size={10} /> {item.budget}
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: '#94A3B8', alignSelf: 'center' }}>
                        {new Date(item.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>

                    {/* Message preview / expanded */}
                    {item.message && (
                      <div>
                        <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, margin: 0, cursor: 'pointer' }}
                          onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                          <MessageSquare size={12} style={{ display: 'inline', marginRight: 5, color: '#94A3B8' }} />
                          {expanded === item.id ? item.message : (item.message.length > 160 ? item.message.slice(0, 160) + '…' : item.message)}
                          {item.message.length > 160 && (
                            <span style={{ color: '#1A6FE8', fontWeight: 600, marginLeft: 6, fontSize: 12 }}>
                              {expanded === item.id ? 'Show less' : 'Read more'}
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, alignItems: 'flex-end' }}>
                    <select value={item.status} onChange={e => updateStatus(item.id, e.target.value)}
                      style={{ padding: '6px 10px', border: `1px solid ${STATUS_COLOR[item.status]}`, borderRadius: 7, fontSize: 12, fontWeight: 600, color: STATUS_COLOR[item.status], background: '#fff', cursor: 'pointer', outline: 'none' }}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <a href={`mailto:${item.email}?subject=Re: Your inquiry at Digital Aura`}
                        style={{ padding: '6px 12px', background: '#EFF6FF', border: 'none', borderRadius: 7, color: '#1A6FE8', cursor: 'pointer', textDecoration: 'none', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Mail size={12} /> Reply
                      </a>
                      <button onClick={() => remove(item.id)}
                        style={{ padding: '6px 10px', background: '#FEF2F2', border: 'none', borderRadius: 7, color: '#EF4444', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
