import GenFilterDropdownMenu from './gen-filter-dropdown-menu';
import GenFilterSheet from './gen-filter-sheet';
import { useGenFilter } from './use-gen-filter';

interface GenFilterProps {
  // 시트 닫기 버튼 문구 ('120마리 보기')
  resultLabel: string;
}

// 세대 필터 (filter-v2 조각으로 조립). md 미만은 바텀시트, 이상은 드롭다운 메뉴. 같이 쓰는 값은 여기서 한 번 만든다
export default function GenFilter({ resultLabel }: GenFilterProps) {
  const filter = useGenFilter();

  return (
    <>
      <GenFilterSheet filter={filter} resultLabel={resultLabel} />
      <GenFilterDropdownMenu filter={filter} />
    </>
  );
}
