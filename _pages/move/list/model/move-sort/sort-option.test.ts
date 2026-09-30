import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from './sort';
import {
  SORT_OPTIONS,
  getInitialOrder,
  getOrderLabel,
  getSortKeyLabel,
  getSortLabel,
} from './sort-option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('순서형: 순 / 역순', () => {
    expect(getSortLabel({ sort: 'name', order: 'asc' })).toBe('이름 순');
    expect(getSortLabel({ sort: 'moveNumber', order: 'desc' })).toBe(
      '번호 역순',
    );
    expect(getSortLabel({ sort: 'type', order: 'desc' })).toBe('타입 역순');
  });

  it('수치형: 높은 순 / 낮은 순', () => {
    expect(getSortLabel({ sort: 'power', order: 'desc' })).toBe('위력 높은 순');
    expect(getSortLabel({ sort: 'pp', order: 'asc' })).toBe('PP 낮은 순');
  });
});

describe('getOrderLabel', () => {
  it('순서형: 순 / 역순', () => {
    expect(getOrderLabel('name', 'asc')).toBe('순');
    expect(getOrderLabel('damageClass', 'desc')).toBe('역순');
  });

  it('수치형: 높은 순 / 낮은 순', () => {
    expect(getOrderLabel('power', 'desc')).toBe('높은 순');
    expect(getOrderLabel('accuracy', 'asc')).toBe('낮은 순');
  });

  it('같은 방향이라도 기준의 종류에 따라 라벨이 바뀐다', () => {
    expect(getOrderLabel('type', 'asc')).toBe('순');
    expect(getOrderLabel('pp', 'asc')).toBe('낮은 순');
  });
});

describe('getInitialOrder', () => {
  it('순서형은 asc, 수치형은 desc부터', () => {
    expect(getInitialOrder('name')).toBe('asc');
    expect(getInitialOrder('damageClass')).toBe('asc');
    expect(getInitialOrder('power')).toBe('desc');
    expect(getInitialOrder('accuracy')).toBe('desc');
  });
});

describe('getSortKeyLabel', () => {
  it('방향 없이 기준 이름만', () => {
    expect(getSortKeyLabel('moveNumber')).toBe('번호');
    expect(getSortKeyLabel('power')).toBe('위력');
  });
});
