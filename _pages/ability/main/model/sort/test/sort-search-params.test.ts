import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { sortSearchParams } from '../sort-search-params';

const load = createLoader(sortSearchParams);

describe('sortSearchParams', () => {
  it('값이 없으면 이름순', () => {
    expect(load('')).toEqual({ sort: 'name', order: 'asc' });
  });

  it('등장 반대순', () => {
    expect(load('?sort=appearance&order=desc')).toEqual({
      sort: 'appearance',
      order: 'desc',
    });
  });

  it('잘못된 정렬·방향과 없어진 번호 정렬은 기본값', () => {
    expect(load('?sort=foo&order=up')).toEqual({ sort: 'name', order: 'asc' });
    expect(load('?sort=abilityNumber').sort).toBe('name');
  });
});
