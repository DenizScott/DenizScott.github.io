import { site } from '../data/site.ts';
import { getProjectBySlug, projects } from '../data/projects.ts';
import { DEFAULT_LANG, LANGS, type Lang } from '../data/types.ts';
import { dictionaries, format } from '../locales/index.ts';
import { homePath, projectPath } from './routes.ts';

export type PageRoute = { kind: 'home' } | { kind: 'project'; slug: string } | { kind: 'notFound' };

export interface PageMeta {
  lang: Lang;
  title: string;
  description: string;
  /** Path of the canonical URL, e.g. `/en/projects/omni`. `null` for pages that must not be indexed. */
  path: string | null;
  alternates: { hreflang: string; path: string }[];
  ogType: 'website' | 'article';
  imagePath: string;
  noindex: boolean;
  jsonLd: object | null;
}

export const OG_IMAGE_PATH = '/og-image.png';

/** All indexable routes. Used by the sitemap and the static prerender step. */
export function listRoutes(): PageRoute[] {
  return [{ kind: 'home' }, ...projects.map((p) => ({ kind: 'project' as const, slug: p.slug }))];
}

export function routePath(route: PageRoute, lang: Lang): string {
  if (route.kind === 'project') return projectPath(lang, route.slug);
  return homePath(lang);
}

export function buildMeta(route: PageRoute, lang: Lang, siteUrl: string): PageMeta {
  const t = dictionaries[lang];

  if (route.kind === 'notFound') {
    return {
      lang,
      title: t.meta.notFoundTitle,
      description: t.meta.notFoundDescription,
      path: null,
      alternates: [],
      ogType: 'website',
      imagePath: OG_IMAGE_PATH,
      noindex: true,
      jsonLd: null,
    };
  }

  const alternates = [
    ...LANGS.map((l) => ({ hreflang: l, path: routePath(route, l) })),
    { hreflang: 'x-default', path: routePath(route, DEFAULT_LANG) },
  ];

  if (route.kind === 'project') {
    const project = getProjectBySlug(route.slug);
    if (project) {
      return {
        lang,
        title: format(t.meta.projectTitle, { project: project.title }),
        description: `${project.summary[lang]} ${project.category[lang]}.`,
        path: projectPath(lang, project.slug),
        alternates,
        ogType: 'article',
        imagePath: OG_IMAGE_PATH,
        noindex: false,
        jsonLd: null,
      };
    }
  }

  return {
    lang,
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    path: homePath(lang),
    alternates,
    ogType: 'website',
    imagePath: OG_IMAGE_PATH,
    noindex: false,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      alternateName: site.shortName,
      url: `${siteUrl}${homePath(lang)}`,
      jobTitle: t.meta.jobTitle,
      alumniOf: { '@type': 'CollegeOrUniversity', name: lang === 'tr' ? 'Doğuş Üniversitesi' : 'Doğuş University' },
      sameAs: [site.linkedin, ...(site.github ? [site.github] : [])],
      knowsAbout: ['Artificial intelligence', 'Large language models', 'Game development', 'Software development', 'Visual design'],
    },
  };
}

export interface TagSpec {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  /** Text content (used by the JSON-LD script). */
  text?: string;
}

/** Converts page metadata into head tags. Shared by the static prerender and the runtime head manager. */
export function metaToTags(meta: PageMeta, siteUrl: string): TagSpec[] {
  const abs = (p: string) => `${siteUrl}${p}`;
  const m = (name: string, content: string): TagSpec => ({ tag: 'meta', attrs: { name, content } });
  const og = (property: string, content: string): TagSpec => ({ tag: 'meta', attrs: { property, content } });

  const tags: TagSpec[] = [m('description', meta.description)];
  if (meta.noindex) tags.push(m('robots', 'noindex, follow'));
  if (meta.path) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: abs(meta.path) } });
  for (const alt of meta.alternates) tags.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: alt.hreflang, href: abs(alt.path) } });
  tags.push(
    og('og:type', meta.ogType),
    og('og:site_name', site.shortName),
    og('og:title', meta.title),
    og('og:description', meta.description),
    og('og:image', abs(meta.imagePath)),
    og('og:image:width', '1200'),
    og('og:image:height', '630'),
    og('og:image:alt', site.name),
    og('og:locale', dictionaries[meta.lang].meta.ogLocale),
  );
  if (meta.path) tags.push(og('og:url', abs(meta.path)));
  tags.push(m('twitter:card', 'summary_large_image'), m('twitter:title', meta.title), m('twitter:description', meta.description), m('twitter:image', abs(meta.imagePath)));
  if (meta.jsonLd) tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(meta.jsonLd) });
  return tags;
}