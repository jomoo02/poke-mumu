import { createSearchMatcher, normalizeSearchText } from '@/shared/lib/search';

import { NationalPoke } from '../poke';
import { applySort } from '../poke-sort/sort';

const matchesType = (poke: NationalPoke, selectedTypes: string[]): boolean => {
  if (selectedTypes.length === 0) {
    return true;
  }

  const pokeTypes = new Set(
    [poke.type1?.identifier, poke.type2?.identifier].filter(
      (type): type is string => type != null,
    ),
  );

  return selectedTypes.every((type) => pokeTypes.has(type));
};

const matchesForm = (form: string | null, selectedForms: string[]): boolean => {
  if (selectedForms.length === 0) {
    return true;
  }
  return form !== null && selectedForms.includes(form);
};

// 도감번호 검색. 이름이 안 맞을 때만 시도한다.
const matchesDexNumber = (
  poke: NationalPoke,
  normalizedQuery: string,
): boolean => {
  if (normalizedQuery === '') {
    return false;
  }

  const numericQuery = Number(normalizedQuery);

  return Number.isInteger(numericQuery) && poke.dexNumber === numericQuery;
};

// type(AND)·form(OR)·검색·정렬을 합성한다.
// type/form은 반복 키(type=a&type=b) 형태이므로 getAll로 읽는다.
// 검색어만 인자로 받고 나머지(type/form/sort)는 searchParams에서 읽는다.
//
// 이름 매칭은 shared/lib/search로 위임한다. 질의·대상 모두 NFC 정규화·소문자화·
// 공백 제거되어, 자모 분리형(NFD) 한글이나 영문 대소문자 차이가 있어도 걸린다.
export const applyFilterAndSort = (
  allPokes: NationalPoke[],
  params: URLSearchParams,
  query: string,
): NationalPoke[] => {
  const types = params.getAll('type').filter(Boolean);
  const forms = params.getAll('form').filter(Boolean);

  // 질의가 비면 matchesName이 항상 true라 별도 분기가 필요 없다.
  const matchesName = createSearchMatcher(query);
  const normalizedQuery = normalizeSearchText(query);

  const filtered = allPokes.filter(
    (poke) =>
      matchesType(poke, types) &&
      matchesForm(poke.formIdentifier, forms) &&
      (matchesName(poke.nameKo) || matchesDexNumber(poke, normalizedQuery)),
  );

  return applySort(filtered, params);
};
