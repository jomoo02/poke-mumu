import SortKeyDesktop from './sort-key-desktop';
import SortKeyMobile from './sort-key-mobile';
import SortOrderToggle from './sort-order-toggle';

// [정렬 기준 ▾][방향 토글]
// 기준 목록은 md(768px) 이상 popover, 미만 sheet.
// JS(matchMedia)로 고르면 첫 렌더가 항상 popover라 모바일에서 트리거가 한 번 교체되므로 CSS로 나눈다
export default function MoveSort() {
  return (
    <div className="flex gap-2">
      <div className="hidden md:block">
        <SortKeyDesktop />
      </div>
      <div className="md:hidden">
        <SortKeyMobile />
      </div>
      <SortOrderToggle />
    </div>
  );
}
