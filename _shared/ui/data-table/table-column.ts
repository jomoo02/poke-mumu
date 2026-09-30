import type { ReactNode } from 'react';

type SortOrder = 'asc' | 'desc';

type ColumnAlign = 'left' | 'center' | 'right';

interface SortState<K extends string> {
  sort: K;
  order: SortOrder;
}

interface TableColumn<Row, K extends string> {
  id: string;
  header: string;
  // grid 트랙 값 (예: 'minmax(0,2fr)', '112px')
  width: string;
  // 셀·헤더 내용의 가로 정렬 (기본 'left')
  // 숫자 열은 'right'로 자릿수 끝을, 아이콘 열은 'center'로 가운데를 맞춘다
  align?: ColumnAlign;
  // 있으면 정렬 가능한 컬럼
  sortKey?: K;
  cell: (row: Row) => ReactNode;
  cellClassName?: string;
  // 로딩 중 셀 자리 표시. 없으면 한 줄 막대를 쓴다
  skeleton?: ReactNode;
}

export type { ColumnAlign, SortOrder, SortState, TableColumn };
