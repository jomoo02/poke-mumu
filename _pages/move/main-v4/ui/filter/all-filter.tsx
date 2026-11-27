import AllFilterDialog from './all-filter-dialog';
import AllFilterDrawer from './all-filter-drawer';
import type { AllFilterProps } from './filter-props';

/**
 * 통합 필터 [⚙]: 필터 그룹을 모두 펼친 패널. md 미만은 드로어, md 이상은 다이얼로그.
 * 둘 다 그리고 트리거를 CSS로 하나만 보인다 (첫 화면부터 맞는 트리거). 닫힌 패널은 트리거만 그린다.
 * 열린 채로 화면 구간을 넘으면 닫는다 (트리거가 숨으므로)
 */
export default function AllFilter(props: AllFilterProps) {
  return (
    <>
      <AllFilterDrawer {...props} />
      <AllFilterDialog {...props} />
    </>
  );
}
