import { SortKey } from '.';
import { NationalPoke } from '..';

// 호출마다 재생성하지 않도록 모듈 스코프로 고정한다.
const collator = new Intl.Collator('ko');

const COMPARATORS = {
  dex: (a: NationalPoke, b: NationalPoke) => a.dexNumber - b.dexNumber,
  name: (a: NationalPoke, b: NationalPoke) =>
    collator.compare(a.nameKo, b.nameKo),
} as const;

const parseSort = (
  sort: string | null,
): {
  field: 'dex' | 'name';
  dir: 'asc' | 'desc';
} => {
  if (!sort) return { field: 'dex', dir: 'asc' }; // 기본값

  const desc = sort.endsWith('-desc');
  const field = desc ? sort.slice(0, -'-desc'.length) : sort;

  // 유효성 방어 (잘못된 URL 값 → 기본값)
  if (field !== 'dex' && field !== 'name') {
    return { field: 'dex', dir: 'asc' };
  }
  return { field, dir: desc ? 'desc' : 'asc' };
};

const applySort = (pokes: NationalPoke[], sortKey: SortKey) => {
  // key 파싱해서 필드+방향 뽑고
  const { field, dir } = parseSort(sortKey); // 'dex'|'name', 'asc'|'desc'
  const base = COMPARATORS[field];
  return [...pokes].sort((a, b) => (dir === 'desc' ? -base(a, b) : base(a, b)));
};

export { parseSort, applySort };
