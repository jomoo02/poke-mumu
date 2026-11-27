'use client';

import { Fragment, useId } from 'react';

import { cn } from '@/_shared/lib/cn';

import { MOVE_FILTER_GROUPS, useFilterParam } from '../../../model/filter';
import type { MoveFilterGroup } from '../../../model/filter';
import { GROUP_TITLE } from './filter-option';
import FilterGroupOptions from './filter-group-options';
import type { FilterProps } from './filter-props';

interface AllPanelBodyProps extends Pick<FilterProps, 'filterCounts'> {
  // 타일 줄 수 (드로어 4 · 다이얼로그 5)
  tileGridClassName?: string;
  className?: string;
}

const SECTION_TITLE_CLASS_NAME = 'py-2.5 text-base font-semibold';

function GroupSection({
  group,
  count,
  children,
}: {
  group: MoveFilterGroup;
  count: number;
  children: React.ReactNode;
}) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="flex flex-col">
      <h3 id={titleId} className={SECTION_TITLE_CLASS_NAME}>
        {count > 0 ? `${GROUP_TITLE[group]} (${count})` : GROUP_TITLE[group]}
      </h3>
      {children}
    </section>
  );
}

/**
 * 전체 패널 내용 (드로어·다이얼로그 공통, 스크롤 영역): 필터 그룹을 모두 펼쳐 둔다 (아코디언 없음).
 * 정렬은 여기 두지 않는다 (결과를 줄이지 않아 성격이 달라서. 툴바의 개수 옆 정렬 버튼). 고르는 즉시 반영되고 아래 [N개 보기]가 닫는다
 */
export default function AllPanelBody({
  filterCounts,
  tileGridClassName,
  className,
}: AllPanelBodyProps) {
  const { filter } = useFilterParam();

  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar px-6 pb-2',
        className,
      )}
    >
      {MOVE_FILTER_GROUPS.map((group, index) => (
        <Fragment key={group}>
          {index > 0 && <div className="my-3 h-px shrink-0 bg-border" />}
          <GroupSection group={group} count={filter[group].length}>
            <FilterGroupOptions
              group={group}
              filterCounts={filterCounts}
              className="pt-1 pb-1"
              tileGridClassName={tileGridClassName}
            />
          </GroupSection>
        </Fragment>
      ))}
    </div>
  );
}
