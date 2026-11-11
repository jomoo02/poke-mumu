import TypeFilterDropdownMenu from './type-filter-dropdown-menu';
import TypeFilterSheet from './type-filter-sheet';
import { useTypeFilter } from './use-type-filter';

interface TypeFilterProps {
  // 시트 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
}

/**
 * 타입 필터 (filter-v2 조각으로 조립). md 미만은 바텀시트, 이상은 드롭다운 메뉴.
 * 둘 다 그리고 조각이 CSS로 하나만 보인다. 같이 쓰는 값은 여기서 한 번 만들어 넘긴다
 */
export default function TypeFilter({ resultLabel }: TypeFilterProps) {
  const filter = useTypeFilter();

  return (
    <>
      <TypeFilterSheet filter={filter} resultLabel={resultLabel} />
      <TypeFilterDropdownMenu filter={filter} />
    </>
  );
}
