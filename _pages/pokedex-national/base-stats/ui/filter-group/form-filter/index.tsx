import FormFilterDropdownMenu from './form-filter-dropdown-menu';
import FormFilterSheet from './form-filter-sheet';
import { useFormFilter } from './use-form-filter';

interface FormFilterProps {
  // 시트 닫기 버튼 문구 ('120마리 보기')
  resultLabel: string;
}

// 모습 필터 (filter-v2 조각으로 조립). md 미만은 바텀시트, 이상은 드롭다운 메뉴. 같이 쓰는 값은 여기서 한 번 만든다
export default function FormFilter({ resultLabel }: FormFilterProps) {
  const filter = useFormFilter();

  return (
    <>
      <FormFilterSheet filter={filter} resultLabel={resultLabel} />
      <FormFilterDropdownMenu filter={filter} />
    </>
  );
}
