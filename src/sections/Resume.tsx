import { Download, FileText, Mail } from 'lucide-react';
import { site } from '../data/site.ts';
import { LANGS, type Lang } from '../data/types.ts';
import { useI18n } from '../i18n/context.ts';
import { Button } from '../components/ui/Button.tsx';
import { Reveal } from '../components/ui/Reveal.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';

export function Resume() {
  const { lang, t } = useI18n();
  // Resume matching the current language comes first.
  const ordered: Lang[] = [lang, ...LANGS.filter((l) => l !== lang)];
  const available = ordered.filter((l) => site.resumes[l]);
  const label = (l: Lang) => (l === 'en' ? t.resume.english : t.resume.turkish);

  const requestHref = `mailto:${site.email}?subject=${encodeURIComponent(t.resume.requestSubject)}&body=${encodeURIComponent(t.resume.requestBody)}`;

  return (
    <section id="resume" aria-labelledby="resume-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="resume-title" eyebrow={t.resume.eyebrow} title={t.resume.title} />

        <Reveal className="mt-10">
          {available.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {available.map((l) => {
                const file = site.resumes[l] as string;
                return (
                  <li key={l} className="glass flex flex-col gap-5 rounded-3xl p-6 sm:p-7">
                    <FileText aria-hidden className="size-6 text-teal-soft" strokeWidth={1.6} />
                    <p className="font-display text-xl font-semibold tracking-tight">{label(l)}</p>
                    <div className="mt-auto flex flex-wrap gap-3">
                      <Button href={file}>{t.resume.open}</Button>
                      <Button href={file} download variant="secondary" icon={<Download aria-hidden className="size-4" />}>
                        {t.resume.download}
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="glass flex flex-col gap-6 rounded-3xl border-dashed p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div className="max-w-2xl">
                <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{t.resume.pendingTitle}</p>
                <p className="mt-2 text-muted">{t.resume.pendingBody}</p>
              </div>
              <Button href={requestHref} icon={<Mail aria-hidden className="size-4" />} className="shrink-0">
                {t.resume.request}
              </Button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
