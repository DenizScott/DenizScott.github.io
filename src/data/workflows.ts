import type { L } from './types.ts';

export type WorkflowIcon = 'code' | 'gamepad' | 'film' | 'plug';

export interface Workflow {
  id: string;
  icon: WorkflowIcon;
  title: L<string>;
  body: L<string>;
}

/** "AI as a Creative & Development Partner" — a description of working methods, not a product showcase. */
export const workflows: Workflow[] = [
  {
    id: 'software',
    icon: 'code',
    title: { en: 'AI-Assisted Software Development', tr: 'Yapay Zekâ Destekli Yazılım Geliştirme' },
    body: {
      en: 'Software prototyping, code development, testing, debugging and iteration with LLMs. Omni, a desktop application, is built this way.',
      tr: 'LLM\'lerle yazılım prototipleme, kod geliştirme, test, hata ayıklama ve yineleme. Bir masaüstü uygulaması olan Omni bu yöntemle geliştirildi.',
    },
  },
  {
    id: 'game',
    icon: 'gamepad',
    title: { en: 'AI-Powered Game Creation', tr: 'Yapay Zekâ Destekli Oyun Üretimi' },
    body: {
      en: 'Using AI in game ideas, prototyping, mechanic design and development. Underwake, an Unreal Engine prototype, follows this process.',
      tr: 'Oyun fikirleri, prototipleme, mekanik tasarımı ve geliştirme süreçlerinde yapay zekâ kullanımı. Unreal Engine prototipi Underwake bu süreci izler.',
    },
  },
  {
    id: 'media',
    icon: 'film',
    title: { en: 'Creative Media Production', tr: 'Yaratıcı Medya Üretimi' },
    body: {
      en: 'AI-assisted image, video and digital content production, combined with editing in Adobe Premiere Pro and Audition and with visual design in Photoshop.',
      tr: 'Yapay zekâ destekli görsel, video ve dijital içerik üretimi; Adobe Premiere Pro ve Audition ile kurgu, Photoshop ile görsel tasarımla birleştirilir.',
    },
  },
  {
    id: 'mcp',
    icon: 'plug',
    title: { en: 'MCP & Tool Integration', tr: 'MCP ve Araç Entegrasyonu' },
    body: {
      en: 'Connecting LLM systems such as Claude to external tools and development processes through MCP, so ideation, coding, content editing, automation and testing happen in one loop.',
      tr: 'Claude gibi LLM sistemlerini MCP üzerinden harici araçlara ve geliştirme süreçlerine bağlamak; böylece fikir geliştirme, kodlama, içerik kurgusu, otomasyon ve test tek bir döngüde ilerler.',
    },
  },
];
