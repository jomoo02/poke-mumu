import type { CSSProperties } from 'react';

// 실제 테이블과 스켈레톤이 같은 값을 써야 로딩 전후 레이아웃이 맞는다

// header와 row가 같은 grid 템플릿(--table-cols)을 공유해 열 정렬을 맞춘다
const GRID_ROW_CLASS = 'grid grid-cols-(--table-cols) items-center gap-5';

const HEADER_ROW_CLASS =
  'sticky top-(--header-height) z-10 h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';

const HEAD_CELL_CLASS = 'px-3.5';

// relative: 셀 안의 stretched link(after:absolute inset-0)가 행 전체를 덮도록 기준을 잡는다
const BODY_ROW_CLASS = 'relative border-b last:border-b-0';

const CELL_CLASS = 'p-3.5';

// Tailwind는 런타임에 조립한 클래스를 생성하지 못하므로 트랙 값은 CSS 변수로 넘긴다
const getTableColsStyle = (
  columns: readonly { width: string }[],
): CSSProperties =>
  ({
    '--table-cols': columns.map((column) => column.width).join(' '),
  }) as CSSProperties;

export {
  GRID_ROW_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  BODY_ROW_CLASS,
  CELL_CLASS,
  getTableColsStyle,
};
