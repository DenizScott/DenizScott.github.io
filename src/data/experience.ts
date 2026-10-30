import type { L } from './types.ts';

export interface ExperienceEntry {
  id: string;
  title: L<string>;
  /** Only dates stated in the reference CV. `null` = no confirmed date, shown as nothing. */
  period: string | null;
  place?: L<string>;
  description: L<string>;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'ai-dev',
    title: { en: 'Independent AI Application Developer', tr: 'Bağımsız Yapay Zekâ Uygulama Geliştiricisi' },
    period: null,
    description: {
      en: 'I build web and desktop applications, game prototypes and visual or video content with AI-assisted methods. Claude MCP connections bring tools and services together for ideation, coding, content editing, automation, testing and iteration.',
      tr: 'Yapay zekâ destekli yöntemlerle web ve masaüstü uygulamaları, oyun prototipleri ile görsel ve video içerikler üretiyorum. Claude MCP bağlantıları, fikir geliştirme, kodlama, içerik kurgusu, otomasyon, test ve iyileştirme için araç ve servisleri bir araya getiriyor.',
    },
  },
  {
    id: 'visual-design',
    title: { en: 'Freelance Visual Designer', tr: 'Freelance Görsel Tasarımcı' },
    period: '2020 – 2022',
    place: { en: 'Bionluk & Fiverr', tr: 'Bionluk ve Fiverr' },
    description: {
      en: 'Logos, social media posts, Instagram highlight covers and other 2D visual assets for clients.',
      tr: 'Müşteriler için logolar, sosyal medya gönderileri, Instagram öne çıkanlar kapakları ve diğer 2D görsel içerikler.',
    },
  },
  {
    id: 'hardware',
    title: { en: 'PC Hardware & System Optimization', tr: 'PC Donanım ve Sistem Optimizasyonu' },
    period: null,
    place: { en: 'Independent', tr: 'Bireysel' },
    description: {
      en: 'Hands-on experience building PCs from scratch, detailed hardware cleaning, diagnosing hardware issues, formatting drives and setting up fully working operating systems.',
      tr: 'Sıfırdan bilgisayar toplama, detaylı donanım temizliği, donanımsal arıza tespiti, format atma ve işletim sistemlerini tamamen kullanıma hazır hale getirme konularında uygulamalı deneyim.',
    },
  },
];

export const education = {
  institution: { en: 'Doğuş University', tr: 'Doğuş Üniversitesi' } satisfies L<string>,
  program: { en: 'Digital Game Design', tr: 'Dijital Oyun Tasarımı' } satisfies L<string>,
  status: { en: 'Currently a student', tr: 'Öğrenci' } satisfies L<string>,
};
