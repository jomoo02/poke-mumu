import { type NationalPoke } from './poke';

export type SortDir = 'asc' | 'desc';

export interface SortOption {
  key: string;
  label: string;
  defaultDir: SortDir;
  accessor: (p: NationalPoke) => number | string;
}

// 키마다 기본 방향: 도감번호·이름 = asc, 스탯류 = desc.
// 라벨/키는 v2 comparators(특수공격/특수방어 등)에 맞춰 정의.
export const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'dex',
    label: '도감번호',
    defaultDir: 'asc',
    accessor: (p) => p.dexNumber,
  },
  { key: 'name', label: '이름', defaultDir: 'asc', accessor: (p) => p.nameKo },
  {
    key: 'total',
    label: '종족값',
    defaultDir: 'desc',
    accessor: (p) => p.total,
  },
  { key: 'hp', label: 'HP', defaultDir: 'desc', accessor: (p) => p.hp },
  {
    key: 'attack',
    label: '공격',
    defaultDir: 'desc',
    accessor: (p) => p.attack,
  },
  {
    key: 'defense',
    label: '방어',
    defaultDir: 'desc',
    accessor: (p) => p.defense,
  },
  {
    key: 'specialAttack',
    label: '특수공격',
    defaultDir: 'desc',
    accessor: (p) => p.specialAttack,
  },
  {
    key: 'specialDefense',
    label: '특수방어',
    defaultDir: 'desc',
    accessor: (p) => p.specialDefense,
  },
  {
    key: 'speed',
    label: '스피드',
    defaultDir: 'desc',
    accessor: (p) => p.speed,
  },
] as const;

export const DEFAULT_SORT = { key: 'dex', dir: 'asc' as SortDir };

// 동점 타이브레이커: dexNumber → sortOrder. 항상 asc(안정성).
// 같은 종 안에서는 sortOrder가 form 순서(base → mega → variant)를 결정.
const tieBreak = (a: NationalPoke, b: NationalPoke): number => {
  const dexDiff = a.dexNumber - b.dexNumber;
  if (dexDiff !== 0) return dexDiff;
  return a.sortOrder - b.sortOrder;
};

// 읽을 때 항상 정규화: sortDir이 없으면 그 키의 defaultDir, 무효 키면 전체 기본값.
export function parseSort(params: URLSearchParams): {
  key: string;
  dir: SortDir;
} {
  const opt = SORT_OPTIONS.find((o) => o.key === params.get('sort_key'));
  if (!opt) return DEFAULT_SORT;
  const raw = params.get('sort_dir');
  const dir: SortDir = raw === 'asc' || raw === 'desc' ? raw : opt.defaultDir;
  return { key: opt.key, dir };
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
