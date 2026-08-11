import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Globe, FileText, Plus, Search, Tag, FileCode } from 'lucide-react';

const statusBadge = (s) => (
  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: s === 'published' ? '#DCFCE7' : '#FEF9C3', color: s === 'published' ? '#15803D' : '#92400E' }}>
    {s}
  </span>
);

const TAB_STYLE = (active) => ({ padding: '8px 16px', border: 'none', borderRadius: '6px 6px 0 0', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: active ? '#fff' : '#F1F5F9', color: active ? '#FF6B2B' : '#64748B', borderBottom: active ? '2px solid #FF6B2B' : '2px solid transparent' });

const emptyNew = { title: '', slug: '', meta_title: '', meta_desc: '', keywords: '', og_image: '', canonical: '', schema_code: '', head_tags: '' };

export default function Pages() {
  const [pages, setPages] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState(emptyNew);
  const [editSEO, setEditSEO] = useState(null);
  const [seoForm, setSeoForm] = useState({});
  const [seoTab, setSeoTab] = useState('seo');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const load = () => api.get('/pages').then(r => setPages(r.data.data));
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pages', newForm);
      toast.success('Page created');
      setShowNew(false);
      setNewForm(emptyNew);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await api.delete(`/pages/${id}`);
    toast.success('Deleted');
    load();
  };

  const openSEO = (p) => {
    setEditSEO(p);
    setSeoForm({ meta_title: p.meta_title || '', meta_desc: p.meta_desc || '', keywords: p.keywords || '', og_image: p.og_image || '', canonical: p.canonical || '', schema_code: p.schema_code || '', head_tags: p.head_tags || '' });
    setSeoTab('seo');
  };

  const saveSEO = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pages/${editSEO.id}`, seoForm);
      toast.success('SEO data saved!');
      setEditSEO(null);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const charCount = (s, max) => {
    const n = (s || '').length;
    return <span style={{ fontSize: 11, color: n > max ? '#EF4444' : '#9CA3AF', marginLeft: 8 }}>{n}/{max}</span>;
  };

  const filtered = pages.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Pages & Builder</h1>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>Edit page content and SEO settings.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pages..." style={{ paddingLeft: 32, padding: '9px 12px 9px 32px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, width: 200 }} />
          </div>
          <button onClick={() => setShowNew(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            <Plus size={16} /> New Page
          </button>
        </div>
      </div>

      {/* New page modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 520, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Create New Page</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[{ name: 'title', label: 'Page Title *', placeholder: 'e.g. Home' },
                { name: 'slug', label: 'URL Slug *', placeholder: 'e.g. home or services/ai-automation' },
                { name: 'meta_title', label: 'Meta Title (SEO)', placeholder: 'SEO title (50-60 chars)' },
                { name: 'meta_desc', label: 'Meta Description (SEO)', placeholder: 'SEO description (150-160 chars)', type: 'textarea' },
                { name: 'keywords', label: 'Focus Keywords', placeholder: 'keyword1, keyword2, ...' },
              ].map(f => (
                <div key={f.name}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  {f.type === 'textarea'
                    ? <textarea name={f.name} value={newForm[f.name] || ''} onChange={e => setNewForm(p => ({ ...p, [e.target.name]: e.target.value }))} placeholder={f.placeholder} rows={3} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, resize: 'vertical' }} />
                    : <input name={f.name} required={f.name === 'title' || f.name === 'slug'} value={newForm[f.name] || ''} onChange={e => setNewForm(p => ({ ...p, [e.target.name]: e.target.value }))} placeholder={f.placeholder} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />}
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="submit" style={{ flex: 1, padding: '10px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Create Page</button>
                <button type="button" onClick={() => setShowNew(false)} style={{ flex: 1, padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO Edit Modal */}
      {editSEO && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 680, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: '20px 28px 0', borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>SEO Settings — {editSEO.title}</h2>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 14px' }}>/{editSEO.slug}</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {[['seo', 'SEO & Meta', Globe], ['schema', 'Schema', FileCode], ['headtags', 'Head Tags', Tag]].map(([k, l, I]) => (
                  <button key={k} onClick={() => setSeoTab(k)} style={TAB_STYLE(seoTab === k)}>
                    {I && <I size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />}{l}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={saveSEO} style={{ flex: 1, overflowY: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {seoTab === 'seo' && <>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Meta Title</label>
                    {charCount(seoForm.meta_title, 60)}
                  </div>
                  <input value={seoForm.meta_title || ''} onChange={e => setSeoForm(p => ({ ...p, meta_title: e.target.value }))} placeholder="SEO title (50-60 chars)" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Meta Description</label>
                    {charCount(seoForm.meta_desc, 160)}
                  </div>
                  <textarea value={seoForm.meta_desc || ''} onChange={e => setSeoForm(p => ({ ...p, meta_desc: e.target.value }))} rows={3} placeholder="SEO description (150-160 chars)" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Focus Keywords</label>
                  <input value={seoForm.keywords || ''} onChange={e => setSeoForm(p => ({ ...p, keywords: e.target.value }))} placeholder="keyword1, keyword2, keyword3" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>OG Image URL</label>
                  <input value={seoForm.og_image || ''} onChange={e => setSeoForm(p => ({ ...p, og_image: e.target.value }))} placeholder="https://... (1200×630px for social sharing)" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Canonical URL</label>
                  <p style={{ fontSize: 11, color: '#9CA3AF', margin: '0 0 5px' }}>Leave blank to use default. Set only if duplicate content exists elsewhere.</p>
                  <input value={seoForm.canonical || ''} onChange={e => setSeoForm(p => ({ ...p, canonical: e.target.value }))} placeholder="https://thedigitalaura.com/page-slug" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                </div>
                {(seoForm.meta_title || editSEO.title) && (
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: 16, background: '#FAFAFA' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>SERP Preview</p>
                    <p style={{ color: '#1a0dab', fontSize: 18, margin: '0 0 2px', fontWeight: 400, fontFamily: 'Arial, sans-serif' }}>{seoForm.meta_title || editSEO.title}</p>
                    <p style={{ color: '#006621', fontSize: 13, margin: '0 0 4px', fontFamily: 'Arial, sans-serif' }}>thedigitalaura.com › {editSEO.slug}</p>
                    <p style={{ color: '#545454', fontSize: 13, margin: 0, fontFamily: 'Arial, sans-serif' }}>{seoForm.meta_desc || 'No description set.'}</p>
                  </div>
                )}
              </>}
              {seoTab === 'schema' && <>
                <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 8, padding: 12, fontSize: 13, color: '#9A3412' }}>
                  Add JSON-LD structured data for rich results. Use Schema.org types like WebPage, Service, FAQPage, etc.
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>JSON-LD Schema Code</label>
                  <textarea value={seoForm.schema_code || ''} onChange={e => setSeoForm(p => ({ ...p, schema_code: e.target.value }))} rows={16} placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "${editSEO.title}",\n  "url": "https://thedigitalaura.com/${editSEO.slug}"\n}`} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 12, resize: 'vertical', fontFamily: 'monospace', background: '#0F172A', color: '#A5F3FC' }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => setSeoForm(p => ({ ...p, schema_code: `{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "${editSEO.title}",\n  "url": "https://thedigitalaura.com/${editSEO.slug}",\n  "publisher": {\n    "@type": "Organization",\n    "name": "Digital Aura",\n    "url": "https://thedigitalaura.com"\n  }\n}` }))} style={{ padding: '7px 14px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, color: '#1D4ED8', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Auto-fill WebPage
                  </button>
                  <button type="button" onClick={() => setSeoForm(p => ({ ...p, schema_code: `{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  "name": "${editSEO.title}",\n  "provider": {\n    "@type": "Organization",\n    "name": "Digital Aura"\n  },\n  "areaServed": "IN"\n}` }))} style={{ padding: '7px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 6, color: '#15803D', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Auto-fill Service
                  </button>
                </div>
              </>}
              {seoTab === 'headtags' && <>
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: 12, fontSize: 13, color: '#166534' }}>
                  Custom HTML tags for this page's &lt;head&gt; only. Add tracking pixels, custom meta tags, or inline scripts.
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Custom Head Tags</label>
                  <textarea value={seoForm.head_tags || ''} onChange={e => setSeoForm(p => ({ ...p, head_tags: e.target.value }))} rows={14} placeholder={`<!-- Custom head tags for this page -->\n<meta name="robots" content="index, follow" />\n<script>/* page-specific script */</script>`} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 12, resize: 'vertical', fontFamily: 'monospace', background: '#0F172A', color: '#A5F3FC' }} />
                </div>
              </>}
              <div style={{ display: 'flex', gap: 10, marginTop: 8, paddingTop: 8, borderTop: '1px solid #F1F5F9' }}>
                <button type="submit" style={{ flex: 1, padding: '11px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Save SEO Settings</button>
                <button type="button" onClick={() => setEditSEO(null)} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pages table */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E5E7EB' }}>
              {['Page', 'Slug', 'SEO', 'Status', 'Updated', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={16} style={{ color: '#1A6FE8' }} />
                    </div>
                    <span style={{ fontWeight: 600, color: '#0F172A', fontSize: 14 }}>{p.title}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', color: '#64748B', fontSize: 13, fontFamily: 'monospace' }}>/{p.slug}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span title="Meta Title" style={{ width: 8, height: 8, borderRadius: '50%', background: p.meta_title ? '#22C55E' : '#E5E7EB', display: 'inline-block' }} />
                    <span title="Meta Desc" style={{ width: 8, height: 8, borderRadius: '50%', background: p.meta_desc ? '#22C55E' : '#E5E7EB', display: 'inline-block' }} />
                    <span title="Schema" style={{ width: 8, height: 8, borderRadius: '50%', background: p.schema_code ? '#22C55E' : '#E5E7EB', display: 'inline-block' }} />
                  </div>
                </td>
                <td style={{ padding: '14px 20px' }}>{statusBadge(p.status)}</td>
                <td style={{ padding: '14px 20px', color: '#94A3B8', fontSize: 12 }}>{new Date(p.updatedAt).toLocaleDateString()}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => navigate(`/pages/${p.id}/builder`)}
                      style={{ padding: '6px 12px', background: '#EFF6FF', border: 'none', borderRadius: 6, color: '#1A6FE8', cursor: 'pointer', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => openSEO(p)}
                      title="SEO Settings"
                      style={{ padding: '6px 10px', background: '#F0FDF4', border: 'none', borderRadius: 6, color: '#15803D', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Globe size={13} />
                    </button>
                    <button onClick={() => handleDelete(p.id, p.title)}
                      style={{ padding: '6px 10px', background: '#FEF2F2', border: 'none', borderRadius: 6, color: '#EF4444', cursor: 'pointer' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
