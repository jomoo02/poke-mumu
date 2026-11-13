import type { MoveSort, SortKey, SortOrder } from '../../model/sort';

// 시트 제목·메뉴 접근 이름
export const SORT_TITLE = '정렬';

// 섹션 이름 (시트·메뉴 같은 문구)
export const SORT_KEY_TITLE = '정렬 기준';
export const SORT_ORDER_TITLE = '방향';

// 시트·메뉴가 받는 값 (Sort가 그대로 넘긴다)
export interface SortProps {
  sortState: MoveSort;
  // 기준 섹션: 다른 기준이면 그 기준의 첫 방향부터
  onSelectKey: (key: SortKey) => void;
  // 방향 섹션: 기준은 그대로
  onSelectOrder: (order: SortOrder) => void;
}
