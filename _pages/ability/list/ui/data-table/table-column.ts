import type { ReactNode } from 'react';

type SortOrder = 'asc' | 'desc';

interface SortState<K extends string> {
  sort: K;
  order: SortOrder;
}

interface TableColumn<Row, K extends string> {
  id: string;
  header: string;
  // grid 트랙 값 (예: 'minmax(0,2fr)', '112px')
  width: string;
  // 있으면 정렬 가능한 컬럼
  sortKey?: K;
  cell: (row: Row) => ReactNode;
  cellClassName?: string;
  // 로딩 중 셀 자리 표시. 없으면 한 줄 막대를 쓴다
  skeleton?: ReactNode;
}

export type { SortOrder, SortState, TableColumn };
