import { GraduationCap } from 'lucide-react';
import { education, experience } from '../data/experience.ts';
import { useI18n } from '../i18n/context.ts';
import { Reveal } from '../components/ui/Reveal.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';

export function Experience() {
  const { lang, t } = useI18n();

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <SectionHeading id="experience-title" eyebrow={t.experience.eyebrow} title={t.experience.title} />
          <h3 className="sr-only">{t.experience.experienceTitle}</h3>
          <ol className="relative mt-10 space-y-8 border-l border-line-strong pl-7">
            {experience.map((entry, i) => (
              <Reveal as="li" key={entry.id} delay={0.05 * i} className="relative">
                <span aria-hidden className="absolute top-2 -left-[calc(1.75rem+4.5px)] size-2 rounded-full bg-teal ring-4 ring-ink" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-xl font-semibold tracking-tight">{entry.title[lang]}</h4>
                  {entry.period && <p className="font-display text-sm text-teal-soft">{entry.period}</p>}
                </div>
                {entry.place && <p className="mt-0.5 text-sm text-subtle">{entry.place[lang]}</p>}
                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{entry.description[lang]}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="lg:pt-24">
          <div className="glass rounded-3xl p-7 sm:p-8">
            <GraduationCap aria-hidden className="size-6 text-teal-soft" strokeWidth={1.6} />
            <h3 className="mt-6 text-sm font-medium tracking-[0.14em] text-subtle uppercase">{t.experience.educationTitle}</h3>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight">{education.institution[lang]}</p>
            <p className="mt-1 text-lg text-fg">{education.program[lang]}</p>
            <p className="mt-4 inline-flex rounded-full border border-line bg-white/4 px-3 py-1 text-sm text-muted">{education.status[lang]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
