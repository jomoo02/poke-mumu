import type { NationalPoke } from '..';

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

const matchesType = (poke: NationalPoke, selectedTypes: string[]): boolean => {
  if (selectedTypes.length === 0) {
    return true;
  }

  const pokeTypes = new Set(
    [poke.type1.identifier, poke.type2?.identifier].filter(
      (type): type is string => type != null,
    ),
  );

  return selectedTypes.every((type) => pokeTypes.has(type));
};

const matchesForm = (
  formIdentifier: string | null,
  selectedForms: string[],
): boolean => {
  if (selectedForms.length === 0) {
    return true;
  }
  if (formIdentifier === null) {
    return false;
  }
  // 복합 모습은 '-'로 토큰이 연결된다 (예: 'zen-galar' → ['zen','galar'],
  // 'paldea-blaze' → ['paldea','blaze']). 선택한 모습이 토큰 중 하나면 매칭.
  // 토큰 위치와 무관(접두/접미 모두)하고 substring 오탐도 없다.
  const tokens = formIdentifier.split('-');
  return selectedForms.some((selected) => tokens.includes(selected));
};

const matchesGen = (
  generation: number | null,
  selectedGens: string[],
): boolean => {
  if (selectedGens.length === 0) {
    return true;
  }
  return generation !== null && selectedGens.includes(String(generation));
};

export { matchesDexNumber, matchesForm, matchesGen, matchesType };
