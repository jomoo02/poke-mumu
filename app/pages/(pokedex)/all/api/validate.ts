import { type SearchParams } from '../model';

const SORT_BY_MAP: Record<string, string> = {
  dexNumber: 'dex_number',
  name: 'name',
  hp: 'hp',
  attack: 'attack',
  defense: 'defense',
  specialAttack: 'special_attack',
  specialDefense: 'special_defense',
  speed: 'speed',
  total: 'total',
};

const ALLOWED_SORT_KEYS = Object.keys(SORT_BY_MAP);

const ALLOWED_DIRECTIONS = ['asc', 'desc'] as const;

type Direction = (typeof ALLOWED_DIRECTIONS)[number];

export const validateSearchParams = (params: SearchParams) => {
  const paramsSortKey = params.sortKey || 'dexNumber';

  const sortKey = ALLOWED_SORT_KEYS.includes(paramsSortKey)
    ? paramsSortKey
    : 'dexNumber';
  const sortColumn = SORT_BY_MAP[sortKey];

  const direction = (params.direction || 'asc').toLowerCase();
  const directionSafe: Direction = ALLOWED_DIRECTIONS.includes(
    direction as Direction,
  )
    ? (direction as Direction)
    : 'asc';

  const type = params.type || 'all';

  return {
    sortColumn,

    type,
    direction: directionSafe,
  };
};
