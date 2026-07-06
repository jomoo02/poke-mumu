// model/sort.test.ts
import { describe, it, expect } from 'vitest';
import {
  parseSort,
  getSortLabel,
  DEFAULT_SORT_KEY,
  DEFAULT_SORT_DIR,
} from './sort';

describe('parseSort', () => {
  it('빈 파라미터 → 기본값', () => {
    expect(parseSort(new URLSearchParams())).toEqual({
      key: DEFAULT_SORT_KEY,
      dir: DEFAULT_SORT_DIR,
    });
  });
  it('무효 키 → 기본 키, dir은 독립 유지', () => {
    expect(parseSort(new URLSearchParams('sort=nope&dir=desc'))).toEqual({
      key: DEFAULT_SORT_KEY,
      dir: 'desc',
    });
  });
});

describe('getSortLabel', () => {
  it.each([
    ['attack', 'desc', '공격 높은 순'],
    ['attack', 'asc', '공격 낮은 순'],
    ['dex_number', 'desc', '도감번호 역순'],
    ['name', 'asc', '이름 순'],
  ])('%s/%s → %s', (key, dir, expected) => {
    expect(getSortLabel(key, dir as 'asc' | 'desc')).toBe(expected);
  });
});
