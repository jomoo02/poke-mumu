import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { abilitySearchParams } from './search-params';

const load = createLoader(abilitySearchParams);

describe('abilitySearchParams', () => {
  it('값이 없으면 기본값', () => {
    expect(load('')).toEqual({
      search: '',
      sort: 'abilityNumber',
      order: 'asc',
      page: 1,
    });
  });

  it('잘못된 정렬·방향은 기본값', () => {
    expect(load('?sort=foo&order=up')).toMatchObject({
      sort: 'abilityNumber',
      order: 'asc',
    });
  });

  it('page: 문자열·0·음수는 1, 소수는 버림', () => {
    expect(load('?page=abc').page).toBe(1);
    expect(load('?page=0').page).toBe(1);
    expect(load('?page=-3').page).toBe(1);
    expect(load('?page=2.7').page).toBe(2);
  });

  it('검색어', () => {
    expect(load('?search=%EB%A7%B9%ED%99%94').search).toBe('맹화');
  });
});
