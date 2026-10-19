import type { CSSProperties } from 'react';

import type { Move } from '@/_entities/move';
import type { TableColumn } from '@/_shared/ui/data-table';
import type { SortKey } from '@/_pages/move/list/model/move-sort';
import { MOVE_COLUMNS } from '@/_pages/move/list/ui/results/move-table/columns';

/*
 * 레이아웃
 * - lg 이상: /move와 같은 한 줄 grid(--table-cols). 앞 칸·나머지 래퍼는 lg:contents로 풀려 같은 grid에 들어간다
 * - lg 미만: [앞 칸(#·이름) sticky, 폭 --lead-w] + [나머지 grid(--rest-cols)]. 넘치는 만큼 가로 스크롤
 * 헤더와 바디가 같은 변수를 써서 칸 폭이 정확히 맞는다
 */

type MoveColumn = TableColumn<Move, SortKey>;

// 고정할 앞 칸. MOVE_COLUMNS 순서(# → 이름)를 그대로 따른다
const LEAD_COLUMN_IDS = ['moveNumber', 'name'];

// /move의 셀·폭을 그대로 쓰고 이름 칸만 따로 그린다 (stretched link 없는 버전)
const LEAD_COLUMNS: readonly MoveColumn[] = MOVE_COLUMNS.filter((column) =>
  LEAD_COLUMN_IDS.includes(column.id),
);

const REST_COLUMNS: readonly MoveColumn[] = MOVE_COLUMNS.filter(
  (column) => !LEAD_COLUMN_IDS.includes(column.id),
);

// 행 높이 (border 1 포함)
// - lg 이상: 타입·분류 IconLabel(아이콘 28 + gap 6 + text-sm 20) + 셀 패딩 28 + 1
// - lg 미만: 타입·분류가 아이콘만이라 아이콘 28 + 셀 패딩 28 + 1
// 행 크기·위치·바디 높이는 CSS 변수 --row-h로 그려 서버 HTML(화면 폭을 모름)부터 맞는다.
// JS 값(ROW_HEIGHT)은 가상화가 보이는 범위를 고르는 데만 쓴다. 두 값은 같아야 한다
const ROW_HEIGHT = { mobile: 57, desktop: 83 } as const;

// 테이블 루트에 둔다
const ROW_HEIGHT_VARS_CLASS = '[--row-h:57px] lg:[--row-h:83px]';

// lg 미만 앞 칸 폭(셀 패딩 포함). #: 세 자리 번호, 이름: 나머지 (영·일 이름은 숨긴다)
const LEAD_NUMBER_WIDTH = 56;
const LEAD_NAME_WIDTH = 124;

// gap-5 / pl-5
const GAP = 20;

// lg 미만 열 폭. 타입·분류는 아이콘만이라 아이콘(28) + 셀 패딩(28)
const MOBILE_WIDTHS: Partial<Record<string, string>> = {
  type: '56px',
  damageClass: '56px',
};

const getMobileWidth = (column: MoveColumn) =>
  MOBILE_WIDTHS[column.id] ?? column.width;

// 'minmax(72px,1fr)' · '64px' → 72 · 64
const getMinWidth = (width: string) => {
  const match = /(\d+)px/.exec(width);
  return match ? Number(match[1]) : 0;
};

// 나머지 칸의 최소 폭: 앞 칸과의 간격(pl-5) + 칸 최소 폭 합 + 칸 사이 간격
const REST_MIN_WIDTH =
  GAP +
  REST_COLUMNS.reduce(
    (sum, column) => sum + getMinWidth(getMobileWidth(column)),
    0,
  ) +
  GAP * (REST_COLUMNS.length - 1);

const TABLE_VARS = {
  '--table-cols': MOVE_COLUMNS.map((column) => column.width).join(' '),
  '--rest-cols': REST_COLUMNS.map(getMobileWidth).join(' '),
  '--rest-min': `${REST_MIN_WIDTH}px`,
  '--lead-num-w': `${LEAD_NUMBER_WIDTH}px`,
  '--lead-w': `${LEAD_NUMBER_WIDTH + LEAD_NAME_WIDTH}px`,
} as CSSProperties;

// lg 이상에서 한 줄 grid. 앞 칸·나머지 래퍼가 contents로 풀려 /move와 같은 grid가 된다
const LG_GRID_CLASS =
  'lg:grid lg:grid-cols-(--table-cols) lg:items-center lg:gap-5';

// lg 미만 나머지 칸 grid. lg 이상에선 풀린다
const REST_GRID_CLASS =
  'grid grid-cols-(--rest-cols) items-center gap-5 pl-5 lg:contents';

// _shared/ui/data-table/table-layout.ts와 같은 값 (공개 API가 아니라 복사)
const HEADER_ROW_CLASS =
  'sticky top-(--header-height) z-10 h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';

const HEAD_CELL_CLASS = 'px-3.5';

const CELL_CLASS = 'p-3.5';

const CELL_ALIGN_CLASS = {
  left: '',
  center: 'flex justify-center',
  right: 'text-right',
} as const;

const SORTABLE_HEAD_ALIGN_CLASS = {
  left: '',
  center: 'flex justify-center',
  right: 'flex justify-end',
} as const;

// lg 미만 앞 칸 안에서 각 칸의 폭. #은 고정, 이름은 남는 폭
const getLeadCellClass = (column: MoveColumn) =>
  column.id === 'moveNumber'
    ? 'w-(--lead-num-w) shrink-0 lg:w-auto'
    : 'min-w-0 flex-1';

export type { MoveColumn };

export {
  LEAD_COLUMNS,
  REST_COLUMNS,
  ROW_HEIGHT,
  ROW_HEIGHT_VARS_CLASS,
  TABLE_VARS,
  LG_GRID_CLASS,
  REST_GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  CELL_CLASS,
  CELL_ALIGN_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
  getLeadCellClass,
};
