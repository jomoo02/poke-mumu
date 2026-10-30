import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { sortSearchParams } from './sort-search-params';

const load = createLoader(sortSearchParams);

describe('sortSearchParams', () => {
  it('값이 없으면 도감번호순', () => {
    expect(load('')).toEqual({ sort: 'dexNumber', order: 'asc' });
  });

  it('종족값 기준 정렬', () => {
    expect(load('?sort=specialAttack&order=desc')).toEqual({
      sort: 'specialAttack',
      order: 'desc',
    });
  });

  it('잘못된 정렬·방향은 기본값', () => {
    expect(load('?sort=foo&order=up')).toEqual({
      sort: 'dexNumber',
      order: 'asc',
    });
  });
});
