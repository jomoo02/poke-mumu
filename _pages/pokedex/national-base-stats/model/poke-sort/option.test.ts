import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from './poke-sort';
import { SORT_OPTIONS, getInitialOrder, getSortLabel } from './option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('번호·이름', () => {
    expect(getSortLabel({ sort: 'dexNumber', order: 'asc' })).toBe('번호순');
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 역순');
  });

  it('수치형: {기준} 높은 순 / {기준} 낮은 순 (줄이지 않은 이름)', () => {
    expect(getSortLabel({ sort: 'specialAttack', order: 'desc' })).toBe(
      '특수공격 높은 순',
    );
    expect(getSortLabel({ sort: 'total', order: 'asc' })).toBe(
      '총합 낮은 순',
    );
  });
});

describe('getInitialOrder', () => {
  it('순서형은 asc, 수치형은 desc부터', () => {
    expect(getInitialOrder('dexNumber')).toBe('asc');
    expect(getInitialOrder('name')).toBe('asc');
    expect(getInitialOrder('speed')).toBe('desc');
  });
});
