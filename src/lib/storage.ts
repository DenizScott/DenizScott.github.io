import { DEFAULT_LANG, isLang, type Lang } from '../data/types.ts';

const KEY = 'dk-portfolio-lang';

/** Reads the language the visitor explicitly chose earlier. Never reads the browser language. */
export function getStoredLang(): Lang {
  try {
    const value = window.localStorage.getItem(KEY) ?? undefined;
    return isLang(value) ? value : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function storeLang(lang: Lang): void {
  try {
    window.localStorage.setItem(KEY, lang);
  } catch {
    /* storage unavailable (private mode) — the URL still carries the language */
  }
}
