import type { NationalPoke } from '../poke';

export type SortDir = 'asc' | 'desc';

// 방향 라벨 어법 구분:
// - sequence: 순서형(도감번호·이름) → "…순 / …역순"
// - amount:   수량형(스탯·종족값)   → "…낮은 순 / …높은 순"
export type SortKind = 'sequence' | 'amount';

export interface SortOption {
  key: string;
  label: string;
  kind: SortKind;
  accessor: (poke: NationalPoke) => number | string;
}

// 정렬 키 목록. 방향(dir)은 키와 독립적으로 관리하므로 여기서 정의하지 않는다.
export const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'dex_number',
    label: '도감번호',
    kind: 'sequence',
    accessor: (poke) => poke.dexNumber,
  },
  {
    key: 'name',
    label: '이름',
    kind: 'sequence',
    accessor: (poke) => poke.nameKo,
  },
  { key: 'hp', label: 'HP', kind: 'amount', accessor: (poke) => poke.hp },
  {
    key: 'attack',
    label: '공격',
    kind: 'amount',
    accessor: (poke) => poke.attack,
  },
  {
    key: 'defense',
    label: '방어',
    kind: 'amount',
    accessor: (poke) => poke.defense,
  },
  {
    key: 'special_attack',
    label: '특수공격',
    kind: 'amount',
    accessor: (poke) => poke.specialAttack,
  },
  {
    key: 'special_defense',
    label: '특수방어',
    kind: 'amount',
    accessor: (poke) => poke.specialDefense,
  },
  {
    key: 'speed',
    label: '스피드',
    kind: 'amount',
    accessor: (poke) => poke.speed,
  },
  {
    key: 'total',
    label: '총합',
    kind: 'amount',
    accessor: (poke) => poke.total,
  },
] as const;

// 기본 상태: 정렬 키 = 도감번호, 방향 = 오름차순.
export const DEFAULT_SORT_KEY = 'dex_number';

export const DEFAULT_SORT_DIR: SortDir = 'asc';
