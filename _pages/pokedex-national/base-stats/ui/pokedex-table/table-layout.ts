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

// 열 너비 (grid 트랙)
const STAT_MIN_WIDTH: Record<StatKey, number> = {
  total: 72,
  hp: 64,
  attack: 72,
  defense: 72,
  specialAttack: 100,
  specialDefense: 100,
  speed: 84,
};

const getColumnTrack = (id: TableColumnId): string => {
  switch (id) {
    case 'dexNumber':
      return 'minmax(144px,1fr)';
    case 'name':
      return 'minmax(120px,2fr)';
    case 'type':
      return 'minmax(88px,1fr)';
    default:
      return `minmax(${STAT_MIN_WIDTH[id]}px,0.75fr)`;
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
