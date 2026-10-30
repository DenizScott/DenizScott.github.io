import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LinkedinIcon } from '../ui/Icons.tsx';
import { site } from '../../data/site.ts';
import { useI18n } from '../../i18n/context.ts';
import { format } from '../../locales/index.ts';
import { homePath, sectionPath } from '../../lib/routes.ts';

const links = ['about', 'projects', 'expertise', 'contact'] as const;

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link to={homePath(lang)} className="font-display text-lg font-semibold">
            {site.name}
          </Link>
          <p className="mt-2 text-sm text-muted">{t.footer.built}</p>
        </div>

        <nav aria-label={t.a11y.mainNavigation}>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {links.map((id) => (
              <li key={id}>
                <Link to={sectionPath(lang, id)} className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-fg">
                  {t.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          <li>
            <a href={`mailto:${site.email}`} aria-label={t.contact.emailLabel} className="glass inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg">
              <Mail aria-hidden className="size-[1.125rem]" />
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.contact.linkedinLabel} ${t.a11y.opensInNewTab}`}
              className="glass inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <LinkedinIcon aria-hidden className="size-[1.125rem]" />
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-xs text-subtle">{format(t.footer.rights, { year })}</p>
      </div>
    </footer>
  );
}
