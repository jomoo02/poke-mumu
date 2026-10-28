import { describe, it, expect } from 'vitest';

import type { TypeDetail } from '@/_entities/type';

import { makePoke } from '../base-stats-poke.fixture';
import type { BaseStatsPokeForm } from '../base-stats-poke';

import { POKE_FILTER_RULES, toPokeFilterOptions } from './filter-option';

const typeDetail = (
  id: number,
  identifier: string,
  nameKo: string,
): TypeDetail => ({
  id,
  identifier,
  nameKo,
  generation: 1,
  damageClassId: null,
});

const ALOLA_FORM: BaseStatsPokeForm = {
  identifier: 'alola',
  nameKo: '알로라의 모습',
  nameEn: 'Alolan',
  nameJa: 'アローラのすがた',
  shortKo: '알로라',
  group: 'alola',
};

describe('toPokeFilterOptions', () => {
  // DB 조회 순서와 상관없이 게임 표시 순서, unknown은 뺀다
  const types = [
    typeDetail(10, 'fire', '불꽃'),
    typeDetail(10001, 'unknown', '???'),
    typeDetail(1, 'normal', '노말'),
  ];

  const formGroups = [
    { identifier: 'mega', nameKo: '메가진화', nameEn: 'Mega', nameJa: 'メガ' },
    {
      identifier: 'alola',
      nameKo: '알로라의 모습',
      nameEn: 'Alolan',
      nameJa: 'アローラのすがた',
    },
  ];

  const options = toPokeFilterOptions(types, formGroups);

  it('타입: 게임 표시 순서, unknown 제외, 아이콘용 타입을 함께', () => {
    expect(options.type).toEqual([
      {
        value: 'normal',
        label: '노말',
        type: { id: 1, identifier: 'normal', nameKo: '노말' },
      },
      {
        value: 'fire',
        label: '불꽃',
        type: { id: 10, identifier: 'fire', nameKo: '불꽃' },
      },
    ]);
  });

  it('모습: 받은 순서(sort_order) 그대로, 한국어 이름', () => {
    expect(options.form).toEqual([
      { value: 'mega', label: '메가진화' },
      { value: 'alola', label: '알로라의 모습' },
    ]);
  });

  it('세대: 1~9세대', () => {
    expect(options.gen).toHaveLength(9);
    expect(options.gen[0]).toEqual({ value: '1', label: '1세대' });
    expect(options.gen[8]).toEqual({ value: '9', label: '9세대' });
  });
});

describe('POKE_FILTER_RULES.getPokeValues', () => {
  const raichu = makePoke({
    nameKo: '라이츄',
    types: ['electric'],
    gen: 1,
  });
  const alolaRaichu = makePoke({
    nameKo: '라이츄',
    types: ['electric', 'psychic'],
    form: ALOLA_FORM,
  });

  it('타입: 첫째·둘째 타입', () => {
    expect(POKE_FILTER_RULES.type.getPokeValues(alolaRaichu)).toEqual([
      'electric',
      'psychic',
    ]);
  });

  it('모습: 기본 모습은 없음, 폼은 선택지 identifier', () => {
    expect(POKE_FILTER_RULES.form.getPokeValues(raichu)).toEqual([]);
    expect(POKE_FILTER_RULES.form.getPokeValues(alolaRaichu)).toEqual([
      'alola',
    ]);
  });

  it('세대: 기본 모습만 있고 폼(generation null)은 없음', () => {
    expect(POKE_FILTER_RULES.gen.getPokeValues(raichu)).toEqual(['1']);
    expect(POKE_FILTER_RULES.gen.getPokeValues(alolaRaichu)).toEqual([]);
  });
});
