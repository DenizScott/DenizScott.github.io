import type { Lang } from './types.ts';

/**
 * Central, editable site configuration.
 * Anything marked PLACEHOLDER is intentionally unknown and must be filled in by the owner.
 */
export const site = {
  name: 'Coşkun Deniz Karcı',
  shortName: 'Coşkun Deniz Karcı',

  /**
   * PLACEHOLDER — the real production domain is not known yet.
   * Override at build time with the VITE_SITE_URL environment variable (see .env.example)
   * or replace the value here. No trailing slash.
   */
  siteUrl: 'https://example.com',

  /** Public contact details taken from the reference CV. Home address and phone are intentionally NOT published. */
  email: 'coskundenizkarci@gmail.com',
  linkedin: 'https://www.linkedin.com/in/coskundenizkarci/',
  /** No GitHub account is listed in the CV. Set a URL here to show it in the contact section and footer. */
  github: null as string | null,

  themeColor: '#0B1020',

  /**
   * Public resume PDFs, per language. `null` = no public-safe PDF exists yet.
   * The reference CVs contain a home address and phone number, so they are NOT published.
   * To publish: export a copy without those details, place it in /public/resume/
   * and set the path here, e.g. '/resume/Deniz-Karci-CV-EN.pdf'.
   */
  resumes: { en: null, tr: null } as Record<Lang, string | null>,
} as const;

export const sectionIds = ['home', 'about', 'projects', 'expertise', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];
