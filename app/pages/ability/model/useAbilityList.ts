import { useMemo, useState } from 'react';

import { type AbilityView } from '.';

export type SortOption = 'name-asc' | 'name-desc' | 'gen-asc' | 'gen-desc';

const DEFAULT_SORT: SortOption = 'name-asc';

export default function useAbilityList(abilities: AbilityView[]) {
  const [inputValue, setInputValue] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT);

  const filteredAbilities = useMemo(() => {
    const keyword = inputValue.trim().toLowerCase();

    const filtered = keyword
      ? abilities.filter(({ nameKo }) => nameKo.toLowerCase().includes(keyword))
      : abilities;

    return sortAbilities(filtered, sortOption);
  }, [inputValue, abilities, sortOption]);

  const resetInputValue = () => setInputValue('');

  return {
    filteredAbilities,
    inputValue,
    resetInputValue,
    setInputValue,
    sortOption,
    setSortOption,
  };
}

const sortAbilities = (
  abilities: AbilityView[],
  option: SortOption,
): AbilityView[] => {
  // sort는 in-place 변형이라 원본 보호 위해 복사
  const sorted = [...abilities];

  switch (option) {
    case 'name-asc':
      return sorted.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));

    case 'name-desc':
      return sorted.sort((a, b) => b.nameKo.localeCompare(a.nameKo, 'ko'));

    case 'gen-asc':
      return sorted.sort((a, b) => {
        // NULL은 마지막
        if (a.gen === null && b.gen === null) {
          return a.nameKo.localeCompare(b.nameKo, 'ko');
        }
        if (a.gen === null) return 1;
        if (b.gen === null) return -1;
        if (a.gen !== b.gen) return a.gen - b.gen;
        // 같은 gen은 가나다순
        return a.nameKo.localeCompare(b.nameKo, 'ko');
      });
    case 'gen-desc':
      return sorted.sort((a, b) => {
        // NULL(챔피언십)은 마지막 — 분류된 것 우선, 분류 미정은 그 다음
        // 챔피언십 ability 추가 후 사용자 피드백 봐가며 NULL을 처음에 두는
        // 방식으로 변경 검토. 챔피언십을 "최신"으로 인식하는 사용자가 많다면
        // gen-desc에서만 NULL을 처음에 두는 것도 한 옵션.
        if (a.gen === null && b.gen === null) {
          return a.nameKo.localeCompare(b.nameKo, 'ko');
        }
        if (a.gen === null) return 1;
        if (b.gen === null) return -1;
        if (a.gen !== b.gen) return b.gen - a.gen;
        return a.nameKo.localeCompare(b.nameKo, 'ko');
      });
  }
};
