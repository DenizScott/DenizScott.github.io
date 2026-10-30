import { useMemo, useEffect } from 'react';
import { useParams, Navigate, Outlet, useLocation } from 'react-router-dom';
import { DEFAULT_LANG, isLang, type Lang } from '../data/types.ts';
import { dictionaries } from '../locales/index.ts';
import { I18nContext, type I18nValue } from '../i18n/context.ts';
import { storeLang } from '../lib/storage.ts';
import { Ambient } from '../components/layout/Ambient.tsx';
import { Header } from '../components/layout/Header.tsx';
import { Footer } from '../components/layout/Footer.tsx';
import { BackToTop } from '../components/layout/BackToTop.tsx';
import { ScrollManager } from '../components/layout/ScrollManager.tsx';

export function LangLayout() {
  const { lang: paramLang } = useParams<{ lang: string }>();
  const location = useLocation();

  const validLang: Lang | null = isLang(paramLang) ? paramLang : null;

  useEffect(() => {
    if (validLang) {
      storeLang(validLang);
      document.documentElement.lang = validLang;
    }
  }, [validLang]);

  const i18nValue: I18nValue = useMemo(() => {
    const l = validLang ?? DEFAULT_LANG;
    return {
      lang: l,
      t: dictionaries[l],
    };
  }, [validLang]);

  if (!validLang) {
    // If invalid lang parameter in URL, redirect to default language while preserving rest of path if possible
    const rest = location.pathname.split('/').slice(2).join('/');
    return <Navigate to={`/${DEFAULT_LANG}${rest ? `/${rest}` : ''}${location.hash}`} replace />;
  }

  return (
    <I18nContext.Provider value={i18nValue}>
      <Ambient />
      <ScrollManager />
      <a
        href="#main-content"
        className="glass fixed left-4 top-4 z-[100] -translate-y-24 rounded-full px-4 py-2 text-sm font-medium text-fg transition-transform focus:translate-y-0"
      >
        {i18nValue.t.a11y.skipToContent}
      </a>
      <Header />
      <main id="main-content" className="relative z-10 flex min-h-screen flex-col">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </I18nContext.Provider>
  );
}
