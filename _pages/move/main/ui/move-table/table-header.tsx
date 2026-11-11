import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import type { MoveSort, SortKey } from '../../model/sort';
import SortStateIcon from '../sort-state-icon';

import {
  COLUMNS,
  GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
  type TableColumn,
} from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

const getOrder = (column: TableColumn, sortState: MoveSort) =>
  column.sortKey && sortState.sort === column.sortKey ? sortState.order : null;

interface TableHeaderProps {
  sortState: MoveSort;
  onSort: (sortKey: SortKey) => void;
}

export default function TableHeader({ sortState, onSort }: TableHeaderProps) {
  return (
    <div role="rowgroup" className="sticky top-(--header-height) z-10">
      <div role="row" className={cn(HEADER_ROW_CLASS, GRID_CLASS)}>
        {COLUMNS.map((column) => (
          <TableSortHead
            key={column.id}
            column={column}
            sortState={sortState}
            onSort={onSort}
          />
        ))}
      </div>
    </div>
  );
}

interface TableHeadProps {
  column: TableColumn;
}

function TableHead({ column }: TableHeadProps) {
  return (
    <div role="columnheader" className={HEAD_CELL_CLASS}>
      {column.header}
    </div>
  );
}

interface TableSortHeadProps extends TableHeadProps {
  sortState: MoveSort;
  onSort: (sortKey: SortKey) => void;
}

function TableSortHead({ column, sortState, onSort }: TableSortHeadProps) {
  const sortKey = column.sortKey;

  if (!sortKey) {
    return <TableHead column={column} />;
  }

  const order = getOrder(column, sortState);

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn(HEAD_CELL_CLASS, SORTABLE_HEAD_ALIGN_CLASS[column.align])}
    >
      <Button
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className={cn(
          'px-2.5 -mx-2.5 h-9 gap-1.5 rounded-lg cursor-pointer',
          order && 'text-foreground font-medium',
        )}
      >
        {column.header}
        <SortStateIcon order={order} />
      </Button>
    </div>
  );
}
