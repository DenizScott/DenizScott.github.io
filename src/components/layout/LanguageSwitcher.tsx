import { Link, useLocation } from 'react-router-dom';
import { LANGS, type Lang } from '../../data/types.ts';
import { useI18n } from '../../i18n/context.ts';
import { format } from '../../locales/index.ts';
import { switchLangPath } from '../../lib/routes.ts';
import { storeLang } from '../../lib/storage.ts';

/** EN / TR switch. Links to the same page in the other language and remembers the choice. */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, t } = useI18n();
  const { pathname, hash } = useLocation();

  return (
    <div role="group" aria-label={t.a11y.languageSwitcher} className={`glass inline-flex items-center rounded-full p-0.5 ${className}`}>
      {LANGS.map((code: Lang) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            to={switchLangPath(pathname, hash, code)}
            lang={code}
            hrefLang={code}
            aria-current={active ? 'true' : undefined}
            aria-label={format(t.a11y.switchToLanguage, { language: t.languages[code] })}
            onClick={() => storeLang(code)}
            className={`inline-flex min-h-10 min-w-11 items-center justify-center rounded-full px-3 text-[0.8125rem] font-semibold tracking-wider transition-colors duration-200 ${
              active ? 'bg-fg text-ink' : 'text-muted hover:text-fg'
            }`}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
