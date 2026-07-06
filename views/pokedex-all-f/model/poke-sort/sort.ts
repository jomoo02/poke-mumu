import { type NationalPoke } from '../poke';

import {
  SORT_OPTIONS,
  type SortDir,
  DEFAULT_SORT_DIR,
  DEFAULT_SORT_KEY,
} from './config';

// 동점 타이브레이커: dexNumber → sortOrder. 항상 asc(안정성).
// 같은 종 안에서는 sortOrder가 form 순서(base → mega → variant)를 결정.
const tieBreak = (a: NationalPoke, b: NationalPoke): number => {
  const dexDiff = a.dexNumber - b.dexNumber;

  if (dexDiff !== 0) {
    return dexDiff;
  }

  return a.sortOrder - b.sortOrder;
};

// sort/dir을 각각 독립적으로 정규화한다.
// - sort: 유효하지 않으면 기본 키(dex).
// - dir: 유효하지 않으면 기본 방향(asc). 키 변경과 무관하게 유지된다.
const parseSort = (
  params: URLSearchParams,
): {
  key: string;
  dir: SortDir;
} => {
  const opt = SORT_OPTIONS.find((o) => o.key === params.get('sort'));
  const key = opt ? opt.key : DEFAULT_SORT_KEY;

  const raw = params.get('dir');
  const dir: SortDir = raw === 'asc' || raw === 'desc' ? raw : DEFAULT_SORT_DIR;

  return { key, dir };
};

// 원본 복사 후 정렬 + 타이브레이커.
const applySort = (
  items: NationalPoke[],
  params: URLSearchParams,
): NationalPoke[] => {
  const { key, dir } = parseSort(params);

  const option = SORT_OPTIONS.find((o) => o.key === key)!;

  const sign = dir === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    const av = option.accessor(a);
    const bv = option.accessor(b);

    const cmp =
      typeof av === 'string'
        ? av.localeCompare(bv as string, 'ko')
        : (av as number) - (bv as number);
    return cmp !== 0 ? cmp * sign : tieBreak(a, b);
  });
};

export { parseSort, applySort };
