import type { Lang } from '../data/types.ts';
import { DEFAULT_LANG, LANGS } from '../data/types.ts';

export const homePath = (lang: Lang): string => `/${lang}`;
export const projectPath = (lang: Lang, slug: string): string => `/${lang}/projects/${slug}`;
export const sectionPath = (lang: Lang, section: string): string => `/${lang}#${section}`;

/**
 * Maps the current location to the same page in another language.
 * `/en/projects/omni` → `/tr/projects/omni`. Unknown paths fall back to the language home.
 */
export function switchLangPath(pathname: string, hash: string, target: Lang): string {
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  if (first && (LANGS as readonly string[]).includes(first)) {
    parts[0] = target;
    return `/${parts.join('/')}${hash}`;
  }
  return homePath(target);
}

export const FALLBACK_LANG: Lang = DEFAULT_LANG;
