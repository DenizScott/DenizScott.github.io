import { getMedia } from '../../lib/media.ts';

interface MediaImageProps {
  id: string;
  alt: string;
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  className?: string;
}

/** Registered image with intrinsic dimensions (no layout shift) and lazy loading by default. */
export function MediaImage({ id, alt, sizes = '100vw', priority = false, className = '' }: MediaImageProps) {
  const asset = getMedia(id);
  return (
    <img
      src={asset.src}
      srcSet={asset.srcSet}
      sizes={asset.srcSet ? sizes : undefined}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={className}
    />
  );
}
