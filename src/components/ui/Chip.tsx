import type { ReactNode } from 'react';

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-white/4 px-3 py-1 text-[0.8125rem] font-medium text-muted ${className}`}>
      {children}
    </span>
  );
}
