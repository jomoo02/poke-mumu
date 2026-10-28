import { describe, it, expect } from 'vitest';

import { sortPokes, type PokeSort } from './sort-pokes';
import { makePoke } from '../base-stats-poke.fixture';
import type { BaseStatsPoke } from '../base-stats-poke';

const keys = (list: BaseStatsPoke[]) => list.map((poke) => poke.pokeKey);

const sortKeys = (...args: Parameters<typeof sortPokes>) =>
  keys(sortPokes(...args));

const asc = (sort: PokeSort['sort']): PokeSort => ({ sort, order: 'asc' });
const desc = (sort: PokeSort['sort']): PokeSort => ({ sort, order: 'desc' });

describe('sortPokes', () => {
  const pokes = [
    makePoke({
      pokeKey: 'meowth-galar',
      nameKo: '나옹',
      nameEn: 'Meowth',
      nameJa: 'ニャース',
      dexNumber: 52,
      sortOrder: 3,
      stats: { speed: 40 },
    }),
    makePoke({
      pokeKey: 'pikachu',
      nameKo: '피카츄',
      nameEn: 'Pikachu',
      nameJa: 'ピカチュウ',
      dexNumber: 25,
      stats: { speed: 90 },
    }),
    makePoke({
      pokeKey: 'meowth',
      nameKo: '나옹',
      nameEn: 'Meowth',
      nameJa: 'ニャース',
      dexNumber: 52,
      sortOrder: 1,
      stats: { speed: 90 },
    }),
    makePoke({
      pokeKey: 'bulbasaur',
      nameKo: '이상해씨',
      nameEn: 'Bulbasaur',
      nameJa: 'フシギダネ',
      dexNumber: 1,
      stats: { speed: 45 },
    }),
  ];

  it('도감 번호 asc: 같은 번호는 폼 순서', () => {
    expect(sortKeys(pokes, asc('dexNumber'))).toEqual([
      'bulbasaur',
      'pikachu',
      'meowth',
      'meowth-galar',
    ]);
  });

  it('도감 번호 desc: 같은 번호의 폼도 거꾸로', () => {
    expect(sortKeys(pokes, desc('dexNumber'))).toEqual([
      'meowth-galar',
      'meowth',
      'pikachu',
      'bulbasaur',
    ]);
  });

  it('이름 asc: 가나다순, 같은 이름은 기본 정렬 순서', () => {
    expect(sortKeys(pokes, asc('name'))).toEqual([
      'meowth',
      'meowth-galar',
      'bulbasaur',
      'pikachu',
    ]);
  });

  it('이름 desc: 같은 이름은 기본 정렬의 반대 순서', () => {
    expect(sortKeys(pokes, desc('name'))).toEqual([
      'pikachu',
      'bulbasaur',
      'meowth-galar',
      'meowth',
    ]);
  });

  it('능력치 desc: 같은 값은 번호 반대순', () => {
    expect(sortKeys(pokes, desc('speed'))).toEqual([
      'meowth',
      'pikachu',
      'bulbasaur',
      'meowth-galar',
    ]);
  });

  it('능력치 asc', () => {
    expect(sortKeys(pokes, asc('speed'))).toEqual([
      'meowth-galar',
      'bulbasaur',
      'pikachu',
      'meowth',
    ]);
  });

  it('영어 이름순: 영어 이름으로, 같은 이름은 기본 정렬 순서', () => {
    expect(sortKeys(pokes, asc('name'), 'en')).toEqual([
      'bulbasaur',
      'meowth',
      'meowth-galar',
      'pikachu',
    ]);
  });

  it('영어 이름순은 대소문자·악센트를 무시한다 (같은 이름은 기본 정렬 순서)', () => {
    const flabebe = [
      makePoke({
        pokeKey: 'b',
        nameKo: '플라베베',
        nameEn: 'Flabebe',
        dexNumber: 669,
        sortOrder: 2,
      }),
      makePoke({
        pokeKey: 'a',
        nameKo: '플라베베',
        nameEn: 'flabébé',
        dexNumber: 669,
        sortOrder: 1,
      }),
    ];
    expect(sortKeys(flabebe, asc('name'), 'en')).toEqual(['a', 'b']);
  });

  it('일본어 이름순: 오십음도 순', () => {
    expect(sortKeys(pokes, asc('name'), 'ja')).toEqual([
      'meowth',
      'meowth-galar',
      'pikachu',
      'bulbasaur',
    ]);
  });

  it('desc는 asc를 정확히 뒤집은 목록이다 (동점 포함, 모든 언어)', () => {
    for (const language of ['ko', 'en', 'ja'] as const) {
      for (const sort of ['dexNumber', 'name', 'speed'] as const) {
        expect(sortKeys(pokes, desc(sort), language)).toEqual(
          sortKeys(pokes, asc(sort), language).reverse(),
        );
      }
    }
  });
});
