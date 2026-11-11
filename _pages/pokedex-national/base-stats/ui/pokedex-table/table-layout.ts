import type { CSSProperties } from 'react';

import { STAT_KEYS, STAT_LABEL, type StatKey } from '../../model/poke';
import type { SortKey } from '../../model/sort';

type TableColumnId = 'dexNumber' | 'name' | 'type' | StatKey;

// 머리글이 읽는 열 정보 (행은 열마다 직접 그린다)
interface TableColumn {
  id: TableColumnId;
  header: string;
  align: 'left' | 'right';
  sortKey?: SortKey;
}

const INFO_COLUMNS: readonly TableColumn[] = [
  { id: 'dexNumber', header: '도감번호', align: 'left', sortKey: 'dexNumber' },
  { id: 'name', header: '이름', align: 'left', sortKey: 'name' },
  { id: 'type', header: '타입', align: 'left' },
];

const STAT_COLUMNS: readonly TableColumn[] = STAT_KEYS.map((key) => ({
  id: key,
  header: STAT_LABEL[key],
  align: 'right',
  sortKey: key,
}));

// 열 최소 너비 (rem). 글자·여백·삼각형이 rem이라 브라우저 글자 크기를 키우면 함께 넓어진다
// (px로 두면 큰 글자에서 머리글 정렬 버튼이 셀 밖으로 나간다). 16px 기준 값은 주석
const STAT_MIN_WIDTH: Record<StatKey, number> = {
  total: 4.5, // 72px
  hp: 4, // 64px
  attack: 4.5, // 72px
  defense: 4.5, // 72px
  specialAttack: 6.25, // 100px
  specialDefense: 6.25, // 100px
  speed: 5.25, // 84px
};

const getColumnTrack = (id: TableColumnId): string => {
  switch (id) {
    case 'dexNumber':
      return 'minmax(9rem,1fr)'; // 144px
    case 'name':
      return 'minmax(7.5rem,2fr)'; // 120px
    case 'type':
      return 'minmax(5.5rem,1fr)'; // 88px
    default:
      return `minmax(${STAT_MIN_WIDTH[id]}rem,0.75fr)`;
  }
};

const TABLE_VARS = {
  '--table-cols': [...INFO_COLUMNS, ...STAT_COLUMNS]
    .map((column) => getColumnTrack(column.id))
    .join(' '),
} as CSSProperties;

// 머리글·행이 함께 쓰는 grid
const GRID_CLASS = 'grid grid-cols-(--table-cols) items-center';

const HEADER_ROW_CLASS =
  'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';

const HEAD_CELL_CLASS = 'px-4';

// 머리글 정렬 버튼의 가로 정렬 (열의 정렬을 따른다: 숫자 열은 이름·삼각형이 숫자 바로 위)
const SORTABLE_HEAD_ALIGN_CLASS: Record<TableColumn['align'], string> = {
  left: '',
  right: 'flex justify-end',
};

export type { TableColumn };

export {
  INFO_COLUMNS,
  STAT_COLUMNS,
  TABLE_VARS,
  GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
};
