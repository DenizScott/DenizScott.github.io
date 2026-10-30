import type { ReactNode } from 'react';
import { Reveal } from './Reveal.tsx';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  id?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, intro, id, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}
