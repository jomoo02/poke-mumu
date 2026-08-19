export const POKE_LIST_MODE = { grid: 'grid', list: 'list' } as const;

export type PokeListMode = keyof typeof POKE_LIST_MODE;

export const DEFAULT_MODE: PokeListMode = 'grid';
