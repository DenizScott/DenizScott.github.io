import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../data/projects.ts';
import { useI18n } from '../../i18n/context.ts';
import { format } from '../../locales/index.ts';
import { projectPath } from '../../lib/routes.ts';
import { Chip } from '../ui/Chip.tsx';
import { Reveal } from '../ui/Reveal.tsx';
import { GithubIcon } from '../ui/Icons.tsx';
import { ProjectCover } from './ProjectCover.tsx';
import { StatusBadge } from './StatusBadge.tsx';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Lead cards are full-width with the cover beside the text; the cover alternates sides. */
  mirrored?: boolean;
}

function Body({ project, index, lead }: { project: Project; index: number; lead: boolean }) {
  const { lang, t } = useI18n();
  const techs = project.technologies.length > 0 ? project.technologies : (project.approach ?? []);
  const label = project.technologies.length > 0 ? t.projects.technologies : t.projects.approach;

  return (
    <div className={`relative flex flex-col ${lead ? 'p-6 sm:p-9 lg:p-12' : 'p-6 sm:p-8'}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="font-display text-sm tracking-widest text-subtle">
          <span aria-hidden>{String(index + 1).padStart(2, '0')}</span>
          <span className="sr-only">{format(t.projects.number, { n: index + 1 })}</span>
        </p>
        <StatusBadge status={project.status} />
      </div>

      <p className="eyebrow mt-6 !text-[0.75rem] !text-[var(--accent-soft)]">{project.category[lang]}</p>
      <h3 className={`mt-3 font-semibold tracking-tight ${lead ? 'text-[clamp(2.25rem,5vw,3.75rem)]' : 'text-[clamp(2rem,4vw,2.75rem)]'}`}>
        <Link
          to={projectPath(lang, project.slug)}
          className="outline-offset-8 after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:after:rounded-[inherit]"
        >
          {project.title}
          <span className="sr-only"> — {t.projects.viewCaseStudy}</span>
        </Link>
      </h3>
      <p className={`mt-4 text-muted ${lead ? 'text-[1.0625rem] leading-relaxed' : 'text-base leading-relaxed'}`}>{project.summary[lang]}</p>

      <div className="mt-6">
        {techs.length > 0 ? (
          <>
            <p className="sr-only">{label}</p>
            <ul className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <li key={tech}>
                  <Chip>{tech}</Chip>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Chip className="border-dashed">{t.projects.techPending}</Chip>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 pt-1">
        <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg">
          {t.projects.viewProject}
          <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-ink">
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
          </span>
        </span>
        {(project.links.github || project.links.live) && (
          <span className="relative z-20 flex items-center gap-1">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — ${t.projects.links.github} ${t.a11y.opensInNewTab}`} className="grid size-11 place-items-center rounded-full text-muted hover:text-fg">
                <GithubIcon aria-hidden className="size-5" />
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — ${t.projects.links.live} ${t.a11y.opensInNewTab}`} className="grid size-11 place-items-center rounded-full text-muted hover:text-fg">
                <ExternalLink aria-hidden className="size-5" />
              </a>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, mirrored = false }: ProjectCardProps) {
  const lead = project.emphasis === 'lead';

  return (
    <Reveal as="article" className="h-full">
      <div
        data-accent={project.accent}
        className={`glass group relative h-full overflow-hidden rounded-[1.75rem] transition-[border-color,box-shadow] duration-500 hover:border-[color-mix(in_srgb,var(--accent)_55%,transparent)] hover:shadow-[0_30px_90px_-40px_var(--accent)] ${
          lead ? 'grid lg:grid-cols-12' : 'flex flex-col'
        }`}
      >
        <div className={lead ? `lg:col-span-7 ${mirrored ? 'lg:order-2' : ''}` : ''}>
          <ProjectCover
            project={project}
            priority={false}
            sizes={lead ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 38vw, 100vw'}
            className={lead ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[28rem]' : 'aspect-[16/10]'}
          />
        </div>
        <div className={lead ? `lg:col-span-5 ${mirrored ? 'lg:order-1' : ''}` : 'flex-1'}>
          <Body project={project} index={index} lead={lead} />
        </div>
      </div>
    </Reveal>
  );
}
