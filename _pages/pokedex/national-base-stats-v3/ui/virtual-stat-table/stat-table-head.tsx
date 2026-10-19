'use client';

import type { Ref } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { STAT_LABEL } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type {
  PokeSort,
  SortKey,
} from '@/_pages/pokedex/national-base-stats/model/poke-sort';

import type { SortUi } from '../../model/use-sort-ui';
import {
  CELL_ALIGN_CLASS,
  DEX_COLUMN,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  INFO_COLUMNS,
  NAME_COLUMN,
  NARROW_GRID_CLASS,
  NARROW_HEAD_COLUMNS,
  SIX_STAT_COLUMNS,
  SORTABLE_HEAD_ALIGN_CLASS,
  STAT_COLUMNS,
  STAT_LETTER,
  TOTAL_COLUMN,
  WIDE_GRID_CLASS,
  type PokeColumn,
} from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;
const SORT_ICON = { asc: ArrowUpIcon, desc: ArrowDownIcon } as const;

interface StatTableHeadProps {
  ref?: Ref<HTMLDivElement>;
  // 좁은 화면 정렬 UI (비교용)
  sortUi: SortUi;
  // 7칸 머리글 UI에서 머리글을 보여 줄지 (능력치순일 때만)
  showColumnHead: boolean;
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

const getOrder = (column: PokeColumn, sortState: PokeSort) =>
  column.sortKey && sortState.sort === column.sortKey ? sortState.order : null;

// window 기준 sticky. 본문 폭에 따라 둘 중 하나만 보인다
// - @5xl 미만: sortUi에 따라
//   - letter: 행 아랫줄과 같은 7칸 한 글자 머리글 (H A B C D S 합). 고른 칸은 알약 배경
//   - segment: 같은 7칸을 둥근 틀로 감싼 세그먼트 컨트롤. 고른 칸만 띄운다
//   - always: 한 글자 머리글을 항상 보여 준다. 누르면 그 능력치로 정렬되고 위 메뉴는 '능력치순'이 된다
//   - chip: 정렬 칩 한 줄 (가로 스크롤). 행의 능력치에 라벨이 붙어 칸 맞춤이 필요 없다
//   - radio: 머리글 없음. 정렬은 위 정렬 버튼의 바텀시트(방향·기준 radio)에서 고른다
//   letter·segment의 7칸 머리글은 능력치순일 때만 나타난다. 도감번호·이름(방향 포함)·능력치순은 위 정렬 메뉴에서 고른다
// - @5xl 이상: 기존과 같은 10열 헤더
export default function StatTableHead({
  ref,
  sortUi,
  showColumnHead,
  sortState,
  onSort,
}: StatTableHeadProps) {
  return (
    <div
      ref={ref}
      role="rowgroup"
      className="sticky top-(--header-height) z-10"
    >
      {sortUi === 'chip' ? (
        <SortChipBar sortState={sortState} onSort={onSort} />
      ) : (
        showColumnHead && (
          <ColumnHead
            // 항상 머리글은 한 글자 모양을 쓴다
            variant={sortUi === 'segment' ? 'segment' : 'letter'}
            sortState={sortState}
            onSort={onSort}
          />
        )
      )}
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
  );
}

interface HeadCellProps {
  column: PokeColumn;
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

interface ColumnHeadProps {
  variant: 'letter' | 'segment';
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

// 머리글 바깥 모양 (안쪽 7칸 grid는 행 아랫줄과 같아야 칸이 맞는다)
// - letter: 페이지 배경 + 아래 구분선
// - segment: 위아래 여백 + 둥근 회색 틀
const COLUMN_HEAD_CLASS = {
  letter: 'h-10 border-b bg-background',
  segment: 'h-9 rounded-lg bg-muted',
} as const;

// 고른 칸
// - letter: 행 정렬 칸과 같은 회색 알약
// - segment: 회색 틀 위에 배경색 블록으로 띄운다
const ACTIVE_CLASS = {
  letter: 'bg-muted text-foreground font-semibold',
  segment: 'bg-background text-foreground font-semibold shadow-sm',
} as const;

// 7칸 한 글자 머리글 (H A B C D S 합). 고른 칸만 방향 화살표
function ColumnHead({ variant, sortState, onSort }: ColumnHeadProps) {
  return (
    <div
      className={cn(
        'text-sm font-medium text-foreground/70 @5xl:hidden',
        variant === 'segment' && 'bg-background py-1.5',
      )}
    >
      <div
        role="row"
        className={cn(
          NARROW_GRID_CLASS.column,
          'items-center',
          COLUMN_HEAD_CLASS[variant],
        )}
      >
        {NARROW_HEAD_COLUMNS.map((column) => {
          const sortKey = column.sortKey;
          if (!sortKey) {
            return null;
          }

          const order = getOrder(column, sortState);
          const Icon = order ? SORT_ICON[order] : null;
          const statKey = column.id as keyof typeof STAT_LETTER;

          return (
            <div
              key={column.id}
              role="columnheader"
              aria-sort={order ? ARIA_SORT[order] : 'none'}
              className="flex"
            >
              <button
                type="button"
                onClick={() => onSort(sortKey)}
                aria-label={STAT_LABEL[statKey]}
                className={cn(
                  'flex h-8 w-full items-center justify-center gap-0.5 rounded-md outline-none',
                  'focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  'transition-colors',
                  order
                    ? ACTIVE_CLASS[variant]
                    : '[@media(hover:hover)]:hover:text-foreground',
                )}
              >
                {STAT_LETTER[statKey]}
                {Icon && <Icon aria-hidden="true" className="size-3" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 칩 바 순서: 자주 쓰는 종족값 → 능력치 6종(게임 표시 순서) → 도감번호·이름
const CHIP_COLUMNS: readonly PokeColumn[] = [
  TOTAL_COLUMN,
  ...SIX_STAT_COLUMNS,
  DEX_COLUMN,
  NAME_COLUMN,
];

const CHIP_LABEL: Partial<Record<string, string>> = {
  dexNumber: '도감번호',
};

interface SortChipBarProps {
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

// 칩형: 고른 칩은 채운 색 + 방향 화살표. 같은 칩을 다시 누르면 방향이 바뀐다
function SortChipBar({ sortState, onSort }: SortChipBarProps) {
  return (
    <div
      role="toolbar"
      aria-label="정렬 기준"
      className={cn(
        'flex gap-1.5 overflow-x-auto bg-background py-2 [scrollbar-width:none]',
        '@5xl:hidden',
      )}
    >
      {CHIP_COLUMNS.map((column) => {
        const sortKey = column.sortKey;
        if (!sortKey) {
          return null;
        }

        const order = getOrder(column, sortState);
        const Icon = order ? SORT_ICON[order] : null;

        return (
          <Button
            key={column.id}
            type="button"
            variant="secondary"
            onClick={() => onSort(sortKey)}
            aria-pressed={order !== null}
            aria-label={column.headerLabel}
            className={cn(
              'h-9 shrink-0 gap-1 rounded-full px-3.5 text-sm font-medium',
              order
                ? 'bg-foreground text-background [@media(hover:hover)]:hover:bg-foreground/90'
                : 'bg-muted text-foreground/70',
            )}
          >
            {CHIP_LABEL[column.id] ?? column.header}
            {Icon && <Icon aria-hidden="true" className="size-3.5" />}
          </Button>
        );
      })}
    </div>
  );
}

// _shared/ui/data-table의 헤더 셀과 같은 모양 (공개 API가 아니라 복사).
// headerLabel이 있으면 화면엔 줄인 이름(특공), 스크린리더엔 전체 이름(특수공격)
function WideHeadCell({ column, sortState, onSort }: HeadCellProps) {
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
  const Icon = order ? SORT_ICON[order] : ArrowUpDownIcon;

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn(HEAD_CELL_CLASS, SORTABLE_HEAD_ALIGN_CLASS[align])}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSort(sortKey)}
        aria-label={column.headerLabel}
        className={cn(
          '-mx-2.5 h-9 rounded-lg px-2.5 group',
          order && 'text-foreground hover:text-foreground font-semibold',
        )}
      >
        {column.header}
        <Icon
          aria-hidden="true"
          className={cn(
            'size-4',
            !order &&
              'text-foreground/50 group-hover:text-foreground transition-colors',
          )}
        />
      </Button>
    </div>
  );
}
