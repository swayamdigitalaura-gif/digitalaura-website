import { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Code2, Save, Info, ChevronDown, ChevronUp } from 'lucide-react';

const EXAMPLES = {
  gtm: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`,
  ga4: `<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`,
  clarity: `<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "XXXXXXXXXX");
</script>`,
  pixel: `<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
</script>`,
};

const EDITOR_STYLE = {
  display: 'block', width: '100%', minHeight: 220, padding: '14px 16px',
  background: 'transparent', border: 'none', color: '#A5F3FC',
  fontSize: 12.5, fontFamily: 'monospace', lineHeight: 1.7,
  resize: 'vertical', outline: 'none', boxSizing: 'border-box',
};

export default function HeaderFooter() {
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    api.get('/site/header-footer')
      .then(r => {
        setHeadCode(r.data.head_code || '');
        setBodyCode(r.data.body_code || '');
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/site/header-footer', { head_code: headCode, body_code: bodyCode });
      setSaved(true);
      toast.success('Header & Footer code saved and applied to all pages!');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally { setSaving(false); }
  };

  const insertExample = (key, target) => {
    const code = EXAMPLES[key];
    if (target === 'head') setHeadCode(prev => (prev ? prev + '\n\n' : '') + code);
    else setBodyCode(prev => (prev ? prev + '\n\n' : '') + code);
    toast(`"${key.toUpperCase()}" snippet added to ${target === 'head' ? '<head>' : '<body>'}`);
  };

  const Card = ({ title, subtitle, value, onChange, placeholder }) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 10 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</p>
        <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0' }}>{subtitle}</p>
      </div>
      <div style={{ background: '#0F172A', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '8px 14px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <code style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace' }}>{title === 'Head Code' ? '<head> ... </head>' : '<body> ... </body>'}</code>
          <span style={{ fontSize: 11, color: '#334155' }}>{value.split('\n').length} lines</span>
        </div>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          style={EDITOR_STYLE}
        />
      </div>
    </div>
  );

  return (
    <div style={{ padding: 32, maxWidth: 960 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#FF6B2B,#7C3AED)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Code2 size={20} style={{ color: '#fff' }} />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Header & Footer Code</h1>
          <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>Inject scripts, pixels, schema, or CSS into every page — no theme editing needed.</p>
        </div>
      </div>

      {/* Info banner */}
      <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 10, padding: 14, marginBottom: 24, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Info size={16} style={{ color: '#0369A1', flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 13, color: '#0369A1', lineHeight: 1.6 }}>
          Code is saved to the database and <strong>automatically injected into every page</strong> on the live site. Head code goes before <code style={{ background: '#BAE6FD', padding: '1px 5px', borderRadius: 3 }}>&lt;/head&gt;</code>, body code goes before <code style={{ background: '#BAE6FD', padding: '1px 5px', borderRadius: 3 }}>&lt;/body&gt;</code>.
        </div>
      </div>

      {/* Quick snippets */}
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setShowExamples(p => !p)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#374151', padding: 0, marginBottom: showExamples ? 12 : 0 }}>
          {showExamples ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          Quick Snippets
        </button>
        {showExamples && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
            {[
              { key: 'gtm', label: 'Google Tag Manager', target: 'head' },
              { key: 'ga4', label: 'Google Analytics (GA4)', target: 'head' },
              { key: 'clarity', label: 'Microsoft Clarity', target: 'head' },
              { key: 'pixel', label: 'Meta Pixel', target: 'head' },
            ].map(({ key, label, target }) => (
              <button key={key} onClick={() => insertExample(key, target)}
                style={{ padding: '9px 12px', background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 8, color: '#374151', fontSize: 12.5, cursor: 'pointer', fontWeight: 500, textAlign: 'left', lineHeight: 1.3 }}>
                + {label}
                <span style={{ display: 'block', fontSize: 10.5, color: '#94A3B8', marginTop: 2 }}>→ {target === 'head' ? '<head>' : '<body>'}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Head Code editor */}
      <Card
        title="Head Code"
        subtitle="Injected just before </head> — ideal for analytics, schema, fonts, meta tags."
        value={headCode}
        onChange={setHeadCode}
        placeholder="<!-- Paste your <head> code here e.g. Google Analytics, GTM, Schema JSON-LD, custom CSS -->"
      />

      {/* Body Code editor */}
      <Card
        title="Body Code"
        subtitle="Injected just before </body> — ideal for chat widgets, pixel noscript tags, deferred JS."
        value={bodyCode}
        onChange={setBodyCode}
        placeholder="<!-- Paste your </body> code here e.g. Facebook Pixel noscript, chat widget, custom JS -->"
      />

      {/* Save button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 28px', background: saving ? '#E5E7EB' : saved ? '#22C55E' : 'linear-gradient(135deg,#FF6B2B,#e85a1a)', border: 'none', borderRadius: 8, color: saving ? '#9CA3AF' : '#fff', fontWeight: 700, fontSize: 14, cursor: saving ? 'default' : 'pointer', transition: 'background 0.2s' }}>
          <Save size={15} />
          {saving ? 'Saving & Injecting...' : saved ? 'Saved & Applied!' : 'Save & Apply to All Pages'}
        </button>
        {saved && <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 600 }}>✓ Live on all {headCode || bodyCode ? 'pages' : 'pages (cleared)'}</span>}
      </div>

      {/* Reference */}
      <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Common Uses</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12, color: '#64748B' }}>
          {[
            ['Google Analytics / GA4', 'Paste the gtag.js script → Head Code'],
            ['Google Tag Manager', 'Paste the GTM script → Head Code'],
            ['Facebook / Meta Pixel', 'Paste pixel script → Head Code'],
            ['Microsoft Clarity', 'Paste Clarity script → Head Code'],
            ['JSON-LD Schema (global)', 'Paste <script type="application/ld+json"> → Head Code'],
            ['Chat widget / Intercom', 'Paste widget JS → Body Code'],
            ['Custom CSS', 'Wrap in <style> tags → Head Code'],
            ['Custom JS (deferred)', 'Wrap in <script> tags → Body Code'],
          ].map(([item, hint]) => (
            <div key={item} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>{item}</span>
              <span style={{ fontSize: 11 }}>{hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
