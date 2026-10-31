import type { Lang } from './types.ts';

/**
 * Central, editable site configuration.
 * Anything marked PLACEHOLDER is intentionally unknown and must be filled in by the owner.
 */
export const site = {
  name: 'Coşkun Deniz Karcı',
  shortName: 'Coşkun Deniz Karcı',

  /**
   * Production domain used for canonical, og:url, og:image, hreflang, sitemap, and JSON-LD.
   * Can also be overridden at build time with VITE_SITE_URL. No trailing slash.
   */
  siteUrl: 'https://denizscott.github.io',

  /** Public contact details taken from the reference CV. Home address and phone are intentionally NOT published. */
  email: 'coskundenizkarci@gmail.com',
  linkedin: 'https://www.linkedin.com/in/coskundenizkarci/',
  /** GitHub account shown in the contact section, header, and footer. */
  github: 'https://github.com/DenizScott' as string | null,

  themeColor: '#0B1020',

  /**
   * Public resume PDFs, per language.
   * Linked directly to the owner's CV documents.
   */
  resumes: {
    en: '/cv/Coskun_Deniz_Karci_CV_EN.pdf',
    tr: '/cv/Coskun_Deniz_Karci_CV_TR.pdf',
  } as Record<Lang, string | null>,
} as const;

export const sectionIds = ['home', 'about', 'projects', 'expertise', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];
