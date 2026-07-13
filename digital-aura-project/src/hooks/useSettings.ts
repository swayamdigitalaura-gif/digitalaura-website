import { useState, useEffect, useRef } from 'react';
import { loadIconsFromSettings } from '@/hooks/useCMSIcons';

let cache: Record<string, string> | null = null;
let fetchPromise: Promise<Record<string, string>> | null = null;

const previewOverrides: Record<string, string> = {};
const settingsListeners = new Set<() => void>();

function applyPersistedStyles(all: Record<string, string>) {
  let css = '';
  Object.entries(all).forEach(([k, v]) => {
    if (k.startsWith('__style__')) {
      const cmsKey = k.slice(9);
      try {
        const props = JSON.parse(v) as Record<string, string>;
        const decls = Object.entries(props)
          .filter(([, val]) => val)
          .map(([p, val]) => `${p.replace(/([A-Z])/g, '-$1').toLowerCase()}:${val}!important`)
          .join(';');
        if (decls) css += `[data-cms-key="${cmsKey}"]{${decls}}\n`;
      } catch { /* ignore */ }
    }
  });
  let el = document.getElementById('__cms_persisted_styles__') as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = '__cms_persisted_styles__';
    document.head.appendChild(el);
  }
  el.textContent = css;
}

async function fetchSettings(): Promise<Record<string, string>> {
  if (cache) return cache;
  if (!fetchPromise) {
    fetchPromise = fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/settings`)
      .then(r => r.json())
      .then(d => {
        cache = d.data || {};
        applyPersistedStyles(cache!);
        loadIconsFromSettings(cache!);
        return cache!;
      })
      .catch(() => { fetchPromise = null; return {} as Record<string, string>; });
  }
  return fetchPromise;
}

export function bustSettingsCache() {
  cache = null;
  fetchPromise = null;
  fetchSettings().then(all => {
    settingsListeners.forEach(fn => fn());
    applyPersistedStyles(all);
    loadIconsFromSettings(all);
  });
}

try {
  const bc = new BroadcastChannel('da_settings');
  bc.onmessage = () => bustSettingsCache();
} catch (_e) { void _e; }

window.addEventListener('message', (e) => {
  if (e.data?.type === 'CMS_PREVIEW_UPDATE') {
    previewOverrides[e.data.key] = e.data.value;
    settingsListeners.forEach(fn => fn());
  }
  if (e.data?.type === 'CMS_SETTINGS_SAVED') {
    cache = null; fetchPromise = null;
    Object.keys(previewOverrides).forEach(k => delete previewOverrides[k]);
    fetchSettings().then(all => {
      settingsListeners.forEach(fn => fn());
      applyPersistedStyles(all);
      loadIconsFromSettings(all);
    });
  }
});

export function useSettings(keys: string[]): Record<string, string> {
  const [, forceUpdate] = useState(0);
  const allRef = useRef<Record<string, string>>({});
  const keysRef = useRef(keys);
  keysRef.current = keys;

  useEffect(() => {
    fetchSettings().then(all => { allRef.current = all; forceUpdate(n => n + 1); });
    const refresh = () => forceUpdate(n => n + 1);
    settingsListeners.add(refresh);
    return () => { settingsListeners.delete(refresh); };
  }, []);

  const result: Record<string, string> = {};
  keysRef.current.forEach(k => {
    result[k] = (k in previewOverrides) ? previewOverrides[k] : (allRef.current[k] ?? '');
  });
  return result;
}

export function useSetting(key: string, fallback = ''): string {
  const [, forceUpdate] = useState(0);
  const allRef = useRef<Record<string, string>>({});

  useEffect(() => {
    fetchSettings().then(all => { allRef.current = all; forceUpdate(n => n + 1); });
    const refresh = () => forceUpdate(n => n + 1);
    settingsListeners.add(refresh);
    return () => { settingsListeners.delete(refresh); };
  }, [key]);

  return (key in previewOverrides) ? previewOverrides[key] : (allRef.current[key] ?? fallback);
}
