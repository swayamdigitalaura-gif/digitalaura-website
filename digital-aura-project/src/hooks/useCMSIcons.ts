/**
 * Module-level store for persisted icon edits.
 * CMSIcon reads from here to apply saved icon changes on the live site.
 */

type IconEdit = { name?: string; size?: number; color?: string };

let iconStore: Record<string, IconEdit> = {};
const listeners = new Set<() => void>();

export function getIconEdit(key: string): IconEdit | null {
  return iconStore[key] || null;
}

export function setIconStore(edits: Record<string, IconEdit>) {
  iconStore = edits;
  listeners.forEach(fn => fn());
}

export function subscribeIconStore(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Load __icon__ keys from fetched settings and populate the store */
export function loadIconsFromSettings(all: Record<string, string>) {
  const edits: Record<string, IconEdit> = {};
  Object.entries(all).forEach(([k, v]) => {
    if (k.startsWith('__icon__')) {
      try { edits[k.slice(8)] = JSON.parse(v); } catch { /* ignore */ }
    }
  });
  setIconStore(edits);
}

// Listen for postMessage icon updates (when inside admin iframe)
if (typeof window !== 'undefined') {
  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d?.type) return;
    if (d.type === 'CMS_ICON_UPDATE') {
      const prev = iconStore[d.key] || {};
      iconStore = { ...iconStore, [d.key]: { ...prev, ...(d.name !== undefined ? { name: d.name } : {}), ...(d.size !== undefined ? { size: d.size } : {}), ...(d.color !== undefined ? { color: d.color } : {}) } };
      listeners.forEach(fn => fn());
    }
    if (d.type === 'CMS_ICONS_BULK') {
      iconStore = d.edits || {};
      listeners.forEach(fn => fn());
    }
  });
}
