import { type NationalPoke } from './poke';

export type SortDir = 'asc' | 'desc';

export interface SortOption {
  key: string;
  label: string;
  accessor: (p: NationalPoke) => number | string;
}

// 정렬 키 목록. 방향(dir)은 키와 독립적으로 관리하므로 여기서 정의하지 않는다.
export const SORT_OPTIONS: readonly SortOption[] = [
  { key: 'dex_number', label: '도감번호', accessor: (p) => p.dexNumber },
  { key: 'hp', label: 'HP', accessor: (p) => p.hp },
  { key: 'attack', label: '공격', accessor: (p) => p.attack },
  { key: 'defense', label: '방어', accessor: (p) => p.defense },
  {
    key: 'special_attack',
    label: '특수공격',
    accessor: (p) => p.specialAttack,
  },
  {
    key: 'special_defense',
    label: '특수방어',
    accessor: (p) => p.specialDefense,
  },
  { key: 'speed', label: '스피드', accessor: (p) => p.speed },
  { key: 'name', label: '이름', accessor: (p) => p.nameKo },
  { key: 'total', label: '총합', accessor: (p) => p.total },
] as const;

// 기본 상태: 정렬 키 = 도감번호, 방향 = 오름차순.
export const DEFAULT_SORT_KEY = 'dex_number';
export const DEFAULT_SORT_DIR: SortDir = 'asc';

// 동점 타이브레이커: dexNumber → sortOrder. 항상 asc(안정성).
// 같은 종 안에서는 sortOrder가 form 순서(base → mega → variant)를 결정.
const tieBreak = (a: NationalPoke, b: NationalPoke): number => {
  const dexDiff = a.dexNumber - b.dexNumber;
  if (dexDiff !== 0) return dexDiff;
  return a.sortOrder - b.sortOrder;
};

// sort/dir을 각각 독립적으로 정규화한다.
// - sort: 유효하지 않으면 기본 키(dex).
// - dir: 유효하지 않으면 기본 방향(asc). 키 변경과 무관하게 유지된다.
export function parseSort(params: URLSearchParams): {
  key: string;
  dir: SortDir;
} {
  const opt = SORT_OPTIONS.find((o) => o.key === params.get('sort'));
  const key = opt ? opt.key : DEFAULT_SORT_KEY;

  const raw = params.get('dir');
  const dir: SortDir = raw === 'asc' || raw === 'desc' ? raw : DEFAULT_SORT_DIR;

  return { key, dir };
}

// 원본 복사 후 정렬 + 타이브레이커.
export function applySort(
  items: NationalPoke[],
  params: URLSearchParams,
): NationalPoke[] {
  const { key, dir } = parseSort(params);
  const opt = SORT_OPTIONS.find((o) => o.key === key)!;
  const sign = dir === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    const av = opt.accessor(a);
    const bv = opt.accessor(b);
    const cmp =
      typeof av === 'string'
        ? av.localeCompare(bv as string, 'ko')
        : (av as number) - (bv as number);
    return cmp !== 0 ? cmp * sign : tieBreak(a, b);
  });
}
