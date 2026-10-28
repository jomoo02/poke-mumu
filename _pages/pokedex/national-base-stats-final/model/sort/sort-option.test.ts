import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from './sort-pokes';
import {
  SORT_OPTIONS,
  getInitialOrder,
  getOrderOptions,
  getSortLabel,
  getToggledSort,
  getKeySelectedSort,
} from './sort-option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });

  it('기준 순서: 도감번호 · 이름 · 능력치(게임 표시 순서) · 총합', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([
      'dexNumber',
      'name',
      'hp',
      'attack',
      'defense',
      'specialAttack',
      'specialDefense',
      'speed',
      'total',
    ]);
  });
});

describe('getSortLabel', () => {
  it('순서형: 기준 이름을 붙인다 (도감번호는 줄이지 않는다)', () => {
    expect(getSortLabel({ sort: 'dexNumber', order: 'asc' })).toBe(
      '도감번호순',
    );
    expect(getSortLabel({ sort: 'dexNumber', order: 'desc' })).toBe(
      '도감번호 반대순',
    );
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 반대순');
  });

  it('수치형: {기준} 높은 순 / {기준} 낮은 순 (줄이지 않은 이름)', () => {
    expect(getSortLabel({ sort: 'specialAttack', order: 'desc' })).toBe(
      '특수공격 높은 순',
    );
    expect(getSortLabel({ sort: 'total', order: 'asc' })).toBe('총합 낮은 순');
  });
});

describe('getInitialOrder', () => {
  it('순서형은 asc, 수치형은 desc부터', () => {
    expect(getInitialOrder('dexNumber')).toBe('asc');
    expect(getInitialOrder('name')).toBe('asc');
    expect(getInitialOrder('speed')).toBe('desc');
  });
});

describe('getOrderOptions', () => {
  it('순서형: 오름차순이 왼쪽, 시트에선 번호로 줄인다', () => {
    expect(getOrderOptions('dexNumber')).toEqual([
      { order: 'asc', label: '번호순' },
      { order: 'desc', label: '번호 반대순' },
    ]);
  });

  it('수치형: 높은 순이 왼쪽, 기준 이름 없이', () => {
    expect(getOrderOptions('attack')).toEqual([
      { order: 'desc', label: '높은 순' },
      { order: 'asc', label: '낮은 순' },
    ]);
  });
});

describe('getToggledSort', () => {
  it('같은 기준이면 방향을 뒤집는다', () => {
    expect(getToggledSort({ sort: 'speed', order: 'desc' }, 'speed')).toEqual({
      sort: 'speed',
      order: 'asc',
    });
  });

  it('다른 기준이면 그 기준의 첫 방향부터 (능력치는 높은 순, 이름은 오름차순)', () => {
    expect(getToggledSort({ sort: 'name', order: 'asc' }, 'attack')).toEqual({
      sort: 'attack',
      order: 'desc',
    });
    expect(getToggledSort({ sort: 'attack', order: 'asc' }, 'name')).toEqual({
      sort: 'name',
      order: 'asc',
    });
  });
});

describe('getKeySelectedSort', () => {
  it('같은 기준이면 방향을 그대로 둔다', () => {
    expect(getKeySelectedSort({ sort: 'speed', order: 'asc' }, 'speed')).toEqual(
      { sort: 'speed', order: 'asc' },
    );
  });

  it('다른 기준이면 그 기준의 첫 방향부터', () => {
    expect(getKeySelectedSort({ sort: 'dexNumber', order: 'desc' }, 'hp')).toEqual(
      { sort: 'hp', order: 'desc' },
    );
  });
});
