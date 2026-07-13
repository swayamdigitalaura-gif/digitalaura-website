import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Search, Tag, FileCode, Globe } from 'lucide-react';

const CATS = ['SEO', 'Digital Marketing', 'Web Development', 'AI & Tech', 'Case Study', 'Social Media', 'eCommerce'];
const emptyForm = { title: '', slug: '', excerpt: '', content: '', cover_image: '', category: '', tags: '[]', status: 'draft', meta_title: '', meta_desc: '', keywords: '', schema_code: '', head_tags: '', og_image: '', canonical: '' };

const TAB_STYLE = (active) => ({ padding: '8px 16px', border: 'none', borderRadius: '6px 6px 0 0', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: active ? '#fff' : '#F1F5F9', color: active ? '#FF6B2B' : '#64748B', borderBottom: active ? '2px solid #FF6B2B' : '2px solid transparent' });

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [tab, setTab] = useState('content');
  const [search, setSearch] = useState('');

  const load = () => api.get('/blogs').then(r => setBlogs(r.data.data));
  useEffect(() => { load(); }, []);

  const open = (b = null) => {
    setEditing(b?.id || 'new');
    setForm(b ? { ...emptyForm, ...b, tags: b.tags || '[]' } : emptyForm);
    setTab('content');
  };
  const close = () => setEditing(null);
  const autoSlug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const set = (name, val) => setForm(p => ({ ...p, [name]: val }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing === 'new') await api.post('/blogs', form);
      else await api.put(`/blogs/${editing}`, form);
      toast.success('Saved!');
      close(); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    await api.delete(`/blogs/${id}`);
    toast.success('Deleted'); load();
  };

  const statusBadge = (s) => (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: s === 'published' ? '#DCFCE7' : '#FEF9C3', color: s === 'published' ? '#15803D' : '#92400E' }}>{s}</span>
  );

  const Field = ({ name, label, type = 'text', rows = 3, placeholder = '', hint = '' }) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{label}</label>
      {hint && <p style={{ fontSize: 11, color: '#9CA3AF', margin: '0 0 5px' }}>{hint}</p>}
      {type === 'textarea'
        ? <textarea value={form[name] || ''} onChange={e => set(name, e.target.value)} rows={rows} placeholder={placeholder} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, resize: 'vertical', fontFamily: 'monospace' }} />
        : <input value={form[name] || ''} onChange={e => { const v = e.target.value; setForm(p => ({ ...p, [name]: v, ...(name === 'title' && !p.slug ? { slug: autoSlug(v) } : {}) })); }} placeholder={placeholder} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />}
    </div>
  );

  const charCount = (s, max) => {
    const n = (s || '').length;
    return <span style={{ fontSize: 11, color: n > max ? '#EF4444' : '#9CA3AF' }}>{n}/{max}</span>;
  };

  const filtered = blogs.filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Blog Posts</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." style={{ paddingLeft: 32, padding: '9px 12px 9px 32px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, width: 200 }} />
          </div>
          <button onClick={() => open()} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 760, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: '20px 28px 0', borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 14px' }}>{editing === 'new' ? 'New Blog Post' : 'Edit Blog Post'}</h2>
              <div style={{ display: 'flex', gap: 4 }}>
                {[['content', 'Content', null], ['seo', 'SEO & Meta', Globe], ['schema', 'Schema', FileCode], ['headtags', 'Head Tags', Tag]].map(([k, l, I]) => (
                  <button key={k} onClick={() => setTab(k)} style={TAB_STYLE(tab === k)}>
                    {I && <I size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />}{l}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSave} style={{ flex: 1, overflowY: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>

              {tab === 'content' && <>
                <Field name="title" label="Title *" placeholder="Post title" />
                <Field name="slug" label="URL Slug *" placeholder="post-url-slug" />
                <Field name="excerpt" label="Excerpt" type="textarea" rows={2} placeholder="Brief description shown in listing..." />
                <Field name="content" label="Content (HTML / Markdown)" type="textarea" rows={12} placeholder="Write your content here..." />
                <Field name="cover_image" label="Cover Image URL" placeholder="https://..." />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Category</label>
                    <select value={form.category} onChange={e => set('category', e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }}>
                      <option value="">Select...</option>
                      {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Status</label>
                    <select value={form.status} onChange={e => set('status', e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </>}

              {tab === 'seo' && <>
                <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 8, padding: 12, fontSize: 13, color: '#0369A1' }}>
                  These fields control how this post appears in Google search results and social media previews.
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Meta Title</label>
                    {charCount(form.meta_title, 60)}
                  </div>
                  <input value={form.meta_title || ''} onChange={e => set('meta_title', e.target.value)} placeholder="SEO page title (50-60 chars recommended)" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Meta Description</label>
                    {charCount(form.meta_desc, 160)}
                  </div>
                  <textarea value={form.meta_desc || ''} onChange={e => set('meta_desc', e.target.value)} rows={3} placeholder="SEO description (150-160 chars recommended)" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Focus Keywords</label>
                  <p style={{ fontSize: 11, color: '#9CA3AF', margin: '0 0 5px' }}>Comma-separated keywords, e.g. "digital marketing, SEO agency, India"</p>
                  <input value={form.keywords || ''} onChange={e => set('keywords', e.target.value)} placeholder="keyword1, keyword2, keyword3" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 13 }} />
                </div>
                <Field name="og_image" label="OG Image URL (Social Share Preview)" placeholder="https://... (1200×630px recommended)" />
                <Field name="canonical" label="Canonical URL" placeholder="https://thedigitalaura.com/blog/your-post-slug" hint="Leave blank to use default URL. Set if this content exists elsewhere." />

                {/* SERP Preview */}
                {(form.meta_title || form.title) && (
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: 16, background: '#FAFAFA' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>SERP Preview</p>
                    <p style={{ color: '#1a0dab', fontSize: 18, margin: '0 0 2px', fontWeight: 400, fontFamily: 'Arial, sans-serif' }}>{form.meta_title || form.title}</p>
                    <p style={{ color: '#006621', fontSize: 13, margin: '0 0 4px', fontFamily: 'Arial, sans-serif' }}>thedigitalaura.com › blog › {form.slug || '...'}</p>
                    <p style={{ color: '#545454', fontSize: 13, margin: 0, fontFamily: 'Arial, sans-serif' }}>{form.meta_desc || form.excerpt || 'No description set.'}</p>
                  </div>
                )}
              </>}

              {tab === 'schema' && <>
                <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 8, padding: 12, fontSize: 13, color: '#9A3412' }}>
                  Add JSON-LD structured data for rich results in Google Search. Use Schema.org Article, BlogPosting, or FAQ types.
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>JSON-LD Schema Code</label>
                  <textarea value={form.schema_code || ''} onChange={e => set('schema_code', e.target.value)} rows={16} placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "${form.title || 'Your post title'}",\n  "author": {\n    "@type": "Organization",\n    "name": "Digital Aura"\n  }\n}`} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 12, resize: 'vertical', fontFamily: 'monospace', background: '#0F172A', color: '#A5F3FC' }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => set('schema_code', `{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "${form.title}",\n  "description": "${form.excerpt || form.meta_desc || ''}",\n  "author": {\n    "@type": "Organization",\n    "name": "Digital Aura",\n    "url": "https://thedigitalaura.com"\n  },\n  "publisher": {\n    "@type": "Organization",\n    "name": "Digital Aura"\n  },\n  "datePublished": "${new Date().toISOString().split('T')[0]}"\n}`)} style={{ padding: '7px 14px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, color: '#1D4ED8', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Auto-fill BlogPosting
                  </button>
                  <button type="button" onClick={() => set('schema_code', `{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    {\n      "@type": "Question",\n      "name": "Question 1?",\n      "acceptedAnswer": { "@type": "Answer", "text": "Answer 1" }\n    }\n  ]\n}`)} style={{ padding: '7px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 6, color: '#15803D', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Auto-fill FAQ
                  </button>
                  <button type="button" onClick={() => set('schema_code', '')} style={{ padding: '7px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, color: '#DC2626', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Clear
                  </button>
                </div>
              </>}

              {tab === 'headtags' && <>
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: 12, fontSize: 13, color: '#166534' }}>
                  Add custom HTML tags injected into the &lt;head&gt; for this page only. Useful for page-specific analytics scripts, pixel codes, or font imports.
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Custom Head Tags</label>
                  <textarea value={form.head_tags || ''} onChange={e => set('head_tags', e.target.value)} rows={14} placeholder={`<!-- Add custom tags here -->\n<meta name="robots" content="index, follow" />\n<link rel="stylesheet" href="custom.css" />\n<script>/* custom script */</script>`} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontSize: 12, resize: 'vertical', fontFamily: 'monospace', background: '#0F172A', color: '#A5F3FC' }} />
                </div>
              </>}

              <div style={{ display: 'flex', gap: 10, marginTop: 8, paddingTop: 8, borderTop: '1px solid #F1F5F9' }}>
                <button type="submit" style={{ flex: 1, padding: '11px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                  {editing === 'new' ? 'Create Post' : 'Save Changes'}
                </button>
                <button type="button" onClick={close} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E5E7EB' }}>
            {['Title', 'Category', 'SEO', 'Status', 'Date', 'Actions'].map(h => (
              <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 14 }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>/{b.slug}</div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748B' }}>{b.category || '—'}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span title="Meta Title" style={{ width: 8, height: 8, borderRadius: '50%', background: b.meta_title ? '#22C55E' : '#E5E7EB', display: 'inline-block' }} />
                    <span title="Schema" style={{ width: 8, height: 8, borderRadius: '50%', background: b.schema_code ? '#22C55E' : '#E5E7EB', display: 'inline-block' }} />
                    <span title="Keywords" style={{ width: 8, height: 8, borderRadius: '50%', background: b.keywords ? '#22C55E' : '#E5E7EB', display: 'inline-block' }} />
                  </div>
                </td>
                <td style={{ padding: '14px 20px' }}>{statusBadge(b.status)}</td>
                <td style={{ padding: '14px 20px', fontSize: 12, color: '#94A3B8' }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => open(b)} style={{ padding: '6px 12px', background: '#EFF6FF', border: 'none', borderRadius: 6, color: '#1A6FE8', cursor: 'pointer', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><Edit2 size={12} /> Edit</button>
                    <button onClick={() => handleDelete(b.id)} style={{ padding: '6px 10px', background: '#FEF2F2', border: 'none', borderRadius: 6, color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#94A3B8' }}>{search ? 'No posts match your search.' : 'No blog posts yet. Create your first post!'}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
