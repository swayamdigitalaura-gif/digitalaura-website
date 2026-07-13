import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Users, ChevronDown, ChevronRight } from 'lucide-react';

const emptyForm = { title: '', department: '', location: 'Ahmedabad', type: 'full-time', experience: '', description: '', responsibilities: '[]', requirements: '[]', skills: '[]', salary_range: '', openings: 1, work_mode: 'on-site', benefits: '[]', interview_process: '[]', deadline: '', status: 'open' };

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [applications, setApplications] = useState([]);
  const [viewApps, setViewApps] = useState(null);
  const [skillsInput, setSkillsInput] = useState('');
  const [respItems, setRespItems] = useState([]);
  const [reqItems, setReqItems] = useState([]);
  const [benefitItems, setBenefitItems] = useState([]);
  const [interviewItems, setInterviewItems] = useState([]);
  const [respInput, setRespInput] = useState('');
  const [reqInput, setReqInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');
  const [interviewInput, setInterviewInput] = useState('');

  const load = () => api.get('/careers').then(r => setCareers(r.data.data));
  useEffect(() => { load(); }, []);

  const open = (c = null) => {
    setEditing(c?.id || 'new');
    if (c) {
      setForm({ ...c });
      try { setSkillsInput(JSON.parse(c.skills || '[]').join(', ')); } catch { setSkillsInput(''); }
      try { setRespItems(JSON.parse(c.responsibilities || '[]')); } catch { setRespItems([]); }
      try { setReqItems(JSON.parse(c.requirements || '[]')); } catch { setReqItems([]); }
      try { setBenefitItems(JSON.parse(c.benefits || '[]')); } catch { setBenefitItems([]); }
      try { setInterviewItems(JSON.parse(c.interview_process || '[]')); } catch { setInterviewItems([]); }
    } else {
      setForm(emptyForm); setSkillsInput('');
      setRespItems([]); setReqItems([]); setBenefitItems([]); setInterviewItems([]);
    }
    setRespInput(''); setReqInput(''); setBenefitInput(''); setInterviewInput('');
  };
  const close = () => setEditing(null);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: JSON.stringify(skillsInput.split(',').map(s => s.trim()).filter(Boolean)),
      responsibilities: JSON.stringify(respItems),
      requirements: JSON.stringify(reqItems),
      benefits: JSON.stringify(benefitItems),
      interview_process: JSON.stringify(interviewItems),
    };
    try {
      if (editing === 'new') await api.post('/careers', payload);
      else await api.put(`/careers/${editing}`, payload);
      toast.success('Saved!'); close(); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this job opening?')) return;
    await api.delete(`/careers/${id}`);
    toast.success('Deleted'); load();
  };

  const loadApps = async (id) => {
    const r = await api.get(`/careers/${id}/applications`);
    setApplications(r.data.data);
    setViewApps(id);
  };

  const updateAppStatus = async (careerId, appId, status) => {
    await api.put(`/careers/${careerId}/applications/${appId}`, { status });
    loadApps(careerId);
  };

  const inp = (name, label, opts = {}) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      {opts.type === 'textarea'
        ? <textarea name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} rows={opts.rows || 4} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, resize: 'vertical' }} />
        : opts.type === 'select'
        ? <select name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }}>
            {opts.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        : <input name={name} value={form[name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} placeholder={opts.placeholder} />}
    </div>
  );

  const appStatusColor = { new: '#1A6FE8', reviewing: '#F59E0B', shortlisted: '#22C55E', rejected: '#EF4444' };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Careers & Jobs</h1>
        <button onClick={() => open()} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={16} /> New Job Opening
        </button>
      </div>

      {/* Job form modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{editing === 'new' ? 'New Job Opening' : 'Edit Job'}</h2>
              <button type="button" onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#6B7280', lineHeight: 1, padding: '2px 6px' }}>✕</button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {inp('title', 'Job Title *', { placeholder: 'e.g. SEO Executive' })}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {inp('department', 'Department', { placeholder: 'Marketing' })}
                {inp('location', 'Location', { placeholder: 'Ahmedabad' })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {inp('type', 'Employment Type', { type: 'select', options: ['full-time','part-time','contract','internship'].map(v => ({ value: v, label: v })) })}
                {inp('experience', 'Experience', { placeholder: '1-2 years' })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                {inp('salary_range', 'Salary Range', { placeholder: '₹3-5 LPA' })}
                {inp('openings', 'No. of Openings', { placeholder: '1' })}
                {inp('deadline', 'Application Deadline', { type: 'date' })}
              </div>
              {inp('work_mode', 'Work Mode', { type: 'select', options: ['on-site','remote','hybrid'].map(v => ({ value: v, label: v.charAt(0).toUpperCase()+v.slice(1) })) })}
              {inp('description', 'Job Description', { type: 'textarea', rows: 4 })}

              {/* Responsibilities */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Responsibilities</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={respInput} onChange={e => setRespInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (respInput.trim()) { setRespItems(p => [...p, respInput.trim()]); setRespInput(''); } } }}
                    placeholder="Type a responsibility and press Enter" style={{ flex: 1, padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                  <button type="button" onClick={() => { if (respInput.trim()) { setRespItems(p => [...p, respInput.trim()]); setRespInput(''); } }}
                    style={{ padding: '9px 14px', background: '#FF6B2B', border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
                {respItems.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#F8FAFF', borderRadius: 7, marginBottom: 5, border: '1px solid #E5E7EB' }}>
                    <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{r}</span>
                    <button type="button" onClick={() => setRespItems(p => p.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Requirements</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={reqInput} onChange={e => setReqInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (reqInput.trim()) { setReqItems(p => [...p, reqInput.trim()]); setReqInput(''); } } }}
                    placeholder="Type a requirement and press Enter" style={{ flex: 1, padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                  <button type="button" onClick={() => { if (reqInput.trim()) { setReqItems(p => [...p, reqInput.trim()]); setReqInput(''); } }}
                    style={{ padding: '9px 14px', background: '#7C3AED', border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
                {reqItems.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#F8FAFF', borderRadius: 7, marginBottom: 5, border: '1px solid #E5E7EB' }}>
                    <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{r}</span>
                    <button type="button" onClick={() => setReqItems(p => p.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Skills (comma separated)</label>
                <input value={skillsInput} onChange={e => setSkillsInput(e.target.value)} placeholder="React, SEO, Google Ads" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
              </div>
              {/* Benefits */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Benefits & Perks</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={benefitInput} onChange={e => setBenefitInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (benefitInput.trim()) { setBenefitItems(p => [...p, benefitInput.trim()]); setBenefitInput(''); } } }}
                    placeholder="e.g. Health Insurance, Flexible Hours" style={{ flex: 1, padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                  <button type="button" onClick={() => { if (benefitInput.trim()) { setBenefitItems(p => [...p, benefitInput.trim()]); setBenefitInput(''); } }}
                    style={{ padding: '9px 14px', background: '#22C55E', border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
                {benefitItems.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#F0FDF4', borderRadius: 7, marginBottom: 5, border: '1px solid #BBF7D0' }}>
                    <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{r}</span>
                    <button type="button" onClick={() => setBenefitItems(p => p.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>

              {/* Interview Process */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Interview Process (steps in order)</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={interviewInput} onChange={e => setInterviewInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (interviewInput.trim()) { setInterviewItems(p => [...p, interviewInput.trim()]); setInterviewInput(''); } } }}
                    placeholder="e.g. Resume Screening, Technical Test" style={{ flex: 1, padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                  <button type="button" onClick={() => { if (interviewInput.trim()) { setInterviewItems(p => [...p, interviewInput.trim()]); setInterviewInput(''); } }}
                    style={{ padding: '9px 14px', background: '#1A6FE8', border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
                {interviewItems.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#EFF6FF', borderRadius: 7, marginBottom: 5, border: '1px solid #BFDBFE' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1A6FE8', minWidth: 20 }}>{i + 1}.</span>
                    <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{r}</span>
                    <button type="button" onClick={() => setInterviewItems(p => p.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>

              {inp('status', 'Status', { type: 'select', options: [{ value: 'open', label: 'Open' }, { value: 'closed', label: 'Closed' }] })}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '11px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Save Job</button>
                <button type="button" onClick={close} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applications panel */}
      {viewApps && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800 }}>Applications ({applications.length})</h2>
              <button onClick={() => setViewApps(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#64748B', fontWeight: 600 }}>Close</button>
            </div>
            {applications.length === 0 ? <p style={{ color: '#94A3B8', textAlign: 'center', padding: 32 }}>No applications yet.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {applications.map(app => (
                  <div key={app.id} style={{ padding: 16, border: '1px solid #E5E7EB', borderRadius: 10, background: '#FAFAFA' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{app.name}</div>
                        <div style={{ fontSize: 13, color: '#64748B' }}>{app.email} · {app.phone}</div>
                        <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Exp: {app.experience} · {new Date(app.createdAt).toLocaleDateString()}</div>
                        {app.cv_url && <a href={`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}${app.cv_url}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#1A6FE8', fontWeight: 600 }}>📄 View CV</a>}
                      </div>
                      <select value={app.status} onChange={e => updateAppStatus(viewApps, app.id, e.target.value)}
                        style={{ padding: '5px 10px', border: `1px solid ${appStatusColor[app.status]}`, borderRadius: 6, fontSize: 12, fontWeight: 600, color: appStatusColor[app.status], background: '#fff', cursor: 'pointer' }}>
                        {['new','reviewing','shortlisted','rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    {app.why_join && <p style={{ fontSize: 13, color: '#374151', marginTop: 10, borderTop: '1px solid #E5E7EB', paddingTop: 10 }}>{app.why_join}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Jobs list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {careers.map(c => {
          let skills = [];
          try { skills = JSON.parse(c.skills || '[]'); } catch {}
          return (
            <div key={c.id} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{c.title}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: c.status === 'open' ? '#DCFCE7' : '#FEE2E2', color: c.status === 'open' ? '#15803D' : '#DC2626' }}>{c.status}</span>
                </div>
                <div style={{ fontSize: 13, color: '#64748B', marginBottom: 8 }}>{c.department} · {c.location} · {c.type} · {c.experience}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.map(s => <span key={s} style={{ fontSize: 11, padding: '2px 8px', background: '#EFF6FF', color: '#1A6FE8', borderRadius: 20, fontWeight: 600 }}>{s}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => loadApps(c.id)} style={{ padding: '7px 14px', background: '#F0FDF4', border: 'none', borderRadius: 7, color: '#15803D', cursor: 'pointer', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Users size={13} /> Applications
                </button>
                <button onClick={() => open(c)} style={{ padding: '7px 14px', background: '#EFF6FF', border: 'none', borderRadius: 7, color: '#1A6FE8', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(c.id)} style={{ padding: '7px 12px', background: '#FEF2F2', border: 'none', borderRadius: 7, color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
        {careers.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: '#94A3B8', background: '#fff', borderRadius: 12 }}>No job openings yet.</div>}
      </div>
    </div>
  );
}
