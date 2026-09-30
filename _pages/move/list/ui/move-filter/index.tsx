import MoveFilterDesktop from './desktop';
import MoveFilterMobile from './mobile';
import type { MoveFilterConfig } from './filter-config';

interface MoveFilterProps {
  config: MoveFilterConfig;
}

// md(768px) 이상은 popover, 미만은 sheet.
// JS(matchMedia)로 고르면 첫 렌더가 항상 popover라 모바일에서 트리거가 한 번 교체되므로 CSS로 나눈다.
// 툴바(가로 스크롤 flex)의 직접 자식이 되므로 줄어들지 않게 shrink-0
export default function MoveFilter({ config }: MoveFilterProps) {
  return (
    <>
      <div className="hidden md:block shrink-0">
        <MoveFilterDesktop config={config} />
      </div>
      <div className="md:hidden shrink-0">
        <MoveFilterMobile config={config} />
      </div>
    </>
  );
}
