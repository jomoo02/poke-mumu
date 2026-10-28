import { describe, it, expect } from 'vitest';

import { makePoke, names } from '../base-stats-poke.fixture';
import { DEFAULT_SORT } from '../sort';

import { deriveResults, type ResultConditions } from './derive-results';

const pikachu = makePoke({
  nameKo: '피카츄',
  nameEn: 'Pikachu',
  dexNumber: 25,
  types: ['electric'],
  stats: { speed: 90 },
});
const raichu = makePoke({
  nameKo: '라이츄',
  nameEn: 'Raichu',
  dexNumber: 26,
  types: ['electric'],
  stats: { speed: 110 },
});
const charmander = makePoke({
  nameKo: '파이리',
  nameEn: 'Charmander',
  dexNumber: 4,
  types: ['fire'],
  stats: { speed: 65 },
});

const POKES = [pikachu, raichu, charmander];

const conditions = (
  partial: Partial<ResultConditions> = {},
): ResultConditions => ({
  keyword: '',
  filter: { type: [], form: [], gen: [] },
  sortState: DEFAULT_SORT,
  language: 'ko',
  page: 1,
  ...partial,
});

describe('deriveResults', () => {
  it('조건이 없으면 기본 정렬(도감번호순)으로 전부', () => {
    const results = deriveResults(POKES, conditions(), 70);

    expect(names(results.pagePokes)).toEqual(['파이리', '피카츄', '라이츄']);
    expect(results.totalCount).toBe(3);
    expect(results.totalPages).toBe(1);
  });

  it('필터 → 검색 → 정렬 순서로 줄인다', () => {
    const results = deriveResults(
      POKES,
      conditions({
        filter: { type: ['electric'], form: [], gen: [] },
        keyword: '츄',
        sortState: { sort: 'speed', order: 'desc' },
      }),
      70,
    );

    expect(names(results.pagePokes)).toEqual(['라이츄', '피카츄']);
  });

  it('페이지 크기로 자르고, 넘는 페이지는 마지막 페이지로', () => {
    const results = deriveResults(POKES, conditions({ page: 9 }), 2);

    expect(results.page).toBe(2);
    expect(results.totalPages).toBe(2);
    expect(names(results.pagePokes)).toEqual(['라이츄']);
  });

  it('결과가 없을 때만 다른 언어 일치 수를 센다 (필터가 걸린 목록에서)', () => {
    const empty = deriveResults(
      POKES,
      conditions({
        keyword: 'pika',
        filter: { type: ['electric'], form: [], gen: [] },
      }),
      70,
    );

    expect(empty.totalCount).toBe(0);
    expect(empty.otherLanguageMatches).toEqual([{ language: 'en', count: 1 }]);

    const found = deriveResults(POKES, conditions({ keyword: '피카' }), 70);

    expect(found.otherLanguageMatches).toEqual([]);
  });
});
