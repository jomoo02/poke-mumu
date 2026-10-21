import { describe, it, expect } from 'vitest';

import {
  makePoke,
  names,
} from '@/_pages/pokedex/national-base-stats-v0/model/base-stats-poke.fixture';

import {
  countMatchesInOtherLanguages,
  filterPokesByNameKeyword,
  getNameByLanguage,
  sortPokesByLanguage,
} from './name-language';

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

describe('getNameByLanguage', () => {
  it('언어별 이름. 폼은 약칭이 있을 때만 괄호로 붙인다', () => {
    expect(getNameByLanguage(pokes[3], 'ko')).toBe('나옹 (가라르)');
    expect(getNameByLanguage(pokes[3], 'en')).toBe('Meowth (Galarian)');
    expect(getNameByLanguage(pokes[3], 'ja')).toBe('ニャース (ガラルのすがた)');
    expect(getNameByLanguage(pokes[0], 'en')).toBe('Pikachu');
  });

  it('이름에 폼이 들어간 경우(약칭 없음)는 붙이지 않는다', () => {
    const mega = makePoke({
      nameKo: '메가리자몽X',
      nameEn: 'Mega Charizard X',
      form: { ...GALAR, shortKo: null },
    });
    expect(getNameByLanguage(mega, 'en')).toBe('Mega Charizard X');
  });
});

describe('filterPokesByNameKeyword', () => {
  it('고른 언어의 이름으로만 찾는다', () => {
    expect(names(filterPokesByNameKeyword(pokes, '츄', 'ko'))).toEqual([
      '피카츄',
      '라이츄',
    ]);
    expect(filterPokesByNameKeyword(pokes, 'pika', 'ko')).toEqual([]);
    expect(keys(filterPokesByNameKeyword(pokes, 'PIKA', 'en'))).toEqual([
      'pikachu',
    ]);
    expect(filterPokesByNameKeyword(pokes, '피카', 'en')).toEqual([]);
  });

  it('폼 이름도 그 언어로 찾는다', () => {
    expect(keys(filterPokesByNameKeyword(pokes, '가라르', 'ko'))).toEqual([
      'meowth-galar',
    ]);
    expect(keys(filterPokesByNameKeyword(pokes, 'galarian', 'en'))).toEqual([
      'meowth-galar',
    ]);
  });

  it('일본어는 히라가나로 쳐도 가타카나 이름이 찾힌다', () => {
    expect(keys(filterPokesByNameKeyword(pokes, 'ぴかちゅう', 'ja'))).toEqual([
      'pikachu',
    ]);
    expect(keys(filterPokesByNameKeyword(pokes, 'ガラル', 'ja'))).toEqual([
      'meowth-galar',
    ]);
  });

  it('도감 번호는 언어와 상관없이 찾는다 (앞의 0 무시, 일부는 안 됨)', () => {
    expect(keys(filterPokesByNameKeyword(pokes, '025', 'en'))).toEqual([
      'pikachu',
    ]);
    expect(filterPokesByNameKeyword(pokes, '2', 'ja')).toEqual([]);
  });

  it('검색어가 비면 전부', () => {
    expect(filterPokesByNameKeyword(pokes, ' ', 'en')).toHaveLength(4);
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

describe('sortPokesByLanguage', () => {
  it('이름순은 고른 언어의 이름으로, 같은 이름(폼)은 방향과 무관하게 기본 순서', () => {
    expect(
      keys(sortPokesByLanguage(pokes, { sort: 'name', order: 'asc' }, 'en')),
    ).toEqual(['meowth', 'meowth-galar', 'pikachu', 'raichu']);
    expect(
      keys(sortPokesByLanguage(pokes, { sort: 'name', order: 'desc' }, 'en')),
    ).toEqual(['raichu', 'pikachu', 'meowth', 'meowth-galar']);
  });

  it('한국어 이름순·다른 기준은 기존 정렬과 같다', () => {
    expect(
      keys(sortPokesByLanguage(pokes, { sort: 'name', order: 'asc' }, 'ko')),
    ).toEqual(['meowth', 'meowth-galar', 'raichu', 'pikachu']);
  });
});
