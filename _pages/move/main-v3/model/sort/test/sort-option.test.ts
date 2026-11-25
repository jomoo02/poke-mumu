import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from '../sort-moves';
import {
  SORT_OPTIONS,
  getInitialOrder,
  getSortLabel,
  getToggledSort,
  getKeySelectedSort,
  getOrderOptions,
} from '../sort-option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다 (이름 · 위력 · 명중 · PP)', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('순서형: 기준 이름을 붙인다', () => {
    expect(getSortLabel({ sort: 'name', order: 'asc' })).toBe('이름순');
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 반대순');
  });

  it('수치형: {기준} 높은 순 / {기준} 낮은 순', () => {
    expect(getSortLabel({ sort: 'power', order: 'desc' })).toBe('위력 높은 순');
    expect(getSortLabel({ sort: 'pp', order: 'asc' })).toBe('PP 낮은 순');
  });
});

describe('getInitialOrder', () => {
  it('순서형은 asc, 수치형은 desc부터', () => {
    expect(getInitialOrder('name')).toBe('asc');
    expect(getInitialOrder('accuracy')).toBe('desc');
  });
});

describe('getToggledSort', () => {
  it('같은 기준이면 방향을 뒤집는다', () => {
    expect(getToggledSort({ sort: 'pp', order: 'desc' }, 'pp')).toEqual({
      sort: 'pp',
      order: 'asc',
    });
  });

  it('다른 기준이면 그 기준의 첫 방향부터', () => {
    expect(getToggledSort({ sort: 'name', order: 'asc' }, 'power')).toEqual({
      sort: 'power',
      order: 'desc',
    });
    expect(getToggledSort({ sort: 'power', order: 'asc' }, 'name')).toEqual({
      sort: 'name',
      order: 'asc',
    });
  });
});

describe('getKeySelectedSort', () => {
  it('같은 기준이면 방향을 바꾸지 않는다', () => {
    expect(getKeySelectedSort({ sort: 'pp', order: 'asc' }, 'pp')).toEqual({
      sort: 'pp',
      order: 'asc',
    });
  });

  it('다른 기준이면 그 기준의 첫 방향부터', () => {
    expect(
      getKeySelectedSort({ sort: 'name', order: 'desc' }, 'power'),
    ).toEqual({ sort: 'power', order: 'desc' });
    expect(getKeySelectedSort({ sort: 'power', order: 'asc' }, 'name')).toEqual(
      { sort: 'name', order: 'asc' },
    );
  });
});

describe('getOrderOptions', () => {
  it('순서형: 이름순 → 이름 반대순', () => {
    expect(getOrderOptions('name')).toEqual([
      { order: 'asc', label: '이름순' },
      { order: 'desc', label: '이름 반대순' },
    ]);
  });

  it('수치형: 높은 순 → 낮은 순', () => {
    expect(getOrderOptions('accuracy')).toEqual([
      { order: 'desc', label: '높은 순' },
      { order: 'asc', label: '낮은 순' },
    ]);
  });
});
