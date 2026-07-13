import { useEffect, useState, useRef } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Upload, Trash2, Copy, Image } from 'lucide-react';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState(null);
  const inputRef = useRef();

  const load = () => api.get('/media').then(r => setMedia(r.data.data));
  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('alt_text', file.name.replace(/\.[^.]+$/, ''));
        await api.post('/media', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      toast.success(`${files.length} file(s) uploaded`);
      load();
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); inputRef.current.value = ''; }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this file?')) return;
    await api.delete(`/media/${id}`); toast.success('Deleted'); load(); setSelected(null);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}${url}`);
    toast.success('URL copied!');
  };

  const isImage = (mime) => mime?.startsWith('image/');

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Media Library</h1>
        <div>
          <input ref={inputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleUpload} />
          <button onClick={() => inputRef.current.click()} disabled={uploading}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FF6B2B', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>

      {/* Drop zone hint */}
      <div onClick={() => inputRef.current.click()}
        style={{ border: '2px dashed #CBD5E1', borderRadius: 12, padding: '28px', textAlign: 'center', background: '#F8FAFF', marginBottom: 24, cursor: 'pointer' }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); inputRef.current.files = e.dataTransfer.files; handleUpload({ target: { files: e.dataTransfer.files } }); }}>
        <Upload size={28} style={{ color: '#94A3B8', marginBottom: 8 }} />
        <p style={{ color: '#64748B', fontSize: 14 }}>Drag & drop files here or <span style={{ color: '#FF6B2B', fontWeight: 600 }}>click to browse</span></p>
        <p style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>Images, PDFs, DOC files — max 10MB each</p>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
          {media.map(m => (
            <div key={m.id} onClick={() => setSelected(m)}
              style={{ borderRadius: 10, overflow: 'hidden', border: selected?.id === m.id ? '2px solid #FF6B2B' : '2px solid transparent', cursor: 'pointer', background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              {isImage(m.mime_type)
                ? <img src={`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}${m.url}`} alt={m.alt_text} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: '100%', height: 100, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image size={32} style={{ color: '#94A3B8' }} /></div>}
              <div style={{ padding: '6px 8px' }}>
                <div style={{ fontSize: 11, color: '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{m.original_name}</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>{m.size ? `${Math.round(m.size / 1024)}KB` : ''}</div>
              </div>
            </div>
          ))}
          {media.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#94A3B8' }}>No files uploaded yet.</div>}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ width: 260, background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', alignSelf: 'start', flexShrink: 0 }}>
            {isImage(selected.mime_type)
              ? <img src={`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}${selected.url}`} alt={selected.alt_text} style={{ width: '100%', borderRadius: 8, marginBottom: 14, maxHeight: 180, objectFit: 'cover' }} />
              : <div style={{ height: 100, background: '#F1F5F9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Image size={36} style={{ color: '#94A3B8' }} /></div>}
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 4, wordBreak: 'break-all' }}>{selected.original_name}</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 12 }}>{selected.mime_type} · {selected.size ? `${Math.round(selected.size / 1024)}KB` : ''}</div>
            <div style={{ fontSize: 12, color: '#374151', wordBreak: 'break-all', background: '#F8FAFF', padding: '6px 8px', borderRadius: 6, marginBottom: 14, fontFamily: 'monospace' }}>
              {import.meta.env.VITE_API_BASE || 'http://localhost:5000'}{selected.url}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={() => copyUrl(selected.url)}
                style={{ padding: '8px', background: '#EFF6FF', border: 'none', borderRadius: 7, color: '#1A6FE8', cursor: 'pointer', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Copy size={13} /> Copy URL
              </button>
              <button onClick={() => handleDelete(selected.id)}
                style={{ padding: '8px', background: '#FEF2F2', border: 'none', borderRadius: 7, color: '#EF4444', cursor: 'pointer', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
