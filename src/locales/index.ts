import { en } from './en.ts';
import { tr } from './tr.ts';
import type { Dictionary } from './types.ts';
import type { Lang } from '../data/types.ts';

export const dictionaries: Record<Lang, Dictionary> = { en, tr };

export type { Dictionary };

/** Replaces `{token}` placeholders in a translated string. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
