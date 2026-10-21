import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { pokeSearchParams } from './search-params';

const load = createLoader(pokeSearchParams);

describe('pokeSearchParams', () => {
  it('값이 없으면 기본값', () => {
    expect(load('')).toEqual({
      search: '',
      filter: [],
      sort: 'dexNumber',
      order: 'asc',
    });
  });

  it('종족값 기준 정렬', () => {
    expect(load('?sort=specialAttack&order=desc')).toMatchObject({
      sort: 'specialAttack',
      order: 'desc',
    });
  });

  it('잘못된 정렬·방향은 기본값', () => {
    expect(load('?sort=foo&order=up')).toMatchObject({
      sort: 'dexNumber',
      order: 'asc',
    });
  });

  it('filter는 URL 순서대로', () => {
    expect(load('?filter=type.flying_type.fire').filter).toEqual([
      { group: 'type', value: 'flying' },
      { group: 'type', value: 'fire' },
    ]);
  });
});
