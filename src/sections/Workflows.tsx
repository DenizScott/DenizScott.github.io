import { Clapperboard, Code2, Gamepad2, Plug, type LucideIcon } from 'lucide-react';
import { workflows, type WorkflowIcon } from '../data/workflows.ts';
import { useI18n } from '../i18n/context.ts';
import { Reveal } from '../components/ui/Reveal.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';

const icons: Record<WorkflowIcon, LucideIcon> = { code: Code2, gamepad: Gamepad2, film: Clapperboard, plug: Plug };

export function Workflows() {
  const { lang, t } = useI18n();

  return (
    <section id="workflows" aria-labelledby="workflows-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 inset-y-8 -z-10 bg-[radial-gradient(60%_70%_at_50%_50%,rgb(102_126_255/0.09),transparent)]" />
      <div className="container-page">
        <SectionHeading id="workflows-title" eyebrow={t.workflows.eyebrow} title={t.workflows.title} intro={t.workflows.intro} />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {workflows.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.id} delay={0.05 * i} className="bg-ink-2">
                <div className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <Icon aria-hidden className="size-6 text-teal-soft" strokeWidth={1.6} />
                    <span aria-hidden className="font-display text-sm text-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold leading-snug tracking-tight">{item.title[lang]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body[lang]}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
