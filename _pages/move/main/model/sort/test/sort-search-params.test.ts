import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { sortSearchParams } from '../sort-search-params';

const load = createLoader(sortSearchParams);

describe('sortSearchParams', () => {
  it('값이 없으면 기술번호순', () => {
    expect(load('')).toEqual({ sort: 'moveNumber', order: 'asc' });
  });

  it('위력 높은 순', () => {
    expect(load('?sort=power&order=desc')).toEqual({
      sort: 'power',
      order: 'desc',
    });
  });

  it('잘못된 정렬·방향은 기본값', () => {
    expect(load('?sort=foo&order=up')).toEqual({
      sort: 'moveNumber',
      order: 'asc',
    });
  });
});
