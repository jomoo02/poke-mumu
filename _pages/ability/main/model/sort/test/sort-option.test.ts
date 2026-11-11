import { describe, it, expect } from 'vitest';

import { SORT_KEYS } from '../sort-abilities';
import {
  SORT_OPTIONS,
  getOrderLabel,
  getSortLabel,
  getSortOptionAriaLabel,
  getToggledSort,
} from '../sort-option';

describe('SORT_OPTIONS', () => {
  it('모든 정렬 키가 옵션을 가진다 (특성번호 · 이름 · 등장)', () => {
    expect(SORT_OPTIONS.map((option) => option.key)).toEqual([...SORT_KEYS]);
  });
});

describe('getSortLabel', () => {
  it('기준 이름을 붙인다', () => {
    expect(getSortLabel({ sort: 'abilityNumber', order: 'asc' })).toBe(
      '특성번호순',
    );
    expect(getSortLabel({ sort: 'abilityNumber', order: 'desc' })).toBe(
      '특성번호 반대순',
    );
    expect(getSortLabel({ sort: 'name', order: 'desc' })).toBe('이름 반대순');
    expect(getSortLabel({ sort: 'appearance', order: 'asc' })).toBe('등장순');
  });
});

describe('getOrderLabel', () => {
  it('앞에 기준 이름이 있어 짧게', () => {
    expect(getOrderLabel({ sort: 'abilityNumber', order: 'asc' })).toBe(
      '번호순',
    );
    expect(getOrderLabel({ sort: 'appearance', order: 'desc' })).toBe(
      '등장 반대순',
    );
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

describe('getSortOptionAriaLabel', () => {
  it('고른 기준: 지금 방향과 다시 누르면 바뀔 방향', () => {
    expect(
      getSortOptionAriaLabel(
        { sort: 'abilityNumber', order: 'asc' },
        'abilityNumber',
      ),
    ).toBe('특성번호, 번호순. 다시 누르면 번호 반대순');
  });

  it('다른 기준: 누르면 될 정렬', () => {
    expect(
      getSortOptionAriaLabel({ sort: 'abilityNumber', order: 'desc' }, 'name'),
    ).toBe('이름, 이름순');
  });
});
