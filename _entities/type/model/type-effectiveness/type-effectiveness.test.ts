import { describe, it, expect } from 'vitest';

import { groupByMultiplier, toMultiplier } from './type-effectiveness';

describe('toMultiplier', () => {
  it.each([
    [0, 0],
    [0.25, 0.25],
    [0.2500000000000001, 0.25],
    [0.5, 0.5],
    [1, 1],
    [2, 2],
    [3.9999999999999999, 4],
    [4.0000001, 4],
  ])('toMultiplier(%s) → %s', (value, expected) => {
    expect(toMultiplier(value)).toBe(expected);
  });
});

describe('groupByMultiplier', () => {
  it('약점 → 반감 → 무효 순으로 묶고, 1배와 빈 그룹은 제외한다', () => {
    const result = groupByMultiplier([
      { attackerTypeId: 1, multiplier: 1 },
      { attackerTypeId: 5, multiplier: 4 },
      { attackerTypeId: 11, multiplier: 2 },
      { attackerTypeId: 6, multiplier: 2 },
      { attackerTypeId: 12, multiplier: 0.5 },
      { attackerTypeId: 13, multiplier: 0 },
    ]);

    expect(result).toEqual([
      { multiplier: 4, attackerTypeIds: [5] },
      { multiplier: 2, attackerTypeIds: [11, 6] },
      { multiplier: 0.5, attackerTypeIds: [12] },
      { multiplier: 0, attackerTypeIds: [13] },
    ]);
  });

  it('빈 입력이면 빈 배열', () => {
    expect(groupByMultiplier([])).toEqual([]);
  });
});
