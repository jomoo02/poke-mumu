import { describe, it, expect } from 'vitest';

import { makePoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke.fixture';

import { sortPokesByLanguage } from './name-language';

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

describe('sortPokesByLanguage', () => {
  it('이름순은 고른 언어의 이름으로, 같은 이름(폼)은 기본 순서, desc는 동점도 거꾸로', () => {
    expect(
      keys(sortPokesByLanguage(pokes, { sort: 'name', order: 'asc' }, 'en')),
    ).toEqual(['meowth', 'meowth-galar', 'pikachu', 'raichu']);
    expect(
      keys(sortPokesByLanguage(pokes, { sort: 'name', order: 'desc' }, 'en')),
    ).toEqual(['raichu', 'pikachu', 'meowth-galar', 'meowth']);
  });

  it('한국어 이름순·다른 기준은 기존 정렬과 같다', () => {
    expect(
      keys(sortPokesByLanguage(pokes, { sort: 'name', order: 'asc' }, 'ko')),
    ).toEqual(['meowth', 'meowth-galar', 'raichu', 'pikachu']);
  });
});
