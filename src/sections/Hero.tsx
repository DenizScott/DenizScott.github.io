import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { FileText } from 'lucide-react';
import { useRef } from 'react';
import { useI18n } from '../i18n/context.ts';
import { portrait } from '../lib/media.ts';
import { sectionPath } from '../lib/routes.ts';
import { Button } from '../components/ui/Button.tsx';
import { Chip } from '../components/ui/Chip.tsx';

const ease = [0.16, 1, 0.3, 1] as const;

function Headline({ text, accent }: { text: string; accent: string }) {
  const index = text.indexOf(accent);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-gradient">{accent}</span>
      {text.slice(index + accent.length)}
    </>
  );
}

export function Hero() {
  const { lang, t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 70]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -30]);

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-14 lg:pt-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8">
        <motion.div style={{ y: copyY }} className="relative z-10 flex flex-col items-start">
          <motion.p {...item(0.05)} className="eyebrow max-w-[22rem] leading-relaxed sm:max-w-none">
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-title"
            {...item(0.15)}
            className="mt-5 text-[clamp(2.5rem,7.4vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            <Headline text={t.hero.headline} accent={t.hero.headlineAccent} />
          </motion.h1>
          <motion.p {...item(0.3)} className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
            {t.hero.sub}
          </motion.p>
          <motion.div {...item(0.45)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button to={sectionPath(lang, 'projects')}>{t.hero.ctaWork}</Button>
            <Button to={sectionPath(lang, 'contact')} variant="secondary">
              {t.hero.ctaContact}
            </Button>
            <Button to={sectionPath(lang, 'resume')} variant="ghost" icon={<FileText aria-hidden className="size-4" />}>
              {t.hero.resumeLink}
            </Button>
          </motion.div>
        </motion.div>

        {/* Portrait: compact on mobile (above the headline), large orbital frame on desktop */}
        <motion.div style={{ y: photoY }} className="relative order-first justify-self-start lg:order-last lg:justify-self-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="relative aspect-square w-32 xs:w-36 sm:w-44 lg:w-[min(26rem,38vw)]"
          >
            <div aria-hidden className="glow-drift absolute -inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(102_126_255/0.38),rgb(33_199_199/0.14)_55%,transparent_75%)] blur-2xl" />
            <div aria-hidden className="orbit-ring absolute -inset-[7%] rounded-full border border-dashed border-white/20" />
            <div
              aria-hidden
              className="absolute -inset-[3%] rounded-full bg-[conic-gradient(from_210deg,#667eff,#21c7c7,transparent_55%,#667eff)] opacity-90 [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]"
            />
            <div className="absolute inset-[2%] overflow-hidden rounded-full bg-surface ring-1 ring-white/10">
              <img
                src={portrait.src}
                width={portrait.width}
                height={portrait.height}
                alt={t.hero.photoAlt}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
            </div>

            <div className="glass absolute top-[8%] -right-[14%] hidden rounded-2xl px-3.5 py-2 text-[0.8125rem] font-medium text-fg shadow-[0_12px_40px_-12px_rgb(0_0_0/0.6)] lg:block">
              <span className="text-teal-soft">●</span> {t.hero.tags[1]}
            </div>
            <div className="glass absolute bottom-[10%] -left-[16%] hidden rounded-2xl px-3.5 py-2 text-[0.8125rem] font-medium text-fg shadow-[0_12px_40px_-12px_rgb(0_0_0/0.6)] lg:block">
              <span className="text-blue-soft">●</span> {t.hero.tags[3]}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.ul {...item(0.6)} aria-label={t.hero.tags.join(', ')} className="container-page mt-10 flex flex-wrap gap-2 lg:mt-14">
        {t.hero.tags.map((tag) => (
          <li key={tag}>
            <Chip>{tag}</Chip>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}