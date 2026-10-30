import { useEffect } from 'react';

/**
 * Fixed ambient layer: grid, soft colour fields and a very faint spotlight that follows a fine pointer.
 * The spotlight is skipped for touch devices and for reduced-motion users.
 */
export function Ambient() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      root.style.setProperty('--spot-x', `${x}px`);
      root.style.setProperty('--spot-y', `${y}px`);
      root.style.setProperty('--spot-o', '1');
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => root.style.setProperty('--spot-o', '0');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty('--spot-o');
    };
  }, []);

  return <div aria-hidden className="ambient" />;
}
