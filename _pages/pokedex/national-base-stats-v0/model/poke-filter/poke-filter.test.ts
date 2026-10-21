import { describe, it, expect } from 'vitest';

import { filterPokes, parsePokeFilter } from './poke-filter';
import { makePoke, names } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke.fixture';

const facet = (group: string, value: string) => ({ group, value });

describe('parsePokeFilter', () => {
  it('고른 순서대로 타입을 남긴다', () => {
    const facets = [facet('type', 'flying'), facet('type', 'fire')];

    expect(parsePokeFilter(facets)).toEqual({
      types: ['flying', 'fire'],
      selections: facets,
    });
  });

  it('모르는 그룹, 유효하지 않은 identifier, 중복은 뺀다', () => {
    expect(
      parsePokeFilter([
        facet('type', 'xxx'),
        facet('type', 'unknown'),
        facet('constructor', 'fire'),
        facet('type', 'fire'),
        facet('type', 'fire'),
      ]),
    ).toEqual({
      types: ['fire'],
      selections: [facet('type', 'fire')],
    });
  });

  it('타입은 처음 고른 2개까지만', () => {
    expect(
      parsePokeFilter([
        facet('type', 'fire'),
        facet('type', 'flying'),
        facet('type', 'water'),
      ]).types,
    ).toEqual(['fire', 'flying']);
  });
});

describe('filterPokes', () => {
  const pokes = [
    makePoke({ nameKo: '파이리', types: ['fire'] }),
    makePoke({ nameKo: '리자몽', types: ['fire', 'flying'] }),
    makePoke({ nameKo: '피죤', types: ['normal', 'flying'] }),
  ];

  it('선택이 없으면 전부', () => {
    expect(names(filterPokes(pokes, { types: [] }))).toEqual([
      '파이리',
      '리자몽',
      '피죤',
    ]);
  });

  it('타입 하나: 그 타입을 가진 포켓몬 (첫째·둘째 타입 무관)', () => {
    expect(names(filterPokes(pokes, { types: ['flying'] }))).toEqual([
      '리자몽',
      '피죤',
    ]);
  });

  it('타입 둘: 두 타입을 모두 가진 포켓몬 (고른 순서 무관)', () => {
    expect(names(filterPokes(pokes, { types: ['flying', 'fire'] }))).toEqual([
      '리자몽',
    ]);
  });
});
