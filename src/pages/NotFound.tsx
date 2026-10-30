import { ArrowLeft, Compass } from 'lucide-react';
import { useI18n } from '../i18n/context.ts';
import { homePath, sectionPath } from '../lib/routes.ts';
import { Seo } from '../components/Seo.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Reveal } from '../components/ui/Reveal.tsx';

export function NotFound() {
  const { lang, t } = useI18n();

  return (
    <section className="flex min-h-[75vh] items-center justify-center py-24 sm:py-32">
      <Seo route={{ kind: 'notFound' }} />

      <div className="container-page text-center">
        <Reveal className="mx-auto max-w-xl">
          <div className="glass mx-auto mb-8 inline-flex size-16 items-center justify-center rounded-2xl text-teal-soft">
            <Compass aria-hidden className="size-8" strokeWidth={1.75} />
          </div>

          <p className="eyebrow">{t.notFound.eyebrow}</p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t.notFound.title}
          </h1>

          <p className="mt-4 text-lg text-muted">
            {t.notFound.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to={homePath(lang)} icon={<ArrowLeft aria-hidden className="size-4" />}>
              {t.notFound.home}
            </Button>
            <Button to={sectionPath(lang, 'projects')} variant="secondary">
              {t.notFound.projects}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
