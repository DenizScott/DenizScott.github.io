import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Film, AlertCircle } from 'lucide-react';
import { getProjectBySlug, getProjectsOrdered } from '../data/projects.ts';
import { useI18n } from '../i18n/context.ts';
import { projectPath, sectionPath } from '../lib/routes.ts';
import { Seo } from '../components/Seo.tsx';
import { StatusBadge } from '../components/project/StatusBadge.tsx';
import { ProjectCover } from '../components/project/ProjectCover.tsx';
import { GalleryModal } from '../components/project/GalleryModal.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Chip } from '../components/ui/Chip.tsx';
import { Reveal } from '../components/ui/Reveal.tsx';
import { GithubIcon } from '../components/ui/Icons.tsx';
import { getMedia } from '../lib/media.ts';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useI18n();
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to={`/${lang}/404`} replace />;
  }

  const allProjects = getProjectsOrdered();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = (currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1])!;
  const nextProject = (currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0])!;

  const detail = project.detail[lang];
  const techs = project.technologies.length > 0 ? project.technologies : (project.approach ?? []);

  return (
    <article data-accent={project.accent} className="pb-28 pt-24 sm:pt-32">
      <Seo route={{ kind: 'project', slug: project.slug }} />

      <div className="container-page">
        {/* Back navigation */}
        <Reveal>
          <Link
            to={sectionPath(lang, 'projects')}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden className="size-4" />
            <span>{t.project.back}</span>
          </Link>
        </Reveal>

        {/* 1. Project Hero */}
        <header className="mt-8 border-b border-line pb-12 sm:pb-16">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="eyebrow !text-[var(--accent-soft)]">{project.category[lang]}</span>
              <StatusBadge status={project.status} />
            </div>

            <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.25rem)] font-bold tracking-tight">
              {project.title}
            </h1>

            <p className="mt-4 max-w-3xl text-xl font-medium text-muted sm:text-2xl">
              {detail.tagline}
            </p>
          </Reveal>

          {/* Tech and external links bar */}
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              {techs.length > 0 ? (
                techs.map((tech) => (
                  <Chip key={tech} className="border-line-strong text-fg bg-surface">
                    {tech}
                  </Chip>
                ))
              ) : (
                <Chip className="border-dashed text-subtle">{t.project.techPending}</Chip>
              )}
            </div>

            {(project.links.github || project.links.live) && (
              <div className="flex items-center gap-3">
                {project.links.github && (
                  <Button
                    href={project.links.github}
                    variant="secondary"
                    icon={<GithubIcon aria-hidden className="size-4" />}
                  >
                    {t.projects.links.github}
                  </Button>
                )}
                {project.links.live && (
                  <Button
                    href={project.links.live}
                    variant="primary"
                    icon={<ExternalLink aria-hidden className="size-4" />}
                  >
                    {t.projects.links.live}
                  </Button>
                )}
              </div>
            )}
          </Reveal>

          {/* Hero Cover Image/Visual */}
          <Reveal delay={0.15} className="mt-12 overflow-hidden rounded-[2rem] border border-line-strong shadow-2xl">
            <ProjectCover
              project={project}
              priority={true}
              className="aspect-[16/9] w-full min-h-[18rem] max-h-[38rem]"
            />
          </Reveal>
        </header>

        {/* Main Content Sections Grid */}
        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-16">
          {/* Main Column */}
          <div className="space-y-16 lg:col-span-8">
            {/* 2. Overview */}
            <section aria-labelledby="section-overview">
              <Reveal>
                <h2 id="section-overview" className="eyebrow !text-[var(--accent-soft)]">
                  {t.project.overview}
                </h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
                  {detail.overview.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* 3. The Idea / Challenge (if exists) */}
            {detail.idea && detail.idea.length > 0 && (
              <section aria-labelledby="section-idea">
                <Reveal>
                  <h2 id="section-idea" className="eyebrow !text-[var(--accent-soft)]">
                    {t.project.idea}
                  </h2>
                  <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
                    {detail.idea.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </Reveal>
              </section>
            )}

            {/* 6. Development Process (if exists) */}
            {detail.process && detail.process.length > 0 && (
              <section aria-labelledby="section-process">
                <Reveal>
                  <h2 id="section-process" className="eyebrow !text-[var(--accent-soft)]">
                    {t.project.process}
                  </h2>
                  <div className="mt-6 space-y-6">
                    {detail.process.map((step, i) => (
                      <div key={i} className="glass rounded-2xl p-6 sm:p-7">
                        <h3 className="text-xl font-semibold text-fg">{step.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>
            )}

            {/* 7. Key Features (if exists) */}
            {detail.features && detail.features.length > 0 && (
              <section aria-labelledby="section-features">
                <Reveal>
                  <h2 id="section-features" className="eyebrow !text-[var(--accent-soft)]">
                    {t.project.features}
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {detail.features.map((feat, i) => (
                      <div key={i} className="glass rounded-2xl p-5 sm:p-6">
                        <h3 className="text-lg font-semibold text-fg">{feat.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{feat.body}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>
            )}

            {/* 8. Screenshots & Media Gallery */}
            <section aria-labelledby="section-media">
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h2 id="section-media" className="eyebrow !text-[var(--accent-soft)]">
                    {t.project.media}
                  </h2>
                  {detail.mediaNote && (
                    <span className="text-xs text-subtle italic">{detail.mediaNote}</span>
                  )}
                </div>

                {project.gallery.length > 0 ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((item, idx) => {
                      const asset = getMedia(item.media);
                      const isPortrait = asset.height > asset.width;
                      return (
                        <div
                          key={item.media}
                          className={`glass group relative cursor-pointer overflow-hidden rounded-2xl border border-line transition-all duration-300 hover:border-line-strong hover:bg-white/5 ${
                            isPortrait ? 'sm:col-span-1 aspect-[505/700]' : 'aspect-[16/9]'
                          }`}
                          onClick={() => setModalIndex(idx)}
                          role="button"
                          tabIndex={0}
                          aria-label={item.caption?.[lang] || item.alt[lang]}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setModalIndex(idx);
                            }
                          }}
                        >
                          <img
                            src={asset.src}
                            srcSet={asset.srcSet}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            width={asset.width}
                            height={asset.height}
                            alt={item.alt[lang]}
                            loading="lazy"
                            decoding="async"
                            className={`size-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                              isPortrait ? 'object-top' : ''
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                            <span className="text-sm font-medium text-fg">
                              {item.caption?.[lang] || item.alt[lang]}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="glass mt-6 rounded-2xl border-dashed p-8 text-center sm:p-12">
                    <p className="font-semibold text-fg">{t.project.mediaPending}</p>
                    <p className="mt-2 text-sm text-muted">{t.project.mediaPendingBody}</p>
                  </div>
                )}
              </Reveal>
            </section>

            {/* Video Slot (reserved for gameplay video if null, or played if present) */}
            <section aria-labelledby="section-video">
              <Reveal>
                <div className="glass rounded-2xl border border-line-strong p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <Film aria-hidden className="size-5 text-teal-soft" />
                    <h3 id="section-video" className="text-lg font-semibold text-fg">
                      {project.id === 'underwake' ? t.project.videoSlotTitle : t.project.videoSlotTitleGeneric}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    {project.video ? 'Gameplay video preview' : t.project.videoSlotBody}
                  </p>
                </div>
              </Reveal>
            </section>

            {/* 9. Outcome & Current Status */}
            {detail.outcome && detail.outcome.length > 0 && (
              <section aria-labelledby="section-outcome">
                <Reveal>
                  <h2 id="section-outcome" className="eyebrow !text-[var(--accent-soft)]">
                    {t.project.outcome}
                  </h2>
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
                    {detail.outcome.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </Reveal>
              </section>
            )}

            {/* Honest Disclaimer: What is not claimed / planned */}
            {detail.notClaimed && detail.notClaimed.length > 0 && (
              <section aria-labelledby="section-disclaimer">
                <Reveal>
                  <div className="rounded-2xl border border-line bg-surface/50 p-6 sm:p-7">
                    <div className="flex items-center gap-2.5 text-amber-300">
                      <AlertCircle aria-hidden className="size-5 shrink-0" />
                      <h3 id="section-disclaimer" className="text-sm font-semibold uppercase tracking-wider">
                        {t.project.notClaimed}
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {detail.notClaimed.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-subtle font-mono">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </section>
            )}
          </div>

          {/* Sidebar Column: My Role & Quick Info */}
          <aside className="space-y-8 lg:col-span-4">
            {/* 4. My Role */}
            {detail.role && detail.role.length > 0 && (
              <Reveal>
                <div className="glass rounded-3xl p-6 sm:p-8">
                  <h2 className="eyebrow !text-[var(--accent-soft)]">{t.project.role}</h2>
                  <ul className="mt-4 space-y-3">
                    {detail.role.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-soft" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* Quick Metadata Box */}
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-subtle">
                    {t.project.categoryLabel}
                  </span>
                  <p className="mt-1 text-sm font-medium text-fg">{project.category[lang]}</p>
                </div>

                <div className="border-t border-line pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-subtle">
                    {t.project.statusLabel}
                  </span>
                  <div className="mt-2">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                <div className="border-t border-line pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-subtle">
                    {t.projects.technologies}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.technologies.length > 0 ? (
                      project.technologies.map((tech) => (
                        <span key={tech} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted">
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-subtle italic">{t.project.techPending}</span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* 10. Next / Previous Project Navigation */}
        <nav aria-label="Project pagination" className="mt-24 border-t border-line pt-12 sm:pt-16">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                to={projectPath(lang, prevProject.slug)}
                className="glass group flex flex-col justify-between rounded-2xl p-6 transition-colors hover:border-line-strong hover:bg-white/6"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-subtle">
                  <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>{t.project.previous}</span>
                </div>
                <div className="mt-4">
                  <p className="text-xl font-semibold text-fg">{prevProject.title}</p>
                  <p className="mt-1 text-xs text-muted">{prevProject.category[lang]}</p>
                </div>
              </Link>

              <Link
                to={projectPath(lang, nextProject.slug)}
                className="glass group flex flex-col justify-between rounded-2xl p-6 text-right transition-colors hover:border-line-strong hover:bg-white/6"
              >
                <div className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-subtle">
                  <span>{t.project.next}</span>
                  <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-4">
                  <p className="text-xl font-semibold text-fg">{nextProject.title}</p>
                  <p className="mt-1 text-xs text-muted">{nextProject.category[lang]}</p>
                </div>
              </Link>
            </div>
          </Reveal>
        </nav>
      </div>

      {/* Lightbox Modal */}
      <GalleryModal
        items={project.gallery}
        currentIndex={modalIndex}
        onClose={() => setModalIndex(null)}
        onNavigate={(idx) => setModalIndex(idx)}
      />
    </article>
  );
}
