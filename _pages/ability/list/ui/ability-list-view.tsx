'use client';

import type { AbilityDetail } from '@/_entities/ability';

import AbilitySearchInput from './ability-search-input';
import AbilityResults from './results';
import { useAbilityResults } from '../model/use-ability-results';

interface AbilityListViewProps {
  abilities: AbilityDetail[];
}

// 위: 검색 / 아래: 결과(개수·정렬, 테이블·카드, 페이지네이션)
export default function AbilityListView({ abilities }: AbilityListViewProps) {
  const { pageAbilities, page, totalPages, totalCount } =
    useAbilityResults(abilities);

  return (
    <div className="flex flex-col gap-6">
      <AbilitySearchInput />
      <AbilityResults
        abilities={pageAbilities}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </div>
  );
}
