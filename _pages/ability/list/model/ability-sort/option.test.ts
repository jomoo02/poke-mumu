import { describe, it, expect } from 'vitest';

import { DEFAULT_SORT } from './sort';
import {
  SORT_OPTIONS,
  getSortById,
  getSortId,
  getSortLabel,
} from './sort-option';

describe('getSortId / getSortById', () => {
  it('모든 옵션이 id ↔ 정렬 객체로 왕복 변환된다', () => {
    for (const option of SORT_OPTIONS) {
      const sort = { sort: option.sort, order: option.order };

      expect(getSortId(sort)).toBe(option.id);
      expect(getSortById(option.id)).toEqual(sort);
    }
  });

  it('알 수 없는 id는 기본 정렬로 되돌린다', () => {
    expect(getSortById('hp-asc')).toEqual(DEFAULT_SORT);
    expect(getSortById('')).toEqual(DEFAULT_SORT);
  });
});

describe('getSortLabel', () => {
  it('정렬 기준과 방향에 맞는 라벨', () => {
    expect(getSortLabel({ sort: 'name', order: 'asc' })).toBe('이름 순서');
    expect(getSortLabel({ sort: 'appearance', order: 'desc' })).toBe(
      '등장 반대순서',
    );
  });
});
