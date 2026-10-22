import { describe, it, expect } from 'vitest';

import { makePoke, names } from '../base-stats-poke.fixture';

import {
  countMatchesInOtherLanguages,
  filterPokesByKeyword,
} from './poke-search';

const GALAR = {
  identifier: 'galar',
  nameKo: '가라르의 모습',
  nameEn: 'Galarian',
  nameJa: 'ガラルのすがた',
  shortKo: '가라르',
};

const pokes = [
  makePoke({
    pokeKey: 'pikachu',
    nameKo: '피카츄',
    nameEn: 'Pikachu',
    nameJa: 'ピカチュウ',
    dexNumber: 25,
  }),
  makePoke({
    pokeKey: 'raichu',
    nameKo: '라이츄',
    nameEn: 'Raichu',
    nameJa: 'ライチュウ',
    dexNumber: 26,
  }),
  makePoke({
    pokeKey: 'meowth',
    nameKo: '나옹',
    nameEn: 'Meowth',
    nameJa: 'ニャース',
    dexNumber: 52,
  }),
  makePoke({
    pokeKey: 'meowth-galar',
    nameKo: '나옹',
    nameEn: 'Meowth',
    nameJa: 'ニャース',
    dexNumber: 52,
    sortOrder: 2,
    form: GALAR,
  }),
];

const keys = (list: typeof pokes) => list.map((poke) => poke.pokeKey);

describe('filterPokesByKeyword', () => {
  it('고른 언어의 이름으로만 찾는다 (영문 대소문자 무시)', () => {
    expect(names(filterPokesByKeyword(pokes, '츄', 'ko'))).toEqual([
      '피카츄',
      '라이츄',
    ]);
    expect(filterPokesByKeyword(pokes, 'pika', 'ko')).toEqual([]);
    expect(keys(filterPokesByKeyword(pokes, 'PIKA', 'en'))).toEqual([
      'pikachu',
    ]);
    expect(filterPokesByKeyword(pokes, '피카', 'en')).toEqual([]);
  });

  it('폼 이름도 그 언어로 찾는다', () => {
    expect(keys(filterPokesByKeyword(pokes, '가라르', 'ko'))).toEqual([
      'meowth-galar',
    ]);
    expect(keys(filterPokesByKeyword(pokes, 'galarian', 'en'))).toEqual([
      'meowth-galar',
    ]);
  });

  it('일본어는 히라가나로 쳐도 가타카나 이름이 찾힌다', () => {
    expect(keys(filterPokesByKeyword(pokes, 'ぴかちゅう', 'ja'))).toEqual([
      'pikachu',
    ]);
    expect(keys(filterPokesByKeyword(pokes, 'ガラル', 'ja'))).toEqual([
      'meowth-galar',
    ]);
  });

  it('도감 번호는 언어와 상관없이 찾는다 (앞의 0·공백 무시, 일부는 안 됨)', () => {
    expect(keys(filterPokesByKeyword(pokes, '025', 'en'))).toEqual(['pikachu']);
    expect(keys(filterPokesByKeyword(pokes, ' 26 ', 'ko'))).toEqual(['raichu']);
    expect(filterPokesByKeyword(pokes, '2', 'ja')).toEqual([]);
  });

  it('검색어가 비면 전부', () => {
    expect(filterPokesByKeyword(pokes, ' ', 'en')).toHaveLength(4);
  });
});

describe('countMatchesInOtherLanguages', () => {
  it('다른 언어에서 찾히는 수 (찾히는 언어만)', () => {
    expect(countMatchesInOtherLanguages(pokes, 'chu', 'ko')).toEqual([
      { language: 'en', count: 2 },
    ]);
    expect(countMatchesInOtherLanguages(pokes, '나옹', 'en')).toEqual([
      { language: 'ko', count: 2 },
    ]);
  });

  it('도감 번호·빈 검색어는 세지 않는다', () => {
    expect(countMatchesInOtherLanguages(pokes, '25', 'ko')).toEqual([]);
    expect(countMatchesInOtherLanguages(pokes, '', 'ko')).toEqual([]);
  });
});
