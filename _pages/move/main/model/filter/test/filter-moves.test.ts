import { describe, it, expect } from 'vitest';

import { makeMove, names } from '../../move/list-move.fixture';
import type { MoveFilterOptions } from '../filter-option';
import {
  filterMoves,
  isMoveFilterActive,
  parseMoveFilter,
  toggleGroupValue,
  type MoveFilterValues,
} from '../filter-moves';

const option = (value: string) => ({ value, label: value });

// 서버에서 받은 선택지 (테스트에 필요한 것만)
const OPTIONS: MoveFilterOptions = {
  type: ['normal', 'fire', 'water', 'electric'].map(option),
  damageClass: ['physical', 'special', 'status'].map(option),
};

const values = (partial: Partial<MoveFilterValues>): MoveFilterValues => ({
  type: [],
  damageClass: [],
  ...partial,
});

const MOVES = [
  makeMove({ nameKo: '화염방사', type: 'fire', damageClass: 'special' }),
  makeMove({ nameKo: '불꽃펀치', type: 'fire', damageClass: 'physical' }),
  makeMove({ nameKo: '파도타기', type: 'water', damageClass: 'special' }),
  makeMove({ nameKo: '칼춤', type: 'normal', damageClass: 'status' }),
  makeMove({ nameKo: '다이번', type: 'fire', damageClass: null }),
];

describe('parseMoveFilter', () => {
  it('그룹 안은 고른 순서를 지킨다', () => {
    expect(
      parseMoveFilter(values({ type: ['water', 'fire'] }), OPTIONS),
    ).toEqual(values({ type: ['water', 'fire'] }));
  });

  it('선택지에 없는 값과 중복은 뺀다', () => {
    expect(
      parseMoveFilter(
        values({
          type: ['unknown', 'fire', 'fire'],
          damageClass: ['shadow', 'special'],
        }),
        OPTIONS,
      ),
    ).toEqual(values({ type: ['fire'], damageClass: ['special'] }));
  });
});

describe('isMoveFilterActive', () => {
  it('고른 값이 하나라도 있으면 켜진 상태', () => {
    expect(isMoveFilterActive(values({}))).toBe(false);
    expect(isMoveFilterActive(values({ damageClass: ['status'] }))).toBe(true);
  });
});

describe('filterMoves', () => {
  it('고른 게 없으면 그대로', () => {
    expect(filterMoves(MOVES, values({}))).toBe(MOVES);
  });

  it('타입은 하나라도 해당하면 남긴다 (OR)', () => {
    expect(
      names(filterMoves(MOVES, values({ type: ['water', 'normal'] }))),
    ).toEqual(['파도타기', '칼춤']);
  });

  it('분류를 고르면 분류가 없는 Z·다이맥스 기술은 빠진다', () => {
    expect(
      names(filterMoves(MOVES, values({ damageClass: ['physical'] }))),
    ).toEqual(['불꽃펀치']);
  });

  it('타입과 분류 사이는 AND', () => {
    expect(
      names(
        filterMoves(
          MOVES,
          values({ type: ['fire'], damageClass: ['special', 'status'] }),
        ),
      ),
    ).toEqual(['화염방사']);
  });
});

describe('toggleGroupValue', () => {
  it('없으면 맨 뒤에 붙이고, 있으면 뺀다', () => {
    expect(toggleGroupValue(['fire'], 'water', 'type', OPTIONS)).toEqual([
      'fire',
      'water',
    ]);
    expect(
      toggleGroupValue(['fire', 'water'], 'fire', 'type', OPTIONS),
    ).toEqual(['water']);
  });

  it('잘못된 값·중복은 첫 조작에 정리된다', () => {
    expect(
      toggleGroupValue(['foo', 'fire', 'fire'], 'water', 'type', OPTIONS),
    ).toEqual(['fire', 'water']);
  });
});
