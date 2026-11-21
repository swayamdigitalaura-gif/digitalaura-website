import { useState, useEffect } from 'react';
import { Map, RefreshCw, ExternalLink } from 'lucide-react';

const SITE = import.meta.env.VITE_SITE_BASE || 'http://localhost:8083';

export default function SitemapManager() {
  const [xml, setXml] = useState('');

  // Read-only: shows the real live sitemap. The file is built automatically at deploy time
  // (all pages + lastmod); the admin must never overwrite it.
  const preview = async () => {
    try {
      const res = await fetch('/sitemap.xml', { cache: 'no-store' });
      setXml(await res.text());
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
          <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>View your live XML sitemap. It is generated automatically on every deploy.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24, marginTop: 20 }}>
        {[
          { label: 'URLs in Sitemap', value: urlCount || '—', color: '#1A6FE8' },
          { label: 'Sitemap URL', value: 'sitemap.xml', color: '#22C55E' },
          { label: 'Updated', value: 'Auto on deploy', color: '#9CA3AF' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 4px', fontWeight: 600 }}>{label}</p>
            <p style={{ fontSize: 18, fontWeight: 800, color, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 12px' }}>How the sitemap works</h3>
        <ul style={{ fontSize: 13, color: '#64748B', paddingLeft: 20, margin: 0, lineHeight: 1.8 }}>
          <li>The sitemap is built automatically on every website deploy, with all pages, blogs and last-updated dates.</li>
          <li>It cannot be generated or overwritten from this panel, so it can no longer be broken from here.</li>
          <li>This page only shows the current live file.</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <button onClick={preview}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 24px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 8, color: '#0F172A', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          <RefreshCw size={15} /> Refresh preview
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
          </div>
          <pre style={{ margin: 0, fontSize: 12, color: '#A5F3FC', lineHeight: 1.6, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 400, overflowY: 'auto' }}>{xml}</pre>
        </div>
      )}

      <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: 16, marginTop: 20 }}>
        <p style={{ fontSize: 13, color: '#9A3412', margin: 0 }}>
          <strong>Submit to Google Search Console (one time):</strong> Go to Google Search Console → Sitemaps → Enter <code>{SITE}/sitemap.xml</code> → Submit.
        </p>
      </div>
    </div>
  );
}
