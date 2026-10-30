import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { projects } from '../src/data/projects.ts';
import { site } from '../src/data/site.ts';
import { LANGS } from '../src/data/types.ts';
import { buildMeta, listRoutes, metaToTags, routePath, type PageMeta } from '../src/lib/seo.ts';

const START = '<!--seo:start-->';
const END = '<!--seo:end-->';

const esc = (v: string): string => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function renderHead(meta: PageMeta, siteUrl: string): string {
  const lines: string[] = [`<title>${esc(meta.title)}</title>`];
  for (const spec of metaToTags(meta, siteUrl)) {
    if (spec.tag === 'script') {
      lines.push(`<script type="application/ld+json">${(spec.text ?? '').replace(/</g, '\\u003c')}</script>`);
      continue;
    }
    const attrs = Object.entries(spec.attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(' ');
    lines.push(`<${spec.tag} ${attrs} />`);
  }
  return `${START}\n    ${lines.join('\n    ')}\n    ${END}`;
}

function applyHead(html: string, meta: PageMeta, siteUrl: string): string {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start === -1 || end === -1) throw new Error('index.html is missing the <!--seo:start--> / <!--seo:end--> markers');
  const next = html.slice(0, start) + renderHead(meta, siteUrl) + html.slice(end + END.length);
  return next.replace(/<html lang="[^"]*"/, `<html lang="${meta.lang}"`);
}

function buildSitemap(siteUrl: string): string {
  const urls: string[] = [];
  for (const route of listRoutes()) {
    for (const lang of LANGS) {
      const links = [
        ...LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}${routePath(route, l)}" />`),
        `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${routePath(route, 'en')}" />`,
      ];
      urls.push(`  <url>\n    <loc>${siteUrl}${routePath(route, lang)}</loc>\n    ${links.join('\n    ')}\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

/**
 * Resolves the public origin, injects default SEO tags during dev, and — after a production build —
 * writes a static HTML shell per route (so crawlers and link previews see correct metadata),
 * plus sitemap.xml, robots.txt and a 404.html that Cloudflare Pages serves with a real 404 status.
 */
export function seoStatic(siteUrlOverride?: string): Plugin {
  const siteUrl = (siteUrlOverride || site.siteUrl).replace(/\/+$/, '');
  let config: ResolvedConfig;

  return {
    name: 'portfolio-seo-static',
    config() {
      return { define: { __SITE_URL__: JSON.stringify(siteUrl) } };
    },
    configResolved(resolved) {
      config = resolved;
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return applyHead(html, buildMeta({ kind: 'home' }, 'en', siteUrl), siteUrl);
      },
    },
    async closeBundle() {
      if (config.command !== 'build') return;
      const outDir = resolve(config.root, config.build.outDir);
      const base = await readFile(join(outDir, 'index.html'), 'utf8');

      const emit = async (relPath: string, html: string) => {
        const target = join(outDir, relPath);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, html, 'utf8');
      };

      for (const route of listRoutes()) {
        for (const lang of LANGS) {
          const rel = join(routePath(route, lang).replace(/^\//, ''), 'index.html');
          await emit(rel, applyHead(base, buildMeta(route, lang, siteUrl), siteUrl));
        }
      }
      await emit('404.html', applyHead(base, buildMeta({ kind: 'notFound' }, 'en', siteUrl), siteUrl));
      await writeFile(join(outDir, 'sitemap.xml'), buildSitemap(siteUrl), 'utf8');
      await writeFile(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
      config.logger.info(`seo-static: ${listRoutes().length * LANGS.length} route shells, 404.html, sitemap.xml, robots.txt (${projects.length} projects) → ${siteUrl}`);
    },
  };
}
