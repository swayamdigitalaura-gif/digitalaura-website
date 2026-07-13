import { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Map, RefreshCw, Download, ExternalLink, CheckCircle } from 'lucide-react';

const SITE = import.meta.env.VITE_SITE_BASE || 'http://localhost:8083';

export default function SitemapManager() {
  const [xml, setXml] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/site/sitemap/generate');
      setXml(data.xml || '');
      setGenerated(true);
      toast.success('sitemap.xml generated and saved!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate sitemap');
    } finally { setLoading(false); }
  };

  const preview = async () => {
    try {
      const { data } = await api.get('/site/sitemap');
      setXml(typeof data === 'string' ? data : JSON.stringify(data));
    } catch {}
  };

  useEffect(() => { preview(); }, []);

  const urlCount = (xml.match(/<url>/g) || []).length;

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#FF6B2B,#e85a1a)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Map size={20} style={{ color: '#fff' }} />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Sitemap Manager</h1>
          <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>Generate and manage your XML sitemap for search engines.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24, marginTop: 20 }}>
        {[
          { label: 'URLs in Sitemap', value: urlCount || '—', color: '#1A6FE8' },
          { label: 'Sitemap URL', value: 'sitemap.xml', color: '#22C55E' },
          { label: 'Last Action', value: generated ? 'Just generated' : 'Not generated yet', color: '#9CA3AF' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 4px', fontWeight: 600 }}>{label}</p>
            <p style={{ fontSize: 18, fontWeight: 800, color, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 12px' }}>What's included in the sitemap</h3>
        <ul style={{ fontSize: 13, color: '#64748B', paddingLeft: 20, margin: 0, lineHeight: 1.8 }}>
          <li>All published pages from the database</li>
          <li>All published blog posts</li>
          <li>All main service pages (Full Stack, WordPress, SEO, etc.)</li>
          <li>Core pages: Home, About, Services, Contact, Blog, Careers, Case Studies</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <button onClick={generate} disabled={loading}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 24px', background: loading ? '#E5E7EB' : 'linear-gradient(135deg,#FF6B2B,#e85a1a)', border: 'none', borderRadius: 8, color: loading ? '#9CA3AF' : '#fff', fontWeight: 700, fontSize: 14, cursor: loading ? 'default' : 'pointer' }}>
          {loading ? <><RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <><RefreshCw size={15} /> Generate & Save Sitemap</>}
        </button>
        <a href={`${SITE}/sitemap.xml`} target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, color: '#1A6FE8', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
          <ExternalLink size={14} /> View Live Sitemap
        </a>
      </div>

      {xml && (
        <div style={{ background: '#0F172A', borderRadius: 12, padding: 20, overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>sitemap.xml preview</span>
            {generated && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#22C55E', fontWeight: 600 }}><CheckCircle size={12} /> Saved to server</span>}
          </div>
          <pre style={{ margin: 0, fontSize: 12, color: '#A5F3FC', lineHeight: 1.6, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 400, overflowY: 'auto' }}>{xml}</pre>
        </div>
      )}

      <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: 16, marginTop: 20 }}>
        <p style={{ fontSize: 13, color: '#9A3412', margin: 0 }}>
          <strong>Submit to Google Search Console:</strong> After generating, go to Google Search Console → Sitemaps → Enter <code>{SITE}/sitemap.xml</code> → Submit.
        </p>
      </div>
    </div>
  );
}
