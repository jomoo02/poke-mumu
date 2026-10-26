import { describe, it, expect } from 'vitest';

import { filterMoves, parseMoveFilter } from './move-filter';
import { makeMove, names } from '../move.fixture';

describe('parseMoveFilter', () => {
  it('그룹 안은 고른 순서를 지킨다', () => {
    expect(
      parseMoveFilter({ type: ['grass', 'fire'], damageClass: ['physical'] }),
    ).toEqual({ types: ['grass', 'fire'], damageClasses: ['physical'] });
  });

  it('유효하지 않은 identifier와 중복은 뺀다', () => {
    expect(
      parseMoveFilter({
        type: ['xxx', 'unknown', 'fire', 'fire'],
        damageClass: ['magic'],
      }),
    ).toEqual({ types: ['fire'], damageClasses: [] });
  });

  it('선택이 없으면 조건 없음', () => {
    expect(parseMoveFilter({ type: [], damageClass: [] })).toEqual({
      types: [],
      damageClasses: [],
    });
  });
});

describe('filterMoves', () => {
  const moves = [
    makeMove({ nameKo: '화염방사', type: 'fire', damageClass: 'special' }),
    makeMove({
      nameKo: '플레어드라이브',
      type: 'fire',
      damageClass: 'physical',
    }),
    makeMove({ nameKo: '파도타기', type: 'water', damageClass: 'special' }),
    makeMove({ nameKo: '칼춤', type: 'normal', damageClass: 'status' }),
    makeMove({ nameKo: '다이번', type: 'fire', damageClass: null }),
  ];

  it('필터가 없으면 전부 남긴다', () => {
    expect(filterMoves(moves, { types: [], damageClasses: [] })).toHaveLength(
      5,
    );
  });

  it('타입끼리는 OR', () => {
    expect(
      names(
        filterMoves(moves, { types: ['water', 'normal'], damageClasses: [] }),
      ),
    ).toEqual(['파도타기', '칼춤']);
  });

  it('분류끼리는 OR, 분류 없는 기술은 빠진다', () => {
    expect(
      names(
        filterMoves(moves, {
          types: [],
          damageClasses: ['physical', 'status'],
        }),
      ),
    ).toEqual(['플레어드라이브', '칼춤']);
  });

  it('타입과 분류는 AND', () => {
    expect(
      names(
        filterMoves(moves, { types: ['fire'], damageClasses: ['special'] }),
      ),
    ).toEqual(['화염방사']);
  });

  it('분류 필터가 없으면 분류 없는 기술도 남는다', () => {
    expect(
      names(filterMoves(moves, { types: ['fire'], damageClasses: [] })),
    ).toEqual(['화염방사', '플레어드라이브', '다이번']);
  });
});
