'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';

const VALID_APPEARED_GENS = new Set([3, 4, 5, 6, 7, 8, 9]);

// 목록을 거른다. 조건은 모두 AND이고, 비어 있으면 통과(= 필터 없음)로 취급한다.
// - search:    컨텍스트. 한/영/일 이름 부분 일치(영문만 대소문자 무시)
// - appeared:  URL. 선택한 세대 중 하나(반복 키. 알 수 없는 값은 무시)
// - champions: URL. '1'일 때만 챔피언스 특성으로 좁힌다
//
// search만 URL이 아닌 이유: 타이핑은 고빈도라 로컬 state가 원본이고 URL은 디바운스로
// 뒤따라오는 복제본이다. 복제본을 읽으면 결과가 디바운스(250ms)만큼 늦게 나온다.
// 디바운스는 router.replace를 아끼려는 것이지 필터링을 늦추려는 게 아니다.
export default function useAbilityList(abilities: Ability[]) {
  const searchParams = useSearchParams();

  const filteredAbilities = useMemo(() => {
    const keyword = (searchParams.get('search') ?? '').trim().toLowerCase();

    const isChampionsOnly = searchParams.get('champions') === '1';

    const selectedGens = new Set(
      searchParams
        .getAll('appeared')
        .map(Number)
        .filter((gen) => VALID_APPEARED_GENS.has(gen)),
    );

    const filtered = abilities.filter(
      ({ nameKo, nameEn, nameJa, gen, isChampions }) => {
        const matchesKeyword =
          keyword === '' ||
          [nameKo, nameEn.toLowerCase(), nameJa].some(
            (name) => name !== null && name.includes(keyword),
          );

        const matchesGen = selectedGens.size === 0 || selectedGens.has(gen);

        const matchesChampions = !isChampionsOnly || Boolean(isChampions);

        return matchesKeyword && matchesGen && matchesChampions;
      },
    );

    return filtered.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
  }, [abilities, searchParams]);

  return { filteredAbilities, count: filteredAbilities.length };
}
