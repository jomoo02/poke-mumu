import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from '../sort-abilities';
import {
  SORT_OPTIONS,
  getSortLabel,
  getToggledSort,
  getKeySelectedSort,
  getOrderOptions,
} from '../sort-option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다 (이름 · 등장)', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('기준 이름을 붙인다', () => {
    expect(getSortLabel({ sort: 'name', order: 'asc' })).toBe('이름순');
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 반대순');
    expect(getSortLabel({ sort: 'appearance', order: 'asc' })).toBe('등장순');
  });
});

describe('getToggledSort', () => {
  it('같은 기준이면 방향을 뒤집는다', () => {
    expect(getToggledSort({ sort: 'name', order: 'asc' }, 'name')).toEqual({
      sort: 'name',
      order: 'desc',
    });
  });

  it('다른 기준이면 asc부터', () => {
    expect(
      getToggledSort({ sort: 'name', order: 'desc' }, 'appearance'),
    ).toEqual({ sort: 'appearance', order: 'asc' });
  });
});

describe('getKeySelectedSort', () => {
  it('같은 기준이면 방향을 바꾸지 않는다', () => {
    expect(getKeySelectedSort({ sort: 'name', order: 'desc' }, 'name')).toEqual(
      { sort: 'name', order: 'desc' },
    );
  });

  it('다른 기준이면 asc부터', () => {
    expect(
      getKeySelectedSort({ sort: 'name', order: 'desc' }, 'appearance'),
    ).toEqual({ sort: 'appearance', order: 'asc' });
  });
});

describe('getOrderOptions', () => {
  it('지금 기준의 두 방향을 asc → desc 순으로', () => {
    expect(getOrderOptions('appearance')).toEqual([
      { order: 'asc', label: '등장순' },
      { order: 'desc', label: '등장 반대순' },
    ]);
  });
});
