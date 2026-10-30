import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../../data/site.ts';
import { useI18n } from '../../i18n/context.ts';
import { homePath, sectionPath } from '../../lib/routes.ts';
import { useActiveSection } from '../../lib/useActiveSection.ts';
import { LanguageSwitcher } from './LanguageSwitcher.tsx';

const navItems = ['home', 'about', 'projects', 'expertise', 'contact'] as const;

export function Header() {
  const { lang, t } = useI18n();
  const { pathname } = useLocation();
  const isHome = pathname === homePath(lang) || pathname === `${homePath(lang)}/`;
  const isProject = pathname.includes('/projects/');
  const activeSection = useActiveSection(isHome);
  const active = isProject ? 'projects' : isHome ? activeSection : '';

  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  // The menu belongs to the page it was opened on, so it closes automatically on any navigation.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = useCallback((value: boolean) => setOpenPath(value ? pathname : null), [pathname]);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open, setOpen]);

  const label = (id: (typeof navItems)[number]) => t.nav[id];
  const target = (id: (typeof navItems)[number]) => (id === 'home' ? homePath(lang) + '#home' : sectionPath(lang, id));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
        <Link to={homePath(lang)} className="flex items-center gap-2.5 rounded-full" aria-label={`${site.shortName} — ${t.nav.home}`}>
          <img src="/favicon.svg" width={32} height={32} alt="" className="size-8" />
          <span className="font-display text-[1.0625rem] font-semibold tracking-tight">{site.shortName}</span>
        </Link>

        <nav aria-label={t.a11y.mainNavigation} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((id) => (
              <li key={id}>
                <Link
                  to={target(id)}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative inline-flex min-h-11 items-center px-4 text-[0.9375rem] font-medium transition-colors duration-200 ${
                    active === id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {label(id)}
                  {active === id && <span aria-hidden className="nav-dot absolute inset-x-4 -bottom-px h-px rounded-full bg-teal" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={sectionPath(lang, 'resume')}
            className="hidden min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-muted transition-colors hover:text-fg sm:inline-flex"
          >
            {t.nav.resume}
          </Link>
          <LanguageSwitcher />
          <button
            ref={toggleRef}
            type="button"
            className="glass inline-flex size-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label={t.a11y.mainNavigation} className="container-page py-4">
          <ul className="flex flex-col">
            {[...navItems, 'resume' as const].map((id) => (
              <li key={id} className="border-b border-line last:border-b-0">
                <Link
                  to={id === 'resume' ? sectionPath(lang, 'resume') : target(id)}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-14 items-center justify-between font-display text-2xl font-medium ${active === id ? 'text-teal-soft' : 'text-fg'}`}
                >
                  {id === 'resume' ? t.nav.resume : label(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
