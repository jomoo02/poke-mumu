import type { MoveFilterCounts } from '../../../model/move-results';

// 전체 패널(필터 그룹 전부) 제목, 트리거 접근 이름
export const ALL_PANEL_TITLE = '필터';

// 패널들이 받는 값 (Toolbar가 그대로 넘긴다)
export interface FilterProps {
  // 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
}
