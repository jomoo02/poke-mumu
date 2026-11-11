import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from '../sort-moves';
import {
  SORT_OPTIONS,
  getInitialOrder,
  getOrderLabel,
  getSortLabel,
  getSortOptionAriaLabel,
  getToggledSort,
} from '../sort-option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다 (기술번호 · 이름 · 위력 · 명중 · PP)', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('순서형: 기준 이름을 붙인다', () => {
    expect(getSortLabel({ sort: 'moveNumber', order: 'asc' })).toBe(
      '기술번호순',
    );
    expect(getSortLabel({ sort: 'moveNumber', order: 'desc' })).toBe(
      '기술번호 반대순',
    );
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 반대순');
  });

  it('수치형: {기준} 높은 순 / {기준} 낮은 순', () => {
    expect(getSortLabel({ sort: 'power', order: 'desc' })).toBe('위력 높은 순');
    expect(getSortLabel({ sort: 'pp', order: 'asc' })).toBe('PP 낮은 순');
  });
});

describe('getInitialOrder', () => {
  it('순서형은 asc, 수치형은 desc부터', () => {
    expect(getInitialOrder('moveNumber')).toBe('asc');
    expect(getInitialOrder('name')).toBe('asc');
    expect(getInitialOrder('accuracy')).toBe('desc');
  });
});

describe('getOrderLabel', () => {
  it('앞에 기준 이름이 있어 짧게', () => {
    expect(getOrderLabel({ sort: 'moveNumber', order: 'desc' })).toBe(
      '번호 반대순',
    );
    expect(getOrderLabel({ sort: 'power', order: 'asc' })).toBe('낮은 순');
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

describe('getSortOptionAriaLabel', () => {
  it('고른 기준: 지금 방향과 다시 누르면 바뀔 방향', () => {
    expect(
      getSortOptionAriaLabel({ sort: 'power', order: 'desc' }, 'power'),
    ).toBe('위력, 높은 순. 다시 누르면 낮은 순');
  });

  it('다른 기준: 그 기준의 첫 방향', () => {
    expect(
      getSortOptionAriaLabel({ sort: 'power', order: 'desc' }, 'moveNumber'),
    ).toBe('기술번호, 번호순');
    expect(getSortOptionAriaLabel({ sort: 'name', order: 'asc' }, 'pp')).toBe(
      'PP, 높은 순',
    );
  });
});
