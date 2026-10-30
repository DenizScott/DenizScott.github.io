import { useEffect } from 'react';
import { useI18n } from '../i18n/context.ts';
import { buildMeta, metaToTags, type PageRoute } from '../lib/seo.ts';

const MANAGED = [
  'meta[name="description"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
  'link[rel="alternate"][hreflang]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'script[type="application/ld+json"]',
].join(',');

/** Keeps <title>, description, canonical, hreflang, Open Graph and JSON-LD in sync with the current page. */
export function Seo({ route }: { route: PageRoute }) {
  const { lang } = useI18n();
  const key = route.kind === 'project' ? `project:${route.slug}` : route.kind;

  useEffect(() => {
    const meta = buildMeta(route, lang, __SITE_URL__);
    document.title = meta.title;
    document.documentElement.lang = lang;
    document.head.querySelectorAll(MANAGED).forEach((node) => node.remove());
    for (const spec of metaToTags(meta, __SITE_URL__)) {
      const el = document.createElement(spec.tag);
      for (const [name, value] of Object.entries(spec.attrs)) el.setAttribute(name, value);
      if (spec.text) el.textContent = spec.text;
      document.head.appendChild(el);
    }
    // `route` is fully described by `key`; depending on the object would re-run on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, lang]);

  return null;
}
