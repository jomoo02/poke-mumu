'use client';

import { Fragment, useId, type ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';

import {
  MOVE_FILTER_GROUPS,
  MOVE_FILTER_GROUP_TITLE,
  useFilterParam,
} from '../../model/filter';
import type { MoveFilterGroup } from '../../model/filter';
import FilterOptionList from './filter-option-list';
import type { AllFilterProps } from './filter-props';

interface AllFilterBodyProps extends Pick<AllFilterProps, 'filterCounts'> {
  // 타일 줄 수 (드로어 4 · 다이얼로그 5)
  tileGridClassName?: string;
  className?: string;
}

function GroupSection({
  group,
  count,
  children,
}: {
  group: MoveFilterGroup;
  count: number;
  children: ReactNode;
}) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className={cn('flex flex-col gap-1')}>
      <h3 id={titleId} className={cn('py-2.5 text-base font-semibold')}>
        {count > 0
          ? `${MOVE_FILTER_GROUP_TITLE[group]} (${count})`
          : MOVE_FILTER_GROUP_TITLE[group]}
      </h3>
      {children}
    </section>
  );
}

/**
 * 통합 필터 내용 (드로어·다이얼로그 공통, 스크롤 영역): 필터 그룹을 모두 펼쳐 둔다 (아코디언 없음).
 * 고르는 즉시 반영되고 아래 [N개 보기]가 닫는다
 */
export default function AllFilterBody({
  filterCounts,
  tileGridClassName,
  className,
}: AllFilterBodyProps) {
  const { filter } = useFilterParam();

  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar pb-2',
        className,
      )}
    >
      {MOVE_FILTER_GROUPS.map((group, index) => (
        <Fragment key={group}>
          {index > 0 && (
            <div aria-hidden className={cn('my-3 h-px shrink-0 bg-border')} />
          )}
          <GroupSection group={group} count={filter[group].length}>
            <FilterOptionList
              group={group}
              filterCounts={filterCounts}
              className={tileGridClassName}
            />
          </GroupSection>
        </Fragment>
      ))}
    </div>
  );
}
