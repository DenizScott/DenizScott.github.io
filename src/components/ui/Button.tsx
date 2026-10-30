import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/context.ts';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  /** Internal route (client-side navigation). */
  to?: string;
  /** External URL, mailto: or file. http(s) links open in a new tab. */
  href?: string;
  download?: boolean;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const base =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] font-medium leading-none transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-fg text-ink hover:bg-white hover:shadow-[0_0_0_6px_rgb(102_126_255/0.18)]',
  secondary: 'glass text-fg hover:border-line-strong hover:bg-white/8',
  ghost: 'text-muted hover:text-fg',
};

export function Button({ children, to, href, download, variant = 'primary', icon, className = '', onClick, type = 'button' }: ButtonProps) {
  const { t } = useI18n();
  const cls = `${base} ${variants[variant]} ${className}`;
  const trailing = icon ?? <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />;

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
        {trailing}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: true } : {})}
        onClick={onClick}
      >
        {children}
        {trailing}
        {external && <span className="sr-only"> {t.a11y.opensInNewTab}</span>}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
      {trailing}
    </button>
  );
}
