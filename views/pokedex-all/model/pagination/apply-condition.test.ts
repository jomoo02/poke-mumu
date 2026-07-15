import { describe, it, expect } from 'vitest';

import type { Type } from '@/entities/type/model';

import { type NationalPoke } from '../poke';
import { applyFilterAndSort } from './apply-condition';

const makePoke = (fields: {
  dexNumber: number;
  nameKo?: string;
  types?: string[];
  formIdentifier?: string | null;
  sortOrder?: number;
}): NationalPoke => {
  const [type1, type2] = fields.types ?? [];

  const toType = (id?: string): Type | null =>
    id ? ({ identifier: id, nameKo: id } as Type) : null;

  return {
    dexNumber: fields.dexNumber,
    sortOrder: fields.sortOrder ?? 0,
    nameKo: fields.nameKo ?? '',
    formIdentifier: fields.formIdentifier ?? null,
    type1: toType(type1),
    type2: toType(type2),
  } as unknown as NationalPoke;
};

const pokes = [
  makePoke({ dexNumber: 1, nameKo: '이상해씨', types: ['grass', 'poison'] }),
  makePoke({ dexNumber: 4, nameKo: '파이리', types: ['fire'] }),
  makePoke({ dexNumber: 7, nameKo: '꼬부기', types: ['water'] }),
  makePoke({
    dexNumber: 6,
    nameKo: '리자몽',
    types: ['fire', 'flying'],
    formIdentifier: 'mega',
  }),
];

describe('applyFilterAndSort', () => {
  it('필터·검색이 없으면 전체를 도감번호 순으로 반환한다', () => {
    const result = applyFilterAndSort(pokes, new URLSearchParams(), '');
    // 회귀 방지: 예전 matchesForm 반전 버그면 여기가 빈 배열이 됐음.
    expect(result.map((p) => p.dexNumber)).toEqual([1, 4, 6, 7]);
  });

  it('타입은 AND — 선택한 타입을 모두 가진 포켓몬만', () => {
    const result = applyFilterAndSort(
      pokes,
      new URLSearchParams('type=grass&type=poison'),
      '',
    );
    expect(result.map((p) => p.nameKo)).toEqual(['이상해씨']);
  });

  it('모습(form) 필터가 걸리면 해당 form만', () => {
    const result = applyFilterAndSort(
      pokes,
      new URLSearchParams('form=mega'),
      '',
    );
    expect(result.map((p) => p.nameKo)).toEqual(['리자몽']);
  });

  it('이름 부분 검색', () => {
    const result = applyFilterAndSort(pokes, new URLSearchParams(), '꼬부');
    expect(result.map((p) => p.nameKo)).toEqual(['꼬부기']);
  });

  it('검색어의 공백은 무시한다', () => {
    const result = applyFilterAndSort(pokes, new URLSearchParams(), '이 상 해');
    expect(result.map((p) => p.nameKo)).toEqual(['이상해씨']);
  });

  it('도감번호 숫자 검색', () => {
    const result = applyFilterAndSort(pokes, new URLSearchParams(), '4');
    expect(result.map((p) => p.nameKo)).toEqual(['파이리']);
  });
});
