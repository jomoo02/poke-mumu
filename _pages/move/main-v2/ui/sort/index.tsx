import type { SortProps } from './sort-props';
import SortDropdownMenu from './sort-dropdown-menu';
import SortSheet from './sort-sheet';

// 정렬 칩은 카드 목록일 때만 (lg 미만): md 미만은 시트, md~lg는 메뉴. lg 이상은 표 머리글로 정렬한다
export default function Sort(props: SortProps) {
  return (
    <div className="flex shrink-0 lg:hidden">
      <SortSheet {...props} />
      <SortDropdownMenu {...props} />
    </div>
  );
}
