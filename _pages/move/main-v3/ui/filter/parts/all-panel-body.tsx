'use client';

import { Fragment, useId } from 'react';

import { cn } from '@/_shared/lib/cn';

import { MOVE_FILTER_GROUPS, useFilterParam } from '../../../model/filter';
import type { MoveFilterGroup } from '../../../model/filter';
import { SortOptions, SORT_TITLE, type SortProps } from '../../sort';
import { GROUP_TITLE } from './filter-option';
import FilterGroupOptions from './filter-group-options';
import type { FilterProps } from './filter-props';

interface AllPanelBodyProps extends Pick<FilterProps, 'filterCounts'> {
  sort: SortProps;
  // 타일 줄 수 (드로어 4 · 다이얼로그 6)
  tileGridClassName?: string;
  // 정렬 기준·방향 라디오 열 수 (드로어 2 · 다이얼로그 3)
  sortGridClassName?: string;
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
 * 전체 패널 내용 (드로어·다이얼로그 공통, 스크롤 영역): 필터 그룹을 모두 펼쳐 둔다 (아코디언 없음) → 맨 아래 정렬.
 * 고르는 즉시 반영되고, 정렬을 골라도 닫지 않는다 (아래 [N개 보기]가 닫는다)
 */
export default function AllPanelBody({
  filterCounts,
  sort,
  tileGridClassName,
  sortGridClassName,
  className,
}: AllPanelBodyProps) {
  const { filter } = useFilterParam();
  const sortTitleId = useId();

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
      <div className="my-3 h-px shrink-0 bg-border" />
      <section aria-labelledby={sortTitleId} className="flex flex-col">
        <h3 id={sortTitleId} className={SECTION_TITLE_CLASS_NAME}>
          {SORT_TITLE}
        </h3>
        <SortOptions {...sort} gridClassName={sortGridClassName} />
      </section>
    </div>
  );
}
