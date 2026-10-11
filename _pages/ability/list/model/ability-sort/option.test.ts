import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from './ability-sort';
import { SORT_OPTIONS, getSortLabel } from './option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('번호: 번호순 / 번호 역순', () => {
    expect(getSortLabel({ sort: 'abilityNumber', order: 'asc' })).toBe(
      '번호순',
    );
    expect(getSortLabel({ sort: 'abilityNumber', order: 'desc' })).toBe(
      '번호 역순',
    );
  });

  it('이름: 이름순 / 이름 역순', () => {
    expect(getSortLabel({ sort: 'name', order: 'asc' })).toBe('이름순');
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 역순');
  });

  it('등장: 등장순 / 등장 역순', () => {
    expect(getSortLabel({ sort: 'appearance', order: 'asc' })).toBe('등장순');
    expect(getSortLabel({ sort: 'appearance', order: 'desc' })).toBe(
      '등장 역순',
    );
  });
});
