import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/context.ts';

export function BackToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(() => window.scrollY > 800);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={t.a11y.backToTop}
      title={t.a11y.backToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`glass fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-full text-fg transition-[opacity,transform,background-color] duration-300 hover:bg-white/10 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp aria-hidden className="size-5" />
    </button>
  );
}
