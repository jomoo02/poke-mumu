import { describe, it, expect } from 'vitest';

import { sortPokes, type PokeSort } from './poke-sort';
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
      dexNumber: 52,
      sortOrder: 3,
      stats: { speed: 40 },
    }),
    makePoke({
      pokeKey: 'pikachu',
      nameKo: '피카츄',
      dexNumber: 25,
      stats: { speed: 90 },
    }),
    makePoke({
      pokeKey: 'meowth',
      nameKo: '나옹',
      dexNumber: 52,
      sortOrder: 1,
      stats: { speed: 90 },
    }),
    makePoke({
      pokeKey: 'bulbasaur',
      nameKo: '이상해씨',
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

  it('도감 번호 desc: 같은 번호의 폼은 뒤집지 않는다', () => {
    expect(sortKeys(pokes, desc('dexNumber'))).toEqual([
      'meowth',
      'meowth-galar',
      'pikachu',
      'bulbasaur',
    ]);
  });

  it('이름: 가나다순, 같은 이름은 기본 정렬 순서', () => {
    expect(sortKeys(pokes, asc('name'))).toEqual([
      'meowth',
      'meowth-galar',
      'bulbasaur',
      'pikachu',
    ]);
  });

  it('능력치 desc: 같은 값은 방향과 무관하게 번호순', () => {
    expect(sortKeys(pokes, desc('speed'))).toEqual([
      'pikachu',
      'meowth',
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
});
