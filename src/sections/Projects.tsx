import { getProjectsOrdered } from '../data/projects.ts';
import { useI18n } from '../i18n/context.ts';
import { ProjectCard } from '../components/project/ProjectCard.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';

/** Featured projects. Order comes from `featuredOrder` in src/data/projects.ts — lead cards first, then a two-up grid. */
export function Projects() {
  const { t } = useI18n();
  const ordered = getProjectsOrdered();
  const leads = ordered.filter((p) => p.emphasis === 'lead');
  const rest = ordered.filter((p) => p.emphasis !== 'lead');

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="projects-title" eyebrow={t.projects.eyebrow} title={t.projects.title} intro={t.projects.intro} />

        <div className="mt-14 space-y-6 sm:space-y-8">
          {leads.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={ordered.indexOf(project)} mirrored={i % 2 === 1} />
          ))}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {rest.map((project) => (
                <ProjectCard key={project.id} project={project} index={ordered.indexOf(project)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
