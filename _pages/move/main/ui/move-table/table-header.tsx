import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import type { MoveSort, SortKey } from '../../model/sort';
import SortStateIcon from '../sort-state-icon';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

interface TableHeaderProps {
  sortState: MoveSort;
  onSort: (sortKey: SortKey) => void;
}

// 열 너비(grid-cols)는 table-row · skeleton과 같은 값을 쓴다.
// 순서: 이름 · 타입 · 분류 · 위력 · 명중 · PP · 설명 (설명은 남는 폭에서 두 줄까지)
export default function TableHeader({ sortState, onSort }: TableHeaderProps) {
  return (
    <div role="rowgroup" className="sticky top-(--header-height) z-10">
      <div
        role="row"
        className={cn(
          'grid items-center',
          'grid-cols-[minmax(9rem,1.5fr)_minmax(4.5rem,0.6fr)_minmax(4.5rem,0.6fr)_minmax(5.5rem,0.75fr)_minmax(5.5rem,0.75fr)_minmax(5rem,0.65fr)_minmax(0,3.25fr)]',
          'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70',
        )}
      >
        <TableSortHead sortKey="name" sortState={sortState} onSort={onSort}>
          이름
        </TableSortHead>
        <div role="columnheader" className="px-4">
          타입
        </div>
        <div role="columnheader" className="px-4">
          분류
        </div>
        {/* 숫자 열은 이름·삼각형이 숫자 바로 위에 오게 오른쪽 정렬 */}
        <TableSortHead
          sortKey="power"
          sortState={sortState}
          onSort={onSort}
          className="flex justify-end"
        >
          위력
        </TableSortHead>
        <TableSortHead
          sortKey="accuracy"
          sortState={sortState}
          onSort={onSort}
          className="flex justify-end"
        >
          명중
        </TableSortHead>
        <TableSortHead
          sortKey="pp"
          sortState={sortState}
          onSort={onSort}
          className="flex justify-end"
        >
          PP
        </TableSortHead>
        <div role="columnheader" className="px-4">
          설명
        </div>
      </div>
    </div>
  );
}

interface TableSortHeadProps extends TableHeaderProps {
  sortKey: SortKey;
  className?: string;
  children: string;
}

function TableSortHead({
  sortKey,
  sortState,
  onSort,
  className,
  children,
}: TableSortHeadProps) {
  const order = sortState.sort === sortKey ? sortState.order : null;

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn('px-4', className)}
    >
      <Button
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className={cn(
          'px-2.5 -mx-2.5 h-9 gap-1.5 rounded-lg cursor-pointer',
          order && 'text-foreground font-medium',
        )}
      >
        {children}
        <SortStateIcon order={order} />
      </Button>
    </div>
  );
}
