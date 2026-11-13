import { describe, it, expect } from 'vitest';

import { PAGE_SIZE } from '../../../config';
import { makeMove, names } from '../../move/list-move.fixture';
import { DEFAULT_SORT } from '../../sort';
import {
  computeFilterCounts,
  computeMoveResults,
  type MoveConditions,
} from '../move-results';

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
  it('조건이 없으면 전체를 이름순으로', () => {
    const result = computeMoveResults(MOVES, conditions({}));

    expect(names(result.pageMoves)).toEqual([
      '막치기',
      '불꽃세례',
      '파도타기',
      '화염방사',
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
    // 검색 범위는 필터만 건 수 (불꽃 2개)
    expect(result.scopeCount).toBe(2);
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

describe('computeFilterCounts', () => {
  const COUNT_MOVES = [
    makeMove({ nameKo: '화염방사', type: 'fire', damageClass: 'special' }),
    makeMove({ nameKo: '불꽃펀치', type: 'fire', damageClass: 'physical' }),
    makeMove({ nameKo: '파도타기', type: 'water', damageClass: 'special' }),
    makeMove({ nameKo: '아쿠아테일', type: 'water', damageClass: 'physical' }),
    makeMove({ nameKo: '물대포', type: 'water', damageClass: 'special' }),
  ];

  it('조건이 없으면 값별 전체 수', () => {
    const counts = computeFilterCounts(COUNT_MOVES, {
      filter: { type: [], damageClass: [] },
      keyword: '',
    });

    expect(counts.type).toEqual({ fire: 2, water: 3 });
    expect(counts.damageClass).toEqual({ special: 3, physical: 2 });
  });

  it('자기 그룹의 필터는 빼고, 다른 그룹의 필터는 건다', () => {
    const counts = computeFilterCounts(COUNT_MOVES, {
      filter: { type: ['fire'], damageClass: ['physical'] },
      keyword: '',
    });

    // 타입 숫자: 물리만 걸고 센다 (불꽃을 골랐어도 물은 0이 아니다)
    expect(counts.type).toEqual({ fire: 1, water: 1 });
    // 분류 숫자: 불꽃만 걸고 센다
    expect(counts.damageClass).toEqual({ special: 1, physical: 1 });
  });

  it('검색어를 반영한다', () => {
    const counts = computeFilterCounts(COUNT_MOVES, {
      filter: { type: [], damageClass: [] },
      keyword: '불꽃',
    });

    expect(counts.type).toEqual({ fire: 1 });
  });
});
