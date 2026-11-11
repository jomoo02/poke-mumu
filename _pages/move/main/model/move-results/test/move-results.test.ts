import { describe, it, expect } from 'vitest';

import { PAGE_SIZE } from '../../../config';
import { makeMove, names } from '../../move/list-move.fixture';
import { DEFAULT_SORT } from '../../sort';
import { computeMoveResults, type MoveConditions } from '../move-results';

const conditions = (partial: Partial<MoveConditions>): MoveConditions => ({
  filter: { type: [], damageClass: [] },
  keyword: '',
  sortState: DEFAULT_SORT,
  page: 1,
  ...partial,
});

const MOVES = [
  makeMove({ nameKo: '화염방사', moveNumber: 53, type: 'fire', power: 90 }),
  makeMove({ nameKo: '막치기', moveNumber: 1, type: 'normal', power: 40 }),
  makeMove({ nameKo: '불꽃세례', moveNumber: 52, type: 'fire', power: 40 }),
  makeMove({ nameKo: '파도타기', moveNumber: 57, type: 'water', power: 90 }),
];

describe('computeMoveResults', () => {
  it('조건이 없으면 전체를 기술번호순으로', () => {
    const result = computeMoveResults(MOVES, conditions({}));

    expect(names(result.pageMoves)).toEqual([
      '막치기',
      '불꽃세례',
      '화염방사',
      '파도타기',
    ]);
    expect(result.totalCount).toBe(4);
    expect(result.totalPages).toBe(1);
  });

  it('필터 → 검색 → 정렬', () => {
    const result = computeMoveResults(
      MOVES,
      conditions({
        filter: { type: ['fire'], damageClass: [] },
        keyword: '불',
        sortState: { sort: 'power', order: 'desc' },
      }),
    );

    expect(names(result.pageMoves)).toEqual(['불꽃세례']);
    expect(result.totalCount).toBe(1);
  });

  it('결과가 없으면 0개, 1페이지', () => {
    const result = computeMoveResults(
      MOVES,
      conditions({ keyword: '없는기술' }),
    );

    expect(result.pageMoves).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.page).toBe(1);
  });

  it('PAGE_SIZE로 나누고, 넘치는 페이지는 마지막 페이지로', () => {
    const many = Array.from({ length: PAGE_SIZE + 5 }, (_, index) =>
      makeMove({ nameKo: `기술${index}`, moveNumber: index + 1 }),
    );

    const result = computeMoveResults(many, conditions({ page: 9 }));

    expect(result.totalPages).toBe(2);
    expect(result.page).toBe(2);
    expect(result.pageMoves).toHaveLength(5);
  });
});
