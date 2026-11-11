import {
  useFilterOptions,
  useFilterParam,
  type MoveFilterGroup,
  type MoveFilterOption,
} from '../../model/filter';

export interface CheckboxFilterState {
  // 선택지 (아이콘에 쓸 type·damageClass 포함). 배열 순서가 화면 순서
  options: readonly MoveFilterOption[];
  // 고른 게 있으면 트리거 강조
  active: boolean;
  // 트리거 글자: '타입' / '타입: 불꽃' / '분류: 물리' (+ triggerRest)
  triggerText: string;
  // 글자에 못 보인 나머지 수 ('+2'). 0이면 안 보인다
  triggerRest: number;
  // 접근 이름: '타입: 모든 타입' / '타입: 불꽃 외 2개'
  triggerLabel: string;
  isChecked: (value: string) => boolean;
  toggle: (value: string) => void;
}

interface CheckboxFilterConfig {
  group: MoveFilterGroup;
  title: string;
  // 트리거에 이름을 몇 개까지 보일지. 넘으면 '+N'
  summaryLimit: number;
}

/**
 * 체크박스 필터 하나(타입 · 분류)의 시트·메뉴가 같이 쓰는 값.
 * 각 필터의 index에서 한 번 불러 두 화면에 넘긴다 (트리거 글자가 모바일·데스크톱에서 어긋나지 않게).
 * 선택값은 목록 계산과 같은 기준(유효한 값만, 고른 순서)이다
 */
export function useCheckboxFilter({
  group,
  title,
  summaryLimit,
}: CheckboxFilterConfig): CheckboxFilterState {
  const options = useFilterOptions()[group];
  const { filter, toggleFilter } = useFilterParam();

  const selected = filter[group];

  const names = selected.map(
    (value) => options.find((option) => option.value === value)?.label ?? value,
  );
  const shownNames = names.slice(0, summaryLimit);
  const rest = Math.max(0, names.length - summaryLimit);

  // 접근 이름은 '/'를 읽지 않게 쉼표로
  const spoken = shownNames.join(', ');

  return {
    options,
    active: names.length > 0,
    triggerText:
      names.length > 0 ? `${title}: ${shownNames.join(' / ')}` : title,
    triggerRest: rest,
    triggerLabel:
      names.length === 0
        ? `${title}: 모든 ${title}`
        : rest > 0
          ? `${title}: ${spoken} 외 ${rest}개`
          : `${title}: ${spoken}`,
    isChecked: (value) => selected.includes(value),
    toggle: (value) => toggleFilter(group, value),
  };
}
