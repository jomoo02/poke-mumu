'use client';

import type { Ability } from '@/entities/ability/model';
import { Pagination } from '@/shared/ui/pagination';

import AbilitySearch from '../ability-search';
import AbilityRows from './ability-rows';
import AbilityTable from './ability-table';
import SortSheet from './sort-sheet';
import useAbilityList from './useAbilityList';
import useAbilitySort from './useAbilitySort';
import useGoToPage from './useGoToPage';

interface AbilityListV12Props {
  abilities: Ability[];
}

/**
 * 특성 목록. 형태는 콘텐츠 폭(@container) 기준으로 전환한다.
 * - @2xl 이상: 검색 + 정렬 가능한 열 헤더 테이블
 * - @2xl 미만: 검색 + sticky 정렬 바(bottom Sheet) + 1열 리스트
 */
export default function AbilityListV12({ abilities }: AbilityListV12Props) {
  const { sort, setSort, toggleSort } = useAbilitySort();
  const { pageAbilities, page, totalPages, totalCount } = useAbilityList(
    abilities,
    sort,
  );
  const goToPage = useGoToPage(page);

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex min-w-0 flex-col @2xl:max-w-md">
        <AbilitySearch />
      </div>

      {/* 좁을 때만: 정렬 바 (AppHeader h-13 아래에 고정) */}
      <div className="sticky top-13 z-20 -my-3 flex items-center gap-2 bg-background/85 py-3 backdrop-blur-md @2xl:hidden">
        <SortSheet sort={sort} onSortChange={setSort} />
      </div>

      <p
        aria-live="polite"
        className="-mb-2 text-sm text-foreground/70 @2xl:mb-0"
      >
        {totalCount}개의 특성
      </p>

      {totalCount === 0 ? (
        <p className="py-6 font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </p>
      ) : (
        <>
          <AbilityTable
            abilities={pageAbilities}
            sort={sort}
            onToggleSort={toggleSort}
          />
          <AbilityRows abilities={pageAbilities} />
        </>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        className="mt-4"
      />
    </div>
  );
}
