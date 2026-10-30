import { Clapperboard, Code2, GraduationCap, Layers, Gamepad2, Palette, Plug, Sparkles, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/context.ts';
import { Reveal } from '../components/ui/Reveal.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';

/** Same order as `about.pillars` in the locale files. */
const pillarIcons: LucideIcon[] = [GraduationCap, Palette, Gamepad2, Code2, Plug, Clapperboard, Layers, Sparkles];

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} />
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {t.about.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? Sparkles;
            return (
              <Reveal as="li" key={pillar.title} delay={0.04 * (i % 4)}>
                <div className="glass group h-full rounded-2xl p-5 transition-colors duration-300 hover:border-line-strong hover:bg-white/6">
                  <Icon aria-hidden className="size-5 text-teal-soft" strokeWidth={1.75} />
                  <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug tracking-tight">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
