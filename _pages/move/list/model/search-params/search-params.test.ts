import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { moveSearchParams } from './search-params';

const load = createLoader(moveSearchParams);

describe('moveSearchParams', () => {
  it('값이 없으면 기본값', () => {
    expect(load('')).toEqual({
      search: '',
      filter: [],
      sort: 'moveNumber',
      order: 'asc',
      page: 1,
    });
  });

  it('잘못된 정렬·방향은 기본값', () => {
    expect(load('?sort=foo&order=up')).toMatchObject({
      sort: 'moveNumber',
      order: 'asc',
    });
  });

  it('page: 문자열·0·음수는 1, 소수는 버림', () => {
    expect(load('?page=abc').page).toBe(1);
    expect(load('?page=0').page).toBe(1);
    expect(load('?page=-3').page).toBe(1);
    expect(load('?page=2.7').page).toBe(2);
  });

  it('filter는 URL 순서대로', () => {
    expect(
      load('?filter=type.fire_damageClass.physical_type.grass').filter,
    ).toEqual([
      { group: 'type', value: 'fire' },
      { group: 'damageClass', value: 'physical' },
      { group: 'type', value: 'grass' },
    ]);
  });

  it('검색어', () => {
    expect(load('?search=%EB%83%89%EB%8F%99').search).toBe('냉동');
  });
});
