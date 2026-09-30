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

// 셀(본문·스켈레톤)과 일반 헤더의 가로 정렬.
// center: 아이콘처럼 블록인 내용도 가운데 오도록 셀을 flex로 둔다
// right: 텍스트는 text-right, 스켈레톤 막대(SkeletonLine)는 블록이라 flex 끝으로 붙인다
const CELL_ALIGN_CLASS = {
  left: '',
  center: 'flex justify-center',
  right: 'text-right **:data-[slot=skeleton-line]:justify-end',
} as const;

// 정렬 버튼이 있는 헤더 셀의 가로 정렬.
// right: 셀을 flex로 두고 끝으로 붙인다. 버튼의 -mx-2.5 bleed가 오른쪽으로 빠져나가
// 버튼 내용(라벨 + 아이콘)의 끝선이 아래 셀 값의 끝선과 맞는다
const SORTABLE_HEAD_ALIGN_CLASS = {
  left: '',
  center: 'flex justify-center',
  right: 'flex justify-end',
} as const;

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
  CELL_ALIGN_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
  getTableColsStyle,
};
