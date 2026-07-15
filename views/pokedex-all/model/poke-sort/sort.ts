import { type NationalPoke } from '../poke';

import {
  SORT_OPTIONS,
  type SortDir,
  DEFAULT_SORT_DIR,
  DEFAULT_SORT_KEY,
} from './config';

// 동점 타이브레이커: dexNumber → sortOrder. 항상 asc(안정성).
// 같은 종 안에서는 sortOrder가 form 순서(base → mega → variant)를 결정.
const tieBreak = (pokeA: NationalPoke, pokeB: NationalPoke): number => {
  const dexDiff = pokeA.dexNumber - pokeB.dexNumber;

  if (dexDiff !== 0) {
    return dexDiff;
  }

  return pokeA.sortOrder - pokeB.sortOrder;
};

// sort/dir을 각각 독립적으로 정규화한다.
// - sort: 유효하지 않으면 기본 키(dex).
// - dir: 유효하지 않으면 기본 방향(asc). 키 변경과 무관하게 유지된다.
const parseSort = (
  params: URLSearchParams,
): {
  sortKey: string;
  sortDir: SortDir;
} => {
  const matchedOption = SORT_OPTIONS.find(
    (candidate) => candidate.key === params.get('sort'),
  );
  const sortKey = matchedOption ? matchedOption.key : DEFAULT_SORT_KEY;

  const rawDir = params.get('dir');

  const sortDir: SortDir =
    rawDir === 'asc' || rawDir === 'desc' ? rawDir : DEFAULT_SORT_DIR;

  return { sortKey, sortDir };
};

const applySort = (
  items: NationalPoke[],
  params: URLSearchParams,
): NationalPoke[] => {
  const { sortKey, sortDir } = parseSort(params);

  const option = SORT_OPTIONS.find((candidate) => candidate.key === sortKey)!;

  const sign = sortDir === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    const aValue = option.accessor(a);
    const bValue = option.accessor(b);

    const comparison =
      typeof aValue === 'string'
        ? aValue.localeCompare(bValue as string, 'ko')
        : (aValue as number) - (bValue as number);
    return comparison !== 0 ? comparison * sign : tieBreak(a, b);
  });
};

export { parseSort, applySort };
