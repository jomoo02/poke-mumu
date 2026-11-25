import type { MoveSort, SortKey, SortOrder } from '../../model/sort';

// 정렬 패널 제목·전체 패널의 정렬 섹션 제목·버튼 접근 이름
export const SORT_TITLE = '정렬';

// 섹션 이름 (정렬 드로어·팝오버·전체 패널 같은 문구)
export const SORT_KEY_TITLE = '정렬 기준';
export const SORT_ORDER_TITLE = '정렬 방향';

// 정렬 패널·전체 패널이 받는 값 (Toolbar가 그대로 넘긴다)
export interface SortProps {
  sortState: MoveSort;
  // 기준 섹션: 다른 기준이면 그 기준의 첫 방향부터
  onSelectKey: (key: SortKey) => void;
  // 방향 섹션: 기준은 그대로
  onSelectOrder: (order: SortOrder) => void;
}
