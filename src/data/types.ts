/** Supported site languages. English is the default and always shown first. */
export type Lang = 'en' | 'tr';

export const LANGS: readonly Lang[] = ['en', 'tr'] as const;
export const DEFAULT_LANG: Lang = 'en';

/** A value that exists in every supported language. */
export type L<T> = Record<Lang, T>;

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'tr';
}
