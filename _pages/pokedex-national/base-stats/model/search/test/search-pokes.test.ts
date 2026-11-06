import { describe, it, expect } from 'vitest';

import type { BaseStatsPokeForm } from '../../poke';
import { makePoke, names } from '../../poke';

import { filterPokesByKeyword } from '../search-pokes';

const GALAR: BaseStatsPokeForm = {
  identifier: 'galar',
  nameKo: '가라르의 모습',
  shortKo: '가라르',
  group: 'galar',
};

const pokes = [
  makePoke({
    pokeKey: 'pikachu',
    nameKo: '피카츄',
    dexNumber: 25,
  }),
  makePoke({
    pokeKey: 'raichu',
    nameKo: '라이츄',
    dexNumber: 26,
  }),
  makePoke({
    pokeKey: 'meowth',
    nameKo: '나옹',
    dexNumber: 52,
  }),
  makePoke({
    pokeKey: 'meowth-galar',
    nameKo: '나옹',
    dexNumber: 52,
    sortOrder: 2,
    form: GALAR,
  }),
];

const keys = (list: typeof pokes) => list.map((poke) => poke.pokeKey);

describe('filterPokesByKeyword', () => {
  it('이름으로 찾는다', () => {
    expect(names(filterPokesByKeyword(pokes, '츄'))).toEqual([
      '피카츄',
      '라이츄',
    ]);
  });

  it('폼 이름으로도 찾는다', () => {
    expect(keys(filterPokesByKeyword(pokes, '가라르'))).toEqual([
      'meowth-galar',
    ]);
  });

  it('도감 번호로 찾는다 (앞의 0·공백 무시, 일부는 안 됨)', () => {
    expect(keys(filterPokesByKeyword(pokes, '025'))).toEqual(['pikachu']);
    expect(keys(filterPokesByKeyword(pokes, ' 26 '))).toEqual(['raichu']);
    expect(filterPokesByKeyword(pokes, '2')).toEqual([]);
  });

  it('검색어가 비면 전부', () => {
    expect(filterPokesByKeyword(pokes, ' ')).toHaveLength(4);
  });
});
