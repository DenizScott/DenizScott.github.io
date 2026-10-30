import { createContext, useContext } from 'react';
import type { Lang } from '../data/types.ts';
import type { Dictionary } from '../locales/index.ts';

export interface I18nValue {
  lang: Lang;
  t: Dictionary;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <LangLayout>');
  return value;
}
