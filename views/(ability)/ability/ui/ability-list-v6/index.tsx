'use client';

import type { Ability } from '@/entities/ability/model';
import { Button } from '@/shared/ui/button';

import GenerationFilter from './generation-filter';
import GenerationTimelineSection from './generation-timeline-section';
import useAbilityListV6 from './useAbilityListV6';

interface AbilityListV6Props {
  abilities: Ability[];
}

/**
 * 세대 타임라인(Generation Timeline).
 *
 * 특성을 처음 등장한 세대 축으로 묶어 왼쪽 세로 레일 위에 세대 구간을 오름차순으로 늘어놓는다.
 * 상단 세대 칩으로 한 세대만 골라 볼 수 있다(URL `gen`).
 * 세대 필터 + 섹션 구조가 긴 목록 탐색을 대신하므로 페이지네이션 없이 전체를 렌더한다.
 */
export default function AbilityListV6({ abilities }: AbilityListV6Props) {
  const { searchedCount, visibleCount, groups, chips, selectedGen, selectGen } =
    useAbilityListV6(abilities);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-foreground/70">
        <span aria-live="polite">{visibleCount}개의 특성</span>
      </div>

      {/* 검색 결과 자체가 없으면 칩이 전부 비활성이라 칩 행을 숨긴다. */}
      {searchedCount === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : (
        <>
          <GenerationFilter
            chips={chips}
            selectedGen={selectedGen}
            onSelect={selectGen}
          />

          {groups.length === 0 ? (
            // 선택한 세대만 검색 결과에서 빠진 경우. 다른 세대에는 결과가 있으므로 되돌아갈 길을 준다.
            <div className="flex flex-col items-start gap-4">
              <div className="font-medium text-muted-foreground">
                일치하는 특성이 없습니다
              </div>
              <Button variant="outline" onClick={() => selectGen(null)}>
                전체 보기
              </Button>
            </div>
          ) : (
            // 섹션 사이 gap을 두지 않는다. 간격은 섹션 안에서 줘야 레일이 이어진다.
            <div className="flex flex-col">
              {groups.map((group, index) => (
                <GenerationTimelineSection
                  key={group.gen}
                  group={group}
                  isFirst={index === 0}
                  isLast={index === groups.length - 1}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
