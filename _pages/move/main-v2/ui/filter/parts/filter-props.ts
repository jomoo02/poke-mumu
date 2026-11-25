import {
  MOVE_FILTER_GROUPS,
  type MoveFilterGroup,
} from '../../../model/filter';
import type { MoveFilterCounts } from '../../../model/move-results';

// 드로어·시트 제목, 트리거 접근 이름
export const FILTER_TITLE = '필터';

// 처음 열린 섹션: 첫 그룹만
export const INITIAL_OPEN_GROUPS: MoveFilterGroup[] = [MOVE_FILTER_GROUPS[0]];

// 드로어·시트가 받는 값 (Filter가 그대로 넘긴다)
export interface FilterProps {
  // 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
}

// 껍데기(드로어·시트)만: 트리거를 보일 화면 구간 (md:hidden · max-md:hidden)
export interface FilterShellProps extends FilterProps {
  triggerClassName?: string;
}
