import { ArrowUpRight, FileText, Mail, type LucideIcon } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { site } from '../data/site.ts';
import { useI18n } from '../i18n/context.ts';
import { sectionPath } from '../lib/routes.ts';
import { Button } from '../components/ui/Button.tsx';
import { Reveal } from '../components/ui/Reveal.tsx';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons.tsx';

type IconType = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: IconType;
  external: boolean;
}

export function Contact() {
  const { lang, t } = useI18n();
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(t.contact.mailBody)}`;

  const links: ContactLink[] = [
    { label: t.contact.emailLabel, value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
    { label: t.contact.linkedinLabel, value: 'linkedin.com/in/coskundenizkarci', href: site.linkedin, icon: LinkedinIcon, external: true },
    ...(site.github ? [{ label: t.contact.githubLabel, value: site.github.replace(/^https?:\/\//, ''), href: site.github, icon: GithubIcon, external: true }] : []),
    { label: t.contact.resumeLabel, value: t.nav.resume, href: sectionPath(lang, 'resume'), icon: FileText, external: false },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-[linear-gradient(135deg,rgb(102_126_255/0.16),rgb(21_29_50/0.7)_45%,rgb(33_199_199/0.12))] p-7 sm:p-12 lg:p-16">
            <div aria-hidden className="glow-drift absolute -top-1/3 -right-1/4 size-[32rem] rounded-full bg-blue/20 blur-3xl" />
            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
              <div>
                <p className="eyebrow">{t.contact.eyebrow}</p>
                <h2 id="contact-title" className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                  {t.contact.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg text-muted">{t.contact.body}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={mailto} icon={<Mail aria-hidden className="size-4" />}>
                    {t.contact.cta}
                  </Button>
                </div>
                <p className="mt-6 text-sm text-subtle">{t.contact.location}</p>
              </div>

              <ul className="divide-y divide-line rounded-2xl border border-line bg-ink/40 backdrop-blur-sm">
                {links.map(({ label, value, href, icon: Icon, external }) => (
                  <li key={label}>
                    {external || href.startsWith('mailto:') ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex min-h-16 items-center gap-4 px-5 py-3 transition-colors hover:bg-white/5"
                      >
                        <Row Icon={Icon} label={label} value={value} />
                        {external && <span className="sr-only">{t.a11y.opensInNewTab}</span>}
                      </a>
                    ) : (
                      <a href={href} className="group flex min-h-16 items-center gap-4 px-5 py-3 transition-colors hover:bg-white/5">
                        <Row Icon={Icon} label={label} value={value} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ Icon, label, value }: { Icon: IconType; label: string; value: string }) {
  return (
    <>
      <Icon aria-hidden className="size-5 shrink-0 text-teal-soft" strokeWidth={1.75} />
      <span className="min-w-0 flex-1">
        <span className="block text-xs tracking-wide text-subtle uppercase">{label}</span>
        <span className="block truncate text-[0.9375rem] text-fg">{value}</span>
      </span>
      <ArrowUpRight aria-hidden className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
}
