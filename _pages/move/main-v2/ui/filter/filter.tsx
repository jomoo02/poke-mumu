import FilterDrawer from './filter-drawer';
import FilterSheet from './filter-sheet';
import type { FilterProps } from './parts/filter-props';

/**
 * 통합 필터 (도감 종족값 페이지와 같은 형태): 트리거 하나 + 패널 하나에 모든 그룹 (타입 · 분류).
 * md 미만은 아래 드로어, md 이상은 오른쪽 시트. 둘 다 그리고 트리거를 CSS로 하나만 보인다
 * (JS로 폭을 재지 않아 첫 화면부터 맞는 트리거가 보인다. 닫힌 패널은 트리거만 그린다).
 * 트리거 [⚙] (md 이상은 [⚙ 필터]), 높이 44로 검색창과 같다. 고른 개수는 접근 이름으로만 ('필터, 2개 선택됨').
 * data-filter-trigger: 칩을 모두 지운 뒤·빈 결과의 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger가 보이는 쪽을 고른다)
 */
export default function Filter(props: FilterProps) {
  return (
    <>
      <FilterDrawer {...props} triggerClassName="md:hidden" />
      <FilterSheet {...props} triggerClassName="max-md:hidden" />
    </>
  );
}
