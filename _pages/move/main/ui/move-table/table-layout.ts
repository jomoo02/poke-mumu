import type { CSSProperties } from 'react';

import type { SortKey } from '../../model/sort';

type TableColumnId =
  | 'moveNumber'
  | 'name'
  | 'type'
  | 'damageClass'
  | 'power'
  | 'accuracy'
  | 'pp'
  | 'description';

// 머리글이 읽는 열 정보 (행은 열마다 직접 그린다)
interface TableColumn {
  id: TableColumnId;
  header: string;
  align: 'left' | 'right';
  sortKey?: SortKey;
}

// 설명은 맨 끝: 번호·이름·타입·분류·수치를 이어 읽고, 설명은 남는 폭에서 두 줄까지
const COLUMNS: readonly TableColumn[] = [
  { id: 'moveNumber', header: '#', align: 'left', sortKey: 'moveNumber' },
  { id: 'name', header: '이름', align: 'left', sortKey: 'name' },
  { id: 'type', header: '타입', align: 'left' },
  { id: 'damageClass', header: '분류', align: 'left' },
  { id: 'power', header: '위력', align: 'right', sortKey: 'power' },
  { id: 'accuracy', header: '명중', align: 'right', sortKey: 'accuracy' },
  { id: 'pp', header: 'PP', align: 'right', sortKey: 'pp' },
  { id: 'description', header: '설명', align: 'left' },
];

// 열 너비 (rem). 글자·여백·삼각형이 rem이라 브라우저 글자 크기를 키우면 함께 넓어진다.
// 16px 기준 값은 주석. 설명은 두 줄을 넘으면 말줄임이라 폭을 줄이고, 아이콘·수치 열에 여유를 준다
const COLUMN_TRACK: Record<TableColumnId, string> = {
  moveNumber: 'minmax(5.5rem,0.65fr)', // 88px: 세 자리 번호, '#' + 삼각형
  name: 'minmax(9rem,1.5fr)', // 144px
  type: 'minmax(4.5rem,0.6fr)', // 72px: 아이콘 28px + 좌우 여백
  damageClass: 'minmax(4.5rem,0.6fr)', // 72px
  power: 'minmax(5.5rem,0.75fr)', // 88px: '위력' + 삼각형
  accuracy: 'minmax(5.5rem,0.75fr)', // 88px
  pp: 'minmax(5rem,0.65fr)', // 80px
  description: 'minmax(0,3.25fr)',
};

const TABLE_VARS = {
  '--table-cols': COLUMNS.map((column) => COLUMN_TRACK[column.id]).join(' '),
} as CSSProperties;

// 머리글·행이 함께 쓰는 grid
const GRID_CLASS = 'grid grid-cols-(--table-cols) items-center';

// 높이 고정 64px (특성 표와 같다). 설명은 두 줄까지(line-clamp-2, 42px)라 어느 폭에서도 넘치지 않는다
const BODY_ROW_CLASS = 'h-16 border-b last:border-b-0';

const HEADER_ROW_CLASS =
  'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';

const HEAD_CELL_CLASS = 'px-4';

// 머리글 정렬 버튼의 가로 정렬 (숫자 열은 이름·삼각형이 숫자 바로 위)
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
