import { BrainCircuit, Code2, Gamepad2, Palette, type LucideIcon } from 'lucide-react';
import { expertise, type CategoryIcon } from '../data/expertise.ts';
import { useI18n } from '../i18n/context.ts';
import { Reveal } from '../components/ui/Reveal.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';

const icons: Record<CategoryIcon, LucideIcon> = { brain: BrainCircuit, code: Code2, gamepad: Gamepad2, palette: Palette };

export function Expertise() {
  const { lang, t } = useI18n();

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="expertise-title" eyebrow={t.expertise.eyebrow} title={t.expertise.title} intro={t.expertise.intro} />

        <ul className="mt-14 grid gap-4 lg:grid-cols-2">
          {expertise.map((category, i) => {
            const Icon = icons[category.icon];
            return (
              <Reveal as="li" key={category.id} delay={0.06 * (i % 2)}>
                <section aria-labelledby={`skills-${category.id}`} className="glass h-full rounded-3xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-white/4 text-teal-soft">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 id={`skills-${category.id}`} className="text-xl font-semibold tracking-tight">
                        {category.title[lang]}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{category.description[lang]}</p>
                    </div>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li key={skill.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/4 px-3.5 py-1.5 text-sm text-fg">
                        {skill.name}
                        {skill.level && <span className="border-l border-line-strong pl-2 text-xs text-muted">{skill.level[lang]}</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
