// SortKey 타입 파생용 상수. 값 자체는 외부로 export하지 않는다.
const SORT = {
  dexAsc: 'dex', // 기본값 → URL엔 안 씀
  dexDesc: 'dex-desc',
  nameAsc: 'name',
  nameDesc: 'name-desc',
} as const;

type SortKey = (typeof SORT)[keyof typeof SORT];

const DEFAULT_SORT_KEY = 'dex';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'dex', label: '도감번호 순' },
  { key: 'dex-desc', label: '도감번호 역순' },
  { key: 'name', label: '이름 순' },
  { key: 'name-desc', label: '이름 역순' },
];

export { type SortKey, DEFAULT_SORT_KEY, SORT_OPTIONS };
export { parseSort, applySort } from './sort';

export { usePokeSort } from './usePokeSort';
