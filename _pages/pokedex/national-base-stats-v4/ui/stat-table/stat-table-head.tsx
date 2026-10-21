'use client';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import {
  STAT_LABEL,
  type StatKey,
} from '@/_pages/pokedex/national-base-stats-v0/model/base-stats-poke';
import type {
  PokeSort,
  SortKey,
} from '@/_pages/pokedex/national-base-stats-v0/model/poke-sort';

import {
  CELL_ALIGN_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  INFO_COLUMNS,
  STAT_COLUMNS,
  WIDE_GRID_CLASS,
  type PokeColumn,
} from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

interface StatTableHeadProps {
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

const getOrder = (column: PokeColumn, sortState: PokeSort) =>
  column.sortKey && sortState.sort === column.sortKey ? sortState.order : null;

// @5xl 이상에서만 보이는 10열 헤더 (번호·이름·능력치 정렬). window 기준 sticky.
// @5xl 미만은 머리글 없이 카드 칸마다 능력치 이름을 두고, 정렬은 결과 줄의 정렬 시트에서 한다
export default function StatTableHead({ sortState, onSort }: StatTableHeadProps) {
  return (
    <div
      role="rowgroup"
      className="sticky top-(--header-height) z-10 hidden @5xl:block"
    >
      <div role="row" className={cn(HEADER_ROW_CLASS, 'grid', WIDE_GRID_CLASS)}>
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
  column: PokeColumn;
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

// _shared/ui/data-table의 헤더 셀과 같은 모양 (공개 API가 아니라 복사).
// headerLabel이 있으면 화면엔 줄인 이름(특공), 스크린리더엔 전체 이름(특수공격)
function WideHeadCell({ column, sortState, onSort }: WideHeadCellProps) {
  const sortKey = column.sortKey;

  const align = column.align ?? 'left';

  if (!sortKey) {
    // 정렬 없는 머리글(타입)은 왼쪽 정렬. 타입 아이콘도 칸 왼쪽에서 시작해 머리글 글자와 시작선이 맞는다
    return (
      <div role="columnheader" className={cn(HEAD_CELL_CLASS, CELL_ALIGN_CLASS.left)}>
        {column.header}
      </div>
    );
  }

  const order = getOrder(column, sortState);

  // 능력치는 줄이지 않은 이름 (특수공격·특수방어). 넓은 본문이라 머리글에 들어간다
  const label =
    column.id in STAT_LABEL ? STAT_LABEL[column.id as StatKey] : column.header;

  const isDexNumber = column.id === 'dexNumber';

  const header = (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn(
        HEAD_CELL_CLASS,
        // 머리글은 열의 정렬을 따른다 (숫자 열은 오른쪽: 이름·삼각형이 숫자 바로 위)
        SORTABLE_HEAD_ALIGN_CLASS[align],
        // # 열은 번호 칸만 차지한다 (스프라이트 칸은 빈 머리글). 오른쪽 패딩을 4px로 줄여
        // 머리글(# ▴▾)이 아래 네 자리 번호(왼쪽 14px ~ 오른쪽 약 51px)와 같은 폭이 되게 한다
        isDexNumber && 'pr-1',
      )}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className={cn(
          // 이름 바로 옆에 삼각형 (글자 폭만큼). -mx: 누름 배경은 셀 패딩까지, 글자는 셀 내용 끝에 맞춘다
          'group -mx-2.5 h-9 gap-1.5 rounded-lg px-2.5',
          // 지금 기준: 이름까지 primary 글자색 (선택된 상태 = primary, 모바일 카드의 정렬 칸과 같은 색)
          order &&
            'font-semibold text-primary-text hover:text-primary-text aria-expanded:text-primary-text',
        )}
      >
        {label}
        <SortTriangles order={order} />
      </Button>
    </div>
  );

  if (!isDexNumber) {
    return header;
  }

  // # 열 둘째 칸(스프라이트) 자리를 비워 둔다 (table-layout DEX_TRACKS)
  return (
    <>
      {header}
      <div aria-hidden />
    </>
  );
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
    <span aria-hidden="true" className="flex flex-col gap-[3px]">
      <span className={triangleClass('asc')} />
      <span className={triangleClass('desc')} />
    </span>
  );
}
