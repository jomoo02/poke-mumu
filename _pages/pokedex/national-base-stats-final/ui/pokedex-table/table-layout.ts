import type { CSSProperties } from 'react';

import {
  STAT_KEYS,
  STAT_LABEL,
  type StatKey,
} from '../../model/base-stats-poke';
import type { SortKey } from '../../model/sort';

type StatTableColumnId = 'dexNumber' | 'name' | 'type' | StatKey;

// 머리글이 읽는 열 정보 (행은 열마다 직접 그린다)
interface StatTableColumn {
  id: StatTableColumnId;
  header: string;
  align: 'left' | 'right' | 'center';
  sortKey?: SortKey;
}

const INFO_COLUMNS: readonly StatTableColumn[] = [
  { id: 'dexNumber', header: '도감번호', align: 'left', sortKey: 'dexNumber' },
  { id: 'name', header: '이름', align: 'left', sortKey: 'name' },
  { id: 'type', header: '타입', align: 'left' },
];

const STAT_COLUMNS: readonly StatTableColumn[] = STAT_KEYS.map((key) => ({
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

const getColumnTrack = (id: StatTableColumnId): string => {
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
// 머리글·행이 함께 쓰는 grid (기존 테이블의 gap-3)
const GRID_CLASS = 'grid grid-cols-(--table-cols) items-center';

// _shared/ui/data-table/table-layout.ts와 같은 값 (공개 API가 아니라 복사)
const HEADER_ROW_CLASS =
  'h-11 rounded-lg bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';
// 'h-11 rounded-md bg-muted text-sm font-normal whitespace-nowrap';

const HEAD_CELL_CLASS = 'px-4';

// 머리글 정렬 버튼의 가로 정렬 (열의 정렬을 따른다: 숫자 열은 이름·삼각형이 숫자 바로 위)
const SORTABLE_HEAD_ALIGN_CLASS: Record<StatTableColumn['align'], string> = {
  left: '',
  center: 'flex justify-center',
  right: 'flex justify-end',
};

export type { StatTableColumn };

export {
  INFO_COLUMNS,
  STAT_COLUMNS,
  TABLE_VARS,
  GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
};
