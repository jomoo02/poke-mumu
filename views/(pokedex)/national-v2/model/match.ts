import type { NationalPoke } from './national-poke';

export const matchesDexNumber = (
  poke: NationalPoke,
  normalizedQuery: string,
): boolean => {
  if (normalizedQuery === '') return false;
  const numericQuery = Number(normalizedQuery);
  return Number.isInteger(numericQuery) && poke.dexNumber === numericQuery;
};

// 타입: 선택한 타입을 "모두" 가진 포켓몬만(AND).
export const matchesType = (
  poke: NationalPoke,
  selectedTypes: string[],
): boolean => {
  if (selectedTypes.length === 0) return true;

  const pokeTypes = new Set(
    [poke.type1.identifier, poke.type2?.identifier].filter(
      (type): type is string => type != null,
    ),
  );

  return selectedTypes.every((type) => pokeTypes.has(type));
};

// 모습: '-'로 연결된 토큰 중 하나라도 선택값과 일치(OR).
export const matchesForm = (
  formIdentifier: string | null,
  selectedForms: string[],
): boolean => {
  if (selectedForms.length === 0) return true;
  if (formIdentifier === null) return false;
  const tokens = formIdentifier.split('-');
  return selectedForms.some((selected) => tokens.includes(selected));
};

export const matchesGen = (
  generation: number | null,
  selectedGens: string[],
): boolean => {
  if (selectedGens.length === 0) return true;
  return generation !== null && selectedGens.includes(String(generation));
};
