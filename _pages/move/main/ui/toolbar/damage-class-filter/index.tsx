import DamageClassFilterDropdownMenu from './damage-class-filter-dropdown-menu';
import DamageClassFilterSheet from './damage-class-filter-sheet';
import { useDamageClassFilter } from './use-damage-class-filter';

interface DamageClassFilterProps {
  // 시트 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
}

// 분류 필터 (filter-v2 조각으로 조립). md 미만은 바텀시트, 이상은 드롭다운 메뉴. 같이 쓰는 값은 여기서 한 번 만든다
export default function DamageClassFilter({
  resultLabel,
}: DamageClassFilterProps) {
  const filter = useDamageClassFilter();

  return (
    <>
      <DamageClassFilterSheet filter={filter} resultLabel={resultLabel} />
      <DamageClassFilterDropdownMenu filter={filter} />
    </>
  );
}
