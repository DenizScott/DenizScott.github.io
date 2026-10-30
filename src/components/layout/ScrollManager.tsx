import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the `#hash` target after navigation, or to the top for a new page.
 * Re-runs for every navigation (location.key), so clicking the same nav link twice still scrolls.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    // New page: jump instantly. Same page (section links): follow the CSS smooth-scroll setting.
    const behavior: ScrollBehavior = previousPath.current !== null && previousPath.current !== pathname ? 'instant' : 'auto';
    previousPath.current = pathname;
    const id = decodeURIComponent(hash.replace('#', ''));
    if (!id || id === 'home') {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    // The target may not be mounted yet right after a route change — retry for a few frames.
    let tries = 0;
    let frame = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start', behavior });
        return;
      }
      if (tries++ < 20) frame = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
