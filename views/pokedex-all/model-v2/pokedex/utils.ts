// lib/make-type-predicate.ts
import type { Type } from '@/entities/type/model';
import { type NationalPoke, type PokeFilter } from '../index';

/**
 * 선택된 타입들을 모두 가진 poke만 통과 (AND).
 * type1/type2 중 하나라도 일치하면 그 타입은 충족.
 * 빈 배열이면 항상 통과하는 술어 반환 (필터 없음).
 */
export const makeTypePredicate = (types: Type[]): PokeFilter => {
  if (types.length === 0) return () => true;
  const wanted = new Set(types.map((t) => t.identifier));
  return (poke) => {
    const t1 = poke.type1?.identifier;
    const t2 = poke.type2?.identifier;
    return (
      (t1 !== undefined && wanted.has(t1)) ||
      (t2 !== undefined && wanted.has(t2))
    );
  };
};

export const matchSearch = (poke: NationalPoke, q: string): boolean => {
  if (poke.nameKo.includes(q)) return true;

  const asNum = Number(q);
  return Number.isInteger(asNum) && poke.dexNumber === asNum;
};

export const FORM_FILTERS = [
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
  { identifier: 'hisui', label: '히스이의 모습' },
] as const;

export type FormIdentifier = (typeof FORM_FILTERS)[number]['identifier'];

/**
 * 선택된 form 중 하나라도 일치하면 통과 (OR).
 * 같은 종류(form) 안에서는 OR, 타입 필터와는 usePokedexList의 every로 AND.
 * 빈 배열이면 항상 통과.
 */
export const makeFormPredicate = (forms: FormIdentifier[]): PokeFilter => {
  if (forms.length === 0) return () => true;
  const wanted = new Set<string>(forms);
  return (poke) =>
    poke.formIdentifier !== null && wanted.has(poke.formIdentifier);
};
