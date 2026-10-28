import type { PokeSort, SortKey, SortOrder } from '../../model/sort';

// 시트 제목·팝오버 접근 이름·버튼 접근 이름 앞말
export const SORT_TITLE = '정렬';

// 시트·팝오버가 받는 값 (SortControl이 그대로 넘긴다)
export interface SortPanelProps {
  sortState: PokeSort;
  // 기준: 다른 기준이면 그 기준의 첫 방향부터
  onSelectKey: (key: SortKey) => void;
  // 방향 (기준은 그대로)
  onSelectOrder: (order: SortOrder) => void;
}
