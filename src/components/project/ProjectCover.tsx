import { useI18n } from '../../i18n/context.ts';
import type { Project } from '../../data/projects.ts';
import { MediaImage } from '../ui/MediaImage.tsx';
import { getMedia } from '../../lib/media.ts';

interface ProjectCoverProps {
  project: Project;
  /** `sizes` hint for responsive images. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * The visual for a project. Real media is always shown as-is; when none exists the placeholder says so.
 * The 'window' and 'cards' kinds only arrange real captures inside a neutral decorative stage.
 */
export function ProjectCover({ project, sizes = '(min-width: 1024px) 60vw, 100vw', priority = false, className = '' }: ProjectCoverProps) {
  const { lang, t } = useI18n();
  const { cover } = project;
  const stage = `relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_srgb,var(--accent)_26%,transparent),transparent_62%),linear-gradient(180deg,#121a30,#0b1020)] ${className}`;

  if (cover.kind === 'image' && cover.media?.[0]) {
    const alt = project.gallery.find((g) => g.media === cover.media?.[0])?.alt[lang] ?? project.title;
    return (
      <div className={`relative isolate overflow-hidden bg-surface ${className}`}>
        <MediaImage
          id={cover.media[0]}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
      </div>
    );
  }

  if (cover.kind === 'window' && cover.media?.[0]) {
    const asset = getMedia(cover.media[0]);
    const alt = project.gallery.find((g) => g.media === cover.media?.[0])?.alt[lang] ?? project.title;
    return (
      <div className={`${stage} grid place-items-center p-6 sm:p-10`}>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(closest-side,#000,transparent)]" />
        <div className="relative w-[min(100%,26rem)] overflow-hidden rounded-xl border border-white/12 bg-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
          <div aria-hidden className="flex items-center gap-1.5 border-b border-white/8 bg-white/4 px-3.5 py-2.5">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>
          <img src={asset.src} width={asset.width} height={asset.height} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" className="block w-full" />
        </div>
      </div>
    );
  }

  if (cover.kind === 'cards' && cover.media?.length) {
    const rotations = ['-rotate-[9deg] -translate-x-[58%]', 'z-10 scale-105', 'rotate-[9deg] translate-x-[58%]'];
    return (
      <div className={`${stage} grid place-items-center`}>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40%_60%_at_50%_100%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent)]" />
        <ul className="relative flex h-[78%] w-full max-w-[26rem] items-center justify-center">
          {cover.media.slice(0, 3).map((id, i) => {
            const asset = getMedia(id);
            const alt = project.gallery.find((g) => g.media === id)?.alt[lang] ?? project.title;
            return (
              <li
                key={id}
                className={`absolute h-full aspect-[505/700] overflow-hidden rounded-[0.9rem] border border-white/15 shadow-[0_24px_60px_-18px_rgb(0_0_0/0.85)] transition-transform duration-[800ms] ease-[var(--ease-out-expo)] ${rotations[i] ?? ''} ${
                  i === 0 ? 'group-hover:-translate-x-[66%] group-hover:-rotate-[12deg]' : i === 2 ? 'group-hover:translate-x-[66%] group-hover:rotate-[12deg]' : 'group-hover:-translate-y-2'
                }`}
              >
                <img src={asset.src} width={asset.width} height={asset.height} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" className="size-full object-cover" />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // placeholder — honest, never styled like a product screenshot
  return (
    <div className={`${stage} grid place-items-center`}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(closest-side,#000,transparent)]" />
      <div className="relative px-6 text-center">
        <p aria-hidden className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--accent)_70%,white)]">
          {project.title}
        </p>
        <p className="mt-3 inline-flex rounded-full border border-dashed border-white/25 px-3 py-1 text-xs tracking-wide text-muted">{t.projects.placeholderCover}</p>
      </div>
    </div>
  );
}
