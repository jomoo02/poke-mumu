import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { sortSearchParams } from '../sort-search-params';

const load = createLoader(sortSearchParams);

describe('sortSearchParams', () => {
  it('값이 없으면 특성번호순', () => {
    expect(load('')).toEqual({ sort: 'abilityNumber', order: 'asc' });
  });

  it('등장 반대순', () => {
    expect(load('?sort=appearance&order=desc')).toEqual({
      sort: 'appearance',
      order: 'desc',
    });
  });

  it('잘못된 정렬·방향은 기본값', () => {
    expect(load('?sort=foo&order=up')).toEqual({
      sort: 'abilityNumber',
      order: 'asc',
    });
  });
});
