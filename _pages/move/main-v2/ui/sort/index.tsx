import type { SortProps } from './sort-props';
import SortDropdownMenu from './sort-dropdown-menu';
import SortDrawer from './sort-drawer';

// 정렬 칩은 카드 목록일 때만 (lg 미만): md 미만은 드로어, md~lg는 메뉴. lg 이상은 표 머리글로 정렬한다
export default function Sort(props: SortProps) {
  return (
    <div className="flex shrink-0 lg:hidden">
      <SortDrawer {...props} />
      <SortDropdownMenu {...props} />
    </div>
  );
}
