'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';
import { useSingleParam } from '@/shared/lib/search-params';

import {
  buildGenerationChips,
  getAvailableGenerations,
  groupAbilitiesByGeneration,
  type AbilityGenerationGroup,
  type GenerationChip,
} from './group-by-generation';

const GEN_KEY = 'gen';
const PAGE_KEY = 'page';

/**
 * '전체'를 뜻하는 내부 기본값. useSingleParam은 기본값을 URL에 쓰지 않으므로 `gen` 키가 지워진다.
 * `?gen=all`로 들어와도 validValues에 없어 같은 값으로 폴백한다.
 */
const ALL_GENERATIONS = 'all';

interface UseAbilityListV6Result {
  /** 검색어로 거른 전체 개수 (세대 필터 적용 전) */
  searchedCount: number;
  /** 세대 필터까지 적용해 실제로 보이는 개수 */
  visibleCount: number;
  /** 화면에 렌더할 세대 섹션 (전체면 모든 세대, 아니면 선택한 세대 하나 또는 0개) */
  groups: AbilityGenerationGroup[];
  /** '전체' + 데이터에 존재하는 세대 칩 */
  chips: GenerationChip[];
  /** null = 전체 */
  selectedGen: number | null;
  selectGen: (gen: number | null) => void;
}

/**
 * 검색(search) · 세대(gen) 쿼리를 읽어 목록을 세대별로 묶는다.
 *
 * - 검색은 AbilitySearch(useSearchParamsInput)가 router.replace로 쓰고, 여기서는 읽기만 한다.
 * - 세대 변경은 useSingleParam → router.replace(scroll: false). 필터라 히스토리를 쌓지 않고,
 *   `page`가 남아 있으면 함께 지운다. 쿼리가 비면 `?` 없이 pathname만 남는다.
 * - 숫자가 아니거나 데이터에 없는 gen은 validValues 검사에서 걸러져 '전체'로 취급된다.
 */
export default function useAbilityListV6(
  abilities: Ability[],
): UseAbilityListV6Result {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  // 칩 구성은 검색과 무관하게 고정한다. 검색 중 칩이 사라지면 행이 흔들리고 선택 위치를 잃는다.
  const generations = useMemo(
    () => getAvailableGenerations(abilities),
    [abilities],
  );

  const validGenValues = useMemo(() => generations.map(String), [generations]);

  const { value: genParam, setValue: setGenParam } = useSingleParam<string>(
    GEN_KEY,
    {
      defaultValue: ALL_GENERATIONS,
      validValues: validGenValues,
      resetKeys: [PAGE_KEY],
    },
  );

  // validValues가 String(gen)이라 여기 오는 값은 항상 Number로 되돌릴 수 있다.
  const selectedGen = genParam === ALL_GENERATIONS ? null : Number(genParam);

  const searchedGroups = useMemo(() => {
    const matchesKeyword = createSearchMatcher(search);

    const searched = abilities
      .filter(({ nameKo, nameEn, nameJa }) =>
        matchesKeyword(nameKo, nameEn, nameJa),
      )
      .sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));

    return groupAbilitiesByGeneration(searched);
  }, [abilities, search]);

  const chips = useMemo(
    () => buildGenerationChips(generations, searchedGroups),
    [generations, searchedGroups],
  );

  const groups = useMemo(
    () =>
      selectedGen === null
        ? searchedGroups
        : searchedGroups.filter((group) => group.gen === selectedGen),
    [searchedGroups, selectedGen],
  );

  const countAbilities = (list: AbilityGenerationGroup[]) =>
    list.reduce((sum, group) => sum + group.abilities.length, 0);

  const selectGen = (gen: number | null) => {
    // 이미 선택된 칩을 다시 눌러도 URL을 다시 쓰지 않는다(해제 토글 없음).
    if (gen === selectedGen) return;

    setGenParam(gen === null ? ALL_GENERATIONS : String(gen));
  };

  return {
    searchedCount: countAbilities(searchedGroups),
    visibleCount: countAbilities(groups),
    groups,
    chips,
    selectedGen,
    selectGen,
  };
}
