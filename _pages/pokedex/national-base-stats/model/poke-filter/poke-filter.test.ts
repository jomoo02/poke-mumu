import { describe, it, expect } from 'vitest';

import type { BaseStatsPokeForm } from '../base-stats-poke';
import { makePoke } from '../base-stats-poke.fixture';

import type { PokeFilterOptions } from './filter-option';
import {
  filterPokes,
  parsePokeFilter,
  type PokeFilterValues,
} from './poke-filter';

const facet = (group: string, value: string) => ({ group, value });

const option = (value: string) => ({ value, label: value });

// 서버에서 받은 선택지 (테스트에 필요한 것만)
const OPTIONS: PokeFilterOptions = {
  type: [
    'normal',
    'fire',
    'water',
    'electric',
    'psychic',
    'flying',
    'dragon',
  ].map(option),
  form: ['mega', 'alola'].map(option),
  gen: ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(option),
};

const values = (partial: Partial<PokeFilterValues>): PokeFilterValues => ({
  type: [],
  form: [],
  gen: [],
  ...partial,
});

const formOf = (group: string): BaseStatsPokeForm => ({
  identifier: group,
  nameKo: group,
  nameEn: group,
  nameJa: group,
  shortKo: null,
  group,
});

describe('parsePokeFilter', () => {
  it('그룹별로 고른 순서를 지키고, 전체 선택도 고른 순서대로', () => {
    const facets = [
      facet('form', 'alola'),
      facet('type', 'flying'),
      facet('type', 'fire'),
    ];

    expect(parsePokeFilter(facets, OPTIONS)).toEqual({
      selections: facets,
      byGroup: values({ type: ['flying', 'fire'], form: ['alola'] }),
    });
  });

  it('모르는 그룹, 선택지에 없는 값, 중복은 뺀다', () => {
    expect(
      parsePokeFilter(
        [
          facet('constructor', 'fire'),
          facet('type', 'unknown'),
          facet('form', 'galar'), // 받은 선택지에 없다
          facet('gen', '10'),
          facet('type', 'fire'),
          facet('type', 'fire'),
        ],
        OPTIONS,
      ),
    ).toEqual({
      selections: [facet('type', 'fire')],
      byGroup: values({ type: ['fire'] }),
    });
  });

  it('타입은 처음 고른 2개까지만, 모습·세대는 제한 없음', () => {
    const { byGroup } = parsePokeFilter(
      [
        facet('type', 'fire'),
        facet('type', 'flying'),
        facet('type', 'water'),
        facet('gen', '1'),
        facet('gen', '2'),
        facet('gen', '3'),
      ],
      OPTIONS,
    );

    expect(byGroup.type).toEqual(['fire', 'flying']);
    expect(byGroup.gen).toEqual(['1', '2', '3']);
  });
});

describe('filterPokes', () => {
  const pokes = [
    makePoke({
      pokeKey: 'charizard',
      nameKo: '리자몽',
      types: ['fire', 'flying'],
      generation: 1,
    }),
    makePoke({
      pokeKey: 'charizard-mega-x',
      nameKo: '메가리자몽X',
      types: ['fire', 'dragon'],
      form: formOf('mega'),
    }),
    makePoke({
      pokeKey: 'raichu',
      nameKo: '라이츄',
      types: ['electric'],
      generation: 1,
    }),
    makePoke({
      pokeKey: 'raichu-alola',
      nameKo: '라이츄',
      types: ['electric', 'psychic'],
      form: formOf('alola'),
    }),
    makePoke({
      pokeKey: 'pidgey',
      nameKo: '구구',
      types: ['normal', 'flying'],
      generation: 1,
    }),
    makePoke({
      pokeKey: 'lugia',
      nameKo: '루기아',
      types: ['psychic', 'flying'],
      generation: 2,
    }),
  ];

  const keys = (byGroup: PokeFilterValues) =>
    filterPokes(pokes, byGroup).map((poke) => poke.pokeKey);

  it('고른 게 없으면 전부', () => {
    expect(keys(values({}))).toHaveLength(pokes.length);
  });

  it('타입 AND: 고른 타입을 모두 가진 포켓몬 (첫째·둘째 무관)', () => {
    expect(keys(values({ type: ['flying'] }))).toEqual([
      'charizard',
      'pidgey',
      'lugia',
    ]);
    expect(keys(values({ type: ['flying', 'fire'] }))).toEqual(['charizard']);
  });

  it('모습 OR: 하나라도 해당하면. 기본 모습은 빠진다', () => {
    expect(keys(values({ form: ['mega', 'alola'] }))).toEqual([
      'charizard-mega-x',
      'raichu-alola',
    ]);
  });

  it('세대 OR: 기본 모습만 (폼은 세대가 없어 빠진다)', () => {
    expect(keys(values({ gen: ['1', '2'] }))).toEqual([
      'charizard',
      'raichu',
      'pidgey',
      'lugia',
    ]);
  });

  it('그룹 사이 AND', () => {
    expect(keys(values({ type: ['electric'], form: ['alola'] }))).toEqual([
      'raichu-alola',
    ]);
    expect(keys(values({ type: ['flying'], gen: ['2'] }))).toEqual(['lugia']);
  });
});
