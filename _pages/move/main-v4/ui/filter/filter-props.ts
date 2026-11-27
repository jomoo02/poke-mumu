import type { MoveFilterCounts } from '../../model/move-results';

// 통합 필터 [⚙] 제목, 트리거 접근 이름
export const ALL_FILTER_TITLE = '필터';

// 통합 필터(드로어·다이얼로그)가 받는 값
export interface AllFilterProps {
  // 아래 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
}
