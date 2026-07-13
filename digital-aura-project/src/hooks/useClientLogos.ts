import { useEffect, useState } from "react";

export interface ClientLogoItem {
  name: string;
  tag: string;
  logo: string;
  logoBg: string;
}

export function useClientLogos(servicePage: string, fallback: ClientLogoItem[] = []) {
  const [logos, setLogos] = useState<ClientLogoItem[]>(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/client-logos?service_page=${servicePage}`)
      .then(r => r.json())
      .then(json => {
        if (json.data && json.data.length > 0) {
          setLogos(json.data.map((l: any) => ({
            name: l.name,
            tag: l.tag,
            logo: l.logo_url,
            logoBg: l.logo_bg,
          })));
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [servicePage]);

  return { logos, loaded };
}
