import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * Google reCAPTCHA v2 ("I'm not a robot") checkbox.
 *
 * The site key comes from VITE_RECAPTCHA_SITE_KEY. In dev (localhost) with no key set, Google's public
 * test key is used so the widget can be checked end to end; it always passes and shows a "testing" notice.
 * In a production build with no key the widget renders nothing and the form submits as before, so a
 * missing key can never block the lead form.
 */

const GOOGLE_TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const CAPTCHA_SCALE = 0.75;
const SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit&onload=daRecaptchaReady";

type Grecaptcha = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  reset: (id?: number) => void;
  getResponse: (id?: number) => string;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    daRecaptchaReady?: () => void;
  }
}

export const RECAPTCHA_SITE_KEY: string =
  (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined) || (import.meta.env.DEV ? GOOGLE_TEST_SITE_KEY : "");

let loader: Promise<Grecaptcha> | null = null;

function loadRecaptcha(): Promise<Grecaptcha> {
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    if (window.grecaptcha?.render) return resolve(window.grecaptcha);
    window.daRecaptchaReady = () => resolve(window.grecaptcha as Grecaptcha);
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onerror = () => {
      loader = null;
      reject(new Error("reCAPTCHA failed to load"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

export type RecaptchaHandle = { getToken: () => string; reset: () => void };

export const RecaptchaBox = forwardRef<RecaptchaHandle>(function RecaptchaBox(_props, ref) {
  const host = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [compact, setCompact] = useState(false);

  useImperativeHandle(ref, () => ({
    getToken: () => (widgetId.current === null || !window.grecaptcha ? "" : window.grecaptcha.getResponse(widgetId.current)),
    reset: () => {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !host.current) return;
    let cancelled = false;
    loadRecaptcha()
      .then((g) => {
        if (cancelled || !host.current || widgetId.current !== null) return;
        // The standard widget is 304px wide (about 228px after scaling); use the compact one on very narrow screens.
        const small = host.current.parentElement ? host.current.parentElement.clientWidth < 304 * CAPTCHA_SCALE : false;
        setCompact(small);
        widgetId.current = g.render(host.current, { sitekey: RECAPTCHA_SITE_KEY, size: small ? "compact" : "normal" });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!RECAPTCHA_SITE_KEY) return null;
  // Shown smaller (75%) and left-aligned with the form fields. The outer box keeps the scaled height.
  return (
    <div className="mt-4 overflow-hidden" style={{ height: (compact ? 144 : 78) * CAPTCHA_SCALE }}>
      <div ref={host} data-recaptcha style={{ transform: `scale(${CAPTCHA_SCALE})`, transformOrigin: "left top", width: "max-content" }} />
    </div>
  );
});
