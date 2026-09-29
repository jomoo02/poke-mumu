import { describe, it, expect } from 'vitest';

import { compareDexOrder, getVisibleKinds } from './ability-poke';

describe('compareDexOrder', () => {
  it('도감 번호 → 폼 순서로 정렬한다', () => {
    const sorted = [
      { key: 'charizard-mega-y', dexNumber: 6, sortOrder: 3 },
      { key: 'charmander', dexNumber: 4, sortOrder: 1 },
      { key: 'charizard', dexNumber: 6, sortOrder: 1 },
      { key: 'charizard-mega-x', dexNumber: 6, sortOrder: 2 },
    ]
      .sort(compareDexOrder)
      .map(({ key }) => key);

    expect(sorted).toEqual([
      'charmander',
      'charizard',
      'charizard-mega-x',
      'charizard-mega-y',
    ]);
  });
});

describe('getVisibleKinds', () => {
  const groups = (normal: number, hidden: number, terastal: number) => ({
    normal: Array(normal).fill(0),
    hidden: Array(hidden).fill(0),
    terastal: Array(terastal).fill(0),
  });

  it('조건부가 없으면 일반/숨겨진만', () => {
    expect(getVisibleKinds(groups(3, 2, 0))).toEqual(['normal', 'hidden']);
  });

  it('일반/숨겨진 중 하나만 비어도 둘 다 보여준다', () => {
    expect(getVisibleKinds(groups(3, 0, 0))).toEqual(['normal', 'hidden']);
    expect(getVisibleKinds(groups(0, 2, 0))).toEqual(['normal', 'hidden']);
  });

  it('조건부 전용 특성은 조건부 그룹만', () => {
    expect(getVisibleKinds(groups(0, 0, 4))).toEqual(['terastal']);
  });

  it('조건부가 섞이면 일반/숨겨진 뒤에 붙인다', () => {
    expect(getVisibleKinds(groups(1, 1, 1))).toEqual([
      'normal',
      'hidden',
      'terastal',
    ]);
  });
});
