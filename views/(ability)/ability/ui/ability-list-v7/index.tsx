'use client';

import type { Ability } from '@/entities/ability/model';
import { Button } from '@/shared/ui/button';
import { Pagination } from '@/shared/ui/pagination';

import AbilityGlossaryEntry from './ability-glossary-entry';
import AbilityListToolbar from './ability-list-toolbar';
import useAbilityListV7 from './useAbilityListV7';

interface AbilityListV7Props {
  abilities: Ability[];
}

/**
 * 용어집(Glossary) 정의 목록.
 *
 * 시맨틱 `<dl>`로 [용어(이름) | 정의(설명 전문)]를 늘어놓는다. md 이상은 2열, 미만은 세로 스택.
 * 설명을 자르지 않아 항목 높이가 커지므로 20개 단위로 페이지를 나눈다.
 * 검색어가 있으면 이름의 일치 구간을 강조한다.
 */
export default function AbilityListV7({ abilities }: AbilityListV7Props) {
  const {
    search,
    searchedCount,
    visibleCount,
    pagedAbilities,
    currentPage,
    totalPages,
    goToPage,
    scope,
    setScope,
    resetScope,
    sort,
    setSort,
    listTopRef,
  } = useAbilityListV7(abilities);

  return (
    <div ref={listTopRef} className="flex flex-col gap-8">
      {/* 입력 중 결과가 0개가 되어도 툴바는 남겨 줄 높이가 흔들리지 않게 한다. */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-x-4 text-sm text-foreground/70 md:justify-start">
          <span aria-live="polite">{visibleCount}개의 특성</span>
          {visibleCount > 0 && (
            <span className="tabular-nums">
              {currentPage} / {totalPages} 페이지
            </span>
          )}
        </div>

        <AbilityListToolbar
          scope={scope}
          onScopeChange={setScope}
          sort={sort}
          onSortChange={setSort}
        />
      </div>

      {searchedCount === 0 ? (
        <div className="py-12 font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : visibleCount === 0 ? (
        // 챔피언스 범위 때문에만 비었다. 전체 범위에는 결과가 있으므로 되돌아갈 길을 준다.
        <div className="flex flex-col items-start gap-4 py-12">
          <div className="font-medium text-muted-foreground">
            일치하는 특성이 없습니다
          </div>
          <Button variant="outline" onClick={resetScope}>
            전체 보기
          </Button>
        </div>
      ) : (
        <>
          {/* 포커스 링과 호버 배경이 잘리지 않도록 px-3 bleed 여백을 확보한다. */}
          <dl className="flex flex-col ">
            {pagedAbilities.map((ability) => (
              <AbilityGlossaryEntry
                key={ability.identifier}
                ability={ability}
                query={search}
              />
            ))}
          </dl>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            className="pt-4"
          />
        </>
      )}
    </div>
  );
}
