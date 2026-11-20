import type { SortProps } from './sort-props';
import SortSheet from './sort-sheet';

// 정렬 칩은 md 미만만 (시트). md 이상은 표 머리글로 정렬한다 (SortDropdownMenu는 지금 쓰지 않음)
export default function Sort(props: SortProps) {
  return (
    <div className="flex shrink-0 md:hidden">
      <SortSheet {...props} />
    </div>
  );
}
