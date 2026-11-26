import type { MoveSort, SortKey, SortOrder } from '../../model/sort';

// 정렬 패널 제목·전체 패널의 정렬 섹션 제목·버튼 접근 이름
export const SORT_TITLE = '정렬';

// 정렬 패널·전체 패널이 받는 값 (Toolbar가 그대로 넘긴다)
export interface SortProps {
  sortState: MoveSort;
  // 다른 기준을 고를 때: 그 기준의 첫 방향부터
  onSelectKey: (key: SortKey) => void;
  // 고른 기준을 다시 누를 때: 기준은 그대로 방향만
  onSelectOrder: (order: SortOrder) => void;
}
