import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { POKE_FILTER_GROUPS } from './filter-option';
import {
  FILTER_RESET_PATCH,
  filterSearchParams,
} from './filter-search-params';

const load = createLoader(filterSearchParams);

describe('filterSearchParams', () => {
  it('그룹마다 키가 있다', () => {
    expect(Object.keys(filterSearchParams)).toEqual([...POKE_FILTER_GROUPS]);
  });

  it('값이 없으면 모두 빈 배열', () => {
    expect(load('')).toEqual({ type: [], form: [], gen: [] });
  });

  it('필터는 그룹마다 키, 값은 쉼표로 URL 순서대로', () => {
    expect(load('?type=flying,fire&form=alola&gen=1')).toEqual({
      type: ['flying', 'fire'],
      form: ['alola'],
      gen: ['1'],
    });
  });

  it('검색어·이름 언어·정렬 키는 읽지 않는다', () => {
    expect(load('?search=피카&lang=en&sort=hp&type=fire')).toEqual({
      type: ['fire'],
      form: [],
      gen: [],
    });
  });
});

describe('FILTER_RESET_PATCH', () => {
  it('필터 키만 모두 지운다 (검색어·이름 언어·정렬은 두기)', () => {
    expect(FILTER_RESET_PATCH).toEqual({ type: null, form: null, gen: null });
  });
});
