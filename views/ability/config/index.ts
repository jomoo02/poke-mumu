const APPEARED_GENS = [3, 4, 5, 6, 7, 8, 9] as const;

const VALID_APPEARED_GENS: ReadonlySet<number> = new Set(APPEARED_GENS);

const SEARCH_PARAMS = {
  APPEARED: 'appeared',
  CHAMPIONS: 'champions',
  SEARCH: 'search',
} as const;

export { APPEARED_GENS, VALID_APPEARED_GENS, SEARCH_PARAMS };
