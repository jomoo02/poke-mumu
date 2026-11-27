import type { MoveSort, SortKey, SortOrder } from '../../model/sort';

// 정렬 패널(드로어·팝오버)이 받는 값 (Toolbar가 그대로 넘긴다)
export interface SortProps {
  sortState: MoveSort;
  onSelectKey: (key: SortKey) => void;
  onSelectOrder: (order: SortOrder) => void;
}
