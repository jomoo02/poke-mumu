import SortDrawer from './sort-drawer';
import SortPopover from './sort-popover';
import type { SortProps } from './sort-props';

export type { SortProps } from './sort-props';

// 정렬 버튼 [이름순 ⌄]: md 미만은 드로어, md 이상은 팝오버 (트리거는 CSS로 하나만 보인다)
export default function SortPanel(props: SortProps) {
  return (
    <>
      <SortDrawer {...props} />
      <SortPopover {...props} />
    </>
  );
}
