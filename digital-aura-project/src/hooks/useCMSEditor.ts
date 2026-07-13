import { useEffect } from 'react';

/* Module-level state — survives React re-renders */
let styleEdits: Record<string, Record<string, string>> = {};
let textEdits: Record<string, string> = {};
let selectedEl: Element | null = null;
let cmsEnabled = true;
let initialized = false;

function getOrCreateStyleTag(): HTMLStyleElement {
  let el = document.getElementById('__cms_styles__') as HTMLStyleElement;
  if (!el) {
    el = document.createElement('style');
    el.id = '__cms_styles__';
    document.head.appendChild(el);
  }
  return el;
}

function rebuildCSS() {
  const css = Object.entries(styleEdits).map(([key, props]) => {
    const decls = Object.entries(props)
      .filter(([, v]) => v && v !== '')
      .map(([p, v]) => {
        const kebab = p.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${kebab}:${v}!important`;
      }).join(';');
    return decls ? `[data-cms-key="${key}"]{${decls}}` : '';
  }).filter(Boolean).join('\n');
  getOrCreateStyleTag().textContent = css;
}

function applyText(key: string, value: string) {
  const el = document.querySelector(`[data-cms-key="${key}"]`);
  if (!el) return;
  let best: Text | null = null, bestLen = -1;
  function walk(node: Node) {
    node.childNodes.forEach(n => {
      if (n.nodeType === 3) {
        const t = (n as Text).textContent?.trim() ?? '';
        if (t.length > bestLen) { best = n as Text; bestLen = t.length; }
      } else if (n.nodeType === 1) {
        const tag = (n as Element).tagName;
        if (tag !== 'SCRIPT' && tag !== 'STYLE') walk(n);
      }
    });
  }
  walk(el);
  if (best) (best as Text).textContent = value;
  else (el as HTMLElement).textContent = value;
}

function getComputedStyles(el: Element) {
  const cs = window.getComputedStyle(el);
  return {
    fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color,
    textAlign: cs.textAlign, fontStyle: cs.fontStyle,
    textDecoration: cs.textDecoration, lineHeight: cs.lineHeight,
    letterSpacing: cs.letterSpacing,
    paddingTop: cs.paddingTop, paddingRight: cs.paddingRight,
    paddingBottom: cs.paddingBottom, paddingLeft: cs.paddingLeft,
    marginTop: cs.marginTop, marginBottom: cs.marginBottom,
    backgroundColor: cs.backgroundColor, borderRadius: cs.borderRadius,
    opacity: cs.opacity,
  };
}

export function useCMSEditor() {
  /* Re-apply edits after every React render so they survive re-renders */
  useEffect(() => {
    if (!initialized) return;
    if (Object.keys(styleEdits).length > 0) rebuildCSS();
    Object.entries(textEdits).forEach(([k, v]) => applyText(k, v));
  });

  useEffect(() => {
    /* Only activate when inside an iframe (i.e. loaded by admin panel) */
    if (window.parent === window) return;
    if (initialized) return;
    initialized = true;

    /* UI highlight styles */
    const uiStyle = document.createElement('style');
    uiStyle.id = '__cms_ui_style';
    uiStyle.textContent = `
      [data-cms-key]{cursor:pointer!important}
      [data-cms-key]:hover{outline:2px dashed #FF6B2B!important;outline-offset:3px!important}
      [data-cms-key].__cms_sel{outline:2px solid #FF6B2B!important;outline-offset:3px!important;box-shadow:0 0 0 5px rgba(255,107,43,0.12)!important}
      .__cms_tip{position:fixed;background:#FF6B2B;color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:3px;z-index:2147483647;pointer-events:none;font-family:system-ui,sans-serif;white-space:nowrap;display:none;top:0;left:0}
    `;
    document.head.appendChild(uiStyle);

    const tip = document.createElement('div');
    tip.className = '__cms_tip';
    document.body.appendChild(tip);

    const onMouseOver = (e: MouseEvent) => {
      if (!cmsEnabled) return;
      const el = (e.target as Element).closest('[data-cms-key]');
      if (el && el !== selectedEl) {
        const r = el.getBoundingClientRect();
        tip.textContent = '✏ ' + (el as HTMLElement).dataset.cmsLabel;
        tip.style.left = r.left + 'px';
        tip.style.top = Math.max(0, r.top - 26) + 'px';
        tip.style.display = 'block';
      } else if (!el) { tip.style.display = 'none'; }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-cms-key]')) tip.style.display = 'none';
    };

    const onClick = (e: MouseEvent) => {
      if (!cmsEnabled) return;
      const el = (e.target as Element).closest('[data-cms-key]');
      if (el) {
        e.preventDefault(); e.stopPropagation();
        if (selectedEl && selectedEl !== el) selectedEl.classList.remove('__cms_sel');
        selectedEl = el; el.classList.add('__cms_sel');
        const attr = (el as HTMLElement).dataset.cmsAttr || 'text';
        const msg: Record<string, unknown> = {
          type: 'CMS_SELECT',
          key: (el as HTMLElement).dataset.cmsKey,
          label: (el as HTMLElement).dataset.cmsLabel,
          attr,
          value: attr === 'text' ? (el as HTMLElement).innerText.trim() : (el.getAttribute(attr) || ''),
          computed: getComputedStyles(el),
        };
        if (attr === 'icon') {
          msg.iconName = (el as HTMLElement).dataset.cmsIconName || 'Star';
          msg.iconSize = parseInt((el as HTMLElement).dataset.cmsIconSize || '24');
          msg.iconColor = (el as HTMLElement).dataset.cmsIconColor || '';
        }
        window.parent.postMessage(msg, '*');
      } else {
        if (selectedEl) { selectedEl.classList.remove('__cms_sel'); selectedEl = null; }
        tip.style.display = 'none';
        window.parent.postMessage({ type: 'CMS_DESELECT' }, '*');
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('click', onClick, true);

    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d?.type) return;

      if (d.type === 'CMS_TOGGLE') {
        cmsEnabled = d.active;
        uiStyle.disabled = !d.active;
        if (!d.active && selectedEl) { selectedEl.classList.remove('__cms_sel'); selectedEl = null; }
        return;
      }
      if (d.type === 'CMS_PREVIEW_UPDATE') {
        textEdits[d.key] = d.value;
        applyText(d.key, d.value);
        return;
      }
      if (d.type === 'CMS_STYLE_UPDATE') {
        if (!styleEdits[d.key]) styleEdits[d.key] = {};
        if (!d.value) delete styleEdits[d.key][d.prop];
        else styleEdits[d.key][d.prop] = d.value;
        rebuildCSS();
        return;
      }
      if (d.type === 'CMS_STYLES_BULK') {
        styleEdits = d.edits || {};
        rebuildCSS();
        return;
      }
      if (d.type === 'CMS_TEXTS_BULK') {
        textEdits = d.edits || {};
        Object.entries(textEdits).forEach(([k, v]) => applyText(k, v));
        return;
      }
      // CMS_ICON_UPDATE and CMS_ICONS_BULK are handled by useCMSIcons module
      // CMSIcon components re-render reactively via the icon store
      if (d.type === 'CMS_TEXT' && selectedEl) {
        const key = (selectedEl as HTMLElement).dataset.cmsKey!;
        textEdits[key] = d.value;
        applyText(key, d.value);
        return;
      }
      if (d.type === 'CMS_STYLE' && selectedEl) {
        const key = (selectedEl as HTMLElement).dataset.cmsKey!;
        if (!styleEdits[key]) styleEdits[key] = {};
        Object.assign(styleEdits[key], d.styles);
        rebuildCSS();
        return;
      }
    };

    window.addEventListener('message', onMessage);

    /* Tell parent we're ready — triggers resendAll */
    window.parent.postMessage({ type: 'CMS_READY', pathname: window.location.pathname }, '*');

    return () => {
      initialized = false;
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('message', onMessage);
      uiStyle.remove();
      tip.remove();
    };
  }, []);
}
