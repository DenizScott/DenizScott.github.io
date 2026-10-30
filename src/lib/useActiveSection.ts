import { useEffect, useState } from 'react';

/** Maps every page section to the nav item that should be highlighted while it is in view. */
export const sectionToNav: Record<string, string> = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  expertise: 'expertise',
  workflows: 'expertise',
  experience: 'expertise',
  resume: 'contact',
  contact: 'contact',
};

/** Tracks which section is under the middle of the viewport. Only active while `enabled`. */
export function useActiveSection(enabled: boolean): string {
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (!enabled) return;
    const elements = Object.keys(sectionToNav)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(sectionToNav[entry.target.id] ?? 'home');
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}
