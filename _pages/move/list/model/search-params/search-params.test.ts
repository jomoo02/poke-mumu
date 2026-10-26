import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { moveSearchParams } from './search-params';

const load = createLoader(moveSearchParams);

describe('moveSearchParams', () => {
  it('값이 없으면 기본값', () => {
    expect(load('')).toEqual({
      search: '',
      type: [],
      damageClass: [],
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

  it('필터는 그룹마다 키, 값은 쉼표로 URL 순서대로', () => {
    expect(load('?type=fire,grass&damageClass=physical')).toMatchObject({
      type: ['fire', 'grass'],
      damageClass: ['physical'],
    });
  });

  it('검색어', () => {
    expect(load('?search=%EB%83%89%EB%8F%99').search).toBe('냉동');
  });
});
