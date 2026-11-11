import type { CSSProperties } from 'react';

import type { SortKey } from '../../model/sort';

type TableColumnId = 'abilityNumber' | 'name' | 'flavorText' | 'appearance';

// 머리글이 읽는 열 정보 (행은 열마다 직접 그린다)
interface TableColumn {
  id: TableColumnId;
  header: string;
  align: 'left' | 'right';
  sortKey?: SortKey;
}

const COLUMNS: readonly TableColumn[] = [
  { id: 'abilityNumber', header: '#', align: 'left', sortKey: 'abilityNumber' },
  { id: 'name', header: '이름', align: 'left', sortKey: 'name' },
  { id: 'flavorText', header: '설명', align: 'left' },
  { id: 'appearance', header: '등장', align: 'left', sortKey: 'appearance' },
];

// 열 너비 (rem). 글자·여백·삼각형이 rem이라 브라우저 글자 크기를 키우면 함께 넓어진다.
// 16px 기준 값은 주석. 설명이 남는 폭을 가장 많이 가져간다
const COLUMN_TRACK: Record<TableColumnId, string> = {
  abilityNumber: 'minmax(5.5rem,0.65fr)', // 88px: 세 자리 번호, '#' + 삼각형
  name: 'minmax(9rem,1.75fr)', // 144px
  flavorText: 'minmax(0,5fr)',
  appearance: 'minmax(6.5rem,0.85fr)', // 104px: '챔피언스', '등장' + 삼각형
};

const TABLE_VARS = {
  '--table-cols': COLUMNS.map((column) => COLUMN_TRACK[column.id]).join(' '),
} as CSSProperties;

// 머리글·행이 함께 쓰는 grid
const GRID_CLASS = 'grid grid-cols-(--table-cols) items-center';

// 높이 고정 64px. 설명은 두 줄까지(line-clamp-2, 42px)라 어느 폭에서도 넘치지 않는다.
// 이미지가 없는 텍스트 표라 전국도감 종족값 행(70px, 스프라이트 기준)보다 낮게 둔다
const BODY_ROW_CLASS = 'h-16 border-b last:border-b-0';

const HEADER_ROW_CLASS =
  'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';

const HEAD_CELL_CLASS = 'px-4';

// 머리글 정렬 버튼의 가로 정렬 (열의 정렬을 따른다)
const SORTABLE_HEAD_ALIGN_CLASS: Record<TableColumn['align'], string> = {
  left: '',
  right: 'flex justify-end',
};

export type { TableColumn };

export {
  COLUMNS,
  TABLE_VARS,
  GRID_CLASS,
  BODY_ROW_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
};
