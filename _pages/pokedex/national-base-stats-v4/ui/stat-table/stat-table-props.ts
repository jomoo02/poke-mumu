import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats-v0/model/base-stats-poke';
import type { NameLanguage } from '../../model/name-language';
import type {
  PokeSort,
  SortKey,
} from '@/_pages/pokedex/national-base-stats-v0/model/poke-sort';

// 전체 그리기·가상화 테이블 공통 props
export interface StatTableProps {
  // 지금 보이는 행 (지연 값으로 계산한 목록)
  pokes: BaseStatsPoke[];
  // 지금 고른 정렬 (머리글 화살표)
  sortState: PokeSort;
  // 지금 보이는 행의 정렬 (정렬 중인 열 칠하기)
  shownSortState: PokeSort;
  // 지금 보이는 행의 이름 언어
  language: NameLanguage;
  // 새 조건의 행을 아직 그리는 중
  isPending: boolean;
  onSort: (sortKey: SortKey) => void;
}

// 새 조건의 행을 그리는 동안 흐리게 (pokemondb처럼 "처리 중"을 알린다).
// 누른 바로 다음 프레임에 보여야 해서 전환 효과·지연 없이 바로 바꾼다.
// (지연을 두면 빠른 기기에선 흐려지기 전에 끝나 아무 반응 없이 바뀐 것처럼 보이고,
// 느린 기기에선 행을 DOM에 반영하는 동안 화면이 멈춰 전환이 그려지지 않는다)
export const PENDING_BODY_CLASS = 'opacity-50';
