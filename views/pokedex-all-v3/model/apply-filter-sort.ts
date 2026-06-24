import { type NationalPoke } from '.';
import { applySort } from './sort';

// 타입: AND(교집합). 선택된 타입을 모두 보유해야 통과.
// poke의 보유 타입은 type1/type2 둘뿐이므로 최대 2개 선택과 자연스럽게 맞물린다.
function matchesType(poke: NationalPoke, sel: string[]): boolean {
  if (sel.length === 0) return true;
  const owned = new Set(
    [poke.type1?.identifier, poke.type2?.identifier].filter(
      (t): t is string => t != null,
    ),
  );
  return sel.every((t) => owned.has(t));
}

// 모습: OR(합집합). 선택 중 하나라도 일치하면 통과.
function matchesForm(formIdentifier: string | null, sel: string[]): boolean {
  return sel.length === 0 || (formIdentifier != null && sel.includes(formIdentifier));
}

// 검색: 이름(부분일치) 또는 도감번호(정수 완전일치).
function matchesQuery(poke: NationalPoke, q: string): boolean {
  if (!q) return true;
  if (poke.nameKo.includes(q)) return true;
  const asNum = Number(q);
  return Number.isInteger(asNum) && poke.dexNumber === asNum;
}

// type(AND)·form(OR)·검색·정렬을 합성.
// 검색어만 인자로 받고 나머지(type/form/sort)는 searchParams에서 읽는다.
export function applyFilterSort(
  all: NationalPoke[],
  params: URLSearchParams,
  query: string,
): NationalPoke[] {
  const types = (params.get('type') ?? '').split(',').filter(Boolean);
  const forms = (params.get('form') ?? '').split(',').filter(Boolean);
  const q = query.trim();

  const filtered = all.filter(
    (p) =>
      matchesType(p, types) &&
      matchesForm(p.formIdentifier, forms) &&
      matchesQuery(p, q),
  );

  return applySort(filtered, params);
}
