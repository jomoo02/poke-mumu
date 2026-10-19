'use client';

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronsUpDownIcon,
} from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import {
  STAT_LABEL,
  type StatKey,
} from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type {
  PokeSort,
  SortKey,
} from '@/_pages/pokedex/national-base-stats/model/poke-sort';

import {
  CELL_ALIGN_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  INFO_COLUMNS,
  DEX_COLUMN,
  NAME_COLUMN,
  NARROW_GRID_CLASS,
  NARROW_STAT_COLUMNS,
  NARROW_STAT_LETTER,
  SORTABLE_HEAD_ALIGN_CLASS,
  STAT_COLUMNS,
  WIDE_GRID_CLASS,
  type PokeColumn,
} from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;
// 정렬할 수 있는 머리글엔 늘 ⇕를 두고, 지금 기준만 방향(⌃ 오름차순 / ⌄ 내림차순)으로 바꾼다 (넓은·좁은 본문 같다)
const SORT_ICON = { asc: ChevronUpIcon, desc: ChevronDownIcon } as const;

const getSortIcon = (order: PokeSort['order'] | null) =>
  order ? SORT_ICON[order] : ChevronsUpDownIcon;

interface StatTableHeadProps {
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

const getOrder = (column: PokeColumn, sortState: PokeSort) =>
  column.sortKey && sortState.sort === column.sortKey ? sortState.order : null;

// 본문 폭에 따라 둘 중 하나만 보인다
// - @5xl 미만: 카드와 같은 7칸 grid의 머리글 두 줄. 첫째 줄 [번호] [이름]은 고정하지 않고,
//   둘째 줄(총합 + 능력치 6칸)만 window 기준 sticky
// - @5xl 이상: 10열 헤더 (번호·이름·능력치 정렬). window 기준 sticky
export default function StatTableHead({ sortState, onSort }: StatTableHeadProps) {
  return (
    <>
      {/* 좁은 본문 첫째 줄(번호·이름)은 정렬 버튼 역할만 해 고정하지 않는다.
          카드에서 번호는 'No.' 글자가 스스로 설명한다 */}
      <div role="rowgroup" className="@5xl:hidden">
        <NarrowSortRow sortState={sortState} onSort={onSort} />
      </div>
      <div role="rowgroup" className="sticky top-(--header-height) z-10">
        <NarrowStatHead sortState={sortState} onSort={onSort} />
        <div
          role="row"
          className={cn(HEADER_ROW_CLASS, 'hidden @5xl:grid', WIDE_GRID_CLASS)}
        >
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
    </>
  );
}

interface HeadProps {
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

/**
 * 좁은 본문 머리글 두 줄. 카드 능력치 줄과 같은 7칸 grid
 *   첫째 줄(이 함수, 고정 안 함): [번호⇕] [이름⇕]
 *   둘째 줄(NarrowStatHead, 고정): H⇕ A⇕ B⇕ C⇕ D⇕ S⇕ 총합⇕
 * 처음 누르면 그 기준의 첫 방향(번호·이름 오름차순, 수치 높은 순), 다시 누르면 반대 (toggleSort).
 * 모든 칸이 같은 모양: 이름 + ⇕, 지금 기준만 ⌃·⌄ + 강조색
 */
function NarrowSortRow({ sortState, onSort }: HeadProps) {
  return (
    <div
      role="row"
      className={cn(
        NARROW_GRID_CLASS,
        'h-9.5 items-center bg-background text-sm font-medium',
      )}
    >
      <NarrowHeadCell
        column={DEX_COLUMN}
        label="번호"
        sortState={sortState}
        onSort={onSort}
        fill
        tall
      />
      <NarrowHeadCell
        column={NAME_COLUMN}
        label={NAME_COLUMN.header}
        sortState={sortState}
        onSort={onSort}
        fill
        tall
      />
    </div>
  );
}

// 좁은 본문 둘째 줄: 카드 능력치 줄과 같은 7칸. 숫자에 이름표가 없어 깊이 내려가도 보이게 고정한다
function NarrowStatHead({ sortState, onSort }: HeadProps) {
  return (
    <div
      role="row"
      className={cn(
        NARROW_GRID_CLASS,
        'h-9 items-center border-b bg-background text-sm font-medium @5xl:hidden',
      )}
    >
      {NARROW_STAT_COLUMNS.map((column) => (
        <NarrowHeadCell
          key={column.id}
          column={column}
          label={NARROW_STAT_LETTER[column.id as StatKey]}
          sortState={sortState}
          onSort={onSort}
          fill
        />
      ))}
    </div>
  );
}

interface NarrowHeadCellProps extends HeadProps {
  column: PokeColumn;
  // 화면에 보일 이름 (스크린리더엔 열 전체 이름)
  label: string;
  // 칸 폭을 꽉 채운다 (능력치·총합 칸). 아니면 글자 폭만
  fill?: boolean;
  // 고정하지 않는 첫째 줄은 조금 높게 (h-9.5)
  tall?: boolean;
  className?: string;
}

function NarrowHeadCell({
  column,
  label,
  sortState,
  onSort,
  fill = false,
  tall = false,
  className,
}: NarrowHeadCellProps) {
  const sortKey = column.sortKey;
  if (!sortKey) {
    return null;
  }

  const order = getOrder(column, sortState);
  const Icon = getSortIcon(order);

  const ariaLabel =
    column.id in STAT_LABEL
      ? STAT_LABEL[column.id as StatKey]
      : column.id === DEX_COLUMN.id
        ? '도감번호'
        : column.header;

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn('flex', fill && 'justify-center', className)}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        // 화면엔 한 글자(C), 스크린리더엔 전체 이름(특수공격)
        aria-label={ariaLabel}
        className={cn(
          // 이름 오른쪽에 정렬 아이콘. 아이콘 폭이 늘 같아 정렬을 바꿔도 글자가 움직이지 않는다
          'flex items-center justify-center gap-0.5 whitespace-nowrap rounded-md outline-none',
          tall ? 'h-9.5' : 'h-9',
          'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset',
          fill ? 'w-full' : 'px-1',
          // 지금 기준은 이름·아이콘 모두 강조색
          order
            ? 'text-primary-text'
            : 'text-foreground/70 [@media(hover:hover)]:hover:text-foreground',
        )}
      >
        {label}
        <Icon aria-hidden="true" className="size-3 shrink-0" strokeWidth={2.5} />
      </button>
    </div>
  );
}

interface WideHeadCellProps extends HeadProps {
  column: PokeColumn;
}

// _shared/ui/data-table의 헤더 셀과 같은 모양 (공개 API가 아니라 복사).
// headerLabel이 있으면 화면엔 줄인 이름(특공), 스크린리더엔 전체 이름(특수공격)
function WideHeadCell({ column, sortState, onSort }: WideHeadCellProps) {
  const align = column.align ?? 'left';
  const sortKey = column.sortKey;

  if (!sortKey) {
    return (
      <div
        role="columnheader"
        className={cn(HEAD_CELL_CLASS, CELL_ALIGN_CLASS[align])}
      >
        {column.header}
      </div>
    );
  }

  const order = getOrder(column, sortState);
  const Icon = getSortIcon(order);

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn(
        HEAD_CELL_CLASS,
        SORTABLE_HEAD_ALIGN_CLASS[align],
        // # 열은 번호·스프라이트 두 칸 (table-layout DEX_TRACKS)
        column.id === 'dexNumber' && 'col-span-2',
      )}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSort(sortKey)}
        aria-label={column.headerLabel}
        className={cn(
          'group -mx-2.5 h-9 rounded-lg px-2.5',
          order && 'font-semibold text-foreground hover:text-foreground',
        )}
      >
        {column.header}
        <Icon
          aria-hidden="true"
          className={cn(
            'size-4',
            !order &&
              'text-foreground/50 transition-colors group-hover:text-foreground',
          )}
        />
      </Button>
    </div>
  );
}
