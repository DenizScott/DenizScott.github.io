import type { en } from './en.ts';

type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? Widen<U>[] : T extends object ? { [K in keyof T]: Widen<T[K]> } : T;

/** The shape every language file must satisfy. */
export type Dictionary = Widen<typeof en>;
