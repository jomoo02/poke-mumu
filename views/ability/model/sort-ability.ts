import type { Ability } from '@/entities/ability/model';

const SORT_OPTIONS = [
  { value: 'name-asc', label: '이름 순' },
  { value: 'name-desc', label: '이름 역순' },
  { value: 'gen-asc', label: '세대 순' },
  { value: 'gen-desc', label: '세대 역순' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export const DEFAULT_SORT: SortOption = 'name-asc';

export const getSortOptionItems = () => [...SORT_OPTIONS];

export const isSortOption = (value: string): value is SortOption =>
  SORT_OPTIONS.some((opt) => opt.value === value);

// --- comparators ---

const byNameAsc = (a: Ability, b: Ability) =>
  a.nameKo.localeCompare(b.nameKo, 'ko');

const byNameDesc = (a: Ability, b: Ability) =>
  b.nameKo.localeCompare(a.nameKo, 'ko');

// NULL(챔피언십)은 마지막 — 분류된 것 우선.
// 챔피언십 ability 추가 후 사용자 피드백 봐가며 NULL을 처음에 두는
// 방식으로 변경 검토. "최신"으로 인식하는 사용자가 많다면
// gen-desc에서만 NULL을 처음에 두는 것도 한 옵션.
const byGen = (direction: 1 | -1) => (a: Ability, b: Ability) => {
  if (a.gen === null && b.gen === null) return byNameAsc(a, b);
  if (a.gen === null) return 1;
  if (b.gen === null) return -1;
  if (a.gen !== b.gen) return (a.gen - b.gen) * direction;
  return byNameAsc(a, b);
};

const comparators: Record<SortOption, (a: Ability, b: Ability) => number> = {
  'name-asc': byNameAsc,
  'name-desc': byNameDesc,
  'gen-asc': byGen(1),
  'gen-desc': byGen(-1),
};

export const sortAbilities = (
  abilities: Ability[],
  option: SortOption,
): Ability[] => [...abilities].sort(comparators[option]);
