'use client';

import { useCallback } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useWindowVirtualList } from '@/_shared/lib/window-virtual-list';

import DataTableHeader from './data-table-header';
import DataTableRow from './data-table-row';
import type { SortState, TableColumn } from './table-column';
import { GRID_ROW_CLASS, getTableColsStyle } from './table-layout';

interface VirtualDataTableProps<Row, K extends string> {
  columns: readonly TableColumn<Row, K>[];
  rows: readonly Row[];
  getRowKey: (row: Row) => string | number;
  sortState: SortState<K>;
  onSort: (sortKey: K) => void;
  // 그리기 전 행 높이 추정값(px, 테두리 포함). 그린 뒤엔 실제 높이를 잰다
  estimateRowHeight: number;
  className?: string;
  // 헤더·행 grid에 덧붙일 클래스 (DataTable과 같다)
  rowClassName?: string;
}

/**
 * DataTable과 같은 모양에 행 가상화만 더했다 (페이지 스크롤 기준, 화면 근처 행만 그린다).
 * 페이지네이션 없이 수백 행을 한 번에 보여줄 때 쓴다. 머리글은 그대로 sticky
 */
function VirtualDataTable<Row, K extends string>({
  columns,
  rows,
  getRowKey,
  sortState,
  onSort,
  estimateRowHeight,
  className,
  rowClassName,
}: VirtualDataTableProps<Row, K>) {
  const getItemKey = useCallback(
    (index: number) => getRowKey(rows[index]),
    [rows, getRowKey],
  );

  const estimateSize = useCallback(
    () => estimateRowHeight,
    [estimateRowHeight],
  );

  const { listRef, virtualizer, scrollMargin } =
    useWindowVirtualList<HTMLDivElement>({
      count: rows.length,
      estimateSize,
      getItemKey,
    });

  const lastIndex = rows.length - 1;

  return (
    <div
      role="table"
      // 일부 행만 그리므로 전체 행 수(머리글 포함)와 각 행 순번을 알린다
      aria-rowcount={rows.length + 1}
      className={cn('w-full', className)}
      style={getTableColsStyle(columns)}
    >
      <DataTableHeader
        columns={columns}
        sortState={sortState}
        onSort={onSort}
        rowIndex={1}
        className={cn(GRID_ROW_CLASS, rowClassName)}
      />
      <div
        ref={listRef}
        role="rowgroup"
        className="relative"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <DataTableRow
            key={item.key}
            ref={virtualizer.measureElement}
            data-index={item.index}
            aria-rowindex={item.index + 2}
            row={rows[item.index]}
            columns={columns}
            className={cn(
              GRID_ROW_CLASS,
              rowClassName,
              'absolute inset-x-0 top-0',
              // 그려진 마지막 행이 아니라 실제 마지막 행만 아래 테두리를 뺀다
              // (중간 행 높이가 그려진 위치에 따라 1px씩 달라지지 않게)
              item.index !== lastIndex && 'last:border-b',
            )}
            style={{ transform: `translateY(${item.start - scrollMargin}px)` }}
          />
        ))}
      </div>
    </div>
  );
}

export { VirtualDataTable };
