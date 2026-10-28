import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { pokeSearchParams } from './search-params';

const load = createLoader(pokeSearchParams);

describe('pokeSearchParams', () => {
  it('값이 없으면 기본값', () => {
    expect(load('')).toEqual({
      search: '',
      type: [],
      form: [],
      gen: [],
      sort: 'dexNumber',
      order: 'asc',
      lang: 'ko',
      page: 1,
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

  it('이름 언어. 잘못된 값은 기본값(한국어)', () => {
    expect(load('?lang=ja').lang).toBe('ja');
    expect(load('?lang=fr').lang).toBe('ko');
  });

  it('페이지. 잘못된 값은 1', () => {
    expect(load('?page=3').page).toBe(3);
    expect(load('?page=0').page).toBe(1);
    expect(load('?page=foo').page).toBe(1);
  });

  it('필터는 그룹마다 키, 값은 쉼표로 URL 순서대로', () => {
    expect(load('?type=flying,fire&form=alola&gen=1')).toMatchObject({
      type: ['flying', 'fire'],
      form: ['alola'],
      gen: ['1'],
    });
  });
});
