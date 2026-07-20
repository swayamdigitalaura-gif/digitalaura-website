import { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Bot, Save, RotateCcw, ExternalLink, Info } from 'lucide-react';

const SITE = import.meta.env.VITE_SITE_BASE || 'http://localhost:8083';

const PRESETS = {
  default: `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml`,
  block_admin: `User-agent: *\nAllow: /\nDisallow: /aura-desk/\nDisallow: /api/\nSitemap: ${SITE}/sitemap.xml`,
  noindex: `User-agent: *\nDisallow: /\n\n# Sitemap\nSitemap: ${SITE}/sitemap.xml`,
  googlebot_only: `User-agent: *\nDisallow: /\n\nUser-agent: Googlebot\nAllow: /\nSitemap: ${SITE}/sitemap.xml`,
};

export default function RobotsEditor() {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/site/robots/admin')
      .then(r => setContent(r.data.content || PRESETS.default))
      .catch(() => setContent(PRESETS.default));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/site/robots', { content });
      setSaved(true);
      toast.success('robots.txt saved!');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally { setSaving(false); }
  };

  const applyPreset = (key) => {
    setContent(PRESETS[key]);
    toast(`Applied "${key}" preset`);
  };

  const lineCount = content.split('\n').length;

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bot size={20} style={{ color: '#fff' }} />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>robots.txt Editor</h1>
          <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>Control which pages search engine crawlers can access.</p>
        </div>
      </div>

      <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 10, padding: 14, marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Info size={16} style={{ color: '#0369A1', flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 13, color: '#0369A1' }}>
          <strong>robots.txt</strong> tells search engine crawlers which pages to index. Changes are saved immediately to the server at <a href={`${SITE}/robots.txt`} target="_blank" rel="noreferrer" style={{ color: '#0369A1' }}>{SITE}/robots.txt</a>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Presets</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['default', 'Allow All (Default)'], ['block_admin', 'Block Admin & API'], ['noindex', 'Block All Bots'], ['googlebot_only', 'Googlebot Only']].map(([key, label]) => (
            <button key={key} onClick={() => applyPreset(key)}
              style={{ padding: '7px 14px', background: '#F1F5F9', border: '1px solid #E5E7EB', borderRadius: 6, color: '#374151', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
              {label}
            </button>
          ))}
          <button onClick={() => setContent('')}
            style={{ padding: '7px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, color: '#DC2626', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            Clear
          </button>
        </div>
      </div>

      <div style={{ background: '#0F172A', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>robots.txt — {lineCount} lines</span>
          <a href={`${SITE}/robots.txt`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748B', textDecoration: 'none' }}>
            <ExternalLink size={11} /> View live
          </a>
        </div>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={false}
          style={{ display: 'block', width: '100%', minHeight: 320, padding: '16px', background: 'transparent', border: 'none', color: '#A5F3FC', fontSize: 13, fontFamily: 'monospace', lineHeight: 1.7, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 24px', background: saving ? '#E5E7EB' : saved ? '#22C55E' : 'linear-gradient(135deg,#FF6B2B,#e85a1a)', border: 'none', borderRadius: 8, color: saving ? '#9CA3AF' : '#fff', fontWeight: 700, fontSize: 14, cursor: saving ? 'default' : 'pointer', transition: 'background 0.2s' }}>
          <Save size={15} /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save robots.txt'}
        </button>
        <button onClick={() => { setContent(PRESETS.default); toast('Reset to default'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 18px', background: '#F1F5F9', border: 'none', borderRadius: 8, color: '#64748B', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, marginTop: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Quick Reference</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12, color: '#64748B' }}>
          {[
            ['User-agent: *', 'Applies to all bots'],
            ['User-agent: Googlebot', 'Applies to Googlebot only'],
            ['Allow: /', 'Allow access to all pages'],
            ['Disallow: /admin/', 'Block access to /admin/'],
            ['Disallow: /', 'Block all pages'],
            ['Sitemap: URL', 'Point to your sitemap'],
          ].map(([code, desc]) => (
            <div key={code} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <code style={{ background: '#E5E7EB', padding: '1px 5px', borderRadius: 3, fontSize: 11, color: '#374151', whiteSpace: 'nowrap' }}>{code}</code>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
