import { describe, it, expect } from 'vitest';

import { PAGE_SIZE } from '../../config';
import { makePoke, names } from '../base-stats-poke.fixture';
import { DEFAULT_SORT } from '../sort';

import { computePokeResults, type PokeConditions } from './poke-results';

const conditions = (partial: Partial<PokeConditions>): PokeConditions => ({
  filter: { type: [], form: [], gen: [] },
  keyword: '',
  language: 'ko',
  sortState: DEFAULT_SORT,
  page: 1,
  ...partial,
});

const POKES = [
  makePoke({
    nameKo: '리자몽',
    nameEn: 'Charizard',
    dexNumber: 6,
    types: ['fire', 'flying'],
    stats: { speed: 100 },
  }),
  makePoke({
    nameKo: '이상해씨',
    nameEn: 'Bulbasaur',
    dexNumber: 1,
    types: ['grass', 'poison'],
    stats: { speed: 45 },
  }),
  makePoke({
    nameKo: '파이리',
    nameEn: 'Charmander',
    dexNumber: 4,
    types: ['fire'],
    stats: { speed: 65 },
  }),
  makePoke({
    nameKo: '피카츄',
    nameEn: 'Pikachu',
    dexNumber: 25,
    types: ['electric'],
    stats: { speed: 90 },
  }),
];

describe('computePokeResults', () => {
  it('조건이 없으면 전체를 도감 번호순으로', () => {
    const result = computePokeResults(POKES, conditions({}));

    expect(names(result.pagePokes)).toEqual([
      '이상해씨',
      '파이리',
      '리자몽',
      '피카츄',
    ]);
    expect(result.totalCount).toBe(4);
    expect(result.otherLanguageMatches).toEqual([]);
  });

  it('필터한 결과에서 검색하고 정렬한다', () => {
    const result = computePokeResults(
      POKES,
      conditions({
        filter: { type: ['fire'], form: [], gen: [] },
        keyword: '리',
        sortState: { sort: 'speed', order: 'desc' },
      }),
    );

    expect(names(result.pagePokes)).toEqual(['리자몽', '파이리']);
  });

  it('페이지: 넘치는 페이지는 마지막 페이지로, totalCount는 자르기 전 수', () => {
    const many = Array.from({ length: PAGE_SIZE + 5 }, (_, index) =>
      makePoke({ nameKo: `포켓몬${index + 1}`, dexNumber: index + 1 }),
    );

    const result = computePokeResults(many, conditions({ page: 99 }));

    expect(result.page).toBe(2);
    expect(result.totalPages).toBe(2);
    expect(result.totalCount).toBe(PAGE_SIZE + 5);
    expect(result.pagePokes).toHaveLength(5);
  });

  it('결과가 없을 때만 다른 언어로 찾히는 수를 센다', () => {
    const result = computePokeResults(POKES, conditions({ keyword: 'char' }));

    expect(result.totalCount).toBe(0);
    expect(result.otherLanguageMatches).toEqual([{ language: 'en', count: 2 }]);
  });

  it('다른 언어로 찾히는 수는 필터는 거치고 검색은 거치기 전 목록에서 센다', () => {
    const result = computePokeResults(
      POKES,
      conditions({
        filter: { type: ['flying'], form: [], gen: [] },
        keyword: 'char',
      }),
    );

    expect(result.otherLanguageMatches).toEqual([{ language: 'en', count: 1 }]);
  });
});
