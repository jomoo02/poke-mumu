import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import type { AbilitySort, SortKey } from '../../model/sort';
import SortStateIcon from '../sort-state-icon';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

interface TableHeaderProps {
  sortState: AbilitySort;
  onSort: (sortKey: SortKey) => void;
}

// 열 너비(grid-cols)는 table-row · skeleton과 같은 값을 쓴다
export default function TableHeader({ sortState, onSort }: TableHeaderProps) {
  return (
    <div role="rowgroup" className="sticky top-(--header-height) z-10">
      <div
        role="row"
        className={cn(
          'grid grid-cols-[minmax(9rem,1.75fr)_minmax(0,5fr)_6rem] items-center',
          'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70',
        )}
      >
        <TableSortHead sortKey="name" sortState={sortState} onSort={onSort}>
          이름
        </TableSortHead>
        <div role="columnheader" className="px-4">
          설명
        </div>
        <TableSortHead
          sortKey="appearance"
          sortState={sortState}
          onSort={onSort}
        >
          등장
        </TableSortHead>
      </div>
    </div>
  );
}

interface TableSortHeadProps extends TableHeaderProps {
  sortKey: SortKey;
  children: string;
}

function TableSortHead({
  sortKey,
  sortState,
  onSort,
  children,
}: TableSortHeadProps) {
  const order = sortState.sort === sortKey ? sortState.order : null;

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className="px-4"
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
