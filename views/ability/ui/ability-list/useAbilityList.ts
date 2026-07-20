'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';

import { VALID_APPEARED_GENS } from '../../model/config';

// URL(search·appeared·champions)만 읽어 목록을 거른다.
// 조건은 모두 AND이고, 비어 있으면 통과(= 필터 없음)로 취급한다.
// - search:    한/영/일 이름 부분 일치(영문만 대소문자 무시)
// - appeared:  선택한 세대 중 하나(반복 키. 알 수 없는 값은 무시)
// - champions: '1'일 때만 챔피언스 특성으로 좁힌다
//
// 검색어는 입력창의 로컬 state가 원본이고 URL은 디바운스로 뒤따라오는 복제본이라,
// 결과가 디바운스만큼 늦게 반영된다. 프로덕션 실측상 URL 반영 후 렌더까지는 2~16ms라
// 체감 지연은 사실상 디바운스 값과 같다(useAbilitySearch 참고).
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

  return { filteredAbilities };
}
