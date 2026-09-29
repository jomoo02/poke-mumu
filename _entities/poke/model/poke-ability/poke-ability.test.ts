import { describe, it, expect } from 'vitest';

import {
  getPokeAbilityKind,
  groupByPokeAbilityKind,
  type PokeAbilityLink,
} from './poke-ability';

const link = (overrides: Partial<PokeAbilityLink> = {}): PokeAbilityLink => ({
  isHidden: false,
  slot: 1,
  condition: null,
  ...overrides,
});

describe('getPokeAbilityKind', () => {
  it('조건 없고 숨겨진 특성이 아니면 normal', () => {
    expect(getPokeAbilityKind(link())).toBe('normal');
  });

  it('숨겨진 특성이면 hidden', () => {
    expect(getPokeAbilityKind(link({ isHidden: true, slot: null }))).toBe(
      'hidden',
    );
  });

  it('조건이 있으면 조건이 kind가 된다', () => {
    expect(
      getPokeAbilityKind(link({ slot: null, condition: 'terastal' })),
    ).toBe('terastal');
  });

  it('조건이 숨겨진 여부보다 우선한다', () => {
    expect(
      getPokeAbilityKind(link({ isHidden: true, condition: 'terastal' })),
    ).toBe('terastal');
  });
});

describe('groupByPokeAbilityKind', () => {
  it('비어 있어도 모든 kind 키를 반환', () => {
    expect(groupByPokeAbilityKind([])).toEqual({
      normal: [],
      hidden: [],
      terastal: [],
    });
  });

  it('입력 순서를 유지하며 나눈다', () => {
    const a = { ...link(), id: 'a' };
    const b = { ...link({ isHidden: true, slot: null }), id: 'b' };
    const c = { ...link({ slot: 2 }), id: 'c' };
    const d = { ...link({ slot: null, condition: 'terastal' }), id: 'd' };

    const groups = groupByPokeAbilityKind([a, b, c, d]);

    expect(groups.normal).toEqual([a, c]);
    expect(groups.hidden).toEqual([b]);
    expect(groups.terastal).toEqual([d]);
  });
});
