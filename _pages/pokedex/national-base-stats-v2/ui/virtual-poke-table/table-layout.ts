import type { CSSProperties } from 'react';

import type { TableColumn } from '@/_shared/ui/data-table';
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { SortKey } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { POKE_COLUMNS } from '@/_pages/pokedex/national-base-stats/ui/results/poke-table/columns';

/*
 * 레이아웃. 기존 페이지처럼 화면 폭이 아닌 본문 폭(@container, @5xl = 1024px)으로 나눈다
 * - @5xl 이상: 기존과 같은 한 줄 grid(--table-cols). 앞 칸·나머지 래퍼는 @5xl:contents로 풀린다
 * - @5xl 미만: [앞 칸(#·이름) sticky, 폭 --lead-w] + [나머지 grid(--rest-cols)]. 넘치는 만큼 가로 스크롤
 * 헤더와 바디가 같은 변수를 써서 칸 폭이 정확히 맞는다
 */

type PokeColumn = TableColumn<BaseStatsPoke, SortKey>;

// 고정할 앞 칸. POKE_COLUMNS 순서(# → 이름)를 그대로 따른다
const LEAD_COLUMN_IDS = ['dexNumber', 'name'];

const LEAD_COLUMNS: readonly PokeColumn[] = POKE_COLUMNS.filter((column) =>
  LEAD_COLUMN_IDS.includes(column.id),
);

const REST_COLUMNS: readonly PokeColumn[] = POKE_COLUMNS.filter(
  (column) => !LEAD_COLUMN_IDS.includes(column.id),
);

// 행 높이 (border 1 포함)
// - @5xl 이상: # 칸 스프라이트(size-10, 40) + 셀 패딩 28 + 1
// - @5xl 미만: 세로로 쌓은 타입(28 + 4 + 28 = 60, 스프라이트 48보다 높다) + 셀 패딩 28 + 1
// 행 크기·위치·바디 높이는 CSS 변수 --row-h로 그려 서버 HTML(본문 폭을 모름)부터 맞는다.
// JS는 이 값을 읽어(useCssRowHeight) 가상화가 보이는 범위를 고르는 데만 쓴다
const ROW_HEIGHT = { narrow: 89, wide: 69 } as const;

// 테이블 루트에 둔다 (@container 안이어야 한다)
const ROW_HEIGHT_VARS_CLASS = '[--row-h:89px] @5xl:[--row-h:69px]';

// @5xl 미만 앞 칸 폭(셀 패딩 포함). #: 네 자리 번호, 이름: 스프라이트(48) + gap-2 + 이름 약 76px
const LEAD_NUMBER_WIDTH = 64;
const LEAD_NAME_WIDTH = 160;

// 기존 테이블의 gap-3 / pl-3
const GAP = 12;

// @5xl 미만 열 폭. 타입은 아이콘을 세로로 쌓아 아이콘(28) + 셀 패딩(28)
const NARROW_WIDTHS: Partial<Record<string, string>> = {
  type: '56px',
};

const getNarrowWidth = (column: PokeColumn) =>
  NARROW_WIDTHS[column.id] ?? column.width;

// 'minmax(88px,1fr)' · '112px' → 88 · 112
const getMinWidth = (width: string) => {
  const match = /(\d+)px/.exec(width);
  return match ? Number(match[1]) : 0;
};

// 나머지 칸의 최소 폭: 앞 칸과의 간격(pl-3) + 칸 최소 폭 합 + 칸 사이 간격
const REST_MIN_WIDTH =
  GAP +
  REST_COLUMNS.reduce(
    (sum, column) => sum + getMinWidth(getNarrowWidth(column)),
    0,
  ) +
  GAP * (REST_COLUMNS.length - 1);

const TABLE_VARS = {
  '--table-cols': POKE_COLUMNS.map((column) => column.width).join(' '),
  '--rest-cols': REST_COLUMNS.map(getNarrowWidth).join(' '),
  '--rest-min': `${REST_MIN_WIDTH}px`,
  '--lead-num-w': `${LEAD_NUMBER_WIDTH}px`,
  '--lead-w': `${LEAD_NUMBER_WIDTH + LEAD_NAME_WIDTH}px`,
} as CSSProperties;

// @5xl 이상에서 한 줄 grid. 앞 칸·나머지 래퍼가 contents로 풀려 기존과 같은 grid가 된다
const WIDE_GRID_CLASS =
  '@5xl:grid @5xl:grid-cols-(--table-cols) @5xl:items-center @5xl:gap-3';

// @5xl 미만 나머지 칸 grid. @5xl 이상에선 풀린다
const REST_GRID_CLASS =
  'grid grid-cols-(--rest-cols) items-center gap-3 pl-3 @5xl:contents';

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

// @5xl 미만 앞 칸 안에서 각 칸의 폭. #은 고정, 이름은 남는 폭
const getLeadCellClass = (column: PokeColumn) =>
  column.id === 'dexNumber'
    ? 'w-(--lead-num-w) shrink-0 @5xl:w-auto'
    : 'min-w-0 flex-1';

export type { PokeColumn };

export {
  LEAD_COLUMNS,
  REST_COLUMNS,
  ROW_HEIGHT,
  ROW_HEIGHT_VARS_CLASS,
  TABLE_VARS,
  WIDE_GRID_CLASS,
  REST_GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  CELL_CLASS,
  CELL_ALIGN_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
  getLeadCellClass,
};
