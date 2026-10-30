import type { L } from './types.ts';

export type CategoryIcon = 'brain' | 'code' | 'gamepad' | 'palette';

export interface Skill {
  name: string;
  /** Only set when the level is stated in the reference CV. Never invent levels. */
  level?: L<string>;
}

export interface SkillCategory {
  id: string;
  icon: CategoryIcon;
  title: L<string>;
  description: L<string>;
  skills: Skill[];
}

const basic: L<string> = { en: 'Basic', tr: 'Temel' };
const advanced: L<string> = { en: 'Advanced', tr: 'İleri' };
const intAdv: L<string> = { en: 'Intermediate / Advanced', tr: 'Orta / İleri' };

export const expertise: SkillCategory[] = [
  {
    id: 'ai',
    icon: 'brain',
    title: { en: 'Artificial Intelligence & Development', tr: 'Yapay Zekâ ve Geliştirme' },
    description: {
      en: 'Using LLMs and generative AI as working partners across research, planning, coding, debugging and testing.',
      tr: 'LLM\'leri ve üretken yapay zekâyı araştırma, planlama, kodlama, hata ayıklama ve testte çalışma ortağı olarak kullanmak.',
    },
    skills: [
      { name: 'Claude' },
      { name: 'ChatGPT' },
      { name: 'Gemini' },
      { name: 'Generative AI' },
      { name: 'Large Language Models' },
      { name: 'Prompt Engineering' },
      { name: 'Vibe Coding' },
      { name: 'AI-Assisted Development' },
      { name: 'MCP Tool Integration' },
      { name: 'AI Workflow Automation' },
      { name: 'Rapid Prototyping' },
    ],
  },
  {
    id: 'software',
    icon: 'code',
    title: { en: 'Software Development', tr: 'Yazılım Geliştirme' },
    description: {
      en: 'Desktop and web applications built with a modern TypeScript toolchain.',
      tr: 'Modern bir TypeScript araç zinciriyle geliştirilen masaüstü ve web uygulamaları.',
    },
    skills: [
      { name: 'Electron' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Visual Studio' },
      { name: 'C#', level: basic },
      { name: 'C++', level: basic },
    ],
  },
  {
    id: 'game',
    icon: 'gamepad',
    title: { en: 'Game Development', tr: 'Oyun Geliştirme' },
    description: {
      en: 'Game engines, interactive systems and fast gameplay prototyping, grounded in a game design education.',
      tr: 'Oyun tasarımı eğitimine dayanan oyun motorları, etkileşimli sistemler ve hızlı oynanış prototipleme.',
    },
    skills: [
      { name: 'Unreal Engine' },
      { name: 'Unity' },
      { name: 'Game Design' },
      { name: 'Interactive Systems' },
      { name: 'Gameplay Prototyping' },
    ],
  },
  {
    id: 'design',
    icon: 'palette',
    title: { en: 'Design & Creative Production', tr: 'Tasarım ve Yaratıcı Üretim' },
    description: {
      en: 'Visual design, video and audio editing, and digital content production.',
      tr: 'Görsel tasarım, video ve ses kurgusu ile dijital içerik üretimi.',
    },
    skills: [
      { name: 'Adobe Photoshop', level: advanced },
      { name: 'Adobe Illustrator' },
      { name: 'Adobe Premiere Pro', level: intAdv },
      { name: 'Adobe Audition', level: intAdv },
      { name: 'Blender', level: basic },
      { name: 'Visual Content Production' },
      { name: 'Video Editing' },
      { name: 'Digital Design' },
    ],
  },
];
