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

const stripSpaces = (s: string): string => s.replace(/\s+/g, '');

const matchesQuery = (poke: NationalPoke, rawQuery: string): boolean => {
  const query = stripSpaces(rawQuery);

  if (!query) {
    return true;
  }

  if (stripSpaces(poke.nameKo).includes(query)) {
    return true;
  }

  const asNum = Number(query);

  return Number.isInteger(asNum) && poke.dexNumber === asNum;
};

// type(AND)·form(OR)·검색·정렬을 합성.
// type/form은 반복 키(type=a&type=b) 형태이므로 getAll로 읽는다.
// 검색어만 인자로 받고 나머지(type/form/sort)는 searchParams에서 읽는다.
export const applyFilterAndSort = (
  all: NationalPoke[],
  params: URLSearchParams,
  query: string,
): NationalPoke[] => {
  const types = params.getAll('type').filter(Boolean);
  const forms = params.getAll('form').filter(Boolean);

  const filtered = all.filter(
    (p) =>
      matchesType(p, types) &&
      matchesForm(p.formIdentifier, forms) &&
      matchesQuery(p, query),
  );

  return applySort(filtered, params);
};
