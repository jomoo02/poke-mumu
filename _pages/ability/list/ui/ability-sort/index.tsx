import AbilitySortDesktop from './desktop';
import AbilitySortMobile from './mobile';

// md(768px) 이상은 popover, 미만은 sheet.
// JS(matchMedia)로 고르면 첫 렌더가 항상 popover라 모바일에서 트리거가 한 번 교체되므로 CSS로 나눈다
export default function AbilitySort() {
  return (
    <>
      <div className="hidden md:block">
        <AbilitySortDesktop />
      </div>
      <div className="md:hidden">
        <AbilitySortMobile />
      </div>
    </>
  );
}
