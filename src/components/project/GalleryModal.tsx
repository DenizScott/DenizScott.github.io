import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useI18n } from '../../i18n/context.ts';
import type { GalleryItem } from '../../data/projects.ts';
import { getMedia } from '../../lib/media.ts';

interface GalleryModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryModal({ items, currentIndex, onClose, onNavigate }: GalleryModalProps) {
  const { lang, t } = useI18n();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const current = isOpen ? items[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex! - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex! + 1) % items.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    // Focus close button on mount
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !current) return null;

  const asset = getMedia(current.media);
  const caption = current.caption?.[lang];
  const alt = current.alt[lang];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption || alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-ink/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      <div className="flex w-full max-w-6xl items-center justify-between pb-4">
        <div className="text-sm font-medium text-muted">
          <span className="text-fg font-semibold">{currentIndex + 1}</span> / {items.length}
          {caption && <span className="ml-3 border-l border-line-strong pl-3 text-fg">{caption}</span>}
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label={t.a11y.galleryClose}
          className="glass inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-fg focus-visible:outline-teal-soft"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      {/* Main image container */}
      <div className="relative flex flex-1 w-full max-w-6xl items-center justify-center overflow-hidden py-2">
        <img
          src={asset.src}
          srcSet={asset.srcSet}
          sizes="(max-width: 1200px) 100vw, 1200px"
          width={asset.width}
          height={asset.height}
          alt={alt}
          className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
        />

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
              aria-label={t.a11y.galleryPrev}
              className="glass absolute left-2 sm:left-4 inline-flex size-12 items-center justify-center rounded-full text-fg transition-all hover:scale-105 hover:bg-white/15 focus-visible:outline-teal-soft"
            >
              <ChevronLeft aria-hidden className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate((currentIndex + 1) % items.length)}
              aria-label={t.a11y.galleryNext}
              className="glass absolute right-2 sm:right-4 inline-flex size-12 items-center justify-center rounded-full text-fg transition-all hover:scale-105 hover:bg-white/15 focus-visible:outline-teal-soft"
            >
              <ChevronRight aria-hidden className="size-6" />
            </button>
          </>
        )}
      </div>

      {/* Caption footer */}
      <div className="w-full max-w-3xl pt-3 text-center">
        <p className="text-xs sm:text-sm text-muted">{alt}</p>
      </div>
    </div>
  );
}
