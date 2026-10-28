'use client';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import type { PokeSort, SortKey } from '../../model/sort';

import {
  SORTABLE_HEAD_ALIGN_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  INFO_COLUMNS,
  STAT_COLUMNS,
  GRID_CLASS,
  type StatTableColumn,
} from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

interface TableHeaderProps {
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

const getOrder = (column: StatTableColumn, sortState: PokeSort) =>
  column.sortKey && sortState.sort === column.sortKey ? sortState.order : null;

// 머리글 (도감번호가 두 칸에 걸쳐 10열) (번호·이름·능력치 정렬). window 기준 sticky
export default function TableHeader({ sortState, onSort }: TableHeaderProps) {
  return (
    <div role="rowgroup" className="sticky top-(--header-height) z-10">
      <div role="row" className={cn(HEADER_ROW_CLASS, GRID_CLASS)}>
        {[...INFO_COLUMNS, ...STAT_COLUMNS].map((column) => (
          <WideHeadCell
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

interface WideHeadCellProps {
  column: StatTableColumn;
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

// _shared/ui/data-table의 헤더 셀과 같은 모양 (공개 API가 아니라 복사).
// 넓은 본문이라 능력치 이름을 줄이지 않는다 (특수공격 · 특수방어)
function WideHeadCell({ column, sortState, onSort }: WideHeadCellProps) {
  const sortKey = column.sortKey;

  if (!sortKey) {
    // 정렬 없는 머리글(타입)은 왼쪽 정렬. 타입 아이콘도 칸 왼쪽에서 시작해 머리글 글자와 시작선이 맞는다
    return (
      <div role="columnheader" className={HEAD_CELL_CLASS}>
        {column.header}
      </div>
    );
  }

  const order = getOrder(column, sortState);

  const isDexNumber = column.id === 'dexNumber';

  const header = (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn(
        HEAD_CELL_CLASS,
        // 머리글은 열의 정렬을 따른다 (숫자 열은 오른쪽: 이름·삼각형이 숫자 바로 위)
        SORTABLE_HEAD_ALIGN_CLASS[column.align],
        // 도감번호 열은 스프라이트·번호 두 칸에 걸친 한 열. 이름·타입 열처럼 왼쪽(이미지 시작선)에서 시작한다
        isDexNumber,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className={cn(
          // 이름 바로 옆에 삼각형 (글자 폭만큼). -mx: 누름 배경은 셀 패딩까지, 글자는 셀 내용 끝에 맞춘다
          'group -mx-2.5 h-9 gap-1.5 rounded-lg px-2.5 cursor-pointer ',
          // 지금 기준: 이름까지 primary 글자색 (선택된 상태 = primary, 카드의 정렬 칸과 같은 색)
          // order &&
          //   'font-semibold text-primary-text hover:text-primary-text aria-expanded:text-primary-text',
          order && 'text-foreground font-medium',
        )}
      >
        {column.header}
        <SortTriangles order={order} />
      </Button>
    </div>
  );

  return header;
}

/**
 * 정렬 방향 표시: 위(▲ 오름차순)·아래(▼ 내림차순) 삼각형을 늘 함께 두고 (업비트 같은 거래 사이트의 머리글),
 * 지금 기준이면 그 방향의 삼각형만 primary로 칠한다 (hover로는 바뀌지 않는다). 아이콘 대신 CSS 테두리로 그린다 (8×5px, 간격 3px).
 * 방향은 aria-sort가 알리므로 장식으로 숨긴다
 */
function SortTriangles({ order }: { order: PokeSort['order'] | null }) {
  const triangleClass = (direction: PokeSort['order']) =>
    cn(
      'size-0 border-x-4 border-x-transparent',
      direction === 'asc'
        ? 'border-b-[5px] border-b-current'
        : 'border-t-[5px] border-t-current',
      order === direction ? 'text-primary-text' : 'text-foreground/25',
    );

  return (
    <span aria-hidden="true" className="flex flex-col gap-0.75">
      <span className={triangleClass('asc')} />
      <span className={triangleClass('desc')} />
    </span>
  );
}
