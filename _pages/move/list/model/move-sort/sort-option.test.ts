import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from './sort';
import { SORT_OPTIONS, getInitialOrder, getSortLabel } from './sort-option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('번호: 번호순 / 번호 역순', () => {
    expect(getSortLabel({ sort: 'moveNumber', order: 'asc' })).toBe('번호순');
    expect(getSortLabel({ sort: 'moveNumber', order: 'desc' })).toBe(
      '번호 역순',
    );
  });

  it('이름: 이름순 / 이름 역순', () => {
    expect(getSortLabel({ sort: 'name', order: 'asc' })).toBe('이름순');
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 역순');
  });

  it('수치형: {기준} 높은 순 / {기준} 낮은 순', () => {
    expect(getSortLabel({ sort: 'power', order: 'desc' })).toBe('위력 높은 순');
    expect(getSortLabel({ sort: 'pp', order: 'asc' })).toBe('PP 낮은 순');
  });
});

describe('getInitialOrder', () => {
  it('순서형은 asc, 수치형은 desc부터', () => {
    expect(getInitialOrder('name')).toBe('asc');
    expect(getInitialOrder('moveNumber')).toBe('asc');
    expect(getInitialOrder('power')).toBe('desc');
    expect(getInitialOrder('accuracy')).toBe('desc');
  });
});
